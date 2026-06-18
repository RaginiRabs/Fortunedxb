'use client';

// prototype1 navbar — floating rounded white bar, centered menu, consultation popup.
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, User, Phone, Mail, Check, Building2, Wallet, MessageSquare, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react';

const LINKS = ['Home', 'Projects', 'Distress Deals', 'Ready Properties', 'Map', 'About Us', 'Contact Us'];

const hrefFor = (l) =>
  l === 'Home' ? '/prototype1'
    : l === 'Projects' ? '/prototype1/projects'
    : l === 'Distress Deals' ? '/prototype1/distress-deals'
    : l === 'Ready Properties' ? '/prototype1/ready-properties'
    : l === 'Map' ? '/prototype1/map'
    : l === 'About Us' ? '/prototype1/about-3'
    : l === 'Contact Us' ? '/prototype1/contact'
    : '#';

const FIELD = 'flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50/60 px-3 transition-colors focus-within:border-[#80603f] focus-within:bg-white';
const SELECT = 'w-full appearance-none bg-transparent py-2.5 text-sm text-gray-600 outline-none';

function ConsultModal({ onClose }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[#0a1320]/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1c1815] to-[#2a231b] px-5 py-6 sm:px-7 sm:py-7">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#80603f]/30 blur-3xl" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#d8c4a8]">
            <Sparkles className="h-3.5 w-3.5" /> Free Consultation
          </span>
          <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Let&apos;s Find Your Perfect Property</h3>
          <p className="mt-1.5 text-[13px] text-gray-400">Share a few details and our experts will guide you to the best opportunities.</p>
        </div>

        {sent ? (
          <div className="px-5 py-10 text-center sm:px-7 sm:py-12">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-8 w-8" />
            </span>
            <h4 className="mt-4 text-xl font-semibold text-[#1a1a1a]">Request Received!</h4>
            <p className="mt-1.5 text-sm text-gray-500">Thank you. One of our advisors will reach out within 24 hours.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="tel:+971501234567" className="inline-flex items-center gap-2 rounded-full border border-[#80603f]/40 px-5 py-2.5 text-sm font-medium text-[#80603f] hover:bg-[#80603f] hover:text-white">
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <button onClick={onClose} className="rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-6 py-2.5 text-sm font-medium text-white">Done</button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3.5 px-5 py-6 sm:px-7">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className={FIELD}>
                <User className="h-4 w-4 shrink-0 text-[#80603f]" />
                <input required placeholder="Full Name" className="w-full bg-transparent py-2.5 text-sm outline-none" />
              </div>
              <div className={FIELD}>
                <Phone className="h-4 w-4 shrink-0 text-[#80603f]" />
                <input required placeholder="Phone Number" className="w-full bg-transparent py-2.5 text-sm outline-none" />
              </div>
            </div>

            <div className={FIELD}>
              <Mail className="h-4 w-4 shrink-0 text-[#80603f]" />
              <input type="email" placeholder="Email Address" className="w-full bg-transparent py-2.5 text-sm outline-none" />
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div className={`${FIELD} relative`}>
                <Building2 className="h-4 w-4 shrink-0 text-[#80603f]" />
                <select required defaultValue="" className={SELECT}>
                  <option value="" disabled>Interested In</option>
                  <option>Off-Plan Property</option>
                  <option>Ready Property</option>
                  <option>Distress Deal</option>
                  <option>Investment Advisory</option>
                </select>
                <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-gray-400" />
              </div>
              <div className={`${FIELD} relative`}>
                <Wallet className="h-4 w-4 shrink-0 text-[#80603f]" />
                <select defaultValue="" className={SELECT}>
                  <option value="" disabled>Budget</option>
                  <option>Under AED 1M</option>
                  <option>AED 1M – 2M</option>
                  <option>AED 2M – 5M</option>
                  <option>AED 5M+</option>
                </select>
                <ChevronDown className="pointer-events-none h-4 w-4 shrink-0 text-gray-400" />
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2.5 transition-colors focus-within:border-[#80603f] focus-within:bg-white">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#80603f]" />
              <textarea rows={3} placeholder="Tell us what you're looking for..." className="w-full bg-transparent text-sm outline-none" />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105"
            >
              Request Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="h-3.5 w-3.5 text-[#80603f]" /> Your details are secure · We respond within 24 hours
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [consult, setConsult] = useState(false);
  const pathname = usePathname();
  const isActive = (l) => hrefFor(l) !== '#' && pathname === hrefFor(l);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div className="mx-auto max-w-[1480px] rounded-2xl border border-white/70 bg-white/95 backdrop-blur-md">
        <div className="relative flex h-[68px] items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <a href="/prototype1" className="flex items-center">
            <img src="/images/fortune-logo-trim.png" alt="Fortune Realty L.L.C" className="h-8 w-auto md:h-9" />
          </a>

          {/* Centered nav */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-5 whitespace-nowrap xl:flex xl:gap-7">
            {LINKS.map((l) => {
              const active = isActive(l);
              const ext = hrefFor(l).startsWith('http');
              return (
                <a
                  key={l}
                  href={hrefFor(l)}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group relative inline-flex items-center py-2 text-[14px] transition-colors ${
                    active ? 'text-[#80603f]' : 'text-gray-700 hover:text-[#80603f]'
                  }`}
                >
                  {l}
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right — CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setConsult(true)}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-5 py-2.5 text-sm font-medium text-white shadow-md ring-1 ring-[#80603f]/30 transition-all hover:shadow-lg hover:brightness-105 sm:inline-flex"
            >
              Get Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-md border border-gray-200 text-gray-700 xl:hidden"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-gray-100 px-4 py-3 xl:hidden">
            {LINKS.map((l) => (
              <a
                key={l}
                href={hrefFor(l)}
                {...(hrefFor(l).startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`block rounded-lg px-3 py-2 text-sm ${
                  isActive(l) ? 'bg-[#80603f]/10 font-medium text-[#80603f]' : 'text-gray-700 hover:text-[#80603f]'
                }`}
              >
                {l}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setConsult(true);
              }}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#96714a] to-[#6b4f33] px-5 py-2.5 text-sm font-medium text-white"
            >
              Get Consultation <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>

      {consult && <ConsultModal onClose={() => setConsult(false)} />}
    </header>
  );
}
