<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 AGENT LESSON BOOK

### _错题本 · Zero-Dependency Cross-Session Memory for AI Coding Agents_

**Lessons on disk. Evidence enforced. Auto-injected into every session.**

<sub>🌐 **English** · <a href="./README.zh-CN.md">简体中文</a> · <a href="./README.zh-TW.md">繁體中文</a> · <a href="./README.ar.md">العربية</a> · <a href="./README.vi.md">Tiếng Việt</a></sub>

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
  <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-00ffa3?style=for-the-badge&labelColor=10173a&color=00ffa3&logoColor=00ffa3">
  <img alt="dependencies zero" src="https://img.shields.io/badge/dependencies-zero-00e5ff?style=for-the-badge&labelColor=10173a">
  <img alt="runtime Node 18+" src="https://img.shields.io/badge/runtime-Node%20%E2%89%A5%2018-ff2fd6?style=for-the-badge&labelColor=10173a">
  <img alt="memory budget 2KB" src="https://img.shields.io/badge/memory%20budget-2KB-ffd60a?style=for-the-badge&labelColor=10173a">
  <img alt="commands 15" src="https://img.shields.io/badge/commands-15-a86bff?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **15 COMMANDS** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**

<details>
<summary>🎨 <b>Click to see the ASCII art</b> ✨</summary>

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
    <p><b>DURABLE</b>plain text on disk</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00ffa3"/><stop offset="1" stop-color="#00e5ff"/></linearGradient></defs><circle cx="21" cy="21" r="13" fill="none" stroke="url(#g2)" stroke-width="3"/><path d="M31 31l11 11" stroke="#ff2fd6" stroke-width="4" stroke-linecap="round"/><path d="M15 21l4 4 8-9" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>RETRIEVABLE</b>IDF 3-way search</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff2fd6"/><stop offset="1" stop-color="#ff8a00"/></linearGradient></defs><path d="M24 5l16 6v12c0 10-7 17-16 20-9-3-16-10-16-20V11z" fill="none" stroke="url(#g3)" stroke-width="3"/><path d="M17 24l5 5 9-10" fill="none" stroke="#00ffa3" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>AUDITED</b>evidence chain enforced</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd60a"/><stop offset="1" stop-color="#00ffa3"/></linearGradient></defs><path d="M24 42s-15-8-15-21a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 13-15 21-15 21z" fill="none" stroke="url(#g4)" stroke-width="3"/><path d="M24 12v10l6 4" fill="none" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round"/></svg>
    <p><b>AUTO-INJECT</b>≤2KB per session</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a86bff"/><stop offset="1" stop-color="#ff2fd6"/></linearGradient></defs><rect x="7" y="10" width="34" height="28" rx="4" fill="none" stroke="url(#g5)" stroke-width="3"/><path d="M14 20l6 4-6 4M24 28h10" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>ONE COMMAND</b>15-command CLI</p>
  </div>
</div>

---

## 🌟 Why another memory project?

Every new AI session starts **amnesia-grade clean**. Heavyweight memory platforms solve this with
vector databases, knowledge graphs, gateways and LLM extraction pipelines. That is a lot of
machinery — and a lot of attack surface — for a **personal mistake notebook**.

Agent Lesson Book takes the opposite bet:

> ### 🔥 _"The lesson lives on disk — and every session reads it. Memory is DATA, never instructions."_

**What you get instead of infrastructure:**

- 📕 **Four-section lessons** — `Symptom / Cause / Fix / Verification` (or 现象 / 判定 / 解法 / 验证).
  A lesson without a verifiable **evidence reference** in its Verification section is
  **rejected at write time**. Memories that cannot prove themselves do not enter the book.
- 🧾 **Evidence chain, enforced by code** — every Verification must cite a locatable reference
  (path / filename / section / issue number), so future sessions can drill straight to the proof.
- 📥 **Auto-injection** — `mem inject` mirrors the ≤2 KB index into your `AGENTS.md`; every new
  session starts with memory already in context. **Fail-safe: over budget → lines drop;
  anything breaks → silent degrade to plain conventions. Never blocks a session.**
