'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Check } from 'lucide-react';

const INPUT =
  'w-full rounded-lg border border-[#e8e2da] px-3.5 py-2.5 text-sm text-[#2a2520] placeholder:text-[#9b9085] outline-none transition focus:border-[#80603f] focus:ring-2 focus:ring-[#80603f]/20';

const DETAILS = [
  [Phone, 'Call us', '+971 4 000 0000'],
  [Mail, 'Email', 'hello@fortunerealty.ae'],
  [MapPin, 'Office', 'Business Bay, Dubai, UAE'],
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) return;
    setSent(true);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-14">
      <header className="max-w-2xl">
        <span className="block text-[12px] font-black tracking-[0.2em] text-[#80603f] mb-2">Contact us</span>
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#2a2520]">
          Let&apos;s find your next address.
        </h1>
        <p className="mt-3 text-[#574e44] leading-relaxed">
          Tell us what you&apos;re looking for and a dedicated advisor will be in touch within one business day.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* Form */}
        <div className="bg-white border border-[#e8e2da] rounded-2xl p-7">
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <span className="h-14 w-14 rounded-full bg-[#80603f]/12 text-[#6a4b2e] flex items-center justify-center">
                <Check size={26} />
              </span>
              <h3 className="mt-4 text-xl font-semibold font-[family-name:var(--font-heading)] text-[#2a2520]">Thank you, {form.name.split(' ')[0]}.</h3>
              <p className="mt-2 text-sm text-[#574e44]">We&apos;ve received your enquiry and will reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-[#675c4e] mb-1.5">Full name</label>
                  <input className={INPUT} value={form.name} onChange={set('name')} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.12em] text-[#675c4e] mb-1.5">Phone</label>
                  <input className={INPUT} value={form.phone} onChange={set('phone')} placeholder="+971 50 000 0000" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-[#675c4e] mb-1.5">Email</label>
                <input className={INPUT} value={form.email} onChange={set('email')} placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.12em] text-[#675c4e] mb-1.5">Message</label>
                <textarea rows={4} className={INPUT} value={form.message} onChange={set('message')} placeholder="What are you looking for?" />
              </div>
              <button
                type="submit"
                className="mt-1 w-full bg-[#80603f] text-white text-sm font-bold uppercase tracking-[0.1em] py-3 rounded-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-6px_rgba(154,115,85,0.5)]"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>

        {/* Details */}
        <aside className="space-y-4">
          {DETAILS.map(([Icon, label, value]) => (
            <div key={label} className="bg-white border border-[#e8e2da] rounded-2xl p-5 flex items-center gap-4">
              <span className="h-11 w-11 rounded-lg bg-[#faf7f3] text-[#80603f] flex items-center justify-center shrink-0">
                <Icon size={19} />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#675c4e]">{label}</p>
                <p className="text-sm font-semibold text-[#2a2520]">{value}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
