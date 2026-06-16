'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Card from '@/components/prototype4/Card';
import { projects } from '@/mock/prototype4/projects';

export default function ResaleListings() {
  const resale = [3, 2, 1, 4]
    .map((id) => projects.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="border-y border-[#e8e2da] bg-[#faf7f3]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:px-12 py-16 md:py-20 lg:grid-cols-12">
        {/* Left sticky intro panel */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <span className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#80603f]">
              <TrendingUp size={15} /> Ready to Move
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#2a2520] font-[family-name:var(--font-heading)]">
              Resale &amp; Ready Homes
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#574e44]">
              Skip the wait. Hand-picked secondary-market homes with proven rental yields and
              immediate handover — ideal for end-users and yield-focused investors.
            </p>
            <Link
              href="/prototype4/projects"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#80603f] px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#6a4b2e]"
            >
              Browse resales <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right cards grid */}
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:col-span-8">
          {resale.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="h-full"
            >
              <Card project={p} variant="resale" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
