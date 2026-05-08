/* Shared mobile drawer + scroll reveal logic */
(function () {
  const navToggle = document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const body = document.body;

  function setDrawer(open) {
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    body.classList.toggle('no-scroll', open);
  }

  navToggle.addEventListener('click', function () {
    setDrawer(navToggle.getAttribute('aria-expanded') !== 'true');
  });
  overlay.addEventListener('click', function () { setDrawer(false); });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setDrawer(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setDrawer(false);
  });

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () { entry.target.classList.add('visible'); }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
}());
