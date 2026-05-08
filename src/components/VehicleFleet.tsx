'use client';

import { vehicles } from '@/data/fleet';
import { formatCurrency } from '@/lib/utils';
import { SectionTitle } from './SectionTitle';
import { Badge } from './Badge';

export function VehicleFleet() {
  return (
    <section id="fleet" className="py-16 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="الأسطول وأسعار الشراء"
          subtitle="أسعار من عرض شركة ابن الجبيل، موديلات 2026، شاملة ضريبة القيمة المضافة"
        />

        {/* Vehicle cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className={`rounded-xl border p-5 flex flex-col gap-3 ${
                v.launchIncluded
                  ? 'bg-charcoal-light border-calm-600'
                  : 'bg-charcoal border-red-900/30 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-ivory font-bold">{v.nameAr}</h3>
                  <p className="text-calm-500 text-xs">{v.nameEn} — {v.model}</p>
                </div>
                {v.launchIncluded ? (
                  <Badge variant="confirmed" label="في الإطلاق" />
                ) : (
                  <Badge variant="warning" label="لاحقًا" />
                )}
              </div>

              {/* Price breakdown */}
              <div className="grid grid-cols-3 gap-2 border-t border-calm-800 pt-3">
                <div className="text-center">
                  <div className="text-calm-500 text-xs">قبل VAT</div>
                  <div className="text-ivory text-sm font-medium">{formatCurrency(v.priceBeforeVAT)}</div>
                </div>
                <div className="text-center">
                  <div className="text-calm-500 text-xs">VAT 15%</div>
                  <div className="text-calm-400 text-sm">{formatCurrency(v.vat)}</div>
                </div>
                <div className="text-center">
                  <div className="text-calm-500 text-xs">شامل VAT</div>
                  <div className="text-gold font-bold">{formatCurrency(v.priceInclVAT)}</div>
                </div>
              </div>

              <p className="text-calm-300 text-xs leading-relaxed">{v.launchReason}</p>

              {v.risks && (
                <p className="text-orange-300 text-xs leading-relaxed">
                  <span className="font-medium">المخاطر: </span>{v.risks}
                </p>
              )}

              <div className="border-t border-calm-800 pt-3">
                <p className="text-calm-400 text-xs font-medium">الحكم التشغيلي:</p>
                <p className="text-calm-300 text-xs mt-1">{v.verdict}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-calm-500">
                <div>بيع عند: <span className="text-calm-300">{v.sellByMonths}</span></div>
                <div>أو: <span className="text-calm-300">{v.sellByKm}</span></div>
                <div>صيانة/شهر: <span className="text-calm-300">{v.maintenanceMonthlyMin}–{v.maintenanceMonthlyMax} ريال</span></div>
                <div>تغيير زيت: <span className="text-calm-300">{v.oilChangeCost} ريال</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary table */}
        <div className="bg-charcoal-light rounded-xl border border-calm-700 overflow-hidden">
          <div className="px-5 py-4 border-b border-calm-800">
            <h3 className="text-ivory font-semibold">جدول ملخص الأسطول</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-calm-800">
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">السيارة</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">قبل VAT</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">VAT</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">شامل VAT</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">في الإطلاق</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">صيانة شهرية</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <tr key={v.id} className={`border-b border-calm-800/50 ${i % 2 === 0 ? '' : 'bg-charcoal/40'}`}>
                    <td className="py-3 px-4 text-ivory whitespace-nowrap">{v.nameAr}</td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{formatCurrency(v.priceBeforeVAT)}</td>
                    <td className="py-3 px-4 text-calm-400 whitespace-nowrap">{formatCurrency(v.vat)}</td>
                    <td className="py-3 px-4 text-gold font-bold whitespace-nowrap">{formatCurrency(v.priceInclVAT)}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {v.launchIncluded ? (
                        <span className="text-primary-400">✓ نعم</span>
                      ) : (
                        <span className="text-red-400">✗ لا</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{v.maintenanceMonthlyMin}–{v.maintenanceMonthlyMax} ريال</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
