// prototype1 Resale Properties page — content only; shared layout adds navbar + footer. Mock only.
import {
  MapPin, Maximize, Calendar, ArrowRight, ShieldCheck, Building2, TrendingUp, BadgeCheck,
  Wallet, Check, CheckCircle2, Star, Quote, Search, ChevronDown,
} from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';
import Reveal from '@/components/prototype1/Reveal';
import ResaleBrowser from '@/components/prototype1/ResaleBrowser';
import FaqAccordion from '@/components/prototype1/FaqAccordion';

export const metadata = { title: 'Resale Properties — Fortune Realty L.L.C' };

const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const STATS = [
  { icon: Wallet, value: 'AED 2.8M', label: 'Average Property Price', sub: '+6.2% from last quarter' },
  { icon: Building2, value: '350+', label: 'Resale Properties', sub: 'Available Now' },
  { icon: TrendingUp, value: '8.4%', label: 'Average ROI', sub: 'Across All Communities' },
  { icon: ShieldCheck, value: '100%', label: 'Verified Listings', sub: 'Quality You Can Trust' },
];

const FEATURED = [
  { name: '3 BR Apartment', area: 'Dubai Marina', sqft: '1,850', built: '2021', status: 'Vacant', price: '2.45M', img: img('1582672060674-bc2bd808a8b5') },
  { name: '4 BR Villa', area: 'Dubai Hills Estate', sqft: '3,600', built: '2020', status: 'Vacant', price: '7.25M', img: img('1546412414-e1885259563a') },
  { name: '2 BR Apartment', area: 'Downtown Dubai', sqft: '1,250', built: '2020', status: 'Rented', price: '2.95M', img: img('1512453979798-5ea266f8880c') },
  { name: '5 BR Villa', area: 'Palm Jumeirah', sqft: '5,500', built: '2019', status: 'Vacant', price: '18.5M', img: img('1489516408517-0c0a15662682') },
];

const COMMUNITIES = [
  { name: 'Dubai Marina', count: '120+ Properties', img: img('1528702748617-c64d49f918af', 400) },
  { name: 'Downtown Dubai', count: '95+ Properties', img: img('1512453979798-5ea266f8880c', 400) },
  { name: 'Business Bay', count: '80+ Properties', img: img('1582672060674-bc2bd808a8b5', 400) },
  { name: 'Palm Jumeirah', count: '45+ Properties', img: img('1489516408517-0c0a15662682', 400) },
  { name: 'Jumeirah Village Circle', count: '60+ Properties', img: img('1526495124232-a04e1849168c', 400) },
  { name: 'Arabian Ranches', count: '35+ Properties', img: img('1518684079-3c830dcef090', 400) },
];

const VS = [
  ['Ready to Move', true, '2-4 Years'],
  ['View & Inspect', true, 'Not Available'],
  ['Immediate Rental', true, 'After Handover'],
  ['No Construction Risk', true, 'Risk Involved'],
  ['Price Appreciation', 'Immediate', 'Post Handover'],
  ['Payment Plan', 'Flexible', 'Developer Plan'],
];

const BENEFITS = [
  'Ready to move in properties',
  'Actual property to view and inspect',
  'No construction delays or risks',
  'Immediate rental income potential',
  'Transparent pricing & market value',
];

const INSIGHTS = [
  { label: 'Price Trends', sub: 'Average price per Sq.Ft', value: 'AED 1,550', change: '+4.5%' },
  { label: 'Rental Yield', sub: 'Average rental yield', value: '8.4%', change: '+0.6%' },
  { label: 'Capital Growth', sub: 'Annual capital growth', value: '6.2%', change: '+1.1%' },
];

const SOLD = [
  { name: '2 BR Apartment', area: 'Dubai Marina', price: '2.20M', date: 'May 20, 2024' },
  { name: '4 BR Villa', area: 'Arabian Ranches', price: '7.10M', date: 'May 18, 2024' },
  { name: '3 BR Apartment', area: 'Downtown Dubai', price: '2.80M', date: 'May 15, 2024' },
];

const RESALE_FAQ = [
  { q: 'What is a resale property?', a: 'A resale (secondary market) property is one being sold by its current owner rather than the developer — usually ready to move in and available for immediate inspection.' },
  { q: 'How do resale properties work?', a: 'You buy directly from the existing owner. Our team handles valuation, negotiation, NOC, and the DLD transfer for a smooth, transparent process.' },
  { q: 'Are resale properties more expensive?', a: 'Not necessarily — resale prices are negotiable and often offer better value than off-plan, plus you avoid construction wait times.' },
  { q: 'Can I get a mortgage for resale properties?', a: 'Yes. Banks readily finance ready resale homes. We connect you with mortgage partners for the best rates.' },
];

