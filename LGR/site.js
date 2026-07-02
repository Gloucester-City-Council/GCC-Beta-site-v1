/* Shared site chrome behaviour — mobile navigation toggle.
   Loaded by every page of both LGR proofs of concept. */
(function () {
  'use strict';

  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('header-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('header-nav--open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
}());
