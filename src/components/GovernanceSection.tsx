'use client';

import { governanceTable, policies } from '@/data/governance';
import { SectionTitle } from './SectionTitle';
import { useState } from 'react';

export function GovernanceSection() {
  const [openPolicy, setOpenPolicy] = useState<string | null>(null);

  return (
    <section id="governance" className="py-16 bg-charcoal-light">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="الحوكمة والشفافية"
          subtitle="ما يراه كل مستثمر، ومتى، ومن المسؤول — لا أسرار في الأرقام"
        />

        {/* Governance table */}
        <div className="bg-charcoal rounded-xl border border-calm-700 overflow-hidden mb-10">
          <div className="px-5 py-4 border-b border-calm-800">
            <h3 className="text-ivory font-semibold">جدول الشفافية للمستثمرين</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-calm-800 bg-charcoal-light">
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">البند</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium">ماذا يرى المستثمر</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">التكرار</th>
                  <th className="text-right text-calm-400 py-3 px-4 font-medium whitespace-nowrap">المسؤول</th>
                </tr>
              </thead>
              <tbody>
                {governanceTable.map((row, i) => (
                  <tr key={i} className={`border-b border-calm-800/50 ${i % 2 === 0 ? '' : 'bg-charcoal-light/20'}`}>
                    <td className="py-3 px-4 text-ivory font-medium whitespace-nowrap">{row.item}</td>
                    <td className="py-3 px-4 text-calm-300 text-sm">{row.whatInvestorSees}</td>
                    <td className="py-3 px-4 text-gold whitespace-nowrap text-sm">{row.frequency}</td>
                    <td className="py-3 px-4 text-calm-400 whitespace-nowrap text-sm">{row.responsible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policies */}
        <div className="space-y-2">
          {policies.map((policy) => (
            <div key={policy.title} className="border border-calm-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenPolicy(openPolicy === policy.title ? null : policy.title)}
                className="w-full flex items-center justify-between px-5 py-4 text-right bg-charcoal hover:bg-charcoal-light transition-colors"
              >
                <span className="text-ivory font-semibold text-sm">{policy.title}</span>
                <span className="text-calm-500 transition-transform" style={{ transform: openPolicy === policy.title ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>
              {openPolicy === policy.title && (
                <div className="px-5 pb-5 pt-3 bg-charcoal-light border-t border-calm-800">
                  <ul className="space-y-2">
                    {policy.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-calm-300">
                        <span className="text-gold mt-0.5 shrink-0">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
