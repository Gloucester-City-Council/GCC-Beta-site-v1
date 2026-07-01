/* Bins & recycling landing page — area selector only.
   Stores the chosen area in the shared cookie so the topic detail pages
   (waste-*.html, powered by topic-page.js) open pre-filtered. */
(function () {
  'use strict';

  var select    = document.getElementById('ct-area-select');
  var areaLabel = document.getElementById('ct-area-label');
  if (!select) return;

  var AREA_NAMES = {
    'cheltenham':    'Cheltenham Borough Council',
    'cotswold':      'Cotswold District Council',
    'forest-of-dean':'Forest of Dean District Council',
    'gloucester':    'Gloucester City Council',
    'stroud':        'Stroud District Council',
    'tewkesbury':    'Tewkesbury Borough Council'
  };

  function showLabel(area) {
    if (area && AREA_NAMES[area]) {
      areaLabel.textContent = 'Showing information for: ' + AREA_NAMES[area];
      areaLabel.hidden = false;
    } else {
      areaLabel.hidden = true;
    }
  }

  select.addEventListener('change', function () {
    var area = select.value;
    if (!area) {
      if (typeof LGRArea !== 'undefined') LGRArea.clear();
      showLabel('');
      return;
    }
    if (typeof LGRArea !== 'undefined') LGRArea.set(area);
    showLabel(area);
  });

  // Restore from cookie on load
  var saved = typeof LGRArea !== 'undefined' && LGRArea.get();
  if (saved && AREA_NAMES[saved]) {
    select.value = saved;
    showLabel(saved);
  }

}());
