/* Council tax page — area selector + tab logic */
(function () {
  'use strict';

  var select     = document.getElementById('ct-area-select');
  var noArea     = document.getElementById('ct-no-area');
  var content    = document.getElementById('ct-content');
  var areaLabel  = document.getElementById('ct-area-label');
  var tabs       = document.querySelectorAll('.ct-tab');
  var panels     = document.querySelectorAll('.ct-panel');

  var AREA_NAMES = {
    'cheltenham':    'Cheltenham Borough Council',
    'cotswold':      'Cotswold District Council',
    'forest-of-dean':'Forest of Dean District Council',
    'gloucester':    'Gloucester City Council',
    'stroud':        'Stroud District Council',
    'tewkesbury':    'Tewkesbury Borough Council'
  };

  function applyArea(area) {
    // Show/hide all council blocks
    var councilBlocks = document.querySelectorAll('.ct-block--council');
    councilBlocks.forEach(function (block) {
      if (block.getAttribute('data-council') === area) {
        block.classList.add('ct-block--visible');
      } else {
        block.classList.remove('ct-block--visible');
      }
    });

    // Update the label
    if (area && AREA_NAMES[area]) {
      areaLabel.textContent = 'Showing information for: ' + AREA_NAMES[area];
      areaLabel.hidden = false;
    } else {
      areaLabel.hidden = true;
    }
  }

  function showContent() {
    noArea.hidden = true;
    content.hidden = false;
  }

  function hideContent() {
    content.hidden = true;
    noArea.hidden = false;
  }

  function switchTab(targetTab) {
    tabs.forEach(function (tab) {
      var isTarget = tab === targetTab;
      tab.classList.toggle('ct-tab--active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      var tabKey  = panel.id.replace('tab-', '');
      var active  = targetTab.getAttribute('data-tab') === tabKey;
      panel.classList.toggle('ct-panel--hidden', !active);
    });
  }

  // Area selector
  select.addEventListener('change', function () {
    var area = select.value;
    if (!area) {
      hideContent();
      if (typeof LGRArea !== 'undefined') LGRArea.clear();
      return;
    }
    if (typeof LGRArea !== 'undefined') LGRArea.set(area);
    showContent();
    applyArea(area);
  });

  // Tab clicks
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchTab(tab);
    });
  });

  // Keyboard navigation within tabs (left/right arrows)
  tabs.forEach(function (tab, i) {
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

  // Pre-select from URL hash (takes priority) or cookie
  var hash = window.location.hash.replace('#', '');
  var cookieArea = typeof LGRArea !== 'undefined' && LGRArea.get();
  var preselect = (hash && AREA_NAMES[hash]) ? hash : (cookieArea && AREA_NAMES[cookieArea] ? cookieArea : null);
  if (preselect) {
    select.value = preselect;
    showContent();
    applyArea(preselect);
  }

}());
