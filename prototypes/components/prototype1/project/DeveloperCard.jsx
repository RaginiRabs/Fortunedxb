// Sticky developer / launch-price card with a lead CTA. prototype1 ONLY.
// "Register Your Interest" opens a lead-capture popup form.
import DevLogo from './DevLogo';
import RegisterInterest from './RegisterInterest';

export default function DeveloperCard({ project }) {
  const { developer, developerTag, developerLogo, launch } = project;

  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <DevLogo src={developerLogo} name={developer} className="h-12 w-12" />
        <div>
          <p className="text-sm font-semibold text-[#1A1A1A]">{developer}</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9a917f]">
            {developerTag}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-black/[0.06] pt-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a917f]">
          {launch.label}
        </p>
        <p className="mt-1 font-serif text-3xl text-[#1A1A1A]">
          AED {launch.price.toLocaleString()}
        </p>
      </div>

      <RegisterInterest projectName={project.name} />
    </div>
  );
}
