'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import InvestorWindows from '@/components/home/InvestorWindows';
import InvestmentTracks from '@/components/home/InvestmentTracks';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import MasterPlanSection from '@/components/home/MasterPlanSection';
import WhyInvestSection from '@/components/home/WhyInvestSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import TopDevelopers from '@/components/home/TopDevelopers';

export default function HomePage() {
  // Single continuous warm-charcoal canvas — institutional, no zebra blocks.
  return (
    <div className="min-h-screen bg-[#161310] text-[#F5F2ED] selection:bg-[#B0905E] selection:text-[#161310]">
      <HeroSection />
      <InvestorWindows />
      <InvestmentTracks />
      <FeaturedProjects />
      <MasterPlanSection />
      <WhyInvestSection />
      <TopDevelopers />
      <TestimonialsSection />
    </div>
  );
}
