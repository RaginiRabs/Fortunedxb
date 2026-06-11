'use client';

import Link from 'next/link';

const HEAD = '"Montserrat", "Montserrat Fallback", sans-serif';
const BODY = '"Work Sans", "Work Sans Fallback", sans-serif';

// Type accent — gold for off-plan/resale, red for distress
const typeAccent = {
  'off-plan': { chip: 'bg-[#C49A3C] text-[#0A0A12]', label: 'Off-Plan' },
  resale: { chip: 'bg-white/95 text-[#15151C] ring-1 ring-inset ring-black/10', label: 'Resale' },
  distress: { chip: 'bg-[#C83C3C] text-white', label: 'Distress' },
};

// AED 400,000 -> "400K" · AED 1,300,000 -> "1.3M"
const compact = (n) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : `${Math.round(n / 1000)}K`;

export default function Card({ project }) {
  const accent = typeAccent[project.type] || typeAccent['off-plan'];
  const savings = project.marketPrice ? project.marketPrice - project.priceFrom : 0;

  // Three most decision-relevant facts per type — Handover only shows for off-plan
  const specs =
    project.type === 'distress'
      ? [
          { label: 'Discount', value: `${project.discount}%`, accent: 'red' },
          { label: 'You save', value: `AED ${compact(savings)}`, accent: 'green' },
          { label: 'Yield', value: project.yield },
        ]
      : project.type === 'resale'
        ? [
            { label: 'Status', value: 'Ready' },
            { label: 'Built', value: project.builtYear },
            { label: 'Yield', value: project.yield },
          ]
        : [
            { label: 'Handover', value: project.handover },
            { label: 'Payment', value: project.paymentPlan },
            { label: 'Yield', value: project.yield },
          ];

  return (
    <Link
      href={`/prototype3/${project.slug || 'marina-vista'}`}
      className="group block h-full"
      style={{ fontFamily: BODY }}
    >
      <article className="relative flex h-full flex-col rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white shadow-[0_8px_30px_-18px_rgba(10,10,18,0.18)] transition-shadow duration-500 hover:shadow-[0_20px_44px_-22px_rgba(10,10,18,0.26)]">

        {/* Image */}
        <div className="relative h-44 overflow-hidden rounded-t-3xl sm:h-52">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12]/65 via-[#0A0A12]/5 to-[#0A0A12]/15" />

          {/* category badge — always on the image */}
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${accent.chip}`}>
            {accent.label}
          </span>
          {/* status — on image top-right (tablet/desktop only) */}
          <span className="absolute right-4 top-4 hidden rounded-full bg-[#0A0A12]/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md sm:block">
            {project.status}
          </span>

          {/* price on image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                {project.type === 'distress' ? 'Distress price' : 'Starting from'}
              </p>
              {project.type === 'distress' && project.marketPrice && (
                <p className="text-xs leading-none text-white/55 line-through">
                  AED {project.marketPrice.toLocaleString()}
                </p>
              )}
              <p className="text-[22px] leading-tight sm:text-[26px]" style={{ fontFamily: HEAD, fontWeight: 600 }}>
                AED {project.priceFrom.toLocaleString()}
              </p>
            </div>

            {/* catchy savings flag for distress */}
            {project.type === 'distress' && savings > 0 && (
              <span className="mb-1 hidden rounded-lg bg-[#C83C3C] px-2.5 py-1 text-[11px] font-semibold tracking-tight shadow-lg sm:inline-block">
                Save AED {compact(savings)}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* status — out of the image on mobile for a cleaner photo */}
          <div className="mb-3 sm:hidden">
            <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-[#7A7A85]">
              {project.status}
            </span>
          </div>

          {/* developer · area */}
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A3C]">
            {project.developer}
            <span className="h-1 w-1 rounded-full bg-[#C49A3C]/50" />
            <span className="font-medium normal-case tracking-normal text-[#7A7A85]">{project.area}</span>
          </div>

          {/* name — hero */}
          <h3
            className="mt-1.5 text-[21px] leading-[1.08] tracking-[-0.02em] text-[#0A0A12] transition-colors duration-300 group-hover:text-[#9A7625] sm:text-[24px]"
            style={{ fontFamily: HEAD, fontWeight: 600 }}
          >
            {project.name}
          </h3>

          {/* beds · size — key configuration */}
          <p className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-[#2A2A32]">
            {project.beds}
            <span className="h-3 w-px bg-[rgba(10,10,18,0.15)]" />
            {project.size}
          </p>

          {/* highlight — supporting copy (hidden on mobile to reduce clutter) */}
          <p className="mt-2 hidden text-[12.5px] leading-relaxed text-[#9A9AA3] sm:line-clamp-2">{project.highlight}</p>

          {/* divided spec strip — 3 decision facts */}
          <div className="mt-3.5 grid grid-cols-3 divide-x divide-[rgba(10,10,18,0.10)] overflow-hidden rounded-xl border border-[rgba(10,10,18,0.10)] bg-[#FAFAF8] sm:mt-4">
            {specs.map((s) => (
              <div key={s.label} className="px-2.5 py-2.5 sm:px-3 sm:py-3">
                <p className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.08em] text-[#9A9AA3]">{s.label}</p>
                <p
                  className={`mt-1.5 whitespace-nowrap text-[15px] font-bold leading-none ${s.accent === 'red' ? 'text-[#C83C3C]' : s.accent === 'green' ? 'text-[#2E9E63]' : 'text-[#0A0A12]'}`}
                  style={{ fontFamily: HEAD }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* footer CTA */}
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0A0A12]">
              View details
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(10,10,18,0.14)] text-[#0A0A12] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#C49A3C]">
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
