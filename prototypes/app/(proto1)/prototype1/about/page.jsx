// prototype1 About Us page — content only; shared layout adds the navbar + footer. Mock only.
import {
  Building2, Users, Handshake, MapPin, Award, ShieldCheck, BarChart3,
  CheckCircle2, ArrowRight,
} from 'lucide-react';
import Reveal from '@/components/prototype1/Reveal';
import CountUp from '@/components/prototype1/CountUp';

export const metadata = { title: 'About Us — Fortune Realty L.L.C' };

const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const STATS = [
  { icon: Building2, value: '500+', label: 'Properties Sold' },
  { icon: Users, value: '1000+', label: 'Happy Clients' },
  { icon: Handshake, value: '100+', label: 'Developers Partnered' },
  { icon: MapPin, value: '25+', label: 'Communities Covered' },
  { icon: Award, value: '5+', label: 'Years of Excellence' },
];

const VALUES = [
  { icon: ShieldCheck, title: 'Integrity', text: 'We believe in honesty, transparency and doing what’s right for our clients.' },
  { icon: Award, title: 'Excellence', text: 'We go above and beyond to deliver exceptional service and results.' },
  { icon: Users, title: 'Client Focused', text: 'Our clients’ goals are our priority. Their success is our success.' },
  { icon: BarChart3, title: 'Market Expertise', text: 'Deep understanding of Dubai’s real estate market to guide smart investments.' },
];

const WHY = [
  'RERA Registered Brokerage Firm',
  'Expert in Off-Plan, Ready & Distress Deals',
  'End-to-End Support from Consultation to Handover',
  'Strong Network of Developers & Partners',
  'Transparent Process, No Hidden Costs',
];

const TEAM = [
  { name: 'Muhammad Arsalan', role: 'Founder & CEO', img: img('1500648767791-00dcc994a43e', 500) },
  { name: 'Sana Khan', role: 'Sales Director', img: img('1494790108377-be9c29b29330', 500) },
  { name: 'Usman Ali', role: 'Property Consultant', img: img('1507003211169-0a1dd7228f2d', 500) },
  { name: 'Ayesha Malik', role: 'Client Relationship Manager', img: img('1438761681033-6461ffad8d80', 500) },
];

function FakeQR() {
  // decorative QR placeholder (mock)
  const cells = [
    '1111111', '1000001', '1011101', '1011101', '1011101', '1000001', '1111111',
  ];
  return (
    <svg viewBox="0 0 70 70" className="h-16 w-16">
      <rect width="70" height="70" fill="#fff" />
      {cells.flatMap((row, y) =>
        row.split('').map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="10" height="10" fill="#0a1320" /> : null))
      )}
      <rect x="30" y="30" width="10" height="10" fill="#0a1320" />
      <rect x="50" y="30" width="10" height="10" fill="#0a1320" />
      <rect x="30" y="50" width="10" height="10" fill="#0a1320" />
    </svg>
  );
}

