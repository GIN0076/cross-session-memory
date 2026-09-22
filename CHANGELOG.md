# Changelog

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
