// Hero gallery with dots, counter, badges, price. prototype3 ONLY.
'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function HeroGallery({ project }) {
  const [active, setActive] = useState(0);

  const handleScroll = (e) => {
    const i = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);
    setActive(i);
  };

  return (
    <section className="pt-12 md:pt-20 px-4 md:px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative w-full bg-slate-100 rounded-2xl md:rounded-t-2xl overflow-hidden shadow-lg" style={{ height: 'calc(100vh - 80px)', maxHeight: '600px', minHeight: '360px' }}>
          {/* Gallery */}
          <div className="flex h-full overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar" onScroll={handleScroll}>
            {project.gallery.map((img, i) => (
              <div key={i} className="flex-none w-full h-full snap-start">
                <img src={img.src} alt={img.fallback} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/40 to-transparent pointer-events-none z-[2]" />
          <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.4)_100%)]" />

          {/* Gallery dots */}
          <div className="absolute bottom-24 md:bottom-40 left-4 md:left-6 flex gap-1.5 z-[4]">
            {project.gallery.map((_, i) => (
              <div key={i} className={`rounded-full transition-all ${active === i ? 'w-6 bg-amber-600' : 'w-1.5 bg-white/55'}`} style={{ height: '6px' }} />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-3 md:top-4 right-3 md:right-4 flex items-center gap-2 text-xs font-semibold text-black px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-white/90 backdrop-blur-2xl border border-white/60 z-[4]">
            <span>{active + 1} / {project.gallery.length}</span>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 z-[3] px-4 md:px-6 pb-5 md:pb-7 text-white">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
              {project.badges.map((badge, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 text-[11px] md:text-xs font-semibold px-2.5 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-2xl border ${i === 0 ? 'bg-amber-600 text-black border-transparent' : 'bg-white/90 text-black border-white/60'}`}>
                  {i === 1 && <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                  {badge}
                </span>
              ))}
            </div>

            {/* Heading */}
            <h1 className="font-serif text-3xl md:text-5xl font-medium leading-tight mb-2 md:mb-2.5 drop-shadow-lg">{project.name}</h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-white/85 text-xs md:text-sm mb-3 md:mb-4">
              <MapPin size={14} className="md:size-4" />
              <span>{project.location.name} · {project.location.city}</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest">Starting from</span>
              <span className="font-serif text-2xl md:text-3xl text-white">AED {(project.priceFrom / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
