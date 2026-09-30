#!/usr/bin/env node
/**
 * mem.mjs —— 工作区跨会话记忆库（零依赖，纯文本）
 *
 * 设计依据（见方案第三版 §5 红线）：
 *  - 只注索引，详情按需读（索引 <= 60 行 / 2 KB）
 *  - 无「验证」字段不许写；「验证」段缺可定位引用（store 时）拒写；密钥拒绝；超限拒绝
 *  - 冲突只标记不合并；检索只用字面匹配（不做向量/RRF/衰减）
 *
 * 用法（23 命令 + help；命令数口径以本表为准，README/COMMANDS.md 需与此一致）：
 *   index | inject | global-sync                       # 索引 / 同步自动注入段 / 全局库镜像
 *   list | search <q> [limit] [--two-stage] | show     # 列表 / 检索（字面+n-gram+aliases，IDF 加权） / 全文
 *   <name> | feedback <q> <采用> [原因]                # 详情 / 召回反馈闭环
 *   map [name] | gather <q> [budget]                   # 文本图谱（六段） / 合议包（可信度分层证据包）
 *   store <file|-> [--overwrite] [--force]             # 入库（四段+引用强制、密钥拒写、近重复拦截）
 *   draft [主题] | drafts | approve <草稿> | reject    # 草稿骨架 / 待审列表 / 批准 / 拒绝（都归档不硬删）
 *   <草稿> [原因] | forget <name> | review <name>      # 归档 / 复核刷新（verified=今天，review=+90 天）
 *   conflicts | resolve <败方> --prefer <胜方>         # 冲突对列出 / 显式裁决（阶段 6）
 *        --reason <理由>
 *   explain <name> | verify [name] | write-mode [模式] # 可解释召回 / 白名单验证 / 写入模式
 *   doctor | stats [days]                              # 体检（green = exit 0，notes 为信息级） / 埋点（默认 7 天）
 *
 * doctor green 口径：**exit 0 = 零 findings**；notes 是信息级提示（到期、近重复、索引未列出等），
 * 不影响退出码 —— 与 docs/COMMANDS.md 一致（阶段 7.1 定死，改这里必须同步改文档）。
 */
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import {
  appendFileSync, copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, unlinkSync, writeFileSync,
} from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DEFAULT_ROOT = join(HERE, '..', '.memory')

/**
 * 记忆库根目录：每次读取重新解析 `DSH_MEMORY_DIR`，便于测试/多库切换
 * （原为模块级常量，env 后设置无效）。
 */
export function memoryRoot() {
  return process.env.DSH_MEMORY_DIR ?? DEFAULT_ROOT
}
export function indexFile() { return join(memoryRoot(), 'MEMORY.md') }
export function archiveDir() { return join(memoryRoot(), 'archive') }
/** @deprecated 使用 memoryRoot()；仅为默认值快照，不跟随 env 变化。 */
export const ROOT = DEFAULT_ROOT
/** @deprecated 使用 indexFile()。 */
export const INDEX_FILE = join(DEFAULT_ROOT, 'MEMORY.md')
/** @deprecated 使用 archiveDir()。 */
export const ARCHIVE_DIR = join(DEFAULT_ROOT, 'archive')

export const LIMITS = {
  indexLines: 60,
  indexBytes: 2048,
  entryBytes: 4096,
  entries: 200,
  staleDays: 90,
  descChars: 28,
  simThreshold: 0.6,      // P0-6：近重复拦截阈值（3-gram Jaccard）
  indexFooterBytes: 160,  // P0-7：索引尾注预算（列出未进索引的条目名）
}

/**
 * 段名双语别名（阶段 7 前置·发行版单源化）。
 * 规范键仍是中文四段，values 额外接受英文段名——同一份引擎即可同时受理中英文条目，
 * 这也是发行版 p0 端到端测试 `englishAccepted`（SECTION_ALIASES 含 'Symptom'）的依据。
 * 加别名只放宽受理面，不改变既有中文条目的判定结果。
 */
export const SECTION_ALIASES = {
  现象: ['现象', 'Symptom', 'Problem'],
  判定: ['判定', 'Cause', 'Diagnosis'],
  解法: ['解法', 'Fix', 'Solution'],
  验证: ['验证', 'Verification'],
}
export const REQUIRED_SECTIONS = Object.keys(SECTION_ALIASES)

/**
 * 核心路径双语（阶段 7 前置·发行版单源化）。
 *
 * 语言解析：`DSH_MEMORY_LANG=zh|en` 显式优先；未指定时发行仓（`agent-lesson-book`，
 * 面向 GitHub 国际用户）默认 en，工作区真源默认 zh —— 同一份代码服务两边。
 *
 * 表设计：key 就是中文原文（中文输出天然免费），只维护 en 映射；
 * **未收录的 key 原样返回**，所以长尾提示暂留中文不会崩，等 i18n 第二批补齐。
 * 占位符用 `{0}` `{1}`，避免与模板插值语法纠缠。
 */
export function currentLang() {
  const explicit = String(process.env.DSH_MEMORY_LANG ?? '').toLowerCase()
  if (explicit === 'zh' || explicit === 'en') return explicit
  return /agent-lesson-book[\\/]/.test(fileURLToPath(import.meta.url)) ? 'en' : 'zh'
}

/** 待办（i18n 第二批）：这里只收核心路径 doctor/store/explain/usage，长尾 CLI 输出暂留中文。 */
const MESSAGES_EN = {
  // ── doctor（体检是阶段 7 验收标准之一，必须双语）──
  '条目 {0} 条｜索引 {1} 行 / {2} 字节｜写入模式 {3}': '{0} entries | index {1} lines / {2} bytes | write mode: {3}',
  '[可信度] verified {0}｜provisional {1}｜needs-review {2}｜stale {3}｜disputed {4}': '[confidence] verified {0} | provisional {1} | needs-review {2} | stale {3} | disputed {4}',
  '[埋点] 近 7 天搜索 {0} 次（命中 {1} / 落空 {2}）｜show {3}｜store {4}': '[telemetry] searches in 7d: {0} (hit {1} / miss {2}) | show {3} | store {4}',
  '索引未列出 {0} 条（索引只放最有价值的部分，其余用 search 检索）：{1}': '{0} entries not in index (index keeps only the most valuable; search the rest): {1}',
  '体检通过：无异常': 'Healthy: no anomalies',
  '发现 {0} 处问题：': '{0} issue(s) found:',
  '提示 {0} 条（非致命，不影响体检结果）：': '{0} note(s) (non-fatal, do not affect the health check):',
  '（无未决冲突）': '(no unresolved conflicts)',
  '没有命中。换 2~3 组词再搜（原词 / 同义 / 英文报错串），或用 mem_save 记下新教训。': 'No hits. Retry with 2-3 word sets (original / synonym / English error string), or record a new lesson with mem_save.',
  // ── doctorReport 的 findings / notes（doctor 直接打印它们）──
  '索引 MEMORY.md 不存在（先跑 index 生成）': 'Index MEMORY.md missing (run mem index first)',
  '索引 {0} 行 > 上限 {1}': 'Index has {0} lines > cap {1}',
  '索引 {0} 字节 > 上限 {1}': 'Index is {0} bytes > cap {1}',
  '条目 {0} > 上限 {1}': 'Entry count {0} > cap {1}',
  '{0} 超长（{1} 字节）': '{0} is too long ({1} bytes)',
  '{0} 与 {1} 正文重复': '{0} duplicates the body of {1}',
  '{0}: 「验证」段无可定位引用': '{0}: Verification section has no locatable reference',
  '{0} 已 {1} 天未复核（verified={2}）': '{0} not re-verified for {1} day(s) (verified={2})',
  '{0} 缺 metadata.created/verified，无法判断时效': '{0} lacks metadata.created/verified; freshness unknown',
  '{0}: review 到期（{1}）—— 跑 mem review {2} 刷新': '{0}: review due ({1}) — refresh with: mem review {2}',
  '索引引用了不存在的文件 {0}': 'Index references a missing file {0}',
  '文档计数漂移：状态文档写 {0} 条，实际 {1} 条 —— 需同步': 'Doc count drift: status doc says {0}, actual {1} — needs resync',
  'AGENTS.md 无注入段——跑 mem inject 启用自动注入（当前为降级态：指针约定）': 'AGENTS.md has no injection block — run mem inject to enable it (currently degraded to the pointer convention)',
  'AGENTS.md 注入段与索引不同步（差异 {0} 处）—— 跑 mem inject': 'AGENTS.md injection block is out of sync with the index ({0} diff) — run mem inject',
  'AGENTS.md 缺「跨会话记忆」约定段——载体被改歪': 'AGENTS.md is missing the cross-session-memory convention block — carrier text altered',
  '载体 {0} 缺「{1}」——约定文本被改歪': 'Carrier {0} is missing "{1}" — convention text altered',
  '近重复对 {0}（相似度 {1}）': 'Near-duplicate pair {0} (similarity {1})',
  '{0}: 与其他条目冲突（disputed）—— 跑 mem conflicts 查看冲突对，mem resolve 裁决': '{0}: conflicts with another entry (disputed) — list with mem conflicts, adjudicate with mem resolve',
  '{0}: 可能过期（stale，verified 距今 {1} 天）': '{0}: possibly stale (last verified {1} day(s) ago)',
  // ── 写入闸门（store/parse 的拒绝原因，用户最常看到）──
  '单条 {0} 字节 > 上限 {1}': 'Entry is {0} bytes > cap {1}',
  '疑似凭据/密钥：{0} —— 拒绝写入': 'Suspected credential/secret: {0} — write refused',
  '疑似 PII（个人敏感信息）：{0} —— 拒绝写入': 'Suspected PII (personally identifiable info): {0} — write refused',
  '「验证」段缺可定位引用（路径 / 章节号 / 坑 #N，证据链下钻）—— 拒绝写入': 'Verification section lacks a locatable reference (path / section / issue #N) — write refused',
  'review 日期格式非法：{0}（应为 YYYY-MM-DD）': 'Invalid review date: {0} (expected YYYY-MM-DD)',
  '{0} 必须单行、逗号分隔': '{0} must be a single comma-separated line',
  '缺少 frontmatter（--- ... ---）': 'Missing frontmatter (--- ... ---)',
  'frontmatter 缺 {0}': 'Frontmatter missing {0}',
  'frontmatter 缺 metadata.{0}': 'Frontmatter missing metadata.{0}',
  '正文缺「{0}」段': 'Body missing the {0} section',
  '写入模式为 off：禁止模型写入（人类命令仍可用）': 'Write mode is "off": model writes are disabled (human commands still work)',
  '写入模式为 approval：模型正式写入需人工批准——用 /memory save <file> 或先 mem draft': 'Write mode is "approval": model writes need human approval — use /memory save <file>, or run mem draft first',
  '与已有条目 {0}.md 正文重复（归一化后同哈希）': 'Body duplicates existing entry {0}.md (same normalized hash)',
  '与已有条目 {0} 相似度 {1}（近重复，阈值 {2}）—— 确认非重复加 --force': 'Similar to existing entry {0} (similarity {1}, threshold {2}) — pass --force if genuinely distinct',
  '条目数已达上限 {0}，请先合并或归档': 'Entry cap {0} reached — merge or archive first',
  '条目 {0}.md 已存在（加 --overwrite 覆盖）': 'Entry {0}.md already exists (pass --overwrite)',
  'supersedes 指向的 {0}.md 不存在，未归档': 'supersedes target {0}.md not found, nothing archived',
  // ── explain（可解释召回）──
  '文件': 'File', '描述': 'Description', '可信度': 'Confidence', '状态': 'State',
  '来源': 'Source', '复核': 'Review due', '适用于': 'Applies to', '证据': 'Evidence',
  '冲突': 'Conflicts with', '取代': 'Supersedes', '因': 'Caused by', '由…修复': 'Fixed by',
  '关联': 'Related', '问题': 'Problems',
  'verified 距今 {0} 天': 'verified {0} day(s) ago',
  '（验证段无可定位引用——可信度受限）': '(Verification section has no locatable reference — confidence capped)',
  '建议：先 `mem review <name>` 复核再引用': 'Suggestion: run `mem review <name>` before citing this',
  '建议：显式裁决二选一（双方历史都保留）：mem resolve <本条> --prefer <胜出方> --reason <理由>；或 /memory conflicts 查看全部冲突对': 'Suggestion: adjudicate explicitly (both sides are kept): mem resolve <this> --prefer <winner> --reason <why>; or /memory conflicts to list all pairs',
  '找不到条目 {0}': 'Entry not found: {0}',
  '找不到条目 {0}.md': 'Entry not found: {0}.md',
  '胜出方非法：{0}': 'Invalid winner entry: {0}',
  'mem.mjs —— 工作区记忆库（根目录：{0}）': 'mem.mjs — workspace memory bank (root: {0})',
  '  当前写入模式：{0}': '  write mode: {0}',
  '  write-mode [approval|auto-draft|auto-low-risk|off] | explain <name> | verify [name] | search <q> [n] [--two-stage] | feedback <q> <采用,逗号> [原因] | map [name] | gather <q> [budget] | conflicts | resolve <败方> --prefer <胜方> --reason <理由> | global-sync | stats [days] | doctor':
    '  write-mode [approval|auto-draft|auto-low-risk|off] | explain <name> | verify [name] | search <q> [n] [--two-stage] | feedback <q> <adopted,csv> [reason] | map [name] | gather <q> [budget] | conflicts | resolve <loser> --prefer <winner> --reason <text> | global-sync | stats [days] | doctor',
  '用法：gather <主题或关键词> [budget]': 'Usage: gather <topic or keywords> [budget]',
  '用法：explain <name>': 'Usage: explain <name>',
  '用法：store <file.md|-> [--overwrite] [--force] [--model]': 'Usage: store <file.md|-> [--overwrite] [--force] [--model]',
  '用法：feedback <query> <采用的条目名,逗号分隔> [原因]': 'Usage: feedback <query> <adopted-name,...> [reason]',
  // ── formatRecall（mem_recall 工具输出，进模型上下文）──
  '## 教训本命中 {0} 条（已按可信度/新鲜度/反馈重排）': '## Lesson-book hits: {0} (reranked by confidence / freshness / feedback)',
  '[{0}] {1} {2} — {3}（.memory/{4}，{5}{6}）': '[{0}] {1} {2} - {3} (.memory/{4}, {5}{6})',
  '，弱命中': ', weak hit',
  '为何召回': 'Why recalled',
  '片段': 'Snippet',
  '详情：node tools/mem.mjs show <name>（或 /memory explain <name> 看可信度与证据）': 'details: node tools/mem.mjs show <name> (or /memory explain <name> for confidence and evidence)',
  '引用前先判断状态：needs-review/stale 建议先 mem review；disputed 有冲突需二选一。': 'Check the state before citing: run mem review for needs-review/stale; disputed entries need adjudication first.',
  '## 会话命中 {0} 条（全文检索；中文短词能力有限，未命中不代表不存在）': '## Session hits: {0} (full-text; CJK short-word matching is limited — a miss does not mean absent)',
  '（转录会话可能复述记忆原文——引用结论时优先早于记忆写入的原始会话；需要原文用 session_event_read）': '(transcript sessions may restate memory text — cite the earlier incident session first; use session_event_read for the original)',
  '用法：resolve <败方条目名> --prefer <胜出条目名> --reason <理由>': 'Usage: resolve <loser> --prefer <winner> --reason <text>',
  // ── MEM_CARRIERS（额外约定载体检查，阶段 7.1 实现补文档）──
  'MEM_CARRIERS 条目格式非法（应为 相对路径::关键词）：{0}': 'Invalid MEM_CARRIERS entry (expected relative-path::keyword): {0}',
  'MEM_CARRIERS 载体不存在：{0}': 'MEM_CARRIERS carrier not found: {0}',
  'MEM_CARRIERS 载体 {0} 缺「{1}」——约定文本被改歪': 'MEM_CARRIERS carrier {0} is missing "{1}" — convention text altered',
  '近 {0} 天：搜索 {1} 次（命中 {2} / 落空 {3}）｜show {4}｜store {5}｜埋点行 {6}': 'last {0} day(s): {1} searches (hit {2} / miss {3}) | show {4} | store {5} | {6} telemetry rows',
}

