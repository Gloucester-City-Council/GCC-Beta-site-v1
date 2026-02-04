/**
 * Gloucester City Council - Accessibility JavaScript
 * Handles contrast modes, text sizing, and accessibility preferences
 * Fully keyboard accessible - WCAG 2.2 AA compliant
 */

(function() {
    'use strict';

    // Storage keys
    var STORAGE_KEYS = {
        CONTRAST: 'gcc-contrast-mode',
        TEXT_SIZE: 'gcc-text-size'
    };

    // Text size levels
    var TEXT_SIZES = ['default', 'large', 'xlarge'];

    // Contrast modes
    var CONTRAST_MODES = ['default', 'high', 'low', 'inverted'];

    // Current states
    var currentTextSizeIndex = 0;
    var currentContrastMode = 'default';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        loadPreferences();
        initContrastToggle();
        initTextSizeControls();
        initMediaQueryListeners();
    });

    /**
     * Load saved preferences from localStorage
     */
    function loadPreferences() {
        // Load contrast mode
        try {
            var savedContrast = localStorage.getItem(STORAGE_KEYS.CONTRAST);
            if (savedContrast && CONTRAST_MODES.indexOf(savedContrast) !== -1) {
                currentContrastMode = savedContrast;
                applyContrastMode(currentContrastMode);
            }
        } catch (e) {
            // localStorage not available
        }

        // Load text size
        try {
            var savedTextSize = localStorage.getItem(STORAGE_KEYS.TEXT_SIZE);
            if (savedTextSize) {
                var index = TEXT_SIZES.indexOf(savedTextSize);
                if (index !== -1) {
                    currentTextSizeIndex = index;
                    applyTextSize(TEXT_SIZES[currentTextSizeIndex]);
                }
            }
        } catch (e) {
            // localStorage not available
        }
    }

    /**
     * Initialize contrast toggle button
     */
    function initContrastToggle() {
        var contrastBtn = document.getElementById('contrast-toggle');
        if (!contrastBtn) return;

        // Update button state based on current mode
        updateContrastButtonState(contrastBtn);

        contrastBtn.addEventListener('click', function() {
            // Cycle through contrast modes
            var currentIndex = CONTRAST_MODES.indexOf(currentContrastMode);
            var nextIndex = (currentIndex + 1) % CONTRAST_MODES.length;
            currentContrastMode = CONTRAST_MODES[nextIndex];

            applyContrastMode(currentContrastMode);
            updateContrastButtonState(contrastBtn);
            savePreference(STORAGE_KEYS.CONTRAST, currentContrastMode);

            // Announce change to screen readers
            var modeNames = {
                'default': 'Default contrast',
                'high': 'High contrast',
                'low': 'Low contrast',
                'inverted': 'Dark mode'
            };
            announceChange(modeNames[currentContrastMode] + ' enabled');
        });
    }

    /**
     * Apply contrast mode to body
     */
    function applyContrastMode(mode) {
        // Remove all contrast classes
        CONTRAST_MODES.forEach(function(m) {
            document.body.classList.remove('contrast-' + m);
        });

        // Add new contrast class
        document.body.classList.add('contrast-' + mode);
    }

    /**
     * Update contrast button state
     */
    function updateContrastButtonState(button) {
        var isNonDefault = currentContrastMode !== 'default';
        button.setAttribute('aria-pressed', isNonDefault.toString());

        var labels = {
            'default': 'High contrast',
            'high': 'Low contrast',
            'low': 'Dark mode',
            'inverted': 'Default contrast'
        };
        button.textContent = labels[currentContrastMode];
    }

    /**
     * Initialize text size controls
     */
    function initTextSizeControls() {
        var increaseBtn = document.getElementById('text-size-increase');
        var decreaseBtn = document.getElementById('text-size-decrease');
        var resetBtn = document.getElementById('text-size-reset');

        if (increaseBtn) {
            increaseBtn.addEventListener('click', function() {
                if (currentTextSizeIndex < TEXT_SIZES.length - 1) {
                    currentTextSizeIndex++;
                    var size = TEXT_SIZES[currentTextSizeIndex];
                    applyTextSize(size);
                    savePreference(STORAGE_KEYS.TEXT_SIZE, size);
                    announceChange('Text size increased');
                } else {
                    announceChange('Maximum text size reached');
                }
                updateTextSizeButtons();
            });
        }

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', function() {
                if (currentTextSizeIndex > 0) {
                    currentTextSizeIndex--;
                    var size = TEXT_SIZES[currentTextSizeIndex];
                    applyTextSize(size);
                    savePreference(STORAGE_KEYS.TEXT_SIZE, size);
                    announceChange('Text size decreased');
                } else {
                    announceChange('Minimum text size reached');
                }
                updateTextSizeButtons();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                currentTextSizeIndex = 0;
                applyTextSize('default');
                savePreference(STORAGE_KEYS.TEXT_SIZE, 'default');
                announceChange('Text size reset to default');
                updateTextSizeButtons();
            });
        }

        updateTextSizeButtons();
    }

    /**
     * Apply text size to body
     */
    function applyTextSize(size) {
        // Remove all text size classes
        TEXT_SIZES.forEach(function(s) {
            if (s !== 'default') {
                document.body.classList.remove('text-size-' + s);
            }
        });

        // Add new text size class
        if (size !== 'default') {
            document.body.classList.add('text-size-' + size);
        }
    }

    /**
     * Update text size button states
     */
    function updateTextSizeButtons() {
        var increaseBtn = document.getElementById('text-size-increase');
        var decreaseBtn = document.getElementById('text-size-decrease');

        if (increaseBtn) {
            var atMax = currentTextSizeIndex >= TEXT_SIZES.length - 1;
            increaseBtn.disabled = atMax;
            increaseBtn.setAttribute('aria-disabled', atMax.toString());
        }

        if (decreaseBtn) {
            var atMin = currentTextSizeIndex <= 0;
            decreaseBtn.disabled = atMin;
            decreaseBtn.setAttribute('aria-disabled', atMin.toString());
        }
    }

    /**
     * Listen for system preference changes
     */
    function initMediaQueryListeners() {
        // Listen for system dark mode changes
        if (window.matchMedia) {
            var darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (darkModeQuery.addEventListener) {
                darkModeQuery.addEventListener('change', function(e) {
                    // Only auto-switch if user hasn't set a preference
                    try {
                        if (!localStorage.getItem(STORAGE_KEYS.CONTRAST)) {
                            if (e.matches) {
                                applyContrastMode('inverted');
                            } else {
                                applyContrastMode('default');
                            }
                        }
                    } catch (err) {
                        // localStorage not available
                    }
                });
            }

            // Listen for system contrast preference changes
            var contrastQuery = window.matchMedia('(prefers-contrast: more)');
            if (contrastQuery.addEventListener) {
                contrastQuery.addEventListener('change', function(e) {
                    // Only auto-switch if user hasn't set a preference
                    try {
                        if (!localStorage.getItem(STORAGE_KEYS.CONTRAST)) {
                            if (e.matches) {
                                applyContrastMode('high');
                            } else {
                                applyContrastMode('default');
                            }
                        }
                    } catch (err) {
                        // localStorage not available
                    }
                });
            }

            // Listen for reduced motion preference
            var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (motionQuery.addEventListener) {
                motionQuery.addEventListener('change', function(e) {
                    if (e.matches) {
                        document.body.classList.add('reduce-motion');
                    } else {
                        document.body.classList.remove('reduce-motion');
                    }
                });
            }

            // Apply reduced motion on load if needed
            if (motionQuery.matches) {
                document.body.classList.add('reduce-motion');
            }
        }
    }

    /**
     * Save preference to localStorage
     */
    function savePreference(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            // localStorage not available or full
        }
    }

    /**
     * Announce change to screen readers
     */
    function announceChange(message) {
        if (typeof window.announceToScreenReader === 'function') {
            window.announceToScreenReader(message);
        }
    }

    // Expose functions for external use
    window.accessibilityControls = {
        setContrastMode: function(mode) {
            if (CONTRAST_MODES.indexOf(mode) !== -1) {
                currentContrastMode = mode;
                applyContrastMode(mode);
                savePreference(STORAGE_KEYS.CONTRAST, mode);
            }
        },
        setTextSize: function(size) {
            var index = TEXT_SIZES.indexOf(size);
            if (index !== -1) {
                currentTextSizeIndex = index;
                applyTextSize(size);
                savePreference(STORAGE_KEYS.TEXT_SIZE, size);
            }
        },
        getContrastMode: function() {
            return currentContrastMode;
        },
        getTextSize: function() {
            return TEXT_SIZES[currentTextSizeIndex];
        }
    };

})();
