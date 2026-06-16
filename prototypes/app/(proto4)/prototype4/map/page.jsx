'use client';

// Dubai market map page — full interactive map with community polygons,
// metro lines, landmarks and project-count badges.
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, TrainFront, Landmark, Building2, X } from 'lucide-react';
import { COMMUNITIES } from '@/mock/prototype4/communities';
import { projectsForArea, AREA_PROJECT_CAP } from '@/mock/prototype4/areaProjects';

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
  const [drawer, setDrawer] = useState(null); // { name, count } when a badge is clicked
  const drawerList = drawer ? projectsForArea(drawer.name, drawer.count) : [];

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
      <div className="relative mt-7 overflow-hidden rounded-2xl">
        <DubaiInteractiveMap
          height="min(78vh, 900px)"
          onCommunityClick={(community) => setSelected(community)}
          onProjectBadgeClick={(info) => setDrawer(info)}
          projectCounts={PROJECT_COUNTS}
          initialZoom={10}
          center={[55.2744, 25.2048]}
        />

        {/* Projects drawer — opens on clicking a project-number badge */}
        <aside
          className={`absolute inset-y-0 left-0 z-30 w-[340px] max-w-[85%] transition-transform duration-300 ease-out ${
            drawer ? 'translate-x-0' : 'pointer-events-none -translate-x-[110%]'
          }`}
        >
          <div className="flex h-full flex-col overflow-hidden rounded-l-2xl border border-[#e8e2da] bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-[#e8e2da] bg-[#faf7f3] px-5 py-4">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#80603f]">Projects in</p>
                <h3 className="truncate text-lg font-bold text-[#2a2520] font-[family-name:var(--font-heading)]">
                  {drawer?.name}
                </h3>
                <p className="text-[12px] text-[#675c4e]">{drawer?.count} active projects</p>
              </div>
              <button
                type="button"
                onClick={() => setDrawer(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#675c4e] transition-colors hover:bg-[#f0ebe3] hover:text-[#2a2520]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto p-3">
              {drawerList.map((p) => (
                <div
                  key={p.id}
                  className="flex gap-3 rounded-xl border border-[#e8e2da] p-2.5 transition-colors hover:border-[#80603f] hover:bg-[#faf7f3]"
                >
                  <img src={p.image} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#2a2520]">{p.name}</p>
                    <p className="truncate text-[11px] text-[#675c4e]">
                      {p.developer} · {p.beds} · {p.handover}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide"
                        style={{ color: p.status === 'Ready' ? '#15803d' : '#80603f' }}
                      >
                        {p.status}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#6a4b2e]">
                        AED {p.priceFrom.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {drawer && drawer.count > AREA_PROJECT_CAP && (
              <div className="border-t border-[#e8e2da] px-5 py-3 text-center text-[11px] text-[#675c4e]">
                Showing {AREA_PROJECT_CAP} of {drawer.count} projects
              </div>
            )}
          </div>
        </aside>
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
