// Floor plans — interactive, image-free. A proportional blueprint visual +
// clear specs + clickable comparison. prototype3 ONLY. Column-agnostic.
'use client';
import { useState } from 'react';
import { Maximize2, Wind, Bath, BedDouble, Tag } from 'lucide-react';

const bedsOf = (name) => {
  const m = name.match(/\d+/);
  return m ? `${m[0]} Bed` : 'Penthouse';
};

export default function FloorPlans({ plans }) {
  const [active, setActive] = useState(0);
  const p = plans[active];
  const total = p.area + p.balcony;
  const perSqft = Math.round(p.price / p.area);
  const maxArea = Math.max(...plans.map((x) => x.area));

  const specs = [
    { icon: Maximize2, label: 'Suite area', value: `${p.area.toLocaleString()} ft²` },
    { icon: Wind, label: 'Balcony', value: `${p.balcony} ft²` },
    { icon: BedDouble, label: 'Layout', value: bedsOf(p.name) },
    { icon: Bath, label: 'Bathrooms', value: p.baths },
  ];

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Layouts</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl">Floor plans</h2>
      </div>

      {/* Tabs */}
      <div className="no-scrollbar -mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1">
        {plans.map((pl, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              active === i
                ? 'bg-[#0A0A12] text-white shadow-sm'
                : 'border border-black/10 bg-white text-[#55555E] hover:border-[#C49A3C]/50'
            }`}
          >
            {pl.name}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_30px_-22px_rgba(10,10,18,0.25)]">
        <div className="grid sm:grid-cols-2">
          {/* Blueprint visual */}
          <div className="relative flex min-h-[230px] items-center justify-center border-b border-black/8 bg-[#FAF7F3] p-6 sm:border-b-0 sm:border-r">
            <div
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  'linear-gradient(#C49A3C18 1px,transparent 1px),linear-gradient(90deg,#C49A3C18 1px,transparent 1px)',
                backgroundSize: '22px 22px',
              }}
            />
            <div className="relative flex w-full max-w-[260px] items-stretch gap-1.5" style={{ height: 150 }}>
              <div
                className="flex flex-col items-center justify-center rounded-lg border-2 border-[#C49A3C] bg-white/70 transition-all duration-500"
                style={{ flex: p.area }}
              >
                <span className="text-xs font-bold text-[#80603f] font-[family-name:var(--font-heading)]">Suite</span>
                <span className="text-[11px] text-[#9A9AA3]">{p.area.toLocaleString()} ft²</span>
              </div>
              <div
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#C49A3C]/60 bg-[#C49A3C]/10 transition-all duration-500"
                style={{ flex: Math.max(p.balcony, total * 0.12) }}
              >
                <Wind size={15} className="text-[#80603f]" />
                <span className="mt-0.5 text-[10px] font-semibold text-[#80603f]">Balcony</span>
              </div>
            </div>
            <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#9A9AA3] shadow-sm">
              Indicative layout
            </span>
          </div>

          {/* Details */}
          <div className="p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-2xl font-bold tracking-tight text-[#0A0A12]">{p.name}</h3>
              <span className="shrink-0 rounded-full bg-[#C49A3C]/12 px-2.5 py-1 text-xs font-bold text-[#9A7625]">
                {total.toLocaleString()} ft² total
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#FAF7F3] text-[#C49A3C]">
                    <s.icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9A9AA3]">{s.label}</div>
                    <div className="text-sm font-bold text-[#0A0A12]">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-black/8 pt-4">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9A9AA3]">
                  <Tag size={12} /> Starting from
                </div>
                <div className="text-2xl font-bold text-[#0A0A12] font-[family-name:var(--font-heading)]">
                  AED {(p.price / 1000000).toFixed(2)}M
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9A9AA3]">Per ft²</div>
                <div className="text-sm font-bold text-[#80603f]">AED {perSqft.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison — clickable area bars */}
        <div className="border-t border-black/8 p-5 sm:p-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9A9AA3]">Compare by size</p>
          <div className="space-y-2">
            {plans.map((pl, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex w-full items-center gap-3 rounded-lg px-1 py-1 text-left transition-colors hover:bg-[#FAF7F3]"
              >
                <span className={`w-20 shrink-0 text-xs font-semibold ${i === active ? 'text-[#0A0A12]' : 'text-[#9A9AA3]'}`}>
                  {pl.name}
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <span
                    className={`block h-full rounded-full transition-all duration-500 ${
                      i === active ? 'bg-gradient-to-r from-[#C9A84C] to-[#A87F2D]' : 'bg-slate-300'
                    }`}
                    style={{ width: `${(pl.area / maxArea) * 100}%` }}
                  />
                </span>
                <span className="w-16 shrink-0 text-right text-xs font-semibold tabular-nums text-[#55555E]">
                  {pl.area.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
