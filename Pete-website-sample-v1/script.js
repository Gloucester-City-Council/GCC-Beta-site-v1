/**
 * District Council Homepage - Main JavaScript
 * Handles search autocomplete and accessibility features
 */

// ===================================
// SERVICE DATA
// ===================================

const services = [
    // Council Tax
    { title: 'Pay council tax', category: 'Council tax', keywords: ['payment', 'bill', 'money', 'tax'] },
    { title: 'Council tax bands', category: 'Council tax', keywords: ['band', 'valuation', 'property'] },
    { title: 'Council tax discounts', category: 'Council tax', keywords: ['discount', 'reduction', 'single person'] },
    { title: 'Council tax support', category: 'Council tax', keywords: ['help', 'benefits', 'financial'] },
    { title: 'Change council tax details', category: 'Council tax', keywords: ['update', 'move', 'address'] },

    // Bins and Recycling
    { title: 'Bin collection days', category: 'Bins and recycling', keywords: ['collection', 'schedule', 'calendar'] },
    { title: 'Report missed bin collection', category: 'Bins and recycling', keywords: ['missed', 'not collected', 'complaint'] },
    { title: 'Order new bins', category: 'Bins and recycling', keywords: ['request', 'replacement', 'damaged'] },
    { title: 'What can I recycle', category: 'Bins and recycling', keywords: ['recycling', 'waste', 'rubbish'] },
    { title: 'Bulky waste collection', category: 'Bins and recycling', keywords: ['large items', 'furniture', 'collection'] },
    { title: 'Garden waste collection', category: 'Bins and recycling', keywords: ['green waste', 'garden', 'subscription'] },

    // Planning and Building
    { title: 'Apply for planning permission', category: 'Planning and building', keywords: ['application', 'development', 'extension'] },
    { title: 'View planning applications', category: 'Planning and building', keywords: ['search', 'check', 'neighbour'] },
    { title: 'Building regulations', category: 'Planning and building', keywords: ['building control', 'approval', 'regulations'] },
    { title: 'Tree preservation orders', category: 'Planning and building', keywords: ['trees', 'tpo', 'protection'] },
    { title: 'Planning appeals', category: 'Planning and building', keywords: ['appeal', 'refusal', 'decision'] },

    // Housing
    { title: 'Apply for council housing', category: 'Housing', keywords: ['housing register', 'social housing', 'application'] },
    { title: 'Housing benefit', category: 'Housing', keywords: ['benefit', 'rent', 'help', 'support'] },
    { title: 'Report housing repair', category: 'Housing', keywords: ['repair', 'maintenance', 'fault'] },
    { title: 'Homelessness advice', category: 'Housing', keywords: ['homeless', 'help', 'emergency'] },
    { title: 'Right to buy', category: 'Housing', keywords: ['purchase', 'buy', 'ownership'] },

    // Parking
    { title: 'Pay for parking', category: 'Parking', keywords: ['payment', 'car park', 'permit'] },
    { title: 'Parking permits', category: 'Parking', keywords: ['resident', 'permit', 'visitor'] },
    { title: 'Appeal parking fine', category: 'Parking', keywords: ['pcn', 'fine', 'penalty', 'challenge'] },
    { title: 'Parking restrictions', category: 'Parking', keywords: ['restrictions', 'rules', 'regulations'] },

    // Licensing
    { title: 'Apply for alcohol licence', category: 'Licensing', keywords: ['alcohol', 'premises', 'pub'] },
    { title: 'Taxi and private hire licences', category: 'Licensing', keywords: ['taxi', 'cab', 'driver'] },
    { title: 'Street trading licence', category: 'Licensing', keywords: ['market', 'stall', 'trading'] },
    { title: 'Gambling licences', category: 'Licensing', keywords: ['betting', 'gaming', 'casino'] },
    { title: 'Animal licences', category: 'Licensing', keywords: ['pet', 'dog', 'breeding'] },

    // Business Rates
    { title: 'Pay business rates', category: 'Business rates', keywords: ['payment', 'bill', 'commercial'] },
    { title: 'Business rates relief', category: 'Business rates', keywords: ['relief', 'discount', 'small business'] },
    { title: 'Business rates valuation', category: 'Business rates', keywords: ['rateable value', 'assessment'] },

    // Environmental Services
    { title: 'Report fly-tipping', category: 'Environmental services', keywords: ['illegal dumping', 'waste', 'rubbish'] },
    { title: 'Report graffiti', category: 'Environmental services', keywords: ['vandalism', 'damage'] },
    { title: 'Report dog fouling', category: 'Environmental services', keywords: ['dog', 'mess', 'waste'] },
    { title: 'Pest control', category: 'Environmental services', keywords: ['rats', 'mice', 'vermin'] },
    { title: 'Noise complaints', category: 'Environmental services', keywords: ['noise', 'disturbance', 'nuisance'] },
    { title: 'Air quality', category: 'Environmental services', keywords: ['pollution', 'air', 'environment'] },

    // Benefits
    { title: 'Apply for housing benefit', category: 'Benefits', keywords: ['housing', 'rent', 'support'] },
    { title: 'Council tax support', category: 'Benefits', keywords: ['council tax', 'reduction', 'help'] },
    { title: 'Discretionary housing payments', category: 'Benefits', keywords: ['dhp', 'extra help', 'shortfall'] },

    // Parks and Leisure
    { title: 'Find a park', category: 'Parks and leisure', keywords: ['parks', 'green spaces', 'recreation'] },
    { title: 'Book leisure centre', category: 'Parks and leisure', keywords: ['gym', 'swimming', 'fitness'] },
    { title: 'Sports facilities', category: 'Parks and leisure', keywords: ['sports', 'pitches', 'courts'] },
    { title: 'Events in parks', category: 'Parks and leisure', keywords: ['events', 'activities', 'community'] },

    // Elections
    { title: 'Register to vote', category: 'Elections', keywords: ['voting', 'electoral', 'register'] },
    { title: 'Apply for postal vote', category: 'Elections', keywords: ['postal', 'absent', 'voting'] },
    { title: 'Find your polling station', category: 'Elections', keywords: ['polling', 'station', 'vote'] },
    { title: 'Stand for election', category: 'Elections', keywords: ['candidate', 'councillor', 'election'] },

    // Community Safety
    { title: 'Report anti-social behaviour', category: 'Community safety', keywords: ['asb', 'antisocial', 'behaviour'] },
    { title: 'Community safety advice', category: 'Community safety', keywords: ['crime', 'safety', 'security'] },
    { title: 'Domestic abuse support', category: 'Community safety', keywords: ['domestic', 'abuse', 'violence'] },
    { title: 'CCTV requests', category: 'Community safety', keywords: ['cctv', 'footage', 'camera'] }
];

