'use client';

// prototype1 navbar — floating rounded white bar, centered menu, consultation popup.
import { useState } from 'react';
import { Menu, X, ArrowRight, User, Phone, Mail, Check } from 'lucide-react';

const LINKS = ['Home', 'Projects', 'Distress Deals', 'Resale Properties', 'About Us', 'Contact Us'];

function ConsultModal({ onClose }) {
  const [sent, setSent] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0a1320]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* header */}
        <div className="relative bg-gradient-to-r from-[#1c1815] to-[#241e18] px-7 py-6">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D9B45F]">Free Consultation</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Let&apos;s find your perfect property</h3>
        </div>

        {sent ? (
          <div className="px-7 py-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-7 w-7" />
            </span>
            <h4 className="mt-4 text-lg font-semibold text-[#1a1a1a]">Thank you!</h4>
            <p className="mt-1 text-sm text-gray-500">Our team will reach out to you shortly.</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-gradient-to-r from-[#C8A24E] to-[#A37F3C] px-6 py-2.5 text-sm font-medium text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-3 px-7 py-6"
          >
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 focus-within:border-[#B89149]">
              <User className="h-4 w-4 text-[#B89149]" />
              <input required placeholder="Full Name" className="w-full bg-transparent py-2.5 text-sm outline-none" />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 focus-within:border-[#B89149]">
              <Phone className="h-4 w-4 text-[#B89149]" />
              <input required placeholder="Phone Number" className="w-full bg-transparent py-2.5 text-sm outline-none" />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 focus-within:border-[#B89149]">
              <Mail className="h-4 w-4 text-[#B89149]" />
              <input type="email" placeholder="Email Address" className="w-full bg-transparent py-2.5 text-sm outline-none" />
            </div>
            <textarea
              rows={3}
              placeholder="Tell us what you're looking for..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#B89149]"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C8A24E] to-[#A37F3C] py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:brightness-105"
            >
              Request Consultation <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [consult, setConsult] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div className="mx-auto max-w-[1480px] rounded-2xl border border-white/70 bg-white/95 shadow-[0_12px_44px_-12px_rgba(20,18,15,0.30)] backdrop-blur-md">
        <div className="relative flex h-[68px] items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <a href="/prototype1" className="flex items-center">
            <img src="/images/fortune-logo-trim.png" alt="Fortune Realty L.L.C" className="h-8 w-auto md:h-9" />
          </a>

          {/* Centered nav */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 whitespace-nowrap lg:flex">
            {LINKS.map((l) => {
              const active = l === 'Home';
              return (
                <a
                  key={l}
                  href="#"
                  className={`group relative inline-flex items-center py-2 text-[14px] transition-colors ${
                    active ? 'text-[#B89149]' : 'text-gray-700 hover:text-[#B89149]'
                  }`}
                >
                  {l}
                  <span
                    className={`absolute -bottom-0.5 left-0 right-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-[#C8A24E] to-[#A37F3C] transition-transform duration-300 ${
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
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#C8A24E] to-[#A37F3C] px-5 py-2.5 text-sm font-medium text-white shadow-md ring-1 ring-[#B89149]/30 transition-all hover:shadow-lg hover:brightness-105 sm:inline-flex"
            >
              Get Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-md border border-gray-200 text-gray-700 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-gray-100 px-4 py-3 lg:hidden">
            {LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className={`block rounded-lg px-3 py-2 text-sm ${
                  l === 'Home' ? 'bg-[#B89149]/10 font-medium text-[#B89149]' : 'text-gray-700 hover:text-[#B89149]'
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
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C8A24E] to-[#A37F3C] px-5 py-2.5 text-sm font-medium text-white"
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
