import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Sparkles, Sliders } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (category?: string) => void;
}

interface PaletteOption {
  id: string;
  name: string;
  subtitle: string;
  hex: string;
  accentGlow: string;
  textColor: string;
  badgeBorder: string;
  roomImage: string;
}

const PALETTES: PaletteOption[] = [
  {
    id: 'crimson',
    name: 'Berger Crimson',
    subtitle: 'Signature Passion & Elegance',
    hex: '#E31959',
    accentGlow: 'rgba(227, 25, 89, 0.25)',
    textColor: 'text-[#E31959]',
    badgeBorder: 'border-[#E31959]/30 bg-[#E31959]/10 text-[#E31959]',
    roomImage: '/images/painted_rooms.png'
  },
  {
    id: 'gold',
    name: 'Royal Gold',
    subtitle: 'Warm Metallic Architectural Polish',
    hex: '#D4AF37',
    accentGlow: 'rgba(212, 175, 55, 0.25)',
    textColor: 'text-gold',
    badgeBorder: 'border-gold/30 bg-gold/10 text-gold-dark',
    roomImage: '/images/sol_texture.jpg'
  },
  {
    id: 'teal',
    name: 'Imperial Teal',
    subtitle: 'Deep Serene Interior Balance',
    hex: '#008080',
    accentGlow: 'rgba(0, 128, 128, 0.25)',
    textColor: 'text-emerald-700',
    badgeBorder: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800',
    roomImage: '/images/rooms/dining.png'
  },
  {
    id: 'sapphire',
    name: 'Deep Sapphire',
    subtitle: 'Quiet Executive Sophistication',
    hex: '#1E3A5F',
    accentGlow: 'rgba(30, 58, 95, 0.25)',
    textColor: 'text-primary',
    badgeBorder: 'border-primary/30 bg-primary/10 text-primary',
    roomImage: '/images/sol_office_interior.png'
  },
];

export default function Hero({ setCurrentTab, openQuoteModal }: HeroProps) {
  const [activePalette, setActivePalette] = useState<PaletteOption>(PALETTES[0]);
  const [isRevealed, setIsRevealed] = useState(false);

  // Smooth architectural lighting entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-neutral-soft overflow-hidden px-6 md:px-12 pt-32 pb-12 border-b border-neutral-light text-left transition-colors duration-1000">
      
      {/* ── ARCHITECTURAL LIGHTING BEAMS & AMBIENT GLOW ──────────────── */}
      <div 
        className="absolute top-1/4 right-10 w-[600px] h-[600px] rounded-full filter blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: activePalette.accentGlow,
          opacity: isRevealed ? 0.9 : 0.2,
          transform: isRevealed ? 'scale(1)' : 'scale(0.6)'
        }}
      />

      <div 
        className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full filter blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: 'rgba(212, 175, 55, 0.12)',
          opacity: isRevealed ? 0.8 : 0.1,
        }}
      />

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto w-full my-auto relative z-10">
        
        {/* Left Big Typographic Statement */}
        <div className="lg:col-span-7 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest">
              Residential &middot; Commercial &middot; Industrial &middot; Est. 2005
            </span>
            <span className={`text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-500 ${activePalette.badgeBorder}`}>
              {activePalette.name} Palette
            </span>
          </div>

          <h1 className="font-display font-black text-primary text-5xl sm:text-7xl lg:text-8xl leading-[0.92] tracking-tight uppercase">
            Sri Nimishamba<br />
            Paints<span className={`transition-colors duration-700 ${activePalette.textColor}`}>.</span>
          </h1>
          
          <p className={`font-display font-extrabold text-lg sm:text-xl uppercase tracking-wider mt-4 transition-colors duration-700 ${activePalette.textColor}`}>
            Premium Surface Solutions
          </p>

          <p className="font-sans text-neutral-mid text-sm sm:text-base max-w-lg mt-6 leading-relaxed">
            From luxury homes to industrial facilities. We deliver surface protection, decorative finishes, and project-grade coating systems &mdash; backed by Berger's authorised product portfolio and 20 years of technical expertise.
          </p>

          {/* Interactive Architectural Swatch Controls */}
          <div className="mt-8 pt-6 border-t border-neutral-light/80">
            <div className="flex items-center gap-2 mb-3">
              <Sliders className="w-3.5 h-3.5 text-neutral-mid" />
              <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-widest">
                Interactive Palette Experience
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {PALETTES.map((palette) => {
                const isSelected = activePalette.id === palette.id;
                return (
                  <button
                    key={palette.id}
                    onClick={() => setActivePalette(palette)}
                    className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-luxury border-primary/40 scale-105'
                        : 'bg-white/60 hover:bg-white border-neutral-light/80 hover:border-neutral-mid/40'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full shadow-inner flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: palette.hex }}
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-display text-xs font-bold text-primary leading-none">
                        {palette.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openQuoteModal('Book Colour Consultation')}
              className="bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-luxury hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border border-[#E31959]/30"
            >
              <span>Book Colour Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => setCurrentTab('solutions')}
              className="border border-neutral-light hover:border-primary text-primary font-display text-xs font-bold uppercase tracking-wider px-7 py-4 rounded-xl hover:bg-white transition-all cursor-pointer shadow-sm"
            >
              Explore Solutions
            </button>
          </div>

        </div>

        {/* Right Atmospheric Interactive Card */}
        <div className="lg:col-span-5 w-full">
          <div className="relative group overflow-hidden rounded-3xl border border-neutral-light bg-white p-5 shadow-luxury transition-all duration-500">
            <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-neutral-light relative">
              <img 
                src={activePalette.roomImage} 
                alt={`${activePalette.name} interior preview`} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
              />
              <div 
                className="absolute inset-0 transition-opacity duration-700 mix-blend-multiply"
                style={{ background: activePalette.accentGlow }}
              />
            </div>
            
            <div className="text-left mt-5 px-1 flex justify-between items-end">
              <div>
                <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-1">
                  Selected Atmosphere &middot; {activePalette.name}
                </span>
                <h3 className="font-display font-bold text-primary text-lg sm:text-xl">
                  {activePalette.subtitle}
                </h3>
              </div>

              <button
                onClick={() => setCurrentTab('shades')}
                className="bg-neutral-soft hover:bg-primary hover:text-white border border-neutral-light p-3 rounded-xl transition-all cursor-pointer flex-shrink-0"
                title="Open Material Mood Board"
              >
                <Sparkles className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Layout Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-10 border-t border-neutral-light/60 relative z-10">
        <div className="flex gap-12 text-left">
          <div>
            <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider block mb-1">Experience Centre</span>
            <span className="font-sans text-xs text-primary font-bold">Hinkal Ring Road, Mysuru</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider block mb-1">Opening Hours</span>
            <span className="font-sans text-xs text-primary font-bold">Mon &ndash; Sat: 9:00 AM &ndash; 8:30 PM</span>
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