- 🛡 **Anti-poisoning by design** — human-approved writes, secret-pattern rejection,
  near-duplicate interception, source stamps, and full git rollback.
  (Compare: OWASP ASI06 "memory & context poisoning" — auto-writing memory systems are the target.)

---

## ✨ Feature galaxy

| 🔮 | Feature | Why it matters |
|---|---|---|
| 📕 | Four-section entries (bilingual labels) | Structure survives translation and time |
| 🔗 | Evidence-chain gate | No proof → no entry. Kills "I remember something like that" |
| 📥 | `mem inject` auto-injection | Memory without relying on agent discipline |
| 🎯 | IDF-ranked 3-way search | Literal ∪ CJK bigram/unigram ∪ `aliases` synonyms; rare terms win |
| ✂️ | Snippets on hits | Judge relevance without opening files |
| ♻️ | `supersedes` auto-archive | Lessons evolve; old versions retire to `archive/` automatically |
| 🗺 | `mem map` text knowledge graph | Supersession chains + related links + review timeline |
| 🍱 | `mem gather` meeting pack | Related entries bundled ≤8 KB for synthesis |
| 📝 | `mem draft` pipeline | Skeleton first, human approval, then store |
| ⏰ | `review` due dates | Memory rots — 90-day checks keep it honest |
| 🚫 | Near-duplicate interception | Two sessions, same lesson → one entry, not two |
| 🌍 | `mem global-sync` mirror | `scope: global` lessons reachable from any workspace |
| 🧪 | `mem stats` telemetry | Search hit-rate — evidence, not vibes |
| 🩺 | `mem doctor` health check | Index budget, drift, stale reviews — one command |
| 🈲 | UTF-8 / CJK-safe | Node-only writes; PowerShell encoding traps documented |

---

## 🛠 Tech Aura

<table>
<tr><th>Layer</th><th>Choice</th><th>Glow</th></tr>
<tr><td>Runtime</td><td><code>Node.js ≥ 18</code></td><td>🟢 zero dependencies · zero services · zero API cost</td></tr>
<tr><td>Storage</td><td><code>.memory/</code> plain markdown</td><td>🧾 human-readable · diffable · git-friendly</td></tr>
<tr><td>Index</td><td><code>MEMORY.md</code> ≤ 60 lines / 2 KB</td><td>📥 hard-capped, overflow listed in footer</td></tr>
<tr><td>Retrieval</td><td>IDF + CJK n-gram + aliases</td><td>🎯 multi-strategy without a vector store</td></tr>
<tr><td>Delivery</td><td><code>AGENTS.md</code> injection block</td><td>🔌 plugin-free, works with any agent that reads AGENTS.md</td></tr>
<tr><td>Safety</td><td>approval · secret scan · Jaccard gate</td><td>🛡 four-layer defense (OWASP ASI06 aware)</td></tr>
</table>

**The three hard rules** (from `docs/DESIGN.md`):

1. **Budget cap** — injection = the index verbatim ≤ 2 KB; over budget → drop lines.
2. **Fail-degrade** — unreadable index → silent fallback to pointer conventions. Sessions never block.
3. **Human-approved writes** — the tool proposes (`draft`), the human disposes (`store`).

---

## 🚀 Quick Start

> **Requirements:** Node.js ≥ 18. Nothing else. No npm install, no database, no API key.

**Step 1 — drop the folder into your project root** (the folder where your `AGENTS.md` lives):

```bash
cp -r agent-lesson-book/* your-project/
cd your-project
```

**Step 2 — one-shot bootstrap:**

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

