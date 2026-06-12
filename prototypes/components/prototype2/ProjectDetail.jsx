import Link from 'next/link';
import {
  MapPin,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  Activity,
  Grid2x2,
  X,
  CreditCard,
  HardHat,
  KeyRound,
  ChevronLeft,
  Download,
} from 'lucide-react';
import RegisterCard from '@/components/prototype2/RegisterCard';
import FloorPlans from '@/components/prototype2/FloorPlans';
import LocationMap from '@/components/prototype2/LocationMap';

const ICONS = {
  building: Building2,
  calendar: CalendarDays,
  check: CheckCircle2,
  clock: Clock3,
  dollar: DollarSign,
  activity: Activity,
};

// graduated bronze shades for the unit-mix distribution bar
const SEG_SHADES = ['#4A372A', '#6E5240', '#8C6A52', '#9A7458', '#B0875F'];

const STEP_ICONS = { card: CreditCard, construction: HardHat, key: KeyRound };

function SectionHead({ eyebrow, title }) {
  return (
    <div className="mb-5 flex items-end gap-4">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </span>
        <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-ink">
          {title}
        </h2>
      </div>
      <span className="mb-2 hidden h-px flex-1 bg-gradient-to-r from-brand-pale to-transparent sm:block" />
    </div>
  );
}

