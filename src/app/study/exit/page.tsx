'use client';

import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line,
} from 'recharts';
import { useInvestor } from '@/contexts/InvestorContext';
import { fleetScenarios } from '@/data/scenarios';
import { projectConfig } from '@/data/projectConfig';
import { initialInvestment } from '@/data/financials';
import { createExitRequest } from '@/lib/exitRequests';
import { formatCurrency } from '@/lib/utils';
import { calculateRevenue, calculateExpenses } from '@/lib/calculations';
import { StudyPrevNext } from '@/components/StudySidebar';

// Conservative fleet depreciation rates (clearly labeled as assumptions)
// Source: conservative industry estimates — label "افتراض محافظ"
const DEPRECIATION_BY_YEAR: Record<number, number> = {
  1: 0.80,
  2: 0.68,
  3: 0.58,
  4: 0.49,
  5: 0.42,
  10: 0.22,
};

// Non-fleet startup costs (spent, non-recoverable or partially recoverable)
const NON_FLEET_COSTS =
  initialInvestment.comprehensiveInsuranceYear1 +
  initialInvestment.gpsPlatesRegistration +
  initialInvestment.officeSetup +
  initialInvestment.incorporationLegalFees +
  initialInvestment.municipalitySafetySetup +
  initialInvestment.launchMarketing;
// depositRentAdvance is partially recoverable, workingCapitalReserve is cash

const EXIT_YEARS = [1, 2, 3, 4, 5, 10];

interface YearlyProjection {
  year: number;
  annualNet: number;
  retainedCumulative: number;
  investorDistributions: number;
  investorDistributionsCumulative: number;
  fleetResaleValue: number;
  cashReserve: number;
  outstandingDebt: number;
  claimsReserve: number;
  companyNAV: number;
  investorGrossExitValue: number;
}

