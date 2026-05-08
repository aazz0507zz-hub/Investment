import type { Metadata } from 'next';
import './globals.css';
import { projectConfig } from '@/data/projectConfig';

export const metadata: Metadata = {
  title: `${projectConfig.nameAr} — ${projectConfig.nameEn} | فرصة استثمارية في حائل`,
  description:
    'دراسة جدوى كاملة لمكتب تأجير سيارات فئة (د) في حائل، المملكة العربية السعودية. سيناريوهات الأسطول، تحليل المنافسين، لوحة المخاطر، والحاسبة الاستثمارية.',
  keywords: [
    'تأجير سيارات حائل',
    'استثمار تأجير سيارات',
    'دراسة جدوى حائل',
    'SANAD Rent',
    'سند لتأجير السيارات',
    'car rental investment Saudi Arabia',
    'Hail car rental feasibility study',
  ],
  authors: [{ name: projectConfig.nameAr }],
  openGraph: {
    title: `${projectConfig.nameAr} — ${projectConfig.nameEn}`,
    description: 'فرصة استثمارية في مكتب تأجير سيارات فئة (د) في حائل، المملكة العربية السعودية',
    locale: 'ar_SA',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
