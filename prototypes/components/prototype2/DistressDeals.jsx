'use client';
// prototype2 — Distress Deals browser with live countdown timers. Mock data.
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search, LayoutGrid, List, Heart, MapPin, BedDouble, Maximize2, Building2,
  ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Gift, TrendingDown,
  ShieldCheck, Clock, BadgeCheck, Lock, Headset, SlidersHorizontal,
} from 'lucide-react';

const STATS = [
  { icon: Gift, value: '120+', label: 'Exclusive Deals' },
  { icon: TrendingDown, value: 'Up to 45%', label: 'Below Market Price' },
  { icon: ShieldCheck, value: '100%', label: 'Verified Properties' },
  { icon: Clock, value: 'Limited Time', label: 'Quick Decisions Only' },
];

const PROPERTY_TYPES = ['All Types', 'Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Commercial'];

const pad = (n) => String(n).padStart(2, '0');
function parts(s) {
  return [
    [pad(Math.floor(s / 86400)), 'd'],
    [pad(Math.floor((s % 86400) / 3600)), 'h'],
    [pad(Math.floor((s % 3600) / 60)), 'm'],
    [pad(s % 60), 's'],
  ];
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-brand-pale py-4 first:border-t-0 first:pt-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-left">
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        {open ? <ChevronUp size={15} className="text-ink-faint" /> : <ChevronDown size={15} className="text-ink-faint" />}
      </button>
      {open && <div className="mt-3.5">{children}</div>}
    </div>
  );
}

function Check({ on, label, count, onClick }) {
  return (
    <label onClick={onClick} className="flex cursor-pointer items-center justify-between text-[13px]">
      <span className="inline-flex items-center gap-2.5 text-ink-soft">
        <span className={'grid h-4 w-4 place-items-center rounded border ' + (on ? 'border-[#8C6A52] bg-[#8C6A52] text-cream' : 'border-brand-pale')}>
          {on && <span className="text-[9px] leading-none">✓</span>}
        </span>
        {label}
      </span>
      {count != null && <span className="text-ink-faint">({count})</span>}
    </label>
  );
}

