/* Consolidated service pages — area selector, per-council content and tabs.
   One script covers every page built on the ct- markup:
   - hub landing pages (waste.html, planning.html, …): area picker only,
     stored in the shared cookie so detail pages open pre-filtered
   - topic detail pages (waste-*.html, planning-*.html, …): picker plus
     per-council content blocks
   - council-tax.html: all of the above plus a tab set */
(function () {
  'use strict';

  var select    = document.getElementById('ct-area-select');
  var noArea    = document.getElementById('ct-no-area');
  var content   = document.getElementById('ct-content');
  var areaLabel = document.getElementById('ct-area-label');
  var tabs      = document.querySelectorAll('.ct-tab');
  var panels    = document.querySelectorAll('.ct-panel');

  if (!select) return;

  var AREA_NAMES = {
    'cheltenham':    'Cheltenham Borough Council',
    'cotswold':      'Cotswold District Council',
    'forest-of-dean':'Forest of Dean District Council',
    'gloucester':    'Gloucester City Council',
    'stroud':        'Stroud District Council',
    'tewkesbury':    'Tewkesbury Borough Council'
  };

  function applyArea(area) {
    document.querySelectorAll('.ct-block--council').forEach(function (block) {
      block.classList.toggle('ct-block--visible', block.getAttribute('data-council') === area);
    });

    if (area && AREA_NAMES[area]) {
      areaLabel.textContent = 'Showing information for: ' + AREA_NAMES[area];
      areaLabel.hidden = false;
    } else {
      areaLabel.hidden = true;
    }
  }

  function showContent() {
    if (!content) return;
    noArea.hidden = true;
    content.hidden = false;
  }

  function hideContent() {
    if (!content) return;
    content.hidden = true;
    noArea.hidden = false;
  }

  function switchTab(targetTab) {
    tabs.forEach(function (tab) {
      var isTarget = tab === targetTab;
      tab.classList.toggle('ct-tab--active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      tab.setAttribute('tabindex', isTarget ? '0' : '-1');
    });

    panels.forEach(function (panel) {
      var tabKey = panel.id.replace('tab-', '');
      var active = targetTab.getAttribute('data-tab') === tabKey;
      panel.classList.toggle('ct-panel--hidden', !active);
    });
  }

  // Area selector
  select.addEventListener('change', function () {
    var area = select.value;
    if (!area) {
      hideContent();
      applyArea('');
      if (typeof LGRArea !== 'undefined') LGRArea.clear();
      return;
    }
    if (typeof LGRArea !== 'undefined') LGRArea.set(area);
    showContent();
    applyArea(area);
  });

  // Tabs: click, plus roving tabindex with left/right arrow keys
  tabs.forEach(function (tab, i) {
    tab.setAttribute('tabindex', tab.classList.contains('ct-tab--active') ? '0' : '-1');

    tab.addEventListener('click', function () {
      switchTab(tab);
    });

    tab.addEventListener('keydown', function (e) {
      var newIndex = null;
      if (e.key === 'ArrowRight') newIndex = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft')  newIndex = (i - 1 + tabs.length) % tabs.length;
      if (newIndex !== null) {
        switchTab(tabs[newIndex]);
        tabs[newIndex].focus();
        e.preventDefault();
      }
    });
  });

  // Pre-select from URL hash (takes priority) or the shared cookie
  var hash = window.location.hash.replace('#', '');
  var cookieArea = typeof LGRArea !== 'undefined' && LGRArea.get();
  var preselect = (hash && AREA_NAMES[hash]) ? hash : (cookieArea && AREA_NAMES[cookieArea] ? cookieArea : null);
  if (preselect) {
    select.value = preselect;
    showContent();
    applyArea(preselect);
  }

}());
