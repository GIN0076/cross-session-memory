/**
 * mem-core.mjs — shared memory engine facade (the single entry for plugin & CLI)
 *
 * The source of truth is the library API of mem.mjs (its CLI has an invokedDirectly
 * guard, so importing it is safe). This file does exactly three things and never
 * duplicates implementation (no two implementations allowed to drift):
 *   (1) re-export every library API from mem.mjs (searchEntries / storeText / doctorReport / …);
 *   (2) plugin-side helpers: promptIndexText (≤2 KB injection body), formatRecall
 *       (recall formatting), saveAndSync (write + injection-block sync);
 *   (3) one telemetry exit.
 *
 * Design red lines:
 *   budget hard cap · fail-degrade never blocks · write gatekeeping (four sections +
 *   locatable reference + near-duplicate interception) · data stays portable plain text.
 */
export * from './mem.mjs'

import {
  LIMITS,
  listEntries,
  renderIndexText,
  storeText,
  syncInjection,
  logStat,
} from './mem.mjs'

/** Index body for a prompt section (<= budget bytes; renderIndexText enforces line drops). */
export function promptIndexText(budget = LIMITS.indexBytes) {
  const rendered = renderIndexText(listEntries(), budget)
  return rendered.text.trim()
}

/**
 * mem_recall formatting: lesson-book hits + session hits merged into one report.
 * Source discipline: transcript sessions may quote memory text — cite the incident
 * session (the early one with the raw error) first.
 */
export function formatRecall(query, entryHits, sessionHits = [], note = '') {
  const lines = [`# mem_recall: ${query}`]
  if (!entryHits.length && !sessionHits.length) {
    lines.push('No hits. Retry with 2–3 word sets (original / synonym / English error string), or record a new lesson with mem_save.')
    return lines.join('\n')
  }
  if (entryHits.length) {
    lines.push('', `## Lesson-book hits: ${entryHits.length}`)
    entryHits.forEach((h, i) => {
      lines.push(`[${i + 1}] ${h.name} — ${h.description ?? ''} (.memory/${h.file}, ${h.score}${h.weak ? ', weak' : ''})`)
      if (h.snippet) lines.push(`    snippet: ${h.snippet}`)
    })
    lines.push('', '  details: node tools\\mem.mjs show <name> (or read the entry file)')
  }
  if (sessionHits.length) {
    lines.push('', `## Session hits: ${sessionHits.length} (full-text; CJK short-word matching is limited)`)
    for (const h of sessionHits) {
      lines.push(`- [${h.sessionId}] ${h.title ?? ''}${h.snippet ? ` | ${h.snippet}` : ''}`)
    }
    lines.push('', '  (transcript sessions may quote memory text — cite the earlier incident session first)')
  }
  if (note) lines.push('', note)
  return lines.join('\n')
}

/**
 * Write + injection-block sync (best-effort).
 * A validation rejection is a domain result ({ok:false, problems}), not an exception —
 * the caller decides how to present it.
 */
export function saveAndSync(text, { sourceLabel = 'mem_save', overwrite = false, force = false } = {}) {
  const result = storeText(text, { sourceLabel, overwrite, force })
  if (result.ok) {
    try { syncInjection() } catch { /* degrade; doctor will notice */ }
  }
  try { logStat('store-tool', { source: sourceLabel, ok: result.ok, name: result.file ?? null }) } catch { /* telemetry never breaks the flow */ }
  return result
}

/** One telemetry exit (fail-silent). */
export function track(cmd, detail = {}) {
  try { logStat(cmd, detail) } catch { /* telemetry never breaks the flow */ }
}
