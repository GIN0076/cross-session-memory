<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本
     colorful header banner (self-hosted OFL fonts + system CJK)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 跨会话记忆 · Agent Lesson Book（错题本）

### _面向 AI 编程代理的零依赖跨会话记忆_

**教训落盘，证据强制，自动注入每一次会话。**

<sub>🌐 <a href="./README.md">English</a> · **简体中文**</sub>

</div>

<img src="./assets/banner.svg" alt="Agent Lesson Book — 错题本" width="100%">


<!-- Styling note: GitHub README renders no <style>; the look & feel lives in assets/banner.svg (self-hosted OFL fonts in assets/fonts/ are available for forks/themes). -->
<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div align="center">
  <img alt="MIT 许可证" src="https://img.shields.io/badge/license-MIT-00ffa3?style=for-the-badge&labelColor=10173a&color=00ffa3&logoColor=00ffa3">
  <img alt="零依赖" src="https://img.shields.io/badge/dependencies-zero-00e5ff?style=for-the-badge&labelColor=10173a">
  <img alt="运行时 Node 18+" src="https://img.shields.io/badge/runtime-Node%20%E2%89%A5%2018-ff2fd6?style=for-the-badge&labelColor=10173a">
  <img alt="记忆预算 2KB" src="https://img.shields.io/badge/memory%20budget-2KB-ffd60a?style=for-the-badge&labelColor=10173a">
  <img alt="24 条命令" src="https://img.shields.io/badge/commands-24-a86bff?style=for-the-badge&labelColor=10173a">
  <img alt="78 测试" src="https://img.shields.io/badge/tests-78%20green-22b07d?style=for-the-badge&labelColor=10173a">
  <img alt="DeepSeek Harness 插件" src="https://img.shields.io/badge/plugin-DeepSeek%20Harness-00ffa3?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **24 条命令** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · drafts · approve · reject · prune-drafts · write-mode · explain · verify · feedback · map · gather · conflicts · resolve · global-sync · stats · doctor`**
>
> ### 🧩 `PLUGIN/DSH-MEMORY` · **DeepSeek Harness 插件**
> **`mem_recall` · `mem_save` · `/memory recall|save|doctor|review|map|conflicts|resolve|explain|verify|feedback|stats|draft|drafts|approve|reject|write-mode`**

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
<td align="center" width="20%"><img src="./assets/icons/durable.svg" width="56" alt="持久耐用 纯文本存储于磁盘"><br><b>持久耐用<br>纯文字儲存於磁碟</b></td>
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="一搜即得 IDF 三路检索"><br><b>一搜即得<br>IDF 三路檢索</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="证据链强制 有据可查"><br><b>證據鏈強制<br>有據可查</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="自动注入 每会话 ≤2KB"><br><b>自動注入<br>每次會話 ≤2KB</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="一条命令 24 条命令 + 插件"><br><b>一条命令<br>24 条命令 + 插件</b></td>
</tr>
</table>

