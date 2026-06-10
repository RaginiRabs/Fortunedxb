// Developer profile — about, stats + other projects. prototype1 ONLY. Mock.
import { ArrowUpRight } from 'lucide-react';
import DevLogo from './DevLogo';

export default function DeveloperProfile({ profile }) {
  return (
    <section id="developer" className="scroll-mt-24">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1 rounded-full bg-[#8C6A57]" />
        <h2 className="font-serif text-2xl text-[#1A1A1A]">About the Developer</h2>
      </div>

      <div className="mt-5 rounded-2xl border border-black/[0.06] bg-white p-5">
        <div className="flex items-center gap-3">
          <DevLogo src={profile.logo} name={profile.name} className="h-14 w-14" />
          <p className="text-lg font-semibold text-[#1A1A1A]">{profile.name}</p>
        </div>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#4B4B4B]">{profile.about}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-[#FBFAF7] px-4 py-3">
              <p className="text-xl font-semibold text-[#1A1A1A]">{s.value}</p>
              <p className="text-[12px] text-[#9a917f]">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[#9a917f]">
          Other projects by {profile.name}
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {profile.otherProjects.map((p) => (
            <div
              key={p.id}
              className="group flex items-center justify-between rounded-xl border border-black/[0.06] px-4 py-3 transition-colors hover:border-[#B0905E]/50"
            >
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">{p.name}</p>
                <p className="text-[12px] text-[#9a917f]">{p.area} · from {p.priceFrom}</p>
              </div>
              <ArrowUpRight size={16} className="text-[#c9c2b4] transition-colors group-hover:text-[#B0905E]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
