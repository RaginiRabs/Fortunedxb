'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const LINKS = [
  ['Home', '/prototype4'],
  ['Projects', '/prototype4/projects'],
  ['Distress Deals', '/prototype4/distress'],
  ['Developers', '/prototype4/developers'],
  ['About', '/prototype4/about'],
  ['Contact Us', '/prototype4/contact'],
];

export default function Navbar({ logo }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === '/prototype4' ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e8e2da]">
      <div className="w-full flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo — prominent, soft glow */}
        <Link href="/prototype4" className="flex items-center shrink-0 group">
          <Image
            src={logo}
            alt="Fortune Realty"
            priority
            className="h-12 md:h-14 w-auto drop-shadow-[0_3px_16px_rgba(128,96,63,0.45)] transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em]">
          {LINKS.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative py-1 transition-colors ${
                  active ? 'text-[#80603f]' : 'text-[#574e44] hover:text-[#80603f]'
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-[#80603f] transition-all duration-200 ${
                    active ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg text-[#80603f] hover:bg-[#faf7f3] transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-[#e8e2da] transition-all duration-300 ease-out ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-2">
          {LINKS.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm font-bold uppercase tracking-[0.12em] border-b border-[#f0ebe3] last:border-0 transition-colors ${
                  active ? 'text-[#80603f]' : 'text-[#574e44] hover:text-[#80603f]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
