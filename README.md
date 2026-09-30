<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本
     colorful header banner (self-hosted OFL fonts + system CJK)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 CROSS-SESSION MEMORY · Agent Lesson Book (错题本)

### _Zero-Dependency Cross-Session Memory for AI Coding Agents_

**Lessons on disk. Evidence enforced. Auto-injected into every session.**

<sub>🌐 **English** · <a href="./README.zh-CN.md">简体中文</a></sub>

</div>

<img src="./assets/banner.svg" alt="Agent Lesson Book — 错题本" width="100%">


<!-- Styling note: GitHub README renders no <style>; the look & feel lives in assets/banner.svg (self-hosted OFL fonts in assets/fonts/ are available for forks/themes). -->
<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div align="center">
  <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-00ffa3?style=for-the-badge&labelColor=10173a&color=00ffa3&logoColor=00ffa3">
  <img alt="dependencies zero" src="https://img.shields.io/badge/dependencies-zero-00e5ff?style=for-the-badge&labelColor=10173a">
  <img alt="runtime Node 18+" src="https://img.shields.io/badge/runtime-Node%20%E2%89%A5%2018-ff2fd6?style=for-the-badge&labelColor=10173a">
  <img alt="memory budget 2KB" src="https://img.shields.io/badge/memory%20budget-2KB-ffd60a?style=for-the-badge&labelColor=10173a">
  <img alt="commands 23" src="https://img.shields.io/badge/commands-23-a86bff?style=for-the-badge&labelColor=10173a">
  <img alt="tests 70" src="https://img.shields.io/badge/tests-70%20green-22b07d?style=for-the-badge&labelColor=10173a">
  <img alt="plugin DeepSeek Harness" src="https://img.shields.io/badge/plugin-DeepSeek%20Harness-00ffa3?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **23 COMMANDS** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · drafts · approve · reject · write-mode · explain · verify · feedback · map · gather · conflicts · resolve · global-sync · stats · doctor`**
>
> ### 🧩 `PLUGIN/DSH-MEMORY` · **DEEPSEEK HARNESS PLUGIN**
> **`mem_recall` · `mem_save` · `/memory recall|save|doctor|review|map|conflicts|resolve|explain|verify|feedback|stats|draft|drafts|approve|reject|write-mode`**

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


<table>
<tr>
<td align="center" width="20%"><img src="./assets/icons/durable.svg" width="56" alt="DURABLE plain text on disk"><br><b>DURABLE<br>plain text on disk</b></td>
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="RETRIEVABLE IDF 3-way search"><br><b>RETRIEVABLE<br>IDF 3-way search</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="AUDITED evidence chain enforced"><br><b>AUDITED<br>evidence chain enforced</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="AUTO-INJECT ≤2KB per session"><br><b>AUTO-INJECT<br>≤2KB per session</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="ONE COMMAND 23-command CLI"><br><b>ONE COMMAND<br>23-command CLI + plugin</b></td>
</tr>
</table>

