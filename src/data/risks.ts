// Risk data extracted from docs/FINAL_STUDY.md

export type RiskCategory = 'مالي' | 'تشغيلي' | 'قانوني' | 'سمعة' | 'أسطول' | 'عملاء';
export type RiskLevel = 'منخفض' | 'متوسط' | 'مرتفع' | 'مؤكد';

export interface Risk {
  id: string;
  risk: string;
  category: RiskCategory;
  probability: RiskLevel;
  impact: RiskLevel;
  earlyWarning: string;
  prevention: string;
  response: string;
  owner: string;
  expectedCost: RiskLevel;
}

export const risks: Risk[] = [
  {
    id: 'r1',
    risk: 'إشغال أقل من 50%',
    category: 'مالي',
    probability: 'متوسط',
    impact: 'مرتفع',
    earlyWarning: 'بقاء السيارات شاغرة > 5 أيام',
    prevention: 'عقود شهرية + تسويق خرائط + تسعير مرن',
    response: 'وقف التوسع وتخفيض النفقات التسويقية غير المجدية',
    owner: 'المدير العام',
    expectedCost: 'مرتفع',
  },
  {
    id: 'r2',
    risk: 'حرب أسعار من المنافسين',
    category: 'مالي',
    probability: 'مرتفع',
    impact: 'متوسط',
    earlyWarning: 'عروض منخفضة متكررة حولك',
    prevention: 'لا تنزل تحت floor price',
    response: 'باقات واضحة بدل نزول مباشر في السعر',
    owner: 'التسويق',
    expectedCost: 'متوسط',
  },
  {
    id: 'r3',
    risk: 'حادث جسيم',
    category: 'أسطول',
    probability: 'متوسط',
    impact: 'مرتفع',
    earlyWarning: 'ارتفاع الحوادث / بعض الموديلات',
    prevention: 'تأمين شامل + GPS + فحص تسليم دقيق',
    response: 'سحب / إصلاح / استبدال / فتح مطالبة تأمين فورية',
    owner: 'مسؤول الأسطول',
    expectedCost: 'مرتفع',
  },
  {
    id: 'r4',
    risk: 'عميل لا يُعيد السيارة',
    category: 'عملاء',
    probability: 'منخفض',
    impact: 'مرتفع',
    earlyWarning: 'تأخير دون رد',
    prevention: 'توثيق صارم وهوية سليمة وGPS',
    response: 'إجراءات نظامية فورية عبر الأنظمة',
    owner: 'المدير التشغيلي',
    expectedCost: 'مرتفع',
  },
  {
    id: 'r5',
    risk: 'نزاع مبلغ الحجز',
    category: 'عملاء',
    probability: 'مرتفع',
    impact: 'متوسط',
    earlyWarning: 'رسائل شكوى متكررة',
    prevention: 'SLA مكتوب وصور قبل/بعد',
    response: 'إغلاق خلال 24 ساعة',
    owner: 'موظف التأجير',
    expectedCost: 'متوسط',
  },
  {
    id: 'r6',
    risk: 'تقييم سلبي عام في Google',
    category: 'سمعة',
    probability: 'متوسط',
    impact: 'مرتفع',
    earlyWarning: 'تكرار نفس الشكوى',
    prevention: 'حل الشكوى قبل أن تكبر',
    response: 'رد مهني + تعديل SOP',
    owner: 'التسويق / العمليات',
    expectedCost: 'متوسط',
  },
  {
    id: 'r7',
    risk: 'عطل مفاجئ مبكر',
    category: 'أسطول',
    probability: 'متوسط',
    impact: 'متوسط',
    earlyWarning: 'لمبات / صوت / كفرات',
    prevention: 'PDI قبل كل عقد',
    response: 'استبدال فوري أو إلغاء',
    owner: 'الأسطول',
    expectedCost: 'متوسط',
  },
  {
    id: 'r8',
    risk: 'مخالفة من الهيئة',
    category: 'قانوني',
    probability: 'منخفض',
    impact: 'مرتفع',
    earlyWarning: 'صلاحيات منتهية',
    prevention: 'Dashboard امتثال يومي',
    response: 'إيقاف تشغيل المركبة فورًا',
    owner: 'الامتثال',
    expectedCost: 'مرتفع',
  },
  {
    id: 'r9',
    risk: 'تعثر أقساط التمويل',
    category: 'مالي',
    probability: 'متوسط',
    impact: 'مرتفع',
    earlyWarning: 'هبوط DSCR',
    prevention: 'سقف دين 25% من الإيراد',
    response: 'تجميد شراء جديد وبيع سيارات أبطأ دورانًا',
    owner: 'المالية',
    expectedCost: 'مرتفع',
  },
  {
    id: 'r10',
    risk: 'انخفاض قيمة السيارات',
    category: 'أسطول',
    probability: 'مرتفع',
    impact: 'متوسط',
    earlyWarning: 'بطء البيع وارتفاع الممشى',
    prevention: 'دورة تدوير 30–36 شهرًا',
    response: 'بيع مبكر لبعض الموديلات',
    owner: 'الأسطول / المالية',
    expectedCost: 'متوسط',
  },
  {
    id: 'r11',
    risk: 'تلاعب بقطع السيارة',
    category: 'تشغيلي',
    probability: 'منخفض',
    impact: 'متوسط',
    earlyWarning: 'فرق إطارات / بطارية / طيس',
    prevention: 'تصوير ورموز تعريف داخلية',
    response: 'خصم موثق أو مطالبة',
    owner: 'الأسطول',
    expectedCost: 'متوسط',
  },
  {
    id: 'r12',
    risk: 'رائحة دخان متكررة',
    category: 'سمعة',
    probability: 'مرتفع',
    impact: 'منخفض',
    earlyWarning: 'ملاحظات ما بعد العودة',
    prevention: 'غرامة مدخن مكتوبة في العقد',
    response: 'تنظيف عميق وسحب من الخدمة',
    owner: 'موظف الاستلام',
    expectedCost: 'منخفض',
  },
];

