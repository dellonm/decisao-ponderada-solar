// Rendering logic for produtos.html (grid) and produto.html (detail)
// Relies on PRODUCTS from products-data.js

const CAT_GLYPH = {
  kits: "☀",
  inversores: "⚡",
  baterias: "🔋",
  estruturas: "🔧",
  acessorios: "🔌",
  carregadores: "🚗"
};

const CAT_LABELS = {
  todos: "Todos",
  kits: "Kits Solares",
  inversores: "Inversores",
  baterias: "Baterias & Acessórios",
  estruturas: "Estruturas",
  acessorios: "Acessórios",
  carregadores: "Carregadores EV"
};

function formatPrice(n) {
  return n.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
}

function productCardHTML(p) {
  return `
    <a class="product-card tilt reveal-up" href="produto.html?id=${p.id}">
      <div class="product-visual">
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
        <span class="glyph">${CAT_GLYPH[p.cat] || '☀'}</span>
      </div>
      <div class="product-body">
        <span class="product-cat">${p.catLabel}</span>
        <h3>${p.name}</h3>
        <ul class="product-specs">
          ${p.specs.slice(0, 2).map(s => `<li>${s}</li>`).join('')}
        </ul>
        <div class="product-footer">
          <div class="product-price"><small>Desde</small>${formatPrice(p.price)}</div>
          <span class="product-link">Ver detalhes →</span>
        </div>
      </div>
    </a>
  `;
}

function initShopGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const tabsWrap = document.getElementById('catTabs');
  const cats = ['todos', ...Array.from(new Set(PRODUCTS.map(p => p.cat)))];

  function render(filter) {
    const list = filter === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
    grid.innerHTML = list.length
      ? list.map(productCardHTML).join('')
      : `<div class="no-results">Sem produtos nesta categoria de momento.</div>`;

    // re-init reveal + tilt on new nodes
    grid.querySelectorAll('.reveal-up').forEach(el => {
      el.classList.add('in');
    });
    if (window.initTilt) window.initTilt('.product-card.tilt', 6);
  }

  if (tabsWrap) {
    tabsWrap.innerHTML = cats.map(c =>
      `<button class="cat-tab ${c === 'todos' ? 'active' : ''}" data-cat="${c}">${CAT_LABELS[c] || c}</button>`
    ).join('');

    tabsWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-tab');
      if (!btn) return;
      tabsWrap.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.cat);
    });
  }

  // deep-link ?cat=
  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat') && cats.includes(params.get('cat')) ? params.get('cat') : 'todos';
  if (tabsWrap) {
    tabsWrap.querySelectorAll('.cat-tab').forEach(b => b.classList.toggle('active', b.dataset.cat === initialCat));
  }
  render(initialCat);
}

function initProductDetail() {
  const wrap = document.getElementById('productDetail');
  if (!wrap) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  document.title = `${product.name} | Luminova Energia`;

  wrap.innerHTML = `
    <div class="pd-visual reveal-left in">
      ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
      <span class="glyph">${CAT_GLYPH[product.cat] || '☀'}</span>
    </div>
    <div class="reveal-right in">
      <div class="pd-brand">${product.brand} · ${product.catLabel}</div>
      <h1 class="pd-title">${product.name}</h1>
      <div class="pd-price">${formatPrice(product.price)}</div>
      <p class="pd-desc">${product.desc}</p>
      <ul class="pd-specs">
        ${product.specs.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <div class="pd-actions">
        <a class="btn btn-primary btn-lg" href="contacto.html?produto=${encodeURIComponent(product.name)}">Pedir Orçamento</a>
        <a class="btn btn-ghost btn-lg" href="produtos.html?cat=${product.cat}">Ver mais ${product.catLabel}</a>
      </div>
    </div>
  `;

  // related products
  const relatedWrap = document.getElementById('relatedGrid');
  if (relatedWrap) {
    const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 3);
    relatedWrap.innerHTML = related.length
      ? related.map(productCardHTML).join('')
      : `<div class="no-results">Sem produtos relacionados.</div>`;
    relatedWrap.querySelectorAll('.reveal-up').forEach(el => el.classList.add('in'));
  }
}

function initFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const ids = ['kit-s2-20kwh', 'inv-deye-5kw', 'kit-s5-30kwh'];
  const list = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  grid.innerHTML = list.map(productCardHTML).join('');
  grid.querySelectorAll('.reveal-up').forEach(el => el.classList.add('in'));
  if (window.initTilt) window.initTilt('.product-card.tilt', 6);
}

function prefillContactProduct() {
  const params = new URLSearchParams(location.search);
  const produto = params.get('produto');
  if (!produto) return;
  const select = document.getElementById('service');
  const msg = document.getElementById('message');
  if (select) {
    const opt = document.createElement('option');
    opt.textContent = produto;
    opt.selected = true;
    select.prepend(opt);
  }
  if (msg && !msg.value) {
    msg.value = `Gostaria de pedir um orçamento para: ${produto}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initShopGrid();
  initProductDetail();
  initFeatured();
  prefillContactProduct();
});
