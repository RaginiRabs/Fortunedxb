// Trust strip — names of leading Dubai developers Fortune works with.
const DEVELOPERS = [
  'Emaar', 'Sobha Realty', 'Meraas', 'DAMAC', 'Select Group', 'Nakheel',
  'Omniyat', 'Ellington', 'Binghatti', 'Azizi', 'Danube', 'Meydan',
];

export default function DevelopersStrip() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-12">
      <div className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-[#FAF7F3] px-6 py-8 sm:px-10">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E5E66]">
          Trusted across Dubai&apos;s leading developers
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {DEVELOPERS.map((d) => (
            <li
              key={d}
              className="text-lg font-bold tracking-tight text-[#2E231B]/55 transition-colors hover:text-[#80603f] sm:text-xl font-[family-name:var(--font-heading)]"
            >
              {d}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
