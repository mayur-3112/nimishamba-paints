import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Play } from 'lucide-react';

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

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };
    window.addEventListener('resize', handleResize);

    // ── GLSL SHADERS (High Gloss WebGL Liquid Paint Simulation) ──
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
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_progress;

      // Viscous Paint Surface Normal & Specular Gloss Shading
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
        // Fluid splash center point
        vec2 center = vec2(0.5, 0.5);
        float dist = length(p - center);
        
        // Fluid Wave Expansion
        float waveRadius = prog * 1.8;
        float fluid = dist - waveRadius;

        // Viscous Surface Ripples & Droplet Breakup
        float n = noise(p * 6.0 + time * 0.8) * 0.15;
        float drip = sin(p.x * 14.0 + time) * 0.08 * (1.0 - prog);
        
        return fluid + n + drip;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = st * vec2(aspect, 1.0);

        float prog = clamp(u_progress, 0.0, 1.0);
        float f = liquidField(p, u_time, prog);

        float edge = smoothstep(0.03, -0.03, f);
        if (edge <= 0.001) {
          discard;
        }

        // 3D Specular Light Normal Gradient
        vec2 e = vec2(0.004, 0.0);
        float nx = liquidField(p + e.xy, u_time, prog) - liquidField(p - e.xy, u_time, prog);
        float ny = liquidField(p + e.yx, u_time, prog) - liquidField(p - e.yx, u_time, prog);
        vec3 norm = normalize(vec3(-nx, -ny, 0.12));

        // Studio Light Highlight
        vec3 light = normalize(vec3(-0.4, -0.7, 1.0));
        vec3 view = vec3(0.0, 0.0, 1.0);
        vec3 halfV = normalize(light + view);
        float spec = pow(max(dot(norm, halfV), 0.0), 38.0) * 0.9;
        float rim = pow(1.0 - max(dot(norm, view), 0.0), 2.5) * 0.45;

        // Signature Berger Paint Palette (#E31959 Crimson, #D4AF37 Gold, #008080 Emerald)
        vec3 crimson = vec3(0.89, 0.10, 0.35);
        vec3 gold = vec3(0.83, 0.69, 0.22);
        vec3 emerald = vec3(0.0, 0.50, 0.50);

        vec3 paintCol = mix(crimson, gold, sin(p.x * 4.0 + u_time) * 0.5 + 0.5);
        paintCol = mix(paintCol, emerald, cos(p.y * 3.0) * 0.3);

        vec3 finalCol = paintCol + vec3(spec + rim);
        float alpha = clamp(edge * (1.0 - prog * 0.8), 0.0, 1.0);

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
    const duration = 3200; // 3.2 seconds max duration

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
        <div className="fixed inset-0 z-50 pointer-events-auto bg-[#070C12]/50 backdrop-blur-xs flex items-center justify-center overflow-hidden">
          
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10" />

          <div className="relative z-20 text-center px-6 pointer-events-none animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full text-gold text-[10px] font-display font-extrabold uppercase tracking-widest mb-4 shadow-luxury">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
              <span>Berger Experience &middot; Mysuru</span>
            </div>
            <h1 className="font-display font-black text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase drop-shadow-2xl">
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
            className="absolute top-8 right-8 z-30 bg-black/60 hover:bg-black/80 text-white/90 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 font-sans text-xs uppercase tracking-wider"
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
          className={buttonClassName || "group relative inline-flex items-center gap-2.5 border border-neutral-light/80 hover:border-primary text-primary font-display text-xs font-bold uppercase tracking-wider px-6 rounded-2xl hover:bg-white transition-all cursor-pointer shadow-2xs min-h-[48px]"}
          title="Play WebGL 'Color My World' Real-Time Fluid Dynamics"
        >
          <Sparkles className="w-4 h-4 text-[#E31959]" />
          <span>Color My World</span>
        </button>
      )}
    </>
  );
}
