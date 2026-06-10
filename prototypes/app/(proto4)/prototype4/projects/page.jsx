import Card from '@/components/prototype4/Card';
import { projects } from '@/mock/prototype4/projects';

export const metadata = { title: 'Projects — Fortune Realty' };

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-14">
      <header className="max-w-2xl">
        <span className="block text-[12px] font-black tracking-[0.2em] text-[#80603f] mb-2">01 —</span>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
          Off-Plan Projects
        </h1>
        <p className="mt-3 text-[#574e44] leading-relaxed">
          Hand-picked off-plan developments across Dubai&apos;s most sought-after communities — from waterfront towers to downtown landmarks.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
