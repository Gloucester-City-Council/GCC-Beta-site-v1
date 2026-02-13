// Council Services - Main JavaScript
// Accessibility-focused implementation with WCAG 2.2 AA compliance

// Sample services data for search suggestions
const servicesData = [
    'Bin collection dates',
    'Bin replacement',
    'Recycling information',
    'Garden waste collection',
    'Bulky waste collection',
    'Council tax payments',
    'Council tax reduction',
    'Council tax bands',
    'Council tax direct debit',
    'Planning permission',
    'Planning applications',
    'Building regulations',
    'Planning enforcement',
    'Licensing applications',
    'Driver licence',
    'Vehicle licence',
    'Operator licence',
    'Passenger transport',
    'Licensing policy',
    'Housing register',
    'Housing repairs',
    'Housing benefit',
    'Homelessness support',
    'Environmental health',
    'Food hygiene',
    'Noise complaints',
    'Pest control',
    'Parking permits',
    'Parking fines',
    'Parking appeals',
    'Pay for parking',
    'Business rates',
    'Business licences',
    'Street trading licence',
    'Housing benefit application',
    'Council tax support',
    'Register to vote',
    'Electoral register',
    'Postal vote',
    'Proxy vote',
    'Book community centre',
    'Sports facilities',
    'Park bookings',
    'Report fly tipping',
    'Report graffiti',
    'Report street lighting',
    'Report damaged road',
    'Report antisocial behaviour'
];

// Theme Management
class ThemeManager {
    constructor() {
        this.themeButton = document.getElementById('theme-toggle');
        this.themeOptions = document.getElementById('theme-options');
        this.themeButtons = document.querySelectorAll('.theme-option');
        this.customColorPicker = document.getElementById('custom-color-picker');
        this.applyCustomButton = document.getElementById('apply-custom-color');
        this.setDefaultButton = document.getElementById('set-default-theme');
        this.currentTheme = localStorage.getItem('councilTheme') || 'default';
        this.customColor = localStorage.getItem('councilCustomColor') || null;
        this.defaultTheme = localStorage.getItem('councilDefaultTheme') || 'default';

        this.init();
    }

    init() {
        // Apply saved theme or default
        this.applyTheme(this.defaultTheme);

        // Toggle theme options
        this.themeButton.addEventListener('click', () => this.toggleThemeMenu());

        // Theme selection
        this.themeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.selectTheme(theme);
            });
        });

        // Custom color picker
        if (this.customColorPicker && this.applyCustomButton) {
            this.applyCustomButton.addEventListener('click', () => {
                this.applyCustomColor();
            });

            // If there's a saved custom color, set it in the picker
            if (this.customColor) {
                this.customColorPicker.value = this.customColor;
            }
        }

        // Set default theme button
        if (this.setDefaultButton) {
            this.setDefaultButton.addEventListener('click', () => {
                this.setAsDefault();
            });
            this.updateDefaultButtonState();
        }

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.themeOptions.hidden) {
                this.closeThemeMenu();
                this.themeButton.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.themeButton.contains(e.target) && !this.themeOptions.contains(e.target)) {
                this.closeThemeMenu();
            }
        });

        // Keyboard navigation in menu
        this.setupKeyboardNavigation();
    }

    toggleThemeMenu() {
        const isHidden = this.themeOptions.hidden;

        if (isHidden) {
            this.themeOptions.hidden = false;
            this.themeButton.setAttribute('aria-expanded', 'true');
            // Focus first theme option
            this.themeButtons[0].focus();
        } else {
            this.closeThemeMenu();
        }
    }

    closeThemeMenu() {
        this.themeOptions.hidden = true;
        this.themeButton.setAttribute('aria-expanded', 'false');
    }

    selectTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('councilTheme', theme);
        this.closeThemeMenu();
        this.themeButton.focus();

        // Announce theme change to screen readers
        this.announceThemeChange(theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);

        // Update active state
        this.themeButtons.forEach(button => {
            if (button.dataset.theme === theme) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            } else {
                button.classList.remove('active');
                button.removeAttribute('aria-current');
            }
        });
    }

    setupKeyboardNavigation() {
        this.themeButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                let nextIndex;

                switch(e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        nextIndex = (index + 1) % this.themeButtons.length;
                        this.themeButtons[nextIndex].focus();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        nextIndex = (index - 1 + this.themeButtons.length) % this.themeButtons.length;
                        this.themeButtons[nextIndex].focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.themeButtons[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        this.themeButtons[this.themeButtons.length - 1].focus();
                        break;
                }
            });
        });
    }

    announceThemeChange(theme) {
        const themeName = {
            'default': 'default orange',
            'pink': 'pink',
            'green': 'green',
            'blue': 'blue',
            'custom': 'custom colour'
        }[theme] || theme;

        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'visually-hidden';
        announcement.textContent = `Colour theme changed to ${themeName}`;
        document.body.appendChild(announcement);

        setTimeout(() => announcement.remove(), 1000);
    }

    applyCustomColor() {
        const color = this.customColorPicker.value;
        this.customColor = color;
        localStorage.setItem('councilCustomColor', color);

        // Convert hex to RGB
        const rgb = this.hexToRgb(color);
        const hoverRgb = this.darkenColor(rgb, 20);

        // Create custom theme
        document.documentElement.style.setProperty('--primary-color', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        document.documentElement.style.setProperty('--primary-hover', `rgb(${hoverRgb.r}, ${hoverRgb.g}, ${hoverRgb.b})`);
        document.documentElement.style.setProperty('--primary-light', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);

        // Remove active state from preset themes
        this.themeButtons.forEach(button => {
            button.classList.remove('active');
            button.removeAttribute('aria-current');
        });

        this.currentTheme = 'custom';
        localStorage.setItem('councilTheme', 'custom');

        this.updateDefaultButtonState();
        this.announceThemeChange('custom');
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 243, g: 112, b: 33 };
    }

    darkenColor(rgb, percent) {
        return {
            r: Math.max(0, Math.floor(rgb.r * (100 - percent) / 100)),
            g: Math.max(0, Math.floor(rgb.g * (100 - percent) / 100)),
            b: Math.max(0, Math.floor(rgb.b * (100 - percent) / 100))
        };
    }

    setAsDefault() {
        this.defaultTheme = this.currentTheme;
        localStorage.setItem('councilDefaultTheme', this.currentTheme);

        if (this.currentTheme === 'custom' && this.customColor) {
            localStorage.setItem('councilDefaultCustomColor', this.customColor);
        }

        this.updateDefaultButtonState();

        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'visually-hidden';
        announcement.textContent = 'Current theme set as your default';
        document.body.appendChild(announcement);

        setTimeout(() => announcement.remove(), 1000);
    }

    updateDefaultButtonState() {
        if (this.setDefaultButton) {
            if (this.currentTheme === this.defaultTheme) {
                this.setDefaultButton.classList.add('is-default');
            } else {
                this.setDefaultButton.classList.remove('is-default');
            }
        }
    }
}

