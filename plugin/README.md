# @local/dsh-memory — DeepSeek Harness plugin (Plugin Edition)

> The lesson book as a **native [DeepSeek Harness](https://github.com/deepseek-ai) plugin**:
> the memory index auto-injected into every session's prompt, `mem_recall` / `mem_save`
> model tools, and the `/memory` human command — all over the same zero-dependency
> engine that powers the CLI (`tools/mem.mjs` + `tools/mem-core.mjs`).

## What it adds

| Face | Mechanism |
|---|---|
| Prompt injection | `.memory/MEMORY.md` index verbatim ≤ 2 KB every turn (fail-silent degrade — **never blocks a session**) |
| Model tool `mem_recall` | Lesson-book search (IDF + CJK bigram, half-words hit) **∪** full-text session search (CJK title-level fallback until M3) |
| Model tool `mem_save` | Full write gate (four sections + locatable reference + secret rejection + near-duplicate interception). Every call returns `ask` through `tools/pre-execute` → **human approval** |
| Human command `/memory` | `recall <q>` \| `save <file.md>` \| `doctor` \| `review <name>` \| `map [name]` \| `stats [days]` \| `draft [topic]` — typing it by hand **is** the approval |
| Telemetry | recall/store rows in `.memory/stats.jsonl` (observation data for the M3 promotion thresholds) |

## Requirements

- DeepSeek Harness (`dsh`) with a profile (web / desktop)
- Node.js ≥ 18 — the engine is zero-dependency

## Install

```
plugin_manager → install_bundle → target = <clone>/plugin/dsh-memory
```

One command. **Re-running it after a destructive reinstall restores everything.**
If the bundle is already installed, `remove_bundle` first: an idempotent re-install over
a leftover `link:` dependency trips the manager's diff-based name detection and fails
with `ambiguous-install` (remove is name-based and immune to this).

## Dependency materialization (important)

The bundle manifest deliberately declares **no dependencies**: `install_bundle` only runs
pnpm for the profile project and rejects `link:` specs (`ambiguous-install`), and a host
bundle's canonical shape is zero-dependency. Two dependencies are therefore materialized
as **junctions inside the bundle's own `node_modules`** (equivalent to `pnpm link`
output), with the tools package additionally linked into the profile (covers resolution
"from the profile"):

```powershell
# junctions inside the bundle — set DSH_SRC to your dsh source checkout
New-Item -ItemType Junction -Path '<clone>\plugin\dsh-memory\node_modules\@deepseek-ai\dsh-tool-session-query' -Target "$DSH_SRC\packages\session-query\tool-session-query"
New-Item -ItemType Junction -Path '<clone>\plugin\dsh-memory\node_modules\@deepseek-ai\dsh-tools' -Target "$DSH_SRC\packages\core\tools"
# profile link (the "declares no dsh.bundle" warning is expected)
dsh plugin --profile <profile> add "link:$DSH_SRC/packages/session-query/tool-session-query"
```

Alternatives: (a) point the patch row at a relative file symbol of a vendored copy;
(b) vendor the upstream code (MIT) into the bundle; (c) npm-mode deployment with a
registry spec.

## Configuration (`cordis.patch.yml`)

| Key | Default | Meaning |
|---|---|---|
| `memoryCorePath` | `''` → resolves `../../tools/mem-core.mjs` from `index.js` | Absolute path to `mem-core.mjs` when the default relative resolution can't work in your install shape. **Change it when you move machines or the workspace path changes.** |
| `maxHits` | `8` | Default entry hits for `mem_recall` |

The patch also switches on full-text session search (`session-query-sqlite`, path via
`!!js dshHomePath` — follows `DSH_HOME`) and inserts the read-only search-tools row.

## Acceptance checklist (run in a fresh session)

1. `dsh --profile <profile> --dump-config` — the three rows present, no `failed to import` / `did not activate`;
2. the first turn's prompt contains the memory index (≤ 2 KB); deleting or corrupting
   `MEMORY.md` never blocks a session (the injection body re-renders from entries and
   degrades to a pointer note on any failure);
3. `mem_save` without approval writes **nothing** to disk;
4. `mem_recall` hits the expected lesson and session search returns hits
   (CJK short words fall back to title-level matches until M3);
5. `/memory doctor` matches `node tools/mem.mjs doctor`;
6. re-install drill: `remove_bundle` → `install_bundle`, green in one pass.

## Known limits

- CJK full-text session search is limited by the upstream FTS `unicode61` tokenizer
  (short/half words are unreliable); lesson-book search is unaffected — M3 plans a
  query-side fallback patch.
- `mem_save` requires an approval policy that allows `ask`. Under a `never` policy the
  call is denied by design — use `/memory save <file.md>` instead.
- Moving machines or changing the workspace path → update `memoryCorePath`.

## Roadmap (see the design doc, §6)

- **M2** — turn-stopping mechanical drafts, `tools/result` telemetry, nightly timer
  (review squeeze-out + `global-sync`), strict wiki-link validation.
- **M3** — session CJK fallback patch, client memory panel, `ctx.skills` registration,
  promotion thresholds.

---

<p align="center"><sub>Part of <b>CROSS-SESSION MEMORY · Agent Lesson Book (错题本)</b> — MIT, zero dependencies.</sub></p>
