<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 AGENT LESSON BOOK

### _錯題本 · Zero-Dependency Cross-Session Memory for AI Coding Agents（AI 程式設計代理的零依賴跨會話記憶）_

**教訓落盤，證據強制，每次會話自動注入。**

<sub>🌐 <a href="./README.md">English</a> · <a href="./README.zh-CN.md">简体中文</a> · **繁體中文** · <a href="./README.ar.md">العربية</a> · <a href="./README.vi.md">Tiếng Việt</a></sub>

</div>

<img src="./assets/banner.svg" alt="Agent Lesson Book — 错题本 · sổ lỗi · دفتر الدروس" width="100%">


<!-- Styling note: GitHub README renders no <style>; the look & feel lives in assets/banner.svg (self-hosted OFL fonts in assets/fonts/ are available for forks/themes). -->
<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div align="center">
  <img alt="授權 MIT" src="https://img.shields.io/badge/license-MIT-00ffa3?style=for-the-badge&labelColor=10173a&color=00ffa3&logoColor=00ffa3">
  <img alt="依賴 零" src="https://img.shields.io/badge/dependencies-zero-00e5ff?style=for-the-badge&labelColor=10173a">
  <img alt="執行環境 Node 18+" src="https://img.shields.io/badge/runtime-Node%20%E2%89%A5%2018-ff2fd6?style=for-the-badge&labelColor=10173a">
  <img alt="記憶預算 2KB" src="https://img.shields.io/badge/memory%20budget-2KB-ffd60a?style=for-the-badge&labelColor=10173a">
  <img alt="指令 15" src="https://img.shields.io/badge/commands-15-a86bff?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **15 條指令** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**

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
<td align="center" width="20%"><img src="./assets/icons/durable.svg" width="56" alt="持久保存 純文字寫進磁碟"><br><b>持久保存<br>純文字寫進磁碟</b></td>
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="隨找隨到 IDF 三路搜尋"><br><b>隨找隨到<br>IDF 三路搜尋</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="有憑有據 強制證據鏈"><br><b>有憑有據<br>強制證據鏈</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="自動注入 每次會話 ≤2KB"><br><b>自動注入<br>每次會話 ≤2KB</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="一條指令搞定 15 條指令的 CLI"><br><b>一條指令搞定<br>15 條指令的 CLI</b></td>
</tr>
</table>


---

## 🌟 為什麼還需要另一個記憶專案？

每一個全新的 AI 會話都從**形同失憶**的狀態開始。重量級記憶平台用向量資料庫、知識圖譜、
各式閘道與 LLM 擷取管線來解決這件事。為了一本**個人錯題本**，動用這麼多機械——
也暴露這麼多攻擊面。

Agent Lesson Book（錯題本）押的是完全相反的賭注：

> ### 🔥 _「教訓活在磁碟上——每個會話都來讀它。記憶是資料，絕不是指令。」_

**你得到的不是基礎設施，而是：**

- 📕 **四段式教訓** —— `Symptom / Cause / Fix / Verification`（或 現象 / 判定 / 解法 / 驗證）。
  若驗證段缺少可查證的**證據引用**，該條目在寫入當下就會被**拒絕**。
  無法自證的記憶，進不了這本錯題本。
- 🧾 **證據鏈，由程式碼強制執行** —— 每則驗證都必須引用可定位的出處
  （路徑 / 檔名 / 章節 / issue 編號），未來的會話能一路鑽到底、直達證據。
- 📥 **自動注入** —— `mem inject` 把 ≤2 KB 的索引鏡射到你的 `AGENTS.md`；每個新會話
  開場時，記憶就已經在上下文裡。**失敗也安全：超出預算 → 自動砍行；
  任何環節出錯 → 靜默失敗降級為純慣例。絕不阻塞任何會話。**
- 🛡 **從設計上反制記憶中毒** —— 人工核准才寫入、機密樣式拒收、
  近似重複攔截、來源戳記，以及完整的 git 復原。
  （對照：OWASP ASI06「記憶與上下文中毒」——自動寫入的記憶系統正是攻擊目標。）

---

## ✨ 功能星系

