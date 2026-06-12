// Sticky developer / launch-price card with lead CTAs. prototype1 ONLY.
// "Register Your Interest" opens a popup form; WhatsApp/Call are mock links.
import { Phone, MessageCircle, BadgeCheck } from 'lucide-react';
import DevLogo from './DevLogo';
import RegisterInterest from './RegisterInterest';
import Money from './Money';

export default function DeveloperCard({ project }) {
  const { developer, developerTag, developerLogo, launch } = project;
  const downPct = project.payment?.milestones?.[0]?.percent;
  const handover = project.highlights?.find((h) => h.id === 'handover')?.value;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
      {/* developer header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <DevLogo src={developerLogo} name={developer} className="h-12 w-12" />
        <div className="min-w-0">
          <p className="flex items-center gap-1 truncate text-sm font-semibold text-[#1A1A1A]">
            {developer}
            <BadgeCheck size={15} className="shrink-0 text-[#8C6A57]" />
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9a917f]">{developerTag}</p>
        </div>
      </div>

      {/* price block */}
      <div className="bg-gradient-to-b from-[#FBF8F4] to-white px-5 py-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a917f]">{launch.label}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="font-serif text-[32px] leading-none text-[#1A1A1A]">
            <Money>{`AED ${launch.price.toLocaleString()}`}</Money>
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {downPct && (
            <span className="rounded-full bg-[#F4EFE6] px-2.5 py-1 text-[12px] font-medium text-[#8C6A57]">
              {downPct}% Booking
            </span>
          )}
          {handover && (
            <span className="rounded-full bg-[#E7F2EC] px-2.5 py-1 text-[12px] font-medium text-[#1F8A5B]">
              Handover {handover}
            </span>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="px-5 pb-5">
        <RegisterInterest projectName={project.name} />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/10 px-3 py-2.5 text-[13px] font-medium text-[#1A1A1A] hover:bg-black/[0.03] transition-colors"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/10 px-3 py-2.5 text-[13px] font-medium text-[#1A1A1A] hover:bg-black/[0.03] transition-colors"
          >
            <Phone size={15} className="text-[#8C6A57]" />
            Call
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] text-[#9a917f]">
          Free consultation · No obligation
        </p>
      </div>
    </div>
  );
}
