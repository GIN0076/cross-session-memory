# Attribution & legal notes

## Bundled fonts (SIL Open Font License 1.1)

Decorative Latin fonts are bundled as latin-subset `.woff2` files under `assets/fonts/`.
Each ships with its full license text (required by OFL §2) in `assets/fonts/licenses/`:

| Font | Copyright | License file |
|---|---|---|
| Orbitron (700, 900) | Copyright 2018 The Orbitron Project Authors | `OFL-orbitron.txt` |
| Space Grotesk (500, 700) | Copyright 2020 The Space Grotesk Project Authors | `OFL-space-grotesk.txt` |
| IBM Plex Mono (400) | Copyright © 2017 IBM Corp. (Reserved Font Name "Plex") | `OFL-ibm-plex-mono.txt` |

CJK / Arabic / Vietnamese text is rendered with **your system fonts** — nothing is bundled
for those scripts. OFL fonts may be freely bundled and redistributed (not sold by
themselves); we comply by shipping the license texts alongside the files.

## Referenced projects & standards (nominative reference only)

Architecture ideas were compared against, and are discussed in `docs/DESIGN.md` with factual
references to: Mem0, Hindsight (Vectorize.io), Letta, Zep / Graphiti, Cognee, LangMem,
LlamaIndex Memory, MemOS, and TencentDB-Agent-Memory. The **OWASP ASI06** classification
("memory & context poisoning") is referenced by identifier only.

- No source code, documentation text, marketing copy, logos, or brand assets from any of
  these projects is included in this repository. **All code here is original.**
- Product and organization names are used solely for factual, nominative comparison.
  **This project is unofficial and not affiliated with, sponsored by, or endorsed by any
  named party.**
- Comparison statements in `docs/DESIGN.md` reflect publicly documented facts and experience
  at a point in time; verify against current vendor documentation before deciding.

## License

Project code and documentation: **MIT** — see [`LICENSE`](../LICENSE).
Bundled fonts: **SIL OFL 1.1** — see `assets/fonts/licenses/`.
