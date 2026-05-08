'use client';

import { vehiclePricing, priceIncreaseSignals, priceDecreaseSignals, pricingPhilosophy, depositAmounts } from '@/data/pricing';
import { formatCurrency } from '@/lib/utils';
import { SectionTitle } from './SectionTitle';

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="استراتيجية التسعير"
          subtitle={pricingPhilosophy.strategicMessage}
        />

        {/* Philosophy */}
        <div className="bg-forest/20 border border-gold/30 rounded-xl p-5 mb-8">
          <p className="text-gold font-semibold text-lg mb-3">&quot;{pricingPhilosophy.strategicMessage}&quot;</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-calm-400 text-sm mb-2">تنافس بـ:</p>
              <ul className="space-y-1">
                {pricingPhilosophy.competitiveEdge.map((edge, i) => (
                  <li key={i} className="text-ivory text-sm flex items-center gap-2">
                    <span className="text-gold">✓</span> {edge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-calm-400 text-sm mb-2">الحد الأقصى للخصم على المنافس:</p>
              <p className="text-gold text-3xl font-bold">{pricingPhilosophy.maxCompetitorDiscountPct}%</p>
              <p className="text-calm-500 text-xs mt-1">لا تنزل أكثر من هذا — لا تدمر الهامش</p>
            </div>
          </div>
        </div>

        {/* Pricing table */}
        <div className="bg-charcoal rounded-xl border border-calm-700 overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-calm-800">
            <h3 className="text-ivory font-semibold">جدول الأسعار (شامل VAT للمستهلك)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-calm-800">
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">الفئة</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">يومي</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">أسبوعي</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">شهري</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">كيلو زائد</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">مفتوح يوم</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">مفتوح يومين+</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">عقود شركات</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">الحد الأدنى</th>
                </tr>
              </thead>
              <tbody>
                {vehiclePricing.map((p, i) => (
                  <tr key={p.vehicleId} className={`border-b border-calm-800/50 ${i % 2 === 0 ? '' : 'bg-charcoal-light/20'}`}>
                    <td className="py-3 px-4 text-ivory font-medium whitespace-nowrap">{p.nameAr}</td>
                    <td className="py-3 px-4 text-gold whitespace-nowrap">{p.daily}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{p.weekly}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{formatCurrency(p.monthly)}</td>
                    <td className="py-3 px-4 text-calm-400 whitespace-nowrap">{p.extraKmPrice}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{p.openKmOneDay}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{p.openKmTwoPlusDays}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{formatCurrency(p.corporateMonthly)}</td>
                    <td className="py-3 px-4 text-red-400 whitespace-nowrap font-medium">{p.floorPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price signals */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-charcoal border border-primary-800/50 rounded-xl p-5">
            <h3 className="text-primary-400 font-semibold mb-3">📈 متى ترفع السعر؟</h3>
            <ul className="space-y-2">
              {priceIncreaseSignals.map((s, i) => (
                <li key={i} className="text-calm-300 text-sm flex items-start gap-2">
                  <span className="text-primary-400 mt-0.5">▲</span> {s}
                </li>
              ))}
            </ul>
            <p className="text-calm-500 text-xs mt-3">إذا تحقق واحد من هذه العلامات ثلاثة أسابيع متتابعة</p>
          </div>
          <div className="bg-charcoal border border-red-900/50 rounded-xl p-5">
            <h3 className="text-red-400 font-semibold mb-3">📉 متى تخفض السعر؟</h3>
            <ul className="space-y-2">
              {priceDecreaseSignals.map((s, i) => (
                <li key={i} className="text-calm-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">▼</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Deposits */}
        <div className="bg-charcoal border border-calm-700 rounded-xl p-5">
          <h3 className="text-ivory font-semibold mb-4">مبالغ الحجز (الوديعة)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {depositAmounts.map((d, i) => (
              <div key={i} className="bg-charcoal-light rounded-lg p-3 text-center">
                <div className="text-calm-400 text-xs mb-1">{d.category}</div>
                <div className="text-gold font-bold">{formatCurrency(d.amount)}</div>
              </div>
            ))}
          </div>
          <p className="text-calm-500 text-xs mt-3">هذا ليس &quot;دخلًا&quot; — بل أداة ضبط نزاعات مؤقتة. لا تخصم إلا عند إثبات موثق.</p>
        </div>
      </div>
    </section>
  );
}
