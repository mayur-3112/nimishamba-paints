import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface CompareSliderProps {
  /** Base photograph. Used as-is when comparing shades. */
  image: string;
  alt: string;
  /** Optional real "before" photograph. When supplied it replaces the shade blend. */
  beforeImage?: string;
  fromLabel: string;
  toLabel: string;
  /** Shade blended over the left/right halves when no beforeImage is supplied. */
  fromHex?: string;
  toHex?: string;
}

/**
 * Drag-to-compare slider.
 *
 * Two modes:
 *  - photo mode (`beforeImage` supplied) reveals one photograph over another
 *  - shade mode (default) blends two colours over the same photograph, so the
 *    comparison stays an honest shade preview rather than an implied renovation
 *
 * The handle is a real range input, so it is keyboard operable and announced
 * correctly by screen readers rather than being a mouse-only affordance.
 */
export default function CompareSlider({
  image,
  alt,
  beforeImage,
  fromLabel,
  toLabel,
  fromHex,
  toHex,
}: CompareSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromPointer = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore the range input itself so keyboard/native dragging still works.
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    updateFromPointer(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className="relative w-full aspect-4/3 overflow-hidden rounded-2xl select-none touch-pan-y bg-neutral-light cursor-ew-resize"
    >
      {/* Right-hand state (revealed as the handle moves left) */}
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {!beforeImage && toHex && (
        <div
          className="absolute inset-0 multiply-blend pointer-events-none"
          style={{ backgroundColor: toHex }}
        />
      )}

      {/* Left-hand state. Clipped rather than width-constrained so the image keeps
          its full size and does not squash as the handle moves. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage ?? image}
          alt={beforeImage ? `${alt} before painting` : ''}
          aria-hidden={!beforeImage}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {!beforeImage && fromHex && (
          <div
            className="absolute inset-0 multiply-blend"
            style={{ backgroundColor: fromHex }}
          />
        )}
      </div>

      {/* Shade name chips */}
      <span className="absolute top-3 left-3 z-20 glass-panel rounded-full px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-primary pointer-events-none">
        {fromLabel}
      </span>
      <span className="absolute top-3 right-3 z-20 glass-panel rounded-full px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-primary pointer-events-none">
        {toLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)] pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <MoveHorizontal className="w-4.5 h-4.5 text-primary" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(position)}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Compare ${fromLabel} with ${toLabel}. Drag to reveal each shade.`}
        className="absolute inset-0 z-30 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}
