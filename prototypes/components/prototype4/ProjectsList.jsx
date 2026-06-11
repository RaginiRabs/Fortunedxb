'use client';

import { useState } from 'react';
import Card from './Card';

export default function ProjectsList({ projects }) {
  const [activeTab, setActiveTab] = useState('all');

  // Dynamically map variants: Project 2 is resale, others are offplan
  const mappedProjects = projects.map((p) => ({
    ...p,
    variant: p.id === 2 ? 'resale' : 'offplan',
  }));

  // Filter based on active tab
  const filteredProjects = mappedProjects.filter((p) => {
    if (activeTab === 'all') return true;
    return p.variant === activeTab;
  });

  // Calculate counts for badges
  const allCount = mappedProjects.length;
  const offplanCount = mappedProjects.filter((p) => p.variant === 'offplan').length;
  const resaleCount = mappedProjects.filter((p) => p.variant === 'resale').length;

  const tabs = [
    { id: 'all', label: 'All Projects', count: allCount },
    { id: 'offplan', label: 'Off-Plan', count: offplanCount },
    { id: 'resale', label: 'Resale', count: resaleCount },
  ];

  return (
    <div>
      {/* Premium Segmented Control Tab Switcher */}
      <div className="flex justify-center md:justify-start mb-10">
        <div className="inline-flex rounded-xl bg-[#f5f1ea] border border-[#e8e2da] p-1.5 shadow-sm">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  active
                    ? 'bg-[#80603f] text-white shadow-md'
                    : 'text-[#574e44] hover:text-[#80603f] hover:bg-[#faf7f3]/50'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`inline-flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 py-0.5 ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-[#e8e2da] text-[#675c4e]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Layout */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#e8e2da] rounded-2xl bg-white">
          <p className="text-[#574e44] text-lg font-medium">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p) => (
            <Card key={p.id} project={p} variant={p.variant} />
          ))}
        </div>
      )}
    </div>
  );
}