**Step 3 — your first lesson** (ask the user's consent first, per convention):

```bash
node tools/mem.mjs draft ssh-timeout
# edit .memory/drafts/<date>-ssh-timeout.md — four sections, evidence in Verification
node tools/mem.mjs store .memory/drafts/<date>-ssh-timeout.md
node tools/mem.mjs doctor
```

That's it. **Every new session now starts with your lesson index in context.**

---

## 📕 Entry Format

Four sections. Chinese and English labels are both accepted.
Missing Verification — or Verification without a locatable reference — is **rejected**.

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

> 🧪 **Try the gates:**
> ```bash
> node tools/mem.mjs store examples/lesson-autocrlf.md   # ✅ accepted
> # now strip the reference from its Verification section and retry:
> node tools/mem.mjs store broken.md                     # ❌ rejected: no locatable reference
> ```

---

## ⌨️ Command Palette

| Command | Effect |
|---|---|
| `mem.mjs index` | print / regenerate the budgeted index |
| `mem.mjs inject` | sync the injection block into `AGENTS.md` (auto on writes) |
| `mem.mjs list` | list all entries with health flags |
| `mem.mjs search <q> [n]` | IDF 3-way search with snippets |
| `mem.mjs show <name>` | print one full entry |
| `mem.mjs store <file\|-> [--overwrite] [--force]` | validate & store (secrets/dupes/evidence gated) |
| `mem.mjs forget <name>` | archive, never hard-delete |
| `mem.mjs review <name>` | refresh verification date, push review +90 days |
| `mem.mjs draft [topic]` | generate a four-section skeleton |
| `mem.mjs map [name]` | text knowledge graph (supersedes / related / review) |
| `mem.mjs gather <q>` | meeting pack: related entries ≤8 KB |
| `mem.mjs global-sync` | mirror `scope: global` entries cross-workspace |
| `mem.mjs stats [days]` | retrieval telemetry (hit-rate) |
| `mem.mjs doctor` | full health check — exit 0 & zero notes is green |

---

## 📂 Repository Anatomy

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

## 🔐 Security & Trust Model

| Layer | Mechanism | Defends against |
|---|---|---|
| 1️⃣ Provenance | `originSessionId` + `created/verified` stamps | unattributed claims |
| 2️⃣ Approval | human consent + `store` gate | agent over-eager writing |
| 3️⃣ Detection | secret patterns · Jaccard ≥0.6 gate · evidence chain | leaks, duplication, rumor |
| 4️⃣ Integrity | git rollback (local-only recommended) | everything else |

> Memory poisoning is a recognized attack class (OWASP **ASI06**). Auto-writing memory systems
> are the target. This book writes **nothing** without a human.

---

## 🗺 Roadmap

- 🌱 **0.2.x** — bigram synonym packs · `mem map` SVG export · per-language doctor messages
- 🌍 **0.3** — optional multi-book federation · CLI i18n (`--lang`)
- 🚫 **Won't do** — vector stores · gateways · silent auto-write. Triggers documented in `docs/DESIGN.md`.

---

## 🤝 Contributing

PRs welcome — especially **new lesson packs** (sanitized!) and README translations.
Run `node tools/mem.mjs doctor` green before submitting. All code must stay **zero-dependency**.

---

## ⚖️ Legal & attribution

<div class="legal">

- **Unofficial project.** Not affiliated with, sponsored by, or endorsed by any named product,
  company or organization (including DeepSeek, Anthropic, OpenAI, Mem0, Zep, Letta, Cognee,
  Tencent Cloud, OWASP, or the SIL). Product names are used only for factual, nominative reference.
- **Opinions are ours.** Comparison statements reflect publicly documented facts and personal
  experience at a point in time — verify against current vendor documentation before deciding.
- **Fonts:** Orbitron, Space Grotesk and IBM Plex Mono are bundled under the **SIL Open Font
  License 1.1** — full license texts in [`assets/fonts/licenses/`](./assets/fonts/licenses/).
  CJK / Arabic / Vietnamese text uses your system fonts (nothing bundled).
- **No warranty.** Software provided as-is under the MIT License — see [`LICENSE`](./LICENSE).

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

_Made with 📕 + 🛠 + zero dependencies — **MIT** © 2026 Agent Lesson Book contributors_

</div>
