// Nav scroll state, mobile menu and footer year are handled in partials.js
// once the shared header/footer are injected.

// ===== Cursor glow =====
const glow = document.getElementById('cursorGlow');
if (glow) {
  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  }, { passive: true });
}

// ===== Scroll reveal (IntersectionObserver) =====
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// ===== Animated counters =====
const counters = document.querySelectorAll('.stat-number');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      const val = Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));

// ===== 3D tilt on cards =====
function initTilt(selector, maxTilt = 8) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}
initTilt('.tilt', 7);
initTilt('.tilt-3d', 5);

// ===== Contact form (demo submit) =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Obrigado! A sua mensagem foi enviada — entraremos em contacto brevemente.';
    form.reset();
  });
}

// ===== Three.js hero particle field =====
(function initHero3D() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const hero = document.querySelector('.hero');
  let width = hero.clientWidth, height = hero.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 26;

  // Particle field
  const count = window.innerWidth < 700 ? 500 : 1400;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0xffd23f,
    size: 0.11,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // A subtle icosahedron "solar cell" wireframe centerpiece
  const icoGeo = new THREE.IcosahedronGeometry(7, 1);
  const icoMat = new THREE.MeshBasicMaterial({ color: 0xff9f4d, wireframe: true, transparent: true, opacity: 0.18 });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(0, 0, -6);
  scene.add(ico);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  function resize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();
    points.rotation.y = t * 0.02 + mouseX * 0.3;
    points.rotation.x = t * 0.01 + mouseY * 0.2;
    ico.rotation.y = t * 0.08;
    ico.rotation.x = t * 0.05;
    camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();