export default function ProjectDetail({ project }) {
  const p = project;

  return (
    <div className="pb-20">
      {/* Sticky property nav (tabs) — sits below the site header */}
      <header className="sticky top-[72px] z-30 border-b border-brand-pale bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-8">
          <Link
            href="/prototype2"
            className="shrink-0 rounded-full border border-brand-pale p-1.5 text-ink-soft transition-colors hover:bg-brand-pale hover:text-ink"
            aria-label="Back to projects"
          >
            <ChevronLeft size={16} />
          </Link>
          <nav className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto text-[13px]">
            {p.nav.map((item, i) => (
              <a
                key={item}
                href="#"
                className={
                  'whitespace-nowrap rounded-full px-3.5 py-1.5 transition-colors ' +
                  (i === 0
                    ? 'bg-brand-deeper font-medium text-cream'
                    : 'text-ink-soft hover:bg-brand-pale/70 hover:text-ink')
                }
              >
                {item}
              </a>
            ))}
          </nav>
          <button className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[13px] font-medium text-cream transition-colors hover:bg-brand-dark">
            <Download size={14} />
            <span className="hidden sm:inline">Download Brochure</span>
          </button>
        </div>
      </header>

      {/* HERO — clean banner image, full width */}
      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-8">
        <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl sm:aspect-[2/1] md:aspect-[51/20]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.heroImage}
            alt={p.name}
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* BODY: content + sticky right rail (register card aligns with title) */}
      <div className="mx-auto mt-8 grid max-w-6xl gap-10 px-4 md:px-8 lg:grid-cols-[1fr_340px]">
        {/* ---------- LEFT COLUMN ---------- */}
        <div className="min-w-0 space-y-14">
          {/* Intro: title + meta + progress */}
          <div>
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {p.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-brand" />
                {p.area}
              </span>
              <span className="text-ink-faint">·</span>
              <span>{p.developer}</span>
              <span className="ml-1 rounded-full bg-brand-pale px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-dark">
                {p.tag}
              </span>
            </div>

            {/* Overview strip: progress + chess view */}
            <div className="mt-6">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <Building2 size={15} className="text-brand" />
                  {p.construction.label}
                </span>
                <span className="text-sm font-semibold text-ink">
                  {p.construction.percent}% completed
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-pale">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-dark to-brand"
                  style={{ width: `${Math.max(p.construction.percent, 2)}%` }}
                />
              </div>
              <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-deeper px-4 py-2 text-[13px] font-medium text-cream transition-colors hover:bg-ink">
                <Grid2x2 size={14} />
                Chess View
              </button>
            </div>
          </div>

          {/* Market Highlights */}
          <section>
            <SectionHead eyebrow="At a glance" title="Market Highlights" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {p.highlights.map((h) => {
                const Icon = ICONS[h.icon] || Activity;
                return (
                  <div
                    key={h.key}
                    className="group rounded-2xl border border-brand-pale bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-soft"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-pale text-brand transition-colors group-hover:bg-brand group-hover:text-cream">
                      <Icon size={16} />
                    </span>
                    <span className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                      {h.label}
                    </span>
                    <span className="mt-1 block font-serif text-2xl font-semibold text-ink">
                      {h.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Payment Plan */}
          <section>
            <SectionHead eyebrow="Terms" title="Payment Plan" />
            <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-brand-pale bg-white">
              {[
                { label: 'Total commitment', value: p.paymentPlan.commitment },
                { label: 'Milestones', value: p.paymentPlan.milestones },
                { label: 'Plan', value: p.paymentPlan.plan },
              ].map((c, i) => (
                <div
                  key={c.label}
                  className={'p-6 transition-colors hover:bg-cream-100 ' + (i < 2 ? 'border-r border-brand-pale' : '')}
                >
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-ink-faint">
                    {c.label}
                  </span>
                  <span className="mt-1.5 block font-serif text-2xl font-semibold text-ink">
                    {c.value}
                  </span>
                </div>
              ))}
            </div>

            {/* milestone timeline */}
            <div className="mt-5 space-y-3">
              {p.paymentSteps.map((s, i) => {
                const Icon = STEP_ICONS[s.icon] || CreditCard;
                const isLast = i === p.paymentSteps.length - 1;
                return (
                  <div key={s.n} className="relative flex items-stretch gap-4">
                    {/* left: number + icon + connector */}
                    <div className="relative flex flex-col items-center">
                      <div className="relative">
                        <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-pale text-brand">
                          <Icon size={18} />
                        </span>
                        <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-brand-deeper text-[10px] font-bold text-cream">
                          {s.n}
                        </span>
                      </div>
                      {!isLast && (
                        <span className="mt-1 w-px flex-1 bg-brand-pale" />
                      )}
                    </div>

                    {/* right: label + percent */}
                    <div className="flex flex-1 items-center justify-between gap-4 rounded-2xl border border-brand-pale bg-white px-5 py-4 transition-colors hover:border-brand-soft">
                      <span className="rounded-full bg-brand-pale px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                        {s.label}
                      </span>
                      <span className="font-serif text-2xl font-semibold text-ink">
                        {s.percent}
                        <span className="ml-0.5 text-sm font-normal text-ink-faint">%</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Floor Plans */}
          <section>
            <SectionHead eyebrow="Layouts" title="Floor Plans & Layouts" />
            <FloorPlans plans={p.floorPlans} />
          </section>

          {/* Location & Connectivity */}
          <section>
            <SectionHead eyebrow="Where" title="Location & Connectivity" />
            <LocationMap data={p.location} />
          </section>

          {/* Unit Specifications */}
          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Inventory
                </span>
                <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-ink">
                  Unit Specifications
                </h2>
              </div>
              <button className="inline-flex items-center gap-1 rounded-full border border-brand-pale px-3 py-1.5 text-xs text-ink-soft transition-colors hover:bg-brand-pale hover:text-ink">
                <X size={12} /> Close
              </button>
            </div>

            {/* distribution bar — labels inside each segment */}
            <div className="mb-6 flex h-11 w-full overflow-hidden rounded-full">
              {p.distribution.map((d, i) => (
                <div
                  key={d.label}
                  style={{
                    flexGrow: d.percent,
                    flexBasis: 0,
                    backgroundColor: SEG_SHADES[i],
                    textShadow: '0 1px 2px rgba(0,0,0,.22)',
                  }}
                  className="flex items-center justify-center gap-1.5 whitespace-nowrap px-3 text-[11px] font-semibold text-white transition-opacity hover:opacity-95"
                  title={`${d.label} | ${d.percent}%`}
                >
                  {d.label} <span className="opacity-70">|</span> {d.percent}%
                </div>
              ))}
            </div>

            {/* specs table */}
            <div className="overflow-hidden rounded-2xl border border-brand-pale bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-brand-pale bg-cream-100 text-left text-[11px] uppercase tracking-wider text-ink-faint">
                      <th className="px-5 py-3.5 font-semibold">Beds</th>
                      <th className="px-5 py-3.5 font-semibold">Sizes <span className="lowercase">(sqft)</span></th>
                      <th className="px-5 py-3.5 font-semibold">Avg price</th>
                      <th className="px-5 py-3.5 font-semibold">Type</th>
                      <th className="px-5 py-3.5 font-semibold">Units</th>
                      <th className="px-5 py-3.5 font-semibold">Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.specs.map((s, i) => (
                      <tr
                        key={s.beds}
                        className={
                          'transition-colors hover:bg-cream-100 ' +
                          (i < p.specs.length - 1 ? 'border-b border-brand-pale' : '')
                        }
                      >
                        <td className="px-5 py-4 font-semibold text-ink">{s.beds}</td>
                        <td className="px-5 py-4 text-ink-soft">{s.sizes}</td>
                        <td className="px-5 py-4">
                          <span className="block font-medium text-ink">{s.avg}</span>
                          <span className="block text-[11px] text-ink-faint">{s.ppsf}</span>
                        </td>
                        <td className="px-5 py-4 text-ink-soft">{s.type}</td>
                        <td className="px-5 py-4 text-ink-soft">{s.units}</td>
                        <td className="px-5 py-4">
                          <span className="inline-block rounded-full bg-brand-pale px-3 py-1 text-[11px] font-semibold text-brand-dark">
                            {s.left} left
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Transactions */}
          <section>
            <SectionHead eyebrow="History" title="Transactions" />
            <div className="overflow-hidden rounded-2xl border border-brand-pale bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-brand-pale bg-cream-100 text-left text-[11px] uppercase tracking-wider text-ink-faint">
                      <th className="px-5 py-3.5 font-semibold">Date</th>
                      <th className="px-5 py-3.5 font-semibold">Seller</th>
                      <th className="px-5 py-3.5 font-semibold">Beds</th>
                      <th className="px-5 py-3.5 font-semibold">Size</th>
                      <th className="px-5 py-3.5 text-right font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.transactions.map((t, i) => (
                      <tr
                        key={i}
                        className={
                          'transition-colors hover:bg-cream-100 ' +
                          (i < p.transactions.length - 1 ? 'border-b border-brand-pale' : '')
                        }
                      >
                        <td className="px-5 py-4 text-ink-soft">{t.date}</td>
                        <td className="px-5 py-4">
                          <span className="rounded-md bg-brand-pale px-2.5 py-1 text-[11px] font-semibold text-brand-dark">
                            {t.seller}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-ink-soft">{t.beds}</td>
                        <td className="px-5 py-4 text-ink-soft">{t.size}</td>
                        <td className="px-5 py-4 text-right font-semibold text-ink">{t.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>

        {/* ---------- RIGHT RAIL ---------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-36">
            <RegisterCard
              developer={p.developer}
              launchLabel={p.launchLabel}
              launchPrice={p.launchPrice}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
