// prototype1 About Us (v2) — content only; shared layout adds navbar + footer. Mock only.
import {
  Building2, Users, Handshake, MapPin, Target, Eye, BarChart3, ShieldCheck, Headset,
  Home, Repeat, BadgePercent, TrendingUp, KeyRound, ChevronRight, ArrowRight, Flag,
} from 'lucide-react';
import Reveal from '@/components/prototype1/Reveal';
import CountUp from '@/components/prototype1/CountUp';
import PartnerGrid from '@/components/prototype1/PartnerGrid';

export const metadata = { title: 'About Us — Fortune Realty L.L.C' };

const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const TIMELINE = [
  { icon: Flag, year: '2020', label: 'Company Founded' },
  { icon: Home, year: '2022', label: '100+ Properties Sold' },
  { icon: MapPin, year: '2024', label: 'Expanded Across Dubai' },
  { icon: Building2, year: '2026', label: '500+ Projects Listed' },
];

const STATS = [
  { icon: Building2, value: '500+', label: 'Projects Listed' },
  { icon: Users, value: '100+', label: 'Developers Partnered' },
  { icon: MapPin, value: '50+', label: 'Communities Covered' },
  { icon: Handshake, value: '5000+', label: 'Happy Clients' },
];

const WHY = [
  { icon: BarChart3, title: 'Market Expertise', text: 'In-depth knowledge of Dubai’s dynamic real estate market ensures you get the best opportunities.' },
  { icon: ShieldCheck, title: 'Transparency', text: 'We believe in honest communication and complete transparency in every transaction.' },
  { icon: Users, title: 'Client-Centric Approach', text: 'Your goals are our priority. We provide tailored solutions that fit your needs.' },
  { icon: Headset, title: 'End-to-End Support', text: 'From property search to handover and after-sales support, we are with you at every step.' },
];

const SERVICES = [
  { icon: Building2, label: 'Off Plan Properties' },
  { icon: Home, label: 'Ready Properties' },
  { icon: BadgePercent, label: 'Distress Deals' },
  { icon: TrendingUp, label: 'Investment Advisory' },
  { icon: KeyRound, label: 'Property Management' },
];

const TEAM = [
  { name: 'Muhammad Arsalan', role: 'Founder & CEO', img: img('1500648767791-00dcc994a43e', 500) },
  { name: 'Sana Khan', role: 'Sales Director', img: img('1494790108377-be9c29b29330', 500) },
  { name: 'Usman Ali', role: 'Property Consultant', img: img('1507003211169-0a1dd7228f2d', 500) },
  { name: 'Ayesha Malik', role: 'Client Relationship Manager', img: img('1438761681033-6461ffad8d80', 500) },
];

const TESTIMONIALS = [
  { quote: 'Fortune Realty helped me find the perfect investment property. Their team is professional, transparent and always available.', name: 'Ahmed R.' },
  { quote: 'Excellent service from start to finish. They understood my requirements and delivered beyond my expectations.', name: 'Fatima S.' },
  { quote: 'Highly recommended! Fortune Realty made the entire buying process smooth and hassle-free.', name: 'James T.' },
];

const GOLD_BTN = 'inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105';

