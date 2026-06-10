import { ShieldCheck, TrendingUp, Handshake, Globe2 } from 'lucide-react';

export const metadata = { title: 'About — Fortune Realty' };

const STATS = [
  ['12+', 'Years in Dubai'],
  ['1,500+', 'Units sold'],
  ['AED 4B+', 'Transacted'],
  ['40+', 'Developer partners'],
];

const VALUES = [
  [ShieldCheck, 'Trust first', 'Transparent pricing and verified inventory on every listing — no surprises.'],
  [TrendingUp, 'Investor focus', 'ROI, yield and payment-plan clarity so you buy on fundamentals, not hype.'],
  [Handshake, 'White-glove service', 'A dedicated advisor from first enquiry through handover.'],
  [Globe2, 'Global reach', 'Serving local and international buyers across 30+ countries.'],
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-14">
      <header className="max-w-2xl">
        <span className="block text-[12px] font-black tracking-[0.2em] text-[#80603f] mb-2">About us</span>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
          Dubai property, done properly.
        </h1>
        <p className="mt-4 text-[#574e44] leading-relaxed text-lg">
          Fortune Realty L.L.C is a Dubai-based off-plan specialist. We help local and international investors find,
          evaluate and secure the right property — backed by real market data and a team that puts your return ahead of the sale.
        </p>
      </header>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-[#e8e2da] bg-white divide-x divide-y md:divide-y-0 divide-[#e8e2da] overflow-hidden">
        {STATS.map(([v, l]) => (
          <div key={l} className="px-6 py-7">
            <p className="text-3xl font-bold text-[#6a4b2e] font-[family-name:var(--font-heading)] tabular-nums">{v}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#675c4e]">{l}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {VALUES.map(([Icon, title, body]) => (
          <article key={title} className="bg-white border border-[#e8e2da] p-7 rounded-2xl">
            <span className="h-11 w-11 rounded-lg bg-[#faf7f3] text-[#80603f] flex items-center justify-center">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 text-xl font-semibold font-[family-name:var(--font-heading)] text-[#2a2520]">{title}</h3>
            <p className="mt-2 text-sm text-[#574e44] leading-relaxed">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
