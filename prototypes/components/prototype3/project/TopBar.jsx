// Topbar — back, brand, actions. prototype3 ONLY.
'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';

export default function TopBar({ project }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 60);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-60 flex items-center justify-between px-4 py-3 transition-all ${solid ? 'bg-white/82 backdrop-blur-[14px] border-b border-black/10 shadow-sm' : ''}`}>
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/72 backdrop-blur-[8px] border border-black/16 shadow-sm hover:bg-white transition-colors">
        <ArrowLeft size={18} className="text-black/70" />
      </button>
      <span className={`font-serif text-sm tracking-wider text-black transition-opacity ${solid ? 'opacity-100' : 'opacity-0'}`}>{project.name.split(' ')[0]}</span>
      <div className="flex gap-2">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/72 backdrop-blur-[8px] border border-black/16 shadow-sm hover:bg-white transition-colors">
          <Bookmark size={18} className="text-black/70" />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/72 backdrop-blur-[8px] border border-black/16 shadow-sm hover:bg-white transition-colors">
          <Share2 size={18} className="text-black/70" />
        </button>
      </div>
    </header>
  );
}