/** 翻译 + 占位符替换；key 未收录时原样返回（长尾渐进补齐，绝不因缺译而崩）。 */
export function t(key, ...args) {
  const lang = currentLang()
  let s = lang === 'en' ? (MESSAGES_EN[key] ?? key) : key
  for (let i = 0; i < args.length; i += 1) s = s.split(`{${i}}`).join(String(args[i] ?? ''))
  return s
}

/** 列表分隔符按语言切换（中文顿号 / 英文逗号），避免英文输出里夹 `、`。 */
export function sepList() {
  return currentLang() === 'en' ? ', ' : '、'
}

/**
 * `/memory` 与 CLI **共享的同一份 usage 字符串**（阶段 7.2）。
 * 插件 handler 的兜底用法与 CLI 的子命令措辞都从这里取——单一常量，杜绝双处漂移。
 * CLI 的 23 条完整命令表见文件头注释与 `usage()`。
 */
export const MEMORY_SUBCOMMANDS = [
  'recall <q>', 'save <file.md>', 'doctor', 'review <name>', 'map [name]',
  'conflicts', 'resolve <败方> --prefer <胜方> --reason <理由>',
  'explain <name>', 'verify [name]', 'feedback <q> <采用,逗号> [原因]',
  'stats [days]', 'draft [主题]', 'drafts', 'approve <草稿>', 'reject <草稿> [原因]',
  'write-mode [approval|auto-draft|auto-low-risk|off]',
].join(' | ')

/**
 * 写入模式（阶段 3）：
 *  - approval      ：默认；正式条目必须由人批准（模型面走 ask，人类命令直批）
 *  - auto-draft    ：模型写只落 drafts/ 草稿，不进正式索引；人批准后才 store
 *  - auto-low-risk ：低风险事实可自动正式写入（仍受四段/证据/密钥闸）
 *  - off           ：禁止模型写入（人类命令不受限）
 */
export const WRITE_MODES = ['approval', 'auto-draft', 'auto-low-risk', 'off']
const DEFAULT_WRITE_MODE = 'approval'

function writeModeFile() { return join(memoryRoot(), 'write-mode.json') }

/** 读取当前写入模式；文件缺失/非法一律回落 approval（fail-safe）。 */
export function getWriteMode() {
  try {
    const raw = JSON.parse(readText(writeModeFile()))
    return WRITE_MODES.includes(raw.mode) ? raw.mode : DEFAULT_WRITE_MODE
  } catch {
    return DEFAULT_WRITE_MODE
  }
}

/** 设置写入模式（原子写）。非法模式拒绝。 */
export function setWriteMode(mode) {
  if (!WRITE_MODES.includes(mode)) {
    return { ok: false, problems: [`未知写入模式：${mode}（可选 ${WRITE_MODES.join(' / ')}）`] }
  }
  ensureRoot()
  writeText(writeModeFile(), `${JSON.stringify({ mode, updatedAt: new Date().toISOString() }, null, 2)}\n`)
  return { ok: true, mode }
}

/** 条目名只允许安全 slug；路径解析后再做一次根目录包含性检查。 */
const SAFE_NAME_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export function resolveEntryFile(root, name, extension = '.md') {
  const value = String(name ?? '')
  if (!SAFE_NAME_RE.test(value) || value.includes('..')) {
    throw new Error(`非法条目名：${value}`)
  }
  const base = resolve(root)
  const target = resolve(base, `${value}${extension}`)
  if (target !== base && !target.startsWith(base + sep)) {
    throw new Error(`条目路径越界：${target}`)
  }
  return target
}

/** 段落标题行（与 SECTION_ALIASES 同构：可带 #/ ** 前缀；捕获组是别名原文，需归一到规范键） */
const SECTION_HEAD = new RegExp(`^(?:#{1,6}\\s*|\\*\\*\\s*)?(${Object.values(SECTION_ALIASES).flat().join('|')})`)

/** 段标题原文 → 规范键（中文四段之一）；不是段标题返回 null。 */
function canonicalSection(line) {
  const m = SECTION_HEAD.exec(String(line ?? ''))
  if (!m) return null
  return Object.keys(SECTION_ALIASES).find((k) => SECTION_ALIASES[k].includes(m[1])) ?? null
}

/**
 * 「验证」段必须含可定位引用（证据链下钻，借鉴 result_ref/node_id 思路）：
 * 反引号引用 / 文件名 / 坑 #N / 第 N 节 / §N —— 让下个会话能顺着找到原始证据。
 */
export const LOCATABLE_REF_RE = /`[^`\n]+`|[\w.-]+\.(?:md|mjs|js|ts|cjs|ps1|cmd|yml|yaml|json)|坑\s*#?\s*\d+|第\s*\d+\s*节|§\s*\d+/

/** 取出正文里某个段落（含标题行）；找不到返回 null。label 是规范键，别名行同样命中。 */
export function extractSection(body, label) {
  const lines = String(body ?? '').split(/\r?\n/)
  let start = -1
  for (let i = 0; i < lines.length; i++) {
    if (canonicalSection(lines[i]) === label) { start = i; break }
  }
  if (start === -1) return null
  const out = [lines[start]]
  for (let i = start + 1; i < lines.length; i++) {
    if (canonicalSection(lines[i]) !== null) break
    out.push(lines[i])
  }
  return out.join('\n')
}

export function hasLocatableRef(text) {
  return LOCATABLE_REF_RE.test(String(text ?? ''))
}

const SECRET_PATTERNS = [
  [/sk-[A-Za-z0-9_-]{12,}/, 'OpenAI 风格密钥 (sk-)'],
  [/ghp_[A-Za-z0-9]{20,}/, 'GitHub token (ghp_)'],
  [/AKIA[0-9A-Z]{16}/, 'AWS access key'],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, 'Slack token'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, '私钥'],
  [/(api[_-]?key|secret|password|passwd|token)\s*[:=]\s*["']?[A-Za-z0-9_\-./+]{16,}/i, '疑似凭据赋值'],
]

// 阶段 8（隐私）：常见 PII 模式 —— 邮箱 / 大陆手机号。命中即拒写（与密钥同级硬闸）。
// 只扫这两类高置信模式，不做模糊匹配（避免误伤条目正文里的示例/占位符）。
const PII_PATTERNS = [
  [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, '邮箱地址'],
  [/(?<!\d)1[3-9]\d{9}(?!\d)/, '手机号'],
]

/* ── 基础设施 ───────────────────────────────────────────── */

export function ensureRoot() {
  const root = memoryRoot()
  const archive = archiveDir()
  if (!existsSync(root)) mkdirSync(root, { recursive: true })
  if (!existsSync(archive)) mkdirSync(archive, { recursive: true })
}

function readText(file) {
  return readFileSync(file, 'utf8').replace(/^\uFEFF/, '')
}

function writeText(file, text) {
  const parent = dirname(resolve(file))
  mkdirSync(parent, { recursive: true })
  const temp = join(parent, `.${file.split(/[\\/]/).pop()}.${process.pid}.${Date.now()}.tmp`)
  writeFileSync(temp, text, 'utf8')
  renameSync(temp, file)
}

export function entryFiles() {
  const root = memoryRoot()
  if (!existsSync(root)) return []
  return readdirSync(root)
    .filter((f) => f.endsWith('.md') && f !== 'MEMORY.md')
    .sort()
}

/* ── 解析 ───────────────────────────────────────────────── */

export function parseEntry(text, file = '(inline)') {
  const problems = []
  const front = {}
  let body = text
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (!m) problems.push(t('缺少 frontmatter（--- ... ---）'))
  else {
    body = text.slice(m[0].length)
    // 按缩进深度维护对象栈，支持任意层嵌套（metadata.verification.kind 等）。
    const stack = [{ indent: -1, obj: front }]
    for (const rawLine of m[1].split(/\r?\n/)) {
      if (!rawLine.trim()) continue
      const kv = /^(\s*)([A-Za-z0-9_-]+):\s*(.*)$/.exec(rawLine)
      if (!kv) continue
      const [, ws, key, rawValue] = kv
      const indent = ws.length
      const value = rawValue.trim().replace(/^["']|["']$/g, '')
      // 回退到比当前缩进更浅的父层
      while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop()
      const parent = stack[stack.length - 1].obj
      if (value === '') {
        parent[key] = {}
        stack.push({ indent, obj: parent[key] })
      } else {
        parent[key] = value
      }
    }
  }
  const meta = front.metadata ?? {}
  for (const key of ['name', 'description']) {
    if (!front[key]) problems.push(t('frontmatter 缺 {0}', key))
  }
  for (const key of ['type', 'scope']) {
    if (!meta[key]) problems.push(t('frontmatter 缺 metadata.{0}', key))
  }
  for (const label of REQUIRED_SECTIONS) {
    const alts = SECTION_ALIASES[label].join('|')
    const re = new RegExp(`^(?:#{1,6}\\s*|\\*\\*\\s*)?(?:${alts})`, 'm')
    if (!re.test(body)) problems.push(t('正文缺「{0}」段', label))
  }
  return { file, front, meta, body: body.trim(), problems }
}

export function listEntries() {
  return entryFiles().map((f) => parseEntry(readText(join(memoryRoot(), f)), f))
}

function normHash(entry) {
  const normalized = entry.body.toLowerCase().replace(/\s+/g, ' ').trim()
  return createHash('sha1').update(normalized).digest('hex').slice(0, 12)
}

export function scanSecrets(text) {
  const hits = []
  for (const [re, label] of SECRET_PATTERNS) if (re.test(text)) hits.push(label)
  return hits
}

/** 阶段 8（隐私）：PII 扫描（邮箱 / 手机号）。命中由 validateCandidate 拒写。 */
export function scanPii(text) {
  const hits = []
  for (const [re, label] of PII_PATTERNS) if (re.test(text)) hits.push(label)
  return hits
}

/* ── 索引 ───────────────────────────────────────────────── */

function clipDescription(text, max) {
  if (text.length <= max) return text
  const head = text.slice(0, max)
  const cut = Math.max(
    head.lastIndexOf('，'), head.lastIndexOf('、'), head.lastIndexOf('；'),
    head.lastIndexOf('：'), head.lastIndexOf(' '),
  )
  return (cut > max * 0.6 ? head.slice(0, cut) : head) + '…'
}

function shortName(name, max = 14) {
  const s = String(name ?? '')
  return s.length > max ? `${s.slice(0, max - 1)}…` : s
}

export function renderIndexText(entries = listEntries(), budget = LIMITS.indexBytes) {
  const sorted = [...entries].sort((a, b) => {
    const ak = a.meta.created ?? ''
    const bk = b.meta.created ?? ''
    if (ak !== bk) return bk.localeCompare(ak)
    return a.file.localeCompare(b.file)
  })
  const usable = sorted.filter((e) => e.problems.length === 0)
  const head = ['# 跨会话记忆索引', '']
  const lines = [...head]
  let bytes = Buffer.byteLength(lines.join('\n') + '\n', 'utf8')
  let listed = 0
  const skippedNames = []
  for (const entry of usable) {
    const desc = clipDescription(entry.front.description ?? '', LIMITS.descChars)
    const line = `- [${entry.front.name}](${entry.file}) — ${desc}`
    const next = bytes + Buffer.byteLength(line + '\n', 'utf8')
    // P0-7：尾注要列出被挤出的条目名（不再静默消失），预留 indexFooterBytes 预算
    if (lines.length + 1 > LIMITS.indexLines || next > budget - LIMITS.indexFooterBytes) {
      skippedNames.push(shortName(entry.front.name))
      continue
    }
    lines.push(line)
    bytes = next
    listed += 1
  }
  if (skippedNames.length > 0) {
    const total = skippedNames.length
    let shown = skippedNames.join('、')
    let note = `- …未进索引 ${total} 条：${shown}（search 可查）`
    while (Buffer.byteLength(note, 'utf8') > LIMITS.indexFooterBytes && shown.includes('、')) {
      shown = shown.slice(0, shown.lastIndexOf('、'))
      note = `- …未进索引 ${total} 条：${shown} 等（search 可查）`
    }
    lines.push(note)
  }
  const text = lines.join('\n') + '\n'
  return { text, listed, skippedForBudget: skippedNames.length, skippedNames, bytes: Buffer.byteLength(text, 'utf8') }
}

export function writeIndex() {
  ensureRoot()
  const rendered = renderIndexText()
  writeText(indexFile(), rendered.text)
  return rendered
}

/* ── 写入 ───────────────────────────────────────────────── */

