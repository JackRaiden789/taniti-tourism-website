const pages = [...document.querySelectorAll('.page')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const menu = document.getElementById('primary-nav');
const menuToggle = document.getElementById('menu-toggle');
function showPage(pageId) {
  if (!document.getElementById(pageId)) return;
  pages.forEach(page => page.classList.toggle('active', page.id === pageId));
  navLinks.forEach(link => {
    const active = link.dataset.page === pageId || (['rainforest', 'beach', 'volcano', 'tours', 'ocean', 'museum'].includes(pageId) && link.dataset.page === 'things');
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (location.hash !== '#' + pageId) history.replaceState(null, '', '#' + pageId);
}
document.addEventListener('click', event => {
  const control = event.target.closest('[data-page]');
  if (control) showPage(control.dataset.page);
});
menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.filter').forEach(filter => filter.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === filter));
  document.querySelectorAll('.activity-card').forEach(card => {
    card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
  });
}));
const initial = location.hash.slice(1);
if (initial && document.getElementById(initial)) {
  pages.forEach(page => page.classList.toggle('active', page.id === initial));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.page === initial || (['rainforest', 'beach', 'volcano', 'tours', 'ocean', 'museum'].includes(initial) && link.dataset.page === 'things')));
}
