'use client';

// prototype5 hero search — functional filter dropdowns + search. Mock only.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';

const FILTERS = [
  { sub: 'Community', options: ['All Communities', 'Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Business Bay', 'Dubai Hills Estate', 'Jumeirah Village Circle'] },
  { sub: 'Developer', options: ['All Developers', 'Emaar', 'Nakheel', 'Sobha', 'DAMAC', 'Binghatti', 'Azizi', 'Meraas'] },
  { sub: 'Budget', options: ['Any Budget', 'Under AED 1M', 'AED 1M – 2M', 'AED 2M – 5M', 'AED 5M+'] },
  { sub: 'Property Type', options: ['All Types', 'Apartment', 'Villa', 'Townhouse', 'Penthouse'] },
];

export default function HeroSearch() {
  const router = useRouter();
  const [vals, setVals] = useState(FILTERS.map((f) => f.options[0]));
  const set = (i, v) => setVals((s) => s.map((x, k) => (k === i ? v : x)));

  return (
    <div className="mt-7 flex flex-wrap items-end gap-2 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-[0_18px_50px_-15px_rgba(20,18,15,0.35)] backdrop-blur">
      {FILTERS.map((f, i) => (
        <div key={f.sub} className="flex min-w-[160px] flex-1 flex-col rounded-lg px-3 py-1.5 transition-colors hover:bg-gray-50">
          <div className="relative">
            <select
              value={vals[i]}
              onChange={(e) => set(i, e.target.value)}
              className="w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-medium text-[#1a1a1a] outline-none"
            >
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <span className="mt-0.5 text-[11px] text-gray-400">{f.sub}</span>
        </div>
      ))}
      <button
        onClick={() => router.push('/prototype5/projects')}
        aria-label="Search"
        className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-r from-[#96714a] to-[#6b4f33] text-white transition-all hover:brightness-105"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
