// Search autocomplete data - District Council services
const searchData = [
    { title: 'Council tax', keywords: ['council tax', 'tax', 'payment', 'bill', 'band', 'reduction', 'discount', 'exemption'] },
    { title: 'Bins and recycling', keywords: ['bins', 'waste', 'rubbish', 'recycling', 'collection', 'refuse', 'garden waste', 'missed collection'] },
    { title: 'Planning', keywords: ['planning', 'application', 'permission', 'development', 'extension', 'building work'] },
    { title: 'Housing', keywords: ['housing', 'council housing', 'social housing', 'homelessness', 'housing benefit', 'repairs'] },
    { title: 'Benefits', keywords: ['benefits', 'housing benefit', 'council tax support', 'financial help', 'welfare'] },
    { title: 'Report a problem', keywords: ['report', 'fly-tipping', 'graffiti', 'pothole', 'street cleaning', 'litter', 'dog fouling', 'abandoned vehicle'] },
    { title: 'Licensing', keywords: ['licence', 'license', 'permit', 'alcohol', 'taxi', 'premises', 'street trading'] },
    { title: 'Business rates', keywords: ['business rates', 'commercial property', 'business tax', 'rateable value'] },
    { title: 'Parks and leisure', keywords: ['parks', 'leisure', 'sports', 'facilities', 'outdoor', 'activities', 'recreation'] },
    { title: 'Elections and voting', keywords: ['elections', 'voting', 'register', 'electoral', 'poll', 'ballot', 'vote'] },
    { title: 'Environmental health', keywords: ['environmental health', 'food hygiene', 'noise', 'pollution', 'pest control', 'air quality'] },
    { title: 'Building control', keywords: ['building control', 'building regulations', 'structural', 'safety', 'inspection'] },
    { title: 'Pay council tax', keywords: ['pay', 'payment', 'council tax', 'direct debit', 'instalment'] },
    { title: 'Register to vote', keywords: ['register', 'voting', 'electoral register', 'vote'] },
    { title: 'Apply for planning permission', keywords: ['apply', 'planning', 'application', 'submit'] },
    { title: 'Find bin collection days', keywords: ['bin', 'collection', 'day', 'schedule', 'calendar'] },
    { title: 'Report fly-tipping', keywords: ['fly-tipping', 'fly tipping', 'illegal dumping', 'report'] },
    { title: 'Housing repairs', keywords: ['repairs', 'housing', 'maintenance', 'broken', 'fix'] },
    { title: 'Apply for housing', keywords: ['apply', 'housing', 'council housing', 'register'] },
    { title: 'Business waste', keywords: ['business', 'commercial', 'waste', 'trade waste'] },
    { title: 'Food hygiene ratings', keywords: ['food', 'hygiene', 'ratings', 'inspection', 'restaurant'] },
    { title: 'Noise complaints', keywords: ['noise', 'complaint', 'nuisance', 'loud'] },
    { title: 'Park a vehicle', keywords: ['parking', 'permit', 'resident', 'visitor'] },
    { title: 'Leisure centre membership', keywords: ['leisure', 'membership', 'gym', 'swimming', 'fitness'] },
    { title: 'Hackney carriage', keywords: ['hackney carriage', 'taxi', 'cab', 'taxi licence', 'taxi driver', 'black cab'] },
    { title: 'Private hire', keywords: ['private hire', 'minicab', 'private hire licence', 'pco', 'uber', 'cab'] }
];

// DOM elements
const searchInput = document.getElementById('service-search');
const searchSuggestions = document.getElementById('search-suggestions');
const contrastToggle = document.getElementById('contrast-toggle');
const themeSelect = document.getElementById('theme-select');

let currentFocus = -1;

// Initialise
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved contrast preference
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('colorTheme') || 'orange';
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;

    // Search input event listeners
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keydown', handleKeyNavigation);
    searchInput.addEventListener('focus', handleSearch);

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            closeSuggestions();
        }
    });

    // Contrast toggle
    contrastToggle.addEventListener('click', toggleContrast);

    // Theme switcher
    themeSelect.addEventListener('change', function() {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
        localStorage.setItem('colorTheme', selectedTheme);

        // Announce to screen readers
        announceToScreenReader(`${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} theme applied`);
    });
});

