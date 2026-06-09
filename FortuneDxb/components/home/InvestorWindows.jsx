'use client';

import React from 'react';
import { Globe, TrendingUp, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/common/Reveal';

const windows = [
  {
    icon: Globe,
    kicker: 'The Buyer Window',
    title: 'Vetted off-plan allocations.',
    description:
      'Tier-one allocations and contract cancellations, pre-screened for capital-grade investors.',
  },
  {
    icon: TrendingUp,
    kicker: 'The Seller Window',
    title: 'Direct to the principal desk.',
    description:
      'Submit assets straight to our cash-buyer network for discreet, expedited liquidation.',
  },
  {
    icon: ShieldCheck,
    kicker: 'The First-Time Window',
    title: 'Structural escrow safety.',
    description:
      'Regulated payment timelines and institutional safeguards for first capital deployment.',
  },
];

export default function InvestorWindows() {
  return (
    <section className="bg-[#161310] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {windows.map((w, i) => {
            const IconComp = w.icon;
            return (
              <Reveal
                key={w.kicker}
                delay={i * 120}
                className="flex flex-col gap-6 border-t border-white/[0.08] py-10 md:border-t-0 md:border-l md:px-10 md:py-0 md:first:border-l-0 md:first:pl-0"
              >
                <IconComp className="h-6 w-6 text-[#B0905E]" strokeWidth={1.25} />
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#B0905E]">
                    {w.kicker}
                  </p>
                  <h3 className="font-heading text-2xl font-light text-[#F5F2ED] leading-snug">
                    {w.title}
                  </h3>
                  <p className="text-sm leading-loose text-white/50">{w.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
