import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';
import Reveal from '@/components/prototype3/Reveal';
import Footer from '@/components/prototype3/Footer';
import CtaBand from '@/components/prototype3/CtaBand';

export const metadata = { title: 'Developers — Fortune' };

const DEVELOPERS = [
  { name: 'Emaar', logo: 'EM', tag: 'Downtown & Marina master-developer', projects: 38, rating: 4.9, since: 1997 },
  { name: 'Sobha Realty', logo: 'SR', tag: 'Premium waterfront communities', projects: 21, rating: 4.8, since: 1976 },
  { name: 'Meraas', logo: 'ME', tag: 'Lifestyle & beachfront living', projects: 17, rating: 4.7, since: 2007 },
  { name: 'DAMAC', logo: 'DM', tag: 'Branded luxury residences', projects: 33, rating: 4.6, since: 2002 },
  { name: 'Select Group', logo: 'SG', tag: 'Marina high-rise specialists', projects: 14, rating: 4.7, since: 2002 },
  { name: 'Nakheel', logo: 'NK', tag: 'Palm & island developments', projects: 19, rating: 4.6, since: 2000 },
  { name: 'Omniyat', logo: 'OM', tag: 'Architectural icons', projects: 11, rating: 4.8, since: 2005 },
  { name: 'Ellington', logo: 'EL', tag: 'Design-led boutique homes', projects: 16, rating: 4.8, since: 2014 },
  { name: 'Binghatti', logo: 'BG', tag: 'Fast-delivery hyper-design', projects: 24, rating: 4.5, since: 2008 },
];

export default function DevelopersPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Trusted builders</span>
          <h1 className="text-4xl font-bold tracking-tight text-[#0A0A12] sm:text-5xl font-[family-name:var(--font-heading)]">Developers</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#55555E]">
            We partner only with Dubai&apos;s most established, RERA-registered developers — the names behind the city&apos;s landmark communities.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEVELOPERS.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 80}>
              <Link
                href={`/prototype3/projects?developer=${encodeURIComponent(d.name)}`}
                className="group flex h-full flex-col rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-6 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(10,10,18,0.28)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0A0A12] text-lg font-bold text-white font-[family-name:var(--font-heading)]">
                    {d.logo}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#C49A3C]/12 px-2.5 py-1 text-xs font-bold text-[#9A7625]">
                    <Star size={12} className="fill-[#C49A3C] text-[#C49A3C]" /> {d.rating}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-[#0A0A12] transition-colors group-hover:text-[#80603f] font-[family-name:var(--font-heading)]">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm text-[#55555E]">{d.tag}</p>

                <div className="mt-5 flex items-center justify-between border-t border-[rgba(10,10,18,0.08)] pt-4">
                  <div className="flex gap-6">
                    <div>
                      <div className="text-base font-bold text-[#0A0A12] font-[family-name:var(--font-heading)]">{d.projects}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9A9AA3]">Projects</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-[#0A0A12] font-[family-name:var(--font-heading)]">{d.since}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9A9AA3]">Since</div>
                    </div>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(10,10,18,0.14)] text-[#0A0A12] transition-all group-hover:border-transparent group-hover:bg-[#C49A3C]">
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
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
