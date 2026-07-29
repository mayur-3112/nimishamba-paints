import React, { useState } from 'react';
import { SOLUTIONS, Solution } from '../data/staticData';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface SolutionsProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

const TIERS = ['All', 'Residential', 'Commercial', 'Industrial'] as const;

export default function Solutions({ setCurrentTab, openQuoteModal }: SolutionsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = activeFilter === 'All'
    ? SOLUTIONS
    : SOLUTIONS.filter(s => s.tier === activeFilter);

  return (
    <section className="py-16 sm:py-24 bg-white" id="solutions">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div className="text-left max-w-xl">
            <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest block mb-2">Our Surface Solutions</span>
            <h2 className="font-display font-black text-primary text-3xl sm:text-4xl leading-tight">
              Surface Solutions for Every Scale
            </h2>
            <p className="font-sans text-neutral-mid text-xs sm:text-sm mt-3 leading-relaxed">
              From a single apartment to a multi-facility industrial complex. We specify, supply, and support coating systems across every project type.
            </p>
          </div>
          
          {/* Estimator CTA */}
          <button 
            onClick={() => setCurrentTab('estimator')}
            className="inline-flex items-center gap-2 text-[#E31959] font-display text-xs font-bold uppercase tracking-wider hover:translate-x-1.5 transition-transform mt-4 md:mt-0 min-h-[48px]"
          >
            <span>Estimate Materials Needed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tier Filter Pills (Horizontal Touch Slider) */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-neutral-light/80 -mx-5 px-5 sm:mx-0 sm:px-0">
          {TIERS.map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveFilter(tier)}
              className={`font-display text-xs font-bold uppercase tracking-wider px-5 min-h-[48px] rounded-xl border whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tier
                  ? 'bg-primary text-white border-primary shadow-sm scale-105'
                  : 'bg-neutral-soft text-neutral-mid border-neutral-light hover:border-neutral-mid'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Solutions Cards: Mobile Horizontal Swipe Carousel / Desktop Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none">
          {filtered.map((solution) => (
            <div 
              key={solution.id} 
              className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center bg-neutral-soft rounded-3xl overflow-hidden border border-neutral-light/80 hover:border-primary transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-luxury"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-neutral-light">
                <img 
                  src={solution.image} 
                  alt={solution.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 text-[9px] font-black text-primary uppercase tracking-wider">
                    {solution.tier}
                  </span>
                  <span className="bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-wider">
                    {solution.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="font-display font-black text-primary text-lg sm:text-xl mb-2">
                  {solution.name}
                </h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed mb-6 flex-grow">
                  {solution.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 border-t border-neutral-light/80 pt-5 mt-auto">
                  <button
                    onClick={() => openQuoteModal(solution.name)}
                    className="min-h-[48px] bg-primary text-white font-display text-xs font-bold uppercase tracking-wider px-3 rounded-xl hover:bg-primary-light transition-colors text-center active:scale-95 cursor-pointer"
                  >
                    Get Quote
                  </button>
                  <button
                    onClick={() => openQuoteModal(`Specification Request — ${solution.name}`)}
                    className="min-h-[48px] bg-white text-primary border border-neutral-light/80 font-display text-xs font-bold uppercase tracking-wider px-3 rounded-xl hover:border-primary hover:text-accent transition-all text-center active:scale-95 cursor-pointer"
                  >
                    Request Spec
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-center gap-1.5 text-neutral-mid text-xs font-display font-bold uppercase tracking-widest mt-4 md:hidden">
          <span>Swipe to explore solutions</span>
          <ChevronRight className="w-4 h-4 text-[#E31959] animate-pulse" />
        </div>
        
      </div>
    </section>
  );
}
