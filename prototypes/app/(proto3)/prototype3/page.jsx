import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Footer from '@/components/prototype3/Footer';
import Reveal from '@/components/prototype3/Reveal';
import HeroSearch from '@/components/prototype3/HeroSearch';
import FeaturedCarousel from '@/components/prototype3/FeaturedCarousel';
import DevelopersStrip from '@/components/prototype3/DevelopersStrip';
import DistressBand from '@/components/prototype3/DistressBand';
import MapExplorer from '@/components/prototype3/MapExplorer';
import PaymentCalculator from '@/components/prototype3/PaymentCalculator';
import CtaBand from '@/components/prototype3/CtaBand';
import { projects } from '@/mock/prototype3/projects';
import { featured } from '@/mock/prototype3/featured';

export const metadata = { title: 'Fortune — Dubai Off-Plan & Resale' };

export default function Prototype3Home() {
  const distress = projects.filter((p) => p.type === 'distress').slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1600px] px-4 pt-6 sm:px-6 sm:pt-8 md:px-12">
        <HeroSearch />
      </section>

      {/* Featured */}
      <section className="mx-auto mt-16 max-w-[1600px] px-4 sm:mt-20 sm:px-6 md:mt-28 md:px-12">
        <Reveal className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
              Featured
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] sm:text-[2.25rem] md:text-4xl font-[family-name:var(--font-heading)]">
              Properties this week
            </h2>
          </div>
          <Link
            href="/prototype3/projects"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0A0A12] outline-none transition-colors hover:text-[#80603f] focus-visible:text-[#80603f] sm:inline-flex"
          >
            View all <ArrowUpRight size={16} />
          </Link>
        </Reveal>

        <Reveal delay={90}>
          <FeaturedCarousel projects={featured} />
        </Reveal>
      </section>

      {/* Distress */}
      <Reveal className="mt-16 sm:mt-20 md:mt-28">
        <DistressBand deals={distress} />
      </Reveal>

      {/* Map + interactive explorer */}
      <Reveal className="mt-16 sm:mt-20 md:mt-28">
        <MapExplorer />
      </Reveal>

      {/* Mortgage & yield calculator */}
      <Reveal className="mt-16 sm:mt-20 md:mt-28">
        <PaymentCalculator />
      </Reveal>

      {/* Trusted developers */}
      <Reveal className="mt-16 sm:mt-20 md:mt-28">
        <DevelopersStrip />
      </Reveal>

      {/* Closing CTA */}
      <Reveal className="mt-16 sm:mt-20 md:mt-28">
        <CtaBand />
      </Reveal>

      <div className="mt-16 sm:mt-20 md:mt-28">
        <Footer />
      </div>
    </div>
  );
}
