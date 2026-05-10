import { StudyPrevNext } from '@/components/StudySidebar';
import { timeline } from '@/data/timeline';

const deliverySOP = [
  { step: '1', action: 'استقبال العميل وتحقق الهوية', detail: 'هوية وطنية أو إقامة — لا استثناء' },
  { step: '2', action: 'فحص بصري وتصوير السيارة', detail: 'صور كاملة قبل التسليم — حماية للطرفين' },
  { step: '3', action: 'توضيح الوقود', detail: 'تسليم بمستوى محدد، استلام بنفس المستوى أو خصم' },
  { step: '4', action: 'شرح بنود العقد', detail: 'الكيلومتر الزائد، الأضرار، التدخين، التأخير' },
  { step: '5', action: 'توقيع العقد الإلكتروني', detail: 'لا ورق — عقد موحد إلكتروني معتمد' },
  { step: '6', action: 'استلام مبلغ الضمان', detail: 'حسب الفئة — موثق في العقد' },
  { step: '7', action: 'تسليم المفتاح والتشغيل التجريبي', detail: 'يتأكد العميل من حالة السيارة أمامك' },
];

const returnSOP = [
  { step: '1', action: 'استقبال السيارة وتحقق الهوية', detail: 'نفس الموظف إن أمكن' },
  { step: '2', action: 'فحص بصري كامل وتصوير', detail: 'مقارنة مع صور التسليم' },
  { step: '3', action: 'قراءة العداد وحساب الكيلومترات الزائدة', detail: 'وفق بند العقد فقط' },
  { step: '4', action: 'فحص الوقود', detail: 'خصم الفرق إن كان دون المستوى المحدد' },
  { step: '5', action: 'توقيع إتمام الإرجاع', detail: 'لا تُطلق الضمان قبل الفحص الكامل' },
  { step: '6', action: 'معالجة الضمان', detail: 'إرجاع الكامل عند عدم وجود أضرار' },
  { step: '7', action: 'الفاتورة النهائية', detail: 'إلكترونية فورية — لا تأخير' },
];

const maintenanceRules = [
  'زيت المحرك كل 5,000 كم — تختلف الكمية بحسب السيارة',
  'صيانة دورية وفق توصية الوكالة — لا تتجاوزها',
  'تسجيل كل صيانة في سجل السيارة (ورقي ورقمي)',
  'فحص الإطارات والمكابح أسبوعيًا لكل سيارة تُسلَّم',
  'لا تُسلَّم سيارة بمؤشر ناقص أو تحذير نشط',
  'عند أي عطل للعميل: استبدال فوري أو ترتيب بديل — لا تترك العميل',
  'الميزانية الشهرية: 330–430 ريال/سيارة اقتصادية، 420–500 ريال/إلنترا',
];

const insuranceRules = [
  'تأمين شامل على كل سيارة — غير قابل للتفاوض',
  'إجمالي التأمين السنة الأولى: ~83,600 ريال لـ 20 سيارة',
  'عند وقوع حادث: لا تتعامل مع التأمين بدون محاضر مرور رسمية',
  'احتفظ دائمًا بمخصص مطالبات في الاحتياطي',
  'اطلب من العميل توقيع إقرار بتحمّل المسؤولية عند الأضرار',
  'تحقق من شرط القيادة — هل يسمح بقيادة الآخرين؟',
  'أبلغ شركة التأمين فور الحادث — لا تتأخر 24 ساعة',
];

