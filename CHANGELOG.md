# Changelog

## Plugin 1.2.1 / Bundle 0.5.1 — 2026-09-30 — README rewritten, bilingual-only docs

Documentation pass: both READMEs rewritten to describe what v0.5.0 actually ships
(honestly, without hype), and the document set is trimmed to two languages.

### Changed
- **README rewritten (English + 简体中文)** — the "What's new" section now covers the
  current surface instead of 0.3.0: the read-only Settings card, the four write modes,
  confidence/lifecycle + `explain`/`verify`, two-stage recall with the feedback loop,
  conflict adjudication, the 1,000-entry ceiling with inverted-index search, privacy
  switches, and the test/CI baseline. Feature table, tech-aura table, architecture and
  repository tree updated to match; roadmap no longer lists shipped work. Numbers are the
  measured ones (23 commands, 70 tests, ~1 ms steady-state search) — no embellishment.
- **Docs trimmed to two languages** — `README.zh-TW.md`, `README.ar.md` and `README.vi.md`
  are removed; the language switcher and repository tree reference only English and
  简体中文. The docs-alignment test now pins the two-language set and asserts the language
  links point at files that exist (no dangling references).

## Plugin 1.2.0 / Bundle 0.5.0 — 2026-09-30 — entry cap 1000, search inverted index, English tail

Follow-up to 0.4.0: performance work that matters at scale, a higher entry cap, and a
complete English surface for the CLI.

### Changed
- **Entry cap raised 200 → 1000** (`LIMITS.entries`). The injected index stays ≤ 2 KB / 60
  lines (token cost per turn is unchanged — only the most valuable entries are injected;
  the rest are reachable via `mem_recall`). This decouples "how many lessons you can store"
  from "how much prompt you pay".
- **Search inverted index (phase 8)** — `searchEntries` now builds a bigram/char inverted
  index (`searchIndexOf`) to shrink the candidate set, then runs the *unchanged* scoring
  pass over candidates only. `entriesContaining` intersects posting lists and verifies with
  an exact `includes`, so results are **bit-for-bit identical** to the brute-force scan
  (pinned by a 17-query equivalence test).
- **`listEntries` parse cache** — the real hot spot was re-reading and re-parsing every
  entry file on each search (39 ms at N=1000, ~47% of a search). A mtime/size fingerprint
  cache cuts it to ~9.5 ms; steady-state search is now **~1.1 ms and flat as N grows**
  (a cold 42 ms reading was measurement noise from the uncached disk reads).
- **Near-duplicate pre-filter** — `findNearDuplicates` skips pairs whose shingle-set size
  ratio is already below the Jaccard threshold (a strict upper bound: `J ≤ min/max`), so no
  near-duplicate can be missed while most full intersections are avoided.
- **`connection` inject fix** — the read-only RPC's auth fence reads `ctx.connection`, which
  is a strict proxy; without declaring `connection` in `inject` it threw and the DSH
  webserver turned that into a bare-body 400. The host handler now also wraps any uncaught
  error into a JSON 500 (readable) instead of the bare 400, and the client surfaces the
  response body on failure.

### i18n
- English tail completed: `map`'s six graph sections and relation arrows, `gather`'s
  section headings and evidence lines, and all CLI status lines (`[reviewed]`, `[stored]`,
  `[failed]`, …) now go through `t()` with `MESSAGES_EN` entries. Entry *content*
  (lesson descriptions/bodies) is deliberately left untranslated — it is data, not UI copy.

## Plugin 1.1.0 / Bundle 0.4.0 — 2026-09-30 — read-only settings card, 16 subcommands, phase-8 hardening

The biggest release since 0.3.0. The plugin gains a **client half** for the first
time (a read-only Settings card), the `/memory` command surface is completed, and the
engine picks up performance/privacy hardening. The bundle entry is now a **single
entry** (`exports["."]` and the patch row both point at `./index.js`).