export function validateCandidate(text) {
  const problems = []
  const bytes = Buffer.byteLength(text, 'utf8')
  if (bytes > LIMITS.entryBytes) problems.push(t('单条 {0} 字节 > 上限 {1}', bytes, LIMITS.entryBytes))
  const secrets = scanSecrets(text)
  if (secrets.length) problems.push(t('疑似凭据/密钥：{0} —— 拒绝写入', secrets.join(sepList())))
  const pii = scanPii(text)
  if (pii.length) problems.push(t('疑似 PII（个人敏感信息）：{0} —— 拒绝写入', pii.join(sepList())))
  const parsed = parseEntry(text)
  problems.push(...parsed.problems)
  const verifySection = extractSection(parsed.body, '验证')
  if (verifySection !== null && !hasLocatableRef(verifySection)) {
    problems.push(t('「验证」段缺可定位引用（路径 / 章节号 / 坑 #N，证据链下钻）—— 拒绝写入'))
  }
  // P0-5：review 必须是 YYYY-MM-DD（复核到期日）
  const review = parsed.front.review ?? parsed.meta.review
  if (review && !/^\d{4}-\d{2}-\d{2}$/.test(String(review))) {
    problems.push(t('review 日期格式非法：{0}（应为 YYYY-MM-DD）', review))
  }
  // P2-A②：aliases/keywords 可选，但必须单行、逗号分隔
  for (const key of ['aliases', 'keywords']) {
    const v = parsed.front[key] ?? parsed.meta[key]
    if (v && /[\r\n]/.test(String(v))) problems.push(t('{0} 必须单行、逗号分隔', key))
  }
  return { problems, parsed, bytes }
}

/** P0-6：字符 3-gram shingle 集合（整体不足 3 字则退化为整串） */
export function shingles3(text) {
  const s = String(text ?? '').toLowerCase().replace(/\s+/g, '')
  const set = new Set()
  if (s.length < 3) { if (s) set.add(s); return set }
  for (let i = 0; i + 3 <= s.length; i++) set.add(s.slice(i, i + 3))
  return set
}

// 阶段 8（性能）：shingle 记忆化 —— 同一段正文只算一次 3-gram。
// 近重复检测每次 store 要对库内每条 existing 算 jaccard3，原先每条都重算两遍
// shingles3（O(n×|body|)）；缓存后每条正文算一次，重复 body 命中缓存直接复用。
// 纯函数缓存（输入串 → Set），不改语义；Set 只读不被调用方修改（jaccard3 只读遍历）。
const SHINGLE_CACHE = new Map()
const SHINGLE_CACHE_MAX = 2000
export function shingles3Cached(text) {
  const s = String(text ?? '').toLowerCase().replace(/\s+/g, '')
  const hit = SHINGLE_CACHE.get(s)
  if (hit) return hit
  const set = shingles3(text)
  if (SHINGLE_CACHE.size >= SHINGLE_CACHE_MAX) SHINGLE_CACHE.clear()
  SHINGLE_CACHE.set(s, set)
  return set
}

export function jaccard3(a, b) {
  const A = shingles3Cached(a)
  const B = shingles3Cached(b)
  if (!A.size || !B.size) return 0
  let inter = 0
  for (const g of A) if (B.has(g)) inter += 1
  return inter / (A.size + B.size - inter)
}

/** P2-A② 写时富化：无 keywords 时自动生成（ASCII token + 中文 bigram，按对库内稀有度取前 5） */
export function generateKeywords(parsed, existing) {
  const cands = new Set()
  // 先小写再整词匹配 + 去尾标点：避免 "searchEntries" 拆出 "ntries" 这类碎渣
  for (const m of String(parsed.body ?? '').toLowerCase().matchAll(/[a-z][a-z0-9_.:-]{3,}/g)) {
    const t = m[0].replace(/[-_.:]+$/, '')
    if (t.length >= 4) cands.add(t)
  }
  for (const g of cjkNgrams(parsed.body).bigrams) cands.add(g)
  const N = Math.max(existing.length, 1)
  return [...cands]
    .map((t) => {
      const df = existing.filter((e) => String(e.body ?? '').toLowerCase().includes(t)).length
      return { t, w: Math.log(1 + N / (1 + df)) }
    })
    .sort((a, b) => b.w - a.w)
    .slice(0, 5)
    .map((x) => x.t)
    .join(',')
}

function findNearDuplicates(candidate, existing) {
  const out = []
  for (const e of existing) {
    if (e.front.name === candidate.front.name) continue
    const sim = jaccard3(candidate.body, e.body)
    if (sim >= LIMITS.simThreshold) out.push({ file: e.file, sim })
  }
  return out.sort((a, b) => b.sim - a.sim)
}

function memoryLockFile() { return join(memoryRoot(), '.memory.lock') }
// 多会话/多进程同时写时，持锁方可能在做整库索引重建；给足裕度避免误判超时。
const LOCK_WAIT_MS = 15000

function lockExists() {
  try {
    const pid = Number(readFileSync(memoryLockFile(), 'utf8').trim())
    if (!Number.isInteger(pid)) return true
    process.kill(pid, 0)
    return true
  } catch (error) {
    if (error?.code === 'ESRCH') return false
    return existsSync(memoryLockFile())
  }
}

function acquireMemoryLock() {
  ensureRoot()
  const deadline = Date.now() + LOCK_WAIT_MS
  for (;;) {
    try {
      writeFileSync(memoryLockFile(), String(process.pid), { encoding: 'utf8', flag: 'wx' })
      return
    } catch (error) {
      if (error?.code !== 'EEXIST') throw error
      if (!lockExists()) { try { unlinkSync(memoryLockFile()) } catch { /* raced */ } continue }
      if (Date.now() >= deadline) throw new Error('memory lock timed out')
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 20)
    }
  }
}

function releaseMemoryLock() {
  try { unlinkSync(memoryLockFile()) } catch { /* already gone */ }
}

function withMemoryLock(operation) {
  acquireMemoryLock()
  try { return operation() } finally { releaseMemoryLock() }
}

function withoutMemoryLock(operation) {
  return operation()
}

export { withMemoryLock, withoutMemoryLock }

/**
 * 正式入库。`source` 用于区分调用方：
 *  - 'human'（CLI / /memory save）：任何模式都直接写（人亲手即批准）；
 *  - 'model'（mem_save 工具）：受 writeMode 约束，approval/off 拒绝，auto-draft 转草稿。
 */
export function storeText(text, opts = {}) {
  const source = opts.source ?? 'human'
  const mode = getWriteMode()
  if (source === 'model') {
    if (mode === 'off') {
      return { ok: false, problems: [t('写入模式为 off：禁止模型写入（人类命令仍可用）')] }
    }
    if (mode === 'approval') {
      return { ok: false, problems: [t('写入模式为 approval：模型正式写入需人工批准——用 /memory save <file> 或先 mem draft')] }
    }
    if (mode === 'auto-draft') {
      const drafted = draftFromContent(text)
      return drafted.ok
        ? { ok: true, draft: true, file: drafted.file, sourceLabel: opts.sourceLabel, note: '已存为草稿，需人工 /memory approve 后才正式入库' }
        : drafted
    }
  }
  return withMemoryLock(() => storeTextLocked(text, opts))
}

function storeTextLocked(text, { sourceLabel = 'inline', overwrite = false, force = false }) {
  ensureRoot()
  const { problems, parsed } = validateCandidate(text)
  if (problems.length) return { ok: false, problems }
  const name = parsed.front.name
  let target
  try {
    target = resolveEntryFile(memoryRoot(), name)
  } catch (error) {
    return { ok: false, problems: [error.message] }
  }
  const existing = listEntries()
  // P2-B③：supersedes 声明的旧条目是"合法相似"，豁免重复/近重复检测
  const supSet = new Set(listField(parsed.front.supersedes ?? parsed.meta.supersedes).filter((s) => s !== name))
  const hash = normHash(parsed)
  const duplicate = existing.find((e) => normHash(e) === hash && e.front.name !== name && !supSet.has(e.front.name))
  if (duplicate) {
    return { ok: false, problems: [t('与已有条目 {0}.md 正文重复（归一化后同哈希）', duplicate.front.name)] }
  }
  // P0-6：近重复拦截（3-gram Jaccard ≥ 阈值 → 拦；确认非重复加 --force 放行）
  if (!force) {
    const near = findNearDuplicates(parsed, existing.filter((e) => !supSet.has(e.front.name)))
    if (near.length) {
      return {
        ok: false,
        problems: near.map(({ file, sim }) => t('与已有条目 {0} 相似度 {1}（近重复，阈值 {2}）—— 确认非重复加 --force',
          file, sim.toFixed(2), LIMITS.simThreshold)),
      }
    }
  }
  if (existing.length >= LIMITS.entries && !existing.some((e) => e.front.name === name)) {
    return { ok: false, problems: [t('条目数已达上限 {0}，请先合并或归档', LIMITS.entries)] }
  }
  if (existsSync(target) && overwrite) {
    ensureRoot()
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backup = join(archiveDir(), `${name}.overwrite-${stamp}.md`)
    mkdirSync(archiveDir(), { recursive: true })
    writeFileSync(backup, readText(target), 'utf8')
  }
  if (existsSync(target) && !overwrite) {
    return { ok: false, problems: [t('条目 {0}.md 已存在（加 --overwrite 覆盖）', name)] }
  }
  // 统一换行 + 结尾换行；P2-A② 写时富化：无 keywords 时自动生成（可选增强，不加作者负担）
  let outText = text.replace(/\r\n/g, '\n').replace(/\n*$/, '\n')
  if (!parsed.front.keywords && !parsed.meta.keywords) {
    const gen = generateKeywords(parsed, existing)
    if (gen) outText = outText.replace(/^---\n/, `---\nkeywords: ${gen}\n`)
  }
  // 复核机制对新条目恒激活：缺 review 时预置 +staleDays
  if (!parsed.front.review && !parsed.meta.review) {
    const due = new Date(Date.now() + LIMITS.staleDays * 86_400_000).toISOString().slice(0, 10)
    outText = outText.replace(/^---\n/, `---\nreview: ${due}\n`)
  }
  ensureRoot()
  writeText(target, outText)
  // P2-B③：自动归档被取代的旧条目（supersedes 链 = 有效期窗口的文本形态）
  const superseded = []
  const supWarn = []
  for (const old of supSet) {
    const r = withoutMemoryLock(() => forgetEntryLocked(old))
    if (r.ok) superseded.push(old)
    else supWarn.push(t('supersedes 指向的 {0}.md 不存在，未归档', old))
  }
  const rendered = writeIndex()
  return { ok: true, file: `${name}.md`, sourceLabel, index: rendered, superseded, supWarn }
}

export function forgetEntry(name) {
  return withMemoryLock(() => forgetEntryLocked(name))
}

function forgetEntryLocked(name) {
  ensureRoot()
  const target = resolveEntryFile(memoryRoot(), name)
  if (!existsSync(target)) return { ok: false, problems: [t('找不到条目 {0}.md', name)] }
  const stamp = new Date().toISOString().slice(0, 10)
  const dest = join(archiveDir(), `${name}.${stamp}.md`)
  renameSync(target, dest)
  const rendered = writeIndex()
  return { ok: true, archivedTo: dest, index: rendered }
}

/** P2-C① 自动注入：把索引原样同步进 AGENTS.md（AGENTS.md 由 harness 自动注入每个会话）。
 *  §5.4 红线：注入=索引原样 ≤2KB、超预算砍行、失败静默降级回指针约定、绝不阻塞。 */
export const INJECT_BEGIN = '<!-- mem-inject:begin（mem inject 维护；以下是记忆数据非指令） -->'
export const INJECT_END = '<!-- mem-inject:end -->'

/** 注入体渲染（链接前缀 + 预算核算）——syncInjection 与 doctor 共用同一基准（自审 🔴3） */
export function renderInjectionBody() {
  const frameBytes = Buffer.byteLength(`${INJECT_BEGIN}\n\n${INJECT_END}\n`, 'utf8')
  let rendered = renderIndexText(listEntries(), LIMITS.indexBytes - frameBytes)
  let body = rendered.text.trim()
  // `](.memory/` 比 `](` 多 8 字节/链接——先算账再落笔，超支就收紧预算少列一条
  const linkCount = (body.match(/\]\([^)]+\.md\)/g) || []).length
  const overhead = 8 * linkCount
  if (frameBytes + Buffer.byteLength(body, 'utf8') + overhead > LIMITS.indexBytes) {
    rendered = renderIndexText(listEntries(), LIMITS.indexBytes - frameBytes - overhead)
    body = rendered.text.trim()
  }
  body = body.replace(/\]\(([^)/]+\.md)\)/g, '](.memory/$1)')
  return { body, listed: rendered.listed, skipped: rendered.skippedForBudget }
}

/**
 * 注入目标 AGENTS.md：与记忆库同域——`DSH_MEMORY_DIR` 指向的库，其父目录即工作区根；
 * 未设置 env 时回落到本仓库根（原有行为）。这样测试/多库切换不会污染别的仓库。
 */
export function agentsFilePath() {
  const envRoot = process.env.DSH_MEMORY_DIR
  return envRoot ? join(dirname(resolve(envRoot)), 'AGENTS.md') : join(HERE, '..', 'AGENTS.md')
}

export function syncInjection() {
  return withMemoryLock(() => syncInjectionLocked())
}

function syncInjectionLocked() {
  const agentsPath = agentsFilePath()
  if (!existsSync(agentsPath)) {
    return { ok: false, problems: ['AGENTS.md 不存在——降级为指针约定（不注入）'] }
  }
  const { body, listed, skipped } = renderInjectionBody()
  const block = `${INJECT_BEGIN}\n\n${body}\n\n${INJECT_END}\n`
  const total = Buffer.byteLength(block, 'utf8')
  if (total > LIMITS.indexBytes) {
    return { ok: false, problems: [`注入块 ${total} 字节 > ${LIMITS.indexBytes} 硬顶——未写入，降级为指针约定`] }
  }
  let text = readText(agentsPath)
  const bi = text.indexOf(INJECT_BEGIN)
  const ei = text.indexOf(INJECT_END)
  if (bi >= 0 && ei > bi) {
    text = text.slice(0, bi) + block + text.slice(ei + INJECT_END.length).replace(/^\n/, '')
  } else {
    text = `${text.replace(/\s*$/, '\n')}\n${block}`
  }
  // 覆盖前备份：AGENTS.md 是关键约定文件，注入失败可回滚。
  try {
    const backupDir = join(memoryRoot(), 'backup')
    mkdirSync(backupDir, { recursive: true })
    const stamp = new Date().toISOString().replace(/[:.]/g, '-')
    copyFileSync(agentsPath, join(backupDir, `AGENTS.md.${stamp}`))
  } catch { /* 备份失败不阻塞注入，doctor 会提示 */ }
  writeText(agentsPath, text)
  return { ok: true, bytes: total, listed, skipped }
}

/** 自审 🟡4：写路径顺手同步注入（best-effort，失败不影响主流程，doctor 兜底提示） */
function autoInject() { try { syncInjection() } catch { /* 降级：doctor 会提示 */ } }

/* ── 埋点与复核（P0-1 效果度量 / P0-5 复核）────────────────── */

