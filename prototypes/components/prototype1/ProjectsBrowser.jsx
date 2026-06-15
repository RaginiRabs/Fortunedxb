'use client';

// prototype1 projects browser — functional filters, sort, load-more, grid/list. Mock only.
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, BedDouble, Building2, Calendar, LayoutGrid, List } from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';

const PROJECTS = [
  { name: 'One By Nine', area: 'Nad Al Sheba, Dubai', type: 'Apartment', developer: 'Binghatti', price: '1.1M', priceNum: 1100000, roi: 8.0, beds: '1-3 Beds', bedsMax: 3, status: 'Q4 2026', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=800&q=72&auto=format&fit=crop' },
  { name: 'Sobha Hartland II', area: 'Sobha Hartland', type: 'Apartment', developer: 'Sobha', price: '1.3M', priceNum: 1300000, roi: 7.8, beds: '1-4 Beds', bedsMax: 4, status: 'Q3 2026', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=72&auto=format&fit=crop' },
  { name: 'DAMAC Bay 2', area: 'Dubai Harbour', type: 'Penthouse', developer: 'DAMAC', price: '2.4M', priceNum: 2400000, roi: 6.9, beds: '1-3 Beds', bedsMax: 3, status: 'Q4 2027', img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=72&auto=format&fit=crop' },
  { name: 'Azizi Venice', area: 'Dubai South', type: 'Apartment', developer: 'Azizi', price: '980K', priceNum: 980000, roi: 8.4, beds: 'Studio, 1-2 Beds', bedsMax: 2, status: 'Q2 2026', img: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=72&auto=format&fit=crop' },
  { name: 'Emaar Beachfront', area: 'Emaar Beachfront', type: 'Apartment', developer: 'Emaar', price: '2.6M', priceNum: 2600000, roi: 6.7, beds: '1-4 Beds', bedsMax: 4, status: 'Ready', img: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&q=72&auto=format&fit=crop' },
  { name: 'Dubai Hills Estate', area: 'Dubai Hills', type: 'Villa', developer: 'Emaar', price: '1.8M', priceNum: 1800000, roi: 7.2, beds: '1-3 Beds', bedsMax: 3, status: 'Q1 2026', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=72&auto=format&fit=crop' },
  { name: 'JVC Living', area: 'Jumeirah Village Circle', type: 'Apartment', developer: 'Nakheel', price: '850K', priceNum: 850000, roi: 8.3, beds: 'Studio, 1-2 Beds', bedsMax: 2, status: 'Q3 2025', img: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&q=72&auto=format&fit=crop' },
  { name: 'Tilal Al Ghaf', area: 'Tilal Al Ghaf', type: 'Townhouse', developer: 'Majid Al Futtaim', price: '2.2M', priceNum: 2200000, roi: 7.0, beds: '3-6 Beds', bedsMax: 6, status: 'Q2 2036', img: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?w=800&q=72&auto=format&fit=crop' },
  { name: 'Creek Harbour Views', area: 'Dubai Creek Harbour', type: 'Apartment', developer: 'Emaar', price: '1.5M', priceNum: 1500000, roi: 7.5, beds: '1-3 Beds', bedsMax: 3, status: 'Q2 2027', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=800&q=72&auto=format&fit=crop' },
  { name: 'Bluewaters Bay', area: 'Bluewaters Island', type: 'Apartment', developer: 'Meraas', price: '3.2M', priceNum: 3200000, roi: 6.4, beds: '1-4 Beds', bedsMax: 4, status: 'Q1 2027', img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=72&auto=format&fit=crop' },
  { name: 'Palm Beach Residences', area: 'Palm Jumeirah', type: 'Penthouse', developer: 'Nakheel', price: '5.8M', priceNum: 5800000, roi: 6.1, beds: '2-5 Beds', bedsMax: 5, status: 'Q3 2027', img: 'https://images.unsplash.com/photo-1489516408517-0c0a15662682?w=800&q=72&auto=format&fit=crop' },
  { name: 'Arabian Ranches III', area: 'Arabian Ranches', type: 'Villa', developer: 'Emaar', price: '2.9M', priceNum: 2900000, roi: 6.8, beds: '3-5 Beds', bedsMax: 5, status: 'Q4 2026', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=72&auto=format&fit=crop' },
  { name: 'Town Square Park', area: 'Town Square', type: 'Townhouse', developer: 'Nshama', price: '1.4M', priceNum: 1400000, roi: 7.6, beds: '2-4 Beds', bedsMax: 4, status: 'Q2 2026', img: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=72&auto=format&fit=crop' },
  { name: 'Marina Vista', area: 'Dubai Marina', type: 'Apartment', developer: 'Emaar', price: '2.1M', priceNum: 2100000, roi: 7.0, beds: '1-3 Beds', bedsMax: 3, status: 'Ready', img: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?w=800&q=72&auto=format&fit=crop' },
];

const TYPES = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'];
const LOCATIONS = ['All Locations', ...Array.from(new Set(PROJECTS.map((p) => p.area)))];
const DEVELOPERS = ['All Developers', ...Array.from(new Set(PROJECTS.map((p) => p.developer)))];
const BEDROOMS = ['Any', 'Studio', '1', '2', '3', '4+'];
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'ROI: High to Low'];

const SELECT = 'flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600';
const PAGE = 9;

export default function ProjectsBrowser() {
  const [location, setLocation] = useState('All Locations');
  const [developer, setDeveloper] = useState('All Developers');
  const [types, setTypes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [beds, setBeds] = useState('Any');
  const [sort, setSort] = useState('Newest');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);

  const toggleType = (t) => setTypes((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const clearAll = () => {
    setLocation('All Locations'); setDeveloper('All Developers'); setTypes([]);
    setMaxPrice(10000000); setBeds('Any'); setSort('Newest'); setPage(1);
  };

  const filtered = useMemo(() => {
    let list = PROJECTS.filter((p) => {
      if (location !== 'All Locations' && p.area !== location) return false;
      if (developer !== 'All Developers' && p.developer !== developer) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (p.priceNum > maxPrice) return false;
      if (beds !== 'Any') {
        const want = beds === 'Studio' ? 0 : beds === '4+' ? 4 : parseInt(beds, 10);
        if (p.bedsMax < want) return false;
      }
      return true;
    });
    if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.priceNum - b.priceNum);
    else if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.priceNum - a.priceNum);
    else if (sort === 'ROI: High to Low') list = [...list].sort((a, b) => b.roi - a.roi);
    return list;
  }, [location, developer, types, maxPrice, beds, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PAGE, current * PAGE);
  const pct = Math.round(((maxPrice - 500000) / (10000000 - 500000)) * 100);

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_12px_34px_-18px_rgba(20,18,15,0.2)] lg:sticky lg:top-[100px]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1a1a1a]">Filter Projects</h3>
            <button onClick={clearAll} className="text-[11px] font-medium text-[#80603f] hover:underline">Clear All</button>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Location</p>
            <div className="relative mt-2">
              <select value={location} onChange={(e) => { setLocation(e.target.value); setPage(1); }} className={`${SELECT} appearance-none pr-9`}>
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Property Type</p>
            <div className="mt-2 space-y-2">
              {TYPES.map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600">
                  <input type="checkbox" checked={types.includes(t)} onChange={() => { toggleType(t); setPage(1); }} className="h-4 w-4 accent-[#80603f]" /> {t}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Developer</p>
            <div className="relative mt-2">
              <select value={developer} onChange={(e) => { setDeveloper(e.target.value); setPage(1); }} className={`${SELECT} appearance-none pr-9`}>
                {DEVELOPERS.map((d) => <option key={d}>{d}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Max Price (AED)</p>
            <input
              type="range" min={500000} max={10000000} step={50000} value={maxPrice}
              onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
              className="mt-3 w-full accent-[#80603f]"
              style={{ background: `linear-gradient(to right,#80603f ${pct}%,#e5e7eb ${pct}%)` }}
            />
            <div className="mt-1 flex justify-between text-[11px] text-gray-400">
              <span>500K</span><span className="font-semibold text-[#80603f]">{(maxPrice / 1000000).toFixed(maxPrice >= 10000000 ? 0 : 2)}M{maxPrice >= 10000000 ? '+' : ''}</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Bedrooms</p>
            <div className="relative mt-2">
              <select value={beds} onChange={(e) => { setBeds(e.target.value); setPage(1); }} className={`${SELECT} appearance-none pr-9`}>
                {BEDROOMS.map((b) => <option key={b}>{b}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <button onClick={clearAll} className="mt-6 w-full rounded-lg bg-[#0a1320] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#16202d]">Reset Filters</button>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">All Projects <span className="ml-1 text-gray-400">({filtered.length})</span></p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value)} className={`${SELECT} appearance-none pr-9`}>
                  {SORTS.map((s) => <option key={s}>Sort By: {s}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              <span className="hidden items-center gap-1 sm:flex">
                <button onClick={() => setView('grid')} className={`grid h-8 w-8 place-items-center rounded-md ${view === 'grid' ? 'bg-[#80603f] text-white' : 'border border-gray-200 text-gray-400'}`}><LayoutGrid className="h-4 w-4" /></button>
                <button onClick={() => setView('list')} className={`grid h-8 w-8 place-items-center rounded-md ${view === 'list' ? 'bg-[#80603f] text-white' : 'border border-gray-200 text-gray-400'}`}><List className="h-4 w-4" /></button>
              </span>
            </div>
          </div>

          {shown.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
              No projects match your filters. <button onClick={clearAll} className="font-medium text-[#80603f] hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className={view === 'grid' ? 'mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'mt-5 flex flex-col gap-4'}>
              {shown.map((p) => (
                <article key={p.name} className={`group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#80603f]/30 hover:shadow-[0_24px_50px_-18px_rgba(128,96,63,0.3)] ${view === 'list' ? 'flex' : ''}`}>
                  <div className={`relative overflow-hidden ${view === 'list' ? 'w-44 shrink-0' : 'h-44'}`}>
                    <img src={p.img} alt={p.name} loading="lazy" className={`object-cover transition-transform duration-500 group-hover:scale-110 ${view === 'list' ? 'absolute inset-0 h-full w-full' : 'h-full w-full'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">{p.type}</span>
                    <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow">ROI {p.roi.toFixed(1)}%</span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[11px] font-medium text-white"><Calendar className="h-3.5 w-3.5" /> {p.status}</span>
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-semibold text-[#1a1a1a]">{p.name}</h3>
                        <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="h-3 w-3 text-[#80603f]" /> {p.area}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="block text-[9px] font-medium uppercase tracking-wide text-gray-400">From</span>
                        <span className="text-[16px] font-bold leading-none text-[#80603f]"><Dirham className="mr-0.5" />{p.price}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
                      <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-[#80603f]" /> {p.beds}</span>
                      <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-[#80603f]" /> {p.type}</span>
                    </div>

                    <a href="/prototype1/project/one-by-nine" className={`mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-[#80603f]/40 px-5 py-2.5 text-[13px] font-medium text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white ${view === 'list' ? 'w-fit' : 'w-full'}`}>
                      View Details <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {pageCount > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={current === 1}
                className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: pageCount }).map((_, k) => (
                <button
                  key={k}
                  onClick={() => setPage(k + 1)}
                  className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-medium transition-colors ${
                    current === k + 1 ? 'bg-gradient-to-r from-[#96714a] to-[#6b4f33] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#80603f] hover:text-[#80603f]'
                  }`}
                >
                  {k + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={current === pageCount}
                className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
