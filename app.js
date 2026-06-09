/* ============================================================
   app.js — Sri Nimishamba Paints Website Logic
   ============================================================ */

// ── PAGE NAVIGATION ──────────────────────────────────────
function show(page) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('pg-' + page);
  if (el) { el.classList.add('active'); window.scrollTo({ top: 0, behavior: 'instant' }); }
  
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
  if (page === 'shades' && !shadesReady) initShades();

  // Refresh AOS scroll animations for newly revealed page content
  setTimeout(() => {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }, 100);
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
  // Sample evenly across catalog for variety — show 60 tiles
  const all = allShades.filter(s => s.hex && s.hex !== '#FFFFFF' && s.hex !== '#000000');
  const step = Math.max(1, Math.floor(all.length / 60));
  const picks = all.filter((_, i) => i % step === 0).slice(0, 60);
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
