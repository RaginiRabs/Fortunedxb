'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, Phone, Send, X, ChevronUp } from 'lucide-react';

// Persistent contact CTA — but not the usual lone green bubble. It reads as a
// live "advisor desk": a stack of real faces + an online pulse. On desktop it
// sits bottom-right and morphs open into an action card; on mobile it docks as a
// split bottom bar. Slides in only after the hero, so it never fights the fold.
const ADVISORS = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
];

const WA = 'https://wa.me/97140000000';
const TEL = 'tel:+97140000000';

function AvatarStack({ size = 32, ring = 'ring-white' }) {
  return (
    <div className="flex -space-x-2.5">
      {ADVISORS.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          style={{ width: size, height: size }}
          className={`shrink-0 rounded-full object-cover ring-2 ${ring}`}
        />
      ))}
    </div>
  );
}

export default function ContactDock() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 460);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ───────── Desktop dock (bottom-right, expandable) ───────── */}
      <div
        className={`fixed bottom-6 right-6 z-[60] hidden sm:block transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
      >
        {/* Expanded action card */}
        <div
          className={`absolute bottom-full right-0 mb-3 w-80 origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-30px_rgba(10,10,18,0.55)] ring-1 ring-black/10 transition-all duration-300 ease-out ${
            open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
          }`}
        >
          {/* header */}
          <div className="relative bg-gradient-to-br from-[#80603f] to-[#5E4636] p-5 text-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X size={16} />
            </button>
            <AvatarStack size={38} ring="ring-[#6a5034]" />
            <p className="mt-3 text-[15px] font-bold font-[family-name:var(--font-heading)]">Talk to a Dubai advisor</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-white/75">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7CE3A3] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7CE3A3]" />
              </span>
              Online now · replies in ~5 min
            </p>
          </div>

          {/* actions */}
          <div className="space-y-2 p-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-3 rounded-2xl bg-[#80603f] px-4 py-3 text-white transition-colors hover:bg-[#6a5034]"
            >
              <MessageCircle size={18} />
              <span className="flex-1 text-sm font-semibold">Chat on WhatsApp</span>
              <span className="text-[11px] text-white/70">Fastest</span>
            </a>
            <a
              href={TEL}
              className="flex items-center gap-3 rounded-2xl border border-[rgba(10,10,18,0.12)] px-4 py-3 text-[#0A0A12] transition-colors hover:border-[#80603f] hover:text-[#80603f]"
            >
              <Phone size={18} />
              <span className="flex-1 text-sm font-semibold">Call +971 4 000 0000</span>
            </a>
            <a
              href="/prototype3/contact"
              className="flex items-center gap-3 rounded-2xl border border-[rgba(10,10,18,0.12)] px-4 py-3 text-[#0A0A12] transition-colors hover:border-[#80603f] hover:text-[#80603f]"
            >
              <Send size={18} />
              <span className="flex-1 text-sm font-semibold">Request a callback</span>
            </a>
          </div>
        </div>

        {/* Collapsed pill */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_18px_40px_-18px_rgba(10,10,18,0.45)] ring-1 ring-black/10 transition-all hover:shadow-[0_22px_48px_-18px_rgba(10,10,18,0.55)]"
        >
          <span className="relative">
            <AvatarStack size={34} />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#2BB673] ring-2 ring-white" />
          </span>
          <span className="text-left">
            <span className="block text-[13px] font-bold leading-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
              Talk to an advisor
            </span>
            <span className="block text-[11px] leading-tight text-[#7A7A85]">Online now · ~5 min reply</span>
          </span>
          <ChevronUp
            size={18}
            className={`text-[#80603f] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* ───────── Mobile split bar (bottom) ───────── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[60] sm:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-stretch gap-2 border-t border-black/10 bg-white/90 p-2.5 backdrop-blur-md">
          <div className="flex items-center gap-2 pl-1 pr-2">
            <span className="relative">
              <img src={ADVISORS[0]} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-white" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#2BB673] ring-2 ring-white" />
            </span>
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#80603f] py-3 text-sm font-semibold text-white"
          >
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a
            href={TEL}
            className="flex items-center justify-center gap-2 rounded-xl border border-[rgba(10,10,18,0.14)] px-4 py-3 text-sm font-semibold text-[#0A0A12]"
          >
            <Phone size={17} /> Call
          </a>
        </div>
      </div>
    </>
  );
}
