import Link from 'next/link';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import FeaturedCarousel from '@/components/prototype3/FeaturedCarousel';

// Ready-to-move resale section — light, gold-accented counterpart to the dark
// distress band, with a light-theme glass shine in the top-right corner.
export default function ResaleBand({ deals }) {
  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <div className="relative overflow-hidden rounded-3xl border border-[rgba(10,10,18,0.08)] bg-[#FAF7F3]">
        {/* decorative gold glass / shine filling the empty top-right corner (tuned for the light band) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* warm golden glow */}
          <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(196,154,60,0.20),transparent_66%)] blur-2xl" />
          <div className="absolute right-8 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(196,154,60,0.16),transparent_70%)] blur-xl" />
          {/* broad bright sheen */}
          <div className="absolute -top-1/2 right-0 h-[200%] w-60 rotate-[20deg] bg-gradient-to-b from-white/70 via-white/25 to-transparent" />
          {/* crisp light + gold edges */}
          <div className="absolute -top-1/2 right-28 h-[200%] w-px rotate-[20deg] bg-gradient-to-b from-white/90 to-transparent" />
          <div className="absolute -top-1/2 right-20 h-[200%] w-px rotate-[20deg] bg-gradient-to-b from-[#C49A3C]/40 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          {/* Header row */}
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C49A3C]/30 bg-[#C49A3C]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A7625]">
                <BadgeCheck aria-hidden="true" size={13} /> Ready to move
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-[#0A0A12] md:text-[40px] font-[family-name:var(--font-heading)]">
                Resale homes, ready today.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#55555E]">
                Hand-picked secondary-market homes with ready titles — move in or rent out from day one, no construction wait.
              </p>

              <dl className="mt-6 flex flex-wrap gap-x-9 gap-y-4">
                {[
                  ['Ready', 'Titled & handed over'],
                  ['Day 1', 'Rental income'],
                  ['100%', 'RERA verified'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd className="text-2xl font-bold tracking-tight text-[#9A7625] font-[family-name:var(--font-heading)]">{v}</dd>
                    <p aria-hidden="true" className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A7A85]">{l}</p>
                  </div>
                ))}
              </dl>
            </div>

            <Link
              href="/prototype3/projects?type=resale"
              className="group inline-flex items-center gap-2 rounded-full bg-[#0A0A12] px-6 py-3.5 text-sm font-semibold text-white outline-none transition-all hover:bg-[#80603f] focus-visible:ring-2 focus-visible:ring-[#80603f]/40 focus-visible:ring-offset-2"
            >
              Browse all resale
              <ArrowUpRight aria-hidden="true" size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Scroll carousel — same per-card width as Featured, so the 4th card peeks */}
          <div className="mt-9">
            <FeaturedCarousel projects={deals} hideHighlight />
          </div>
        </div>
      </div>
    </section>
  );
}
