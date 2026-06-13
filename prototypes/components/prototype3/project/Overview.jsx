// The Address — concise intro + inline video (plays in place, never navigates
// away). prototype3 ONLY. Column-agnostic (used in the desktop sticky rail too).
'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';

export default function Overview({ project }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-6 sm:py-8 lg:py-0">
      <div className="mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">The Address</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl lg:text-xl">A new icon on the water</h2>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-[#55555E] line-clamp-4">{project.overview}</p>

      {/* Inline video — plays here, never opens a new page */}
      <div className="group relative aspect-video overflow-hidden rounded-2xl border border-black/10 bg-slate-100 shadow-[0_8px_30px_-20px_rgba(10,10,18,0.4)]">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${project.videoYT}?autoplay=1&rel=0&modestbranding=1`}
            title="Project film"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play project film"
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <img src={project.videoThumb} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#C49A3C] shadow-lg transition-transform group-hover:scale-110">
              <Play size={22} className="ml-0.5 fill-black text-black" />
            </span>
            <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              Watch the film · 2:14
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
