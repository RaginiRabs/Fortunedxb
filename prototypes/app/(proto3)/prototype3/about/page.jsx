import Link from 'next/link';
import { ShieldCheck, LineChart, Handshake, ArrowRight, Phone } from 'lucide-react';
import Reveal from '@/components/prototype3/Reveal';
import Footer from '@/components/prototype3/Footer';
import CtaBand from '@/components/prototype3/CtaBand';

export const metadata = { title: 'About — Fortune' };

const STATS = [
  ['1,500+', 'Units sold'],
  ['40+', 'Developers'],
  ['AED 4B+', 'Transacted'],
  ['12 yrs', 'In Dubai'],
];

const PRINCIPLES = [
  { icon: ShieldCheck, title: 'Verified only', body: 'Every listing is a RERA-registered developer or a title-verified resale. No phantom inventory, ever.' },
  { icon: LineChart, title: 'Real numbers', body: 'Yields, payment plans and market comparables up front — so you decide on data, not on hype.' },
  { icon: Handshake, title: 'End to end', body: 'From shortlist to handover — one advisor, paperwork handled, zero brokerage on off-plan.' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
        {/* Hero */}
        <Reveal className="max-w-3xl">
          <span className="mb-3 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">About Fortune</span>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#0A0A12] sm:text-5xl md:text-6xl font-[family-name:var(--font-heading)]">
            Dubai property,<br />done on real numbers.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#55555E] sm:text-base">
            We help buyers and investors secure Dubai&apos;s best off-plan launches and below-market resales — with verified developers, transparent pricing and zero noise.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/prototype3/projects" className="group inline-flex items-center gap-2 rounded-full bg-[#80603f] px-6 py-3.5 text-sm font-semibold text-white outline-none transition-all hover:bg-[#6a5034] focus-visible:ring-2 focus-visible:ring-[#80603f]/40 focus-visible:ring-offset-2">
              Browse projects <ArrowRight size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
            </Link>
            <Link href="/prototype3/contact" className="inline-flex items-center gap-2 rounded-full border border-[rgba(10,10,18,0.14)] px-6 py-3.5 text-sm font-semibold text-[#0A0A12] outline-none transition-colors hover:border-[#80603f] hover:text-[#80603f]">
              <Phone size={16} /> Book a call
            </Link>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[rgba(10,10,18,0.08)] bg-[rgba(10,10,18,0.08)] sm:mt-16 sm:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="bg-[#FAF7F3] p-5 sm:p-6">
              <div className="text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl font-[family-name:var(--font-heading)]">{v}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">{l}</div>
            </div>
          ))}
        </Reveal>

        {/* Principles */}
        <div className="mt-12 sm:mt-16">
          <Reveal className="mb-7 max-w-2xl">
            <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">How we work</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] sm:text-[2.25rem] font-[family-name:var(--font-heading)]">Three things we never compromise on</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 90} className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-6 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FAF7F3] text-[#C49A3C]">
                  <p.icon size={22} />
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#55555E]">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Story */}
        <Reveal className="mt-12 grid items-center gap-8 overflow-hidden rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white sm:mt-16 lg:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80"
            alt="Dubai skyline"
            className="h-56 w-full object-cover sm:h-72 lg:h-full"
          />
          <div className="p-6 sm:p-9">
            <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Why Fortune</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl font-[family-name:var(--font-heading)]">Built by buyers, for buyers</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#55555E]">
              Fortune started because buying in Dubai felt like guesswork — inflated brochures, hidden fees and pressure tactics. We flipped it: show the real yield, the real payment plan and the real handover date, then let the numbers speak.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#55555E]">
              Today we work hand-in-hand with the city&apos;s top developers and a network of motivated sellers to bring you launches and resales you can trust.
            </p>
          </div>
        </Reveal>
      </section>

      <Reveal className="mt-4 sm:mt-8">
        <CtaBand />
      </Reveal>

      <div className="mt-16 sm:mt-20 md:mt-28">
        <Footer />
      </div>
    </div>
  );
}
