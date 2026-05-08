// Vehicle fleet data extracted from docs/FINAL_STUDY.md (Ibn Al-Jubail price offer, 2026 models)

export interface Vehicle {
  id: string;
  nameAr: string;
  nameEn: string;
  model: string;
  priceBeforeVAT: number;
  vat: number;
  priceInclVAT: number;
  launchIncluded: boolean;
  launchReason: string;
  risks: string;
  verdict: string;
  // Sell-by guidance
  sellByMonths: string;
  sellByKm: string;
  // Maintenance monthly estimate
  maintenanceMonthlyMin: number;
  maintenanceMonthlyMax: number;
  // Oil change details
  oilBottles: number;
  oilChangeCost: number;
}

export const vehicles: Vehicle[] = [
  {
    id: 'i10',
    nameAr: 'هيونداي i10',
    nameEn: 'Hyundai i10',
    model: 'ستاندر 2026',
    priceBeforeVAT: 42_000,
    vat: 6_300,
    priceInclVAT: 48_300,
    launchIncluded: true,
    launchReason: 'ممتازة لدوران نقدي منخفض التذكرة؛ تكملة الطبقة الاقتصادية',
    risks: 'أضعف في العقود الشهرية طويلة المدة والصورة الذهنية',
    verdict: 'مناسبة بعدد محدود (2 في السيناريو الموصى به)',
    sellByMonths: '30–36 شهرًا',
    sellByKm: '100–120 ألف كم',
    maintenanceMonthlyMin: 330,
    maintenanceMonthlyMax: 375,
    oilBottles: 3,
    oilChangeCost: 62,
  },
  {
    id: 'dzire',
    nameAr: 'سوزوكي ديزاير',
    nameEn: 'Suzuki Dzire',
    model: 'ستاندر 2026',
    priceBeforeVAT: 42_000,
    vat: 6_300,
    priceInclVAT: 48_300,
    launchIncluded: false,
    launchReason: 'اقتصادية جدًا ويمكن أن تعمل إذا حصلت على سعر شراء أفضل',
    risks: 'الطلب الرمزي عليها أقل من يارس/أكسنت غالبًا',
    verdict: 'بديل محتمل فقط إذا ضيّق رأس المال — غير مدرجة في الإطلاق الموصى به',
    sellByMonths: '30–36 شهرًا',
    sellByKm: '100–120 ألف كم',
    maintenanceMonthlyMin: 360,
    maintenanceMonthlyMax: 430,
    oilBottles: 4,
    oilChangeCost: 71,
  },
  {
    id: 'pegas',
    nameAr: 'كيا بيجاس',
    nameEn: 'Kia Pegas',
    model: 'ستاندر 2026',
    priceBeforeVAT: 43_500,
    vat: 6_525,
    priceInclVAT: 50_025,
    launchIncluded: true,
    launchReason: 'ممتازة في العلاقة بين السعر والعائد؛ أفضل سيارات بداية الفئة الاقتصادية',
    risks: 'ثقة السوق دون يارس/أكسنت',
    verdict: 'مناسبة بقوة (4 في السيناريو الموصى به واقعيًا)',
    sellByMonths: '30–36 شهرًا',
    sellByKm: '100–120 ألف كم',
    maintenanceMonthlyMin: 360,
    maintenanceMonthlyMax: 430,
    oilBottles: 4,
    oilChangeCost: 71,
  },
  {
    id: 'yaris',
    nameAr: 'تويوتا يارس',
    nameEn: 'Toyota Yaris',
    model: 'Y 2026',
    priceBeforeVAT: 53_000,
    vat: 7_950,
    priceInclVAT: 60_950,
    launchIncluded: true,
    launchReason: 'أفضل ثقة وبيعًا لاحقًا وأقوى في العقود الشهرية',
    risks: 'أعلى كلفة من بيجاس وi10',
    verdict: 'عمود أساسي (7 في السيناريو الثاني الموصى به)',
    sellByMonths: '36 شهرًا',
    sellByKm: '120–140 ألف كم',
    maintenanceMonthlyMin: 360,
    maintenanceMonthlyMax: 430,
    oilBottles: 4,
    oilChangeCost: 71,
  },
  {
    id: 'accent',
    nameAr: 'هيونداي أكسنت',
    nameEn: 'Hyundai Accent',
    model: 'فليت 2026',
    priceBeforeVAT: 56_500,
    vat: 8_475,
    priceInclVAT: 64_975,
    launchIncluded: true,
    launchReason: 'حجر الأساس التشغيلي؛ طلب متوازن وصيانة مفهومة وسمعة مستقرة',
    risks: 'منخفض — الأكثر توازنًا',
    verdict: 'لا يُتفاوض عليه في الإطلاق (7 في السيناريو الثاني)',
    sellByMonths: '36 شهرًا',
    sellByKm: '120–140 ألف كم',
    maintenanceMonthlyMin: 360,
    maintenanceMonthlyMax: 430,
    oilBottles: 4,
    oilChangeCost: 71,
  },
  {
    id: 'elantra',
    nameAr: 'هيونداي إلنترا',
    nameEn: 'Hyundai Elantra',
    model: 'سمارت 2026',
    priceBeforeVAT: 70_500,
    vat: 10_575,
    priceInclVAT: 81_075,
    launchIncluded: true,
    launchReason: 'ضرورية بعدد محدود لرفع متوسط التذكرة والعقود الشهرية الأفضل',
    risks: 'لا تزيد عن 2–3 في الإطلاق',
    verdict: 'مناسبة بعدد محدود (2 في السيناريو الموصى به)',
    sellByMonths: '30–36 شهرًا',
    sellByKm: '110–130 ألف كم',
    maintenanceMonthlyMin: 420,
    maintenanceMonthlyMax: 500,
    oilBottles: 4.5,
    oilChangeCost: 78,
  },
  {
    id: 'taurus',
    nameAr: 'فورد تورس',
    nameEn: 'Ford Taurus',
    model: 'أمبيانتي 2026',
    priceBeforeVAT: 105_500,
    vat: 15_825,
    priceInclVAT: 121_325,
    launchIncluded: false,
    launchReason: 'ليست "فاخرة" لكنها تستهلك رأس مال مبكرًا وتخفض مرونة التوسع',
    risks: 'capital lock + maintenance burden؛ أعلى تكلفة صيانة شهرية',
    verdict: 'لا أوصي بها في يوم الإطلاق الأول — للمرحلة اللاحقة إن لزم',
    sellByMonths: 'يحتاج تحقق لاحق',
    sellByKm: 'يحتاج تحقق لاحق',
    maintenanceMonthlyMin: 600,
    maintenanceMonthlyMax: 750,
    oilBottles: 5,
    oilChangeCost: 90,
  },
];
