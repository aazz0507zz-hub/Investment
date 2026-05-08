import { StudyPrevNext } from '@/components/StudySidebar';
import { GovernanceSection } from '@/components/GovernanceSection';

export default function GovernancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">الحوكمة والسياسات</h1>
        <p className="text-[var(--text-muted)] mt-2">
          جدول الحوكمة، الصلاحيات، سياسات التوزيع، الشفافية، وآليات حل النزاعات
        </p>
      </div>
      <GovernanceSection />
      <StudyPrevNext />
    </div>
  );
}
