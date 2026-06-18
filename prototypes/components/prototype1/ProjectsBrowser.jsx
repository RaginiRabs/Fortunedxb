'use client';

// prototype1 Projects browser — proto2 layout (sidebar + tabs) ported into proto1.
// Grid view = proto2 card + proto3 full colored metric strip. List view = proto1's original list card.
// Toggleable sticky panel, endless load-more. Mock only — uses the prototype2 dataset.
import { useMemo, useState } from 'react';
import {
  Search, SlidersHorizontal, LayoutGrid, List, MapPin, ArrowRight, Calendar,
  BedDouble, Building2, ChevronRight, ChevronDown, ChevronUp, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';
import { projects, developerFacets } from '@/mock/prototype2/projects';

const HEAD = '"Montserrat", "Montserrat Fallback", sans-serif';
const BODY = '"Work Sans", "Work Sans Fallback", sans-serif';

// Treat undefined / null / blank strings as "no data".
const isEmpty = (v) => v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

// Shown in place of a missing value — a muted "N/A" so the label stays meaningful
// and the card's height/structure is unchanged.
function Skel() {
  return <span className="font-normal text-ink-faint" aria-label="Not available">N/A</span>;
}

const TABS = ['All Projects', 'Apartments', 'Villas', 'Townhouses', 'Penthouses', 'Off Plan', 'Ready'];
const PROPERTY_TYPES = ['All Types', 'Apartments', 'Villas', 'Townhouses', 'Penthouses'];
const STATUSES = ['Off Plan', 'Ready', 'Under Construction'];
// 12 = LCM of the grid column counts (1/2/3/4), so every loaded page fills its
// rows completely — no half-empty last row while "Load More" is still showing.
const PAGE = 12;

// TEST ONLY — scenario cards to verify the card's auto-substitution fallbacks.
// Remove this block (and the spread in `filtered`) when done testing.
const TEST_IMG = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
const TEST_CASES = [
  // Control — all fields. Row1: beds + units (type dropped, max 2). Row2: 3 cols.
  { id: 't0', name: 'TEST · All fields', area: 'Dubai', beds: '1 - 3', units: 47, handover: 'Q4 2026', paymentPlan: '60/40', roi: '7.2%', type: 'Apartments', status: 'New Launch', priceLabel: 'AED 610,000', image: TEST_IMG },
  // Row 1 — units missing → beds + type (type with no label).
  { id: 't1', name: 'TEST · Row1 no units', area: 'Dubai', beds: '1 - 3', handover: 'Q4 2026', paymentPlan: '60/40', roi: '7.2%', type: 'Apartments', priceLabel: 'AED 610,000', image: TEST_IMG },
  // Row 1 — beds missing → units + type.
  { id: 't2', name: 'TEST · Row1 no beds', area: 'Dubai', units: 47, handover: 'Q4 2026', paymentPlan: '60/40', roi: '7.2%', type: 'Villas', priceLabel: 'AED 2,100,000', image: TEST_IMG },
  // Row 1 — only type present → single item (just the value).
  { id: 't3', name: 'TEST · Row1 type only', area: 'Dubai', handover: 'Q4 2026', paymentPlan: '60/40', roi: '7.2%', type: 'Townhouses', priceLabel: 'AED 3,400,000', image: TEST_IMG },
  // Row 1 — none of beds/units/type → "coming soon" line.
  { id: 't4', name: 'TEST · Row1 coming soon', area: 'Dubai', handover: 'Q1 2027', paymentPlan: '70/30', roi: '6.5%', priceLabel: 'AED 850,000', image: TEST_IMG },
  // Row 2 — only handover → payment & yield shown as colored hyphens (3 cols).
  { id: 't5', name: 'TEST · Row2 only handover', area: 'Dubai', beds: '1 - 3', units: 47, handover: 'Q2 2027', priceLabel: 'AED 720,000', image: TEST_IMG },
  // Row 2 — only yield → handover & payment shown as colored hyphens (3 cols).
  { id: 't6', name: 'TEST · Row2 only yield', area: 'Dubai', beds: '1 - 2', units: 60, roi: '6.8%', priceLabel: 'AED 990,000', image: TEST_IMG },
  // Row 2 — two present (no yield) → even 2-up layout.
  { id: 't7', name: 'TEST · Row2 two-even', area: 'Dubai', beds: '1 - 4', units: 80, handover: 'Q3 2026', paymentPlan: '60/40', priceLabel: 'AED 1,250,000', image: TEST_IMG },
  // Row 2 — none present → all 3 shown as same-color hyphens.
  { id: 't8', name: 'TEST · Row2 all hyphens', area: 'Dubai', beds: 'Studio', units: 200, type: 'Apartments', priceLabel: 'AED 540,000', image: TEST_IMG },
  // Bare minimum — only required name + location; Row1 "coming soon", Row2 all
  // hyphens, image placeholder, "Price on request".
  { id: 't9', name: 'TEST · Bare minimum', area: 'Dubai', priceLabel: '', image: '' },
];

const STATUS_COLOR = {
  'New Launch': '#2E8B57',
  'Off Plan': '#3B7DD8',
  'Ready': '#2F9E8F',
  'Under Construction': '#D08B2C',
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

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors ' +
        (active ? 'border-[#8C6A52] bg-[#8C6A52] text-cream' : 'border-brand-pale text-ink-soft hover:border-brand-soft hover:text-ink')
      }
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  if (isEmpty(status) || status === 'Featured') return null;
  return (
    <span className="rounded-md px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: STATUS_COLOR[status] || '#8C6A52' }}>
      {status}
    </span>
  );
}

