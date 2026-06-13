// Horizontal list-row variant of a project card — used by the list view in
// SearchCards. prototype3 ONLY. Mirrors Card.jsx data/accents.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const typeAccent = {
  'off-plan': { chip: 'bg-[#C49A3C] text-[#0A0A12]', label: 'Off-Plan' },
  resale: { chip: 'bg-white text-[#15151C] ring-1 ring-inset ring-black/10', label: 'Resale' },
  distress: { chip: 'bg-[#C83C3C] text-white', label: 'Distress' },
};

const compact = (n) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : `${Math.round(n / 1000)}K`;

export default function ProjectRow({ project }) {
  const accent = typeAccent[project.type] || typeAccent['off-plan'];
  const savings = project.marketPrice ? project.marketPrice - project.priceFrom : 0;

  const specs =
    project.type === 'distress'
      ? [
          ['Discount', `${project.discount}%`],
          ['You save', `AED ${compact(savings)}`],
          ['Yield', project.yield],
        ]
      : project.type === 'resale'
        ? [
            ['Status', 'Ready'],
            ['Built', project.builtYear],
            ['Yield', project.yield],
          ]
        : [
            ['Handover', project.handover],
            ['Payment', project.paymentPlan],
            ['Yield', project.yield],
          ];

  return (
    <Link href={`/prototype3/${project.slug || 'marina-vista'}`} className="group block">
      <article className="flex overflow-hidden rounded-2xl border border-[rgba(10,10,18,0.08)] bg-white shadow-[0_6px_24px_-18px_rgba(10,10,18,0.2)] transition-shadow duration-300 hover:shadow-[0_16px_36px_-22px_rgba(10,10,18,0.28)]">
        {/* Image */}
        <div className="relative w-28 shrink-0 overflow-hidden sm:w-44 md:w-56">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${accent.chip}`}>
            {accent.label}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A3C]">
              {project.developer}
              <span className="h-1 w-1 rounded-full bg-[#C49A3C]/50" />
              <span className="truncate font-medium normal-case tracking-normal text-[#7A7A85]">{project.area}</span>
            </div>
            <h3 className="mt-1 text-lg font-bold leading-tight tracking-[-0.01em] text-[#0A0A12] transition-colors group-hover:text-[#80603f] sm:text-xl font-[family-name:var(--font-heading)]">
              {project.name}
            </h3>
            <p className="mt-1 text-[13px] font-semibold text-[#2A2A32]">
              {project.beds} · {project.size}
            </p>
            <p className="mt-1 hidden text-[12.5px] leading-relaxed text-[#9A9AA3] sm:line-clamp-1 lg:block">{project.highlight}</p>
          </div>

          {/* Specs (desktop) */}
          <div className="hidden shrink-0 gap-6 border-l border-[rgba(10,10,18,0.08)] pl-5 md:flex">
            {specs.map(([l, v], i) => (
              <div key={l}>
                <div className={`text-sm font-bold ${['text-[#2E9E63]', 'text-[#CA8A04]', 'text-[#2F6FAE]'][i]} font-[family-name:var(--font-heading)]`}>{v}</div>
                <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#9A9AA3]">{l}</div>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-3 sm:w-44 sm:shrink-0 sm:flex-col sm:items-end sm:border-l sm:border-[rgba(10,10,18,0.08)] sm:pl-5">
            <div className="sm:text-right">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#9A9AA3]">
                {project.type === 'distress' ? 'Distress price' : 'Starting from'}
              </p>
              {project.type === 'distress' && project.marketPrice && (
                <p className="text-xs leading-none text-[#9A9AA3] line-through">AED {project.marketPrice.toLocaleString()}</p>
              )}
              <p className="text-xl font-bold leading-tight text-[#0A0A12] sm:text-2xl font-[family-name:var(--font-heading)]">
                AED {compact(project.priceFrom)}
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[rgba(10,10,18,0.14)] text-[#0A0A12] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#C49A3C]">
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
