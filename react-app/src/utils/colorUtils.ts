export interface Shade {
  name: string;
  code: string;
  hex: string;
  category?: string;
  desc?: string;
}

export function hexToHsl(hex: string) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
  let rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  let gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  let bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
  return '#' + rHex + gHex + bHex;
}

export function findClosestShade(hexVal: string, shades: Shade[]): Shade {
  if (!shades || !shades.length) {
    return { name: 'Pink Possum', code: '1P2816', hex: '#F5E2E9', category: 'Light' };
  }
  let targetR = parseInt(hexVal.slice(1, 3), 16);
  let targetG = parseInt(hexVal.slice(3, 5), 16);
  let targetB = parseInt(hexVal.slice(5, 7), 16);
  
  let closest = shades[0];
  let minDiff = Infinity;
  for (let s of shades) {
    if (!s.hex) continue;
    let r = parseInt(s.hex.slice(1, 3), 16);
    let g = parseInt(s.hex.slice(3, 5), 16);
    let b = parseInt(s.hex.slice(5, 7), 16);
    let diff = Math.sqrt((r - targetR)**2 + (g - targetG)**2 + (b - targetB)**2);
    if (diff < minDiff) {
      minDiff = diff;
      closest = s;
    }
  }
  return closest;
}