**目录** — [0.5.0 有什么](#-050-有什么) · [为什么](#-为什么还要一个记忆项目) · [特性](#-特性星系) · [两种用法](#-两种用法) · [条目格式](#-条目格式) · [命令](#%EF%B8%8F-命令面板) · [架构](#%EF%B8%8F-架构一张引擎两张脸) · [安全](#-安全与信任模型) · [路线图](#-路线图)

---

## 🆕 0.5.0 有什么

教训本既能**独立 CLI**用，也能**原生跑在 DeepSeek Harness 里**——一个零依赖引擎、两张交付脸，外加 Harness 界面里的**只读设置卡**。

| | 独立 CLI | Harness 插件 |
|---|---|---|
| 记忆进上下文 | `mem inject` 注入 `AGENTS.md` | 每回合注入提示词（≤2KB，失败降级） |
| 代理来搜 | 经 shell 跑 `mem.mjs search` | `mem_recall` 工具（教训本 **+ 会话全文**） |
| 写入教训 | 经 shell 跑 `mem.mjs store` | `mem_save` 工具——按**写入模式**放行 |
| 人工维护 | `mem.mjs` 命令 | `/memory …`（17 个子命令） |
| 一眼总览 | `mem doctor` | **只读设置卡**——状态、可信度分布、召回命中率、条目搜索 |

**最近落地的**（详见 [`CHANGELOG.md`](./CHANGELOG.md)）：

- **只读设置卡** —— 一个 `settings.section` 视图：索引预算、条目数、写入模式、可信度分布、
  草稿/冲突数、近 7 天召回命中率、最近条目、条目搜索。**设计上只读**：数据来自同源路由、
  只有 `status` / `search`、绝无写入口；加载失败就降级回 `/memory`，聊天命令始终全功能。
- **写入模式** —— `write-mode approval | auto-draft | auto-low-risk | off`。`approval`（默认）
  每次模型写入都问人；自动模式让有闸门的引擎免弹窗写入；`off` 直接禁掉模型写入。
  人类命令永不受限。
- **可信度与生命周期** —— 每条条目按证据、新鲜度、冲突派生
  `verified / provisional / needs-review / stale / disputed`；`explain <name>` 看**为什么**可信，
  `verify` 跑白名单复核，`review` 用 90 天时钟保持诚实。
- **两阶段召回 + 反馈闭环** —— 候选集按可信度、新鲜度、**你实际用过哪些**（`feedback`）重排，
  让本子学会哪些教训真的有用。
- **冲突裁决** —— `conflicts` 列出矛盾对；`resolve <败方> --prefer <胜方> --reason …` 记录裁决，
  **双方条目都保留**（败方派生为 `stale`，绝不硬删）。
- **撑到 1000 条** —— 注入索引仍 ≤2KB（token 成本不变）；倒排索引 + mtime 解析缓存让搜索
  保持快（稳态约 1ms，随本子变大**不线性变慢**）。
- **隐私开关** —— `DSH_MEMORY_TELEMETRY=off` 停掉本地埋点写入；`scanPii` 拒收含邮箱或
  大陆手机号的条目。
- **扎实的发布** —— 70 个单测（14 文件）、零依赖发行冒烟、GitHub Actions 工作流
  （`sync-release --check` + 测试 + 冒烟 + 语法）。

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
- 🛡 **防投毒设计** —— 人工批准写入、密钥与 PII 模式拒写、近重复拦截、来源戳、git 全量回滚。
  （对照：OWASP ASI06「记忆与上下文投毒」——自动写入型记忆系统正是靶子。）

---

## ✨ 特性星系

| 🔮 | 特性 | 为什么重要 |
|---|---|---|
| 📕 | 四段式条目（中英双语段名） | 结构经得起翻译和时间 |
| 🔗 | 证据链闸门 | 没证据 → 没条目。专治「我好像记得」 |
| 📥 | `mem inject` 自动注入 | 不靠代理自觉，记忆照样进上下文 |
| 🧩 | **Harness 原生插件** | 每回合提示词里都有索引——连 AGENTS.md 自觉都不用靠 |
| 🖥 | **只读设置卡** | 状态、可信度、召回命中率、搜索一眼看全——没有任何写按钮 |
| 🔌 | **`mem_recall` 工具** | 教训本 ∪ **既往会话全文**，一调即得 |
| ✍️ | **`mem_save` 工具** | 按写入模式放行；`approval` 下永远先问人 |
| 🎛 | **写入模式** | `approval / auto-draft / auto-low-risk / off`——弹窗与自动化自己调；人类永不受限 |
| 💬 | **`/memory` 命令** | 聊天框 17 个子命令；亲手敲一条**就是**批准 |
| 🎯 | IDF 加权三路检索 | 字面 ∪ 中文 bigram/unigram ∪ `aliases` 同义；稀有词胜出 |
| 🔁 | **两阶段召回 + 反馈** | 候选按可信度、新鲜度、你真用过的重排 |
| 🔍 | **`explain` / `verify`** | 看一条**为什么**可信；复跑白名单证据检查 |
| ♻️ | `supersedes` 自动归档 | 教训会进化；旧版自动退入 `archive/` |
| ⚖️ | **冲突裁决** | `conflicts` 列矛盾；`resolve` 记裁决，双方都留 |
| 🗺 | `mem map` 文本图谱 | 六段：取代 · 因果 · 冲突 · 过期 · 时间线 · 根因 |
| 🍱 | `mem gather` 证据包 | 按可信度分层的证据供综合——**绝不生成结论** |
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
<tr><td>规模</td><td>最多 1000 条</td><td>⚡ 注入索引仍 2KB；搜索靠倒排索引扩展</td></tr>
<tr><td>检索</td><td>IDF + 中文 n-gram + aliases，两阶段重排</td><td>🎯 不上向量库的多路检索</td></tr>
<tr><td>交付</td><td><code>AGENTS.md</code> 注入段 <b>+</b> Harness 插件 + 设置卡</td><td>🔌 一张引擎（<code>mem-core.mjs</code>）两张脸</td></tr>
<tr><td>安全</td><td>审批 · 密钥/PII 扫描 · Jaccard 闸</td><td>🛡 四层防御（OWASP ASI06 有意识）</td></tr>
<tr><td>质量</td><td>78 测试 · 发行冒烟 · CI</td><td>🧪 每次改动都先过检查再发布</td></tr>
</table>

**三条铁律**（见 `docs/DESIGN.md`）：

1. **预算硬顶** —— 注入 = 索引原样 ≤2KB；超预算砍行。
2. **失败降级** —— 索引读不了 → 静默降级为指针约定。会话永不阻塞。
3. **人工批准写入** —— 工具提议（`draft` / `mem_save`），人来处置（`store` / 审批）。自动写入模式是**可选项**。

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

### B · DeepSeek Harness 插件 —— 原生工具 + `/memory` + 设置卡

```
plugin_manager → install_bundle → target = <clone>/plugin/dsh-memory
```

一条命令挂上三件套（提示词注入 · `mem_recall` / `mem_save` · `/memory`）外加**只读设置卡**。
精确的依赖配方、配置项（`memoryCorePath`、`maxHits`）与六条验收清单
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
| `search <q> [n] [--two-stage]` | IDF 三路检索带片段；`--two-stage` 按可信度/新鲜度/反馈重排 |
| `show <name>` | 打印单条全文 |
| `store <file\|-> [--overwrite] [--force] [--model]` | 校验入库（密钥/PII/重复/证据全闸） |
| `forget <name>` | 归档，永不硬删 |
| `review <name>` | 刷复核日期，review +90 天 |
| `draft [主题]` | 生成四段骨架草稿（落到 `drafts/`） |
| `drafts` | 列出待审批草稿 |
| `approve <草稿>` | 批准入库（走完整 store 闸） |
| `reject <草稿> [原因]` | 拒绝草稿——归档，永不硬删 |
| `write-mode [approval\|auto-draft\|auto-low-risk\|off]` | 读 / 设写入模式（模型受限，人类永不受限） |
| `explain <name>` | 一条为什么可信 —— 可信度、状态、证据、关系 |
| `verify [name\|--all]` | 跑验证配方（仅白名单，绝非任意 shell） |
| `feedback <q> <采用,csv> [原因]` | 记录这次召回被用在哪；后续召回会给被采用的加权 |
| `map [name]` | 文本图谱 —— 六段：取代链 · 因果链 · 冲突对 · 过期节点 · 复核时间线 · 根因归组 |
| `gather <q> [预算]` | 证据包按可信度分层 —— **绝不生成结论** |
| `conflicts` | 列出未决 `conflictsWith` 对 |
| `resolve <败方> --prefer <胜方> --reason <理由>` | 裁决冲突 —— 败方派生为 `stale`，双方都留 |
| `global-sync` | 跨工作区镜像 `scope: global` 条目 |
| `stats [天数]` | 检索埋点（命中率）；非整数回落 7 |
| `doctor` | 全量体检 —— **绿 = exit 0 = 零 findings**（notes 仅信息级） |

### Harness 插件

| 界面 | 作用 |
|---|---|
| 提示词段 | 教训索引 ≤2KB，每回合注入，失败降级 |
| `mem_recall <query> [limit]` | 教训本 ∪ 会话全文，合并排序 |
| `mem_save <content>` | 写入一条教训——按写入模式放行（`approval` 必问人） |
| `/memory <子命令>` | 16 个维护子命令——亲手敲一条**就是**批准 |
| 设置卡 | 只读状态 · 可信度 · 命中率 · 搜索 |

---

## 🏗️ 架构：一张引擎，两张脸

```
                    ┌───────────────────────────────────────────┐
                    │            .memory/  （数据）              │
                    │  *.md 条目 · MEMORY.md 索引 · 埋点        │
                    └────────────────────┬──────────────────────┘
                                         │
                              tools/mem.mjs  （引擎，24 条命令）
                                         │
                              tools/mem-core.mjs  （门面）
                          promptIndexText · formatRecall · saveAndSync
                                    ┌────┴─────┐
                                    │          │
                        CLI 脸 ─────┘          └──── plugin/dsh-memory
                    （AGENTS.md 注入段）           （Harness：提示词段
                                                 mem_recall · mem_save
                                                 · /memory · 设置卡）
```

两条铁律在两张脸上同样成立：预算硬顶、失败降级、人工批准写入。

---

## 📂 仓库解剖

```
cross-session-memory/
├── README.md · README.zh-CN.md
├── LICENSE · CHANGELOG.md · .gitignore
├── tools/
│   ├── mem.mjs            # 24 条命令的引擎（单文件，零依赖）
│   └── mem-core.mjs       # 共享门面——插件与 CLI 的单一入口
├── plugin/dsh-memory/     # DeepSeek Harness 插件包（插件版）
│   ├── index.js           #   提示词注入 · mem_recall · mem_save · /memory
│   ├── client.js          #   只读设置卡（settings.section）
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
| 2️⃣ 审批 | 人工同意 + `store` 闸 + 写入模式（`approval` **每次**都问） | 代理过度热心地写 |
| 3️⃣ 检出 | 密钥模式 · PII 闸 · Jaccard ≥0.6 闸 · 证据链 | 泄密、个人信息、重复、谣言 |
| 4️⃣ 完整性 | git 回滚（建议本地库） | 其他一切 |

> 记忆投毒是公认的攻击类别（OWASP **ASI06**），自动写入型记忆系统正是靶子。
> 默认写入模式**不经人手不写一字**——插件里 `mem_save` **每次**调用都返回 `ask`，
> 审批策略为 `never` 时干脆拒之门外，而设置卡**根本没有任何写按钮**。

---

## 🗺 路线图

- 🔌 **当前（0.5.x）** —— 以上功能均已发布；只做维护与打磨。
- 🌱 **更远** —— 可选多本联邦 · 更多中文会话检索兜底 ·
  可选 SQLite FTS5 召回（不进零依赖默认路径）。
- 🚫 **不做** —— 向量库 · 网关 · 静默自动写入。触发条件见 `docs/DESIGN.md`。

---

## 🤝 参与贡献

欢迎 PR——尤其是**新的教训包**（记得脱敏！）。提交前跑 `node install/smoke.mjs` 全绿。
所有代码必须保持**零依赖**。

---

## ⚖️ 法律与署名

<div align="left">

- **非官方项目。** 与任何具名产品、公司或组织（包括 DeepSeek、Anthropic、OpenAI、Mem0、Zep、
  Letta、Cognee、腾讯云、OWASP、SIL）无隶属、无赞助、无背书关系。产品名称仅作事实性指称使用。
- **观点归我们。** 比较性陈述反映的是特定时点的公开资料与个人体验——决策前请对照厂商最新文档核实。
- **字体：** Orbitron、Space Grotesk、IBM Plex Mono 以 **SIL Open Font License 1.1** 自托管捆绑——
  许可全文见 [`assets/fonts/licenses/`](./assets/fonts/licenses/)。中文用系统字体（不捆绑）。
- **无担保。** 软件按 MIT 许可原样提供——见 [`LICENSE`](./LICENSE)。

</div>

---

<div align="center">

```
  ╔═══════════════════════════════════════════════════════════╗
  ║   ★  L E S S O N S   L I V E   O N   D I S K  ★          ║
  ║      Evidence in, garbage out — never.                    ║
  ║      错题本 · lesson book                                 ║
  ╚═══════════════════════════════════════════════════════════╝
```

_用 📕 + 🛠 + 零依赖制成 —— **MIT** © 2026 Agent Lesson Book contributors_

</div>