// Handle search input
function handleSearch(e) {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length < 2) {
        closeSuggestions();
        return;
    }

    const matches = searchData.filter(item => {
        return item.keywords.some(keyword => keyword.includes(query)) ||
               item.title.toLowerCase().includes(query);
    });

    displaySuggestions(matches, query);
}

// Display search suggestions
function displaySuggestions(matches, query) {
    searchSuggestions.innerHTML = '';
    currentFocus = -1;

    if (matches.length === 0) {
        const noResults = document.createElement('li');
        noResults.className = 'search-suggestion-item';
        noResults.textContent = 'No results found';
        noResults.setAttribute('role', 'option');
        noResults.setAttribute('aria-selected', 'false');
        searchSuggestions.appendChild(noResults);
    } else {
        matches.slice(0, 8).forEach((match, index) => {
            const li = document.createElement('li');
            li.className = 'search-suggestion-item';
            li.textContent = match.title;
            li.setAttribute('role', 'option');
            li.setAttribute('id', `suggestion-${index}`);
            li.setAttribute('aria-selected', 'false');
            li.setAttribute('tabindex', '-1');

            // Click handler
            li.addEventListener('click', function() {
                selectSuggestion(match.title);
            });

            // Keyboard handler
            li.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectSuggestion(match.title);
                }
            });

            searchSuggestions.appendChild(li);
        });
    }

    searchSuggestions.classList.add('active');
    searchInput.setAttribute('aria-expanded', 'true');
}

// Handle keyboard navigation
function handleKeyNavigation(e) {
    const items = searchSuggestions.getElementsByClassName('search-suggestion-item');

    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
        setActiveItem(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
        setActiveItem(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
            selectSuggestion(items[currentFocus].textContent);
        } else {
            // Submit search with current input
            performSearch(searchInput.value);
        }
    } else if (e.key === 'Escape') {
        closeSuggestions();
        searchInput.blur();
    }
}

// Set active item in suggestions
function setActiveItem(items) {
    removeActiveItems(items);

    if (currentFocus >= 0 && currentFocus < items.length) {
        items[currentFocus].classList.add('highlighted');
        items[currentFocus].setAttribute('aria-selected', 'true');
        items[currentFocus].focus();
    } else {
        searchInput.focus();
    }
}

// Remove active state from all items
function removeActiveItems(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('highlighted');
        items[i].setAttribute('aria-selected', 'false');
    }
}

// Select a suggestion
function selectSuggestion(title) {
    searchInput.value = title;
    closeSuggestions();
    performSearch(title);
}

// Close suggestions
function closeSuggestions() {
    searchSuggestions.classList.remove('active');
    searchSuggestions.innerHTML = '';
    searchInput.setAttribute('aria-expanded', 'false');
    currentFocus = -1;
}

// Perform search (placeholder - would navigate to results page)
function performSearch(query) {
    console.log('Searching for:', query);
    alert(`Search functionality would navigate to results for: "${query}"\n\nThis is a demonstration page.`);
    // In a real implementation, this would navigate to a search results page:
    // window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

// Apply color theme
function applyTheme(themeName) {
    // Remove all theme classes
    document.body.classList.remove('theme-orange', 'theme-pink', 'theme-green', 'theme-blue');
    // Add selected theme class
    document.body.classList.add('theme-' + themeName);
}

// Announce message to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Toggle high contrast mode
function toggleContrast() {
    document.body.classList.toggle('high-contrast');

    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);

    // Announce to screen readers
    announceToScreenReader(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
}

// Handle search button click
document.querySelector('.search-button').addEventListener('click', function(e) {
    e.preventDefault();
    if (searchInput.value.trim()) {
        performSearch(searchInput.value.trim());
    }
});

// Service card click handlers (for demonstration)
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceTitle = this.querySelector('.service-title').textContent;
        console.log('Clicked service:', serviceTitle);
        alert(`Service clicked: ${serviceTitle}\n\nThis would navigate to the ${serviceTitle.toLowerCase()} service page.`);
        // In a real implementation:
        // window.location.href = this.getAttribute('href');
    });
});