function DealCard({ d, seconds }) {
  return (
    <Link
      href={`/prototype2/${d.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-pale bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#8C6A52]/50 hover:shadow-[0_14px_32px_-16px_rgba(58,44,34,0.4)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: '#2E8B57' }}>
          {d.discount}% OFF
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-[16px] font-bold text-ink">{d.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
          <MapPin size={13} className="text-ink-faint" /> {d.area}
        </p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-lg font-bold text-ink">AED {d.price.toLocaleString()}</span>
          <span className="text-[12px] text-ink-faint line-through">AED {d.original.toLocaleString()}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-soft">
          <span className="inline-flex items-center gap-1"><BedDouble size={13} className="text-ink-faint" /> {d.beds}</span>
          <span className="inline-flex items-center gap-1"><Maximize2 size={12} className="text-ink-faint" /> {d.sqft}</span>
          <span className="inline-flex items-center gap-1"><Building2 size={13} className="text-ink-faint" /> {d.type}</span>
        </div>

        {/* Countdown — boxed, eye-catching (above View Details) */}
        <div className="mt-auto pt-3.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D14343]">
            <Clock size={12} className="animate-pulse" /> Expires in
          </span>
          <div className="mt-1.5 flex items-center gap-1.5">
            {parts(seconds).map(([num, u]) => (
              <span key={u} className="flex items-baseline gap-0.5 rounded-md bg-[#FBEDED] px-2 py-1.5">
                <span className="font-mono text-[14px] font-extrabold leading-none tabular-nums text-[#D14343]">{num}</span>
                <span className="text-[9px] font-bold leading-none text-[#D14343]">{u}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function DistressDeals({ deals, dealTypes, discounts }) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState('grid');
  const [dealType, setDealType] = useState('All Deals');
  const [ptype, setPtype] = useState('All Types');
  const [disc, setDisc] = useState([]);
  const [secs, setSecs] = useState(() => deals.map((d) => d.secondsLeft));

  // live countdown
  useEffect(() => {
    const t = setInterval(() => setSecs((arr) => arr.map((s) => (s > 0 ? s - 1 : 0))), 1000);
    return () => clearInterval(t);
  }, []);

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    return deals
      .map((d, i) => ({ d, i }))
      .filter(({ d }) => {
        const q = query.trim().toLowerCase();
        if (q && !`${d.name} ${d.area}`.toLowerCase().includes(q)) return false;
        if (dealType !== 'All Deals' && d.dealType !== dealType && `${d.dealType}s` !== dealType) return false;
        if (ptype !== 'All Types' && `${d.type}s` !== ptype && d.type !== ptype.replace(/s$/, '')) return false;
        return true;
      });
  }, [deals, query, dealType, ptype]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
      {/* Header + search on one line */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-extrabold tracking-tight text-ink md:text-5xl">Distress Deals</h1>
          <p className="mt-2 text-[15px] font-semibold text-ink">Exclusive Properties. Unbeatable Prices.</p>
          <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ink-soft">
            Handpicked distressed properties with huge discounts. 100% verified deals for smart investors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project name, location..."
              className="w-full rounded-full border border-brand-pale bg-white py-2.5 pl-10 pr-4 text-[13px] text-ink outline-none transition focus:border-[#8C6A52]"
            />
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg border border-brand-pale bg-white p-1">
            <button onClick={() => setView('grid')} className={'grid h-7 w-7 place-items-center rounded-md ' + (view === 'grid' ? 'bg-[#8C6A52] text-cream' : 'text-ink-faint')}><LayoutGrid size={15} /></button>
            <button onClick={() => setView('list')} className={'grid h-7 w-7 place-items-center rounded-md ' + (view === 'list' ? 'bg-[#8C6A52] text-cream' : 'text-ink-faint')}><List size={15} /></button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-brand-pale bg-white p-5 lg:sticky lg:top-[100px]">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-ink">Filters</span>
            <button onClick={() => { setDealType('All Deals'); setPtype('All Types'); setDisc([]); setQuery(''); }} className="text-[12px] font-medium text-[#8C6A52] hover:text-[#5E4636]">Clear All</button>
          </div>

          <div className="mt-4">
            <FilterSection title="Property Type">
              <div className="space-y-2.5">
                {PROPERTY_TYPES.map((t) => (
                  <Check key={t} on={ptype === t} label={t} onClick={() => setPtype(t)} />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price Range (AED)">
              <div className="relative mt-1 h-1.5 w-full rounded-full bg-brand-pale">
                <span className="absolute inset-y-0 left-[5%] right-[12%] rounded-full bg-[#8C6A52]" />
                <span className="absolute left-[5%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8C6A52] bg-white" />
                <span className="absolute right-[12%] top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8C6A52] bg-white" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input defaultValue="200,000" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
                <span className="text-ink-faint">to</span>
                <input defaultValue="10,000,000+" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
              </div>
            </FilterSection>

            <FilterSection title="Discount">
              <div className="space-y-2.5">
                {discounts.map((t) => (
                  <Check key={t.name} on={disc.includes(t.name)} label={t.name} count={t.count} onClick={() => toggle(disc, setDisc, t.name)} />
                ))}
              </div>
            </FilterSection>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-deeper">
              Apply Filters <SlidersHorizontal size={14} />
            </button>
          </div>
        </aside>

        {/* Main grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-pale py-20 text-center text-ink-faint">No deals match your filters.</div>
          ) : (
            <div className={'grid gap-5 ' + (view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
              {filtered.map(({ d, i }) => (
                <DealCard key={d.id} d={d} seconds={secs[i]} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-9 flex items-center justify-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-brand-pale text-ink-soft hover:bg-brand-pale"><ChevronLeft size={16} /></button>
            {['1', '2', '3'].map((n) => (
              <button key={n} className={'grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-medium ' + (n === '1' ? 'bg-[#8C6A52] text-cream' : 'border border-brand-pale text-ink-soft hover:bg-brand-pale')}>{n}</button>
            ))}
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-brand-pale text-ink-soft hover:bg-brand-pale"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-brand-pale bg-white px-6 py-6 lg:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F2EAE1] text-[#8C6A52]"><Gift size={18} /></span>
          <div>
            <div className="text-[15px] font-bold text-ink">High Discounts. Limited Time.</div>
            <div className="text-[12px] text-ink-soft">These deals won&apos;t last long. Act now!</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {[
            { icon: BadgeCheck, t: 'Best Prices', s: 'Guaranteed' },
            { icon: ShieldCheck, t: '100% Verified', s: 'Properties' },
            { icon: Lock, t: 'Secure', s: '& Transparent' },
            { icon: Headset, t: 'Expert', s: 'Support' },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-2">
              <x.icon size={18} className="text-[#8C6A52]" />
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-ink">{x.t}</div>
                <div className="text-[11px] text-ink-faint">{x.s}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-[#8C6A52] px-5 py-2.5 text-[13px] font-semibold text-[#8C6A52] transition-colors hover:bg-[#8C6A52] hover:text-cream">
          View All Deals <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
