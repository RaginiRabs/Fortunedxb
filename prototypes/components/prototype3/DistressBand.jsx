import Link from 'next/link';
import { ArrowUpRight, TrendingDown } from 'lucide-react';
import FeaturedCarousel from '@/components/prototype3/FeaturedCarousel';

// Dark brown band that frames below-market distress deals in a scroll carousel.
export default function DistressBand({ deals }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <div className="relative overflow-hidden rounded-3xl bg-[#2E231B] ring-1 ring-black/20">
        {/* decorative glass / shine filling the empty top-right corner */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* warm golden glow */}
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(224,195,160,0.50),transparent_66%)] blur-2xl" />
          <div className="absolute right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(224,195,160,0.35),transparent_70%)] blur-xl" />
          {/* broad glass sheen */}
          <div className="absolute -top-1/2 right-0 h-[200%] w-60 rotate-[20deg] bg-gradient-to-b from-white/[0.18] via-white/[0.05] to-transparent" />
          {/* crisp light edges */}
          <div className="absolute -top-1/2 right-28 h-[200%] w-px rotate-[20deg] bg-gradient-to-b from-white/45 to-transparent" />
          <div className="absolute -top-1/2 right-20 h-[200%] w-px rotate-[20deg] bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        <div className="relative z-10 p-5 sm:p-8 lg:p-10">
          {/* Header row */}
          <div className="flex flex-wrap items-end justify-between gap-5 sm:gap-6">
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
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E0C3A0] px-6 py-3.5 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2E231B] sm:w-auto"
            >
              View all distress deals
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Scroll carousel — same per-card width as Featured, so the 4th card peeks */}
          <div className="mt-7 sm:mt-9">
            <FeaturedCarousel projects={deals} hideHighlight />
          </div>
        </div>
      </div>
    </section>
  );
}
