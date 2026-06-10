import Link from 'next/link';
import { Building2, MapPin } from 'lucide-react';
import { projects } from '@/mock/prototype4/projects';

export const metadata = { title: 'Developers — Fortune Realty' };

const BLURB = {
  Emaar: 'Dubai’s flagship master developer behind Downtown Dubai, Dubai Marina and Burj Khalifa.',
  Nakheel: 'Creator of Palm Jumeirah and iconic waterfront communities across the emirate.',
  DAMAC: 'Luxury developer known for branded residences and premium golf communities.',
};

function buildDevelopers() {
  const map = new Map();
  for (const p of projects) {
    const d = map.get(p.developer) || { name: p.developer, projects: [], areas: new Set() };
    d.projects.push(p);
    d.areas.add(p.area);
    map.set(p.developer, d);
  }
  return [...map.values()];
}

export default function DevelopersPage() {
  const developers = buildDevelopers();

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-14">
      <header className="max-w-2xl">
        <span className="block text-[12px] font-black tracking-[0.2em] text-[#80603f] mb-2">03 —</span>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
          Developers
        </h1>
        <p className="mt-3 text-[#574e44] leading-relaxed">
          The trusted names shaping Dubai&apos;s skyline. Explore active off-plan inventory from each developer.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {developers.map((d) => {
          const minPrice = Math.min(...d.projects.map((p) => p.priceFrom));
          return (
            <article key={d.name} className="bg-white border border-[#e8e2da] p-7 shadow-sm hover:shadow-md hover:border-[#947049] transition-all">
              <div className="h-14 w-14 rounded-xl bg-[#80603f] flex items-center justify-center text-white font-bold text-lg font-[family-name:var(--font-heading)]">
                {d.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-4 text-2xl font-semibold font-[family-name:var(--font-heading)] text-[#2a2520]">{d.name}</h3>
              <p className="mt-2 text-sm text-[#574e44] leading-relaxed">{BLURB[d.name]}</p>

              <div className="mt-5 pt-5 border-t border-[#e8e2da] flex items-center gap-5 text-sm">
                <span className="flex items-center gap-1.5 text-[#574e44]">
                  <Building2 size={15} className="text-[#80603f]" /> {d.projects.length} project{d.projects.length > 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1.5 text-[#574e44]">
                  <MapPin size={15} className="text-[#80603f]" /> {d.areas.size} area{d.areas.size > 1 ? 's' : ''}
                </span>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#675c4e]">From</p>
              <p className="text-xl font-bold tabular-nums text-[#6a4b2e]">AED {minPrice.toLocaleString()}</p>

              <Link
                href="/prototype4/projects"
                className="mt-5 inline-flex w-full items-center justify-center border border-[#e8e2da] text-sm font-semibold text-[#6a4b2e] hover:border-[#947049] hover:bg-[#faf7f3] py-2.5 rounded-lg transition-colors"
              >
                View Projects
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
