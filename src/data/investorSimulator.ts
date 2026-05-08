// DEMO / SAMPLE DATA — This is illustrative only
// All values are fictional and clearly labeled as demo data
// They do NOT represent actual investor returns or project performance

export const DEMO_DISCLAIMER =
  'هذه محاكاة توضيحية لما يمكن أن يراه المستثمر لاحقًا عند إنشاء منصة المستثمر، وليست بيانات فعلية.';

// Sample investor dashboard data (demo only)
export const sampleInvestorData = {
  // Investor profile (demo)
  investorName: 'محمد العمر — بيانات تجريبية',
  shares: 40,
  sharePrice: 775,
  totalInvestment: 31_000,
  ownershipPct: 2.0,
  investmentDate: '2025-01-01',

  // Project-level (demo monthly snapshot)
  totalCapitalRaised: 1_550_000,
  monthlyRevenue: 62_415,
  monthlyExpenses: 51_303,
  monthlyNetOperating: 11_112,
  carsRentedToday: 15,
  occupancyRatePct: 75,
  activeContracts: 18,

  // Financial records (demo)
  invoices: [
    { id: 'INV-001', date: '2025-03-01', amount: 2_690, status: 'مدفوع', type: 'عقد شهري', note: 'بيانات تجريبية' },
    { id: 'INV-002', date: '2025-03-05', amount: 645, status: 'مدفوع', type: 'يومي', note: 'بيانات تجريبية' },
    { id: 'INV-003', date: '2025-03-10', amount: 2_490, status: 'مدفوع', type: 'عقد شركة', note: 'بيانات تجريبية' },
  ],
  receiptVouchers: [
    { id: 'RV-001', date: '2025-03-01', amount: 2_690, from: 'عميل شهري', note: 'بيانات تجريبية' },
    { id: 'RV-002', date: '2025-03-05', amount: 645, from: 'عميل يومي', note: 'بيانات تجريبية' },
  ],

  // Expenses breakdown (demo)
  vehiclePurchases: [
    { date: '2025-01-15', vehicle: 'هيونداي أكسنت 2026', amount: 64_975, note: 'بيانات تجريبية' },
    { date: '2025-01-15', vehicle: 'تويوتا يارس Y 2026', amount: 60_950, note: 'بيانات تجريبية' },
  ],
  maintenanceCosts: [
    { date: '2025-03-05', vehicle: 'YRS-001', type: 'تغيير زيت', amount: 71, note: 'بيانات تجريبية' },
    { date: '2025-03-08', vehicle: 'ACC-003', type: 'كفرات', amount: 500, note: 'بيانات تجريبية' },
  ],
  insuranceCosts: [
    { date: '2025-01-15', period: 'سنة 2025', totalAmount: 83_600, note: 'بيانات تجريبية' },
  ],
  trafficViolations: [
    { date: '2025-02-20', vehicle: 'ACC-002', type: 'سرعة زائدة', amount: 300, status: 'مسدد', note: 'بيانات تجريبية' },
  ],
  insuranceClaims: [
    { date: '2025-02-10', vehicle: 'YRS-003', type: 'حادث بسيط', claimAmount: 8_000, repairCost: 5_200, status: 'مغلق', note: 'بيانات تجريبية' },
  ],

  // Management decisions (demo)
  managementDecisions: [
    { date: '2025-01-05', decision: 'اعتماد سياسة الحجز المالي وSLA فك الحجز', note: 'بيانات تجريبية' },
    { date: '2025-02-01', decision: 'بدء عقود شهرية مع 3 شركات صغيرة', note: 'بيانات تجريبية' },
    { date: '2025-03-01', decision: 'تفعيل نظام تقييم Google بعد كل عقد', note: 'بيانات تجريبية' },
  ],

  // Monthly reports (demo)
  monthlyReports: [
    { month: 'يناير 2025', occupancy: '48%', revenue: 41_200, expenses: 47_800, netOp: -6_600, note: 'بيانات تجريبية' },
    { month: 'فبراير 2025', occupancy: '61%', revenue: 52_100, expenses: 49_500, netOp: 2_600, note: 'بيانات تجريبية' },
    { month: 'مارس 2025', occupancy: '75%', revenue: 62_415, expenses: 51_303, netOp: 11_112, note: 'بيانات تجريبية' },
  ],

  // Growth log (demo)
  expansionLog: [
    { date: '2025-01-15', event: 'إطلاق 20 سيارة (السيناريو الثاني)', note: 'بيانات تجريبية' },
  ],

  // Risk alerts (demo)
  riskAlerts: [
    { date: '2025-02-05', risk: 'إشغال يناير 48% — دون المستهدف', action: 'تعزيز تسويق خرائط Google + عروض شهرية', severity: 'متوسط', note: 'بيانات تجريبية' },
  ],
};
