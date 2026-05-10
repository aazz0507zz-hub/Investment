import { StudyPrevNext } from '@/components/StudySidebar';
import { InvestorDashboard } from '@/components/InvestorDashboard';

export default function InvestorDemoPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">منصة المستثمر — عرض توضيحي</h1>
        <p className="text-[var(--text-muted)] mt-2">
          هذا ما يمكن أن يراه المستثمر بعد إطلاق المشروع — جميع البيانات تجريبية ولا تمثل أداءً فعليًا
        </p>
      </div>
      <InvestorDashboard />
      <StudyPrevNext />
    </div>
  );
}
