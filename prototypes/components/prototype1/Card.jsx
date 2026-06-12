// prototype1 featured-project card. Only prototype1 imports this. Mock only.
import Link from 'next/link';
import Dirham from '@/components/prototype1/Dirham';

export default function Card({ project }) {
  // Keep the existing mock detail flow reachable from the home cards.
  const href = `/prototype1/project/${project.slug || 'one-by-nine'}`;
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_12px_36px_-14px_rgba(20,18,15,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B89149]/30 hover:shadow-[0_26px_55px_-15px_rgba(184,145,73,0.35)]"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.img}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[#B89149] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#1a1a1a] backdrop-blur">
          {project.area}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-[#1a1a1a] transition-colors group-hover:text-[#B89149]">
          {project.name}
        </h3>
        <p className="mt-0.5 text-xs text-gray-400">by {project.developer}</p>
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
          <span>
            <span className="block text-base font-semibold text-[#B89149]">
              <Dirham className="mr-0.5" />
              {project.price}
            </span>
            <span className="block text-[10px] text-gray-400">Starting Price</span>
          </span>
          <span className="text-right">
            <span className="block text-sm font-semibold text-[#1a1a1a]">{project.handover}</span>
            <span className="block text-[10px] text-gray-400">Handover</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
