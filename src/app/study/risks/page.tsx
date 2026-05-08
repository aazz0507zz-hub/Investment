import { StudyPrevNext } from '@/components/StudySidebar';
import { RiskDashboard } from '@/components/RiskDashboard';

export default function RisksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">لوحة المخاطر</h1>
        <p className="text-[var(--text-muted)] mt-2">
          تحليل 12 خطرًا رئيسيًا بالفئة والتأثير والمعالجة، مع سيناريوهات الخسارة المحتملة
        </p>
      </div>
      <RiskDashboard />
      <StudyPrevNext />
    </div>
  );
}
