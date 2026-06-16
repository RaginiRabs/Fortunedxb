import Link from 'next/link';
import { ArrowUpRight, BedDouble, DraftingCompass, TrendingUp, Sparkles, Check } from 'lucide-react';
import Card from '@/components/prototype3/Card';
import Reveal from '@/components/prototype3/Reveal';
import FeaturedCarousel from '@/components/prototype3/FeaturedCarousel';

// Featured — broken out of the carousel pattern on desktop: one big editorial
// "spotlight" + a static grid. On mobile it becomes spotlight + a horizontal
// scroll of the rest, so the page never feels like the same module three times.
const aed = (n) => `AED ${n.toLocaleString()}`;

function Spotlight({ p }) {
  const specs = [
    [BedDouble, p.beds],
    [DraftingCompass, p.size],
    [TrendingUp, `${p.yield} yield`],
  ];
  // Why our desk picked this one — built from the listing's own facts.
  const picks = [
    p.handover ? `Handover ${p.handover}` : 'Ready to move in',
    p.paymentPlan ? `${p.paymentPlan} payment plan` : 'Flexible payment terms',
    `${p.yield} projected rental yield`,
    'Priced below the area launch average',
  ];

  // Desktop — all the hard numbers, pulled up into a strip under the name.
  const metrics = [
    ['Beds', p.beds],
    ['Size', p.size],
    p.handover ? ['Handover', p.handover] : ['Status', 'Ready'],
    p.paymentPlan ? ['Payment', p.paymentPlan] : ['Built', p.builtYear],
    ['Yield', p.yield],
  ];

  // Desktop — an editorial line that fills the bottom of the card.
  const desc =
    p.type === 'off-plan'
      ? `A standout launch in ${p.area} by ${p.developer} — ${p.beds} homes priced below the area average, on a flexible ${p.paymentPlan} payment plan with handover in ${p.handover}. Our pick for the sharpest value on the board this week.`
      : `A hand-picked ${p.area} resale by ${p.developer} — ${p.beds} homes, ready to move in with day-one rental income at a ${p.yield} yield. Our pick for the sharpest value on the board this week.`;

  return (
    <Link
      href={`/prototype3/${p.slug || 'marina-vista'}`}
      className="group relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-black/5 lg:min-h-[420px]"
    >
      <img
        src={p.imageUrl}
        alt={p.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-[#0A0A12]/40 to-[#0A0A12]/5" />

      {/* top chips */}
      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#80603f] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-lg">
          <Sparkles size={13} /> Editor&apos;s pick
        </span>
        <span className="rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
          {p.status}
        </span>
      </div>

      {/* content */}
      <div className="relative p-5 text-white sm:p-8">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#E0C3A0] sm:text-[12px]">
          {p.developer}
          <span className="h-1 w-1 rounded-full bg-[#E0C3A0]/60" />
          <span className="font-medium normal-case tracking-normal text-white/75">{p.area}</span>
        </div>
        <h3 className="mt-2 text-[28px] font-bold leading-[1.05] tracking-tight sm:text-[40px] font-[family-name:var(--font-heading)]">
          {p.name}
        </h3>

        {/* mobile / tablet — compact icon specs (desktop uses the metric bar) */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-white/90 sm:text-[13.5px] lg:hidden">
          {specs.map(([Icon, label]) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon size={16} className="text-[#E0C3A0]" /> {label}
            </span>
          ))}
        </div>

        {/* desktop — all metrics pulled up into a frosted strip under the name */}
        <dl className="mt-4 hidden divide-x divide-white/15 overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md lg:grid lg:grid-cols-5">
          {metrics.map(([label, value]) => (
            <div key={label} className="px-4 py-3">
              <dt className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/55">{label}</dt>
              <dd className="mt-1 text-[14px] font-bold leading-tight text-white font-[family-name:var(--font-heading)]">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* desktop — editorial description fills the bottom */}
        <p className="mt-4 hidden max-w-2xl text-[14px] leading-relaxed text-white/80 lg:block">{desc}</p>

        {/* mobile / tablet — the "why" as compact chips */}
        <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
          {picks.slice(0, 2).map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-medium text-white ring-1 ring-white/15 backdrop-blur-md"
            >
              <Check size={11} className="text-[#E0C3A0]" /> {item}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">Starting from</p>
            <p className="text-[26px] font-semibold leading-tight sm:text-[30px] font-[family-name:var(--font-heading)]" dir="ltr">
              {aed(p.priceFrom)}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E0C3A0] px-5 py-3 text-sm font-semibold text-[#2E231B] transition-all group-hover:bg-white">
            View details
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedShowcase({ projects }) {
  const [spotlight, ...rest] = projects;
  const grid = rest.slice(0, 8);

  return (
    <section className="mx-auto mt-8 max-w-[1600px] px-4 sm:mt-10 sm:px-6 md:mt-14 md:px-12">
      <Reveal className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
            Featured
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] sm:text-[2.25rem] md:text-4xl font-[family-name:var(--font-heading)]">
            This week&apos;s sharpest buys
          </h2>
        </div>
        <Link
          href="/prototype3/projects"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0A0A12] outline-none transition-colors hover:text-[#80603f] focus-visible:text-[#80603f] sm:inline-flex"
        >
          View all <ArrowUpRight size={16} />
        </Link>
      </Reveal>

      {/* ── Mobile: spotlight + horizontal scroll of the rest ── */}
      <div className="sm:hidden">
        <Reveal>
          <Spotlight p={spotlight} />
        </Reveal>
        <div className="mt-5">
          <FeaturedCarousel projects={grid} hideHighlight />
        </div>
      </div>

      {/* ── Tablet / desktop: spotlight bento + static grid ── */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-4">
        <Reveal className="sm:col-span-2 lg:row-span-2">
          <Spotlight p={spotlight} />
        </Reveal>
        {grid.slice(0, 4).map((p, i) => (
          <Reveal key={p.id} delay={60 + i * 60}>
            <Card project={p} hideHighlight />
          </Reveal>
        ))}
      </div>

      {grid.length > 4 && (
        <div className="mt-5 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {grid.slice(4).map((p, i) => (
            <Reveal key={p.id} delay={60 + i * 60}>
              <Card project={p} hideHighlight />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
