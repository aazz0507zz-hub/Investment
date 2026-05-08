import { StudyPrevNext } from '@/components/StudySidebar';
import { CompetitorAnalysis } from '@/components/CompetitorAnalysis';

export default function CompetitorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">تحليل المنافسين</h1>
        <p className="text-[var(--text-muted)] mt-2">
          تقييم 19 منافسًا في سوق تأجير السيارات بحائل مع تصنيف المخاطر واستراتيجيات المواجهة
        </p>
      </div>
      <CompetitorAnalysis />
      <StudyPrevNext />
    </div>
  );
}
