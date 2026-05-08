'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'الرئيسية' },
  { id: 'calculator', label: 'الحاسبة' },
  { id: 'feasibility', label: 'دراسة الجدوى' },
  { id: 'scenarios', label: 'السيناريوهات' },
  { id: 'fleet', label: 'الأسطول' },
  { id: 'pricing', label: 'التسعير' },
  { id: 'competitors', label: 'المنافسون' },
  { id: 'risks', label: 'المخاطر' },
  { id: 'investor-dashboard', label: 'منصة المستثمر' },
  { id: 'governance', label: 'الحوكمة' },
  { id: 'timeline', label: 'الخطة' },
  { id: 'download', label: 'التحميل' },
];

export function ScrollNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el && section.el.offsetTop <= scrollY) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-charcoal/95 backdrop-blur-sm border-b border-calm-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile toggle */}
        <div className="flex items-center justify-between md:hidden py-3">
          <span className="text-ivory font-bold text-sm">سند للاستثمار</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-calm-400 hover:text-ivory p-2 rounded"
            aria-label="فتح القائمة"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden grid grid-cols-3 gap-2 pb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xs py-2 px-2 rounded text-center transition-colors ${
                  activeSection === item.id
                    ? 'bg-forest text-gold'
                    : 'text-calm-400 hover:text-ivory'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`whitespace-nowrap text-xs px-3 py-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'bg-forest text-gold font-semibold'
                  : 'text-calm-400 hover:text-ivory hover:bg-charcoal-light'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
