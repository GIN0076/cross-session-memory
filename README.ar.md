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

<img src="./assets/banner.svg" alt="Agent Lesson Book — 错题本 · sổ lỗi · دفتر الدروس" width="100%">


<!-- Styling note: GitHub README renders no <style>; the look & feel lives in assets/banner.svg (self-hosted OFL fonts in assets/fonts/ are available for forks/themes). -->
<!-- ═══════ custom neon badges (hand-authored SVG · MIT) ═══════ -->
<div align="center">
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


<table>
<tr>
<td align="center" width="20%"><img src="./assets/icons/durable.svg" width="56" alt="DURABLE plain text on disk"><br><b>DURABLE<br>plain text on disk</b></td>
<td align="center" width="20%"><img src="./assets/icons/retrievable.svg" width="56" alt="RETRIEVABLE IDF 3-way search"><br><b>RETRIEVABLE<br>IDF 3-way search</b></td>
<td align="center" width="20%"><img src="./assets/icons/audited.svg" width="56" alt="AUDITED evidence chain enforced"><br><b>AUDITED<br>evidence chain enforced</b></td>
<td align="center" width="20%"><img src="./assets/icons/auto-inject.svg" width="56" alt="AUTO-INJECT ≤2KB per session"><br><b>AUTO-INJECT<br>≤2KB per session</b></td>
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="ONE COMMAND 15-command CLI"><br><b>ONE COMMAND<br>15-command CLI</b></td>
</tr>
</table>


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

<div align="left">

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
