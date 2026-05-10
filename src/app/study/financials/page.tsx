import Link from 'next/link';
import { StudyPrevNext } from '@/components/StudySidebar';
import { FeasibilityStudy } from '@/components/FeasibilityStudy';
import { revenueByOccupancy, initialInvestment, monthlyFixedExpenses, distributionConditions } from '@/data/financials';
import { projectConfig } from '@/data/projectConfig';
import { formatCurrency } from '@/lib/utils';

export default function FinancialsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">التحليل المالي</h1>
        <p className="text-[var(--text-muted)] mt-2">
          الاستثمار الأولي، المصروفات الشهرية، الإيرادات المتوقعة، وشروط التوزيع
        </p>
      </div>

      {/* Initial Investment */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">هيكل الاستثمار الأولي</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                <th className="px-4 py-3 text-right font-semibold text-[var(--text-base)]">البند</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--text-base)]">المبلغ</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--text-base)]">التصنيف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {[
                { label: 'شراء 20 سيارة (شامل VAT)', value: initialInvestment.vehicles20InclVAT, badge: 'رقم مؤكد' },
                { label: 'تأمين شامل السنة الأولى', value: initialInvestment.comprehensiveInsuranceYear1, badge: 'رقم مؤكد' },
                { label: 'GPS + لوحات + تسجيل', value: initialInvestment.gpsPlatesRegistration, badge: 'رقم مؤكد' },
                { label: 'تجهيز المكتب', value: initialInvestment.officeSetup, badge: 'رقم مؤكد' },
                { label: 'تأسيس الشركة + رسوم قانونية', value: initialInvestment.incorporationLegalFees, badge: 'رقم مؤكد' },
                { label: 'متطلبات البلدية والسلامة', value: initialInvestment.municipalitySafetySetup, badge: 'رقم مؤكد' },
                { label: 'وديعة الإيجار المقدمة', value: initialInvestment.depositRentAdvance, badge: 'رقم مؤكد' },
                { label: 'تسويق الإطلاق', value: initialInvestment.launchMarketing, badge: 'رقم مؤكد' },
                { label: 'احتياطي رأس المال العامل', value: initialInvestment.workingCapitalReserve, badge: 'رقم مؤكد' },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-[var(--surface-alt)] transition-colors">
                  <td className="px-4 py-2.5 text-[var(--text-muted)]">{row.label}</td>
                  <td className="px-4 py-2.5 font-medium text-[var(--text-base)]">{formatCurrency(row.value)}</td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {row.badge}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-forest/10 font-bold">
                <td className="px-4 py-3 text-[var(--text-base)]">الإجمالي</td>
                <td className="px-4 py-3 text-gold text-lg">{formatCurrency(initialInvestment.total)}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                    يُقرَّب إلى {formatCurrency(initialInvestment.roundedTotal)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'إجمالي الاستثمار', value: formatCurrency(initialInvestment.roundedTotal) },
            { label: 'سعر السهم', value: formatCurrency(projectConfig.sharePrice) },
            { label: 'عدد الأسهم', value: `${projectConfig.totalShares.toLocaleString('ar-SA')} سهم` },
          ].map((s) => (
            <div key={s.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center">
              <div className="text-2xl font-extrabold text-gold">{s.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly Expenses */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">المصروفات الشهرية الثابتة</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                <th className="px-4 py-3 text-right font-semibold text-[var(--text-base)]">البند</th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--text-base)]">الشهري</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {[
                { label: 'إيجار المكتب', value: monthlyFixedExpenses.officeRent },
                { label: 'موظفان سعوديان', value: monthlyFixedExpenses.twoSaudiEmployees },
                { label: 'موظف التجهيز', value: monthlyFixedExpenses.preparationWorker },
                { label: 'محاسب خارجي', value: monthlyFixedExpenses.externalAccountant },
                { label: 'إنترنت وهاتف', value: monthlyFixedExpenses.internetPhone },
                { label: 'كهرباء وماء', value: monthlyFixedExpenses.electricityWater },
                { label: 'نظام إدارة التأجير', value: monthlyFixedExpenses.rentalManagementSystem },
                { label: 'اشتراك GPS', value: monthlyFixedExpenses.gpsSubscription },
                { label: 'تسويق رقمي', value: monthlyFixedExpenses.digitalMarketing },
                { label: 'مستلزمات وقرطاسية ومصاريف متنوعة', value: monthlyFixedExpenses.officeSupplies + monthlyFixedExpenses.paperPrinting + monthlyFixedExpenses.stationery + monthlyFixedExpenses.printerRolls + monthlyFixedExpenses.hospitality + monthlyFixedExpenses.cleaningSupplies },
                { label: 'عمولات بنكية ونقطة بيع', value: monthlyFixedExpenses.bankFeesPOS },
                { label: 'احتياطي طوارئ تشغيلية', value: monthlyFixedExpenses.operationalEmergencyReserve },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-[var(--surface-alt)] transition-colors">
                  <td className="px-4 py-2.5 text-[var(--text-muted)]">{row.label}</td>
                  <td className="px-4 py-2.5 font-medium text-[var(--text-base)]">{formatCurrency(row.value)}</td>
                </tr>
              ))}
              <tr className="bg-forest/10 font-bold">
                <td className="px-4 py-3 text-[var(--text-base)]">إجمالي الثابت الشهري</td>
                <td className="px-4 py-3 text-gold">{formatCurrency(monthlyFixedExpenses.totalFixed)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Revenue by occupancy */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">الإيرادات حسب نسبة الإشغال (السيناريو الثاني)</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                {['نسبة الإشغال', 'الإيراد الشهري', 'إجمالي التكاليف', 'صافي التشغيل'].map((h) => (
                  <th key={h} className="px-4 py-3 text-right font-semibold text-[var(--text-base)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {revenueByOccupancy.map((row) => (
                <tr key={row.occupancy} className={`hover:bg-[var(--surface-alt)] transition-colors ${row.occupancy === 51 ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}>
                  <td className="px-4 py-2.5 font-medium text-[var(--text-base)]">
                    {row.occupancy}٪
                    {row.occupancy === 60 && <span className="text-xs text-amber-600 dark:text-amber-400 mr-2">≈ نقطة التعادل</span>}
                    {row.occupancy === 75 && <span className="text-xs text-green-600 dark:text-green-400 mr-2">◀ الهدف</span>}
                  </td>
                  <td className="px-4 py-2.5 text-[var(--text-muted)]">{formatCurrency(row.monthlyRevenue)}</td>
                  <td className="px-4 py-2.5 text-[var(--text-muted)]">{formatCurrency(row.totalOperatingCost)}</td>
                  <td className={`px-4 py-2.5 font-bold ${row.netOperatingCashFlow >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                    {row.netOperatingCashFlow >= 0 ? '+' : ''}{formatCurrency(row.netOperatingCashFlow)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-[var(--text-muted)]">
          نقطة التعادل الفعلية ~51% إشغال · التوسع يُنصح به عند ≥72% مع احتياطي 4 أشهر
        </div>
      </section>

      {/* Distribution conditions */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">شروط توزيع الأرباح</h2>
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5 space-y-3">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            يجب تحقق <strong>جميع</strong> الشروط التالية في آنٍ واحد قبل أي توزيع:
          </p>
          <ul className="space-y-2">
            {distributionConditions.map((cond, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300">
                <span className="mt-0.5">✓</span>
                <span>{cond}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-amber-700 dark:text-amber-400 opacity-80">
            لا توزيعات في أول {projectConfig.noDistributionMonths} شهرًا بشكل مطلق
          </p>
        </div>
      </section>

      {/* Full feasibility study */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">دراسة الجدوى التفصيلية</h2>
        <FeasibilityStudy />
      </section>

      {/* Link to exit simulator */}
      <div className="border border-forest/30 rounded-xl p-5 bg-forest/5 flex items-center justify-between gap-4">
        <div>
          <div className="font-bold text-[var(--text-base)]">🚪 احسب قيمة التخارج التقديرية</div>
          <div className="text-sm text-[var(--text-muted)] mt-1">
            استخدم حاسبة التخارج لمعرفة القيمة التقديرية التي قد تستلمها إذا قررت الخروج في سنة محددة
          </div>
        </div>
        <Link
          href="/study/exit"
          className="shrink-0 bg-forest text-ivory font-bold px-4 py-2 rounded-lg text-sm hover:bg-forest-light transition-colors"
        >
          حاسبة التخارج
        </Link>
      </div>

      <StudyPrevNext />
    </div>
  );
}
