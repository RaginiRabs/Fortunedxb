// Sales metrics + YoY chart. prototype3 ONLY.
'use client';
import { useEffect, useRef } from 'react';

export default function SalesMetrics({ sales }) {
  const barsRef = useRef(null);

  useEffect(() => {
    if (barsRef.current) {
      barsRef.current.querySelectorAll('.bar').forEach(b => {
        const h = b.dataset.h;
        setTimeout(() => b.style.height = h + '%', 50);
      });
    }
  }, []);

  return (
    <section className="py-12 bg-white/50">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Market Performance</span>
          <h2 className="font-serif text-4xl mt-3 text-black">Sales & Demand</h2>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl">Tracking real transaction momentum — how this development is moving against the market.</p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {sales.metrics.map((m, i) => (
            <div key={i} className="bg-white border border-black/10 rounded-lg p-4 shadow-sm">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{m.lbl}</div>
              <div className="font-serif text-2xl mt-2 text-black">{m.num.toLocaleString()}{m.unit && <span className="text-sm"> {m.unit}</span>}</div>
              <div className="text-xs mt-2 px-2 py-1 rounded-full inline-block bg-emerald-50 text-emerald-700 font-semibold">{m.trend}</div>
            </div>
          ))}
        </div>

        {/* YoY Chart */}
        <div className="bg-white border border-black/10 rounded-lg p-6">
          <div className="mb-6">
            <div className="font-serif text-xl text-black">Quarterly Sales Volume</div>
            <div className="flex gap-4 text-xs text-slate-600 mt-2">
              <span><i className="inline-block w-2.5 h-2.5 rounded bg-slate-300 mr-1.5 align-middle" />2024</span>
              <span><i className="inline-block w-2.5 h-2.5 rounded bg-amber-600 mr-1.5 align-middle" />2025</span>
            </div>
          </div>
          <div ref={barsRef} className="flex items-end gap-3 md:gap-6 h-52 pt-2.5">
            {sales.yoyChart.map((q, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 justify-end h-full">
                <div className="flex gap-1 items-end justify-center h-full w-full">
                  <div className="bar bg-slate-300 rounded-t-sm transition-all duration-1200" data-h={q.y1} style={{ height: 0, flex: 1 }} />
                  <div className="bar bg-gradient-to-b from-amber-500 to-amber-700 rounded-t-sm transition-all duration-1200 relative" data-h={q.y2} style={{ height: 0, flex: 1 }}>
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-amber-600 whitespace-nowrap">{q.tip}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">{q.q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
