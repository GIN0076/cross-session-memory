<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 跨会话记忆 · Agent Lesson Book（错题本）

### _错题本 · 面向 AI 编程代理的零依赖跨会话记忆_

**教训落盘，证据强制，自动注入每一次会话。**

<sub>🌐 <a href="./README.md">English</a> · **简体中文** · <a href="./README.zh-TW.md">繁體中文</a> · <a href="./README.ar.md">العربية</a> · <a href="./README.vi.md">Tiếng Việt</a></sub>

</div>

<img src="./assets/banner.svg" alt="Agent Lesson Book — 错题本 · sổ lỗi · دفتر الدروس" width="100%">


<!-- Styling note: GitHub README renders no <style>; the look & feel lives in assets/banner.svg (self-hosted OFL fonts in assets/fonts/ are available for forks/themes). -->
<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div align="center">
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


<table>
<tr>
<td align="center" width="20%"><img src="./assets/icons/durable.svg" width="56" alt="持久耐用 纯文本存储于磁盘"><br><b>持久耐用<br>纯文本存储于磁盘</b></td>
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="可检索 IDF 三路检索"><br><b>可检索<br>IDF 三路检索</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="可审计 证据链强制校验"><br><b>可审计<br>证据链强制校验</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="自动注入 每次会话 ≤2KB"><br><b>自动注入<br>每次会话 ≤2KB</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="命令行驱动 15 条命令的 CLI"><br><b>命令行驱动<br>15 条命令的 CLI</b></td>
</tr>
</table>


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
cp -r cross-session-memory/* your-project/
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

<div align="left">

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
