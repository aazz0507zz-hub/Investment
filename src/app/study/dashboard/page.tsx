import { StudyPrevNext } from '@/components/StudySidebar';
import { InvestorDashboard } from '@/components/InvestorDashboard';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">لوحة المستثمر</h1>
        <p className="text-[var(--text-muted)] mt-2">
          عرض توضيحي لما سيحصل عليه المستثمر بعد إطلاق المشروع — بيانات تجريبية
        </p>
      </div>
      <InvestorDashboard />
      <StudyPrevNext />
    </div>
  );
}
