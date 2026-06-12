// prototype1 explore communities — area cards with avg price & ROI. Mock only.
import { ArrowRight, MapPin } from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';
import { topCommunities } from '@/mock/prototype1/home';

export default function Communities() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Locations</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Explore Locations</h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 rounded-full border border-[#80603f]/40 bg-white px-4 py-2 text-sm text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {topCommunities.map((c) => (
          <a
            key={c.id}
            href="#"
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_12px_36px_-14px_rgba(20,18,15,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_-15px_rgba(128,96,63,0.35)]"
          >
            <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <span className="absolute right-2.5 top-2.5 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow">ROI {c.roi}</span>
            <div className="absolute inset-x-3 bottom-3">
              <p className="inline-flex items-center gap-1 text-[13px] font-semibold leading-tight text-white">
                <MapPin className="h-3.5 w-3.5 text-[#d8c4a8]" /> {c.name}
              </p>
              <p className="mt-1 text-[12px] font-semibold text-white">
                <span className="text-white/60">from </span><Dirham className="mr-0.5" />{c.avgPrice}
              </p>
              <p className="text-[10px] text-white/65">{c.projects} Projects</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
