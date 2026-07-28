import React, { useState, useEffect } from 'react';
import { Shade, hexToHsl, hslToHex, findClosestShade } from '../utils/colorUtils';
import { MessageSquare, Info, Smartphone, RefreshCw } from 'lucide-react';

interface PaintInspirationProps {
  selectedShade: Shade | null;
  onSelectShade: (shade: Shade) => void;
  allShades: Shade[];
}

export default function PaintInspiration({ selectedShade, onSelectShade, allShades }: PaintInspirationProps) {
  const [activeRoom, setActiveRoom] = useState<'living' | 'bedroom' | 'exterior'>('living');
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
    <section className="py-12 bg-neutral-soft border-b border-neutral-light" id="visualizerCard">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visualizer Window (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-light shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="text-left">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">Interactive Sandbox</span>
                <h3 className="font-display font-bold text-primary text-xl">Interactive Room Visualizer</h3>
              </div>
              
              {/* Room Toggles */}
              <div className="flex bg-neutral-light p-1 rounded-xl border border-neutral-light self-start">
                {(['living', 'bedroom', 'exterior'] as const).map(room => (
                  <button
                    key={room}
                    onClick={() => setActiveRoom(room)}
                    className={`font-display text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all ${
                      activeRoom === room
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-neutral-mid hover:text-primary'
                    }`}
                  >
                    {room}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Container */}
            <div className="w-full bg-neutral-light rounded-2xl border border-neutral-light overflow-hidden aspect-[5/3] relative flex items-center justify-center shadow-inner">
              {activeRoom === 'living' && (
                <svg viewBox="0 0 800 480" width="100%" height="100%" className="w-full h-full object-cover">
                  <defs>
                    <linearGradient id="living-wall-shadow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.25"/>
                      <stop offset="20%" stopColor="#000000" stopOpacity="0.05"/>
                      <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="corner-shadow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <rect id="svg-living-wall" x="0" y="0" width="800" height="360" fill={activeColors.wall} />
                  <rect id="svg-living-accent" x="250" y="0" width="300" height="360" fill={activeColors.accent} />
                  <rect x="0" y="0" width="800" height="360" fill="url(#living-wall-shadow)" className="multiply-blend pointer-events-none" />
                  <rect x="0" y="0" width="100" height="360" fill="url(#corner-shadow)" className="multiply-blend pointer-events-none" />
                  <polygon id="svg-living-ceiling" points="0,0 800,0 720,40 80,40" fill={activeColors.ceiling} />
                  <polygon points="0,0 800,0 720,40 80,40" fill="url(#living-wall-shadow)" opacity="0.3" className="multiply-blend pointer-events-none" />
                  <rect x="0" y="352" width="800" height="8" fill="#E2E2E7" />
                  <rect x="0" y="360" width="800" height="120" fill="#d2b48c" />
                  <polygon points="0,360 800,360 800,480 0,480" fill="rgba(0,0,0,0.06)" className="multiply-blend pointer-events-none" />
                  <ellipse cx="400" cy="420" rx="220" ry="40" fill="#E2E2E7" opacity="0.8" />
                  <rect x="300" y="280" width="200" height="60" rx="4" fill="#3A3A3C" />
                  <rect x="310" y="160" width="180" height="100" rx="6" fill="#1D1D1F" />
                  <ellipse cx="200" cy="380" rx="140" ry="25" fill="rgba(0,0,0,0.2)" />
                  <path d="M 80,300 C 80,280 100,270 120,270 L 280,270 C 300,270 320,280 320,300 L 320,350 L 80,350 Z" fill="#152b4c" />
                  <rect x="90" y="310" width="105" height="40" rx="8" fill="#1e3e6b" />
                  <rect x="205" y="310" width="105" height="40" rx="8" fill="#1e3e6b" />
                  <rect x="100" y="280" width="95" height="35" rx="6" fill="#152b4c" />
                  <rect x="205" y="280" width="95" height="35" rx="6" fill="#152b4c" />
                  <rect x="90" y="350" width="10" height="15" fill="#3A3A3C" />
                  <rect x="300" y="350" width="10" height="15" fill="#3A3A3C" />
                  <path d="M 680,370 L 720,370 L 700,360 Z" fill="#1D1D1F" />
                  <line x1="700" y1="360" x2="700" y2="180" stroke="#1D1D1F" strokeWidth="4" />
                  <path d="M 670,180 L 730,180 L 710,140 L 690,140 Z" fill="#ffc830" />
                  <polygon points="700,180 550,380 850,380" fill="rgba(255,200,48,0.12)" className="screen-blend pointer-events-none" />
                  <path d="M 40,380 L 60,380 L 55,420 L 45,420 Z" fill="#a58a7f" />
                  <path d="M 50,380 Q 20,340 10,320 Q 40,350 50,380 Z" fill="#2d7e43" />
                  <path d="M 50,380 Q 50,320 60,300 Q 65,340 50,380 Z" fill="#34C759" />
                  <path d="M 50,380 Q 80,345 90,330 Q 70,360 50,380 Z" fill="#2d7e43" />
                </svg>
              )}

              {activeRoom === 'bedroom' && (
                <svg viewBox="0 0 800 480" width="100%" height="100%" className="w-full h-full object-cover">
                  <defs>
                    <linearGradient id="bed-wall-shadow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <rect id="svg-bedroom-wall" x="0" y="0" width="800" height="360" fill={activeColors.wall} />
                  <polygon id="svg-bedroom-side" points="0,0 100,40 100,320 0,360" fill={activeColors.accent} />
                  <polygon id="svg-bedroom-ceiling" points="0,0 800,0 800,40 100,40" fill={activeColors.ceiling} />
                  <polygon points="0,0 800,0 800,40 100,40" fill="url(#bed-wall-shadow)" opacity="0.3" className="multiply-blend pointer-events-none" />
                  <rect x="100" y="40" width="700" height="280" fill="url(#bed-wall-shadow)" opacity="0.6" className="multiply-blend pointer-events-none" />
                  <polygon points="0,360 100,320 800,320 800,480 0,480" fill="#a17d58" />
                  <rect id="svg-bedroom-headboard" x="200" y="140" width="400" height="180" rx="8" fill="#152b4c" />
                  <rect x="220" y="300" width="360" height="100" fill="rgba(0,0,0,0.25)" />
                  <rect x="230" y="280" width="340" height="60" rx="6" fill="#F5F5F7" />
                  <path d="M 230,300 L 570,300 L 570,380 C 570,390 560,400 550,400 L 250,400 C 240,400 230,390 230,380 Z" fill="#6750a0" />
                  <rect x="260" y="240" width="120" height="50" rx="8" fill="#FFFFFF" stroke="#E2E2E7" strokeWidth="2" />
                  <rect x="420" y="240" width="120" height="50" rx="8" fill="#FFFFFF" stroke="#E2E2E7" strokeWidth="2" />
                  <rect x="280" y="250" width="90" height="40" rx="6" fill="#e31959" opacity="0.9" />
                  <rect x="430" y="250" width="90" height="40" rx="6" fill="#e31959" opacity="0.9" />
                  <rect x="110" y="240" width="70" height="80" rx="4" fill="#3A3A3C" />
                  <line x1="145" y1="240" x2="145" y2="210" stroke="#1D1D1F" strokeWidth="3" />
                  <path d="M 130,210 L 160,210 L 155,190 L 135,190 Z" fill="#ffc830" />
                  <polygon points="145,190 100,280 190,280" fill="rgba(255,200,48,0.15)" className="screen-blend pointer-events-none" />
                  <rect x="620" y="240" width="70" height="80" rx="4" fill="#3A3A3C" />
                  <line x1="655" y1="240" x2="655" y2="210" stroke="#1D1D1F" strokeWidth="3" />
                  <path d="M 640,210 L 670,210 L 665,190 L 645,190 Z" fill="#ffc830" />
                  <polygon points="655,190 610,280 700,280" fill="rgba(255,200,48,0.15)" className="screen-blend pointer-events-none" />
                </svg>
              )}

              {activeRoom === 'exterior' && (
                <svg viewBox="0 0 800 480" width="100%" height="100%" className="w-full h-full object-cover">
                  <defs>
                    <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#BAE6FD"/>
                      <stop offset="100%" stopColor="#E0F2FE"/>
                    </linearGradient>
                    <linearGradient id="roof-shadow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="800" height="200" fill="url(#sky-grad)" />
                  <path d="M 600,100 C 590,100 580,110 580,120 C 580,121 581,122 581,123 C 570,125 560,135 560,145 C 560,155 570,165 580,165 L 640,165 C 650,165 660,155 660,145 C 660,141 658,138 656,135 C 659,132 660,129 660,125 C 660,115 650,105 640,105 C 638,105 635,106 633,107 C 625,103 615,100 600,100 Z" fill="#FFFFFF" opacity="0.6" />
                  <rect x="0" y="380" width="800" height="100" fill="#4ade80" />
                  <polygon points="350,380 450,380 500,480 300,480" fill="#E2E2E7" />
                  <rect id="svg-exterior-wall" x="200" y="180" width="400" height="200" fill={activeColors.wall} />
                  <polygon id="svg-exterior-trim" points="200,180 400,80 600,180" fill={activeColors.accent} />
                  <polygon id="svg-exterior-roof" points="180,185 400,70 620,185 605,195 400,90 195,195" fill={activeColors.ceiling} />
                  <polygon points="200,180 400,80 600,180 600,195 400,95 200,195" fill="url(#roof-shadow)" opacity="0.5" className="multiply-blend pointer-events-none" />
                  <rect id="svg-exterior-door" x="370" y="270" width="60" height="110" fill={activeColors.contrast} rx="2" />
                  <rect x="367" y="267" width="66" height="113" fill="none" stroke="#FFFFFF" strokeWidth="3" />
                  <circle cx="420" cy="325" r="4" fill="#3A3A3C" />
                  <rect x="250" y="240" width="70" height="80" fill="#FFFFFF" rx="4" />
                  <rect x="255" y="245" width="60" height="70" fill="#E0F2FE" />
                  <line x1="285" y1="245" x2="285" y2="315" stroke="#FFFFFF" strokeWidth="2" />
                  <line x1="255" y1="280" x2="315" y2="280" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="248" y="238" width="74" height="84" fill="none" stroke="#152b4c" strokeWidth="3" />
                  <rect x="480" y="240" width="70" height="80" fill="#FFFFFF" rx="4" />
                  <rect x="485" y="245" width="60" height="70" fill="#E0F2FE" />
                  <line x1="515" y1="245" x2="515" y2="315" stroke="#FFFFFF" strokeWidth="2" />
                  <line x1="485" y1="280" x2="545" y2="280" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="478" y="238" width="74" height="84" fill="none" stroke="#152b4c" strokeWidth="3" />
                </svg>
              )}
            </div>

            <div className="flex gap-2 items-center bg-neutral-soft p-4 rounded-xl border border-neutral-light mt-4">
              <Info className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="font-sans text-neutral-mid text-[11px] leading-normal text-left">
                Select any shade from the explorer grid below to load it on the room walls. Click on any recommended contrast card to apply it live to accents and ceilings.
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
              className="mt-4 bg-primary text-white font-display text-xs font-bold uppercase tracking-wider w-full py-4.5 rounded-xl hover:bg-primary-light transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
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
