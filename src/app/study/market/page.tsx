import { StudyPrevNext } from '@/components/StudySidebar';

const demandSources = [
  {
    segment: 'القادمون والمغادرون',
    desc: 'مسافرون يصلون عبر مطار حائل ويحتاجون تنقلًا لأيام أو أسبوع',
    frequency: 'يومي',
    priority: 'عالية',
  },
  {
    segment: 'الموظفون والمقاولون',
    desc: 'موظفون من خارج حائل في مشاريع حكومية أو خاصة، يحتاجون سيارة شهرية',
    frequency: 'شهري مستمر',
    priority: 'عالية',
  },
  {
    segment: 'العائلات والزيارات',
    desc: 'عائلات في إجازات وزيارات، يفضلون سيارة مريحة بسعر معقول',
    frequency: 'موسمي وأسبوعي',
    priority: 'متوسطة',
  },
  {
    segment: 'المؤسسات الصغيرة والشركات',
    desc: 'شركات محلية تحتاج عقودًا شهرية أو سنوية للموظفين أو المراسلات',
    frequency: 'شهري مستمر',
    priority: 'عالية',
  },
  {
    segment: 'السياح والزوار الموسميون',
    desc: 'زوار الجبال والمواسم السياحية في حائل',
    frequency: 'موسمي',
    priority: 'متوسطة',
  },
];

const locationReasons = [
  { reason: 'قرب المطار', detail: 'أكبر مصدر للعملاء المباشرين' },
  { reason: 'طريق المدينة المنورة', detail: 'حركة مرور عالية وسهولة رؤية اللافتة' },
  { reason: 'بعيد عن مطار المبنى نفسه', detail: 'تكلفة أقل وحرية تشغيلية أوسع' },
  { reason: 'إيجار معقول', detail: 'لا تدفع أجار مطار — حافظ على التكاليف' },
  { reason: 'سهولة التوصيل والاستلام', detail: 'يمكن توصيل المطار كخدمة مجدولة' },
];

const customerBehaviorInsights = [
  'حساس للسعر لكن ليس على حساب الثقة — يفضل الوضوح على الرخص',
  'أهم شكاوى العملاء: تأخير فك الحجز، سيارة غير نظيفة، عطل مبكر',
  'الاختلاف بين السيارة المحجوزة والمسلّمة — مشكلة رئيسية في السوق',
  'التقييمات السلبية في حائل تتركز في: الاستجابة البطيئة والعطل وعدم الوضوح في التسعير',
  'الثقة تُبنى بالعقود الواضحة والصور قبل وبعد التسليم والفواتير الشفافة',
  'عميل راضٍ في حائل يُحيل آخرين — السوق صغير وشبكي',
];

export default function MarketPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">تحليل السوق وفرصة حائل</h1>
        <p className="text-[var(--text-muted)] mt-2">
          قراءة واقعية للسوق المحلي — ليس ترويجًا إنشائيًا
        </p>
      </div>

      {/* إشارة كمية */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">الإشارة الكمية المباشرة</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-forest/10 border border-forest/30 rounded-xl p-5 space-y-3">
            <div className="text-3xl font-extrabold text-gold">23,600+</div>
            <div className="text-sm font-semibold text-[var(--text-base)]">عقد تأجير فردي في حائل — Q4 2025 فقط</div>
            <div className="text-xs text-[var(--text-muted)]">
              مصدر: الهيئة العامة للنقل — إجمالي وطني 1.772 مليون عقد، حصة حائل 1.33%
            </div>
            <div className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium">
              رقم مؤكد
            </div>
          </div>
          <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)] space-y-3">
            <div className="text-3xl font-extrabold text-gold">1.33%</div>
            <div className="text-sm font-semibold text-[var(--text-base)]">حصة حائل من إجمالي العقود الوطنية</div>
            <div className="text-xs text-[var(--text-muted)]">
              هذا قبل احتساب عقود الشركات والاشتراكات الشهرية غير الفردية — السوق أكبر من هذا الرقم
            </div>
            <div className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium">
              رقم مؤكد
            </div>
          </div>
        </div>
        <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-4 text-sm text-[var(--text-muted)]">
          <strong className="text-[var(--text-base)]">الخلاصة:</strong> السوق موجود فعليًا. لكنه لا يحتمل إدارة مرتخية أو تسعيرًا عشوائيًا. يكافئ الانضباط التشغيلي أكثر من &quot;الاسم&quot; بحد ذاته.
        </div>
      </section>

      {/* شرائح الطلب */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">شرائح الطلب في حائل</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                {['الشريحة', 'وصف الطلب', 'التكرار', 'الأولوية'].map((h) => (
                  <th key={h} className="px-4 py-3 text-right font-semibold text-[var(--text-base)] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {demandSources.map((row, i) => (
                <tr key={i} className="hover:bg-[var(--surface-alt)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-base)]">{row.segment}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{row.desc}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{row.frequency}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.priority === 'عالية' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* الموقع الأفضل */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">الموقع الأفضل للمكتب</h2>
        <div className="bg-forest/10 border border-forest/30 rounded-xl p-5">
          <div className="font-bold text-[var(--text-base)] mb-3">
            🗺️ طريق المدينة المنورة / محور المطار — خارج مبنى المطار
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {locationReasons.map((r, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-gold mt-0.5">✓</span>
                <div>
                  <div className="text-sm font-medium text-[var(--text-base)]">{r.reason}</div>
                  <div className="text-xs text-[var(--text-muted)]">{r.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
          <strong>تنبيه:</strong> لا تبدأ التعاقد على موقع قبل الحصول على موافقة البلدية والهيئة. الموقع مشروط بالتراخيص.
        </div>
      </section>

      {/* سلوك العملاء */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">رؤى سلوك العملاء</h2>
        <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)] space-y-3">
          {customerBehaviorInsights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gold text-lg leading-none mt-0.5">💡</span>
              <p className="text-sm text-[var(--text-muted)]">{insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision 2030 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">التوافق مع رؤية 2030</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: '🏙️', title: 'تحسين جودة الخدمات', desc: 'تقديم خدمة تأجير منظمة شفافة ترفع معيار التجربة المحلية' },
            { icon: '💻', title: 'التحول الرقمي', desc: 'عقود إلكترونية، فوترة رقمية، تتبع GPS، نظام إدارة متكامل' },
            { icon: '🔍', title: 'الشفافية', desc: 'تقارير شهرية للمستثمرين، أسعار معلنة، عقود واضحة' },
            { icon: '🚗', title: 'جودة خدمات التنقل', desc: 'تلبية احتياجات التنقل اليومي بسيارات حديثة وبأسعار معقولة' },
          ].map((item) => (
            <div key={item.title} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] flex gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-bold text-[var(--text-base)] text-sm">{item.title}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <StudyPrevNext />
    </div>
  );
}
