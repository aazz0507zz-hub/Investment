// Fleet scenarios extracted from docs/FINAL_STUDY.md

export interface FleetScenario {
  id: string;
  name: string;
  fleetMix: string;
  vehicleCount: number;
  requiredCapital: number;
  avgVehicleCost: number;
  revenueAt45: number;
  revenueAt60: number;
  revenueAt75: number;
  revenueAt85: number;
  netOperatingAt75: number;
  breakEvenOccupancy: number;
  recommendation: 'recommended' | 'conditional' | 'not_recommended';
  recommendationNote: string;
}

export const fleetScenarios: FleetScenario[] = [
  {
    id: 'scenario1',
    name: 'السيناريو الأول',
    fleetMix: '5 أكسنت + 5 i10 + 5 بيجاس + 2 إلنترا + 1 تورس',
    vehicleCount: 18,
    requiredCapital: 1_397_975,
    avgVehicleCost: 61_110,
    revenueAt45: 34_344,
    revenueAt60: 45_792,
    revenueAt75: 57_240,
    revenueAt85: 64_872,
    netOperatingAt75: 13_663,
    breakEvenOccupancy: 54,
    recommendation: 'not_recommended',
    recommendationNote: 'لا أوصي به كبداية — تورس تستهلك رأس مال مبكرًا',
  },
  {
    id: 'scenario2',
    name: 'السيناريو الثاني ⭐ الموصى به',
    fleetMix: '7 أكسنت + 7 يارس + 2 بيجاس + 2 i10 + 2 إلنترا',
    vehicleCount: 20,
    requiredCapital: 1_547_875,
    avgVehicleCost: 62_014,
    revenueAt45: 37_449,
    revenueAt60: 49_932,
    revenueAt75: 62_415,
    revenueAt85: 70_738,
    netOperatingAt75: 17_112,
    breakEvenOccupancy: 51,
    recommendation: 'recommended',
    recommendationNote: 'أوصي به — يوازن بين الطلب المحلي والثقة والمرونة',
  },
  {
    id: 'scenario3',
    name: 'أقل كلفة / أعلى دوران',
    fleetMix: '6 i10 + 4 ديزاير + 4 بيجاس + 4 أكسنت',
    vehicleCount: 18,
    requiredCapital: 1_235_600,
    avgVehicleCost: 52_389,
    revenueAt45: 30_223,
    revenueAt60: 40_297,
    revenueAt75: 50_371,
    revenueAt85: 57_087,
    netOperatingAt75: 8_234,
    breakEvenOccupancy: 61,
    recommendation: 'conditional',
    recommendationNote: 'أوصي به فقط إذا كان رأس المال ضيقًا جدًا',
  },
  {
    id: 'scenario4',
    name: 'توازن يومي / شهري',
    fleetMix: '6 أكسنت + 4 يارس + 4 بيجاس + 3 i10 + 3 إلنترا',
    vehicleCount: 20,
    requiredCapital: 1_528_875,
    avgVehicleCost: 61_094,
    revenueAt45: 37_263,
    revenueAt60: 49_684,
    revenueAt75: 62_105,
    revenueAt85: 70_386,
    netOperatingAt75: 16_942,
    breakEvenOccupancy: 51,
    recommendation: 'recommended',
    recommendationNote: 'أوصي به — توازن جيد بين المرونة والتذكرة',
  },
  {
    id: 'scenario5',
    name: 'الموصى به واقعيًا',
    fleetMix: '7 أكسنت + 5 يارس + 4 بيجاس + 2 i10 + 2 إلنترا',
    vehicleCount: 20,
    requiredCapital: 1_525_225,
    avgVehicleCost: 60_921,
    revenueAt45: 37_163,
    revenueAt60: 49_551,
    revenueAt75: 61_938,
    revenueAt85: 70_197,
    netOperatingAt75: 17_754,
    breakEvenOccupancy: 51,
    recommendation: 'recommended',
    recommendationNote: 'أوصي به أيضًا — أعلى صافي تشغيلي عند 75%',
  },
];
