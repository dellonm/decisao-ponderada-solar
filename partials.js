// Shared header + footer injected into every page.
// Usage: <div id="site-header" data-active="produtos"></div> ... <div id="site-footer"></div>

const NAV_ITEMS = [
  { href: "index.html", label: "Início", key: "index" },
  { href: "produtos.html", label: "Produtos", key: "produtos" },
  { href: "servicos.html", label: "Serviços", key: "servicos" },
  { href: "sobre.html", label: "Sobre", key: "sobre" },
  { href: "contacto.html", label: "Contactos", key: "contacto" }
];

function renderHeader(active) {
  const el = document.getElementById('site-header');
  if (!el) return;

  const links = NAV_ITEMS.map(i =>
    `<a href="${i.href}" class="${i.key === active ? 'active-link' : ''}">${i.label}</a>`
  ).join('');

  el.innerHTML = `
    <header class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="logo">
          <img src="assets/logo-mark.png" alt="Luminova Energia" class="logo-mark-img">
          <span class="logo-text">Luminova<em>Energia</em></span>
        </a>
        <nav class="nav-links">${links}</nav>
        <a href="contacto.html" class="btn btn-primary nav-cta">Pedir Orçamento</a>
        <button class="burger" id="burger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        ${links}
        <a href="contacto.html" class="btn btn-primary">Pedir Orçamento</a>
      </div>
    </header>
  `;
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  el.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <a href="index.html" class="logo">
            <img src="assets/logo-mark.png" alt="Luminova Energia" class="logo-mark-img">
            <span class="logo-text">Luminova<em>Energia</em></span>
          </a>
          <p>Painéis solares, baterias, inversores, eletricidade, ar-condicionado e canalização — em todo Portugal.</p>
        </div>
        <div>
          <h4>Navegação</h4>
          <a href="produtos.html">Produtos</a>
          <a href="servicos.html">Serviços</a>
          <a href="sobre.html">Sobre</a>
          <a href="contacto.html">Contactos</a>
        </div>
        <div>
          <h4>Produtos</h4>
          <a href="produtos.html?cat=kits">Kits Solares</a>
          <a href="produtos.html?cat=inversores">Inversores</a>
          <a href="produtos.html?cat=baterias">Baterias</a>
          <a href="produtos.html?cat=estruturas">Estruturas</a>
        </div>
        <div>
          <h4>Certificações</h4>
          <span class="reg">Casa Eficiente 2020</span>
          <span class="reg">Registo nº 143793</span>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© <span id="year"></span> Luminova Energia. Todos os direitos reservados.</span>
      </div>
    </footer>
  `;
  document.getElementById('year').textContent = new Date().getFullYear();
}

function renderFloatingCTA() {
  if (document.getElementById('floatingQuizCta')) return;
  const a = document.createElement('a');
  a.id = 'floatingQuizCta';
  a.href = 'https://dellonm.github.io/luminova-energia-quiz/';
  a.target = '_blank';
  a.rel = 'noopener';
  a.className = 'floating-cta';
  a.setAttribute('aria-label', 'Fazer simulação solar gratuita');
  a.innerHTML = '<span class="floating-cta-icon">💡</span><span class="floating-cta-text">Simulação Grátis</span>';
  document.body.appendChild(a);
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const active = header ? header.dataset.active : '';
  renderHeader(active);
  renderFooter();
  renderFloatingCTA();

  // nav behaviors that depend on injected DOM
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      burger.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    }));
  }
});
