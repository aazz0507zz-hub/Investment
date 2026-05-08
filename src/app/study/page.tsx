import Link from 'next/link';
import { StudyPrevNext } from '@/components/StudySidebar';
import { projectConfig } from '@/data/projectConfig';
import { formatCurrency } from '@/lib/utils';

export default function StudyOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">دراسة الجدوى — نظرة عامة</h1>
        <p className="text-[var(--text-muted)] mt-2">
          {projectConfig.nameAr} · {projectConfig.city} · {projectConfig.licenseType}
        </p>
      </div>

      {/* Key numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'رأس المال المستهدف', value: formatCurrency(projectConfig.targetCapital) },
          { label: 'سعر السهم', value: formatCurrency(projectConfig.sharePrice) },
          { label: 'عدد الأسهم', value: projectConfig.totalShares.toLocaleString('ar-SA') },
          { label: 'حجم الأسطول', value: `${projectConfig.launchFleetSize} سيارة` },
          { label: 'نقطة التعادل', value: `${projectConfig.breakEvenOccupancy}٪` },
          { label: 'حصة المستثمرين', value: `${projectConfig.distributionPolicy.investors}٪` },
        ].map((s) => (
          <div key={s.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center">
            <div className="text-xl font-extrabold text-gold">{s.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="prose max-w-none text-[var(--text-muted)] space-y-4">
        <p>
          مشروع <strong className="text-[var(--text-base)]">سند لتأجير السيارات</strong> هو مكتب
          تأجير سيارات معتمد فئة (د) يستهدف السوق المحلي في حائل. يعمل المشروع بأسطول مبدئي
          من 20 سيارة اقتصادية وعائلية، ويستهدف العملاء الأفراد والشركات والزوار.
        </p>
        <p>
          يقوم الهيكل التمويلي على جمع <strong className="text-[var(--text-base)]">{formatCurrency(projectConfig.targetCapital)}</strong> من
          المستثمرين عبر {projectConfig.totalShares.toLocaleString('ar-SA')} سهم
          بسعر {formatCurrency(projectConfig.sharePrice)} للسهم. بعد{' '}
          {projectConfig.noDistributionMonths} شهرًا يبدأ توزيع{' '}
          {projectConfig.distributionPolicy.investors}٪ من الأرباح على المستثمرين.
        </p>
      </div>

      {/* Navigation cards */}
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        {[
          { href: '/study/financials', label: 'التحليل المالي', desc: 'الإيرادات، المصاريف، وتوقعات الربح', icon: '📊' },
          { href: '/study/scenarios', label: 'سيناريوهات الأسطول', desc: '5 سيناريوهات مختلفة لتركيبة الأسطول', icon: '🚗' },
          { href: '/study/competitors', label: 'تحليل المنافسين', desc: 'تقييم 19 منافسًا في سوق حائل', icon: '📍' },
          { href: '/study/calculator', label: 'حاسبة الاستثمار', desc: 'احسب عائدك المتوقع بشكل تفاعلي', icon: '🧮' },
          { href: '/study/risks', label: 'المخاطر', desc: 'تحليل 12 خطرًا رئيسيًا وكيفية التعامل معها', icon: '⚠️' },
          { href: '/study/register', label: 'سجّل اهتمامك', desc: 'أرسل طلب الاهتمام بالمشاركة', icon: '✍️' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] hover:border-forest/50 hover:bg-forest/5 transition-colors flex gap-4 items-start"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div className="font-bold text-[var(--text-base)]">{item.label}</div>
              <div className="text-sm text-[var(--text-muted)]">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <StudyPrevNext />
    </div>
  );
}
