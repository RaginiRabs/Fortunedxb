// prototype5 top-communities — photo cards with price & ROI. Mock only.
import { ArrowRight } from 'lucide-react';
import Dirham from '@/components/prototype5/Dirham';
import { topCommunities } from '@/mock/prototype5/home';

export default function TopCommunities() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Explore</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Top Communities</h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-[#80603f]/40 bg-white px-4 py-2 text-sm text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white"
        >
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {topCommunities.map((c) => (
          <article
            key={c.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_12px_36px_-14px_rgba(20,18,15,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#80603f]/30 hover:shadow-[0_26px_55px_-15px_rgba(184,145,73,0.35)]"
          >
            <div className="relative h-36 overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <span className="absolute right-2.5 top-2.5 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                ROI {c.roi}
              </span>
              <h3 className="absolute bottom-2.5 left-3 right-3 text-[13px] font-semibold leading-tight text-white drop-shadow">
                {c.name}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-[11px] text-gray-400">Average Price</p>
              <p className="text-[15px] font-semibold text-[#80603f]">
                <Dirham className="mr-0.5" />
                {c.avgPrice}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-[11px] text-gray-400">
                  <span className="text-sm font-semibold text-[#1a1a1a]">{c.projects}</span> Projects
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#80603f]">
                  View <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
