// Floor plans tabs. prototype3 ONLY.
'use client';
import { useState } from 'react';

export default function FloorPlans({ plans }) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Layouts</span>
          <h2 className="font-serif text-4xl mt-3 text-black">Floor plans</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto mb-6 pb-1 no-scrollbar">
          {plans.map((p, i) => (
            <button key={i} onClick={() => setActive(i)} className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${active === i ? 'bg-black text-white border-transparent' : 'bg-slate-100 text-slate-700 border border-black/10'}`}>
              {p.name}
            </button>
          ))}
        </div>

        {/* Plan content */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 lg:gap-8 items-center">
          <div className="bg-slate-100 border border-black/10 rounded-2xl p-6 flex items-center justify-center min-h-72">
            <img src={`https://dummyimage.com/520x360/f6f6f3/15151c&text=${plans[active].name}+Plan`} alt="Floor plan" className="max-h-80 w-auto mx-auto" />
          </div>
          <div>
            <h3 className="font-serif text-3xl text-black">{plans[active].name}</h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border-t border-black/10 pt-3">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Suite Area</div>
                <div className="font-serif text-2xl text-black mt-1">{plans[active].area} ft²</div>
              </div>
              <div className="border-t border-black/10 pt-3">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Balcony</div>
                <div className="font-serif text-2xl text-black mt-1">{plans[active].balcony} ft²</div>
              </div>
              <div className="border-t border-black/10 pt-3">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">From</div>
                <div className="font-serif text-2xl text-black mt-1">AED {(plans[active].price / 1000000).toFixed(2)}M</div>
              </div>
              <div className="border-t border-black/10 pt-3">
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Bathrooms</div>
                <div className="font-serif text-2xl text-black mt-1">{plans[active].baths}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
