import React, { useState, useEffect, useCallback } from 'react';
import { Shade, hexToHsl, hslToHex, findClosestShade } from '../utils/colorUtils';
import { MessageSquare, RotateCcw, Paintbrush, Layers } from 'lucide-react';

interface PaintInspirationProps {
  selectedShade: Shade | null;
  onSelectShade: (shade: Shade) => void;
  allShades: Shade[];
}

type Surface = 'backWall' | 'leftWall' | 'rightWall' | 'floor' | 'ceiling';

interface RoomColors {
  backWall: string;
  leftWall: string;
  rightWall: string;
  floor: string;
  ceiling: string;
}

interface RoomShades {
  backWall: Shade | null;
  leftWall: Shade | null;
  rightWall: Shade | null;
  floor: Shade | null;
  ceiling: Shade | null;
}

const SURFACE_LABELS: Record<Surface, string> = {
  backWall: 'Back Wall',
  leftWall: 'Left Wall',
  rightWall: 'Right Wall',
  floor: 'Floor',
  ceiling: 'Ceiling',
};

const DEFAULT_COLORS: RoomColors = {
  backWall: '#F5F0E8',
  leftWall: '#EBE6DE',
  rightWall: '#E8E3DB',
  floor: '#D4C9B8',
  ceiling: '#FAFAF8',
};

