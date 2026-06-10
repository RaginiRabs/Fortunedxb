// Construction timeline — horizontal milestones with status. prototype1 ONLY. Mock.
import { Check } from 'lucide-react';

const DOT = {
  done: 'bg-[#16A34A] text-white border-[#16A34A]',
  current: 'bg-[#B0905E] text-white border-[#B0905E] ring-4 ring-[#B0905E]/20',
  upcoming: 'bg-white text-[#c9c2b4] border-black/15',
};

export default function Timeline({ timeline }) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9a917f]">
        Construction Timeline
      </h3>
      <ol className="mt-5 grid gap-6 sm:grid-cols-4">
        {timeline.map((m, i) => (
          <li key={m.id} className="relative">
            {i < timeline.length - 1 && (
              <span className="absolute left-[14px] top-3.5 hidden h-px w-full bg-black/10 sm:block" />
            )}
            <span
              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold ${DOT[m.status]}`}
            >
              {m.status === 'done' ? <Check size={14} /> : i + 1}
            </span>
            <p className="mt-3 text-sm font-medium text-[#1A1A1A]">{m.label}</p>
            <p className="text-[13px] text-[#6B6B6B]">{m.date}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
