(function () {
  'use strict';
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) setMenu(false);
  });

  // Smooth scroll (CSS handles it; JS adds focus + closes the mobile menu + works in older browsers)
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      setMenu(false);
      var top = target.getBoundingClientRect().top + window.pageYOffset - 58;
      window.scrollTo({ top: id === '#top' ? 0 : top, behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });

  // Highlight the active nav item
  var sections = links.map(function (l) { return document.querySelector(l.getAttribute('href')); });
  function onScroll() {
    var y = window.pageYOffset + 120, current = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 4) current = links.length - 1;
    links.forEach(function (l, i) { l.classList.toggle('is-active', i === current); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
