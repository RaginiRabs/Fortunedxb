// prototype5 Projects page — content only; shared layout adds navbar + footer. Mock only.
import {
  MapPin, TrendingUp, ArrowRight, Building2, Wallet, Users, CreditCard, Headset,
  ClipboardList, ListChecks, Handshake, MessageCircle,
} from 'lucide-react';
import Dirham from '@/components/prototype5/Dirham';
import Reveal from '@/components/prototype5/Reveal';
import PageHero from '@/components/prototype5/PageHero';
import ProjectsBrowser from '@/components/prototype5/ProjectsBrowser';

export const metadata = { title: 'Projects — Fortune Realty L.L.C' };

const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const STATS = [
  { icon: Building2, value: '500+', label: 'Projects Listed' },
  { icon: Users, value: '100+', label: 'Developers' },
  { icon: MapPin, value: '50+', label: 'Communities' },
  { icon: Wallet, value: 'AED 500K+', label: 'Starting Price' },
];

const FEATURED = [
  { name: 'Sobha One', area: 'Business Bay', price: '1.2M', roi: '6.2%', img: img('1580674684081-7617fbf3d745') },
  { name: 'Palm Beach Towers', area: 'Palm Jumeirah', price: '2.8M', roi: '7.1%', img: img('1489516408517-0c0a15662682') },
  { name: 'Dubai Creek Harbour', area: 'Dubai Creek Harbour', price: '1.6M', roi: '7.1%', img: img('1512453979798-5ea266f8880c') },
  { name: 'Ellington Ocean House', area: 'Palm Jumeirah', price: '5.4M', roi: '6.3%', img: img('1546412414-e1885259563a') },
];

const PERKS = [
  { icon: MapPin, title: 'Prime Locations', text: "Carefully selected projects in Dubai's most desirable areas." },
  { icon: TrendingUp, title: 'High ROI Potential', text: 'Projects with strong rental yields and capital appreciation.' },
  { icon: CreditCard, title: 'Flexible Payment Plans', text: 'Attractive payment plans from top developers.' },
  { icon: Headset, title: 'Expert Guidance', text: 'End-to-end support from our property experts.' },
];

const COMMUNITIES = [
  { name: 'Dubai Marina', img: img('1528702748617-c64d49f918af', 400) },
  { name: 'Downtown Dubai', img: img('1512453979798-5ea266f8880c', 400) },
  { name: 'Business Bay', img: img('1582672060674-bc2bd808a8b5', 400) },
  { name: 'Dubai Hills Estate', img: img('1518684079-3c830dcef090', 400) },
  { name: 'Palm Jumeirah', img: img('1489516408517-0c0a15662682', 400) },
  { name: 'Jumeirah Village Circle', img: img('1526495124232-a04e1849168c', 400) },
];

const PROCESS = [
  { icon: ClipboardList, title: 'Tell Us Your Needs', text: 'Share your requirements with our experts.' },
  { icon: ListChecks, title: 'Get Best Options', text: 'We shortlist the best projects tailored for you.' },
  { icon: MapPin, title: 'Visit & Decide', text: 'Visit properties and choose what fits you best.' },
  { icon: Handshake, title: 'We Handle Rest', text: 'From paperwork to handover, we handle everything.' },
];


export default function ProjectsPage() {
  return (
    <div className="bg-[#faf8f3]">
      {/* ===== Hero ===== */}
      <PageHero
        eyebrow="Our Projects"
        title={<>Discover Exceptional<br />Projects in</>}
        highlight="Dubai"
        sub="Explore our handpicked collection of the finest real estate projects across Dubai. From iconic locations to unmatched amenities, find the perfect investment for your future."
        stats={STATS}
        image="/images/projects-hero.png"
      />

      {/* ===== All Projects + filters (functional) ===== */}
      <ProjectsBrowser />

      {/* ===== Featured (below all projects) ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Featured Projects</p>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#80603f] hover:underline">View All Projects <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="group relative h-64 overflow-hidden rounded-2xl shadow-[0_14px_40px_-16px_rgba(20,18,15,0.3)]">
              <img src={p.img} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <h3 className="text-[15px] font-semibold">{p.name}</h3>
                <p className="text-[11px] text-white/70">{p.area}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[12px] font-medium">Starting from <Dirham className="mx-0.5" />{p.price}</span>
                  <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold">ROI {p.roi}</span>
                </div>
                <a href="/prototype5/project/one-by-nine" className="mt-3 inline-flex rounded-md bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-4 py-1.5 text-[12px] font-medium">View Details</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Perks strip ===== */}
      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
          {PERKS.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#80603f]/10 text-[#80603f]"><p.icon className="h-5 w-5" /></span>
              <div><h3 className="text-[14px] font-semibold text-[#1a1a1a]">{p.title}</h3><p className="mt-0.5 text-[12px] leading-snug text-gray-500">{p.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Popular Communities ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Popular Communities</p>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#80603f] hover:underline">View All Communities <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {COMMUNITIES.map((c) => (
              <a key={c.name} href="#" className="group relative aspect-[3/4] overflow-hidden rounded-xl shadow-[0_10px_28px_-14px_rgba(20,18,15,0.25)]">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute inset-x-2 bottom-2 text-[11px] font-semibold leading-tight text-white">{c.name}</span>
              </a>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[#0a1320] p-6 text-white">
            <h3 className="text-lg font-semibold">Looking for something specific?</h3>
            <p className="mt-2 text-[13px] text-gray-400">Our property experts are here to help you find the perfect property.</p>
            <a href="/prototype5/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-5 py-2.5 text-sm font-medium text-white">
              <MessageCircle className="h-4 w-4" /> Talk to an Expert
            </a>
          </div>
        </div>
      </section>

      {/* ===== Process ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Our Simple Process</p>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} className="flex items-start gap-3">
              <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#80603f]/30 text-[#80603f]">
                <s.icon className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#80603f] text-[10px] font-bold text-white">{i + 1}</span>
              </span>
              <div><h3 className="text-[14px] font-semibold text-[#1a1a1a]">{i + 1}. {s.title}</h3><p className="mt-0.5 text-[12px] leading-snug text-gray-500">{s.text}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

    </div>
  );
}
