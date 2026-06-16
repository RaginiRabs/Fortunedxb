import Link from 'next/link';
import {
  MapPin, ArrowUpRight, ArrowRight, Search, Building2, Users, Boxes, Banknote,
  ShieldCheck, FileText, TrendingUp, Headset, Tag, Repeat, BadgePercent, Star,
} from 'lucide-react';
import { projects, developerFacets } from '@/mock/prototype2/projects';

// Cohesive Dubai architecture imagery (these render reliably as towers / skyline).
const HERO_IMG = 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2000&q=80';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80';

const STATS = [
  { icon: Boxes, value: '500+', label: 'Premium Projects' },
  { icon: Building2, value: '40+', label: 'Top Developers' },
  { icon: Users, value: '25+', label: 'Communities' },
  { icon: Banknote, value: 'AED 500K+', label: 'Starting Price' },
];

const CATEGORIES = [
  { icon: Building2, title: 'Off-Plan Projects', desc: 'New launches with flexible payment plans.', href: '/prototype2/projects', cta: 'Explore projects', count: '500+ listings', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1000&q=80' },
  { icon: Repeat, title: 'Resale Properties', desc: 'Verified secondary-market homes, ready to move.', href: '/prototype2/resale', cta: 'View resale', count: '250+ homes', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80' },
  { icon: BadgePercent, title: 'Distress Deals', desc: 'Discounted properties for smart investors.', href: '/prototype2/distress-deals', cta: 'See deals', count: 'Up to 45% off', image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1000&q=80' },
];

const VALUES = [
  { icon: ShieldCheck, title: '100% Verified Listings', desc: 'Every project and price is checked before it reaches you.' },
  { icon: FileText, title: 'Transparent Payment Plans', desc: 'Clear milestones, handover dates and developer terms.' },
  { icon: TrendingUp, title: 'ROI & Market Insights', desc: 'Data-backed yields and real transaction history.' },
  { icon: Headset, title: 'Expert Advisory', desc: 'Dubai specialists guiding you from enquiry to handover.' },
];

export default function Prototype2Home() {
  const featured = projects.slice(0, 6);
  const developers = developerFacets.filter((d) => d.name !== 'All Developers');

  return (
    <div>
      {/* ===== Hero (full-bleed, sits behind the floating header) ===== */}
      <section className="relative isolate -mt-[76px] flex min-h-[600px] items-center overflow-hidden sm:-mt-[96px] md:min-h-[760px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMG} alt="Dubai skyline" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deeper/95 via-brand-deeper/80 to-brand-deeper/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-deeper/90 via-transparent to-brand-deeper/30" />

        <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur">
            <Star size={12} className="text-brand-soft" /> Dubai&apos;s trusted off-plan partner
          </span>

          <h1 className="mt-6 max-w-3xl font-serif text-4xl font-extrabold leading-[1.05] tracking-tight text-cream md:text-[60px]">
            Find your next address in Dubai&apos;s <span className="text-brand-soft">finest</span> developments.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/85">
            Off-plan launches, verified resale homes and exclusive distress deals — curated and
            tracked by price, payment plan and real transaction history.
          </p>

          {/* Search bar */}
          <div className="mt-9 max-w-2xl rounded-2xl bg-white/95 p-2.5 shadow-[0_30px_70px_-28px_rgba(0,0,0,0.7)] backdrop-blur sm:flex sm:items-center sm:gap-1">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search size={18} className="shrink-0 text-ink-faint" />
              <input placeholder="Search project, community…" className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-ink-faint" />
            </div>
            <div className="hidden h-7 w-px bg-brand-pale sm:block" />
            <div className="flex items-center gap-2 px-3 sm:px-2">
              <MapPin size={16} className="shrink-0 text-ink-faint" />
              <select className="w-full bg-transparent py-2.5 text-sm text-ink-soft outline-none sm:w-32">
                <option>All Locations</option>
                <option>Downtown Dubai</option>
                <option>Dubai Marina</option>
                <option>Palm Jumeirah</option>
                <option>Business Bay</option>
              </select>
            </div>
            <Link href="/prototype2/projects" className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-brand-dark sm:mt-0">
              Search <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-cream/85">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-brand-soft" /> 100% Verified</span>
            <span className="inline-flex items-center gap-1.5"><FileText size={15} className="text-brand-soft" /> Flexible Payment Plans</span>
            <span className="inline-flex items-center gap-1.5"><TrendingUp size={15} className="text-brand-soft" /> Strong ROI</span>
          </div>
        </div>
      </section>

      {/* ===== Stats card (overlaps hero) ===== */}
      <div className="relative z-10 mx-auto -mt-12 max-w-[1400px] px-5 md:px-8">
        <div className="grid grid-cols-2 divide-brand-pale overflow-hidden rounded-2xl border border-brand-pale bg-white shadow-[0_24px_60px_-30px_rgba(58,44,34,0.5)] sm:grid-cols-4 sm:divide-x">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-6 py-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-pale text-brand"><s.icon size={19} /></span>
              <div className="leading-tight">
                <div className="font-serif text-xl font-extrabold text-ink">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-ink-faint">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Featured projects ===== */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Handpicked</span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-ink md:text-[40px]">Featured Projects</h2>
            <p className="mt-1.5 text-[14px] text-ink-soft">The most sought-after launches across Dubai.</p>
          </div>
          <Link href="/prototype2/projects" className="hidden shrink-0 items-center gap-1.5 rounded-full border border-brand px-5 py-2.5 text-[13px] font-semibold text-brand transition-colors hover:bg-brand hover:text-cream sm:inline-flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/prototype2/${p.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-brand-pale bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-soft hover:shadow-[0_18px_40px_-20px_rgba(58,44,34,0.45)]"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deeper/70 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand backdrop-blur-sm">
                  {p.status}
                </span>
                <div className="absolute inset-x-4 bottom-3 flex items-end justify-between text-cream">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-cream/70">From</span>
                    <span className="font-serif text-lg font-extrabold">{p.priceLabel}</span>
                  </div>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold backdrop-blur">ROI {p.roi}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-bold text-ink">{p.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-soft">
                  <MapPin size={13} className="text-brand" /> {p.area} <span className="text-ink-faint">·</span> {p.developer}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-brand-pale pt-4 text-[12px] text-ink-soft">
                  <span>{p.beds} Beds <span className="text-ink-faint">·</span> {p.units} Units</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand">Details <ArrowRight size={13} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Explore categories (image cards) ===== */}
      <section className="bg-cream-100/60 py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="mb-9 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">What are you looking for</span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-ink md:text-[40px]">Explore the marketplace</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group relative isolate flex aspect-[5/6] flex-col justify-end overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-24px_rgba(58,44,34,0.6)] md:aspect-[4/5]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.title} className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-deeper/95 via-brand-deeper/45 to-brand-deeper/5" />

                <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand backdrop-blur">{c.count}</span>

                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-cream ring-1 ring-white/25 backdrop-blur">
                  <c.icon size={22} />
                </span>
                <h3 className="mt-4 font-serif text-2xl font-extrabold text-cream">{c.title}</h3>
                <p className="mt-1.5 max-w-[15rem] text-[13px] leading-relaxed text-cream/85">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-cream">
                  {c.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why us (split) ===== */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* image */}
          <div className="relative">
            <div className="aspect-[5/4] w-full overflow-hidden rounded-[28px] border border-brand-pale shadow-[0_30px_70px_-34px_rgba(58,44,34,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ABOUT_IMG} alt="Dubai real estate" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-3 hidden rounded-2xl border border-brand-pale bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-cream"><ShieldCheck size={18} /></span>
                <div className="leading-tight">
                  <div className="font-serif text-base font-extrabold text-ink">100% Verified</div>
                  <div className="text-[11px] text-ink-faint">Every listing checked</div>
                </div>
              </div>
            </div>
          </div>

          {/* copy + values */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Why Fortune Realty</span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-[40px]">
              Invest with clarity and confidence.
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
              We pair on-the-ground Dubai expertise with real market data, so every decision is an
              informed one — from first enquiry to final handover.
            </p>

            <div className="mt-7 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              {VALUES.map((v) => (
                <div key={v.title} className="flex gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-pale text-brand"><v.icon size={20} /></span>
                  <div>
                    <h3 className="font-serif text-[15px] font-bold text-ink">{v.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Top developers ===== */}
      <section className="bg-cream-100/60 py-16">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Our Network</span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold tracking-tight text-ink md:text-[40px]">Top Developers</h2>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {developers.map((d) => (
              <div key={d.name} className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-brand-pale bg-white px-4 py-7 text-center transition-all hover:-translate-y-1 hover:border-brand-soft hover:shadow-[0_16px_36px_-22px_rgba(58,44,34,0.4)]">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-pale font-serif text-base font-extrabold text-brand">
                  {d.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-[13px] font-semibold text-ink">{d.name}</span>
                <span className="text-[11px] text-ink-faint">{d.count} projects</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Distress deals band ===== */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand-deeper px-8 py-12 md:px-14 md:py-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deeper via-brand-deeper/80 to-brand-deeper/40" />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-soft">
              <Tag size={12} /> Limited time
            </span>
            <h2 className="mt-4 font-serif text-3xl font-extrabold tracking-tight text-cream md:text-[40px]">
              Exclusive distress deals — up to 45% below market.
            </h2>
            <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-cream/80">
              Bank-repossessed, motivated-seller and off-market opportunities, 100% verified.
              Move fast — these won&apos;t last.
            </p>
            <Link href="/prototype2/distress-deals" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-cream transition-colors hover:bg-brand-light">
              Browse distress deals <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="border-t border-brand-pale bg-cream-100/50">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-5 py-16 text-center md:px-8 md:py-20">
          <h2 className="max-w-2xl font-serif text-3xl font-extrabold tracking-tight text-ink md:text-[40px]">
            Ready to find your next investment?
          </h2>
          <p className="max-w-lg text-[15px] text-ink-soft">
            Talk to our Dubai property specialists and get a tailored shortlist — free, no obligation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-bold text-cream transition-colors hover:bg-brand-dark">
              Get in Touch <ArrowUpRight size={16} />
            </button>
            <Link href="/prototype2/projects" className="inline-flex items-center gap-2 rounded-full border border-brand px-7 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-cream">
              Browse all projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
