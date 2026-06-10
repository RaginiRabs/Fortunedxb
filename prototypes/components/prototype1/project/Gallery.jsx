'use client';

// Project gallery — cinematic featured image + thumbnail filmstrip (click to
// swap), with a fullscreen lightbox. prototype1 ONLY. Mock images via SmartImg.
import { useEffect, useState } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SmartImg from './SmartImg';

// <img> that resolves any extension for image.src, then image.fallback.
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

      <div className="flex justify-center gap-2 px-4 pb-5" onClick={(e) => e.stopPropagation()}>
        {images.map((t, i) => (
          <button key={t.id} type="button" onClick={() => setIndex(i)} className={`h-12 w-16 overflow-hidden rounded-md ring-2 transition ${i === index ? 'ring-white' : 'ring-transparent opacity-60 hover:opacity-100'}`}>
            <Photo image={t} className="h-full w-full object-cover" />
          </button>
        ))}
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
    <div>
      {/* Featured image */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-[#e6e1d8]">
        <Photo image={current} className="h-full w-full object-cover" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        {/* caption + counter */}
        <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          {current.label}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
          {active + 1} / {images.length}
        </span>

        {/* expand */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#1A1A1A] shadow transition hover:bg-white"
          aria-label="View fullscreen"
        >
          <Expand size={17} />
        </button>

        {/* arrows */}
        <button type="button" onClick={() => go(active - 1)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1A1A1A] opacity-0 shadow transition hover:bg-white group-hover:opacity-100" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => go(active + 1)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1A1A1A] opacity-0 shadow transition hover:bg-white group-hover:opacity-100" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnail filmstrip */}
      <div className="mt-3 flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl transition sm:w-28 ${
              i === active ? 'ring-2 ring-[#8C6A57] ring-offset-2 ring-offset-[#F7F6F3]' : 'opacity-65 hover:opacity-100'
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
