import { StudyPrevNext } from '@/components/StudySidebar';

const complianceRows = [
  { item: 'تأسيس شركة ذات مسؤولية محدودة (LLC)', details: 'رسوم سجل تجاري: 1,200 ر + نشر: 500 ر + VAT ≈ 1,955 ر', status: 'إلزامي', badge: 'confirmed' },
  { item: 'ترخيص النشاط — مكتب تأجير سيارات', details: 'يُستخرج من وزارة التجارة والهيئة العامة للنقل', status: 'إلزامي', badge: 'confirmed' },
  { item: 'بطاقة تشغيل لكل سيارة', details: 'سيارات جديدة لم تُسجَّل مسبقًا عند إدخالها للنشاط', status: 'إلزامي', badge: 'confirmed' },
  { item: 'الواجهة والكاونتر: سعوديون فقط', details: 'غرامة 20,000 ريال لكل عامل مخالف', status: 'إلزامي — غرامة فورية', badge: 'warning' },
  { item: 'التسجيل في ضريبة القيمة المضافة (VAT)', details: 'إلزامي من البداية — حد إلزامي 375,000 ريال سنويًا', status: 'إلزامي من اليوم الأول', badge: 'confirmed' },
  { item: 'الفوترة الإلكترونية (e-invoicing)', details: 'اختر نظامًا متوافقًا من البداية — لا تبدأ بالأوراق', status: 'إلزامي', badge: 'confirmed' },
  { item: 'بوليصة تأمين شامل لكل سيارة', details: 'إلزامي ومدرج في التكاليف: ~83,600 ريال السنة الأولى لـ 20 سيارة', status: 'إلزامي', badge: 'confirmed' },
  { item: 'عقد إيجار المكتب', details: 'يُوقَّع مشروطًا بتوافق البلدية والهيئة', status: 'احتياط', badge: 'conservative' },
  { item: 'الفحص الدوري للسيارات', details: 'بطاقة تشغيل محدودة العمر — متطلب تجديد دوري', status: 'إلزامي', badge: 'confirmed' },
  { item: 'نظام GPS لكل سيارة', details: 'مدرج في التكاليف: ضمن 14,000 ريال تسجيل وGPS', status: 'إلزامي', badge: 'confirmed' },
  { item: 'عقود إيجار موحدة إلكترونية', details: 'العقود الإلكترونية الموحدة هي المعتمدة في الهيئة', status: 'إلزامي', badge: 'confirmed' },
  { item: 'ترخيص هيئة النقل', details: 'غير متاح للتحقق العلني — يُستعلم مباشرة من الهيئة', status: 'يحتاج تحقق لاحق', badge: 'verify' },
];

const legalStructurePoints = [
  'شركة ذات مسؤولية محدودة (LLC) هي الهيكل الأنسب — لا مؤسسة فردية',
  'المؤسسة الفردية لا تحمي الملاك من المسؤولية الشخصية في دعاوى الحوادث',
  'LLC تُتيح إصدار حصص للمستثمرين بصورة منظمة',
  'عقد الشركاء يجب أن يُحدد: آلية التصويت، شروط الخروج، سياسة التوزيع، تضارب المصالح',
  'اسم "سند - SANAD" يحتاج فحص رسمي لدى وزارة التجارة والهيئة السعودية للملكية الفكرية قبل التسجيل',
];

const laborPoints = [
  'الواجهة والكاونتر يجب أن يكون سعوديًا — هذا شرط نظامي، ليس توصية',
  'غرامة 20,000 ريال لكل عامل مخالف لتوطين الواجهة',
  'يمكن توظيف خلفيات متنوعة في الأدوار الخلفية (صيانة، تنظيف) لكن الواجهة لا تقبل استثناء',
  'الرواتب في الميزانية: موظفان سعوديان = 10,000 ريال شهريًا',
  'موظف تجهيز وتنظيف: 2,500 ريال شهريًا',
];

const badgeColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  warning: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  conservative: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  verify: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
};
const badgeLabels: Record<string, string> = {
  confirmed: 'رقم مؤكد',
  warning: 'غرامة',
  conservative: 'احتياط',
  verify: 'يحتاج تحقق',
};