// Search Functionality with Autocomplete
class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('main-search');
        this.suggestionsList = document.getElementById('search-suggestions');
        this.clearButton = document.querySelector('.search-clear');
        this.suggestions = [];
        this.selectedIndex = -1;

        this.init();
    }

    init() {
        // Input event for search
        this.searchInput.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });

        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Clear button
        this.clearButton.addEventListener('click', () => {
            this.clearSearch();
        });

        // Click outside to close suggestions
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.suggestionsList.contains(e.target)) {
                this.closeSuggestions();
            }
        });
    }

    handleInput(query) {
        // Show/hide clear button
        if (query.length > 0) {
            this.clearButton.hidden = false;
        } else {
            this.clearButton.hidden = true;
        }

        // Get suggestions
        if (query.length >= 2) {
            this.suggestions = this.getSuggestions(query);
            this.displaySuggestions();
        } else {
            this.closeSuggestions();
        }
    }

    getSuggestions(query) {
        const lowerQuery = query.toLowerCase();
        return servicesData
            .filter(service => service.toLowerCase().includes(lowerQuery))
            .slice(0, 8); // Limit to 8 suggestions
    }

    displaySuggestions() {
        if (this.suggestions.length === 0) {
            this.closeSuggestions();
            return;
        }

        // Clear existing suggestions
        this.suggestionsList.innerHTML = '';

        // Add suggestions
        this.suggestions.forEach((suggestion, index) => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.textContent = suggestion;
            li.setAttribute('role', 'option');
            li.setAttribute('id', `suggestion-${index}`);

            // Click handler
            li.addEventListener('click', () => {
                this.selectSuggestion(suggestion);
            });

            this.suggestionsList.appendChild(li);
        });

        // Show suggestions
        this.suggestionsList.hidden = false;
        this.searchInput.setAttribute('aria-expanded', 'true');
        this.selectedIndex = -1;
    }

    closeSuggestions() {
        this.suggestionsList.hidden = true;
        this.suggestionsList.innerHTML = '';
        this.searchInput.setAttribute('aria-expanded', 'false');
        this.selectedIndex = -1;
    }

    selectSuggestion(suggestion) {
        this.searchInput.value = suggestion;
        this.closeSuggestions();
        this.searchInput.focus();

        // In a real implementation, this would navigate to the service page
        console.log('Selected:', suggestion);
    }

    handleKeyboard(e) {
        const items = this.suggestionsList.querySelectorAll('.suggestion-item');

        if (!items.length) return;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
                this.updateSelection(items);
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection(items);
                break;

            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0) {
                    this.selectSuggestion(items[this.selectedIndex].textContent);
                } else if (this.searchInput.value.trim()) {
                    // Submit search
                    console.log('Search for:', this.searchInput.value);
                }
                break;

            case 'Escape':
                e.preventDefault();
                this.closeSuggestions();
                break;
        }
    }

    updateSelection(items) {
        items.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.setAttribute('aria-selected', 'true');
                this.searchInput.setAttribute('aria-activedescendant', item.id);
                // Scroll into view if needed
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.setAttribute('aria-selected', 'false');
            }
        });

        if (this.selectedIndex === -1) {
            this.searchInput.removeAttribute('aria-activedescendant');
        }
    }

    clearSearch() {
        this.searchInput.value = '';
        this.clearButton.hidden = true;
        this.closeSuggestions();
        this.searchInput.focus();
    }
}

// Exit Now Button Handler
class ExitButtonManager {
    constructor() {
        this.exitButton = document.getElementById('exit-now-button');
        if (this.exitButton) {
            this.init();
        }
    }

    init() {
        this.exitButton.addEventListener('click', () => {
            this.exitNow();
        });

        // Keyboard shortcut (optional: Ctrl+Shift+X)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'X') {
                e.preventDefault();
                this.exitNow();
            }
        });
    }

    exitNow() {
        // Close the current window/tab
        // This will only work if the window was opened by JavaScript
        // or in certain browser contexts
        window.open('', '_self', '');
        window.close();

        // Fallback: If window.close() doesn't work, redirect to a blank page
        setTimeout(() => {
            window.location.href = 'about:blank';
        }, 100);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SearchManager();
    new ExitButtonManager();

    // Announce page load to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = 'Council services homepage loaded';
    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 1000);
});

// Service Worker Registration (for progressive web app features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
