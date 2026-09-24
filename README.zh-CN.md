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
  <img alt="DeepSeek Harness 插件" src="https://img.shields.io/badge/plugin-DeepSeek%20Harness-00ffa3?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **15 条命令** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**
>
> ### 🧩 `PLUGIN/DSH-MEMORY` · **DeepSeek Harness 插件**（0.3.0 新增）
> **`mem_recall` · `mem_save` · `/memory recall|save|doctor|review|map|stats|draft`**

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
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="一搜即得 IDF 三路检索"><br><b>一搜即得<br>IDF 三路检索</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="证据链强制 有据可查"><br><b>证据链强制<br>有据可查</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="自动注入 每会话 ≤2KB"><br><b>自动注入<br>每会话 ≤2KB</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="一条命令 15 条命令 + 插件"><br><b>一条命令<br>15 条命令 + 插件</b></td>
</tr>
</table>

**目录** — [0.3.0 更新](#-030-更新) · [为什么](#-为什么还要一个记忆项目) · [特性](#-特性星系) · [两种用法](#-两种用法) · [条目格式](#-条目格式) · [命令](#%EF%B8%8F-命令面板) · [架构](#%EF%B8%8F-架构一张引擎两张脸) · [安全](#-安全与信任模型) · [路线图](#-路线图)

---

## 🆕 0.3.0 更新

**插件版（Plugin Edition）。** 教训本现在可以**原生跑在 DeepSeek Harness 里**——同一个零依赖引擎，两张交付脸：

| | 独立 CLI（0.2.x） | Harness 插件（0.3.0） |
|---|---|---|
| 记忆进上下文 | `mem inject` 注入 `AGENTS.md` | 每回合注入提示词（≤2KB，失败降级） |
| 代理来搜 | 经 shell 跑 `mem.mjs search` | `mem_recall` 工具（教训本 **+ 会话全文**） |
| 写入教训 | 经 shell 跑 `mem.mjs store` | `mem_save` 工具——**每次都先经人工审批** |
| 人工维护 | `mem.mjs` 命令 | `/memory recall\|save\|doctor\|review\|map\|stats\|draft` |

完整细节见 [`CHANGELOG.md`](./CHANGELOG.md) 与 [`plugin/README.md`](./plugin/README.md)。

---

## 🌟 为什么还要一个记忆项目？

每个新会话都从**失忆级的空白**开始。重型记忆平台用向量库、知识图谱、网关和 LLM 抽取管线来解决它——对一本**个人错题本**来说，这是太多机械，也是太多攻击面。

Agent Lesson Book 走的是相反的路：

> ### 🔥 _「教训住在磁盘上——每个会话都读它。记忆是数据，永远不是指令。」_

**你得到的不是基础设施，而是：**

- 📕 **四段式教训** —— `Symptom / Cause / Fix / Verification`（或 现象 / 判定 / 解法 / 验证）。
  「验证」段没有可核对的**证据引用**的教训，**写入时直接拒收**。证明不了自己的记忆，进不了本子。
- 🧾 **证据链，由代码强制** —— 每条验证必须引用可定位的出处（路径 / 文件名 / 章节 / issue 号），
  未来的会话可以顺着引用直钻到证据。
- 📥 **自动注入** —— `mem inject` 把 ≤2KB 索引镜像进 `AGENTS.md`；Harness 插件则直接注入提示词。
  每个新会话开工时记忆已在上下文里。**失败保险：超预算 → 砍行；任何异常 → 静默降级为指针约定。绝不阻塞会话。**
- 🛡 **防投毒设计** —— 人工批准写入、密钥模式拒写、近重复拦截、来源戳、git 全量回滚。
  （对照：OWASP ASI06「记忆与上下文投毒」——自动写入型记忆系统正是靶子。）

---

## ✨ 特性星系

| 🔮 | 特性 | 为什么重要 |
|---|---|---|
| 📕 | 四段式条目（中英双语段名） | 结构经得起翻译和时间 |
| 🔗 | 证据链闸门 | 没证据 → 没条目。专治「我好像记得」 |
| 📥 | `mem inject` 自动注入 | 不靠代理自觉，记忆照样进上下文 |
| 🧩 | **Harness 原生插件** | 每回合提示词里都有索引——连 AGENTS.md 自觉都不用靠 |
| 🔌 | **`mem_recall` 工具** | 教训本 ∪ **既往会话全文**，一调即得 |
| ✍️ | **`mem_save` 工具 + 审批** | 即使代理想写，也永远先问人 |
| 💬 | **`/memory` 命令** | 聊天框里维护：recall / save / doctor / review / map / stats / draft |
| 🎯 | IDF 加权三路检索 | 字面 ∪ 中文 bigram/unigram ∪ `aliases` 同义；稀有词胜出 |
| ✂️ | 命中带片段 | 不开文件就能判断相关性 |
| ♻️ | `supersedes` 自动归档 | 教训会进化；旧版自动退入 `archive/` |
| 🗺 | `mem map` 文本图谱 | 取代链 + 关联边 + 复核时间线 |
| 🍱 | `mem gather` 合议包 | 相关条目打包 ≤8KB 供综合 |
| 📝 | `mem draft` 流水线 | 先骨架，人批准，再入库 |
| ⏰ | `review` 到期日 | 记忆会腐烂——90 天复核让它保持诚实 |
| 🚫 | 近重复拦截 | 两个会话同一个教训 → 一条条目，不是两条 |
| 🌍 | `mem global-sync` 镜像 | `scope: global` 的教训跨工作区可及 |
| 🧪 | `mem stats` 埋点 | 检索命中率——拿证据说话，不靠感觉 |
| 🩺 | `mem doctor` 体检 | 索引预算、漂移、复核过期——一条命令 |
| 🧪 | `install/smoke.mjs` E2E | 一条命令证明安装无恙：闸门/检索/注入/体检 |
| 🈲 | UTF-8 / 中文安全 | 只用 Node 写文件；PowerShell 编码坑有文档 |

---

## 🛠 技术光晕

<table>
<tr><th>层</th><th>选型</th><th>光芒</th></tr>
<tr><td>运行时</td><td><code>Node.js ≥ 18</code></td><td>🟢 零依赖 · 零服务 · 零 API 成本</td></tr>
<tr><td>存储</td><td><code>.memory/</code> 纯 Markdown</td><td>🧾 人可读 · 可 diff · git 友好</td></tr>
<tr><td>索引</td><td><code>MEMORY.md</code> ≤ 60 行 / 2KB</td><td>📥 硬顶封顶，被挤出的条目列在尾注</td></tr>
<tr><td>检索</td><td>IDF + 中文 n-gram + aliases</td><td>🎯 不上向量库的多路检索</td></tr>
<tr><td>交付</td><td><code>AGENTS.md</code> 注入段 <b>+</b> Harness 插件</td><td>🔌 一张引擎（<code>mem-core.mjs</code>）两张脸</td></tr>
<tr><td>安全</td><td>审批 · 密钥扫描 · Jaccard 闸</td><td>🛡 四层防御（OWASP ASI06 有意识）</td></tr>
</table>

**三条铁律**（见 `docs/DESIGN.md`）：

1. **预算硬顶** —— 注入 = 索引原样 ≤2KB；超预算砍行。
2. **失败降级** —— 索引读不了 → 静默降级为指针约定。会话永不阻塞。
3. **人工批准写入** —— 工具提议（`draft` / `mem_save`），人来处置（`store` / 审批）。

---

## 🚀 两种用法

> **要求：** Node.js ≥ 18，再无其他。不装 npm 包、不起数据库、不用 API key。
> （插件脸额外需要 [DeepSeek Harness](https://github.com/deepseek-ai)；引擎依旧零依赖。）

### A · 独立 CLI —— 丢进任何项目就能用

**第 1 步 —— 把文件夹拷进项目根**（`AGENTS.md` 所在的目录）：

```bash
cp -r cross-session-memory/* your-project/
cd your-project
```

**第 2 步 —— 一键引导：**

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

**第 3 步 —— 证明安装无恙（可选但舒服）：**

```bash
node install/smoke.mjs        # E2E：闸门 · 检索 · 注入预算 · 体检
```

### B · DeepSeek Harness 插件 —— 原生工具 + `/memory`

```
plugin_manager → install_bundle → target = <clone>/plugin/dsh-memory
```

一条命令挂上三件套（提示词注入 · `mem_recall` / `mem_save` · `/memory`），破坏性重装后重复这条命令即完整复原。
两个依赖需先用 junction/link 物化——精确配方、配置项（`memoryCorePath`、`maxHits`）与六条验收清单
都在 [`plugin/README.md`](./plugin/README.md)。

**第一条教训**（按约定先征得用户同意）：

```bash
node tools/mem.mjs draft ssh-timeout
# 编辑 .memory/drafts/<日期>-ssh-timeout.md —— 四段齐全，验证段带证据
node tools/mem.mjs store .memory/drafts/<日期>-ssh-timeout.md
node tools/mem.mjs doctor
```

就这样。**从此每个新会话开工时，你的教训索引已在上下文里。**

---

## 📕 条目格式

四段。中英段名都收。缺「验证」——或「验证」段没有可定位引用——**拒收**。

```markdown
---
name: git-autocrlf-breaks-byte-exact-restore
description: core.autocrlf=true 检出时把 LF 改写成 CRLF
aliases: line ending,CRLF,restore
metadata:
  type: lesson
  scope: global
  created: 2026-09-22
  verified: 2026-09-22
review: 2026-12-21
---

现象：恢复实测字节数对不上：`git checkout` 后 1898 → 1915。
判定：core.autocrlf=true 的 smudge 过滤器检出时把 LF 重写为 CRLF。
解法：git config core.autocrlf false + 写入方统一发 LF。
验证：改配置后同一实测 1898 → 1898 逐字节一致（见 `tools/mem.mjs`，CHANGELOG 0.2.0）。
```

> 🧪 **亲手试闸门：**
> ```bash
> node tools/mem.mjs store examples/lesson-autocrlf.md   # ✅ 收
> # 再把验证段的引用删掉重试：
> node tools/mem.mjs store broken.md                     # ❌ 拒：无可定位引用
> ```

---

## ⌨️ 命令面板

### CLI —— `node tools/mem.mjs <命令>`

| 命令 | 作用 |
|---|---|
| `index` | 打印 / 重建预算内索引 |
| `inject` | 把注入段同步进 `AGENTS.md`（写入时自动） |
| `list` | 列出全部条目与健康标记 |
| `search <q> [n]` | IDF 三路检索，带片段 |
| `show <name>` | 打印单条全文 |
| `store <file\|-> [--overwrite] [--force]` | 校验入库（密钥/重复/证据全闸） |
| `forget <name>` | 归档，永不硬删 |
| `review <name>` | 刷复核日期，review +90 天 |
| `draft [主题]` | 生成四段骨架草稿 |
| `map [name]` | 文本图谱（取代 / 关联 / 复核） |
| `gather <q>` | 合议包：相关条目 ≤8KB |
| `global-sync` | 跨工作区镜像 `scope: global` 条目 |
| `stats [days]` | 检索埋点（命中率） |
| `doctor` | 全量体检——exit 0 且零提示即绿 |

### Harness 插件

| 界面 | 作用 |
|---|---|
| 提示词段 | 教训索引 ≤2KB，每回合注入，失败降级 |
| `mem_recall <query> [limit]` | 教训本 ∪ 会话全文，合并排序 |
| `mem_save <content>` | 写入一条教训——**每次都先经审批** |
| `/memory recall <q>` | 同款检索，人亲手敲 |
| `/memory save <file.md>` | 入库一条条目（亲手敲即批准） |
| `/memory doctor \| review \| map \| stats \| draft` | 与 CLI 同款维护面 |

---

## 🏗️ 架构：一张引擎，两张脸

```
                    ┌───────────────────────────────────────────┐
                    │            .memory/  （数据）              │
                    │  *.md 条目 · MEMORY.md 索引 · 埋点        │
                    └────────────────────┬──────────────────────┘
                                         │
                              tools/mem.mjs  （引擎，15 条命令）
                                         │
                              tools/mem-core.mjs  （门面）
                          promptIndexText · formatRecall · saveAndSync
                                    ┌────┴─────┐
                                    │          │
                        CLI 脸 ─────┘          └──── plugin/dsh-memory
                    （AGENTS.md 注入段）           （Harness：提示词段
                                                 mem_recall · mem_save
                                                 · /memory）
```

两条铁律在两张脸上同样成立：预算硬顶、失败降级、人工批准写入。

---

## 📂 仓库解剖

```
cross-session-memory/
├── README.md · README.zh-CN.md · README.zh-TW.md · README.ar.md · README.vi.md
├── LICENSE · CHANGELOG.md · .gitignore
├── tools/
│   ├── mem.mjs            # 15 条命令的引擎（单文件，零依赖）
│   └── mem-core.mjs       # 共享门面——插件与 CLI 的单一入口
├── plugin/dsh-memory/     # DeepSeek Harness 插件包（插件版）
│   ├── index.js           #   提示词注入 · mem_recall · mem_save · /memory
│   ├── cordis.patch.yml   #   loader 行 + 配置（memoryCorePath、maxHits）
│   ├── locale/            #   中英展示元数据
│   └── README.md          #   安装 · 依赖物化 · 验收
├── install/
│   ├── setup.mjs          # 一键引导
│   └── smoke.mjs          # 端到端冒烟测试
├── templates/             # AGENTS.md.example + entry.example.md
├── docs/                  # DESIGN · COMMANDS · RESTORE · ATTRIBUTION
├── examples/              # 真实脱敏教训样例
└── assets/fonts/          # 自托管 OFL 字体 + 许可原文
```

---

## 🔐 安全与信任模型

| 层 | 机制 | 防什么 |
|---|---|---|
| 1️⃣ 溯源 | `originSessionId` + `created/verified` 戳 | 无出处的断言 |
| 2️⃣ 审批 | 人工同意 + `store` 闸 + **`mem_save` 恒 ask** | 代理过度热心地写 |
| 3️⃣ 检出 | 密钥模式 · Jaccard ≥0.6 闸 · 证据链 | 泄密、重复、谣言 |
| 4️⃣ 完整性 | git 回滚（建议本地库） | 其他一切 |

> 记忆投毒是公认的攻击类别（OWASP **ASI06**），自动写入型记忆系统正是靶子。
> 本子**不经人手不写一字**——插件里 `mem_save` **每次**调用都返回 `ask`，
> 审批策略为 `never` 时则干脆拒之门外。

---

## 🗺 路线图

- 🧩 **0.3.x** —— 插件打磨：`tools/result` 写入埋点、夜间复核 timer、wiki-link 强校验（M2）
- 🌱 **0.4** —— 会话中文检索兜底补丁 · client 记忆面板 · `ctx.skills` · bigram 同义词包 · `mem map` SVG 导出（M3）
- 🌍 **更远** —— 可选多本联邦 · CLI i18n（`--lang`）
- 🚫 **不做** —— 向量库 · 网关 · 静默自动写入。触发条件见 `docs/DESIGN.md`。

---

## 🤝 参与贡献

欢迎 PR——尤其是**新的教训包**（记得脱敏！）和 README 翻译。
提交前跑 `node install/smoke.mjs` 全绿。所有代码必须保持**零依赖**。

---

## ⚖️ 法律与署名

<div align="left">

- **非官方项目。** 与任何具名产品、公司或组织（包括 DeepSeek、Anthropic、OpenAI、Mem0、Zep、
  Letta、Cognee、腾讯云、OWASP、SIL）无隶属、无赞助、无背书关系。产品名称仅作事实性指称使用。
- **观点归我们。** 比较性陈述反映的是特定时点的公开资料与个人体验——决策前请对照厂商最新文档核实。
- **字体：** Orbitron、Space Grotesk、IBM Plex Mono 以 **SIL Open Font License 1.1** 自托管捆绑——
  许可全文见 [`assets/fonts/licenses/`](./assets/fonts/licenses/)。中文 / 阿拉伯文 / 越南文用系统字体（不捆绑）。
- **无担保。** 软件按 MIT 许可原样提供——见 [`LICENSE`](./LICENSE)。

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

_用 📕 + 🛠 + 零依赖制成 —— **MIT** © 2026 Agent Lesson Book contributors_

</div>