const GOLD_BTN = 'inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105';
const GHOST_BTN = 'inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ===== Hero banner ===== */}
      <section className="relative -mt-[88px] overflow-hidden">
        <img src={img('1512453979798-5ea266f8880c', 1800)} alt="Dubai skyline" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320]/95 via-[#0a1320]/80 to-[#0a1320]/30" />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-20 pt-[150px] md:px-8 md:pb-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a98f]">About Us</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            Your Trusted Real Estate Partner in <span className="text-[#c4a98f]">Dubai</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-300">
            Fortune Realty LLC is a RERA registered real estate brokerage firm in Dubai, committed to delivering
            exceptional property solutions with transparency, integrity and results.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/prototype1" className={GOLD_BTN}>Our Projects <ArrowRight className="h-4 w-4" /></a>
            <a href="#" className={GHOST_BTN}>Get in Touch <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      {/* ===== Who We Are ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Who We Are</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1a1a1a] sm:text-3xl">Building Relationships, Delivering Results</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
              At Fortune Realty LLC, we believe real estate is more than just properties — it&apos;s about people,
              trust, and long-term relationships. With deep market knowledge and a client-first approach, we help
              investors, end-users, and landlords make confident and profitable property decisions.
            </p>
            <div className="mt-7">
              <span className="block font-serif text-2xl italic text-[#80603f]">Arsalan</span>
              <span className="mt-2 block h-px w-12 bg-[#80603f]" />
              <p className="mt-2 text-sm font-semibold text-[#1a1a1a]">Muhammad Arsalan</p>
              <p className="text-xs text-gray-400">Founder &amp; CEO</p>
            </div>
          </div>
          <Reveal delay={0.15} y={36} className="overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(20,18,15,0.35)]">
            <img src={img('1497366216548-37526070297c', 1100)} alt="Fortune Realty office" className="h-72 w-full object-cover sm:h-[420px]" />
          </Reveal>
        </div>
      </section>

      {/* ===== Stats band ===== */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-2 gap-y-8 rounded-2xl bg-[#0a1320] px-4 py-10 text-center text-white sm:px-6 md:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="relative px-2 lg:border-r lg:border-white/10 lg:last:border-0">
              <s.icon className="mx-auto h-7 w-7 text-[#c4a98f]" strokeWidth={1.6} />
              <div className="mt-3 text-2xl font-bold sm:text-3xl">
                <CountUp end={parseInt(s.value, 10)} suffix={s.value.replace(/[\d,]/g, '')} />
              </div>
              <div className="mt-1 text-[12px] text-gray-400">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Our Values ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2.2fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Values</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1a1a1a] sm:text-3xl">The Principles That Drive Us</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
              We are committed to maintaining the highest standards of professionalism and ethics in every
              transaction we handle.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_22px_46px_-18px_rgba(128,96,63,0.3)]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#80603f]/10 text-[#80603f]"><v.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-[15px] font-semibold text-[#1a1a1a]">{v.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-gray-500">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Choose ===== */}
      <section className="relative overflow-hidden bg-[#0a1320] text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-16 md:px-8 lg:grid-cols-3 lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c4a98f]">Why Choose Fortune Realty</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">Experience. Knowledge. Commitment.</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-400">
              We combine local expertise with global standards to offer personalised real estate solutions that
              create real value.
            </p>
          </div>

          <ul className="space-y-3.5">
            {WHY.map((w) => (
              <li key={w} className="flex items-center gap-3 text-[14px] text-gray-200">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#c4a98f]" /> {w}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-bold tracking-wide">RERA</p>
                <p className="mt-2 text-[11px] text-gray-400">The Real Estate Regulatory Agency</p>
                <p className="mt-3 text-[11px] text-gray-400">Agent Registration No.</p>
                <p className="text-lg font-semibold text-white">12345</p>
              </div>
              <div className="overflow-hidden rounded-lg bg-white p-1.5"><FakeQR /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Our Team ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2.4fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Team</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1a1a1a] sm:text-3xl">Meet the Experts Behind Your Success</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
              Our experienced team of professionals is dedicated to providing you with the best real estate
              experience in Dubai.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(128,96,63,0.3)]">
                <div className="h-44 overflow-hidden sm:h-56">
                  <img src={t.img} alt={t.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{t.name}</h3>
                  <p className="text-xs text-[#80603f]">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={img('1597659840241-37e2b9c2f55f', 1600)} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0a1320]/85" />
          <div className="relative flex flex-col items-center justify-between gap-6 px-6 py-10 text-center sm:px-8 sm:py-12 lg:flex-row lg:text-left">
            <Reveal>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">
                Ready to Find Your <span className="text-[#c4a98f]">Next Property?</span>
              </h2>
              <p className="mt-2 text-sm text-gray-300">Let our experts help you find the perfect property that matches your goals.</p>
            </Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className={GOLD_BTN}>Schedule a Consultation <ArrowRight className="h-4 w-4" /></a>
              <a href="/prototype1" className={GHOST_BTN}>Browse Properties <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
