import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Hero({ setCurrentTab, openQuoteModal }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between bg-neutral-soft overflow-hidden px-6 md:px-12 pt-28 pb-12 border-b border-neutral-light">
      
      {/* Background Subtle Elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto w-full my-auto">
        
        {/* Left Big Typographic Statement */}
        <div className="lg:col-span-8 text-left">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">
            Residential · Commercial · Industrial / Est. 2005
          </span>
          <h1 className="font-display font-black text-primary text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase">
            Premium<br />
            Surface<br />
            Solutions<span className="text-gold">.</span>
          </h1>
          <p className="font-sans text-neutral-mid text-sm sm:text-base max-w-lg mt-8 leading-relaxed">
            From luxury homes to industrial facilities. We deliver surface protection, decorative finishes, and project-grade coating systems — backed by Berger's authorised product portfolio and 20 years of technical expertise.
          </p>
        </div>

        {/* Right Atmospheric Card with Grid Break */}
        <div className="lg:col-span-4 lg:mt-12 w-full">
          <div className="relative group overflow-hidden rounded-3xl border border-neutral-light bg-white p-4 shadow-premium hover:shadow-luxury transition-all duration-300">
            <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-light relative">
              <img 
                src="/images/living_room_visualizer.png" 
                alt="Premium interior with designer wall finishes" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
            
            <div className="text-left mt-4 px-2">
              <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-1">
                Colour Studio
              </span>
              <h3 className="font-display font-bold text-primary text-lg">
                Explore 2,500+ Shades
              </h3>
              <p className="font-sans text-neutral-mid text-xs mt-1">
                Visualise finishes against real materials in our digital studio.
              </p>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setCurrentTab('solutions')}
                  className="flex-1 bg-primary text-white text-[10px] font-display font-bold uppercase tracking-wider py-3.5 rounded-xl hover:bg-primary-light transition-colors text-center cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </button>
                <button
                  onClick={() => openQuoteModal('Project Consultation')}
                  className="flex-1 border border-neutral-light text-primary text-[10px] font-display font-bold uppercase tracking-wider py-3.5 rounded-xl hover:bg-neutral-light transition-colors text-center cursor-pointer"
                >
                  Talk to Our Experts
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-12 border-t border-neutral-light/50">
        <div className="flex gap-12 text-left">
          <div>
            <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider block mb-1">Experience Centre</span>
            <span className="font-sans text-xs text-primary font-bold">Hinkal Ring Road, Mysuru</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider block mb-1">Opening Hours</span>
            <span className="font-sans text-xs text-primary font-bold">Mon - Sat: 9 AM - 7 PM</span>
          </div>
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('main-content');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-neutral-mid hover:text-primary transition-colors cursor-pointer"
        >
          <span className="font-display text-[9px] font-bold uppercase tracking-widest">Scroll to Explore</span>
          <ArrowDown className="w-4 h-4 text-accent transform group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
