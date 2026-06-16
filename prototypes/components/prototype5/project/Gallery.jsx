'use client';

// Project gallery — large main image + side thumbnail rail (vertical on desktop,
// horizontal on mobile), with a fullscreen lightbox. prototype5 ONLY.
import { useEffect, useState } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SmartImg from './SmartImg';

function Photo({ image, className }) {
  return <SmartImg base={image.src} fallback={image.fallback} alt={image.label} className={className} />;
}

function Lightbox({ images, index, setIndex, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [images.length, onClose, setIndex]);

  const img = images[index];
  return (
    <div className="fixed inset-0 z-[2000] flex flex-col bg-black/92 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-center justify-between px-5 py-4 text-white/80">
        <span className="text-sm uppercase tracking-[0.18em]">
          {img.label} · {index + 1}/{images.length}
        </span>
        <button type="button" onClick={onClose} className="rounded-full p-1.5 hover:bg-white/10">
          <X size={22} />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-6" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
          <ChevronLeft size={22} />
        </button>
        <div className="aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-xl bg-black/30 shadow-2xl">
          <Photo image={img} className="h-full w-full object-cover" />
        </div>
        <button type="button" onClick={() => setIndex((i) => (i + 1) % images.length)} className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

export default function Gallery({ images }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const go = (n) => setActive((n + images.length) % images.length);
  const current = images[active];

  return (
    <div className="flex flex-col gap-3 sm:h-[400px] sm:flex-row lg:h-[440px]">
      {/* Main image */}
      <div className="group relative h-[260px] flex-1 overflow-hidden rounded-2xl bg-[#e6e1d8] sm:h-full">
        <Photo image={current} className="h-full w-full object-cover" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          {current.label}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
          {active + 1} / {images.length}
        </span>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#1A1A1A] shadow transition hover:bg-white"
          aria-label="View fullscreen"
        >
          <Expand size={17} />
        </button>

        <button type="button" onClick={() => go(active - 1)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1A1A1A] opacity-0 shadow transition hover:bg-white group-hover:opacity-100" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => go(active + 1)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1A1A1A] opacity-0 shadow transition hover:bg-white group-hover:opacity-100" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnail rail — horizontal on mobile, vertical on desktop */}
      <div className="flex shrink-0 gap-2.5 overflow-x-auto sm:w-24 sm:flex-col sm:overflow-visible md:w-28 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl transition sm:aspect-auto sm:w-full sm:flex-1 sm:min-h-0 ${
              i === active ? 'ring-2 ring-[#8C6A57] ring-offset-2 ring-offset-[#F7F6F3]' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Photo image={img} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {open && <Lightbox images={images} index={active} setIndex={(u) => setActive((i) => (typeof u === 'function' ? u(i) : u))} onClose={() => setOpen(false)} />}
    </div>
  );
}
