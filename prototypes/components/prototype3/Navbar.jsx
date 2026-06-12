'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const LINKS = [
  ['Home', '/prototype3'],
  ['Projects', '/prototype3/projects'],
  ['Distress', '/prototype3/distress'],
  ['Map', '/prototype3/map'],
  ['Developers', '/prototype3/developers'],
  ['About', '/prototype3/about'],
  ['Contact', '/prototype3/contact'],
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href) => (href === '/prototype3' ? pathname === href : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(10,10,18,0.08)] bg-[#FAFAF8]/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:px-10">
        {/* Brand */}
        <Link href="/prototype3" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#C49A3C] text-[13px] font-bold text-white font-[family-name:var(--font-heading)]">
            F
          </span>
          <span className="text-[17px] font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
            FortuneDXB<span className="text-[#C49A3C]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative py-1 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                  active ? 'text-[#C49A3C]' : 'text-[#4C4C56] hover:text-[#0A0A12]'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#C49A3C] transition-all duration-200 ${
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
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#0A0A12] transition-colors hover:bg-black/[0.04] md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[rgba(10,10,18,0.08)] transition-all duration-300 ease-out md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-1">
          {LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`border-b border-[rgba(10,10,18,0.06)] py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-colors last:border-0 ${
                isActive(href) ? 'text-[#C49A3C]' : 'text-[#4C4C56] hover:text-[#0A0A12]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
