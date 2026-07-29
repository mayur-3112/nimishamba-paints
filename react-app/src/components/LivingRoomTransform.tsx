import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Palette } from 'lucide-react';

interface LivingRoomTransformProps {
  openQuoteModal: (category?: string) => void;
  setCurrentTab: (tab: string) => void;
}

interface ColorShade {
  id: string;
  name: string;
  code: string;
  hex: string;
  accentGlow: string;
  textColor: string;
  bgBadge: string;
  description: string;
  roomImage: string;
}

const COLOR_SHADES: ColorShade[] = [
  {
    id: 'berger-crimson',
    name: 'Berger Signature Crimson',
    code: 'B-7741',
    hex: '#E31959',
    accentGlow: 'rgba(227, 25, 89, 0.28)',
    textColor: 'text-[#E31959]',
    bgBadge: 'bg-[#E31959]/10 text-[#E31959] border-[#E31959]/30',
    description: 'A rich, dramatic accent wall tone that brings warmth and focal luxury to contemporary living spaces.',
    roomImage: '/images/painted_rooms.png'
  },
  {
    id: 'royal-gold',
    name: 'Imperial Heritage Gold',
    code: 'B-2910',
    hex: '#D4AF37',
    accentGlow: 'rgba(212, 175, 55, 0.28)',
    textColor: 'text-gold',
    bgBadge: 'bg-gold/10 text-gold-dark border-gold/30',
    description: 'Subtle metallic undertones that catch natural morning sunlight and cast a regal glow.',
    roomImage: '/images/sol_texture.jpg'
  },
  {
    id: 'emerald-teal',
    name: 'Silk Mineral Emerald',
    code: 'B-6042',
    hex: '#008080',
    accentGlow: 'rgba(0, 128, 128, 0.28)',
    textColor: 'text-emerald-700',
    bgBadge: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/30',
    description: 'Deep botanical tone that anchors Scandinavian timber, warm linen, and architectural greenery.',
    roomImage: '/images/rooms/dining.png'
  },
  {
    id: 'sapphire-navy',
    name: 'Executive Sapphire',
    code: 'B-1094',
    hex: '#1E3A5F',
    accentGlow: 'rgba(30, 58, 95, 0.28)',
    textColor: 'text-primary',
    bgBadge: 'bg-primary/10 text-primary border-primary/30',
    description: 'Restrained, deep architectural navy for modern living rooms and executive study suites.',
    roomImage: '/images/sol_office_interior.png'
  }
];

