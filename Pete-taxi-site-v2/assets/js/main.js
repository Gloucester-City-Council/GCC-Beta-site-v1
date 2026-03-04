/**
 * Pete-taxi-site-v2 — Main JavaScript
 * Gloucester City Council
 * WCAG 2.2 AA compliant
 */

'use strict';

/* ============================================================
   TABS — accessible keyboard-navigable tab interface
   ============================================================ */
function initTabs() {
  var tabGroups = document.querySelectorAll('[data-tabs]');

  tabGroups.forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    var panels = group.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab, tabs, panels);
      });

      tab.addEventListener('keydown', function (e) {
        var idx = Array.prototype.indexOf.call(tabs, tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          var next = tabs[(idx + 1) % tabs.length];
          next.focus();
          activateTab(next, tabs, panels);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          var prev = tabs[(idx - 1 + tabs.length) % tabs.length];
          prev.focus();
          activateTab(prev, tabs, panels);
        }
        if (e.key === 'Home') {
          e.preventDefault();
          tabs[0].focus();
          activateTab(tabs[0], tabs, panels);
        }
        if (e.key === 'End') {
          e.preventDefault();
          tabs[tabs.length - 1].focus();
          activateTab(tabs[tabs.length - 1], tabs, panels);
        }
      });
    });
  });
}

function activateTab(tab, tabs, panels) {
  tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
  panels.forEach(function (p) { p.hidden = true; });
  tab.setAttribute('aria-selected', 'true');
  var panelId = tab.getAttribute('aria-controls');
  var panel = document.getElementById(panelId);
  if (panel) { panel.hidden = false; }
}

/* ============================================================
   HIGH CONTRAST TOGGLE
   ============================================================ */
function initContrastToggle() {
  var btn = document.getElementById('contrast-toggle');
  if (!btn) { return; }

  var saved = localStorage.getItem('gcc-theme') || 'default';
  applyTheme(saved, btn);

  btn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'high-contrast' ? 'default' : 'high-contrast';
    applyTheme(next, btn);
    localStorage.setItem('gcc-theme', next);
    announce(next === 'high-contrast' ? 'High contrast mode on' : 'High contrast mode off');
  });
}

function applyTheme(theme, btn) {
  document.documentElement.setAttribute('data-theme', theme);
  var isHC = theme === 'high-contrast';
  if (btn) {
    btn.setAttribute('aria-pressed', isHC ? 'true' : 'false');
    btn.querySelector('.gcc-a11y-btn__label').textContent = isHC ? 'Standard contrast' : 'High contrast';
  }
}

/* ============================================================
   LIVE REGION ANNOUNCER (screen reader)
   ============================================================ */
function announce(message) {
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
  setTimeout(function () { live.textContent = message; }, 50);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initTabs();
  initContrastToggle();
});
