/**
 * Gloucester City Council – Beta Website Sample v5
 * JavaScript – accessibility, navigation and interactivity
 * WCAG 2.2 AA compliant
 */

'use strict';

/* =========================================================================
   1. DOCUMENT READY
   ========================================================================= */
document.addEventListener('DOMContentLoaded', function () {
  initAccessibilityToolbar();
  initMobileNav();
  initDropdownMenus();
  initNotificationBanner();
  initSearchForm();
  setCurrentYear();
  restoreUserPreferences();
});

/* =========================================================================
   2. ACCESSIBILITY TOOLBAR
   ========================================================================= */
function initAccessibilityToolbar() {
  const btnTextSize    = document.getElementById('btn-text-size');
  const btnHighContrast = document.getElementById('btn-high-contrast');

  if (btnTextSize) {
    btnTextSize.addEventListener('click', function () {
      const isActive = document.body.classList.toggle('large-text');
      this.setAttribute('aria-pressed', String(isActive));
      this.classList.toggle('active', isActive);
      savePreference('largeText', isActive);
      announceToScreenReader(isActive ? 'Larger text enabled.' : 'Text size reset to normal.');
    });
  }

  if (btnHighContrast) {
    btnHighContrast.addEventListener('click', function () {
      const isActive = document.body.classList.toggle('high-contrast');
      this.setAttribute('aria-pressed', String(isActive));
      this.classList.toggle('active', isActive);
      savePreference('highContrast', isActive);
      announceToScreenReader(isActive ? 'High contrast mode enabled.' : 'Standard contrast restored.');
    });
  }
}

/* =========================================================================
   3. MOBILE NAVIGATION TOGGLE
   ========================================================================= */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('primary-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!isExpanded));
    nav.classList.toggle('is-open', !isExpanded);

    // Update toggle icon label
    this.querySelector('span.sr-only') &&
      (this.querySelector('span.sr-only').textContent =
        isExpanded ? 'Open navigation menu' : 'Close navigation menu');
  });

  // Close nav when clicking outside
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* =========================================================================
   4. DROPDOWN MENUS (keyboard + mouse)
   ========================================================================= */
function initDropdownMenus() {
  const navButtons = document.querySelectorAll('.primary-nav__link[aria-haspopup="true"]');

  navButtons.forEach(function (btn) {
    const dropdownId = btn.getAttribute('aria-controls');
    const dropdown   = dropdownId ? document.getElementById(dropdownId) : null;

    if (!dropdown) return;

    // Toggle on click
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Close all other dropdowns first
      closeAllDropdowns(btn);

      // Toggle this one
      this.setAttribute('aria-expanded', String(!isExpanded));
      dropdown.classList.toggle('is-open', !isExpanded);

      // Focus first item when opening
      if (!isExpanded) {
        const firstLink = dropdown.querySelector('a');
        if (firstLink) {
          setTimeout(function () { firstLink.focus(); }, 50);
        }
      }
    });

    // Keyboard navigation within dropdown
    dropdown.addEventListener('keydown', function (e) {
      const links = Array.from(dropdown.querySelectorAll('a'));
      const idx   = links.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        links[(idx + 1) % links.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        links[(idx - 1 + links.length) % links.length].focus();
      } else if (e.key === 'Escape' || e.key === 'Tab') {
        closeDropdown(btn, dropdown);
        if (e.key === 'Escape') btn.focus();
      }
    });
  });

  // Close all dropdowns when clicking outside nav
  document.addEventListener('click', function () {
    closeAllDropdowns();
  });

  // Close on Escape anywhere
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });
}

function closeDropdown(btn, dropdown) {
  btn.setAttribute('aria-expanded', 'false');
  dropdown.classList.remove('is-open');
}

function closeAllDropdowns(except) {
  const navButtons = document.querySelectorAll('.primary-nav__link[aria-haspopup="true"]');
  navButtons.forEach(function (btn) {
    if (btn === except) return;
    const dropdownId = btn.getAttribute('aria-controls');
    const dropdown   = dropdownId ? document.getElementById(dropdownId) : null;
    if (dropdown) closeDropdown(btn, dropdown);
  });
}

/* =========================================================================
   5. NOTIFICATION BANNER DISMISS
   ========================================================================= */
