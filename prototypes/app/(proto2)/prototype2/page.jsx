import Link from 'next/link';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { projects } from '@/mock/prototype2/projects';

export default function Prototype2Home() {
  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          Off-plan · Dubai
        </span>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
          Invest in Dubai&apos;s next landmark addresses.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          A curated selection of off-plan developments — tracked by price, payment
          plan and transaction history. Tap a project to explore the full dossier.
        </p>
      </section>

      {/* Project cards */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/prototype2/${p.id}`}
              className="group overflow-hidden rounded-3xl border border-brand-pale bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-soft"
            >
              {/* image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-brand-deeper/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream backdrop-blur-sm">
                  {p.status}
                </span>
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              {/* body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-serif text-xl font-semibold text-ink">{p.name}</h2>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} className="text-brand" /> {p.area}
                  </span>
                  <span className="text-ink-faint">·</span>
                  <span>{p.developer}</span>
                </div>
                <div className="mt-4 flex items-end justify-between border-t border-brand-pale pt-4">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-ink-faint">
                      From
                    </span>
                    <span className="font-serif text-lg font-semibold text-ink">
                      AED {p.priceFrom.toLocaleString()}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-medium text-brand transition-colors group-hover:text-brand-dark">
                    View details <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
