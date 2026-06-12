'use client';
// prototype2 — floating glass pill navigation. Elegant light theme with bronze accents.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu } from 'lucide-react';

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

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between gap-6 rounded-full border border-brand-pale/80 bg-cream/80 px-3 pl-5 shadow-[0_10px_40px_-16px_rgba(58,44,34,0.35)] backdrop-blur-xl md:pl-6">
        {/* Logo */}
        <Link href="/prototype2" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fortune-logo.png" alt="Fortune Realty L.L.C" className="h-16 w-auto" />
        </Link>

        {/* Center nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {LINKS.map((l) => {
            const active =
              l.href !== '#' &&
              (path === l.href || (l.href !== '/prototype2' && path.startsWith(l.href)));
            return (
              <Link
                key={l.label}
                href={l.href}
                className={
                  'rounded-full px-3.5 py-2 font-serif text-[13.5px] font-semibold transition-colors ' +
                  (active
                    ? 'bg-brand text-cream shadow-sm'
                    : 'text-ink-soft hover:bg-brand-pale/70 hover:text-brand-dark')
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 font-serif text-[13px] font-bold text-cream shadow-sm transition-all hover:bg-brand-dark">
            Get in Touch
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button className="grid h-10 w-10 place-items-center rounded-full border border-brand-pale text-ink-soft transition-colors hover:bg-brand-pale xl:hidden">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
