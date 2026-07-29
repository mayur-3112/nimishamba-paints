import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck } from 'lucide-react';
import ColorMyWorldWebGL from '../components/ColorMyWorldWebGL';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Hero({ setCurrentTab, openQuoteModal }: HeroProps) {
  return (
    <section className="relative flex flex-col justify-between bg-neutral-soft overflow-hidden px-5 sm:px-8 md:px-12 pt-20 sm:pt-28 pb-12 border-b border-neutral-light text-left">
      
      {/* Background Subtle Warm Lighting */}
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Grid: Clean & Well Proportioned */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full my-auto relative z-10">
        
        {/* Left Typographic Statement */}
        <div className="lg:col-span-7 text-left">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[9px] sm:text-[10px] font-black text-neutral-mid uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-neutral-light shadow-2xs">
              Residential &middot; Commercial &middot; Industrial &middot; Est. 2005
            </span>
          </div>

          <h1 className="font-display font-black text-primary text-3xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight uppercase">
            Sri Nimishamba<br />
            Paints<span className="text-[#E31959]">.</span>
          </h1>
          
          <p className="font-display font-bold text-[#E31959] text-sm sm:text-lg uppercase tracking-wider mt-2.5">
            Authorised Berger Paints Experience Centre
          </p>

          <p className="font-sans text-neutral-mid text-xs sm:text-sm max-w-lg mt-3.5 leading-relaxed">
            From luxury residences to industrial facilities. We deliver surface protection, decorative finishes, and project-grade coating systems &mdash; backed by Berger's authorised product portfolio and 20 years of technical expertise.
          </p>

          {/* Primary Action Buttons (2 Clean, Un-crowded Buttons) */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => openQuoteModal('Book Colour Consultation')}
              className="min-h-[48px] bg-[#E31959] hover:bg-[#C20F4B] active:scale-[0.98] text-white font-display text-xs font-black uppercase tracking-wider px-7 rounded-xl shadow-luxury transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer border border-[#E31959]/30"
            >
              <span>Book Colour Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Signature Color My World Real-Time Fluid Dynamics Interaction */}
            <ColorMyWorldWebGL />
          </div>
        </div>

        {/* Right Atmospheric Showroom Showcase Card (Proportionately Sized) */}
        <div className="lg:col-span-5 w-full mt-2 lg:mt-0">
          <div className="relative group overflow-hidden rounded-2xl border border-neutral-light/80 bg-white p-3 shadow-luxury transition-all duration-500 max-w-lg mx-auto lg:max-w-none">
            <div className="overflow-hidden rounded-xl aspect-[4/3] bg-neutral-light relative">
              <img 
                src="/images/shop_interior.png" 
                alt="Nimishamba showroom interior with Berger Colour World" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />

              <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-neutral-light shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#E31959]" />
                <span className="font-display text-[8px] font-black uppercase tracking-widest text-primary">
                  Berger Colour World &middot; Hinkal
                </span>
              </div>
            </div>
            
            <div className="text-left mt-3 px-1">
              <span className="text-[8px] font-extrabold text-[#E31959] uppercase tracking-wider block mb-0.5">
                Digital Colour Studio
              </span>
              <h3 className="font-display font-black text-primary text-base sm:text-lg">
                Explore 2,500+ Computerised Shades
              </h3>
              <p className="font-sans text-neutral-mid text-xs mt-0.5">
                Visualise finishes against real interior materials in our digital lab.
              </p>
              
              <div className="flex gap-2.5 mt-3">
                <button
                  onClick={() => setCurrentTab('shades')}
                  className="flex-1 min-h-[44px] bg-primary text-white text-[10px] font-display font-black uppercase tracking-wider px-3 rounded-lg hover:bg-primary-light transition-colors text-center cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span>Open Colour Studio</span>
                  <ArrowRight className="w-3 h-3 text-gold" />
                </button>
                <button
                  onClick={() => openQuoteModal('Project Consultation')}
                  className="flex-1 min-h-[44px] border border-neutral-light/80 text-primary text-[10px] font-display font-bold uppercase tracking-wider px-3 rounded-lg hover:bg-neutral-soft transition-colors text-center cursor-pointer"
                >
                  Talk to Experts
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-6 mt-6 border-t border-neutral-light/60 relative z-10">
        <div className="flex flex-wrap gap-5 sm:gap-10 text-left">
          <div>
            <span className="text-[8px] font-bold text-neutral-mid uppercase tracking-wider block mb-0.5">Experience Centre</span>
            <span className="font-sans text-xs text-primary font-bold">Hinkal Ring Road, Mysuru</span>
          </div>
          <div>
            <span className="text-[8px] font-bold text-neutral-mid uppercase tracking-wider block mb-0.5">Leadership Desk</span>
            <a href="tel:+919448084351" className="font-sans text-xs text-[#E31959] font-black hover:underline">
              Ajay Kedia (Owner): +91 94480 84351
            </a>
          </div>
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('main-content');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 group text-neutral-mid hover:text-primary transition-colors cursor-pointer"
        >
          <span className="font-display text-[8px] font-bold uppercase tracking-widest">Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#E31959] transform group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
