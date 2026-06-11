// Developer profile card. prototype3 ONLY.
export default function Developer({ developer }) {
  return (
    <section className="py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Trusted Builder</span>
          <h2 className="font-serif text-4xl mt-3 text-black">The developer</h2>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-6 md:p-8 md:grid md:grid-cols-[auto_1fr] md:gap-8 md:items-start shadow-sm">
          <div className="w-28 h-28 rounded-3xl bg-black text-white flex items-center justify-center font-serif text-4xl font-semibold flex-shrink-0 mb-6 md:mb-0">{developer.logo}</div>
          <div>
            <h3 className="font-serif text-2xl text-black">{developer.name}</h3>
            <div className="text-amber-600 text-sm font-semibold mt-1">{developer.tag}</div>
            <p className="text-slate-700 text-sm mt-3 leading-relaxed">{developer.bio}</p>
            <div className="flex flex-wrap gap-6 mt-4">
              {developer.stats.map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-xl text-amber-600">{s.n}</div>
                  <div className="text-xs text-slate-500 font-semibold mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
