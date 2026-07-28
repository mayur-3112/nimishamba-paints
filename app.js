/* ============================================================
   app.js — Sri Nimishamba Paints Website Logic
   ============================================================ */

// ── PAGE NAVIGATION ──────────────────────────────────────
function show(page) {
  const activePage = document.querySelector('.pg.active');
  const targetPage = document.getElementById('pg-' + page);
  if (!targetPage || targetPage === activePage) return;

  // Highlight active menu item
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const onclickStr = a.getAttribute('onclick') || '';
    if (onclickStr.includes(`'${page}'`)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  document.getElementById('navMenu').classList.remove('open');

  if (activePage) {
    activePage.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    targetPage.classList.add('active');
    
    // Auto-init pages when active
    if (page === 'shades' && !shadesReady) {
      initShades();
    }
    
    // Refresh AOS scroll animations for newly revealed page content
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 50);
  } else {
    targetPage.classList.add('active');
  }
}

function toggleNav() {
  document.getElementById('navMenu').classList.toggle('open');
}

// ── WHATSAPP LEAD GEN FORM ─────────────────────────────
function sendToWhatsApp(e) {
  e.preventDefault();
  const name  = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const type  = document.getElementById('fType').value;
  const area  = document.getElementById('fArea').value.trim();
  const msg = `Hi Nimishamba Paints! 👋

I need a paint estimate:
• Name: ${name}
• Phone: ${phone}
• What to paint: ${type}
${area ? `• Area: ${area}` : ''}

Please help me with shade suggestions and quantity estimate. Thank you!`;
  const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}

// Keyboard nav close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── DATA ──────────────────────────────────────────────────
let allShades = [];
let filtered = [];
let shown = 120;   // show more colors by default
let activeCat = 'All';
let shadesReady = false;

async function getShades() {
  if (allShades.length) return;
  try {
    const r = await fetch('berger_colors.json');
    const d = await r.json();
    allShades = d.shades || [];
  } catch {
    allShades = fallback();
  }
}

function fallback() {
  return [
    { name:'Pink Possum', code:'1P2816', hex:'#F5E2E9', category:'Light', desc:'' },
    { name:'Ocean Mist', code:'7A2401', hex:'#B8D4E8', category:'Pastel', desc:'' },
    { name:'Sunny Side', code:'2Y1804', hex:'#FDE68A', category:'Light', desc:'' },
    { name:'Sage Whisper', code:'3G2204', hex:'#BDD5C0', category:'Pastel', desc:'' },
    { name:'Dusk Lavender', code:'6P1812', hex:'#C4B5D4', category:'Medium', desc:'' },
    { name:'Terracotta Dream', code:'8R0921', hex:'#C97152', category:'Deep', desc:'' },
    { name:'Midnight Navy', code:'5B3614', hex:'#1E3A5F', category:'Dark', desc:'' },
    { name:'Warm Ivory', code:'1Y0802', hex:'#FAF0DC', category:'Light', desc:'' },
  ];
}

// ── HOME INIT ─────────────────────────────────────────────
async function initHome() {
  await getShades();
  buildBentoStrip();
  buildPreviewGrid();
}

function buildBentoStrip() {
  const el = document.getElementById('bentoStrip');
  if (!el) return;
  // Pick visually spread colors across the whole catalog
  const all = allShades.filter(s => s.hex && s.hex !== '#FFFFFF' && s.hex !== '#000000');
  // Sample evenly across catalog for maximum color variety
  const step = Math.max(1, Math.floor(all.length / 56));
  const picks = all.filter((_, i) => i % step === 0).slice(0, 56);
  picks.forEach(s => {
    const d = document.createElement('div');
    d.className = 'b-swatch';
    d.style.background = s.hex;
    d.title = s.name;
    d.onclick = () => show('shades');
    d.style.cursor = 'pointer';
    el.appendChild(d);
  });
}

function buildPreviewGrid() {
  const el = document.getElementById('previewGrid');
  if (!el) return;
  // Sample evenly across catalog for variety — show 12 trending swatches as a preview
  const all = allShades.filter(s => s.hex && s.hex !== '#FFFFFF' && s.hex !== '#000000');
  const step = Math.max(1, Math.floor(all.length / 12));
  const picks = all.filter((_, i) => i % step === 0).slice(0, 12);
  picks.forEach(s => {
    const t = document.createElement('div');
    t.className = 'prev-tile';
    t.innerHTML = `
      <div class="prev-swatch" style="background:${s.hex}"></div>
      <div class="prev-info">
        <div class="prev-code">${s.code}</div>
        <div class="prev-name">${s.name}</div>
      </div>`;
    t.onclick = () => show('shades');
    el.appendChild(t);
  });
}

