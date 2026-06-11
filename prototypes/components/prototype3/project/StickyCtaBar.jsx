// Sticky mobile CTA bar. prototype3 ONLY.
import { Phone } from 'lucide-react';

export default function StickyCtaBar({ project }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-2xl border-t border-black/10 shadow-lg">
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Starting from</div>
        <div className="font-serif text-lg text-black whitespace-nowrap">AED {(project.priceFrom / 1000000).toFixed(2)}M</div>
      </div>
      <button className="px-3 py-3 rounded-full border border-black/16 bg-white hover:bg-slate-50 transition-colors">
        <Phone size={18} className="text-black" />
      </button>
      <button className="px-6 py-3 rounded-full bg-amber-600 text-black font-semibold text-sm hover:bg-amber-700 transition-colors">Register Interest</button>
    </div>
  );
}
