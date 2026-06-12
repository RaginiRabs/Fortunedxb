import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

// Closing call-to-action — book an advisor or browse listings.
export default function CtaBand() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#80603f] to-[#5E4636] px-8 py-12 text-center ring-1 ring-black/10 sm:px-10 sm:py-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-[40px] font-[family-name:var(--font-heading)]">
          Talk to a Dubai property advisor.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
          Tell us your budget and goals — we&apos;ll match you with the right off-plan launch or below-market resale within 24 hours.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/prototype3/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-[#FAF7F3] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#80603f]"
          >
            <Phone aria-hidden="true" size={16} /> Book a call
          </Link>
          <Link
            href="/prototype3/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white outline-none transition-all hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#80603f]"
          >
            Browse projects
            <ArrowRight aria-hidden="true" size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
