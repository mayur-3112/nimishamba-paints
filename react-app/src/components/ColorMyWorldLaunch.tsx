import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Play } from 'lucide-react';

interface ColorMyWorldLaunchProps {
  onComplete?: () => void;
  autoPlay?: boolean;
}

export default function ColorMyWorldLaunch({ onComplete, autoPlay = false }: ColorMyWorldLaunchProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVibrant, setIsVibrant] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Check session storage on mount
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('color_my_world_played');
    if (!hasPlayed && autoPlay) {
      triggerLaunch();
    }
  }, [autoPlay]);

  const triggerLaunch = () => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sessionStorage.setItem('color_my_world_played', 'true');
    setIsPlaying(true);

    if (prefersReducedMotion) {
      // Graceful 1.5s fallback transition for reduced motion
      setTimeout(() => {
        setIsPlaying(false);
        setIsVibrant(true);
        if (onComplete) onComplete();
      }, 1500);
      return;
    }

    // High performance 60 FPS liquid paint physics animation
    setTimeout(() => {
      runLiquidPaintPhysics();
    }, 50);
  };

  const runLiquidPaintPhysics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Liquid Paint Stream Particles
    const colors = [
      '#E31959', // Berger Signature Crimson
      '#D4AF37', // Royal Gold
      '#008080', // Imperial Teal
      '#1E3A5F', // Deep Sapphire
      '#FAF9F6', // Soft Pearl
      '#F2A900', // Sun Gold
    ];

    interface PaintBlob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      dripSpeed: number;
      viscosity: number;
      glossOpacity: number;
      splashParticles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        alpha: number;
      }>;
    }

    const blobs: PaintBlob[] = [];
    const numBlobs = 18;

    for (let i = 0; i < numBlobs; i++) {
      const angle = (i / numBlobs) * Math.PI * 2;
      const speed = 8 + Math.random() * 12;
      blobs.push({
        x: width / 2 + (Math.random() - 0.5) * 100,
        y: height / 2 + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed * (width / 1000),
        vy: Math.sin(angle) * speed * (height / 1000) + Math.random() * 2,
        radius: Math.random() * 120 + 80,
        color: colors[i % colors.length],
        dripSpeed: Math.random() * 4 + 2,
        viscosity: Math.random() * 0.08 + 0.94,
        glossOpacity: 0.85,
        splashParticles: Array.from({ length: 8 }, () => ({
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.5) * 14,
          size: Math.random() * 8 + 3,
          alpha: 1,
        })),
      });
    }

    const startTime = performance.now();
    const duration = 4200; // 4.2 seconds cinematic duration

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.clearRect(0, 0, width, height);

      // Phase 1 (0ms - 1500ms): Liquid Paint Stream Burst & Splash
      // Phase 2 (1500ms - 3200ms): Flowing Wave Wipe & Drips
      // Phase 3 (3200ms - 4200ms): Glossy Dissolve & Interface Reveal

      // Ambient liquid backdrop wipe
      const wipeRadius = Math.pow(progress, 1.8) * Math.hypot(width, height) * 1.3;

      // Draw flowing background fluid wave
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, wipeRadius, 0, Math.PI * 2);
      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(10, wipeRadius)
      );
      bgGradient.addColorStop(0, 'rgba(11, 17, 26, 0.95)');
      bgGradient.addColorStop(0.5, 'rgba(227, 25, 89, 0.4)');
      bgGradient.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
      ctx.fillStyle = bgGradient;
      ctx.fill();
      ctx.restore();

      // Render Liquid Blobs with Physics
      blobs.forEach((blob) => {
        // Apply Viscosity & Drip Physics
        blob.x += blob.vx;
        blob.y += blob.vy + (progress > 0.4 ? blob.dripSpeed : 0);
        blob.vx *= blob.viscosity;
        blob.vy *= blob.viscosity;
        blob.radius += Math.sin(elapsed * 0.005) * 0.5;

        ctx.save();
        
        // Fluid Blob Path
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, Math.max(1, blob.radius * (1 - progress * 0.4)), 0, Math.PI * 2);
        
        // Liquid Paint Viscous Fill
        ctx.fillStyle = blob.color;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 8;
        ctx.fill();

        // Glossy Specular Highlight (Luxury Paint Commercial Look)
        ctx.beginPath();
        ctx.ellipse(
          blob.x - blob.radius * 0.3,
          blob.y - blob.radius * 0.3,
          Math.max(1, blob.radius * 0.35),
          Math.max(1, blob.radius * 0.2),
          Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${0.45 * (1 - progress)})`;
        ctx.fill();

        // Liquid Splashes Physics
        blob.splashParticles.forEach((sp) => {
          if (progress < 0.6) {
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha = Math.max(0, 1 - progress * 1.8);

            ctx.beginPath();
            ctx.arc(blob.x + sp.x, blob.y + sp.y, sp.size, 0, Math.PI * 2);
            ctx.fillStyle = blob.color;
            ctx.globalAlpha = sp.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        });

        ctx.restore();
      });

      // Liquid Drip Stream Lines down the screen
      if (progress > 0.3 && progress < 0.85) {
        const dripProgress = (progress - 0.3) / 0.55;
        ctx.save();
        colors.forEach((c, idx) => {
          const streamX = (width / (colors.length + 1)) * (idx + 1);
          const streamY = dripProgress * height * 1.2;

          ctx.beginPath();
          ctx.moveTo(streamX, 0);
          ctx.bezierCurveTo(
            streamX + Math.sin(elapsed * 0.003 + idx) * 40,
            streamY * 0.5,
            streamX - Math.sin(elapsed * 0.003 + idx) * 40,
            streamY * 0.8,
            streamX,
            streamY
          );
          ctx.lineWidth = Math.max(2, 28 * (1 - dripProgress));
          ctx.strokeStyle = c;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Glossy reflection on liquid stream
          ctx.lineWidth = Math.max(1, 6 * (1 - dripProgress));
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.stroke();
        });
        ctx.restore();
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        // Complete animation smoothly
        window.removeEventListener('resize', handleResize);
        setIsPlaying(false);
        setIsVibrant(true);
        if (onComplete) onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(render);
  };

  return (
    <>
      {/* ── CINEMATIC FULLSCREEN LIQUID ANIMATION OVERLAY ───────────── */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 pointer-events-auto bg-primary/40 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          
          {/* Hardware Accelerated Liquid Paint Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10" />

          {/* Cinematic Overlay Title Banner */}
          <div className="relative z-20 text-center px-6 pointer-events-none animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-gold text-xs font-display font-extrabold uppercase tracking-widest mb-4 shadow-luxury">
              <Sparkles className="w-4 h-4 text-gold animate-spin" />
              <span>Berger Paints Experience</span>
            </div>
            <h1 className="font-display font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase drop-shadow-2xl">
              Colour My World<span className="text-[#E31959]">.</span>
            </h1>
            <p className="font-sans text-neutral-light/80 text-xs sm:text-sm mt-3 font-semibold tracking-wider uppercase max-w-md mx-auto">
              Transforming spaces into living art with Berger Colour World
            </p>
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
              setIsPlaying(false);
              setIsVibrant(true);
              if (onComplete) onComplete();
            }}
            className="absolute top-8 right-8 z-30 bg-black/40 hover:bg-black/70 text-white/80 hover:text-white p-3 rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 font-sans text-xs"
            aria-label="Skip Animation"
          >
            <span>Skip</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── DYNAMIC CTA TRIGGER BUTTON (Floating & Hero integrated) ── */}
      <button
        onClick={triggerLaunch}
        className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E31959] via-accent to-gold text-white font-display text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-luxury hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30 cursor-pointer overflow-hidden"
        title="Trigger Cinematic 'Color My World' Liquid Paint Experience"
      >
        <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <Sparkles className="w-4 h-4 text-gold-light group-hover:rotate-45 transition-transform" />
        <span>Colour My World</span>
        <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* ── POST-LAUNCH VIBRANT AMBIENT SHIMMER EFFECT ───────────────── */}
      {isVibrant && (
        <div className="fixed inset-0 pointer-events-none z-10 animate-fade-in">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#E31959]/10 via-gold/10 to-transparent rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/10 via-emerald-500/10 to-transparent rounded-full filter blur-3xl" />
        </div>
      )}
    </>
  );
}
