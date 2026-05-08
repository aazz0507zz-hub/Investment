import { Disclaimer } from '@/components/Disclaimer';
import { ScrollNavigation } from '@/components/ScrollNavigation';
import { HeroSection } from '@/components/HeroSection';
import { InvestorForm } from '@/components/InvestorForm';
import { InvestmentCalculator } from '@/components/InvestmentCalculator';
import { FeasibilityStudy } from '@/components/FeasibilityStudy';
import { FleetScenarios } from '@/components/FleetScenarios';
import { VehicleFleet } from '@/components/VehicleFleet';
import { PricingSection } from '@/components/PricingSection';
import { CompetitorAnalysis } from '@/components/CompetitorAnalysis';
import { RiskDashboard } from '@/components/RiskDashboard';
import { InvestorDashboard } from '@/components/InvestorDashboard';
import { GovernanceSection } from '@/components/GovernanceSection';
import { Timeline90Days } from '@/components/Timeline90Days';
import { GrowthRoadmap } from '@/components/GrowthRoadmap';
import { DownloadCenter } from '@/components/DownloadCenter';
import { projectConfig } from '@/data/projectConfig';

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal">
      {/* Top disclaimer banner */}
      <Disclaimer variant="top" />

      {/* Sticky navigation */}
      <ScrollNavigation />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Investor Interest Form */}
      <InvestorForm />

      {/* 3. Investment Calculator */}
      <InvestmentCalculator />

      {/* 4. Feasibility Study */}
      <FeasibilityStudy />

      {/* 5. Fleet Scenarios */}
      <FleetScenarios />

      {/* 6. Vehicles & Prices */}
      <VehicleFleet />

      {/* 7. Pricing Strategy */}
      <PricingSection />

      {/* 8. Competitor Analysis */}
      <CompetitorAnalysis />

      {/* 9. Risk Dashboard */}
      <RiskDashboard />

      {/* 10. Investor Dashboard Demo */}
      <InvestorDashboard />

      {/* 11. Governance */}
      <GovernanceSection />

      {/* 12. 90-Day Timeline */}
      <Timeline90Days />

      {/* 13. 10-Year Growth Roadmap */}
      <GrowthRoadmap />

      {/* 14. Download Center */}
      <DownloadCenter />

      {/* Footer */}
      <footer className="bg-charcoal border-t border-calm-800 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-ivory font-bold text-lg">{projectConfig.nameAr} — {projectConfig.nameEn}</p>
          <p className="text-calm-400 text-sm">{projectConfig.taglineAr}</p>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
          <p className="text-calm-500 text-xs leading-relaxed max-w-2xl mx-auto">
            {projectConfig.disclaimer}
          </p>
          <p className="text-calm-600 text-xs">
            جميع الأرقام مستخرجة من دراسة الجدوى — docs/FINAL_STUDY.md
          </p>
        </div>
      </footer>
    </main>
  );
}
