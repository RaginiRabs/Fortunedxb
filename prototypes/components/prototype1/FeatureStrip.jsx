// prototype1 "why invest" feature section. Mock only.
import { TrendingUp, BadgePercent, Building2, IdCard, TrainFront, ShieldCheck } from 'lucide-react';
import { whyInvest } from '@/mock/prototype1/home';

const ICONS = [TrendingUp, BadgePercent, Building2, IdCard, TrainFront, ShieldCheck];

export default function FeatureStrip() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#141312] to-[#0c0b0a] text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-[#B89149]/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B89149]">Why Dubai</p>
          <h2 className="mt-2 text-3xl font-semibold">Why Invest with Fortune Realty</h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyInvest.map((f, i) => {
            const Icon = ICONS[i] || TrendingUp;
            return (
              <div
                key={f.id}
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B89149]/40 hover:bg-white/[0.07]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#C8A24E] to-[#A37F3C] text-white shadow-lg transition-transform group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-white">{f.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-400">{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
