import { StudyPrevNext } from '@/components/StudySidebar';
import { GrowthRoadmap } from '@/components/GrowthRoadmap';

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">خارطة الطريق</h1>
        <p className="text-[var(--text-muted)] mt-2">
          5 مراحل للنمو من الإطلاق حتى التوسع الإقليمي مع شروط الانتقال ونقاط الوقف
        </p>
      </div>
      <GrowthRoadmap />
      <StudyPrevNext />
    </div>
  );
}
