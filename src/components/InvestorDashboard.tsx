'use client';

import { sampleInvestorData, DEMO_DISCLAIMER } from '@/data/investorSimulator';
import { formatCurrency } from '@/lib/utils';
import { SectionTitle } from './SectionTitle';
import { Badge } from './Badge';
import { StatCard } from './StatCard';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const d = sampleInvestorData;

const monthlyChartData = d.monthlyReports.map((r) => ({
  month: r.month.replace(' 2025', ''),
  إيراد: r.revenue,
  مصروفات: r.expenses,
  صافي: r.netOp,
}));

export function InvestorDashboard() {
  return (
    <section id="investor-dashboard" className="py-16 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="منصة المستثمر — نموذج توضيحي"
          subtitle="هذا ما يمكن أن يراه المستثمر مستقبلًا — جميع الأرقام تجريبية"
        />

        {/* Demo notice */}
        <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4 mb-8 flex items-start gap-3">
          <Badge variant="demo" />
          <p className="text-purple-200 text-sm leading-relaxed">{DEMO_DISCLAIMER}</p>
        </div>

        {/* Investor summary */}
        <div className="bg-charcoal-light border border-calm-700 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-ivory font-semibold">ملف المستثمر</h3>
            <Badge variant="demo" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="قيمة المساهمة" value={formatCurrency(d.totalInvestment)} sub="بيانات تجريبية" />
            <StatCard label="عدد الأسهم" value={`${d.shares} سهم`} sub="بيانات تجريبية" />
            <StatCard label="نسبة الملكية" value={`${d.ownershipPct}%`} highlight sub="بيانات تجريبية" />
            <StatCard label="رأس المال المجمع" value={formatCurrency(d.totalCapitalRaised)} sub="بيانات تجريبية" />
          </div>
        </div>

        {/* Monthly KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'الإيراد الشهري', value: formatCurrency(d.monthlyRevenue) },
            { label: 'المصروف الشهري', value: formatCurrency(d.monthlyExpenses) },
            { label: 'صافي التشغيل', value: formatCurrency(d.monthlyNetOperating) },
            { label: 'سيارات مؤجرة اليوم', value: `${d.carsRentedToday} سيارة` },
            { label: 'نسبة الإشغال', value: `${d.occupancyRatePct}%` },
            { label: 'العقود النشطة', value: `${d.activeContracts} عقد` },
          ].map((item) => (
            <div key={item.label} className="bg-charcoal-light border border-calm-700 rounded-xl p-4">
              <p className="text-calm-400 text-xs mb-1">{item.label}</p>
              <p className="text-ivory font-bold text-lg">{item.value}</p>
              <Badge variant="demo" className="mt-1" />
            </div>
          ))}
        </div>

        {/* Monthly trend chart */}
        <div className="bg-charcoal-light border border-calm-700 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-ivory font-semibold">الأداء الشهري</h3>
            <Badge variant="demo" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3c" />
              <XAxis dataKey="month" tick={{ fill: '#9aa0a6', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9aa0a6', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1c1e', border: '1px solid #3a3a3c', borderRadius: '8px' }}
                labelStyle={{ color: '#faf7f2' }}
                formatter={(v: number) => [`${v.toLocaleString('ar-SA')} ريال`]}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: '#9aa0a6' }} />
              <Line type="monotone" dataKey="إيراد" stroke="#c9a84c" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="مصروفات" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="صافي" stroke="#22c55e" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Invoices */}
          <div className="bg-charcoal-light border border-calm-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-calm-800 flex items-center gap-2">
              <h3 className="text-ivory font-medium text-sm">الفواتير الأخيرة</h3>
              <Badge variant="demo" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-calm-800">
                  <th className="text-right text-calm-500 py-2 px-3">رقم</th>
                  <th className="text-right text-calm-500 py-2 px-3">المبلغ</th>
                  <th className="text-right text-calm-500 py-2 px-3">النوع</th>
                  <th className="text-right text-calm-500 py-2 px-3">الحالة</th>
                </tr></thead>
                <tbody>
                  {d.invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-calm-800/50">
                      <td className="py-2 px-3 text-calm-400">{inv.id}</td>
                      <td className="py-2 px-3 text-gold">{formatCurrency(inv.amount)}</td>
                      <td className="py-2 px-3 text-calm-300">{inv.type}</td>
                      <td className="py-2 px-3 text-primary-400">{inv.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Management decisions */}
          <div className="bg-charcoal-light border border-calm-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-calm-800 flex items-center gap-2">
              <h3 className="text-ivory font-medium text-sm">قرارات الإدارة</h3>
              <Badge variant="demo" />
            </div>
            <div className="p-4 space-y-3">
              {d.managementDecisions.map((dec, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-calm-500 text-xs whitespace-nowrap">{dec.date}</span>
                  <p className="text-calm-300 text-xs leading-relaxed">{dec.decision}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Maintenance costs */}
          <div className="bg-charcoal-light border border-calm-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-calm-800 flex items-center gap-2">
              <h3 className="text-ivory font-medium text-sm">الصيانة</h3>
              <Badge variant="demo" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-calm-800">
                  <th className="text-right text-calm-500 py-2 px-3">السيارة</th>
                  <th className="text-right text-calm-500 py-2 px-3">النوع</th>
                  <th className="text-right text-calm-500 py-2 px-3">التكلفة</th>
                </tr></thead>
                <tbody>
                  {d.maintenanceCosts.map((m, i) => (
                    <tr key={i} className="border-b border-calm-800/50">
                      <td className="py-2 px-3 text-calm-400">{m.vehicle}</td>
                      <td className="py-2 px-3 text-calm-300">{m.type}</td>
                      <td className="py-2 px-3 text-gold">{formatCurrency(m.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk alerts */}
          <div className="bg-charcoal-light border border-calm-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-calm-800 flex items-center gap-2">
              <h3 className="text-ivory font-medium text-sm">تنبيهات المخاطر</h3>
              <Badge variant="demo" />
            </div>
            <div className="p-4 space-y-3">
              {d.riskAlerts.map((alert, i) => (
                <div key={i} className="bg-orange-900/20 border border-orange-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-orange-400 text-xs font-medium">⚠️ {alert.severity}</span>
                    <span className="text-calm-500 text-xs">{alert.date}</span>
                  </div>
                  <p className="text-calm-300 text-xs">{alert.risk}</p>
                  <p className="text-primary-400 text-xs mt-1">→ {alert.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
