'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, ArrowUpRight, Minus, Plus } from 'lucide-react';

const aed = (n) => `AED ${Math.round(n).toLocaleString()}`;

// Premium value field — comma-formatted, type directly or nudge with − / +.
// Shows raw digits while typing (no caret jump) and re-formats on blur.
function Field({ label, value, set, min, max, step, prefix, suffix, decimals = 0 }) {
  const clamp = (v) => Math.min(max, Math.max(min, v));
  const fmt = (v) => (decimals ? Number(v).toFixed(decimals) : Number(v).toLocaleString());
  const [draft, setDraft] = useState(fmt(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(fmt(value));
  }, [value, focused]); // keep display in sync with stepper / preset changes

  const onChange = (e) => {
    const raw = e.target.value;
    setDraft(raw);
    const num = Number(raw.replace(/[^0-9.]/g, ''));
    if (raw.trim() !== '' && !Number.isNaN(num)) set(clamp(num));
  };
  const nudge = (dir) => set(clamp(Number((value + dir * step).toFixed(decimals))));

  const Btn = ({ dir, Icon, disabled }) => (
    <button
      type="button"
      aria-label={`${dir < 0 ? 'Decrease' : 'Increase'} ${label}`}
      onClick={() => nudge(dir)}
      disabled={disabled}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#FAF7F3] text-[#80603f] transition-colors hover:bg-[#80603f] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#FAF7F3] disabled:hover:text-[#80603f]"
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div>
      <label className="mb-1 block text-[13px] font-semibold text-[#2E231B]">{label}</label>
      <div className="flex items-center gap-2 rounded-xl border border-[rgba(10,10,18,0.12)] bg-white p-1 transition focus-within:border-[#80603f] focus-within:ring-2 focus-within:ring-[#80603f]/15">
        <Btn dir={-1} Icon={Minus} disabled={value <= min} />
        <div className="flex flex-1 items-baseline justify-center gap-1 px-1">
          {prefix && <span className="text-sm font-semibold text-[#9A9AA3]">{prefix}</span>}
          <input
            inputMode="decimal"
            value={draft}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setDraft(fmt(value));
            }}
            className="w-full min-w-0 bg-transparent text-center text-base font-bold tabular-nums text-[#0A0A12] outline-none font-[family-name:var(--font-heading)]"
          />
          {suffix && <span className="text-sm font-semibold text-[#9A9AA3]">{suffix}</span>}
        </div>
        <Btn dir={1} Icon={Plus} disabled={value >= max} />
      </div>
    </div>
  );
}

const PRICE_PRESETS = [
  [1000000, '1M'],
  [1800000, '1.8M'],
  [3000000, '3M'],
  [5000000, '5M'],
];

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
  const monthlyRent = (price * yieldPct) / 100 / 12;
  const netMonthly = monthlyRent - emi;

  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <div className="mb-5 max-w-2xl sm:mb-6">
        <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">Plan your purchase</span>
        <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] md:text-4xl font-[family-name:var(--font-heading)]">
          Mortgage &amp; yield calculator
        </h2>
        <p className="mt-2 leading-relaxed text-[#55555E]">
          Type your numbers or nudge them to see your down payment, monthly mortgage and rental cash-flow update live.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1fr]">
        {/* Results */}
        <div className="flex flex-col gap-3 rounded-3xl bg-gradient-to-br from-[#80603f] to-[#5E4636] p-5 text-white shadow-[0_18px_44px_-24px_rgba(128,96,63,0.8)] sm:p-6">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
            <Calculator size={15} /> Your numbers
          </div>

          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/60">Monthly mortgage</p>
            <p className="mt-1 text-[28px] font-bold leading-none tabular-nums font-[family-name:var(--font-heading)]">{aed(emi)}</p>
          </div>

          <dl className="grid grid-cols-2 gap-2.5">
            {[
              ['Down payment', aed(down)],
              ['Loan amount', aed(loan)],
              ['Rental income / mo', aed(monthlyRent)],
              [netMonthly >= 0 ? 'Net cash-flow / mo' : 'Top-up / mo', aed(Math.abs(netMonthly))],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/10 p-3.5">
                <dt className="text-[10px] uppercase tracking-[0.12em] text-white/60">{label}</dt>
                <dd className="mt-1 text-[17px] font-bold tabular-nums font-[family-name:var(--font-heading)]">{value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/prototype3/contact"
            className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2E231B] outline-none transition-all hover:bg-[#FAF7F3] focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5E4636]"
          >
            Get pre-approved
            <ArrowUpRight size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
          </Link>
          <p className="text-center text-[11px] text-white/55">Indicative only — not a financing offer.</p>
        </div>

        {/* Inputs */}
        <div className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-5 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)] sm:p-6">
          <div className="space-y-4">
            <div>
              <Field label="Property price" value={price} set={setPrice} min={500000} max={10000000} step={50000} prefix="AED" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PRICE_PRESETS.map(([v, l]) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setPrice(v)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      price === v
                        ? 'border-[#80603f] bg-[#80603f]/8 text-[#80603f]'
                        : 'border-[rgba(10,10,18,0.12)] text-[#55555E] hover:border-[#80603f]/50'
                    }`}
                  >
                    AED {l}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Down payment" value={downPct} set={setDownPct} min={10} max={60} step={1} suffix="%" />
            <Field label="Loan tenure" value={years} set={setYears} min={5} max={30} step={1} suffix="yrs" />
            <Field label="Interest rate" value={rate} set={setRate} min={2} max={8} step={0.1} suffix="%" decimals={1} />
            <Field label="Rental yield" value={yieldPct} set={setYieldPct} min={4} max={9} step={0.1} suffix="%" decimals={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