const HERO_CARD = [
  { icon: Wallet, value: 'AED 3.25M', label: 'Asking Price' },
  { icon: TrendingUp, value: '8.9%', label: 'Estimated ROI' },
  { icon: BadgeCheck, value: 'Vacant', label: 'On Transfer' },
  { icon: ShieldCheck, value: 'Ready to Move', label: 'Immediate Handover' },
];

const SELECT = 'w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-600 outline-none focus:border-[#80603f]';
const GOLD_BTN = 'inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105';
const STATUS_TONE = { Vacant: 'bg-emerald-500', Rented: 'bg-[#80603f]' };

export default function ResalePage() {
  return (
    <div className="bg-[#faf8f3]">
      {/* ===== Hero (Layout 1) ===== */}
      <section className="relative -mt-[88px] overflow-hidden bg-[#0a1320]">
        <img src="/images/resale-hero.png" alt="" className="absolute inset-0 h-full w-full object-cover object-right-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320] via-[#0a1320]/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1320]/90 to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-28 pt-[130px] md:px-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a98f]">Resale Properties</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Find Premium<br /><span className="text-[#c4a98f]">Resale Properties</span><br />in Dubai
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed text-gray-300">Verified listings. Ready to move in.<br />Great locations. Better value.</p>

            <div className="mt-7 flex max-w-lg flex-col gap-2.5 rounded-xl bg-white p-2.5 shadow-2xl sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <select className={SELECT}><option>All Communities</option><option>Dubai Marina</option><option>Downtown Dubai</option><option>Business Bay</option><option>Palm Jumeirah</option></select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative flex-1">
                <select className={SELECT}><option>Any Budget</option><option>Under AED 2M</option><option>AED 2M – 5M</option><option>AED 5M+</option></select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              <a href="#all-resale" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-5 py-2.5 text-sm font-medium text-white"><Search className="h-4 w-4" /> Search Properties</a>
            </div>
          </div>

          {/* dark info card */}
          <div className="absolute right-4 top-[120px] hidden w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1626]/90 backdrop-blur md:right-8 lg:block">
            {HERO_CARD.map((c) => (
              <div key={c.label} className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5 last:border-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-[#c4a98f]"><c.icon className="h-4 w-4" /></span>
                <span><span className="block text-[14px] font-bold text-white">{c.value}</span><span className="text-[11px] text-gray-400">{c.label}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats band ===== */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="-mt-14 grid grid-cols-2 gap-6 rounded-2xl border border-gray-100 bg-white px-6 py-7 shadow-[0_18px_44px_-20px_rgba(20,18,15,0.25)] lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-start gap-3 px-2 lg:border-r lg:border-gray-100 lg:last:border-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#80603f]/10 text-[#80603f]"><s.icon className="h-5 w-5" /></span>
              <span><span className="block text-lg font-bold leading-tight text-[#1a1a1a]">{s.value}</span><span className="block text-[12px] font-medium text-gray-600">{s.label}</span><span className="text-[10px] text-gray-400">{s.sub}</span></span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Featured ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Featured Resale Listings</p>
          <a href="#all-resale" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#80603f] hover:underline">View All <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((p, i) => (
            <Reveal key={p.name + i} delay={i * 0.08} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(128,96,63,0.3)]">
              <div className="relative h-40 overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[#80603f] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow"><BadgeCheck className="h-3 w-3" /> Verified Resale</span>
              </div>
              <div className="p-4">
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{p.name}</h3>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="h-3 w-3 text-[#80603f]" /> {p.area}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                  <span className="inline-flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[#80603f]" /> {p.sqft} Sq.Ft</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#80603f]" /> Built {p.built}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold text-white ${STATUS_TONE[p.status] || 'bg-gray-500'}`}>{p.status}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-[15px] font-bold text-[#80603f]"><Dirham className="mr-0.5" />{p.price}</span>
                  <a href="/prototype1/project/one-by-nine" className="inline-flex items-center gap-1 text-[12px] font-medium text-[#80603f] hover:underline">View Property <ArrowRight className="h-3.5 w-3.5" /></a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Browse by community ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Browse by Community</p>
          <a href="#all-resale" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#80603f] hover:underline">View All <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {COMMUNITIES.map((c) => (
            <a key={c.name} href="#all-resale" className="group relative h-28 overflow-hidden rounded-xl shadow-[0_10px_28px_-14px_rgba(20,18,15,0.25)]">
              <img src={c.img} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute inset-x-2 bottom-2 leading-tight text-white"><span className="block text-[11px] font-semibold">{c.name}</span><span className="text-[9px] text-white/70">{c.count}</span></span>
            </a>
          ))}
        </div>
      </section>

      {/* ===== All resale + sidebar ===== */}
      <section id="all-resale" className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">All Resale Properties</p>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          <ResaleBrowser />

          <div className="space-y-6 lg:sticky lg:top-[100px] lg:self-start">
            {/* vs table */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-18px_rgba(20,18,15,0.2)]">
              <div className="grid grid-cols-3 bg-[#0a1320] text-center text-[11px] font-semibold text-white">
                <span className="py-2.5 text-[#c4a98f]">Resale</span><span className="grid place-items-center py-2.5 text-gray-400">vs</span><span className="py-2.5">New Launch</span>
              </div>
              {VS.map(([label, resale, nl]) => (
                <div key={label} className="grid grid-cols-3 items-center border-t border-gray-100 text-center text-[11px]">
                  <span className="px-2 py-2 text-left font-medium text-[#1a1a1a]">{label}</span>
                  <span className="px-2 py-2 text-emerald-600">{resale === true ? <Check className="mx-auto h-4 w-4" /> : <span className="text-gray-600">{resale}</span>}</span>
                  <span className="px-2 py-2 text-gray-500">{nl === true ? <Check className="mx-auto h-4 w-4" /> : nl}</span>
                </div>
              ))}
            </div>
            {/* benefits */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_12px_34px_-18px_rgba(20,18,15,0.2)]">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1a1a1a]">Resale Benefits</h3>
              <ul className="mt-4 space-y-2.5">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[12.5px] text-gray-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#80603f]" /> {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Insights + sold + testimonial ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* insights */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_12px_34px_-18px_rgba(20,18,15,0.2)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Market & Investment Insights</p>
            <div className="mt-4 space-y-4">
              {INSIGHTS.map((m) => (
                <div key={m.label} className="flex items-end justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div><p className="text-[13px] font-semibold text-[#1a1a1a]">{m.label}</p><p className="text-[10px] text-gray-400">{m.sub}</p></div>
                  <div className="text-right"><p className="text-[15px] font-bold text-[#1a1a1a]">{m.value}</p><p className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600"><TrendingUp className="h-3 w-3" /> {m.change}</p></div>
                </div>
              ))}
            </div>
          </div>
          {/* recently sold */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_12px_34px_-18px_rgba(20,18,15,0.2)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Recently Sold Properties</p>
            <div className="mt-4 space-y-3">
              {SOLD.map((s) => (
                <div key={s.name + s.date} className="flex items-center justify-between border-b border-gray-100 pb-3 text-[12px] last:border-0">
                  <div><p className="font-medium text-[#1a1a1a]">{s.name}</p><p className="text-[10px] text-gray-400">{s.area}</p></div>
                  <div className="text-right"><p className="font-bold text-[#80603f]"><Dirham className="mr-0.5" />{s.price}</p><p className="text-[10px] text-gray-400">{s.date}</p></div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-[12px] font-medium text-gray-600 hover:border-[#80603f] hover:text-[#80603f]">View All Transactions</button>
          </div>
          {/* testimonial */}
          <div className="rounded-2xl bg-[#0a1320] p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c4a98f]">What Our Clients Say</p>
            <Quote className="mt-3 h-7 w-7 text-[#c4a98f]/40" />
            <p className="mt-2 text-[13px] leading-relaxed text-gray-300">Fortune Realty helped me find the perfect resale property. Transparent process and great service!</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={img('1500648767791-00dcc994a43e', 120)} alt="Ahmed R." className="h-10 w-10 rounded-full object-cover" />
              <div><p className="text-[13px] font-semibold">Ahmed R.</p><p className="text-[11px] text-gray-400">Dubai Marina</p></div>
              <span className="ml-auto flex text-[#c4a98f]">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ + CTA ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Frequently Asked Questions</p>
            <div className="mt-4"><FaqAccordion items={RESALE_FAQ} /></div>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[#0a1320] p-8 text-white">
            <img src={img('1512453979798-5ea266f8880c', 1000)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="relative">
              <h2 className="text-2xl font-semibold md:text-3xl">Find Your Perfect Resale Property <span className="text-[#c4a98f]">Today</span></h2>
              <p className="mt-2 text-sm text-gray-300">Talk to our property experts for personalized assistance.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/prototype1/contact" className={GOLD_BTN}>Schedule a Consultation <ArrowRight className="h-4 w-4" /></a>
                <a href="tel:+971501234567" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10">+971 50 123 4567</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
