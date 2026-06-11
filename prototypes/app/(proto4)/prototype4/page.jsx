import Card from '@/components/prototype4/Card';
import { projects } from '@/mock/prototype4/projects';

export default function Prototype4Home() {
  // Select different projects to showcase the 3 distinct card designs
  const offplanProject = projects.find((p) => p.id === 1);
  const distressProject = projects.find((p) => p.id === 4);
  const resaleProject = projects.find((p) => p.id === 2);

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-16 min-h-[80vh]">
      <header className="max-w-3xl mb-12 text-center md:text-left">
        <span className="block text-[12px] font-black tracking-[0.2em] text-[#80603f] mb-2">PROTOTYPE 4 —</span>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
          Redesigned Project Cards
        </h1>
        <p className="mt-3 text-[#574e44] leading-relaxed">
          Compare our three distinct property card formats tailored specifically for the Dubai real estate market: Off-Plan timelines, high-impact Distress Deals, and yield-focused ready Resales.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {/* Off-Plan Card Showcase */}
        {offplanProject && (
          <div className="flex flex-col h-full space-y-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-[#80603f] px-1 shrink-0">
              01 · Off-Plan Design
            </div>
            <div className="flex-1">
              <Card project={offplanProject} variant="offplan" />
            </div>
          </div>
        )}

        {/* Distress Deal Card Showcase */}
        {distressProject && (
          <div className="flex flex-col h-full space-y-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-red-600 px-1 shrink-0">
              02 · Distress Deal Design
            </div>
            <div className="flex-1">
              <Card project={distressProject} variant="distress" discount={22} />
            </div>
          </div>
        )}

        {/* Resale Card Showcase */}
        {resaleProject && (
          <div className="flex flex-col h-full space-y-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-indigo-950 px-1 shrink-0">
              03 · Resale / Ready Design
            </div>
            <div className="flex-1">
              <Card project={resaleProject} variant="resale" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
