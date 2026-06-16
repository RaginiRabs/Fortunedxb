import { Compass, ListChecks, ShieldCheck, KeyRound } from 'lucide-react';
import Reveal from '@/components/prototype3/Reveal';

// "How it works" — a connected journey, not a row of disconnected boxes. A single
// line threads all four nodes (horizontal on desktop, vertical on mobile) so it
// reads as one path from goal to keys.
const STEPS = [
  {
    icon: Compass,
    title: 'Tell us the goal',
    body: 'Budget, timeline, and whether you are chasing yield, capital growth or a home to live in.',
  },
  {
    icon: ListChecks,
    title: 'Get a curated shortlist',
    body: 'We hand-pick below-market off-plan launches and resales that fit — real numbers, zero spam.',
  },
  {
    icon: ShieldCheck,
    title: 'Verify & view',
    body: 'RERA checks, true price history and ownership — toured in person or live on video, your call.',
  },
  {
    icon: KeyRound,
    title: 'Secure the keys',
    body: 'We negotiate, handle the paperwork and walk you to handover. Zero brokerage on off-plan.',
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto mt-8 max-w-[1600px] px-4 sm:mt-10 sm:px-6 md:mt-14 md:px-12">
      <div className="relative overflow-hidden rounded-3xl bg-[#FAF7F3] px-6 py-10 ring-1 ring-[rgba(10,10,18,0.06)] sm:px-10 sm:py-12 lg:px-14">
        <Reveal className="mb-10 max-w-2xl sm:mb-12">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
            How it works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] md:text-4xl font-[family-name:var(--font-heading)]">
            From &ldquo;just looking&rdquo; to keys in hand.
          </h2>
          <p className="mt-3 leading-relaxed text-[#55555E]">
            Four clear steps. No pressure, no jargon — just an advisor who knows where the value is hiding.
          </p>
        </Reveal>

        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* the connecting path */}
          <span
            aria-hidden="true"
            className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-[#80603f]/40 via-[#80603f]/25 to-transparent md:left-0 md:right-0 md:top-[27px] md:bottom-auto md:h-px md:w-auto md:bg-gradient-to-r"
          />

          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} as="li" delay={i * 110} className="relative flex gap-5 md:block">
              {/* node */}
              <div className="relative z-10 flex shrink-0 flex-col items-center md:items-start">
                <span className="group grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#80603f] shadow-[0_10px_30px_-14px_rgba(128,96,63,0.6)] ring-1 ring-[rgba(128,96,63,0.18)] transition-colors">
                  <Icon size={22} />
                </span>
              </div>

              <div className="md:mt-5">
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#80603f]">
                  Step {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1.5 text-[19px] font-bold leading-tight tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#55555E]">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
