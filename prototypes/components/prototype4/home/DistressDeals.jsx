'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
import Card from '@/components/prototype4/Card';
import { projects } from '@/mock/prototype4/projects';

const DEALS = [
  { id: 2, off: 19 },
  { id: 4, off: 22 },
  { id: 1, off: 16 },
  { id: 3, off: 14 },
];

export default function DistressDeals() {
  const deals = DEALS
    .map((d) => ({ project: projects.find((p) => p.id === d.id), off: d.off }))
    .filter((d) => d.project);

  return (
    <section className="relative overflow-hidden bg-[#160f0a]">
      {/* Glow accents — eye-catching */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#80603f]/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12 py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="mb-2 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live Deals
            </span>
            <h2 className="flex items-center gap-2 text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
              <Flame className="text-red-500" size={30} /> Distress Deals
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
              Motivated sellers, below-market pricing. Move fast — these don’t last.
            </p>
          </div>
          <Link
            href="/prototype4/distress"
            className="hidden items-center gap-1.5 text-sm font-bold text-red-400 transition-all hover:gap-2.5 sm:inline-flex"
          >
            All deals <ArrowRight size={16} />
          </Link>
        </div>

        {/* Horizontal scroll-snap carousel */}
        <div className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 no-scrollbar">
          {deals.map((d, i) => (
            <motion.div
              key={d.project.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-[300px] shrink-0 snap-start sm:w-[320px]"
            >
              <Card project={d.project} variant="distress" discount={d.off} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