export function statsFile() { return join(memoryRoot(), 'stats.jsonl') }
/** @deprecated 使用 statsFile()。 */
export const STATS_FILE = join(DEFAULT_ROOT, 'stats.jsonl')

/** 注入审计（阶段 5）：记录每回合索引注入了哪些条目、为何淘汰，供离线解释。 */
export function injectionAuditFile() { return join(memoryRoot(), 'injection-audit.jsonl') }

export function logStat(cmd, detail = {}) {
  if (telemetryOff()) return
  try {
    ensureRoot()
    const row = JSON.stringify({ ts: new Date().toISOString(), cmd, ...detail })
    appendFileSync(statsFile(), `${row}\n`, 'utf8')
  } catch { /* 埋点失败不影响主流程 */ }
}

/** 阶段 8（隐私）：DSH_MEMORY_TELEMETRY=off 关闭全部本地埋点（stats.jsonl / injection-audit.jsonl）。 */
export function telemetryOff() {
  const v = String(process.env.DSH_MEMORY_TELEMETRY ?? '').trim().toLowerCase()
  return v === 'off' || v === '0' || v === 'false'
}

/**
 * 记录一次召回的注入/淘汰决策（阶段 5 注入审计）。
 * 不记录完整 prompt，只记条目 id、是否入选、分数与淘汰原因——隐私与可解释兼顾。
 */
export function logInjectionAudit({ included = [], dropped = [], bytes = 0, budget = LIMITS.indexBytes } = {}) {
  if (telemetryOff()) return
  try {
    ensureRoot()
    const row = JSON.stringify({
      ts: new Date().toISOString(),
      cmd: 'inject-audit',
      included: included.slice(0, 60),
      dropped: dropped.slice(0, 60),
      bytes,
      budget,
    })
    appendFileSync(injectionAuditFile(), `${row}\n`, 'utf8')
  } catch { /* 审计失败不阻塞注入 */ }
}

/**
 * 召回反馈（阶段 5 闭环）：记录某次召回结果里哪些条目被采用/拒绝。
 * 用于后续重排（被拒条目降权、被采条目升权）。默认仅本地 stats。
 * @param query 查询词
 * @param entryNames 召回返回的条目名列表
 * @param adopted 被采用的条目名（可空）
 * @param reason 采用/拒绝原因（可空）
 */
export function logRecallFeedback(query, entryNames = [], adopted = [], reason = '') {
  try {
    ensureRoot()
    const row = JSON.stringify({
      ts: new Date().toISOString(),
      cmd: 'recall-feedback',
      query: String(query ?? '').slice(0, 120),
      returned: entryNames.slice(0, 20),
      adopted: adopted.slice(0, 20),
      reason: String(reason ?? '').slice(0, 200),
    })
    appendFileSync(statsFile(), `${row}\n`, 'utf8')
  } catch { /* 反馈失败不影响主流程 */ }
}

/** 汇总召回反馈（阶段 5）：返回各条目的采用/拒绝计数，供重排使用。 */
export function recallFeedbackSummary() {
  const out = new Map()
  if (!existsSync(statsFile())) return out
  for (const line of readText(statsFile()).split(/\r?\n/)) {
    if (!line.trim()) continue
    let row
    try { row = JSON.parse(line) } catch { continue }
    if (row.cmd !== 'recall-feedback') continue
    for (const n of row.returned ?? []) {
      const s = out.get(n) ?? { returned: 0, adopted: 0, rejected: 0 }
      s.returned += 1
      out.set(n, s)
    }
    for (const n of row.adopted ?? []) {
      const s = out.get(n) ?? { returned: 0, adopted: 0, rejected: 0 }
      s.adopted += 1
      out.set(n, s)
    }
    for (const n of (row.returned ?? []).filter((x) => !(row.adopted ?? []).includes(x))) {
      const s = out.get(n) ?? { returned: 0, adopted: 0, rejected: 0 }
      s.rejected += 1
      out.set(n, s)
    }
  }
  return out
}

export function statsSummary(days = 7) {
  const out = { searches: 0, hits: 0, misses: 0, stores: 0, shows: 0, lineCount: 0 }
  if (!existsSync(statsFile())) return out
  const cutoff = Date.now() - days * 86_400_000
  for (const line of readText(statsFile()).split(/\r?\n/)) {
    if (!line.trim()) continue
    let row
    try { row = JSON.parse(line) } catch { continue }
    if (Date.parse(row.ts) < cutoff) continue
    out.lineCount += 1
    if (row.cmd === 'search') {
      out.searches += 1
      if (row.hits > 0) out.hits += 1
      else out.misses += 1
    } else if (row.cmd === 'store') out.stores += 1
    else if (row.cmd === 'show') out.shows += 1
  }
  return out
}

/** P0-5：复核单条 —— verified 刷到今天，review 刷到 +staleDays（90 天） */
export function reviewEntry(name) {
  return withMemoryLock(() => reviewEntryLocked(name))
}

function reviewEntryLocked(name) {
  const file = resolveEntryFile(memoryRoot(), name)
  if (!existsSync(file)) return { ok: false, problems: [t('找不到条目 {0}.md', name)] }
  const text = readText(file)
  const today = new Date().toISOString().slice(0, 10)
  const due = new Date(Date.now() + LIMITS.staleDays * 86_400_000).toISOString().slice(0, 10)
  let next = text
  if (/^\s*verified:\s*.*$/m.test(next)) next = next.replace(/^(\s*)verified:\s*.*$/m, `$1verified: ${today}`)
  else next = next.replace(/^(metadata:\s*)$/m, `$1\n  verified: ${today}`)
  if (/^\s*review:\s*.*$/m.test(next)) next = next.replace(/^(\s*)review:\s*.*$/m, `$1review: ${due}`)
  else next = next.replace(/^---\r?\n/, `---\nreview: ${due}\n`)
  writeText(file, next)
  return { ok: true, file: `${name}.md`, verified: today, review: due }
}

/** P2-A⑤：生成四段骨架草稿（落 drafts/，不入库不进索引；人工填好并审批后 store） */
export function draftEntry(topic = '') {
  ensureRoot()
  const drafts = join(memoryRoot(), 'drafts')
  if (!existsSync(drafts)) mkdirSync(drafts, { recursive: true })
  const today = new Date().toISOString().slice(0, 10)
  const due = new Date(Date.now() + LIMITS.staleDays * 86_400_000).toISOString().slice(0, 10)
  const slug = String(topic).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'draft'
  const stamp = today.replace(/-/g, '')
  let file = join(drafts, `${stamp}-${slug}.md`)
  // 自审 🔴1：同名同日不静默覆盖——自动加 -2/-3 序号
  for (let n = 2; existsSync(file); n += 1) file = join(drafts, `${stamp}-${slug}-${n}.md`)
  const body = `---
name: ${slug}-${stamp}
description: TODO 一句话说清教训
metadata:
  type: lesson
  scope: global
  originSessionId: manual (源: TODO 会话)
  created: ${today}
  verified: ${today}
review: ${due}
---

现象：TODO 贴真实现场（报错原文 / 操作 / 结果）。

判定：TODO 根因是什么，为什么会这样。

解法：TODO 正确姿势，可执行的具体命令或配置。

验证：TODO 怎么证明有效——必须带可定位引用（反引号路径 / 文件名 / 坑编号 / 章节号）。
`
  writeText(file, body)
  return { ok: true, file }
}

export function draftsDir() { return join(memoryRoot(), 'drafts') }

/**
 * 把一段候选内容落成草稿（阶段 3 自动起草管道）。
 * 草稿永远不进正式索引；approve 时才走完整 store 闸门。
 * 草稿正文会打上 source=auto / provisional 标记，便于审计。
 */
export function draftFromContent(text) {
  const { problems, parsed } = validateCandidate(text)
  // 草稿允许「证据不足」——那正是要人补的；但密钥/路径这类硬闸必须先拦。
  const hard = problems.filter((p) => p.includes('凭据') || p.includes('密钥') || p.includes('PII') || p.includes('非法条目名') || p.includes('越界'))
  if (hard.length) return { ok: false, problems: hard }
  let name = String(parsed.front.name ?? '').trim()
  if (!SAFE_NAME_RE.test(name) || name.includes('..')) {
    name = `auto-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`
  }
  ensureRoot()
  const dir = draftsDir()
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  let file = join(dir, `${stamp}-${name}.md`)
  for (let n = 2; existsSync(file); n += 1) file = join(dir, `${stamp}-${name}-${n}.md`)
  const today = new Date().toISOString().slice(0, 10)
  const due = new Date(Date.now() + LIMITS.staleDays * 86_400_000).toISOString().slice(0, 10)
  const normalized = text.replace(/\r\n/g, '\n').replace(/\n*$/, '\n')
  const front = normalized.startsWith('---\n')
    ? normalized.replace(/^---\n/, `---\nmetadata:\n  source: auto\n  confidence: provisional\n  originSessionId: ${process.env.DSH_SESSION_ID ?? 'auto'}\n`)
    : `---\nname: ${name}\ndescription: (auto draft)\nmetadata:\n  type: lesson\n  scope: global\n  source: auto\n  confidence: provisional\n  originSessionId: ${process.env.DSH_SESSION_ID ?? 'auto'}\n  created: ${today}\n  verified: ${today}\nreview: ${due}\n---\n\n${normalized}`
  writeText(file, front)
  return { ok: true, file, draft: true }
}

/** 列出待审批草稿（返回文件名、name、description、问题数）。 */
export function listDrafts() {
  const dir = draftsDir()
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const text = readText(join(dir, f))
      const parsed = parseEntry(text, f)
      return { file: f, name: parsed.front.name ?? f, description: parsed.front.description ?? '', problems: parsed.problems }
    })
}

/**
 * 批准草稿 → 正式入库（走完整 store 闸门），成功后归档草稿。
 * `by` 记录批准人/来源，写入 frontmatter 供审计。
 */
