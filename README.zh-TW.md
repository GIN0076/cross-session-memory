<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 跨會話記憶 · Agent Lesson Book（錯題本）

### _錯題本 · 面向 AI 程式設計代理的零依賴跨會話記憶_

**教訓落盤，證據強制，每次會話自動注入。**

<sub>🌐 <a href="./README.md">English</a> · <a href="./README.zh-CN.md">简体中文</a> · **繁體中文** · <a href="./README.ar.md">العربية</a> · <a href="./README.vi.md">Tiếng Việt</a></sub>

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

> ### 🧠 `TOOLS/MEM.MJS` · **15 條指令** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**
>
> ### 🧩 `PLUGIN/DSH-MEMORY` · **DeepSeek Harness 外掛**（0.3.0 新增）
> **`mem_recall` · `mem_save` · `/memory recall|save|doctor|review|map|stats|draft`**

<details>
<summary>🎨 <b>點一下，看 ASCII 藝術字</b> ✨</summary>

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
<td align="center" width="20%"><img src="./assets/icons/durable.svg" width="56" alt="持久耐用 纯文本存储于磁碟"><br><b>持久耐用<br>純文字儲存於磁碟</b></td>
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="一搜即得 IDF 三路检索"><br><b>一搜即得<br>IDF 三路檢索</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="证据链强制 有据可查"><br><b>證據鏈強制<br>有據可查</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="自动注入 每会话 ≤2KB"><br><b>自動注入<br>每次會話 ≤2KB</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="一条命令 15 条命令 + 插件"><br><b>一條指令<br>15 條指令 + 外掛</b></td>
</tr>
</table>

