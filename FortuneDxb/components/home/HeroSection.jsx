'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import SearchBox from '@/components/home/SearchBox';
import FilterDrawer from '@/components/dialogs/FilterDrawer';
import Reveal from '@/components/common/Reveal';
import { useDevelopers } from '@/hooks/developer/useDeveloperHook';

// Cinematic backdrop — swap with your own CDN/uploaded asset for production
const HERO_IMAGE =
  "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=80')";

export default function HeroSection() {
  // --- SearchBox state bindings (controlled component) ---
  const [searchQuery, setSearchQuery] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [usageType, setUsageType] = useState('');
  const [unitType, setUnitType] = useState('');

  // --- FilterDrawer state ---
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([500000, 10000000]);
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [completionYear, setCompletionYear] = useState('');
  const [paymentPlan, setPaymentPlan] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedHighlights, setSelectedHighlights] = useState([]);

  // Developers list for the drawer — fetched lazily when it first opens
  const { developers, loading: developersLoading, fetchDevelopers } = useDevelopers();

  useEffect(() => {
    if (filterDrawerOpen && developers.length === 0) {
      fetchDevelopers();
    }
  }, [filterDrawerOpen, developers.length, fetchDevelopers]);

  const handleSearch = () => {
    console.log('Executing institutional portfolio query:', {
      searchQuery,
      projectStatus,
      usageType,
      unitType,
    });
    // This will route directly to your /projects logic with search parameters later
  };
  // ------------------------------------------------------

  const scrollToIntake = () => {
    const element = document.getElementById('concierge-intake');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center bg-[#161310] overflow-hidden pt-20">

      {/* Cinematic image + charcoal wash */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: HERO_IMAGE }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161310]/60 via-[#161310]/85 to-[#161310]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161310]/80 via-transparent to-transparent" />
      </div>

      {/* Brand logo — top-left */}
      <div className="absolute top-6 left-6 z-20">
        <img src="/asset/logowhite.png" alt="Fortune DXB" className="h-10 w-auto object-contain" />
      </div>

      {/* Calm, uncluttered content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="space-y-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#B0905E]">
            Private Client Registry · Buyers &amp; Sellers
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-[#F5F2ED] leading-[1.05]">
            Deploy private capital.<br />Liquidate discreetly.
          </h1>

          <p className="max-w-xl text-base md:text-lg font-light leading-loose text-white/55">
            The gateway to prime Dubai real estate.
          </p>
        </Reveal>

        {/* One search bar */}
        <Reveal delay={160} className="mt-12">
          <SearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            projectStatus={projectStatus}
            setProjectStatus={setProjectStatus}
            usageType={usageType}
            setUsageType={setUsageType}
            unitType={unitType}
            setUnitType={setUnitType}
            setFilterDrawerOpen={setFilterDrawerOpen}
            onSearch={handleSearch}
          />
        </Reveal>

        {/* Quiet seller link — gold underline on hover */}
        <Reveal delay={240} className="mt-8">
          <button
            onClick={scrollToIntake}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm text-white/55 hover:text-[#F5F2ED] transition-colors"
          >
            <span className="border-b border-transparent group-hover:border-[#B0905E] transition-colors">
              Property owner looking to exit? Submit your asset to our director
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>

      {/* Advanced filters drawer */}
      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        searchQuery={searchQuery}
        projectStatus={projectStatus}
        usageType={usageType}
        unitType={unitType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedDeveloper={selectedDeveloper}
        setSelectedDeveloper={setSelectedDeveloper}
        completionYear={completionYear}
        setCompletionYear={setCompletionYear}
        paymentPlan={paymentPlan}
        setPaymentPlan={setPaymentPlan}
        selectedLocality={selectedLocality}
        setSelectedLocality={setSelectedLocality}
        selectedHighlights={selectedHighlights}
        setSelectedHighlights={setSelectedHighlights}
        developers={developers}
        developersLoading={developersLoading}
      />
    </div>
  );
}
