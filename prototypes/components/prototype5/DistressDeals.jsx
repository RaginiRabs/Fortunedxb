// prototype5 distress deals — horizontal wide cards (image-left) in 2 columns. Mock only.
import { MapPin, BedDouble, Maximize, Building2, ArrowRight, Flame, Clock } from 'lucide-react';
import Dirham from '@/components/prototype5/Dirham';
import { distressDeals } from '@/mock/prototype5/home';

export default function DistressDeals() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
            <Flame className="h-3.5 w-3.5" /> Limited Time
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Distress Deals</h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 rounded-full border border-[#80603f]/40 bg-white px-4 py-2 text-sm text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {distressDeals.map((d) => (
          <article
            key={d.id}
            className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_36px_-14px_rgba(20,18,15,0.20)] transition-all duration-300 hover:-translate-y-1 hover:border-[#80603f]/30 hover:shadow-[0_24px_50px_-16px_rgba(128,96,63,0.30)]"
          >
            {/* Image (absolute so it never drives the card height) */}
            <div className="relative w-2/5 shrink-0 overflow-hidden">
              <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
              <span className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white shadow">{d.discount}% OFF</span>
              <span className="absolute bottom-2 left-2 rounded bg-[#80603f] px-2 py-0.5 text-[9px] font-semibold text-white">{d.dealType}</span>
            </div>

            {/* Details */}
            <div className="flex-1 p-4">
              <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{d.name}</h3>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-gray-400"><MapPin className="h-3.5 w-3.5 text-[#80603f]" /> {d.location}</p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-lg font-bold text-[#80603f]"><Dirham className="mr-0.5" />{d.dealPrice}</span>
                <span className="text-xs text-gray-400 line-through"><Dirham className="mr-0.5" />{d.marketPrice}</span>
              </div>
              <p className="text-[11px] font-medium text-emerald-600">{d.discount}% Below Market</p>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
                <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-[#80603f]" />{d.beds}</span>
                <span className="inline-flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-[#80603f]" />{d.sqft}</span>
                <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5 text-[#80603f]" />{d.type}</span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-400"><Clock className="h-3.5 w-3.5 text-red-500" /><span className="font-semibold text-red-600">{d.expires}</span></span>
                <a href="#" className="inline-flex items-center gap-1 rounded-full bg-[#80603f]/10 px-3 py-1.5 text-[11px] font-medium text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
                  View Details <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
