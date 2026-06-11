'use client';

import { useState } from 'react';
import Card from '@/components/prototype3/Card';
import { projects } from '@/mock/prototype3/projects';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'off-plan', label: 'Off-Plan' },
  { key: 'distress', label: 'Distress' },
  { key: 'resale', label: 'Resale' },
];

export default function Prototype3Home() {
  const [tab, setTab] = useState('all');

  // Data is limited — show all 3 cards in every tab, but bring the
  // selected type to the front so it leads the horizontal scroll.
  const ordered =
    tab === 'all'
      ? projects
      : [...projects.filter((p) => p.type === tab), ...projects.filter((p) => p.type !== tab)];

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-14 md:px-10"
      style={{ fontFamily: '"Work Sans", "Work Sans Fallback", sans-serif' }}
    >
      <header className="mb-10 max-w-3xl text-center md:mb-12 md:text-left">
        <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C49A3C]">
          Prototype 3 —
        </span>
        <h1
          className="text-4xl font-medium tracking-tight text-[#0A0A12] md:text-5xl"
          style={{ fontFamily: '"Montserrat", "Montserrat Fallback", sans-serif' }}
        >
          Redesigned Project Cards
        </h1>
        <p className="mt-3 leading-relaxed text-[#4C4C56]">
          Compare our three distinct property card formats tailored specifically for the Dubai real estate market: Off-Plan timelines, high-impact Distress Deals, and yield-focused ready Resales.
        </p>
      </header>

      {/* ---------- Desktop / tablet: grid ---------- */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} project={p} />
        ))}
      </div>

      {/* ---------- Mobile: tabs + horizontal snap-scroll ---------- */}
      <div className="sm:hidden">
        {/* tabs */}
        <div className="-mr-6 flex gap-2 overflow-x-auto pr-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? 'bg-[#0A0A12] text-white'
                    : 'border border-[rgba(10,10,18,0.14)] bg-white text-[#4C4C56]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 1.25-card horizontal scroller (scrollbar hidden) */}
        <div
          key={tab}
          className="-mr-6 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ordered.map((p) => (
            <div key={p.id} className="w-[80%] shrink-0 snap-start">
              <Card project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
