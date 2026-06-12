// Overview + video. prototype3 ONLY.
'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';

export default function Overview({ project }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-12">
      <div className="wrap max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <span className="eyebrow text-xs uppercase tracking-widest text-amber-600">The Address</span>
          <h2 className="font-serif text-4xl mt-3 text-black">A new icon on the water</h2>
        </div>

        <p className="text-slate-700 text-base leading-relaxed mb-6">{project.overview}</p>

        {/* Video */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-black/10 shadow-lg aspect-video cursor-pointer group" onClick={() => setPlaying(true)}>
          <img src={project.videoThumb} alt="Project video" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-18 h-18 rounded-full bg-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play size={24} className="text-black fill-black ml-1" />
            </div>
          </div>
          <span className="absolute left-4 bottom-3 bg-black/45 backdrop-blur-2xl px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20">▶ Watch the project film · 2:14</span>
          {playing && (
            <iframe src={`https://www.youtube.com/embed/${project.videoYT}?autoplay=1&rel=0`} className="absolute inset-0 w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
          )}
        </div>
      </div>
    </section>
  );
}