// ── SHADE EXPLORER ────────────────────────────────────────
async function initShades() {
  await getShades();
  shadesReady = true;
  buildCatPills();
  filtered = [...allShades];
  renderGrid();
  // Select default shade in Room Visualizer
  if (allShades.length) {
    selectShade(allShades[0]);
  }
}

function buildCatPills() {
  const el = document.getElementById('catPills');
  if (!el) return;
  const cats = ['All', ...new Set(allShades.map(s => s.category).filter(Boolean))];
  cats.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'c-pill' + (c === 'All' ? ' on' : '');
    btn.textContent = c;
    btn.onclick = () => setCat(c);
    el.appendChild(btn);
  });
}

function setCat(cat) {
  activeCat = cat;
  document.querySelectorAll('.c-pill').forEach(p => p.classList.toggle('on', p.textContent === cat));
  applyFilter();
}

function filterShades() { applyFilter(); }

function applyFilter() {
  const q = (document.getElementById('searchBox')?.value || '').toLowerCase();
  filtered = allShades.filter(s => {
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
    const matchC = activeCat === 'All' || s.category === activeCat;
    return matchQ && matchC;
  });
  shown = 60;
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('shadeGrid');
  const meta = document.getElementById('shadeMeta');
  const btn  = document.getElementById('loadMoreBtn');
  if (!grid) return;

  const slice = filtered.slice(0, shown);
  meta.textContent = `Showing ${slice.length} of ${filtered.length} shades`;
  btn.style.display = filtered.length > shown ? 'inline-flex' : 'none';

  grid.innerHTML = '';
  slice.forEach(s => {
    const t = document.createElement('div');
    t.className = 's-tile';
    t.innerHTML = `
      <div class="s-swatch" style="background:${s.hex}"></div>
      <div class="s-info">
        <div class="s-code">${s.code}</div>
        <div class="s-name">${s.name}</div>
        ${s.category ? `<span class="s-cat">${s.category}</span>` : ''}
      </div>`;
    t.onclick = () => {
      selectShade(s);
      document.getElementById('estimatorCard')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    grid.appendChild(t);
  });
}

function loadMore() { shown += 60; renderGrid(); }



// ── NAV SCROLL EFFECT ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.borderBottomColor = window.scrollY > 10
    ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.08)';
});

// Swiper & AOS instance variables
let heroSwiper;

function initAnimations() {
  // Initialize Swiper for the Hero banner
  if (document.querySelector('.hero-swiper')) {
    heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
    });
  }
}

// ── BOOT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  show('home');
  initHome();
  initAnimations();
});


// ============================================================
// VISUALIZER STATE & ROOM SVGS
// ============================================================
let activeRoom = 'living';
let currentShade = null;
const visualizerColors = {
  wall: '#FCFBF7',
  accent: '#F5F3EE',
  ceiling: '#FFFFFF',
  contrast: '#BDD5C0'
};

