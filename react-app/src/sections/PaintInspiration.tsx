import React, { useState, useEffect } from 'react';
import { Shade, hexToHsl, hslToHex, findClosestShade } from '../utils/colorUtils';
import { MessageSquare, Info } from 'lucide-react';

interface PaintInspirationProps {
  selectedShade: Shade | null;
  onSelectShade: (shade: Shade) => void;
  allShades: Shade[];
}

export default function PaintInspiration({ selectedShade, onSelectShade, allShades }: PaintInspirationProps) {
  const [activeRoom, setActiveRoom] = useState<'living' | 'bedroom'>('living');
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

    // 1. Accent Wall (Slightly darker shade of same hue)
    const accentHex = hslToHex(hsl.h, Math.max(20, hsl.s), Math.max(15, hsl.l - 16));
    const accentShade = findClosestShade(accentHex, allShades);

    // 2. Contrast Wall (Complementary Hue shift 180 degrees)
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

I selected a paint colour scheme on your website and want to check availability:
• Main Wall: ${selectedShade.name} (${selectedShade.code}) - ${selectedShade.hex}
• Accent Wall: ${recommendedPalette.accent?.name || 'N/A'} (${recommendedPalette.accent?.code || ''})
• Contrast Wall: ${recommendedPalette.contrast?.name || 'N/A'} (${recommendedPalette.contrast?.code || ''})
• Ceiling: ${recommendedPalette.ceiling?.name || 'N/A'} (${recommendedPalette.ceiling?.code || ''})

Please guide me with pricing and stock availability. Thanks!`;

    const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  };

  const applySuggestedColor = (part: 'accent' | 'contrast' | 'ceiling') => {
    const targetShade = recommendedPalette[part];
    if (!targetShade) return;
    
    setActiveColors(prev => ({
      ...prev,
      [part === 'accent' ? 'accent' : part === 'contrast' ? 'contrast' : 'ceiling']: targetShade.hex
    }));
  };

  return (
    <section className="py-16 bg-neutral-soft border-b border-neutral-light" id="visualizerCard">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Visualizer Window (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-light shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-left">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">Color Studio</span>
                <h3 className="font-display font-bold text-primary text-xl">Architectural Space Renders</h3>
              </div>
              
              {/* Room Toggles */}
              <div className="flex bg-neutral-light p-1 rounded-xl border border-neutral-light self-start">
                {(['living', 'bedroom'] as const).map(room => (
                  <button
                    key={room}
                    onClick={() => setActiveRoom(room)}
                    className={`font-display text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                      activeRoom === room
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-neutral-mid hover:text-primary'
                    }`}
                  >
                    {room === 'living' ? 'Living Room' : 'Bedroom'}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Render Viewport */}
            <div className="w-full bg-neutral-light rounded-2xl border border-neutral-light overflow-hidden aspect-[5/3] relative flex items-center justify-center shadow-inner">
              
              {/* Background Architectural Photo */}
              <img 
                src={activeRoom === 'living' ? '/images/living_room_visualizer.png' : '/images/bedroom_visualizer.png'} 
                alt="Architectural Interior Render" 
                className="absolute inset-0 w-full h-full object-cover select-none"
              />

              {/* Dynamic Wall Blending Overlay */}
              <svg viewBox="0 0 800 480" width="100%" height="100%" className="absolute inset-0 w-full h-full object-cover">
                <defs>
                  {/* Subtle stipple to blend paint texture seamlessly onto generated plaster */}
                  <filter id="wall-paint-stipple" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" result="coloredNoise" />
                    <feComposite operator="in" in2="SourceGraphic" />
                    <feBlend mode="multiply" in="SourceGraphic" in2="coloredNoise" />
                  </filter>
                  
                  {/* Natural lighting gradients overlays for depth */}
                  <linearGradient id="wall-corner-shadow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="wall-top-shadow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                  </linearGradient>
                </defs>

                {activeRoom === 'living' ? (
                  /* Living Room: Perspective wall on the right */
                  <g className="multiply-blend" opacity="0.75">
                    <polygon 
                      points="310,0 800,0 800,480 395,480" 
                      fill={activeColors.wall} 
                      filter="url(#wall-paint-stipple)"
                    />
                    {/* Shadow overlay mapped precisely on the wall corners */}
                    <polygon 
                      points="310,0 800,0 800,480 395,480" 
                      fill="url(#wall-corner-shadow)" 
                      opacity="0.5"
                    />
                    <polygon 
                      points="310,0 800,0 800,480 395,480" 
                      fill="url(#wall-top-shadow)" 
                      opacity="0.3"
                    />
                  </g>
                ) : (
                  /* Bedroom: Flat wall behind bed with a modern horizontal split-paint mask */
                  <g className="multiply-blend" opacity="0.72">
                    <polygon 
                      points="0,0 800,0 800,285 0,285" 
                      fill={activeColors.wall} 
                      filter="url(#wall-paint-stipple)"
                    />
                    <polygon 
                      points="0,0 800,0 800,285 0,285" 
                      fill="url(#wall-top-shadow)" 
                      opacity="0.4"
                    />
                  </g>
                )}
              </svg>

            </div>

            <div className="flex gap-2 items-center bg-neutral-soft p-4 rounded-xl border border-neutral-light mt-4">
              <Info className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="font-sans text-neutral-mid text-[11px] leading-normal text-left">
                Select any shade from the explorer grid below to colorize the wall in real-time. The visualizer overlays the shade using color multiply blending, maintaining natural sunlight shadows and raw wall striae.
              </p>
            </div>
          </div>

          {/* Color Details & Palette Panel (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-6 border border-neutral-light shadow-sm text-left flex flex-col gap-6">
              
              {/* Active Base Color Card */}
              <div>
                <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider block mb-2.5">Selected Base Shade</span>
                {selectedShade ? (
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl border shadow-sm flex-shrink-0" 
                      style={{ background: selectedShade.hex }}
                    />
                    <div>
                      <h4 className="font-display font-extrabold text-primary text-xl leading-tight">{selectedShade.name}</h4>
                      <p className="font-sans text-neutral-mid text-xs font-semibold mt-1">
                        Code: {selectedShade.code} &bull; {selectedShade.category || 'Curated'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-neutral-mid text-sm italic">
                    Click a shade card below to load details.
                  </div>
                )}
              </div>

              {/* Palette Generator */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-bold text-neutral-mid uppercase tracking-wider block">Recommended Contrast Palette</span>
                  <span className="text-[8px] font-bold text-accent uppercase tracking-wider">Click card to apply</span>
                </div>
                
                <div className="flex flex-col gap-3.5 mt-3">
                  {/* Monochromatic Accent Wall */}
                  <div 
                    onClick={() => applySuggestedColor('accent')}
                    className="flex items-center gap-4 bg-neutral-soft border border-neutral-light hover:border-primary rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl border flex-shrink-0" 
                      style={{ background: recommendedPalette.accent?.hex || '#FFF' }}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider mb-0.5">Accent Wall (Mono)</span>
                      <strong className="font-display text-primary text-sm font-semibold">{recommendedPalette.accent?.name || 'Loading...'}</strong>
                      <span className="text-[10px] text-neutral-mid font-sans mt-0.5">Shade: {recommendedPalette.accent?.code || ''}</span>
                    </div>
                  </div>

                  {/* Complementary Contrast */}
                  <div 
                    onClick={() => applySuggestedColor('contrast')}
                    className="flex items-center gap-4 bg-neutral-soft border border-neutral-light hover:border-primary rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl border flex-shrink-0" 
                      style={{ background: recommendedPalette.contrast?.hex || '#FFF' }}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider mb-0.5">Contrasting Wall</span>
                      <strong className="font-display text-primary text-sm font-semibold">{recommendedPalette.contrast?.name || 'Loading...'}</strong>
                      <span className="text-[10px] text-neutral-mid font-sans mt-0.5">Shade: {recommendedPalette.contrast?.code || ''}</span>
                    </div>
                  </div>

                  {/* Ceiling Soft Tone */}
                  <div 
                    onClick={() => applySuggestedColor('ceiling')}
                    className="flex items-center gap-4 bg-neutral-soft border border-neutral-light hover:border-primary rounded-xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl border flex-shrink-0" 
                      style={{ background: recommendedPalette.ceiling?.hex || '#FFF' }}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-wider mb-0.5">Ceiling Finish</span>
                      <strong className="font-display text-primary text-sm font-semibold">{recommendedPalette.ceiling?.name || 'Loading...'}</strong>
                      <span className="text-[10px] text-neutral-mid font-sans mt-0.5">Shade: {recommendedPalette.ceiling?.code || ''}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Share Button */}
            <button
              onClick={handleWhatsAppShare}
              disabled={!selectedShade}
              className="mt-4 bg-primary text-white font-display text-xs font-bold uppercase tracking-wider w-full py-4.5 rounded-xl hover:bg-primary-light transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Enquire this Palette on WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
