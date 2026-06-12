'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Building2 } from 'lucide-react';
import { COMMUNITIES } from '@/mock/prototype4/communities';

// Full Dubai market map — reuses prototype4's interactive map component.
const DubaiInteractiveMap = dynamic(() => import('@/components/map/DubaiInteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[78vh] min-h-[420px] animate-pulse rounded-2xl border border-[#e8e2da] bg-[#faf7f3]" />
  ),
});

const PROJECT_COUNTS = Object.fromEntries(
  COMMUNITIES.features.map((f) => [f.properties.name, f.properties.projectCount])
);

export default function MapPage() {
  const [selected, setSelected] = useState(null);
  const name = selected?.['name:en'] || selected?.name;

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-12 md:px-12 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <header className="max-w-2xl">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
            Market
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[#0A0A12] md:text-5xl font-[family-name:var(--font-heading)]">
            Explore the market map
          </h1>
          <p className="mt-3 leading-relaxed text-[#55555E]">
            Browse Dubai communities, metro connectivity and live project counts. Click any community for its numbers.
          </p>
        </header>
        {name && (
          <div className="rounded-xl border border-[#e8e2da] bg-[#faf7f3] px-5 py-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#675c4e]">Selected community</p>
            <p className="flex items-center gap-2 text-lg font-bold text-[#2a2520] font-[family-name:var(--font-heading)]">
              <Building2 size={16} className="text-[#80603f]" /> {name}
            </p>
          </div>
        )}
      </div>

      <div className="mt-7 overflow-hidden rounded-3xl ring-1 ring-black/5">
        <DubaiInteractiveMap
          height="min(78vh, 900px)"
          onCommunityClick={(community) => setSelected(community)}
          projectCounts={PROJECT_COUNTS}
          initialZoom={10}
          center={[55.2744, 25.2048]}
        />
      </div>
    </section>
  );
}
