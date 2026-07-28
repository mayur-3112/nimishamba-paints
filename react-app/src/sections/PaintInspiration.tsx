import React, { useState, useEffect, useRef } from 'react';
import { Shade, hexToHsl, hslToHex, findClosestShade } from '../utils/colorUtils';
import { MessageSquare, Sun, Sunset, Sunrise, Layers, Eye } from 'lucide-react';

interface PaintInspirationProps {
  selectedShade: Shade | null;
  onSelectShade: (shade: Shade) => void;
  allShades: Shade[];
}

interface MaterialInfo {
  name: string;
  detail: string;
  origin: string;
}

const MATERIAL_INFO: Record<string, MaterialInfo> = {
  oak: { name: 'White Oak', detail: '160mm Wide Plank', origin: 'European Hardwood' },
  stone: { name: 'Travertine', detail: 'Honed Finish', origin: 'Italian Quarry' },
  linen: { name: 'Belgian Linen', detail: 'Plain Weave 280gsm', origin: 'Flanders Mill' },
  marble: { name: 'Calacatta Oro', detail: 'Bookmatched Slab', origin: 'Carrara, Italy' },
  concrete: { name: 'Microcement', detail: 'Trowel-Applied 3mm', origin: 'Artisan Finish' },
  brass: { name: 'Brushed Brass', detail: 'Satin PVD Coat', origin: 'Hardware Accent' },
};