// JIT-safe column-count map for the row-2 metric strip.
const GRID_COLS = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3' };

// Grid card — name + location always shown (no N/A).
function ProjectCard({ p }) {
  const fmt = (v) => (typeof v === 'number' ? v.toLocaleString() : v);

  // Row 1 — beds, units, type (type shows its value with no label). Keep max 2.
  // If none of the three are present, fall back to a "coming soon" beds/units line.
  const ROW1_POOL = [
    { key: 'beds', label: 'Beds', value: p.beds },
    { key: 'units', label: 'Units', value: p.units },
    { key: 'type', label: '', value: p.type },
  ];
  let row1 = ROW1_POOL.filter((m) => !isEmpty(m.value)).slice(0, 2);
  if (row1.length === 0) {
    row1 = [
      { key: 'beds', label: 'Beds', value: 'coming soon', soon: true },
      { key: 'units', label: 'Units', value: 'coming soon', soon: true },
    ];
  }

  // Row 2 — handover, payment, yield only (fixed colors per metric).
  // 3 present → 3 cols; exactly 2 → even 2-up; 1 or 0 present → all 3 cols with
  // the missing ones shown as a hyphen in their own metric color.
  const ROW2 = [
    { key: 'handover', label: 'Handover', value: p.handover, color: 'text-[#2E9E63]' },
    { key: 'paymentPlan', label: 'Payment', value: p.paymentPlan, color: 'text-[#CA8A04]' },
    { key: 'roi', label: 'Yield', value: p.roi, color: 'text-[#2F6FAE]' },
  ];
  const r2present = ROW2.filter((m) => !isEmpty(m.value));
  const row2 = r2present.length >= 2
    ? r2present
    : ROW2.map((m) => (isEmpty(m.value) ? { ...m, value: '-' } : m));

  return (
    <a
      href="/prototype1/project/one-by-nine"
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-pale bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#8C6A52]/50 hover:shadow-[0_14px_32px_-16px_rgba(58,44,34,0.4)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-pale">
        {isEmpty(p.image) ? (
          <div className="flex h-full w-full items-center justify-center text-ink-faint">
            <Building2 size={30} />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.name || 'Project'} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <span className="absolute left-3 top-3">
          <StatusBadge status={p.status} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-base font-semibold text-ink">{p.name}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-soft">
          <MapPin size={13} className="text-ink-faint" /> {p.area}
        </p>

        {/* Row 1 — inline metrics: beds, units, type (type has no label) */}
        {row1.length > 0 && (
          <p className="mt-2 text-[12px] text-ink-soft">
            {row1.map((m, i) => (
              <span key={m.key}>
                {i > 0 && <span className="text-ink-faint"> · </span>}
                {m.soon ? (
                  <>{m.label} <span className="italic text-[#B6A48F]">{m.value}</span></>
                ) : (
                  <>{fmt(m.value)}{m.label ? ` ${m.label}` : ''}</>
                )}
              </span>
            ))}
          </p>
        )}

        {/* Row 2 — colored metric strip: handover, payment, yield */}
        {row2.length > 0 && (
          <div className={`mt-2.5 grid ${GRID_COLS[row2.length]} divide-x divide-[rgba(10,10,18,0.07)] border-t border-brand-pale pt-2.5`}>
            {row2.map((m) => (
              <div key={m.key} className="min-w-0 px-3 first:pl-0 last:pr-0">
                <p title={String(fmt(m.value))} className={`truncate text-[15px] font-bold leading-tight ${m.color}`} style={{ fontFamily: HEAD }}>{fmt(m.value)}</p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-ink-faint">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="block text-[11px] text-ink-faint">Starting price</span>
            {isEmpty(p.priceLabel) ? (
              <span className="mt-0.5 block text-sm font-semibold leading-tight text-ink-soft">Price on request</span>
            ) : (
              <span className="text-lg font-bold text-ink" style={{ fontFamily: HEAD }}><Dirham className="mr-0.5" />{p.priceLabel.replace('AED ', '')}</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-ink-soft transition-colors group-hover:text-[#8C6A52]">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </a>
  );
}

// List view — proto1's original list card (ROI removed, AED sign).
function ProjectListRow({ p }) {
  return (
    <article className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#80603f]/30 hover:shadow-[0_24px_50px_-18px_rgba(128,96,63,0.3)]">
      <div className="relative w-28 shrink-0 overflow-hidden bg-brand-pale sm:w-44">
        {isEmpty(p.image) ? (
          <div className="absolute inset-0 flex items-center justify-center text-ink-faint"><Building2 size={26} /></div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.name || 'Project'} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        {!isEmpty(p.type) && <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">{p.type}</span>}
        {!isEmpty(p.handover) && <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-[11px] font-medium text-white"><Calendar className="h-3.5 w-3.5" /> {p.handover}</span>}
      </div>
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-[#1a1a1a]">{isEmpty(p.name) ? <Skel w={130} h={15} /> : p.name}</h3>
            <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="h-3 w-3 text-[#80603f]" /> {isEmpty(p.area) ? <Skel w={80} h={10} /> : p.area}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="block text-[9px] font-medium uppercase tracking-wide text-gray-400">From</span>
            <span className="text-[16px] font-bold leading-none text-[#80603f]" style={{ fontFamily: HEAD }}>
              {isEmpty(p.priceLabel)
                ? <span className="text-[12px] font-medium text-gray-400">Price on request</span>
                : <><Dirham className="mr-0.5" />{p.priceLabel.replace('AED ', '')}</>}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
          <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-[#80603f]" /> {isEmpty(p.beds) ? <Skel w={16} h={10} /> : p.beds} Beds</span>
          <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-[#80603f]" /> {isEmpty(p.type) ? <Skel w={50} h={10} /> : p.type}</span>
        </div>

        <a href="/prototype1/project/one-by-nine" className="mt-4 flex w-fit items-center justify-center gap-1.5 rounded-lg border border-[#80603f]/40 px-5 py-2.5 text-[13px] font-medium text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
          View Details <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export default function ProjectsBrowser() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All Projects');
  const [view, setView] = useState('grid');
  const [statuses, setStatuses] = useState([]);
  const [type, setType] = useState('All Types');
  const [devs, setDevs] = useState(['All Developers']);
  const [showFilters, setShowFilters] = useState(false); // mobile
  const [panelOpen, setPanelOpen] = useState(true);       // desktop toggle
  const [visible, setVisible] = useState(PAGE);

  const toggle = (arr, set, v) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearAll = () => {
    setStatuses([]); setType('All Types'); setDevs(['All Developers']);
    setQuery(''); setTab('All Projects'); setVisible(PAGE);
  };

  const filtered = useMemo(() => {
    return [...TEST_CASES, ...projects].filter((p) => {
      const q = query.trim().toLowerCase();
      if (q && !(`${p.name} ${p.area} ${p.developer}`.toLowerCase().includes(q))) return false;
      if (['Apartments', 'Villas', 'Townhouses', 'Penthouses'].includes(tab)) {
        if (p.type !== tab) return false;
      } else if (tab === 'Off Plan' || tab === 'Ready') {
        if (p.availability !== tab) return false;
      }
      if (type !== 'All Types' && p.type !== type) return false;
      if (!devs.includes('All Developers') && !devs.includes(p.developer)) return false;
      if (statuses.length && !statuses.includes(p.availability)) return false;
      return true;
    });
  }, [query, tab, type, devs, statuses]);

  const shown = filtered.slice(0, visible);

  // grid columns flex with the panel: open → 3 across, closed → 4 across
  const gridCols = view === 'list'
    ? 'grid-cols-1'
    : panelOpen
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilters((v) => !v)}
        className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-pale bg-white py-3 text-sm font-semibold text-ink lg:hidden"
      >
        <SlidersHorizontal size={16} /> {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`grid gap-6 transition-[grid-template-columns,column-gap] duration-300 ease-in-out ${panelOpen ? 'lg:grid-cols-[270px_1fr]' : 'lg:grid-cols-[0px_1fr] lg:gap-0'}`}>
        {/* Sidebar — animates open/closed (desktop collapse + mobile toggle) */}
        <aside
          style={{ top: 120 }}
          className={`overflow-hidden transition-all duration-300 ease-in-out h-fit self-start rounded-2xl border border-brand-pale bg-white lg:sticky ${showFilters ? 'p-5 max-h-[2000px] opacity-100' : 'p-0 max-h-0 opacity-0'} ${panelOpen ? 'lg:p-5 lg:max-h-[2000px] lg:opacity-100' : 'lg:p-0 lg:max-h-0 lg:opacity-0'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-ink">Filters</span>
            <button onClick={clearAll} className="text-[12px] font-medium text-[#8C6A52] hover:text-[#5E4636]">Clear All</button>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(PAGE); }}
              placeholder="Search projects, locations..."
              className="w-full rounded-full border border-brand-pale bg-white py-2.5 pl-10 pr-4 text-[13px] text-ink outline-none transition focus:border-[#8C6A52]"
            />
          </div>

          <div className="mt-4">
            <FilterSection title="Developer">
              <div className="space-y-2.5">
                {developerFacets.map((d) => {
                  const on = devs.includes(d.name);
                  return (
                    <label key={d.name} className="flex cursor-pointer items-center justify-between text-[13px]">
                      <span className="inline-flex items-center gap-2.5 text-ink-soft">
                        <span className={'grid h-4 w-4 place-items-center rounded border ' + (on ? 'border-[#8C6A52] bg-[#8C6A52] text-cream' : 'border-brand-pale')}>
                          {on && <span className="text-[9px] leading-none">✓</span>}
                        </span>
                        {d.name}
                      </span>
                      <span className="text-ink-faint">({d.count})</span>
                      <input type="checkbox" className="hidden" checked={on} onChange={() => { toggle(devs, setDevs, d.name); setVisible(PAGE); }} />
                    </label>
                  );
                })}
              </div>
            </FilterSection>

            <FilterSection title="Property Type">
              <div className="space-y-2.5">
                {PROPERTY_TYPES.map((t) => {
                  const on = type === t;
                  return (
                    <label key={t} onClick={() => { setType(t); setVisible(PAGE); }} className="flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-soft">
                      <span className={'grid h-4 w-4 place-items-center rounded border ' + (on ? 'border-[#8C6A52] bg-[#8C6A52] text-cream' : 'border-brand-pale')}>
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
                <span className="absolute inset-y-0 left-[8%] right-[15%] rounded-full bg-[#8C6A52]" />
                <span className="absolute left-[8%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8C6A52] bg-white" />
                <span className="absolute right-[15%] top-1/2 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8C6A52] bg-white" />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input defaultValue="500,000" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
                <span className="text-ink-faint">to</span>
                <input defaultValue="10,000,000+" className="w-full rounded-lg border border-brand-pale px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-[#8C6A52]" />
              </div>
            </FilterSection>

            <FilterSection title="Status">
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <Pill key={s} active={statuses.includes(s)} onClick={() => { toggle(statuses, setStatuses, s); setVisible(PAGE); }}>{s}</Pill>
                ))}
              </div>
            </FilterSection>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          {/* Sticky controls — panel toggle (left) + tabs (chips) + view toggle */}
          <div className="sticky z-20 -mx-1 bg-[#faf8f3] px-1 py-3" style={{ top: 80 }}>
            <div className="flex items-center gap-3">
              {/* desktop panel toggle — sits on the left, over the panel it controls */}
              <button
                onClick={() => setPanelOpen((v) => !v)}
                className="hidden h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-pale bg-white text-ink-soft transition-colors hover:border-[#8C6A52] hover:text-[#8C6A52] lg:grid"
                title={panelOpen ? 'Hide filters' : 'Show filters'}
              >
                {panelOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
              </button>

              <div className="no-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setVisible(PAGE); }}
                    className={
                      'whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ' +
                      (tab === t ? 'border-[#8C6A52] bg-white text-[#8C6A52]' : 'border-brand-pale bg-white text-ink-soft hover:border-brand-soft hover:text-ink')
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex shrink-0 items-center gap-1 rounded-lg border border-brand-pale bg-white p-1">
                <button onClick={() => setView('grid')} className={'grid h-7 w-7 place-items-center rounded-md ' + (view === 'grid' ? 'bg-[#8C6A52] text-cream' : 'text-ink-faint')}>
                  <LayoutGrid size={15} />
                </button>
                <button onClick={() => setView('list')} className={'grid h-7 w-7 place-items-center rounded-md ' + (view === 'list' ? 'bg-[#8C6A52] text-cream' : 'text-ink-faint')}>
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          {shown.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-brand-pale py-20 text-center text-ink-faint">
              No projects match your filters.
            </div>
          ) : (
            <div className={'mt-2 grid gap-5 ' + gridCols}>
              {shown.map((p) => (view === 'list' ? <ProjectListRow key={p.id} p={p} /> : <ProjectCard key={p.id} p={p} />))}
            </div>
          )}

          {/* Load more — plain text button, endless scroll */}
          {visible < filtered.length && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisible((v) => v + PAGE)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8C6A52] underline-offset-4 transition-colors hover:text-[#5E4636] hover:underline"
              >
                Load More <ChevronDown size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
