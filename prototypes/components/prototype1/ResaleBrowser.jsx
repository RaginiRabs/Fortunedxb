'use client';

// prototype1 resale listings browser — functional filters, sort, pagination, grid/list. Mock only.
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Maximize, Calendar, ArrowRight, LayoutGrid, List, BadgeCheck } from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';

const u = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const PROPS = [
  { name: '2 BR Apartment', area: 'Business Bay', type: 'Apartment', sqft: '1,850', built: '2022', price: '2.85M', priceNum: 2850000, roi: 8.1, status: 'Vacant', img: u('1582672060674-bc2bd808a8b5') },
  { name: '3 BR Apartment', area: 'Dubai Marina', type: 'Apartment', sqft: '1,600', built: '2021', price: '2.60M', priceNum: 2600000, roi: 8.7, status: 'Rented', img: u('1528702748617-c64d49f918af') },
  { name: '4 BR Townhouse', area: 'Arabian Ranches', type: 'Townhouse', sqft: '2,450', built: '2020', price: '3.10M', priceNum: 3100000, roi: 7.5, status: 'Vacant', img: u('1518684079-3c830dcef090') },
  { name: '1 BR Apartment', area: 'Downtown Dubai', type: 'Apartment', sqft: '850', built: '2023', price: '1.45M', priceNum: 1450000, roi: 8.3, status: 'Ready', img: u('1512453979798-5ea266f8880c') },
  { name: '4 BR Villa', area: 'Dubai Hills Estate', type: 'Villa', sqft: '3,600', built: '2020', price: '7.25M', priceNum: 7250000, roi: 7.9, status: 'Vacant', img: u('1546412414-e1885259563a') },
  { name: '3 BR Apartment', area: 'Jumeirah Village Circle', type: 'Apartment', sqft: '1,350', built: '2021', price: '1.25M', priceNum: 1250000, roi: 9.2, status: 'Rented', img: u('1597659840241-37e2b9c2f55f') },
  { name: '5 BR Villa', area: 'Palm Jumeirah', type: 'Villa', sqft: '5,500', built: '2019', price: '18.5M', priceNum: 18500000, roi: 6.8, status: 'Vacant', img: u('1489516408517-0c0a15662682') },
  { name: '2 BR Apartment', area: 'Dubai Creek Harbour', type: 'Apartment', sqft: '1,100', built: '2022', price: '1.90M', priceNum: 1900000, roi: 8.0, status: 'Ready', img: u('1526495124232-a04e1849168c') },
  { name: '3 BR Apartment', area: 'Downtown Dubai', type: 'Apartment', sqft: '1,650', built: '2022', price: '2.95M', priceNum: 2950000, roi: 7.8, status: 'Rented', img: u('1512453979798-5ea266f8880c') },
  { name: '2 BR Apartment', area: 'Dubai Marina', type: 'Apartment', sqft: '1,250', built: '2021', price: '2.30M', priceNum: 2300000, roi: 8.2, status: 'Vacant', img: u('1528702748617-c64d49f918af') },
];

const LOCATIONS = ['All Locations', ...Array.from(new Set(PROPS.map((p) => p.area)))];
const TYPES = ['All Property Types', 'Apartment', 'Villa', 'Townhouse'];
const PRICES = ['Price Range', 'Under AED 2M', 'AED 2M – 5M', 'AED 5M+'];
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Highest ROI'];
const STATUS_TONE = { Vacant: 'bg-emerald-500', Rented: 'bg-[#80603f]', Ready: 'bg-blue-500' };

const SELECT = 'appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-[12px] text-gray-600 outline-none focus:border-[#80603f]';
const PAGE = 6;

