// Similar projects — light recommendation cards. prototype1 ONLY. Mock.
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function SimilarProjects({ projects }) {
  return (
    <section id="similar" className="scroll-mt-24">
      <h2 className="font-serif text-2xl text-[#1A1A1A]">Similar Projects</h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.id}
            href="/prototype1/project/one-by-nine"
            className="group overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#e6e1d8]">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#B0905E]">{p.developer}</p>
              <h3 className="mt-1 text-base font-semibold text-[#1A1A1A]">{p.name}</h3>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1 text-[#6B6B6B]">
                  <MapPin size={13} className="text-[#B0905E]" />
                  {p.area}
                </span>
                <span className="font-semibold text-[#1A1A1A]">from {p.priceFrom}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