**Contents** — [What's in v0.5.0](#-whats-in-v050) · [Why](#-why-another-memory-project) · [Features](#-feature-galaxy) · [Two ways to run](#-two-ways-to-run) · [Entry format](#-entry-format) · [Commands](#%EF%B8%8F-command-palette) · [Architecture](#%EF%B8%8F-architecture-two-faces-one-engine) · [Security](#-security--trust-model) · [Roadmap](#-roadmap)

---

## 🆕 What's in v0.5.0

The lesson book runs standalone **and** natively inside **DeepSeek Harness** — one
zero-dependency engine, two delivery faces, plus a read-only settings card in the
Harness UI.

| | Standalone CLI | Harness plugin |
|---|---|---|
| Memory in context | `mem inject` block in `AGENTS.md` | prompt section every turn (≤ 2 KB, fail-degrade) |
| Search from the agent | run `mem.mjs search` via shell | `mem_recall` tool (lesson book **+ session full-text**) |
| Write a lesson | `mem.mjs store` via shell | `mem_save` tool — gated by the write mode |
| Human maintenance | `mem.mjs` commands | `/memory …` (16 subcommands) |
| At a glance | `mem doctor` | **read-only Settings card** — status, confidence mix, recall hit-rate, entry search |

**What landed recently** (see [`CHANGELOG.md`](./CHANGELOG.md)):

- **Read-only Settings card** — a `settings.section` view of index budget, entry count,
  write mode, confidence mix, draft/conflict counts, 7-day recall hit-rate, recent entries
  and an entry search. It is **read-only by design**: data comes from a same-origin route
  with only `status` / `search`, never a write path; if it can't load, it degrades to a
  pointer back to `/memory`, which stays fully functional.
- **Write modes** — `write-mode approval | auto-draft | auto-low-risk | off`. `approval`
  (the default) asks a human on every model write; the auto modes let a well-gated engine
  write without prompts, and `off` blocks model writes outright. Human commands are never
  gated.
- **Confidence & lifecycle** — every entry derives `verified / provisional / needs-review /
  stale / disputed` from evidence, freshness and conflicts; `explain <name>` shows *why* an
  entry is trusted, `verify` runs whitelisted re-checks, and `review` keeps it honest on a
  90-day clock.
- **Two-stage recall + feedback loop** — candidate search reranks by confidence, freshness
  and what you actually adopted (`feedback`), so the book learns which lessons proved useful.
- **Conflict adjudication** — `conflicts` lists contradicting pairs; `resolve <loser> --prefer
  <winner> --reason …` records a verdict while **keeping both entries** (the loser derives
  to `stale`, nothing is hard-deleted).
- **Scales to 1,000 entries** — the injected index stays ≤ 2 KB (token cost unchanged); an
  inverted index plus an mtime parse cache keep search fast (≈ 1 ms steady-state, flat as
  the book grows).
- **Privacy switches** — `DSH_MEMORY_TELEMETRY=off` stops local telemetry writes; a `scanPii`
  gate refuses entries containing an email address or mainland mobile number.
- **Hardened release** — 70 unit tests (14 files), a zero-dependency release smoke, and a
  GitHub Actions workflow (`sync-release --check` + tests + smoke + syntax).

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
- 📥 **Auto-injection** — `mem inject` mirrors the ≤ 2 KB index into your `AGENTS.md`; the Harness
  plugin injects it into the prompt directly. Every new session starts with memory already in
  context. **Fail-safe: over budget → lines drop; anything breaks → silent degrade to plain
  conventions. Never blocks a session.**
- 🛡 **Anti-poisoning by design** — human-approved writes, secret- and PII-pattern rejection,
  near-duplicate interception, source stamps, and full git rollback.
  (Compare: OWASP ASI06 "memory & context poisoning" — auto-writing memory systems are the target.)

---

## ✨ Feature galaxy

| 🔮 | Feature | Why it matters |
|---|---|---|
| 📕 | Four-section entries (bilingual labels) | Structure survives translation and time |
| 🔗 | Evidence-chain gate | No proof → no entry. Kills "I remember something like that" |
| 📥 | `mem inject` auto-injection | Memory without relying on agent discipline |
| 🧩 | **Native Harness plugin** | Index in the prompt every turn — not even AGENTS.md discipline needed |
| 🖥 | **Read-only Settings card** | Status, confidence, recall hit-rate and search at a glance — no write buttons |
| 🔌 | **`mem_recall` tool** | Lesson book ∪ **past-session full-text** in one call |
| ✍️ | **`mem_save` tool** | Writes gated by the write mode; `approval` always asks a human first |
| 🎛 | **Write modes** | `approval / auto-draft / auto-low-risk / off` — tune prompts vs automation; humans never gated |
| 💬 | **`/memory` command** | 16 subcommands from the chat box; typing one **is** the approval |
| 🎯 | IDF-ranked 3-way search | Literal ∪ CJK bigram/unigram ∪ `aliases` synonyms; rare terms win |
| 🔁 | **Two-stage recall + feedback** | Candidates rerank by confidence, freshness and what you actually used |
| 🔍 | **`explain` / `verify`** | See *why* an entry is trusted; re-run whitelisted evidence checks |
| ♻️ | `supersedes` auto-archive | Lessons evolve; old versions retire to `archive/` automatically |
| ⚖️ | **Conflict adjudication** | `conflicts` lists contradictions; `resolve` records a verdict, both sides kept |
| 🗺 | `mem map` text knowledge graph | Six sections: supersede · causal · conflicts · expired · timeline · root causes |
| 🍱 | `mem gather` evidence pack | Confidence-tiered evidence for synthesis — **never writes a conclusion** |
| 📝 | `mem draft` pipeline | Skeleton first, human approval, then store |
| ⏰ | `review` due dates | Memory rots — 90-day checks keep it honest |
| 🚫 | Near-duplicate interception | Two sessions, same lesson → one entry, not two |
| 🌍 | `mem global-sync` mirror | `scope: global` lessons reachable from any workspace |
| 🧪 | `mem stats` telemetry | Search hit-rate — evidence, not vibes |
| 🩺 | `mem doctor` health check | Index budget, drift, stale reviews — one command |
| 🧪 | `install/smoke.mjs` E2E | One command proves an install: gates, search, injection, doctor |
| 🈲 | UTF-8 / CJK-safe | Node-only writes; PowerShell encoding traps documented |

---

## 🛠 Tech Aura

<table>
<tr><th>Layer</th><th>Choice</th><th>Glow</th></tr>
<tr><td>Runtime</td><td><code>Node.js ≥ 18</code></td><td>🟢 zero dependencies · zero services · zero API cost</td></tr>
<tr><td>Storage</td><td><code>.memory/</code> plain markdown</td><td>🧾 human-readable · diffable · git-friendly</td></tr>
<tr><td>Index</td><td><code>MEMORY.md</code> ≤ 60 lines / 2 KB</td><td>📥 hard-capped, overflow listed in footer</td></tr>
<tr><td>Scale</td><td>up to 1,000 entries</td><td>⚡ injected index stays 2 KB; search scales via inverted index</td></tr>
<tr><td>Retrieval</td><td>IDF + CJK n-gram + aliases, two-stage rerank</td><td>🎯 multi-strategy without a vector store</td></tr>
<tr><td>Delivery</td><td><code>AGENTS.md</code> block <b>+</b> Harness plugin + Settings card</td><td>🔌 two faces over one engine (<code>mem-core.mjs</code>)</td></tr>
<tr><td>Safety</td><td>approval · secret/PII scan · Jaccard gate</td><td>🛡 four-layer defense (OWASP ASI06 aware)</td></tr>
<tr><td>Quality</td><td>70 tests · release smoke · CI</td><td>🧪 every change is checked before it ships</td></tr>
</table>

**The three hard rules** (from `docs/DESIGN.md`):

1. **Budget cap** — injection = the index verbatim ≤ 2 KB; over budget → drop lines.
2. **Fail-degrade** — unreadable index → silent fallback to pointer conventions. Sessions never block.
3. **Human-approved writes** — the tool proposes (`draft` / `mem_save`), the human disposes (`store` / approval). The auto write-modes are opt-in.

---

## 🚀 Two ways to run

> **Requirements:** Node.js ≥ 18. Nothing else. No npm install, no database, no API key.
> (The plugin face additionally needs [DeepSeek Harness](https://github.com/deepseek-ai); the
> engine stays zero-dependency.)

### A · Standalone CLI — drop it into any project

**Step 1 — copy the folder into your project root** (the folder where your `AGENTS.md` lives):

```bash
cp -r cross-session-memory/* your-project/
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

**Step 3 — prove the install (optional but lovely):**

```bash
node install/smoke.mjs        # E2E: gates · search · injection budget · doctor
```

### B · DeepSeek Harness plugin — native tools + `/memory` + Settings card

```
plugin_manager → install_bundle → target = <clone>/plugin/dsh-memory
```

That one command mounts the whole trio (prompt injection · `mem_recall` / `mem_save` ·
`/memory`) plus the read-only Settings card. Exact dependency recipe, configuration keys
(`memoryCorePath`, `maxHits`) and a six-item acceptance checklist live in
[`plugin/README.md`](./plugin/README.md).

**Your first lesson** (ask the user's consent first, per convention):

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

### CLI — `node tools/mem.mjs <command>`

| Command | Effect |
|---|---|
| `index` | print / regenerate the budgeted index |
| `inject` | sync the injection block into `AGENTS.md` (auto on writes) |
| `list` | list all entries with health flags |
| `search <q> [n] [--two-stage]` | IDF 3-way search with snippets; `--two-stage` reranks by confidence / freshness / feedback |
| `show <name>` | print one full entry |
| `store <file\|-> [--overwrite] [--force] [--model]` | validate & store (secrets/PII/dupes/evidence gated) |
| `forget <name>` | archive, never hard-delete |
| `review <name>` | refresh verification date, push review +90 days |
| `draft [topic]` | generate a four-section skeleton (lands in `drafts/`) |
| `drafts` | list pending drafts |
| `approve <draft>` | approve a draft into the book (full store gate) |
| `reject <draft> [reason]` | reject a draft — archived, never hard-deleted |
| `write-mode [approval\|auto-draft\|auto-low-risk\|off]` | read / set the write mode (models are gated, humans never are) |
| `explain <name>` | why an entry is trusted — confidence, state, evidence, relations |
| `verify [name\|--all]` | run verification recipes (whitelist only, never arbitrary shell) |
| `feedback <q> <adopted,csv> [reason]` | record what a recall was used for; later recalls boost adopted entries |
| `map [name]` | text knowledge graph — six sections: supersede chains · causal chains · conflict pairs · expired nodes · review timeline · common-root grouping |
| `gather <q> [budget]` | evidence pack, confidence-tiered — **never writes a conclusion** |
| `conflicts` | list unresolved `conflictsWith` pairs |
| `resolve <loser> --prefer <winner> --reason <text>` | adjudicate a conflict — loser derives to `stale`, both entries kept |
| `global-sync` | mirror `scope: global` entries cross-workspace |
| `stats [days]` | retrieval telemetry (hit-rate); non-integer falls back to 7 |
| `doctor` | full health check — **green = exit 0 = zero findings** (notes are informational) |

### Harness plugin

| Surface | Effect |
|---|---|
| prompt section | lesson index ≤ 2 KB, every turn, fail-degrade |
| `mem_recall <query> [limit]` | lesson book ∪ session full-text, merged & ranked |
| `mem_save <content>` | write one lesson — gated by the write mode (`approval` always asks) |
| `/memory <subcommand>` | 16 maintenance subcommands — typing one **is** the approval |
| Settings card | read-only status · confidence · hit-rate · search |

---

## 🏗️ Architecture: two faces, one engine

```
                    ┌───────────────────────────────────────────┐
                    │            .memory/  (DATA)               │
                    │  *.md lessons · MEMORY.md index · stats   │
                    └────────────────────┬──────────────────────┘
                                         │
                              tools/mem.mjs  (engine, 23 commands)
                                         │
                              tools/mem-core.mjs  (facade)
                          promptIndexText · formatRecall · saveAndSync
                                    ┌────┴─────┐
                                    │          │
                        CLI face ───┘          └─── plugin/dsh-memory
                     (AGENTS.md block)          (Harness: prompt section
                                                mem_recall · mem_save
                                                · /memory · Settings card)
```

Hard rules hold across both faces: budget cap, fail-degrade, human-approved writes.

---

## 📂 Repository Anatomy

```
cross-session-memory/
├── README.md · README.zh-CN.md
├── LICENSE · CHANGELOG.md · .gitignore
├── tools/
│   ├── mem.mjs            # the 23-command engine (single file, zero deps)
│   └── mem-core.mjs       # shared facade — the single entry for plugin & CLI
├── plugin/dsh-memory/     # DeepSeek Harness bundle (Plugin Edition)
│   ├── index.js           #   prompt injection · mem_recall · mem_save · /memory
│   ├── client.js          #   read-only Settings card (settings.section)
│   ├── cordis.patch.yml   #   loader rows + config (memoryCorePath, maxHits)
│   ├── locale/            #   en / zh metadata
│   └── README.md          #   install · dependency materialization · acceptance
├── install/
│   ├── setup.mjs          # one-shot bootstrap
│   └── smoke.mjs          # end-to-end smoke test
├── templates/             # AGENTS.md.example + entry.example.md
├── docs/                  # DESIGN · COMMANDS · RESTORE · ATTRIBUTION
├── examples/              # real sanitized lessons
└── assets/fonts/          # self-hosted OFL fonts + license texts
```

---

## 🔐 Security & Trust Model

| Layer | Mechanism | Defends against |
|---|---|---|
| 1️⃣ Provenance | `originSessionId` + `created/verified` stamps | unattributed claims |
| 2️⃣ Approval | human consent + `store` gate + write mode (`approval` asks **every** call) | agent over-eager writing |
| 3️⃣ Detection | secret patterns · PII gate · Jaccard ≥0.6 gate · evidence chain | leaks, PII, duplication, rumor |
| 4️⃣ Integrity | git rollback (local-only recommended) | everything else |

> Memory poisoning is a recognized attack class (OWASP **ASI06**). Auto-writing memory systems
> are the target. The default write mode **never** writes without a human — `mem_save` returns
> `ask` on **every** call, a `never` approval policy refuses it outright, and the Settings card
> exposes **no write buttons** at all.

---

## 🗺 Roadmap

- 🔌 **Now (0.5.x)** — everything above is shipped; maintenance and polish only.
- 🌱 **later** — optional multi-book federation · more CJK session-search fallbacks ·
  optional SQLite FTS5 recall (stays off the zero-dependency default).
- 🚫 **Won't do** — vector stores · gateways · silent auto-write. Triggers documented in `docs/DESIGN.md`.

---

## 🤝 Contributing

PRs welcome — especially **new lesson packs** (sanitized!). Run `node install/smoke.mjs` green
before submitting. All code must stay **zero-dependency**.

---

## ⚖️ Legal & attribution

<div align="left">

- **Unofficial project.** Not affiliated with, sponsored by, or endorsed by any named product,
  company or organization (including DeepSeek, Anthropic, OpenAI, Mem0, Zep, Letta, Cognee,
  Tencent Cloud, OWASP, or the SIL). Product names are used only for factual, nominative reference.
- **Opinions are ours.** Comparison statements reflect publicly documented facts and personal
  experience at a point in time — verify against current vendor documentation before deciding.
- **Fonts:** Orbitron, Space Grotesk and IBM Plex Mono are bundled under the **SIL Open Font
  License 1.1** — full license texts in [`assets/fonts/licenses/`](./assets/fonts/licenses/).
  CJK text uses your system fonts (nothing bundled).
- **No warranty.** Software provided as-is under the MIT License — see [`LICENSE`](./LICENSE).

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

_Made with 📕 + 🛠 + zero dependencies — **MIT** © 2026 Agent Lesson Book contributors_

</div>
