'use client';

import { useState, useMemo } from 'react';
import { fleetScenarios } from '@/data/scenarios';
import { runCalculation } from '@/lib/calculations';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { SectionTitle } from './SectionTitle';
import { StatCard } from './StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

export function InvestmentCalculator() {
  const [scenarioId, setScenarioId] = useState('scenario2');
  const [investorShares, setInvestorShares] = useState(10);
  const [occupancy, setOccupancy] = useState(75);
  const [dailyPriceChange, setDailyPriceChange] = useState(0);
  const [maintenanceIncrease, setMaintenanceIncrease] = useState(0);
  const [insuranceIncrease, setInsuranceIncrease] = useState(0);

  const scenario = useMemo(
    () => fleetScenarios.find((s) => s.id === scenarioId) || fleetScenarios[1],
    [scenarioId]
  );

  const result = useMemo(() => {
    return runCalculation(
      {
        scenarioId,
        requiredCapital: scenario.requiredCapital,
        vehicleCount: scenario.vehicleCount,
        occupancyPct: occupancy,
        baseRevenueAt75: scenario.revenueAt75,
        dailyPriceChangePct: dailyPriceChange,
        maintenanceIncreasePct: maintenanceIncrease,
        insuranceIncreasePct: insuranceIncrease,
      },
      investorShares
    );
  }, [scenario, scenarioId, investorShares, occupancy, dailyPriceChange, maintenanceIncrease, insuranceIncrease]);

  const chartData = [
    { name: '45%', إيراد: scenario.revenueAt45, مصروفات: 47_379 },
    { name: '60%', إيراد: scenario.revenueAt60, مصروفات: 49_341 },
    { name: '75%', إيراد: scenario.revenueAt75, مصروفات: 51_303 },
    { name: '85%', إيراد: scenario.revenueAt85, مصروفات: 52_612 },
    { name: `${occupancy}% (اختيارك)`, إيراد: result.monthlyRevenue, مصروفات: result.monthlyExpenses },
  ];

  return (
    <section id="calculator" className="py-16 bg-charcoal-light">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="حاسبة الاستثمار التفاعلية"
          subtitle="اضبط المتغيرات وشاهد التأثير المباشر على العائد التشغيلي المتوقع"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Scenario selector */}
            <div>
              <label className="block text-calm-300 text-sm mb-2">السيناريو</label>
              <select
                value={scenarioId}
                onChange={(e) => setScenarioId(e.target.value)}
                className="w-full bg-charcoal border border-calm-700 rounded-lg px-3 py-2.5 text-ivory text-sm focus:outline-none focus:border-gold/50"
              >
                {fleetScenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {s.vehicleCount} سيارة
                  </option>
                ))}
              </select>
              <p className="text-calm-500 text-xs mt-1">{scenario.fleetMix}</p>
            </div>

            {/* Investor shares */}
            <div>
              <label className="block text-calm-300 text-sm mb-2">
                عدد الأسهم: <span className="text-gold font-bold">{investorShares}</span>
                <span className="text-calm-500 mr-2">= {formatCurrency(investorShares * result.sharePrice)}</span>
              </label>
              <input
                type="range"
                min={1}
                max={200}
                value={investorShares}
                onChange={(e) => setInvestorShares(Number(e.target.value))}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-calm-500 text-xs mt-1">
                <span>1 سهم</span>
                <span>200 سهم</span>
              </div>
            </div>

            {/* Occupancy */}
            <div>
              <label className="block text-calm-300 text-sm mb-2">
                نسبة الإشغال: <span className="text-gold font-bold">{occupancy}%</span>
                {occupancy < scenario.breakEvenOccupancy && (
                  <span className="text-red-400 mr-2 text-xs">⚠️ دون نقطة التعادل</span>
                )}
              </label>
              <input
                type="range"
                min={30}
                max={95}
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-calm-500 text-xs mt-1">
                <span>30%</span>
                <span className="text-yellow-400">نقطة التعادل: {scenario.breakEvenOccupancy}%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Daily price change */}
            <div>
              <label className="block text-calm-300 text-sm mb-2">
                تعديل السعر اليومي: <span className="text-gold font-bold">{dailyPriceChange > 0 ? '+' : ''}{dailyPriceChange}%</span>
              </label>
              <input
                type="range"
                min={-20}
                max={20}
                value={dailyPriceChange}
                onChange={(e) => setDailyPriceChange(Number(e.target.value))}
                className="w-full accent-gold"
              />
              <div className="flex justify-between text-calm-500 text-xs mt-1">
                <span>-20%</span>
                <span>0%</span>
                <span>+20%</span>
              </div>
            </div>

            {/* Maintenance increase */}
            <div>
              <label className="block text-calm-300 text-sm mb-2">
                زيادة تكلفة الصيانة: <span className="text-gold font-bold">+{maintenanceIncrease}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={50}
                value={maintenanceIncrease}
                onChange={(e) => setMaintenanceIncrease(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>

            {/* Insurance increase */}
            <div>
              <label className="block text-calm-300 text-sm mb-2">
                زيادة تكلفة التأمين: <span className="text-gold font-bold">+{insuranceIncrease}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={50}
                value={insuranceIncrease}
                onChange={(e) => setInsuranceIncrease(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {result.warningNegativeCashFlow && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-300 text-sm">
                ⚠️ التدفق النقدي التشغيلي سلبي عند هذا الإشغال — المشروع يحتاج مستوى إشغال أعلى للوصول إلى التعادل.
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <StatCard label="رأس المال" value={formatCurrency(result.capital)} />
              <StatCard label="سعر السهم" value={formatCurrency(result.sharePrice)} />
              <StatCard label="أسهمك" value={`${result.investorShares} سهم`} />
              <StatCard label="نسبة ملكيتك" value={`${result.ownershipPct}%`} highlight />
              <StatCard
                label="إيراد شهري (مشروع)"
                value={formatCurrency(result.monthlyRevenue)}
                sub={`عند ${occupancy}% إشغال`}
              />
              <StatCard
                label="مصروفات شهرية"
                value={formatCurrency(result.monthlyExpenses)}
              />
              <StatCard
                label="صافي تشغيلي شهري"
                value={formatCurrency(result.netOperatingCashFlow)}
                highlight={result.isProfitable}
                className={result.warningNegativeCashFlow ? 'border-red-700' : ''}
              />
              <StatCard
                label="نقطة التعادل"
                value={formatPercent(result.breakEvenOccupancy)}
                sub="إشغال مطلوب"
              />
            </div>

            {/* Chart */}
            <div className="bg-charcoal border border-calm-700 rounded-xl p-4">
              <h4 className="text-ivory text-sm font-medium mb-3">إيراد مقابل مصروفات بحسب الإشغال</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} margin={{ right: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3c" />
                  <XAxis dataKey="name" tick={{ fill: '#9aa0a6', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9aa0a6', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1c1c1e', border: '1px solid #3a3a3c', borderRadius: '8px' }}
                    labelStyle={{ color: '#faf7f2' }}
                    formatter={(v: number) => [`${v.toLocaleString('ar-SA')} ريال`]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: '#9aa0a6' }} />
                  <Bar dataKey="إيراد" fill="#c9a84c" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="مصروفات" fill="#2d5a3d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
