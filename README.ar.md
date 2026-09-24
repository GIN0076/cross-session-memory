<!--
  ═══════════════════════════════════════════════════════════════
     AGENT LESSON BOOK · 错题本 · SỔ LỖI · دفتر الدروس
     colorful header banner (self-hosted OFL fonts + system CJK/AR/VI)
  ═══════════════════════════════════════════════════════════════
-->
<div align="center">

# 📕 CROSS-SESSION MEMORY · Agent Lesson Book (错题本)

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
  <img alt="إضافة DeepSeek Harness" src="https://img.shields.io/badge/plugin-DeepSeek%20Harness-00ffa3?style=for-the-badge&labelColor=10173a">
</div>

> ### 🧠 `TOOLS/MEM.MJS` · **15 أمراً** · `NODE ZERO-DEP`
> **`index · inject · list · search · show · store · forget · review · draft · map · gather · global-sync · stats · doctor · usage`**
>
> ### 🧩 `PLUGIN/DSH-MEMORY` · **إضافة DEEPSEEK HARNESS** (جديد في 0.3.0)
> **`mem_recall` · `mem_save` · `/memory recall|save|doctor|review|map|stats|draft`**

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
<td align="center" width="20%"><img src="./assets/icons/one-command.svg" width="56" alt="ONE COMMAND 15-command CLI"><br><b>ONE COMMAND<br>15-command CLI + plugin</b></td>
</tr>
</table>

<div dir="rtl">