const ROOM_SVG_LIVING = `
<svg viewBox="0 0 800 480" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="living-wall-shadow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="20%" stop-color="#000000" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="corner-shadow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect id="svg-living-wall" x="0" y="0" width="800" height="360" fill="#FCFBF7" />
  <rect id="svg-living-accent" x="250" y="0" width="300" height="360" fill="#F5F3EE" />
  <rect x="0" y="0" width="800" height="360" fill="url(#living-wall-shadow)" style="mix-blend-mode:multiply;pointer-events:none;" />
  <rect x="0" y="0" width="100" height="360" fill="url(#corner-shadow)" style="mix-blend-mode:multiply;pointer-events:none;" />
  <polygon id="svg-living-ceiling" points="0,0 800,0 720,40 80,40" fill="#FFFFFF" />
  <polygon points="0,0 800,0 720,40 80,40" fill="url(#living-wall-shadow)" opacity="0.3" style="mix-blend-mode:multiply;pointer-events:none;" />
  <rect x="0" y="352" width="800" height="8" fill="#E2E2E7" />
  <rect x="0" y="360" width="800" height="120" fill="#d2b48c" />
  <polygon points="0,360 800,360 800,480 0,480" fill="rgba(0,0,0,0.06)" style="mix-blend-mode:multiply;pointer-events:none;" />
  <ellipse cx="400" cy="420" rx="220" ry="40" fill="#E2E2E7" opacity="0.8" />
  <rect x="300" y="280" width="200" height="60" rx="4" fill="#3A3A3C" />
  <rect x="310" y="160" width="180" height="100" rx="6" fill="#1D1D1F" />
  <rect x="310" y="160" width="180" height="100" rx="6" fill="rgba(255,255,255,0.05)" />
  <ellipse cx="200" cy="380" rx="140" ry="25" fill="rgba(0,0,0,0.2)" />
  <path d="M 80,300 C 80,280 100,270 120,270 L 280,270 C 300,270 320,280 320,300 L 320,350 L 80,350 Z" fill="#152b4c" />
  <rect x="90" y="310" width="105" height="40" rx="8" fill="#1e3e6b" />
  <rect x="205" y="310" width="105" height="40" rx="8" fill="#1e3e6b" />
  <rect x="100" y="280" width="95" height="35" rx="6" fill="#152b4c" />
  <rect x="205" y="280" width="95" height="35" rx="6" fill="#152b4c" />
  <rect x="90" y="350" width="10" height="15" fill="#3A3A3C" />
  <rect x="300" y="350" width="10" height="15" fill="#3A3A3C" />
  <path d="M 680,370 L 720,370 L 700,360 Z" fill="#1D1D1F" />
  <line x1="700" y1="360" x2="700" y2="180" stroke="#1D1D1F" stroke-width="4" />
  <path d="M 670,180 L 730,180 L 710,140 L 690,140 Z" fill="#ffc830" />
  <polygon points="700,180 550,380 850,380" fill="rgba(255,200,48,0.12)" style="mix-blend-mode:screen;pointer-events:none;" />
  <path d="M 40,380 L 60,380 L 55,420 L 45,420 Z" fill="#a58a7f" />
  <path d="M 50,380 Q 20,340 10,320 Q 40,350 50,380 Z" fill="#2d7e43" />
  <path d="M 50,380 Q 50,320 60,300 Q 65,340 50,380 Z" fill="#34C759" />
  <path d="M 50,380 Q 80,345 90,330 Q 70,360 50,380 Z" fill="#2d7e43" />
</svg>`;

