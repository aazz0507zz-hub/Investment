'use client';

import { projectConfig } from '@/data/projectConfig';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { StatCard } from './StatCard';
import { Disclaimer } from './Disclaimer';

export function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center bg-hero-pattern relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/60 pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-forest/60 border border-gold/30 rounded-full px-4 py-1.5 text-gold text-sm mb-6">
            <span>🚗</span>
            <span>فرصة استثمارية — حائل، المملكة العربية السعودية</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-ivory mb-4 leading-tight">
            {projectConfig.nameAr}
          </h1>
          <p className="text-xl md:text-2xl text-gold font-medium mb-2">
            {projectConfig.nameEn}
          </p>
          <p className="text-calm-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {projectConfig.taglineAr}
          </p>
        </div>

        {/* Key stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="رأس المال المستهدف"
            value={formatCurrency(projectConfig.targetCapital)}
            highlight
            icon="💰"
          />
          <StatCard
            label="إجمالي الأسهم"
            value={formatNumber(projectConfig.totalShares) + ' سهم'}
            icon="📊"
          />
          <StatCard
            label="سعر السهم"
            value={formatCurrency(projectConfig.sharePrice)}
            highlight
            icon="🎯"
          />
          <StatCard
            label="عدد سيارات الإطلاق"
            value={projectConfig.launchFleetSize + ' سيارة'}
            icon="🚗"
          />
          <StatCard
            label="نقطة التعادل"
            value={projectConfig.breakEvenOccupancy + '% إشغال'}
            sub="نموذج مالك-مدير lean"
            icon="⚖️"
          />
          <StatCard
            label="لا توزيعات أول"
            value={projectConfig.noDistributionMonths + ' شهرًا'}
            sub="سياسة الحماية التشغيلية"
            icon="🔒"
          />
          <StatCard
            label="حصة المستثمرين بعد 24 شهر"
            value={projectConfig.distributionPolicy.investors + '%'}
            highlight
            icon="📈"
          />
          <StatCard
            label="التوصية النهائية"
            value="نفّذ بشروط"
            sub="السيناريو الثاني الموصى به"
            highlight
            icon="✅"
          />
        </div>

        {/* Distribution policy */}
        <div className="bg-charcoal-light border border-calm-700 rounded-xl p-6 mb-8">
          <h3 className="text-ivory font-semibold mb-4 text-lg">سياسة التوزيع بعد 24 شهرًا</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-forest/40 border border-forest">
              <div className="text-3xl font-bold text-gold">{projectConfig.distributionPolicy.management}%</div>
              <div className="text-calm-400 text-sm mt-1">للإدارة</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-charcoal border border-calm-700">
              <div className="text-3xl font-bold text-blue-300">{projectConfig.distributionPolicy.developmentAndReserve}%</div>
              <div className="text-calm-400 text-sm mt-1">تطوير واحتياطي</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-forest/40 border border-forest">
              <div className="text-3xl font-bold text-gold">{projectConfig.distributionPolicy.investors}%</div>
              <div className="text-calm-400 text-sm mt-1">للمستثمرين</div>
            </div>
          </div>
        </div>

        {/* Recommended scenario summary */}
        <div className="bg-forest/20 border border-gold/30 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⭐</span>
            <div>
              <h3 className="text-gold font-semibold mb-1">السيناريو الموصى به</h3>
              <p className="text-ivory text-sm leading-relaxed">
                7 أكسنت + 7 يارس + 2 بيجاس + 2 i10 + 2 إلنترا — 20 سيارة —{' '}
                <span className="text-gold">رأس مال 1,547,875 ريال</span> —
                إيراد 75% إشغال: 62,415 ريال/شهر — صافي تشغيل: 17,112 ريال/شهر
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => scrollTo('feasibility')}
            className="bg-forest hover:bg-forest-light text-ivory font-medium px-6 py-3 rounded-xl transition-all border border-forest-light hover:border-gold/40 text-sm"
          >
            ابدأ قراءة دراسة الجدوى
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            className="bg-gold hover:bg-gold-light text-charcoal font-bold px-6 py-3 rounded-xl transition-all text-sm"
          >
            احسب استثمارك
          </button>
          <a
            href="/docs/feasibility-study.pdf"
            download
            className="border border-calm-600 hover:border-gold/40 text-calm-300 hover:text-ivory font-medium px-6 py-3 rounded-xl transition-all text-sm"
          >
            حمّل الدراسة PDF
          </a>
          <button
            onClick={() => scrollTo('investor-dashboard')}
            className="border border-gold/30 hover:border-gold text-gold font-medium px-6 py-3 rounded-xl transition-all text-sm"
          >
            شاهد منصة المستثمر التجريبية
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </section>
  );
}
