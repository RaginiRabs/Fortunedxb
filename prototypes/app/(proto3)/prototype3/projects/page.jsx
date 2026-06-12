import SearchCards from '@/components/prototype3/SearchCards';
import { projects } from '@/mock/prototype3/projects';

export const metadata = { title: 'Projects — Fortune' };

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-14">
      <header className="mb-8 max-w-2xl">
        <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">
          Browse
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-[#0A0A12] md:text-5xl font-[family-name:var(--font-heading)]">
          Projects
        </h1>
        <p className="mt-3 leading-relaxed text-[#4C4C56]">
          Hand-picked off-plan launches and ready resales across Dubai&apos;s most sought-after communities.
        </p>
      </header>

      <SearchCards projects={projects} />
    </section>
  );
}
