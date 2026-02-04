/**
 * Gloucester City Council - Main JavaScript
 * Handles navigation, search, and general interactions
 * Fully keyboard accessible
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSearch();
        initNotificationBanner();
        initAlertBanner();
        initKeyboardNavigation();
    });

    /**
     * Mobile menu toggle
     */
    function initMobileMenu() {
        var menuToggle = document.getElementById('menu-toggle');
        var mainMenu = document.getElementById('main-menu');

        if (!menuToggle || !mainMenu) return;

        menuToggle.addEventListener('click', function() {
            var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('is-open');

            // Update toggle text for screen readers
            var toggleText = menuToggle.querySelector('.menu-toggle-text');
            if (toggleText) {
                toggleText.textContent = isExpanded ? 'Menu' : 'Close menu';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mainMenu.classList.contains('is-open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.remove('is-open');
                menuToggle.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mainMenu.classList.contains('is-open') &&
                !mainMenu.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainMenu.classList.remove('is-open');
            }
        });
    }

    /**
     * Search functionality
     */
    function initSearch() {
        var searchInput = document.getElementById('site-search');

        if (!searchInput) return;

        // Clear placeholder on focus for better accessibility
        searchInput.addEventListener('focus', function() {
            this.setAttribute('data-placeholder', this.placeholder);
            // Keep placeholder visible but reduce opacity handled in CSS
        });

        // Handle search form submission
        var searchForm = searchInput.closest('form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(event) {
                var query = searchInput.value.trim();
                if (!query) {
                    event.preventDefault();
                    searchInput.focus();
                    // Announce to screen readers
                    announceToScreenReader('Please enter a search term');
                }
            });
        }

        // Add search suggestions (basic autocomplete)
        var commonSearches = [
            'council tax',
            'bin collection',
            'planning application',
            'housing',
            'benefits',
            'parking',
            'pay council tax',
            'recycling',
            'report a problem'
        ];

        // Create datalist for autocomplete
        var datalist = document.createElement('datalist');
        datalist.id = 'search-suggestions';
        commonSearches.forEach(function(term) {
            var option = document.createElement('option');
            option.value = term;
            datalist.appendChild(option);
        });
        document.body.appendChild(datalist);
        searchInput.setAttribute('list', 'search-suggestions');
    }

    /**
     * Notification banner
     */
    function initNotificationBanner() {
        var banner = document.getElementById('notification-banner');
        var closeBtn = document.getElementById('notification-close');
        var textEl = document.getElementById('notification-text');

        if (!banner || !closeBtn || !textEl) return;

        // Check for stored notification
        var notification = sessionStorage.getItem('council-notification');
        if (notification) {
            try {
                var data = JSON.parse(notification);
                if (data.message && !data.dismissed) {
                    textEl.textContent = data.message;
                    banner.hidden = false;
                }
            } catch (e) {
                // Invalid data, ignore
            }
        }

        closeBtn.addEventListener('click', function() {
            banner.hidden = true;
            // Store dismissal
            try {
                var data = JSON.parse(sessionStorage.getItem('council-notification') || '{}');
                data.dismissed = true;
                sessionStorage.setItem('council-notification', JSON.stringify(data));
            } catch (e) {
                // Storage error, ignore
            }
            announceToScreenReader('Notification closed');
        });
    }

    /**
     * Alert banner (Bootstrap-style for temporary info)
     */
    function initAlertBanner() {
        var alertSection = document.getElementById('alert-section');
        var alertText = document.getElementById('alert-text');

        if (!alertSection || !alertText) return;

        // Check for stored alert
        var alert = sessionStorage.getItem('council-alert');
        if (alert) {
            try {
                var data = JSON.parse(alert);
                if (data.message && data.active) {
                    alertText.textContent = data.message;
                    alertSection.hidden = false;
                }
            } catch (e) {
                // Invalid data, ignore
            }
        }
    }

    /**
     * Enhanced keyboard navigation
     */
    function initKeyboardNavigation() {
        // Add visible focus indicators
        document.body.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.body.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });

        // Service grid keyboard navigation
        var serviceLinks = document.querySelectorAll('.service-link');
        serviceLinks.forEach(function(link, index) {
            link.addEventListener('keydown', function(event) {
                var row = 4; // Approximate items per row
                var newIndex;

                switch(event.key) {
                    case 'ArrowRight':
                        newIndex = Math.min(index + 1, serviceLinks.length - 1);
                        break;
                    case 'ArrowLeft':
                        newIndex = Math.max(index - 1, 0);
                        break;
                    case 'ArrowDown':
                        newIndex = Math.min(index + row, serviceLinks.length - 1);
                        break;
                    case 'ArrowUp':
                        newIndex = Math.max(index - row, 0);
                        break;
                    default:
                        return;
                }

                if (newIndex !== undefined && newIndex !== index) {
                    event.preventDefault();
                    serviceLinks[newIndex].focus();
                }
            });
        });
    }

    /**
     * Announce message to screen readers
     */
    function announceToScreenReader(message) {
        var announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'visually-hidden';
        announcement.textContent = message;
        document.body.appendChild(announcement);

        // Remove after announcement
        setTimeout(function() {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Expose announce function globally for other scripts
    window.announceToScreenReader = announceToScreenReader;

})();
