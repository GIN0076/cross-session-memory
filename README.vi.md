<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 AGENT LESSON BOOK

### _sổ lỗi · Bộ nhớ xuyên phiên, không phụ thuộc, cho các AI Coding Agent_

**Bài học nằm trên đĩa. Bằng chứng bắt buộc. Tự động tiêm vào mọi phiên.**

<sub>🌐 <a href="./README.md">English</a> · <a href="./README.zh-CN.md">简体中文</a> · <a href="./README.zh-TW.md">繁體中文</a> · <a href="./README.ar.md">العربية</a> · **Tiếng Việt**</sub>

</div>

<img src="./assets/banner.svg" alt="Agent Lesson Book — 错题本 · sổ lỗi · دفتر الدروس" width="100%">


<!-- Styling note: GitHub README renders no <style>; the look & feel lives in assets/banner.svg (self-hosted OFL fonts in assets/fonts/ are available for forks/themes). -->
<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div align="center">
  <img alt="giấy phép MIT" src="https://img.shields.io/badge/license-MIT-00ffa3?style=for-the-badge&labelColor=10173a&color=00ffa3&logoColor=00ffa3">
  <img alt="phụ thuộc: không" src="https://img.shields.io/badge/dependencies-zero-00e5ff?style=for-the-badge&labelColor=10173a">
  <img alt="runtime Node 18+" src="https://img.shields.io/badge/runtime-Node%20%E2%89%A5%2018-ff2fd6?style=for-the-badge&labelColor=10173a">
  <img alt="ngân sách bộ nhớ 2KB" src="https://img.shields.io/badge/memory%20budget-2KB-ffd60a?style=for-the-badge&labelColor=10173a">
  <img alt="15 lệnh" src="https://img.shields.io/badge/commands-15-a86bff?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **15 LỆNH** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**

<details>
<summary>🎨 <b>Nhấn để xem tranh ASCII</b> ✨</summary>

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
<td align="center" width="20%"><img src="./assets/icons/durable.svg" width="56" alt="BỀN VỮNG văn bản thuần lưu trên đĩa"><br><b>BỀN VỮNG<br>văn bản thuần lưu trên đĩa</b></td>
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="DỄ TRUY XUẤT tìm kiếm IDF 3 hướng"><br><b>DỄ TRUY XUẤT<br>tìm kiếm IDF 3 hướng</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="ĐƯỢC KIỂM CHỨNG chuỗi bằng chứng bắt buộc"><br><b>ĐƯỢC KIỂM CHỨNG<br>chuỗi bằng chứng bắt buộc</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="TỰ ĐỘNG TIÊM ≤2KB mỗi phiên"><br><b>TỰ ĐỘNG TIÊM<br>≤2KB mỗi phiên</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="MỘT LỆNH CLI 15 lệnh"><br><b>MỘT LỆNH<br>CLI 15 lệnh</b></td>
</tr>
</table>


---

## 🌟 Vì sao lại là một dự án bộ nhớ nữa?

Mỗi phiên AI mới đều bắt đầu **sạch đến mức như bị mất trí nhớ**. Những nền tảng bộ nhớ nặng ký xử lý chuyện này bằng cơ sở dữ liệu vector, đồ thị tri thức, gateway và các pipeline trích xuất bằng LLM. Đó là một núi máy móc — và một núi bề mặt tấn công — chỉ để phục vụ một **cuốn sổ ghi lỗi cá nhân**.

Agent Lesson Book đặt cược theo hướng hoàn toàn ngược lại:

> ### 🔥 _"Bài học sống trên đĩa — và mọi phiên đều đọc được nó. Bộ nhớ là DỮ LIỆU, tuyệt đối không phải chỉ thị."_

**Bạn nhận được gì, thay cho cả một hạ tầng cồng kềnh:**

- 📕 **Bản ghi bốn phần** — `Symptom / Cause / Fix / Verification` (hoặc 现象 / 判定 / 解法 / 验证).
  Một bài học thiếu **tham chiếu bằng chứng** có thể xác minh trong phần Verification sẽ bị
  **từ chối ngay khi ghi**. Ghi nhớ nào không tự chứng minh được sẽ không được bước vào cuốn sổ.
