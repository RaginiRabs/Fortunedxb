// prototype1 footer — premium dark, gold wave top, multi-column + newsletter. Mock only.
import {
  Instagram, Facebook, Linkedin, Youtube,
  ChevronRight, MapPin, Phone, Mail,
  Building2, Key, Repeat, BadgePercent, Gem, Waves,
  BadgeCheck, Users, ShieldCheck,
} from 'lucide-react';
import { footerLinks, contactInfo, footerBadges } from '@/mock/prototype1/home';

const SOCIALS = [Instagram, Facebook, Linkedin, Youtube];
const CATEGORY_ICONS = [Building2, Key, Repeat, BadgePercent, Gem, Waves];
const BADGE_ICONS = [BadgeCheck, Building2, Users, ShieldCheck];

function Heading({ children }) {
  return (
    <h4 className="relative pb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white">
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#D9B45F] to-[#A37F3C]" />
    </h4>
  );
}

// Decorative gold-line Dubai skyline.
function Skyline() {
  return (
    <svg
      viewBox="0 0 520 220"
      fill="none"
      className="pointer-events-none absolute bottom-0 right-0 hidden h-44 w-[46%] max-w-[520px] text-[#B89149] opacity-30 lg:block"
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
    <footer className="relative bg-[#0a1320] pt-14 text-gray-300">
      <div className="relative overflow-hidden">
        <Skyline />

        <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-10 px-4 pb-10 md:px-8 lg:grid-cols-[1.6fr_1fr_1.2fr_1.1fr_1.3fr]">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <img src="/images/fortune-logo-trim.png" alt="Fortune Realty L.L.C" className="h-9 w-auto brightness-0 invert md:h-10" />
            <div className="my-5 h-px w-16 bg-gradient-to-r from-[#B89149] to-transparent" />
            <p className="text-lg font-semibold leading-snug text-white">
              Your Trusted Partner in <span className="text-[#D9B45F]">Dubai</span> Real Estate
            </p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-gray-400">
              Delivering exceptional real estate opportunities and investment solutions across Dubai&apos;s most
              sought-after communities.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-gray-300 transition-all hover:-translate-y-0.5 hover:border-[#B89149] hover:bg-[#B89149] hover:text-white"
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
                  <a href="#" className="group inline-flex items-center gap-1.5 text-[13px] text-gray-400 transition-colors hover:text-[#D9B45F]">
                    <ChevronRight className="h-3.5 w-3.5 text-[#B89149] transition-transform group-hover:translate-x-0.5" />
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
                    <a href="#" className="inline-flex items-center gap-2.5 text-[13px] text-gray-400 transition-colors hover:text-[#D9B45F]">
                      <Icon className="h-4 w-4 text-[#B89149]" /> {l}
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
                  <a href="#" className="inline-flex items-center gap-2.5 text-[13px] text-gray-400 transition-colors hover:text-[#D9B45F]">
                    <MapPin className="h-4 w-4 text-[#B89149]" /> {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <Heading>Contact Us</Heading>
            <ul className="mt-4 space-y-3.5 text-[13px] text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B89149]" /> {contactInfo.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#B89149]" /> {contactInfo.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#B89149]" /> {contactInfo.email}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-4 py-5 text-[12px] text-gray-400 md:px-8 xl:flex-row xl:justify-between">
            <span>© 2026 Fortune Realty DXB. All Rights Reserved.</span>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {footerBadges.map((b, i) => {
                const Icon = BADGE_ICONS[i] || BadgeCheck;
                return (
                  <span key={b} className="inline-flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-[#B89149]" /> {b}
                  </span>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#D9B45F]">Privacy Policy</a>
              <a href="#" className="hover:text-[#D9B45F]">Terms &amp; Conditions</a>
            </div>
          </div>
          <p className="pb-4 text-center text-[11px] text-gray-500">
            Designed by <span className="font-medium text-[#B89149]">RABS Net Solutions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
