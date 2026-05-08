import { StudyPrevNext } from '@/components/StudySidebar';
import { DownloadCenter } from '@/components/DownloadCenter';

export default function DownloadsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">التنزيلات</h1>
        <p className="text-[var(--text-muted)] mt-2">
          حمّل ملفات دراسة الجدوى، السيناريوهات، وتحليل المنافسين
        </p>
      </div>
      <DownloadCenter />
      <StudyPrevNext />
    </div>
  );
}