**目錄** — [0.3.0 更新](#-030-更新) · [為什麼](#-為什麼還需要另一個記憶專案) · [功能](#-功能星系) · [兩種用法](#-兩種用法) · [條目格式](#-條目格式) · [指令](#%EF%B8%8F-指令面板) · [架構](#%EF%B8%8F-架構一張引擎兩張臉) · [安全](#-安全與信任模型) · [路線圖](#-路線圖)

---

## 🆕 0.3.0 更新

**外掛版（Plugin Edition）。** 教訓本現在可以**原生跑在 DeepSeek Harness 裡**——同一個零依賴引擎，兩張交付臉：

| | 獨立 CLI（0.2.x） | Harness 外掛（0.3.0） |
|---|---|---|
| 記憶進上下文 | `mem inject` 注入 `AGENTS.md` | 每回合注入提示詞（≤2KB，失敗降級） |
| 代理來搜 | 經 shell 跑 `mem.mjs search` | `mem_recall` 工具（教訓本 **+ 會話全文**） |
| 寫入教訓 | 經 shell 跑 `mem.mjs store` | `mem_save` 工具——**每次都先經人工審批** |
| 人工維護 | `mem.mjs` 指令 | `/memory recall\|save\|doctor\|review\|map\|stats\|draft` |

完整細節見 [`CHANGELOG.md`](./CHANGELOG.md) 與 [`plugin/README.md`](./plugin/README.md)。

---

## 🌟 為什麼還需要另一個記憶專案？

每一個新會話都從**失憶級的空白**開始。重量級記憶平台用向量資料庫、知識圖譜、閘道和 LLM 擷取管線來解決它——對一本**個人錯題本**來說，這是太多機械，也是太多攻擊面。

Agent Lesson Book 走的是相反的路：

> ### 🔥 _「教訓住在磁碟上——每個會話都讀它。記憶是資料，永遠不是指令。」_

**你得到的不是基礎設施，而是：**

- 📕 **四段式教訓** —— `Symptom / Cause / Fix / Verification`（或 現象 / 判定 / 解法 / 驗證）。
  「驗證」段沒有可核對的**證據引用**的教訓，**寫入時直接拒收**。證明不了自己的記憶，進不了本子。
- 🧾 **證據鏈，由程式碼強制** —— 每條驗證必須引用可定位的出處（路徑 / 檔名 / 章節 / issue 編號），
  未來的會話可以順著引用直鑽到證據。
- 📥 **自動注入** —— `mem inject` 把 ≤2KB 索引鏡射進 `AGENTS.md`；Harness 外掛則直接注入提示詞。
  每個新會話開工時記憶已在上下文裡。**失敗保險：超出預算 → 砍行；任何異常 → 靜默降級為指標慣例。絕不阻塞會話。**
- 🛡 **防投毒設計** —— 人工核准寫入、機密樣式拒寫、近似重複攔截、來源戳記、git 全量復原。
  （對照：OWASP ASI06「記憶與上下文投毒」——自動寫入型記憶系統正是靶子。）

---

## ✨ 功能星系

| 🔮 | 功能 | 為什麼重要 |
|---|---|---|
| 📕 | 四段式條目（中英雙語段名） | 結構經得起翻譯，也經得起時間 |
| 🔗 | 證據鏈關卡 | 沒證據 → 沒條目。專治「我好像記得」 |
| 📥 | `mem inject` 自動注入 | 不靠代理自律，記憶照樣進上下文 |
| 🧩 | **Harness 原生外掛** | 每回合提示詞裡都有索引——連 AGENTS.md 自律都不用靠 |
| 🔌 | **`mem_recall` 工具** | 教訓本 ∪ **既往會話全文**，一調即得 |
| ✍️ | **`mem_save` 工具 + 審批** | 即使代理想寫，也永遠先問人 |
| 💬 | **`/memory` 指令** | 聊天框裡維護：recall / save / doctor / review / map / stats / draft |
| 🎯 | IDF 加權三路檢索 | 字面 ∪ 中文 bigram/unigram ∪ `aliases` 同義；稀有詞勝出 |
| ✂️ | 命中附帶片段 | 不開檔案就能判斷相關性 |
| ♻️ | `supersedes` 自動歸檔 | 教訓會進化；舊版自動退入 `archive/` |
| 🗺 | `mem map` 文字圖譜 | 取代鏈 + 關聯邊 + 複核時間線 |
| 🍱 | `mem gather` 合議包 | 相關條目打包 ≤8KB 供綜整 |
| 📝 | `mem draft` 管線 | 先出骨架，人工核准，再入庫 |
| ⏰ | `review` 到期日 | 記憶會腐壞——90 天複核讓它保持誠實 |
| 🚫 | 近似重複攔截 | 兩個會話同一個教訓 → 一條條目，不是兩條 |
| 🌍 | `mem global-sync` 鏡射 | `scope: global` 的教訓跨工作區可及 |
| 🧪 | `mem stats` 埋點 | 檢索命中率——拿證據說話，不靠感覺 |
| 🩺 | `mem doctor` 體檢 | 索引預算、漂移、複核逾期——一條指令 |
| 🧪 | `install/smoke.mjs` E2E | 一條指令證明安裝無恙：關卡/檢索/注入/體檢 |
| 🈲 | UTF-8 / 中文安全 | 只用 Node 寫檔案；PowerShell 編碼坑有文件記載 |

---

## 🛠 技術光環

<table>
<tr><th>層級</th><th>選擇</th><th>亮點</th></tr>
<tr><td>執行環境</td><td><code>Node.js ≥ 18</code></td><td>🟢 零依賴 · 零服務 · 零 API 成本</td></tr>
<tr><td>儲存</td><td><code>.memory/</code> 純 Markdown</td><td>🧾 人類可讀 · 可 diff · git 友善</td></tr>
<tr><td>索引</td><td><code>MEMORY.md</code> ≤ 60 行 / 2KB</td><td>📥 硬上限封頂，被擠出的條目列在尾註</td></tr>
<tr><td>檢索</td><td>IDF + 中文 n-gram + aliases</td><td>🎯 不上向量資料庫的多路檢索</td></tr>
<tr><td>交付</td><td><code>AGENTS.md</code> 注入區塊 <b>+</b> Harness 外掛</td><td>🔌 一張引擎（<code>mem-core.mjs</code>）兩張臉</td></tr>
<tr><td>安全</td><td>核准 · 機密掃描 · Jaccard 關卡</td><td>🛡 四層防護（對 OWASP ASI06 有備而來）</td></tr>
</table>

**三條鐵律**（見 `docs/DESIGN.md`）：

1. **預算硬頂** —— 注入 = 索引原樣 ≤2KB；超出預算砍行。
2. **失敗降級** —— 索引讀不了 → 靜默降級為指標慣例。會話永不阻塞。
3. **人工核准寫入** —— 工具提案（`draft` / `mem_save`），人工處置（`store` / 審批）。

---

## 🚀 兩種用法

> **需求：** Node.js ≥ 18，再無其他。不裝 npm 套件、不起資料庫、不用 API key。
> （外掛臉額外需要 [DeepSeek Harness](https://github.com/deepseek-ai)；引擎依舊零依賴。）

### A · 獨立 CLI —— 丟進任何專案就能用

**第 1 步 —— 把資料夾拷進專案根目錄**（`AGENTS.md` 所在的目錄）：

```bash
cp -r cross-session-memory/* your-project/
cd your-project
```

**第 2 步 —— 一鍵引導：**

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

**第 3 步 —— 證明安裝無恙（可選但舒服）：**

```bash
node install/smoke.mjs        # E2E：闸门 · 检索 · 注入预算 · 体检
```

### B · DeepSeek Harness 外掛 —— 原生工具 + `/memory`

```
plugin_manager → install_bundle → target = <clone>/plugin/dsh-memory
```

一條指令掛上三件套（提示詞注入 · `mem_recall` / `mem_save` · `/memory`），破壞性重裝後重複這條指令即完整復原。
兩個依賴需先用 junction/link 物化——精確配方、設定項（`memoryCorePath`、`maxHits`）與六條驗收清單
都在 [`plugin/README.md`](./plugin/README.md)。

**第一條教訓**（依慣例先徵得使用者同意）：

```bash
node tools/mem.mjs draft ssh-timeout
# 编辑 .memory/drafts/<日期>-ssh-timeout.md —— 四段齐全，验证段带证据
node tools/mem.mjs store .memory/drafts/<日期>-ssh-timeout.md
node tools/mem.mjs doctor
```

就這樣。**從此每個新會話開工時，你的教訓索引已在上下文裡。**

---

## 📕 條目格式

四段。中英段名都收。缺「驗證」——或「驗證」段沒有可定位引用——**拒收**。

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

> 🧪 **親手試試關卡：**
> ```bash
> node tools/mem.mjs store examples/lesson-autocrlf.md   # ✅ 收
> # 再把验证段的引用删掉重试：
> node tools/mem.mjs store broken.md                     # ❌ 拒：无可定位引用
> ```

---

## ⌨️ 指令面板

### CLI —— `node tools/mem.mjs <指令>`

| 指令 | 作用 |
|---|---|
| `index` | 列印 / 重建預算內索引 |
| `inject` | 把注入區塊同步進 `AGENTS.md`（寫入時自動） |
| `list` | 列出全部條目與健康標記 |
| `search <q> [n]` | IDF 三路檢索，附片段 |
| `show <name>` | 列印單條全文 |
| `store <file\|-> [--overwrite] [--force]` | 校驗入庫（機密/重複/證據全關卡） |
| `forget <name>` | 歸檔，絕不硬刪 |
| `review <name>` | 刷新複核日期，review +90 天 |
| `draft [主題]` | 產生四段骨架草稿 |
| `map [name]` | 文字圖譜（取代 / 關聯 / 複核） |
| `gather <q>` | 合議包：相關條目 ≤8KB |
| `global-sync` | 跨工作區鏡射 `scope: global` 條目 |
| `stats [days]` | 檢索埋點（命中率） |
| `doctor` | 全量體檢——exit 0 且零提示即綠 |

### Harness 外掛

| 介面 | 作用 |
|---|---|
| 提示詞區塊 | 教訓索引 ≤2KB，每回合注入，失敗降級 |
| `mem_recall <query> [limit]` | 教訓本 ∪ 會話全文，合併排序 |
| `mem_save <content>` | 寫入一條教訓——**每次都先經審批** |
| `/memory recall <q>` | 同款檢索，人親手敲 |
| `/memory save <file.md>` | 入庫一條條目（親手敲即批准） |
| `/memory doctor \| review \| map \| stats \| draft` | 與 CLI 同款維護介面 |

---

## 🏗️ 架構：一張引擎，兩張臉

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

兩條鐵律在兩張臉上同樣成立：預算硬頂、失敗降級、人工核准寫入。

---

## 📂 儲存庫解剖

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

## 🔐 安全與信任模型

| 層級 | 機制 | 防禦目標 |
|---|---|---|
| 1️⃣ 溯源 | `originSessionId` + `created/verified` 戳記 | 沒有出處的主張 |
| 2️⃣ 審批 | 人工同意 + `store` 關卡 + **`mem_save` 恆 ask** | 代理過度熱心地寫 |
| 3️⃣ 偵測 | 機密樣式 · Jaccard ≥0.6 關卡 · 證據鏈 | 洩密、重複、謠言 |
| 4️⃣ 完整性 | git 復原（建議本地儲存庫） | 其他一切 |

> 記憶投毒是公認的攻擊類別（OWASP **ASI06**），自動寫入型記憶系統正是靶子。
> 本子**不經人手不寫一字**——外掛裡 `mem_save` **每次**呼叫都返回 `ask`，
> 審批策略為 `never` 時則乾脆拒之門外。

---

## 🗺 路線圖

- 🧩 **0.3.x** —— 外掛強化：`tools/result` 寫入埋點、夜間複核 timer、wiki-link 強校驗（M2）
- 🌱 **0.4** —— 會話中文檢索兜底補丁 · client 記憶面板 · `ctx.skills` · bigram 同義詞包 · `mem map` SVG 匯出（M3）
- 🌍 **更遠** —— 選用多本聯邦 · CLI i18n（`--lang`）
- 🚫 **不做** —— 向量資料庫 · 閘道 · 靜默自動寫入。觸發條件見 `docs/DESIGN.md`。

---

## 🤝 參與貢獻

歡迎送 PR——尤其是**新的教訓包**（記得去識別化！）和 README 翻譯。
送出前先跑 `node install/smoke.mjs` 到全綠。所有程式碼必須維持**零依賴**。

---

## ⚖️ 法律與署名

<div align="left">

- **非官方專案。** 與任何具名產品、公司或組織（包括 DeepSeek、Anthropic、OpenAI、Mem0、Zep、
  Letta、Cognee、騰訊雲、OWASP、SIL）無隸屬、無贊助、無背書關係。產品名稱僅作事實性指稱使用。
- **觀點歸我們。** 比較性陳述反映的是特定時點的公開資料與個人體驗——決策前請對照廠商最新文件核實。
- **字型：** Orbitron、Space Grotesk、IBM Plex Mono 以 **SIL Open Font License 1.1** 自託管捆綁——
  授權全文見 [`assets/fonts/licenses/`](./assets/fonts/licenses/)。中文 / 阿拉伯文 / 越南文使用系統字型（不捆綁）。
- **無擔保。** 本軟體依 MIT 授權原樣提供——見 [`LICENSE`](./LICENSE)。

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

_以 📕 + 🛠 + 零依賴打造 —— **MIT** © 2026 Agent Lesson Book contributors_

</div>
