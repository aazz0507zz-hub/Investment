'use client';

import { useState } from 'react';
import { SectionTitle } from './SectionTitle';
import { Badge } from './Badge';

interface AccordionSection {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  keyNumbers?: { label: string; value: string; badge?: 'confirmed' | 'conservative' | 'verify' }[];
  badge?: 'confirmed' | 'conservative' | 'verify';
}

const sections: AccordionSection[] = [
  {
    id: 'exec-summary',
    title: 'الملخص التنفيذي',
    summary: 'مكتب تأجير سيارات فئة (د) في حائل يركز على السيارات الاقتصادية والعائلية، مع استبعاد الفاخرة بالكامل.',
    badge: 'confirmed',
    keyPoints: [
      'فئة (د): 15 سيارة حدًا أدنى، مركز رئيسي واحد، لا تُطبق على المدن الكبرى — يطابق حائل حرفيًا',
      'السوق: 23.6 ألف عقد فردي في ربع واحد (1.33% من 1.772 مليون عقد وطني Q4 2025)',
      'المشروع قابل للتنفيذ لكن ليس بأي رأس مال أو أسطول عشوائي أو هدف توزيع سريع',
      'القرار النهائي: نفّذ بشروط صارمة غير قابلة للتفاوض',
    ],
    keyNumbers: [
      { label: 'رأس المال المستهدف', value: '1,550,000 ريال', badge: 'confirmed' },
      { label: 'عدد الأسهم', value: '2000 سهم', badge: 'confirmed' },
      { label: 'سعر السهم', value: '775 ريال', badge: 'confirmed' },
      { label: 'نقطة التعادل', value: '~51% إشغال', badge: 'conservative' },
    ],
  },
  {
    id: 'why-hail',
    title: 'لماذا حائل؟',
    summary: 'قراءة واقعية للسوق المحلي وليس ترويجًا إنشائيًا.',
    badge: 'confirmed',
    keyPoints: [
      'إشارة كمية مباشرة: 23,600 عقد فردي في Q4 2025 فقط، دون احتساب عقود الشركات',
      'الطلب يتوزع على: قادمون/مغادرون، موظفون/مقاولون شهريون، عائلات في العطل، مؤسسات صغيرة',
      'السلوك الشرائي: حساس للسعر لكن ليس على حساب الثقة',
      'أهم أسباب المغادرة: تأخير فك الحجز، سيارة غير نظيفة، عطل مبكر، اختلاف بين الحجز والتسليم',
      'الموقع الأفضل: طريق المدينة/محور المطار — لا داخل المطار',
    ],
    keyNumbers: [
      { label: 'حصة حائل من العقود الوطنية', value: '1.33%', badge: 'confirmed' },
      { label: 'عقود فردية Q4 2025', value: '~23,600 عقد', badge: 'confirmed' },
    ],
  },
  {
    id: 'identity',
    title: 'الهوية والعلامة التجارية',
    summary: 'اسم "سند - SANAD" هو الاسم النهائي الموصى به لأنه يحل أكبر فجوة في السوق: الثقة بعد الحجز وبعد الاسترجاع.',
    badge: 'conservative',
    keyPoints: [
      'سند = سيارة واضحة + عقد واضح + استرجاع واضح',
      'الاسم عربي، سهل، محترم، غير محصور في حائل، قابل للتوسع ولبناء تطبيق',
      'تم مقارنته مع 24 اسمًا آخر — سند الأفضل',
      'الاسم التجاري يحتاج فحص رسمي لدى وزارة التجارة والهيئة السعودية للملكية الفكرية قبل التسجيل',
    ],
  },
  {
    id: 'legal',
    title: 'الدراسة القانونية والتنظيمية',
    summary: 'شركة ذات مسؤولية محدودة هي الهيكل القانوني الأنسب — لا مؤسسة فردية.',
    badge: 'confirmed',
    keyPoints: [
      'رسوم تأسيس LLC: 1,200 ريال سجل + 500 ريال نشر + VAT = ~1,955 ريال',
      'الواجهة والكاونتر: سعوديون فقط — غرامة 20,000 ريال لكل عامل مخالف',
      'يجب التسجيل في VAT من البداية (حد إلزامي 375,000 ريال)',
      'الفوترة الإلكترونية: اختر نظامًا متوافقًا من اليوم الأول',
      'بطاقة تشغيل لكل سيارة — سيارات جديدة لم تسبق تسجيلها',
    ],
    keyNumbers: [
      { label: 'رسوم تأسيس LLC', value: '~1,955 ريال', badge: 'confirmed' },
      { label: 'غرامة مخالفة التوطين', value: '20,000 ريال/عامل', badge: 'confirmed' },
      { label: 'ترخيص الهيئة', value: 'غير متاح للتحقق العلني', badge: 'verify' },
    ],
  },
  {
    id: 'market',
    title: 'دراسة السوق',
    summary: 'السوق موجود فعليًا ويكافئ الانضباط التشغيلي أكثر من الاسم بحد ذاته.',
    badge: 'confirmed',
    keyPoints: [
      'أربع شرائح طلب: أفراد، شهري، عائلي، مؤسسي صغير',
      'وجود لومي في المطار وعروض مطارات تثبت حركة تأجير فعلية',
      'المنافسة عالية لكنها تثبت أن الحركة موجودة',
      'مؤشر نجاح السمعة: الانضباط التشغيلي + شفافية السعر والعقد',
    ],
  },
  {
    id: 'competitor-analysis',
    title: 'تحليل المنافسين',
    summary: '19 منافسًا تم تحليلهم — الأخطر الخمسة على الإطلاق الأول: سلس، ذيب، يلو، بدجت، لومي.',
    badge: 'conservative',
    keyPoints: [
      'التحليل مبني على ملفات منافسين مرفقة وليس تخمينات',
      'أكثر الشكاوى تكرارًا: مبلغ الحجز، عدم مطابقة السيارة، النظافة، الأعطال المبكرة',
      'أكثر الإيجابيات: سرعة الإجراءات، حسن التعامل، نظافة السيارة، وضوح السعر',
      'المدخل الصحيح: عرض مضاد لكل شكوى متكررة، لا حرب أسعار',
    ],
  },
  {
    id: 'pricing-strategy',
    title: 'استراتيجية التسعير',
    summary: 'الهدف ليس أن نكون الأرخص، بل أن نكون الأكثر وضوحًا وانضباطًا.',
    badge: 'confirmed',
    keyPoints: [
      'التسعير مبني على جدول أسعار سوقي فعلي من حائل/ينبع/المدينة',
      'لا تنزل تحت floor price أبدًا — 7 فئات سعرية واضحة',
      'ارفع السعر عند: إشغال 14 يوم > 78%، أو عطلات > 90%، أو 25 حجز فقد',
      'اخفض السعر عند: إشغال 21 يوم < 52%، أو شاغر > 5 أيام',
    ],
  },
  {
    id: 'fleet-strategy',
    title: 'استراتيجية الأسطول',
    summary: '5 سيناريوهات تم تحليلها — السيناريو الثاني هو الأفضل للإطلاق.',
    badge: 'confirmed',
    keyPoints: [
      'السيناريو الثاني: 7 أكسنت + 7 يارس + 2 بيجاس + 2 i10 + 2 إلنترا',
      'لا تورس في الإطلاق الأول — تستهلك رأس مال وتزيد تكلفة الصيانة',
      'دورة تدوير: أكسنت/يارس 36 شهر أو 120-140k كم',
      'بيع السيارة قبل أن تبدأ بأكل الاسم',
    ],
  },
  {
    id: 'cash-vs-finance',
    title: 'الشراء كاش أم تمويل',
    summary: 'مرحلة البداية: كاش أفضل. التمويل من الشهر 13-18 فقط بشروط صارمة.',
    badge: 'conservative',
    keyPoints: [
      'الكاش يعطي مرونة في أول 12 شهر ويمنع ضغط القسط من حرق الأسعار',
      'شروط التمويل: إشغال ≥ 68% لـ 6 أشهر، سيولة ≥ 4 أشهر، DSCR ≥ 1.5',
      'سقف الأقساط: لا تتجاوز 25% من الإيراد الشهري',
      'الأرقام التمويلية هي نمذجة محافظة — ليست عروض بنكية فعلية',
    ],
    keyNumbers: [
      { label: 'قسط i10 (نموذج)', value: '~793 ريال/شهر', badge: 'conservative' },
      { label: 'قسط أكسنت (نموذج)', value: '~1,066 ريال/شهر', badge: 'conservative' },
      { label: 'عروض البنوك الفعلية', value: 'يحتاج تحقق', badge: 'verify' },
    ],
  },
  {
    id: 'operations',
    title: 'خطة التشغيل اليومية',
    summary: 'بروتوكول تشغيلي من A إلى Z يغطي الاستقبال والتسليم والاسترجاع والحوادث.',
    badge: 'confirmed',
    keyPoints: [
      '18 خطوة في SOP التسليم والاسترجاع',
      'تصوير 360 + عداد + وقود + كفرات + زوايا أربع قبل وبعد',
      'SLA فك الحجز: إقفال الملف 12 ساعة، فك الحجز 24-72 ساعة',
      'لا تسليم سيارة خارج النظام — لا استثناءات',
    ],
  },
  {
    id: 'tech-systems',
    title: 'الأنظمة التقنية',
    summary: 'منصة تأجير إلزامية + نظام ERP تأجير مخصص + GPS + فوترة إلكترونية.',
    badge: 'verify',
    keyPoints: [
      'منصة تأجير: عقود موحدة وتكامل حكومي — إلزامية',
      'Dynamic / نافذ / Fleetoo: مرشحون قويون — الأسعار غير متاح للتحقق',
      'GPS لكل سيارة: ضرورة تشغيلية وأمنية',
      'الفوترة الإلكترونية: اختر نظامًا متوافقًا من البداية',
    ],
    keyNumbers: [
      { label: 'أسعار الأنظمة', value: 'غير متاح للتحقق العلني', badge: 'verify' },
    ],
  },
  {
    id: 'maintenance',
    title: 'الصيانة',
    summary: 'تكلفة الصيانة الشهرية مُدرجة بدقة في النموذج المالي.',
    badge: 'confirmed',
    keyPoints: [
      'تغيير زيت كل 5000 كم — تكلفة 62-90 ريال/مرة',
      'كفرات: ~500 ريال/كل 5 أشهر/سيارة',
      'صيانة شهرية إجمالية: 330-750 ريال/سيارة حسب الفئة',
      'تورس الأعلى صيانة: 600-750 ريال/شهر — سبب آخر لاستبعادها في الإطلاق',
    ],
  },
  {
    id: 'insurance',
    title: 'التأمين والحوادث',
    summary: 'تأمين شامل من اليوم الأول — لا تفاوض على هذا.',
    badge: 'conservative',
    keyPoints: [
      'مبالغ الحجز: 1000-2500 ريال حسب الفئة',
      'عند الحادث: إيقاف، نجم/مرور، صور، سحب، فتح مطالبة في نفس اليوم',
      'فرق تعويض التأمين: يُسجل دخلًا فقط وفق الشروط النظامية الصارمة',
      'أسعار التأمين الأسطولي: غير متاح للتحقق — افتراض محافظ 83,600 ريال/سنة',
    ],
    keyNumbers: [
      { label: 'تأمين سنة أولى (افتراض)', value: '83,600 ريال', badge: 'conservative' },
      { label: 'أسعار التأمين الفعلية', value: 'يحتاج تحقق', badge: 'verify' },
    ],
  },
  {
    id: 'financial-study',
    title: 'الدراسة المالية',
    summary: 'النموذج المالي مبني على السيناريو الثاني الموصى به — مالك-مدير lean.',
    badge: 'confirmed',
    keyPoints: [
      'مصروفات ثابتة: 26,240 ريال/شهر',
      'تكلفة أسطول ثابتة: ~7,500 ريال/شهر',
      'إيراد عند 75% إشغال: 62,415 ريال/شهر',
      'صافي تشغيلي عند 75%: 17,112 ريال/شهر',
      'المشروع لا يحتمل إشغالًا منخفضًا طويلًا — الربحية تبدأ من 70%+',
    ],
    keyNumbers: [
      { label: 'إيراد 75% إشغال', value: '62,415 ريال/شهر', badge: 'confirmed' },
      { label: 'صافي تشغيلي 75%', value: '17,112 ريال/شهر', badge: 'confirmed' },
      { label: 'مصروفات ثابتة', value: '26,240 ريال/شهر', badge: 'confirmed' },
    ],
  },
  {
    id: 'shares-investors',
    title: 'الأسهم والمستثمرون',
    summary: 'هيكل استثماري واضح وشفاف — 2000 سهم بـ 775 ريال للسهم.',
    badge: 'confirmed',
    keyPoints: [
      'الأسهم مقسومة بشكل بسيط على 2000 وحدة استثمارية',
      'سعر السهم هو ناتج رأس المال الفعلي مقسومًا على عدد الأسهم',
      'لا توزيعات أول 24 شهر',
      'شروط التوزيع خمسة يجب تحققها معًا — حماية للمستثمرين والتشغيل',
    ],
  },
  {
    id: 'additional-revenue',
    title: 'الإيرادات الإضافية النظامية',
    summary: 'مصادر إيراد إضافية مدرجة في الميزانية بمحافظة وشفافية.',
    badge: 'confirmed',
    keyPoints: [
      'كيلومترات زائدة: 3-5% من الإيراد — مبنية في الميزانية',
      'عقود الشركات الشهرية: مدرجة بقوة',
      'غرامة التدخين والتأخير: لا تُبنى إيرادًا أساسيًا',
      'البيع الدوري للسيارات: مدرج في التخطيط الرأسمالي',
    ],
  },
  {
    id: 'risk-management',
    title: 'إدارة المخاطر',
    summary: '12 مخاطرة تم تحليلها وتحديد صاحبها وخطة وقايتها ومعالجتها.',
    badge: 'confirmed',
    keyPoints: [
      'أعلى مخاطر تأثير: إشغال منخفض، حادث جسيم، عميل لا يُعيد السيارة',
      'أعلى مخاطر احتمالية: حرب أسعار، نزاع مبلغ الحجز، رائحة دخان',
      'الحل الجوهري: انضباط تشغيلي + تأمين شامل + Dashboard امتثال يومي',
    ],
  },
  {
    id: 'growth-plan',
    title: 'خطة النمو 10 سنوات',
    summary: 'مسار نمو مشروط وليس وعدًا — التوسع فقط بعد ثبات التشغيل.',
    badge: 'conservative',
    keyPoints: [
      'سنة 1: 20 سيارة — ضبط التشغيل والسمعة',
      'سنة 2: 28-35 سيارة (بشروط)',
      'سنة 3: 45-60 سيارة + فرع ثانٍ (بشروط)',
      'سنة 10: 3000 سيارة — مسار مشروط يحتاج رأس مال مؤسسي + تمويل واسع',
    ],
  },
  {
    id: 'marketing',
    title: 'التسويق وبناء الاسم',
    summary: 'الاسم يُبنى بالانضباط التشغيلي لا بالإعلانات وحدها.',
    badge: 'conservative',
    keyPoints: [
      'Google Maps: اطلب تقييمًا برابط قصير بعد كل عقد ناجح',
      'واتساب أعمال: كل عقد له ملخص قبل التنفيذ',
      'محتوى قصير حقيقي: قبل/بعد تنظيف، تسليمات، شرح ما يشمله السعر',
      'هدف أول 90 يوم: 30 تقييم بمتوسط 4.7+',
    ],
  },
  {
    id: 'final-decision',
    title: 'القرار النهائي',
    summary: 'نفّذ بشروط صارمة غير قابلة للتفاوض.',
    badge: 'confirmed',
    keyPoints: [
      '1. شركة ذات مسؤولية محدودة لا مؤسسة فردية',
      '2. فئة (د) رسميًا، 15+ سيارة من اليوم الأول',
      '3. لا توزيعات أرباح أول 24 شهر',
      '4. لا تورس في الإطلاق الأول',
      '5. تشغيل بمالك-مدير أو مدير تنفيذي شريك فعليًا',
      '6. وعد تشغيلي واحد: السيارة المحجوزة هي التي تُسلَّم، والسعر والتأمين والكيلومترات مكتوبة قبل التوقيع',
    ],
  },
];

