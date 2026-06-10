// prototype1 component — dark luxury. Only prototype1 imports this.
import Link from 'next/link';

export default function Card({ project }) {
  // All cards open the single mock detail page for now (mock data).
  const href = `/prototype1/project/${project.slug || 'one-by-nine'}`;
  return (
    <Link
      href={href}
      className="group block border border-white/10 bg-[#1b1714] overflow-hidden hover:border-[#B0905E]/60 transition-colors"
    >
      <div className="aspect-[4/3] bg-white/[0.03] flex items-center justify-center text-white/25 text-xs uppercase tracking-[0.2em]">
        {project.area}
      </div>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#B0905E]">{project.developer}</p>
        <h3 className="mt-1 text-xl text-[#F5F2ED] font-light">{project.name}</h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-white/55">From AED {project.priceFrom.toLocaleString()}</span>
          <span className="text-[10px] uppercase tracking-wider border border-white/15 px-2 py-1 text-white/60">
            {project.status}
          </span>
        </div>
      </div>
    </Link>
  );
}
