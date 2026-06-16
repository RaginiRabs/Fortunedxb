'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, CalendarCheck, ChevronRight } from 'lucide-react';

const LINKS = [
  ['Home', '/prototype3'],
  ['Projects', '/prototype3/projects'],
  ['Distress', '/prototype3/distress'],
  ['Map', '/prototype3/map'],
  ['About', '/prototype3/about'],
  ['Contact', '/prototype3/contact'],
];

const PHONE = '+971 4 000 0000';
const TEL = 'tel:+97140000000';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href) => (href === '/prototype3' ? pathname === href : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(10,10,18,0.08)] bg-[#FAFAF8]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-10">
        {/* Brand */}
        <Link href="/prototype3" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#80603f] to-[#5E4636] text-[14px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(128,96,63,0.7)] font-[family-name:var(--font-heading)]">
            F
          </span>
          <span className="text-[18px] font-bold leading-none tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
            FortuneDXB<span className="text-[#80603f]">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-full px-3.5 py-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  active ? 'text-[#80603f]' : 'text-[#4C4C56] hover:bg-black/[0.04] hover:text-[#0A0A12]'
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[#80603f] transition-all duration-200 ${
                    active ? 'w-5' : 'w-0'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right cluster — phone + primary CTA */}
        <div className="flex items-center gap-2.5">
          <a
            href={TEL}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-[13px] font-semibold text-[#0A0A12] transition-colors hover:text-[#80603f] xl:inline-flex"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#80603f]/10 text-[#80603f]">
              <Phone size={15} />
            </span>
            {PHONE}
          </a>

          <Link
            href="/prototype3/contact"
            className="group hidden items-center gap-2 rounded-full bg-[#80603f] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(128,96,63,0.8)] transition-all hover:bg-[#6a5034] sm:inline-flex"
          >
            <CalendarCheck size={15} />
            Book a consultation
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A0A12] transition-colors hover:bg-black/[0.05] lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[rgba(10,10,18,0.08)] bg-[#FAFAF8] transition-all duration-300 ease-out lg:hidden ${
          open ? 'max-h-[460px]' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-2">
          {LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between border-b border-[rgba(10,10,18,0.06)] py-3.5 text-sm font-semibold uppercase tracking-[0.1em] transition-colors last:border-0 ${
                isActive(href) ? 'text-[#80603f]' : 'text-[#4C4C56] hover:text-[#0A0A12]'
              }`}
            >
              {label}
              <ChevronRight size={16} className="text-[#C9C9CF]" />
            </Link>
          ))}
        </nav>

        {/* mobile actions */}
        <div className="flex flex-col gap-2.5 px-5 pb-5 pt-1">
          <Link
            href="/prototype3/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#80603f] px-5 py-3 text-sm font-semibold text-white"
          >
            <CalendarCheck size={16} /> Book a consultation
          </Link>
          <a
            href={TEL}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(10,10,18,0.14)] px-5 py-3 text-sm font-semibold text-[#0A0A12]"
          >
            <Phone size={16} /> {PHONE}
          </a>
        </div>
      </div>
    </header>
  );
}
