// All financial data extracted from docs/FINAL_STUDY.md
// Do NOT hardcode these values in components — always import from here

export const initialInvestment = {
  vehicles20InclVAT: 1_240_275,
  comprehensiveInsuranceYear1: 83_600,
  gpsPlatesRegistration: 14_000,
  officeSetup: 35_000,
  incorporationLegalFees: 4_500,
  municipalitySafetySetup: 9_000,
  depositRentAdvance: 25_000,
  launchMarketing: 10_000,
  workingCapitalReserve: 125_000,
  total: 1_546_375,
  roundedTotal: 1_550_000,
};

// Monthly fixed operating expenses (scenario 2, owner-operator model)
export const monthlyFixedExpenses = {
  officeRent: 5_000,
  twoSaudiEmployees: 10_000,
  preparationWorker: 2_500,
  externalAccountant: 1_200,
  internetPhone: 350,
  electricityWater: 600,
  rentalManagementSystem: 1_000,
  gpsSubscription: 360,
  digitalMarketing: 2_000,
  officeSupplies: 220,
  paperPrinting: 180,
  stationery: 60,
  printerRolls: 40,
  hospitality: 180,
  cleaningSupplies: 150,
  bankFeesPOS: 400,
  operationalEmergencyReserve: 2_000,
  totalFixed: 26_240,
};

// Fleet-level monthly costs (scenario 2)
export const monthlyFleetCosts = {
  insuranceGpsDocs: 7_500,
  // Variable costs by occupancy %
  variableAt45: 5_900,
  variableAt60: 7_800,
  variableAt75: 9_900,
  variableAt85: 11_100,
};

// Revenue and net operating cash flow (scenario 2)
export interface OccupancyRow {
  occupancy: number;
  monthlyRevenue: number;
  totalOperatingCost: number;
  netOperatingCashFlow: number;
}

export const revenueByOccupancy: OccupancyRow[] = [
  { occupancy: 45, monthlyRevenue: 37_449, totalOperatingCost: 47_379, netOperatingCashFlow: -9_930 },
  { occupancy: 60, monthlyRevenue: 49_932, totalOperatingCost: 49_341, netOperatingCashFlow: 591 },
  { occupancy: 75, monthlyRevenue: 62_415, totalOperatingCost: 51_303, netOperatingCashFlow: 11_112 },
  { occupancy: 85, monthlyRevenue: 70_738, totalOperatingCost: 52_612, netOperatingCashFlow: 18_126 },
];

// Profit distribution conditions — all must be met simultaneously
export const distributionConditions = [
  'لا توجد غرامات أو التزامات نظامية متأخرة',
  'السيولة الحرة ≥ 4 أشهر مصروفات ثابتة',
  'لا توجد مطالبات تأمين كبيرة مفتوحة دون مخصص',
  'إشغال آخر 6 أشهر ≥ 58%',
  'في حال وجود تمويل: DSCR ≥ 1.3 بعد التوزيع',
];

// Financing assumptions (modeled conservatively, NOT actual bank offers)
export const financingAssumptions = {
  note: 'هذه نمذجة محافظة وليست عروض بنكية فعلية',
  termMonths: 60,
  downPaymentPct: 20,
  annualRatePct: 8.5,
  maxDebtPctOfRevenue: 25,
  maxDebtPctOfOperatingCashFlow: 35,
  minDSCR: 1.5,
  // Monthly installment per vehicle (approx)
  estimatedInstallmentPerVehicle: {
    i10: 793,
    pegas: 821,
    yaris: 1_000,
    accent: 1_066,
    elantra: 1_331,
    taurus: 1_991,
  },
};

// Additional revenue sources
export const additionalRevenueSources = [
  { source: 'الكيلومترات الزائدة', method: 'مكتوبة صراحة في العقد', inBudget: true, note: '3–5% من الإيراد' },
  { source: 'التوصيل والاستلام', method: 'رسوم خدمة واضحة', inBudget: true, note: 'محافظًا' },
  { source: 'عقود الشركات', method: 'خصم مقابل التزام مدة', inBudget: true, note: 'بقوة' },
  { source: 'الاشتراكات الشهرية', method: 'تثبيت إشغال أساسي', inBudget: true, note: '' },
  { source: 'غرامة التدخين', method: 'فقط إذا مثبتة بالعقد والصور', inBudget: false, note: 'لا تبنى إيرادًا أساسيًا' },
  { source: 'التأخير في الإرجاع', method: 'وفق البند المكتوب وفترة السماح', inBudget: false, note: 'لا تبنى إيرادًا أساسيًا' },
  { source: 'البيع الدوري للسيارات', method: 'ربح/تدوير أصول', inBudget: true, note: 'في التخطيط الرأسمالي' },
  { source: 'فرق تعويض التأمين', method: 'فقط إذا نتج نظاميًا وبشفافية', inBudget: false, note: 'لا يُبنى عليه كنشاط ربحي أساسي' },
];
