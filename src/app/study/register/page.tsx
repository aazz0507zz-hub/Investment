import { StudyPrevNext } from '@/components/StudySidebar';
import FinalRequestForm from '@/components/FinalRequestForm';
import { projectConfig } from '@/data/projectConfig';

export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">سجّل اهتمامك بالاستثمار</h1>
        <p className="text-[var(--text-muted)] mt-2">
          أرسل طلب الاهتمام وسيتواصل معك{' '}
          <strong className="text-[var(--text-base)]">{projectConfig.ownerName}</strong> على رقم{' '}
          <a href={`tel:${projectConfig.contactPhone}`} className="text-gold hover:text-gold-light">
            {projectConfig.contactPhone}
          </a>
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
        هذا النموذج لا يُنشئ التزامًا قانونيًا. هو فقط إعلان اهتمام مبدئي لتسهيل التواصل.
      </div>

      <FinalRequestForm />
      <StudyPrevNext />
    </div>
  );
}
