'use client';

import { useState } from 'react';
import { competitors, complaintPatterns } from '@/data/competitors';
import { SectionTitle } from './SectionTitle';

type RiskFilter = 'all' | 'high' | 'medium' | 'low';

const getRiskColor = (score: number | null) => {
  if (score === null) return 'text-calm-500';
  if (score >= 7.5) return 'text-red-400';
  if (score >= 5.5) return 'text-orange-400';
  return 'text-yellow-400';
};

const getRiskBg = (score: number | null) => {
  if (score === null) return 'border-calm-700';
  if (score >= 7.5) return 'border-red-900/50';
  if (score >= 5.5) return 'border-orange-900/50';
  return 'border-yellow-900/50';
};

export function CompetitorAnalysis() {
  const [filter, setFilter] = useState<RiskFilter>('all');
  const [view, setView] = useState<'cards' | 'table'>('cards');

  const filtered = competitors.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'high') return c.riskScore !== null && c.riskScore >= 7.5;
    if (filter === 'medium') return c.riskScore !== null && c.riskScore >= 5 && c.riskScore < 7.5;
    if (filter === 'low') return c.riskScore !== null && c.riskScore < 5;
    return true;
  });

  return (
    <section id="competitors" className="py-16 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="تحليل المنافسين"
          subtitle="مبني على ملفات تحليل مرفقة — التقييمات التالية تعكس وقت الالتقاط وقد تتغير"
        />

        {/* Data notice */}
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mb-6 text-yellow-300 text-sm">
          ⚠️ جميع التقييمات والمراجعات المعروضة منقولة من ملفات التحليل المرفقة في الدراسة. بعض البيانات &quot;تحقق جزئي&quot; أو &quot;غير متاح للتحقق&quot; كما هو مُوسوم. لم يتم اختراع أي تعليق أو تقييم.
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-calm-400 text-sm">تصفية بحسب الخطر:</span>
          {(['all', 'high', 'medium', 'low'] as RiskFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                filter === f
                  ? 'bg-gold text-charcoal border-gold'
                  : 'border-calm-700 text-calm-400 hover:text-ivory'
              }`}
            >
              {f === 'all' ? 'الكل' : f === 'high' ? 'مرتفع (7.5+)' : f === 'medium' ? 'متوسط (5–7.4)' : 'منخفض (<5)'}
            </button>
          ))}
          <div className="mr-auto flex gap-2">
            <button
              onClick={() => setView('cards')}
              className={`text-xs px-3 py-1.5 rounded border ${view === 'cards' ? 'bg-forest border-forest text-ivory' : 'border-calm-700 text-calm-400'}`}
            >
              بطاقات
            </button>
            <button
              onClick={() => setView('table')}
              className={`text-xs px-3 py-1.5 rounded border ${view === 'table' ? 'bg-forest border-forest text-ivory' : 'border-calm-700 text-calm-400'}`}
            >
              جدول
            </button>
          </div>
        </div>

        {view === 'cards' ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
            {filtered.map((c) => (
              <div key={c.id} className={`rounded-xl border p-4 bg-charcoal-light flex flex-col gap-3 ${getRiskBg(c.riskScore)}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-ivory font-bold text-sm">{c.nameAr}</h3>
                    <p className="text-calm-500 text-xs">{c.location}</p>
                  </div>
                  {c.riskScore !== null ? (
                    <div className={`text-center ${getRiskColor(c.riskScore)}`}>
                      <div className="text-xl font-bold">{c.riskScore}</div>
                      <div className="text-xs">/10</div>
                    </div>
                  ) : (
                    <span className="text-calm-500 text-xs">—</span>
                  )}
                </div>

                {c.rating !== null ? (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    <span className="text-ivory text-sm font-medium">{c.rating}</span>
                    <span className="text-calm-500 text-xs">({c.reviewCount?.toLocaleString('ar-SA')} تقييم)</span>
                  </div>
                ) : (
                  <p className="text-calm-500 text-xs">{c.reviewsNote}</p>
                )}

                {c.dataStatus !== 'verified' && (
                  <p className="text-yellow-400 text-xs">⚠️ {c.reviewsNote}</p>
                )}

                <div>
                  <p className="text-calm-500 text-xs mb-1">ينافس بـ:</p>
                  <p className="text-calm-300 text-xs">{c.competesOn}</p>
                </div>

                {c.strengths.length > 0 && (
                  <div>
                    <p className="text-primary-400 text-xs mb-1">✓ إيجابيات:</p>
                    <p className="text-calm-300 text-xs">{c.strengths.join('، ')}</p>
                  </div>
                )}

                {c.weaknesses.length > 0 && (
                  <div>
                    <p className="text-red-400 text-xs mb-1">✗ سلبيات:</p>
                    <p className="text-calm-300 text-xs">{c.weaknesses.join('، ')}</p>
                  </div>
                )}

                <div className="border-t border-calm-800 pt-2">
                  <p className="text-gold text-xs">الاستراتيجية المضادة: {c.counterStrategy}</p>
                </div>

                <a
                  href={c.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-xs hover:underline"
                >
                  📍 خرائط Google
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-charcoal-light rounded-xl border border-calm-700 overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-calm-800">
                    <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">المكتب</th>
                    <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">الموقع</th>
                    <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">التقييم</th>
                    <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">ينافس بـ</th>
                    <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">الخطر/10</th>
                    <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">خرائط</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.id} className={`border-b border-calm-800/50 ${i % 2 === 0 ? '' : 'bg-charcoal/40'}`}>
                      <td className="py-3 px-4 text-ivory font-medium whitespace-nowrap">{c.nameAr}</td>
                      <td className="py-3 px-4 text-calm-400 whitespace-nowrap">{c.location}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {c.rating !== null ? (
                          <span className="text-yellow-400">★ {c.rating} ({c.reviewCount})</span>
                        ) : (
                          <span className="text-calm-500 text-xs">{c.reviewsNote}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-calm-300 whitespace-nowrap">{c.competesOn}</td>
                      <td className={`py-3 px-4 font-bold whitespace-nowrap ${getRiskColor(c.riskScore)}`}>
                        {c.riskScore ?? '—'}
                      </td>
                      <td className="py-3 px-4">
                        <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs hover:underline whitespace-nowrap">📍 خرائط</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* How to gain market share in 18 months */}
        <div className="bg-forest/20 border border-gold/30 rounded-xl p-6 mb-8">
          <h3 className="text-gold font-bold text-lg mb-4">كيف نمسك اسمًا في حائل خلال 18 شهرًا؟</h3>
          <p className="text-calm-300 text-sm mb-4">المدخل الصحيح: بناء عرض مضاد لكل شكوى متكررة في السوق</p>
          <div className="space-y-3">
            {complaintPatterns.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-red-400 text-xs mt-0.5 shrink-0">✗</span>
                <div>
                  <p className="text-calm-300 text-xs font-medium">{p.complaint}</p>
                  <p className="text-primary-400 text-xs mt-0.5">→ {p.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
