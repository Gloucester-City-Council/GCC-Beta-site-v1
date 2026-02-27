/**
 * Pete-Taxi-site-v1 — Gloucester City Council
 * JavaScript: navigation, accessibility, accordion, tabs
 */

'use strict';

/* ============================================================
   Utility helpers
   ============================================================ */
function $(selector, root) { return (root || document).querySelector(selector); }
function $$(selector, root) { return Array.from((root || document).querySelectorAll(selector)); }

/* ============================================================
   High contrast toggle
   ============================================================ */
function initContrastToggle() {
  const btn = $('#contrast-toggle');
  if (!btn) return;

  const KEY = 'gcc-taxi-high-contrast';
  const saved = localStorage.getItem(KEY) === 'true';

  if (saved) {
    document.body.classList.add('high-contrast');
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = 'Standard view';
  }

  btn.addEventListener('click', function () {
    const isHigh = document.body.classList.toggle('high-contrast');
    btn.setAttribute('aria-pressed', String(isHigh));
    btn.textContent = isHigh ? 'Standard view' : 'High contrast';
    localStorage.setItem(KEY, String(isHigh));
  });
}

/* ============================================================
   Mobile navigation toggle
   ============================================================ */
function initMobileNav() {
  const toggle = $('#nav-toggle');
  const navList = $('#nav-list');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', function () {
    const open = navList.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.toggle-label').textContent = open ? 'Close menu' : 'Menu';
  });

  // Close nav when a link is clicked (mobile)
  $$('a', navList).forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        navList.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelector('.toggle-label').textContent = 'Menu';
      }
    });
  });
}

/* ============================================================
   Accordion
   ============================================================ */
function initAccordions() {
  $$('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      trigger.setAttribute('aria-expanded', String(!expanded));
      if (content) {
        content.classList.toggle('open', !expanded);
      }
    });

    // Keyboard: Enter / Space already handled by button default
  });
}

/* ============================================================
   Tabs
   ============================================================ */
function initTabs() {
  $$('[role="tablist"]').forEach(function (tablist) {
    const tabs = $$('[role="tab"]', tablist);
    const panels = $$('[role="tabpanel"]');

    function activateTab(tab) {
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      panels.forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      const panelId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { activateTab(tab); });

      tab.addEventListener('keydown', function (e) {
        let newIndex = index;
        if (e.key === 'ArrowRight') { newIndex = (index + 1) % tabs.length; }
        else if (e.key === 'ArrowLeft') { newIndex = (index - 1 + tabs.length) % tabs.length; }
        else if (e.key === 'Home') { newIndex = 0; }
        else if (e.key === 'End') { newIndex = tabs.length - 1; }
        else { return; }
        e.preventDefault();
        activateTab(tabs[newIndex]);
        tabs[newIndex].focus();
      });
    });

    // Activate first tab by default
    if (tabs.length > 0) { activateTab(tabs[0]); }
  });
}

/* ============================================================
   Smooth scroll for anchor links
   ============================================================ */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.getElementById(this.getAttribute('href').slice(1));
      if (!target) return;

      // Respect reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}

/* ============================================================
   Mark active nav link
   ============================================================ */
function initActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  $$('.nav-list a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ============================================================
   Dismiss notification banner
   ============================================================ */
function initDismissBanner() {
  const btn = $('#dismiss-banner');
  const banner = $('#notification-banner');
  if (!btn || !banner) return;

  btn.addEventListener('click', function () {
    banner.setAttribute('hidden', '');
    sessionStorage.setItem('gcc-taxi-banner-dismissed', 'true');
  });

  if (sessionStorage.getItem('gcc-taxi-banner-dismissed') === 'true') {
    banner.setAttribute('hidden', '');
  }
}

/* ============================================================
   Back to top
   ============================================================ */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('h1') && $('h1').focus();
  });
}

/* ============================================================
   Init all
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initContrastToggle();
  initMobileNav();
  initAccordions();
  initTabs();
  initSmoothScroll();
  initActiveNav();
  initDismissBanner();
  initBackToTop();
});