// ===================================
// SEARCH FUNCTIONALITY
// ===================================

class SearchAutocomplete {
    constructor() {
        this.searchInput = document.getElementById('service-search');
        this.searchSuggestions = document.getElementById('search-suggestions');
        this.currentFocus = -1;

        this.init();
    }

    init() {
        if (!this.searchInput || !this.searchSuggestions) return;

        // Event listeners
        this.searchInput.addEventListener('input', (e) => this.handleInput(e));
        this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.searchInput.addEventListener('focus', (e) => this.handleFocus(e));

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.closeSuggestions();
            }
        });
    }

    handleInput(e) {
        const query = e.target.value.trim().toLowerCase();

        if (query.length < 2) {
            this.closeSuggestions();
            return;
        }

        const matches = this.searchServices(query);
        this.displaySuggestions(matches);
    }

    handleFocus(e) {
        const query = e.target.value.trim().toLowerCase();
        if (query.length >= 2) {
            const matches = this.searchServices(query);
            this.displaySuggestions(matches);
        }
    }

    handleKeydown(e) {
        const suggestions = this.searchSuggestions.querySelectorAll('.suggestion-item');

        if (!suggestions.length) return;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.currentFocus++;
                if (this.currentFocus >= suggestions.length) this.currentFocus = 0;
                this.setActive(suggestions);
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.currentFocus--;
                if (this.currentFocus < 0) this.currentFocus = suggestions.length - 1;
                this.setActive(suggestions);
                break;

            case 'Enter':
                e.preventDefault();
                if (this.currentFocus > -1 && suggestions[this.currentFocus]) {
                    suggestions[this.currentFocus].click();
                }
                break;

            case 'Escape':
                this.closeSuggestions();
                break;
        }
    }

    searchServices(query) {
        const matches = services.filter(service => {
            const titleMatch = service.title.toLowerCase().includes(query);
            const categoryMatch = service.category.toLowerCase().includes(query);
            const keywordMatch = service.keywords.some(keyword =>
                keyword.toLowerCase().includes(query)
            );

            return titleMatch || categoryMatch || keywordMatch;
        });

        // Sort by relevance (title matches first, then category, then keywords)
        return matches.sort((a, b) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();

            if (aTitle.startsWith(query) && !bTitle.startsWith(query)) return -1;
            if (!aTitle.startsWith(query) && bTitle.startsWith(query)) return 1;

            if (aTitle.includes(query) && !bTitle.includes(query)) return -1;
            if (!aTitle.includes(query) && bTitle.includes(query)) return 1;

            return 0;
        }).slice(0, 8); // Limit to 8 suggestions
    }

    displaySuggestions(matches) {
        if (matches.length === 0) {
            this.closeSuggestions();
            return;
        }

        this.searchSuggestions.innerHTML = '';
        this.currentFocus = -1;

        matches.forEach((service, index) => {
            const li = document.createElement('li');
            li.className = 'suggestion-item';
            li.setAttribute('role', 'option');
            li.setAttribute('tabindex', '-1');
            li.innerHTML = `
                <strong>${this.highlightMatch(service.title, this.searchInput.value)}</strong>
                <div style="font-size: 0.875rem; color: var(--color-secondary); margin-top: 0.25rem;">
                    ${service.category}
                </div>
            `;

            li.addEventListener('click', () => {
                this.selectSuggestion(service);
            });

            li.addEventListener('mouseenter', () => {
                this.currentFocus = index;
                this.setActive(this.searchSuggestions.querySelectorAll('.suggestion-item'));
            });

            this.searchSuggestions.appendChild(li);
        });

        this.searchSuggestions.classList.add('show');
    }

    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background-color: var(--color-focus); font-weight: 700;">$1</mark>');
    }

    setActive(suggestions) {
        // Remove all highlights
        suggestions.forEach(item => item.classList.remove('highlighted'));

        // Add highlight to current item
        if (this.currentFocus >= 0 && this.currentFocus < suggestions.length) {
            suggestions[this.currentFocus].classList.add('highlighted');
            suggestions[this.currentFocus].scrollIntoView({ block: 'nearest' });
        }
    }

    selectSuggestion(service) {
        this.searchInput.value = service.title;
        this.closeSuggestions();

        // In a real implementation, this would navigate to the service page
        console.log('Selected service:', service);
        alert(`You selected: ${service.title}\n\nIn a live site, this would take you to the relevant page.`);
    }

    closeSuggestions() {
        this.searchSuggestions.classList.remove('show');
        this.searchSuggestions.innerHTML = '';
        this.currentFocus = -1;
    }
}

