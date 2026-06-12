import Link from 'next/link';
import { ArrowUpRight, TrendingDown } from 'lucide-react';
import Card from '@/components/prototype3/Card';
import Reveal from '@/components/prototype3/Reveal';

// Dark brown band that frames below-market distress deals in a scroll carousel.
export default function DistressBand({ deals }) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-12">
      <div className="overflow-hidden rounded-3xl bg-[#2E231B] ring-1 ring-black/20">
        <div className="p-8 sm:p-10 lg:p-14">
          {/* Header row */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E0C3A0]">
                <TrendingDown aria-hidden="true" size={13} /> Below Market
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-[40px] font-[family-name:var(--font-heading)]">
                Distress deals, priced to move.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Motivated-seller resales below current market value — verified ownership, ready titles, limited inventory.
              </p>

              <dl className="mt-6 flex flex-wrap gap-x-9 gap-y-4">
                {[
                  ['Up to 20%', 'Below market'],
                  ['48 hrs', 'Avg. deal close'],
                  ['100%', 'RERA verified'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-2xl font-bold tracking-tight text-[#E0C3A0] font-[family-name:var(--font-heading)]">
                      {v}
                    </dd>
                    <p aria-hidden="true" className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">
                      {l}
                    </p>
                  </div>
                ))}
              </dl>
            </div>

            <Link
              href="/prototype3/distress"
              className="group inline-flex items-center gap-2 rounded-full bg-[#E0C3A0] px-6 py-3.5 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E231B]"
            >
              View all distress deals
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Fixed grid — staggered reveal, no horizontal scroll */}
          <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <Card project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
