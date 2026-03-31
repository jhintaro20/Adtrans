/* ═══════════════════════════════════════════════
   NexFreight Global — Main JavaScript
   ═══════════════════════════════════════════════ */

/* ── Navigation: highlight active page ── */
(function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active');
  });
})();

/* ── Hamburger toggle ── */
function toggleMenu() {
  const menu = document.getElementById('navLinks');
  if (menu) menu.classList.toggle('open');
}

/* ── Navbar scroll effect ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  nav.style.background = window.scrollY > 30
    ? 'rgba(10,22,40,1)'
    : 'rgba(10,22,40,0.97)';
});

/* ── Ticker builder ── */
function buildTicker(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const items = [
    'Air Freight', 'Sea Freight', 'Land Transport',
    'Customs Clearance', '99% On-Time', 'Free Quotes'
  ];
  const doubled = [...items, ...items];
  el.innerHTML = doubled
    .map(t => `<span class="ticker-item"><span class="ticker-dot"></span>${t}</span>`)
    .join('');
}

/* ── Toast notifications ── */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4500);
}

/* ── Form helpers ── */
function submitQuote(e) {
  if (e) e.preventDefault();
  showToast('✓ Quote request submitted! We\'ll respond within 2 hours.');
}

function submitContact(e) {
  if (e) e.preventDefault();
  showToast('✓ Message sent! Our team will be in touch shortly.');
}

/* ── Fade-in on scroll ── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  targets.forEach(t => observer.observe(t));
}

document.addEventListener('DOMContentLoaded', () => {
  buildTicker('tickerTrack');
  initScrollReveal();
});
