'use client';

import { timeline } from '@/data/timeline';
import { SectionTitle } from './SectionTitle';

const stageColors = [
  'border-red-700 bg-red-900/20',
  'border-orange-700 bg-orange-900/20',
  'border-yellow-700 bg-yellow-900/20',
  'border-gold bg-gold/10',
  'border-blue-700 bg-blue-900/20',
  'border-teal-700 bg-teal-900/20',
  'border-primary-700 bg-primary-900/20',
  'border-primary-500 bg-primary-800/30',
];

const dotColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-gold', 'bg-blue-500', 'bg-teal-500', 'bg-primary-500', 'bg-primary-400'];

export function Timeline90Days() {
  return (
    <section id="timeline" className="py-16 bg-charcoal">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          title="خطة أول 90 يومًا"
          subtitle="من قبل الافتتاح حتى نهاية الشهر الثالث — مهام ومسؤوليات ومؤشرات نجاح"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-calm-700 hidden md:block" />

          <div className="space-y-6">
            {timeline.map((stage, i) => (
              <div key={stage.id} className="relative flex gap-6">
                {/* Dot */}
                <div className={`hidden md:flex shrink-0 w-12 h-12 rounded-full items-center justify-center border-2 border-calm-700 ${dotColors[i]} z-10`}>
                  <span className="text-charcoal font-bold text-xs">{stage.dayOffset}</span>
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl border p-5 ${stageColors[i]}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`md:hidden w-8 h-8 rounded-full ${dotColors[i]} flex items-center justify-center shrink-0`}>
                      <span className="text-charcoal font-bold text-xs">{stage.dayOffset}</span>
                    </div>
                    <h3 className="text-ivory font-bold">{stage.stage}</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-calm-400 text-xs font-medium mb-2">المهام:</p>
                      <ul className="space-y-1.5">
                        {stage.tasks.map((task, j) => (
                          <li key={j} className="text-calm-300 text-xs flex items-start gap-1.5">
                            <span className="text-gold mt-0.5 shrink-0">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-calm-400 text-xs font-medium mb-1">المسؤول:</p>
                        <p className="text-ivory text-sm">{stage.responsible}</p>
                      </div>
                      <div>
                        <p className="text-calm-400 text-xs font-medium mb-1">المخرجات:</p>
                        <ul className="space-y-1">
                          {stage.outputs.map((out, j) => (
                            <li key={j} className="text-calm-300 text-xs">• {out}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-calm-400 text-xs font-medium mb-1">مؤشر النجاح:</p>
                        <p className="text-primary-400 text-xs font-medium">{stage.successIndicator}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
