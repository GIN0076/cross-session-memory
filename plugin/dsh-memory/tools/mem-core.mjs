/**
 * mem-core.mjs —— 跨会话记忆共享引擎门面（插件与 CLI 的单一入口）
 *
 * 真源是 mem.mjs 的库函数（其 CLI 带 invokedDirectly 守卫，可安全 import）；
 * 本文件只做三件事，绝不复制实现（防两套实现漂移）：
 *   ① 转出口 mem.mjs 全部库 API（searchEntries / storeText / doctorReport / …）；
 *   ② 插件侧助手：promptIndexText（≤2KB 注入体）、formatRecall（召回排版）、saveAndSync（写入+注入段同步）；
 *   ③ 统一埋点出口。
 *
 * 设计红线（方案《跨会话记忆-错题本3.0-插件方案.md》§0/§2）：
 *   预算硬顶、失败降级不阻塞、写入把关（四段式+可定位引用+近重复拦截）、数据纯文本可迁移。
 */
export * from './mem.mjs'

import {
  LIMITS,
  listEntries,
  entryFiles,
  memoryRoot,
  renderIndexText,
  storeText,
  syncInjection,
  logStat,
  t,
  sepList,
  currentLang,
} from './mem.mjs'
import { statSync } from 'node:fs'
import { join } from 'node:path'

/** 阶段 8（性能）：注入体 mtime 缓存。
 *  提示词每回合调 promptIndexText；原先每回合都读全部条目文件 + 重建索引文本。
 *  现在先算轻量指纹（文件名 + mtimeMs + size，只 statSync 不读内容），指纹没变 → 直接复用上次渲染。
 *  任何 stat 失败 → 放弃缓存走全量（fail-safe，绝不阻塞注入）。 */
let INDEX_CACHE = null // { key, text }
function injectionFingerprint(budget) {
  try {
    const root = memoryRoot()
    const files = entryFiles()
    const parts = [String(budget)]
    for (const f of files) {
      try {
        const st = statSync(join(root, f))
        parts.push(`${f}:${st.mtimeMs}:${st.size}`)
      } catch { return null } // 有文件读不到 → 不缓存
    }
    return parts.join('|')
  } catch {
    return null
  }
}

/** 供 prompt section 使用的索引体（≤budget 字节，超预算砍行由 renderIndexText 保证）。 */
export function promptIndexText(budget = LIMITS.indexBytes) {
  const key = injectionFingerprint(budget)
  if (key !== null && INDEX_CACHE && INDEX_CACHE.key === key) return INDEX_CACHE.text
  const rendered = renderIndexText(listEntries(), budget)
  const text = rendered.text.trim()
  if (key !== null) INDEX_CACHE = { key, text }
  return text
}

/**
 * mem_recall 排版：教训本命中 + 会话命中合并输出。
 * 来源标注沿用 P0-2 约定：会话转录可能复述记忆原文，引用结论时优先事发会话。
 */
export function formatRecall(query, entryHits, sessionHits = [], note = '') {
  const lines = [`# mem_recall: ${query}`]
  if (!entryHits.length && !sessionHits.length) {
    lines.push(t('没有命中。换 2~3 组词再搜（原词 / 同义 / 英文报错串），或用 mem_save 记下新教训。'))
    return lines.join('\n')
  }
  if (entryHits.length) {
    lines.push('', t('## 教训本命中 {0} 条（已按可信度/新鲜度/反馈重排）', entryHits.length))
    entryHits.forEach((h, i) => {
      const badge = h.state ? `[${h.state}]` : ''
      lines.push(t('[{0}] {1} {2} — {3}（.memory/{4}，{5}{6}）',
        i + 1, h.name, badge, h.description ?? '', h.file, h.score, h.weak ? t('，弱命中') : ''))
      if (h.why) lines.push(`    ${t('为何召回')}：${h.why}`)
      if (h.snippet) lines.push(`    ${t('片段')} ${h.snippet}`)
    })
    lines.push('', `  ${t('详情：node tools/mem.mjs show <name>（或 /memory explain <name> 看可信度与证据）')}`)
    lines.push(`  ${t('引用前先判断状态：needs-review/stale 建议先 mem review；disputed 有冲突需二选一。')}`)
  }
  if (sessionHits.length) {
    lines.push('', t('## 会话命中 {0} 条（全文检索；中文短词能力有限，未命中不代表不存在）', sessionHits.length))
    for (const h of sessionHits) {
      lines.push(`- [${h.sessionId}] ${h.title ?? ''}${h.snippet ? `${currentLang() === 'en' ? ' | ' : '｜'}${h.snippet}` : ''}`)
    }
    lines.push('', `  ${t('（转录会话可能复述记忆原文——引用结论时优先早于记忆写入的原始会话；需要原文用 session_event_read）')}`)
  }
  if (note) lines.push('', note)
  return lines.join('\n')
}

/**
 * 写入 + 注入段同步（best-effort）。
 * 校验拒绝是领域结果（ok:false + problems），不是异常——由调用方决定如何呈现。
 */
export function saveAndSync(text, { sourceLabel = 'mem_save', source = 'model', overwrite = false, force = false } = {}) {
  const result = storeText(text, { sourceLabel, source, overwrite, force })
  if (result.ok) {
    try { syncInjection() } catch { /* 降级：doctor 会提示 */ }
  }
  try { logStat('store-tool', { source: sourceLabel, ok: result.ok, name: result.file ?? null }) } catch { /* 埋点失败不挡路 */ }
  return result
}

/** 统一埋点出口（失败静默）。 */
export function track(cmd, detail = {}) {
  try { logStat(cmd, detail) } catch { /* 埋点失败不挡路 */ }
}
