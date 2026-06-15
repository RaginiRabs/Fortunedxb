'use client';

// prototype1 contact form card. Mock only — no backend.
import { useState } from 'react';
import { Send, Check, ChevronDown } from 'lucide-react';

const INPUT = 'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#80603f]';
const LABEL = 'mb-1.5 block text-[13px] font-medium text-[#1a1a1a]';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_24px_60px_-24px_rgba(20,18,15,0.4)] md:p-8">
      <h2 className="text-2xl font-semibold text-[#1a1a1a]">Send Us a Message</h2>
      <p className="mt-1 text-sm text-gray-500">Fill out the form and our team will get back to you shortly.</p>

      {sent ? (
        <div className="flex flex-col items-center py-14 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600"><Check className="h-7 w-7" /></span>
          <h3 className="mt-4 text-lg font-semibold text-[#1a1a1a]">Message Sent!</h3>
          <p className="mt-1 text-sm text-gray-500">Thank you. Our team will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Full Name *</label>
              <input required placeholder="Enter your name" className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Email Address *</label>
              <input type="email" required placeholder="Enter your email" className={INPUT} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Phone Number *</label>
              <input required placeholder="Enter your phone number" className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Subject *</label>
              <div className="relative">
                <select required defaultValue="" className={`${INPUT} appearance-none pr-9 text-gray-500`}>
                  <option value="" disabled>Select a subject</option>
                  <option>General Inquiry</option>
                  <option>Buy a Property</option>
                  <option>Sell a Property</option>
                  <option>Investment Advisory</option>
                  <option>Other</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className={LABEL}>Message *</label>
            <textarea required rows={4} placeholder="Type your message here..." className={INPUT} />
          </div>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#96714a] to-[#6b4f33] py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105">
            Send Message <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
