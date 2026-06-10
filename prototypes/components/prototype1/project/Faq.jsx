'use client';

// FAQ — accordion of buyer questions. prototype1 ONLY. Mock.
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function Faq({ faq }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Frequently Asked Questions</h2>
      <div className="mt-5 divide-y divide-black/[0.06] overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-black/[0.015]"
              >
                <span className="text-sm font-medium text-[#1A1A1A]">{item.q}</span>
                <span className="shrink-0 text-[#B0905E]">
                  {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-4 text-[14px] leading-relaxed text-[#5B5B5B]">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
