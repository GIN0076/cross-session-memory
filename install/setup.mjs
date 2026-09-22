#!/usr/bin/env node
// Agent Lesson Book — one-shot bootstrap (zero dependencies, Node >= 18)
// Usage: node install/setup.mjs [--with-sample]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..')
const withSample = process.argv.includes('--with-sample')
const log = (s) => process.stdout.write(`${s}\n`)

// 1) memory bank
for (const d of ['.memory', '.memory/archive', '.memory/drafts']) {
  mkdirSync(join(ROOT, d), { recursive: true })
}
log('[setup] memory bank ready    -> .memory/ (archive/, drafts/)')

// 2) load the engine (also registers nothing, runs nothing)
const mem = await import(pathToFileURL(join(ROOT, 'tools', 'mem.mjs')).href)

// 3) optional sample lesson — goes through the real store gates
if (withSample) {
  const sample = join(ROOT, 'examples', 'lesson-autocrlf.md')
  if (existsSync(sample)) {
    const r = mem.storeText(readFileSync(sample, 'utf8'), { sourceLabel: 'examples/lesson-autocrlf.md' })
    if (r.ok) log(`[setup] sample lesson stored -> .memory/${r.file}`)
    else log(`[setup] sample skipped: ${r.problems.join('; ')}`)
  }
}

// 4) conventions into AGENTS.md (create from template, or append if conventions absent)
const agentsPath = join(ROOT, 'AGENTS.md')
const tplPath = join(ROOT, 'templates', 'AGENTS.md.example')
const tpl = readFileSync(tplPath, 'utf8')
if (!existsSync(agentsPath)) {
  writeFileSync(agentsPath, `${tpl}\n`, 'utf8')
  log('[setup] conventions created  -> AGENTS.md')
} else {
  const cur = readFileSync(agentsPath, 'utf8')
  if (!/lesson memory|memory \(read|记忆|教训/i.test(cur)) {
    writeFileSync(agentsPath, `${cur.replace(/\s*$/, '\n')}\n${tpl}\n`, 'utf8')
    log('[setup] conventions appended -> AGENTS.md')
  } else {
    log('[setup] conventions present  -> AGENTS.md')
  }
}

// 5) auto-injection + health check
const inj = mem.syncInjection()
if (inj.ok) {
  log(`[setup] index injected       -> AGENTS.md (${inj.bytes} B / 2048 B hard cap, ${inj.listed} listed)`)
} else {
  for (const p of inj.problems) log(`[setup] inject degraded: ${p}`)
}
const rep = mem.doctorReport()
log(`[setup] doctor               -> ${rep.findings.length ? `${rep.findings.length} issue(s); run: node tools/mem.mjs doctor` : 'healthy: no anomalies'}`)
log('')
log('Next steps:')
log('  node tools/mem.mjs draft my-first-lesson   # stage a lesson skeleton')
log('  node tools/mem.mjs search <keyword>        # search the book')
log('  node tools/mem.mjs doctor                  # health check')
