// Quick facts strip — sits directly under the gallery. prototype3 ONLY.
export default function QuickFacts({ facts }) {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-black/10 bg-white sm:grid-cols-4">
      {facts.map((fact, i) => (
        <div key={i} className="border-b border-r border-black/8 p-4 last:border-r-0 sm:border-b-0 sm:px-5 sm:py-5 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9A9AA3]">{fact.k}</div>
          <div className="mt-1 text-xl font-bold text-[#0A0A12] font-[family-name:var(--font-heading)]">{fact.v}</div>
        </div>
      ))}
    </div>
  );
}
