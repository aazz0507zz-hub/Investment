import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { InvestorProvider } from '@/contexts/InvestorContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { projectConfig } from '@/data/projectConfig';
import './globals.css';

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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <InvestorProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </InvestorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
