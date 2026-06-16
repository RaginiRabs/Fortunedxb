// prototype5 home page — Fortune Realty LLC landing. Multi-page site: home preview sections. Mock only.
import Hero from '@/components/prototype5/Hero';
import Partners from '@/components/prototype5/Partners';
import Communities from '@/components/prototype5/Communities';
import FeaturedProjects from '@/components/prototype5/FeaturedProjects';
import DistressDeals from '@/components/prototype5/DistressDeals';
import ResaleProperties from '@/components/prototype5/ResaleProperties';
import Testimonials from '@/components/prototype5/Testimonials';
import Reveal from '@/components/prototype5/Reveal';

function Band({ children, tint = false, blob }) {
  return (
    <section className={`relative overflow-hidden ${tint ? 'bg-gradient-to-b from-[#faf6ef] to-white' : 'bg-white'}`}>
      {blob && <div className={`pointer-events-none absolute h-80 w-80 rounded-full bg-[#80603f]/10 blur-3xl ${blob}`} />}
      <Reveal className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8">{children}</Reveal>
    </section>
  );
}

export default function Prototype1Home() {
  return (
    <div className="bg-white">
      {/* Hero — kept as-is */}
      <Hero />
      <Partners />

      <Band blob="-left-32 top-10"><Communities /></Band>
      <Band tint blob="-right-40 top-0"><FeaturedProjects /></Band>
      <Band><DistressDeals /></Band>
      <Band tint blob="-left-32 top-10"><ResaleProperties /></Band>

      <Reveal><Testimonials /></Reveal>
    </div>
  );
}
