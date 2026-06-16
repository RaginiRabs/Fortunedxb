// prototype5 footer — light, multi-column with skyline accent. Self-contained. Mock only.
import {
  Instagram, Facebook, Linkedin, Youtube,
  ChevronRight, MapPin, Phone, Mail,
  Building2, Key, Repeat, BadgePercent, Gem, Waves,
  BadgeCheck, Users, ShieldCheck,
} from 'lucide-react';
import { footerLinks, contactInfo, footerBadges } from '@/mock/prototype5/home';

const SOCIALS = [Instagram, Facebook, Linkedin, Youtube];

const hrefFor = (l) =>
  l === 'Home' ? '/prototype5'
    : l === 'Projects' ? '/prototype5/projects'
    : l === 'Distress Deals' ? '/prototype5/distress-deals'
    : l === 'Resale Properties' ? '/prototype5/resale-properties'
    : l === 'About Us' ? '/prototype5/about'
    : l === 'Contact Us' ? '/prototype5/contact'
    : '#';
const CATEGORY_ICONS = [Building2, Key, Repeat, BadgePercent, Gem, Waves];
const BADGE_ICONS = [BadgeCheck, Building2, Users, ShieldCheck];

function Heading({ children }) {
  return (
    <h4 className="relative pb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#1a1a1a]">
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33]" />
    </h4>
  );
}

function Skyline() {
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      className="pointer-events-none absolute bottom-0 right-0 hidden h-44 w-[46%] max-w-[520px] text-[#80603f] opacity-[0.12] lg:block"
      preserveAspectRatio="xMaxYMax meet"
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M10 220V150l14-8v78M40 220V120l18 10v90M70 220V90l10-30 10 30v130" />
        <path d="M150 220V70c0-30 26-46 26-46s26 16 26 46v150" />
        <path d="M176 24V6" />
        <path d="M120 220V110l16-10v120M210 220V130l18-12v102M250 220V96l14-12 14 12v124" />
        <path d="M300 220V120l20-14v108M340 220V150l16-10v80M380 220V100l18-16 18 16v120" />
        <path d="M430 220V140l16-12v92M470 220V112l20-18v126M500 220V160l12-10v70" />
      </g>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#f6f1e7] text-[#6b5e52]">
      {/* slim bronze top line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#80603f] to-transparent opacity-60" />
      <Skyline />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-10 px-4 py-16 md:px-8 lg:grid-cols-[1.6fr_1fr_1.2fr_1.1fr_1.3fr]">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <img src="/images/fortune-logo-trim.png" alt="Fortune Realty L.L.C" className="h-9 w-auto md:h-10" />
          <div className="my-5 h-px w-16 bg-gradient-to-r from-[#80603f] to-transparent" />
          <p className="text-lg font-semibold leading-snug text-[#1a1a1a]">
            Your Trusted Partner in <span className="text-[#80603f]">Dubai</span> Real Estate
          </p>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-gray-500">
            Delivering exceptional real estate opportunities and investment solutions across Dubai&apos;s most
            sought-after communities.
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#80603f] hover:bg-[#80603f] hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <Heading>Quick Links</Heading>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.quick.map((l) => (
              <li key={l}>
                <a href={hrefFor(l)} className="group inline-flex items-center gap-1.5 text-[13px] text-gray-500 transition-colors hover:text-[#80603f]">
                  <ChevronRight className="h-3.5 w-3.5 text-[#80603f] transition-transform group-hover:translate-x-0.5" />
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Property Categories */}
        <div>
          <Heading>Property Categories</Heading>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.categories.map((l, i) => {
              const Icon = CATEGORY_ICONS[i] || Building2;
              return (
                <li key={l}>
                  <a href="#" className="inline-flex items-center gap-2.5 text-[13px] text-gray-500 transition-colors hover:text-[#80603f]">
                    <Icon className="h-4 w-4 text-[#80603f]" /> {l}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Popular Areas */}
        <div>
          <Heading>Popular Areas</Heading>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.areas.map((l) => (
              <li key={l}>
                <a href="#" className="inline-flex items-center gap-2.5 text-[13px] text-gray-500 transition-colors hover:text-[#80603f]">
                  <MapPin className="h-4 w-4 text-[#80603f]" /> {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-1">
          <Heading>Contact Us</Heading>
          <ul className="mt-4 space-y-3.5 text-[13px] text-gray-600">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#80603f]" /> {contactInfo.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#80603f]" /> {contactInfo.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#80603f]" /> {contactInfo.email}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar — same warm tone, subtle divider */}
      <div className="relative border-t border-[#80603f]/15 bg-[#efe7d6]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-4 py-5 text-[12px] text-[#6b5e52] md:px-8 xl:flex-row xl:justify-between">
          <span>© 2026 Fortune Realty DXB. All Rights Reserved.</span>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footerBadges.map((b, i) => {
              const Icon = BADGE_ICONS[i] || BadgeCheck;
              return (
                <span key={b} className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#80603f]" /> {b}
                </span>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-[#80603f]">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-[#80603f]">Terms &amp; Conditions</a>
          </div>
        </div>
        <p className="border-t border-[#80603f]/10 py-3 text-center text-[11px] text-[#9c8a72]">
          Designed by{' '}
          <a href="https://www.rabsnetsolutions.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#80603f] hover:underline">RABS Net Solutions Pvt. Ltd.</a>
        </p>
      </div>
    </footer>
  );
}
