'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const studyNav = [
  { href: '/study', label: 'نظرة عامة', icon: '🏠' },
  { href: '/study/legal', label: 'القانوني والامتثال', icon: '⚖️' },
  { href: '/study/market', label: 'تحليل السوق', icon: '📈' },
  { href: '/study/competitors', label: 'تحليل المنافسين', icon: '📍' },
  { href: '/study/pricing', label: 'التسعير', icon: '💰' },
  { href: '/study/fleet', label: 'الأسطول', icon: '🔑' },
  { href: '/study/scenarios', label: 'سيناريوهات الأسطول', icon: '🚗' },
  { href: '/study/financials', label: 'التحليل المالي', icon: '📊' },
  { href: '/study/operations', label: 'التشغيل والعمليات', icon: '⚙️' },
  { href: '/study/risks', label: 'المخاطر', icon: '⚠️' },
  { href: '/study/governance', label: 'الحوكمة والشفافية', icon: '📋' },
  { href: '/study/investor-demo', label: 'منصة المستثمر (تجريبي)', icon: '📈' },
  { href: '/study/timeline', label: 'الخطة الزمنية وخارطة الطريق', icon: '📅' },
  { href: '/study/exit', label: 'حاسبة التخارج', icon: '🚪' },
  { href: '/study/downloads', label: 'التنزيلات والتسجيل', icon: '⬇️' },
];

export default function StudySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-5rem)] pb-8">
        <nav className="flex flex-col gap-0.5">
          {studyNav.map((item, i) => {
            const active = pathname === item.href;
            const isExit = item.href === '/study/exit';
            const isDownload = item.href === '/study/downloads';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? 'bg-forest text-ivory font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-base)] hover:bg-[var(--surface-alt)]'
                } ${isExit ? 'mt-2 border-t border-[var(--border)] pt-3' : ''} ${isDownload ? 'mt-1 border-t border-[var(--border)] pt-2' : ''}`}
              >
                <span className="text-base leading-none shrink-0">{item.icon}</span>
                <span className="leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/** Prev/Next navigation rendered at the bottom of study pages */
export function StudyPrevNext() {
  const pathname = usePathname();
  const idx = studyNav.findIndex((s) => s.href === pathname);
  const prev = idx > 0 ? studyNav[idx - 1] : null;
  const next = idx >= 0 && idx < studyNav.length - 1 ? studyNav[idx + 1] : null;

  const total = studyNav.length;
  const current = idx >= 0 ? idx + 1 : null;

  return (
    <div className="mt-12 pt-6 border-t border-[var(--border)] space-y-4">
      {current && (
        <div className="text-center text-xs text-[var(--text-muted)]">
          الجزء {current} من {total}
        </div>
      )}
      <div className="flex justify-between items-center">
        {prev ? (
          <Link
            href={prev.href}
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>{prev.label}</span>
          </Link>
        ) : (
          <div />
        )}
        <Link
          href="/study"
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors px-3 py-1 rounded-md border border-[var(--border)] hover:bg-[var(--surface-alt)]"
        >
          فهرس الدراسة
        </Link>
        {next ? (
          <Link
            href={next.href}
            className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors group"
          >
            <span>{next.label}</span>
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
