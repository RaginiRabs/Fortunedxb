'use client';
// prototype2 — Resale Properties browser (filters + grid). Mock data, client-side filtering.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, LayoutGrid, List, MapPin, BedDouble, Maximize2,
  Building2, ArrowRight, Phone, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Briefcase, ShieldCheck, TrendingUp, Timer,
} from 'lucide-react';

const STATS = [
  { icon: Briefcase, value: '250+', label: 'Resale Listings' },
  { icon: ShieldCheck, value: '100%', label: 'Verified Properties' },
  { icon: TrendingUp, value: 'Best Market Value', label: 'Great Prices' },
  { icon: Timer, value: 'Quick & Easy', label: 'Smooth Process' },
];

const TABS = ['All Properties', 'Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Ready to Move', 'Tenanted'];
const BEDROOMS = ['Studio', '1', '2', '3', '4+'];

// Semantic badge colors (one per listing label).
const BADGE = {
  'Best Price': '#2E8B57',
  'Hot Deal': '#D14343',
  'Great Value': '#D08B2C',
  'Urgent Sale': '#7E57C2',
  'Negotiable': '#3B7DD8',
  'Vacant': '#2F9E8F',
};

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
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

function ResaleCard({ p }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-brand-pale bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#8C6A52]/50 hover:shadow-[0_14px_32px_-16px_rgba(58,44,34,0.4)]">
      <Link href={`/prototype2/${p.id}`} className="relative block aspect-[16/9] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: BADGE[p.badge] || '#8C6A52' }}>
          {p.badge}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/prototype2/${p.id}`}>
          <h3 className="font-serif text-[16px] font-bold text-ink transition-colors group-hover:text-[#8C6A52]">{p.name}</h3>
        </Link>
        <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
          <MapPin size={13} className="text-ink-faint" /> {p.area}
        </p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-serif text-lg font-bold text-ink">AED {p.price.toLocaleString()}</span>
          <span className="text-[12px] text-ink-faint line-through">AED {p.original.toLocaleString()}</span>
          <span className="text-[12px] font-semibold text-[#8C6A52]">{p.below}% Below Market</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-soft">
          <span className="inline-flex items-center gap-1"><BedDouble size={13} className="text-ink-faint" /> {p.beds}</span>
          <span className="inline-flex items-center gap-1"><Maximize2 size={12} className="text-ink-faint" /> {p.sqft}</span>
          <span className="inline-flex items-center gap-1"><Building2 size={13} className="text-ink-faint" /> {p.type}</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            href={`/prototype2/${p.id}`}
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#8C6A52] py-2 text-[12px] font-semibold text-[#8C6A52] transition-colors hover:bg-[#8C6A52] hover:text-cream"
          >
            View Details <ArrowRight size={13} />
          </Link>
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-pale text-ink-soft transition-colors hover:border-[#8C6A52] hover:text-[#8C6A52]">
            <Phone size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResaleProperties({ properties, typeFacets, statusFacets }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All Properties');
  const [view, setView] = useState('grid');
  const [type, setType] = useState('All Types');
  const [statuses, setStatuses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !`${p.name} ${p.area} ${p.type}`.toLowerCase().includes(q)) return false;
      if (type !== 'All Types' && p.type !== type) return false;
      if (['Apartment', 'Villa', 'Townhouse', 'Penthouse'].includes(tab) && p.type !== tab) return false;
      if ((tab === 'Ready to Move' || tab === 'Tenanted') && p.status !== tab) return false;
      return true;
    });
  }, [properties, query, type, tab]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
      {/* Header: title + stats */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="shrink-0">
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-ink md:text-5xl">Resale Properties</h1>
            <p className="mt-2 text-[15px] font-bold text-ink">Verified listings. Great prices. Ready to move in.</p>
            <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ink-soft">
              Explore handpicked resale properties with the best market value and high ROI potential.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4 rounded-2xl bg-cream-100/60 p-5 sm:grid-cols-4 lg:bg-transparent lg:p-0">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F2EAE1] text-[#8C6A52]"><s.icon size={18} /></span>
                <div className="leading-tight">
                  <div className="text-[14px] font-bold text-ink">{s.value}</div>
                  <div className="text-[11px] text-ink-soft">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilters((v) => !v)}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-pale bg-white py-3 text-sm font-semibold text-ink lg:hidden"
      >
        <SlidersHorizontal size={16} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Body */}
      <div className="mt-4 grid lg:mt-7 lg:gap-6 lg:grid-cols-[270px_1fr]">
        {/* Sidebar — animates open/closed on mobile; always visible on desktop */}
        <aside className={`overflow-hidden transition-all duration-300 ease-in-out lg:!mb-0 lg:!max-h-none lg:!opacity-100 ${showFilters ? 'mb-6 max-h-[2000px] opacity-100' : 'mb-0 max-h-0 opacity-0'} h-fit rounded-2xl border border-brand-pale bg-white p-5 lg:block lg:sticky lg:top-[100px]`}>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-ink">Filters</span>
            <button
              onClick={() => { setType('All Types'); setStatuses([]); setQuery(''); setTab('All Properties'); }}
              className="text-[12px] font-medium text-[#8C6A52] hover:text-[#5E4636]"
            >
              Clear All
            </button>
          </div>

          <div className="mt-4">
            <FilterSection title="Property Type">
              <div className="space-y-2.5">
                <Check on={type === 'All Types'} label="All Types" onClick={() => setType('All Types')} />
                {typeFacets.map((t) => (
                  <Check key={t.name} on={type === t.name} label={t.name} count={t.count} onClick={() => setType(t.name)} />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Price Range (AED)">
              <div className="relative mt-1 h-1.5 w-full rounded-full bg-brand-pale">
                <span className="absolute inset-y-0 left-0 right-0 rounded-full bg-[#8C6A52]" />
                <span className="absolute left-0 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8C6A52] bg-white" />
                <span className="absolute right-0 top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8C6A52] bg-white" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input defaultValue="200,000" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
                <span className="text-ink-faint">to</span>
                <input defaultValue="50,000,000+" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
              </div>
            </FilterSection>

            <FilterSection title="Bedrooms">
              <div className="flex flex-wrap gap-2">
                {BEDROOMS.map((b) => (
                  <button key={b} className="rounded-lg border border-brand-pale px-3.5 py-1.5 text-[12px] font-medium text-ink-soft transition-colors hover:border-[#8C6A52] hover:text-[#8C6A52]">{b}</button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Area (sq.ft)">
              <div className="flex items-center gap-2">
                <input defaultValue="500" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
                <span className="text-ink-faint">to</span>
                <input defaultValue="10,000+" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
              </div>
            </FilterSection>

            <FilterSection title="Status">
              <div className="space-y-2.5">
                {statusFacets.map((s) => (
                  <Check key={s.name} on={statuses.includes(s.name)} label={s.name} count={s.count} onClick={() => toggle(statuses, setStatuses, s.name)} />
                ))}
              </div>
            </FilterSection>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-deeper">
              Apply Filters <SlidersHorizontal size={14} />
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          {/* Search + sort + view */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full flex-1 sm:min-w-[240px] sm:w-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by location, community or building..."
                className="w-full rounded-full border border-brand-pale bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-[#8C6A52]"
              />
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-brand-pale bg-white p-1">
              <button onClick={() => setView('grid')} className={'grid h-8 w-8 place-items-center rounded-md ' + (view === 'grid' ? 'bg-[#8C6A52] text-cream' : 'text-ink-faint')}><LayoutGrid size={15} /></button>
              <button onClick={() => setView('list')} className={'grid h-8 w-8 place-items-center rounded-md ' + (view === 'list' ? 'bg-[#8C6A52] text-cream' : 'text-ink-faint')}><List size={15} /></button>
            </div>
          </div>

          {/* Tabs */}
          <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={
                  'whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ' +
                  (tab === t ? 'border-[#8C6A52] bg-white text-[#8C6A52]' : 'border-brand-pale bg-white text-ink-soft hover:border-[#8C6A52]/60 hover:text-ink')
                }
              >
                {t}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-brand-pale py-20 text-center text-ink-faint">
              No resale properties match your filters.
            </div>
          ) : (
            <div className={'mt-5 grid gap-5 ' + (view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
              {filtered.map((p) => (
                <ResaleCard key={p.id} p={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-9 flex items-center justify-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-brand-pale text-ink-soft hover:bg-brand-pale"><ChevronLeft size={16} /></button>
            {['1', '2', '3', '…', '10'].map((n, i) => (
              <button
                key={i}
                className={
                  'grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-medium ' +
                  (n === '1' ? 'bg-[#8C6A52] text-cream' : n === '…' ? 'text-ink-faint' : 'border border-brand-pale text-ink-soft hover:bg-brand-pale')
                }
              >
                {n}
              </button>
            ))}
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-brand-pale text-ink-soft hover:bg-brand-pale"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
