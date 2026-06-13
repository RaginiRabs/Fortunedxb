// Construction status — animated ring + clean stepper timeline. prototype3 ONLY.
// Column-agnostic: the page controls max-width & horizontal padding.
'use client';
import { useEffect, useRef } from 'react';

export default function ConstructionStatus({ construction }) {
  const ringRef = useRef(null);
  const ringCRef = useRef(null);

  useEffect(() => {
    if (!ringRef.current) return;
    const PCT = construction.current;
    const C = 2 * Math.PI * 54;
    ringRef.current.style.strokeDasharray = C;
    ringRef.current.style.strokeDashoffset = C;
    // animate sweep + count together
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      ringRef.current.style.strokeDashoffset = C * (1 - (PCT / 100) * e);
      if (ringCRef.current) ringCRef.current.innerHTML = Math.round(PCT * e) + '<i class="not-italic text-base align-top">%</i>';
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [construction.current]);

  const done = construction.milestones.filter((m) => m.done).length;

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Live Progress</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl">Construction status</h2>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.25)] sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          {/* Ring */}
          <div className="flex shrink-0 items-center gap-5 sm:flex-col sm:gap-2">
            <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <defs>
                  <linearGradient id="csgold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#D9B45E" />
                    <stop offset="1" stopColor="#A87F2D" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgb(243,240,235)" strokeWidth="11" />
                <circle ref={ringRef} cx="60" cy="60" r="54" fill="none" stroke="url(#csgold)" strokeWidth="11" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span ref={ringCRef} className="text-3xl font-bold leading-none text-[#0A0A12] font-[family-name:var(--font-heading)]">0<i className="not-italic text-base align-top">%</i></span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9A9AA3]">Completed</span>
              </div>
            </div>
            <div className="sm:text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> On schedule
              </span>
              <p className="mt-1.5 text-[11px] text-[#9A9AA3]">{done}/{construction.milestones.length} stages · upd. Jun 2026</p>
            </div>
          </div>

          {/* Stepper timeline */}
          <ol className="relative flex-1">
            {construction.milestones.map((m, i) => {
              const last = i === construction.milestones.length - 1;
              return (
                <li key={i} className="relative flex gap-3.5 pb-5 last:pb-0">
                  {!last && (
                    <span className={`absolute left-[7px] top-4 h-full w-[2px] ${m.done ? 'bg-[#C49A3C]' : 'bg-slate-200'}`} />
                  )}
                  <span className="relative z-[1] mt-0.5 grid h-4 w-4 shrink-0 place-items-center">
                    <span
                      className={`h-4 w-4 rounded-full border-2 ${
                        m.done
                          ? 'border-[#C49A3C] bg-[#C49A3C]'
                          : m.active
                            ? 'border-[#C49A3C] bg-white ring-4 ring-[#C49A3C]/15'
                            : 'border-slate-300 bg-white'
                      }`}
                    />
                  </span>
                  <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-3">
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold ${m.active ? 'text-[#0A0A12]' : 'text-[#2A2A32]'}`}>
                        {m.name}
                        {m.active && <span className="ml-2 rounded-full bg-[#C49A3C]/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#9A7625]">Now</span>}
                      </p>
                      <p className="text-xs text-[#9A9AA3]">{m.sub}</p>
                    </div>
                    <span className={`shrink-0 text-xs font-semibold tabular-nums ${m.active ? 'text-[#C49A3C]' : 'text-[#9A9AA3]'}`}>{m.date}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
