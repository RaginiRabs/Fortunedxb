import ProjectsList from '@/components/prototype4/ProjectsList';
import { projects } from '@/mock/prototype4/projects';

export const metadata = { title: 'Properties — Fortune Realty' };

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-14">
      <header className="max-w-2xl mb-12">
        <span className="block text-[12px] font-black tracking-[0.2em] text-[#80603f] mb-2">01 —</span>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
          Dubai Properties
        </h1>
        <p className="mt-3 text-[#574e44] leading-relaxed">
          Explore our hand-picked portfolio of off-plan developments and prime ready resale units across Dubai&apos;s most sought-after communities.
        </p>
      </header>

      <ProjectsList projects={projects} />
    </section>
  );
}
