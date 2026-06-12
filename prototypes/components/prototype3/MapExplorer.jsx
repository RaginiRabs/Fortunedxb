'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Building2, TrendingUp, Hash, ArrowUpRight, MapPin } from 'lucide-react';
import { COMMUNITIES, METRICS } from '@/mock/prototype4/communities';

const DubaiInteractiveMap = dynamic(() => import('@/components/map/DubaiInteractiveMap'), {
  ssr: false,
  loading: () => <div className="h-[560px] animate-pulse rounded-3xl border border-[#e8e2da] bg-[#faf7f3]" />,
});

const FEATURES = COMMUNITIES.features.map((f) => f.properties);
const PROJECT_COUNTS = Object.fromEntries(FEATURES.map((p) => [p.name, p.projectCount]));

export default function MapExplorer() {
  const sorted = useMemo(() => [...FEATURES].sort((a, b) => b.projectCount - a.projectCount), []);
  const [selected, setSelected] = useState(sorted[0]);
  const focus = selected ? { center: selected.center, zoom: 12.5 } : null;

  // Two-way: clicking a community on the map syncs the side panel.
  const onCommunityClick = (props) => {
    const name = (props['name:en'] || props.name || '').toLowerCase();
    const match = FEATURES.find((f) => f.name.toLowerCase() === name);
    if (match) setSelected(match);
  };

  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
            Explore by location
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] md:text-4xl font-[family-name:var(--font-heading)]">
            Find your community
          </h2>
        </div>
        <Link
          href="/prototype3/map"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0A0A12] outline-none transition-colors hover:text-[#80603f] focus-visible:text-[#80603f] sm:inline-flex"
        >
          Open full map <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        {/* Interactive panel */}
        <div className="flex flex-col gap-4">
          {/* Selected community stats */}
          <div className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-6 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)]">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#80603f]">
              <MapPin size={13} /> Community #{selected.community_number}
            </p>
            <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
              {selected.name}
            </h3>

            <dl className="mt-5 grid grid-cols-3 divide-x divide-[rgba(10,10,18,0.08)]">
              {[
                [Building2, 'Projects', selected.projectCount],
                [TrendingUp, 'Avg price', METRICS.avgPrice.fmt(selected.avgPrice)],
                [Hash, 'Sales / yr', selected.salesVolume.toLocaleString()],
              ].map(([Icon, label, value], i) => (
                <div key={label} className={`min-w-0 ${i === 0 ? 'pr-3' : 'px-3 last:pr-0'}`}>
                  <Icon aria-hidden="true" size={15} className="text-[#80603f]" />
                  <p className="mt-1.5 truncate text-[15px] font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5E5E66]">{label}</p>
                </div>
              ))}
            </dl>

            <Link
              href={`/prototype3/projects?area=${encodeURIComponent(selected.name)}`}
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#80603f] px-5 py-3 text-sm font-semibold text-white outline-none transition-all hover:bg-[#6a5034] focus-visible:ring-2 focus-visible:ring-[#80603f]/40 focus-visible:ring-offset-2"
            >
              View {selected.projectCount} projects in {selected.name}
              <ArrowUpRight size={15} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Community list */}
          <div className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-2.5 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)]">
            <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5E5E66]">
              Top communities by active projects
            </p>
            <ul className="max-h-[260px] space-y-0.5 overflow-y-auto pr-1">
              {sorted.map((c) => {
                const active = c.name === selected.name;
                return (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => setSelected(c)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#80603f]/40 ${
                        active ? 'bg-[#80603f]/10' : 'hover:bg-black/[0.03]'
                      }`}
                    >
                      <span className={`text-sm font-semibold ${active ? 'text-[#80603f]' : 'text-[#2E231B]'}`}>
                        {c.name}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#2E231B]/[0.06] px-2.5 py-1 text-[11px] font-bold text-[#2E231B]">
                        <Building2 size={11} /> {c.projectCount}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
          <DubaiInteractiveMap
            height="560px"
            focus={focus}
            onCommunityClick={onCommunityClick}
            projectCounts={PROJECT_COUNTS}
            initialZoom={10}
            center={[55.2744, 25.2048]}
          />
        </div>
      </div>
    </section>
  );
}
