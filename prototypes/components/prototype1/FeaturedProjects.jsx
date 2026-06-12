// prototype1 featured projects — editorial split: 1 hero + stacked list. Mock only.
import { MapPin, BedDouble, Layers, TrendingUp, ArrowRight } from 'lucide-react';
import Dirham from '@/components/prototype1/Dirham';
import { featuredProjects } from '@/mock/prototype1/home';

export default function FeaturedProjects() {
  const [hero, ...rest] = featuredProjects;

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Handpicked</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Featured Projects</h2>
        </div>
        <a href="#" className="inline-flex items-center gap-2 rounded-full border border-[#80603f]/40 bg-white px-4 py-2 text-sm text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white">
          View All Projects <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Hero project */}
        <article className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl shadow-[0_18px_50px_-18px_rgba(20,18,15,0.4)]">
          <img src={hero.img} alt={hero.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <span className="absolute left-4 top-4 rounded-md bg-[#80603f] px-3 py-1 text-[11px] font-semibold text-white">{hero.status}</span>
          <div className="relative p-6 text-white">
            <h3 className="text-2xl font-semibold">{hero.name}</h3>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-white/70">
              <MapPin className="h-4 w-4 text-[#d8c4a8]" /> {hero.location}
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-[#e9d9c2]"><Dirham className="mr-0.5" />{hero.price}</p>
                <p className="text-xs text-white/60">Starting Price</p>
              </div>
              <div className="flex gap-5 text-center text-[12px] text-white/80">
                <span><BedDouble className="mx-auto mb-1 h-4 w-4 text-[#d8c4a8]" />{hero.beds}</span>
                <span><Layers className="mx-auto mb-1 h-4 w-4 text-[#d8c4a8]" />{hero.units}</span>
                <span><TrendingUp className="mx-auto mb-1 h-4 w-4 text-[#d8c4a8]" />{hero.roi}</span>
              </div>
            </div>
            <a href="#" className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white/15 py-2.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-[#80603f]">
              View Details <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </article>

        {/* Stacked list */}
        <div className="flex flex-col gap-4">
          {rest.map((p) => (
            <article key={p.id} className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_30px_-14px_rgba(20,18,15,0.20)] transition-all duration-300 hover:-translate-y-1 hover:border-[#80603f]/30 hover:shadow-[0_20px_44px_-16px_rgba(128,96,63,0.3)]">
              <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-xl">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur">{p.status}</span>
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="text-[15px] font-semibold text-[#1a1a1a]">{p.name}</h3>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-gray-400"><MapPin className="h-3.5 w-3.5 text-[#80603f]" /> {p.location}</p>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-gray-500">
                  <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-[#80603f]" />{p.beds}</span>
                  <span className="inline-flex items-center gap-1"><Layers className="h-3.5 w-3.5 text-[#80603f]" />{p.units}</span>
                  <span className="inline-flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-[#80603f]" />{p.roi}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-base font-bold text-[#80603f]"><Dirham className="mr-0.5" />{p.price}</span>
                  <a href="#" className="inline-flex items-center gap-1 text-[12px] font-medium text-[#80603f] hover:underline">View Details <ArrowRight className="h-3 w-3" /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