**المحتويات** — [ما الجديد في 0.3.0](#-ما-الجديد-في-030) · [لماذا](#-لماذا-مشروع-ذاكرة-آخر) · [الميزات](#-مجرّة-الميزات) · [طريقتا التشغيل](#-طريقتا-التشغيل) · [تنسيق القيد](#-تنسيق-القيد) · [الأوامر](#%EF%B8%8F-لوحة-الأوامر) · [البنية](#%EF%B8%8F-البنية-وجهان-ومحرك-واحد) · [الأمان](#-نموذج-الأمان-والثقة) · [خارطة الطريق](#-خارطة-الطريق)

</div>

---

<div dir="rtl">

## 🆕 ما الجديد في 0.3.0

**إصدار الإضافة.** يدور دفتر الدروس الآن أصلياً داخل **DeepSeek Harness** —
نفس المحرك بلا اعتماديات، ووجهان للتسليم:

| | واجهة CLI المستقلة (0.2.x) | إضافة Harness (0.3.0) |
|---|---|---|
| الذاكرة في السياق | كتلة `mem inject` داخل `AGENTS.md` | مقطع في المطالبة في كل دورة (≤ 2 KB، مع تدهور آمن) |
| البحث من الوكيل | تشغيل `mem.mjs search` عبر سطر الأوامر | أداة `mem_recall` (دفتر الدروس **+ نص الجلسات كاملاً**) |
| كتابة درس | `mem.mjs store` عبر سطر الأوامر | أداة `mem_save` — **تطلب موافقة بشرية دائماً** |
| الصيانة البشرية | أوامر `mem.mjs` | `/memory recall\|save\|doctor\|review\|map\|stats\|draft` |

التفاصيل الكاملة في [`CHANGELOG.md`](./CHANGELOG.md) و[`plugin/README.md`](./plugin/README.md).

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
- 📥 **الحقن التلقائي** — يعكس `mem inject` الفهرس بحجم ≤ 2 KB داخل `AGENTS.md`؛ أما إضافة
  Harness فتحنه مباشرة في المطالبة. فتبدأ كل جلسة جديدة والذاكرة حاضرة في السياق مسبقاً.
  **تدهور آمن عند الأعطال: تجاوز الميزانية ← حذف أسطر؛ أي خلل ← تدهور صامت إلى
  الاتفاقيات المجردة. لا يمنع أي جلسة من العمل إطلاقاً.**
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
| 🧩 | **إضافة Harness أصلية** | الفهرس في المطالبة في كل دورة — دون الحاجة حتى إلى انضباط AGENTS.md |
| 🔌 | **أداة `mem_recall`** | دفتر الدروس ∪ **نص الجلسات السابقة كاملاً** في استدعاء واحد |
| ✍️ | **أداة `mem_save` + موافقة** | الكتابة تطلب موافقة إنسان أولاً دائماً — حتى من داخل الوكيل |
| 💬 | **أمر `/memory`** | صيانة من مربع الدردشة: recall / save / doctor / review / map / stats / draft |
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
| 🧪 | اختبار `install/smoke.mjs` E2E | أمر واحد يثبت صحة التثبيت: البوابات، والبحث، والحقن، و`doctor` |
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
<tr><td>التسليم</td><td>كتلة حقن في <code>AGENTS.md</code> <b>+</b> إضافة Harness</td><td>🔌 وجهان فوق محرك واحد (<code>mem-core.mjs</code>)</td></tr>
<tr><td>السلامة</td><td>موافقة · فحص الأسرار · بوابة Jaccard</td><td>🛡 دفاع من أربع طبقات (على دراية بـ OWASP ASI06)</td></tr>
</table>

**القواعد الثلاث الصارمة** (من `docs/DESIGN.md`):

1. **سقف الميزانية** — الحقن = الفهرس كما هو حرفياً ≤ 2 KB؛ وعند تجاوز الميزانية ← حذف أسطر.
2. **التدهور الآمن** — فهرس غير قابل للقراءة ← ارتداد صامت إلى اتفاقيات المؤشرات. الجلسات لا تتوقف أبداً.
3. **كتابات بموافقة بشرية** — الأداة تقترح (`draft` / `mem_save`)، والإنسان يقرر (`store` / الموافقة).

</div>

---

<div dir="rtl">

## 🚀 طريقتا التشغيل

> **المتطلبات:** Node.js ≥ 18. لا شيء غير ذلك. لا `npm install`، ولا قاعدة بيانات، ولا مفتاح API.
> (أما وجه الإضافة فيحتاج إضافةً إلى [DeepSeek Harness](https://github.com/deepseek-ai)؛
> بينما يبقى المحرك بلا اعتماديات.)

### A · واجهة CLI المستقلة — أدرجها في أي مشروع

**الخطوة 1 — انسخ المجلد إلى جذر مشروعك** (المجلد الذي يوجد فيه `AGENTS.md`):

```bash
cp -r cross-session-memory/* your-project/
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

**الخطوة 3 — أثبت صحة التثبيت (اختياري لكنه رائع):**

```bash
node install/smoke.mjs        # E2E: gates · search · injection budget · doctor
```

### B · إضافة DeepSeek Harness — أدوات أصلية + `/memory`

```
plugin_manager → install_bundle → target = <clone>/plugin/dsh-memory
```

هذا الأمر الواحد يركّب الثلاثي كاملاً (حقن المطالبة · `mem_recall` / `mem_save` ·
`/memory`) ويرسو بعد عمليات إعادة التثبيت المدمّرة. وتُمادى اعتماديتان أولاً عبر
junction/link — والوصفة الدقيقة، ومفاتيح الإعداد (`memoryCorePath`، `maxHits`)،
وقائمة قبول من ستة بنود موجودة في [`plugin/README.md`](./plugin/README.md).

**دسك الأول** (اطلب موافقة المستخدم أولاً، وفقاً للاتفاقية):

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

### CLI — `node tools/mem.mjs <command>`

| الأمر | الأثر |
|---|---|
| `index` | عرض / إعادة توليد الفهرس المقيّد بالميزانية |
| `inject` | مزامنة كتلة الحقن داخل `AGENTS.md` (تلقائياً عند الكتابة) |
| `list` | إدراج كل القيود مع علامات الصحة |
| `search <q> [n]` | بحث IDF ثلاثي المسارات مع مقاطع نصية |
| `show <name>` | عرض قيد واحد كاملاً |
| `store <file\|-> [--overwrite] [--force]` | التحقق ثم الحفظ (مع بوابات الأسرار/التكرارات/الأدلة) |
| `forget <name>` | أرشفة، دون حذف نهائي أبداً |
| `review <name>` | تحديث تاريخ التحقق، ودفع المراجعة الدورية +90 يوماً |
| `draft [topic]` | توليد هيكل من أربعة أقسام |
| `map [name]` | رسم معرفة نصي (استبدال / ذو صلة / مراجعة دورية) |
| `gather <q>` | حزمة اجتماع: قيود ذات صلة ≤8 KB |
| `global-sync` | عكس قيود `scope: global` عبر مساحات العمل |
| `stats [days]` | قياس الاسترجاع (معدل الإصابة) |
| `doctor` | فحص صحة كامل — الخروج بـ 0 وملاحظات صفرية يعني حالة سليمة |

### إضافة Harness

| الواجهة | الأثر |
|---|---|
| مقطع في المطالبة | فهرس الدروس ≤ 2 KB، في كل دورة، مع تدهور آمن |
| `mem_recall <query> [limit]` | دفتر الدروس ∪ نص الجلسات كاملاً، مدمج ومرتّب |
| `mem_save <content>` | كتابة درس واحد — **تطلب الموافقة أولاً دائماً** |
| `/memory recall <q>` | نفس البحث، يكتبه إنسان |
| `/memory save <file.md>` | حفظ قيد (كتابة الأمر هي الموافقة) |
| `/memory doctor \| review \| map \| stats \| draft` | نفس وجه الصيانة كما في CLI |

</div>

---

<div dir="rtl">

## 🏗️ البنية: وجهان ومحرك واحد

```
                    ┌───────────────────────────────────────────┐
                    │            .memory/  (DATA)               │
                    │  *.md lessons · MEMORY.md index · stats   │
                    └────────────────────┬──────────────────────┘
                                         │
                              tools/mem.mjs  (engine, 15 commands)
                                         │
                              tools/mem-core.mjs  (facade)
                          promptIndexText · formatRecall · saveAndSync
                                    ┌────┴─────┐
                                    │          │
                        CLI face ───┘          └─── plugin/dsh-memory
                     (AGENTS.md block)          (Harness: prompt section
                                                 mem_recall · mem_save
                                                 · /memory)
```

القواعد الصارمة تسري على الوجهين معاً: سقف الميزانية، والتدهور الآمن، والكتابات بموافقة بشرية.

</div>

---

<div dir="rtl">

## 📂 تشريح المستودع

```
cross-session-memory/
├── README.md · README.zh-CN.md · README.zh-TW.md · README.ar.md · README.vi.md
├── LICENSE · CHANGELOG.md · .gitignore
├── tools/
│   ├── mem.mjs            # the 15-command engine (single file, zero deps)
│   └── mem-core.mjs       # shared facade — the single entry for plugin & CLI
├── plugin/dsh-memory/     # DeepSeek Harness bundle (Plugin Edition)
│   ├── index.js           #   prompt injection · mem_recall · mem_save · /memory
│   ├── cordis.patch.yml   #   loader rows + config (memoryCorePath, maxHits)
│   ├── locale/            #   en / zh metadata
│   └── README.md          #   install · dependency materialization · acceptance
├── install/
│   ├── setup.mjs          # one-shot bootstrap
│   └── smoke.mjs          # end-to-end smoke test
├── templates/             # AGENTS.md.example + entry.example.md
├── docs/                  # DESIGN · COMMANDS · RESTORE · ATTRIBUTION
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
| 2️⃣ الموافقة | موافقة بشرية + بوابة `store` + **`mem_save` تطلب دائماً** | حماس الوكيل المفرط للكتابة |
| 3️⃣ الكشف | أنماط الأسرار · بوابة Jaccard ≥0.6 · سلسلة الأدلة | التسريبات، والتكرار، والشائعات |
| 4️⃣ النزاهة | تراجع git (يُنصح بالعمل المحلي فقط) | كل ما عدا ذلك |

> تسميم الذاكرة صنف هجوم معترف به (OWASP **ASI06**)، وأنظمة الذاكرة ذات الكتابة التلقائية هي
> الهدف. وهذا الدفتر لا يكتب **شيئاً** دون إنسان — وفي الإضافة، يعيد `mem_save` نتيجة `ask`
> عند **كل** استدعاء، وسياسة موافقة `never` ترفضه قاطعةً.

</div>

---

<div dir="rtl">

## 🗺 خارطة الطريق

- 🧩 **0.3.x** — صقل الإضافة: قياسات كتابة `tools/result`، وموقّت مراجعة ليلية، وتحقق صارم من روابط الويكي (M2)
- 🌱 **0.4** — رقعة بحث CJK احتياطي داخل الجلسات · لوحة ذاكرة في العميل · `ctx.skills` · حزم مرادفات الثنائيات · تصدير SVG من `mem map` (M3)
- 🌍 **لاحقاً** — اتحاد اختياري متعدد الدفاتر · تدويل سطر الأوامر (`--lang`)
- 🚫 **لن نفعل** — مخزنات المتجهات · البوابات · الكتابة التلقائية الصامتة. محفزات ذلك موثقة في `docs/DESIGN.md`.

</div>

---

<div dir="rtl">

## 🤝 المساهمة

نرحّب بطلبات الدمج — خصوصاً **حزم الدروس الجديدة** (بعد تنقيحها!) وترجمات README.
شغّل `node install/smoke.mjs` حتى يعطي الأخضر قبل الإرسال. ويجب أن يبقى كل الكود **بلا اعتماديات**.

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
