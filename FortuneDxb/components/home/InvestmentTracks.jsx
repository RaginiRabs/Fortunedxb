'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, BarChart3, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/common/Reveal';

// ============ CURATED INVESTMENT FRAMEWORKS (capital deployment tracks) ============
// Images are Unsplash CDN — swap with your own assets for production.
const tracks = [
  {
    id: 'yield',
    href: '/projects?track=yield',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5?auto=format&fit=crop&w=1200&q=80',
    title: 'High-Yield Short-Term',
    focus: 'Tourism Corridors',
    target: '8% – 11% Net ROI',
    description:
      'Premium waterfront and central district residential blocks optimized for luxury holiday homes and high-density short-term rental yields.',
  },
  {
    id: 'appreciation',
    href: '/projects?track=appreciation',
    icon: BarChart3,
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80',
    title: 'Capital Appreciation',
    focus: 'Master Communities',
    target: 'Early-Stage Arbitrage',
    description:
      'Early-stage infrastructure allocations in upcoming master community expansions, positioning capital ahead of secondary market supply curves.',
  },
  {
    id: 'visa',
    href: '/projects?track=visa',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    title: 'Sovereign Wealth',
    focus: 'Golden Visa Ready',
    target: 'AED 2M+ Compliance',
    description:
      'Premium luxury allocations structured for structural wealth preservation, pre-vetted for seamless direct Golden Visa residency routing.',
  },
];

export default function InvestmentTracks() {
  return (
    <section className="bg-[#161310] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal as="header" className="max-w-3xl mb-16 md:mb-24">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#B0905E] mb-5">
            Curated investment frameworks
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-[#F5F2ED] leading-[1.1]">
            Select your capital deployment track.
          </h2>
          <p className="mt-6 max-w-xl text-sm md:text-base text-white/50 leading-loose">
            Pre-vetted off-plan allocations, grouped by financial objective.
          </p>
        </Reveal>

        {/* 3 image-led track blocks — sharp edges, flat surfaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map((track, i) => {
            const IconComp = track.icon;
            return (
              <Reveal key={track.id} delay={i * 120}>
                <Link
                  href={track.href}
                  className="group flex h-full flex-col overflow-hidden rounded-none border border-white/[0.06] bg-white/[0.03] transition-colors duration-300 hover:border-[#B0905E]/40"
                >
                  {/* Image header — blur reads here, over imagery */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={track.image}
                      alt={track.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-[#161310]/25 to-transparent" />
                    <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-none border border-white/20 bg-black/40 backdrop-blur-lg text-[#B0905E]">
                      <IconComp className="h-4 w-4" strokeWidth={1.25} />
                    </div>
                    <h3 className="absolute bottom-4 left-5 right-5 font-heading text-2xl font-light text-[#F5F2ED]">
                      {track.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-6 p-7 md:p-8">
                    {/* Ledger row — divided by thin rules */}
                    <div className="flex items-stretch gap-4 text-[10px] uppercase tracking-[0.14em]">
                      <div className="space-y-1.5">
                        <div className="text-white/40">Focus</div>
                        <div className="text-[#F5F2ED]">{track.focus}</div>
                      </div>
                      <div className="w-px bg-white/[0.08]" />
                      <div className="space-y-1.5">
                        <div className="text-white/40">Target</div>
                        <div className="text-[#F5F2ED]">{track.target}</div>
                      </div>
                    </div>

                    <p className="text-sm leading-loose text-white/50">
                      {track.description}
                    </p>

                    {/* Restrained CTA — gold underline on hover */}
                    <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-white/55 group-hover:text-[#F5F2ED] transition-colors">
                      <span className="border-b border-transparent group-hover:border-[#B0905E] transition-colors pb-0.5">
                        View allocations
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
