import Link from 'next/link';
import { ArrowRight, Instagram, Facebook, Linkedin, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const COLS = [
  ['Explore', [['Projects', '/prototype3/projects'], ['Distress Deals', '/prototype3/distress'], ['Map', '/prototype3/map']]],
  ['Company', [['About', '/prototype3/about'], ['Developers', '/prototype3/developers'], ['Contact', '/prototype3/contact']]],
];

const SOCIALS = [Instagram, Facebook, Linkedin, Twitter];

export default function Footer() {
  return (
    <footer className="bg-[#272019] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Link href="/prototype3" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E0C3A0] text-[13px] font-bold text-[#0A0A12] font-[family-name:var(--font-heading)]">
                F
              </span>
              <span className="text-[17px] font-bold tracking-tight font-[family-name:var(--font-heading)]">
                FortuneDXB<span className="text-[#E0C3A0]">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Dubai off-plan, ready resale &amp; below-market distress deals — done properly, on real numbers.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#E0C3A0] hover:bg-[#E0C3A0] hover:text-[#0A0A12]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(([title, links]) => (
            <div key={title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E0C3A0]">{title}</p>
              <ul className="mt-4 space-y-3">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/65 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter + contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E0C3A0]">Get new launches first</p>
            <form className="mt-4 flex overflow-hidden rounded-full border border-white/18 bg-white/[0.05] focus-within:border-[#E0C3A0]">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="grid w-12 shrink-0 place-items-center bg-[#E0C3A0] text-[#0A0A12] transition-colors hover:bg-[#EBD2B0]"
              >
                <ArrowRight size={17} />
              </button>
            </form>
            <ul className="mt-5 space-y-2.5 text-sm text-white/60">
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[#E0C3A0]" /> Business Bay, Dubai, UAE
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#E0C3A0]" /> +971 4 000 0000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#E0C3A0]" /> hello@fortunedxb.ae
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© 2026 FortuneDXB. All rights reserved · RERA registered.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-white/80">Privacy</a>
            <a href="#" className="transition-colors hover:text-white/80">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