export function approveDraft(draftFile, { by = 'human', overwrite = false, force = false } = {}) {
  const dir = draftsDir()
  const base = String(draftFile ?? '').replace(/^.*[\\/]/, '')
  const path = join(dir, base)
  if (!base.endsWith('.md') || !existsSync(path)) {
    return { ok: false, problems: [`找不到草稿 ${base}`] }
  }
  const text = readText(path)
  const result = withMemoryLock(() => storeTextLocked(text, { sourceLabel: `approve:${base}`, overwrite, force }))
  if (!result.ok) return result
  // 归档草稿（不硬删）
  const archive = archiveDir()
  mkdirSync(archive, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  renameSync(path, join(archive, `draft.${base}.${stamp}`))
  logStat('approve', { draft: base, by, ok: true })
  return { ...result, approvedFrom: base, by }
}

/** 拒绝草稿 → 归档到 archive/（可恢复，不硬删）。 */
export function rejectDraft(draftFile, reason = '') {
  const dir = draftsDir()
  const base = String(draftFile ?? '').replace(/^.*[\\/]/, '')
  const path = join(dir, base)
  if (!base.endsWith('.md') || !existsSync(path)) {
    return { ok: false, problems: [`找不到草稿 ${base}`] }
  }
  const archive = archiveDir()
  mkdirSync(archive, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  renameSync(path, join(archive, `rejected.${base}.${stamp}`))
  logStat('reject', { draft: base, reason })
  return { ok: true, rejectedTo: join(archive, `rejected.${base}.${stamp}`), reason }
}

/**
 * 关系字段（阶段 6.1）：读关系一律走本函数——老条目缺字段返回空数组，向后兼容。
 *  - supersedes   取代链（被取代方落 archive/，state → stale）
 *  - conflictsWith 冲突对（双方仍存在 → disputed，不可互相覆盖，须 resolve 裁决）
 *  - causedBy     因果：本条目是某根因的表现
 *  - fixedBy      因果：本条目由某解法修复
 *  - related      普通关联
 *  - appliesTo    适用范围（阶段 4 起被 deriveConfidence 使用）
 */
export const RELATION_FIELDS = ['supersedes', 'conflictsWith', 'causedBy', 'fixedBy', 'related', 'appliesTo']

export function relationsOf(entry, field) {
  return listField(entry?.front?.[field] ?? entry?.meta?.[field])
}

/** 按关系字段聚合全库（返回 Map<field, Array<{from, to}>>，to 保留原始大小写）。 */
function relationEdges(entries) {
  const edges = new Map(RELATION_FIELDS.map((f) => [f, []]))
  for (const e of entries) {
    for (const field of RELATION_FIELDS) {
      for (const target of relationsOf(e, field)) {
        edges.get(field).push({ from: e.front.name, to: target })
      }
    }
  }
  return edges
}

/** 经 causedBy/fixedBy 聚合：同一根因（或同一解法）下的多个表现（阶段 6.1/6.2）。 */
function groupByCause(entries) {
  const byKey = new Map()
  for (const e of entries) {
    for (const field of ['causedBy', 'fixedBy']) {
      for (const target of relationsOf(e, field)) {
        const key = `${field}\u0000${target}`
        if (!byKey.has(key)) byKey.set(key, { field, target, members: [] })
        byKey.get(key).members.push(e.front.name)
      }
    }
  }
  return [...byKey.values()].filter((g) => g.members.length >= 2)
}

/**
 * 阶段 6.1：文本图谱升级为六段——取代链 / 因果链 / 冲突对 / 过期节点 / 复核时间线 / 根因聚合。
 * 冲突对去重（A→B 与 B→A 只列一次）；过期节点含 stale 与 needs-review（review 到期未复核）。
 */
export function memoryMap(name = '') {
  const entries = listEntries()
  const targets = name ? entries.filter((e) => e.front.name === name) : entries
  if (!targets.length) return '（暂无条目）'
  const states = new Map(targets.map((e) => [e.front.name, deriveConfidence(e).state]))
  const edges = relationEdges(targets)
  const now = Date.now()
  const lines = []

  lines.push('# 记忆图谱', '')

  // ① 取代链
  lines.push('## 取代链（supersedes）')
  const sup = edges.get('supersedes')
  if (sup.length) for (const { from, to } of sup) lines.push(`- ${from} → 取代 → ${to}`)
  else lines.push('- （无）')

  // ② 因果链（causedBy / fixedBy）
  lines.push('', '## 因果链（causedBy / fixedBy）')
  const caused = edges.get('causedBy')
  const fixed = edges.get('fixedBy')
  if (caused.length || fixed.length) {
    for (const { from, to } of caused) lines.push(`- ${from} → 因 → ${to}`)
    for (const { from, to } of fixed) lines.push(`- ${from} → 由…修复 → ${to}`)
  } else lines.push('- （无）')

  // ③ 冲突对（去重：a↔b 与 b↔a 算同一对）
  lines.push('', '## 冲突对（conflictsWith）')
  const seenPairs = new Set()
  const pairs = []
  for (const { from, to } of edges.get('conflictsWith')) {
    const key = [from, to].map((s) => s.toLowerCase()).sort().join('↔')
    if (seenPairs.has(key)) continue
    seenPairs.add(key)
    pairs.push({ from, to })
  }
  if (pairs.length) {
    for (const { from, to } of pairs) lines.push(`- ${from} ↔ ${to}（裁决：/memory resolve ${from} --prefer ${to} --reason <理由>）`)
  } else lines.push('- （无）')

  // ④ 过期节点（stale / needs-review）
  lines.push('', '## 过期节点（stale / needs-review）')
  const expired = targets.filter((e) => ['stale', 'needs-review'].includes(states.get(e.front.name)))
  if (expired.length) {
    for (const e of expired) lines.push(`- ${e.front.name} [${states.get(e.front.name)}]（review ${e.front.review ?? e.meta.review ?? '—'}）`)
  } else lines.push('- （无）')

  // ⑤ 复核时间线（review 到期日，升序；已过期标 !）
  lines.push('', '## 复核时间线（review 到期日）')
  const timeline = targets
    .map((e) => ({ name: e.front.name, review: e.front.review ?? e.meta.review ?? '' }))
    .sort((a, b) => (a.review || '9999').localeCompare(b.review || '9999'))
  if (timeline.length) {
    for (const { name: n, review } of timeline) {
      const due = review && Number.isFinite(Date.parse(review))
      const overdue = due && Date.parse(review) <= now ? ' !' : ''
      lines.push(`- ${due ? review : '—'} ${n}${overdue}`)
    }
  } else lines.push('- （无）')

  // ⑥ 同一根因的不同表现（causedBy 聚合）
  lines.push('', '## 同一根因的表现（causedBy / fixedBy 聚合）')
  const groups = groupByCause(targets)
  if (groups.length) {
    for (const g of groups) lines.push(`- ${g.target}：${g.members.join('、')}`)
  } else lines.push('- （无）')

  // ⑦ 关联与其他关系（每条目一览，缺字段的老条目安静跳过）
  lines.push('', '## 条目关系一览')
  for (const e of targets) {
    lines.push(`- ${e.front.name}（review ${e.front.review ?? e.meta.review ?? '—'}｜${states.get(e.front.name)}）`)
    const rel = relationsOf(e, 'related')
    const applies = relationsOf(e, 'appliesTo')
    const causedBy = relationsOf(e, 'causedBy')
    const fixedBy = relationsOf(e, 'fixedBy')
    const conflict = relationsOf(e, 'conflictsWith')
    const supersedes = relationsOf(e, 'supersedes')
    if (supersedes.length) lines.push(`    └ 取代 → ${supersedes.join('、')}`)
    if (conflict.length) lines.push(`    └ 冲突 → ${conflict.join('、')}`)
    if (causedBy.length) lines.push(`    └ 因 → ${causedBy.join('、')}`)
    if (fixedBy.length) lines.push(`    └ 修复 → ${fixedBy.join('、')}`)
    if (applies.length) lines.push(`    └ 适用于 → ${applies.join('、')}`)
    if (rel.length) lines.push(`    └ 关联 → ${rel.join('、')}`)
  }

  return lines.join('\n')
}

/**
 * 阶段 6.3：列出全部 conflictsWith 冲突对（去重；双方仍存在的才算未决）。
 * 返回 { pairs: [{ a, b, states }], unresolved }。
 */
export function listConflicts() {
  const entries = listEntries()
  const byName = new Map(entries.map((e) => [e.front.name, e]))
  const states = new Map(entries.map((e) => [e.front.name, deriveConfidence(e).state]))
  const seen = new Set()
  const pairs = []
  for (const e of entries) {
    for (const other of relationsOf(e, 'conflictsWith')) {
      const key = [e.front.name, other].map((s) => s.toLowerCase()).sort().join('↔')
      if (seen.has(key)) continue
      seen.add(key)
      const counterpart = byName.get(other)
      if (!counterpart) continue // 一方已归档 → 冲突自然消解
      pairs.push({
        a: e.front.name,
        b: other,
        states: [states.get(e.front.name), states.get(other)],
        aFile: e.file,
        bFile: counterpart.file,
      })
    }
  }
  return { pairs, unresolved: pairs.length }
}

/**
 * 阶段 6.3：冲突显式裁决——把「被裁决为过时」的一方标记为 superseded。
 *
 * `resolveConflict(entry, prefer, reason)`：
 *   - prefer 是胜出条目；在 entry（败方）frontmatter 写入 `supersedes: <prefer>`
 *   - 双方历史都保留：败方**不归档、不硬删**，只改 frontmatter 与正文裁决记录
 *   - 记录裁决时间与理由（metadata.resolvedAt / metadata.resolveReason + 正文「解法」段）
 *   - 之后 deriveConfidence 自动把败方降为 stale（supersedes 指向仍存在 → stale）
 *
 * 裁决动作是人类通道（CLI / `/memory` 命令），不过模型写入审批面。
 */
export function resolveConflict(entry, prefer, reason = '') {
  return withMemoryLock(() => {
    ensureRoot()
    if (!entry || !prefer) return { ok: false, problems: [t('用法：resolve <败方条目名> --prefer <胜出条目名> --reason <理由>')] }
    if (String(entry).toLowerCase() === String(prefer).toLowerCase()) {
      return { ok: false, problems: ['败方与胜出方不能是同一条目'] }
    }
    if (!String(reason).trim()) return { ok: false, problems: ['裁决必须给出 --reason（写清为何这一方胜出，供事后追溯）'] }
    let file
    try {
      file = resolveEntryFile(memoryRoot(), entry)
    } catch (error) {
      return { ok: false, problems: [error.message] }
    }
    if (!existsSync(file)) return { ok: false, problems: [t('找不到条目 {0}.md', entry)] }
    let winner
    try {
      winner = resolveEntryFile(memoryRoot(), prefer)
    } catch (error) {
      return { ok: false, problems: [t('胜出方非法：{0}', error.message)] }
    }
    if (!existsSync(winner)) return { ok: false, problems: [t('找不到条目 {0}.md', prefer)] }

    const text = readText(file)
    const parsed = parseEntry(text, `${entry}.md`)
    const today = new Date().toISOString().slice(0, 10)
    const existingSup = listField(parsed.front.supersedes ?? parsed.meta.supersedes)
    const nextSup = [...new Set([...existingSup, String(prefer).toLowerCase()])].join(', ')

    // frontmatter：supersedes 追加；resolvedAt / resolveReason 记录裁决（单行，与 review 同款写法）
    let next = text
    const reasonText = String(reason).trim().replace(/[\r\n]+/g, ' ').slice(0, 200)
    if (/^[ \t]*supersedes:[ \t]*.*$/m.test(next)) {
      next = next.replace(/^([ \t]*)supersedes:[ \t]*.*$/m, `$1supersedes: ${nextSup}`)
    } else {
      next = next.replace(/^(---\r?\n)/, `$1supersedes: ${nextSup}\n`)
    }
    // metadata 块：存在则在块内补键；不存在则在 frontmatter 尾部新建（用块头正则定位，不误伤注释里的 "metadata:"）
    if (/^[ \t]*resolvedAt:/m.test(next)) {
      next = next.replace(/^([ \t]*)resolvedAt:.*$/m, `$1resolvedAt: ${today}`)
    } else if (/^metadata:[ \t]*$/m.test(next)) {
      next = next.replace(/^metadata:[ \t]*$/m, `metadata:\n  resolvedAt: ${today}\n  resolveReason: ${reasonText}`)
    } else {
      const fmHead = /^(---\r?\n)/m.exec(next)
      const rest = fmHead ? next.slice(fmHead[0].length) : next
      const fmEnd = rest.search(/\r?\n---(\r?\n|$)/)
      next = fmEnd >= 0
        ? `${next.slice(0, fmHead[0].length)}metadata:\n  resolvedAt: ${today}\n  resolveReason: ${reasonText}${rest.slice(fmEnd)}`
        : `${next.replace(/\n*$/, '\n')}metadata:\n  resolvedAt: ${today}\n  resolveReason: ${reasonText}\n---\n`
    }
    if (/^[ \t]*resolveReason:/m.test(next)) {
      next = next.replace(/^([ \t]*)resolveReason:.*$/m, `$1resolveReason: ${reasonText}`)
    }
    // 同时在 conflictsWith 中去掉胜出方（冲突已消解，只留 supersedes 取代关系）
    const conflictRaw = parsed.front.conflictsWith ?? parsed.meta.conflictsWith
    if (conflictRaw) {
      const kept = listField(conflictRaw).filter((n) => n !== String(prefer).toLowerCase())
      const line = kept.length ? kept.join(', ') : ''
      if (/^[ \t]*conflictsWith:[ \t]*.*$/m.test(next)) {
        next = line
          ? next.replace(/^([ \t]*)conflictsWith:[ \t]*.*$/m, `$1conflictsWith: ${line}`)
          : next.replace(/^([ \t]*)conflictsWith:[ \t]*.*\r?\n/m, '')
      }
    }

    // 正文：补一行裁决记录（原结论与历史全保留，不覆盖、不删除）
    const verdict = `裁决：${today} 判定「${prefer}」胜出，本条结论过时。理由：${reasonText}。双方历史均保留（本条未删除）。`
    const verdictRe = /^裁决[：:].*$/m
    next = verdictRe.test(next) ? next.replace(verdictRe, verdict) : `${next.replace(/\n*$/, '\n')}\n${verdict}\n`

    writeText(file, next)
    const rendered = writeIndex()
    const after = parseEntry(readText(file), `${entry}.md`)
    const state = deriveConfidence(after).state
    logStat('resolve', { entry, prefer, ok: true })
    return {
      ok: true,
      entry,
      prefer,
      resolvedAt: today,
      reason,
      // 败方仍在库中（未硬删）——stale 由 deriveConfidence 派生
      retained: existsSync(file),
      state,
      file: `${entry}.md`,
      index: rendered,
    }
  })
}

/**
 * 阶段 6.2：合议包升级——检索命中 + related/causedBy/fixedBy 邻居，
 * 按可信度分层、附证据与冲突警告、标出共同根因、给出预算内阅读顺序。
 *
 * 铁律：本函数**只组证据包，不生成最终答案**——综合仍交给读它的模型，
 * 并且提示引用事发证据优先（方案 §2.2 读取面）。
 */
/** 可信度分层权重：verified 置顶，stale/disputed 沉底（同层内保持检索得分顺序）。 */
const GATHER_TIER = { verified: 0, provisional: 1, 'needs-review': 2, stale: 3, disputed: 4 }

export function gatherPack(query, budget = 8192) {
  const all = listEntries()
  const byName = new Map(all.map((e) => [e.front.name, e]))
  const picked = []
  const seen = new Set()
  const push = (entry) => {
    if (entry && !seen.has(entry.front.name)) { seen.add(entry.front.name); picked.push(entry) }
  }
  for (const { entry } of searchEntries(query, 3)) {
    push(entry)
    // 邻居：普通关联 + 因果（阶段 6.1 新增 causedBy/fixedBy）
    for (const field of ['related', 'causedBy', 'fixedBy']) {
      for (const r of relationsOf(entry, field)) push(byName.get(r))
    }
  }
  // 根因补全：识别「共同根因」必须看到同一根因的多个表现——
  // 只要包里有任一表现，就把它同根因的兄弟一并拉入（否则 top-N 截断会让聚合空转）。
  if (picked.length) {
    const causes = new Set()
    for (const e of picked) {
      for (const c of relationsOf(e, 'causedBy')) causes.add(c)
      for (const f of relationsOf(e, 'fixedBy')) causes.add(f)
    }
    if (causes.size) {
      for (const cand of all) {
        const linked = [...relationsOf(cand, 'causedBy'), ...relationsOf(cand, 'fixedBy')]
        if (linked.some((c) => causes.has(c))) push(cand)
      }
    }
  }
  if (!picked.length) return `# 合议包：${query}\n\n没有命中。换 2~3 组词再搜，或用 mem_save 记下新线索。\n`

  // ① 按可信度分层（verified 置顶；stale/disputed 沉底），同层内保持检索顺序
  const scored = picked.map((entry) => ({ entry, conf: deriveConfidence(entry) }))
  scored.sort((a, b) => (GATHER_TIER[a.conf.state] ?? 1) - (GATHER_TIER[b.conf.state] ?? 1))
  const ordered = scored.map((s) => s.entry)

  // ② 冲突警告：包内条目互相冲突，或与库内其他条目冲突
  const conflictsOf = (entry) => {
    const out = []
    for (const other of relationsOf(entry, 'conflictsWith')) {
      if (byName.has(other) || all.some((e) => e.front.name === other)) out.push(other)
    }
    return out
  }

  // ③ 共同根因：包内多条指向同一 causedBy
  const causeGroups = groupByCause(ordered)

  const head = [
    `# 合议包：${query}`,
    '',
    '> 只提供证据，不含结论——综合回答由读它的模型完成，引用事发证据优先。',
    '',
    `## 建议阅读顺序（${ordered.length} 条，已按可信度分层）`,
  ]
  ordered.forEach((e, i) => {
    const c = deriveConfidence(e)
    const flag = ['stale', 'disputed', 'needs-review'].includes(c.state) ? ` [${c.state}]` : ''
    head.push(`${i + 1}. ${e.front.name}${flag} — ${e.front.description ?? ''}`)
  })
  if (causeGroups.length) {
    head.push('', '## 共同根因（经 causedBy / fixedBy 聚合）')
    for (const g of causeGroups) head.push(`- ${g.target}：${g.members.join('、')}`)
  }
  const anyConflict = ordered.some((e) => conflictsOf(e).length)
  if (anyConflict) {
    head.push('', '## ⚠ 冲突警告')
    for (const e of ordered) {
      const cs = conflictsOf(e)
      if (cs.length) head.push(`- ${e.front.name} ↔ ${cs.join('、')} —— 先 /memory resolve 裁决再引用，勿两说并用`)
    }
  }
  head.push('', '## 证据条目')

  const parts = [`${head.join('\n')}\n`]
  let bytes = Buffer.byteLength(parts[0], 'utf8')
  let used = 0
  for (const e of ordered) {
    const c = deriveConfidence(e)
    const verify = extractSection(e.body, '验证')
    const refs = verify ? (verify.match(LOCATABLE_REF_RE) ?? []).slice(0, 3) : []
    const cs = conflictsOf(e)
    const meta = [
      `[${used + 1}] ${e.front.name} — ${e.front.description ?? ''}（${e.file}）`,
      `    可信度 ${c.confidence}｜状态 ${c.state}${c.ageDays !== null ? `｜verified 距今 ${c.ageDays} 天` : ''}`,
      refs.length ? `    证据：${refs.join(' ')}` : '    证据：（验证段无可定位引用——可信度受限）',
    ]
    if (cs.length) meta.push(`    ⚠ 与 ${cs.join('、')} 冲突（未裁决）`)
    const caused = relationsOf(e, 'causedBy')
    if (caused.length) meta.push(`    因 → ${caused.join('、')}`)
    const fixed = relationsOf(e, 'fixedBy')
    if (fixed.length) meta.push(`    由…修复 → ${fixed.join('、')}`)
    const block = `\n---\n${meta.join('\n')}\n\n${e.body}\n`
    const b = Buffer.byteLength(block, 'utf8')
    if (bytes + b > budget) {
      parts.push(`\n---\n（预算 ${budget} B 已满，余 ${ordered.length - used} 条未收录——单独 show 查看）`)
      break
    }
    parts.push(block)
    bytes += b
    used += 1
  }
  parts.push(`\n---\n（本包 ${used}/${ordered.length} 条｜证据包而非答案：裁决冲突用 /memory resolve，全图用 mem map）\n`)
  return parts.join('')
}

/* ── 检索 ───────────────────────────────────────────────── */

/** P0-3：中文 n-gram（纯 JS 零依赖）——bigram 强命中 / ≥2 个不同单字弱命中兜底 */
function cjkRuns(text) {
  return String(text ?? '').match(/[\u4e00-\u9fff]+/g) ?? []
}

export function cjkNgrams(query) {
  const grams = new Set()
  const chars = new Set()
  for (const run of cjkRuns(query)) {
    for (const ch of run) chars.add(ch)
    for (let i = 0; i + 2 <= run.length; i++) grams.add(run.slice(i, i + 2))
  }
  return { bigrams: [...grams], unigrams: [...chars] }
}

/** P2-C④ 跨目录全局库：scope:global 条目的跨工作区镜像（~/.memory-global，env 可覆盖） */
export function globalRoot() {
  return process.env.DSH_MEMORY_GLOBAL_DIR ?? join(homedir(), '.memory-global')
}
/** @deprecated 使用 globalRoot()。 */
export const GLOBAL_ROOT = join(homedir(), '.memory-global')

function globalEntries() {
  const root = globalRoot()
  if (!existsSync(root)) return []
  const localNames = new Set(entryFiles().map((f) => f.replace(/\.md$/, '')))
  return readdirSync(root)
    .filter((f) => f.endsWith('.md') && !localNames.has(f.replace(/\.md$/, '')))
    .sort()
    .map((f) => {
      const e = parseEntry(readText(join(root, f)), f)
      e.fromGlobal = true
      return e
    })
}

/** P2-C④：把 scope:global 条目镜像到全局库（供其他工作区/目录检索；本地优先去重） */
export function globalSync() {
  return withMemoryLock(() => globalSyncLocked())
}

function globalSyncLocked() {
  ensureRoot()
  const root = globalRoot()
  if (!existsSync(root)) mkdirSync(root, { recursive: true })
  const copied = []
  for (const e of listEntries()) {
    if ((e.meta.scope ?? '') !== 'global' || e.problems.length) continue
    writeFileSync(join(root, e.file), readText(join(memoryRoot(), e.file)), 'utf8')
    copied.push(e.file)
  }
  // keyed sync：只清理由当前工作区创建、且当前 scope:global 集合已不存在的镜像。
  const keep = new Set(copied)
  const removed = []
  for (const f of readdirSync(root).filter((x) => x.endsWith('.md'))) {
    if (keep.has(f)) continue
    const mirror = parseEntry(readText(join(root, f)), f)
    const owner = mirror.meta.sourceWorkspace ?? mirror.front.sourceWorkspace
    if (owner && owner !== resolve(HERE, '..')) continue
    unlinkSync(join(root, f)); removed.push(f)
  }
  return { ok: true, root, copied, removed }
}

/** frontmatter 列表字段：aliases/keywords（逗号分隔）→ 小写数组 */
function listField(value) {
  return String(value ?? '').split(/[,，、]/).map((s) => s.trim().toLowerCase()).filter(Boolean)
}

/** 命中片段：第一个命中词前后 ±30 字符 */
function makeSnippet(body, terms) {
  const s = String(body ?? '')
  const low = s.toLowerCase()
  let at = -1
  for (const t of terms) {
    const i = low.indexOf(t)
    if (i >= 0 && (at < 0 || i < at)) at = i
  }
  if (at < 0) return ''
  const start = Math.max(0, at - 30)
  return (start > 0 ? '…' : '') + s.slice(start, at + 30).replace(/\s+/g, ' ') + '…'
}

export function searchEntries(query, limit = 10, { rerank = false } = {}) {
  const q = String(query ?? '').trim().toLowerCase()
  if (!q) return []
  const entries = [...listEntries(), ...globalEntries()]
  const N = Math.max(entries.length, 1)
  const tokens = [q, ...q.split(/\s+/).filter((t) => t.length > 1)]
  const { bigrams, unigrams } = cjkNgrams(q)
  const termSet = new Set([...tokens, ...bigrams])
  // 三路语料视图：题名区（name/description/aliases/keywords）与全文分开，题名命中加权
  const parsed = entries.map((entry) => {
    const body = String(entry.body ?? '').toLowerCase()
    const head = [
      entry.front.name ?? '', entry.front.description ?? '',
      entry.front.aliases ?? entry.meta.aliases ?? '', entry.front.keywords ?? entry.meta.keywords ?? '',
    ].join('\n').toLowerCase()
    const all = `${head}\n${entry.meta.type ?? ''}\n${entry.meta.scope ?? ''}\n${body}`
    return { entry, body, head, all }
  })
  // IDF 加权（P2-A①）：稀有词命中 > 泛词命中——修「启动」类泛词噪音
  const df = new Map()
  for (const t of termSet) df.set(t, parsed.filter((p) => p.all.includes(t)).length)
  const idf = (t) => Math.log(1 + N / (1 + (df.get(t) ?? 0)))
  const scored = []
  for (const p of parsed) {
    let score = 0
    if (p.all.includes(q)) score += 8 + 2 * idf(q)
    for (const t of tokens) {
      if (t !== q && p.all.includes(t)) score += 3 * (1 + idf(t) / 3)
    }
    // 题名/别名路加权（题名即语义；aliases 命中 = 同义词路）
    for (const t of termSet) if (p.head.includes(t)) score += 1.5 * (1 + idf(t) / 3)
    // 中文 gram 路（半词兜底）：命中保底 1 分、稀有 gram 加成封顶 2——真实命中恒在弱命中之上
    let gramHits = 0
    let gramScore = 0
    for (const g of bigrams) {
      if (p.all.includes(g)) { gramHits += 1; gramScore += 1 + Math.min(idf(g), 2) }
    }
    if (bigrams.length && gramHits === bigrams.length) score += gramScore + 3
    else score += gramScore
    // 单字弱命中：恒 0.5 垫底，永不压过真实命中
    const uniHits = unigrams.filter((ch) => p.all.includes(ch)).length
    const weak = score === 0 && unigrams.length >= 2 && uniHits >= 2
    if (weak) score = 0.5
    if (score > 0) {
      scored.push({ entry: p.entry, score, weak, snippet: makeSnippet(p.entry.body, [...termSet]) })
    }
  }
  scored.sort((a, b) => b.score - a.score || a.entry.file.localeCompare(b.entry.file))
  // 自审 🟡6：弱命中最多垫 3 条（防尾部噪音），真实命中永远优先占位
  const trimmed = []
  let weakKept = 0
  for (const r of scored) {
    if (trimmed.length >= limit) break
    if (r.weak) { if (weakKept >= 3) continue; weakKept += 1 }
    trimmed.push(r)
  }
  if (!rerank) return trimmed
  return rerankResults(trimmed, query, limit)
}

/**
 * 阶段 B 重排（阶段 5）：在 IDF 候选集之上叠加信号，
 * 让「可信、新鲜、被采用过」的条目排前，过期/被拒的降权。
 * 纯本地计算，不调模型、不调向量。
 */
export function rerankResults(candidates, query, limit = 10) {
  const feedback = recallFeedbackSummary()
  const now = Date.now()
  const enriched = candidates.map((r) => {
    const entry = r.entry
    const conf = deriveConfidence(entry)
    let boost = 0
    // 可信度：verified +1.5、provisional 0、needs-review -0.5、stale -1.5、disputed -2
    if (conf.confidence === 'verified') boost += 1.5
    if (conf.state === 'needs-review') boost -= 0.5
    if (conf.state === 'stale') boost -= 1.5
    if (conf.state === 'disputed') boost -= 2
    // 新鲜度：90 天内 +0.5，越旧越少（封顶 -0.5）
    const created = entry.meta.created ?? entry.meta.verified
    if (created && Number.isFinite(Date.parse(created))) {
      const age = (now - Date.parse(created)) / 86_400_000
      boost += age <= 90 ? 0.5 : Math.max(-0.5, 0.5 - (age - 90) / 365)
    }
    // 反馈闭环：历史被采用 +1/次（封顶 +2），历史被拒 -0.5/次（封顶 -2）
    const fb = feedback.get(entry.front.name)
    if (fb) {
      boost += Math.min(fb.adopted * 1, 2)
      boost -= Math.min(fb.rejected * 0.5, 2)
    }
    return { ...r, score: r.score + boost, confidence: conf.confidence, state: conf.state, why: r.why ?? describeWhy(r, query) }
  })
  enriched.sort((a, b) => b.score - a.score || a.entry.file.localeCompare(b.entry.file))
  return enriched.slice(0, limit)
}

/** 生成召回理由（阶段 5 可解释输出）：命中词 + 置信度。 */
function describeWhy(r, query) {
  const terms = []
  const body = String(r.entry.body ?? '').toLowerCase()
  for (const t of String(query ?? '').toLowerCase().split(/\s+/).filter(Boolean)) {
    if (body.includes(t)) terms.push(t)
  }
  const conf = r.confidence ? `|${r.confidence}` : ''
  return terms.length ? `${terms.slice(0, 4).join(',')}${conf}` : conf.replace(/^\|/, '')
}

/**
 * 两阶段召回（阶段 5 主入口）：候选集 → 重排 → 前 N。
 * 返回每条带 score/confidence/state/why，供 formatRecall 渲染证据包。
 */
export function recallTwoStage(query, limit = 5, { candidatePool = 30 } = {}) {
  const pool = searchEntries(query, Math.max(candidatePool, limit), { rerank: false })
  const reranked = rerankResults(pool, query, limit)
  // 注入审计：记录入选与淘汰
  const included = reranked.map((r) => r.entry.front.name)
  const dropped = pool.filter((r) => !included.includes(r.entry.front.name)).map((r) => r.entry.front.name)
  logInjectionAudit({ included, dropped, bytes: 0, budget: LIMITS.indexBytes })
  // 召回埋点（保留原 search 语义，便于 stats 命中率统计）
  logStat('search', { query: String(query ?? '').slice(0, 120), hits: reranked.length, mode: 'two-stage' })
  return reranked
}

/* ── 可信度与生命周期（阶段 4）──────────────────────────── */

/**
 * 生命周期状态（派生，不改写 frontmatter）：
 *  draft      —— 在 drafts/，未入库
 *  provisional—— 已入库但未经人工批准/证据不足
 *  verified   —— 人工批准或有可定位证据，且在复核期内
 *  needs-review —— 超过 staleDays 未复核
 *  stale      —— 被标记 superseded 或 review 已过期很久
 *  disputed   —— conflictsWith 指向仍存在的条目
 *  archived   —— 在 archive/
 */
export const LIFECYCLE_STATES = ['draft', 'provisional', 'verified', 'needs-review', 'stale', 'disputed', 'archived']

/**
 * 派生一条条目的可信度与生命周期状态。
 * 规则（fail-safe：拿不准一律降级）：
 *  - 缺证据引用或 source=auto 且未经批准 → provisional
 *  - 有可定位证据 + 在复核期内 + 无冲突 → verified
 *  - 超 staleDays 未复核 → needs-review
 *  - conflictsWith 仍存在 → disputed（覆盖 verified）
 *  - superseded 或 review 过期 > staleDays → stale
 */
export function deriveConfidence(entry) {
  const now = Date.now()
  const problems = entry.problems ?? []
  const verifySection = extractSection(entry.body, '验证')
  const hasEvidence = verifySection !== null && hasLocatableRef(verifySection)
  const source = entry.meta.source ?? entry.front.source ?? 'manual'
  const review = entry.front.review ?? entry.meta.review
  const verified = entry.meta.verified || entry.meta.created

  let confidence = hasEvidence ? 'verified' : 'provisional'
  if (source === 'auto' && entry.meta.approved !== true) confidence = 'provisional'
  if (problems.length) confidence = 'provisional'

  let ageDays = Infinity
  if (verified && Number.isFinite(Date.parse(verified))) {
    ageDays = (now - Date.parse(verified)) / 86_400_000
  }
  if (ageDays > LIMITS.staleDays && confidence === 'verified') confidence = 'stale'

  let state = confidence === 'verified' ? 'verified' : 'provisional'
  if (ageDays > LIMITS.staleDays && state === 'verified') state = 'needs-review'
  if (review && Number.isFinite(Date.parse(review)) && Date.parse(review) <= now) {
    state = state === 'verified' ? 'needs-review' : state
    if ((now - Date.parse(review)) / 86_400_000 > LIMITS.staleDays) state = 'stale'
  }

  // 冲突：conflictsWith 指向的条目仍存在 → disputed
  const conflictNames = listField(entry.front.conflictsWith ?? entry.meta.conflictsWith)
  if (conflictNames.length) {
    const existing = new Set(listEntries().map((e) => e.front.name))
    if (conflictNames.some((n) => existing.has(n))) state = 'disputed'
  }
  // 被取代：superseded 指向存在 → stale
  const supNames = listField(entry.front.supersedes ?? entry.meta.supersedes)
  if (supNames.length) {
    const existing = new Set(listEntries().map((e) => e.front.name))
    if (supNames.some((n) => existing.has(n))) state = 'stale'
  }
  return { confidence, state, ageDays: Number.isFinite(ageDays) ? Math.round(ageDays) : null }
}

/**
 * 可验证记忆：按 entry.meta.verification.recipe 执行**只读/白名单**检查。
 * 绝不执行任意 shell——只支持三种内置 kind：
 *  - file-exists     ：路径存在（相对 memoryRoot 或绝对）
 *  - section-exists  ：条目正文含指定段落
 *  - command         ：仅允许白名单内的只读命令（当前仅 `node --check` 与 `git status`）
 * 执行结果写回 `lastChecked`，失败只降级不删除。
 */
const SAFE_COMMANDS = [/^node\s+--check\s+[\w./\\-]+\.mjs$/, /^git\s+status\s+--porcelain$/]

export function verifyEntry(entry) {
  const recipe = entry.meta.verification ?? entry.front.verification
  if (!recipe || !recipe.kind) {
    return { ok: true, skipped: true, reason: 'no verification recipe' }
  }
  const today = new Date().toISOString().slice(0, 10)
  try {
    if (recipe.kind === 'file-exists') {
      const p = recipe.path
      const abs = p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p) ? p : join(memoryRoot(), p)
      return existsSync(abs)
        ? { ok: true, checkedAt: today, detail: `file exists: ${p}` }
        : { ok: false, checkedAt: today, detail: `file missing: ${p}` }
    }
    if (recipe.kind === 'section-exists') {
      const label = String(recipe.section ?? '')
      const hit = extractSection(entry.body, label) !== null
      return hit
        ? { ok: true, checkedAt: today, detail: `section present: ${label}` }
        : { ok: false, checkedAt: today, detail: `section missing: ${label}` }
    }
    if (recipe.kind === 'command') {
      const cmd = String(recipe.command ?? '')
      if (!SAFE_COMMANDS.some((re) => re.test(cmd))) {
        return { ok: false, checkedAt: today, detail: `command not in whitelist: ${cmd}` }
      }
      // 白名单命令均为只读；用 spawnSync 有界执行
      const r = spawnSync(cmd, { shell: true, encoding: 'utf8', timeout: 5000, cwd: memoryRoot() })
      return r.status === 0
        ? { ok: true, checkedAt: today, detail: `command ok: ${cmd}` }
        : { ok: false, checkedAt: today, detail: `command failed(${r.status}): ${cmd}` }
    }
    return { ok: false, checkedAt: today, detail: `unknown verification kind: ${recipe.kind}` }
  } catch (error) {
    return { ok: false, checkedAt: today, detail: `verification error: ${String(error?.message ?? error)}` }
  }
}

/**
 * 执行验证并把结果写回条目 frontmatter（`metadata.lastChecked` / `metadata.lastCheckOk`）。
 * `name` 为空则验证全部带 recipe 的条目。返回逐条结果。
 */
export function verifyEntries(name = '') {
  const targets = name
    ? listEntries().filter((e) => e.front.name === name)
    : listEntries().filter((e) => (e.meta.verification ?? e.front.verification)?.kind)
  const results = []
  for (const entry of targets) {
    const r = verifyEntry(entry)
    results.push({ name: entry.front.name, ...r })
    if (r.skipped) continue
    try {
      const path = resolveEntryFile(memoryRoot(), entry.front.name)
      let text = readText(path)
      if (/^\s*lastChecked:\s*.*$/m.test(text)) text = text.replace(/^(\s*)lastChecked:\s*.*$/m, `$1lastChecked: ${r.checkedAt}`)
      else text = text.replace(/^(metadata:\s*)$/m, `$1\n  lastChecked: ${r.checkedAt}`)
      if (/^\s*lastCheckOk:\s*.*$/m.test(text)) text = text.replace(/^(\s*)lastCheckOk:\s*.*$/m, `$1lastCheckOk: ${r.ok}`)
      else text = text.replace(/^(metadata:\s*)$/m, `$1\n  lastCheckOk: ${r.ok}`)
      writeText(path, text)
    } catch { /* 写回失败不阻塞报告 */ }
    logStat('verify', { name: entry.front.name, ok: r.ok })
  }
  return results
}

/* ── 体检 ───────────────────────────────────────────────── */

export function doctorReport() {
  const entries = listEntries()
  const findings = []
  const notes = []
  const notIndexed = []
  const indexText = existsSync(indexFile()) ? readText(indexFile()) : null
  const indexBytes = indexText === null ? 0 : Buffer.byteLength(indexText, 'utf8')
  const indexLines = indexText === null ? 0 : indexText.split('\n').filter((l) => l.startsWith('- [')).length
  if (indexText === null) findings.push(t('索引 MEMORY.md 不存在（先跑 index 生成）'))
  else {
    if (indexLines > LIMITS.indexLines) findings.push(t('索引 {0} 行 > 上限 {1}', indexLines, LIMITS.indexLines))
    if (indexBytes > LIMITS.indexBytes) findings.push(t('索引 {0} 字节 > 上限 {1}', indexBytes, LIMITS.indexBytes))
  }
  if (entries.length > LIMITS.entries) findings.push(t('条目 {0} > 上限 {1}', entries.length, LIMITS.entries))
  const now = Date.now()
  const hashes = new Map()
  const indexed = new Set()
  if (indexText) {
    for (const m of indexText.matchAll(/\]\(([^)]+\.md)\)/g)) indexed.add(m[1])
  }
  for (const entry of entries) {
    const bytes = Buffer.byteLength(readText(join(memoryRoot(), entry.file)), 'utf8')
    if (bytes > LIMITS.entryBytes) findings.push(t('{0} 超长（{1} 字节）', entry.file, bytes))
    for (const p of entry.problems) findings.push(`${entry.file}: ${p}`)
    const hash = normHash(entry)
    if (hashes.has(hash)) findings.push(t('{0} 与 {1} 正文重复', entry.file, hashes.get(hash)))
    else hashes.set(hash, entry.file)
    if (!indexed.has(entry.file)) notIndexed.push(entry.file)
    // 证据链提示（存量条目只提示不判错；新写入在 store 阶段已强制）
    const verifySection = extractSection(entry.body, '验证')
    if (verifySection !== null && !hasLocatableRef(verifySection)) {
      notes.push(t('{0}: 「验证」段无可定位引用', entry.file))
    }
    const stamp = entry.meta.verified || entry.meta.created
    if (stamp) {
      const age = (now - Date.parse(stamp)) / 86_400_000
      if (Number.isFinite(age) && age > LIMITS.staleDays) {
        findings.push(t('{0} 已 {1} 天未复核（verified={2}）', entry.file, Math.round(age), stamp))
      }
    } else findings.push(t('{0} 缺 metadata.created/verified，无法判断时效', entry.file))
    // P0-5：review 到期提示（不判错）
    const review = entry.front.review ?? entry.meta.review
    if (review && Number.isFinite(Date.parse(review)) && Date.parse(review) <= now) {
      notes.push(t('{0}: review 到期（{1}）—— 跑 mem review {2} 刷新', entry.file, review, entry.front.name))
    }
  }
  for (const file of indexed) if (!existsSync(join(memoryRoot(), file))) findings.push(t('索引引用了不存在的文件 {0}', file))
  // P2-A⑤ 清账：文档计数一致性（治「每入库一条三份文档计数漂移」）
  // MEM_COUNT_DOC：相对**仓库根**（本文件所在 tools/ 的上一级）解析，不是进程 cwd —— 阶段 7.1 口径修正。
  const repoRoot = join(HERE, '..')
  const statusDoc = process.env.MEM_COUNT_DOC
    ? resolve(repoRoot, process.env.MEM_COUNT_DOC)
    : join(repoRoot, '跨会话记忆系统-完整状态与计划.md')
  if (existsSync(statusDoc)) {
    const docText = readText(statusDoc)
    // 中文格式「当前条目清单（N 条）」与英文格式「entries (N)」都认（发行版文档是英文）
    const m = /当前条目清单（(\d+) 条）/.exec(docText) ?? /entries\s*\((\d+)\)/.exec(docText)
    if (m && Number(m[1]) !== entries.length) {
      notes.push(t('文档计数漂移：状态文档写 {0} 条，实际 {1} 条 —— 需同步', m[1], entries.length))
    }
  }
  // MEM_CARRIERS：额外约定载体，`相对仓库根/文件::关键词`，多条用 `;` 分隔。
  // 缺文件或缺关键词都记 note（信息级，不影响 doctor 退出码）。
  for (const spec of String(process.env.MEM_CARRIERS ?? '').split(';').map((s) => s.trim()).filter(Boolean)) {
    const sepAt = spec.indexOf('::')
    const relPath = sepAt > 0 ? spec.slice(0, sepAt) : ''
    const keyword = sepAt > 0 ? spec.slice(sepAt + 2) : ''
    if (!relPath || !keyword) {
      notes.push(t('MEM_CARRIERS 条目格式非法（应为 相对路径::关键词）：{0}', spec))
      continue
    }
    const carrier = resolve(repoRoot, relPath)
    if (!existsSync(carrier)) notes.push(t('MEM_CARRIERS 载体不存在：{0}', relPath))
    else if (!readText(carrier).includes(keyword)) notes.push(t('MEM_CARRIERS 载体 {0} 缺「{1}」——约定文本被改歪', relPath, keyword))
  }
  // P2-C③ 载体一致性：注入段 vs MEMORY.md（过期即提示 resync）+ 三处约定载体存在性
  const agentsPath = agentsFilePath()
  if (existsSync(agentsPath)) {
    const agentsText = readText(agentsPath)
    const bi = agentsText.indexOf(INJECT_BEGIN)
    const ei = agentsText.indexOf(INJECT_END)
    if (bi < 0 || ei < bi) {
      notes.push(t('AGENTS.md 无注入段——跑 mem inject 启用自动注入（当前为降级态：指针约定）'))
    } else {
      // 比对基准 = inject 实际会写入的内容（renderInjectionBody 单一基准，含链接前缀与预算核算）
      const expectBody = renderInjectionBody().body
      const blockNames = new Set([...agentsText.slice(bi, ei).matchAll(/\]\(([^)]+\.md)\)/g)].map((m) => m[1].replace(/^\.memory\//, '')))
      const expectNames = new Set([...expectBody.matchAll(/\]\(([^)]+\.md)\)/g)].map((m) => m[1].replace(/^\.memory\//, '')))
      const diff = [...expectNames].filter((n) => !blockNames.has(n)).length
        + [...blockNames].filter((n) => !expectNames.has(n)).length
      if (diff > 0) notes.push(t('AGENTS.md 注入段与索引不同步（差异 {0} 处）—— 跑 mem inject', diff))
    }
    if (!agentsText.includes('跨会话记忆')) notes.push(t('AGENTS.md 缺「跨会话记忆」约定段——载体被改歪'))
  }
  for (const [file, key] of [
    [join(HERE, '..', 'DSH-自我交接文档-2026-09-06.md'), '跨会话记忆'],
    [join(HERE, '..', '跨会话记忆-总结与复装.md'), '教训本'],
  ]) {
    if (existsSync(file) && !readText(file).includes(key)) notes.push(t('载体 {0} 缺「{1}」——约定文本被改歪', file, key))
  }
  // P0-6：近重复对 top5（只提示不判错）
  const nearPairs = []
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const sim = jaccard3(entries[i].body, entries[j].body)
      if (sim >= 0.5) nearPairs.push({ pair: `${entries[i].file} ↔ ${entries[j].file}`, sim })
    }
  }
  nearPairs.sort((a, b) => b.sim - a.sim)
  for (const { pair, sim } of nearPairs.slice(0, 5)) notes.push(t('近重复对 {0}（相似度 {1}）', pair, sim.toFixed(2)))

  // 阶段 4：可信度/生命周期汇总
  const confidenceSummary = { verified: 0, provisional: 0, 'needs-review': 0, stale: 0, disputed: 0 }
  const stateSummary = {}
  for (const e of entries) {
    const c = deriveConfidence(e)
    confidenceSummary[c.confidence] = (confidenceSummary[c.confidence] ?? 0) + 1
    stateSummary[c.state] = (stateSummary[c.state] ?? 0) + 1
    if (c.state === 'disputed') notes.push(t('{0}: 与其他条目冲突（disputed）—— 跑 mem conflicts 查看冲突对，mem resolve 裁决', e.file))
    if (c.state === 'stale' && c.ageDays !== null) notes.push(t('{0}: 可能过期（stale，verified 距今 {1} 天）', e.file, c.ageDays))
  }

  return {
    entries: entries.length, indexBytes, indexLines, notIndexed, findings, notes,
    nearPairs: nearPairs.length, stats: statsSummary(),
    writeMode: getWriteMode(), confidenceSummary, stateSummary,
  }
}

