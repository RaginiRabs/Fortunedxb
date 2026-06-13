// Trust strip — two infinite marquee rows scrolling in opposite directions,
// set on a slight diagonal for a dynamic, premium "logo wall" feel.
const DEVELOPERS = [
  'Emaar', 'Sobha Realty', 'Meraas', 'DAMAC', 'Select Group', 'Nakheel',
  'Omniyat', 'Ellington', 'Binghatti', 'Azizi', 'Danube', 'Meydan',
];

function Row({ items, reverse }) {
  const seq = [...items, ...items]; // doubled for a seamless -50% loop
  return (
    <ul
      className={`flex w-max items-center hover:[animation-play-state:paused] motion-reduce:animate-none ${
        reverse ? 'animate-[p3marq_46s_linear_infinite_reverse]' : 'animate-[p3marq_46s_linear_infinite]'
      }`}
    >
      {seq.map((d, i) => (
        <li key={i} className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
          <span className="whitespace-nowrap text-2xl font-bold tracking-tight text-[#2E231B]/35 transition-colors hover:text-[#80603f] sm:text-[2rem] font-[family-name:var(--font-heading)]">
            {d}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C49A3C]/60" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function DevelopersStrip() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E5E66]">
        Trusted across Dubai&apos;s leading developers
      </p>

      <div className="relative overflow-hidden rounded-3xl border border-[rgba(10,10,18,0.08)] bg-[#FAF7F3] py-9">
        {/* edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#FAF7F3] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#FAF7F3] to-transparent sm:w-28" />

        <div className="-skew-y-2 space-y-3 sm:space-y-4">
          <Row items={DEVELOPERS} reverse={false} />
          <Row items={[...DEVELOPERS].reverse()} reverse />
        </div>
      </div>

      <style>{`@keyframes p3marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
