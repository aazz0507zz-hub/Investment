import { StudyPrevNext } from '@/components/StudySidebar';
import { FleetScenarios } from '@/components/FleetScenarios';

export default function ScenariosPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">سيناريوهات الأسطول</h1>
        <p className="text-[var(--text-muted)] mt-2">
          خمسة سيناريوهات لتركيبة الأسطول مع مقارنة التكاليف والعوائد المتوقعة
        </p>
      </div>
      <FleetScenarios />
      <StudyPrevNext />
    </div>
  );
}
