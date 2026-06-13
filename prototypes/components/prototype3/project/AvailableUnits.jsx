// Available units inventory. prototype3 ONLY.
// Mobile: stacked rows (unchanged look). Large: 2-up grid so it fills width.
'use client';
import { useEffect, useRef } from 'react';

export default function AvailableUnits({ units }) {
  const barsRef = useRef([]);

  useEffect(() => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const pct = Math.round((units[i].sold / units[i].total) * 100);
      setTimeout(() => {
        bar.style.width = pct + '%';
      }, 50);
    });
  }, [units]);

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Availability</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl">Available units</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#55555E]">Live inventory — selling fast. Reserve before the next price release.</p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
        {units.map((u, i) => {
          const left = u.total - u.sold;
          const pct = Math.round((u.sold / u.total) * 100);
          const low = left <= 10;
          return (
            <div
              key={i}
              className="rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-[#C49A3C]/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#0A0A12]">{u.type}</div>
                  <div className="mt-0.5 truncate text-xs text-[#9A9AA3]">{u.sub}</div>
                </div>
                <div className={`shrink-0 text-right text-sm font-bold ${low ? 'text-[#C83C3C]' : 'text-[#80603f]'}`}>
                  {left} <span className="text-xs font-semibold text-[#9A9AA3]">left</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    ref={(el) => (barsRef.current[i] = el)}
                    className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A87F2D] transition-[width] duration-1000 ease-out"
                    style={{ width: 0 }}
                  />
                </div>
                <span className="shrink-0 text-[11px] font-semibold tabular-nums text-[#9A9AA3]">{pct}% sold</span>
              </div>
              {low && (
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#C83C3C]/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#C83C3C]">
                  Selling fast
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
