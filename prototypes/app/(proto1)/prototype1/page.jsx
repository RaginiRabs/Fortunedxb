// prototype1 home page — Fortune Realty LLC landing. Mock data only.
import Hero from '@/components/prototype1/Hero';
import Partners from '@/components/prototype1/Partners';
import TopDevelopers from '@/components/prototype1/TopDevelopers';
import TopCommunities from '@/components/prototype1/TopCommunities';
import FeaturedProjects from '@/components/prototype1/FeaturedProjects';
import MarketInsights from '@/components/prototype1/MarketInsights';
import Testimonials from '@/components/prototype1/Testimonials';
import FeatureStrip from '@/components/prototype1/FeatureStrip';
import Reveal from '@/components/prototype1/Reveal';

export default function Prototype1Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Partners />

      {/* Developers + Communities — soft cream band */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#faf6ef]">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#B89149]/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-[1400px] px-4 py-14 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <TopDevelopers />
            <TopCommunities />
          </div>
        </Reveal>
      </section>

      {/* Featured projects + Market insights — warm tinted band */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf6ef] to-white">
        <div className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-[#B89149]/10 blur-3xl" />
        <Reveal className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
            <FeaturedProjects />
            <MarketInsights />
          </div>
        </Reveal>
      </section>

      <Reveal><Testimonials /></Reveal>
      <Reveal><FeatureStrip /></Reveal>
    </div>
  );
}
