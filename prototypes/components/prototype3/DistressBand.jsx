import Link from 'next/link';
import { ArrowUpRight, TrendingDown } from 'lucide-react';
import Card from '@/components/prototype3/Card';

// Dark brown band: copy + "view all" on the left, horizontally-scrolling deal
// cards on the right.
export default function DistressBand({ deals }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <div className="overflow-hidden rounded-2xl bg-[#2E231B] ring-1 ring-black/20 sm:rounded-3xl">
        <div className="p-6 sm:p-10 lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-stretch lg:gap-10 lg:p-14">
          {/* Left — copy, stats, and the CTA pinned bottom-left */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E0C3A0]">
              <TrendingDown aria-hidden="true" size={13} /> Below Market
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-[40px] font-[family-name:var(--font-heading)]">
              Distress deals, priced to move.
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">
              Motivated-seller resales below market value — verified ownership, ready titles, limited inventory.
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-9">
              {[
                ['Up to 20%', 'Below market'],
                ['48 hrs', 'Avg. deal close'],
                ['100%', 'RERA verified'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="text-2xl font-bold tracking-tight text-[#E0C3A0] font-[family-name:var(--font-heading)]">{v}</dd>
                  <p aria-hidden="true" className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">{l}</p>
                </div>
              ))}
            </dl>

            <Link
              href="/prototype3/distress"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#E0C3A0] px-6 py-3.5 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E231B] lg:mt-auto"
            >
              View all distress deals
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Right — horizontal scroll cards */}
          <div className="mt-8 min-w-0 lg:mt-0">
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {deals.map((p) => (
                <div key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[280px]">
                  <Card project={p} />
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-white/35 lg:text-right">
              Scroll for more →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
