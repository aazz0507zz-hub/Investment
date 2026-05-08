'use client';

import { useState } from 'react';
import { risks, lossScenarios } from '@/data/risks';
import type { RiskCategory } from '@/data/risks';
import { SectionTitle } from './SectionTitle';

const categoryColors: Record<RiskCategory, string> = {
  'مالي':     'bg-red-900/30 text-red-300 border-red-800',
  'تشغيلي':  'bg-orange-900/30 text-orange-300 border-orange-800',
  'قانوني':  'bg-purple-900/30 text-purple-300 border-purple-800',
  'سمعة':    'bg-blue-900/30 text-blue-300 border-blue-800',
  'أسطول':   'bg-yellow-900/30 text-yellow-300 border-yellow-800',
  'عملاء':   'bg-teal-900/30 text-teal-300 border-teal-800',
};

const levelColor = { 'منخفض': 'text-primary-400', 'متوسط': 'text-yellow-400', 'مرتفع': 'text-orange-400', 'مؤكد': 'text-red-400' };

const allCategories: RiskCategory[] = ['مالي', 'تشغيلي', 'قانوني', 'سمعة', 'أسطول', 'عملاء'];

export function RiskDashboard() {
  const [activeCategory, setActiveCategory] = useState<RiskCategory | 'all'>('all');

  const filtered = activeCategory === 'all' ? risks : risks.filter((r) => r.category === activeCategory);

  return (
    <section id="risks" className="py-16 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="لوحة إدارة المخاطر"
          subtitle="12 مخاطرة محللة — بإنذار مبكر وخطة وقاية ومعالجة وصاحب مسؤول"
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeCategory === 'all' ? 'bg-gold text-charcoal border-gold' : 'border-calm-700 text-calm-400 hover:text-ivory'}`}
          >
            الكل ({risks.length})
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${activeCategory === cat ? 'bg-gold text-charcoal border-gold' : 'border-calm-700 text-calm-400 hover:text-ivory'}`}
            >
              {cat} ({risks.filter((r) => r.category === cat).length})
            </button>
          ))}
        </div>

        {/* Risk table */}
        <div className="bg-charcoal rounded-xl border border-calm-700 overflow-hidden mb-10">
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-calm-800 bg-charcoal-light">
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">الخطر</th>
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">الفئة</th>
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">الاحتمالية</th>
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">التأثير</th>
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">الإنذار المبكر</th>
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">الوقاية</th>
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">المعالجة</th>
                  <th className="text-right text-calm-400 py-3 px-3 font-medium whitespace-nowrap">المسؤول</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className={`border-b border-calm-800/50 ${i % 2 === 0 ? '' : 'bg-charcoal-light/20'}`}>
                    <td className="py-3 px-3 text-ivory font-medium whitespace-nowrap">{r.risk}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[r.category]}`}>{r.category}</span>
                    </td>
                    <td className={`py-3 px-3 font-semibold whitespace-nowrap ${levelColor[r.probability]}`}>{r.probability}</td>
                    <td className={`py-3 px-3 font-semibold whitespace-nowrap ${levelColor[r.impact]}`}>{r.impact}</td>
                    <td className="py-3 px-3 text-calm-300 max-w-xs">{r.earlyWarning}</td>
                    <td className="py-3 px-3 text-calm-300 max-w-xs">{r.prevention}</td>
                    <td className="py-3 px-3 text-calm-300 max-w-xs">{r.response}</td>
                    <td className="py-3 px-3 text-calm-400 whitespace-nowrap">{r.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What happens if we lose */}
        <div className="bg-charcoal border border-calm-700 rounded-xl p-6">
          <h3 className="text-ivory font-bold text-lg mb-2">ماذا يحدث إذا خسرنا؟</h3>
          <p className="text-calm-400 text-sm mb-5">خطة شفافة وواقعية — لا وعود بالنجاح دائمًا</p>
          <div className="space-y-3">
            {lossScenarios.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-charcoal-light border border-calm-800">
                <span className="text-gold font-bold text-sm shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-ivory text-sm font-medium">{s.action}</p>
                  <p className="text-calm-400 text-xs mt-0.5">{s.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
