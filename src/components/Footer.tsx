import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-alt)] mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          {/* Brand */}
          <div>
            <div className="text-gold font-bold text-lg mb-2">سند لتأجير السيارات</div>
            <div className="text-[var(--text-muted)]">
              دراسة جدوى استثمارية لمكتب تأجير سيارات فئة (د)<br />
              حائل، المملكة العربية السعودية
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold text-[var(--text-base)] mb-2">تواصل معنا</div>
            <div className="text-[var(--text-muted)] space-y-1">
              <div>عبدالعزيز محمد العنزي</div>
              <a
                href="tel:0500772878"
                className="block text-gold hover:text-gold-light transition-colors"
              >
                0500772878
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-semibold text-[var(--text-base)] mb-2">روابط</div>
            <div className="space-y-1">
              <Link href="/study" className="block text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors">
                دراسة الجدوى
              </Link>
              <Link href="/study/register" className="block text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors">
                سجّل اهتمامك
              </Link>
              <Link href="/study/downloads" className="block text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors">
                التنزيلات
              </Link>
              <Link href="/admin" className="block text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors text-xs">
                لوحة الإدارة
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--text-muted)]">
          <p>
            هذا الموقع لا يمثل طرحًا عامًا للأوراق المالية، ولا وعدًا بعائد، ولا توصية استثمارية ملزمة.
            جميع الأرقام تقديرية لأغراض دراسة الجدوى فقط.
          </p>
          <p className="mt-1">© {new Date().getFullYear()} سند لتأجير السيارات — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
