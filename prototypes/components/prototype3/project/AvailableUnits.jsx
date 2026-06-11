// Available units inventory. prototype3 ONLY.
'use client';
import { useEffect, useRef } from 'react';

export default function AvailableUnits({ units }) {
  const barsRef = useRef([]);

  useEffect(() => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const total = units[i].total;
      const sold = units[i].sold;
      const pct = Math.round(sold / total * 100);
      setTimeout(() => {
        bar.style.width = pct + '%';
      }, 50);
    });
  }, []);

  return (
    <section className="py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Availability</span>
          <h2 className="font-serif text-4xl mt-3 text-black">Available units</h2>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl">Live inventory — selling fast. Reserve before the next price release.</p>
        </div>

        <div className="space-y-2">
          {units.map((u, i) => {
            const left = u.total - u.sold;
            const pct = Math.round(u.sold / u.total * 100);
            const low = left <= 10;
            return (
              <div key={i} className="bg-white border border-black/10 rounded-lg p-4 flex items-center justify-between hover:border-amber-600/40 transition-colors">
                <div>
                  <div className="font-semibold text-black text-sm">{u.type}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{u.sub}</div>
                </div>
                <div className="text-right min-w-max ml-4">
                  <div className={`text-sm font-semibold ${low ? 'text-amber-700' : 'text-slate-700'}`}><span className="font-serif">{left}</span> left{low && ' · selling fast'}</div>
                  <div className="w-24 h-1 rounded-full bg-slate-300 mt-1.5">
                    <div ref={el => barsRef.current[i] = el} className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-700 transition-all duration-1200" style={{ width: 0 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
