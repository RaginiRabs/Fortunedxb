// Payment Plan — summary row + vertical milestone timeline. prototype5 ONLY. Mock.
import { Wallet, Layers, FileText } from 'lucide-react';

function SummaryStat({ icon: Icon, label, value }) {
  return (
    <div className="flex-1 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#9a917f]">{label}</p>
      <p className="mt-0.5 inline-flex items-center gap-1.5 text-lg font-semibold text-[#1A1A1A]">
        <Icon size={15} className="text-[#B0905E]" />
        {value}
      </p>
    </div>
  );
}

export default function PaymentPlan({ payment }) {
  const { totalCommitment, milestonesCount, plan, milestones } = payment;
  return (
    <section id="payment-plan" className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-[#1A1A1A]">Payment Plan</h2>

      <div className="mt-5 flex flex-col divide-y divide-black/[0.06] rounded-2xl border border-black/[0.06] bg-[#FBFAF7] sm:flex-row sm:divide-x sm:divide-y-0">
        <SummaryStat icon={Wallet} label="Total commitment" value={`${totalCommitment}%`} />
        <SummaryStat icon={Layers} label="Milestones" value={milestonesCount} />
        <SummaryStat icon={FileText} label="Plan" value={plan} />
      </div>

      <ol className="mt-6 space-y-3">
        {milestones.map((m, i) => (
          <li
            key={m.id}
            className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white px-4 py-3.5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4EFE6] text-[12px] font-semibold text-[#B0905E]">
              {i + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-[#3A3A3A]">{m.label}</span>
            <span className="text-base font-semibold text-[#1A1A1A]">{m.percent}%</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