const ROOM_SVG_BEDROOM = `<svg viewBox="0 0 800 480" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bed-wall-shadow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect id="svg-bedroom-wall" x="0" y="0" width="800" height="360" fill="#FCFBF7" />
  <polygon id="svg-bedroom-side" points="0,0 100,40 100,320 0,360" fill="#F5F3EE" />
  <polygon id="svg-bedroom-ceiling" points="0,0 800,0 800,40 100,40" fill="#FFFFFF" />
  <polygon points="0,0 800,0 800,40 100,40" fill="url(#bed-wall-shadow)" opacity="0.3" style="mix-blend-mode:multiply;pointer-events:none;" />
  <rect x="100" y="40" width="700" height="280" fill="url(#bed-wall-shadow)" opacity="0.6" style="mix-blend-mode:multiply;pointer-events:none;" />
  <polygon points="0,360 100,320 800,320 800,480 0,480" fill="#a17d58" />
  <rect id="svg-bedroom-headboard" x="200" y="140" width="400" height="180" rx="8" fill="#152b4c" />
  <rect x="220" y="300" width="360" height="100" fill="rgba(0,0,0,0.25)" />
  <rect x="230" y="280" width="340" height="60" rx="6" fill="#F5F5F7" />
  <path d="M 230,300 L 570,300 L 570,380 C 570,390 560,400 550,400 L 250,400 C 240,400 230,390 230,380 Z" fill="#6750a0" />
  <rect x="260" y="240" width="120" height="50" rx="8" fill="#FFFFFF" stroke="#E2E2E7" stroke-width="2" />
  <rect x="420" y="240" width="120" height="50" rx="8" fill="#FFFFFF" stroke="#E2E2E7" stroke-width="2" />
  <rect x="280" y="250" width="90" height="40" rx="6" fill="#e31959" opacity="0.9" />
  <rect x="430" y="250" width="90" height="40" rx="6" fill="#e31959" opacity="0.9" />
  <rect x="110" y="240" width="70" height="80" rx="4" fill="#3A3A3C" />
  <line x1="145" y1="240" x2="145" y2="210" stroke="#1D1D1F" stroke-width="3" />
  <path d="M 130,210 L 160,210 L 155,190 L 135,190 Z" fill="#ffc830" />
  <polygon points="145,190 100,280 190,280" fill="rgba(255,200,48,0.15)" style="mix-blend-mode:screen;pointer-events:none;" />
  <rect x="620" y="240" width="70" height="80" rx="4" fill="#3A3A3C" />
  <line x1="655" y1="240" x2="655" y2="210" stroke="#1D1D1F" stroke-width="3" />
  <path d="M 640,210 L 670,210 L 665,190 L 645,190 Z" fill="#ffc830" />
  <polygon points="655,190 610,280 700,280" fill="rgba(255,200,48,0.15)" style="mix-blend-mode:screen;pointer-events:none;" />
</svg>`;
const ROOM_SVG_EXTERIOR = `<svg viewBox="0 0 800 480" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#BAE6FD"/>
      <stop offset="100%" stop-color="#E0F2FE"/>
    </linearGradient>
    <linearGradient id="roof-shadow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="800" height="200" fill="url(#sky-grad)" />
  <path d="M 600,100 C 590,100 580,110 580,120 C 580,121 581,122 581,123 C 570,125 560,135 560,145 C 560,155 570,165 580,165 L 640,165 C 650,165 660,155 660,145 C 660,141 658,138 656,135 C 659,132 660,129 660,125 C 660,115 650,105 640,105 C 638,105 635,106 633,107 C 625,103 615,100 600,100 Z" fill="#FFFFFF" opacity="0.6" />
  <rect x="0" y="380" width="800" height="100" fill="#4ade80" />
  <polygon points="350,380 450,380 500,480 300,480" fill="#E2E2E7" />
  <rect id="svg-exterior-wall" x="200" y="180" width="400" height="200" fill="#FCFBF7" />
  <polygon id="svg-exterior-trim" points="200,180 400,80 600,180" fill="#F5F3EE" />
  <polygon id="svg-exterior-roof" points="180,185 400,70 620,185 605,195 400,90 195,195" fill="#152b4c" />
  <polygon points="200,180 400,80 600,180 600,195 400,95 200,195" fill="url(#roof-shadow)" opacity="0.5" style="mix-blend-mode:multiply;pointer-events:none;" />
  <rect id="svg-exterior-door" x="370" y="270" width="60" height="110" fill="#ffc830" rx="2" />
  <rect x="367" y="267" width="66" height="113" fill="none" stroke="#FFFFFF" stroke-width="3" />
  <circle cx="420" cy="325" r="4" fill="#3A3A3C" />
  <rect x="250" y="240" width="70" height="80" fill="#FFFFFF" rx="4" />
  <rect x="255" y="245" width="60" height="70" fill="#E0F2FE" />
  <line x1="285" y1="245" x2="285" y2="315" stroke="#FFFFFF" stroke-width="2" />
  <line x1="255" y1="280" x2="315" y2="280" stroke="#FFFFFF" stroke-width="2" />
  <rect x="248" y="238" width="74" height="84" fill="none" stroke="#152b4c" stroke-width="3" />
  <rect x="480" y="240" width="70" height="80" fill="#FFFFFF" rx="4" />
  <rect x="485" y="245" width="60" height="70" fill="#E0F2FE" />
  <line x1="515" y1="245" x2="515" y2="315" stroke="#FFFFFF" stroke-width="2" />
  <line x1="485" y1="280" x2="545" y2="280" stroke="#FFFFFF" stroke-width="2" />
  <rect x="478" y="238" width="74" height="84" fill="none" stroke="#152b4c" stroke-width="3" />
</svg>`;

