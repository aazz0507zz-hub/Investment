'use client';

import { SectionTitle } from './SectionTitle';

const roadmapPhases = [
  {
    period: 'السنة الأولى',
    years: '1',
    vehicles: '20 سيارة',
    color: 'border-gold bg-gold/10',
    dotColor: 'bg-gold',
    goals: [
      'إطلاق 20 سيارة فقط — لا توسع في السنة الأولى',
      'هدف: ضبط التشغيل، رفع التقييم، الوصول لـ 55–65% إشغال',
      'ممنوع التوسع إذا لم تستقر الودائع والأعطال والسمعة',
    ],
    conditions: 'شرط الانتقال للسنة 2: إشغال مستقر > 65% + سيولة ≥ 4 أشهر + تقييم Google ≥ 4.5',
    stopCondition: 'إذا لم يصل الإشغال لـ 55% في 9 أشهر: مراجعة موقع وتسعير وقناة بيع',
  },
  {
    period: 'السنة الثانية',
    years: '2',
    vehicles: '28–35 سيارة',
    color: 'border-primary-600 bg-primary-900/20',
    dotColor: 'bg-primary-500',
    goals: [
      'رفع الأسطول لـ 28–35 سيارة إذا تحقق شرط الإشغال والسيولة',
      'إدخال أول 5–8 سيارات بتمويل محدود أو كاش من أرباح محتجزة',
      'بناء عقود شهرية مع شركات صغيرة وفنادق وشقق فندقية',
    ],
    conditions: 'شرط التمويل: إشغال ≥ 68%، سيولة ≥ 4 أشهر، DSCR ≥ 1.5',
    stopCondition: 'لا توسع عند إشغال < 65% أو سيولة < 4 أشهر',
  },
  {
    period: 'السنة الثالثة',
    years: '3',
    vehicles: '45–60 سيارة',
    color: 'border-teal-600 bg-teal-900/20',
    dotColor: 'bg-teal-500',
    goals: [
      'الوصول لـ 45–60 سيارة',
      'فتح فرع ثانٍ في الزبارة فقط إذا أثبت الفرع الأول',
      'لا دخول مدينة ثانية قبل توافر مديري فروع قابلين للنسخ',
    ],
    conditions: 'شرط الفرع الثاني: 90 يوم إشغال > 72% بالفرع الأول + مدير فرع جاهز',
    stopCondition: 'الفرع الثاني قبل ثبات الأول = خطأ استراتيجي',
  },
  {
    period: 'السنتان 4–5',
    years: '4–5',
    vehicles: '80–170 سيارة',
    color: 'border-blue-600 bg-blue-900/20',
    dotColor: 'bg-blue-500',
    goals: [
      'عقود B2B حقيقية — شركات، مقاولون، سكنات موظفين',
      'اتفاقيات مع جهات صغيرة بعقود شهرية طويلة',
      'إنشاء وحدة بيع سيارات مستعملة ex-rental',
    ],
    conditions: 'الهدف: 40%+ من الإيراد من عقود B2B وليس أفراد فقط',
    stopCondition: 'لا توسع رأسمالي دون DSCR مريح وأنظمة تقارير موحدة',
  },
  {
    period: 'السنوات 6–10',
    years: '6–10',
    vehicles: '300 ← 3,000 سيارة',
    color: 'border-purple-600 bg-purple-900/20',
    dotColor: 'bg-purple-500',
    goals: [
      'التوسع خارج حائل لمدن مشابهة — لا قفزة عشوائية',
      'سنة 6: ~300 | سنة 7: ~520 | سنة 8: ~900 | سنة 9: ~1,500 | سنة 10: ~3,000',
      'يتطلب: رأس مال مؤسسي جديد + تمويل تأجيري واسع + إعادة تدوير بيع السيارات',
    ],
    conditions: 'قيمة أسطول 3,000 سيارة ≈ 195 مليون ريال — لا يُموَّل من فرع واحد صغير',
    stopCondition: 'بدون حوكمة مالية وشبكة فروع وDSCR مريح: التوسع لـ 3,000 يتحول لخطر تنظيمي ومالي',
    isConditional: true,
  },
];

export function GrowthRoadmap() {
  return (
    <section id="growth" className="py-16 bg-charcoal-light">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          title="خارطة الطريق لـ 10 سنوات"
          subtitle="مسار نمو مشروط وليس وعدًا — التوسع فقط بعد ثبات كل مرحلة"
        />

        {/* 3000 car warning */}
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4 mb-8">
          <p className="text-yellow-300 text-sm leading-relaxed">
            ⚠️ الوصول إلى 3,000 سيارة بنهاية السنة العاشرة هو <strong>مسار مشروط وليس وعدًا</strong>. يتطلب مزيجًا من رأس مال مؤسسي، تمويل تأجيري واسع، إعادة تدوير بيع السيارات، فروع متعددة، وأنظمة تشغيل وفوترة وامتثال محترفة. الفشل في أي من هذه العناصر يجعل الهدف غير قابل للتحقق.
          </p>
        </div>

        <div className="space-y-6">
          {roadmapPhases.map((phase, i) => (
            <div key={i} className={`rounded-xl border p-5 ${phase.color}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full ${phase.dotColor} flex items-center justify-center shrink-0`}>
                  <span className="text-charcoal font-bold text-xs text-center leading-tight">{phase.years}</span>
                </div>
                <div>
                  <h3 className="text-ivory font-bold text-lg">{phase.period}</h3>
                  <p className="text-gold font-semibold">{phase.vehicles}</p>
                  {phase.isConditional && (
                    <span className="text-xs bg-yellow-900/40 text-yellow-300 border border-yellow-700 rounded-full px-2 py-0.5 mt-1 inline-block">مشروط — ليس وعدًا</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <p className="text-calm-400 text-xs font-medium mb-2">الأهداف:</p>
                  <ul className="space-y-1.5">
                    {phase.goals.map((g, j) => (
                      <li key={j} className="text-calm-300 text-xs flex items-start gap-1.5">
                        <span className="text-gold mt-0.5 shrink-0">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-calm-400 text-xs font-medium mb-2">شرط التوسع:</p>
                  <p className="text-primary-400 text-xs leading-relaxed">{phase.conditions}</p>
                </div>
                <div>
                  <p className="text-calm-400 text-xs font-medium mb-2">متى نتوقف:</p>
                  <p className="text-red-400 text-xs leading-relaxed">{phase.stopCondition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
