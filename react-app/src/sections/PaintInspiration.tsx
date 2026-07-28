import React, { useState, useEffect } from 'react';
import { Shade, hexToHsl, hslToHex, findClosestShade } from '../utils/colorUtils';
import { MessageSquare, Sun, Sunset, Sunrise, Layers } from 'lucide-react';

interface PaintInspirationProps {
  selectedShade: Shade | null;
  onSelectShade: (shade: Shade) => void;
  allShades: Shade[];
}

export default function PaintInspiration({ selectedShade, onSelectShade, allShades }: PaintInspirationProps) {
  const [lightingMode, setLightingMode] = useState<'morning' | 'noon' | 'evening'>('noon');
  const [activeColors, setActiveColors] = useState({
    wall: '#FCFBF7',
    accent: '#F5F3EE',
    ceiling: '#FFFFFF',
    contrast: '#BDD5C0'
  });

  const [recommendedPalette, setRecommendedPalette] = useState<{
    accent: Shade | null;
    contrast: Shade | null;
    ceiling: Shade | null;
  }>({ accent: null, contrast: null, ceiling: null });

  // Default initial shade if none selected
  useEffect(() => {
    if (!selectedShade && allShades.length > 0) {
      onSelectShade(allShades[0]);
    }
  }, [allShades]);

  // Recalculate palette on shade change
  useEffect(() => {
    if (!selectedShade) return;

    const hsl = hexToHsl(selectedShade.hex);

    // 1. Accent (Slightly darker shade of same hue)
    const accentHex = hslToHex(hsl.h, Math.max(20, hsl.s), Math.max(15, hsl.l - 16));
    const accentShade = findClosestShade(accentHex, allShades);

    // 2. Contrast (Complementary Hue shift 180 degrees)
    const contrastHex = hslToHex((hsl.h + 180) % 360, Math.max(30, hsl.s), Math.max(35, hsl.l - 5));
    const contrastShade = findClosestShade(contrastHex, allShades);

    // 3. Ceiling (Very light warm tint of same hue)
    const ceilingHex = hslToHex(hsl.h, Math.max(4, Math.min(10, hsl.s)), 96);
    const ceilingShade = findClosestShade(ceilingHex, allShades);

    setRecommendedPalette({
      accent: accentShade,
      contrast: contrastShade,
      ceiling: ceilingShade
    });

    setActiveColors({
      wall: selectedShade.hex,
      accent: accentShade.hex,
      ceiling: ceilingShade.hex,
      contrast: contrastShade.hex
    });
  }, [selectedShade, allShades]);

  // Enquire on WhatsApp
  const handleWhatsAppShare = () => {
    if (!selectedShade) return;
    const msg = `Hi Nimishamba Paints! 👋

I selected a custom color palette in your Material Mood Board Lab:
• Base Paint: ${selectedShade.name} (${selectedShade.code}) - ${selectedShade.hex}
• Recommended Accent: ${recommendedPalette.accent?.name || 'N/A'} (${recommendedPalette.accent?.code || ''})
• Recommended Contrast: ${recommendedPalette.contrast?.name || 'N/A'} (${recommendedPalette.contrast?.code || ''})

I would like to schedule a showroom consultation to examine physical swatches of these shades.`;

    const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  };

  const applySuggestedColor = (part: 'accent' | 'contrast' | 'ceiling') => {
    const targetShade = recommendedPalette[part];
    if (targetShade) {
      onSelectShade(targetShade);
    }
  };

  return (
    <section className="py-24 bg-neutral-soft border-b border-neutral-light text-left" id="materialBoardCard">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Typographic Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">Volume III / Tactile Studies</span>
            <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
              The Material Mood Board Lab
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="font-sans text-neutral-mid text-sm leading-relaxed max-w-xl">
              Interior color is never chosen in isolation. We have curated a tactile material tray showing how your selected paint base balances against natural timber, raw stone, gold accents, and woven linen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: The Material Mood Board Canvas */}
          <div className="lg:col-span-7">
            
            {/* Ambient Lighting Controllers */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest">Ambient Light Simulator</span>
              <div className="flex bg-neutral-light/50 p-1 rounded-xl border border-neutral-light/80">
                <button
                  onClick={() => setLightingMode('morning')}
                  className={`flex items-center gap-2 font-display text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                    lightingMode === 'morning' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                  }`}
                >
                  <Sunrise className="w-3.5 h-3.5 text-sky-400" />
                  <span>08:00 Morning</span>
                </button>
                <button
                  onClick={() => setLightingMode('noon')}
                  className={`flex items-center gap-2 font-display text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                    lightingMode === 'noon' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>13:00 Noon</span>
                </button>
                <button
                  onClick={() => setLightingMode('evening')}
                  className={`flex items-center gap-2 font-display text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                    lightingMode === 'evening' ? 'bg-white text-primary shadow-sm' : 'text-neutral-mid hover:text-primary'
                  }`}
                >
                  <Sunset className="w-3.5 h-3.5 text-orange-500" />
                  <span>19:00 Golden Hour</span>
                </button>
              </div>
            </div>

            {/* Tactile Composition Container */}
            <div className="relative w-full h-[480px] bg-[#EBEAE6] rounded-3xl border border-neutral-light overflow-hidden shadow-inner flex items-center justify-center p-8 select-none">
              
              {/* Asymmetrical Material Layflat Tray */}
              <div className="relative w-full h-full max-w-xl flex items-center justify-center">
                
                {/* 1. Oak Wood Board (Bottom Right Stacked) */}
                <div 
                  className="absolute right-4 bottom-4 w-[55%] h-[60%] rounded-2xl shadow-luxury overflow-hidden border border-neutral-dark/5"
                  style={{
                    backgroundColor: '#d8b998',
                    backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 80%), 
                                      repeating-linear-gradient(90deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 18px),
                                      repeating-linear-gradient(85deg, rgba(82,53,24,0.04) 0px, rgba(82,53,24,0.04) 4px, transparent 4px, transparent 32px)`
                  }}
                  title="Raw Natural Oak Sample"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
                  <span className="absolute bottom-3 right-4 font-display text-[8px] font-bold text-neutral-dark/40 uppercase tracking-widest">Natural Oak</span>
                </div>

                {/* 2. Travertine Speckled Stone Block (Left Middle Stacked) */}
                <div 
                  className="absolute left-6 top-1/4 w-[45%] h-[40%] rounded-2xl shadow-luxury overflow-hidden border border-neutral-dark/5"
                  style={{
                    backgroundColor: '#E5DFD3',
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px), 
                                      radial-gradient(circle, rgba(0,0,0,0.03) 2px, transparent 2px)`,
                    backgroundSize: '24px 24px, 12px 12px',
                    backgroundPosition: '0 0, 6px 6px'
                  }}
                  title="Speckled Travertine Sample"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/15" />
                  <span className="absolute top-3 left-4 font-display text-[8px] font-bold text-neutral-dark/40 uppercase tracking-widest">Speckled Stone</span>
                </div>

                {/* 3. Linen Fabric Woven Swatch (Top Right Overlap) */}
                <div 
                  className="absolute right-12 top-6 w-[38%] h-[35%] rounded-2xl shadow-premium overflow-hidden border border-neutral-dark/5 rotate-3"
                  style={{
                    backgroundColor: '#F0EFEB',
                    backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px), 
                                      linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)`,
                    backgroundSize: '4px 4px'
                  }}
                  title="Woven Linen Textile Sample"
                >
                  <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-transparent to-black/10" />
                  <span className="absolute top-3 right-4 font-display text-[8px] font-bold text-neutral-dark/30 uppercase tracking-widest">Woven Linen</span>
                </div>

                {/* 4. The Paint Plaster Slab (Center Foreground Focus) */}
                <div 
                  className="absolute left-1/4 top-1/6 w-[42%] h-[65%] rounded-2xl shadow-luxury overflow-hidden border border-neutral-dark/10 -rotate-3 transition-colors duration-500 z-10"
                  style={{ backgroundColor: selectedShade ? selectedShade.hex : '#FCFBF7' }}
                  title="Dynamic Paint Plaster Board"
                >
                  {/* Stipple textured wall overlay via SVG filter */}
                  <svg className="absolute inset-0 w-full h-full object-cover pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <filter id="plaster-stipple">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0" result="coloredNoise" />
                        <feComposite operator="in" in2="SourceGraphic" />
                        <feBlend mode="multiply" in="SourceGraphic" in2="coloredNoise" />
                      </filter>
                    </defs>
                    <rect width="100" height="100" fill="transparent" filter="url(#plaster-stipple)" />
                  </svg>
                  
                  {/* Subtle depth lighting casting across paint panel */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/20 pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 text-left z-10 drop-shadow-sm flex flex-col">
                    <span className="font-sans text-[7px] font-bold text-black/40 uppercase tracking-widest">Base Finish</span>
                    <strong className="font-display text-primary text-xs font-bold uppercase tracking-wider truncate max-w-[130px]">{selectedShade?.name || 'Selected Paint'}</strong>
                    <span className="font-sans text-[8px] text-black/50 font-semibold">{selectedShade?.code || ''}</span>
                  </div>
                </div>

                {/* 5. Brushed Brass Accent Divider Bar (Vertical Overlay) */}
                <div 
                  className="absolute left-[23%] top-1/3 w-3 h-[45%] rounded-full shadow-premium z-20"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, #DFCFB9 0%, #C5A880 50%, #A08055 100%)'
                  }}
                  title="Brushed Brass Metal Accent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/30 rounded-full" />
                </div>

              </div>

              {/* Ambient Lighting Overlay Shifter */}
              <div 
                className={`absolute inset-0 pointer-events-none transition-all duration-700 z-30 ${
                  lightingMode === 'morning' 
                    ? 'bg-sky-400/5 mix-blend-color-dodge opacity-80' 
                    : lightingMode === 'evening' 
                    ? 'bg-orange-500/12 mix-blend-color-burn opacity-90' 
                    : 'bg-transparent opacity-0'
                }`} 
              />
              <div 
                className={`absolute inset-0 pointer-events-none transition-all duration-700 z-30 ${
                  lightingMode === 'morning' 
                    ? 'bg-[#A5F3FC]/10 mix-blend-color' 
                    : lightingMode === 'evening' 
                    ? 'bg-[#F59E0B]/10 mix-blend-color' 
                    : 'bg-transparent opacity-0'
                }`} 
              />

            </div>

            <div className="flex gap-2.5 items-center bg-neutral-soft p-4 rounded-xl border border-neutral-light mt-4">
              <Layers className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="font-sans text-neutral-mid text-[11px] leading-normal text-left">
                Toggling the light modes shifts the color temperature overlay to reflect exactly how paint solids change hue from cool morning casts (blue light) to warm golden lamp glows (orange light).
              </p>
            </div>
          </div>

          {/* Right Column: Palette details & specs */}
          <div className="lg:col-span-5 flex flex-col justify-between self-stretch">
            <div className="bg-white rounded-3xl p-8 border border-neutral-light shadow-sm text-left flex flex-col gap-8 h-full justify-between">
              
              {/* Selected Paint details */}
              <div>
                <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest block mb-3">Selected Shade</span>
                {selectedShade ? (
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-16 h-16 rounded-2xl border shadow-inner flex-shrink-0" 
                      style={{ background: selectedShade.hex }}
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-primary text-xl leading-tight">{selectedShade.name}</h4>
                      <p className="font-sans text-neutral-mid text-xs font-semibold mt-1">
                        Code: {selectedShade.code} &bull; {selectedShade.category || 'Platinum Series'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-neutral-mid text-sm italic">
                    Select a color from the catalogue below.
                  </div>
                )}
              </div>

              {/* Recommender */}
              <div className="border-t border-neutral-light pt-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest">Designer Recommendations</span>
                  <span className="text-[8px] font-bold text-accent uppercase tracking-widest">Apply to Base</span>
                </div>
                
                <div className="flex flex-col gap-4 mt-3">
                  {/* Monochromatic Accent */}
                  <div 
                    onClick={() => applySuggestedColor('accent')}
                    className="flex items-center gap-4 bg-neutral-soft border border-neutral-light hover:border-primary rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl border flex-shrink-0" 
                      style={{ background: recommendedPalette.accent?.hex || '#FFF' }}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[8px] font-bold text-neutral-mid uppercase tracking-wider mb-0.5">Complementary Accent</span>
                      <strong className="font-display text-primary text-sm font-semibold">{recommendedPalette.accent?.name || 'Loading...'}</strong>
                      <span className="text-[9px] text-neutral-mid font-sans mt-0.5">Shade: {recommendedPalette.accent?.code || ''}</span>
                    </div>
                  </div>

                  {/* Contrast Accent */}
                  <div 
                    onClick={() => applySuggestedColor('contrast')}
                    className="flex items-center gap-4 bg-neutral-soft border border-neutral-light hover:border-primary rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl border flex-shrink-0" 
                      style={{ background: recommendedPalette.contrast?.hex || '#FFF' }}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[8px] font-bold text-neutral-mid uppercase tracking-wider mb-0.5">Contrasting Trim</span>
                      <strong className="font-display text-primary text-sm font-semibold">{recommendedPalette.contrast?.name || 'Loading...'}</strong>
                      <span className="text-[9px] text-neutral-mid font-sans mt-0.5">Shade: {recommendedPalette.contrast?.code || ''}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enquire button */}
              <button
                onClick={handleWhatsAppShare}
                disabled={!selectedShade}
                className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider w-full py-4.5 rounded-xl hover:bg-primary-light transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Enquire Palette Availability</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