- 🧾 **Chuỗi bằng chứng, được siết bằng mã** — mọi phần Verification phải trích dẫn một tham chiếu
  định vị được (đường dẫn / tên tệp / chương / số issue), để các phiên sau lần thẳng đến được bằng chứng.
- 📥 **Tự động tiêm (chỉ mục)** — `mem inject` phản chiếu chỉ mục ≤2 KB vào `AGENTS.md` của bạn; mọi phiên
  mới đều bắt đầu với bộ nhớ sẵn trong ngữ cảnh. **Suy giảm an toàn: vượt ngân sách → cắt bớt dòng;
  có sự cố → âm thầm hạ cấp về quy ước thuần. Không bao giờ làm tắc phiên làm việc.**
- 🛡 **Chống nhiễm độc ngay từ thiết kế** — ghi dữ liệu phải có người phê duyệt, chặn mẫu bí mật,
  chặn bản sao gần trùng, đóng dấu nguồn gốc, và hoàn tác git toàn phần.
  (So sánh: OWASP ASI06 "memory & context poisoning" — hệ thống tự ghi nhớ chính là mục tiêu.)

---

## ✨ Ngân hà tính năng

| 🔮 | Tính năng | Vì sao quan trọng |
|---|---|---|
| 📕 | Bản ghi bốn phần (nhãn song ngữ) | Cấu trúc bền vững trước dịch thuật và thời gian |
| 🔗 | Cổng chuỗi bằng chứng | Không bằng chứng → không ghi vào. Chấm dứt kiểu "hình như tôi nhớ có thứ gì như thế" |
| 📥 | Tự động tiêm `mem inject` | Có bộ nhớ mà không phải trông cậy vào kỷ luật của agent |
| 🎯 | Tìm kiếm IDF 3 hướng | Nghĩa đen ∪ bigram/unigram CJK ∪ từ đồng nghĩa `aliases`; thuật ngữ hiếm được ưu tiên |
| ✂️ | Đoạn trích ở mỗi kết quả | Đánh giá độ liên quan khỏi cần mở tệp |
| ♻️ | Tự động lưu trữ theo `supersedes` | Bài học tiến hóa; bản cũ tự động được đưa về `archive/` |
| 🗺 | Đồ thị tri thức văn bản `mem map` | Chuỗi thay thế + liên kết liên quan + dòng thời gian rà soát |
| 🍱 | Gói họp `mem gather` | Đóng gói các bản ghi liên quan ≤8 KB để tổng hợp |
| 📝 | Quy trình `mem draft` | Dựng khung trước, người duyệt, rồi mới lưu |
| ⏰ | Hạn rà soát của `review` | Bộ nhớ cũng mục ruỗng — kiểm tra 90 ngày một lần để giữ nó trung thực |
| 🚫 | Chặn bản sao gần trùng | Hai phiên, cùng một bài học → một bản ghi, không phải hai |
| 🌍 | Gương `mem global-sync` | Bài học `scope: global` truy cập được từ mọi không gian làm việc |
| 🧪 | Telemetry `mem stats` | Tỷ lệ tìm trúng — bằng chứng, không phải cảm tính |
| 🩺 | Kiểm tra sức khỏe `mem doctor` | Ngân sách chỉ mục, độ lệch, bản rà soát quá hạn — một lệnh là đủ |
| 🈲 | An toàn UTF-8 / CJK | Chỉ ghi bằng Node; bẫy mã hóa của PowerShell đã có tài liệu |

---

## 🛠 Vầng sáng công nghệ

