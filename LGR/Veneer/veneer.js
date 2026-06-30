/* Veneer – progressive enhancement router */
(function () {
  'use strict';

  // Service URLs for each area × tier combination
  var SERVICES = {
    cheltenham: {
      county:   { name: 'Gloucestershire County Council', url: 'https://www.gloucestershire.gov.uk/', desc: 'Education, roads, adult social care, libraries and more.' },
      district: { name: 'Cheltenham Borough Council',     url: 'https://www.cheltenham.gov.uk/',     desc: 'Bins, council tax, planning, housing and leisure.' }
    },
    cotswold: {
      county:   { name: 'Gloucestershire County Council', url: 'https://www.gloucestershire.gov.uk/', desc: 'Education, roads, adult social care, libraries and more.' },
      district: { name: 'Cotswold District Council',      url: 'https://www.cotswold.gov.uk/',       desc: 'Bins, council tax, planning, housing and leisure.' }
    },
    'forest-of-dean': {
      county:   { name: 'Gloucestershire County Council', url: 'https://www.gloucestershire.gov.uk/', desc: 'Education, roads, adult social care, libraries and more.' },
      district: { name: 'Forest of Dean District Council',url: 'https://www.fdean.gov.uk/',          desc: 'Bins, council tax, planning, housing and leisure.' }
    },
    gloucester: {
      county:   { name: 'Gloucestershire County Council', url: 'https://www.gloucestershire.gov.uk/', desc: 'Education, roads, adult social care, libraries and more.' },
      district: { name: 'Gloucester City Council',        url: 'https://www.gloucester.gov.uk/',     desc: 'Bins, council tax, planning, housing and leisure.' }
    },
    stroud: {
      county:   { name: 'Gloucestershire County Council', url: 'https://www.gloucestershire.gov.uk/', desc: 'Education, roads, adult social care, libraries and more.' },
      district: { name: 'Stroud District Council',        url: 'https://www.stroud.gov.uk/',         desc: 'Bins, council tax, planning, housing and leisure.' }
    },
    tewkesbury: {
      county:   { name: 'Gloucestershire County Council', url: 'https://www.gloucestershire.gov.uk/', desc: 'Education, roads, adult social care, libraries and more.' },
      district: { name: 'Tewkesbury Borough Council',    url: 'https://www.tewkesbury.gov.uk/',     desc: 'Bins, council tax, planning, housing and leisure.' }
    }
  };

  var areaRadios = document.querySelectorAll('input[name="area"]');
  var tierRadios = document.querySelectorAll('input[name="tier"]');
  var stepTier   = document.getElementById('step-tier');

  function showStep(el) {
    el.classList.remove('step--hidden');
    el.removeAttribute('aria-hidden');
  }

  function getCheckedValue(radios) {
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return null;
  }

  // Step 1 → Step 2
  areaRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      tierRadios.forEach(function (r) { r.checked = false; });
      showStep(stepTier);
      stepTier.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Step 2 → navigate
  tierRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      var area = getCheckedValue(areaRadios);
      var tier = getCheckedValue(tierRadios);
      if (!area || !tier) return;
      var service = SERVICES[area] && SERVICES[area][tier];
      if (service) window.open(service.url, '_blank', 'noopener,noreferrer');
    });
  });

}());
