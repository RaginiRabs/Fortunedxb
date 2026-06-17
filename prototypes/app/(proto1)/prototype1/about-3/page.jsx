// prototype1 About Us (v3) — full editorial layout. Content only; shared layout adds navbar + footer. Mock only.
import {
  Award, Building2, Users, TrendingUp, MapPin, ShieldCheck, Handshake, Lightbulb,
  HeartHandshake, Flag, BadgeCheck, Sparkles, ArrowRight, Play, Phone, Linkedin,
} from 'lucide-react';
import Reveal from '@/components/prototype1/Reveal';
import CountUp from '@/components/prototype1/CountUp';
import Dirham from '@/components/prototype1/Dirham';

export const metadata = { title: 'About Us — Fortune Realty L.L.C' };

const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const HERO_STATS = [
  { icon: Award, value: '10+', label: 'Years of Excellence' },
  { icon: Building2, value: '500+', label: 'Projects Sold' },
  { icon: Users, value: '1000+', label: 'Happy Clients' },
  { icon: TrendingUp, value: 'AED 2B+', label: 'Sales Value' },
  { icon: MapPin, value: 'All Over Dubai', label: 'Strong Presence' },
];

const TIMELINE = [
  { icon: Flag, year: '2014', label: 'Company Founded in Dubai' },
  { icon: BadgeCheck, year: '2016', label: 'RERA Registered Brokerage' },
  { icon: Building2, year: '2018', label: 'Expanded Portfolio to 100+ Projects' },
  { icon: Users, year: '2020', label: 'Reached 500+ Happy Clients' },
  { icon: TrendingUp, year: '2022', label: 'Crossed AED 1B+ in Sales' },
  { icon: Sparkles, year: '2024', label: 'Continuing to Grow Stronger Together' },
];

const VALUES = [
  { icon: ShieldCheck, title: 'Integrity', text: 'Honesty and transparency in every interaction.' },
  { icon: Award, title: 'Excellence', text: 'We deliver exceptional service always.' },
  { icon: Handshake, title: 'Trust', text: 'Building long-term relationships through trust and reliability.' },
  { icon: Lightbulb, title: 'Innovation', text: 'Leveraging insights and technology for better outcomes.' },
  { icon: HeartHandshake, title: 'Commitment', text: "Dedicated to our clients' success from start to finish." },
];

const PROCESS = [
  { no: '01', title: 'Understand', text: 'We listen to your goals and understand your requirements.', img: img('1556761175-5973dc0f32e7', 700) },
  { no: '02', title: 'Research', text: 'In-depth market research to find the right opportunities.', img: img('1454165804606-c3d57bc86b40', 700) },
  { no: '03', title: 'Execute', text: 'Expert negotiation and smooth transaction management.', img: img('1521791136064-7986c2920216', 700) },
  { no: '04', title: 'Support', text: 'Post-sales support and long-term relationship that continues.', img: img('1573496359142-b8d87734a5a2', 700) },
];

const ACHIEVEMENTS = [
  { end: 500, suffix: '+', label: 'Projects Sold' },
  { end: 1000, suffix: '+', label: 'Happy Clients' },
  { dirham: true, end: 2, suffix: 'B+', label: 'Sales Value' },
  { end: 25, suffix: '+', label: 'Communities Covered' },
  { end: 98, suffix: '%', label: 'Client Satisfaction Rate' },
];

const TEAM = [
  { name: 'Muhammad Usman', role: 'CEO & Founder', img: img('1500648767791-00dcc994a43e', 600) },
  { name: 'Ayesha Khalid', role: 'Head of Sales', img: img('1494790108377-be9c29b29330', 600) },
  { name: 'Omar Hassan', role: 'Investment Director', img: img('1507003211169-0a1dd7228f2d', 600) },
  { name: 'Sana Farooq', role: 'Client Relations Director', img: img('1438761681033-6461ffad8d80', 600) },
];