### Added
- **Read-only Settings card (phase 7.3)** — `plugin/dsh-memory/client.js` registers a
  `settings.section` entry (`id: memory`) showing index budget, entry count, write
  mode, confidence mix, draft/conflict counts, 7-day recall hit rate, recent entries
  and an entry search. Data comes from a **same-origin, read-only** `POST /dsh-memory-rpc`
  (`status` / `search` only — never a write path) registered by the host half with a
  connection-auth + loopback + same-origin triple fence. Theme tokens only
  (`--dsw-alias-*`), no iframe, no cross-plugin DOM. On failure the card degrades to a
  pointer back to `/memory` — the chat command stays fully functional.
- **`/memory` completed to 16 subcommands** — `conflicts`, `resolve <loser> --prefer
  <winner> --reason <text>` (phase 6 adjudication), `explain`, `verify`, `feedback`
  (phase 7.2), plus the existing recall/save/doctor/review/map/stats/draft/drafts/
  approve/reject/write-mode. The command honors `inv.signal` (cancel) and resolves
  paths from the session workspace. A single `MEMORY_USAGE` constant feeds description,
  hint and default output.
- **Five-language READMEs + docs aligned (phase 7.4)** — command badges `15 → 23`, the
  CLI table expanded to all 23 commands, `/memory` lists all 16 subcommands, and the
  doctor green criterion corrected to `zero findings` (`notes` are informational) across
  `README.*` (en/zh-CN/zh-TW/ar/vi), `docs/RESTORE.md` and both plugin READMEs.

### Changed
- **Single plugin entry (risk R1)** — the previous dual entry (`index2.js` active /
  `index.js` stale) is merged: `index.js` now carries the full 16-subcommand surface,
  the `CORE_CANDIDATES` engine fallback and the 7.3 route; `index2.js` is removed.
- **Engine (phase 8)** — `promptIndexText` caches the injected index behind a lightweight
  mtime/size fingerprint (no content re-read when nothing changed); `shingles3Cached`
  memoizes 3-gram shingles so near-duplicate checks stop recomputing them per pair.
- **Privacy (phase 8)** — `DSH_MEMORY_TELEMETRY=off` disables `stats.jsonl` /
  `injection-audit.jsonl` writes; a `scanPii` gate refuses entries containing an email
  address or mainland mobile number (draft hard-gate included), with bilingual messages.

### Testing
- 67 unit tests (12 files) including a **both-entries parity** test that pins production
  and release entries to 16 subcommands + every phase-7 capability, a docs-alignment test
  deriving the command count from the engine (no hardcoded badge), and phase-7.3 /
  phase-8 suites. Release smoke 21/21; `sync-release --check` all-in-sync with export
  parity. A `GitHub Actions` workflow runs sync-check + tests + smoke + syntax.

## Plugin 1.0.1 — 2026-09-29 — DeepSeek Harness 0.2.0 compatibility

The bundle was re-verified against Harness **0.2.0-rc.1** after a clean reinstall.
Every contract it uses is unchanged (`defineTool`, `PromptSection` /
`TOOL_SESSION_QUERY`, `PreToolDecision`, `CommandDefinition`, `sessionQuery`, the
`dshHomePath` `!!js` loader helper, `dsh.bundle.patch`), and the plugin has no
client half, so no slot registration moved. Two call sites sat outside the 0.2.0
vocabulary and are fixed here:

### Fixed
- **`mem_save` pending-call presenter: `kind: 'write'` → `'edit'`** — 0.2.0's
  `ToolCallKind` is `read | edit | delete | move | search | execute | fetch | other`;
  `write` was outside the documented contract (the presenter must never throw, so it
  silently fell back — but the intent was wrong either way).
- **`mem_save` approval prompt now carries `displayReason: { en, zh }`** — 0.2.0
  splits an `ask` decision into `reason` (the audited string kept in the approval log)
  and `displayReason` (the localized copy the approval panel renders, mandatory `en`).

### Changed
- `plugin/dsh-memory` package version `1.0.0` → `1.0.1`.
- **Root manifest** (the unit `dsh plugin add github:GIN0076/cross-session-memory`
  installs) dependency `@deepseek-ai/dsh-tool-session-query` `^0.1.7-rc.2` →
  `^0.2.0-rc.1`. The old range resolved to 0.1.7-rc.2 while the Harness runtime is
  0.2.0-rc.1, shipping a lower-generation package into the tool-session-query row,
  which must match the runtime generation.

## 0.3.0 — 2026-09-24 — Plugin Edition (DeepSeek Harness)

