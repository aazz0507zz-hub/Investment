import { StudyPrevNext } from '@/components/StudySidebar';
import { FeasibilityStudy } from '@/components/FeasibilityStudy';

export default function FinancialsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">التحليل المالي</h1>
        <p className="text-[var(--text-muted)] mt-2">
          الاستثمار الأولي، المصروفات الشهرية، الإيرادات المتوقعة، وجداول التوزيع
        </p>
      </div>
      <FeasibilityStudy />
      <StudyPrevNext />
    </div>
  );
}