const GOLD_BTN = 'inline-flex w-fit items-center gap-2 rounded-md bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105';
const OUTLINE_BTN = 'inline-flex w-fit items-center gap-2 rounded-md border border-[#80603f]/40 px-6 py-3 text-sm font-medium text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white';
const GHOST_BTN = 'inline-flex w-fit items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10';

export default function About3Page() {
  return (
    <div className="bg-[#faf8f3]">
      {/* ===== Hero ===== */}
      <section className="relative -mt-[88px] overflow-hidden bg-[#0a1320]">
        <img src="/images/about3-hero.png" alt="Luxury interior" className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320] via-[#0a1320]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a1320] to-transparent" />
        <Reveal className="relative mx-auto max-w-[1400px] px-4 pb-36 pt-[140px] md:px-8 md:pb-40 md:pt-[150px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a98f]">About Us</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-white sm:text-5xl md:text-6xl">
            Building Trust.<br />Creating Value.<br /><span className="text-[#c4a98f]">Delivering Futures.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-gray-300">
            Fortune Realty L.L.C is a RERA registered real estate brokerage firm in Dubai, committed to
            delivering exceptional property solutions with transparency, integrity and results.
          </p>
          <a href="#" className="mt-8 inline-flex items-center gap-3 text-white">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 transition-colors hover:bg-white/10"><Play className="ml-0.5 h-4 w-4 fill-current" /></span>
            <span className="leading-tight"><span className="block text-sm font-semibold">Watch Our Story</span><span className="text-[11px] text-gray-400">2:45 Min</span></span>
          </a>
        </Reveal>
      </section>

      {/* ===== Stats band (overlaps hero) ===== */}
      <section className="relative z-10 mx-auto -mt-24 max-w-5xl px-4 md:px-8">
        <Reveal className="grid grid-cols-2 gap-y-7 rounded-2xl border border-gray-100 bg-white px-4 py-8 shadow-[0_22px_60px_-24px_rgba(20,18,15,0.4)] sm:grid-cols-3 sm:px-6 lg:grid-cols-5">
          {HERO_STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2 text-center lg:border-r lg:border-gray-100 lg:last:border-0">
              <s.icon className="mb-1 h-7 w-7 text-[#80603f]" strokeWidth={1.6} />
              <span className="text-xl font-bold text-[#1a1a1a]">{s.value}</span>
              <span className="text-[11px] text-gray-400">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ===== Our Story ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr_0.85fr] lg:items-center">
          {/* Our Story — single full collage image */}
          <Reveal y={36}>
            <img src="/images/story.png" alt="Fortune Realty — Our Story" className="h-auto w-full object-contain mix-blend-multiply" />
          </Reveal>

          {/* Text */}
          <Reveal delay={0.1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Story</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1a1a1a] sm:text-3xl">A Decade of Growth &amp; Trust</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
              Founded in 2014, Fortune Realty L.L.C has grown from a visionary start-up to one of Dubai&apos;s
              trusted real estate brokerage firms. Our journey has been built on passion, performance and people.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-gray-500">
              We go beyond transactions — we build lasting relationships that help our clients make confident
              property decisions and secure their future.
            </p>
          </Reveal>

          {/* Timeline */}
          <Reveal delay={0.2}>
            <div>
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < TIMELINE.length - 1 && <span className="absolute left-5 top-11 h-[calc(100%-1.75rem)] border-l border-dashed border-[#80603f]/40" />}
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#80603f] shadow-[0_8px_20px_-10px_rgba(20,18,15,0.4)]"><t.icon className="h-4 w-4" /></span>
                  <div className="pt-1">
                    <p className="text-[15px] font-bold text-[#1a1a1a]">{t.year}</p>
                    <p className="text-[12px] leading-snug text-gray-500">{t.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Our Values (dark) ===== */}
      <section className="relative overflow-hidden bg-[#0a1320]">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#80603f]/15 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_3.7fr] lg:items-center">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c4a98f]">Our Values</p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-4xl">
                The Principles That <span className="text-[#c4a98f]">Define Us</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08} className="lg:border-l lg:border-white/10 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#80603f]/40 text-[#c4a98f]"><v.icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-[15px] font-semibold text-white">{v.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-gray-400">{v.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== What We Do ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr] lg:items-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">What We Do</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1a1a1a] sm:text-3xl">Real Estate Solutions Tailored for You</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
              From buying, selling to investment advisory, we provide end-to-end real estate solutions that are
              seamless, transparent and reliable.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.no} delay={i * 0.1} className="group relative">
                <div className="overflow-hidden rounded-2xl shadow-[0_14px_40px_-18px_rgba(20,18,15,0.3)]">
                  <img src={p.img} alt={p.title} className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <span className="relative z-10 -mt-6 ml-4 grid h-12 w-12 place-items-center rounded-full border-2 border-[#80603f]/30 bg-white text-[14px] font-bold text-[#80603f] shadow-md">{p.no}</span>
                <h3 className="mt-3 text-[15px] font-semibold text-[#1a1a1a]">{p.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-gray-500">{p.text}</p>
                {i < PROCESS.length - 1 && (
                  <span className="absolute right-0 top-[150px] z-20 hidden translate-x-1/2 lg:block" aria-hidden>
                    <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
                      <path d="M3 20 C 15 3, 31 3, 43 17" stroke="#80603f" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="3 3" fill="none" />
                      <path d="M37 11 L44 17 L35 21" stroke="#80603f" strokeOpacity="0.7" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Our Achievements (dark + skyline) ===== */}
      <section className="relative overflow-hidden bg-[#0a1320]">
        <img src={img('1512453979798-5ea266f8880c', 1800)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#0a1320]/80" />
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_3.7fr] lg:items-center">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c4a98f]">Our Achievements</p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-4xl">
                Numbers That Reflect <span className="text-[#c4a98f]">Our Impact</span>
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={a.label} delay={i * 0.08} className="lg:border-l lg:border-white/15 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                  <div className="whitespace-nowrap text-[2rem] font-bold leading-none text-white md:text-[2.6rem]">
                    {a.dirham && <Dirham className="mr-1.5" />}
                    <CountUp end={a.end} prefix={a.prefix || ''} suffix={a.suffix} />
                  </div>
                  <div className="mt-2.5 text-[12px] leading-snug text-gray-400">{a.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Our Leadership ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.4fr]">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Our Leadership</p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#1a1a1a] sm:text-3xl">The People Behind Fortune Realty</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-500">
              Our leadership team brings together years of experience, market expertise and a shared commitment
              to client success.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="group rounded-2xl bg-[#0a1320] p-3 shadow-[0_14px_40px_-18px_rgba(20,18,15,0.4)] transition-transform duration-300 hover:-translate-y-1">
                <div className="overflow-hidden rounded-xl">
                  <img src={t.img} alt={t.name} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-64" />
                </div>
                <div className="px-1 pt-3.5">
                  <h3 className="text-[14px] font-semibold text-white">{t.name}</h3>
                  <p className="text-[11px] text-[#c4a98f]">{t.role}</p>
                  <a href="#" aria-label={`${t.name} on LinkedIn`} className="mt-3 grid h-8 w-8 place-items-center rounded-md bg-[#80603f] text-white transition-colors hover:brightness-110"><Linkedin className="h-4 w-4" /></a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a1320] px-6 py-10 md:px-12 md:py-12">
          <img src={img('1528702748617-c64d49f918af', 1600)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320] via-[#0a1320]/90 to-[#0a1320]/60" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Let&apos;s Build Your Real Estate Future Together</h2>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-gray-300">
                Whether you&apos;re investing or looking for your dream home, we&apos;re here to guide you every
                step of the way.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href="/prototype1/contact" className={GOLD_BTN}>Schedule a Consultation <ArrowRight className="h-4 w-4" /></a>
              <a href="tel:+971582335969" className={GHOST_BTN}><Phone className="h-4 w-4" /> +971 58 233 5969</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
