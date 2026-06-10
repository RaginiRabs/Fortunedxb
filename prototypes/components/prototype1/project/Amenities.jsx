// Amenities — chip grid. prototype1 ONLY. Mock.
import { Waves, Dumbbell, Car, Shield, Baby, Trees, Sofa, ShoppingBag, Sparkles } from 'lucide-react';

const ICONS = {
  waves: Waves,
  dumbbell: Dumbbell,
  car: Car,
  shield: Shield,
  baby: Baby,
  trees: Trees,
  sofa: Sofa,
  'shopping-bag': ShoppingBag,
};

export default function Amenities({ amenities }) {
  return (
    <section id="amenities" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Amenities</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {amenities.map((a) => {
          const Icon = ICONS[a.icon] ?? Sparkles;
          return (
            <div
              key={a.id}
              className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white px-4 py-3.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4EFE6] text-[#B0905E]">
                <Icon size={17} strokeWidth={2} />
              </span>
              <span className="text-sm font-medium text-[#3A3A3A]">{a.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
