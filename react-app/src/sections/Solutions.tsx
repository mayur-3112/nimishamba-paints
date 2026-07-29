import React, { useState } from 'react';
import { SOLUTIONS, Solution } from '../data/staticData';
import { ArrowRight } from 'lucide-react';

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
    <section className="py-24 bg-white" id="solutions">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left max-w-xl">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-2">Our Solutions</span>
            <h2 className="font-display font-bold text-primary text-3xl sm:text-4xl">
              Surface Solutions for Every Scale
            </h2>
            <p className="font-sans text-neutral-mid text-sm mt-3">
              From a single apartment to a multi-facility industrial complex. We specify, supply, and support coating systems across every project type.
            </p>
          </div>
          
          {/* Estimator CTA */}
          <button 
            onClick={() => setCurrentTab('estimator')}
            className="inline-flex items-center gap-2 text-accent font-display text-sm font-bold uppercase tracking-wider hover:translate-x-1.5 transition-transform mt-4 md:mt-0"
          >
            <span>Estimate Materials Needed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tier Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-neutral-light">
          {TIERS.map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveFilter(tier)}
              className={`font-display text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-lg border whitespace-nowrap transition-all ${
                activeFilter === tier
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-neutral-soft text-neutral-mid border-neutral-light hover:border-neutral-mid'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((solution) => (
            <div 
              key={solution.id} 
              className="bg-neutral-soft rounded-2xl overflow-hidden border border-neutral-light hover:border-primary transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-neutral-light">
                <img 
                  src={solution.image} 
                  alt={solution.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white border-opacity-40 text-[10px] font-bold text-primary uppercase tracking-wider">
                    {solution.tier}
                  </span>
                  <span className="bg-primary bg-opacity-90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                    {solution.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="font-display font-bold text-primary text-lg mb-2">
                  {solution.name}
                </h3>
                <p className="font-sans text-neutral-mid text-xs leading-relaxed mb-6 flex-grow">
                  {solution.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-neutral-light pt-5 mt-auto">
                  <button
                    onClick={() => openQuoteModal(solution.name)}
                    className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-primary-light transition-colors text-center"
                  >
                    Get Quote
                  </button>
                  <button
                    onClick={() => openQuoteModal(`Specification Request — ${solution.name}`)}
                    className="bg-white text-primary border border-neutral-light font-display text-xs font-bold uppercase tracking-wider py-3 rounded-lg hover:border-primary hover:text-accent transition-all text-center"
                  >
                    Request Spec
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
