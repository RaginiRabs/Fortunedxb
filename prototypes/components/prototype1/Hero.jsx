// prototype1 hero — full-bleed background image with content overlaid on the left.
import { Search, MapPin, Building2, Wallet, Home, ChevronDown } from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';
import { stats, heroImage } from '@/mock/prototype1/home';

const FILTERS = [
  { label: 'All Communities', sub: 'Community' },
  { label: 'All Developers', sub: 'Developer' },
  { label: 'Any Budget', sub: 'Budget' },
  { label: 'All Types', sub: 'Property Type' },
];

const STAT_ICONS = { projects: MapPin, developers: Building2, communities: Home, price: Wallet };

export default function Hero() {
  return (
    <section className="relative -mt-[88px] overflow-hidden">
      {/* Background image — Dubai projects map */}
      <img src={heroImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      {/* Readability overlay — solid on the left, fading to reveal the map on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/30 md:from-white md:via-white/45 md:to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-[120px] md:px-8 md:pb-20 md:pt-[140px]">
        <div className="max-w-2xl">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f6f1e6] px-3 py-1 text-[11px] font-medium text-[#80603f]">
            ✦ Discover 500+ Verified Projects
          </span>

          <h1 className="mt-5 text-5xl md:text-6xl font-light leading-[1.05] tracking-tight text-[#1a1a1a]">
            Find Your Perfect<br />Property in Dubai
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-600">
            Explore premium properties from top developers in Dubai&apos;s most sought-after communities.
          </p>

          {/* Search filters */}
          <div className="mt-7 flex flex-wrap items-end gap-3 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-[0_18px_50px_-15px_rgba(20,18,15,0.35)] backdrop-blur">
            {FILTERS.map((f) => (
              <button
                key={f.sub}
                className="flex min-w-[132px] flex-1 flex-col items-start rounded-lg px-3 py-2 text-left hover:bg-gray-50"
              >
                <span className="flex w-full items-center justify-between gap-2 whitespace-nowrap text-sm font-medium text-[#1a1a1a]">
                  {f.label} <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
                </span>
                <span className="text-[11px] text-gray-400">{f.sub}</span>
              </button>
            ))}
            <button className="grid h-12 w-12 place-items-center rounded-lg bg-[#80603f] text-white hover:bg-[#a37f3c]">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Stat cards */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => {
              const Icon = STAT_ICONS[s.id] || MapPin;
              return (
                <div
                  key={s.id}
                  className="rounded-2xl border border-white/60 bg-white/95 px-4 py-4 text-center shadow-[0_12px_34px_-12px_rgba(20,18,15,0.28)] backdrop-blur transition-shadow hover:shadow-[0_18px_44px_-12px_rgba(184,145,73,0.35)]"
                >
                  <Icon className="mx-auto mb-2 h-5 w-5 text-[#80603f]" />
                  <div className="text-xl font-semibold text-[#1a1a1a]">
                    {s.currency && <Dirham className="mr-0.5 text-[#80603f]" />}
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-gray-400">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
