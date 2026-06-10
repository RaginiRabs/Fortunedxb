// prototype4 component — bold modern. Only prototype4 imports this.
import Link from 'next/link';

export default function Card({ project }) {
  return (
    <article className="relative bg-white border border-[#e8e2da] p-7 shadow-sm hover:shadow-md hover:border-[#947049] transition-all">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6a4b2e]">{project.status}</span>
        <span className="text-xs text-[#2a2520]/40">#{String(project.id).padStart(2, '0')}</span>
      </div>
      <h3 className="mt-6 text-4xl font-semibold leading-none font-[family-name:var(--font-heading)]">
        <Link href={`/prototype4/${project.id}`} className="hover:text-[#80603f] transition-colors">
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-[#2a2520]/60">{project.developer} / {project.area}</p>
      <div className="mt-6 text-2xl font-bold tabular-nums text-[#6a4b2e]">
        AED {project.priceFrom.toLocaleString()}
      </div>
    </article>
  );
}
