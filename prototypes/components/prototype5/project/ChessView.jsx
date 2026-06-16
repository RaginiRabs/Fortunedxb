'use client';

// Chess View — unit availability matrix (floors × units) per tower, in a modal.
// prototype5 ONLY. Mock data. Inspired by investmentmap.ai's chess view.
import { useEffect, useState } from 'react';
import { Grid3x3, X, ChevronDown } from 'lucide-react';
import Money from './Money';

const money = (n) => {
  if (n >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  return `AED ${Math.round(n / 1000)}K`;
};

function Matrix({ tower, selected, onSelect }) {
  const cols = tower.maxUnits;
  return (
    <div className="overflow-auto rounded-xl border border-black/[0.08]">
      <div
        className="grid min-w-[760px]"
        style={{ gridTemplateColumns: `84px repeat(${cols}, minmax(120px, 1fr))` }}
      >
        {/* header row */}
        <div className="sticky left-0 top-0 z-20 border-b border-r border-black/[0.08] bg-white" />
        {Array.from({ length: cols }, (_, i) => (
          <div
            key={i}
            className="sticky top-0 z-10 border-b border-black/[0.06] bg-white px-3 py-3 text-center text-[13px] font-semibold text-[#1A1A1A]"
          >
            Unit
          </div>
        ))}

        {/* floor rows */}
        {tower.floors.map((row) => (
          <FloorRow key={row.floor} row={row} selected={selected} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function FloorRow({ row, selected, onSelect }) {
  return (
    <>
      <div className="sticky left-0 z-10 flex items-center justify-center border-b border-r border-black/[0.06] bg-white px-2 text-[13px] font-semibold text-[#5B5B5B]">
        Floor {row.floor}
      </div>
      {row.units.map((u) => {
        if (u.empty) {
          return <div key={u.id} className="border-b border-l border-black/[0.04] bg-[#F2F2F0]" />;
        }
        const isSel = selected === u.id;
        return (
          <button
            key={u.id}
            type="button"
            onClick={() => onSelect(isSel ? null : u.id)}
            title={`Unit ${u.label}`}
            className={`relative border-b border-l px-3 py-4 text-center transition-colors ${
              isSel ? 'z-10 border-2 border-[#2563EB] bg-[#E1ECFD]' : 'border-black/[0.04] bg-[#EAF2FE] hover:bg-[#E1ECFD]'
            }`}
          >
            {u.sold ? (
              <>
                <p className="text-[16px] font-semibold text-[#1A1A1A]"><Money>{money(u.price)}</Money></p>
                <p className="mt-0.5 text-[11px] text-[#7a7a72]">
                  {u.sqft.toLocaleString()} sqft · {u.perSqft.toLocaleString()}/sqft
                </p>
              </>
            ) : (
              <>
                <p className="text-[15px] font-medium text-[#6B7280]">Never Sold</p>
                <p className="mt-0.5 text-[11px] text-[#9a9a92]">{u.sqft.toLocaleString()} sqft</p>
              </>
            )}
          </button>
        );
      })}
    </>
  );
}

export default function ChessView({ chess }) {
  const [open, setOpen] = useState(false);
  const [towerId, setTowerId] = useState(chess.towers[0].id);
  const [pickTower, setPickTower] = useState(false);
  const [selected, setSelected] = useState(null);
  const tower = chess.towers.find((t) => t.id === towerId) || chess.towers[0];

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-3.5 py-2 text-[13px] font-medium text-white hover:bg-black transition-colors"
      >
        <Grid3x3 size={15} />
        Chess View
      </button>

      {open && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.07] px-5 py-4">
              <div>
                <h3 className="font-serif text-xl text-[#1A1A1A]">Chess View</h3>
                <p className="text-[12px] text-[#9a917f]">Live unit availability by floor</p>
              </div>

              <div className="flex items-center gap-3">
                {/* tower selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPickTower((p) => !p)}
                    className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3.5 py-2 text-[13px] font-medium text-[#1A1A1A] hover:bg-black/[0.03]"
                  >
                    {tower.name}
                    <ChevronDown size={15} className={`transition-transform ${pickTower ? 'rotate-180' : ''}`} />
                  </button>
                  {pickTower && (
                    <div className="absolute right-0 z-10 mt-2 w-60 rounded-xl border border-black/10 bg-white p-1.5 shadow-lg">
                      {chess.towers.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setTowerId(t.id);
                            setSelected(null);
                            setPickTower(false);
                          }}
                          className={`block w-full rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                            t.id === towerId ? 'bg-[#1A1A1A] text-white' : 'text-[#3A3A3A] hover:bg-black/[0.04]'
                          }`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-[#6B6B6B] hover:bg-black/[0.05]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* sales progress */}
            <div className="border-b border-black/[0.05] px-5 py-3">
              <div className="flex items-center justify-between text-[12px] font-semibold">
                <span className="uppercase tracking-[0.14em] text-[#5B5B5B]">Sales</span>
                <span className="text-[#1A1A1A]">{tower.salesPercent}%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-black/[0.07]">
                <div className="h-full rounded-full bg-[#16A34A]" style={{ width: `${tower.salesPercent}%` }} />
              </div>
            </div>

            {/* matrix */}
            <div className="flex-1 overflow-auto p-5">
              <Matrix tower={tower} selected={selected} onSelect={setSelected} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