function computeYearlyProjections(
  scenarioId: string,
  shares: number,
  occupancyPct: number,
  dailyPriceChangePct: number,
  maintenanceIncreasePct: number,
  insuranceIncreasePct: number,
  financingEnabled: boolean,
  financingPct: number,
  distributionsEnabled: boolean,
  exitDiscountPct: number
): YearlyProjection[] {
  const scenario = fleetScenarios.find((s) => s.id === scenarioId) ?? fleetScenarios[1];
  const ownershipPct = shares / projectConfig.totalShares;

  // Monthly calculations
  const monthlyRevenue = calculateRevenue(
    scenario.revenueAt75,
    occupancyPct,
    dailyPriceChangePct
  );
  const monthlyExpenses = calculateExpenses(
    scenario.vehicleCount,
    occupancyPct,
    maintenanceIncreasePct,
    insuranceIncreasePct
  );
  const monthlyNet = monthlyRevenue - monthlyExpenses;
  const annualNet = monthlyNet * 12;

  // Fleet cost = scenario capital - non-fleet costs
  const fleetCost = scenario.requiredCapital - NON_FLEET_COSTS;

  // Initial cash reserve
  const initialCash = initialInvestment.workingCapitalReserve + initialInvestment.depositRentAdvance;

  // Outstanding debt calculation (if financing)
  const financedAmount = financingEnabled ? fleetCost * (financingPct / 100) : 0;
  const annualRate = 0.085;
  const monthlyRate = annualRate / 12;
  const loanTermMonths = 60;
  const monthlyInstallment =
    financedAmount > 0
      ? financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
      : 0;
  const annualInstallment = monthlyInstallment * 12;

  const projections: YearlyProjection[] = [];
  let retainedCumulative = 0;
  let investorDistCumulative = 0;
  let cashReserve = initialCash;

  for (const year of EXIT_YEARS) {
    // Compute cumulative through this year
    let yearRetained = retainedCumulative;
    let yearInvestorDist = investorDistCumulative;
    let yearCash = cashReserve;

    // Simulate each year from last projection to this year
    const fromYear = projections.length > 0 ? projections[projections.length - 1].year + 1 : 1;
    const toYear = year;

    for (let y = fromYear; y <= toYear; y++) {
      const positiveNet = Math.max(0, annualNet);
      const netForYear = annualNet; // can be negative

      if (y <= 2) {
        // No distributions
        yearRetained += Math.max(0, netForYear);
        if (netForYear < 0) yearCash += netForYear; // drain cash if loss
      } else if (distributionsEnabled) {
        // Distribute 50% of positive profits to investors
        const distributable = positiveNet;
        const investorShare = distributable * 0.5 * ownershipPct;
        const retained = distributable * 0.5 + (netForYear < 0 ? netForYear : 0);
        yearInvestorDist += investorShare;
        yearRetained += Math.max(0, retained);
        if (netForYear < 0) yearCash += netForYear;
      } else {
        // Distributions not enabled — all retained
        yearRetained += Math.max(0, netForYear);
        if (netForYear < 0) yearCash += netForYear;
      }

      // Subtract debt installments from cash
      if (financingEnabled && y <= 5) {
        yearCash -= annualInstallment;
      }
    }

    retainedCumulative = yearRetained;
    investorDistCumulative = yearInvestorDist;
    cashReserve = yearCash;

    // Fleet depreciation at this exit year
    const deprKeys = Object.keys(DEPRECIATION_BY_YEAR).map(Number).sort((a, b) => a - b);
    let deprRate = DEPRECIATION_BY_YEAR[year];
    if (!deprRate) {
      // Interpolate between known points
      const below = deprKeys.filter((k) => k <= year).pop() ?? 5;
      const above = deprKeys.filter((k) => k >= year)[0] ?? 10;
      if (below === above) {
        deprRate = DEPRECIATION_BY_YEAR[below];
      } else {
        const ratio = (year - below) / (above - below);
        deprRate = DEPRECIATION_BY_YEAR[below] + ratio * (DEPRECIATION_BY_YEAR[above] - DEPRECIATION_BY_YEAR[below]);
      }
    }
    const fleetResaleValue = Math.max(0, fleetCost * deprRate);

    // Outstanding debt at exit year
    let outstandingDebt = 0;
    if (financingEnabled && year < 5) {
      const paidMonths = year * 12;
      const remainingMonths = Math.max(0, loanTermMonths - paidMonths);
      // Remaining balance approximation using present value of remaining payments
      outstandingDebt =
        remainingMonths > 0
          ? monthlyInstallment * (1 - Math.pow(1 + monthlyRate, -remainingMonths)) / monthlyRate
          : 0;
    }

    // Claims reserve: 2% of fleet resale value (conservative)
    const claimsReserve = fleetResaleValue * 0.02;

    // Company NAV
    const companyNAV =
      fleetResaleValue +
      Math.max(0, cashReserve) +
      Math.max(0, retainedCumulative) -
      Math.max(0, outstandingDebt) -
      claimsReserve;

    // Investor exit value
    const investorGrossExitValue = Math.max(0, companyNAV) * ownershipPct;

    projections.push({
      year,
      annualNet,
      retainedCumulative: Math.max(0, retainedCumulative),
      investorDistributions: investorDistCumulative,
      investorDistributionsCumulative: investorDistCumulative,
      fleetResaleValue,
      cashReserve: Math.max(0, cashReserve),
      outstandingDebt: Math.max(0, outstandingDebt),
      claimsReserve,
      companyNAV,
      investorGrossExitValue,
    });
  }

  return projections;
}

