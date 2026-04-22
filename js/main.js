'use strict';

(function () {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('haxem-theme', next);
  });
})();


(function () {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mob-menu');
  if (!burger || !menu) return;

  function closeMenu() {
    burger.classList.remove('open');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = burger.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();


const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href.length <= 1) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


const scrollBtn = document.querySelector('.scroll-ind');
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    document.querySelector('.srv-sec')?.scrollIntoView({ behavior: 'smooth' });
  });
}


let rafId = null;

document.addEventListener('mousemove', e => {
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 36;
      const y = (e.clientY / window.innerHeight - 0.5) * 36;
      const b1 = document.querySelector('.b1');
      const b2 = document.querySelector('.b2');
      if (b1) b1.style.transform = `translate(${x}px, ${y}px)`;
      if (b2) b2.style.transform = `translate(${-x * 0.55}px, ${-y * 0.55}px)`;
      rafId = null;
    });
  }
});


let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}


document.querySelectorAll('[data-soon]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const label = el.getAttribute('data-soon') || 'This feature';
    showToast(`${label} is launching soon — stay tuned!`);
  });
});
