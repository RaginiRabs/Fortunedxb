// prototype1 Distress Deals page — content only; shared layout adds navbar + footer. Mock only.
import {
  MapPin, ArrowRight, ArrowUpRight, TrendingUp,
  Clock, Tag, KeyRound, Repeat,
  BadgeCheck, Home, Zap, MessageCircle,
} from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';
import Reveal from '@/components/prototype1/Reveal';
import SavingsCalculator from '@/components/prototype1/SavingsCalculator';
import FaqAccordion from '@/components/prototype1/FaqAccordion';
import DistressBrowser from '@/components/prototype1/DistressBrowser';

export const metadata = { title: 'Distress Deals — Fortune Realty L.L.C' };

const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

const STATS = [
  { icon: Home, value: '120+', label: 'Active Deals' },
  { icon: Tag, value: 'AED 300M+', label: 'Total Value Saved' },
  { icon: Clock, value: '8% - 12%', label: 'Average ROI' },
  { icon: Zap, value: '48h', label: 'New Deals Added' },
];

const CATEGORIES = [
  { icon: Zap, title: 'Urgent Sale', count: '85+ Deals' },
  { icon: TrendingUp, title: 'Investor Deals', count: '64+ Deals' },
  { icon: Home, title: 'Motivated Seller', count: '72+ Deals' },
  { icon: BadgeCheck, title: 'Below Market', count: '90+ Deals' },
  { icon: KeyRound, title: 'Ready Properties', count: '56+ Deals' },
];

const FEATURED = [
  { name: 'Downtown Views II', area: 'Downtown Dubai', badge: 'HOT DEAL', market: '2.60M', deal: '1.95M', save: '650K', roi: '9.5%', img: img('1597659840241-37e2b9c2f55f') },
  { name: 'Maple at Dubai Hills Estate', area: 'Dubai Hills Estate', badge: 'URGENT SALE', market: '3.20M', deal: '2.40M', save: '800K', roi: '10.1%', img: img('1518684079-3c830dcef090') },
  { name: 'Sobha Creek Vistas', area: 'Sobha Hartland, Dubai', badge: 'SAVE AED 500K', market: '1.80M', deal: '1.30M', save: '500K', roi: '8.7%', img: img('1512453979798-5ea266f8880c') },
  { name: 'Rukan Lofts', area: 'Wadi Al Safa 7', badge: 'HOT DEAL', market: '1.10M', deal: '780K', save: '320K', roi: '9.2%', img: img('1489516408517-0c0a15662682') },
];

const INVESTOR = [
  { icon: TrendingUp, title: 'Highest ROI Deals', text: 'Explore properties with up to 12% ROI potential.' },
  { icon: Tag, title: 'Biggest Discounts', text: 'Save up to 40% below market value.' },
  { icon: KeyRound, title: 'Ready to Move', text: 'Immediate handover properties available.' },
  { icon: Repeat, title: 'Quick Exit', text: 'High liquidity & easy exit opportunities.' },
];

const TRANSACTIONS = [
  { property: 'Sobha One', location: 'Business Bay', deal: '2.05M', save: '550K', date: '2 May, 2024' },
  { property: 'Harbour Gate Tower 2', location: 'Dubai Creek Harbour', deal: '1.65M', save: '450K', date: '30 Apr, 2024' },
  { property: 'Ellington House', location: 'Dubai Hills Estate', deal: '1.25M', save: '400K', date: '28 Apr, 2024' },
  { property: 'Azizi Riviera 41', location: 'Meydan, Dubai', deal: '780K', save: '220K', date: '25 Apr, 2024' },
];