export function FeasibilityStudy() {
  const [openId, setOpenId] = useState<string | null>('exec-summary');

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section id="feasibility" className="py-16 bg-charcoal">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          title="دراسة الجدوى التفصيلية"
          subtitle="المصدر الوحيد للأرقام: docs/FINAL_STUDY.md — الأرقام المعروضة منقولة مباشرة من الدراسة"
        />

        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border border-calm-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-right bg-charcoal-light hover:bg-charcoal-medium transition-colors"
                aria-expanded={openId === section.id}
              >
                <div className="flex items-center gap-3">
                  <span className="text-ivory font-semibold text-sm md:text-base">{section.title}</span>
                  {section.badge && <Badge variant={section.badge} />}
                </div>
                <span className="text-calm-500 text-lg transition-transform" style={{ transform: openId === section.id ? 'rotate(180deg)' : 'none' }}>
                  ▼
                </span>
              </button>

              {openId === section.id && (
                <div className="px-5 pb-5 pt-3 bg-charcoal border-t border-calm-800">
                  <p className="text-calm-300 text-sm mb-4 leading-relaxed">{section.summary}</p>

                  <ul className="space-y-2 mb-4">
                    {section.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-calm-300">
                        <span className="text-gold mt-0.5 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {section.keyNumbers && section.keyNumbers.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      {section.keyNumbers.map((num, i) => (
                        <div key={i} className="bg-charcoal-light rounded-lg p-3 border border-calm-700">
                          <p className="text-calm-400 text-xs mb-1">{num.label}</p>
                          <p className="text-ivory font-semibold text-sm">{num.value}</p>
                          {num.badge && <Badge variant={num.badge} className="mt-1" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
