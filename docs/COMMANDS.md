# Command Reference — `tools/mem.mjs`

Zero dependencies. All commands run as `node tools/mem.mjs <command>`.
Exit code `0` = success; non-zero = rejected / failed (messages say why).

**24 commands + help** (the count is asserted by `test/memory-commands.test.mjs`;
keep README badges, this table and the `mem.mjs` header comment in sync).

| Command | What it does | Notes |
|---|---|---|
| `index` | Regenerate and print `MEMORY.md` | ≤ 60 lines / 2 KB hard cap; over-budget entries go to the footer |
| `inject` | Sync the injection block into `AGENTS.md` | Auto-runs on `store` / `forget` / `index`; ≤ 2 KB hard cap |
| `list` | List all entries with health flags | |
| `search <q> [limit] [--two-stage]` | IDF-ranked 3-way search with snippets | literal ∪ CJK bigram/unigram ∪ `aliases`; **relevance floor**: a hit needs the whole phrase, an ASCII token, full bigram coverage or ≥40% coverage — word-salad queries return nothing instead of noise. `--two-stage` reranks by confidence / freshness / feedback |
| `show <name>` | Print one full entry | falls back to the global mirror |
| `store <file\|-> [--overwrite] [--force] [--model]` | Validate and store | `-` reads stdin; gates: four sections, evidence reference, secrets, oversize, exact dup, near-dup (Jaccard ≥ 0.6 unless `--force`) |
| `forget <name>` | Archive an entry | never hard-deletes → `.memory/archive/` |
| `review <name>` | Refresh a review | `verified` = today, `review` = +90 days |
| `draft [topic]` | Create a four-section skeleton | lands in `.memory/drafts/`; same-day names get `-2`, `-3`… suffixes |
| `drafts` | List pending drafts | reconciled against the book: drafts whose name/body is already stored are flagged **stale** (their approval can only fail) |
| `approve <draft> [--overwrite\|--force]` | Approve a draft into the book | goes through the full `store` gate; draft is archived, not deleted. A stale draft needs `--overwrite` (replace) or `--force` (non-duplicate), otherwise the failure message points at `prune-drafts` |
| `reject <draft> [reason]` | Reject a draft | archived as `rejected.*`, never hard-deleted |
| `prune-drafts [--apply]` | Archive drafts that are already in the book | dry-run by default; `--apply` moves them to `archive/obsolete.*` (recoverable, never deleted) |
| `write-mode [approval\|auto-draft\|auto-low-risk\|off]` | Read / set the write mode | models are gated by mode; human commands are never gated |
| `explain <name>` | Why an entry is trusted (or not) | confidence, state, evidence, relations, adjudication hint |
| `verify [name\|--all]` | Run verification recipes | whitelist only: `file-exists` / `section-exists` / `command` — never arbitrary shell |
| `feedback <q> <adopted,csv> [reason]` | Record what a recall was used for | later two-stage recalls boost adopted entries |
| `map [name]` | Print the text knowledge graph | **six sections**: supersede chains · causal chains (`causedBy`/`fixedBy`) · conflict pairs · expired nodes · review timeline · common-root grouping |
| `gather <q> [budget]` | Evidence pack for synthesis | confidence-tiered (verified first, stale/disputed last) + evidence + conflict warnings + common root cause + reading order. **It never writes a conclusion** — synthesis stays with the reader |
| `conflicts` | List all unresolved `conflictsWith` pairs | deduped; a pair whose counterpart is archived counts as resolved |
| `resolve <loser> --prefer <winner> --reason <text>` | Adjudicate a conflict | loser gets `supersedes: winner`, `resolvedAt`/`resolveReason` and a verdict line; **both entries are kept**, loser derives to `stale` |
| `global-sync` | Mirror `scope: global` entries | → `~/.memory-global/` (override with `DSH_MEMORY_GLOBAL_DIR`) |
| `stats [days]` | Retrieval telemetry | searches / real hits / weak-only / misses from `.memory/stats.jsonl` (`hits` counts **strong** hits only, so the hit rate means something); non-integer input falls back to 7 (never `NaN`) |
| `doctor` | Full health check | **green = exit 0 = zero findings**; `notes` are informational (due reviews, near-duplicates, entries left out of the index) and do **not** affect the exit code |
| *(no arg)* | Usage | |

