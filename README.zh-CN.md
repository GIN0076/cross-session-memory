<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 AGENT LESSON BOOK

### _错题本 · 面向 AI 编程代理的零依赖跨会话记忆_

**教训落盘，证据强制，自动注入每一次会话。**

<sub>🌐 <a href="./README.md">English</a> · **简体中文** · <a href="./README.zh-TW.md">繁體中文</a> · <a href="./README.ar.md">العربية</a> · <a href="./README.vi.md">Tiếng Việt</a></sub>

</div>

<!-- Fonts: hybrid strategy — decorative Latin fonts are self-hosted under SIL OFL
     (license texts bundled in assets/fonts/licenses/); CJK / Arabic / Vietnamese body
     text uses system fonts: zero weight, native quality, no external CDN. -->
<style>
  @font-face { font-family: 'Orbitron'; font-weight: 700; font-style: normal; font-display: swap; src: url('./assets/fonts/orbitron-700.woff2') format('woff2'); }
  @font-face { font-family: 'Orbitron'; font-weight: 900; font-style: normal; font-display: swap; src: url('./assets/fonts/orbitron-900.woff2') format('woff2'); }
  @font-face { font-family: 'Space Grotesk'; font-weight: 500; font-style: normal; font-display: swap; src: url('./assets/fonts/space-grotesk-500.woff2') format('woff2'); }
  @font-face { font-family: 'Space Grotesk'; font-weight: 700; font-style: normal; font-display: swap; src: url('./assets/fonts/space-grotesk-700.woff2') format('woff2'); }
  @font-face { font-family: 'IBM Plex Mono'; font-weight: 400; font-style: normal; font-display: swap; src: url('./assets/fonts/ibm-plex-mono-400.woff2') format('woff2'); }

  :root {
    --c0:#05060f; --c1:#0a0e1f; --c2:#10173a; --c3:#1a2456;
    --cy:#00e5ff; --mg:#ff2fd6; --yl:#ffd60a; --gn:#00ffa3; --or:#ff8a00; --pu:#a86bff;
    --tx:#eaf0ff; --dim:#8fa0c8;
    --font-disp: 'Orbitron', 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif;
    --font-body: 'Space Grotesk', system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', sans-serif;
    --font-code: 'IBM Plex Mono', Consolas, 'Cascadia Mono', 'Courier New', monospace;
  }
  body {
    background: radial-gradient(1200px 500px at 20% -10%, #16204d 0%, transparent 60%),
                radial-gradient(1000px 500px at 90% 0%, #2a1050 0%, transparent 55%),
                var(--c0);
    color: var(--tx); font-family: var(--font-body);
    line-height: 1.75; padding-bottom: 60px;
  }
  h1, h2, h3 { font-family: var(--font-disp); letter-spacing: .04em; }
  h1 {
    font-size: 3.2em; font-weight: 900; margin: .2em 0 .1em;
    background: linear-gradient(92deg, var(--cy) 0%, var(--pu) 38%, var(--mg) 68%, var(--yl) 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    filter: drop-shadow(0 0 22px rgba(0,229,255,.35));
  }
  h1 + p { font-size: 1.25em; color: var(--yl); font-weight: 700; letter-spacing: .12em; }
  h1 + p + p { font-family: var(--font-code); color: var(--gn); }
  h2 {
    font-size: 1.7em; margin-top: 2.2em; padding: .45em .8em;
    border-left: 6px solid transparent;
    border-image: linear-gradient(180deg, var(--cy), var(--mg)) 1;
    background: linear-gradient(90deg, rgba(0,229,255,.12), transparent 70%);
    border-radius: 6px;
    text-shadow: 0 0 18px rgba(168,107,255,.5);
  }
  h3 { color: var(--cy); font-size: 1.15em; }
  code {
    font-family: var(--font-code); background: #0d1330; color: var(--gn);
    padding: .15em .45em; border-radius: 6px; border: 1px solid var(--c3);
  }
  pre {
    background: linear-gradient(180deg, #0b1130, #0a0e1f) !important;
    border: 1px solid var(--c3); border-radius: 12px; padding: 1em 1.2em !important;
    box-shadow: inset 0 0 40px rgba(0,229,255,.06), 0 8px 24px rgba(0,0,0,.4);
  }
  pre code { border: none; background: transparent; color: #d7e3ff; }
  blockquote {
    border-left: 4px solid var(--or); background: rgba(255,138,0,.08);
    margin: 0; padding: .6em 1em; border-radius: 0 10px 10px 0; color: var(--tx);
  }
  table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1em 0; }
  th {
    background: linear-gradient(180deg, var(--c3), var(--c2)); color: var(--cy);
    font-family: var(--font-disp); font-size: .85em; letter-spacing: .08em; text-transform: uppercase;
  }
  th, td { border: 1px solid var(--c3); padding: .6em .9em; text-align: left; }
  tr:nth-child(even) td { background: rgba(26,36,86,.35); }
  td:first-child { color: var(--yl); font-family: var(--font-code); }
  hr { border: none; height: 2px; background: linear-gradient(90deg, transparent, var(--cy), var(--mg), transparent); margin: 3em 0; }
  a { color: var(--cy); text-decoration: none; }
  a:hover { text-shadow: 0 0 12px var(--cy); }

  /* ── custom badges & shapes ─────────────────────────────── */
  .b64 { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 18px 0; }
  .b64 svg { height: 30px; filter: drop-shadow(0 3px 8px rgba(0,0,0,.5)); }
  .legal {
    text-align: left; background: rgba(16,23,58,.6); border: 1px dashed var(--c3);
    border-radius: 12px; padding: 1em 1.4em; color: var(--dim); font-size: .92em;
  }
  .icon-grid { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 24px 0; }
  .icon-grid > div {
    width: 132px; padding: 16px 10px; border-radius: 16px; text-align: center;
    background: linear-gradient(180deg, var(--c2), var(--c1)); border: 1px solid var(--c3);
    transition: transform .15s ease, box-shadow .15s ease;
  }
  .icon-grid > div:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,229,255,.2); }
  .icon-grid svg { width: 44px; height: 44px; }
  .icon-grid p { margin: 8px 0 0; font-size: .85em; color: var(--dim); }
  .icon-grid b { color: var(--tx); display: block; font-family: var(--font-disp); font-size: .8em; letter-spacing: .06em; }
</style>

<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div class="b64">
  <img alt="MIT 许可证" src="https://img.shields.io/badge/license-MIT-00ffa3?style=for-the-badge&labelColor=10173a&color=00ffa3&logoColor=00ffa3">
  <img alt="零依赖" src="https://img.shields.io/badge/dependencies-zero-00e5ff?style=for-the-badge&labelColor=10173a">
  <img alt="运行时 Node 18+" src="https://img.shields.io/badge/runtime-Node%20%E2%89%A5%2018-ff2fd6?style=for-the-badge&labelColor=10173a">
  <img alt="记忆预算 2KB" src="https://img.shields.io/badge/memory%20budget-2KB-ffd60a?style=for-the-badge&labelColor=10173a">
  <img alt="15 条命令" src="https://img.shields.io/badge/commands-15-a86bff?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **15 条命令** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**

<details>
<summary>🎨 <b>点击展开 ASCII 艺术字</b> ✨</summary>

```
   ╔══════════════════════════════════════════════════════════════╗
   ║   📕  A G E N T   L E S S O N   B O O K   ·   错 题 本       ║
   ╠══════════════════════════════════════════════════════════════╣
   ║  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         ║
   ║  │SYMPTOM 🌡│→│ CAUSE 🔍│→│  FIX 🛠 │→│VERIFY ✅│  = 1 lesson ║
   ║  │  现象    │  │  判定    │  │  解法   │  │  验证   │         ║
   ║  └─────────┘  └─────────┘  └─────────┘  └─────────┘         ║
   ║      💾 plain text        🔍 findable        🛡 audited      ║
   ║      📥 ≤2KB injected     🔁 survives updates                ║
   ╚══════════════════════════════════════════════════════════════╝
        ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐
        │ grep │   │ IDF  │   │ alias│   │ grams│   │ stats│
        └──────┘   └──────┘   └──────┘   └──────┘   └──────┘
              ✦ zero dependencies · pure Node.js ✦
```

</details>

<div class="icon-grid">
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset="1" stop-color="#a86bff"/></linearGradient></defs><path d="M24 4 40 13v22L24 44 8 35V13z" fill="none" stroke="url(#g1)" stroke-width="3"/><path d="M24 14v20M16 20l8-6 8 6" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>持久耐用</b>纯文本存储于磁盘</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00ffa3"/><stop offset="1" stop-color="#00e5ff"/></linearGradient></defs><circle cx="21" cy="21" r="13" fill="none" stroke="url(#g2)" stroke-width="3"/><path d="M31 31l11 11" stroke="#ff2fd6" stroke-width="4" stroke-linecap="round"/><path d="M15 21l4 4 8-9" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>可检索</b>IDF 三路检索</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff2fd6"/><stop offset="1" stop-color="#ff8a00"/></linearGradient></defs><path d="M24 5l16 6v12c0 10-7 17-16 20-9-3-16-10-16-20V11z" fill="none" stroke="url(#g3)" stroke-width="3"/><path d="M17 24l5 5 9-10" fill="none" stroke="#00ffa3" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>可审计</b>证据链强制校验</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd60a"/><stop offset="1" stop-color="#00ffa3"/></linearGradient></defs><path d="M24 42s-15-8-15-21a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 13-15 21-15 21z" fill="none" stroke="url(#g4)" stroke-width="3"/><path d="M24 12v10l6 4" fill="none" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round"/></svg>
    <p><b>自动注入</b>每次会话 ≤2KB</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a86bff"/><stop offset="1" stop-color="#ff2fd6"/></linearGradient></defs><rect x="7" y="10" width="34" height="28" rx="4" fill="none" stroke="url(#g5)" stroke-width="3"/><path d="M14 20l6 4-6 4M24 28h10" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>命令行驱动</b>15 条命令的 CLI</p>
  </div>
</div>

---

## 🌟 为什么还要做一个记忆项目？

每一次新会话都从**失忆级的空白**开局。重型记忆平台用向量数据库、知识图谱、网关和 LLM 抽取流水线
来解决这个问题。可为了一本**个人错题本**，动用这么多机器——也就带来这么大的攻击面。

Agent Lesson Book 押的是相反的注：

> ### 🔥 _「教训落盘——每一次会话都会读到它。记忆是数据，绝不是指令。」_

**你得到的不是基础设施，而是这些：**

- 📕 **四段式教训** —— `Symptom / Cause / Fix / Verification`（即 现象 / 判定 / 解法 / 验证）。
  若「验证」段缺少可核验的**证据引用**，写入时即被**拒收**。自证不了的记忆，进不了这本错题本。
- 🧾 **证据链，由代码强制** —— 每条「验证」都必须引用可定位的出处
  （路径 / 文件名 / 章节 / issue 编号），让后续会话能直抵证据现场。
- 📥 **自动注入** —— `mem inject` 把 ≤2 KB 的索引镜像进你的 `AGENTS.md`；每次新会话
  开局即带着记忆。**兜底保护：超预算 → 自动删行；任何环节出错 → 静默失败降级为普通约定。绝不阻塞会话。**
- 🛡 **从设计上抗投毒** —— 人工批准写入、密钥特征拒收、近重复拦截、来源戳记，
  以及完整的 git 回滚。（参见：OWASP ASI06「记忆与上下文投毒」——自动写入型记忆系统正是靶子。）

---

## ✨ 功能星河

| 🔮 | 功能 | 为什么重要 |
|---|---|---|
| 📕 | 四段式条目（双语标签） | 结构经得起翻译，也经得起时间 |
| 🔗 | 证据链闸门 | 没证据就没条目。杜绝「我好像记得这么回事」 |
| 📥 | `mem inject` 自动注入 | 记忆不再依赖代理自觉 |
| 🎯 | IDF 排序三路检索 | 字面 ∪ 中日韩二元/一元切分 ∪ `aliases` 同义词；稀有词权重更高 |
| ✂️ | 命中即给摘要 | 不用打开文件也能判断相关性 |
| ♻️ | `supersedes` 自动归档 | 教训会演进；旧版本自动退役进 `archive/` |
| 🗺 | `mem map` 文本知识图谱 | 取代链 + 相关联接 + 复核时间线 |
| 🍱 | `mem gather` 会议资料包 | 相关条目打包 ≤8 KB，便于综合研判 |
| 📝 | `mem draft` 流水线 | 先出骨架，人工确认，再行入库 |
| ⏰ | `review` 到期复核 | 记忆会腐坏——90 天一查，保持诚实 |
| 🚫 | 近重复拦截 | 两次会话、同一条教训 → 只留一条，不留两条 |
| 🌍 | `mem global-sync` 镜像 | `scope: global` 的教训在任何工作区都能检索到 |
| 🧪 | `mem stats` 遥测 | 检索命中率——用证据说话，不靠感觉 |
| 🩺 | `mem doctor` 体检 | 索引预算、漂移、逾期复核——一条命令全查 |
| 🈲 | UTF-8 / 中日韩安全 | 只用 Node 写文件；PowerShell 编码陷阱均有记录 |

---

## 🛠 技术选型

<table>
<tr><th>层级</th><th>选型</th><th>亮点</th></tr>
<tr><td>Runtime</td><td><code>Node.js ≥ 18</code></td><td>🟢 零依赖 · 零服务 · 零 API 成本</td></tr>
<tr><td>Storage</td><td><code>.memory/</code> plain markdown</td><td>🧾 人类可读 · 可 diff · git 友好</td></tr>
<tr><td>Index</td><td><code>MEMORY.md</code> ≤ 60 lines / 2 KB</td><td>📥 硬顶限制，溢出条目在页脚列出</td></tr>
<tr><td>Retrieval</td><td>IDF + CJK n-gram + aliases</td><td>🎯 不用向量库的多策略检索</td></tr>
<tr><td>Delivery</td><td><code>AGENTS.md</code> injection block</td><td>🔌 免插件，任何读取 AGENTS.md 的代理都能用</td></tr>
<tr><td>Safety</td><td>approval · secret scan · Jaccard gate</td><td>🛡 四层防御（对标 OWASP ASI06）</td></tr>
</table>

**三条铁律**（出自 `docs/DESIGN.md`）：

1. **预算硬顶** —— 注入内容 = 索引原文，≤ 2 KB；超预算就删行。
2. **失败降级** —— 索引不可读时静默回退到指针约定。会话永不被阻塞。
3. **人工批准写入** —— 工具只提草案（`draft`），由人拍板入库（`store`）。

---

## 🚀 快速开始

> **环境要求：** Node.js ≥ 18，别无其他。无需 npm install、无需数据库、无需 API key。

**第一步 —— 把整个文件夹放进你的项目根目录**（即 `AGENTS.md` 所在的目录）：

```bash
cp -r agent-lesson-book/* your-project/
cd your-project
```

**第二步 —— 一条命令完成初始化：**

```bash
node install/setup.mjs --with-sample
```

```
[setup] memory bank ready  → .memory/
[setup] conventions wired  → AGENTS.md (created / updated)
[setup] index injected     → 2.0 KB / 2.0 KB hard cap
[setup] doctor             → healthy: no anomalies
[setup] next: node tools/mem.mjs draft my-first-lesson
```

**第三步 —— 写下你的第一条教训**（按约定，先征得用户同意）：

```bash
node tools/mem.mjs draft ssh-timeout
# edit .memory/drafts/<date>-ssh-timeout.md — four sections, evidence in Verification
node tools/mem.mjs store .memory/drafts/<date>-ssh-timeout.md
node tools/mem.mjs doctor
```

就这么简单。**从此每一次新会话，都自带你的教训索引。**

---

## 📕 条目格式

四个段落，中英文标签均可。
缺少「验证」段——或「验证」段没有可定位引用的——一律**拒收**。

```markdown
---
name: git-autocrlf-breaks-byte-exact-restore
description: core.autocrlf=true turns LF into CRLF on checkout
aliases: line ending,CRLF,restore
metadata:
  type: lesson
  scope: global
  created: 2026-09-22
  verified: 2026-09-22
review: 2026-12-21
---

Symptom：Restore test fails byte counts: 1898 → 1915 after `git checkout`.
Cause：core.autocrlf=true smudge filter rewrites LF to CRLF on checkout.
Fix：git config core.autocrlf false + writers emit LF.
Verification：Re-test returns 1898 → 1898 byte-identical (see `tools/mem.mjs`, CHANGELOG 0.2.0).
```

> 🧪 **试试这些闸门：**
> ```bash
> node tools/mem.mjs store examples/lesson-autocrlf.md   # ✅ accepted
> # now strip the reference from its Verification section and retry:
> node tools/mem.mjs store broken.md                     # ❌ rejected: no locatable reference
> ```

---

## ⌨️ 命令面板

| 命令 | 作用 |
|---|---|
| `mem.mjs index` | 打印 / 重新生成带预算的索引 |
| `mem.mjs inject` | 同步注入块到 `AGENTS.md`（写入时自动执行） |
| `mem.mjs list` | 列出全部条目及健康标记 |
| `mem.mjs search <q> [n]` | IDF 三路检索，附摘要 |
| `mem.mjs show <name>` | 打印单条完整条目 |
| `mem.mjs store <file\|-> [--overwrite] [--force]` | 校验并入库（密钥 / 重复 / 证据三重闸门） |
| `mem.mjs forget <name>` | 归档，永不硬删除 |
| `mem.mjs review <name>` | 刷新验证日期，复核顺延 +90 天 |
| `mem.mjs draft [topic]` | 生成四段式骨架 |
| `mem.mjs map [name]` | 文本知识图谱（取代 / 关联 / 复核） |
| `mem.mjs gather <q>` | 会议资料包：相关条目 ≤8 KB |
| `mem.mjs global-sync` | 将 `scope: global` 条目镜像到各工作区 |
| `mem.mjs stats [days]` | 检索遥测（命中率） |
| `mem.mjs doctor` | 全面体检——退出码 0 且零告警即为健康 |

---

## 📂 仓库结构

```
agent-lesson-book/
├── README.md · README.zh-CN.md · README.zh-TW.md · README.ar.md · README.vi.md
├── LICENSE · CHANGELOG.md · .gitignore
├── tools/mem.mjs          # the 15-command engine (single file, zero deps)
├── install/setup.mjs      # one-shot bootstrap
├── templates/             # AGENTS.md.example + entry.example.md
├── docs/                  # DESIGN · COMMANDS · RESTORE
├── examples/              # real sanitized lessons
└── assets/fonts/          # self-hosted OFL fonts + license texts
```

---

## 🔐 安全与信任模型

| 层级 | 机制 | 防御对象 |
|---|---|---|
| 1️⃣ 溯源 | `originSessionId` + `created/verified` 戳记 | 无出处的断言 |
| 2️⃣ 审批 | 人工同意 + `store` 闸门 | 代理过于积极的写入 |
| 3️⃣ 检测 | 密钥特征 · Jaccard ≥0.6 闸门 · 证据链 | 泄密、重复、谣言 |
| 4️⃣ 完整性 | git 回滚（建议仅本地） | 其余一切 |

> 记忆投毒是公认的攻击类别（OWASP **ASI06**）。自动写入型记忆系统正是靶子。
> 未经人类点头，这本错题本**一个字也不写**。

---

## 🗺 路线图

- 🌱 **0.2.x** —— 二元词同义词包 · `mem map` 导出 SVG · 分语言的体检提示
- 🌍 **0.3** —— 可选的多错题本联邦 · CLI 国际化（`--lang`）
- 🚫 **不做** —— 向量库 · 网关 · 静默自动写入。触发条件记录于 `docs/DESIGN.md`。

---

## 🤝 参与贡献

欢迎 PR——尤其是**新教训包**（务必脱敏！）和 README 翻译。
提交前请先跑 `node tools/mem.mjs doctor` 确认全绿。所有代码必须保持**零依赖**。

---

## ⚖️ 法律与署名

<div class="legal">

- **非官方项目。** 本项目为非官方项目，与文中提及的任何产品/公司/组织均无隶属、赞助或认可关系
  （包括 DeepSeek、Anthropic、OpenAI、Mem0、Zep、Letta、Cognee、腾讯云、OWASP 以及 SIL）。
  产品名称仅用于事实性的指称引用。
- **观点归作者所有。** 文中的对比陈述反映的是某一时间点的公开文档事实与个人使用经验——
  做决定前请对照厂商最新文档核实。
- **字体：** Orbitron、Space Grotesk 与 IBM Plex Mono 依据 **SIL Open Font License 1.1** 打包附带
  ——完整许可文本见 [`assets/fonts/licenses/`](./assets/fonts/licenses/)。
  中日韩 / 阿拉伯文 / 越南文使用系统字体（不附带任何文件）。
- **不提供担保。** 本软件依据 MIT 许可证「原样」提供——见 [`LICENSE`](./LICENSE)。

</div>

---

<div align="center">

```
  ╔═══════════════════════════════════════════════════════════╗
  ║   ★  L E S S O N S   L I V E   O N   D I S K  ★          ║
  ║      Evidence in, garbage out — never.                    ║
  ║      错题本 · sổ lỗi · دفتر الدروس · lesson book          ║
  ╚═══════════════════════════════════════════════════════════╝
```

_以 📕 + 🛠 + 零依赖打造 —— **MIT** © 2026 Agent Lesson Book 贡献者_

</div>
