'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { Search, Building2, MapPin, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react';
import Card from '@/components/prototype3/Card';
import ProjectRow from '@/components/prototype3/ProjectRow';

const PRICES = [
  ['', 'Any price'],
  ['0-1500000', 'Under AED 1.5M'],
  ['1500000-3000000', 'AED 1.5M – 3M'],
  ['3000000-', 'AED 3M+'],
];

const SORTS = [
  ['featured', 'Featured'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['yield-desc', 'Highest yield'],
];

const selectCls =
  'w-full cursor-pointer appearance-none rounded-xl border border-[rgba(10,10,18,0.12)] bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-[#0A0A12] outline-none transition hover:border-[rgba(10,10,18,0.28)] focus:border-[#80603f] focus:ring-2 focus:ring-[#80603f]/15';

function Select({ icon: Icon, value, onChange, children, label }) {
  return (
    <div className="relative">
      <Icon aria-hidden="true" size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#80603f]" />
      <select aria-label={label} value={value} onChange={onChange} className={selectCls}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5E5E66]" />
    </div>
  );
}

function Group({ label, children }) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">{label}</p>
      {children}
    </div>
  );
}

export default function SearchCards({ projects, placeholder = 'Search project or area…', wide = false }) {
  const [q, setQ] = useState('');
  const [developer, setDeveloper] = useState('');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const developers = useMemo(() => [...new Set(projects.map((p) => p.developer))].sort(), [projects]);
  const areas = useMemo(() => [...new Set(projects.map((p) => p.area))].sort(), [projects]);

  const s = q.trim().toLowerCase();
  const [min, max] = price ? price.split('-').map((n) => (n === '' ? Infinity : Number(n))) : [0, Infinity];

  const filtered = projects.filter((p) => {
    if (s && ![p.name, p.developer, p.area].some((v) => v.toLowerCase().includes(s))) return false;
    if (developer && p.developer !== developer) return false;
    if (area && p.area !== area) return false;
    if (price && (p.priceFrom < min || p.priceFrom > max)) return false;
    return true;
  });

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'price-asc') arr.sort((a, b) => a.priceFrom - b.priceFrom);
    else if (sort === 'price-desc') arr.sort((a, b) => b.priceFrom - a.priceFrom);
    else if (sort === 'yield-desc') arr.sort((a, b) => parseFloat(b.yield) - parseFloat(a.yield));
    return arr;
  }, [filtered, sort]);

  const activeCount = [developer, area, price].filter(Boolean).length + (s ? 1 : 0);
  const clearAll = () => {
    setQ('');
    setDeveloper('');
    setArea('');
    setPrice('');
  };

  // Pagination — reset to page 1 whenever the result set changes.
  const PAGE_SIZE = 6;
  const resultsRef = useRef(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [q, developer, area, price, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const paged = sorted.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const goTo = (p) => {
    setPage(p);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
      {/* Filter sidebar */}
      <aside className="mb-6 lg:mb-0">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-[rgba(10,10,18,0.08)] bg-[#FAF7F3] p-4">
            {/* Search — always visible */}
            <div className="relative">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9AA3]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-[rgba(10,10,18,0.12)] bg-white py-2.5 pl-10 pr-3 text-sm text-[#0A0A12] outline-none transition placeholder:text-[#9A9AA3] focus:border-[#80603f] focus:ring-2 focus:ring-[#80603f]/15"
              />
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="mt-3 flex w-full items-center justify-between rounded-xl border border-[rgba(10,10,18,0.12)] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#0A0A12] lg:hidden"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-[#80603f]" /> Filters
                {activeCount > 0 && <span className="rounded-full bg-[#80603f] px-1.5 text-[11px] font-bold text-white">{activeCount}</span>}
              </span>
              <ChevronDown size={16} className={`text-[#5E5E66] transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter groups */}
            <div className={`${filtersOpen ? 'mt-4 grid' : 'hidden'} gap-4 lg:mt-4 lg:grid`}>
              <Group label="Developer">
                <Select icon={Building2} value={developer} onChange={(e) => setDeveloper(e.target.value)} label="Developer">
                  <option value="">Any developer</option>
                  {developers.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </Group>
              <Group label="Location">
                <Select icon={MapPin} value={area} onChange={(e) => setArea(e.target.value)} label="Location">
                  <option value="">Any location</option>
                  {areas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </Select>
              </Group>
              <Group label="Price range">
                <div className="grid gap-1.5">
                  {PRICES.map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setPrice(v)}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${
                        price === v
                          ? 'border-[#80603f] bg-[#80603f]/8 text-[#80603f]'
                          : 'border-[rgba(10,10,18,0.1)] bg-white text-[#2A2A32] hover:border-[rgba(10,10,18,0.24)]'
                      }`}
                    >
                      <span className={`grid h-4 w-4 place-items-center rounded-full border ${price === v ? 'border-[#80603f]' : 'border-[rgba(10,10,18,0.25)]'}`}>
                        {price === v && <span className="h-2 w-2 rounded-full bg-[#80603f]" />}
                      </span>
                      {l}
                    </button>
                  ))}
                </div>
              </Group>

              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[rgba(10,10,18,0.14)] bg-white px-3 py-2 text-xs font-semibold text-[#0A0A12] transition-colors hover:border-[#80603f] hover:text-[#80603f]"
                >
                  <X size={13} /> Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Results */}
      <div ref={resultsRef} className="min-w-0 scroll-mt-24">
        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-semibold text-[#55555E]">
            <span className="text-[#0A0A12]">{sorted.length}</span> {sorted.length === 1 ? 'property' : 'properties'}
          </p>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                aria-label="Sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer appearance-none rounded-full border border-[rgba(10,10,18,0.12)] bg-white py-2 pl-3.5 pr-8 text-[13px] font-semibold text-[#0A0A12] outline-none transition hover:border-[rgba(10,10,18,0.28)] focus:border-[#80603f]"
              >
                {SORTS.map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5E5E66]" />
            </div>
            <div className="flex items-center rounded-full border border-[rgba(10,10,18,0.12)] bg-white p-0.5">
              {[
                ['grid', LayoutGrid],
                ['list', List],
              ].map(([v, Icon]) => (
                <button
                  key={v}
                  type="button"
                  aria-label={`${v} view`}
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                    view === v ? 'bg-[#80603f] text-white' : 'text-[#9A9AA3] hover:text-[#0A0A12]'
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[rgba(10,10,18,0.16)] py-16 text-center">
            <p className="text-sm font-semibold text-[#0A0A12]">No properties match your filters</p>
            <button type="button" onClick={clearAll} className="mt-2 text-sm font-semibold text-[#80603f] underline-offset-4 hover:underline">
              Clear all filters
            </button>
          </div>
        ) : view === 'grid' ? (
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${wide ? '' : 'min-[1200px]:grid-cols-3'}`}>
            {paged.map((p) => (
              <Card key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <div className="space-y-3.5">
            {paged.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-9 flex items-center justify-center gap-1.5">
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => goTo(current - 1)}
              disabled={current === 1}
              className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(10,10,18,0.12)] bg-white text-[#0A0A12] transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[rgba(10,10,18,0.12)] disabled:hover:text-[#0A0A12]"
            >
              <ChevronLeft size={17} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Page ${n}`}
                aria-current={current === n}
                onClick={() => goTo(n)}
                className={`h-9 min-w-9 rounded-full px-3 text-sm font-semibold transition-colors ${
                  current === n
                    ? 'bg-[#80603f] text-white'
                    : 'border border-[rgba(10,10,18,0.12)] bg-white text-[#0A0A12] hover:border-[#80603f] hover:text-[#80603f]'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              aria-label="Next page"
              onClick={() => goTo(current + 1)}
              disabled={current === totalPages}
              className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(10,10,18,0.12)] bg-white text-[#0A0A12] transition-colors hover:border-[#80603f] hover:text-[#80603f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[rgba(10,10,18,0.12)] disabled:hover:text-[#0A0A12]"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