/**
 * 可解释召回：说明一条条目为何被召回/它当前是否可信。
 * 返回结构化文本，供 CLI 与插件 /memory explain 复用。
 */
export function explainEntry(name) {
  const entries = listEntries()
  const entry = entries.find((e) => e.front.name === name)
  if (!entry) {
    const global = globalRoot()
    const gfile = join(global, `${name}.md`)
    const g = existsSync(gfile) ? parseEntry(readText(gfile), `${name}.md`) : null
    if (!g || !g.front.name) return { ok: false, problems: [t('找不到条目 {0}', name)] }
    return formatExplanation(g, { fromGlobal: true })
  }
  return formatExplanation(entry, {})
}

function formatExplanation(entry, { fromGlobal = false } = {}) {
  const c = deriveConfidence(entry)
  const verifySection = extractSection(entry.body, '验证')
  const evidence = verifySection ? (verifySection.match(LOCATABLE_REF_RE) ?? []).slice(0, 3) : []
  const conflicts = relationsOf(entry, 'conflictsWith')
  const supersedes = relationsOf(entry, 'supersedes')
  const related = relationsOf(entry, 'related')
  const appliesTo = relationsOf(entry, 'appliesTo')
  const causedBy = relationsOf(entry, 'causedBy')
  const fixedBy = relationsOf(entry, 'fixedBy')
  const lines = [
    `# explain: ${entry.front.name}`,
    `- ${t('文件')}：${fromGlobal ? `(global) ${entry.file}` : entry.file}`,
    `- ${t('描述')}：${entry.front.description ?? ''}`,
    `- ${t('可信度')}：${c.confidence}｜${t('状态')}：${c.state}${c.ageDays !== null ? `｜${t('verified 距今 {0} 天', c.ageDays)}` : ''}`,
    `- ${t('来源')}：${entry.meta.source ?? entry.front.source ?? 'manual'}｜scope：${entry.meta.scope ?? entry.front.scope ?? '?'}`,
    `- ${t('复核')}：${entry.front.review ?? entry.meta.review ?? '—'}`,
  ]
  if (appliesTo.length) lines.push(`- ${t('适用于')}：${appliesTo.join(sepList())}`)
  if (evidence.length) lines.push(`- ${t('证据')}：${evidence.join(' ')}`)
  else lines.push(`- ${t('证据')}：${t('（验证段无可定位引用——可信度受限）')}`)
  if (conflicts.length) lines.push(`- ${t('冲突')}：${conflicts.join(sepList())}`)
  if (supersedes.length) lines.push(`- ${t('取代')}：${supersedes.join(sepList())}`)
  if (causedBy.length) lines.push(`- ${t('因')}：${causedBy.join(sepList())}`)
  if (fixedBy.length) lines.push(`- ${t('由…修复')}：${fixedBy.join(sepList())}`)
  if (related.length) lines.push(`- ${t('关联')}：${related.join(sepList())}`)
  if (entry.problems.length) lines.push(`- ${t('问题')}：${entry.problems.join(currentLang() === 'en' ? '; ' : '；')}`)
  if (c.state === 'stale' || c.state === 'needs-review') {
    lines.push(t('建议：先 `mem review <name>` 复核再引用'))
  }
  if (c.state === 'disputed') {
    lines.push(t('建议：显式裁决二选一（双方历史都保留）：mem resolve <本条> --prefer <胜出方> --reason <理由>；或 /memory conflicts 查看全部冲突对'))
  }
  return { ok: true, text: lines.join('\n'), confidence: c.confidence, state: c.state }
}