export default function PaintInspiration({ selectedShade, onSelectShade, allShades }: PaintInspirationProps) {
  const [activeSurface, setActiveSurface] = useState<Surface>('backWall');
  const [roomColors, setRoomColors] = useState<RoomColors>(DEFAULT_COLORS);
  const [roomShades, setRoomShades] = useState<RoomShades>({
    backWall: null, leftWall: null, rightWall: null, floor: null, ceiling: null,
  });
  const [hoveredSurface, setHoveredSurface] = useState<Surface | null>(null);
  const [justPainted, setJustPainted] = useState<Surface | null>(null);

  // Default shade
  useEffect(() => {
    if (!selectedShade && allShades.length > 0) {
      onSelectShade(allShades[0]);
    }
  }, [allShades]);

  // When user clicks "Apply" or clicks a surface, paint it with the selected shade
  const paintSurface = useCallback((surface: Surface) => {
    if (!selectedShade) return;
    setRoomColors(prev => ({ ...prev, [surface]: selectedShade.hex }));
    setRoomShades(prev => ({ ...prev, [surface]: selectedShade }));
    setJustPainted(surface);
    setTimeout(() => setJustPainted(null), 600);
  }, [selectedShade]);

  // Auto-suggest harmonious colors for unpainted surfaces
  const suggestHarmony = useCallback(() => {
    if (!selectedShade) return;
    const hsl = hexToHsl(selectedShade.hex);

    const suggestions: Partial<Record<Surface, string>> = {};

    // Back wall: selected color
    suggestions.backWall = selectedShade.hex;

    // Left wall: slightly lighter tint
    suggestions.leftWall = hslToHex(hsl.h, Math.max(8, hsl.s - 10), Math.min(95, hsl.l + 8));

    // Right wall: slightly darker shade
    suggestions.rightWall = hslToHex(hsl.h, Math.max(10, hsl.s), Math.max(30, hsl.l - 6));

    // Floor: warm neutral
    suggestions.floor = hslToHex((hsl.h + 15) % 360, Math.max(8, Math.min(18, hsl.s)), 78);

    // Ceiling: near-white warm tint
    suggestions.ceiling = hslToHex(hsl.h, Math.max(3, Math.min(8, hsl.s)), 97);

    const newColors = { ...roomColors };
    const newShades = { ...roomShades };

    (Object.keys(suggestions) as Surface[]).forEach(key => {
      const hex = suggestions[key]!;
      const shade = findClosestShade(hex, allShades);
      newColors[key] = shade.hex;
      newShades[key] = shade;
    });

    setRoomColors(newColors);
    setRoomShades(newShades);
  }, [selectedShade, allShades]);

  const resetRoom = () => {
    setRoomColors(DEFAULT_COLORS);
    setRoomShades({ backWall: null, leftWall: null, rightWall: null, floor: null, ceiling: null });
  };

  // Darken a hex color for shadows
  const darken = (hex: string, amount: number): string => {
    const hsl = hexToHsl(hex);
    return hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - amount));
  };

  const lighten = (hex: string, amount: number): string => {
    const hsl = hexToHsl(hex);
    return hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + amount));
  };

  const handleWhatsAppShare = () => {
    const lines = (Object.keys(SURFACE_LABELS) as Surface[])
      .filter(k => roomShades[k])
      .map(k => `• ${SURFACE_LABELS[k]}: ${roomShades[k]!.name} (${roomShades[k]!.code})`);

    if (lines.length === 0) return;

    const msg = `Hi Nimishamba Paints! 👋\n\nI designed a complete room color scheme in your Isometric Room Studio:\n\n${lines.join('\n')}\n\nI'd like to schedule a consultation to examine physical swatches.`;
    window.open('https://wa.me/919448084351?text=' + encodeURIComponent(msg), '_blank');
  };

  const surfaceClass = (surface: Surface) => {
    let base = 'cursor-pointer transition-all duration-500 ';
    if (activeSurface === surface) base += 'ring-2 ring-accent ring-offset-1 ';
    if (hoveredSurface === surface) base += 'brightness-110 ';
    if (justPainted === surface) base += 'animate-pulse ';
    return base;
  };

  const paintedCount = (Object.keys(roomShades) as Surface[]).filter(k => roomShades[k]).length;

  return (
    <section className="py-24 bg-neutral-soft border-b border-neutral-light text-left" id="roomStudio">
      <div className="max-w-7xl mx-auto px-6">

        {/* Typographic Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-4">Volume III / Spatial Studies</span>
            <h2 className="font-display font-black text-primary text-4xl sm:text-5xl uppercase leading-tight">
              The Isometric<br />Room Studio
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="font-sans text-neutral-mid text-sm leading-relaxed max-w-xl">
              Select a shade from the catalogue, then click any surface in this 3D room to paint it.
              The room is rendered entirely in CSS — no images, no plugins. Use <strong>Auto-Harmony</strong> to generate
              a professionally balanced scheme across all five surfaces.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: 3D Room */}
          <div className="lg:col-span-7">

            {/* Toolbar */}
            <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
              <div className="flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-accent" />
                <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest">
                  Painting: <span className="text-primary">{SURFACE_LABELS[activeSurface]}</span>
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={suggestHarmony}
                  disabled={!selectedShade}
                  className="font-display text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-light transition-all shadow-sm disabled:opacity-40 cursor-pointer"
                >
                  Auto-Harmony
                </button>
                <button
                  onClick={resetRoom}
                  className="font-display text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg bg-white text-neutral-mid border border-neutral-light hover:border-primary hover:text-primary transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 inline mr-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* The Isometric Room — Pure CSS 3D */}
            <div className="relative w-full bg-[#E8E5E0] rounded-3xl border border-neutral-light overflow-hidden shadow-inner select-none"
                 style={{ paddingBottom: '75%' }}>
              <div className="absolute inset-0 flex items-center justify-center"
                   style={{ perspective: '900px' }}>

                {/* Room container — rotated to dimetric view */}
                <div className="relative" style={{
                  width: '320px', height: '240px',
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(-12deg) rotateY(-32deg) translateY(10px)',
                }}>

                  {/* BACK WALL */}
                  <div
                    className={surfaceClass('backWall')}
                    onClick={() => { setActiveSurface('backWall'); paintSurface('backWall'); }}
                    onMouseEnter={() => setHoveredSurface('backWall')}
                    onMouseLeave={() => setHoveredSurface(null)}
                    style={{
                      position: 'absolute',
                      width: '320px', height: '240px',
                      transform: 'translateZ(-160px)',
                      background: `linear-gradient(180deg, ${lighten(roomColors.backWall, 3)} 0%, ${roomColors.backWall} 40%, ${darken(roomColors.backWall, 4)} 100%)`,
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Wall texture overlay */}
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.04,
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)',
                      backgroundSize: '100% 4px',
                    }} />
                    {/* Painting frame on back wall */}
                    <div style={{
                      position: 'absolute', left: '50%', top: '22%',
                      transform: 'translateX(-50%)',
                      width: '80px', height: '55px',
                      border: `3px solid ${darken(roomColors.backWall, 20)}`,
                      borderRadius: '2px',
                      background: `linear-gradient(135deg, ${darken(roomColors.backWall, 8)}, ${darken(roomColors.backWall, 15)})`,
                      boxShadow: '2px 3px 8px rgba(0,0,0,0.15)',
                    }} />
                    <span style={{
                      position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                      fontSize: '8px', fontWeight: 800, color: 'rgba(0,0,0,0.15)',
                      textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap',
                    }}>Back Wall</span>
                  </div>

                  {/* LEFT WALL */}
                  <div
                    className={surfaceClass('leftWall')}
                    onClick={() => { setActiveSurface('leftWall'); paintSurface('leftWall'); }}
                    onMouseEnter={() => setHoveredSurface('leftWall')}
                    onMouseLeave={() => setHoveredSurface(null)}
                    style={{
                      position: 'absolute',
                      width: '320px', height: '240px',
                      transform: 'rotateY(90deg) translateZ(-160px)',
                      background: `linear-gradient(180deg, ${lighten(roomColors.leftWall, 2)} 0%, ${roomColors.leftWall} 35%, ${darken(roomColors.leftWall, 6)} 100%)`,
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 80px rgba(0,0,0,0.12)',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.03,
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)',
                      backgroundSize: '100% 4px',
                    }} />
                    {/* Window on left wall */}
                    <div style={{
                      position: 'absolute', right: '15%', top: '18%',
                      width: '70px', height: '70px',
                      border: `4px solid ${darken(roomColors.leftWall, 15)}`,
                      borderRadius: '2px',
                      background: 'linear-gradient(135deg, #C8DEF0 0%, #A8C8E8 50%, #88B0D8 100%)',
                      boxShadow: 'inset 0 0 15px rgba(255,255,255,0.3), 3px 3px 10px rgba(0,0,0,0.1)',
                    }}>
                      {/* Window cross bars */}
                      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: darken(roomColors.leftWall, 15), transform: 'translateX(-50%)' }} />
                      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: darken(roomColors.leftWall, 15), transform: 'translateY(-50%)' }} />
                    </div>
                    {/* Light cast from window */}
                    <div style={{
                      position: 'absolute', right: '8%', top: '60%',
                      width: '90px', height: '120px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
                      transform: 'skewX(-8deg)',
                      borderRadius: '2px',
                    }} />
                    <span style={{
                      position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                      fontSize: '8px', fontWeight: 800, color: 'rgba(0,0,0,0.12)',
                      textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap',
                    }}>Left Wall</span>
                  </div>

                  {/* RIGHT WALL */}
                  <div
                    className={surfaceClass('rightWall')}
                    onClick={() => { setActiveSurface('rightWall'); paintSurface('rightWall'); }}
                    onMouseEnter={() => setHoveredSurface('rightWall')}
                    onMouseLeave={() => setHoveredSurface(null)}
                    style={{
                      position: 'absolute',
                      width: '320px', height: '240px',
                      transform: 'rotateY(-90deg) translateZ(-160px)',
                      background: `linear-gradient(180deg, ${lighten(roomColors.rightWall, 2)} 0%, ${roomColors.rightWall} 35%, ${darken(roomColors.rightWall, 5)} 100%)`,
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.03,
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)',
                      backgroundSize: '100% 4px',
                    }} />
                    {/* Shelf on right wall */}
                    <div style={{
                      position: 'absolute', left: '12%', top: '35%',
                      width: '100px', height: '6px',
                      background: '#8B7355',
                      borderRadius: '1px',
                      boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                    }} />
                    {/* Books on shelf */}
                    <div style={{ position: 'absolute', left: '14%', top: '18%', display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
                      <div style={{ width: '8px', height: '38px', background: '#C85A4A', borderRadius: '1px' }} />
                      <div style={{ width: '7px', height: '32px', background: '#4A7B8C', borderRadius: '1px' }} />
                      <div style={{ width: '9px', height: '42px', background: '#8B6F47', borderRadius: '1px' }} />
                      <div style={{ width: '6px', height: '28px', background: '#6B8E5A', borderRadius: '1px' }} />
                      <div style={{ width: '8px', height: '35px', background: '#9B7B5A', borderRadius: '1px' }} />
                    </div>
                    <span style={{
                      position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                      fontSize: '8px', fontWeight: 800, color: 'rgba(0,0,0,0.12)',
                      textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap',
                    }}>Right Wall</span>
                  </div>

                  {/* FLOOR */}
                  <div
                    className={surfaceClass('floor')}
                    onClick={() => { setActiveSurface('floor'); paintSurface('floor'); }}
                    onMouseEnter={() => setHoveredSurface('floor')}
                    onMouseLeave={() => setHoveredSurface(null)}
                    style={{
                      position: 'absolute',
                      width: '320px', height: '320px',
                      transform: 'rotateX(90deg) translateZ(120px)',
                      transformOrigin: 'center bottom',
                      background: roomColors.floor,
                      borderRadius: '4px',
                      boxShadow: 'inset 0 0 80px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Herringbone floor pattern */}
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.06,
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.08) 10px, rgba(0,0,0,0.08) 11px),
                                         repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.08) 10px, rgba(0,0,0,0.08) 11px)`,
                      backgroundSize: '22px 22px',
                    }} />
                    {/* Rug */}
                    <div style={{
                      position: 'absolute', left: '50%', top: '35%', transform: 'translate(-50%, -50%)',
                      width: '140px', height: '90px',
                      background: `linear-gradient(135deg, ${darken(roomColors.floor, 10)} 0%, ${darken(roomColors.floor, 15)} 100%)`,
                      borderRadius: '4px',
                      border: `2px solid ${darken(roomColors.floor, 18)}`,
                      opacity: 0.5,
                    }} />
                    {/* Sofa shadow */}
                    <div style={{
                      position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%, -50%)',
                      width: '120px', height: '40px',
                      background: 'radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)',
                    }} />
                  </div>

                  {/* CEILING */}
                  <div
                    className={surfaceClass('ceiling')}
                    onClick={() => { setActiveSurface('ceiling'); paintSurface('ceiling'); }}
                    onMouseEnter={() => setHoveredSurface('ceiling')}
                    onMouseLeave={() => setHoveredSurface(null)}
                    style={{
                      position: 'absolute',
                      width: '320px', height: '320px',
                      transform: 'rotateX(-90deg) translateZ(120px)',
                      transformOrigin: 'center top',
                      background: `radial-gradient(circle at 50% 50%, ${lighten(roomColors.ceiling, 2)}, ${roomColors.ceiling})`,
                      borderRadius: '4px',
                    }}
                  >
                    {/* Light fixture */}
                    <div style={{
                      position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)',
                      width: '24px', height: '24px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #FFF8E7 30%, #F0E0C0 100%)',
                      boxShadow: '0 0 30px rgba(255,248,230,0.4), 0 0 60px rgba(255,240,200,0.2)',
                    }} />
                  </div>

                  {/* FURNITURE: Sofa on back wall (CSS shapes) */}
                  <div style={{
                    position: 'absolute',
                    width: '120px', height: '50px',
                    left: '50%', bottom: '0',
                    transform: 'translateX(-50%) translateZ(-140px) translateY(-2px)',
                    transformStyle: 'preserve-3d',
                    pointerEvents: 'none',
                  }}>
                    {/* Sofa base */}
                    <div style={{
                      width: '120px', height: '35px',
                      background: 'linear-gradient(180deg, #7B6B5A 0%, #6B5B4A 100%)',
                      borderRadius: '6px 6px 3px 3px',
                      position: 'absolute', bottom: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }} />
                    {/* Sofa back */}
                    <div style={{
                      width: '120px', height: '22px',
                      background: 'linear-gradient(180deg, #8B7B6A 0%, #7B6B5A 100%)',
                      borderRadius: '6px 6px 0 0',
                      position: 'absolute', bottom: '30px',
                    }} />
                    {/* Cushion lines */}
                    <div style={{
                      position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)',
                      width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)',
                    }} />
                  </div>

                  {/* FURNITURE: Side table */}
                  <div style={{
                    position: 'absolute',
                    right: '30px', bottom: '0',
                    transform: 'translateZ(-80px) translateY(-2px)',
                    pointerEvents: 'none',
                  }}>
                    <div style={{
                      width: '25px', height: '3px',
                      background: '#A08060',
                      borderRadius: '2px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    }} />
                    <div style={{
                      width: '3px', height: '28px',
                      background: '#907050',
                      margin: '0 auto',
                    }} />
                  </div>

                  {/* FURNITURE: Floor plant */}
                  <div style={{
                    position: 'absolute',
                    left: '20px', bottom: '0',
                    transform: 'translateZ(-50px) translateY(-2px)',
                    pointerEvents: 'none',
                  }}>
                    {/* Pot */}
                    <div style={{
                      width: '18px', height: '20px',
                      background: 'linear-gradient(180deg, #C4A882 0%, #A48862 100%)',
                      borderRadius: '0 0 4px 4px',
                      margin: '0 auto',
                    }} />
                    {/* Leaves */}
                    <div style={{
                      width: '30px', height: '30px',
                      background: 'radial-gradient(circle, #5A8A4A 30%, #4A7A3A 100%)',
                      borderRadius: '50%',
                      position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
                    }} />
                  </div>

                </div>
              </div>
            </div>

            {/* Surface selector strip */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {(Object.keys(SURFACE_LABELS) as Surface[]).map(surface => (
                <button
                  key={surface}
                  onClick={() => { setActiveSurface(surface); paintSurface(surface); }}
                  className={`flex items-center gap-2 font-display text-[9px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    activeSurface === surface
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-neutral-mid border-neutral-light hover:border-primary hover:text-primary'
                  }`}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-sm border border-black/10 flex-shrink-0"
                    style={{ background: roomColors[surface] }}
                  />
                  {SURFACE_LABELS[surface]}
                </button>
              ))}
            </div>

            <div className="flex gap-2.5 items-center bg-neutral-soft p-4 rounded-xl border border-neutral-light mt-4">
              <Layers className="w-5 h-5 text-accent flex-shrink-0" />
              <p className="font-sans text-neutral-mid text-[11px] leading-normal text-left">
                <strong>Click any surface</strong> in the 3D room to paint it with the selected shade. Or press <strong>Auto-Harmony</strong> to generate a professionally balanced scheme across all five surfaces.
              </p>
            </div>
          </div>

          {/* Right: Palette Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-neutral-light shadow-sm flex flex-col gap-6 h-full">

              {/* Current brush */}
              <div>
                <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest block mb-3">Active Brush</span>
                {selectedShade ? (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl border shadow-inner flex-shrink-0"
                         style={{ background: selectedShade.hex }} />
                    <div>
                      <h4 className="font-display font-extrabold text-primary text-lg leading-tight">{selectedShade.name}</h4>
                      <p className="font-sans text-neutral-mid text-xs font-semibold mt-0.5">
                        {selectedShade.code} &bull; {selectedShade.category || 'Premium Series'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-neutral-mid text-sm italic">Select a shade from the catalogue below.</p>
                )}
              </div>

              {/* Room scheme summary */}
              <div className="border-t border-neutral-light pt-5">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest">Room Scheme</span>
                  <span className="text-[8px] font-bold text-accent uppercase tracking-widest">{paintedCount}/5 Painted</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {(Object.keys(SURFACE_LABELS) as Surface[]).map(surface => {
                    const shade = roomShades[surface];
                    return (
                      <div
                        key={surface}
                        onClick={() => { setActiveSurface(surface); if (shade) onSelectShade(shade); }}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer hover:-translate-y-0.5 hover:shadow-premium ${
                          activeSurface === surface ? 'border-primary bg-primary/5' : 'border-neutral-light bg-neutral-soft hover:border-primary/40'
                        }`}
                      >
                        <div
                          className="w-9 h-9 rounded-lg border flex-shrink-0 shadow-inner"
                          style={{ background: roomColors[surface] }}
                        />
                        <div className="flex flex-col leading-tight flex-grow min-w-0">
                          <span className="text-[8px] font-bold text-neutral-mid uppercase tracking-wider">{SURFACE_LABELS[surface]}</span>
                          {shade ? (
                            <>
                              <strong className="font-display text-primary text-sm font-bold truncate">{shade.name}</strong>
                              <span className="text-[9px] text-neutral-mid font-sans">{shade.code}</span>
                            </>
                          ) : (
                            <span className="text-[10px] text-neutral-mid italic">Not painted</span>
                          )}
                        </div>
                        {activeSurface === surface && (
                          <Paintbrush className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Palette preview bar */}
              {paintedCount > 0 && (
                <div className="border-t border-neutral-light pt-5">
                  <span className="text-[9px] font-bold text-neutral-mid uppercase tracking-widest block mb-3">Palette Preview</span>
                  <div className="flex h-12 rounded-2xl overflow-hidden border border-neutral-light shadow-inner">
                    {(Object.keys(SURFACE_LABELS) as Surface[]).map(surface => (
                      <div
                        key={surface}
                        className="flex-1 transition-colors duration-500"
                        style={{ background: roomColors[surface] }}
                        title={`${SURFACE_LABELS[surface]}: ${roomShades[surface]?.name || 'Default'}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Enquire button */}
              <button
                onClick={handleWhatsAppShare}
                disabled={paintedCount === 0}
                className="bg-primary text-white font-display text-xs font-bold uppercase tracking-wider w-full py-4 rounded-xl hover:bg-primary-light transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer mt-auto"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Send Room Scheme via WhatsApp</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