export default function About2Page() {
  return (
    <div className="bg-[#faf8f3]">
      {/* ===== Hero ===== */}
      <section className="relative -mt-[88px] overflow-hidden">
        <img src={img('1512453979798-5ea266f8880c', 1800)} alt="Dubai skyline" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320]/95 via-[#0a1320]/75 to-[#0a1320]/25" />
        <Reveal className="relative mx-auto max-w-[1400px] px-4 pb-24 pt-[150px] md:px-8 md:pb-32">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a98f]">About Us</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Building Trust.<br />Delivering Value.<br /><span className="text-[#c4a98f]">Creating Futures.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-gray-300">
            Fortune Realty LLC is a RERA registered real estate brokerage firm in Dubai, committed to delivering
            exceptional property solutions with transparency, integrity and results.
          </p>
          <a href="#story" className={`mt-7 ${GOLD_BTN}`}>Get to Know Us <ArrowRight className="h-4 w-4" /></a>
        </Reveal>
      </section>

      {/* ===== Our Story ===== */}
      <section id="story" className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Story</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-[#1a1a1a]">A Journey Built on Trust &amp; Excellence</h2>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-gray-500">
              Fortune Realty LLC was founded with a simple belief that real estate is not just about properties,
              it&apos;s about people and their aspirations. Over the years, we have grown into one of Dubai&apos;s
              most trusted real estate advisory firms.
            </p>

            {/* timeline */}
            <div className="mt-8 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
              {TIMELINE.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.1} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#80603f]/10 text-[#80603f]"><t.icon className="h-5 w-5" /></span>
                  <span className="mt-3 text-lg font-bold text-[#1a1a1a]">{t.year}</span>
                  <span className="text-[11px] text-gray-400">{t.label}</span>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} y={36} className="overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(20,18,15,0.35)]">
            <img src={img('1497366811353-6870744d04b2', 1100)} alt="Fortune Realty office" className="h-[440px] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* ===== Stats band ===== */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-2 gap-y-8 rounded-2xl bg-[#0a1320] px-6 py-10 text-center text-white lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="relative px-2 lg:border-r lg:border-white/10 lg:last:border-0">
              <s.icon className="mx-auto h-7 w-7 text-[#c4a98f]" strokeWidth={1.6} />
              <div className="mt-3 text-3xl font-bold"><CountUp end={parseInt(s.value, 10)} suffix={s.value.replace(/[\d,]/g, '')} /></div>
              <div className="mt-1 text-[12px] text-gray-400">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Mission / Vision ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
          <Reveal className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_14px_40px_-18px_rgba(20,18,15,0.2)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Mission</p>
            <h3 className="mt-2 text-xl font-semibold text-[#1a1a1a]">To Deliver Exceptional Real Estate Experiences</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
              We aim to provide our clients with the best real estate opportunities through expert advice, market
              insights and personalized service.
            </p>
            <span className="mt-6 inline-grid h-10 w-10 place-items-center rounded-full bg-[#0a1320] pt-0 text-[#c4a98f]"><Target className="h-5 w-5" /></span>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-2xl shadow-[0_18px_50px_-20px_rgba(20,18,15,0.35)]">
            <img src={img('1526495124232-a04e1849168c', 1000)} alt="Dubai skyline" className="h-72 w-full object-cover lg:h-[360px]" />
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_14px_40px_-18px_rgba(20,18,15,0.2)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Vision</p>
            <h3 className="mt-2 text-xl font-semibold text-[#1a1a1a]">To Be Dubai&apos;s Most Trusted Real Estate Partner</h3>
            <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
              We envision a future where every client achieves their real estate goals with confidence and peace
              of mind.
            </p>
            <span className="mt-6 inline-grid h-10 w-10 place-items-center rounded-full bg-[#0a1320] text-[#c4a98f]"><Eye className="h-5 w-5" /></span>
          </Reveal>
        </div>
      </section>

      {/* ===== Why Choose ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Why Choose Fortune Realty</p>
          <span className="mx-auto mt-3 block h-px w-24 bg-gradient-to-r from-transparent via-[#80603f] to-transparent" />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.1} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(128,96,63,0.3)]">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#96714a] to-[#6b4f33] text-white"><w.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-[15px] font-semibold text-[#1a1a1a]">{w.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">{w.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Services + Partners ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Services</p>
            <ul className="mt-5 space-y-2">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <a href="#" className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm transition-all hover:border-[#80603f]/30 hover:text-[#80603f]">
                    <span className="inline-flex items-center gap-3"><s.icon className="h-4 w-4 text-[#80603f]" /> {s.label}</span>
                    <ChevronRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#80603f]" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Trusted Partners</p>
            <div className="mt-5"><PartnerGrid /></div>
          </Reveal>
        </div>
      </section>

      {/* ===== Team ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Team</p>
        <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(128,96,63,0.3)]">
              <div className="h-56 overflow-hidden">
                <img src={t.img} alt={t.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{t.name}</h3>
                <p className="text-xs text-[#80603f]">{t.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
