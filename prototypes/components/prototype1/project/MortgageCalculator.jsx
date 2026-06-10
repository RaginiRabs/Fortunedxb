'use client';

// Mortgage calculator — interactive down payment / term / rate → monthly EMI.
// prototype1 ONLY. Mock defaults; estimate only.
import { useState } from 'react';
import { Calculator } from 'lucide-react';

const aed = (n) => `AED ${Math.round(n).toLocaleString()}`;

function Slider({ label, value, min, max, step, suffix, onChange, display }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-[#5B5B5B]">{label}</span>
        <span className="font-semibold text-[#1A1A1A]">{display ?? `${value}${suffix || ''}`}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-[#B0905E]"
      />
    </div>
  );
}

export default function MortgageCalculator({ mortgage }) {
  const [price, setPrice] = useState(mortgage.price);
  const [downPct, setDownPct] = useState(mortgage.downPaymentPct);
  const [years, setYears] = useState(mortgage.years);
  const [rate, setRate] = useState(mortgage.rate);

  const downPayment = (price * downPct) / 100;
  const loan = price - downPayment;
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? loan / n : (loan * r * (1 + r) ** n) / ((1 + r) ** n - 1);

  return (
    <section id="mortgage" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Mortgage Calculator</h2>

      <div className="mt-5 grid gap-5 rounded-2xl border border-black/[0.06] bg-white p-5 md:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <Slider label="Property price" value={price} min={500000} max={5000000} step={10000} display={aed(price)} onChange={setPrice} />
          <Slider label="Down payment" value={downPct} min={10} max={80} step={5} suffix="%" display={`${downPct}% · ${aed(downPayment)}`} onChange={setDownPct} />
          <Slider label="Loan term" value={years} min={5} max={30} step={1} suffix=" yrs" onChange={setYears} />
          <Slider label="Interest rate" value={rate} min={2} max={8} step={0.1} suffix="%" onChange={setRate} />
        </div>

        <div className="flex flex-col justify-center gap-3 rounded-xl bg-[#0c1622] p-5 text-white">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">Estimated monthly payment</p>
            <p className="mt-1 font-serif text-3xl">{aed(monthly)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-sm">
            <div>
              <p className="text-white/50">Loan amount</p>
              <p className="font-semibold">{aed(loan)}</p>
            </div>
            <div>
              <p className="text-white/50">Down payment</p>
              <p className="font-semibold">{aed(downPayment)}</p>
            </div>
          </div>
          <p className="inline-flex items-center gap-1.5 text-[11px] text-white/45">
            <Calculator size={12} /> Estimate only — excludes fees &amp; insurance.
          </p>
        </div>
      </div>
    </section>
  );
}
