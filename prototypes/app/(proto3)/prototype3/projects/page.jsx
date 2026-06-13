import SearchCards from '@/components/prototype3/SearchCards';
import Reveal from '@/components/prototype3/Reveal';
import Footer from '@/components/prototype3/Footer';
import SideCta from '@/components/prototype3/SideCta';
import FAQ from '@/components/prototype3/project/FAQ';
import { projects } from '@/mock/prototype3/projects';

export const metadata = { title: 'Projects — Fortune' };

const FAQS = [
  { q: 'What is the difference between off-plan and resale?', a: 'Off-plan is bought from the developer before completion — today\'s price with a flexible payment plan. Resale is a ready, titled unit you can move into or rent immediately.' },
  { q: 'Do I pay any brokerage?', a: 'No brokerage on off-plan launches — you buy at the developer\'s list price. Resale transactions carry the standard agency fee, always disclosed up front.' },
  { q: 'Can foreigners buy these properties?', a: 'Yes. Every listing sits in a designated freehold zone, so international buyers get full ownership of the unit.' },
  { q: 'How are the listings verified?', a: 'Off-plan projects are RERA-registered developers only; resales are ownership- and title-verified before they go live. No phantom inventory.' },
];

export default function ProjectsPage() {
  const areas = new Set(projects.map((p) => p.area)).size;
  const developers = new Set(projects.map((p) => p.developer)).size;
  const avgYield = (projects.reduce((s, p) => s + parseFloat(p.yield), 0) / projects.length).toFixed(1);

  const STATS = [
    [`${projects.length}`, 'Live listings'],
    [`${areas}`, 'Communities'],
    [`${developers}`, 'Developers'],
    [`${avgYield}%`, 'Avg. yield'],
  ];

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
        {/* Insight strip */}
        <Reveal className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[rgba(10,10,18,0.08)] bg-[rgba(10,10,18,0.08)] sm:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="bg-[#FAF7F3] px-4 py-4 sm:px-5">
              <div className="text-2xl font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">{v}</div>
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">{l}</div>
            </div>
          ))}
        </Reveal>

        <SearchCards projects={projects} />
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
