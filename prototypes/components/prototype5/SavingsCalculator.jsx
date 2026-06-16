'use client';

// prototype5 distress savings calculator. Mock only.
import { useState } from 'react';
import { Calculator, ChevronDown, ArrowRight } from 'lucide-react';

const PROPS = [
  { name: 'Palm Beach Towers', market: 2800000, distress: 2100000, roi: '9.2%' },
  { name: 'Downtown Views II', market: 2600000, distress: 1950000, roi: '9.5%' },
  { name: 'Sobha Creek Vistas', market: 1800000, distress: 1300000, roi: '8.7%' },
  { name: 'DAMAC Lagoons', market: 1600000, distress: 1150000, roi: '9.3%' },
];

const fmt = (n) => Number(n || 0).toLocaleString();

export default function SavingsCalculator() {
  const [sel, setSel] = useState(0);
  const [market, setMarket] = useState(PROPS[0].market);
  const [distress, setDistress] = useState(PROPS[0].distress);

  const onSelect = (i) => { setSel(i); setMarket(PROPS[i].market); setDistress(PROPS[i].distress); };

  const savings = Math.max(0, market - distress);
  const discount = market > 0 ? Math.round((savings / market) * 100) : 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_14px_40px_-18px_rgba(20,18,15,0.22)]">
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#80603f]/10 text-[#80603f]"><Calculator className="h-5 w-5" /></span>
        <h3 className="text-base font-semibold text-[#1a1a1a]">Savings Calculator</h3>
      </div>

      <label className="mt-5 block text-[12px] font-medium text-gray-600">Select Property</label>
      <div className="relative mt-1.5">
        <select value={sel} onChange={(e) => onSelect(Number(e.target.value))} className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2.5 pr-9 text-sm text-gray-700 outline-none focus:border-[#80603f]">
          {PROPS.map((p, i) => <option key={p.name} value={i}>{p.name}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>

      <label className="mt-4 block text-[12px] font-medium text-gray-600">Market Price (AED)</label>
      <input type="number" value={market} onChange={(e) => setMarket(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#80603f]" />

      <label className="mt-4 block text-[12px] font-medium text-gray-600">Distress Price (AED)</label>
      <input type="number" value={distress} onChange={(e) => setDistress(Number(e.target.value))} className="mt-1.5 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#80603f]" />

      <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-xl border border-gray-100 text-center">
        <div className="bg-[#80603f] px-2 py-3 text-white">
          <span className="block text-[10px] uppercase tracking-wide opacity-90">Total Savings</span>
          <span className="text-[13px] font-bold">AED {fmt(savings)}</span>
        </div>
        <div className="border-x border-gray-100 px-2 py-3">
          <span className="block text-[10px] uppercase tracking-wide text-gray-400">Discount</span>
          <span className="text-[15px] font-bold text-[#1a1a1a]">{discount}%</span>
        </div>
        <div className="px-2 py-3">
          <span className="block text-[10px] uppercase tracking-wide text-gray-400">Potential ROI</span>
          <span className="text-[15px] font-bold text-emerald-600">{PROPS[sel].roi}</span>
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#80603f] py-3 text-sm font-medium text-white transition-colors hover:bg-[#6b4f33]">
        Explore This Deal <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
