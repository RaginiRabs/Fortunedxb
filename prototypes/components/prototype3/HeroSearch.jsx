'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, Building2, Home, Tag, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';

// Full-bleed hero: big background image (left white → smooth merge → property right),
// heading + advanced search box sit inside it. Minimal mock dropdown filters.
// On submit: distress type → distress page, everything else → projects page.
const DEVELOPERS = ['Sobha Realty', 'Meraas', 'Select Group', 'Emaar', 'Damac'];
const TYPES = [
  ['off-plan', 'Off-Plan'],
  ['resale', 'Resale'],
  ['distress', 'Distress'],
];
const PRICES = [
  ['', 'Any price'],
  ['0-1500000', 'Up to AED 1.5M'],
  ['1500000-3000000', 'AED 1.5M – 3M'],
  ['3000000-99000000', 'AED 3M+'],
];
const POPULAR = ['Dubai Marina', 'Sobha Hartland', 'Bluewaters'];
const STATS = [
  ['1,500+', 'Units sold'],
  ['40+', 'Developers'],
  ['AED 4B+', 'Transacted'],
];

// Brand brown + WCAG-safe greys (all ≥ 4.5:1 on white).
const BROWN = '#80603f';
const INK = '#0A0A12'; // 18:1
const MUTED = '#55555E'; // ~7:1
const FAINT = '#5E5E66'; // ~6:1 (smallest text still passes)

const selectCls =
  'w-full appearance-none rounded-xl border border-[rgba(10,10,18,0.14)] bg-white py-2.5 pl-9 pr-8 text-sm font-medium text-[#0A0A12] outline-none transition hover:border-[rgba(10,10,18,0.28)] focus-visible:border-[#80603f] focus-visible:ring-2 focus-visible:ring-[#80603f]/30';

// Labeled select with leading icon + chevron — clear affordance & a11y.
function Field({ id, label, icon: Icon, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5E5E66]">
        {label}
      </label>
      <div className="relative">
        <Icon aria-hidden="true" size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#80603f]" />
        {children}
        <ChevronDown aria-hidden="true" size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5E5E66]" />
      </div>
    </div>
  );
}

export default function HeroSearch() {
  const router = useRouter();
  const [developer, setDeveloper] = useState('');
  const [type, setType] = useState('off-plan');
  const [price, setPrice] = useState('');

  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (developer) params.set('developer', developer);
    if (type) params.set('type', type);
    if (price) params.set('price', price);
    const dest = type === 'distress' ? '/prototype3/distress' : '/prototype3/projects';
    router.push(`${dest}?${params.toString()}`);
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[500px] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 sm:min-h-[540px] sm:rounded-3xl md:min-h-[560px]"
    >
      {/* background image — full width, decorative */}
      <img
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* mobile scrim — keeps text ≥ 4.5:1 over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/45 md:hidden" />
      {/* desktop smooth white → image merge */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-white from-[18%] via-white/70 via-[46%] to-transparent md:block" />

      {/* content inside the image */}
      <div className="relative flex min-h-[500px] flex-col justify-center gap-6 p-6 motion-safe:animate-[fadeUp_0.7s_cubic-bezier(0.22,1,0.36,1)] sm:min-h-[540px] sm:gap-7 sm:p-9 md:min-h-[560px] md:max-w-[52%] md:p-14">
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(10,10,18,0.1)] bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A6A1F]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#80603f]" /> Dubai · Off-Plan, Resale &amp; Distress
          </span>
          <h1
            id="hero-heading"
            className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.05] tracking-[-0.02em] text-[#0A0A12] font-[family-name:var(--font-heading)]"
          >
            Own Dubai&apos;s skyline,<br />priced below market.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#55555E]">
            Hand-picked launches and motivated-seller resales — real numbers, verified developers, zero hype.
          </p>

          {/* quick stats */}
          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8">
            {STATS.map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-xl font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
                  {v}
                </dd>
                <p aria-hidden="true" className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#5E5E66]">
                  {l}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* search box */}
        <form
          role="search"
          aria-label="Property search"
          onSubmit={onSearch}
          className="rounded-2xl border border-[rgba(10,10,18,0.1)] bg-white/95 p-4 shadow-[0_24px_60px_-30px_rgba(10,10,18,0.45)] backdrop-blur md:p-5"
        >
          <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[#0A0A12]">
            <Search aria-hidden="true" size={15} className="text-[#80603f]" /> Search 1,500+ listings
          </p>

          <fieldset className="grid gap-3 border-0 p-0 sm:grid-cols-3">
            <legend className="sr-only">Filter listings</legend>
            <Field id="f-developer" label="Developer" icon={Building2}>
              <select id="f-developer" value={developer} onChange={(e) => setDeveloper(e.target.value)} className={selectCls}>
                <option value="">Any developer</option>
                {DEVELOPERS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="f-type" label="Property type" icon={Home}>
              <select id="f-type" value={type} onChange={(e) => setType(e.target.value)} className={selectCls}>
                {TYPES.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="f-price" label="Price range" icon={Tag}>
              <select id="f-price" value={price} onChange={(e) => setPrice(e.target.value)} className={selectCls}>
                {PRICES.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
          </fieldset>

          <button
            type="submit"
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#80603f] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(128,96,63,0.7)] outline-none transition-all hover:bg-[#6a5034] hover:shadow-[0_14px_28px_-10px_rgba(128,96,63,0.85)] focus-visible:ring-2 focus-visible:ring-[#80603f]/40 focus-visible:ring-offset-2 motion-safe:active:scale-[0.99]"
          >
            <Search aria-hidden="true" size={16} /> Search properties
            <ArrowRight aria-hidden="true" size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
          </button>

          
        </form>

        {/* trust line */}
        <p className="flex items-center gap-2 text-[12px] font-medium text-[#55555E]">
          <ShieldCheck aria-hidden="true" size={15} className="text-[#80603f]" />
          RERA-verified developers · No brokerage on off-plan
        </p>
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
