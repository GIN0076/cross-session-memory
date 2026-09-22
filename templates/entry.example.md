---
name: powershell-mangles-utf8-cjk-files
description: Rewriting CJK text files with PowerShell corrupts them — use Node
aliases: mojibake,乱码,UTF-8,BOM,encoding
metadata:
  type: lesson
  scope: global
  originSessionId: example (this is a template, replace with your session id)
  created: 2026-09-22
  verified: 2026-09-22
review: 2026-12-21
---

Symptom：After batch-editing markdown files containing Chinese text with PowerShell,
the content turned into mojibake (`宸ュ叿...`) and the files gained a `EF BB BF` BOM;
the lesson parser then failed every section check.

Cause：Windows PowerShell 5.1 decodes UTF-8 as system ANSI (GBK/936) with
`Get-Content -Raw`, corrupting CJK on read; `Set-Content -Encoding utf8` then writes
the corruption back **with a BOM**, permanently.

Fix：Rewrite CJK text files **only with Node** (`readFileSync(f,'utf8')` → edit →
`writeFileSync(f, s, 'utf8')`). Keep PowerShell for read-only listing and for invoking
Node. Back up before bulk edits.

Verification：Reproduced and fixed on 2026-09-22; byte-length and section parsing
verified intact after Node rewrite (see `tools/mem.mjs` for the parser this would
break, and `examples/lesson-autocrlf.md` for a related lesson).
