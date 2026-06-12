'use client';
// prototype2 — top site navigation (matches the Projects-page reference).
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu } from 'lucide-react';

const LINKS = [
  { label: 'Home', href: '/prototype2' },
  { label: 'Projects', href: '/prototype2/projects' },
  { label: 'Distress Deals', href: '/prototype2/distress-deals' },
  { label: 'Developers', href: '#' },
  { label: 'Market Insights', href: '#' },
  { label: 'Resources', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Contact Us', href: '#' },
];

export default function SiteNav() {
  const path = usePathname() || '';

  return (
    <header className="sticky top-0 z-50 border-b border-brand-pale bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/prototype2" className="flex shrink-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fortune-logo.png" alt="Fortune Realty L.L.C" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 text-[14px] font-medium lg:flex">
          {LINKS.map((l) => {
            const active =
              l.href !== '#' &&
              (path === l.href ||
                (l.href !== '/prototype2' && path.startsWith(l.href)));
            return (
              <Link
                key={l.label}
                href={l.href}
                className={
                  'relative flex h-[72px] items-center transition-colors ' +
                  (active ? 'text-brand' : 'text-ink-soft hover:text-ink')
                }
              >
                {l.label}
                {active && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[13px] font-semibold text-cream transition-colors hover:bg-brand-dark">
            <Download size={15} />
            <span className="hidden sm:inline">Download Brochure</span>
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-lg border border-brand-pale text-ink-soft transition-colors hover:bg-brand-pale">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