export default function LegalPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">الدراسة القانونية والامتثال التنظيمي</h1>
        <p className="text-[var(--text-muted)] mt-2">
          المتطلبات القانونية والتنظيمية لتأسيس مكتب تأجير سيارات فئة (د) في حائل
        </p>
      </div>

      {/* الهيكل القانوني */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">الهيكل القانوني الموصى به</h2>
        <div className="bg-forest/10 border border-forest/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <div className="font-bold text-[var(--text-base)]">شركة ذات مسؤولية محدودة (LLC)</div>
              <div className="text-sm text-[var(--text-muted)]">الشكل القانوني الإلزامي لهذا النوع من المشاريع الاستثمارية</div>
            </div>
          </div>
          <ul className="space-y-2">
            {legalStructurePoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <span className="text-gold mt-0.5">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'رسوم التأسيس التقريبية', value: '~1,955 ريال', badge: 'confirmed' },
            { label: 'غرامة مخالفة التوطين', value: '20,000 ريال/عامل', badge: 'warning' },
            { label: 'ترخيص هيئة النقل', value: 'يحتاج تحقق', badge: 'verify' },
          ].map((s) => (
            <div key={s.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center">
              <div className="text-lg font-extrabold text-gold">{s.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${badgeColors[s.badge]}`}>
                {badgeLabels[s.badge]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* جدول الامتثال */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">جدول الامتثال التنظيمي</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                {['المتطلب', 'التفاصيل', 'الحالة', 'التصنيف'].map((h) => (
                  <th key={h} className="px-4 py-3 text-right font-semibold text-[var(--text-base)] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {complianceRows.map((row, i) => (
                <tr key={i} className="hover:bg-[var(--surface-alt)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-base)]">{row.item}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{row.details}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{row.status}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColors[row.badge]}`}>
                      {badgeLabels[row.badge]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* متطلبات العمالة */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">متطلبات العمالة والتوطين</h2>
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="font-bold text-red-700 dark:text-red-400">متطلب قانوني — غير قابل للتفاوض</span>
          </div>
          <ul className="space-y-2">
            {laborPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VAT والفوترة */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">ضريبة القيمة المضافة والفوترة الإلكترونية</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)] space-y-2">
            <h3 className="font-bold text-[var(--text-base)]">VAT</h3>
            <ul className="space-y-1 text-sm text-[var(--text-muted)]">
              <li>• نسبة VAT: 15% على إيرادات التأجير</li>
              <li>• الحد الإلزامي للتسجيل: 375,000 ريال سنويًا</li>
              <li>• التسجيل من البداية — لا تتأخر إذا توقعت تجاوز الحد</li>
              <li>• يُستردّ VAT على المشتريات المرتبطة بالنشاط</li>
              <li>• أسعار التأجير في الجداول شاملة VAT</li>
            </ul>
          </div>
          <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)] space-y-2">
            <h3 className="font-bold text-[var(--text-base)]">الفوترة الإلكترونية</h3>
            <ul className="space-y-1 text-sm text-[var(--text-muted)]">
              <li>• اختر نظامًا متوافقًا مع ZATCA من اليوم الأول</li>
              <li>• لا تبدأ بالأوراق أو الفواتير اليدوية</li>
              <li>• نظام إدارة التأجير مدرج في الميزانية: 1,000 ريال/شهر</li>
              <li>• يجب أن يدعم النظام الفوترة الإلكترونية بشكل أصلي</li>
            </ul>
          </div>
        </div>
      </section>

      {/* تنبيه قانوني */}
      <section className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5 text-sm text-amber-800 dark:text-amber-300">
        <strong>تنبيه قانوني:</strong> المعلومات الواردة في هذه الصفحة مستخرجة من دراسة الجدوى وقد تتغير بتغيّر الأنظمة. يجب مراجعة محامٍ ومستشار قانوني متخصص في القانون التجاري السعودي قبل اتخاذ أي قرار.
      </section>

      <StudyPrevNext />
    </div>
  );
}
