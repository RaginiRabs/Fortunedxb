import Footer from '@/components/prototype3/Footer';
import Reveal from '@/components/prototype3/Reveal';
import HeroSearch from '@/components/prototype3/HeroSearch';
import FeaturedShowcase from '@/components/prototype3/FeaturedShowcase';
import HowItWorks from '@/components/prototype3/HowItWorks';
import DevelopersShowcase from '@/components/prototype3/DevelopersShowcase';
import DistressBand from '@/components/prototype3/DistressBand';
import ResaleBand from '@/components/prototype3/ResaleBand';
import ExploreLocation from '@/components/prototype3/ExploreLocation';
import PaymentCalculator from '@/components/prototype3/PaymentCalculator';
import Testimonials from '@/components/prototype3/Testimonials';
import CtaBand from '@/components/prototype3/CtaBand';
import { projects } from '@/mock/prototype3/projects';
import { featured } from '@/mock/prototype3/featured';

export const metadata = { title: 'Fortune — Dubai Off-Plan & Resale' };

export default function Prototype3Home() {
  const distress = projects.filter((p) => p.type === 'distress').slice(0, 4);
  const resale = featured.filter((p) => p.type === 'resale').slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1600px] px-4 pt-6 sm:px-6 sm:pt-8 md:px-12">
        <HeroSearch />
      </section>

      {/* Featured — spotlight + grid (not a carousel) */}
      <FeaturedShowcase projects={featured} />

      {/* How it works — the path from looking to keys */}
      <HowItWorks />

      {/* Distress */}
      <Reveal className="mt-8 sm:mt-10 md:mt-14">
        <DistressBand deals={distress} />
      </Reveal>

      {/* Explore by location — interactive, no map */}
      <Reveal className="mt-8 sm:mt-10 md:mt-14">
        <ExploreLocation />
      </Reveal>

      {/* Resale */}
      <Reveal className="mt-8 sm:mt-10 md:mt-14">
        <ResaleBand deals={resale} />
      </Reveal>

      {/* Mortgage & yield calculator */}
      <Reveal className="mt-8 sm:mt-10 md:mt-14">
        <PaymentCalculator />
      </Reveal>

      {/* Developers — name, image and a short about */}
      <Reveal className="mt-8 sm:mt-10 md:mt-14">
        <DevelopersShowcase />
      </Reveal>

      {/* Social proof — results wall, right before the close */}
      <Testimonials />

      {/* Closing CTA */}
      <Reveal className="mt-8 sm:mt-10 md:mt-14">
        <CtaBand />
      </Reveal>

      {/* extra bottom space so the mobile contact bar never covers the footer */}
      <div className="mt-8 pb-20 sm:mt-10 sm:pb-0 md:mt-14">
        <Footer />
      </div>
    </div>
  );
}
