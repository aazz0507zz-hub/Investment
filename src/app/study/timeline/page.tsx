import { StudyPrevNext } from '@/components/StudySidebar';
import { Timeline90Days } from '@/components/Timeline90Days';

export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">الخطة الزمنية — أول 90 يومًا</h1>
        <p className="text-[var(--text-muted)] mt-2">
          8 مراحل تنفيذية من مرحلة التأسيس قبل الإطلاق حتى تحقيق الاستقرار التشغيلي
        </p>
      </div>
      <Timeline90Days />
      <StudyPrevNext />
    </div>
  );
}
