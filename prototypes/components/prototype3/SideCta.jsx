// Compact advisor CTA — sits beside the FAQ in a two-column footer block so the
// listing pages don't end on empty white space. prototype3 ONLY.
import Link from 'next/link';
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function SideCta() {
  return (
    <div className="flex h-full flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#80603f] to-[#5E4636] p-7 text-white ring-1 ring-black/10 sm:p-9">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E0C3A0]">Get matched</span>
      <h2 className="mt-3 text-2xl font-bold leading-[1.12] tracking-tight text-white sm:text-3xl font-[family-name:var(--font-heading)]">
        Talk to a Dubai property advisor
      </h2>
      <p className="mt-3 text-[14px] leading-relaxed text-white/75">
        Tell us your budget and goals — we&apos;ll match you with the right unit within 24 hours.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/prototype3/contact"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-[#FAF7F3] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#80603f]"
        >
          <Phone size={16} /> Book a call
        </Link>
        <a
          href="https://wa.me/97140000000"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white outline-none transition-all hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#80603f]"
        >
          <MessageCircle size={16} /> WhatsApp
          <ArrowUpRight size={15} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}
