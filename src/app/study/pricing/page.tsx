import { StudyPrevNext } from '@/components/StudySidebar';
import { PricingSection } from '@/components/PricingSection';

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">التسعير</h1>
        <p className="text-[var(--text-muted)] mt-2">
          جدول الأسعار اليومية، الحد الأدنى للسعر، إشارات رفع وخفض الأسعار، والودائع
        </p>
      </div>
      <PricingSection />
      <StudyPrevNext />
    </div>
  );
}
