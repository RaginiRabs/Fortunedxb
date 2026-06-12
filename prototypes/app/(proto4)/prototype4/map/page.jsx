'use client';

// Dubai market map page — full interactive map with community polygons,
// metro lines, landmarks and project-count badges.
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, TrainFront, Landmark, Building2 } from 'lucide-react';
import { COMMUNITIES } from '@/mock/prototype4/communities';

const DubaiInteractiveMap = dynamic(() => import('@/components/map/DubaiInteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[78vh] min-h-[420px] animate-pulse rounded-2xl border border-[#e8e2da] bg-[#faf7f3]" />
  ),
});

// Project numbers come from OUR mock data (communities.js → projectCount).
const norm = (n = '') => n.toLowerCase().replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
const baseCounts = Object.fromEntries(
  COMMUNITIES.features.map((f) => [f.properties.name, f.properties.projectCount])
);
// Aliases for tiles whose map name differs from the mock name (left = map name, right = mock name).
const ALIASES = {
  'Jumeirah Beach Residence (JBR)': 'JBR',
  'MBR City District 1': 'MBR City',
};
const PROJECT_COUNTS = { ...baseCounts };
Object.entries(ALIASES).forEach(([mapName, mockName]) => {
  if (baseCounts[mockName] != null) PROJECT_COUNTS[mapName] = baseCounts[mockName];
});
const PROJECT_COUNTS_NORM = Object.fromEntries(
  Object.entries(PROJECT_COUNTS).map(([k, v]) => [norm(k), v])
);

const LEGEND = [
  { icon: MapPin, color: '#80603f', label: 'Communities', sub: 'Names shown, click for details' },
  { icon: TrainFront, color: '#EF4444', label: 'Metro Red · Green · Blue', sub: 'Click a station for its name' },
  { icon: TrainFront, color: '#F97316', label: 'Tram & Golden Line', sub: 'Toggle metro in “Show”' },
  { icon: Landmark, color: '#2f6fae', label: 'Project Numbers', sub: 'Enable in the “Show” menu' },
];

export default function Prototype4MapPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Heading */}
      <span className="block text-[13px] font-black tracking-[0.2em] text-[#80603f] mb-1.5">DUBAI —</span>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
            Explore the Market Map
          </h1>
          <p className="mt-2 max-w-xl text-[15px] text-[#4a4138] leading-relaxed">
            Browse Dubai communities, metro connectivity and key landmarks. Enable “Project Numbers” in the
            Show menu to overlay the active-project count on each community.
          </p>
        </div>
        {selected && (
          <div className="rounded-xl border border-[#e8e2da] bg-[#faf7f3] px-5 py-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#675c4e]">Selected Community</p>
            <p className="flex items-center gap-2 text-lg font-bold text-[#2a2520] font-[family-name:var(--font-heading)]">
              <Building2 size={16} className="text-[#80603f]" />
              {selected['name:en'] || selected.name}
              {PROJECT_COUNTS_NORM[norm(selected['name:en'] || selected.name)] > 0 && (
                <span className="rounded-full bg-[#1A1A1A] px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  {PROJECT_COUNTS_NORM[norm(selected['name:en'] || selected.name)]} projects
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="mt-7">
        <DubaiInteractiveMap
          height="min(78vh, 900px)"
          onCommunityClick={(community) => setSelected(community)}
          projectCounts={PROJECT_COUNTS}
          initialZoom={10}
          center={[55.2744, 25.2048]}
        />
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LEGEND.map(({ icon: Icon, color, label, sub }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-[#e8e2da] px-4 py-3.5">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: color }}
            >
              <Icon size={17} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#2a2520]">{label}</p>
              <p className="truncate text-[11px] text-[#574e44]">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
