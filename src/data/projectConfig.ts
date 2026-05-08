// Project configuration — edit this file to update branding and core info
export const projectConfig = {
  nameAr: 'سند لتأجير السيارات',
  nameEn: 'SANAD Rent',
  taglineAr: 'سيارة واضحة · عقد واضح · استرجاع واضح',
  taglineEn: 'Clear Car · Clear Contract · Clear Return',
  city: 'حائل',
  country: 'المملكة العربية السعودية',
  licenseType: 'فئة (د)',
  legalForm: 'شركة ذات مسؤولية محدودة',

  // Investment structure
  targetCapital: 1_550_000,
  totalShares: 2000,
  sharePrice: 775,
  launchFleetSize: 20,
  breakEvenOccupancy: 51, // %
  noDistributionMonths: 24,

  // Distribution policy after 24 months
  distributionPolicy: {
    management: 20,
    developmentAndReserve: 30,
    investors: 50,
  },

  // Recommended scenario
  recommendedScenario: 'scenario2',

  // Contact
  ownerName: 'عبدالعزيز محمد العنزي',
  contactPhone: '0500772878',
  contactEmail: '',

  // Disclaimer
  disclaimer:
    'هذا الموقع لا يمثل طرحًا عامًا للأوراق المالية، ولا وعدًا بعائد، ولا توصية استثمارية ملزمة. الأرقام مبنية على دراسة جدوى وافتراضات تشغيلية قابلة للتغيير. يجب مراجعة مستشار قانوني ومالي قبل اتخاذ أي قرار استثماري.',
};