export default function DistressDealsPage() {
  return (
    <div className="bg-[#faf8f3]">
      {/* ===== Hero (independent — does not share with Projects) ===== */}
      <section className="relative -mt-[88px] overflow-hidden bg-[#0a1320]">
        <img src={img('1512453979798-5ea266f8880c', 1600)} alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320] via-[#0a1320]/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1320]/90 to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-[140px] md:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a98f]">Distress Deals</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
            Dubai&apos;s Best Distress Deals <span className="text-[#c4a98f]">Below Market Value.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-300">
            Exclusive collection of urgent sale and motivated seller properties with exceptional discounts and high ROI potential.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 text-white">
                <s.icon className="h-6 w-6 text-[#c4a98f]" strokeWidth={1.6} />
                <span><span className="block text-lg font-bold leading-none">{s.value}</span><span className="text-[11px] text-gray-400">{s.label}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Browse by category ===== */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Browse Deals by Category</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <a key={c.title} href="#" className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_10px_28px_-16px_rgba(20,18,15,0.2)] transition-all hover:-translate-y-1 hover:border-[#80603f]/30">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#80603f]/10 text-[#80603f]"><c.icon className="h-5 w-5" /></span>
              <span><span className="block text-[13px] font-semibold text-[#1a1a1a]">{c.title}</span><span className="text-[11px] text-gray-400">{c.count}</span></span>
            </a>
          ))}
        </div>
      </section>

      {/* ===== Featured distress deals ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-12 md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Featured Distress Deals</p>
          <a href="#" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#80603f] hover:underline">View All Deals <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_34px_-16px_rgba(20,18,15,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-18px_rgba(128,96,63,0.25)]">
              <div className="relative h-40 overflow-hidden">
                <img src={d.img} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-md bg-[#80603f] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">{d.badge}</span>
              </div>
              <div className="p-4">
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{d.name}</h3>
                <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-gray-400"><MapPin className="h-3 w-3 text-[#80603f]" /> {d.area}</p>
                <div className="mt-3 flex items-end justify-between border-t border-gray-100 pt-3">
                  <div>
                    <p className="text-[10px] text-gray-400">Market Price <span className="line-through"><Dirham className="mx-0.5" />{d.market}</span></p>
                    <p className="text-[10px] text-gray-400">Deal Price</p>
                    <p className="text-[15px] font-bold text-[#80603f]"><Dirham className="mr-0.5" />{d.deal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Save</p>
                    <p className="text-[12px] font-bold text-[#80603f]"><Dirham className="mr-0.5" />{d.save}</p>
                    <p className="mt-1 text-[10px] text-gray-400">ROI {d.roi}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a href="/prototype1/project/one-by-nine" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12px] font-medium text-[#1a1a1a] transition-colors hover:border-[#80603f] hover:text-[#80603f]">View Details <ArrowRight className="h-3.5 w-3.5" /></a>
                  <a href="/prototype1/project/one-by-nine" aria-label="Open" className="grid h-9 w-9 place-items-center rounded-lg bg-[#80603f] text-white"><ArrowUpRight className="h-4 w-4" /></a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== All distress deals + calculator ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <DistressBrowser />

          {/* Calculator */}
          <div className="lg:sticky lg:top-[100px] lg:h-fit"><SavingsCalculator /></div>
        </div>
      </section>

      {/* ===== Top investor opportunities ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Top Investor Opportunities</p>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px] lg:items-stretch">
          <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {INVESTOR.map((o) => (
              <div key={o.title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0_10px_28px_-16px_rgba(20,18,15,0.2)]">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#80603f]/10 text-[#80603f]"><o.icon className="h-5 w-5" /></span>
                <h3 className="mt-3 text-[13px] font-semibold text-[#1a1a1a]">{o.title}</h3>
                <p className="mt-1 text-[11px] leading-snug text-gray-500">{o.text}</p>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-[#0a1320] p-6 text-white">
            <h3 className="text-lg font-semibold">Need Expert Advice?</h3>
            <p className="mt-2 text-[13px] text-gray-400">Our property experts will help you find the right distress deal.</p>
            <a href="/prototype1/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-5 py-2.5 text-sm font-medium text-white"><MessageCircle className="h-4 w-4" /> Talk to an Expert</a>
          </div>
        </div>
      </section>

      {/* ===== Transactions + FAQ ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-14 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Recent Deal Transactions</p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_28px_-16px_rgba(20,18,15,0.2)]">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-gray-50 text-[10px] uppercase tracking-wide text-gray-400">
                  <tr><th className="px-4 py-3">Property</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Deal Price</th><th className="px-4 py-3">Savings</th><th className="px-4 py-3">Closed On</th></tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map((t) => (
                    <tr key={t.property} className="border-t border-gray-100 text-gray-600">
                      <td className="px-4 py-3 font-medium text-[#1a1a1a]">{t.property}</td>
                      <td className="px-4 py-3">{t.location}</td>
                      <td className="px-4 py-3"><Dirham className="mr-0.5" />{t.deal}</td>
                      <td className="px-4 py-3 font-medium text-[#80603f]"><Dirham className="mr-0.5" />{t.save}</td>
                      <td className="px-4 py-3 text-gray-400">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Frequently Asked Questions</p>
            <div className="mt-4"><FaqAccordion /></div>
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="mx-auto max-w-[1400px] px-4 pb-16 md:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0a1320]">
          <img src={img('1597659840241-37e2b9c2f55f', 1600)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="relative flex flex-col items-center justify-between gap-6 px-8 py-12 text-center lg:flex-row lg:text-left">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Don&apos;t Miss Out on the Best Deals!</h2>
              <p className="mt-2 text-sm text-gray-300">Exclusive distress deals won&apos;t last long. Get in touch with our experts today.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-md bg-[#80603f] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#6b4f33]">Browse All Deals <ArrowRight className="h-4 w-4" /></a>
              <a href="/prototype1/contact" className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">Schedule a Consultation</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
