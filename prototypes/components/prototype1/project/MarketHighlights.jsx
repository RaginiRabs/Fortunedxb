// Market Highlights — grid of key-stat cards. prototype1 ONLY. Mock.
import { Building2, Calendar, CircleCheck, Clock, DollarSign, Activity } from 'lucide-react';
import Money from './Money';

const ICONS = {
  building: Building2,
  calendar: Calendar,
  check: CircleCheck,
  clock: Clock,
  dollar: DollarSign,
  activity: Activity,
};

export default function MarketHighlights({ highlights }) {
  return (
    <section id="market-data" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Market Highlights</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
        {highlights.map((h) => {
          const Icon = ICONS[h.icon] ?? Activity;
          return (
            <div
              key={h.id}
              className="rounded-2xl border border-black/[0.06] bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4EFE6] text-[#B0905E]">
                <Icon size={17} strokeWidth={2} />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#9a917f]">
                {h.label}
              </p>
              <p className="mt-0.5 text-lg font-semibold text-[#1A1A1A]"><Money>{h.value}</Money></p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