function initNotificationBanner() {
  const closeBtn = document.getElementById('close-banner');
  const banner   = document.getElementById('notification-banner');

  if (!closeBtn || !banner) return;

  // Check if already dismissed in this session
  if (sessionStorage.getItem('bannerDismissed') === 'true') {
    banner.style.display = 'none';
    return;
  }

  closeBtn.addEventListener('click', function () {
    // Animate out
    banner.style.transition = 'opacity 200ms ease-out, max-height 300ms ease-out';
    banner.style.opacity    = '0';
    banner.style.overflow   = 'hidden';
    banner.style.maxHeight  = banner.offsetHeight + 'px';

    setTimeout(function () {
      banner.style.maxHeight = '0';
      banner.style.padding   = '0';
    }, 10);

    setTimeout(function () {
      banner.setAttribute('hidden', '');
      banner.style.display = 'none';
      sessionStorage.setItem('bannerDismissed', 'true');
      // Announce to screen readers
      announceToScreenReader('Notice dismissed.');
    }, 310);
  });
}

/* =========================================================================
   6. SEARCH FORM – live hints
   ========================================================================= */
function initSearchForm() {
  const searchInput = document.getElementById('site-search');
  const searchHint  = document.getElementById('search-hint');

  if (!searchInput || !searchHint) return;

  // Example popular searches to suggest
  const suggestions = [
    { term: 'council tax', hint: 'Try: "pay council tax", "council tax reduction", "council tax bill"' },
    { term: 'bin',         hint: 'Try: "bin collection day", "missed bin", "recycling centre"' },
    { term: 'park',        hint: 'Try: "parking permit", "pay parking fine", "car park"' },
    { term: 'plan',        hint: 'Try: "planning application", "planning permission", "local plan"' },
    { term: 'hous',        hint: 'Try: "housing application", "report repair", "homelessness"' },
    { term: 'benef',       hint: 'Try: "Housing Benefit", "Council Tax Reduction", "cost of living"' },
  ];

  searchInput.addEventListener('input', function () {
    const val = this.value.toLowerCase().trim();
    searchHint.textContent = '';

    if (val.length < 2) return;

    const match = suggestions.find(s => val.startsWith(s.term.substring(0, val.length)) || s.term.startsWith(val));
    if (match) {
      searchHint.textContent = match.hint;
    }
  });
}

/* =========================================================================
   7. UTILITY – announce to screen readers via live region
   ========================================================================= */
function announceToScreenReader(message) {
  let live = document.getElementById('sr-live-region');
  if (!live) {
    live = document.createElement('div');
    live.id = 'sr-live-region';
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    live.className = 'sr-only';
    document.body.appendChild(live);
  }
  live.textContent = '';
  // Small delay so the DOM change triggers the announcement
  setTimeout(function () { live.textContent = message; }, 100);
}

/* =========================================================================
   8. SAVE / RESTORE USER PREFERENCES (localStorage)
   ========================================================================= */
function savePreference(key, value) {
  try {
    localStorage.setItem('gcc_' + key, JSON.stringify(value));
  } catch (e) {
    // Storage not available – silently ignore
  }
}

function getPreference(key) {
  try {
    const val = localStorage.getItem('gcc_' + key);
    return val !== null ? JSON.parse(val) : null;
  } catch (e) {
    return null;
  }
}

function restoreUserPreferences() {
  if (getPreference('highContrast') === true) {
    document.body.classList.add('high-contrast');
    const btn = document.getElementById('btn-high-contrast');
    if (btn) {
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('active');
    }
  }

  if (getPreference('largeText') === true) {
    document.body.classList.add('large-text');
    const btn = document.getElementById('btn-text-size');
    if (btn) {
      btn.setAttribute('aria-pressed', 'true');
      btn.classList.add('active');
    }
  }
}

/* =========================================================================
   9. SET CURRENT YEAR IN FOOTER COPYRIGHT
   ========================================================================= */
function setCurrentYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* =========================================================================
   10. SMOOTH FOCUS MANAGEMENT – main content skip link target
   ========================================================================= */
(function () {
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    // Ensure tabindex=-1 allows programmatic focus without a visible ring
    mainContent.addEventListener('focus', function () {
      // Remove the focus ring when focused programmatically via skip link
      // (the ring is handled by :focus-visible in CSS)
    });
  }
})();

/* =========================================================================
   11. PRINT YEAR UPDATE
   ========================================================================= */
window.addEventListener('beforeprint', function () {
  // Ensure dynamic content is rendered for print
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
});
