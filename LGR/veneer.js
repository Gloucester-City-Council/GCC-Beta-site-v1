/* Progressive-enhancement service router.
   Shared by the Veneer and Consolidated home pages: two questions
   (area, then county/district), then a result card linking to the
   right existing council website. Fails open — without JavaScript
   the noscript block lists every destination directly. */
(function () {
  'use strict';

  var COUNTY = {
    name: 'Gloucestershire County Council',
    url:  'https://www.gloucestershire.gov.uk/',
    desc: 'Education, roads, adult social care, libraries and more.'
  };

  var DISTRICTS = {
    'cheltenham':     { label: 'Cheltenham',     name: 'Cheltenham Borough Council',      url: 'https://www.cheltenham.gov.uk/' },
    'cotswold':       { label: 'Cotswold',       name: 'Cotswold District Council',       url: 'https://www.cotswold.gov.uk/' },
    'forest-of-dean': { label: 'Forest of Dean', name: 'Forest of Dean District Council', url: 'https://www.fdean.gov.uk/' },
    'gloucester':     { label: 'Gloucester',     name: 'Gloucester City Council',         url: 'https://www.gloucester.gov.uk/' },
    'stroud':         { label: 'Stroud',         name: 'Stroud District Council',         url: 'https://www.stroud.gov.uk/' },
    'tewkesbury':     { label: 'Tewkesbury',     name: 'Tewkesbury Borough Council',      url: 'https://www.tewkesbury.gov.uk/' }
  };

  var DISTRICT_DESC = 'Bins, council tax, planning, housing and leisure.';

  var areaRadios = document.querySelectorAll('input[name="area"]');
  var tierRadios = document.querySelectorAll('input[name="tier"]');
  var stepTier   = document.getElementById('step-tier');
  var stepResult = document.getElementById('step-result');
  var resultBody = document.getElementById('result-body');

  if (!areaRadios.length || !stepTier) return;

  function showStep(el) {
    el.classList.remove('step--hidden');
    el.removeAttribute('aria-hidden');
  }

  function hideStep(el) {
    el.classList.add('step--hidden');
    el.setAttribute('aria-hidden', 'true');
  }

  function getCheckedValue(radios) {
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return null;
  }

  function renderResult(area, tier) {
    var district = DISTRICTS[area];
    if (!district || !stepResult || !resultBody) return;

    var service = tier === 'county' ? COUNTY : district;
    var desc    = tier === 'county' ? COUNTY.desc : DISTRICT_DESC;
    var lead    = tier === 'county'
      ? 'This service hasn’t moved to our website yet. It’s still on the former county council’s website:'
      : 'This service hasn’t moved to our website yet. For <strong>' + district.label +
        '</strong>, it’s still on the former district council’s website:';

    resultBody.innerHTML =
      '<p class="result-card__lead">' + lead + '</p>' +
      '<p class="result-card__name">' + service.name + '</p>' +
      '<p class="result-card__desc">' + desc + '</p>' +
      '<a class="btn" href="' + service.url + '" target="_blank" rel="noopener">' +
      'Go to ' + service.name + '<span class="sr-only"> (opens in a new tab)</span></a>';

    showStep(stepResult);
    stepResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Restore area from cookie on load
  var saved = typeof LGRArea !== 'undefined' && LGRArea.get();
  if (saved && DISTRICTS[saved]) {
    areaRadios.forEach(function (r) {
      if (r.value === saved) {
        r.checked = true;
        showStep(stepTier);
      }
    });
  }

  // Step 1 → Step 2
  areaRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (typeof LGRArea !== 'undefined') LGRArea.set(radio.value);
      tierRadios.forEach(function (r) { r.checked = false; });
      if (stepResult) hideStep(stepResult);
      showStep(stepTier);
      stepTier.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Step 2 → Step 3 (result)
  tierRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      var area = getCheckedValue(areaRadios);
      var tier = getCheckedValue(tierRadios);
      if (area && tier) renderResult(area, tier);
    });
  });

}());
