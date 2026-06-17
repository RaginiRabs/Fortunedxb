// prototype1 explore categories — property-type cards with listing counts. Mock only.
import { exploreCategories } from '@/mock/prototype1/home';

const hrefFor = (label) =>
  label === 'Off Plan Projects' ? '/prototype1/projects'
    : label === 'Ready Properties' ? '/prototype1/ready-properties'
      : label === 'Distress Deals' ? '/prototype1/distress-deals'
        : '#';

export default function Communities() {
  return (
    <div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Categories</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Explore Categories</h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {exploreCategories.map((c) => (
          <a
            key={c.label}
            href={hrefFor(c.label)}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_12px_36px_-14px_rgba(20,18,15,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_-15px_rgba(128,96,63,0.35)]"
          >
            <img src={c.img} alt={c.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-3 bottom-3">
              <p className="text-[14px] font-semibold leading-tight text-white">{c.label}</p>
              <p className="mt-1 text-[11px] text-white/70">{c.count}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
