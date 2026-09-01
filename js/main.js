// Faith Gladstone — shared site behavior: mobile nav toggle + active link.
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var scrim = document.querySelector('.nav-scrim');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      if (scrim) scrim.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  if (scrim) {
    scrim.addEventListener('click', function () {
      nav.classList.remove('is-open');
      scrim.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Close mobile nav when a link is clicked
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      if (scrim) scrim.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Mark current page's nav link
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href').split('/').pop();
    if (href === current) link.setAttribute('aria-current', 'page');
  });

  // Repertoire accordion: keyboard-operable expand/collapse
  document.querySelectorAll('.accordion-toggle').forEach(function (toggle, index) {
    toggle.addEventListener('click', function () {
      var panel = document.getElementById(toggle.getAttribute('aria-controls'));
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (panel) panel.hidden = isOpen;
    });
    // First category open by default
    if (index === 0) {
      toggle.setAttribute('aria-expanded', 'true');
      var panel = document.getElementById(toggle.getAttribute('aria-controls'));
      if (panel) panel.hidden = false;
    }
  });
});
