'use strict';

function switchTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  const panel = document.getElementById(id);
  if (!panel) return;

  panel.classList.add('active');
  btn.classList.add('active');

  panel.style.animation = 'none';
  requestAnimationFrame(() => { panel.style.animation = ''; });

  history.replaceState(null, '', '#' + id);
}

function switchTabByName(id) {
  const btn = [...document.querySelectorAll('.tab')].find(
    t => t.getAttribute('onclick')?.includes(`'${id}'`)
  );
  if (btn) switchTab(id, btn);
}


const hash = window.location.hash.replace('#', '');
if (hash === 'privacy' || hash === 'tos') {
  switchTabByName(hash);
}
