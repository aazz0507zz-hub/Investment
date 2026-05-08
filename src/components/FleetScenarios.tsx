'use client';

import { fleetScenarios } from '@/data/scenarios';
import { formatCurrency } from '@/lib/utils';
import { SectionTitle } from './SectionTitle';
import { Badge } from './Badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export function FleetScenarios() {
  const chartData = fleetScenarios.map((s) => ({
    name: s.name.replace(' ⭐ الموصى به', '').replace('السيناريو ', 'س'),
    'إيراد 75%': s.revenueAt75,
    'صافي تشغيل 75%': s.netOperatingAt75,
    'إيراد 85%': s.revenueAt85,
  }));

  return (
    <section id="scenarios" className="py-16 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="سيناريوهات الأسطول"
          subtitle="خمسة سيناريوهات تم تحليلها — مع توصية واضحة بالسيناريو الثاني"
        />

        {/* Scenario cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {fleetScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`rounded-xl border p-5 flex flex-col gap-3 ${
                scenario.recommendation === 'recommended'
                  ? 'bg-forest/20 border-gold/40 shadow-lg shadow-gold/5'
                  : scenario.recommendation === 'not_recommended'
                  ? 'bg-charcoal border-red-900/50 opacity-80'
                  : 'bg-charcoal border-calm-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-ivory font-bold text-sm leading-tight">{scenario.name}</h3>
                {scenario.recommendation === 'recommended' && <Badge variant="recommended" />}
                {scenario.recommendation === 'not_recommended' && (
                  <Badge variant="warning" label="غير موصى به" />
                )}
                {scenario.recommendation === 'conditional' && (
                  <Badge variant="conservative" label="مشروط" />
                )}
              </div>

              <p className="text-calm-400 text-xs leading-relaxed">{scenario.fleetMix}</p>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-charcoal-light rounded-lg p-2">
                  <div className="text-xs text-calm-500">عدد السيارات</div>
                  <div className="text-ivory font-bold">{scenario.vehicleCount}</div>
                </div>
                <div className="bg-charcoal-light rounded-lg p-2">
                  <div className="text-xs text-calm-500">رأس المال</div>
                  <div className="text-ivory font-bold text-sm">{formatCurrency(scenario.requiredCapital)}</div>
                </div>
                <div className="bg-charcoal-light rounded-lg p-2">
                  <div className="text-xs text-calm-500">نقطة التعادل</div>
                  <div className={`font-bold ${scenario.breakEvenOccupancy <= 52 ? 'text-gold' : 'text-orange-300'}`}>
                    {scenario.breakEvenOccupancy}%
                  </div>
                </div>
                <div className="bg-charcoal-light rounded-lg p-2">
                  <div className="text-xs text-calm-500">صافي 75%</div>
                  <div className="text-primary-400 font-bold text-sm">{formatCurrency(scenario.netOperatingAt75)}</div>
                </div>
              </div>

              {/* Revenue at different occupancies */}
              <div className="border-t border-calm-700 pt-3 grid grid-cols-4 gap-1 text-center">
                {[
                  { label: '45%', val: scenario.revenueAt45 },
                  { label: '60%', val: scenario.revenueAt60 },
                  { label: '75%', val: scenario.revenueAt75 },
                  { label: '85%', val: scenario.revenueAt85 },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="text-calm-500 text-xs">{label}</div>
                    <div className="text-ivory text-xs font-medium">{(val / 1000).toFixed(0)}k</div>
                  </div>
                ))}
              </div>

              <p className="text-calm-400 text-xs mt-auto italic">{scenario.recommendationNote}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-charcoal rounded-xl border border-calm-700 mb-10 overflow-hidden">
          <div className="px-5 py-4 border-b border-calm-800">
            <h3 className="text-ivory font-semibold">جدول مقارنة السيناريوهات</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-calm-800">
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">السيناريو</th>
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">السيارات</th>
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">رأس المال</th>
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">إيراد 45%</th>
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">إيراد 75%</th>
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">صافي 75%</th>
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">تعادل</th>
                  <th className="text-right text-calm-400 font-medium py-3 px-4 whitespace-nowrap">القرار</th>
                </tr>
              </thead>
              <tbody>
                {fleetScenarios.map((s, i) => (
                  <tr
                    key={s.id}
                    className={`border-b border-calm-800/50 ${
                      s.recommendation === 'recommended' ? 'bg-forest/10' : ''
                    } ${i % 2 === 0 ? '' : 'bg-charcoal-light/20'}`}
                  >
                    <td className="py-3 px-4 text-ivory whitespace-nowrap">{s.name}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{s.vehicleCount}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{formatCurrency(s.requiredCapital)}</td>
                    <td className="py-3 px-4 text-red-400 whitespace-nowrap">{formatCurrency(s.revenueAt45)}</td>
                    <td className="py-3 px-4 text-gold whitespace-nowrap">{formatCurrency(s.revenueAt75)}</td>
                    <td className="py-3 px-4 text-primary-400 whitespace-nowrap">{formatCurrency(s.netOperatingAt75)}</td>
                    <td className={`py-3 px-4 whitespace-nowrap font-bold ${s.breakEvenOccupancy <= 52 ? 'text-gold' : 'text-orange-300'}`}>{s.breakEvenOccupancy}%</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {s.recommendation === 'recommended' && <Badge variant="recommended" />}
                      {s.recommendation === 'not_recommended' && <Badge variant="warning" label="لا أوصي" />}
                      {s.recommendation === 'conditional' && <Badge variant="conservative" label="مشروط" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-charcoal border border-calm-700 rounded-xl p-5">
          <h3 className="text-ivory font-semibold mb-4">مقارنة الإيراد وصافي التشغيل عند 75% إشغال</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ right: 10, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3c" />
              <XAxis dataKey="name" tick={{ fill: '#9aa0a6', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9aa0a6', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1c1e', border: '1px solid #3a3a3c', borderRadius: '8px' }}
                labelStyle={{ color: '#faf7f2' }}
                formatter={(v: number) => [`${v.toLocaleString('ar-SA')} ريال`]}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: '#9aa0a6' }} />
              <Bar dataKey="إيراد 75%" fill="#c9a84c" radius={[4, 4, 0, 0]} />
              <Bar dataKey="صافي تشغيل 75%" fill="#166534" radius={[4, 4, 0, 0]} />
              <Bar dataKey="إيراد 85%" fill="#2d5a3d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
