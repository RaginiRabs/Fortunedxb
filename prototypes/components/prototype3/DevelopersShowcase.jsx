'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';

// Home developers section — a compact typographic "directory" (no cards) that
// fits many developers. Hovering a name floats a live image preview that tracks
// the cursor. Mock only.
const DEVELOPERS = [
  { name: 'Emaar', image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8f5?auto=format&fit=crop&w=600&q=80', since: 1997, projects: 38, rating: 4.9 },
  { name: 'Sobha Realty', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80', since: 1976, projects: 21, rating: 4.8 },
  { name: 'Meraas', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80', since: 2007, projects: 17, rating: 4.7 },
  { name: 'DAMAC', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', since: 2002, projects: 33, rating: 4.6 },
  { name: 'Select Group', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80', since: 2002, projects: 14, rating: 4.7 },
  { name: 'Nakheel', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80', since: 2000, projects: 19, rating: 4.6 },
  { name: 'Omniyat', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80', since: 2005, projects: 11, rating: 4.8 },
  { name: 'Ellington', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80', since: 2014, projects: 16, rating: 4.8 },
  { name: 'Binghatti', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80', since: 2008, projects: 24, rating: 4.5 },
  { name: 'Azizi', image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=600&q=80', since: 2007, projects: 22, rating: 4.4 },
  { name: 'Danube', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80', since: 1993, projects: 18, rating: 4.4 },
  { name: 'Meydan', image: 'https://images.unsplash.com/photo-1430285561322-7808604715df?auto=format&fit=crop&w=600&q=80', since: 2007, projects: 9, rating: 4.6 },
];

export default function DevelopersShowcase() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (r) setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <section className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-12">
      <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.2em] text-[#80603f]">
            Trusted builders
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#0A0A12] md:text-4xl font-[family-name:var(--font-heading)]">
            Dubai&apos;s leading developers
          </h2>
        </div>
        <Link
          href="/prototype3/developers"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0A0A12] outline-none transition-colors hover:text-[#80603f] focus-visible:text-[#80603f] sm:inline-flex"
        >
          View all <ArrowUpRight size={16} />
        </Link>
      </div>

      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
        className="relative rounded-3xl border border-[rgba(10,10,18,0.08)] bg-white px-2 shadow-[0_8px_30px_-22px_rgba(10,10,18,0.2)] sm:px-4"
      >
        {/* cursor-tracking floating image preview (desktop hover only) */}
        <div
          className="pointer-events-none absolute z-20 hidden h-60 w-48 overflow-hidden rounded-2xl shadow-[0_24px_50px_-20px_rgba(10,10,18,0.55)] ring-1 ring-black/10 transition-[opacity,transform] duration-300 ease-out lg:block"
          style={{
            left: pos.x,
            top: pos.y,
            transform: `translate(-50%, -114%) rotate(-3deg) scale(${active !== null ? 1 : 0.85})`,
            opacity: active !== null ? 1 : 0,
          }}
          aria-hidden="true"
        >
          {DEVELOPERS.map((d, i) => (
            <img
              key={d.name}
              src={d.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A12]/85 to-transparent p-4">
            <p className="text-sm font-bold text-white font-[family-name:var(--font-heading)]">
              {active !== null ? DEVELOPERS[active].name : ''}
            </p>
          </div>
        </div>

        {/* directory — two compact columns of numbered names */}
        <ul className="grid sm:grid-cols-2 sm:gap-x-10">
          {DEVELOPERS.map((d, i) => {
            const on = active === i;
            return (
              <li key={d.name} className="border-b border-[rgba(10,10,18,0.07)] last:border-0 sm:[&:nth-last-child(2)]:border-0">
                <Link
                  href={`/prototype3/projects?developer=${encodeURIComponent(d.name)}`}
                  onMouseEnter={() => setActive(i)}
                  className="group flex items-center gap-4 py-3.5 outline-none sm:py-4"
                >
                  {/* index */}
                  <span className={`w-7 shrink-0 text-[12px] font-bold tabular-nums transition-colors duration-300 ${on ? 'text-[#C49A3C]' : 'text-[#C9C9CF]'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* avatar — commented out (using the floating cursor preview instead)
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-[rgba(10,10,18,0.1)] ring-offset-2 ring-offset-white transition-all duration-300 group-hover:ring-2 group-hover:ring-[#C49A3C]">
                    <img src={d.image} alt={d.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  */}

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[22px] font-bold tracking-tight transition-all duration-300 font-[family-name:var(--font-heading)] sm:text-[26px] ${
                        on ? 'translate-x-1 text-[#80603f]' : 'text-[#0A0A12]'
                      }`}
                    >
                      {d.name}
                    </span>
                    {/* compact meta line on mobile (where the full meta is hidden) */}
                    <span className="mt-0.5 block text-[11.5px] font-medium text-[#7A7A85] sm:hidden">
                      {d.projects} projects · since {d.since}
                    </span>
                  </span>

                  {/* full meta — desktop */}
                  <span className="hidden shrink-0 items-center gap-4 text-[12px] font-semibold text-[#7A7A85] sm:flex">
                    <span className="inline-flex items-center gap-1 text-[#9A7625]">
                      <Star size={12} className="fill-[#C49A3C] text-[#C49A3C]" /> {d.rating}
                    </span>
                    <span className="tabular-nums">{d.projects} projects</span>
                    <span className="tabular-nums text-[#A9A9B2]">since {d.since}</span>
                  </span>

                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      on ? 'bg-[#C49A3C] text-[#0A0A12]' : 'text-[#C9C9CF]'
                    }`}
                  >
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
