'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '@/components/prototype3/Card';

// Horizontal scroll carousel — ~3.25 cards per frame on desktop (4th peeks),
// hidden scrollbar, arrow buttons scroll by ~one frame.
export default function FeaturedCarousel({ projects }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.82, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Arrow controls (desktop) */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scroll(-1)}
        className="absolute -left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[rgba(10,10,18,0.12)] bg-white text-[#2E231B] shadow-lg outline-none transition-colors hover:border-[#80603f] hover:text-[#80603f] focus-visible:ring-2 focus-visible:ring-[#80603f]/40 lg:grid"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scroll(1)}
        className="absolute -right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[rgba(10,10,18,0.12)] bg-white text-[#2E231B] shadow-lg outline-none transition-colors hover:border-[#80603f] hover:text-[#80603f] focus-visible:ring-2 focus-visible:ring-[#80603f]/40 lg:grid"
      >
        <ChevronRight size={20} />
      </button>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <div
            key={p.id}
            className="w-[80%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-3.75rem)/3.25)]"
          >
            <Card project={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
