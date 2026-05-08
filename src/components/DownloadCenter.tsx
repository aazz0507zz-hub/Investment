'use client';

import { SectionTitle } from './SectionTitle';

interface DownloadItem {
  title: string;
  description: string;
  fileName: string;
  path: string;
  available: boolean;
  icon: string;
}

const downloads: DownloadItem[] = [
  {
    title: 'دراسة الجدوى الكاملة',
    description: 'النسخة الكاملة من دراسة الجدوى بصيغة PDF',
    fileName: 'feasibility-study.pdf',
    path: '/docs/feasibility-study.pdf',
    available: false,
    icon: '📄',
  },
  {
    title: 'السيناريوهات المالية',
    description: 'مقارنة السيناريوهات الخمسة بصيغة CSV',
    fileName: 'scenarios.csv',
    path: '/docs/scenarios.csv',
    available: true,
    icon: '📊',
  },
  {
    title: 'تحليل المنافسين',
    description: 'قائمة المنافسين وتقييماتهم بصيغة CSV',
    fileName: 'competitors.csv',
    path: '/docs/competitors.csv',
    available: true,
    icon: '🏢',
  },
  {
    title: 'ملخص المستثمر',
    description: 'ملخص الفرصة الاستثمارية للمستثمرين بصيغة CSV',
    fileName: 'investor-summary.csv',
    path: '/docs/investor-summary.csv',
    available: true,
    icon: '💼',
  },
  {
    title: 'سياسة الحوكمة',
    description: 'وثيقة السياسات والحوكمة للمستثمرين',
    fileName: 'governance-policy.pdf',
    path: '/docs/governance-policy.pdf',
    available: false,
    icon: '⚖️',
  },
];

export function DownloadCenter() {
  return (
    <section id="download" className="py-16 bg-charcoal">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle
          title="مركز التحميل"
          subtitle="تحميل الوثائق والبيانات"
        />

        <div className="grid md:grid-cols-2 gap-4">
          {downloads.map((item) => (
            <div
              key={item.fileName}
              className={`rounded-xl border p-5 flex items-start gap-4 ${
                item.available
                  ? 'bg-charcoal-light border-calm-600 hover:border-gold/40 transition-colors'
                  : 'bg-charcoal border-calm-800 opacity-60'
              }`}
            >
              <span className="text-3xl shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-ivory font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-calm-400 text-xs mb-3">{item.description}</p>
                {item.available ? (
                  <a
                    href={item.path}
                    download={item.fileName}
                    className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-ivory text-xs font-medium px-4 py-2 rounded-lg transition-all"
                  >
                    <span>⬇</span> تحميل {item.fileName}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-calm-500 text-xs">
                    ⏳ الملف غير متاح حاليًا وسيتم رفعه لاحقًا
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-charcoal-light border border-calm-700 rounded-xl p-5">
          <h3 className="text-ivory font-semibold mb-3">ملاحظة على ملفات PDF</h3>
          <p className="text-calm-400 text-sm leading-relaxed">
            ملفات PDF ستُرفع عند الاكتمال. الملفات المتاحة الآن هي بيانات CSV مستخرجة من الدراسة تلقائيًا. جميع الأرقام مصدرها <code className="text-gold bg-charcoal px-1 rounded text-xs">docs/FINAL_STUDY.md</code> الموثقة في المشروع.
          </p>
        </div>
      </div>
    </section>
  );
}
