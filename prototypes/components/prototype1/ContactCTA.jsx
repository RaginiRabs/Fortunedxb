'use client';

// prototype1 contact section — covers the Contact Us menu. Mock only.
import { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, Check, Instagram, Facebook, Linkedin } from 'lucide-react';
import { contactInfo } from '@/mock/prototype1/home';

export default function ContactCTA() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#0a1320] text-white">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#80603f]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#80603f]/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:items-center">
        {/* Left — info */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c4a98f]">Get in Touch</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">
            Ready to Invest in Dubai?
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-gray-400">
            Get expert guidance and exclusive access to the best off-plan, resale and distress opportunities.
            Our advisors are here to help you invest smarter.
          </p>

          <ul className="mt-7 space-y-4">
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-[#c4a98f]"><Phone className="h-4 w-4" /></span>
              <span><span className="block text-[11px] uppercase tracking-wide text-gray-500">Call us</span>{contactInfo.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-[#c4a98f]"><Mail className="h-4 w-4" /></span>
              <span><span className="block text-[11px] uppercase tracking-wide text-gray-500">Email us</span>{contactInfo.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-[#c4a98f]"><MapPin className="h-4 w-4" /></span>
              <span><span className="block text-[11px] uppercase tracking-wide text-gray-500">Visit us</span>{contactInfo.address}</span>
            </li>
          </ul>

          <div className="mt-6 flex gap-2.5">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-gray-300 transition-all hover:border-[#80603f] hover:bg-[#80603f] hover:text-white">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
          {sent ? (
            <div className="flex flex-col items-center py-12 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500/20 text-emerald-400"><Check className="h-7 w-7" /></span>
              <h4 className="mt-4 text-lg font-semibold text-white">Thank you!</h4>
              <p className="mt-1 text-sm text-gray-400">Our team will reach out to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Request a Free Consultation</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input required placeholder="Full Name" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#80603f]" />
                <input required placeholder="Phone" className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#80603f]" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#80603f]" />
              <textarea rows={3} placeholder="Tell us what you're looking for..." className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#80603f]" />
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105">
                Send Request <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
