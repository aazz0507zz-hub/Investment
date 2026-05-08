// Pricing strategy extracted from docs/FINAL_STUDY.md
// Prices are inclusive of VAT, targeting consumer market

export interface VehiclePricing {
  vehicleId: string;
  nameAr: string;
  daily: number;
  weekly: number;
  monthly: number;
  extraKmPrice: number;
  openKmOneDay: number;
  openKmTwoPlusDays: number;
  corporateMonthly: number;
  floorPrice: number;
}

export const vehiclePricing: VehiclePricing[] = [
  {
    vehicleId: 'i10',
    nameAr: 'i10',
    daily: 109,
    weekly: 665,
    monthly: 2_050,
    extraKmPrice: 0.70,
    openKmOneDay: 185,
    openKmTwoPlusDays: 155,
    corporateMonthly: 1_890,
    floorPrice: 79,
  },
  {
    vehicleId: 'dzire',
    nameAr: 'ديزاير',
    daily: 109,
    weekly: 665,
    monthly: 2_080,
    extraKmPrice: 0.70,
    openKmOneDay: 190,
    openKmTwoPlusDays: 160,
    corporateMonthly: 1_920,
    floorPrice: 79,
  },
  {
    vehicleId: 'pegas',
    nameAr: 'بيجاس',
    daily: 115,
    weekly: 720,
    monthly: 2_290,
    extraKmPrice: 0.75,
    openKmOneDay: 195,
    openKmTwoPlusDays: 162,
    corporateMonthly: 2_150,
    floorPrice: 85,
  },
  {
    vehicleId: 'yaris',
    nameAr: 'يارس',
    daily: 125,
    weekly: 790,
    monthly: 2_650,
    extraKmPrice: 0.85,
    openKmOneDay: 215,
    openKmTwoPlusDays: 175,
    corporateMonthly: 2_490,
    floorPrice: 99,
  },
  {
    vehicleId: 'accent',
    nameAr: 'أكسنت',
    daily: 129,
    weekly: 810,
    monthly: 2_690,
    extraKmPrice: 0.85,
    openKmOneDay: 215,
    openKmTwoPlusDays: 175,
    corporateMonthly: 2_490,
    floorPrice: 99,
  },
  {
    vehicleId: 'elantra',
    nameAr: 'إلنترا',
    daily: 155,
    weekly: 970,
    monthly: 3_390,
    extraKmPrice: 1.00,
    openKmOneDay: 255,
    openKmTwoPlusDays: 205,
    corporateMonthly: 3_050,
    floorPrice: 125,
  },
  {
    vehicleId: 'taurus',
    nameAr: 'تورس',
    daily: 255,
    weekly: 1_590,
    monthly: 5_450,
    extraKmPrice: 1.30,
    openKmOneDay: 365,
    openKmTwoPlusDays: 308,
    corporateMonthly: 4_950,
    floorPrice: 210,
  },
];

// Price increase triggers (any one of these for 3 consecutive weeks)
export const priceIncreaseSignals = [
  'إشغال 14 يومًا قادمًا فوق 78%',
  'امتلاء عطلات نهاية الأسبوع فوق 90%',
  'أكثر من 25 حالة فقد حجز شهريًا بسبب عدم التوفر',
];

// Price decrease triggers
export const priceDecreaseSignals = [
  'إشغال 21 يومًا قادمًا أقل من 52%',
  'زيادة وقت بقاء السيارة الشاغرة فوق 5 أيام',
  'ارتفاع نسبة الحجز الشهري منخفض الهامش دون دوران نقدي',
];

// Pricing philosophy
export const pricingPhilosophy = {
  maxCompetitorDiscountPct: 8,
  strategicMessage: 'الهدف ليس أن نكون الأرخص، بل أن نكون الأكثر وضوحًا وانضباطًا.',
  competitiveEdge: [
    'تأمين واضح',
    'كيلومترات واضحة',
    'صور قبل/بعد',
    'لا مفاجآت بعد الحجز',
  ],
};

// Deposit amounts
export const depositAmounts = [
  { category: 'i10 / بيجاس / ديزاير', amount: 1_000 },
  { category: 'أكسنت / يارس', amount: 1_200 },
  { category: 'إلنترا', amount: 1_500 },
  { category: 'تورس', amount: 2_500 },
];
