// FAQ accordion. prototype3 ONLY.
'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FAQ({ faq }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-6 sm:py-8">
      <div>
        <div className="mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Good to know</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl">FAQ</h2>
        </div>

        <div className="space-y-2">
          {faq.map((f, i) => (
            <div key={i} className={`bg-white border rounded-lg overflow-hidden transition-all ${open === i ? 'border-amber-600/40 shadow-md' : 'border-black/10'}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-slate-50 transition-colors">
                <span className="font-semibold text-black text-sm">{f.q}</span>
                <div className={`w-6 h-6 rounded-full border border-black/16 flex items-center justify-center flex-shrink-0 transition-all ${open === i ? 'rotate-45 bg-[#C49A3C] border-transparent' : ''}`}>
                  <Plus size={14} className={open === i ? 'text-black' : 'text-black/70'} />
                </div>
              </button>
              {open === i && (
                <div className="px-4 pb-4 pt-0 text-sm text-slate-700 border-t border-black/10">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