<table>
<tr><th>Tầng</th><th>Lựa chọn</th><th>Điểm sáng</th></tr>
<tr><td>Runtime</td><td><code>Node.js ≥ 18</code></td><td>🟢 không phụ thuộc · không dịch vụ · không tốn API</td></tr>
<tr><td>Lưu trữ</td><td><code>.memory/</code> markdown thuần</td><td>🧾 người đọc được · so diff được · thân thiện git</td></tr>
<tr><td>Chỉ mục</td><td><code>MEMORY.md</code> ≤ 60 dòng / 2 KB</td><td>📥 trần cứng, phần tràn được liệt kê ở chân trang</td></tr>
<tr><td>Truy xuất</td><td>IDF + CJK n-gram + aliases</td><td>🎯 đa chiến lược mà không cần vector store</td></tr>
<tr><td>Phân phối</td><td>khối tiêm <code>AGENTS.md</code></td><td>🔌 không cần plugin, chạy với mọi agent biết đọc AGENTS.md</td></tr>
<tr><td>An toàn</td><td>phê duyệt · quét bí mật · cổng Jaccard</td><td>🛡 phòng thủ bốn lớp (nhận diện OWASP ASI06)</td></tr>
</table>

**Ba quy tắc sắt** (trích từ `docs/DESIGN.md`):

1. **Trần ngân sách** — phần tiêm là nguyên văn chỉ mục, ≤ 2 KB; vượt ngân sách → cắt bớt dòng.
2. **Suy giảm an toàn (fail-degrade)** — chỉ mục không đọc được → âm thầm chuyển về quy ước con trỏ. Phiên làm việc không bao giờ bị chặn.
3. **Ghi có người phê duyệt** — công cụ đề xuất (`draft`), con người quyết định (`store`).

---

## 🚀 Bắt đầu nhanh

> **Yêu cầu:** Node.js ≥ 18. Không gì khác. Không cần npm install, không cần cơ sở dữ liệu, không cần API key.

**Bước 1 — thả thư mục này vào gốc dự án của bạn** (thư mục chứa `AGENTS.md` của bạn):

```bash
cp -r agent-lesson-book/* your-project/
cd your-project
```

**Bước 2 — khởi tạo trọn gói trong một lần:**

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

**Bước 3 — bài học đầu tiên của bạn** (theo quy ước, hãy xin phép người dùng trước):

```bash
node tools/mem.mjs draft ssh-timeout
# edit .memory/drafts/<date>-ssh-timeout.md — four sections, evidence in Verification
node tools/mem.mjs store .memory/drafts/<date>-ssh-timeout.md
node tools/mem.mjs doctor
```

Xong. **Từ nay, mọi phiên mới đều bắt đầu với chỉ mục bài học của bạn sẵn trong ngữ cảnh.**

---

## 📕 Định dạng bản ghi

Bốn phần. Nhãn tiếng Trung và tiếng Anh đều được chấp nhận.
Thiếu phần Verification — hoặc Verification không có tham chiếu định vị được — sẽ bị **từ chối**.

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

> 🧪 **Thử các cổng kiểm tra:**
> ```bash
> node tools/mem.mjs store examples/lesson-autocrlf.md   # ✅ accepted
> # now strip the reference from its Verification section and retry:
> node tools/mem.mjs store broken.md                     # ❌ rejected: no locatable reference
> ```

---

## ⌨️ Bảng lệnh

| Lệnh | Tác dụng |
|---|---|
| `mem.mjs index` | in / tạo lại chỉ mục trong ngân sách |
| `mem.mjs inject` | đồng bộ khối tiêm vào `AGENTS.md` (tự động khi ghi) |
| `mem.mjs list` | liệt kê mọi bản ghi kèm cờ sức khỏe |
| `mem.mjs search <q> [n]` | tìm kiếm IDF 3 hướng kèm đoạn trích |
| `mem.mjs show <name>` | in trọn vẹn một bản ghi |
| `mem.mjs store <file\|-> [--overwrite] [--force]` | kiểm tra & lưu (bí mật / trùng lặp / bằng chứng đều qua cổng) |
| `mem.mjs forget <name>` | lưu trữ, tuyệt đối không xóa cứng |
| `mem.mjs review <name>` | làm mới ngày kiểm chứng, đẩy hạn rà soát +90 ngày |
| `mem.mjs draft [topic]` | sinh khung bốn phần |
| `mem.mjs map [name]` | đồ thị tri thức văn bản (supersedes / related / review) |
| `mem.mjs gather <q>` | gói họp: các bản ghi liên quan ≤8 KB |
| `mem.mjs global-sync` | nhân bản các bản ghi `scope: global` xuyên không gian làm việc |
| `mem.mjs stats [days]` | telemetry truy xuất (tỷ lệ tìm trúng) |
| `mem.mjs doctor` | kiểm tra sức khỏe toàn phần — exit 0 & không có ghi chú nghĩa là xanh |

