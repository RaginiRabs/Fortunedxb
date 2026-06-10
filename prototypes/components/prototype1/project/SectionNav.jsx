'use client';

// Sticky top section-nav with scroll-spy + "Download Brochure".
// prototype1 ONLY. Mock — the brochure button is a no-op.
import { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';

export default function SectionNav({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const navRef = useRef(null);
  const activeRef = useRef(null);

  // Keep the active tab centred within the scrollable nav.
  useEffect(() => {
    const nav = navRef.current;
    const btn = activeRef.current;
    if (!nav || !btn) return;
    const left = btn.offsetLeft - nav.clientWidth / 2 + btn.clientWidth / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active]);

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [tabs]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="sticky top-0 z-40 bg-[#F7F6F3]/90 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center gap-3 py-2.5">
          <div className="relative min-w-0 flex-1">
            <nav ref={navRef} className="flex items-center gap-1 overflow-x-auto scroll-smooth no-scrollbar pr-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  ref={active === t.id ? activeRef : null}
                  type="button"
                  onClick={() => scrollTo(t.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    active === t.id
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-[#5B5B5B] hover:bg-black/5'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
            {/* fade edge so the scrollable list cuts off cleanly before the button */}
            <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#F7F6F3] to-transparent" />
          </div>
          <button
            type="button"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#8C6A57] px-4 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-[#74543F] transition-colors"
          >
            <Download size={15} strokeWidth={2.25} />
            <span className="hidden sm:inline">Download Brochure</span>
            <span className="sm:hidden">Brochure</span>
          </button>
        </div>
      </div>
    </div>
  );
}
