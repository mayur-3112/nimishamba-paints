import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface ColorMyWorldWebGLProps {
  onComplete?: () => void;
  isButtonOnly?: boolean;
  buttonClassName?: string;
  forceTrigger?: boolean;
}

export default function ColorMyWorldWebGL({
  onComplete,
  isButtonOnly = false,
  buttonClassName = "",
  forceTrigger = false
}: ColorMyWorldWebGLProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (forceTrigger) {
      triggerLaunch();
    }
  }, [forceTrigger]);

  const triggerLaunch = () => {
    setIsPlaying(true);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTimeout(() => {
        setIsPlaying(false);
        if (onComplete) onComplete();
      }, 1500);
      return;
    }

    setTimeout(() => {
      initWebGLSimulation();
    }, 50);
  };

  const initWebGLSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      setTimeout(() => {
        setIsPlaying(false);
        if (onComplete) onComplete();
      }, 2500);
      return;
    }

    let width = (canvas.width = window.innerWidth * window.devicePixelRatio);
    let height = (canvas.height = window.innerHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener('resize', handleResize);

    // ── GLSL SHADERS (Isotropic Aspect Ratio & Full-Viewport Liquid Paint Physics) ──
    const vertShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_progress;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      float liquidField(vec2 p, float time, float prog) {
        // Distance from center origin
        float dist = length(p);
        
        // Fluid Wave Expansion across full viewport radius
        float waveRadius = prog * 1.6;
        float fluid = dist - waveRadius;

        // Viscous Surface Ripples & Droplets
        float n = noise(p * 8.0 + time * 1.2) * 0.12;
        float drip = sin(p.x * 12.0 + time) * 0.06 * (1.0 - prog);
        
        return fluid + n + drip;
      }

      void main() {
        // Isotropic, aspect-ratio independent coordinate system centered at (0,0)
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        float prog = clamp(u_progress, 0.0, 1.0);
        float f = liquidField(p, u_time, prog);

        float edge = smoothstep(0.04, -0.04, f);
        if (edge <= 0.001) {
          discard;
        }

        // 3D Surface Normal Gradient
        vec2 e = vec2(0.003, 0.0);
        float nx = liquidField(p + e.xy, u_time, prog) - liquidField(p - e.xy, u_time, prog);
        float ny = liquidField(p + e.yx, u_time, prog) - liquidField(p - e.yx, u_time, prog);
        vec3 norm = normalize(vec3(-nx, -ny, 0.1));

        // Studio Light Highlight
        vec3 light = normalize(vec3(-0.4, -0.7, 1.0));
        vec3 view = vec3(0.0, 0.0, 1.0);
        vec3 halfV = normalize(light + view);
        float spec = pow(max(dot(norm, halfV), 0.0), 32.0) * 0.85;
        float rim = pow(1.0 - max(dot(norm, view), 0.0), 2.2) * 0.4;

        // Signature Palette: Berger Crimson (#E31959), Gold (#D4AF37), Teal (#008080)
        vec3 crimson = vec3(0.89, 0.10, 0.35);
        vec3 gold = vec3(0.83, 0.69, 0.22);
        vec3 teal = vec3(0.0, 0.50, 0.50);

        vec3 paintCol = mix(crimson, gold, sin(p.x * 5.0 + u_time) * 0.5 + 0.5);
        paintCol = mix(paintCol, teal, cos(p.y * 4.0) * 0.3);

        vec3 finalCol = paintCol + vec3(spec + rim);
        float alpha = clamp(edge * (1.0 - prog * 0.85), 0.0, 1.0);

        gl_FragColor = vec4(finalCol, alpha);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragShaderSource);

    if (!vertShader || !fragShader) {
      setIsPlaying(false);
      if (onComplete) onComplete();
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setIsPlaying(false);
      if (onComplete) onComplete();
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uProg = gl.getUniformLocation(program, 'u_progress');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const startTime = performance.now();
    const duration = 3200; // 3.2s duration

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);

      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, elapsed * 0.001);
      gl.uniform1f(uProg, progress);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        window.removeEventListener('resize', handleResize);
        gl.deleteBuffer(positionBuffer);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteProgram(program);
        
        setIsPlaying(false);
        if (onComplete) onComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  return (
    <>
      {/* ── REAL-TIME GPU FLUID SIMULATION OVERLAY ──────────────────── */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 pointer-events-auto bg-[#070C12]/60 backdrop-blur-xs flex items-center justify-center overflow-hidden">
          
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10" />

          <div className="relative z-20 text-center px-6 pointer-events-none animate-fade-in max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full text-gold text-[10px] font-display font-extrabold uppercase tracking-widest mb-4 shadow-luxury">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
              <span>Berger Experience &middot; Mysuru</span>
            </div>
            <h1 className="font-display font-black text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase drop-shadow-2xl">
              Color My World<span className="text-[#E31959]">.</span>
            </h1>
            <p className="font-sans text-neutral-light/80 text-xs sm:text-sm mt-3 font-bold tracking-widest uppercase max-w-md mx-auto">
              Authorised Berger Paints Experience Centre &middot; Mysuru
            </p>
          </div>

          <button
            onClick={() => {
              if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
              setIsPlaying(false);
              if (onComplete) onComplete();
            }}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 bg-black/60 hover:bg-black/80 text-white/90 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 font-sans text-xs uppercase tracking-wider"
          >
            <span>Skip</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Trigger Button */}
      {!isButtonOnly && (
        <button
          onClick={triggerLaunch}
          className={buttonClassName || "group relative inline-flex items-center gap-2 border border-neutral-light/80 hover:border-primary text-primary font-display text-xs font-bold uppercase tracking-wider px-5 rounded-xl hover:bg-white transition-all cursor-pointer shadow-2xs min-h-[48px]"}
          title="Play WebGL 'Color My World' Real-Time Fluid Dynamics"
        >
          <Sparkles className="w-4 h-4 text-[#E31959]" />
          <span>Color My World</span>
        </button>
      )}
    </>
  );
}
