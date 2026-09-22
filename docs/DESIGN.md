# Design — why this book is built the way it is

> **TL;DR** — Lessons on disk + read at every session start. Memory is **data, never
> instructions**. Everything is code-enforced: no proof, no entry; over budget, drop lines;
> anything breaks, degrade silently. No vectors, no gateway, no LLM extraction.

## 1. The problem

Every new AI coding session starts from zero. The same traps get re-stepped on, the same
context gets re-explained. Two families of solutions exist:

- **Memory platforms** — vector stores, knowledge graphs, gateways, LLM extraction pipelines.
  Great for products and teams. Heavy machinery for a personal mistake notebook.
- **Convention files** (`AGENTS.md` / `CLAUDE.md` style) — free and universal, but pure
  discipline: whatever you forget to write down is gone.

Agent Lesson Book is the second family, **engineered**: a convention file plus a quality
system, a search engine and a lifecycle — in one zero-dependency script.

## 2. What this is (and deliberately is not)

| This book stores | This book does NOT store |
|---|---|
| **Experiential lessons**: what went wrong, why, the fix, the proof | User preferences, chat history, entity graphs |
| Few, verified, high-value entries | Everything, automatically |
| Evidence references anyone can drill into | Claims without proof |

Scope: designed for **1–200 entries, single user, plain text**. When you need a team-scale
fact base with semantic search, graduate to a memory platform (see §7).

## 3. The four-section entry + evidence chain

```
Symptom  → Cause  → Fix  → Verification     (现象 / 判定 / 解法 / 验证)
```

The Verification section **must carry a locatable reference** — a backticked path, a
filename, a section/issue number. Without it, `store` rejects the entry. Why so strict?

> A lesson that cannot prove itself is a rumor. Rumors rot memory banks.

The reference is also the drill-down path: a future session reads the lesson, clicks the
reference, and finds the primary evidence instead of trusting a paraphrase.

## 4. The three hard rules

1. **Budget cap.** The injected index is the index **verbatim**, ≤ 2 KB. Over budget → drop
   lines (and say which were dropped in the footer). Nothing else gets injected — memory
   data is never dressed up as instructions.
2. **Fail-degrade.** Missing / broken / oversized index → silent fallback to pointer
   conventions. **A session must never fail to start because of memory.**
3. **Human-approved writes.** The tool may stage (`draft`); only a human may land (`store`,
   after consent). This is also the memory-poisoning defense (§6).

## 5. Borrow ideas, not stacks

Architecture *ideas* from the memory-platform world, re-implemented for 200 entries on disk.
Every line of this codebase is original; named projects are referenced for factual comparison
only (see `ATTRIBUTION.md`).

| Idea (proven in memory platforms) | Our zero-cost equivalent |
|---|---|
| Multi-strategy retrieval + reranking | Literal ∪ CJK n-gram ∪ `aliases`, ranked by **IDF**; snippets instead of a cross-encoder |
| Write-time fact extraction | Write-time enrichment: auto `keywords`, author-supplied `aliases` |
| Temporal knowledge graph (validity windows) | `supersedes` auto-archive + `review` dates + `related` links + `mem map` |
| Cross-memory synthesis ("reflect") | `mem gather` packs related entries; the reading model synthesizes for free |
| Agent-managed core memory | `mem inject` — the ≤ 2 KB index lives in `AGENTS.md`, every session |
| Automatic memory writing | `mem draft` skeletons + **human approval** (deliberate divergence, §6) |

## 6. Security model (memory poisoning is a real attack class)

OWASP classifies "memory & context poisoning" as **ASI06**. Auto-writing memory systems are
the target. Four layers of defense here:

| Layer | Mechanism |
|---|---|
| Provenance | `originSessionId` + `created/verified` stamps on every entry |
| Approval | Nothing lands without a human's `store` |
| Detection | Secret-pattern rejection · near-duplicate gate (Jaccard) · evidence-chain gate |
| Integrity | Plain text + git → everything is diffable and revertible |

## 7. Limits, and when to graduate

- 200-entry cap, 2 KB index, literal retrieval — **by design**, not backlog.
- No semantic search: synonyms are handled by `aliases`, not embeddings. Re-evaluate only if
  measured hit-rate (`mem stats`) stays under ~30% **after** aliases and n-grams are in use.
- Graduate to a memory platform when: multiple users need shared facts · entries reach
  thousands · you need entity/relationship reasoning over facts (not lessons).
- Won't do, ever: silent auto-writing; memory overriding system instructions.

## 8. A note on measurement

`mem stats` exists because "is this thing even working?" must be answered with **numbers**
(search hit-rate, usage counts), not vibes. Run it. If the numbers are bad, fix retrieval
before adding machinery.