| 🔮 | 功能 | 為什麼重要 |
|---|---|---|
| 📕 | 四段式條目（雙語標籤） | 結構經得起翻譯，也經得起時間 |
| 🔗 | 證據鏈關卡 | 沒證據 → 不成條目。杜絕「我記得大概是這樣」 |
| 📥 | `mem inject` 自動注入 | 記憶不再仰賴代理的自律 |
| 🎯 | IDF 排序的三路搜尋 | 字面 ∪ 中日韓雙字/單字元 ∪ `aliases` 同義詞；稀有詞勝出 |
| ✂️ | 命中附帶片段 | 不用開檔案就能判斷相關性 |
| ♻️ | `supersedes` 自動歸檔 | 教訓會演化；舊版本自動退入 `archive/` |
| 🗺 | `mem map` 文字知識圖譜 | 取代鏈 + 相關連結 + 複核時間軸 |
| 🍱 | `mem gather` 會議包 | 相關條目打包 ≤8 KB，方便彙整研判 |
| 📝 | `mem draft` 流程 | 先出骨架、人工核准，再行寫入 |
| ⏰ | `review` 到期日 | 記憶會腐壞——90 天定期複核讓它保持誠實 |
| 🚫 | 近似重複攔截 | 兩個會話、同一課教訓 → 合成一條，不是兩條 |
| 🌍 | `mem global-sync` 鏡射 | `scope: global` 的教訓在任何工作區都取得到 |
| 🧪 | `mem stats` 遙測 | 搜尋命中率——拿證據說話，不憑感覺 |
| 🩺 | `mem doctor` 健康檢查 | 索引預算、內容偏移、逾期複核——一條指令全掌握 |
| 🈲 | UTF-8 / CJK 安全 | 只用 Node 寫檔；PowerShell 編碼陷阱均有文件記載 |

---

## 🛠 技術光環

<table>
<tr><th>層級</th><th>選擇</th><th>亮點</th></tr>
<tr><td>執行環境</td><td><code>Node.js ≥ 18</code></td><td>🟢 零依賴 · 零服務 · 零 API 成本</td></tr>
<tr><td>儲存</td><td><code>.memory/</code> 純 markdown</td><td>🧾 人類可讀 · 可比對 diff · git 友善</td></tr>
<tr><td>索引</td><td><code>MEMORY.md</code> ≤ 60 行 / 2 KB</td><td>📥 硬上限，超出者列在頁尾</td></tr>
<tr><td>檢索</td><td>IDF + CJK n-gram + aliases</td><td>🎯 不用向量資料庫也能多策略檢索</td></tr>
<tr><td>交付</td><td><code>AGENTS.md</code> 注入區塊</td><td>🔌 免插件，任何會讀 AGENTS.md 的代理都適用</td></tr>
<tr><td>安全</td><td>核准 · 機密掃描 · Jaccard 關卡</td><td>🛡 四層防護（對 OWASP ASI06 有備而來）</td></tr>
</table>

**三條硬規則**（出自 `docs/DESIGN.md`）：

1. **預算上限** —— 注入內容 = 索引原文 ≤ 2 KB；超出預算 → 自動砍行。
2. **失敗降級** —— 索引讀不出來 → 靜默退回指引慣例。會話永不卡住。
3. **人工核准寫入** —— 工具提案（`draft`），人類定奪（`store`）。

---

## 🚀 快速開始

> **需求：** Node.js ≥ 18。就這樣。不用 npm install、不用資料庫、不用 API key。

**步驟 1 —— 把資料夾丟進你的專案根目錄**（也就是 `AGENTS.md` 所在的資料夾）：

```bash
cp -r agent-lesson-book/* your-project/
cd your-project
```

**步驟 2 —— 一次完成初始化：**

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

**步驟 3 —— 寫下你的第一條教訓**（依慣例，先徵求使用者同意）：

```bash
node tools/mem.mjs draft ssh-timeout
# edit .memory/drafts/<date>-ssh-timeout.md — four sections, evidence in Verification
node tools/mem.mjs store .memory/drafts/<date>-ssh-timeout.md
node tools/mem.mjs doctor
```

就這樣。**從現在起，每個新會話開場都帶著你的教訓索引。**

---

## 📕 條目格式

四個段落。中英文標籤都接受。
少了驗證段——或驗證段沒有可定位的引用——就會被**拒絕**。

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

