'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const mainLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/study', label: 'الدراسة' },
];

const studyLinks = [
  { href: '/study/market', label: 'السوق' },
  { href: '/study/competitors', label: 'المنافسون' },
  { href: '/study/pricing', label: 'التسعير' },
  { href: '/study/fleet', label: 'الأسطول' },
  { href: '/study/scenarios', label: 'السيناريوهات' },
  { href: '/study/financials', label: 'المالية' },
  { href: '/study/operations', label: 'التشغيل' },
  { href: '/study/risks', label: 'المخاطر' },
  { href: '/study/exit', label: 'التخارج' },
  { href: '/study/investor-demo', label: 'منصة المستثمر' },
  { href: '/study/downloads', label: 'التحميل' },
];

const allStudyLinks = [
  { href: '/study', label: 'نظرة عامة' },
  { href: '/study/legal', label: 'القانوني' },
  { href: '/study/market', label: 'تحليل السوق' },
  { href: '/study/competitors', label: 'المنافسون' },
  { href: '/study/pricing', label: 'التسعير' },
  { href: '/study/fleet', label: 'الأسطول' },
  { href: '/study/scenarios', label: 'السيناريوهات' },
  { href: '/study/financials', label: 'المالية' },
  { href: '/study/operations', label: 'التشغيل' },
  { href: '/study/risks', label: 'المخاطر' },
  { href: '/study/governance', label: 'الحوكمة' },
  { href: '/study/investor-demo', label: 'منصة المستثمر' },
  { href: '/study/timeline', label: 'الخطة الزمنية' },
  { href: '/study/exit', label: 'حاسبة التخارج' },
  { href: '/study/downloads', label: 'التنزيلات' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isStudy = pathname?.startsWith('/study');

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'shadow-lg backdrop-blur-md bg-[var(--nav-bg)]'
            : 'bg-[var(--nav-bg)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="text-gold font-bold text-lg tracking-wide whitespace-nowrap shrink-0"
          >
            سند
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1 justify-center">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                  pathname === l.href
                    ? 'bg-forest text-ivory'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-base)]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {isStudy &&
              studyLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                    pathname === l.href
                      ? 'bg-forest/80 text-ivory'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-base)]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-base)] hover:bg-[var(--surface-alt)] transition-colors"
                aria-label="تبديل المظهر"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {/* CTA */}
            <Link
              href="/study/downloads"
              className="hidden sm:block bg-gold text-charcoal font-bold text-sm px-4 py-1.5 rounded-md hover:bg-gold-light transition-colors"
            >
              سجّل اهتمامك
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-base)] hover:bg-[var(--surface-alt)] transition-colors"
              aria-label="القائمة"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-md max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-3 flex flex-col gap-0.5">
              <Link
                href="/"
                className={`px-3 py-2.5 rounded-md text-sm transition-colors ${pathname === '/' ? 'bg-forest text-ivory' : 'hover:bg-[var(--surface-alt)]'}`}
              >
                الرئيسية
              </Link>
              <div className="border-t border-[var(--border)] my-2" />
              <div className="text-xs text-[var(--text-muted)] px-3 pb-1 font-medium">دراسة الجدوى</div>
              {allStudyLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2.5 rounded-md text-sm transition-colors ${
                    pathname === l.href
                      ? 'bg-forest text-ivory'
                      : 'hover:bg-[var(--surface-alt)] text-[var(--text-muted)]'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-[var(--border)] my-2" />
              <Link
                href="/study/downloads"
                className="bg-gold text-charcoal font-bold text-sm px-4 py-2.5 rounded-md text-center hover:bg-gold-light transition-colors"
              >
                سجّل اهتمامك
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer so content doesn't hide behind nav */}
      <div className="h-14" />
    </>
  );
}
