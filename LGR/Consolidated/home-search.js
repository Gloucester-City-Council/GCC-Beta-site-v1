/* Home page service search — live filter over the "Services available
   here" index. Submitting goes to the first match; with no JavaScript
   the box degrades to a plain form and the full index is always shown. */
(function () {
  'use strict';

  var form   = document.querySelector('.hero-search');
  var input  = document.getElementById('site-search');
  var status = document.getElementById('service-filter-status');
  var items  = document.querySelectorAll('.service-index__item');

  if (!form || !input || !items.length) return;

  function applyFilter() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;

    items.forEach(function (item) {
      var match = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
      item.hidden = !match;
      if (match) shown++;
    });

    if (!status) return;
    if (!q) {
      status.hidden = true;
    } else if (shown === 0) {
      status.hidden = false;
      status.textContent = 'No services here match “' + input.value.trim() +
        '” — try the service finder further down the page.';
    } else {
      status.hidden = false;
      status.textContent = shown + (shown === 1 ? ' service matches' : ' services match') +
        ' “' + input.value.trim() + '”.';
    }
  }

  input.addEventListener('input', applyFilter);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    applyFilter();
    var first = document.querySelector('.service-index__item:not([hidden]) .service-index__link');
    if (first) {
      window.location.href = first.getAttribute('href');
    }
  });

}());
