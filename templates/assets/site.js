/* ============================================================
   Gloucester City Council — Page Templates
   Shared site JS
   ------------------------------------------------------------
   Responsibilities:
     1. Accessibility widget (text size, contrast, theme, spacing,
        dyslexia-friendly font, motion, and Reading Ruler).
     2. Persistence of user preferences via localStorage.
     3. Notification banner dismiss handling.
     4. Reading Ruler overlay that follows the cursor.
     5. Light progressive-enhancement for forms used by the
        transaction template (inline validation messages).

   This file is intentionally framework-free, vanilla JS, so the
   templates work in any environment with no build step.
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     0. Module state — hoisted so apply() can safely call
     setRulerActive() before the ruler section is reached.
     -------------------------------------------------------- */
  let rulerEls = null;
  let rulerY = (typeof window !== 'undefined') ? window.innerHeight / 2 : 0;
  const RULER_HEIGHT = 44; // must match .reading-ruler-band CSS height

  /* --------------------------------------------------------
     1. Preferences — load / save / apply
     -------------------------------------------------------- */
  const STORAGE_KEY = 'gcc-a11y-prefs';

  // Defaults match the "out-of-the-box" experience. Any new
  // preference must be added here AND wired in apply()/the panel.
  const defaults = {
    textsize: 'md',     // md | lg | xl | xxl
    contrast: 'normal', // normal | high
    theme:    'light',  // light | dark
    spacing:  'normal', // normal | loose
    font:     'default',// default | dyslexic
    motion:   'normal', // normal | reduced
    ruler:    'off'     // off | line | strip
  };

  function load() {
    try {
      return Object.assign({}, defaults,
        JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    } catch (e) { return Object.assign({}, defaults); }
  }
  function save(p) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
    catch (e) { /* private mode etc. — ignore */ }
  }

  // Reflect the prefs onto <html data-*> attributes so the CSS
  // rules (in styles.css / a11y.css) can pick them up.
  function apply(p) {
    const root = document.documentElement;
    root.dataset.textsize = p.textsize;
    root.dataset.contrast = p.contrast;
    root.dataset.theme    = p.theme;
    root.dataset.spacing  = p.spacing;
    root.dataset.font     = p.font;
    root.dataset.motion   = p.motion;
    root.dataset.ruler    = p.ruler;
    // When the ruler is off, hide the overlay completely.
    setRulerActive(p.ruler !== 'off');
  }

  let prefs = load();
  apply(prefs);

  function setPref(key, value) {
    prefs[key] = value;
    save(prefs);
    apply(prefs);
    syncPanel();
    // Announce changes to screen-reader users.
    announce(humanLabel(key, value));
  }

  function reset() {
    prefs = Object.assign({}, defaults);
    save(prefs);
    apply(prefs);
    syncPanel();
    announce('Accessibility settings reset to defaults');
  }

  // Reflect current prefs onto every aria-pressed button.
  function syncPanel() {
    const panel = document.getElementById('a11y-panel');
    if (!panel) return;
    panel.querySelectorAll('[data-a11y-key]').forEach(btn => {
      const k = btn.dataset.a11yKey;
      const v = btn.dataset.a11yValue;
      btn.setAttribute('aria-pressed', prefs[k] === v ? 'true' : 'false');
    });
  }

  // Pretty announcement text for the live region.
  function humanLabel(key, value) {
    const map = {
      textsize: { md: 'default size', lg: 'large text', xl: 'larger text', xxl: 'largest text' },
      contrast: { normal: 'standard contrast', high: 'high contrast' },
      theme:    { light: 'light theme', dark: 'dark theme' },
      spacing:  { normal: 'normal spacing', loose: 'wide spacing' },
      font:     { default: 'default font', dyslexic: 'dyslexia-friendly font' },
      motion:   { normal: 'motion allowed', reduced: 'motion reduced' },
      ruler:    { off: 'reading ruler off', line: 'reading ruler line', strip: 'reading ruler strip' }
    };
    return (map[key] && map[key][value]) || 'setting changed';
  }

  // Polite live region — created once, reused for every change.
  let liveRegion;
  function announce(msg) {
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'visually-hidden';
      document.body.appendChild(liveRegion);
    }
    // Clear-then-set so the same message re-announces.
    liveRegion.textContent = '';
    setTimeout(() => { liveRegion.textContent = msg; }, 30);
  }

  /* --------------------------------------------------------
     2. Build the accessibility widget
     -------------------------------------------------------- */
  function buildWidget() {
    if (document.getElementById('a11y-toggle')) return;

    // The toggle button is injected into .header-inner so it sits in the top bar.
    // The panel is appended to <body> separately so stacking context is never clipped.
    const toggleWrap = document.createElement('div');
    toggleWrap.className = 'a11y-widget';
    toggleWrap.innerHTML = `
      <button type="button" id="a11y-toggle" class="a11y-toggle"
        aria-expanded="false" aria-controls="a11y-panel"
        aria-label="Accessibility tools">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="4" r="2"/>
          <path d="M19 13c-2.5.6-4.5 1-7 1s-4.5-.4-7-1"/>
          <path d="M12 5v9"/>
          <path d="M9 22l3-8 3 8"/>
        </svg>
        <span>Accessibility</span>
      </button>
    `;

    const panelWrap = document.createElement('div');
    panelWrap.innerHTML = `
      <div id="a11y-panel" class="a11y-panel" role="dialog" aria-labelledby="a11y-title" hidden>
        <div class="a11y-panel-head">
          <h2 id="a11y-title">Accessibility tools</h2>
          <button type="button" class="a11y-close" aria-label="Close accessibility tools">×</button>
        </div>
        <p class="a11y-intro">Adjust how this site looks. Your choices are saved on this device.</p>

        <fieldset class="a11y-group">
          <legend>Text size</legend>
          <div class="a11y-row" role="group" aria-label="Text size">
            <button type="button" data-a11y-key="textsize" data-a11y-value="md"  class="a11y-opt"><span style="font-size:.85rem">A</span><span>Default</span></button>
            <button type="button" data-a11y-key="textsize" data-a11y-value="lg"  class="a11y-opt"><span style="font-size:1rem">A</span><span>Large</span></button>
            <button type="button" data-a11y-key="textsize" data-a11y-value="xl"  class="a11y-opt"><span style="font-size:1.2rem">A</span><span>Larger</span></button>
            <button type="button" data-a11y-key="textsize" data-a11y-value="xxl" class="a11y-opt"><span style="font-size:1.4rem">A</span><span>Largest</span></button>
          </div>
        </fieldset>

        <fieldset class="a11y-group">
          <legend>Contrast and theme</legend>
          <div class="a11y-row" role="group" aria-label="Contrast">
            <button type="button" data-a11y-key="contrast" data-a11y-value="normal" class="a11y-opt">Standard</button>
            <button type="button" data-a11y-key="contrast" data-a11y-value="high"   class="a11y-opt">High contrast</button>
          </div>
          <div class="a11y-row" role="group" aria-label="Theme">
            <button type="button" data-a11y-key="theme" data-a11y-value="light" class="a11y-opt">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>
              Light
            </button>
            <button type="button" data-a11y-key="theme" data-a11y-value="dark"  class="a11y-opt">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>
              Dark
            </button>
          </div>
        </fieldset>

        <fieldset class="a11y-group">
          <legend>Reading aids</legend>
          <div class="a11y-row" role="group" aria-label="Font">
            <button type="button" data-a11y-key="font" data-a11y-value="default"  class="a11y-opt">Default font</button>
            <button type="button" data-a11y-key="font" data-a11y-value="dyslexic" class="a11y-opt">Dyslexia-friendly</button>
          </div>
          <div class="a11y-row" role="group" aria-label="Text spacing">
            <button type="button" data-a11y-key="spacing" data-a11y-value="normal" class="a11y-opt">Normal spacing</button>
            <button type="button" data-a11y-key="spacing" data-a11y-value="loose"  class="a11y-opt">Wide spacing</button>
          </div>
        </fieldset>

        <fieldset class="a11y-group">
          <legend>Reading ruler</legend>
          <p class="a11y-intro" style="margin:0 0 8px;">A horizontal bar that follows your cursor to help you keep your place. Move the mouse or press the arrow keys.</p>
          <div class="a11y-row" role="group" aria-label="Reading ruler">
            <button type="button" data-a11y-key="ruler" data-a11y-value="off"   class="a11y-opt">Off</button>
            <button type="button" data-a11y-key="ruler" data-a11y-value="line"  class="a11y-opt">Line</button>
            <button type="button" data-a11y-key="ruler" data-a11y-value="strip" class="a11y-opt">Strip</button>
          </div>
        </fieldset>

        <fieldset class="a11y-group">
          <legend>Motion</legend>
          <div class="a11y-row" role="group" aria-label="Motion">
            <button type="button" data-a11y-key="motion" data-a11y-value="normal"  class="a11y-opt">Allow motion</button>
            <button type="button" data-a11y-key="motion" data-a11y-value="reduced" class="a11y-opt">Reduce motion</button>
          </div>
        </fieldset>

        <div class="a11y-foot">
          <button type="button" class="a11y-reset">Reset to defaults</button>
          <a href="#">Accessibility statement</a>
        </div>
      </div>
    `;

    // Inject toggle into the header's inner flex row; fall back to body.
    const headerInner = document.querySelector('.header-inner');
    if (headerInner) {
      headerInner.appendChild(toggleWrap);
    } else {
      document.body.appendChild(toggleWrap);
    }
    document.body.appendChild(panelWrap);

    const toggle = document.getElementById('a11y-toggle');
    const panel  = document.getElementById('a11y-panel');
    const close  = panelWrap.querySelector('.a11y-close');

    // Position the panel directly below the site header.
    function positionPanel() {
      const header = document.querySelector('.site-header');
      if (!header) return;
      const bottom = header.getBoundingClientRect().bottom;
      panel.style.top = Math.round(bottom + 8) + 'px';
      panel.style.maxHeight = Math.round(window.innerHeight - bottom - 24) + 'px';
    }

    // Focus management — when the panel opens, move focus into it,
    // and when it closes, return focus to the toggle button.
    function openPanel() {
      panel.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      positionPanel();
      panel.querySelector('.a11y-close').focus();
    }
    function closePanel() {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
    toggle.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());
    close.addEventListener('click', closePanel);
    window.addEventListener('resize', () => { if (!panel.hidden) positionPanel(); });

    // Escape closes the panel from anywhere on the page.
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !panel.hidden) closePanel();
    });

    // Click outside the panel (and outside the toggle) closes it too.
    document.addEventListener('click', e => {
      if (panel.hidden) return;
      if (panel.contains(e.target) || toggle.contains(e.target)) return;
      closePanel();
    });

    // Wire each option button.
    panelWrap.querySelectorAll('[data-a11y-key]').forEach(btn => {
      btn.addEventListener('click',
        () => setPref(btn.dataset.a11yKey, btn.dataset.a11yValue));
    });
    panelWrap.querySelector('.a11y-reset').addEventListener('click', reset);

    syncPanel();
  }

  /* --------------------------------------------------------
     3. Notification banner dismiss
     -------------------------------------------------------- */
  function notificationDismiss() {
    document.querySelectorAll('[data-dismissible]').forEach(b => {
      const key = 'gcc-dismiss-' + (b.dataset.dismissible || b.id || 'banner');
      if (localStorage.getItem(key) === '1') { b.style.display = 'none'; return; }
      const x = b.querySelector('.nb-close');
      if (x) x.addEventListener('click', () => {
        b.style.display = 'none';
        try { localStorage.setItem(key, '1'); } catch (e) {}
      });
    });
  }

  /* --------------------------------------------------------
     4. Reading Ruler overlay
     - Two fixed-position elements layered over the page:
         band   : the highlighted reading bar
         masks  : dim above/below in "strip" mode
     - Position follows the mouse Y. When the keyboard is used,
       the ruler tracks the focused element's vertical centre.
     - Up/Down arrows nudge the ruler 24px at a time so people
       reading with a screen magnifier can fine-tune position.
     - State (rulerEls, rulerY, RULER_HEIGHT) is declared at the
       top of the IIFE so apply() can safely call setRulerActive
       during initial load before this section is reached.
     -------------------------------------------------------- */

  function ensureRulerEls() {
    if (rulerEls) return rulerEls;
    const band = document.createElement('div');
    band.className = 'reading-ruler-band';
    band.setAttribute('aria-hidden', 'true');

    const maskTop = document.createElement('div');
    maskTop.className = 'reading-ruler-mask top';
    maskTop.setAttribute('aria-hidden', 'true');

    const maskBot = document.createElement('div');
    maskBot.className = 'reading-ruler-mask bottom';
    maskBot.setAttribute('aria-hidden', 'true');

    document.body.appendChild(maskTop);
    document.body.appendChild(band);
    document.body.appendChild(maskBot);

    rulerEls = { band, maskTop, maskBot };
    positionRuler(rulerY);
    return rulerEls;
  }

  function positionRuler(y) {
    if (!rulerEls) return;
    rulerY = Math.max(0, Math.min(window.innerHeight - RULER_HEIGHT, y));
    const top = rulerY;
    const bottom = rulerY + RULER_HEIGHT;
    rulerEls.band.style.top    = top + 'px';
    rulerEls.maskTop.style.height = top + 'px';
    rulerEls.maskTop.style.top    = '0';
    rulerEls.maskBot.style.top    = bottom + 'px';
    rulerEls.maskBot.style.height = (window.innerHeight - bottom) + 'px';
  }

  function onMouseMove(e) { positionRuler(e.clientY - RULER_HEIGHT / 2); }
  function onFocusChange(e) {
    const r = e.target.getBoundingClientRect && e.target.getBoundingClientRect();
    if (r && r.height < window.innerHeight) {
      positionRuler(r.top + r.height / 2 - RULER_HEIGHT / 2);
    }
  }
  function onKey(e) {
    if (document.documentElement.dataset.ruler === 'off') return;
    // Use Alt+Arrow so we don't fight normal scrolling.
    if (!e.altKey) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); positionRuler(rulerY + 24); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); positionRuler(rulerY - 24); }
  }
  function onResize() { positionRuler(rulerY); }

  function setRulerActive(active) {
    if (active) {
      ensureRulerEls();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('focusin', onFocusChange);
      document.addEventListener('keydown', onKey);
      window.addEventListener('resize', onResize);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('focusin', onFocusChange);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    }
  }

  /* --------------------------------------------------------
     5. Transaction form — light progressive validation.
        Pages that DON'T use forms simply have no [data-validate]
        and this code does nothing.
     -------------------------------------------------------- */
  function wireForms() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      const summary = form.querySelector('[data-error-summary]');
      form.setAttribute('novalidate', 'novalidate');
      form.addEventListener('submit', e => {
        const errors = [];
        form.querySelectorAll('[required]').forEach(input => {
          const group = input.closest('.form-group');
          const label = group?.querySelector('label,legend')?.textContent.trim() || input.name;
          const valid = input.checkValidity() && input.value.trim() !== '';
          if (group) group.classList.toggle('has-error', !valid);
          const err = group?.querySelector('.form-error');
          if (err) err.hidden = valid;
          if (!valid) errors.push({ id: input.id, label });
        });
        if (errors.length) {
          e.preventDefault();
          if (summary) {
            const list = summary.querySelector('ul');
            list.innerHTML = '';
            errors.forEach(err => {
              const li = document.createElement('li');
              li.innerHTML = `<a href="#${err.id}">${err.label} — please answer this question</a>`;
              list.appendChild(li);
            });
            summary.hidden = false;
            summary.setAttribute('tabindex', '-1');
            summary.focus();
            window.scrollTo({ top: summary.getBoundingClientRect().top + window.scrollY - 16, behavior: 'smooth' });
          }
        } else {
          // Demo only — the template doesn't submit anywhere.
          e.preventDefault();
          const ok = form.querySelector('[data-success]');
          if (ok) {
            ok.hidden = false;
            ok.setAttribute('tabindex', '-1');
            ok.focus();
          }
        }
      });
    });
  }

  /* --------------------------------------------------------
     6. In-page anchor target focus — WCAG 2.4.3
        When users click a same-page anchor link (e.g. from a
        .tab-bar) the browser scrolls but may not move focus to
        the target if the element is not natively focusable.
        This adds tabindex="-1" to any element that is the
        destination of a same-page link, so the browser can
        move focus there on activation.
     -------------------------------------------------------- */
  function makeAnchorTargetsFocusable() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target && !target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
    });
  }

  /* --------------------------------------------------------
     7. Primary navigation — keyboard enhancement
        Arrow Left / Right moves focus between sibling links
        inside .primary-nav so power-keyboard users can scan
        the nav quickly without repeatedly pressing Tab.
        Tab / Shift-Tab still exit the nav normally.
     -------------------------------------------------------- */
  function wirePrimaryNav() {
    const nav = document.querySelector('.primary-nav');
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll('a'));
    links.forEach((link, i) => {
      link.addEventListener('keydown', e => {
        let target = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          target = links[(i + 1) % links.length];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          target = links[(i - 1 + links.length) % links.length];
        } else if (e.key === 'Home') {
          target = links[0];
        } else if (e.key === 'End') {
          target = links[links.length - 1];
        }
        if (target) { e.preventDefault(); target.focus(); }
      });
    });
  }

  /* --------------------------------------------------------
     8. Init
     -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildWidget();
    notificationDismiss();
    wireForms();
    makeAnchorTargetsFocusable();
    wirePrimaryNav();
  });
})();
