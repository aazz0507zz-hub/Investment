import Link from 'next/link';
import { projectConfig } from '@/data/projectConfig';
import { formatCurrency } from '@/lib/utils';

export default function Home() {
  const stats = [
    { label: 'رأس المال المستهدف', value: formatCurrency(projectConfig.targetCapital) },
    { label: 'سعر السهم', value: formatCurrency(projectConfig.sharePrice) },
    { label: 'إجمالي الأسهم', value: projectConfig.totalShares.toLocaleString('ar-SA') },
    { label: 'حجم الأسطول', value: `${projectConfig.launchFleetSize} سيارة` },
    { label: 'نقطة التعادل', value: `${projectConfig.breakEvenOccupancy}٪ إشغال` },
    { label: 'نسبة المستثمرين', value: `${projectConfig.distributionPolicy.investors}٪` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="inline-block bg-forest/20 border border-forest/30 text-gold text-sm font-semibold px-4 py-1.5 rounded-full">
          {projectConfig.city} · {projectConfig.country} · {projectConfig.licenseType}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-base)] leading-tight">
          {projectConfig.nameAr}
        </h1>
        <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
          {projectConfig.taglineAr}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/study"
            className="bg-forest hover:bg-forest-light text-ivory font-bold px-6 py-3 rounded-lg transition-colors"
          >
            استعرض دراسة الجدوى
          </Link>
          <Link
            href="/study/register"
            className="bg-gold hover:bg-gold-light text-charcoal font-bold px-6 py-3 rounded-lg transition-colors"
          >
            سجّل اهتمامك بالاستثمار
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center"
          >
            <div className="text-2xl font-extrabold text-gold">{s.value}</div>
            <div className="text-sm text-[var(--text-muted)] mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="grid sm:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[var(--text-base)]">عن المشروع</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            مشروع <strong className="text-[var(--text-base)]">سند لتأجير السيارات</strong> هو
            فرصة استثمارية لمكتب تأجير سيارات فئة (د) في مدينة حائل، يستهدف العملاء الأفراد
            والشركات بأسطول من 20 سيارة اقتصادية وعائلية. يقوم المشروع على نموذج ربح
            واضح مع هيكل حوكمة شفاف.
          </p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li className="flex items-center gap-2">
              <span className="text-gold">✓</span> دراسة جدوى شاملة بـ 5 سيناريوهات
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold">✓</span> تحليل 19 منافسًا في السوق
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold">✓</span> خطة تشغيلية لأول 90 يومًا
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold">✓</span>{' '}
              توزيع {projectConfig.distributionPolicy.investors}٪ للمستثمرين بعد{' '}
              {projectConfig.noDistributionMonths} شهرًا
            </li>
          </ul>
        </div>
        <div className="bg-forest/10 border border-forest/20 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-[var(--text-base)]">سياسة التوزيع</h3>
          {[
            { label: 'المستثمرون', pct: projectConfig.distributionPolicy.investors, color: 'bg-gold' },
            { label: 'احتياطي وتطوير', pct: projectConfig.distributionPolicy.developmentAndReserve, color: 'bg-forest-light' },
            { label: 'إدارة', pct: projectConfig.distributionPolicy.management, color: 'bg-calm-500' },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[var(--text-muted)]">{item.label}</span>
                <span className="font-bold">{item.pct}٪</span>
              </div>
              <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
          <p className="text-xs text-[var(--text-muted)]">
            * التوزيع يبدأ بعد {projectConfig.noDistributionMonths} شهرًا من الإطلاق
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest rounded-2xl p-8 text-center text-ivory space-y-4">
        <h2 className="text-2xl font-bold">مستعد للمزيد من التفاصيل؟</h2>
        <p className="text-ivory/70 max-w-md mx-auto">
          استعرض دراسة الجدوى الكاملة تشمل التحليل المالي، السيناريوهات، المنافسين،
          المخاطر، والحوكمة.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/study"
            className="bg-ivory text-forest font-bold px-6 py-3 rounded-lg hover:bg-ivory-warm transition-colors"
          >
            ابدأ القراءة
          </Link>
          <Link
            href="/study/calculator"
            className="border border-ivory/30 text-ivory font-bold px-6 py-3 rounded-lg hover:bg-ivory/10 transition-colors"
          >
            جرّب الحاسبة
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="text-center text-xs text-[var(--text-muted)] max-w-2xl mx-auto border-t border-[var(--border)] pt-8">
        {projectConfig.disclaimer}
      </section>
    </div>
  );
}
