# سند لتأجير السيارات — SANAD Rent
### موقع المستثمر | Investor Website

موقع ويب متكامل للمستثمرين يعرض دراسة الجدوى الكاملة لمكتب تأجير سيارات فئة (د) في حائل، المملكة العربية السعودية.

---

## تشغيل المشروع محليًا

```bash
npm install
npm run dev
```

ثم افتح المتصفح على: `http://localhost:3000`

## بناء للإنتاج

```bash
npm run build
npm start
```

---

## كيف تعدّل الأرقام؟

**جميع الأرقام تعيش في ملفات `src/data/` — لا تُعدِّل داخل المكونات.**

| الملف | ما يحتوي |
|-------|----------|
| `src/data/projectConfig.ts` | اسم المشروع، رأس المال، عدد الأسهم، سعر السهم، سياسة التوزيع |
| `src/data/financials.ts` | الاستثمار الأولي، المصروفات الشهرية، الإيرادات المتوقعة |
| `src/data/scenarios.ts` | السيناريوهات الخمسة للأسطول |
| `src/data/fleet.ts` | أسعار السيارات، الصيانة، الحكم التشغيلي |
| `src/data/pricing.ts` | جدول الأسعار، floor price، إشارات رفع/خفض السعر |
| `src/data/competitors.ts` | المنافسون، التقييمات، استراتيجية المواجهة |
| `src/data/risks.ts` | جدول المخاطر، سيناريوهات الخسارة |
| `src/data/timeline.ts` | خطة أول 90 يومًا |
| `src/data/governance.ts` | جدول الحوكمة، السياسات |
| `src/data/investorSimulator.ts` | بيانات تجريبية لمنصة المستثمر التوضيحية |

---

## كيف تعدّل السيناريوهات؟

افتح `src/data/scenarios.ts` وعدّل أي حقل في مصفوفة `fleetScenarios`.

---

## كيف تعدّل المنافسين؟

افتح `src/data/competitors.ts` وعدّل مصفوفة `competitors`.

---

## كيف تعدّل الهوية (البراندينج)؟

افتح `src/data/projectConfig.ts` وعدّل `nameAr`, `nameEn`, `taglineAr`, `targetCapital`, `sharePrice`.

لتعديل الألوان: افتح `tailwind.config.ts` وعدّل `forest`, `gold`, `charcoal`, `ivory`.

---

## النشر على Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## ربط Supabase / Google Sheets مستقبلًا

أماكن الربط موضّحة بتعليقات `TODO` في `src/components/InvestorForm.tsx`.

---

## تنبيه قانوني

هذا الموقع لا يمثل طرحًا عامًا للأوراق المالية، ولا وعدًا بعائد، ولا توصية استثمارية ملزمة.