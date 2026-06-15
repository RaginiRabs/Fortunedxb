'use client';

// prototype1 FAQ accordion. Mock only.
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: 'What is a distress deal?', a: 'A distress deal is a property sold below market value, usually due to an urgent sale, motivated seller, or bank repossession — offering buyers significant savings.' },
  { q: 'How do distress deals work?', a: 'Our team sources verified below-market opportunities, negotiates on your behalf, and guides you through valuation, financing and a smooth transfer.' },
  { q: 'Are distress properties safe to buy?', a: 'Yes. Every listing is RERA-verified with clear title and transparent pricing. We handle full due diligence before you commit.' },
  { q: 'Can foreigners buy distress properties in Dubai?', a: 'Absolutely. Foreign nationals can purchase in designated freehold areas, and we assist with the entire process end to end.' },
];

export default function FaqAccordion({ items = FAQS }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const active = open === i;
        return (
          <div key={f.q} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_8px_24px_-16px_rgba(20,18,15,0.18)]">
            <button onClick={() => setOpen(active ? -1 : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
              <span className="text-[14px] font-medium text-[#1a1a1a]">{f.q}</span>
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${active ? 'bg-[#80603f] text-white' : 'bg-[#80603f]/10 text-[#80603f]'}`}>
                {active ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            <div className={`grid transition-all duration-300 ${active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-[13px] leading-relaxed text-gray-500">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
