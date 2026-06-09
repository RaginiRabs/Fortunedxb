'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { LayoutGrid, TrainFront, Plane, ArrowUpRight } from 'lucide-react';

// Leaflet needs the browser — load the map client-side only.
const MasterPlanMap = dynamic(() => import('@/components/home/MasterPlanMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-navy" />,
});

const tabs = [
  { id: 'all', label: 'All Assets', icon: LayoutGrid },
  { id: 'metro', label: 'Metro Blue Line', icon: TrainFront },
  { id: 'airport', label: 'Al Maktoum Airport Zone', icon: Plane },
];

export default function MasterPlanSection() {
  const [active, setActive] = useState('all');

  return (
    <section className="bg-[#161310] py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Content panel */}
          <div className="flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#B0905E] mb-5">
              Real-time master plan integration
            </p>
            <h2 className="font-heading text-4xl md:text-6xl font-light text-[#F5F2ED] leading-[1.1]">
              Infrastructure drives capital growth.
            </h2>
            <p className="mt-6 max-w-md text-sm md:text-base leading-loose text-white/50">
              Assets near transit spikes and the Al Maktoum hub command{' '}
              <span className="text-[#F5F2ED]">20–30% higher capital growth</span>.
            </p>

            {/* Control bar — sharp tabs, gold-active */}
            <div className="mt-10 flex flex-wrap gap-2">
              {tabs.map((t) => {
                const IconComp = t.icon;
                const on = active === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`flex items-center gap-2 rounded-none border px-4 py-2 text-[11px] uppercase tracking-[0.12em] transition-colors ${
                      on
                        ? 'border-[#B0905E] bg-[#B0905E] text-[#161310]'
                        : 'border-white/[0.08] bg-white/[0.03] text-white/55 hover:text-[#F5F2ED] hover:border-[#B0905E]/40'
                    }`}
                  >
                    <IconComp className="h-3.5 w-3.5" /> {t.label}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-8 space-y-2.5 text-xs text-white/50">
              <div className="flex items-center gap-2.5">
                {/* Metro "Blue Line" brand-identity color (fixed, not theme-driven) */}
                <span className="inline-block h-0.5 w-6 bg-[#3B82F6]" />
                Dubai Metro Blue Line — AED 18B extension
              </div>
              <div className="flex items-center gap-2.5">
                <span className="inline-block h-3 w-3 rounded-full border border-[#B0905E] bg-[#B0905E]/20" />
                Al Maktoum (DWC) catchment — 260M passengers / yr
              </div>
            </div>

            {/* Restrained CTA — gold underline on hover */}
            <Link
              href="/contact"
              className="group mt-10 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.18em] text-white/55 hover:text-[#F5F2ED] transition-colors"
            >
              <span className="border-b border-transparent group-hover:border-[#B0905E] transition-colors pb-1">
                Request pre-launch pricing &amp; proximity matrix
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Interactive canvas */}
          <div className="relative isolate h-[420px] md:h-[540px] overflow-hidden rounded-none border border-white/[0.06]">
            <MasterPlanMap activeLayer={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
