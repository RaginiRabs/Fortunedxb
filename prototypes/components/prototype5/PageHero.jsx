// prototype5 shared page hero — consistent banner for Projects / Distress / Resale. Mock only.
export default function PageHero({ eyebrow, title, highlight, sub, stats = [], image }) {
  return (
    <section className="relative -mt-[88px] overflow-hidden bg-[#0a1320]">
      <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1320] via-[#0a1320]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1320]/90 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-[140px] md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c4a98f]">{eyebrow}</p>
        <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
          {title} {highlight && <span className="text-[#c4a98f]">{highlight}</span>}
        </h1>
        {sub && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-gray-300">{sub}</p>}
        {stats.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5 text-white">
                <s.icon className="h-6 w-6 text-[#c4a98f]" strokeWidth={1.6} />
                <span>
                  <span className="block text-lg font-bold leading-none">{s.value}</span>
                  <span className="text-[11px] text-gray-400">{s.label}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
