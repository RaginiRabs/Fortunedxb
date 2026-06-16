'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { popularDevelopers } from '@/mock/prototype4/showcase';

export default function PopularDevelopers() {
  // Home shows a curated set; the full directory lives on /developers.
  const featured = popularDevelopers.slice(0, 5);

  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto mb-10 max-w-6xl px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2a2520] font-[family-name:var(--font-heading)]">
          Developers
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#574e44]">
          Hover a developer to open their story.
        </p>
      </div>

      {/* Expanding accordion panels — full width, matches the Locations row */}
      <div className="flex flex-col gap-3 px-6 md:px-12 sm:h-[340px] sm:flex-row">
        {featured.map((dev, i) => (
          <div
            key={dev.name}
            className="group relative h-[200px] cursor-pointer overflow-hidden rounded-2xl shadow-md transition-[flex-grow] duration-500 ease-out sm:h-auto sm:flex-1 sm:hover:flex-[2.6]"
          >
            <img
              src={dev.image}
              alt={dev.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Focus dim — lifts on hover */}
            <div className="absolute inset-0 bg-black/35 transition-colors duration-500 sm:group-hover:bg-black/0" />
            {/* Bottom gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            {/* Editorial index */}
            <span className="absolute left-5 top-5 text-sm font-bold tracking-[0.25em] text-white/70">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="relative inline-block text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
                {dev.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-10 rounded-full bg-white transition-all duration-500 group-hover:w-full" />
              </h3>
              <div className="max-h-40 overflow-hidden opacity-100 transition-all duration-500 ease-out sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-40 sm:group-hover:opacity-100">
                <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-white/85 sm:line-clamp-4">
                  {dev.blurb}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/prototype4/developers"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#2a2520] transition-all hover:gap-3"
        >
          View all developers <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