export default function ExitPage() {
  const { draft } = useInvestor();

  const [shares, setShares] = useState(draft.shares || 10);
  const [exitYear, setExitYear] = useState(3);
  const [scenarioId, setScenarioId] = useState('scenario2');
  const [occupancy, setOccupancy] = useState(65);
  const [dailyPriceChange, setDailyPriceChange] = useState(0);
  const [maintenanceIncrease, setMaintenanceIncrease] = useState(0);
  const [insuranceIncrease, setInsuranceIncrease] = useState(0);
  const [financingEnabled, setFinancingEnabled] = useState(false);
  const [financingPct, setFinancingPct] = useState(0);
  const [distributionsEnabled, setDistributionsEnabled] = useState(true);
  const [exitDiscountPct, setExitDiscountPct] = useState(10);
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const ownershipPct = (shares / projectConfig.totalShares) * 100;
  const originalCapital = shares * projectConfig.sharePrice;

  const projections = useMemo(
    () =>
      computeYearlyProjections(
        scenarioId,
        shares,
        occupancy,
        dailyPriceChange,
        maintenanceIncrease,
        insuranceIncrease,
        financingEnabled,
        financingPct,
        distributionsEnabled,
        exitDiscountPct
      ),
    [
      scenarioId, shares, occupancy, dailyPriceChange,
      maintenanceIncrease, insuranceIncrease, financingEnabled,
      financingPct, distributionsEnabled, exitDiscountPct,
    ]
  );

  const selectedProjection = projections.find((p) => p.year === exitYear) ?? projections[0];

  const liquidityDiscount = selectedProjection.investorGrossExitValue * (exitDiscountPct / 100);
  const estimatedExitValue =
    selectedProjection.investorGrossExitValue -
    liquidityDiscount +
    selectedProjection.investorDistributionsCumulative;

  const estimatedProfitLoss = estimatedExitValue - originalCapital;
  const estimatedROI = originalCapital > 0 ? (estimatedProfitLoss / originalCapital) * 100 : 0;

  // Three scenarios (conservative/base/optimistic) using different depreciation bias
  const conservativeNAV = selectedProjection.companyNAV * 0.85;
  const optimisticNAV = selectedProjection.companyNAV * 1.15;

  const conservativeExit = Math.max(0, conservativeNAV) * (shares / projectConfig.totalShares) * (1 - (exitDiscountPct + 5) / 100) + selectedProjection.investorDistributionsCumulative;
  const optimisticExit = Math.max(0, optimisticNAV) * (shares / projectConfig.totalShares) * (1 - Math.max(0, exitDiscountPct - 5) / 100) + selectedProjection.investorDistributionsCumulative;

  const chartData = projections.map((p) => ({
    year: `السنة ${p.year}`,
    'قيمة الأسطول': Math.round(p.fleetResaleValue),
    'الأرباح المحتجزة': Math.round(p.retainedCumulative),
    'توزيعات المستثمر': Math.round(p.investorDistributionsCumulative),
    'قيمة حصة المستثمر': Math.round(p.investorGrossExitValue),
    'صافي قيمة الشركة': Math.round(Math.max(0, p.companyNAV)),
  }));

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitState('idle');

    const result = await createExitRequest({
      fullName: draft.fullName || 'غير محدد',
      mobile: draft.phone || '',
      email: draft.email || '',
      shares,
      investmentAmount: originalCapital,
      ownershipPercentage: ownershipPct,
      selectedExitYear: exitYear,
      selectedScenario: scenarioId,
      occupancy,
      dailyPriceChange,
      maintenanceIncrease,
      insuranceIncrease,
      financingEnabled,
      financingPercentage: financingPct,
      distributionsEnabled,
      distributionPercentage: 50,
      exitDiscountPercentage: exitDiscountPct,
      estimatedCompanyNAV: selectedProjection.companyNAV,
      grossExitValue: selectedProjection.investorGrossExitValue,
      estimatedExitValue,
      originalCapital,
      estimatedProfitLoss,
      estimatedROI,
      notes,
    });

    setSubmitting(false);
    if (result.success) {
      setSubmitState('success');
    } else {
      setSubmitState('error');
      setSubmitError(result.error ?? 'تعذر إرسال الطلب');
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-base)]">حاسبة خروج المستثمر التقديرية</h1>
        <p className="text-[var(--text-muted)] mt-2">
          احسب القيمة التقديرية التي قد تستلمها إذا قررت الخروج في سنة محددة
        </p>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-700 rounded-xl p-5 text-sm text-amber-800 dark:text-amber-300 space-y-2">
        <div className="font-bold text-base">⚠️ تنبيه مهم — اقرأ قبل الاستخدام</div>
        <p>
          هذه الحاسبة <strong>تقديرية فقط</strong>، ولا تمثل وعدًا بإعادة شراء الحصة أو ضمانًا للتخارج.
          قيمة التخارج الفعلية تعتمد على: <strong>قيمة الأصول وقت التخارج</strong>، النقد المتاح،
          الالتزامات، نتائج التشغيل، وقرار الشركاء أو آلية التخارج النظامية.
        </p>
        <p>
          في أول 24 شهر <strong>لا توجد توزيعات أرباح</strong> حسب سياسة الدراسة.
          أي قيمة تخارج في السنة الأولى أو الثانية تعتمد غالبًا على صافي قيمة الأصول وليس على توزيعات نقدية.
        </p>
        <p>
          إذا كانت نسبة التشغيل أقل من نقطة التعادل ({projectConfig.breakEvenOccupancy}٪)،
          قد تكون قيمة التخارج <strong>أقل من رأس المال الأصلي</strong>.
        </p>
        <p className="text-xs opacity-70">معدلات الاستهلاك المستخدمة: افتراضات محافظة — غير مؤكدة من وكيل رسمي.</p>
      </div>

      {/* Inputs */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--text-base)]">المدخلات</h2>

          {/* Shares */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">
              عدد الأسهم ({ownershipPct.toFixed(2)}٪ من المشروع)
            </label>
            <input
              type="number"
              min={1}
              max={2000}
              value={shares}
              onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
            />
            <div className="text-xs text-[var(--text-muted)] mt-1">
              رأس المال الأصلي: {formatCurrency(originalCapital)}
            </div>
          </div>

          {/* Exit year */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-base)]">سنة التخارج</label>
            <div className="flex flex-wrap gap-2">
              {EXIT_YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setExitYear(y)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    exitYear === y
                      ? 'bg-forest text-ivory border-forest'
                      : 'border-[var(--border)] text-[var(--text-muted)] hover:border-forest/50'
                  }`}
                >
                  {y === 10 ? 'السنة 10' : `السنة ${y}`}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">سيناريو الأسطول</label>
            <select
              value={scenarioId}
              onChange={(e) => setScenarioId(e.target.value)}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--card-bg)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50"
            >
              {fleetScenarios.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Occupancy */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">
              نسبة التشغيل المتوقعة: <span className="text-gold font-bold">{occupancy}٪</span>
              {occupancy < projectConfig.breakEvenOccupancy && (
                <span className="text-red-500 text-xs mr-2">⚠️ أقل من نقطة التعادل</span>
              )}
            </label>
            <input
              type="range"
              min={45}
              max={85}
              value={occupancy}
              onChange={(e) => setOccupancy(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
              <span>45٪</span>
              <span>نقطة التعادل: {projectConfig.breakEvenOccupancy}٪</span>
              <span>85٪</span>
            </div>
          </div>

          {/* Daily price change */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">
              تغيّر السعر اليومي: <span className="text-gold font-bold">{dailyPriceChange > 0 ? '+' : ''}{dailyPriceChange}٪</span>
            </label>
            <input
              type="range"
              min={-20}
              max={20}
              value={dailyPriceChange}
              onChange={(e) => setDailyPriceChange(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Maintenance */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">
              زيادة الصيانة: <span className="text-gold font-bold">{maintenanceIncrease}٪</span>
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={maintenanceIncrease}
              onChange={(e) => setMaintenanceIncrease(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Insurance increase */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">
              زيادة التأمين: <span className="text-gold font-bold">{insuranceIncrease}٪</span>
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={insuranceIncrease}
              onChange={(e) => setInsuranceIncrease(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Financing */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-base)]">هل يوجد تمويل على السيارات؟</label>
            <div className="flex gap-3">
              {(['لا', 'نعم'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFinancingEnabled(opt === 'نعم')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    financingEnabled === (opt === 'نعم')
                      ? 'bg-forest text-ivory border-forest'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {financingEnabled && (
              <div className="mt-2">
                <label className="block text-xs text-[var(--text-muted)] mb-1">
                  نسبة التمويل: <span className="text-gold font-bold">{financingPct}٪</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={financingPct}
                  onChange={(e) => setFinancingPct(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  معدل الفائدة التقديري: 8.5٪ سنويًا / 60 شهرًا — افتراض محافظ
                </div>
              </div>
            )}
          </div>

          {/* Distributions */}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-base)]">هل تم توزيع أرباح بعد السنة الثانية؟</label>
            <div className="flex gap-3">
              {(['نعم', 'لا'] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDistributionsEnabled(opt === 'نعم')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    distributionsEnabled === (opt === 'نعم')
                      ? 'bg-forest text-ivory border-forest'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {distributionsEnabled && (
              <div className="text-xs text-[var(--text-muted)] mt-1">
                نسبة المستثمرين: 50٪ من الأرباح القابلة للتوزيع (سياسة ثابتة)
              </div>
            )}
          </div>

          {/* Exit discount */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">
              خصم تخارج تقديري: <span className="text-gold font-bold">{exitDiscountPct}٪</span>
            </label>
            <input
              type="range"
              min={0}
              max={20}
              value={exitDiscountPct}
              onChange={(e) => setExitDiscountPct(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-[var(--text-muted)] mt-1">
              يمثل تكاليف وصعوبات بيع الحصة — المحافظ: 15–20٪
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--text-base)]">النتائج التقديرية — نهاية السنة {exitYear}</h2>

          {/* Main result */}
          <div className={`rounded-xl p-6 space-y-1 text-center ${
            estimatedExitValue >= originalCapital
              ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className="text-sm text-[var(--text-muted)]">القيمة التقديرية عند التخارج</div>
            <div className="text-4xl font-extrabold text-gold">{formatCurrency(Math.round(estimatedExitValue))}</div>
            <div className={`text-sm font-bold ${estimatedProfitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {estimatedProfitLoss >= 0 ? '+' : ''}{formatCurrency(Math.round(estimatedProfitLoss))} ({estimatedROI.toFixed(1)}٪)
            </div>
          </div>

          {/* Three scenarios */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'متحفظ', value: conservativeExit, color: 'text-red-500 dark:text-red-400' },
              { label: 'أساسي', value: estimatedExitValue, color: 'text-[var(--text-base)]' },
              { label: 'متفائل', value: optimisticExit, color: 'text-green-500 dark:text-green-400' },
            ].map((s) => (
              <div key={s.label} className="border border-[var(--border)] rounded-xl p-3 bg-[var(--card-bg)] text-center">
                <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
                <div className={`text-sm font-bold mt-1 ${s.color}`}>{formatCurrency(Math.round(Math.max(0, s.value)))}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-[var(--text-muted)] text-center">متحفظ = استهلاك أسرع + خصم أكبر · متفائل = استهلاك أبطأ + خصم أقل</div>

          {/* Breakdown */}
          <div className="border border-[var(--border)] rounded-xl divide-y divide-[var(--border)] bg-[var(--card-bg)] text-sm">
            {[
              { label: 'رأس المال الأصلي', value: formatCurrency(originalCapital) },
              { label: 'عدد الأسهم', value: `${shares} سهم` },
              { label: 'نسبة الملكية', value: `${ownershipPct.toFixed(3)}٪` },
              { label: 'قيمة الأسطول التقديرية', value: formatCurrency(Math.round(selectedProjection.fleetResaleValue)), note: 'افتراض محافظ' },
              { label: 'النقد والاحتياطي', value: formatCurrency(Math.round(selectedProjection.cashReserve)) },
              { label: 'الأرباح المحتجزة', value: formatCurrency(Math.round(selectedProjection.retainedCumulative)) },
              { label: 'الالتزامات والديون', value: `(${formatCurrency(Math.round(selectedProjection.outstandingDebt))})`, neg: true },
              { label: 'مخصص الحوادث والمطالبات', value: `(${formatCurrency(Math.round(selectedProjection.claimsReserve))})`, neg: true },
              { label: 'صافي قيمة الشركة التقديرية', value: formatCurrency(Math.round(Math.max(0, selectedProjection.companyNAV))), bold: true },
              { label: 'قيمة حصة المستثمر (قبل الخصم)', value: formatCurrency(Math.round(selectedProjection.investorGrossExitValue)) },
              { label: `خصم التخارج (${exitDiscountPct}٪)`, value: `(${formatCurrency(Math.round(liquidityDiscount))})`, neg: true },
              { label: 'التوزيعات المستلمة سابقًا', value: formatCurrency(Math.round(selectedProjection.investorDistributionsCumulative)) },
              { label: 'القيمة التقديرية للتخارج', value: formatCurrency(Math.round(estimatedExitValue)), bold: true, highlight: true },
              { label: 'الربح / الخسارة التقديرية', value: (estimatedProfitLoss >= 0 ? '+' : '') + formatCurrency(Math.round(estimatedProfitLoss)), bold: true },
              { label: 'نسبة العائد التقديرية', value: estimatedROI.toFixed(1) + '٪', bold: true },
            ].map((row, i) => (
              <div key={i} className={`flex justify-between px-4 py-2.5 ${row.highlight ? 'bg-forest/10' : ''}`}>
                <span className={`text-[var(--text-muted)] ${row.bold ? 'font-bold text-[var(--text-base)]' : ''}`}>{row.label}</span>
                <span className={`font-medium ${row.neg ? 'text-red-500 dark:text-red-400' : row.highlight ? 'text-gold font-bold' : 'text-[var(--text-base)]'} ${row.bold ? 'font-bold' : ''}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[var(--text-base)]">الرسوم البيانية بحسب السنة</h2>

        <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)]">
          <h3 className="font-semibold text-[var(--text-base)] mb-4">قيمة حصة المستثمر وصافي قيمة الشركة</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }} formatter={(v: number) => formatCurrency(v)} />
              <Legend />
              <Line type="monotone" dataKey="قيمة حصة المستثمر" stroke="#c9a84c" strokeWidth={2} dot />
              <Line type="monotone" dataKey="صافي قيمة الشركة" stroke="#1a3d2b" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card-bg)]">
          <h3 className="font-semibold text-[var(--text-base)] mb-4">توزيع الأصول بحسب السنة</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} tickFormatter={(v) => (v / 1000).toFixed(0) + 'K'} />
              <Tooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }} formatter={(v: number) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="قيمة الأسطول" fill="#1a3d2b" stackId="a" />
              <Bar dataKey="الأرباح المحتجزة" fill="#c9a84c" stackId="a" />
              <Bar dataKey="توزيعات المستثمر" fill="#2d5a3d" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Year-by-year table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">جدول السنوات</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--surface-alt)]">
              <tr>
                {['السنة', 'قيمة الأسطول', 'الأرباح المحتجزة', 'التوزيعات', 'الالتزامات', 'صافي قيمة الشركة', 'حصة المستثمر', 'القيمة عند التخارج'].map(h => (
                  <th key={h} className="px-3 py-3 text-right font-semibold text-[var(--text-base)] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-[var(--card-bg)]">
              {projections.map((p) => {
                const liqDisc = p.investorGrossExitValue * (exitDiscountPct / 100);
                const exitVal = p.investorGrossExitValue - liqDisc + p.investorDistributionsCumulative;
                const isSelected = p.year === exitYear;
                return (
                  <tr key={p.year} className={`transition-colors ${isSelected ? 'bg-forest/10' : 'hover:bg-[var(--surface-alt)]'}`}>
                    <td className="px-3 py-2.5 font-bold text-[var(--text-base)]">
                      {p.year === 10 ? 'السنة 10' : `السنة ${p.year}`}
                      {isSelected && <span className="text-xs text-gold mr-2">◀ محدد</span>}
                    </td>
                    <td className="px-3 py-2.5 text-[var(--text-muted)]">{formatCurrency(Math.round(p.fleetResaleValue))}</td>
                    <td className="px-3 py-2.5 text-[var(--text-muted)]">{formatCurrency(Math.round(p.retainedCumulative))}</td>
                    <td className="px-3 py-2.5 text-[var(--text-muted)]">{formatCurrency(Math.round(p.investorDistributionsCumulative))}</td>
                    <td className="px-3 py-2.5 text-red-500 dark:text-red-400">({formatCurrency(Math.round(p.outstandingDebt))})</td>
                    <td className="px-3 py-2.5 font-medium text-[var(--text-base)]">{formatCurrency(Math.round(Math.max(0, p.companyNAV)))}</td>
                    <td className="px-3 py-2.5 text-[var(--text-muted)]">{formatCurrency(Math.round(p.investorGrossExitValue))}</td>
                    <td className={`px-3 py-2.5 font-bold ${exitVal >= originalCapital ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                      {formatCurrency(Math.round(Math.max(0, exitVal)))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-[var(--text-muted)] space-y-1">
          <p>• معدلات الاستهلاك: السنة 1: 80% · السنة 2: 68% · السنة 3: 58% · السنة 4: 49% · السنة 5: 42% · السنة 10: 22% — <span className="text-amber-600 dark:text-amber-400">افتراض محافظ</span></p>
          <p>• لا توزيعات في السنتين الأوليين حسب سياسة الدراسة</p>
        </div>
      </section>

      {/* Submit exit request */}
      <section className="border border-[var(--border)] rounded-xl p-6 bg-[var(--card-bg)] space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-base)]">إرسال طلب تخارج تقديري للإدارة</h2>
        <p className="text-sm text-[var(--text-muted)]">
          هذا الطلب لا يُنشئ التزامًا قانونيًا. هو فقط إفادة بالاهتمام لاستكشاف إمكانية التخارج مستقبلًا.
        </p>

        {submitState === 'success' ? (
          <div className="text-center py-8 space-y-3">
            <div className="text-4xl">✅</div>
            <p className="font-bold text-green-600 dark:text-green-400">
              تم إرسال طلب التخارج التقديري للإدارة.
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              سيتم التواصل معك بعد مراجعة البيانات.
            </p>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-1 text-[var(--text-base)]">ملاحظات إضافية (اختياري)</label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 bg-[var(--surface)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-forest/50 resize-none"
                placeholder="أي ملاحظات أو أسئلة حول عملية التخارج..."
              />
            </div>

            {submitState === 'error' && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-700 dark:text-red-400">
                {submitError}
              </div>
            )}

            <div className="bg-[var(--surface-alt)] rounded-lg p-4 text-sm space-y-1">
              <div className="font-semibold text-[var(--text-base)] mb-2">ملخص الطلب</div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">رأس المال</span><span>{formatCurrency(originalCapital)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">الأسهم</span><span>{shares}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">سنة التخارج</span><span>السنة {exitYear}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">القيمة التقديرية</span><span className="font-bold text-gold">{formatCurrency(Math.round(Math.max(0, estimatedExitValue)))}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-muted)]">العائد التقديري</span><span className={estimatedROI >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}>{estimatedROI.toFixed(1)}٪</span></div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-forest hover:bg-forest-light disabled:opacity-60 text-ivory font-bold py-3 rounded-lg transition-colors"
            >
              {submitting ? 'جارٍ الإرسال...' : 'إرسال طلب التخارج التقديري'}
            </button>
          </>
        )}
      </section>

      <StudyPrevNext />
    </div>
  );
}
