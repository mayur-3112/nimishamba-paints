import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

export default function Hero({ setCurrentTab, openQuoteModal }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between bg-neutral-soft overflow-hidden px-5 sm:px-8 md:px-12 pt-28 sm:pt-32 pb-16 border-b border-neutral-light text-left">
      
      {/* Background Subtle Warm Blur */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center max-w-7xl mx-auto w-full my-auto relative z-10">
        
        {/* Left Typographic Statement */}
        <div className="lg:col-span-7 text-left">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[9px] sm:text-[10px] font-black text-neutral-mid uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full border border-neutral-light shadow-2xs">
              Residential &middot; Commercial &middot; Industrial &middot; Est. 2005
            </span>
          </div>

          <h1 className="font-display font-black text-primary text-4xl sm:text-6xl lg:text-7xl leading-[0.92] tracking-tight uppercase">
            Sri Nimishamba<br />
            Paints<span className="text-[#E31959]">.</span>
          </h1>
          
          <p className="font-display font-extrabold text-[#E31959] text-base sm:text-xl uppercase tracking-wider mt-3 sm:mt-4">
            Authorised Berger Paints Experience Centre
          </p>

          <p className="font-sans text-neutral-mid text-xs sm:text-base max-w-lg mt-4 sm:mt-6 leading-relaxed">
            From luxury residences to industrial facilities. We deliver surface protection, decorative finishes, and project-grade coating systems &mdash; backed by Berger's authorised product portfolio and 20 years of technical expertise.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={() => openQuoteModal('Book Colour Consultation')}
              className="min-h-[52px] bg-[#E31959] hover:bg-[#C20F4B] active:scale-[0.98] text-white font-display text-xs font-black uppercase tracking-wider px-8 rounded-2xl shadow-luxury transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer border border-[#E31959]/30"
            >
              <span>Book Colour Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => setCurrentTab('solutions')}
              className="min-h-[48px] border border-neutral-light/80 hover:border-primary text-primary font-display text-xs font-bold uppercase tracking-wider px-7 rounded-2xl hover:bg-white transition-all cursor-pointer shadow-2xs inline-flex items-center justify-center"
            >
              Explore Solutions
            </button>
          </div>
        </div>

        {/* Right Atmospheric Showroom Showcase Card */}
        <div className="lg:col-span-5 w-full mt-4 lg:mt-0">
          <div className="relative group overflow-hidden rounded-3xl border border-neutral-light/80 bg-white p-3.5 sm:p-4 shadow-luxury transition-all duration-500">
            <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-light relative">
              <img 
                src="/images/shop_interior.png" 
                alt="Nimishamba showroom interior with Berger Colour World" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />

              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-light shadow-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E31959]" />
                <span className="font-display text-[9px] font-black uppercase tracking-widest text-primary">
                  Berger Colour World &middot; Hinkal
                </span>
              </div>
            </div>
            
            <div className="text-left mt-4 px-1">
              <span className="text-[8px] sm:text-[9px] font-extrabold text-[#E31959] uppercase tracking-wider block mb-0.5">
                Digital Colour Studio
              </span>
              <h3 className="font-display font-black text-primary text-lg sm:text-xl">
                Explore 2,500+ Computerised Shades
              </h3>
              <p className="font-sans text-neutral-mid text-xs mt-1">
                Visualise finishes against real interior materials in our digital lab.
              </p>
              
              <div className="flex gap-2.5 mt-4">
                <button
                  onClick={() => setCurrentTab('shades')}
                  className="flex-1 min-h-[48px] bg-primary text-white text-[10px] font-display font-black uppercase tracking-wider px-3 rounded-xl hover:bg-primary-light transition-colors text-center cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <span>Open Colour Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </button>
                <button
                  onClick={() => openQuoteModal('Project Consultation')}
                  className="flex-1 min-h-[48px] border border-neutral-light/80 text-primary text-[10px] font-display font-bold uppercase tracking-wider px-3 rounded-xl hover:bg-neutral-soft transition-colors text-center cursor-pointer"
                >
                  Talk to Experts
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-8 border-t border-neutral-light/60 relative z-10">
        <div className="flex flex-wrap gap-6 sm:gap-12 text-left">
          <div>
            <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider block mb-0.5">Experience Centre</span>
            <span className="font-sans text-xs text-primary font-bold">Hinkal Ring Road, Mysuru</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider block mb-0.5">Leadership Desk</span>
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
          className="flex items-center gap-2 group text-neutral-mid hover:text-primary transition-colors cursor-pointer"
        >
          <span className="font-display text-[9px] font-bold uppercase tracking-widest">Scroll to Explore</span>
          <ArrowDown className="w-4 h-4 text-[#E31959] transform group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
