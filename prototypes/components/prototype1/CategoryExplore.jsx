// prototype1 browse-by-category — image tiles per property type. Mock only.
import { ArrowUpRight } from 'lucide-react';
import { exploreCategories } from '@/mock/prototype1/home';

export default function CategoryExplore() {
  return (
    <div>
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#80603f]">Browse</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#1a1a1a]">Explore by Category</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          Find the right opportunity — from off-plan launches to ready, resale and exclusive distress deals.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {exploreCategories.map((c) => (
          <a
            key={c.label}
            href="#"
            className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_12px_36px_-14px_rgba(20,18,15,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_-15px_rgba(128,96,63,0.35)]"
          >
            <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-[#80603f] backdrop-blur transition-colors group-hover:bg-[#80603f] group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <div className="absolute inset-x-3 bottom-3">
              <p className="text-[13px] font-semibold leading-tight text-white">{c.label}</p>
              <p className="text-[11px] text-white/70">{c.count}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
