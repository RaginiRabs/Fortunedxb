// Quick facts strip. prototype3 ONLY.
export default function QuickFacts({ facts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border-y border-black/10 mt-8">
      {facts.map((fact, i) => (
        <div key={i} className="bg-white p-5 md:px-6">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{fact.k}</div>
          <div className="font-serif text-2xl mt-1.5 text-black">{fact.v}</div>
        </div>
      ))}
    </div>
  );
}
