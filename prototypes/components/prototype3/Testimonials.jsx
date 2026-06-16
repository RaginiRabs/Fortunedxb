import { Quote, BadgeCheck, Star, TrendingUp } from 'lucide-react';
import Reveal from '@/components/prototype3/Reveal';

// Testimonials, reframed as a "results wall". Most property sites paste three
// floating quotes; here every story is pinned to a hard, verified outcome
// (ROI, yield, days-to-close) in an asymmetric bento — proof, not praise.
const FEATURE = {
  name: 'Aisha Rahman',
  role: 'Investor · London',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  quote:
    'They steered me away from the obvious tower and into a below-market resale two streets over. Same view, 18% less — and it has already re-rated.',
  metric: '+22%',
  metricLabel: 'Value in 24 months',
  context: '2-Bed · Dubai Marina',
};

const WALL = [
  {
    name: 'Daniel Okafor',
    role: 'First home · Dubai',
    quote: 'No pressure, no spam. Just three real options that actually fit my budget.',
    metric: '9 days',
    metricLabel: 'Offer to keys',
    context: 'Studio · JVC',
  },
  {
    name: 'Priya Nair',
    role: 'Investor · Singapore',
    quote: 'The yield numbers were honest — and they held up once tenants moved in.',
    metric: '7.4%',
    metricLabel: 'Net rental yield',
    context: '1-Bed · Business Bay',
  },
  {
    name: 'Mohammed Al Suwaidi',
    role: 'End-user · Abu Dhabi',
    quote: 'Handled the paperwork and handover end to end. I barely lifted a finger.',
    metric: 'AED 0',
    metricLabel: 'Brokerage paid',
    context: '3-Bed · Dubai Hills',
  },
  {
    name: 'Elena Petrova',
    role: 'Investor · Dubai',
    quote: 'They flagged a motivated seller before it ever hit the portals.',
    metric: '17%',
    metricLabel: 'Below market',
    context: '2-Bed · Downtown',
  },
];

function MetricChip({ value, label }) {
  return (
    <div className="flex items-center gap-2">
      <TrendingUp size={16} className="shrink-0 text-[#80603f]" />
      <p className="text-[15px] font-bold tracking-tight text-[#80603f] font-[family-name:var(--font-heading)]">
        {value}
        <span className="ml-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9AA3]">{label}</span>
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto mt-8 max-w-[1600px] px-4 sm:mt-10 sm:px-6 md:mt-14 md:px-12">
      <Reveal className="mb-7 flex flex-wrap items-end justify-between gap-5 sm:mb-8">
        <div className="max-w-xl">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
            Proof, not promises
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] md:text-4xl font-[family-name:var(--font-heading)]">
            Results our clients can count.
          </h2>
        </div>
        {/* aggregate trust strip */}
        <div className="flex items-center gap-6">
          {[
            ['4.9', 'Google rating', true],
            ['600+', 'Families placed', false],
            ['AED 4B+', 'Property advised', false],
          ].map(([v, l, star]) => (
            <div key={l}>
              <p className="flex items-center gap-1 text-xl font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">
                {star && <Star size={15} className="fill-[#80603f] text-[#80603f]" />}
                {v}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#7A7A85]">{l}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 lg:auto-rows-fr lg:grid-cols-4">
        {/* Feature story — photo + big outcome */}
        <Reveal className="lg:col-span-2 lg:row-span-2">
          <article className="group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-black/5">
            <img
              src={FEATURE.image}
              alt={FEATURE.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-[#0A0A12]/55 to-[#0A0A12]/10" />

            {/* big outcome, top-right */}
            <div className="absolute right-5 top-5 rounded-2xl bg-white/12 px-4 py-3 text-right ring-1 ring-white/20 backdrop-blur-md">
              <p className="text-[30px] font-bold leading-none text-[#E0C3A0] font-[family-name:var(--font-heading)]">
                {FEATURE.metric}
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/75">{FEATURE.metricLabel}</p>
            </div>

            <div className="relative p-6 text-white sm:p-8">
              <Quote size={30} className="text-[#E0C3A0]" />
              <p className="mt-3 max-w-md text-[18px] font-medium leading-relaxed sm:text-[21px] font-[family-name:var(--font-heading)]">
                {FEATURE.quote}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div>
                  <p className="flex items-center gap-1.5 text-[15px] font-bold">
                    {FEATURE.name}
                    <BadgeCheck size={15} className="text-[#E0C3A0]" />
                  </p>
                  <p className="text-[12px] text-white/65">
                    {FEATURE.role} · {FEATURE.context}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Wall — short proof cards */}
        {WALL.map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <article className="flex h-full flex-col rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-5 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)] transition-shadow duration-500 hover:shadow-[0_18px_40px_-24px_rgba(10,10,18,0.28)]">
              <Quote size={22} className="text-[#80603f]/35" />
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-[#2A2A32]">{t.quote}</p>

              <div className="mt-4 border-t border-[rgba(10,10,18,0.08)] pt-3.5">
                <MetricChip value={t.metric} label={t.metricLabel} />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="flex items-center gap-1.5 text-[13px] font-bold text-[#0A0A12]">
                      {t.name}
                      <BadgeCheck size={13} className="text-[#80603f]" />
                    </p>
                    <p className="text-[11px] text-[#7A7A85]">{t.role}</p>
                  </div>
                  <span className="rounded-full bg-[#FAF7F3] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#80603f]">
                    {t.context}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
