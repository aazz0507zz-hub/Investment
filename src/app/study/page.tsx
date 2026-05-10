import Link from 'next/link';
import { StudyPrevNext } from '@/components/StudySidebar';
import { projectConfig } from '@/data/projectConfig';
import { formatCurrency } from '@/lib/utils';

export default function StudyOverviewPage() {
  const stats = [
    { label: 'رأس المال المستهدف', value: formatCurrency(projectConfig.targetCapital), badge: 'رقم مؤكد' },
    { label: 'سعر السهم', value: formatCurrency(projectConfig.sharePrice), badge: 'رقم مؤكد' },
    { label: 'عدد الأسهم', value: projectConfig.totalShares.toLocaleString('ar-SA'), badge: 'رقم مؤكد' },
    { label: 'حجم الأسطول', value: `${projectConfig.launchFleetSize} سيارة`, badge: 'رقم مؤكد' },
    { label: 'نقطة التعادل', value: `${projectConfig.breakEvenOccupancy}٪ إشغال`, badge: 'افتراض محافظ' },
    { label: 'حصة المستثمرين', value: `${projectConfig.distributionPolicy.investors}٪ من الأرباح`, badge: 'رقم مؤكد' },
    { label: 'لا توزيعات أول', value: `${projectConfig.noDistributionMonths} شهرًا`, badge: 'رقم مؤكد' },
    { label: 'التوصية النهائية', value: 'نفّذ بشروط صارمة', badge: 'القرار النهائي' },
  ];

  const sections = [
    { href: '/study/legal', label: 'القانوني والامتثال', desc: 'هيكل الشركة، متطلبات الترخيص، العمالة، VAT', icon: '⚖️' },
    { href: '/study/market', label: 'تحليل السوق', desc: '23,600 عقد في Q4 2025 · حصة 1.33% وطنيًا', icon: '📈' },
    { href: '/study/competitors', label: 'تحليل المنافسين', desc: 'تقييم 19 منافسًا مع استراتيجيات المواجهة', icon: '📍' },
    { href: '/study/pricing', label: 'التسعير', desc: 'جداول الأسعار، الحد الأدنى، الودائع', icon: '💰' },
    { href: '/study/fleet', label: 'الأسطول', desc: '7 فئات سيارات مع أسعار الشراء والصيانة', icon: '🔑' },
    { href: '/study/scenarios', label: 'سيناريوهات الأسطول', desc: '5 سيناريوهات مع مقارنة التكاليف والعوائد', icon: '🚗' },
    { href: '/study/financials', label: 'التحليل المالي', desc: 'الاستثمار الأولي، المصاريف، الإيرادات، نقطة التعادل', icon: '📊' },
    { href: '/study/operations', label: 'التشغيل والعمليات', desc: 'قبل الافتتاح، SOP التسليم والاستلام، الصيانة', icon: '⚙️' },
    { href: '/study/risks', label: 'لوحة المخاطر', desc: '12 خطرًا رئيسيًا مع استراتيجيات المعالجة', icon: '⚠️' },
    { href: '/study/governance', label: 'الحوكمة والشفافية', desc: 'سياسات التوزيع، التقارير، حل النزاعات', icon: '📋' },
    { href: '/study/investor-demo', label: 'منصة المستثمر', desc: 'عرض توضيحي لما سيراه المستثمر لاحقًا', icon: '📈' },
    { href: '/study/timeline', label: 'الخطة الزمنية', desc: 'أول 90 يومًا وخارطة الطريق للسنوات العشر', icon: '📅' },
    { href: '/study/exit', label: 'حاسبة التخارج', desc: 'احسب القيمة التقديرية عند الخروج في أي سنة', icon: '🚪' },
    { href: '/study/downloads', label: 'التنزيلات والتسجيل', desc: 'حمّل الملفات وسجّل اهتمامك بالمشاركة', icon: '⬇️' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">دراسة الجدوى — نظرة عامة</h1>
        <p className="text-[var(--text-muted)] mt-2">
          {projectConfig.nameAr} · {projectConfig.nameEn} · {projectConfig.city} · {projectConfig.licenseType}
        </p>
      </div>

      {/* Executive summary */}
      <section className="bg-forest/10 border border-forest/30 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-bold text-[var(--text-base)]">الملخص التنفيذي</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          مشروع <strong className="text-[var(--text-base)]">سند لتأجير السيارات</strong> هو مكتب تأجير سيارات فئة (د)
          في حائل يركز على السيارات الاقتصادية والعائلية، ويستبعد الفاخرة بالكامل.
          الإشارة الكمية المباشرة: <strong className="text-[var(--text-base)]">23,600+ عقد فردي في Q4 2025 وحده</strong> في حائل.
          المشروع قابل للتنفيذ لكن ليس بأي رأس مال أو خلط أسطول أو هدف توزيع سريع.
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          <strong className="text-[var(--text-base)]">التوصية النهائية:</strong> نفّذ بشروط صارمة غير قابلة للتفاوض.
          السيناريو الموصى به: 20 سيارة (7 أكسنت + 7 يارس + 2 بيجاس + 2 i10 + 2 إلنترا).
        </p>
      </section>

      {/* Key numbers */}
      <section>
        <h2 className="text-xl font-bold text-[var(--text-base)] mb-4">الأرقام الرئيسية</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)]">
              <div className="text-xl font-extrabold text-gold">{s.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
              <span className={`text-xs px-1.5 py-0.5 rounded-full mt-2 inline-block ${
                s.badge === 'رقم مؤكد' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                s.badge === 'افتراض محافظ' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>{s.badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Distribution policy */}
      <section className="border border-[var(--border)] rounded-xl p-6 bg-[var(--card-bg)] space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">سياسة توزيع الأرباح</h2>
        <div className="space-y-3">
          {[
            { label: 'المستثمرون', pct: projectConfig.distributionPolicy.investors, color: 'bg-gold' },
            { label: 'احتياطي وتطوير', pct: projectConfig.distributionPolicy.developmentAndReserve, color: 'bg-forest-light' },
            { label: 'إدارة', pct: projectConfig.distributionPolicy.management, color: 'bg-calm-500' },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--text-muted)]">{item.label}</span>
                <span className="font-bold text-[var(--text-base)]">{item.pct}٪</span>
              </div>
              <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          * التوزيع يبدأ بعد {projectConfig.noDistributionMonths} شهرًا ويخضع لشروط موضحة في قسم المالية
        </p>
      </section>

      {/* Navigation cards */}
      <section>
        <h2 className="text-xl font-bold text-[var(--text-base)] mb-4">أقسام دراسة الجدوى</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {sections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] hover:border-forest/50 hover:bg-forest/5 transition-colors flex gap-4 items-start group"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-bold text-[var(--text-base)] group-hover:text-forest dark:group-hover:text-green-400 transition-colors">{item.label}</div>
                <div className="text-sm text-[var(--text-muted)] mt-0.5">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <StudyPrevNext />
    </div>
  );
}