export default function OperationsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">العمليات التشغيلية</h1>
        <p className="text-[var(--text-muted)] mt-2">
          خطة التشغيل اليومية — التسليم، الاستلام، الصيانة، التأمين، والحوادث
        </p>
      </div>

      {/* Timeline */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">خطة ما قبل الافتتاح</h2>
        <div className="relative">
          <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-[var(--border)]" />
          <div className="space-y-4">
            {timeline.map((stage) => (
              <div key={stage.id} className="flex gap-6 pr-4 relative">
                <div className="absolute right-0 top-5 w-12 h-0.5 bg-[var(--border)]" />
                <div className="w-12 h-12 rounded-full bg-forest text-ivory flex items-center justify-center text-xs font-bold shrink-0 z-10">
                  {stage.dayOffset}
                </div>
                <div className="flex-1 border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)]">
                  <div className="font-bold text-[var(--text-base)] mb-2">{stage.stage}</div>
                  <ul className="space-y-1">
                    {stage.tasks.slice(0, 4).map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <span className="text-gold mt-0.5">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                  {stage.successIndicator && (
                    <div className="mt-3 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-1.5">
                      ✓ مؤشر النجاح: {stage.successIndicator}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOP التسليم */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">إجراءات التسليم (SOP)</h2>
        <div className="space-y-2">
          {deliverySOP.map((item) => (
            <div key={item.step} className="flex gap-4 border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)]">
              <div className="w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center text-sm font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <div className="font-medium text-[var(--text-base)] text-sm">{item.action}</div>
                <div className="text-xs text-[var(--text-muted)]">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOP الاستلام */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">إجراءات الاستلام (SOP)</h2>
        <div className="space-y-2">
          {returnSOP.map((item) => (
            <div key={item.step} className="flex gap-4 border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)]">
              <div className="w-8 h-8 rounded-full bg-gold text-charcoal flex items-center justify-center text-sm font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <div className="font-medium text-[var(--text-base)] text-sm">{item.action}</div>
                <div className="text-xs text-[var(--text-muted)]">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* الصيانة */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">الصيانة وجاهزية الأسطول</h2>
        <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)]">
          <ul className="space-y-2">
            {maintenanceRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <span className="text-forest mt-0.5">🔧</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'صيانة شهرية — سيارات اقتصادية', value: '330–375 ريال/سيارة', badge: 'conservative' },
            { label: 'صيانة شهرية — يارس/أكسنت', value: '360–430 ريال/سيارة', badge: 'conservative' },
            { label: 'صيانة شهرية — إلنترا', value: '420–500 ريال/سيارة', badge: 'conservative' },
          ].map((s) => (
            <div key={s.label} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] text-center">
              <div className="text-lg font-extrabold text-gold">{s.value}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
              <span className="text-xs px-2 py-0.5 rounded-full mt-2 inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                افتراض محافظ
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* التأمين والحوادث */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">التأمين وإدارة الحوادث</h2>
        <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)]">
          <ul className="space-y-2">
            {insuranceRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <span className="text-gold mt-0.5">🛡️</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400">
          <strong>تحذير:</strong> لا تُرجِع مبلغ الضمان قبل الفحص الكامل والتأكد من عدم وجود أضرار. الإهمال هنا يُكلّف أكثر بكثير.
        </div>
      </section>

      {/* مؤشرات الأداء */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">مؤشرات الأداء التشغيلي</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { kpi: 'نسبة الإشغال', target: '≥ 51% نقطة التعادل / ≥ 72% للتوسع', type: 'target' },
            { kpi: 'وقت التجهيز بين العقود', target: '≤ 2 ساعة', type: 'target' },
            { kpi: 'نسبة الشكاوى', target: '≤ 5% من العقود', type: 'target' },
            { kpi: 'نسبة الإرجاع في الموعد', target: '≥ 90%', type: 'target' },
            { kpi: 'سيارات جاهزة في أي وقت', target: '≥ 80% من الأسطول', type: 'target' },
            { kpi: 'وقت الاستجابة للعطل', target: '≤ 4 ساعات', type: 'target' },
          ].map((item) => (
            <div key={item.kpi} className="border border-[var(--border)] rounded-xl p-4 bg-[var(--card-bg)] flex justify-between items-center">
              <span className="text-sm text-[var(--text-muted)]">{item.kpi}</span>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">{item.target}</span>
            </div>
          ))}
        </div>
      </section>

      <StudyPrevNext />
    </div>
  );
}
