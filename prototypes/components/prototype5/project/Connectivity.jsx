// Connectivity — drive times from the project. prototype5 ONLY. Mock.
import { Car } from 'lucide-react';

export default function Connectivity({ items }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a917f]">
        Nearby &amp; Connectivity
      </h3>
      <p className="mt-1 text-[13px] text-[#9a917f]">Approximate drive times from One By Nine</p>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div
            key={c.place}
            className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-white px-4 py-3"
          >
            <span className="inline-flex items-center gap-2 text-sm text-[#3A3A3A]">
              <Car size={15} className="text-[#B0905E]" />
              {c.place}
            </span>
            <span className="text-sm font-semibold text-[#1A1A1A]">{c.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
