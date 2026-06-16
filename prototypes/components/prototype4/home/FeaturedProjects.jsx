'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Card from '@/components/prototype4/Card';
import { projects } from '@/mock/prototype4/projects';

export default function FeaturedProjects() {
  const featured = [1, 3, 4]
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-12 py-16 md:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="mb-2 block text-[12px] font-bold uppercase tracking-[0.2em] text-[#80603f]">
            Handpicked
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a2520] font-[family-name:var(--font-heading)]">
            Featured Projects
          </h2>
        </div>
        <Link
          href="/prototype4/projects"
          className="hidden items-center gap-1.5 text-sm font-bold text-[#6a4b2e] transition-all hover:gap-2.5 sm:inline-flex"
        >
          View all <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="h-full"
          >
            <Card project={p} variant="offplan" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
