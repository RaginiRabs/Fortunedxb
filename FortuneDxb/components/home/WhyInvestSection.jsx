'use client';

import React from 'react';
import { TrendingUp, Shield, Anchor, Landmark } from 'lucide-react';
import Reveal from '@/components/common/Reveal';

// ============ STRATEGIC INVESTMENT FRAMEWORKS ============
const frameworks = [
  {
    id: 'capital-yields',
    icon: TrendingUp,
    metric: '7% – 9%',
    sublabel: 'Net Rental Yield',
    title: 'Sustained Capital Yields',
    description:
      'Prime tourism corridors deliver sustained 7% to 9% net rental yields, consistently outpacing mature Western markets on a risk-adjusted basis.',
  },
  {
    id: 'fiscal-shelter',
    icon: Shield,
    metric: '0%',
    sublabel: 'Income & Capital Gains Tax',
    title: 'Complete Fiscal Sheltering',
    description:
      'Zero personal income tax and no corporate capital gains structures allow full retention of rental income and asset appreciation under transparent law.',
  },
  {
    id: 'currency-anchor',
    icon: Anchor,
    metric: 'AED · USD',
    sublabel: 'Pegged Hard Currency',
    title: 'Hard Currency Anchoring',
    description:
      'The UAE Dirham is legally pegged directly to the US Dollar, hedging capital against inflation and emerging-market currency volatility.',
  },
  {
    id: 'sovereign-visa',
    icon: Landmark,
    metric: 'AED 2M',
    sublabel: 'Golden Visa Threshold',
    title: 'Sovereign Residency Gateways',
    description:
      'Capital deployments starting from AED 2 Million unlock immediate Golden Visa eligibility, securing long-term residency for global family offices.',
  },
];

export default function WhyInvestSection() {
  return (
    <section id="why-invest" className="bg-[#161310] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal as="header" className="max-w-3xl mb-16 md:mb-24">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#B0905E] mb-5">
            Sovereign growth metrics
          </p>
          {/* 1px gold accent line */}
          <div className="h-px w-16 bg-[#B0905E] mb-6" />
          <h2 className="font-heading text-4xl md:text-6xl font-light text-[#F5F2ED] leading-[1.1]">
            Strategic investment frameworks.
          </h2>
          <p className="mt-6 max-w-xl text-sm md:text-base text-white/50 leading-loose">
            Capital preservation and structural arbitrage within the Dubai asset landscape.
          </p>
        </Reveal>

        {/* 4-column matrix — separated by clean vertical rules, no boxed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {frameworks.map((framework) => {
            const IconComp = framework.icon;
            return (
              <div
                key={framework.id}
                className="flex flex-col gap-7 border-t border-white/[0.08] py-10 md:px-8 md:py-0 first:border-t-0 lg:border-t-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
              >
                <IconComp className="h-6 w-6 text-[#B0905E]" strokeWidth={1.25} />

                {/* Core metric — off-white, gold reserved for accents only */}
                <div>
                  <div className="font-heading text-4xl md:text-5xl font-light text-[#F5F2ED]">
                    {framework.metric}
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {framework.sublabel}
                  </div>
                </div>

                {/* Title + description */}
                <div className="space-y-3">
                  <h3 className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                    {framework.title}
                  </h3>
                  <p className="text-sm leading-loose text-white/50">
                    {framework.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
