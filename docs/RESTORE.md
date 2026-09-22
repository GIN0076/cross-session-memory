# Backup, restore & update survival

> **TL;DR** — The book lives in plain text. Updates and reinstalls of any host tooling can
> never touch it. Three disaster drills below are documented as *tested*.

## 1. What survives what

| Asset | Where | App / OS reinstall | Disaster | Restore cost |
|---|---|---|---|---|
| Lessons + index + archive + drafts | `<project>/.memory/` | ✅ untouched | survives unless the disk dies | — |
| Engine + templates + docs | `<project>/tools/` etc. | ✅ untouched | re-download the repo | copy |
| `AGENTS.md` (incl. injection block) | `<project>/AGENTS.md` | ✅ untouched | regenerate via `mem inject` | 1 command |
| Global mirror | `~/.memory-global/` | usually untouched | disposable | `mem global-sync` |
| Telemetry | `.memory/stats.jsonl` | ✅ | disposable | — |

**Rule of thumb:** everything that is *data* is in your project folder under git;
everything else is derived and rebuildable by one command.

## 2. The 5-step restore runbook

After moving machines, after disasters, after anything:

```bash
# ① get the repo back into your project root
cp -r agent-lesson-book/* your-project/ && cd your-project

# ② rebuild the bank wiring + injection
node install/setup.mjs
#    (existing .memory/ is kept as-is; setup is idempotent)

# ③ rebuild the cross-workspace mirror
node tools/mem.mjs global-sync

# ④ search something you know is in the book
node tools/mem.mjs search restore

# ⑤ health check must be exit 0 AND zero notes
node tools/mem.mjs doctor
```

That is the whole procedure. There is no hidden state anywhere else.

## 3. Backup strategy

1. **git (recommended).** Commit `.memory/` — it is plain text and diffs beautifully.
   Local-only git is enough for disaster recovery; add a remote only if you accept the trade.
2. **The mirror is not a backup.** `~/.memory-global/` is derived; it exists so *other*
   workspaces can search your `scope: global` lessons.
3. **Export anything you cannot bear to lose** (e.g. quarterly `.memory/` zip) if your git
   history lives on the same physical disk as the data.

## 4. Tested disaster drills (0.2.0)

| Drill | Result |
|---|---|
| Delete the global mirror entirely → `mem global-sync` | ✅ full mirror rebuilt from `.memory/` |
| Append 2 bytes to the index → `git checkout` | ✅ byte-identical restore (requires `core.autocrlf false` — see `examples/lesson-autocrlf.md`) |
| Tamper with the `AGENTS.md` injection block | ✅ `mem doctor` reports the drift; `mem inject` repairs it |

## 5. Line endings & encoding

Plain-text memory banks are measured **by the byte** (2 KB budgets, hashes). Set
`git config core.autocrlf false` right after `git init`, and let all writers emit LF
(`writeFileSync(file, text, 'utf8')` in Node). Shell tools that "helpfully" re-encode text
(PowerShell `Get-Content`/`Set-Content` on some systems, for example) are the classic way
lessons get silently corrupted — we keep a whole lesson about it in `examples/`.
