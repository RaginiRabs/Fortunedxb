// Amenities grid. prototype3 ONLY.
export default function Amenities({ amenities }) {
  return (
    <section className="py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Lifestyle</span>
          <h2 className="font-serif text-4xl mt-3 text-black">World-class amenities</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {amenities.map((a, i) => (
            <div key={i} className="bg-white border border-black/10 rounded-lg p-4 hover:border-amber-600/40 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={a.icon} />
                </svg>
              </div>
              <h4 className="text-sm font-semibold text-black">{a.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{a.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