> 🧪 **試試這些關卡：**
> ```bash
> node tools/mem.mjs store examples/lesson-autocrlf.md   # ✅ accepted
> # now strip the reference from its Verification section and retry:
> node tools/mem.mjs store broken.md                     # ❌ rejected: no locatable reference
> ```

---

## ⌨️ 指令面板

| 指令 | 作用 |
|---|---|
| `mem.mjs index` | 列印 / 重新產生受預算管制的索引 |
| `mem.mjs inject` | 把注入區塊同步進 `AGENTS.md`（寫入時自動執行） |
| `mem.mjs list` | 列出所有條目與健康旗標 |
| `mem.mjs search <q> [n]` | IDF 三路搜尋，附片段 |
| `mem.mjs show <name>` | 印出單一完整條目 |
| `mem.mjs store <file\|-> [--overwrite] [--force]` | 驗證並寫入（機密 / 重複 / 證據三道關卡） |
| `mem.mjs forget <name>` | 歸檔，絕不硬刪除 |
| `mem.mjs review <name>` | 更新驗證日期，把複核日往後推 90 天 |
| `mem.mjs draft [topic]` | 產生四段式骨架 |
| `mem.mjs map [name]` | 文字知識圖譜（取代 / 相關 / 複核） |
| `mem.mjs gather <q>` | 會議包：相關條目 ≤8 KB |
| `mem.mjs global-sync` | 跨工作區鏡射 `scope: global` 條目 |
| `mem.mjs stats [days]` | 檢索遙測（命中率） |
| `mem.mjs doctor` | 完整健康檢查——exit 0 且零備註才算綠燈 |

---

## 📂 倉庫結構

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

## 🔐 安全與信任模型

| 層級 | 機制 | 防禦目標 |
|---|---|---|
| 1️⃣ 來源 | `originSessionId` + `created/verified` 戳記 | 沒有出處的主張 |
| 2️⃣ 核准 | 人工同意 + `store` 關卡 | 代理寫入過於躁進 |
| 3️⃣ 偵測 | 機密樣式 · Jaccard ≥0.6 關卡 · 證據鏈 | 洩漏、重複、謠言 |
| 4️⃣ 完整性 | git 復原（建議僅限本地） | 其他一切 |

> 記憶中毒是公認的攻擊類別（OWASP **ASI06**）。自動寫入的記憶系統正是靶心。
> 沒有人類點頭，這本錯題本**一個字都不寫**。

---

## 🗺 路線圖

- 🌱 **0.2.x** —— 雙字元同義詞包 · `mem map` SVG 匯出 · 依語言分版的 doctor 訊息
- 🌍 **0.3** —— 選用的多書聯邦 · CLI 國際化（`--lang`）
- 🚫 **不做** —— 向量資料庫 · 閘道 · 靜默自動寫入。觸發條件記在 `docs/DESIGN.md`。

---

## 🤝 貢獻

歡迎送 PR——特別是**新的教訓包**（務必去識別化！）與 README 翻譯。
送出前先跑 `node tools/mem.mjs doctor` 到全綠。所有程式碼必須維持**零依賴**。

---

## ⚖️ 法律與標示

<div align="left">

- **非官方專案。** 本專案為非官方專案，與文中提及的任何產品/公司/組織均無隸屬、贊助或認可關係
  （包括 DeepSeek、Anthropic、OpenAI、Mem0、Zep、Letta、Cognee、
  Tencent Cloud、OWASP 或 SIL）。產品名稱僅用於事實性的指名引用。
- **觀點為我們所有。** 比較陳述反映的是公開文件所載事實與特定時點的個人經驗——
  做決定前，請對照廠商最新文件加以查證。
- **字型：** Orbitron、Space Grotesk 與 IBM Plex Mono 依 **SIL Open Font
  License 1.1** 隨附——完整授權文字見 [`assets/fonts/licenses/`](./assets/fonts/licenses/)。
  中日韓文 / 阿拉伯文 / 越南文使用你的系統字型（不隨附任何字型）。
- **免責聲明。** 本軟體依 MIT 授權以「現狀」提供——詳見 [`LICENSE`](./LICENSE)。

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
