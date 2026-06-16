'use client';

// prototype5 distress deals browser — functional filters, sort, load-more, grid/list. Mock only.
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, ArrowRight, LayoutGrid, List, TrendingUp } from 'lucide-react';
import Dirham from '@/components/prototype5/Dirham';

const u = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const DEALS = [
  { name: 'Azizi Venice', area: 'Dubai South', type: 'Apartment', market: '1.20M', marketNum: 1200000, deal: '890K', dealNum: 890000, save: '310K', discount: 26, roi: 8.6, img: u('1526495124232-a04e1849168c') },
  { name: 'Golf Gate Apartments', area: 'Dubai Hills Estate', type: 'Apartment', market: '1.70M', marketNum: 1700000, deal: '1.20M', dealNum: 1200000, save: '500K', discount: 29, roi: 8.9, img: u('1518684079-3c830dcef090') },
  { name: 'JVC District 10', area: 'Jumeirah Village Circle', type: 'Apartment', market: '950K', marketNum: 950000, deal: '680K', dealNum: 680000, save: '270K', discount: 28, roi: 9.0, img: u('1582672060674-bc2bd808a8b5') },
  { name: 'DAMAC Lagoons', area: 'Dubai Land', type: 'Villa', market: '1.60M', marketNum: 1600000, deal: '1.15M', dealNum: 1150000, save: '450K', discount: 28, roi: 9.3, img: u('1528702748617-c64d49f918af') },
  { name: 'The Valley – Nara', area: 'Dubai Land', type: 'Townhouse', market: '2.10M', marketNum: 2100000, deal: '1.55M', dealNum: 1550000, save: '550K', discount: 26, roi: 8.8, img: u('1489516408517-0c0a15662682') },
  { name: 'Mirdif Hills', area: 'Mirdif', type: 'Apartment', market: '1.30M', marketNum: 1300000, deal: '950K', dealNum: 950000, save: '350K', discount: 27, roi: 8.4, img: u('1546412414-e1885259563a') },
  { name: 'Downtown Views II', area: 'Downtown Dubai', type: 'Apartment', market: '2.60M', marketNum: 2600000, deal: '1.95M', dealNum: 1950000, save: '650K', discount: 25, roi: 9.5, img: u('1597659840241-37e2b9c2f55f') },
  { name: 'Sobha Creek Vistas', area: 'Sobha Hartland', type: 'Apartment', market: '1.80M', marketNum: 1800000, deal: '1.30M', dealNum: 1300000, save: '500K', discount: 28, roi: 8.7, img: u('1512453979798-5ea266f8880c') },
  { name: 'Rukan Lofts', area: 'Wadi Al Safa', type: 'Townhouse', market: '1.10M', marketNum: 1100000, deal: '780K', dealNum: 780000, save: '320K', discount: 29, roi: 9.2, img: u('1518684079-3c830dcef090') },
  { name: 'Maple at Dubai Hills', area: 'Dubai Hills Estate', type: 'Villa', market: '3.20M', marketNum: 3200000, deal: '2.40M', dealNum: 2400000, save: '800K', discount: 25, roi: 10.1, img: u('1489516408517-0c0a15662682') },
];

const LOCATIONS = ['All Locations', ...Array.from(new Set(DEALS.map((d) => d.area)))];
const TYPES = ['All Property Types', 'Apartment', 'Villa', 'Townhouse'];
const PRICES = ['Any Price', 'Under AED 1M', 'AED 1M – 2M', 'AED 2M+'];
const SORTS = ['Newest', 'Highest Discount', 'Price: Low to High', 'Price: High to Low', 'Highest ROI'];

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

export default function DistressBrowser() {
  const [loc, setLoc] = useState('All Locations');
  const [type, setType] = useState('All Property Types');
  const [price, setPrice] = useState('Any Price');
  const [sort, setSort] = useState('Newest');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = DEALS.filter((d) => {
      if (loc !== 'All Locations' && d.area !== loc) return false;
      if (type !== 'All Property Types' && d.type !== type) return false;
      if (price === 'Under AED 1M' && d.dealNum >= 1000000) return false;
      if (price === 'AED 1M – 2M' && (d.dealNum < 1000000 || d.dealNum > 2000000)) return false;
      if (price === 'AED 2M+' && d.dealNum < 2000000) return false;
      return true;
    });
    if (sort === 'Highest Discount') list = [...list].sort((a, b) => b.discount - a.discount);
    else if (sort === 'Price: Low to High') list = [...list].sort((a, b) => a.dealNum - b.dealNum);
    else if (sort === 'Price: High to Low') list = [...list].sort((a, b) => b.dealNum - a.dealNum);
    else if (sort === 'Highest ROI') list = [...list].sort((a, b) => b.roi - a.roi);
    return list;
  }, [loc, type, price, sort]);

  const reset = (fn) => (e) => { fn(e.target.value); setPage(1); };
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE));
  const current = Math.min(page, pageCount);
  const shown = filtered.slice((current - 1) * PAGE, current * PAGE);

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">All Distress Deals <span className="ml-1 text-gray-400">({filtered.length})</span></p>

      <div className="mt-4 flex flex-wrap items-center gap-2.5">
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
        <div className="mt-8 rounded-2xl border border-dashed border-gray-200 py-14 text-center text-sm text-gray-400">No deals match your filters.</div>
      ) : (
        <div className={view === 'grid' ? 'mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'mt-5 flex flex-col gap-4'}>
          {shown.map((d) => (
            <article key={d.name} className={`group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_-18px_rgba(128,96,63,0.28)] ${view === 'list' ? 'flex' : ''}`}>
              <div className={`relative overflow-hidden ${view === 'list' ? 'w-44 shrink-0' : 'h-40'}`}>
                <img src={d.img} alt={d.name} loading="lazy" className={`object-cover transition-transform duration-500 group-hover:scale-110 ${view === 'list' ? 'absolute inset-0 h-full w-full' : 'h-full w-full'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute left-3 top-3 rounded-md bg-[#80603f] px-2 py-0.5 text-[10px] font-bold text-white shadow">{d.discount}% OFF</span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#80603f] shadow backdrop-blur">Save <Dirham className="mx-0.5" />{d.save}</span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{d.name}</h3>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="h-3 w-3 text-[#80603f]" /> {d.area}</p>

                <div className="mt-3 rounded-xl bg-[#faf6ef] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wide text-gray-400">Deal Price</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"><TrendingUp className="h-3 w-3" /> {d.roi}%</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-[18px] font-bold text-[#80603f]"><Dirham className="mr-0.5" />{d.deal}</span>
                    <span className="text-[11px] text-gray-400 line-through"><Dirham className="mr-0.5" />{d.market}</span>
                  </div>
                </div>

                <a href="/prototype5/project/one-by-nine" className={`mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-4 py-2.5 text-[12px] font-medium text-white transition-all hover:brightness-105 ${view === 'list' ? 'w-fit' : 'w-full'}`}>
                  View Details <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
          {Array.from({ length: pageCount }).map((_, k) => (
            <button key={k} onClick={() => setPage(k + 1)} className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-medium transition-colors ${current === k + 1 ? 'bg-gradient-to-r from-[#96714a] to-[#6b4f33] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#80603f] hover:text-[#80603f]'}`}>{k + 1}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={current === pageCount} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
        </div>
      )}
    </div>
  );
}
