'use client';

// prototype5 resale properties — horizontal carousel with snap + arrow controls. Mock only.
import { useRef } from 'react';
import { MapPin, BedDouble, Maximize, Building2, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Dirham from '@/components/prototype5/Dirham';
import { resaleProperties } from '@/mock/prototype5/home';

export default function ResaleProperties() {
  const scroller = useRef(null);
  const scroll = (dir) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Ready to Move</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Resale Properties</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-[#80603f]/40 text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-[#80603f]/40 text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
            <ChevronRight className="h-4 w-4" />
          </button>
          <a href="#" className="ml-1 hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-4 py-2 text-sm font-medium text-white sm:inline-flex">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div ref={scroller} className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
        {resaleProperties.map((p) => (
          <article
            key={p.id}
            className="group w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_36px_-14px_rgba(20,18,15,0.20)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#80603f]/30 hover:shadow-[0_26px_55px_-15px_rgba(128,96,63,0.30)]"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <span className={`absolute left-3 top-3 rounded-md ${p.tone} px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow`}>{p.tag}</span>
            </div>

            <div className="relative p-4 pt-6">
              {/* floating gradient price pill */}
              <span className="absolute -top-4 left-4 inline-flex items-center rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-3.5 py-1.5 text-sm font-bold text-white shadow-lg">
                <Dirham className="mr-0.5" />{p.price}
              </span>

              <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{p.name}</h3>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-gray-400"><MapPin className="h-3.5 w-3.5 text-[#80603f]" /> {p.location}</p>
              <p className="mt-1 text-[11px] font-medium text-emerald-600">
                {p.below}% Below Market · <span className="text-gray-400 line-through"><Dirham className="mr-0.5" />{p.marketPrice}</span>
              </p>

              <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-[#80603f]" /> {p.beds}</span>
                <span className="inline-flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[#80603f]" /> {p.sqft}</span>
                <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5 text-[#80603f]" /> {p.type}</span>
              </div>

              <a href="#" className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#80603f]/40 py-2.5 text-sm font-medium text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
                View Details <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
