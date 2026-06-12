// prototype1 featured projects grid. Mock only.
import Card from '@/components/prototype1/Card';
import { featuredProjects } from '@/mock/prototype1/home';

export default function FeaturedProjects() {
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B89149]">Handpicked</p>
          <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">Featured Projects</h2>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full border border-[#B89149]/40 bg-white px-4 py-2 text-sm text-[#B89149] transition-colors hover:bg-[#B89149] hover:text-white"
        >
          View All Projects
        </a>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.slice(0, 3).map((p) => (
          <Card key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