/* ── CLI ────────────────────────────────────────────────── */

function print(text = '') { process.stdout.write(text + '\n') }

function usage() {
  print(t('mem.mjs —— 工作区记忆库（根目录：{0}）', memoryRoot()))
  print('  index | inject | list | search <q> [limit] | show <name> | store <file.md|-> [--overwrite] [--force]')
  print('  forget <name> | review <name> | draft [topic] | drafts | approve <draft> | reject <draft> [reason]')
  print(t('  write-mode [approval|auto-draft|auto-low-risk|off] | explain <name> | verify [name] | search <q> [n] [--two-stage] | feedback <q> <采用,逗号> [原因] | map [name] | gather <q> [budget] | conflicts | resolve <败方> --prefer <胜方> --reason <理由> | global-sync | stats [days] | doctor'))
  print(t('  当前写入模式：{0}', getWriteMode()))
}

function main(argv) {
  const [cmd, ...rest] = argv
  switch (cmd) {
    case 'index': {
      ensureRoot()
      const rendered = writeIndex()
      print(rendered.text)
      print(`[index] 列出 ${rendered.listed} 条，跳过 ${rendered.skippedForBudget} 条，${rendered.bytes} 字节`)
      autoInject()
      return 0
    }
    case 'list': {
      const entries = listEntries()
      if (!entries.length) { print('（暂无条目）'); return 0 }
      for (const e of entries) {
        const flag = e.problems.length ? ` ⚠ ${e.problems.length} 处问题` : ''
        print(`- ${e.front.name} [${e.meta.type ?? '?'}/${e.meta.scope ?? '?'}] ${e.front.description ?? ''}${flag}`)
      }
      print(`共 ${entries.length} 条`)
      return 0
    }
    case 'search': {
      const useTwoStage = rest.includes('--two-stage')
      const args = rest.filter((a) => a !== '--two-stage')
      const limit = args[1] ? Number(args[1]) : 10
      const results = useTwoStage
        ? recallTwoStage(args[0], limit)
        : searchEntries(args[0], limit)
      if (!useTwoStage) logStat('search', { query: args[0] ?? '', hits: results.length })
      if (!results.length) { print(`没有命中：${args[0] ?? ''}`); return 0 }
      for (const r of results) {
        const { entry, score, weak, snippet } = r
        const badge = r.state ? ` [${r.state}]` : ''
        print(`[${Number(score).toFixed(1)}${weak ? ' 弱命中' : ''}${entry.fromGlobal ? ' 全局库' : ''}${badge}] ${entry.front.name} — ${entry.front.description ?? ''}`)
        if (r.why) print(`     为何召回：${r.why}`)
        print(`     文件 ${entry.file}｜type=${entry.meta.type ?? '?'} scope=${entry.meta.scope ?? '?'}`)
        if (snippet) print(`     片段 ${snippet}`)
      }
      if (useTwoStage) print('  （两阶段召回：IDF 候选 → 可信度/新鲜度/反馈重排）')
      return 0
    }
    case 'feedback': {
      // feedback <query> <adopted-name,...> [reason]
      const [q, adoptedCsv, ...reasonParts] = rest
      if (!q) { print(t('用法：feedback <query> <采用的条目名,逗号分隔> [原因]')); return 2 }
      const adopted = (adoptedCsv ?? '').split(/[,，、]/).map((s) => s.trim()).filter(Boolean)
      logRecallFeedback(q, adopted, adopted, reasonParts.join(' '))
      print(`[已记录反馈] query=${q} 采用 ${adopted.length} 条`)
      return 0
    }
    case 'show': {
      const name = rest[0]
      const local = resolveEntryFile(memoryRoot(), name)
      const inGlobal = resolveEntryFile(globalRoot(), name)
      const file = existsSync(local) ? local : (name && existsSync(inGlobal) ? inGlobal : null)
      if (!file) { print(`找不到条目：${name ?? '(缺 name)'}`); return 1 }
      logStat('show', { name })
      print(readText(file))
      return 0
    }
    case 'store': {
      const src = rest[0]
      const overwrite = rest.includes('--overwrite')
      const force = rest.includes('--force')
      const source = rest.includes('--model') ? 'model' : 'human'
      if (!src) { print(t('用法：store <file.md|-> [--overwrite] [--force] [--model]')); return 2 }
      const text = src === '-' ? readFileSync(0, 'utf8') : readText(resolve(src))
      const result = storeText(text, { sourceLabel: src, overwrite, force, source })
      logStat('store', { source: src, ok: result.ok })
      if (!result.ok) {
        print(`[拒绝写入] ${src}`)
        for (const p of result.problems) print(`  - ${p}`)
        return 1
      }
      if (result.draft) {
        print(`[已存草稿] ${result.file} —— ${result.note}`)
        print(`  批准：node tools/mem.mjs approve ${result.file}`)
        return 0
      }
      print(`[已写入] ${result.file}（来源 ${result.sourceLabel}）`)
      print(`[索引] ${result.index.listed} 条，${result.index.bytes} 字节`)
      if (result.superseded?.length) print(`[取代] ${result.superseded.join('、')} 已归档`)
      for (const w of result.supWarn ?? []) print(`  ⚠ ${w}`)
      autoInject()
      return 0
    }
    case 'write-mode': {
      if (!rest[0]) { print(`当前写入模式：${getWriteMode()}（可选 ${WRITE_MODES.join(' / ')}）`); return 0 }
      const r = setWriteMode(rest[0])
      if (!r.ok) { print(`[失败] ${r.problems.join('；')}`); return 1 }
      print(`[已设置] 写入模式 = ${r.mode}`)
      return 0
    }
    case 'drafts': {
      const drafts = listDrafts()
      if (!drafts.length) { print('（暂无待审批草稿）'); return 0 }
      for (const d of drafts) {
        const flag = d.problems.length ? ` ⚠ ${d.problems.length} 处待补` : ''
        print(`- ${d.file} :: ${d.name} — ${d.description}${flag}`)
      }
      print(`共 ${drafts.length} 个草稿；批准：approve <file>｜拒绝：reject <file> [原因]`)
      return 0
    }
    case 'approve': {
      const r = approveDraft(rest[0], { by: 'cli' })
      if (!r.ok) { print(`[失败] ${r.problems.join('；')}`); return 1 }
      print(`[已批准] ${r.approvedFrom} → ${r.file}（索引 ${r.index.listed} 条 / ${r.index.bytes} 字节）`)
      autoInject()
      return 0
    }
    case 'reject': {
      const reason = rest.slice(1).join(' ')
      const r = rejectDraft(rest[0], reason)
      if (!r.ok) { print(`[失败] ${r.problems.join('；')}`); return 1 }
      print(`[已拒绝] 草稿归档至 ${r.rejectedTo}`)
      return 0
    }
    case 'forget': {
      const result = forgetEntry(rest[0])
      logStat('forget', { name: rest[0] ?? '', ok: result.ok })
      if (!result.ok) { print(`[失败] ${result.problems.join('；')}`); return 1 }
      print(`[已归档] ${result.archivedTo}`)
      autoInject()
      return 0
    }
    case 'inject': {
      const result = syncInjection()
      logStat('inject', { ok: result.ok })
      if (!result.ok) {
        print('[注入失败·已降级]')
        for (const p of result.problems) print(`  - ${p}`)
        return 1
      }
      print(`[已注入 AGENTS.md] ${result.bytes} 字节（≤${LIMITS.indexBytes} 硬顶）｜列出 ${result.listed} 条，砍 ${result.skipped} 条`)
      return 0
    }
    case 'global-sync': {
      const r = globalSync()
      print(`[全局库同步] ${r.root} ← ${r.copied.length} 条 scope:global${r.removed.length ? `，清理旧副本 ${r.removed.length} 个` : ''}`)
      return 0
    }
    case 'draft': {
      const result = draftEntry(rest.join(' '))
      logStat('draft', { file: result.file })
      print(`[草稿] ${result.file}`)
      print(t('  填好四段（验证段带可定位引用）并经人工审批后：node tools/mem.mjs store <该文件>'))
      return 0
    }
    case 'review': {
      const result = reviewEntry(rest[0])
      if (!result.ok) { print(`[失败] ${result.problems.join('；')}`); return 1 }
      logStat('review', { name: rest[0] })
      print(`[已复核] ${result.file} → verified=${result.verified} review=${result.review}`)
      return 0
    }
    case 'map': {
      print(memoryMap(rest[0] ?? ''))
      return 0
    }
    case 'gather': {
      // 阶段 7.1 口径修正：末尾纯数字是 budget，不是查询词（`gather foo 4096` 以前会把 4096 当查询）
      const args = [...rest]
      let budget = 8192
      const last = args[args.length - 1]
      if (last && /^\d+$/.test(last)) { budget = Math.max(512, Number(last)); args.pop() }
      const q = args.join(' ')
      if (!q) { print(t('用法：gather <主题或关键词> [budget]')); return 2 }
      logStat('gather', { query: q, budget })
      print(gatherPack(q, budget))
      return 0
    }
    case 'conflicts': {
      const { pairs } = listConflicts()
      if (!pairs.length) { print('（无未决冲突）'); return 0 }
      for (const p of pairs) print(`- ${p.a} ↔ ${p.b}（状态 ${p.states.join(' / ')}｜${p.aFile} ↔ ${p.bFile}）`)
      print(`共 ${pairs.length} 对冲突；裁决：node tools/mem.mjs resolve <败方> --prefer <胜方> --reason <理由>`)
      return 0
    }
    case 'resolve': {
      // resolve <败方> --prefer <胜方> --reason <理由…>
      const entry = rest[0]
      let prefer = ''
      const reasonParts = []
      for (let i = 1; i < rest.length; i += 1) {
        const tok = rest[i]
        if (tok === '--prefer') { prefer = rest[i + 1] ?? ''; i += 1; continue }
        if (tok.startsWith('--prefer=')) { prefer = tok.slice('--prefer='.length); continue }
        if (tok === '--reason') { reasonParts.push(...rest.slice(i + 1)); break }
        if (tok.startsWith('--reason=')) { reasonParts.push(tok.slice('--reason='.length)); break }
      }
      const r = resolveConflict(entry, prefer, reasonParts.join(' '))
      if (!r.ok) { print(`[裁决失败] ${r.problems.join('；')}`); return 1 }
      print(`[已裁决] ${r.entry} → 由「${r.prefer}」胜出（${r.resolvedAt}）`)
      print(`  理由：${r.reason}`)
      print(`  ${r.entry} 状态 = ${r.state}｜双方均保留在库中（未硬删）`)
      autoInject()
      return 0
    }
    case 'stats': {
      // 阶段 7.1 口径修正：`stats abc` 以前 → NaN 污染统计窗口；非正整数一律回落 7
      const parsed = Number(rest[0])
      const days = Number.isInteger(parsed) && parsed > 0 ? parsed : 7
      const s = statsSummary(days)
      print(t('近 {0} 天：搜索 {1} 次（命中 {2} / 落空 {3}）｜show {4}｜store {5}｜埋点行 {6}',
        days, s.searches, s.hits, s.misses, s.shows, s.stores, s.lineCount))
      return 0
    }
    case 'doctor': {
      const report = doctorReport()
      print(t('条目 {0} 条｜索引 {1} 行 / {2} 字节｜写入模式 {3}',
        report.entries, report.indexLines, report.indexBytes, report.writeMode))
      const cs = report.confidenceSummary ?? {}
      print(t('[可信度] verified {0}｜provisional {1}｜needs-review {2}｜stale {3}｜disputed {4}',
        cs.verified ?? 0, cs.provisional ?? 0, cs['needs-review'] ?? 0, cs.stale ?? 0, cs.disputed ?? 0))
      const s = report.stats ?? statsSummary()
      print(t('[埋点] 近 7 天搜索 {0} 次（命中 {1} / 落空 {2}）｜show {3}｜store {4}',
        s.searches, s.hits, s.misses, s.shows, s.stores))
      if (report.notIndexed.length) {
        print(t('索引未列出 {0} 条（索引只放最有价值的部分，其余用 search 检索）：{1}',
          report.notIndexed.length, report.notIndexed.join('、')))
      }
      if (!report.findings.length) print(t('体检通过：无异常'))
      else {
        print(t('发现 {0} 处问题：', report.findings.length))
        for (const f of report.findings) print(`  - ${f}`)
      }
      if (report.notes.length) {
        print(t('提示 {0} 条（非致命，不影响体检结果）：', report.notes.length))
        for (const n of report.notes) print(`  - ${n}`)
      }
      return report.findings.length ? 1 : 0
    }
    case 'explain': {
      if (!rest[0]) { print(t('用法：explain <name>')); return 2 }
      const r = explainEntry(rest[0])
      if (!r.ok) { print(`[失败] ${r.problems.join('；')}`); return 1 }
      print(r.text)
      return 0
    }
    case 'verify': {
      const results = verifyEntries(rest[0] ?? '')
      if (!results.length) { print('（没有带 verification.recipe 的条目——先在 frontmatter 加 metadata.verification）'); return 0 }
      let bad = 0
      for (const r of results) {
        if (r.skipped) { print(`- ${r.name}: 跳过（${r.reason}）`); continue }
        if (!r.ok) bad += 1
        print(`- ${r.name}: ${r.ok ? '✓' : '✗'} ${r.detail}`)
      }
      print(`共 ${results.length} 条，失败 ${bad} 条`)
      return bad ? 1 : 0
    }
    default:
      usage()
      return cmd ? 2 : 0
  }
}

const invokedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invokedDirectly) process.exitCode = main(process.argv.slice(2))
