'use client';

// prototype1 partners — auto-scrolling logo slider, draggable (pointer). Mock only.
import { useRef, useEffect, useState } from 'react';
import { partners } from '@/mock/prototype1/home';

function LogoCard({ name, domain, logo }) {
  // Try the local logo first, then the live Clearbit logo, then the name as text.
  const [stage, setStage] = useState(logo ? 'local' : 'clearbit');
  const src = stage === 'local' ? logo : `https://logo.clearbit.com/${domain}?size=160`;
  return (
    <div className="flex h-24 w-44 shrink-0 select-none items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_24px_-12px_rgba(20,18,15,0.18)]">
      {stage === 'text' ? (
        <span className="text-lg font-bold uppercase tracking-wide text-[#5e4636]">{name}</span>
      ) : (
        <img
          src={src}
          alt={name}
          draggable={false}
          onError={() => setStage(stage === 'local' ? 'clearbit' : 'text')}
          className="h-full w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
        />
      )}
    </div>
  );
}

export default function Partners() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    let paused = false;
    let down = false;
    let startX = 0;
    let startScroll = 0;

    const step = () => {
      if (!paused && el) {
        el.scrollLeft += 0.5;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onDown = (e) => { down = true; paused = true; startX = e.pageX; startScroll = el.scrollLeft; el.style.cursor = 'grabbing'; };
    const onMove = (e) => { if (!down) return; el.scrollLeft = startScroll - (e.pageX - startX); };
    const onUp = () => { down = false; paused = false; el.style.cursor = 'grab'; };
    const onEnter = () => { paused = true; };
    const onLeave = () => { if (!down) paused = false; };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const items = [...partners, ...partners]; // duplicated for seamless loop

  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
        <div className="flex items-center justify-center gap-4">
          <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-[#80603f]/40 sm:block" />
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">
            Trusted by Dubai&apos;s Leading Developers
          </p>
          <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-[#80603f]/40 sm:block" />
        </div>

        {/* slider with edge fades */}
        <div className="relative mt-7">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
          <div ref={ref} className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto pb-1">
            {items.map((p, i) => (
              <LogoCard key={`${p.name}-${i}`} name={p.name} domain={p.domain} logo={p.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
