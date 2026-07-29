import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, X, Sun, Eye } from 'lucide-react';

interface ArchitecturalColourRevealProps {
  onComplete?: () => void;
  autoPlay?: boolean;
  isButtonOnly?: boolean;
  buttonClassName?: string;
  forceTrigger?: boolean;
}

export default function ArchitecturalColourReveal({
  onComplete,
  autoPlay = true,
  isButtonOnly = false,
  buttonClassName = "",
  forceTrigger = false
}: ArchitecturalColourRevealProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState<'quiet' | 'beam' | 'vibrant' | 'complete'>('complete');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-play on first session load
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('architectural_reveal_played');
    if (!hasPlayed && autoPlay) {
      triggerReveal();
    }
  }, [autoPlay]);

  // Force trigger prop
  useEffect(() => {
    if (forceTrigger) {
      triggerReveal();
    }
  }, [forceTrigger]);

  const triggerReveal = () => {
    sessionStorage.setItem('architectural_reveal_played', 'true');
    setIsPlaying(true);
    setStage('quiet');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTimeout(() => {
        setIsPlaying(false);
        setStage('complete');
        if (onComplete) onComplete();
      }, 1200);
      return;
    }

    // Sequence timing (Total 3.4 seconds)
    // Stage 1 (0-600ms): Architectural Quiet / Monochrome Lighting
    // Stage 2 (600-2400ms): Spectrum Light Beam Sweep across space
    // Stage 3 (2400-3400ms): Soft Dissolve & Pristine Vibrant State

    timerRef.current = setTimeout(() => {
      setStage('beam');
    }, 600);

    timerRef.current = setTimeout(() => {
      setStage('vibrant');
    }, 2400);

    timerRef.current = setTimeout(() => {
      setIsPlaying(false);
      setStage('complete');
      if (onComplete) onComplete();
    }, 3400);
  };

  const skip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
    setStage('complete');
    if (onComplete) onComplete();
  };

  return (
    <>
      {/* ── CINEMATIC ARCHITECTURAL LIGHT & COLOUR REVEAL OVERLAY ───── */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 pointer-events-auto bg-[#070C12] flex items-center justify-center overflow-hidden transition-opacity duration-1000">
          
          {/* Stage 1 & 2: Architectural Grayscale / Spatial Lighting Mesh */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${
            stage === 'quiet' ? 'opacity-100' : 'opacity-20'
          }`}>
            <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-black/80" />
            {/* Subtle Architectural Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          {/* Stage 2: Architectural Spectrum Light Sweep Beam */}
          <div
            className={`absolute inset-y-0 -left-1/2 w-[200%] pointer-events-none transition-transform duration-[1800ms] cubic-bezier(0.25, 1, 0.5, 1) ${
              stage === 'beam' || stage === 'vibrant' ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Prismatic Light Beam Gradient */}
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#E31959]/30 via-gold/30 via-accent/30 to-transparent blur-3xl transform skew-x-12 opacity-80" />
          </div>

          {/* Floating Refractive Prism Line */}
          <div
            className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#E31959] via-gold to-white shadow-[0_0_50px_#D4AF37] transition-all duration-[1800ms] cubic-bezier(0.25, 1, 0.5, 1) ${
              stage === 'beam' || stage === 'vibrant' ? 'left-full opacity-0' : 'left-0 opacity-100'
            }`}
          />

          {/* Minimalist Architectural Title Card */}
          <div className="relative z-20 text-center px-8 pointer-events-none max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-1.5 rounded-full text-gold text-[10px] font-display font-extrabold uppercase tracking-widest mb-6 shadow-luxury">
              <Sun className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>Berger Colour World &middot; Experience Centre</span>
            </div>

            <h1 className="font-display font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.95] drop-shadow-2xl">
              Bringing Space<br />
              <span className="bg-gradient-to-r from-[#E31959] via-gold to-amber-300 bg-clip-text text-transparent">
                To Life.
              </span>
            </h1>

            <p className="font-sans text-neutral-light/75 text-xs sm:text-sm mt-5 font-medium tracking-widest uppercase max-w-lg mx-auto leading-relaxed">
              An architectural exploration of light, texture, and color.
            </p>
          </div>

          {/* Skip Button */}
          <button
            onClick={skip}
            className="absolute top-8 right-8 z-30 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-4 py-2 rounded-full border border-white/15 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 font-sans text-xs uppercase tracking-wider"
          >
            <span>Skip</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Trigger Button (Hero & Nav Integration) */}
      {!isButtonOnly && (
        <button
          onClick={triggerReveal}
          className={buttonClassName || "group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E31959] via-accent to-gold text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-luxury hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer overflow-hidden"}
          title="Experience Architectural Light & Colour Reveal"
        >
          <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Eye className="w-4 h-4 text-gold-light group-hover:rotate-12 transition-transform" />
          <span>Experience Colour Reveal</span>
        </button>
      )}
    </>
  );
}
