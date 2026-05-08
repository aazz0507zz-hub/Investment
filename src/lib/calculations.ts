// Financial calculations for the investment calculator
// All base data comes from src/data files

import { monthlyFixedExpenses, monthlyFleetCosts } from '@/data/financials';

export interface CalculatorInputs {
  scenarioId: string;
  requiredCapital: number;
  vehicleCount: number;
  occupancyPct: number;
  baseRevenueAt75: number;
  dailyPriceChangePct: number;
  maintenanceIncreasePct: number;
  insuranceIncreasePct: number;
}

export interface CalculatorOutputs {
  capital: number;
  sharePrice: number;
  shares: number;
  investorShares: number;
  ownershipPct: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  netOperatingCashFlow: number;
  breakEvenOccupancy: number;
  isProfitable: boolean;
  warningNegativeCashFlow: boolean;
}

export function calculateRevenue(
  baseRevenueAt75: number,
  occupancyPct: number,
  dailyPriceChangePct: number
): number {
  const occupancyRatio = occupancyPct / 75;
  const priceMultiplier = 1 + dailyPriceChangePct / 100;
  return Math.round(baseRevenueAt75 * occupancyRatio * priceMultiplier);
}

export function calculateExpenses(
  vehicleCount: number,
  occupancyPct: number,
  maintenanceIncreasePct: number,
  insuranceIncreasePct: number
): number {
  const fixedBase = monthlyFixedExpenses.totalFixed;
  const fleetFixed =
    monthlyFleetCosts.insuranceGpsDocs * (1 + insuranceIncreasePct / 100);

  // Interpolate variable costs
  const minOcc = 45;
  const maxOcc = 85;
  const minVar = monthlyFleetCosts.variableAt45;
  const maxVar = monthlyFleetCosts.variableAt85;
  const clampedOcc = Math.min(Math.max(occupancyPct, minOcc), maxOcc);
  const varRatio = (clampedOcc - minOcc) / (maxOcc - minOcc);
  const baseVariable = minVar + varRatio * (maxVar - minVar);
  const variable = baseVariable * (1 + maintenanceIncreasePct / 100) * (vehicleCount / 20);

  return Math.round(fixedBase + fleetFixed + variable);
}

export function runCalculation(
  inputs: CalculatorInputs,
  investorShares: number,
  totalShares = 2000
): CalculatorOutputs {
  const revenue = calculateRevenue(
    inputs.baseRevenueAt75,
    inputs.occupancyPct,
    inputs.dailyPriceChangePct
  );
  const expenses = calculateExpenses(
    inputs.vehicleCount,
    inputs.occupancyPct,
    inputs.maintenanceIncreasePct,
    inputs.insuranceIncreasePct
  );
  const net = revenue - expenses;

  // Break-even: find occupancy where net = 0
  let breakEven = 51;
  for (let occ = 40; occ <= 100; occ++) {
    const r = calculateRevenue(inputs.baseRevenueAt75, occ, inputs.dailyPriceChangePct);
    const e = calculateExpenses(
      inputs.vehicleCount,
      occ,
      inputs.maintenanceIncreasePct,
      inputs.insuranceIncreasePct
    );
    if (r >= e) {
      breakEven = occ;
      break;
    }
  }

  const sharePrice = Math.round(inputs.requiredCapital / totalShares);
  const ownershipPct = (investorShares / totalShares) * 100;

  return {
    capital: inputs.requiredCapital,
    sharePrice,
    shares: totalShares,
    investorShares,
    ownershipPct: Math.round(ownershipPct * 100) / 100,
    monthlyRevenue: revenue,
    monthlyExpenses: expenses,
    netOperatingCashFlow: net,
    breakEvenOccupancy: breakEven,
    isProfitable: net > 0,
    warningNegativeCashFlow: net < 0,
  };
}