---

## 📂 Giải phẫu kho lưu trữ

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

## 🔐 Mô hình bảo mật & niềm tin

| Lớp | Cơ chế | Chống lại |
|---|---|---|
| 1️⃣ Nguồn gốc | `originSessionId` + dấu `created/verified` | các tuyên bố không rõ xuất xứ |
| 2️⃣ Phê duyệt | người dùng đồng ý + cổng `store` | agent viết quá hăng |
| 3️⃣ Phát hiện | mẫu bí mật · cổng Jaccard ≥0.6 · chuỗi bằng chứng | lộ bí mật, trùng lặp, tin đồn |
| 4️⃣ Toàn vẹn | hoàn tác git (khuyến nghị chỉ dùng cục bộ) | mọi thứ còn lại |

> Độc hại hóa bộ nhớ (memory poisoning) là một lớp tấn công đã được công nhận (OWASP **ASI06**).
> Mục tiêu là những hệ thống tự ghi nhớ. Cuốn sổ này **không ghi bất cứ điều gì** nếu thiếu con người.

---

## 🗺 Lộ trình

- 🌱 **0.2.x** — gói từ đồng nghĩa bigram · xuất SVG từ `mem map` · thông báo `doctor` theo từng ngôn ngữ
- 🌍 **0.3** — liên kết đa sổ (tùy chọn) · i18n cho CLI (`--lang`)
- 🚫 **Sẽ không làm** — vector store · gateway · tự ghi âm thầm. Các trường hợp bị loại trừ được ghi rõ trong `docs/DESIGN.md`.

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi PR — nhất là **các gói bài học mới** (đã được làm sạch!) và các bản dịch README.
Hãy chạy `node tools/mem.mjs doctor` cho xanh trước khi nộp. Mọi đoạn mã phải giữ trạng thái **không phụ thuộc**.

---

## ⚖️ Pháp lý & ghi công

<div align="left">

- **Dự án không chính thức.** Không liên kết, tài trợ hoặc được xác nhận bởi bất kỳ sản phẩm/công ty/tổ chức nào được nêu tên (bao gồm DeepSeek, Anthropic, OpenAI, Mem0, Zep, Letta, Cognee, Tencent Cloud, OWASP, hoặc SIL). Tên sản phẩm chỉ được dùng cho mục đích tham chiếu danh nghĩa, đúng sự thật.
- **Quan điểm là của chúng tôi.** Các phát biểu so sánh phản ánh sự thật được công bố công khai và kinh nghiệm cá nhân tại một thời điểm nhất định — hãy đối chiếu tài liệu hiện hành của nhà cung cấp trước khi quyết định.
- **Phông chữ:** Orbitron, Space Grotesk và IBM Plex Mono được đóng gói theo **SIL Open Font License 1.1** — toàn văn giấy phép trong [`assets/fonts/licenses/`](./assets/fonts/licenses/). Văn bản CJK / Ả Rập / Việt Nam dùng phông hệ thống của bạn (không có gì được đóng gói kèm).
- **Không bảo hành.** Phần mềm được cung cấp nguyên trạng theo giấy phép MIT — xem [`LICENSE`](./LICENSE).

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

_Làm bằng 📕 + 🛠 và không một phụ thuộc nào — **MIT** © 2026 các cộng tác viên Agent Lesson Book_

</div>
