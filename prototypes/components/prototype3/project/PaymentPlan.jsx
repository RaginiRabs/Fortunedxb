// Payment plan — proportional split bar + step cards. prototype3 ONLY.
// Column-agnostic: page controls max-width & horizontal padding.
import { Info } from 'lucide-react';

export default function PaymentPlan({ payment }) {
  const total = payment.steps.reduce((s, x) => s + x.pct, 0) || 100;

  return (
    <section className="py-6 sm:py-8">
      <div className="mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">Flexible Terms</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A12] sm:text-3xl">Payment plan</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#55555E]">
          Pay as you build, balance on handover — a {payment.steps.map((s) => s.pct).join(' / ')} structure.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.25)] sm:p-7">
        {/* Proportional split bar */}
        <div className="flex h-12 w-full overflow-hidden rounded-xl">
          {payment.steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-center border-r border-white/40 text-sm font-bold text-white last:border-0 font-[family-name:var(--font-heading)]"
              style={{ width: `${(s.pct / total) * 100}%`, background: `linear-gradient(135deg,#C9A84C,#A87F2D)`, opacity: 1 - i * 0.18 }}
            >
              {s.pct}%
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {payment.steps.map((s, i) => (
            <div key={i} className="rounded-xl border border-black/8 bg-[#FAF7F3] p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#C49A3C] text-[11px] font-bold text-white">{i + 1}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#80603f]">{s.stage}</span>
              </div>
              <div className="mt-2 text-3xl font-bold text-[#0A0A12] font-[family-name:var(--font-heading)]">
                {s.pct}<span className="text-base text-[#C49A3C]">%</span>
              </div>
              <p className="mt-1 text-[13px] leading-snug text-[#55555E]">{s.when}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-4 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <Info size={16} className="mt-0.5 shrink-0 text-[#B45309]" />
          <span className="text-[13px] leading-relaxed text-amber-900">{payment.note}</span>
        </div>
      </div>
    </section>
  );
}
