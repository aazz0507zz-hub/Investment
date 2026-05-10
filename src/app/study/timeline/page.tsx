import { StudyPrevNext } from '@/components/StudySidebar';
import { Timeline90Days } from '@/components/Timeline90Days';
import { GrowthRoadmap } from '@/components/GrowthRoadmap';

export default function TimelinePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">الخطة الزمنية وخارطة الطريق</h1>
        <p className="text-[var(--text-muted)] mt-2">
          أول 90 يومًا من الإطلاق وخارطة الطريق للسنوات العشر — شروط التوسع ونقاط الوقف
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">الخطة الزمنية — أول 90 يومًا</h2>
        <Timeline90Days />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">خارطة الطريق للنمو</h2>
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
          <strong>تنبيه:</strong> مسار 3000 سيارة وخارطة الطريق إلى مرحلة التوسع الإقليمي هو سيناريو مشروط وليس وعدًا. التوسع يحدث فقط عند تحقق شروط صارمة موثقة في دراسة الجدوى، ويتوقف فورًا عند أي تدهور مالي.
        </div>
        <GrowthRoadmap />
      </section>

      <StudyPrevNext />
    </div>
  );
}