export default function PaintInspiration({ selectedShade, onSelectShade, allShades }: PaintInspirationProps) {
  const [lightingMode, setLightingMode] = useState<'morning' | 'noon' | 'evening'>('noon');
  const [hoveredMaterial, setHoveredMaterial] = useState<string | null>(null);
  const [colorChanged, setColorChanged] = useState(false);
  const prevHexRef = useRef<string>('');

  const [recommendedPalette, setRecommendedPalette] = useState<{
    accent: Shade | null;
    contrast: Shade | null;
    triadic: Shade | null;
    ceiling: Shade | null;
  }>({ accent: null, contrast: null, triadic: null, ceiling: null });

  // Default initial shade if none selected
  useEffect(() => {
    if (!selectedShade && allShades.length > 0) {
      onSelectShade(allShades[0]);
    }
  }, [allShades]);

  // Trigger paint ripple animation on color change
  useEffect(() => {
    if (!selectedShade) return;
    if (prevHexRef.current && prevHexRef.current !== selectedShade.hex) {
      setColorChanged(true);
      const timer = setTimeout(() => setColorChanged(false), 800);
      return () => clearTimeout(timer);
    }
    prevHexRef.current = selectedShade.hex;
  }, [selectedShade]);

  // Recalculate palette on shade change — lightness-aware
  useEffect(() => {
    if (!selectedShade) return;
    prevHexRef.current = selectedShade.hex;

    const hsl = hexToHsl(selectedShade.hex);
    const isDark = hsl.l < 45;
    const isMedium = hsl.l >= 45 && hsl.l < 65;

    // Accent: for dark shades go LIGHTER, for light shades go darker
    const accentL = isDark
      ? Math.min(85, hsl.l + 20)
      : isMedium
      ? Math.min(80, hsl.l + 15)
      : Math.max(20, hsl.l - 16);
    const accentHex = hslToHex(hsl.h, Math.max(15, hsl.s), accentL);
    const accentShade = findClosestShade(accentHex, allShades);

    // Contrast (complementary 180°) — ensure visible lightness range
    const contrastL = isDark
      ? Math.min(75, hsl.l + 30)
      : isMedium
      ? Math.max(35, hsl.l - 10)
      : Math.max(35, hsl.l - 5);
    const contrastHex = hslToHex((hsl.h + 180) % 360, Math.max(25, hsl.s), contrastL);
    const contrastShade = findClosestShade(contrastHex, allShades);

    // Triadic (120° shift) — clamp to mid-lightness
    const triadicL = isDark
      ? Math.min(70, hsl.l + 25)
      : Math.max(30, Math.min(70, hsl.l));
    const triadicHex = hslToHex((hsl.h + 120) % 360, Math.max(20, hsl.s - 5), triadicL);
    const triadicShade = findClosestShade(triadicHex, allShades);

    // Ceiling (near-white tint)
    const ceilingHex = hslToHex(hsl.h, Math.max(4, Math.min(10, hsl.s)), 96);
    const ceilingShade = findClosestShade(ceilingHex, allShades);

    setRecommendedPalette({
      accent: accentShade,
      contrast: contrastShade,
      triadic: triadicShade,
      ceiling: ceilingShade
    });
  }, [selectedShade, allShades]);

  // Enquire on WhatsApp
  const handleWhatsAppShare = () => {
    if (!selectedShade) return;
    const msg = `Hi Nimishamba Paints! 👋

I curated a color palette in your Material Mood Board Lab:
• Base: ${selectedShade.name} (${selectedShade.code}) — ${selectedShade.hex}
• Accent: ${recommendedPalette.accent?.name || 'N/A'} (${recommendedPalette.accent?.code || ''})
• Contrast: ${recommendedPalette.contrast?.name || 'N/A'} (${recommendedPalette.contrast?.code || ''})
• Triadic: ${recommendedPalette.triadic?.name || 'N/A'} (${recommendedPalette.triadic?.code || ''})

I'd like to schedule a showroom consultation to examine physical swatches.`;

    window.open('https://wa.me/919448084351?text=' + encodeURIComponent(msg), '_blank');
  };

  const applySuggestedColor = (part: 'accent' | 'contrast' | 'triadic' | 'ceiling') => {
    const targetShade = recommendedPalette[part];
    if (targetShade) onSelectShade(targetShade);
  };

  // Compute ambient color temperature shift
  const ambientOverlay = lightingMode === 'morning'
    ? 'rgba(180, 220, 240, 0.06)'
    : lightingMode === 'evening'
    ? 'rgba(255, 180, 100, 0.08)'
    : 'transparent';

  const ambientShadow = lightingMode === 'morning'
    ? '0 8px 40px rgba(100, 160, 200, 0.12)'
    : lightingMode === 'evening'
    ? '0 8px 40px rgba(200, 140, 60, 0.15)'
    : '0 8px 40px rgba(0,0,0,0.08)';

  return (
    <section className="py-28 bg-[#F6F5F1] border-b border-neutral-light text-left" id="materialBoardCard">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">Volume III / Tactile Studies</span>
            <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
              The Material<br />Mood Board
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="font-sans text-neutral-mid text-sm leading-relaxed max-w-xl">
              Color is never experienced in isolation. It lives alongside timber, stone, metal, and fabric.
              Select a shade and watch how it converses with six curated interior materials — 
              then shift the ambient light to see it under morning sun, noon clarity, or golden hour warmth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: The Composition */}
          <div className="lg:col-span-7">
            
            {/* Ambient Lighting Controls */}
            <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
              <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest">Ambient Light</span>
              <div className="flex bg-white p-1 rounded-2xl border border-neutral-light shadow-sm">
                {([
                  { key: 'morning' as const, label: '08:00', icon: Sunrise, color: 'text-sky-400' },
                  { key: 'noon' as const, label: '13:00', icon: Sun, color: 'text-amber-500' },
                  { key: 'evening' as const, label: '19:00', icon: Sunset, color: 'text-orange-500' },
                ]).map(({ key, label, icon: Icon, color }) => (
                  <button
                    key={key}
                    onClick={() => setLightingMode(key)}
                    className={`flex items-center gap-1.5 font-display text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer ${
                      lightingMode === key ? 'bg-primary text-white shadow-sm' : 'text-neutral-mid hover:text-primary'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${lightingMode === key ? 'text-white' : color}`} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* The Composition Canvas */}
            <div 
              className="relative w-full rounded-3xl border border-neutral-light/80 overflow-hidden select-none transition-all duration-700"
              style={{ 
                paddingBottom: '80%',
                background: `linear-gradient(145deg, #EBEAE6 0%, #E3E1DC 50%, #DDDBD5 100%)`,
                boxShadow: ambientShadow,
              }}
            >
              {/* Ambient overlay */}
              <div 
                className="absolute inset-0 transition-all duration-700 pointer-events-none z-40"
                style={{ background: ambientOverlay }}
              />

              {/* Desk texture (subtle linen paper) */}
              <div className="absolute inset-0 pointer-events-none z-0" style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.015) 1px, transparent 1px)`,
                backgroundSize: '6px 6px',
              }} />

              {/* ═══ MATERIAL SWATCHES ═══ */}

              {/* 1. Honed Marble — large, back left */}
              <div 
                className={`absolute transition-all duration-500 ease-out rounded-2xl overflow-hidden border border-neutral-dark/5 cursor-default ${
                  hoveredMaterial === 'marble' ? '-translate-y-2 shadow-2xl scale-[1.02]' : 'shadow-luxury'
                }`}
                style={{ left: '4%', top: '5%', width: '42%', height: '48%', transform: hoveredMaterial === 'marble' ? 'rotate(-1deg) translateY(-8px)' : 'rotate(-1deg)' }}
                onMouseEnter={() => setHoveredMaterial('marble')}
                onMouseLeave={() => setHoveredMaterial(null)}
              >
                <div className="absolute inset-0" style={{
                  backgroundColor: '#F0EDE7',
                  backgroundImage: `
                    linear-gradient(125deg, transparent 30%, rgba(180,170,155,0.12) 35%, transparent 40%),
                    linear-gradient(135deg, transparent 55%, rgba(160,150,130,0.08) 58%, transparent 62%),
                    linear-gradient(115deg, transparent 70%, rgba(190,180,165,0.06) 73%, transparent 76%)
                  `,
                }} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/8" />
                {/* Hover info panel */}
                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 transition-all duration-300 ${
                  hoveredMaterial === 'marble' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest block">{MATERIAL_INFO.marble.origin}</span>
                  <span className="font-display text-white text-sm font-bold block">{MATERIAL_INFO.marble.name}</span>
                  <span className="text-[9px] text-white/70">{MATERIAL_INFO.marble.detail}</span>
                </div>
                <span className={`absolute top-3 left-4 font-display text-[8px] font-bold text-neutral-dark/35 uppercase tracking-widest transition-opacity duration-300 ${
                  hoveredMaterial === 'marble' ? 'opacity-0' : 'opacity-100'
                }`}>Marble</span>
              </div>

              {/* 2. Oak Wood — bottom left, landscape */}
              <div 
                className={`absolute transition-all duration-500 ease-out rounded-2xl overflow-hidden border border-neutral-dark/5 cursor-default ${
                  hoveredMaterial === 'oak' ? '-translate-y-2 shadow-2xl scale-[1.02]' : 'shadow-luxury'
                }`}
                style={{ left: '3%', bottom: '6%', width: '50%', height: '38%', transform: hoveredMaterial === 'oak' ? 'rotate(0.5deg) translateY(-8px)' : 'rotate(0.5deg)' }}
                onMouseEnter={() => setHoveredMaterial('oak')}
                onMouseLeave={() => setHoveredMaterial(null)}
              >
                <div className="absolute inset-0" style={{
                  backgroundColor: '#C9A87C',
                  backgroundImage: `
                    repeating-linear-gradient(88deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 14px),
                    repeating-linear-gradient(92deg, rgba(60,35,10,0.04) 0px, rgba(60,35,10,0.04) 2px, transparent 2px, transparent 22px),
                    linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 30%, rgba(0,0,0,0.06) 100%)
                  `,
                }} />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/12 via-transparent to-white/8" />
                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 transition-all duration-300 ${
                  hoveredMaterial === 'oak' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest block">{MATERIAL_INFO.oak.origin}</span>
                  <span className="font-display text-white text-sm font-bold block">{MATERIAL_INFO.oak.name}</span>
                  <span className="text-[9px] text-white/70">{MATERIAL_INFO.oak.detail}</span>
                </div>
                <span className={`absolute bottom-3 right-4 font-display text-[8px] font-bold text-neutral-dark/35 uppercase tracking-widest transition-opacity duration-300 ${
                  hoveredMaterial === 'oak' ? 'opacity-0' : 'opacity-100'
                }`}>Oak</span>
              </div>

              {/* 3. Microcement Concrete — right side, tall */}
              <div 
                className={`absolute transition-all duration-500 ease-out rounded-2xl overflow-hidden border border-neutral-dark/5 cursor-default ${
                  hoveredMaterial === 'concrete' ? '-translate-y-2 shadow-2xl scale-[1.02]' : 'shadow-luxury'
                }`}
                style={{ right: '4%', top: '3%', width: '32%', height: '55%', transform: hoveredMaterial === 'concrete' ? 'rotate(1.5deg) translateY(-8px)' : 'rotate(1.5deg)' }}
                onMouseEnter={() => setHoveredMaterial('concrete')}
                onMouseLeave={() => setHoveredMaterial(null)}
              >
                <div className="absolute inset-0" style={{
                  backgroundColor: '#D5D0C8',
                  backgroundImage: `
                    radial-gradient(ellipse at 30% 20%, rgba(0,0,0,0.03) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.02) 0%, transparent 40%),
                    radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: '100% 100%, 100% 100%, 8px 8px',
                }} />
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/12" />
                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 transition-all duration-300 ${
                  hoveredMaterial === 'concrete' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest block">{MATERIAL_INFO.concrete.origin}</span>
                  <span className="font-display text-white text-sm font-bold block">{MATERIAL_INFO.concrete.name}</span>
                  <span className="text-[9px] text-white/70">{MATERIAL_INFO.concrete.detail}</span>
                </div>
                <span className={`absolute top-3 right-4 font-display text-[8px] font-bold text-neutral-dark/30 uppercase tracking-widest transition-opacity duration-300 ${
                  hoveredMaterial === 'concrete' ? 'opacity-0' : 'opacity-100'
                }`}>Concrete</span>
              </div>

              {/* 4. Linen Swatch — bottom right, overlapping concrete */}
              <div 
                className={`absolute transition-all duration-500 ease-out rounded-2xl overflow-hidden border border-neutral-dark/5 cursor-default z-[5] ${
                  hoveredMaterial === 'linen' ? '-translate-y-2 shadow-2xl scale-[1.02]' : 'shadow-premium'
                }`}
                style={{ right: '8%', bottom: '8%', width: '34%', height: '32%', transform: hoveredMaterial === 'linen' ? 'rotate(-2deg) translateY(-8px)' : 'rotate(-2deg)' }}
                onMouseEnter={() => setHoveredMaterial('linen')}
                onMouseLeave={() => setHoveredMaterial(null)}
              >
                <div className="absolute inset-0" style={{
                  backgroundColor: '#EDE9E1',
                  backgroundImage: `
                    linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px),
                    linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px)
                  `,
                  backgroundSize: '3px 3px',
                }} />
                <div className="absolute inset-0 bg-gradient-to-bl from-white/15 via-transparent to-black/8" />
                <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-3 transition-all duration-300 ${
                  hoveredMaterial === 'linen' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest block">{MATERIAL_INFO.linen.origin}</span>
                  <span className="font-display text-white text-xs font-bold block">{MATERIAL_INFO.linen.name}</span>
                  <span className="text-[9px] text-white/70">{MATERIAL_INFO.linen.detail}</span>
                </div>
                <span className={`absolute top-3 right-4 font-display text-[8px] font-bold text-neutral-dark/25 uppercase tracking-widest transition-opacity duration-300 ${
                  hoveredMaterial === 'linen' ? 'opacity-0' : 'opacity-100'
                }`}>Linen</span>
              </div>

              {/* 5. Brushed Brass Bar — diagonal accent, overlapping */}
              <div 
                className={`absolute z-[8] transition-all duration-500 ${
                  hoveredMaterial === 'brass' ? 'brightness-110 scale-105' : ''
                }`}
                style={{ 
                  left: '44%', top: '52%', width: '6px', height: '35%',
                  borderRadius: '3px',
                  backgroundImage: 'linear-gradient(to bottom, #E8D5B8 0%, #D4BC94 30%, #C5A87A 60%, #A08055 100%)',
                  boxShadow: '2px 2px 12px rgba(0,0,0,0.15), inset 1px 0 0 rgba(255,255,255,0.25)',
                  transform: 'rotate(-8deg)',
                }}
                onMouseEnter={() => setHoveredMaterial('brass')}
                onMouseLeave={() => setHoveredMaterial(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/20 rounded-full" />
              </div>

              {/* A second smaller brass disc accent */}
              <div 
                className="absolute z-[8]"
                style={{
                  left: '48%', top: '48%',
                  width: '18px', height: '18px',
                  borderRadius: '50%',
                  backgroundImage: 'radial-gradient(circle at 35% 35%, #E8D5B8 0%, #C5A87A 60%, #A08055 100%)',
                  boxShadow: '1px 2px 8px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.3)',
                }}
              />

              {/* ═══ THE PAINT PLASTER SLAB — HERO ═══ */}
              <div 
                className={`absolute z-[15] rounded-3xl overflow-hidden border-2 transition-all duration-700 ease-out cursor-default ${
                  hoveredMaterial === 'paint' ? 'shadow-2xl scale-[1.03]' : 'shadow-luxury'
                } ${colorChanged ? 'scale-[1.02]' : ''}`}
                style={{ 
                  left: '18%', top: '15%', width: '45%', height: '60%',
                  backgroundColor: selectedShade ? selectedShade.hex : '#FCFBF7',
                  borderColor: 'rgba(0,0,0,0.06)',
                  transform: `rotate(-2.5deg)${hoveredMaterial === 'paint' ? ' translateY(-8px)' : ''}`,
                }}
                onMouseEnter={() => setHoveredMaterial('paint')}
                onMouseLeave={() => setHoveredMaterial(null)}
              >
                {/* Plaster stipple texture */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <defs>
                    <filter id="plaster-v2">
                      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="2" result="noise" />
                      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.06 0" result="faint" />
                      <feBlend mode="multiply" in="SourceGraphic" in2="faint" />
                    </filter>
                  </defs>
                  <rect width="200" height="200" fill="transparent" filter="url(#plaster-v2)" />
                </svg>

                {/* Directional light gradient — reduced for dark shades */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: selectedShade && hexToHsl(selectedShade.hex).l < 45
                    ? 'linear-gradient(to bottom right, rgba(255,255,255,0.06), transparent 50%, rgba(0,0,0,0.06))'
                    : 'linear-gradient(to bottom right, rgba(255,255,255,0.18), transparent 50%, rgba(0,0,0,0.12))'
                }} />

                {/* Paint drip line on color change */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] pointer-events-none transition-all duration-700"
                  style={{
                    height: colorChanged ? '100%' : '0%',
                    background: `linear-gradient(180deg, ${selectedShade?.hex || '#FFF'} 0%, transparent 100%)`,
                    opacity: colorChanged ? 0.3 : 0,
                    borderRadius: '0 0 50% 50%',
                  }}
                />

                {/* Label badge — bottom left, adapts to dark backgrounds */}
                <div className="absolute bottom-5 left-5 z-10">
                  <div className={`backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border ${
                    selectedShade && hexToHsl(selectedShade.hex).l < 45
                      ? 'bg-black/50 border-white/15'
                      : 'bg-white/90 border-white/60'
                  }`}>
                    <span className={`font-sans text-[7px] font-bold uppercase tracking-widest block mb-0.5 ${
                      selectedShade && hexToHsl(selectedShade.hex).l < 45 ? 'text-white/60' : 'text-neutral-mid'
                    }`}>Selected Base Finish</span>
                    <strong className={`font-display text-base font-black uppercase tracking-wide block leading-tight truncate max-w-[160px] ${
                      selectedShade && hexToHsl(selectedShade.hex).l < 45 ? 'text-white' : 'text-primary'
                    }`}>
                      {selectedShade?.name || 'Choose a Shade'}
                    </strong>
                    <span className={`font-sans text-[9px] font-bold mt-0.5 block ${
                      selectedShade && hexToHsl(selectedShade.hex).l < 45 ? 'text-white/50' : 'text-neutral-mid'
                    }`}>{selectedShade?.code || '—'} &bull; {selectedShade?.hex || ''}</span>
                  </div>
                </div>

                {/* Eye icon — top right corner */}
                <div className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm transition-all duration-300 ${
                  hoveredMaterial === 'paint' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                  <Eye className="w-4 h-4 text-primary" />
                </div>
              </div>

            </div>

            {/* Palette Harmony Strip */}
            <div className="mt-5 bg-white rounded-2xl p-5 border border-neutral-light shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest">Palette Harmonics</span>
                <span className="text-[8px] font-bold text-accent uppercase tracking-widest">5-Shade System</span>
              </div>
              <div className="flex h-14 rounded-xl overflow-hidden border border-neutral-light">
                {[
                  { shade: recommendedPalette.ceiling, label: 'Ceiling' },
                  { shade: recommendedPalette.accent, label: 'Light Tone' },
                  { shade: selectedShade, label: 'Base' },
                  { shade: recommendedPalette.triadic, label: 'Triadic' },
                  { shade: recommendedPalette.contrast, label: 'Contrast' },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex-1 relative group cursor-pointer transition-all duration-300 hover:flex-[1.5]"
                    style={{ background: item.shade?.hex || '#F5F5F0' }}
                    onClick={() => item.shade && onSelectShade(item.shade)}
                  >
                    <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-[7px] font-bold uppercase tracking-wider">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 items-start bg-white/60 p-4 rounded-xl border border-neutral-light mt-3">
              <Layers className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <p className="font-sans text-neutral-mid text-[11px] leading-relaxed text-left">
                Hover over any material to inspect its provenance. Toggle the ambient light to see how your paint shifts 
                from cool morning daylight through warm golden hour tungsten.
              </p>
            </div>
          </div>

          {/* Right Column: Palette Details */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-neutral-light shadow-sm text-left flex flex-col gap-7 sticky top-24">
              
              {/* Selected shade */}
              <div>
                <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest block mb-3">Active Shade</span>
                {selectedShade ? (
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 rounded-2xl border shadow-inner flex-shrink-0 overflow-hidden"
                         style={{ background: selectedShade.hex }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-black/10" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-primary text-xl leading-tight">{selectedShade.name}</h4>
                      <p className="font-sans text-neutral-mid text-xs font-semibold mt-1">
                        {selectedShade.code} &bull; {selectedShade.hex} &bull; {selectedShade.category || 'Premium'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-neutral-mid text-sm italic py-4">Select a shade from the catalogue below.</p>
                )}
              </div>

              {/* Recommendations */}
              <div className="border-t border-neutral-light pt-6">
                <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest block mb-4">Designer Pairings</span>
                
                <div className="flex flex-col gap-3">
                  {([
                    { key: 'accent' as const, label: 'Monochromatic Accent', desc: 'Darker tonal variation' },
                    { key: 'contrast' as const, label: 'Complementary Contrast', desc: '180° hue shift' },
                    { key: 'triadic' as const, label: 'Triadic Harmony', desc: '120° hue shift' },
                  ]).map(({ key, label, desc }) => {
                    const shade = recommendedPalette[key];
                    return (
                      <div 
                        key={key}
                        onClick={() => applySuggestedColor(key)}
                        className="flex items-center gap-4 bg-neutral-soft/60 border border-neutral-light hover:border-primary rounded-xl p-3.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium group"
                      >
                        <div className="relative w-11 h-11 rounded-xl border flex-shrink-0 overflow-hidden"
                             style={{ background: shade?.hex || '#FFF' }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />
                        </div>
                        <div className="flex flex-col leading-tight flex-grow min-w-0">
                          <span className="text-[8px] font-bold text-neutral-mid uppercase tracking-wider mb-0.5">{label}</span>
                          <strong className="font-display text-primary text-sm font-bold truncate group-hover:text-accent transition-colors">{shade?.name || '...'}</strong>
                          <span className="text-[9px] text-neutral-mid font-sans">{shade?.code || ''} &bull; {desc}</span>
                        </div>
                        <span className="text-[8px] font-bold text-accent uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">Apply</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsAppShare}
                disabled={!selectedShade}
                className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider w-full py-4 rounded-xl hover:bg-primary-light transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:pointer-events-none cursor-pointer mt-2"
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
