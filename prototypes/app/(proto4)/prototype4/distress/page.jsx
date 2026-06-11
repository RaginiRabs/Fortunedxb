import { projects } from '@/mock/prototype4/projects';
import Card from '@/components/prototype4/Card';

export const metadata = { title: 'Distress Deals — Fortune Realty' };

// Mock: frame a subset of projects as below-market distress resales.
const DISCOUNTS = { 1: 18, 3: 12, 4: 22 };

export default function DistressPage() {
  const deals = projects.filter((p) => DISCOUNTS[p.id]);

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-14">
      <header className="max-w-2xl">
        <span className="block text-[12px] font-black tracking-[0.2em] text-[#80603f] mb-2">02 —</span>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
          Distress Deals
        </h1>
        <p className="mt-3 text-[#574e44] leading-relaxed">
          Motivated-seller resales priced below current market value. Limited inventory, fast-moving — register your interest early.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((p) => (
          <Card key={p.id} project={p} variant="distress" discount={DISCOUNTS[p.id]} />
        ))}
      </div>
    </section>
  );
}
