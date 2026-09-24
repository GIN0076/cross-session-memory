# Command Reference — `tools/mem.mjs`

Zero dependencies. All commands run as `node tools/mem.mjs <command>`.
Exit code `0` = success; non-zero = rejected / failed (messages say why).

| Command | What it does | Notes |
|---|---|---|
| `index` | Regenerate and print `MEMORY.md` | ≤ 60 lines / 2 KB hard cap; over-budget entries go to the footer |
| `inject` | Sync the injection block into `AGENTS.md` | Auto-runs on `store` / `forget` / `index`; ≤ 2 KB hard cap |
| `list` | List all entries with health flags | |
| `search <q> [limit]` | IDF-ranked 3-way search with snippets | literal ∪ CJK bigram/unigram ∪ `aliases` |
| `show <name>` | Print one full entry | falls back to the global mirror |
| `store <file\|-> [--overwrite] [--force]` | Validate and store | `-` reads stdin; gates: four sections, evidence reference, secrets, oversize, exact dup, near-dup (Jaccard ≥ 0.6 unless `--force`) |
| `forget <name>` | Archive an entry | never hard-deletes → `.memory/archive/` |
| `review <name>` | Refresh a review | `verified` = today, `review` = +90 days |
| `draft [topic]` | Create a four-section skeleton | lands in `.memory/drafts/`; same-day names get `-2`, `-3`… suffixes |
| `map [name]` | Print the text knowledge graph | supersedes chains · related edges · review dates |
| `gather <q> [budget]` | Bundle related entries for synthesis | default ≤ 8 KB |
| `global-sync` | Mirror `scope: global` entries | → `~/.memory-global/` (override with `DSH_MEMORY_GLOBAL_DIR`) |
| `stats [days]` | Retrieval telemetry | searches / hits / misses from `.memory/stats.jsonl` |
| `doctor` | Full health check | **green = exit 0 AND zero notes** |
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
node tools/mem.mjs map                    # who supersedes whom
node tools/mem.mjs review ssh-timeout     # re-verified today, next check +90d
node tools/mem.mjs forget old-lesson      # retire to archive/

# maintenance
node tools/mem.mjs doctor                 # zero notes = healthy
node tools/mem.mjs stats 30               # hit-rate over 30 days
node tools/mem.mjs global-sync            # refresh the cross-workspace mirror
```

## Environment variables

| Variable | Effect |
|---|---|
| `DSH_MEMORY_DIR` | Override the memory bank location (default `<repo>/.memory`) |
| `DSH_MEMORY_GLOBAL_DIR` | Override the global mirror location (default `~/.memory-global`) |
| `MEM_COUNT_DOC` | Path (relative to `tools/`) of a status doc whose `（N 条）` / `entries (N)` count is checked for drift |
| `MEM_CARRIERS` | `file::keyword;file::keyword` — extra convention carriers checked by `doctor` |

## Harness plugin surfaces (0.3.0)

Inside DeepSeek Harness the same engine is reached without a shell
(details: [`../plugin/README.md`](../plugin/README.md)):

| Surface | What it does |
|---|---|
| prompt section | lesson index ≤ 2 KB every turn (fail-degrade) |
| `mem_recall <query> [limit]` | lesson-book search ∪ full-text session search |
| `mem_save <content> [--overwrite] [--force]` | write one lesson — always asks for human approval first |
| `/memory recall <q>` | search, typed by a human |
| `/memory save <file.md>` | store an entry (typing it is the approval) |
| `/memory doctor` | same report as `doctor` |
| `/memory review <name>` / `map [name]` / `stats [days]` / `draft [topic]` | same as the CLI commands |
