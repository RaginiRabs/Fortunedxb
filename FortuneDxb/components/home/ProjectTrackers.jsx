'use client';

import React from 'react';
import { Building2, Calendar, Percent, ShieldAlert, ArrowUpRight, BarChart3 } from 'lucide-react';

export default function ProjectTrackers({ projects = [] }) {
  const handleSecureAllocation = (projectId) => {
    console.log(`Locking secure intent data for allocation ID: ${projectId}`);
    const element = document.getElementById('concierge-intake');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // If no live data has loaded yet or the array is empty, slice a few elements or show an elegant skeleton state
  const activeAllocations = projects && projects.length > 0 ? projects.slice(0, 3) : [];

  return (
    <section className="w-full py-24 bg-background dark:bg-background-dark border-t border-border/30 dark:border-border-dark/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">


        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
              <Building2 className="w-3.5 h-3.5"/> Live Asset Registry
            </div>
            <h2 className="text-3xl sm:text-4xl font-extralight tracking-wide text-white">
              Vetted <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Off-Plan Trackers</span>
            </h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Real-time capital deployment trackers monitoring tier-1 developer escrow milestones. Pure financial transparency, connected straight to our portfolio database.
            </p>
          </div>
        </div>


        {activeAllocations.length === 0 ? (
          <div className="w-full text-center py-12 border border-dashed border-border/40 dark:border-border-dark/40 rounded-2xl bg-surface dark:bg-surface-dark">
            <p className="text-sm text-gray-400 font-light">Querying active developer registry assets...</p>
          </div>
        ) : (
          /* Live Dossier Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {activeAllocations.map((project) => {
              // Gracefully handle dynamic variations in schema key names
              const name = project.title || project.name || 'Premium Allocation';
              const developer = project.developer || 'Tier-1 Elite Developer';
              const location = project.location || project.community || 'Dubai Premium';
              const progress = project.constructionProgress || project.progress || 45;
              const phase = project.phase || 'Structural Works Underway';
              const payment = project.paymentPlan || project.paymentStructure || 'Structured Plan';
              const minEquity = project.price || project.minEquityRequired || 'Contact Advisory';
              const yieldPct = project.yield || project.projectedYield || '8.5%';
              const handover = project.completionDate || project.handover || 'Q4 2027';

              return (
                <div
                  key={project._id || project.id}
                  className="bg-surface dark:bg-surface-dark border border-border/60 dark:border-border-dark/60 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="space-y-5">

                    <div className="flex justify-between items-center border-b border-border/40 dark:border-border-dark/40 pb-4">
                      <div>
                        <span className="block text-[9px] uppercase tracking-widest text-gray-500 font-semibold">Registry Asset</span>
                        <span className="text-xs font-semibold text-white truncate max-w-[150px] block">{developer}</span>
                      </div>
                      <span className="text-[10px] tracking-wider text-primary font-medium bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        {location}
                      </span>
                    </div>


                    <h3 className="text-lg font-light text-white tracking-wide truncate">
                      {name}
                    </h3>


                    <div className="space-y-2 bg-background/40 dark:bg-background-dark/40 p-4 rounded-xl border border-border/40 dark:border-border-dark/40">
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Percent className="w-3 h-3 text-primary"/> Progress Landmark
                        </span>
                        <span className="text-primary font-mono">{progress}%</span>
                      </div>
                      <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-primary-dark h-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 font-light italic pt-1 flex items-center gap-1">
                        <ShieldAlert className="w-2.5 h-2.5 text-primary shrink-0"/> {phase}
                      </p>
                    </div>


                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-background/30 dark:bg-background-dark/30 border border-border/30 dark:border-border-dark/30 rounded-xl text-left">
                        <span className="block text-[9px] uppercase tracking-widest text-gray-500 font-medium">Valuation Target</span>
                        <span className="text-xs font-semibold text-white font-mono truncate block">{minEquity}</span>
                      </div>
                      <div className="p-3 bg-background/30 dark:bg-background-dark/30 border border-border/30 dark:border-border-dark/30 rounded-xl text-left">
                        <span className="block text-[9px] uppercase tracking-widest text-gray-500 font-medium">Target ROI Net</span>
                        <span className="text-xs font-semibold text-emerald-400 font-mono flex items-center gap-1">
                          <BarChart3 className="w-3 h-3"/> {yieldPct}
                        </span>
                      </div>
                    </div>
                  </div>


                  <div className="pt-4 border-t border-border/40 dark:border-border-dark/40 flex items-center justify-between gap-4">
                    <div className="text-left">
                      <span className="block text-[9px] uppercase tracking-widest text-gray-500 font-medium flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5"/> Est. Handover
                      </span>
                      <span className="text-xs text-gray-300 font-medium">{handover}</span>
                    </div>

                    <button
                      onClick={() => handleSecureAllocation(project._id || project.id)}
                      className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-semibold text-black bg-primary hover:bg-primary/95 rounded-xl transition-all duration-300 flex items-center gap-1.5"
                    >
                      Inspect Dossier <ArrowUpRight className="w-3.5 h-3.5"/>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
