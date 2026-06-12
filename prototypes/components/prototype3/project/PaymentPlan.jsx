// Payment plan steps. prototype3 ONLY.
export default function PaymentPlan({ payment }) {
  return (
    <section className="py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">Flexible Terms</span>
          <h2 className="font-serif text-4xl mt-3 text-black">Payment plan</h2>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl">A 60 / 40 structure — pay as you build, balance on handover.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-4">
          {payment.steps.map((s, i) => (
            <div key={i} className="bg-white border border-black/10 rounded-lg p-5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600" />
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{s.stage}</div>
              <div className="font-serif text-4xl text-amber-600 mt-2">{s.pct}<span className="text-lg">%</span></div>
              <div className="text-sm text-slate-600 mt-2">{s.when}</div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span className="text-sm text-amber-900">{payment.note}</span>
        </div>
      </div>
    </section>
  );
}
