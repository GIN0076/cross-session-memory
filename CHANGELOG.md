# Changelog

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
