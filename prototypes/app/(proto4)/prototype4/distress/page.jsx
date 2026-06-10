import Link from 'next/link';
import { projects } from '@/mock/prototype4/projects';

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
        {deals.map((p) => {
          const off = DISCOUNTS[p.id];
          const market = Math.round((p.priceFrom / (1 - off / 100)) / 1000) * 1000;
          return (
            <article
              key={p.id}
              className="relative bg-white border border-[#e8e2da] p-7 shadow-sm hover:shadow-md hover:border-[#947049] transition-all"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-[#80603f]/12 text-[#6a4b2e] text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1">
                  {off}% below market
                </span>
                <span className="text-xs text-[#2a2520]/40">#{String(p.id).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-6 text-3xl font-semibold leading-none font-[family-name:var(--font-heading)]">
                <Link href={`/prototype4/${p.id}`} className="hover:text-[#80603f] transition-colors">
                  {p.name}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-[#2a2520]/60">{p.developer} / {p.area}</p>
              <div className="mt-6">
                <p className="text-sm line-through text-[#2a2520]/40 tabular-nums">AED {market.toLocaleString()}</p>
                <p className="text-2xl font-bold tabular-nums text-[#6a4b2e]">AED {p.priceFrom.toLocaleString()}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
