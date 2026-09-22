<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 AGENT LESSON BOOK

### _دفتر الدروس · ذاكرة عابرة للجلسات بلا اعتماديات لوكلاء البرمجة بالذكاء الاصطناعي_

**الدروس على القرص. الأدلة إلزامية. تُحقن تلقائياً في كل جلسة.**

<sub>🌐 <a href="./README.md">English</a> · <a href="./README.zh-CN.md">简体中文</a> · <a href="./README.zh-TW.md">繁體中文</a> · **العربية** · <a href="./README.vi.md">Tiếng Việt</a></sub>

</div>

<!-- Fonts: hybrid strategy — decorative Latin fonts are self-hosted under SIL OFL
     (license texts bundled in assets/fonts/licenses/); CJK / Arabic / Vietnamese body
     text uses system fonts: zero weight, native quality, no external CDN. -->
<style>
  @font-face { font-family: 'Orbitron'; font-weight: 700; font-style: normal; font-display: swap; src: url('./assets/fonts/orbitron-700.woff2') format('woff2'); }
  @font-face { font-family: 'Orbitron'; font-weight: 900; font-style: normal; font-display: swap; src: url('./assets/fonts/orbitron-900.woff2') format('woff2'); }
  @font-face { font-family: 'Space Grotesk'; font-weight: 500; font-style: normal; font-display: swap; src: url('./assets/fonts/space-grotesk-500.woff2') format('woff2'); }
  @font-face { font-family: 'Space Grotesk'; font-weight: 700; font-style: normal; font-display: swap; src: url('./assets/fonts/space-grotesk-700.woff2') format('woff2'); }
  @font-face { font-family: 'IBM Plex Mono'; font-weight: 400; font-style: normal; font-display: swap; src: url('./assets/fonts/ibm-plex-mono-400.woff2') format('woff2'); }

  :root {
    --c0:#05060f; --c1:#0a0e1f; --c2:#10173a; --c3:#1a2456;
    --cy:#00e5ff; --mg:#ff2fd6; --yl:#ffd60a; --gn:#00ffa3; --or:#ff8a00; --pu:#a86bff;
    --tx:#eaf0ff; --dim:#8fa0c8;
    --font-disp: 'Orbitron', 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif;
    --font-body: 'Space Grotesk', system-ui, -apple-system, 'Segoe UI', 'Microsoft YaHei', 'PingFang SC', sans-serif;
    --font-code: 'IBM Plex Mono', Consolas, 'Cascadia Mono', 'Courier New', monospace;
  }
  body {
    background: radial-gradient(1200px 500px at 20% -10%, #16204d 0%, transparent 60%),
                radial-gradient(1000px 500px at 90% 0%, #2a1050 0%, transparent 55%),
                var(--c0);
    color: var(--tx); font-family: var(--font-body);
    line-height: 1.75; padding-bottom: 60px;
  }
  h1, h2, h3 { font-family: var(--font-disp); letter-spacing: .04em; }
  h1 {
    font-size: 3.2em; font-weight: 900; margin: .2em 0 .1em;
    background: linear-gradient(92deg, var(--cy) 0%, var(--pu) 38%, var(--mg) 68%, var(--yl) 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    filter: drop-shadow(0 0 22px rgba(0,229,255,.35));
  }
  h1 + p { font-size: 1.25em; color: var(--yl); font-weight: 700; letter-spacing: .12em; }
  h1 + p + p { font-family: var(--font-code); color: var(--gn); }
  h2 {
    font-size: 1.7em; margin-top: 2.2em; padding: .45em .8em;
    border-left: 6px solid transparent;
    border-image: linear-gradient(180deg, var(--cy), var(--mg)) 1;
    background: linear-gradient(90deg, rgba(0,229,255,.12), transparent 70%);
    border-radius: 6px;
    text-shadow: 0 0 18px rgba(168,107,255,.5);
  }
  h3 { color: var(--cy); font-size: 1.15em; }
  code {
    font-family: var(--font-code); background: #0d1330; color: var(--gn);
    padding: .15em .45em; border-radius: 6px; border: 1px solid var(--c3);
  }
  pre {
    background: linear-gradient(180deg, #0b1130, #0a0e1f) !important;
    border: 1px solid var(--c3); border-radius: 12px; padding: 1em 1.2em !important;
    box-shadow: inset 0 0 40px rgba(0,229,255,.06), 0 8px 24px rgba(0,0,0,.4);
  }
  pre code { border: none; background: transparent; color: #d7e3ff; }
  blockquote {
    border-left: 4px solid var(--or); background: rgba(255,138,0,.08);
    margin: 0; padding: .6em 1em; border-radius: 0 10px 10px 0; color: var(--tx);
  }
  table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1em 0; }
  th {
    background: linear-gradient(180deg, var(--c3), var(--c2)); color: var(--cy);
    font-family: var(--font-disp); font-size: .85em; letter-spacing: .08em; text-transform: uppercase;
  }
  th, td { border: 1px solid var(--c3); padding: .6em .9em; text-align: left; }
  tr:nth-child(even) td { background: rgba(26,36,86,.35); }
  td:first-child { color: var(--yl); font-family: var(--font-code); }
  hr { border: none; height: 2px; background: linear-gradient(90deg, transparent, var(--cy), var(--mg), transparent); margin: 3em 0; }
  a { color: var(--cy); text-decoration: none; }
  a:hover { text-shadow: 0 0 12px var(--cy); }

  /* ── custom badges & shapes ─────────────────────────────── */
  .b64 { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 18px 0; }
  .b64 svg { height: 30px; filter: drop-shadow(0 3px 8px rgba(0,0,0,.5)); }
  .legal {
    text-align: left; background: rgba(16,23,58,.6); border: 1px dashed var(--c3);
    border-radius: 12px; padding: 1em 1.4em; color: var(--dim); font-size: .92em;
  }
  .icon-grid { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin: 24px 0; }
  .icon-grid > div {
    width: 132px; padding: 16px 10px; border-radius: 16px; text-align: center;
    background: linear-gradient(180deg, var(--c2), var(--c1)); border: 1px solid var(--c3);
    transition: transform .15s ease, box-shadow .15s ease;
  }
  .icon-grid > div:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,229,255,.2); }
  .icon-grid svg { width: 44px; height: 44px; }
  .icon-grid p { margin: 8px 0 0; font-size: .85em; color: var(--dim); }
  .icon-grid b { color: var(--tx); display: block; font-family: var(--font-disp); font-size: .8em; letter-spacing: .06em; }
</style>

<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div class="b64">
  <img alt="رخصة MIT" src="https://img.shields.io/badge/license-MIT-00ffa3?style=for-the-badge&labelColor=10173a&color=00ffa3&logoColor=00ffa3">
  <img alt="صفر اعتماديات" src="https://img.shields.io/badge/dependencies-zero-00e5ff?style=for-the-badge&labelColor=10173a">
  <img alt="بيئة التشغيل Node 18+" src="https://img.shields.io/badge/runtime-Node%20%E2%89%A5%2018-ff2fd6?style=for-the-badge&labelColor=10173a">
  <img alt="ميزانية الذاكرة 2KB" src="https://img.shields.io/badge/memory%20budget-2KB-ffd60a?style=for-the-badge&labelColor=10173a">
  <img alt="15 أمراً" src="https://img.shields.io/badge/commands-15-a86bff?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **15 أمراً** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**

<details>
<summary>🎨 <b>اضغط لعرض الرسم الفني</b> ✨</summary>

```
   ╔══════════════════════════════════════════════════════════════╗
   ║   📕  A G E N T   L E S S O N   B O O K   ·   错 题 本       ║
   ╠══════════════════════════════════════════════════════════════╣
   ║  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         ║
   ║  │SYMPTOM 🌡│→│ CAUSE 🔍│→│  FIX 🛠 │→│VERIFY ✅│  = 1 lesson ║
   ║  │  现象    │  │  判定    │  │  解法   │  │  验证   │         ║
   ║  └─────────┘  └─────────┘  └─────────┘  └─────────┘         ║
   ║      💾 plain text        🔍 findable        🛡 audited      ║
   ║      📥 ≤2KB injected     🔁 survives updates                ║
   ╚══════════════════════════════════════════════════════════════╝
        ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐   ┌──────┐
        │ grep │   │ IDF  │   │ alias│   │ grams│   │ stats│
        └──────┘   └──────┘   └──────┘   └──────┘   └──────┘
              ✦ zero dependencies · pure Node.js ✦
```

</details>

<div class="icon-grid">
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00e5ff"/><stop offset="1" stop-color="#a86bff"/></linearGradient></defs><path d="M24 4 40 13v22L24 44 8 35V13z" fill="none" stroke="url(#g1)" stroke-width="3"/><path d="M24 14v20M16 20l8-6 8 6" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>DURABLE</b>plain text on disk</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#00ffa3"/><stop offset="1" stop-color="#00e5ff"/></linearGradient></defs><circle cx="21" cy="21" r="13" fill="none" stroke="url(#g2)" stroke-width="3"/><path d="M31 31l11 11" stroke="#ff2fd6" stroke-width="4" stroke-linecap="round"/><path d="M15 21l4 4 8-9" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>RETRIEVABLE</b>IDF 3-way search</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff2fd6"/><stop offset="1" stop-color="#ff8a00"/></linearGradient></defs><path d="M24 5l16 6v12c0 10-7 17-16 20-9-3-16-10-16-20V11z" fill="none" stroke="url(#g3)" stroke-width="3"/><path d="M17 24l5 5 9-10" fill="none" stroke="#00ffa3" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>AUDITED</b>evidence chain enforced</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd60a"/><stop offset="1" stop-color="#00ffa3"/></linearGradient></defs><path d="M24 42s-15-8-15-21a8 8 0 0 1 15-4 8 8 0 0 1 15 4c0 13-15 21-15 21z" fill="none" stroke="url(#g4)" stroke-width="3"/><path d="M24 12v10l6 4" fill="none" stroke="#00e5ff" stroke-width="2.5" stroke-linecap="round"/></svg>
    <p><b>AUTO-INJECT</b>≤2KB per session</p>
  </div>
  <div>
    <svg viewBox="0 0 48 48"><defs><linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a86bff"/><stop offset="1" stop-color="#ff2fd6"/></linearGradient></defs><rect x="7" y="10" width="34" height="28" rx="4" fill="none" stroke="url(#g5)" stroke-width="3"/><path d="M14 20l6 4-6 4M24 28h10" fill="none" stroke="#ffd60a" stroke-width="3" stroke-linecap="round"/></svg>
    <p><b>ONE COMMAND</b>15-command CLI</p>
  </div>
</div>

---

<div dir="rtl">

## 🌟 لماذا مشروع ذاكرة آخر؟

كل جلسة ذكاء اصطناعي جديدة تبدأ **بذاكرة صافية كأنها فقدان ذاكرة تام**. تعالج منصات الذاكرة الضخمة هذه المشكلة بقواعد بيانات المتجهات، ورسوم المعرفة، والبوابات، وخطوط استخلاص المعرفة عبر النماذج اللغوية الكبيرة. آلات كثيرة — وسطح هجوم واسع — من أجل **دفتر أخطاء شخصي**.

يراهن Agent Lesson Book على الرهان المعاكس:

> ### 🔥 _"الدرس يعيش على القرص — وكل جلسة تقرأه. الذاكرة بيانات، وليس تعليمات أبداً."_

**ما تحصل عليه بدلاً من البنية التحتية:**

- 📕 **دروس من أربعة أقسام** — `Symptom / Cause / Fix / Verification` (أو 现象 / 判定 / 解法 / 验证).
  أي درس بلا **مرجع أدلة** قابل للتحقق في قسم التحقق (`Verification`) يُ**رفض** لحظة الكتابة.
  الذكريات التي لا تُثبت صحتها بنفسها لا تدخل الدفتر.
- 🧾 **سلسلة الأدلة، مفروضة بالكود** — يجب أن يذكر كل تحقق مرجعاً يمكن تحديد موقعه
  (مسار / اسم ملف / قسم / رقم issue)، حتى تتمكن الجلسات المستقبلية من التعمق مباشرة في الدليل.
- 📥 **الحقن التلقائي** — يعكس `mem inject` الفهرس بحجم ≤2 KB داخل `AGENTS.md`؛ فتبدأ كل جلسة
  جديدة والذاكرة حاضرة في السياق مسبقاً. **تدهور آمن عند الأعطال: تجاوز الميزانية ← حذف أسطر؛
  أي خلل ← تدهور صامت إلى الاتفاقيات المجردة. لا يمنع أي جلسة من العمل إطلاقاً.**
- 🛡 **مناهضة التسميم في صميم التصميم** — كتابات بموافقة بشرية، ورفض لأنماط الأسرار،
  اعتراض للتكرارات شبه المتطابقة، وطوابع للمصدر، وتراجع git كامل.
  (للمقارنة: OWASP ASI06 «تسميم الذاكرة والسياق» — وأنظمة الذاكرة ذات الكتابة التلقائية هي الهدف.)

</div>

---

<div dir="rtl">

## ✨ مجرّة الميزات

| 🔮 | الميزة | لماذا تهم |
|---|---|---|
| 📕 | قيود من أربعة أقسام (وسوم ثنائية اللغة) | البنية تصمد أمام الترجمة والزمن |
| 🔗 | بوابة سلسلة الأدلة | بلا دليل ← بلا قيد. تقضي على «أتذكر شيئاً من هذا القبيل» |
| 📥 | الحقن التلقائي عبر `mem inject` | ذاكرة لا تعتمد على انضباط الوكيل |
| 🎯 | بحث ثلاثي المسارات بترتيب IDF | حرفي ∪ ثنائيات/أحاديات CJK ∪ مرادفات `aliases`؛ والكلمات النادرة تفوز |
| ✂️ | مقاطع نصية مع كل نتيجة | حاكم على الصلة دون فتح الملفات |
| ♻️ | الأرشفة التلقائية عبر `supersedes` | الدروس تتطور؛ والإصدارات القديمة تتقاعد تلقائياً إلى `archive/` |
| 🗺 | رسم معرفة نصي عبر `mem map` | سلاسل الاستبدال + روابط ذات صلة + الخط الزمني للمراجعة الدورية |
| 🍱 | حزمة اجتماع عبر `mem gather` | قيود ذات صلة مجمّعة بحجم ≤8 KB للتوليف |
| 📝 | خط إنتاج عبر `mem draft` | هيكل أولاً، ثم موافقة بشرية، ثم الحفظ |
| ⏰ | مواعيد استحقاق المراجعة الدورية | الذاكرة تتعفن — وفحص كل 90 يوماً يبقيها صادقة |
| 🚫 | اعتراض التكرارات شبه المتطابقة | جلستان ودرس واحد ← قيد واحد لا اثنان |
| 🌍 | مرآة `mem global-sync` | دروس `scope: global` في متناول أي مساحة عمل |
| 🧪 | قياس الاسترجاع عبر `mem stats` | معدل إصابة البحث — أدلة لا انطباعات |
| 🩺 | فحص الصحة عبر `mem doctor` | ميزانية الفهرس، والانحراف، والمراجعات المتأخرة — أمر واحد |
| 🈲 | متوافق مع UTF-8 / CJK | كتابات عبر Node فقط؛ وفخاخ ترميز PowerShell موثّقة |

</div>

---

<div dir="rtl">

## 🛠 الهالة التقنية

<table>
<tr><th>الطبقة</th><th>الاختيار</th><th>الأثر</th></tr>
<tr><td>زمن التشغيل</td><td><code>Node.js ≥ 18</code></td><td>🟢 صفر اعتماديات · صفر خدمات · صفر تكلفة API</td></tr>
<tr><td>التخزين</td><td><code>.memory/</code> ماركداون عادي</td><td>🧾 مقروء للبشر · قابل للاختلاف بالإصدارات · ودود لـ git</td></tr>
<tr><td>الفهرس</td><td><code>MEMORY.md</code> ≤ 60 سطراً / 2 KB</td><td>📥 سقف صارم، والتجاوز مدرج في التذييل</td></tr>
<tr><td>الاسترجاع</td><td>IDF + CJK n-gram + aliases</td><td>🎯 استراتيجيات متعددة دون مخزن متجهات</td></tr>
<tr><td>التسليم</td><td>كتلة حقن في <code>AGENTS.md</code></td><td>🔌 بلا إضافات، ويعمل مع أي وكيل يقرأ AGENTS.md</td></tr>
<tr><td>السلامة</td><td>موافقة · فحص الأسرار · بوابة Jaccard</td><td>🛡 دفاع من أربع طبقات (على دراية بـ OWASP ASI06)</td></tr>
</table>

**القواعد الثلاث الصارمة** (من `docs/DESIGN.md`):

1. **سقف الميزانية** — الحقن = الفهرس كما هو حرفياً ≤2 KB؛ وعند تجاوز الميزانية ← حذف أسطر.
2. **التدهور الآمن** — فهرس غير قابل للقراءة ← ارتداد صامت إلى اتفاقيات المؤشرات. الجلسات لا تتوقف أبداً.
3. **كتابات بموافقة بشرية** — الأداة تقترح (`draft`)، والإنسان يقرر (`store`).

</div>

---

<div dir="rtl">

## 🚀 البداية السريعة

> **المتطلبات:** Node.js ≥ 18. لا شيء غير ذلك. لا `npm install`، ولا قاعدة بيانات، ولا مفتاح API.

**الخطوة 1 — انسخ المجلد إلى جذر مشروعك** (المجلد الذي يوجد فيه `AGENTS.md`):

```bash
cp -r agent-lesson-book/* your-project/
cd your-project
```

**الخطوة 2 — إعداد لمرة واحدة:**

```bash
node install/setup.mjs --with-sample
```

```
[setup] memory bank ready  → .memory/
[setup] conventions wired  → AGENTS.md (created / updated)
[setup] index injected     → 2.0 KB / 2.0 KB hard cap
[setup] doctor             → healthy: no anomalies
[setup] next: node tools/mem.mjs draft my-first-lesson
```

**الخطوة 3 — درسك الأول** (اطلب موافقة المستخدم أولاً، وفقاً للاتفاقية):

```bash
node tools/mem.mjs draft ssh-timeout
# edit .memory/drafts/<date>-ssh-timeout.md — four sections, evidence in Verification
node tools/mem.mjs store .memory/drafts/<date>-ssh-timeout.md
node tools/mem.mjs doctor
```

هذا كل شيء. **من الآن فصاعداً تبدأ كل جلسة جديدة وفهرس دروسك حاضر في السياق.**

</div>

---

<div dir="rtl">

## 📕 تنسيق القيد

أربعة أقسام. تُقبل الوسوم الصينية والإنجليزية على حد سواء.
القيد الذي يخلو من التحقق — أو الذي يذكر تحققاً بلا مرجع يمكن تحديد موقعه — يُ**رفض**.

```markdown
---
name: git-autocrlf-breaks-byte-exact-restore
description: core.autocrlf=true turns LF into CRLF on checkout
aliases: line ending,CRLF,restore
metadata:
  type: lesson
  scope: global
  created: 2026-09-22
  verified: 2026-09-22
review: 2026-12-21
---

Symptom：Restore test fails byte counts: 1898 → 1915 after `git checkout`.
Cause：core.autocrlf=true smudge filter rewrites LF to CRLF on checkout.
Fix：git config core.autocrlf false + writers emit LF.
Verification：Re-test returns 1898 → 1898 byte-identical (see `tools/mem.mjs`, CHANGELOG 0.2.0).
```

> 🧪 **جرّب البوابات:**
> ```bash
> node tools/mem.mjs store examples/lesson-autocrlf.md   # ✅ accepted
> # now strip the reference from its Verification section and retry:
> node tools/mem.mjs store broken.md                     # ❌ rejected: no locatable reference
> ```

</div>

---

<div dir="rtl">

## ⌨️ لوحة الأوامر

| الأمر | الأثر |
|---|---|
| `mem.mjs index` | عرض / إعادة توليد الفهرس المقيّد بالميزانية |
| `mem.mjs inject` | مزامنة كتلة الحقن داخل `AGENTS.md` (تلقائياً عند الكتابة) |
| `mem.mjs list` | إدراج كل القيود مع علامات الصحة |
| `mem.mjs search <q> [n]` | بحث IDF ثلاثي المسارات مع مقاطع نصية |
| `mem.mjs show <name>` | عرض قيد واحد كاملاً |
| `mem.mjs store <file\|-> [--overwrite] [--force]` | التحقق ثم الحفظ (مع بوابات الأسرار/التكرارات/الأدلة) |
| `mem.mjs forget <name>` | أرشفة، دون حذف نهائي أبداً |
| `mem.mjs review <name>` | تحديث تاريخ التحقق، ودفع المراجعة الدورية +90 يوماً |
| `mem.mjs draft [topic]` | توليد هيكل من أربعة أقسام |
| `mem.mjs map [name]` | رسم معرفة نصي (استبدال / ذو صلة / مراجعة دورية) |
| `mem.mjs gather <q>` | حزمة اجتماع: قيود ذات صلة ≤8 KB |
| `mem.mjs global-sync` | عكس قيود `scope: global` عبر مساحات العمل |
| `mem.mjs stats [days]` | قياس الاسترجاع عن بُعد (معدل الإصابة) |
| `mem.mjs doctor` | فحص صحة كامل — الخروج بـ 0 وملاحظات صفرية يعني حالة سليمة |

</div>

---

<div dir="rtl">

## 📂 تشريح المستودع

```
agent-lesson-book/
├── README.md · README.zh-CN.md · README.zh-TW.md · README.ar.md · README.vi.md
├── LICENSE · CHANGELOG.md · .gitignore
├── tools/mem.mjs          # the 15-command engine (single file, zero deps)
├── install/setup.mjs      # one-shot bootstrap
├── templates/             # AGENTS.md.example + entry.example.md
├── docs/                  # DESIGN · COMMANDS · RESTORE
├── examples/              # real sanitized lessons
└── assets/fonts/          # self-hosted OFL fonts + license texts
```

</div>

---

<div dir="rtl">

## 🔐 نموذج الأمان والثقة

| الطبقة | الآلية | تحمي من |
|---|---|---|
| 1️⃣ النسب | `originSessionId` + طوابع `created/verified` | ادعاءات بلا نسب |
| 2️⃣ الموافقة | موافقة بشرية + بوابة `store` | حماس الوكيل المفرط للكتابة |
| 3️⃣ الكشف | أنماط الأسرار · بوابة Jaccard ≥0.6 · سلسلة الأدلة | التسريبات، والتكرار، والشائعات |
| 4️⃣ النزاهة | تراجع git (يُنصح بالعمل المحلي فقط) | كل ما عدا ذلك |

> تسميم الذاكرة صنف هجوم معترف به (OWASP **ASI06**)، وأنظمة الذاكرة ذات الكتابة التلقائية هي
> الهدف. وهذا الدفتر لا يكتب **شيئاً** دون إنسان.

</div>

---

<div dir="rtl">

## 🗺 خارطة الطريق

- 🌱 **0.2.x** — حزم مرادفات الثنائيات · تصدير SVG من `mem map` · رسائل الفحص لكل لغة
- 🌍 **0.3** — اتحاد اختياري متعدد الدفاتر · تدويل سطر الأوامر (`--lang`)
- 🚫 **لن نفعل** — مخزنات المتجهات · البوابات · الكتابة التلقائية الصامتة. محفزات ذلك موثقة في `docs/DESIGN.md`.

</div>

---

<div dir="rtl">

## 🤝 المساهمة

نرحّب بطلبات الدمج — خصوصاً **حزم الدروس الجديدة** (بعد تنقيحها!) وترجمات README.
شغّل `node tools/mem.mjs doctor` حتى يعطي الأخضر قبل الإرسال. ويجب أن يبقى كل الكود **بلا اعتماديات**.

</div>

---

<div dir="rtl">

## ⚖️ الشؤون القانونية والإسناد

<div class="legal">

- **مشروع غير رسمي.** غير تابع أو مدعوم أو معتمد من أي منتج أو شركة أو منظمة مذكورة
  (بما في ذلك DeepSeek، وAnthropic، وOpenAI، وMem0، وZep، وLetta، وCognee، وTencent Cloud،
  وOWASP، وSIL). وتُستخدم أسماء المنتجات هنا لأغراض الإسناد التقريري فقط.
- **الآراء آراؤنا.** تعكس عبارات المقارنة حقائق موثّقة علناً وخبرة شخصية في نقطة زمنية
  بعينها — فتحقق من وثائق المورّد الحالية قبل اتخاذ قرارك.
- **الخطوط:** تُضمَّن Orbitron وSpace Grotesk وIBM Plex Mono بموجب **SIL Open Font
  License 1.1** — ونصوص الرخصة الكاملة في [`assets/fonts/licenses/`](./assets/fonts/licenses/).
  أما النصوص CJK / العربية / الفيتنامية فتستخدم خطوط نظامك (دون تضمين أي شيء).
- **بلا ضمانات.** يُقدَّم البرنامج «كما هو» بموجب رخصة MIT — انظر [`LICENSE`](./LICENSE).

</div>

</div>

---

<div dir="rtl">

<div align="center">

```
  ╔═══════════════════════════════════════════════════════════╗
  ║   ★  L E S S O N S   L I V E   O N   D I S K  ★          ║
  ║      Evidence in, garbage out — never.                    ║
  ║      错题本 · sổ lỗi · دفتر الدروس · lesson book          ║
  ╚═══════════════════════════════════════════════════════════╝
```

_صُنع بـ 📕 + 🛠 + بلا اعتماديات — **MIT** © 2026 مساهمو Agent Lesson Book_

</div>

</div>
