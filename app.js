/* ============================================================
   app.js — Sri Nimishamba Paints Website Logic
   ============================================================ */

// ── PAGE NAVIGATION ──────────────────────────────────────
function show(page) {
  document.querySelectorAll('.pg').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('pg-' + page);
  if (el) { el.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  document.getElementById('navMenu').classList.remove('open');
  if (page === 'shades' && !shadesReady) initShades();
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
    d.onclick = () => { show('shades'); setTimeout(() => openModal(s), 300); };
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
    t.onclick = () => { show('shades'); setTimeout(() => openModal(s), 300); };
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
    t.onclick = () => openModal(s);
    grid.appendChild(t);
  });
}

function loadMore() { shown += 60; renderGrid(); }

// ── SHADE MODAL ───────────────────────────────────────────
function openModal(s) {
  document.getElementById('mSwatch').style.background = s.hex;
  document.getElementById('mCode').textContent  = s.code;
  document.getElementById('mName').textContent  = s.name;
  document.getElementById('mCat').textContent   = s.category || '';
  document.getElementById('mDesc').textContent  = s.desc || 'Visit Sri Nimishamba Paints for physical shade cards and expert colour advice from our trained staff.';

  const pairs = document.getElementById('mPairs');
  pairs.innerHTML = '';
  if (s.combos && s.combos.length) {
    s.combos.forEach(c => {
      const d = document.createElement('div');
      d.className = 'm-pair-dot';
      d.style.background = c.hex || '#ddd';
      d.title = c.name;
      pairs.appendChild(d);
    });
  } else {
    pairs.innerHTML = '<span style="font-size:0.8rem;color:#86868B">Visit us for expert colour pairing advice</span>';
  }

  document.getElementById('mWa').href =
    `https://wa.me/919448084351?text=Hi! I'm interested in Berger shade: ${encodeURIComponent(s.name)} (${s.code}). Please help.`;

  document.getElementById('shadeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('shadeModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function bgClose(e) {
  if (e.target === document.getElementById('shadeModal')) closeModal();
}

// ── NAV SCROLL EFFECT ─────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.borderBottomColor = window.scrollY > 10
    ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.08)';
});

// ── BOOT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  show('home');
  initHome();
});
