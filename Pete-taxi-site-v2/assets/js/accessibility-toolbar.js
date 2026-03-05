/**
 * Pete-taxi-site-v2 — Full Accessibility Toolbar
 * Gloucester City Council
 * WCAG 2.2 AA compliant
 *
 * Features: TTS, font size, font picker, colour schemes, reading ruler,
 * screen mask, magnifier, dictionary, text mode, margins, language,
 * reading speed, focus mode, reset.
 */

(function () {
  'use strict';

  /* ============================================================
     CONSTANTS
     ============================================================ */
  var FONTS = ['Default', 'Arial', 'Georgia', 'Verdana', 'Tahoma', 'Comic Sans MS', 'Courier New', 'OpenDyslexic'];

  var LANGUAGES = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Dutch', 'Polish', 'Russian', 'Chinese', 'Japanese', 'Korean',
    'Arabic', 'Hindi', 'Turkish', 'Swedish', 'Norwegian', 'Danish',
    'Finnish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian'
  ];

  var COLOR_SCHEMES = [
    { label: 'Default',          bg: '',        text: '',        link: '' },
    { label: 'Yellow on Black',  bg: '#000000', text: '#ffff00', link: '#ffaa00' },
    { label: 'Cream',            bg: '#fffdd0', text: '#222222', link: '#335566' },
    { label: 'Blue on White',    bg: '#ffffff', text: '#003366', link: '#0066cc' },
    { label: 'Green on Black',   bg: '#000000', text: '#00ff00', link: '#00cc88' },
    { label: 'High Contrast',    bg: '#000000', text: '#ffffff', link: '#ffff00' },
  ];

  var READING_SPEEDS = [
    { label: 'Very Slow', rate: 0.5 },
    { label: 'Slow',      rate: 0.75 },
    { label: 'Normal',    rate: 1.0 },
    { label: 'Fast',      rate: 1.25 },
    { label: 'Very Fast', rate: 1.75 },
  ];

  var DICT = {
    accessibility: 'The quality of being easily reached, entered, or used by people who have a disability.',
    inclusive:     'Not excluding any section of society or any party involved in something.',
    disability:    'A physical or mental condition that limits a person\'s movements, senses, or activities.',
    licence:       'An official document giving permission to do, use, or own something.',
    hackney:       'A hackney carriage is a licensed taxi authorised to pick up passengers on the street.',
    licensing:     'The process of granting official permission to operate a service or business.',
    vehicle:       'A machine used for transporting people or goods, especially on land.',
    operator:      'A person or company that runs or works a business or machine.',
    gloucester:    'A city in south-west England and the county town of Gloucestershire.',
  };

  /* ============================================================
     STATE
     ============================================================ */
  var state = {
    isOpen:       false,
    fontSize:     16,
    font:         'Default',
    colorScheme:  0,        // index into COLOR_SCHEMES
    language:     'English',
    readingSpeed: 2,        // index into READING_SPEEDS
    isReading:    false,
    showRuler:    false,
    showMask:     false,
    showMagnifier:false,
    focusMode:    false,
    narrowMargins:false,
    textMode:     false,
    showDict:     false,
    dictWord:     '',
    dictDef:      '',
    rulerY:       200,
    magnifierX:   300,
    magnifierY:   300,
    // dropdown open states
    fontMenuOpen:   false,
    colorMenuOpen:  false,
    langMenuOpen:   false,
    settingsOpen:   false,
  };

  /* Load persisted settings */
  try {
    var saved = JSON.parse(localStorage.getItem('gcc-a11y-toolbar') || '{}');
    ['fontSize', 'font', 'colorScheme', 'language', 'readingSpeed', 'focusMode', 'narrowMargins'].forEach(function (k) {
      if (saved[k] !== undefined) state[k] = saved[k];
    });
  } catch (e) {}

  /* Save persistent settings */
  function persist() {
    try {
      localStorage.setItem('gcc-a11y-toolbar', JSON.stringify({
        fontSize:     state.fontSize,
        font:         state.font,
        colorScheme:  state.colorScheme,
        language:     state.language,
        readingSpeed: state.readingSpeed,
        focusMode:    state.focusMode,
        narrowMargins:state.narrowMargins,
      }));
    } catch (e) {}
  }

  /* ============================================================
     SPEECH SYNTHESIS
     ============================================================ */
  var synth = window.speechSynthesis || null;
  var utterance = null;

  function speak() {
    if (!synth) { return; }
    if (synth.speaking) {
      synth.cancel();
      state.isReading = false;
      updateReadBtn();
      return;
    }
    var main = document.getElementById('main-content');
    var text = main ? (main.innerText || main.textContent) : document.body.innerText;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = READING_SPEEDS[state.readingSpeed].rate;
    utterance.onend = function () { state.isReading = false; updateReadBtn(); };
    utterance.onerror = function () { state.isReading = false; updateReadBtn(); };
    synth.speak(utterance);
    state.isReading = true;
    updateReadBtn();
  }

  function stopSpeech() {
    if (synth && synth.speaking) { synth.cancel(); }
    state.isReading = false;
  }

  function updateReadBtn() {
    var btn = document.getElementById('a11y-tts-btn');
    if (!btn) { return; }
    btn.setAttribute('aria-pressed', state.isReading ? 'true' : 'false');
    btn.querySelector('.a11y-btn-icon').textContent = state.isReading ? '⏸' : '▶';
    btn.querySelector('.a11y-btn-label').textContent = state.isReading ? 'Pause' : 'Play';
  }

  /* ============================================================
     PAGE STYLE APPLICATION
     ============================================================ */
  function applyStyles() {
    var root = document.documentElement;
    var body = document.body;
    var scheme = COLOR_SCHEMES[state.colorScheme];

    /* Font size */
    body.style.fontSize = state.fontSize + 'px';

    /* Font family */
    if (state.font === 'Default') {
      body.style.fontFamily = '';
    } else {
      body.style.fontFamily = '"' + state.font + '", Arial, sans-serif';
    }

    /* Colour scheme */
    if (scheme.bg) {
      body.style.backgroundColor = scheme.bg;
      body.style.color = scheme.text;
      root.setAttribute('data-a11y-color', state.colorScheme);
    } else {
      body.style.backgroundColor = '';
      body.style.color = '';
      root.removeAttribute('data-a11y-color');
    }

    /* Link colours */
    var styleEl = document.getElementById('a11y-link-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'a11y-link-style';
      document.head.appendChild(styleEl);
    }
    if (scheme.link) {
      styleEl.textContent = 'a { color: ' + scheme.link + ' !important; }';
    } else {
      styleEl.textContent = '';
    }

    /* Narrow margins */
    var main = document.getElementById('main-content');
    if (main) {
      main.style.maxWidth = state.narrowMargins ? '560px' : '';
      main.style.margin = state.narrowMargins ? '0 auto' : '';
    }

    /* Focus mode — bold first word of each paragraph */
    var focusStyle = document.getElementById('a11y-focus-style');
    if (!focusStyle) {
      focusStyle = document.createElement('style');
      focusStyle.id = 'a11y-focus-style';
      document.head.appendChild(focusStyle);
    }
    if (state.focusMode) {
      focusStyle.textContent = [
        '#main-content p::first-line { font-weight: 700; }',
        '#main-content li::marker { font-weight: 700; }',
      ].join('\n');
    } else {
      focusStyle.textContent = '';
    }

    /* Text mode — hide images */
    var textStyle = document.getElementById('a11y-text-style');
    if (!textStyle) {
      textStyle = document.createElement('style');
      textStyle.id = 'a11y-text-style';
      document.head.appendChild(textStyle);
    }
    textStyle.textContent = state.textMode ? 'img, svg, .gcc-card__icon, .gcc-header__logo-img { display: none !important; }' : '';
  }

  /* ============================================================
     RULER & MASK
     ============================================================ */
  function updateRuler(y) {
    if (y !== undefined) state.rulerY = y;
    var ruler = document.getElementById('a11y-ruler');
    if (ruler) {
      ruler.style.display = (state.showRuler && state.isOpen) ? 'block' : 'none';
      ruler.style.top = (state.rulerY - 20) + 'px';
    }
    updateMask();
  }

  function updateMask() {
    var top = document.getElementById('a11y-mask-top');
    var bot = document.getElementById('a11y-mask-bot');
    var show = state.showMask && state.isOpen;
    if (top) {
      top.style.display = show ? 'block' : 'none';
      top.style.height = Math.max(0, state.rulerY - 60) + 'px';
    }
    if (bot) {
      bot.style.display = show ? 'block' : 'none';
      bot.style.top = (state.rulerY + 60) + 'px';
    }
  }

  /* ============================================================
     MAGNIFIER
     ============================================================ */
  function updateMagnifier(x, y) {
    if (x !== undefined) { state.magnifierX = x; state.magnifierY = y; }
    var mag = document.getElementById('a11y-magnifier');
    if (mag) {
      mag.style.display = (state.showMagnifier && state.isOpen) ? 'flex' : 'none';
      mag.style.left = (state.magnifierX - 80) + 'px';
      mag.style.top  = (state.magnifierY - 80) + 'px';
    }
  }

  /* ============================================================
     DICTIONARY
     ============================================================ */
  function showDictPopup(word, def) {
    state.dictWord = word;
    state.dictDef  = def;
    state.showDict = true;
    var popup = document.getElementById('a11y-dict-popup');
    if (!popup) { return; }
    document.getElementById('a11y-dict-word').textContent = word;
    document.getElementById('a11y-dict-def').textContent  = def;
    popup.style.display = 'block';
  }

  function hideDictPopup() {
    state.showDict = false;
    var popup = document.getElementById('a11y-dict-popup');
    if (popup) { popup.style.display = 'none'; }
  }

  function handleTextSelect() {
    var sel = window.getSelection ? window.getSelection().toString().trim() : '';
    if (!sel || sel.indexOf(' ') !== -1) { return; } // single word only
    var def = DICT[sel.toLowerCase()] || '"' + sel + '": Select any single word on the page to look it up.';
    showDictPopup(sel, def);
  }

  /* ============================================================
     DROPDOWN HELPERS
     ============================================================ */
  function closeAllDropdowns() {
    state.fontMenuOpen  = false;
    state.colorMenuOpen = false;
    state.langMenuOpen  = false;
    state.settingsOpen  = false;
    ['a11y-font-menu', 'a11y-color-menu', 'a11y-lang-menu', 'a11y-settings-menu'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.style.display = 'none'; }
    });
  }

  function toggleDropdown(menuId, stateKey) {
    closeAllDropdowns();
    state[stateKey] = !state[stateKey]; // re-open if we just closed it
    // (closeAllDropdowns sets it to false, then we flip once)
    state[stateKey] = true; // so explicitly set true
    var menu = document.getElementById(menuId);
    if (menu) { menu.style.display = 'block'; }
  }

  /* ============================================================
     RESET
     ============================================================ */
  function reset() {
    stopSpeech();
    state.fontSize      = 16;
    state.font          = 'Default';
    state.colorScheme   = 0;
    state.language      = 'English';
    state.readingSpeed  = 2;
    state.showRuler     = false;
    state.showMask      = false;
    state.showMagnifier = false;
    state.focusMode     = false;
    state.narrowMargins = false;
    state.textMode      = false;
    closeAllDropdowns();
    applyStyles();
    updateRuler();
    updateMagnifier();
    updateReadBtn();
    updateToolbarActiveStates();
    hideDictPopup();
    persist();
    announce('All accessibility settings reset to default');
  }

  /* ============================================================
     UPDATE ACTIVE STATES (after state changes)
     ============================================================ */
  function updateToolbarActiveStates() {
    setActive('a11y-ruler-btn',   state.showRuler);
    setActive('a11y-mask-btn',    state.showMask);
    setActive('a11y-mag-btn',     state.showMagnifier);
    setActive('a11y-focus-btn',   state.focusMode);
    setActive('a11y-margins-btn', state.narrowMargins);
    setActive('a11y-text-btn',    state.textMode);

    var colorActive = state.colorScheme !== 0;
    setActive('a11y-color-btn', colorActive);

    var langActive = state.language !== 'English';
    setActive('a11y-lang-btn', langActive);

    /* font size display */
    var sizeEl = document.getElementById('a11y-font-size-display');
    if (sizeEl) { sizeEl.textContent = state.fontSize + 'px'; }

    /* language button label */
    var langBtn = document.getElementById('a11y-lang-btn');
    if (langBtn) {
      langBtn.querySelector('.a11y-btn-label').textContent = state.language === 'English' ? 'Language' : state.language;
    }

    /* font button label */
    var fontBtn = document.getElementById('a11y-font-btn');
    if (fontBtn) {
      fontBtn.querySelector('.a11y-btn-label').textContent = state.font === 'Default' ? 'Font' : state.font;
    }

    /* colour button */
    var colorBtn = document.getElementById('a11y-color-btn');
    if (colorBtn) {
      colorBtn.querySelector('.a11y-btn-label').textContent = state.colorScheme === 0 ? 'Colours' : COLOR_SCHEMES[state.colorScheme].label;
    }

    /* language notice */
    var notice = document.getElementById('a11y-lang-notice');
    if (notice) {
      if (state.language !== 'English') {
        notice.style.display = 'block';
        notice.querySelector('strong').textContent = state.language;
      } else {
        notice.style.display = 'none';
      }
    }

    /* update dropdown item highlights */
    refreshFontMenu();
    refreshColorMenu();
    refreshLangMenu();
    refreshSpeedMenu();
  }

  function setActive(id, active) {
    var el = document.getElementById(id);
    if (!el) { return; }
    el.classList.toggle('a11y-btn--active', !!active);
    el.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  function refreshFontMenu() {
    var items = document.querySelectorAll('#a11y-font-menu [data-font]');
    items.forEach(function (item) {
      item.classList.toggle('a11y-menu-item--active', item.getAttribute('data-font') === state.font);
    });
  }

  function refreshColorMenu() {
    var items = document.querySelectorAll('#a11y-color-menu [data-color-idx]');
    items.forEach(function (item) {
      item.classList.toggle('a11y-menu-item--active', parseInt(item.getAttribute('data-color-idx'), 10) === state.colorScheme);
    });
  }

  function refreshLangMenu() {
    var items = document.querySelectorAll('#a11y-lang-menu [data-lang]');
    items.forEach(function (item) {
      item.classList.toggle('a11y-menu-item--active', item.getAttribute('data-lang') === state.language);
    });
  }

  function refreshSpeedMenu() {
    var items = document.querySelectorAll('#a11y-settings-menu [data-speed-idx]');
    items.forEach(function (item) {
      item.classList.toggle('a11y-menu-item--active', parseInt(item.getAttribute('data-speed-idx'), 10) === state.readingSpeed);
    });
  }

  /* ============================================================
     ANNOUNCE (screen reader live region)
     ============================================================ */
  function announce(msg) {
    var live = document.getElementById('gcc-live-region');
    if (!live) {
      live = document.createElement('div');
      live.id = 'gcc-live-region';
      live.setAttribute('role', 'status');
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      live.className = 'visually-hidden';
      document.body.appendChild(live);
    }
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 50);
  }

  /* ============================================================
     BUILD TOOLBAR HTML
     ============================================================ */
  function buildToolbar() {
    var wrap = document.createElement('div');
    wrap.id = 'a11y-toolbar-root';

    /* ---- Launch button ---- */
    var launchBtn = document.createElement('button');
    launchBtn.id = 'a11y-launch-btn';
    launchBtn.className = 'a11y-launch-btn';
    launchBtn.setAttribute('aria-label', 'Open accessibility tools');
    launchBtn.innerHTML = '<span aria-hidden="true">&#9855;</span> Accessibility Tools';
    launchBtn.addEventListener('click', function () {
      state.isOpen = true;
      render();
      announce('Accessibility toolbar opened');
    });
    wrap.appendChild(launchBtn);

    /* ---- Toolbar panel ---- */
    var bar = document.createElement('div');
    bar.id = 'a11y-toolbar';
    bar.className = 'a11y-toolbar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Accessibility toolbar');
    bar.style.display = 'none';

    bar.innerHTML = buildToolbarInner();
    wrap.appendChild(bar);

    /* ---- Ruler ---- */
    var ruler = document.createElement('div');
    ruler.id = 'a11y-ruler';
    ruler.className = 'a11y-ruler';
    ruler.style.display = 'none';
    wrap.appendChild(ruler);

    /* ---- Mask top ---- */
    var maskTop = document.createElement('div');
    maskTop.id = 'a11y-mask-top';
    maskTop.className = 'a11y-mask';
    maskTop.style.display = 'none';
    maskTop.style.top = '0';
    wrap.appendChild(maskTop);

    /* ---- Mask bottom ---- */
    var maskBot = document.createElement('div');
    maskBot.id = 'a11y-mask-bot';
    maskBot.className = 'a11y-mask';
    maskBot.style.display = 'none';
    maskBot.style.bottom = '0';
    maskBot.style.top = 'auto';
    wrap.appendChild(maskBot);

    /* ---- Magnifier ---- */
    var mag = document.createElement('div');
    mag.id = 'a11y-magnifier';
    mag.className = 'a11y-magnifier';
    mag.style.display = 'none';
    mag.innerHTML = '<span aria-hidden="true">&#128269;</span>';
    wrap.appendChild(mag);

    /* ---- Dictionary popup ---- */
    var dict = document.createElement('div');
    dict.id = 'a11y-dict-popup';
    dict.className = 'a11y-dict-popup';
    dict.setAttribute('role', 'dialog');
    dict.setAttribute('aria-label', 'Dictionary');
    dict.style.display = 'none';
    dict.innerHTML = [
      '<div class="a11y-dict-popup__header">',
        '<strong id="a11y-dict-word" class="a11y-dict-word"></strong>',
        '<button id="a11y-dict-close" class="a11y-dict-close" aria-label="Close dictionary">&#x2715;</button>',
      '</div>',
      '<p id="a11y-dict-def" class="a11y-dict-def"></p>',
    ].join('');
    wrap.appendChild(dict);

    /* ---- Language notice ---- */
    var notice = document.createElement('div');
    notice.id = 'a11y-lang-notice';
    notice.className = 'a11y-lang-notice';
    notice.setAttribute('role', 'status');
    notice.style.display = 'none';
    notice.innerHTML = '&#9888;&#65039; Page content would be translated to <strong></strong>. (Live translation requires a translation API.)';
    document.body.appendChild(notice);

    return wrap;
  }

  function buildToolbarInner() {
    /* Helper: build a toolbar button */
    function btn(id, icon, label, extra) {
      extra = extra || '';
      return [
        '<button id="' + id + '" class="a11y-btn" aria-pressed="false" ' + extra + '>',
          '<span class="a11y-btn-icon" aria-hidden="true">' + icon + '</span>',
          '<span class="a11y-btn-label">' + label + '</span>',
        '</button>',
      ].join('');
    }

    function divider() {
      return '<div class="a11y-divider" aria-hidden="true"></div>';
    }

    /* Font menu items */
    var fontItems = FONTS.map(function (f) {
      return '<button class="a11y-menu-item" data-font="' + f + '" style="font-family:' + (f === 'Default' ? 'inherit' : '"' + f + '"') + '">' + f + '</button>';
    }).join('');

    /* Colour menu items */
    var colorItems = COLOR_SCHEMES.map(function (cs, i) {
      var swatch = cs.bg
        ? '<span class="a11y-color-swatch" style="background:' + cs.bg + ';border-color:' + (cs.text || '#ccc') + '"></span>'
        : '<span class="a11y-color-swatch" style="background:#fff;border-color:#333"></span>';
      return '<button class="a11y-menu-item" data-color-idx="' + i + '">' + swatch + cs.label + '</button>';
    }).join('');

    /* Language menu items */
    var langItems = LANGUAGES.map(function (l) {
      return '<button class="a11y-menu-item" data-lang="' + l + '">' + l + '</button>';
    }).join('');

    /* Speed menu items */
    var speedItems = READING_SPEEDS.map(function (s, i) {
      return '<button class="a11y-menu-item" data-speed-idx="' + i + '">' + s.label + '</button>';
    }).join('');

    return [
      /* Logo */
      '<div class="a11y-toolbar__logo" aria-hidden="true">&#9855; AccessMe</div>',

      divider(),

      /* TTS */
      btn('a11y-tts-btn', '&#9654;', 'Play', 'title="Read page aloud"'),

      divider(),

      /* Font size */
      btn('a11y-font-dec', 'A&#8209;', 'Smaller', 'title="Decrease text size"'),
      '<div id="a11y-font-size-display" class="a11y-font-size-display" aria-live="polite" aria-label="Current font size">16px</div>',
      btn('a11y-font-inc', 'A+', 'Larger', 'title="Increase text size"'),

      divider(),

      /* Font picker */
      '<div class="a11y-dropdown-wrap">',
        btn('a11y-font-btn', '&#119809;', 'Font', 'aria-haspopup="true" aria-expanded="false" title="Change font"'),
        '<div id="a11y-font-menu" class="a11y-menu" role="menu" style="display:none">' + fontItems + '</div>',
      '</div>',

      divider(),

      /* Focus mode */
      btn('a11y-focus-btn', '&#128065;', 'Focus', 'title="Focus mode"'),

      /* Colour schemes */
      '<div class="a11y-dropdown-wrap">',
        btn('a11y-color-btn', '&#127912;', 'Colours', 'aria-haspopup="true" aria-expanded="false" title="Change colour scheme"'),
        '<div id="a11y-color-menu" class="a11y-menu" role="menu" style="display:none">' + colorItems + '</div>',
      '</div>',

      /* Ruler */
      btn('a11y-ruler-btn', '&#128207;', 'Ruler', 'title="Reading ruler"'),

      /* Mask */
      btn('a11y-mask-btn', '&#127917;', 'Mask', 'title="Screen mask"'),

      /* Magnifier */
      btn('a11y-mag-btn', '&#128269;', 'Magnify', 'title="Magnifier"'),

      divider(),

      /* Dictionary */
      btn('a11y-dict-btn', '&#128218;', 'Dictionary', 'title="Select a word to define it"'),

      /* Text mode */
      btn('a11y-text-btn', '&#128196;', 'Text Mode', 'title="Plain text mode — hide images"'),

      /* Margins */
      btn('a11y-margins-btn', '&#8596;', 'Margins', 'title="Narrow margins"'),

      /* Language */
      '<div class="a11y-dropdown-wrap a11y-dropdown-wrap--right">',
        btn('a11y-lang-btn', '&#127760;', 'Language', 'aria-haspopup="true" aria-expanded="false" title="Translate page"'),
        '<div id="a11y-lang-menu" class="a11y-menu a11y-menu--scroll" role="menu" style="display:none">' + langItems + '</div>',
      '</div>',

      divider(),

      /* Settings */
      '<div class="a11y-dropdown-wrap a11y-dropdown-wrap--right">',
        btn('a11y-settings-btn', '&#9881;&#65039;', 'Settings', 'aria-haspopup="true" aria-expanded="false" title="Reading speed settings"'),
        '<div id="a11y-settings-menu" class="a11y-menu" role="menu" style="display:none">',
          '<div class="a11y-menu-heading">Reading Speed</div>',
          speedItems,
        '</div>',
      '</div>',

      /* Reset */
      btn('a11y-reset-btn', '&#8635;', 'Reset', 'title="Reset all settings"'),

      /* Close — separate styling */
      '<button id="a11y-close-btn" class="a11y-close-btn" title="Close accessibility toolbar" aria-label="Close accessibility toolbar">',
        '<span aria-hidden="true">&#x2715;</span>',
        '<span class="a11y-btn-label">Close</span>',
      '</button>',
    ].join('');
  }

  /* ============================================================
     RENDER (open / close toolbar)
     ============================================================ */
  function render() {
    var bar      = document.getElementById('a11y-toolbar');
    var launch   = document.getElementById('a11y-launch-btn');
    if (!bar || !launch) { return; }

    if (state.isOpen) {
      bar.style.display = 'flex';
      launch.style.display = 'none';
      document.body.classList.add('a11y-toolbar-open');
    } else {
      bar.style.display = 'none';
      launch.style.display = 'flex';
      document.body.classList.remove('a11y-toolbar-open');
    }

    applyStyles();
    updateRuler();
    updateMagnifier();
    updateReadBtn();
    updateToolbarActiveStates();
  }

  /* ============================================================
     EVENT WIRING
     ============================================================ */
  function wireEvents() {
    /* TTS play/pause */
    on('a11y-tts-btn', 'click', speak);

    /* Font size */
    on('a11y-font-dec', 'click', function () {
      state.fontSize = Math.max(10, state.fontSize - 2);
      applyStyles(); updateToolbarActiveStates(); persist();
      announce('Text size ' + state.fontSize + ' pixels');
    });
    on('a11y-font-inc', 'click', function () {
      state.fontSize = Math.min(36, state.fontSize + 2);
      applyStyles(); updateToolbarActiveStates(); persist();
      announce('Text size ' + state.fontSize + ' pixels');
    });

    /* Font picker */
    on('a11y-font-btn', 'click', function (e) {
      e.stopPropagation();
      var isOpen = document.getElementById('a11y-font-menu').style.display !== 'none';
      closeAllDropdowns();
      if (!isOpen) { document.getElementById('a11y-font-menu').style.display = 'block'; }
      document.getElementById('a11y-font-btn').setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
    delegate('a11y-font-menu', '[data-font]', 'click', function (e) {
      state.font = e.target.getAttribute('data-font');
      closeAllDropdowns();
      applyStyles(); updateToolbarActiveStates(); persist();
      announce('Font changed to ' + state.font);
    });

    /* Focus mode */
    on('a11y-focus-btn', 'click', function () {
      state.focusMode = !state.focusMode;
      applyStyles(); updateToolbarActiveStates(); persist();
      announce(state.focusMode ? 'Focus mode on' : 'Focus mode off');
    });

    /* Colour schemes */
    on('a11y-color-btn', 'click', function (e) {
      e.stopPropagation();
      var isOpen = document.getElementById('a11y-color-menu').style.display !== 'none';
      closeAllDropdowns();
      if (!isOpen) { document.getElementById('a11y-color-menu').style.display = 'block'; }
      document.getElementById('a11y-color-btn').setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
    delegate('a11y-color-menu', '[data-color-idx]', 'click', function (e) {
      state.colorScheme = parseInt(e.target.closest('[data-color-idx]').getAttribute('data-color-idx'), 10);
      closeAllDropdowns();
      applyStyles(); updateToolbarActiveStates(); persist();
      announce('Colour scheme: ' + COLOR_SCHEMES[state.colorScheme].label);
    });

    /* Reading ruler */
    on('a11y-ruler-btn', 'click', function () {
      state.showRuler = !state.showRuler;
      updateRuler(); updateToolbarActiveStates();
      announce(state.showRuler ? 'Reading ruler on' : 'Reading ruler off');
    });

    /* Screen mask */
    on('a11y-mask-btn', 'click', function () {
      state.showMask = !state.showMask;
      updateMask(); updateToolbarActiveStates();
      announce(state.showMask ? 'Screen mask on' : 'Screen mask off');
    });

    /* Magnifier */
    on('a11y-mag-btn', 'click', function () {
      state.showMagnifier = !state.showMagnifier;
      updateMagnifier(); updateToolbarActiveStates();
      announce(state.showMagnifier ? 'Magnifier on' : 'Magnifier off');
    });

    /* Dictionary */
    on('a11y-dict-btn', 'click', function () {
      if (state.showDict) {
        hideDictPopup();
        announce('Dictionary closed');
      } else {
        announce('Dictionary open. Select a single word on the page to look it up.');
        state.showDict = true;
        showDictPopup('Select a word', 'Highlight any single word on the page to see its definition here.');
      }
    });
    on('a11y-dict-close', 'click', hideDictPopup);

    /* Text mode */
    on('a11y-text-btn', 'click', function () {
      state.textMode = !state.textMode;
      applyStyles(); updateToolbarActiveStates();
      announce(state.textMode ? 'Text mode on — images hidden' : 'Text mode off');
    });

    /* Margins */
    on('a11y-margins-btn', 'click', function () {
      state.narrowMargins = !state.narrowMargins;
      applyStyles(); updateToolbarActiveStates(); persist();
      announce(state.narrowMargins ? 'Narrow margins on' : 'Narrow margins off');
    });

    /* Language */
    on('a11y-lang-btn', 'click', function (e) {
      e.stopPropagation();
      var isOpen = document.getElementById('a11y-lang-menu').style.display !== 'none';
      closeAllDropdowns();
      if (!isOpen) { document.getElementById('a11y-lang-menu').style.display = 'block'; }
      document.getElementById('a11y-lang-btn').setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
    delegate('a11y-lang-menu', '[data-lang]', 'click', function (e) {
      state.language = e.target.getAttribute('data-lang');
      closeAllDropdowns();
      updateToolbarActiveStates(); persist();
      announce('Language set to ' + state.language);
    });

    /* Settings (reading speed) */
    on('a11y-settings-btn', 'click', function (e) {
      e.stopPropagation();
      var isOpen = document.getElementById('a11y-settings-menu').style.display !== 'none';
      closeAllDropdowns();
      if (!isOpen) { document.getElementById('a11y-settings-menu').style.display = 'block'; }
      document.getElementById('a11y-settings-btn').setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });
    delegate('a11y-settings-menu', '[data-speed-idx]', 'click', function (e) {
      state.readingSpeed = parseInt(e.target.getAttribute('data-speed-idx'), 10);
      closeAllDropdowns();
      updateToolbarActiveStates(); persist();
      announce('Reading speed: ' + READING_SPEEDS[state.readingSpeed].label);
    });

    /* Reset */
    on('a11y-reset-btn', 'click', reset);

    /* Close */
    on('a11y-close-btn', 'click', function () {
      state.isOpen = false;
      stopSpeech();
      closeAllDropdowns();
      render();
      announce('Accessibility toolbar closed');
    });

    /* Mouse move — ruler + magnifier */
    document.addEventListener('mousemove', function (e) {
      if (state.showRuler || state.showMask) { updateRuler(e.clientY); }
      if (state.showMagnifier) { updateMagnifier(e.clientX, e.clientY); }
    });

    /* Text selection for dictionary */
    document.addEventListener('mouseup', handleTextSelect);

    /* Close dropdowns on outside click */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.a11y-dropdown-wrap')) {
        closeAllDropdowns();
      }
    });

    /* ESC closes toolbar or dropdowns */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (state.fontMenuOpen || state.colorMenuOpen || state.langMenuOpen || state.settingsOpen) {
          closeAllDropdowns();
        } else if (state.isOpen) {
          state.isOpen = false;
          stopSpeech();
          render();
          var launch = document.getElementById('a11y-launch-btn');
          if (launch) { launch.focus(); }
          announce('Accessibility toolbar closed');
        }
      }
    });
  }

  /* ============================================================
     HELPERS
     ============================================================ */
  function on(id, event, handler) {
    var el = document.getElementById(id);
    if (el) { el.addEventListener(event, handler); }
  }

  function delegate(parentId, selector, event, handler) {
    var parent = document.getElementById(parentId);
    if (!parent) { return; }
    parent.addEventListener(event, function (e) {
      var target = e.target.closest(selector);
      if (target) { handler({ target: target }); }
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    /* Remove the old simple a11y bar if present (we replace it) */
    var oldBar = document.querySelector('.gcc-a11y-bar');
    if (oldBar) { oldBar.parentNode.removeChild(oldBar); }

    /* Inject toolbar root */
    var root = buildToolbar();
    document.body.insertBefore(root, document.body.firstChild);

    /* Wire interactions */
    wireEvents();

    /* Apply any persisted settings */
    applyStyles();
    updateToolbarActiveStates();

    /* If toolbar was open before reload, restore */
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