## Recipes

```bash
# capture a lesson (ask the user first, per convention)
node tools/mem.mjs draft ssh-timeout
$EDITOR .memory/drafts/*-ssh-timeout.md
node tools/mem.mjs store .memory/drafts/*-ssh-timeout.md

# find how you solved something before
node tools/mem.mjs search timeout
node tools/mem.mjs search 连接超时        # CJK half-words are covered

# lesson lifecycle
node tools/mem.mjs map                    # graph: chains, conflicts, timeline, root causes
node tools/mem.mjs review ssh-timeout     # re-verified today, next check +90d
node tools/mem.mjs forget old-lesson      # retire to archive/

# conflicts
node tools/mem.mjs conflicts              # who conflicts with whom
node tools/mem.mjs resolve old-take --prefer new-take --reason "new evidence in tools/mem.mjs"

# maintenance
node tools/mem.mjs doctor                 # zero findings = green (notes are informational)
node tools/mem.mjs stats 30               # hit-rate over 30 days
node tools/mem.mjs global-sync            # refresh the cross-workspace mirror
```

## Environment variables

| Variable | Effect |
|---|---|
| `DSH_MEMORY_DIR` | Override the memory bank location (default `<repo>/.memory`) |
| `DSH_MEMORY_GLOBAL_DIR` | Override the global mirror location (default `~/.memory-global`) |
| `DSH_MEMORY_LANG` | `zh` \| `en` — output language. Unset: this release repo defaults to `en`, a source checkout defaults to `zh` (same code, two outputs) |
| `MEM_COUNT_DOC` | Path **relative to the repo root** of a status doc whose `（N 条）` / `entries (N)` count is checked for drift |
| `MEM_CARRIERS` | `relative/path::keyword;other/file::keyword` — extra convention carriers checked by `doctor` (also repo-root relative) |

## Harness plugin surfaces (0.3.0)

Inside DeepSeek Harness the same engine is reached without a shell
(details: [`../plugin/README.md`](../plugin/README.md)):

| Surface | What it does |
|---|---|
| prompt section | lesson index ≤ 2 KB every turn (fail-degrade). **Injected once**: when `AGENTS.md` already carries a live `mem-inject` block the plugin does not register its own section (`injectMode: auto` — force with `always` / `never`) |
| `mem_recall <query> [limit]` | lesson-book search ∪ full-text session search |
| `mem_save <content> [--overwrite] [--force]` | write one lesson — gated by the current **write mode** (`approval` asks, `auto-draft` files a draft, `auto-low-risk` writes, `off` denies); it is *not* an unconditional ask |
| `/memory recall <q>` | search, typed by a human |
| `/memory save <file.md>` | store an entry (typing it is the approval); path resolves from the **session workspace** |
| `/memory doctor` | same report as `doctor` |
| `/memory explain <name>` / `verify [name]` / `feedback <q> <adopted> [reason]` | same as the CLI commands |
| `/memory conflicts` / `resolve <loser> --prefer <winner> --reason <text>` | list and adjudicate conflicts (both entries kept) |
| `/memory review <name>` / `map [name]` / `stats [days]` / `draft [topic]` / `drafts` / `approve [--overwrite\|--force]` / `reject` / `prune-drafts [--apply]` / `write-mode [mode]` | same as the CLI commands |

All `/memory` subcommands respond to `inv.signal` (cancellation) and take their
file paths from the session workspace rather than the host process cwd.
The `/memory` usage line and the CLI share one constant: `MEMORY_SUBCOMMANDS`.