The lesson book now runs **natively inside DeepSeek Harness** — same engine, two
delivery faces (CLI + plugin).

### Added
- **`plugin/dsh-memory/` (`@local/dsh-memory` Harness bundle)**
  - memory index auto-injected into every session prompt as a system-prompt section
    (≤ 2 KB hard cap, fail-silent degrade; module-level engine cache so the injection
    body recovers as soon as the engine loads — and degrades to a pointer note, never
    to a blocked session);
  - `mem_recall` model tool — lesson-book search (IDF + CJK bigram, half-words hit)
    merged with full-text session search, plus a CJK title-level fallback;
  - `mem_save` model tool — the full write gate (four sections + locatable reference +
    secret scan + near-duplicate interception) behind **human approval**:
    `tools/pre-execute` always returns `ask`;
  - `/memory` human command — `recall | save | doctor | review | map | stats | draft`
    (a human typing the command is the approval);
  - locale metadata (en / zh).
- **`tools/mem-core.mjs`** — shared engine facade, the single entry for plugin & CLI
  (`promptIndexText` / `formatRecall` / `saveAndSync` + full re-export of `mem.mjs`).
- **`install/smoke.mjs`** — zero-dependency end-to-end smoke (syntax, setup E2E in an
  isolated copy, write gates, search, injection budget, doctor).
- **`plugin/README.md`** — install, dependency materialization (junction / link
  recipe), configuration, acceptance checklist, known limits.

### Docs
- READMEs refreshed in five languages: Plugin Edition quick start, architecture
  (two faces, one engine), updated feature/commands/security tables.

## 0.2.2 — 2026-09-22

- **Repository renamed** to `cross-session-memory` (GitHub redirects old links automatically).
- **Dual-name titles, all five languages**: 跨会话记忆 · Agent Lesson Book (错题本) —
  mechanism name promoted to first position, lesson-book brand kept.
- Banner artwork retitled accordingly; in-repo clone-path references updated.

## 0.2.1 — 2026-09-22

Rendering hotfix for GitHub README (no visual regression, no logic change):

- **Removed all `<style>` blocks** — GitHub's README sanitizer strips the tag and leaks the
  CSS as visible text. The look & feel now lives in `assets/banner.svg` (original artwork).
- Feature icons moved from CSS-styled divs to a plain table with `assets/icons/*.svg`
  (real files: GitHub also scrubs `data:` image URIs).
- Legal box de-styled (plain `<div align="left">` + markdown list).

## 0.2.0 — 2026-09-22

First public release of **Agent Lesson Book** (错题本) — zero-dependency cross-session
memory for AI coding agents.

### Core
- Four-section lesson entries (`Symptom / Cause / Fix / Verification`, Chinese labels
  `现象 / 判定 / 解法 / 验证` also accepted) with **evidence-chain enforcement**:
  entries whose Verification section lacks a locatable reference (path / filename /
  section / issue number) are rejected at store time.
- Plain-text store under `.memory/` + budgeted index (`MEMORY.md`, ≤ 60 lines / 2 KB,
  overflow entries listed in a footer and findable via `search`).

### Retrieval
- Literal + CJK bigram/unigram fallback + `aliases` synonym path, ranked with **IDF
  weighting** (rare terms outrank generic ones) and hit snippets.

### Lifecycle
- Near-duplicate interception (3-gram Jaccard ≥ 0.6 requires `--force`),
  `supersedes` auto-archive with duplicate-check exemption, `related` links,
  `review` due dates with `mem review` refresh, text knowledge graph (`mem map`),
  meeting pack (`mem gather`), draft pipeline (`mem draft`).

### Delivery
- `mem inject`: auto-injection of the index into `AGENTS.md` (≤ 2 KB hard cap,
  line-dropping under budget, silent fail-degrade), so every session starts with
  memory in context — no plugin, no gateway, no service.
- `mem global-sync`: cross-workspace mirror of `scope: global` entries.
- `install/setup.mjs` one-shot bootstrap (zero dependencies, Node ≥ 18).

### Safety
- Human-approved writes, secret-pattern rejection, near-duplicate gate, evidence
  chain gate, `mem-seed`-style bulk overwrite requires double confirmation.
