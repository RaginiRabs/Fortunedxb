'use client';

import { useState } from 'react';
import { Phone, MessageCircle, ShieldCheck, Clock, BadgePercent, Send, CheckCircle2 } from 'lucide-react';

const TRUST = [
  [ShieldCheck, 'RERA-verified'],
  [Clock, '24-hour response'],
  [BadgePercent, 'Zero brokerage on off-plan'],
];

const inputCls =
  'w-full rounded-xl border border-white/15 bg-white/95 px-4 py-3.5 text-sm text-[#0A0A12] outline-none transition placeholder:text-[#9A9AA3] focus:border-white focus:ring-2 focus:ring-white/40';

export default function CtaBand() {
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#80603f] to-[#5E4636] p-6 ring-1 ring-black/10 sm:rounded-3xl sm:p-10 lg:p-14">
        {/* decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E0C3A0]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-black/15 blur-3xl" />

        <div className="relative">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E0C3A0]">Let&apos;s talk</span>
            <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-[35px] md:text-[40px] font-[family-name:var(--font-heading)]">
              Talk to a Dubai property advisor.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">
              Share your budget and goals — we&apos;ll match you with the right off-plan launch or below-market resale within 24 hours.
            </p>
          </div>

          {/* Trust chips */}
          <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
            {TRUST.map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2 text-[13px] font-medium text-white/85">
                <Icon size={15} className="text-[#E0C3A0]" /> {label}
              </li>
            ))}
          </ul>

          {/* Full-width callback form */}
          <div className="mt-8 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur sm:p-5">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-6 text-center sm:flex-row sm:py-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E0C3A0]/20 text-[#E0C3A0]">
                  <CheckCircle2 size={24} />
                </span>
                <div className="sm:text-left">
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-heading)]">Request received</h3>
                  <p className="text-sm text-white/70">An advisor will call you back within a few hours.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-center"
              >
                <input required placeholder="Your name" aria-label="Your name" className={inputCls} />
                <input required type="tel" placeholder="Phone number" aria-label="Phone number" className={inputCls} />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#E0C3A0] px-6 py-3.5 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5E4636] sm:col-span-2 lg:col-span-1"
                >
                  Request a callback
                  <Send size={15} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>

          {/* Quick links */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-white">
            <a href="tel:+97140000000" className="inline-flex items-center gap-2 transition-colors hover:text-[#E0C3A0]">
              <Phone size={15} /> Call now
            </a>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <a href="https://wa.me/97140000000" target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition-colors hover:text-[#E0C3A0]">
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
