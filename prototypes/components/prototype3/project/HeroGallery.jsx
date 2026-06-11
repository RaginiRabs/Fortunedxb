// Hero gallery with dots, counter, badges, price. prototype3 ONLY.
'use client';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function HeroGallery({ project }) {
  const [active, setActive] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  const handleScroll = (e) => {
    const i = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);
    setActive(i);
  };

  return (
    <section className="pt-20 px-0">
      <div className="relative w-full h-screen max-h-[700px] min-h-[480px] bg-slate-100 rounded-2xl overflow-hidden shadow-lg">
        {/* Gallery */}
        <div className="flex h-full overflow-x-auto scroll-smooth snap-x snap-mandatory" onScroll={handleScroll}>
          {project.gallery.map((img, i) => (
            <div key={i} className="flex-none w-full h-full snap-start">
              <img src={img.src} alt={img.fallback} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Dark gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/35 to-black/32 pointer-events-none z-[2]" />

        {/* Gallery dots */}
        <div className="absolute bottom-36 left-6 flex gap-1.5 z-[4]">
          {project.gallery.map((_, i) => (
            <div key={i} className={`rounded-full transition-all ${active === i ? 'w-6 bg-amber-600' : 'w-1.5 bg-white/55'}`} style={{ height: '6px' }} />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-semibold text-black px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-2xl border border-white/60 z-[4]">
          📷 <span>{active + 1} / {project.gallery.length}</span>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-[3] px-6 pb-7 text-white">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.badges.map((badge, i) => (
              <span key={i} className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-2xl border ${i === 0 ? 'bg-amber-600 text-black border-transparent' : 'bg-white/90 text-black border-white/60'}`}>
                {i === 1 && <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                {badge}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h1 className="font-serif text-5xl font-medium leading-tight mb-2.5 drop-shadow-lg">{project.name}</h1>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/85 text-sm mb-4">
            <MapPin size={15} />
            <span>{project.location.name} · {project.location.city}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-xs text-white/70 uppercase tracking-widest">Starting from</span>
            <span className="font-serif text-3xl text-white">AED {(project.priceFrom / 1000000).toFixed(2)}M</span>
          </div>
        </div>
      </div>
    </section>
  );
}