// Toggle between visualizer rooms
function setRoom(room) {
  activeRoom = room;
  document.querySelectorAll('.room-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('room-btn-' + room).classList.add('active');
  
  const wrap = document.getElementById('roomSvgWrap');
  if (wrap) {
    if (room === 'living') wrap.innerHTML = ROOM_SVG_LIVING;
    else if (room === 'bedroom') wrap.innerHTML = ROOM_SVG_BEDROOM;
    else if (room === 'exterior') wrap.innerHTML = ROOM_SVG_EXTERIOR;
    updateSvgColors();
  }
}

// Color utility: update SVG paths with currently loaded colors
function updateSvgColors() {
  const mainWall = document.getElementById('svg-living-wall') || document.getElementById('svg-bedroom-wall') || document.getElementById('svg-exterior-wall');
  if (mainWall) mainWall.style.fill = visualizerColors.wall;
  
  const accentWall = document.getElementById('svg-living-accent') || document.getElementById('svg-bedroom-side') || document.getElementById('svg-exterior-trim');
  if (accentWall) accentWall.style.fill = visualizerColors.accent;
  
  const ceiling = document.getElementById('svg-living-ceiling') || document.getElementById('svg-bedroom-ceiling') || document.getElementById('svg-exterior-roof');
  if (ceiling) ceiling.style.fill = visualizerColors.ceiling;
  
  const contrast = document.getElementById('svg-exterior-door');
  if (contrast) contrast.style.fill = visualizerColors.contrast;
}

// Click suggested color to apply it to a secondary part of the room
function applyColorToPart(part) {
  if (part === 'accent') {
    const valName = document.getElementById('paletteAccentName').textContent;
    const match = allShades.find(s => s.name === valName);
    if (match) {
      visualizerColors.accent = match.hex;
      updateSvgColors();
    }
  } else if (part === 'contrast') {
    const valName = document.getElementById('paletteContrastName').textContent;
    const match = allShades.find(s => s.name === valName);
    if (match) {
      visualizerColors.contrast = match.hex;
      updateSvgColors();
    }
  } else if (part === 'ceiling') {
    const valName = document.getElementById('paletteCeilingName').textContent;
    const match = allShades.find(s => s.name === valName);
    if (match) {
      visualizerColors.ceiling = match.hex;
      updateSvgColors();
    }
  }
}

// ── COLOR CONVERSIONS ──────────────────────────────────────
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
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

function hslToHex(h, s, l) {
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

function findClosestShade(hexVal) {
  if (!allShades || !allShades.length) return fallback()[0];
  let targetR = parseInt(hexVal.slice(1, 3), 16);
  let targetG = parseInt(hexVal.slice(3, 5), 16);
  let targetB = parseInt(hexVal.slice(5, 7), 16);
  let closest = allShades[0];
  let minDiff = Infinity;
  for (let s of allShades) {
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

// Update Room Visualizer and Smart Palette Finder
function selectShade(shade) {
  currentShade = shade;
  visualizerColors.wall = shade.hex;
  
  // Update details DOM
  const pill = document.getElementById('activeShadePill');
  const nameEl = document.getElementById('activeShadeName');
  const codeEl = document.getElementById('activeShadeCode');
  const descEl = document.getElementById('activeShadeDesc');
  if (pill) pill.style.background = shade.hex;
  if (nameEl) nameEl.textContent = shade.name;
  if (codeEl) codeEl.textContent = shade.code + ' • ' + (shade.category || 'Standard');
  if (descEl) descEl.textContent = shade.desc || 'CURATED BERGER PAINT SHADE';

  // Calculate palettes
  const hsl = hexToHsl(shade.hex);
  
  // 1. Monochromatic Accent Wall (Slightly darker/saturated)
  const accentHex = hslToHex(hsl.h, Math.max(20, hsl.s), Math.max(15, hsl.l - 16));
  const accentShade = findClosestShade(accentHex);
  visualizerColors.accent = accentShade.hex;
  document.getElementById('paletteAccent').style.background = accentShade.hex;
  document.getElementById('paletteAccentName').textContent = accentShade.name;
  document.getElementById('paletteAccentCode').textContent = accentShade.code;

  // 2. Complementary Contrast Wall (180 degree shift)
  const contrastHex = hslToHex((hsl.h + 180) % 360, Math.max(30, hsl.s), Math.max(35, hsl.l - 5));
  const contrastShade = findClosestShade(contrastHex);
  visualizerColors.contrast = contrastShade.hex;
  document.getElementById('paletteContrast').style.background = contrastShade.hex;
  document.getElementById('paletteContrastName').textContent = contrastShade.name;
  document.getElementById('paletteContrastCode').textContent = contrastShade.code;

  // 3. Perfect Soft Ceiling (Very light warm tint of same hue)
  const ceilingHex = hslToHex(hsl.h, Math.max(4, Math.min(10, hsl.s)), 96);
  const ceilingShade = findClosestShade(ceilingHex);
  visualizerColors.ceiling = ceilingShade.hex;
  document.getElementById('paletteCeiling').style.background = ceilingShade.hex;
  document.getElementById('paletteCeilingName').textContent = ceilingShade.name;
  document.getElementById('paletteCeilingCode').textContent = ceilingShade.code;

  updateSvgColors();
}

function sharePaletteOnWhatsApp() {
  if (!currentShade) return;
  const aName = document.getElementById('paletteAccentName').textContent;
  const aCode = document.getElementById('paletteAccentCode').textContent;
  const cName = document.getElementById('paletteContrastName').textContent;
  const cCode = document.getElementById('paletteContrastCode').textContent;
  const ceName = document.getElementById('paletteCeilingName').textContent;
  const ceCode = document.getElementById('paletteCeilingCode').textContent;
  
  const msg = `Hi Nimishamba Paints! 👋

I selected a paint colour scheme on your website and want to check availability:
• Main Wall: ${currentShade.name} (${currentShade.code}) - ${currentShade.hex}
• Accent Wall: ${aName} (${aCode})
• Contrast Wall: ${cName} (${cCode})
• Ceiling: ${ceName} (${ceCode})

Please guide me with pricing and stock availability. Thanks!`;
  
  const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}


// ============================================================
// ESTIMATOR (CALCULATOR) LOGIC
// ============================================================
let estimatorStep = 1;
let projType = 'interior';
let areaSqFt = 700;
let paintCondition = 'repaint';
let paintQuality = 'premium';

function goToStep(step) {
  if (step < 1 || step > 4) return;
  if (step > estimatorStep && step > estimatorStep + 1) return;
  
  document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
  document.getElementById('step-' + step).classList.add('active');
  
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('prog-' + i);
    if (el) el.classList.toggle('active', i === step);
  }
  
  const progressLine = document.getElementById('progressLine');
  if (progressLine) {
    const pct = ((step - 1) / 3) * 100;
    progressLine.style.width = pct + '%';
  }
  
  estimatorStep = step;
  
  // Refresh AOS for step animations
  setTimeout(() => {
    if (typeof AOS !== 'undefined') AOS.refresh();
  }, 50);
}

function nextStep() { goToStep(estimatorStep + 1); }
function prevStep() { goToStep(estimatorStep - 1); }

function selectProjectType(type) {
  projType = type;
  document.querySelectorAll('.calc-opt-card').forEach(c => c.classList.remove('active'));
  document.getElementById('opt-' + type).classList.add('active');
  
  const p1 = document.getElementById('preset-1bhk');
  const p2 = document.getElementById('preset-2bhk');
  const p3 = document.getElementById('preset-3bhk');
  
  if (type === 'woodmetal') {
    p1.textContent = 'Small (Doors/Windows)';
    p2.textContent = 'Medium (Cabinets)';
    p3.textContent = 'Large (Full House)';
    p1.onclick = () => setAreaPreset(150, 'Small (Doors/Windows)', p1);
    p2.onclick = () => setAreaPreset(400, 'Medium (Cabinets)', p2);
    p3.onclick = () => setAreaPreset(800, 'Large (Full House)', p3);
    setAreaPreset(400, 'Medium (Cabinets)', p2);
  } else {
    p1.textContent = '1 BHK';
    p2.textContent = '2 BHK';
    p3.textContent = '3 BHK';
    p1.onclick = () => setAreaPreset(700, '1 BHK (~700 sq ft)', p1);
    p2.onclick = () => setAreaPreset(1200, '2 BHK (~1200 sq ft)', p2);
    p3.onclick = () => setAreaPreset(1800, '3 BHK (~1800 sq ft)', p3);
    setAreaPreset(1200, '2 BHK (~1200 sq ft)', p2);
  }
}

function setAreaPreset(sqft, name, btn) {
  areaSqFt = sqft;
  document.getElementById('customAreaWrap').style.display = 'none';
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function toggleCustomArea(btn) {
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('customAreaWrap').style.display = 'block';
  areaSqFt = parseInt(document.getElementById('customAreaVal').value) || 1200;
}

function updateCustomAreaVal(val) {
  areaSqFt = parseInt(val) || 0;
}

function updateProjectCondition(cond) {
  paintCondition = cond;
}

function selectQuality(quality) {
  paintQuality = quality;
  document.querySelectorAll('.quality-card').forEach(c => c.classList.remove('active'));
  document.getElementById('q-' + quality).classList.add('active');
}

function calculateEstimates() {
  let ltrPaint = 0;
  let ltrPrimer = 0;
  let kgPutty = 0;
  
  if (projType === 'interior' || projType === 'exterior') {
    ltrPaint = Math.ceil(areaSqFt / 65);
    ltrPrimer = Math.ceil(areaSqFt / 130);
    if (paintCondition === 'fresh') {
      kgPutty = Math.ceil(areaSqFt / 10);
      ltrPrimer = Math.ceil(areaSqFt / 80);
    } else {
      kgPutty = 0;
    }
  } else if (projType === 'woodmetal') {
    ltrPaint = Math.ceil(areaSqFt / 75);
    ltrPrimer = Math.ceil(areaSqFt / 110);
    kgPutty = 0;
  }
  
  let minRate = 12, maxRate = 15;
  if (paintQuality === 'premium') { minRate = 18; maxRate = 24; }
  else if (paintQuality === 'luxury') { minRate = 28; maxRate = 36; }
  
  if (projType === 'exterior') {
    minRate += 2; maxRate += 3;
  } else if (projType === 'woodmetal') {
    minRate += 5; maxRate += 8;
  }
  
  if (paintCondition === 'repaint') {
    minRate = Math.round(minRate * 0.75);
    maxRate = Math.round(maxRate * 0.75);
  }
  
  const estMinCost = areaSqFt * minRate;
  const estMaxCost = areaSqFt * maxRate;
  
  document.getElementById('resultCostRange').textContent = `₹${estMinCost.toLocaleString('en-IN')} - ₹${estMaxCost.toLocaleString('en-IN')}`;
  document.getElementById('qtyPaint').textContent = ltrPaint;
  document.getElementById('qtyPrimer').textContent = ltrPrimer;
  document.getElementById('qtyPutty').textContent = kgPutty;
  
  document.getElementById('puttyRow').style.display = kgPutty > 0 ? 'flex' : 'none';
  document.getElementById('primerRow').style.display = ltrPrimer > 0 ? 'flex' : 'none';
  
  const matPaintLabel = document.getElementById('matPaintLabel');
  if (projType === 'woodmetal') {
    matPaintLabel.textContent = 'Premium Enamel / Wood Polish';
    document.getElementById('matPrimerLabel').textContent = 'Wood & Metal Primer';
  } else {
    matPaintLabel.textContent = 'Wall Emulsion Paint (2 coats)';
    document.getElementById('matPrimerLabel').textContent = 'Undercoat Wall Primer';
  }
  
  document.getElementById('summaryProjType').textContent = projType === 'interior' ? 'Interior Walls' : projType === 'exterior' ? 'Exterior Walls' : 'Wood & Metal';
  document.getElementById('summaryArea').textContent = `${areaSqFt} sq ft`;
  document.getElementById('summaryGrade').textContent = paintQuality === 'economy' ? 'Economy Quality' : paintQuality === 'premium' ? 'Premium Quality' : 'Luxury Quality';
  
  nextStep();
}

function shareEstimatesOnWhatsApp() {
  const pType = document.getElementById('summaryProjType').textContent;
  const area = document.getElementById('summaryArea').textContent;
  const grade = document.getElementById('summaryGrade').textContent;
  const cost = document.getElementById('resultCostRange').textContent;
  const pLtrs = document.getElementById('qtyPaint').textContent;
  const prLtrs = document.getElementById('qtyPrimer').textContent;
  const puKg = document.getElementById('qtyPutty').textContent;
  
  const msg = `Hi Nimishamba Paints! 👋

I calculated a paint estimate on your website calculator:
• Project: ${pType} (${area})
• Condition: ${paintCondition === 'fresh' ? 'Fresh Painting (New)' : 'Repainting'}
• Quality: ${grade}
• Estimated Cost: ${cost}

Estimated Materials Required:
- Wall Emulsion: ${pLtrs} Liters
${prLtrs > 0 ? `- Primer: ${prLtrs} Liters\n` : ''}​${puKg > 0 ? `- Putty: ${puKg} KG\n` : ''}
Please contact me to arrange a detailed site inspection and final quote. Thank you!`;

  const url = 'https://wa.me/919448084351?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}
