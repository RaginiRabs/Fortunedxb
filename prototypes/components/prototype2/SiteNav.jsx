'use client';
// prototype2 — floating glass pill navigation. Elegant light theme with bronze accents.
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'Home', href: '/prototype2' },
  { label: 'Projects', href: '/prototype2/projects' },
  { label: 'Distress Deals', href: '/prototype2/distress-deals' },
  { label: 'Resale', href: '/prototype2/resale' },
  { label: 'Market Insights', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export default function SiteNav() {
  const path = usePathname() || '';
  const [open, setOpen] = useState(false);

  const isActive = (l) =>
    l.href !== '#' && (path === l.href || (l.href !== '/prototype2' && path.startsWith(l.href)));

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-6">
      <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between gap-4 rounded-full border border-brand-pale/80 bg-cream/85 px-3 pl-4 shadow-[0_10px_40px_-16px_rgba(58,44,34,0.35)] backdrop-blur-xl sm:h-[80px] sm:gap-6 md:pl-6">
        {/* Logo */}
        <Link href="/prototype2" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fortune-logo.png" alt="Fortune Realty L.L.C" className="h-9 w-auto sm:h-16" />
        </Link>

        {/* Center nav (desktop) */}
        <nav className="hidden items-center gap-1 xl:flex">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={
                'rounded-full px-3.5 py-2 font-serif text-[13.5px] font-semibold transition-colors ' +
                (isActive(l) ? 'bg-brand text-cream shadow-sm' : 'text-ink-soft hover:bg-brand-pale/70 hover:text-brand-dark')
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <button className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-2 font-serif text-[12px] font-bold text-cream shadow-sm transition-all hover:bg-brand-dark sm:px-5 sm:py-2.5 sm:text-[13px]">
            <span className="hidden sm:inline">Get in Touch</span>
            <span className="sm:hidden">Contact</span>
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-brand-pale text-ink-soft transition-colors hover:bg-brand-pale xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="mx-auto mt-2 max-w-[1400px] xl:hidden">
          <nav className="rounded-2xl border border-brand-pale bg-cream/95 p-2 shadow-[0_18px_44px_-20px_rgba(58,44,34,0.5)] backdrop-blur-xl">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  'block rounded-xl px-4 py-3 font-serif text-[14px] font-semibold transition-colors ' +
                  (isActive(l) ? 'bg-brand text-cream' : 'text-ink-soft hover:bg-brand-pale/70 hover:text-brand-dark')
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
