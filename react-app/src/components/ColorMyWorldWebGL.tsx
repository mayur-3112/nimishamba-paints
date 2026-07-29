import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Play, RefreshCw } from 'lucide-react';

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
      // Fallback if WebGL is disabled
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

    // ── GLSL SHADERS (Vertex & Viscous Fluid Normal Specular Fragment Shader) ──
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

      // Metaball Signed Distance Field for Viscous Liquid Paint Dynamics
      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }

      float blobSDF(vec2 p, vec2 c, float r) {
        return length(p - c) - r;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.y = 1.0 - st.y; // Correct orientation
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = st * vec2(aspect, 1.0);

        // Fluid Metadynamics simulation parameters
        float prog = clamp(u_progress, 0.0, 1.0);
        float d = 10.0;

        // Wave sweep & dripping liquid streams
        vec2 center = vec2(0.5 * aspect, 0.5);
        float sweepRadius = pow(prog, 1.4) * aspect * 1.6;
        float wave = blobSDF(p, center, sweepRadius);
        d = smin(d, wave, 0.35);

        // Viscous Dripping Ribbons (Gravity & Viscosity)
        for (int i = 0; i < 7; i++) {
          float fi = float(i);
          float offset = fi * 0.28 * aspect;
          float dripSpeed = 0.8 + sin(fi * 1.5) * 0.3;
          float dripY = clamp((prog - 0.2) * dripSpeed * 1.8, 0.0, 1.5);
          float dripX = offset + sin(u_time * 2.0 + fi) * 0.05;
          float radius = 0.12 * (1.0 - prog * 0.4);
          
          float b = blobSDF(p, vec2(dripX, dripY), radius);
          d = smin(d, b, 0.25);
        }

        // Specular Lighting & Paint Surface Normal Calculation
        float edge = smoothstep(0.02, -0.02, d);
        
        if (edge <= 0.001) {
          discard;
        }

        // 3D Surface Normal for High-Gloss Wall Paint Specular Reflection
        vec2 eps = vec2(0.005, 0.0);
        float dx = (blobSDF(p + eps.xy, center, sweepRadius) - blobSDF(p - eps.xy, center, sweepRadius));
        float dy = (blobSDF(p + eps.yx, center, sweepRadius) - blobSDF(p - eps.yx, center, sweepRadius));
        vec3 normal = normalize(vec3(-dx, -dy, 0.15));

        // Light direction (Top Left Studio Spot)
        vec3 lightDir = normalize(vec3(-0.5, -0.8, 1.0));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(lightDir + viewDir);

        // Specular Glossy Reflection (Fresh Paint Look)
        float spec = pow(max(dot(normal, halfDir), 0.0), 32.0) * 0.85;
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0) * 0.4;

        // Signature Berger Paint Palette
        vec3 crimson = vec3(0.89, 0.10, 0.35); // #E31959
        vec3 gold = vec3(0.83, 0.69, 0.22);    // #D4AF37
        vec3 teal = vec3(0.0, 0.50, 0.50);     // #008080
        
        vec3 paintColor = mix(crimson, gold, sin(st.x * 3.0 + u_time) * 0.5 + 0.5);
        paintColor = mix(paintColor, teal, cos(st.y * 2.0) * 0.3);

        // Final Gloss Surface Blend
        vec3 finalColor = paintColor + vec3(spec + fresnel);
        float alpha = clamp(edge * (1.0 - prog * 0.85), 0.0, 1.0);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Compile Shaders
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

    // Quad Geometry
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
    const duration = 3500; // 3.5 seconds cinematic reveal

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
        // Cleanup GPU Buffers
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
        <div className="fixed inset-0 z-50 pointer-events-auto bg-[#070C12]/40 backdrop-blur-xs flex items-center justify-center overflow-hidden">
          
          {/* WebGL Canvas Shader Layer */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10" />

          {/* Cinematic Title Overlay */}
          <div className="relative z-20 text-center px-6 pointer-events-none animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-1.5 rounded-full text-gold text-[10px] font-display font-extrabold uppercase tracking-widest mb-4 shadow-luxury">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />
              <span>Berger Fluid Dynamics</span>
            </div>
            <h1 className="font-display font-black text-white text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase drop-shadow-2xl">
              Color My World<span className="text-[#E31959]">.</span>
            </h1>
            <p className="font-sans text-neutral-light/80 text-xs sm:text-sm mt-3 font-bold tracking-widest uppercase max-w-md mx-auto">
              Real-Time Fluid Simulation &middot; Berger Paints Experience Centre
            </p>
          </div>

          {/* Skip Button */}
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

      {/* Dedicated Interactive Button */}
      {!isButtonOnly && (
        <button
          onClick={triggerLaunch}
          className={buttonClassName || "group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E31959] via-accent to-gold text-white font-display text-xs font-black uppercase tracking-wider px-7 py-4 rounded-2xl shadow-luxury hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer overflow-hidden min-h-[52px]"}
          title="Play WebGL 'Color My World' Real-Time Fluid Dynamics"
        >
          <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Sparkles className="w-4 h-4 text-gold-light group-hover:rotate-45 transition-transform" />
          <span>Color My World</span>
          <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}
