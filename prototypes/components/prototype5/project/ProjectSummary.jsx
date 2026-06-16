// Project title, location, developer, badge + construction progress bar
// and a "Chess View" (unit matrix) launcher. prototype5 ONLY. Mock.
import { MapPin } from 'lucide-react';
import ChessView from './ChessView';

export default function ProjectSummary({ project }) {
  const { name, location, developer, badge, construction } = project;
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-[#1A1A1A]">
        {name}
      </h1>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#6B6B6B]">
        <span className="inline-flex items-center gap-1">
          <MapPin size={14} className="text-[#B0905E]" />
          {location}
        </span>
        <span className="text-black/20">·</span>
        <span>{developer}</span>
        <span className="rounded-full bg-[#E7F2EC] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1F8A5B]">
          {badge}
        </span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[13px]">
          <span className="inline-flex items-center gap-1.5 text-[#4B4B4B]">
            <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
            {construction.label}
          </span>
          <span className="font-semibold text-[#1A1A1A]">
            {construction.percent}% completed
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#16A34A] to-[#10B981]"
            style={{ width: `${construction.percent}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <ChessView chess={project.chess} />
      </div>
    </div>
  );
}
