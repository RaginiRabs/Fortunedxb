// Construction status ring + timeline. prototype3 ONLY.
'use client';
import { useEffect, useRef } from 'react';

export default function ConstructionStatus({ construction }) {
  const ringRef = useRef(null);
  const ringCRef = useRef(null);

  useEffect(() => {
    if (!ringRef.current) return;
    const PCT = construction.current;
    const C = 2 * Math.PI * 85;
    const offset = C * (1 - PCT / 100);
    ringRef.current.style.strokeDasharray = C;
    ringRef.current.style.strokeDashoffset = offset;

    // Animate percentage
    if (ringCRef.current) {
      const t0 = performance.now();
      const dur = 1500;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const e2 = 1 - Math.pow(1 - p, 3);
        ringCRef.current.innerHTML = Math.round(PCT * e2) + '<i>%</i>';
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, []);

  return (
    <section className="section py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Live Progress</span>
          <h2 className="font-serif text-4xl mt-3 text-black">Construction Status</h2>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8">
          <div className="md:grid md:grid-cols-[300px_1fr] md:gap-8 md:items-center">
            {/* Ring */}
            <div className="flex flex-col items-center gap-1.5 mb-8 md:mb-0">
              <div className="relative w-52 h-52">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <defs>
                    <linearGradient id="goldgrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#D9B45E" />
                      <stop offset="1" stopColor="#A87F2D" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="85" fill="none" stroke="rgb(242,242,240)" strokeWidth="14" />
                  <circle ref={ringRef} cx="100" cy="100" r="85" fill="none" stroke="url(#goldgrad)" strokeWidth="14" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="font-serif text-5xl leading-none text-black">
                    <span ref={ringCRef}>0<i className="text-2xl">%</i></span>
                  </div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest mt-1">Completed</span>
                </div>
              </div>
              <div className="text-sm text-slate-600"><span className="font-semibold text-black">On schedule</span> · updated Jun 2026</div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col gap-0.5">
              {construction.milestones.map((m, i) => (
                <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-3.5 items-center py-3 px-1 relative">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white relative z-[2]" style={{ borderColor: m.done ? '#C49A3C' : undefined, background: m.done ? '#C49A3C' : undefined }} />
                  <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-slate-300 z-[1]" style={{ background: m.done ? '#C49A3C' : undefined }} />
                  <div>
                    <div className="text-sm font-semibold text-black">{m.name}<span className="block text-xs text-slate-500 font-normal">{m.sub}</span></div>
                  </div>
                  <div className="text-xs text-slate-600 font-mono text-right" style={{ color: m.active ? '#C49A3C' : undefined, fontWeight: m.active ? 600 : 400 }}>{m.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
