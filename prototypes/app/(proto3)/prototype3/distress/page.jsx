import SearchCards from '@/components/prototype3/SearchCards';
import Reveal from '@/components/prototype3/Reveal';
import Footer from '@/components/prototype3/Footer';
import SideCta from '@/components/prototype3/SideCta';
import FAQ from '@/components/prototype3/project/FAQ';
import { projects } from '@/mock/prototype3/projects';

export const metadata = { title: 'Distress Deals — Fortune' };

const FAQS = [
  { q: 'What is a distress (below-market) deal?', a: 'A resale where a motivated owner needs a quick exit and prices below current market value — so you buy an already-built, titled unit at a discount.' },
  { q: 'Why is it priced below market?', a: 'Usually liquidity-driven: relocation, portfolio rebalancing or a deadline. The discount reflects speed of sale, not a problem with the property.' },
  { q: 'Are these deals verified?', a: 'Yes — 100% RERA-verified ownership with ready titles before a deal goes live. We confirm the market comparable so the discount is real.' },
  { q: 'How fast can I close?', a: 'Ready-title resales typically transfer in days, not months. Our average distress deal closes in around 48 hours once terms are agreed.' },
];

export default function DistressPage() {
  const deals = projects.filter((p) => p.type === 'distress');

  const maxDiscount = Math.max(...deals.map((d) => d.discount || 0));
  const avgYield = (deals.reduce((s, p) => s + parseFloat(p.yield), 0) / deals.length).toFixed(1);
  const avgSaveK = Math.round(deals.reduce((s, p) => s + (p.marketPrice - p.priceFrom), 0) / deals.length / 1000);

  const STATS = [
    [`${deals.length}`, 'Live deals'],
    [`Up to ${maxDiscount}%`, 'Below market'],
    [`${avgYield}%`, 'Avg. yield'],
    [`AED ${avgSaveK}K`, 'Avg. you save'],
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
        {/* Insight strip — red accent for urgency */}
        <Reveal className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[rgba(10,10,18,0.08)] bg-[rgba(10,10,18,0.08)] sm:grid-cols-4">
          {STATS.map(([v, l], i) => (
            <div key={l} className="bg-[#FAF7F3] px-4 py-4 sm:px-5">
              <div className={`text-2xl font-bold tracking-tight font-[family-name:var(--font-heading)] ${i === 1 ? 'text-[#C83C3C]' : 'text-[#0A0A12]'}`}>{v}</div>
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">{l}</div>
            </div>
          ))}
        </Reveal>

        <SearchCards projects={deals} placeholder="Search distress deals…" />
      </section>

      {/* FAQ + advisor CTA, side by side */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
          <FAQ faq={FAQS} />
          <Reveal><SideCta /></Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
