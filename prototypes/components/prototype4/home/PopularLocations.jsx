'use client';

import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { popularLocations } from '@/mock/prototype4/showcase';

const MAX_TILT = 9; // degrees

function TiltCard({ loc, index }) {
  const ref = useRef(null);
  const [sheen, setSheen] = useState({ x: 50, y: 50, on: false });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transition = 'transform 80ms ease-out';
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 2 * MAX_TILT}deg) rotateY(${(px - 0.5) * 2 * MAX_TILT}deg) scale(1.03)`;
    setSheen({ x: px * 100, y: py * 100, on: true });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 500ms ease';
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    setSheen((s) => ({ ...s, on: false }));
  };

  return (
    <a
      ref={ref}
      href="/prototype4/projects"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group/card relative mr-5 block h-[420px] w-[300px] shrink-0 overflow-hidden rounded-2xl shadow-md will-change-transform sm:w-[340px]"
    >
      <img
        src={loc.image}
        alt={loc.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {/* Glossy sheen that follows the cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: sheen.on ? 1 : 0,
          background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.35), transparent 45%)`,
        }}
      />

      {/* Editorial index */}
      <span className="absolute left-5 top-5 text-sm font-bold tracking-[0.25em] text-white/70">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="relative inline-block text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
          {loc.name}
          <span className="absolute -bottom-1 left-0 h-0.5 w-8 rounded-full bg-[#5eead4] transition-all duration-500 group-hover/card:w-full" />
        </h3>
        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover/card:max-h-32 group-hover/card:opacity-100">
          <p className="mt-2.5 text-[13px] leading-snug text-white/80 line-clamp-2">{loc.blurb}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#5eead4]">
            Explore <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Hover ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 transition duration-300 group-hover/card:ring-white/25" />

      {/* Spotlight veil — dims this card when a SIBLING is hovered */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/loc:bg-black/50 group-hover/card:!bg-black/0" />
    </a>
  );
}

export default function PopularLocations() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between gap-4 px-6 md:px-12">
        <div>
          <span className="mb-2 block text-[12px] font-bold uppercase tracking-[0.2em] text-[#0f766e]">
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a2520] font-[family-name:var(--font-heading)]">
            Locations
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-[#574e44] md:block">
          Hover any community to pause and explore — the rest fade back.
        </p>
      </div>

      {/* Auto-scrolling marquee (pauses on hover) */}
      <div className="overflow-x-hidden py-10">
        <div className="group/loc flex w-max animate-[loc-marquee_55s_linear_infinite] hover:[animation-play-state:paused]">
          {[...popularLocations, ...popularLocations].map((loc, i) => (
            <TiltCard key={`${loc.name}-${i}`} loc={loc} index={i % popularLocations.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
