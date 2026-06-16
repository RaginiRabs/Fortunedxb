'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Building2, Star } from 'lucide-react';

const HERO_IMG =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85&auto=format&fit=crop';

const STATS = [
  ['1,200+', 'Active Listings'],
  ['45+', 'Communities'],
  ['30+', 'Developers'],
  ['AED 9B+', 'Transacted'],
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Soft light accents */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#80603f]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#e9c98a]/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:px-12 py-16 md:py-24 lg:grid-cols-2">
        {/* Left — content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.25em] text-[#80603f]">
            <span className="h-px w-8 bg-[#80603f]" /> Fortune Realty · Dubai
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[#2a2520] font-[family-name:var(--font-heading)]">
            Find your address in the <span className="text-[#80603f]">city of gold</span>
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-relaxed text-[#574e44]">
            Curated off-plan, distress and ready resale opportunities across Dubai’s most
            sought-after communities — handpicked for investors and end-users.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl border border-[#e8e2da] bg-white p-2 shadow-[0_18px_50px_-20px_rgba(128,96,63,0.4)] sm:flex-row">
            <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#faf7f3]">
              <MapPin size={18} className="shrink-0 text-[#80603f]" />
              <select className="w-full cursor-pointer bg-transparent text-sm font-semibold text-[#2a2520] focus:outline-none">
                <option>Any Location</option>
                <option>Dubai Marina</option>
                <option>Palm Jumeirah</option>
                <option>Downtown Dubai</option>
                <option>Business Bay</option>
              </select>
            </label>
            <div className="hidden w-px bg-[#e8e2da] sm:block" />
            <label className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 transition-colors hover:bg-[#faf7f3]">
              <Building2 size={18} className="shrink-0 text-[#80603f]" />
              <select className="w-full cursor-pointer bg-transparent text-sm font-semibold text-[#2a2520] focus:outline-none">
                <option>All Types</option>
                <option>Off-Plan</option>
                <option>Distress Deal</option>
                <option>Resale / Ready</option>
              </select>
            </label>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#80603f] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6a4b2e]"
            >
              <Search size={17} /> Search
            </button>
          </div>

          {/* Stats */}
          <div className="mt-9 flex flex-wrap gap-x-9 gap-y-4">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl md:text-3xl font-bold text-[#6a4b2e] font-[family-name:var(--font-heading)]">
                  {n}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-[#675c4e]">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — framed image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-[#e9c98a]/30 to-[#80603f]/10 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-[#e8e2da] shadow-[0_30px_80px_-30px_rgba(42,37,32,0.5)]">
            <img
              src={HERO_IMG}
              alt="Dubai skyline"
              className="h-[520px] w-full object-cover"
            />
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-[#e8e2da] bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#80603f] text-white">
              <Star size={18} fill="currentColor" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#2a2520]">4.9 / 5 rating</div>
              <div className="text-[11px] text-[#675c4e]">Trusted by 5,000+ investors</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
