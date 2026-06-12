'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowUpRight } from 'lucide-react';

const aed = (n) => `AED ${Math.round(n).toLocaleString()}`;

// Slider row with live value.
function Slider({ label, value, set, min, max, step, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-semibold text-[#2E231B]">{label}</label>
        <span className="text-[13px] font-bold text-[#80603f] tabular-nums font-[family-name:var(--font-heading)]">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        aria-label={label}
        className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#80603f]/40 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#80603f] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#80603f]"
        style={{ background: `linear-gradient(to right, #80603f ${pct}%, #E7DFD5 ${pct}%)` }}
      />
    </div>
  );
}

export default function PaymentCalculator() {
  const [price, setPrice] = useState(1800000);
  const [downPct, setDownPct] = useState(20);
  const [years, setYears] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [yieldPct, setYieldPct] = useState(6.5);

  const down = (price * downPct) / 100;
  const loan = price - down;
  const r = rate / 100 / 12;
  const n = years * 12;
  const emi = r === 0 ? loan / n : (loan * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  const annualRent = (price * yieldPct) / 100;
  const monthlyRent = annualRent / 12;
  const netMonthly = monthlyRent - emi;

  return (
    <section className="mx-auto max-w-[1600px] px-6 md:px-12">
      <div className="mb-8 max-w-2xl">
        <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
          Plan your purchase
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] md:text-4xl font-[family-name:var(--font-heading)]">
          Mortgage &amp; yield calculator
        </h2>
        <p className="mt-3 leading-relaxed text-[#55555E]">
          Move the sliders to see your down payment, monthly mortgage and rental cash-flow in real time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1fr]">
        {/* Results */}
        <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-[#80603f] to-[#5E4636] p-6 text-white shadow-[0_18px_44px_-24px_rgba(128,96,63,0.8)] sm:p-8">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
            <Calculator size={15} /> Your numbers
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">Monthly mortgage</p>
            <p className="mt-1 text-[34px] font-bold leading-none tabular-nums font-[family-name:var(--font-heading)]">
              {aed(emi)}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-3">
            {[
              ['Down payment', aed(down)],
              ['Loan amount', aed(loan)],
              ['Rental income / mo', aed(monthlyRent)],
              [netMonthly >= 0 ? 'Net cash-flow / mo' : 'Top-up / mo', aed(Math.abs(netMonthly))],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/10 p-4">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-white/60">{label}</dt>
                <dd className="mt-1 text-lg font-bold tabular-nums font-[family-name:var(--font-heading)]">{value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/prototype3/contact"
            className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-[#FAF7F3] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5E4636]"
          >
            Get pre-approved
            <ArrowUpRight size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
          </Link>
          <p className="text-center text-[11px] text-white/55">Indicative only — not a financing offer.</p>
        </div>

        {/* Inputs */}
        <div className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-6 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)] sm:p-8">
          <div className="space-y-6">
            <Slider label="Property price" value={price} set={setPrice} min={500000} max={10000000} step={50000} format={aed} />
            <Slider label="Down payment" value={downPct} set={setDownPct} min={10} max={60} step={1} format={(v) => `${v}%`} />
            <Slider label="Loan tenure" value={years} set={setYears} min={5} max={30} step={1} format={(v) => `${v} yrs`} />
            <Slider label="Interest rate" value={rate} set={setRate} min={2} max={8} step={0.1} format={(v) => `${v.toFixed(1)}%`} />
            <Slider label="Rental yield" value={yieldPct} set={setYieldPct} min={4} max={9} step={0.1} format={(v) => `${v.toFixed(1)}%`} />
          </div>
        </div>
      </div>
    </section>
  );
}
