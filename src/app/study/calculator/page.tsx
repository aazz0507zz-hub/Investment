import { StudyPrevNext } from '@/components/StudySidebar';
import { InvestmentCalculator } from '@/components/InvestmentCalculator';

export default function CalculatorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">حاسبة الاستثمار</h1>
        <p className="text-[var(--text-muted)] mt-2">
          اضبط متغيرات الأسطول، الإشغال، والتسعير لرؤية تأثيرها على العوائد
        </p>
      </div>
      <InvestmentCalculator />
      <StudyPrevNext />
    </div>
  );
}
