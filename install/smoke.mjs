#!/usr/bin/env node
// install/smoke.mjs — end-to-end smoke test (zero dependencies, Node >= 18)
// Usage: node install/smoke.mjs
//
// Covers: syntax of every shipped JS · JSON validity · setup E2E in an isolated
// copy · write gates (evidence chain / duplicate body) · search · injection budget
// (mem-core facade) · doctor green. Nothing inside the clone is modified.

import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')
let failed = 0
const check = (name, ok, detail = '') => {
  process.stdout.write(`  ${ok ? '\u2713' : '\u2717'} ${name}${ok || !detail ? '' : ` \u2014 ${detail}`}\n`)
  if (!ok) failed += 1
}

const sandbox = mkdtempSync(join(tmpdir(), 'csm-smoke-'))
const copy = join(sandbox, 'clone')
const bank = join(sandbox, 'bank')

try {
  // 0) isolated copy — setup & injection E2E never dirty the clone
  cpSync(ROOT, copy, {
    recursive: true,
    filter: (src) => !/(^|[\\/])(\.git|\.memory|node_modules)([\\/]|$)/.test(src),
  })
  mkdirSync(bank, { recursive: true })

  // 1) syntax & JSON validity
  for (const f of ['tools/mem.mjs', 'tools/mem-core.mjs', 'plugin/dsh-memory/index.js', 'install/setup.mjs', 'install/smoke.mjs']) {
    const r = spawnSync(process.execPath, ['--check', join(copy, f)], { stdio: 'inherit' })
    check(`syntax ${f}`, r.status === 0)
  }
  for (const f of ['plugin/dsh-memory/package.json', 'plugin/dsh-memory/locale/en.json', 'plugin/dsh-memory/locale/zh.json']) {
    let ok = true
    try { JSON.parse(readFileSync(join(copy, f), 'utf8')) } catch { ok = false }
    check(`json   ${f}`, ok)
  }

  // 2) setup E2E in the isolated copy (memory bank + conventions + injection + doctor)
  const setup = spawnSync(process.execPath, [join(copy, 'install', 'setup.mjs'), '--with-sample'], { cwd: copy, encoding: 'utf8' })
  check('setup runs green', setup.status === 0, (setup.stderr || setup.stdout || '').slice(0, 200))
  check('setup stores the sample lesson', (setup.stdout || '').includes('sample lesson stored'))
  check('setup injects the index', (setup.stdout || '').includes('index injected'))
  check('setup doctor healthy', (setup.stdout || '').includes('healthy: no anomalies'))

  // 3) engine gates against an isolated bank (module root read from env at import)
  process.env.DSH_MEMORY_DIR = bank
  const core = await import(pathToFileURL(join(copy, 'tools', 'mem-core.mjs')).href)

  const sample = readFileSync(join(copy, 'examples', 'lesson-autocrlf.md'), 'utf8')
  const stored = core.storeText(sample, { sourceLabel: 'smoke' })
  check('store: valid entry accepted', stored.ok === true, (stored.problems || []).join('; '))

  const hits = core.searchEntries('autocrlf restore', 5)
  check('search: literal hit found', hits.some((h) => h.entry.front.name === 'git-autocrlf-breaks-byte-exact-restore'))

  const body = core.promptIndexText()
  check('mem-core: prompt body non-empty', body.length > 0)
  check('mem-core: prompt body within 2 KB budget', Buffer.byteLength(body, 'utf8') <= core.LIMITS.indexBytes,
    `${Buffer.byteLength(body, 'utf8')} bytes`)

  const recall = core.formatRecall('autocrlf', [{ name: 'git-autocrlf-breaks-byte-exact-restore', description: '', file: 'x.md', score: '1.0', weak: false, snippet: '' }])
  check('mem-core: formatRecall renders', recall.includes('mem_recall:'))

  const broken = sample.replace(/Verification[\s\S]*$/, 'Verification: no proof at all.\n')
  const refused = core.saveAndSync(broken, { sourceLabel: 'smoke-broken' })
  check('gate: Verification without locatable reference rejected', refused.ok === false, (refused.problems || []).join('; '))

  const dup = core.storeText(sample.replace('name: git-autocrlf-breaks-byte-exact-restore', 'name: smoke-duplicate-name'), { sourceLabel: 'smoke-dup' })
  check('gate: duplicate body rejected', dup.ok === false, (dup.problems || []).join('; '))

  const report = core.doctorReport()
  check('doctor: zero findings on fresh bank', report.findings.length === 0, report.findings.join('; '))
  check('doctor: sample is indexed', report.notIndexed.length === 0, report.notIndexed.join(', '))
} finally {
  rmSync(sandbox, { recursive: true, force: true })
}

process.stdout.write(failed ? `\n[smoke] FAILED: ${failed} check(s)\n` : '\n[smoke] all green\n')
process.exitCode = failed ? 1 : 0