export default function LivingRoomTransform({ openQuoteModal, setCurrentTab }: LivingRoomTransformProps) {
  const [isTransformed, setIsTransformed] = useState(false);
  const [activeShade, setActiveShade] = useState<ColorShade>(COLOR_SHADES[0]);
  const [isPainting, setIsPainting] = useState(false);

  const handleExperienceColour = () => {
    setIsPainting(true);
    setTimeout(() => {
      setIsTransformed(true);
      setIsPainting(false);
    }, 1800);
  };

  const handleReset = () => {
    setIsTransformed(false);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between bg-[#FAF9F6] text-primary overflow-hidden px-6 md:px-12 pt-32 pb-16 border-b border-neutral-light/80 text-left transition-all duration-1000">
      
      {/* Dynamic Ambient Background Illumination */}
      <div 
        className="absolute top-1/4 right-10 w-[650px] h-[650px] rounded-full filter blur-[120px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: isTransformed ? activeShade.accentGlow : 'rgba(215, 210, 200, 0.25)',
          opacity: isTransformed ? 0.95 : 0.4,
          transform: isTransformed ? 'scale(1.1)' : 'scale(0.8)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Architectural Copy & Transformation State */}
        <div className="lg:col-span-6 text-left">
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] font-extrabold text-neutral-mid uppercase tracking-widest bg-neutral-light/60 px-3 py-1 rounded-full border border-neutral-light">
              Authorised Berger Experience Centre
            </span>
            {isTransformed && (
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-500 ${activeShade.bgBadge} animate-fade-in`}>
                ✨ Room Transformed &middot; {activeShade.name}
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-primary text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase">
            Transform<br />
            Your Space<span className={`transition-colors duration-700 ${isTransformed ? activeShade.textColor : 'text-neutral-mid'}`}>.</span>
          </h1>

          <p className={`font-display font-bold text-lg sm:text-xl uppercase tracking-wider mt-4 transition-colors duration-700 ${isTransformed ? activeShade.textColor : 'text-neutral-mid'}`}>
            {isTransformed ? activeShade.name : 'Muted Stone & Architectural Neutral Base'}
          </p>

          <p className="font-sans text-neutral-mid text-sm sm:text-base max-w-lg mt-5 leading-relaxed">
            {isTransformed 
              ? activeShade.description 
              : "Witness how a single feature wall, refined lighting, and Berger's precision finishes elevate an ordinary room into a luxury architectural living space."
            }
          </p>

          {/* Primary Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {!isTransformed ? (
              <button
                onClick={handleExperienceColour}
                disabled={isPainting}
                className="group relative inline-flex items-center gap-3 bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-black uppercase tracking-wider px-8 py-4.5 rounded-2xl shadow-luxury hover:scale-105 active:scale-95 transition-all duration-300 border border-[#E31959]/30 cursor-pointer overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Sparkles className={`w-4 h-4 text-gold ${isPainting ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`} />
                <span>{isPainting ? 'Painting Room Space...' : 'Experience Colour'}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-4 animate-fade-in">
                <button
                  onClick={() => openQuoteModal(`Consultation for ${activeShade.name}`)}
                  className="bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-luxury hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border border-[#E31959]/30"
                >
                  <span>Book Colour Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={handleReset}
                  className="border border-neutral-light hover:border-primary text-neutral-mid hover:text-primary font-display text-xs font-bold uppercase tracking-wider px-5 py-4 rounded-xl hover:bg-white transition-all cursor-pointer inline-flex items-center gap-2"
                  title="Reset Living Room to Neutral Base"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Base</span>
                </button>
              </div>
            )}
          </div>

          {/* Interactive Palette Selector (Available Once Transformed) */}
          {isTransformed && (
            <div className="mt-8 pt-6 border-t border-neutral-light/80 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-3.5 h-3.5 text-neutral-mid" />
                <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-widest">
                  Select Architectural Palette
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {COLOR_SHADES.map((shade) => {
                  const isSelected = activeShade.id === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setActiveShade(shade)}
                      className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-white shadow-luxury border-primary/40 scale-105'
                          : 'bg-white/60 hover:bg-white border-neutral-light/80 hover:border-neutral-mid/40'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full shadow-inner transition-transform group-hover:scale-110"
                        style={{ background: shade.hex }}
                      />
                      <span className="font-display text-xs font-bold text-primary">
                        {shade.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Architectural Living Room Canvas */}
        <div className="lg:col-span-6 w-full">
          <div className="relative group overflow-hidden rounded-3xl border border-neutral-light bg-white p-4 shadow-luxury transition-all duration-700">
            
            {/* The Living Room Frame */}
            <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-[#E8E6E1] relative shadow-inner">
              
              {/* Neutral Base Architecture (Soft stone & beige greys) */}
              <img 
                src="/images/shop_interior.png" 
                alt="Living room in neutral architectural base state" 
                className={`absolute inset-0 w-full h-full object-cover grayscale opacity-80 filter contrast-105 transition-all duration-1000 ${
                  isTransformed ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                }`}
              />

              {/* Transformed Living Room in Rich Berger Finish */}
              <img 
                src={activeShade.roomImage} 
                alt={`${activeShade.name} living room transformation`} 
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  isTransformed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />

              {/* Painting Progress Sweep Mask */}
              {isPainting && (
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                  {/* Prismatic Light & Paint Beam Sweep */}
                  <div className="w-[150%] h-full bg-gradient-to-r from-transparent via-[#E31959]/50 via-gold/50 to-transparent blur-md transform -skew-x-12 animate-paint-wipe" />
                </div>
              )}

              {/* Color Warmth Ambient Layer */}
              <div 
                className="absolute inset-0 transition-opacity duration-1000 mix-blend-color-dodge pointer-events-none"
                style={{
                  background: isTransformed ? activeShade.accentGlow : 'transparent',
                  opacity: isTransformed ? 0.65 : 0
                }}
              />

              {/* Live Status Badge */}
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-light shadow-sm flex items-center gap-2">
                <span 
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                    isTransformed ? 'animate-pulse' : 'bg-neutral-400'
                  }`}
                  style={{ background: isTransformed ? activeShade.hex : '#9CA3AF' }}
                />
                <span className="font-display text-[10px] font-extrabold uppercase tracking-widest text-primary">
                  {isTransformed ? activeShade.code : 'Neutral Stone Base'}
                </span>
              </div>

            </div>
            
            {/* Living Room Frame Footer Details */}
            <div className="text-left mt-4 px-2 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider block">
                  Berger Experience Centre Specification
                </span>
                <span className="font-display font-bold text-primary text-sm">
                  {isTransformed ? activeShade.name : 'Soft Stone & Muted Architectural Grey'}
                </span>
              </div>

              <button
                onClick={() => setCurrentTab('shades')}
                className="text-xs font-display font-bold text-[#E31959] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Shade Catalog</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Architectural Info Strip */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-10 border-t border-neutral-light/60 relative z-10">
        <div className="flex flex-wrap gap-8 text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-sans text-xs font-bold text-primary">Computerised Precision Tinting</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-sans text-xs font-bold text-primary">100% Authorised Berger Coating Systems</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-sans text-xs font-bold text-primary">20+ Years Expertise &middot; Ajay Kedia</span>
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
          <ArrowRight className="w-4 h-4 text-[#E31959] transform rotate-90 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
