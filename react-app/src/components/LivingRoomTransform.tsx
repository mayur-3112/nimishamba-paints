import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, Palette, Phone, Play } from 'lucide-react';

interface LivingRoomTransformProps {
  openQuoteModal: (category?: string) => void;
  setCurrentTab: (tab: string) => void;
  triggerColorMyWorld?: () => void;
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
    name: 'Berger Crimson',
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
    name: 'Heritage Gold',
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
    name: 'Silk Emerald',
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

export default function LivingRoomTransform({ openQuoteModal, setCurrentTab, triggerColorMyWorld }: LivingRoomTransformProps) {
  const [isTransformed, setIsTransformed] = useState(false);
  const [activeShade, setActiveShade] = useState<ColorShade>(COLOR_SHADES[0]);
  const [isPainting, setIsPainting] = useState(false);

  const handleExperienceColour = () => {
    setIsPainting(true);
    setTimeout(() => {
      setIsTransformed(true);
      setIsPainting(false);
    }, 1600);
  };

  const handleReset = () => {
    setIsTransformed(false);
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between bg-[#FAF9F6] text-primary overflow-hidden px-5 sm:px-8 md:px-12 pt-24 sm:pt-32 pb-24 border-b border-neutral-light/80 text-left transition-all duration-1000">
      
      {/* Dynamic Ambient Background Illumination */}
      <div 
        className="absolute top-1/4 right-0 sm:right-10 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] rounded-full filter blur-[90px] sm:blur-[120px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: isTransformed ? activeShade.accentGlow : 'rgba(215, 210, 200, 0.25)',
          opacity: isTransformed ? 0.95 : 0.4,
          transform: isTransformed ? 'scale(1.1)' : 'scale(0.8)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10 my-auto">
        
        {/* Mobile & Desktop Header Copy */}
        <div className="lg:col-span-6 text-left">
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[9px] sm:text-[10px] font-black text-neutral-mid uppercase tracking-widest bg-neutral-light/80 px-3 py-1 rounded-full border border-neutral-light">
              Authorised Berger Centre
            </span>
            {isTransformed && (
              <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-500 ${activeShade.bgBadge} animate-fade-in`}>
                ✨ {activeShade.name}
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-primary text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase">
            Transform<br />
            Your Space<span className={`transition-colors duration-700 ${isTransformed ? activeShade.textColor : 'text-neutral-mid'}`}>.</span>
          </h1>

          <p className={`font-display font-bold text-base sm:text-xl uppercase tracking-wider mt-3 sm:mt-4 transition-colors duration-700 ${isTransformed ? activeShade.textColor : 'text-neutral-mid'}`}>
            {isTransformed ? activeShade.name : 'Muted Stone & Architectural Neutral Base'}
          </p>

          <p className="font-sans text-neutral-mid text-xs sm:text-base max-w-lg mt-3 sm:mt-5 leading-relaxed">
            {isTransformed 
              ? activeShade.description 
              : "Witness how a single feature wall, refined lighting, and Berger's precision finishes elevate an ordinary room into a luxury architectural living space."
            }
          </p>

          {/* Primary Mobile Action Buttons (Min 48px touch targets) */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {!isTransformed ? (
              <>
                <button
                  onClick={handleExperienceColour}
                  disabled={isPainting}
                  className="group relative w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-3 bg-[#E31959] hover:bg-[#C20F4B] active:bg-[#A00B3B] text-white font-display text-xs font-black uppercase tracking-wider px-8 rounded-2xl shadow-luxury active:scale-[0.98] transition-all duration-300 border border-[#E31959]/30 cursor-pointer overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Sparkles className={`w-4 h-4 text-gold ${isPainting ? 'animate-spin' : 'group-hover:rotate-45'} transition-transform`} />
                  <span>{isPainting ? 'Painting Living Room...' : 'Experience Colour'}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                {triggerColorMyWorld && (
                  <button
                    onClick={triggerColorMyWorld}
                    className="min-h-[52px] border border-neutral-light hover:border-primary text-primary font-display text-xs font-bold uppercase tracking-wider px-6 rounded-2xl hover:bg-white transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                    title="Play WebGL Fluid Dynamics Simulation"
                  >
                    <Play className="w-3.5 h-3.5 text-[#E31959] fill-[#E31959]" />
                    <span>Color My World</span>
                  </button>
                )}
              </>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto animate-fade-in">
                <button
                  onClick={() => openQuoteModal(`Consultation for ${activeShade.name}`)}
                  className="min-h-[52px] bg-[#E31959] hover:bg-[#C20F4B] text-white font-display text-xs font-black uppercase tracking-wider px-8 rounded-2xl shadow-luxury active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 cursor-pointer border border-[#E31959]/30"
                >
                  <span>Book Colour Consultation</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={handleReset}
                  className="min-h-[48px] border border-neutral-light hover:border-primary text-neutral-mid hover:text-primary font-display text-xs font-bold uppercase tracking-wider px-5 rounded-2xl hover:bg-white transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Base</span>
                </button>
              </div>
            )}
          </div>

          {/* Touch-Optimized Palette Selector */}
          {isTransformed && (
            <div className="mt-6 pt-5 border-t border-neutral-light/80 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-3.5 h-3.5 text-neutral-mid" />
                <span className="font-sans text-[10px] font-bold text-neutral-mid uppercase tracking-widest">
                  Tap Palette Swatches
                </span>
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
                {COLOR_SHADES.map((shade) => {
                  const isSelected = activeShade.id === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => setActiveShade(shade)}
                      className={`group flex items-center gap-2.5 px-3.5 py-3 rounded-xl border transition-all duration-300 cursor-pointer min-h-[48px] ${
                        isSelected
                          ? 'bg-white shadow-luxury border-primary/40 scale-105'
                          : 'bg-white/70 hover:bg-white border-neutral-light/80'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full shadow-inner transition-transform group-hover:scale-110 flex-shrink-0"
                        style={{ background: shade.hex }}
                      />
                      <span className="font-display text-xs font-bold text-primary truncate">
                        {shade.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Architectural Living Room Canvas */}
        <div className="lg:col-span-6 w-full mt-4 lg:mt-0">
          <div className="relative group overflow-hidden rounded-3xl border border-neutral-light bg-white p-3.5 sm:p-4 shadow-luxury transition-all duration-700">
            
            {/* The Living Room Frame */}
            <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-[#E8E6E1] relative shadow-inner">
              
              {/* Neutral Base Architecture */}
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

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-light shadow-xs flex items-center gap-2">
                <span 
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                    isTransformed ? 'animate-pulse' : 'bg-neutral-400'
                  }`}
                  style={{ background: isTransformed ? activeShade.hex : '#9CA3AF' }}
                />
                <span className="font-display text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-primary">
                  {isTransformed ? activeShade.code : 'Neutral Stone Base'}
                </span>
              </div>

            </div>
            
            {/* Living Room Frame Footer Details */}
            <div className="text-left mt-3 px-1 flex justify-between items-center">
              <div>
                <span className="text-[8px] sm:text-[9px] font-bold text-neutral-mid uppercase tracking-wider block">
                  Berger Experience Specification
                </span>
                <span className="font-display font-bold text-primary text-xs sm:text-sm">
                  {isTransformed ? activeShade.name : 'Soft Stone & Muted Architectural Grey'}
                </span>
              </div>

              <button
                onClick={() => setCurrentTab('shades')}
                className="text-xs font-display font-bold text-[#E31959] hover:underline inline-flex items-center gap-1 cursor-pointer min-h-[44px]"
              >
                <span>Shades</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile-Friendly Feature Bullets */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-8 border-t border-neutral-light/60 relative z-10">
        <div className="flex flex-wrap gap-4 sm:gap-8 text-left">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-sans text-xs font-bold text-primary">Computerised Tinting</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-sans text-xs font-bold text-primary">100% Genuine Berger Coatings</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#E31959] flex-shrink-0" />
            <a href="tel:+919448084351" className="font-sans text-xs font-bold text-primary hover:text-[#E31959]">
              Ajay Kedia (Owner): +91 94480 84351
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
