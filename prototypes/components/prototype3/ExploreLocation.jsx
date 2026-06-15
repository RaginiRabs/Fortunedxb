'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Building2, TrendingUp, Hash, ArrowUpRight, MapPin } from 'lucide-react';
import { COMMUNITIES, METRICS } from '@/mock/prototype4/communities';

// Interactive "explore by location" — no heavy map. An elegant thumbnail picker
// drives a cinematic, cross-fading hero with live stats.
const FEATURES = COMMUNITIES.features.map((f) => f.properties);

const short = (name) => name.replace(/\s*\(.*\)/, '');

// A short, human descriptor per community so the panel reads informative.
const BLURB = {
  'Downtown Dubai': 'Burj Khalifa district — premium branded towers and the city’s highest resale demand.',
  'Business Bay': 'Central canal-side hub with the deepest pipeline of new launches in Dubai.',
  DIFC: 'The financial centre — boutique, high-value addresses with strong rental covenant.',
  'Dubai Marina': 'Iconic waterfront high-rises with the strongest short-let and resale liquidity.',
  JBR: 'Beachfront promenade living — ready stock with year-round holiday-let demand.',
  'Palm Jumeirah': 'The trophy island — limited supply keeps prices at the top of the market.',
  'JVC (Jumeirah Village Circle)': 'Dubai’s highest-yield mid-market community with huge upcoming supply.',
  'Dubai Hills': 'Master-planned greenery, golf and Dubai Hills Mall — family-led demand.',
  'Al Jaddaf': 'Creek-adjacent value play, minutes from Downtown with fast-rising supply.',
  'Dubai Creek Harbour': 'The next waterfront flagship — off-plan launches around Creek Tower.',
  'MBR City': 'Lagoon-led MBR City — large-format homes and crystal-lagoon communities.',
  Meydan: 'Racecourse district — low density, villa-led and tightly held inventory.',
};

// A representative photo per community (mock only).
const IMAGE = {
  'Downtown Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
  'Business Bay': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80',
  DIFC: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1400&q=80',
  'Dubai Marina': 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
  JBR: 'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1400&q=80',
  'Palm Jumeirah': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
  'JVC (Jumeirah Village Circle)': 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
  'Dubai Hills': 'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=1400&q=80',
  'Al Jaddaf': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
  'Dubai Creek Harbour': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80',
  'MBR City': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80',
  Meydan: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80',
};
const FALLBACK = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80';
const img = (name) => IMAGE[name] || FALLBACK;

export default function ExploreLocation() {
  const sorted = useMemo(() => [...FEATURES].sort((a, b) => b.projectCount - a.projectCount), []);
  const [selected, setSelected] = useState(sorted[0]);

  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
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

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
        {/* Cinematic hero — cross-fades between communities */}
        <div className="relative min-h-[240px] overflow-hidden rounded-3xl ring-1 ring-black/5 lg:min-h-[300px]">
          {sorted.map((c) => (
            <img
              key={c.name}
              src={img(c.name)}
              alt={c.name}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.1s] ease-out ${
                c.name === selected.name ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-[#0A0A12]/45 to-transparent" />

          <div className="relative flex h-full flex-col justify-between p-5 text-white sm:p-6">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E0C3A0] ring-1 ring-white/15 backdrop-blur-md">
              <MapPin size={13} /> Community #{selected.community_number}
            </span>

            <div>
              <span className="block h-0.5 w-10 rounded-full bg-[#E0C3A0]" />
              <h3 className="mt-2.5 text-2xl font-bold leading-none tracking-tight font-[family-name:var(--font-heading)] sm:text-[34px]">
                {selected.name}
              </h3>
              <p className="mt-2 line-clamp-2 max-w-lg text-[13.5px] leading-relaxed text-white/80">
                {BLURB[selected.name] || 'A sought-after Dubai community with active inventory and strong investor demand.'}
              </p>

              {/* inline stat strip */}
              <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
                {[
                  [Building2, `${selected.projectCount}`, 'Projects'],
                  [TrendingUp, METRICS.avgPrice.fmt(selected.avgPrice), 'Avg price'],
                  [Hash, selected.salesVolume.toLocaleString(), 'Sales / yr'],
                ].map(([Icon, value, label]) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon aria-hidden="true" size={18} className="text-[#E0C3A0]" />
                    <div>
                      <p className="text-[17px] font-bold leading-none tracking-tight font-[family-name:var(--font-heading)]">{value}</p>
                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/55">{label}</p>
                    </div>
                  </div>
                ))}

                <Link
                  href={`/prototype3/projects?area=${encodeURIComponent(selected.name)}`}
                  className="group ml-auto inline-flex items-center gap-2 rounded-full bg-[#E0C3A0] px-5 py-2.5 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  View projects
                  <ArrowUpRight size={15} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail picker — capped to the hero height so it scrolls instead of stretching the image */}
        <div className="flex flex-col rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-3 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)] lg:h-[300px]">
          <p className="px-2 pb-2.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5E5E66]">
            Top communities by active projects
          </p>
          <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:thin] max-lg:max-h-[300px]">
            {sorted.map((c) => {
              const active = c.name === selected.name;
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setSelected(c)}
                    onClick={() => setSelected(c)}
                    className={`group flex w-full items-center gap-3 rounded-2xl p-2 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#80603f]/40 ${
                      active ? 'bg-[#80603f]/[0.07] ring-1 ring-[#80603f]/25' : 'hover:bg-black/[0.03]'
                    }`}
                  >
                    <span className="relative h-12 w-14 shrink-0 overflow-hidden rounded-xl">
                      <img src={img(c.name)} alt="" className="h-full w-full object-cover" />
                      <span className={`absolute inset-0 transition-colors ${active ? 'bg-[#80603f]/10' : 'bg-black/10 group-hover:bg-black/0'}`} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[14px] font-bold tracking-tight font-[family-name:var(--font-heading)] ${active ? 'text-[#80603f]' : 'text-[#0A0A12]'}`}>
                        {short(c.name)}
                      </span>
                      <span className="mt-0.5 block truncate text-[11.5px] text-[#7A7A85]">
                        {c.projectCount} projects · {METRICS.avgPrice.fmt(c.avgPrice)}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className={`shrink-0 transition-all ${active ? 'text-[#80603f] opacity-100' : 'text-[#9A9AA3] opacity-0 group-hover:opacity-100'}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
