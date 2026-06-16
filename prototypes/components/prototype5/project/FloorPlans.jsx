'use client';

// Floor Plans & Layouts — accordion grouped by bedroom type, with a detail
// modal showing the full plan + area breakdown. prototype5 ONLY. Mock.
import { useEffect, useState } from 'react';
import { ChevronDown, Layers, Maximize2, X, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import SmartImg from './SmartImg';
import Money from './Money';

// Schematic placeholder shown until the real plan image is dropped in /public.
function PlanSketch({ small = false }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#F4EFE6]">
      <svg viewBox="0 0 120 120" className={small ? 'h-8 w-8' : 'h-28 w-28'} fill="none" stroke="#B0905E" strokeWidth="3">
        <rect x="14" y="14" width="92" height="92" rx="3" strokeOpacity="0.5" />
        <line x1="60" y1="14" x2="60" y2="106" strokeOpacity="0.4" />
        <line x1="14" y1="64" x2="106" y2="64" strokeOpacity="0.4" />
        <rect x="22" y="22" width="30" height="34" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}

// Plan image (any extension) → schematic placeholder if none is found.
function PlanImage({ layout, className, small }) {
  return (
    <SmartImg
      base={layout.img}
      alt={`${layout.name} floor plan`}
      className={className}
      onAllFail={<PlanSketch small={small} />}
    />
  );
}

function Group({ group, open, onToggle, onOpenPlan }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-4 text-left hover:bg-black/[0.015] transition-colors"
      >
        <div className="flex-1">
          <span className="text-base font-semibold text-[#1A1A1A]">{group.type}</span>
          <span className="ml-2 text-sm text-[#8a8a8a]">from <Money>{group.fromPrice}</Money></span>
        </div>
        <span className="hidden items-center gap-1.5 text-[13px] text-[#6B6B6B] sm:inline-flex">
          <Maximize2 size={13} />
          {group.sizeRange}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EFE6] px-2.5 py-1 text-[12px] font-medium text-[#B0905E]">
          <Layers size={12} />
          {group.count}
        </span>
        <ChevronDown size={18} className={`text-[#9a917f] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="border-t border-black/[0.06]">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-[#9a917f]">
            <span>Layout type</span>
            <span>Size</span>
            <span>Floor plan</span>
          </div>
          {group.layouts.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onOpenPlan(l)}
              className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-x-4 border-t border-black/[0.04] px-4 py-3 text-left text-sm transition-colors hover:bg-black/[0.015]"
            >
              <span className="font-medium text-[#3A3A3A]">{l.name}</span>
              <span className="text-[#6B6B6B]">{l.size}</span>
              <span className="h-11 w-14 overflow-hidden rounded-md border border-black/[0.06]">
                <PlanImage layout={l} small className="h-full w-full object-cover" />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PlanModal({ list, index, setIndex, fromPrice, groupType, onClose }) {
  const l = list[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % list.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + list.length) % list.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [list.length, onClose, setIndex]);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm" onClick={onClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* plan image area + area summary */}
        <div className="relative flex-1 overflow-auto bg-[#FBFAF7] p-4">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-[#6B6B6B] shadow hover:bg-white"
          >
            <X size={18} />
          </button>

          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-[1fr_180px]">
            <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border border-black/[0.06] bg-white">
              <PlanImage layout={l} className="max-h-[60vh] w-full object-contain" />
            </div>
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#9a917f]">{groupType} · {l.name}</p>
              <div className="space-y-2">
                <Area label="Suite Area" value={l.suite} />
                <Area label={`${l.outdoorLabel} Area`} value={l.outdoor} />
                <Area label="Total Area" value={l.total} strong />
              </div>
              <div className="flex items-center gap-1.5 pt-1 text-[12px] text-[#9a917f]">
                <Compass size={13} /> Orientation indicative
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar: nav + identity + price */}
        <div className="flex items-center justify-between gap-3 border-t border-black/[0.07] px-5 py-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)} className="rounded-full border border-black/10 p-1.5 hover:bg-black/[0.04]">
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => setIndex((i) => (i + 1) % list.length)} className="rounded-full border border-black/10 p-1.5 hover:bg-black/[0.04]">
              <ChevronRight size={16} />
            </button>
            <div className="ml-2">
              <p className="text-sm font-semibold text-[#1A1A1A]">{l.name}</p>
              <p className="text-[12px] text-[#9a917f]">{groupType} · {l.size}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#9a917f]">Starting from</p>
            <p className="text-lg font-semibold text-[#1A1A1A]"><Money>{fromPrice}</Money></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Area({ label, value, strong }) {
  return (
    <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${strong ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-black/[0.06]'}`}>
      <span className={`text-[12px] ${strong ? 'text-white/70' : 'text-[#9a917f]'}`}>{label}</span>
      <span className="text-sm font-semibold">{value.toLocaleString()} sqft</span>
    </div>
  );
}

export default function FloorPlans({ floorPlans }) {
  const [openId, setOpenId] = useState(floorPlans[0]?.id);
  const [modal, setModal] = useState(null); // { group, index }

  const openPlan = (group, l) => {
    const index = group.layouts.findIndex((x) => x.id === l.id);
    setModal({ group, index });
  };

  return (
    <section id="floor-plans" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Floor Plans &amp; Layouts</h2>
      <div className="mt-5 space-y-3">
        {floorPlans.map((g) => (
          <Group
            key={g.id}
            group={g}
            open={openId === g.id}
            onToggle={() => setOpenId(openId === g.id ? null : g.id)}
            onOpenPlan={(l) => openPlan(g, l)}
          />
        ))}
      </div>

      {modal && (
        <PlanModal
          list={modal.group.layouts}
          index={modal.index}
          setIndex={(updater) =>
            setModal((m) => ({ ...m, index: typeof updater === 'function' ? updater(m.index) : updater }))
          }
          fromPrice={modal.group.fromPrice}
          groupType={modal.group.type}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
