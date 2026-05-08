import { StudyPrevNext } from '@/components/StudySidebar';
import { VehicleFleet } from '@/components/VehicleFleet';

export default function FleetPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">تفاصيل الأسطول</h1>
        <p className="text-[var(--text-muted)] mt-2">
          7 فئات من السيارات مع أسعار الاستحواذ، تكاليف الصيانة والتأمين، والحكم التشغيلي
        </p>
      </div>
      <VehicleFleet />
      <StudyPrevNext />
    </div>
  );
}
