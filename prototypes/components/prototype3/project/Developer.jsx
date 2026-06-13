// Developer profile card — content intact, laid out vertically so it fits both
// the desktop sticky rail and full-width mobile. prototype3 ONLY.
export default function Developer({ developer }) {
  return (
    <section className="py-6 sm:py-8 lg:py-0">
      <div className="mb-5 lg:mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Trusted Builder</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl lg:text-xl">The developer</h2>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.25)] sm:p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#0A0A12] text-2xl font-semibold text-white font-[family-name:var(--font-heading)]">
            {developer.logo}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-[#0A0A12]">{developer.name}</h3>
            <div className="mt-0.5 text-[13px] font-semibold text-[#C49A3C]">{developer.tag}</div>
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-[#55555E]">{developer.bio}</p>

        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-black/8 pt-4">
          {developer.stats.map((s, i) => (
            <div key={i}>
              <div className="text-lg font-bold text-[#80603f] font-[family-name:var(--font-heading)]">{s.n}</div>
              <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#9A9AA3]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