// What happens if we lose — transparent loss scenarios
export const lossScenarios = [
  { action: 'لا توزيعات أول 24 شهر', rationale: 'حماية السيولة وتمويل التشغيل والصدمات' },
  { action: 'استخدام الاحتياطي', rationale: 'رأس مال عامل احتياطي 125,000 ريال مخصص لهذا الغرض' },
  { action: 'وقف التوسع فورًا', rationale: 'لا شراء سيارات جديدة حتى يستقر الإشغال فوق 55%' },
  { action: 'تقليل الخصومات غير المجدية', rationale: 'مراجعة كل خصم لا يرتبط بعقد طويل أو ولاء موثق' },
  { action: 'تحويل جزء من الأسطول لعقود شهرية', rationale: 'تثبيت التدفق النقدي وتقليل الاعتماد على التأجير اليومي' },
  { action: 'بيع السيارات الأبطأ دورانًا', rationale: 'تحرير سيولة وتقليص نقاط الضعف في الأسطول' },
  { action: 'تجميد التمويل الجديد', rationale: 'لا أقساط جديدة حتى تتحسن DSCR وسيولة الاحتياطي' },
  { action: 'مراجعة الموقع والتسعير', rationale: 'إذا لم يصل الإشغال لـ 55% خلال 6–9 أشهر' },
  { action: 'مراجعة أداء الموظفين', rationale: 'الموظف الضعيف يكلف تقييمات Google أكثر من راتبه' },
  { action: 'مراجعة شكاوى Google بانتظام', rationale: 'كل شكوى متكررة هي فرصة لتحسين SOP' },
  { action: 'متى نوقف المشروع أو نُعيد هيكلته', rationale: 'إذا وصلت الخسارة التشغيلية لأكثر من 3 أشهر متصلة بلا مسار واضح للتعافي، يُناقش المستثمرون إعادة الهيكلة أو البيع' },
];
