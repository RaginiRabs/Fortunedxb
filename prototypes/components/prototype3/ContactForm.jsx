'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const fieldCls =
  'w-full rounded-xl border border-[rgba(10,10,18,0.12)] bg-white px-4 py-3 text-sm text-[#0A0A12] outline-none transition placeholder:text-[#9A9AA3] focus:border-[#80603f] focus:ring-2 focus:ring-[#80603f]/20';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true); // mock — no backend in the prototype
  };

  if (sent) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-[rgba(10,10,18,0.08)] bg-[#FAF7F3] p-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#C49A3C]/15 text-[#C49A3C]">
          <CheckCircle2 size={30} />
        </span>
        <h3 className="mt-4 text-xl font-bold tracking-tight text-[#0A0A12] font-[family-name:var(--font-heading)]">Thanks — we&apos;ll be in touch</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#55555E]">
          An advisor will reach out within 24 hours with matched listings and next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white p-6 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)] sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">Full name</label>
          <input id="c-name" required placeholder="Your name" className={fieldCls} />
        </div>
        <div>
          <label htmlFor="c-phone" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">Phone</label>
          <input id="c-phone" type="tel" placeholder="+971 50 000 0000" className={fieldCls} />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="c-email" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">Email</label>
        <input id="c-email" type="email" required placeholder="you@email.com" className={fieldCls} />
      </div>
      <div className="mt-4">
        <label htmlFor="c-msg" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5E5E66]">Your goal</label>
        <textarea id="c-msg" rows={4} placeholder="Budget, area or the kind of property you're after…" className={`${fieldCls} resize-none`} />
      </div>
      <button
        type="submit"
        className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#80603f] px-6 py-3.5 text-sm font-semibold text-white outline-none transition-all hover:bg-[#6a5034] focus-visible:ring-2 focus-visible:ring-[#80603f]/40 focus-visible:ring-offset-2"
      >
        Send enquiry <Send size={16} className="transition-transform motion-safe:group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
