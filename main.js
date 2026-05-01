/* ══════════════════════════════════════════
   PROJETCH INOVAÇÕES — main.js
   ══════════════════════════════════════════ */

/* ─── ACTIVE NAV LINK ─── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    a.classList.remove('active-link');
    const href = a.getAttribute('href');
    if (href === page) a.classList.add('active-link');
  });
}

/* ─── HAMBURGER ─── */
function toggleMobile() {
  const menu = document.getElementById('mobile-menu');
  const ham  = document.getElementById('hamburger');
  menu.classList.toggle('open');
  ham.classList.toggle('open');
}

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

/* ─── TOAST ─── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ─── FORMULÁRIO ─── */
function submitForm() {
  const nome  = document.getElementById('f-nome')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();
  const tipo  = document.getElementById('f-tipo')?.value;
  const desc  = document.getElementById('f-desc')?.value.trim();
  const lgpd  = document.getElementById('f-lgpd')?.checked;

  if (!nome)                        { showToast('⚠️ Informe seu nome.');              return; }
  if (!email || !email.includes('@')){ showToast('⚠️ Informe um e-mail válido.');     return; }
  if (!tipo)                        { showToast('⚠️ Selecione o tipo de projeto.');   return; }
  if (!desc)                        { showToast('⚠️ Descreva seu projeto.');          return; }
  if (!lgpd)                        { showToast('⚠️ Aceite os termos de uso dos dados.'); return; }

  const btn = document.getElementById('btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('form-area').style.display    = 'none';
    document.getElementById('form-success').style.display = 'block';
    showToast('✅ Solicitação enviada com sucesso!');
  }, 1400);
}

function resetForm() {
  document.getElementById('form-area').style.display    = 'block';
  document.getElementById('form-success').style.display = 'none';

  const btn = document.getElementById('btn-submit');
  btn.textContent = '⟶ ENVIAR SOLICITAÇÃO';
  btn.disabled    = false;

  ['f-nome','f-empresa','f-email','f-tel','f-desc','f-refs'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['f-tipo','f-budget','f-prazo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });
  const lgpd = document.getElementById('f-lgpd');
  if (lgpd) lgpd.checked = false;
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initReveal();

  /* fechar menu mobile ao clicar fora */
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobile-menu');
    const ham  = document.getElementById('hamburger');
    if (!e.target.closest('nav') && !e.target.closest('.mobile-menu')) {
      menu?.classList.remove('open');
      ham?.classList.remove('open');
    }
  });

  /* re-revelar ao fazer scroll (para páginas longas) */
  window.addEventListener('scroll', initReveal, { passive: true });
});
