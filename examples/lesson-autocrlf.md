---
name: git-autocrlf-breaks-byte-exact-restore
description: core.autocrlf=true turns LF into CRLF on checkout — byte-exact restore lies
aliases: line ending,CRLF,LF,restore,checkout
metadata:
  type: lesson
  scope: global
  originSessionId: example (replace with your session id)
  created: 2026-09-22
  verified: 2026-09-22
review: 2026-12-21
---

Symptom：Building a "version insurance" (local git) for a plain-text memory bank and
testing restore: append 2 bytes to a 1898-byte index file, `git checkout` it back —
and the file comes back at 1915 bytes. Restore "failed" byte-count checks even
though the content was correct; the extra 17 bytes were line endings.

Cause：With `core.autocrlf=true`, `git add` warns "LF will be replaced by CRLF" and
the checkout smudge filter rewrites every LF to CRLF. For files measured **by the
byte** (an index with a 2 KB budget, hash comparisons), that silent rewrite corrupts
every size and hash check. It is the second source of "tools quietly rewriting your
text" after shell encoding bugs.

Fix：For plain-text repos, set `git config core.autocrlf false` and
`core.safecrlf false` right after `git init` (store and check out verbatim). Have
all writers emit LF (`writeFileSync(file, text, 'utf8')` in Node does). When both
ends agree on LF, drift is impossible.

Verification：After the config change, the same restore test returns 1898 → 1898
byte-identical (`git diff --numstat` detects the edit, `git checkout -- <file>`
restores it exactly). See `tools/mem.mjs` (`writeText`) and `CHANGELOG.md` 0.2.0.
