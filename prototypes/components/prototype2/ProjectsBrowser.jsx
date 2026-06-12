'use client';
// prototype2 — full Projects browser (filters + grid). Mock data, client-side filtering.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Search, SlidersHorizontal, LayoutGrid, List, MapPin, BedDouble,
  Building2, TrendingUp, Heart, ArrowRight, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight, Boxes, Users, Banknote,
} from 'lucide-react';

const STATS = [
  { icon: Boxes, value: '500+', label: 'Premium Projects' },
  { icon: Building2, value: '40+', label: 'Top Developers' },
  { icon: Users, value: '25+', label: 'Communities' },
  { icon: Banknote, value: 'AED 500K+', label: 'Starting Price' },
];

const TABS = ['All Projects', 'Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Off Plan', 'Ready'];
const PROPERTY_TYPES = ['All Types', 'Apartments', 'Villas', 'Townhouses', 'Penthouses'];
const BEDROOMS = ['Studio', '1', '2', '3', '4+'];
const STATUSES = ['Off Plan', 'Ready', 'Under Construction'];

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

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ' +
        (active ? 'border-brand bg-brand text-cream' : 'border-brand-pale text-ink-soft hover:border-brand-soft hover:text-ink')
      }
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  if (status === 'Featured') return null;
  return (
    <span className="rounded-md bg-ink/65 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur-sm">
      {status}
    </span>
  );
}

function ProjectCard({ p }) {
  return (
    <Link
      href={`/prototype2/${p.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-pale bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2F7E6E]/55 hover:shadow-[0_12px_30px_-14px_rgba(47,126,110,0.35)]"
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3">
          <StatusBadge status={p.status} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-ink">{p.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-[12px] text-ink-soft">
          <MapPin size={13} className="text-ink-faint" /> {p.area}
        </p>

        <p className="mt-3 text-[12px] text-ink-soft">
          {p.beds} Beds <span className="text-ink-faint">·</span> {p.units} Units{' '}
          <span className="text-ink-faint">·</span> ROI {p.roi}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-brand-pale pt-4">
          <div>
            <span className="block text-[11px] text-ink-faint">Starting price</span>
            <span className="font-serif text-lg font-bold text-ink">{p.priceLabel}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-ink-soft transition-colors group-hover:text-[#2F7E6E]">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsBrowser({ projects, developers }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All Projects');
  const [view, setView] = useState('grid');
  const [beds, setBeds] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [type, setType] = useState('All Types');
  const [devs, setDevs] = useState(['All Developers']);

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !(`${p.name} ${p.area} ${p.developer}`.toLowerCase().includes(q))) return false;
      if (tab === 'Apartments' || tab === 'Villas' || tab === 'Townhouses' || tab === 'Penthouses') {
        if (p.type !== tab) return false;
      } else if (tab === 'Off Plan' || tab === 'Ready') {
        if (p.availability !== tab) return false;
      }
      return true;
    });
  }, [projects, query, tab]);

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-ink md:text-5xl">Projects</h1>
          <p className="mt-1.5 text-sm text-ink-soft">Find your dream property in Dubai</p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, locations..."
            className="w-full rounded-full border border-brand-pale bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition focus:border-brand"
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-7 grid gap-6 lg:grid-cols-[270px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-brand-pale bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-ink">Filters</span>
            <button
              onClick={() => { setBeds([]); setStatuses([]); setType('All Types'); setDevs(['All Developers']); setQuery(''); setTab('All Projects'); }}
              className="text-[12px] font-medium text-brand hover:text-brand-dark"
            >
              Clear All
            </button>
          </div>

          <div className="mt-4">
            <FilterSection title="Developer">
              <div className="space-y-2.5">
                {developers.map((d) => {
                  const on = devs.includes(d.name);
                  return (
                    <label key={d.name} className="flex cursor-pointer items-center justify-between text-[13px]">
                      <span className="inline-flex items-center gap-2.5 text-ink-soft">
                        <span className={'grid h-4 w-4 place-items-center rounded border ' + (on ? 'border-brand bg-brand text-cream' : 'border-brand-pale')}>
                          {on && <span className="text-[9px] leading-none">✓</span>}
                        </span>
                        {d.name}
                      </span>
                      <span className="text-ink-faint">({d.count})</span>
                      <input type="checkbox" className="hidden" checked={on} onChange={() => toggle(devs, setDevs, d.name)} />
                    </label>
                  );
                })}
                <button className="text-[12px] font-medium text-brand hover:text-brand-dark">Show More ▾</button>
              </div>
            </FilterSection>

            <FilterSection title="Property Type">
              <div className="space-y-2.5">
                {PROPERTY_TYPES.map((t) => {
                  const on = type === t;
                  return (
                    <label key={t} onClick={() => setType(t)} className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft">
                      <span className={'grid h-4 w-4 place-items-center rounded border ' + (on ? 'border-brand bg-brand text-cream' : 'border-brand-pale')}>
                        {on && <span className="text-[9px] leading-none">✓</span>}
                      </span>
                      {t}
                    </label>
                  );
                })}
              </div>
            </FilterSection>

            <FilterSection title="Price Range (AED)">
              <div className="relative mt-1 h-1.5 w-full rounded-full bg-brand-pale">
                <span className="absolute inset-y-0 left-[8%] right-[15%] rounded-full bg-brand" />
                <span className="absolute left-[8%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-white" />
                <span className="absolute right-[15%] top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-white" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input defaultValue="500,000" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-brand" />
                <span className="text-ink-faint">to</span>
                <input defaultValue="10,000,000+" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-brand" />
              </div>
            </FilterSection>

            <FilterSection title="Status">
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <Pill key={s} active={statuses.includes(s)} onClick={() => toggle(statuses, setStatuses, s)}>{s}</Pill>
                ))}
              </div>
            </FilterSection>

            <button className="mt-4 w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main */}
        <div>
          {/* Tabs + controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={
                    'whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ' +
                    (tab === t ? 'border-brand bg-brand text-cream' : 'border-brand-pale bg-white text-ink-soft hover:border-brand-soft hover:text-ink')
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg border border-brand-pale bg-white p-1">
                <button onClick={() => setView('grid')} className={'grid h-7 w-7 place-items-center rounded-md ' + (view === 'grid' ? 'bg-brand text-cream' : 'text-ink-faint')}>
                  <LayoutGrid size={15} />
                </button>
                <button onClick={() => setView('list')} className={'grid h-7 w-7 place-items-center rounded-md ' + (view === 'list' ? 'bg-brand text-cream' : 'text-ink-faint')}>
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-brand-pale py-20 text-center text-ink-faint">
              No projects match your filters.
            </div>
          ) : (
            <div className={'mt-5 grid gap-5 ' + (view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
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
                  (n === '1' ? 'bg-brand text-cream' : n === '…' ? 'text-ink-faint' : 'border border-brand-pale text-ink-soft hover:bg-brand-pale')
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