// ===================================
// HIGH CONTRAST MODE
// ===================================

class ContrastToggle {
    constructor() {
        this.toggleButton = document.getElementById('contrast-toggle');
        this.isHighContrast = false;

        this.init();
    }

    init() {
        if (!this.toggleButton) return;

        // Check if user has previously set a preference
        const savedPreference = localStorage.getItem('highContrast');
        if (savedPreference === 'true') {
            this.enableHighContrast();
        }

        // Event listener
        this.toggleButton.addEventListener('click', () => this.toggle());
    }

    toggle() {
        if (this.isHighContrast) {
            this.disableHighContrast();
        } else {
            this.enableHighContrast();
        }
    }

    enableHighContrast() {
        document.body.classList.add('high-contrast');
        this.toggleButton.querySelector('.toggle-text').textContent = 'Standard contrast';
        this.toggleButton.setAttribute('aria-label', 'Switch to standard contrast mode');
        this.toggleButton.setAttribute('title', 'Switch to standard contrast mode');
        this.isHighContrast = true;
        localStorage.setItem('highContrast', 'true');
    }

    disableHighContrast() {
        document.body.classList.remove('high-contrast');
        this.toggleButton.querySelector('.toggle-text').textContent = 'High contrast';
        this.toggleButton.setAttribute('aria-label', 'Switch to high contrast mode');
        this.toggleButton.setAttribute('title', 'Switch to high contrast mode');
        this.isHighContrast = false;
        localStorage.setItem('highContrast', 'false');
    }
}

// ===================================
// INITIALIZE
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize search autocomplete
    new SearchAutocomplete();

    // Initialize contrast toggle
    new ContrastToggle();

    console.log('District Council homepage initialized');
});
