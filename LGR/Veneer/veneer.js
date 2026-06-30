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
  var stepResult = document.getElementById('step-result');
  var resultContent = document.getElementById('result-content');

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

  function buildResultCard(service, tierLabel) {
    var a = document.createElement('a');
    a.href = service.url;
    a.className = 'result-card';
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    var badge = document.createElement('span');
    badge.className = 'result-card-badge';
    badge.textContent = tierLabel;

    var title = document.createElement('span');
    title.className = 'result-card-title';
    title.textContent = service.name;

    var desc = document.createElement('span');
    desc.className = 'result-card-desc';
    desc.textContent = service.desc;

    var arrow = document.createElement('span');
    arrow.className = 'result-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';

    a.appendChild(badge);
    a.appendChild(title);
    a.appendChild(desc);
    a.appendChild(arrow);
    return a;
  }

  function showResult() {
    var area = getCheckedValue(areaRadios);
    var tier = getCheckedValue(tierRadios);
    if (!area || !tier) return;

    var areaData = SERVICES[area];
    if (!areaData) return;

    // Clear previous result
    while (resultContent.firstChild) {
      resultContent.removeChild(resultContent.firstChild);
    }

    if (tier === 'county') {
      resultContent.appendChild(buildResultCard(areaData.county, 'County service'));
    } else if (tier === 'district') {
      resultContent.appendChild(buildResultCard(areaData.district, 'District / borough service'));
    }

    // Reset button
    var btn = document.createElement('button');
    btn.className = 'reset-btn';
    btn.textContent = '← Start again';
    btn.addEventListener('click', function () { resetAll(); });
    resultContent.appendChild(btn);

    showStep(stepResult);
    stepResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function resetAll() {
    areaRadios.forEach(function (r) { r.checked = false; });
    tierRadios.forEach(function (r) { r.checked = false; });
    hideStep(stepTier);
    hideStep(stepResult);
    while (resultContent.firstChild) resultContent.removeChild(resultContent.firstChild);
    document.getElementById('step-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Step 1 → Step 2
  areaRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      hideStep(stepResult);
      while (resultContent.firstChild) resultContent.removeChild(resultContent.firstChild);
      // Reset tier selection when area changes
      tierRadios.forEach(function (r) { r.checked = false; });
      showStep(stepTier);
      stepTier.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Step 2 → Step 3
  tierRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      showResult();
    });
  });

}());
