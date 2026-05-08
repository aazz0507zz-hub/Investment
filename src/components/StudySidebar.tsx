'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const studyNav = [
  { href: '/study', label: 'نظرة عامة', icon: '🏠' },
  { href: '/study/financials', label: 'التحليل المالي', icon: '📊' },
  { href: '/study/scenarios', label: 'سيناريوهات الأسطول', icon: '🚗' },
  { href: '/study/fleet', label: 'تفاصيل الأسطول', icon: '🔑' },
  { href: '/study/pricing', label: 'التسعير', icon: '💰' },
  { href: '/study/competitors', label: 'تحليل المنافسين', icon: '📍' },
  { href: '/study/risks', label: 'المخاطر', icon: '⚠️' },
  { href: '/study/governance', label: 'الحوكمة والسياسات', icon: '📋' },
  { href: '/study/timeline', label: 'الخطة الزمنية (90 يوم)', icon: '📅' },
  { href: '/study/roadmap', label: 'خارطة الطريق', icon: '🗺️' },
  { href: '/study/calculator', label: 'حاسبة الاستثمار', icon: '🧮' },
  { href: '/study/dashboard', label: 'لوحة المستثمر (تجريبي)', icon: '📈' },
  { href: '/study/downloads', label: 'التنزيلات', icon: '⬇️' },
  { href: '/study/register', label: 'سجّل اهتمامك', icon: '✍️' },
];

export default function StudySidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 hidden lg:block">
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-5rem)] pb-8">
        <nav className="flex flex-col gap-0.5">
          {studyNav.map((item, i) => {
            const active = pathname === item.href;
            const isLast = i === studyNav.length - 1;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? 'bg-forest text-ivory font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-base)] hover:bg-[var(--surface-alt)]'
                } ${isLast ? 'mt-2 border-t border-[var(--border)] pt-3' : ''}`}
              >
                <span className="text-base leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

/** Prev/Next navigation bar rendered at the bottom of study pages */
export function StudyPrevNext() {
  const pathname = usePathname();
  const idx = studyNav.findIndex((s) => s.href === pathname);
  const prev = idx > 0 ? studyNav[idx - 1] : null;
  const next = idx >= 0 && idx < studyNav.length - 1 ? studyNav[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-[var(--border)]">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>{prev.label}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors"
        >
          <span>{next.label}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