function Field({ value, onChange, options }) {
  return (
    <div className="relative">
      <select value={value} onChange={onChange} className={SELECT}>{options.map((o) => <option key={o}>{o}</option>)}</select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

export default function ResaleBrowser() {
  const [loc, setLoc] = useState('All Locations');
  const [type, setType] = useState('All Property Types');
  const [price, setPrice] = useState('Price Range');
  const [sort, setSort] = useState('Newest');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = PROPS.filter((p) => {
      if (loc !== 'All Locations' && p.area !== loc) return false;
      if (type !== 'All Property Types' && p.type !== type) return false;
      if (price === 'Under AED 2M' && p.priceNum >= 2000000) return false;
      if (price === 'AED 2M – 5M' && (p.priceNum < 2000000 || p.priceNum > 5000000)) return false;
      if (price === 'AED 5M+' && p.priceNum < 5000000) return false;
      return true;
    });
    if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.priceNum - b.priceNum);
    else if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.priceNum - a.priceNum);
    else if (sort === 'Highest ROI') list = [...list].sort((a, b) => b.roi - a.roi);
    return list;
  }, [loc, type, price, sort]);

  const reset = (fn) => (e) => { fn(e.target.value); setPage(1); };
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PAGE, current * PAGE);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Field value={loc} onChange={reset(setLoc)} options={LOCATIONS} />
        <Field value={type} onChange={reset(setType)} options={TYPES} />
        <Field value={price} onChange={reset(setPrice)} options={PRICES} />
        <div className="ml-auto flex items-center gap-2">
          <Field value={sort} onChange={(e) => setSort(e.target.value)} options={SORTS} />
          <button onClick={() => setView('grid')} className={`grid h-8 w-8 place-items-center rounded-md ${view === 'grid' ? 'bg-[#80603f] text-white' : 'border border-gray-200 text-gray-400'}`}><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setView('list')} className={`grid h-8 w-8 place-items-center rounded-md ${view === 'list' ? 'bg-[#80603f] text-white' : 'border border-gray-200 text-gray-400'}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-200 py-14 text-center text-sm text-gray-400">No properties match your filters.</div>
      ) : (
        <div className={view === 'grid' ? 'mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'mt-5 flex flex-col gap-4'}>
          {shown.map((p, idx) => (
            <article key={`${p.name}-${idx}`} className={`group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-18px_rgba(128,96,63,0.28)] ${view === 'list' ? 'flex' : ''}`}>
              <div className={`relative overflow-hidden ${view === 'list' ? 'w-48 shrink-0' : 'h-44'}`}>
                <img src={p.img} alt={p.name} loading="lazy" className={`object-cover transition-transform duration-500 group-hover:scale-110 ${view === 'list' ? 'absolute inset-0 h-full w-full' : 'h-full w-full'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[#80603f] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow"><BadgeCheck className="h-3 w-3" /> Verified</span>
                <span className={`absolute right-3 top-3 rounded-full ${STATUS_TONE[p.status] || 'bg-gray-500'} px-2 py-0.5 text-[9px] font-semibold text-white shadow`}>{p.status}</span>
                <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wide text-white/70">Price</span>
                    <span className="text-[17px] font-bold text-white"><Dirham className="mr-0.5" />{p.price}</span>
                  </div>
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow">ROI {p.roi}%</span>
                </div>
              </div>
              <div className="flex-1 p-4">
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{p.name}</h3>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="h-3 w-3 text-[#80603f]" /> {p.area}</p>
                <div className="mt-3 flex items-center gap-4 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
                  <span className="inline-flex items-center gap-1.5"><Maximize className="h-4 w-4 text-[#80603f]" /> {p.sqft} Sq.Ft</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[#80603f]" /> {p.built}</span>
                </div>
                <a href="/prototype1/project/one-by-nine" className={`mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-4 py-2.5 text-[12px] font-medium text-white transition-all hover:brightness-105 ${view === 'list' ? 'w-fit' : 'w-full'}`}>View Property <ArrowRight className="h-3.5 w-3.5" /></a>
              </div>
            </article>
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
          {Array.from({ length: pageCount }).map((_, k) => (
            <button key={k} onClick={() => setPage(k + 1)} className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-medium transition-colors ${current === k + 1 ? 'bg-gradient-to-r from-[#96714a] to-[#6b4f33] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#80603f] hover:text-[#80603f]'}`}>{k + 1}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={current === pageCount} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
        </div>
      )}
    </div>
  );
}
