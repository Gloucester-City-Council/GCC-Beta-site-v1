/* =================================================================
   MODERN DISTRICT COUNCIL - ADVANCED JAVASCRIPT
   Features: Command palette, fuzzy search, personalization, voice search,
   PWA support, animations, accessibility, performance monitoring
   ================================================================= */

'use strict';

// =================================================================
// CONFIGURATION & DATA
// =================================================================

const CONFIG = {
    storageKeys: {
        theme: 'council-theme',
        taskUsage: 'council-task-usage',
        dismissedAlerts: 'council-dismissed-alerts',
        preferences: 'council-preferences'
    },
    analytics: {
        enabled: false, // Privacy-first: disabled by default
        endpoint: '/api/analytics' // Placeholder for when consent is granted
    }
};

// Service data (district council only)
const SERVICES = {
    tasks: [
        { id: 'bins', icon: '🗑️', label: 'Find my bin day', url: '/bins', keywords: 'waste rubbish recycling collection' },
        { id: 'report-bin', icon: '⚠️', label: 'Report a missed bin', url: '/report/missed-bin', keywords: 'waste collection problem' },
        { id: 'council-tax', icon: '💷', label: 'Pay Council Tax', url: '/pay/council-tax', keywords: 'payment bill' },
        { id: 'fly-tipping', icon: '📍', label: 'Report fly-tipping', url: '/report/fly-tipping', keywords: 'waste dumping rubbish' },
        { id: 'planning', icon: '📋', label: 'Check planning applications', url: '/planning/search', keywords: 'building development' },
        { id: 'housing', icon: '🏠', label: 'Apply for housing help', url: '/housing/apply', keywords: 'homelessness register' },
        { id: 'bulky-waste', icon: '🛋️', label: 'Book bulky waste', url: '/bulky-waste', keywords: 'furniture collection' },
        { id: 'business-rates', icon: '🏢', label: 'Pay business rates', url: '/pay/business-rates', keywords: 'payment commercial' }
    ],

    categories: [
        { id: 'bins', icon: '♻️', title: 'Bins and recycling', description: 'Collection days, missed bins, bulky waste, garden waste subscriptions', url: '/bins-recycling' },
        { id: 'council-tax', icon: '💷', title: 'Council Tax', description: 'Pay your bill, set up direct debit, apply for discounts and reductions', url: '/council-tax' },
        { id: 'housing', icon: '🏠', title: 'Housing', description: 'Housing register, homelessness help, housing options advice, council housing', url: '/housing' },
        { id: 'planning', icon: '📋', title: 'Planning', description: 'Search and comment on planning applications, planning decisions, submit an application', url: '/planning' },
        { id: 'environmental', icon: '🛡️', title: 'Environmental health', description: 'Food hygiene, noise complaints, pest control, contaminated land, air quality', url: '/environmental-health' },
        { id: 'benefits', icon: '💳', title: 'Benefits support', description: 'Council Tax Reduction, Housing Benefit, help with costs, income maximisation advice', url: '/benefits' },
        { id: 'parking', icon: '🅿️', title: 'Parking', description: 'Permits, car parks, blue badge applications, parking enforcement, season tickets', url: '/parking' },
        { id: 'licensing', icon: '📜', title: 'Licensing', description: 'Alcohol licences, taxi licences, street trading, gambling, animal licences', url: '/licensing' },
        { id: 'business-rates', icon: '🏢', title: 'Business rates', description: 'Pay business rates, relief and exemptions, business account, revaluations', url: '/business-rates' },
        { id: 'leisure', icon: '⚽', title: 'Community and leisure', description: 'Leisure centres, parks, community spaces, activities, events, sports facilities', url: '/leisure' }
    ],

    popular: [
        { id: 'garden-waste', label: 'Renew garden waste subscription', url: '/garden-waste/renew' },
        { id: 'direct-debit', label: 'Set up Council Tax Direct Debit', url: '/council-tax/direct-debit' },
        { id: 'noise', label: 'Report noise nuisance', url: '/report/noise' },
        { id: 'housing-register', label: 'Join the housing register', url: '/housing-register' },
        { id: 'planning-near', label: 'View planning applications near me', url: '/planning/search' },
        { id: 'food-hygiene', label: 'Check food hygiene ratings', url: '/food-hygiene' },
        { id: 'bulky-book', label: 'Book bulky waste collection', url: '/bulky-waste/book' },
        { id: 'asb', label: 'Report antisocial behaviour', url: '/report/antisocial-behaviour' }
    ],

    news: [
        {
            date: '2026-01-15',
            title: 'New recycling service begins next month',
            excerpt: 'From February, you will be able to recycle food waste in your green bin. Find out what is changing and how to prepare.',
            url: '/news/food-waste-recycling'
        },
        {
            date: '2026-01-10',
            title: 'Council Tax bills: what is changing',
            excerpt: 'Your Council Tax bill for 2026/27 will arrive in March. Check what support is available if you are struggling to pay.',
            url: '/news/council-tax-2026'
        },
        {
            date: '2026-01-05',
            title: 'Free energy advice sessions',
            excerpt: 'Book a free appointment with our energy advisors to reduce your bills and make your home warmer this winter.',
            url: '/news/energy-advice'
        }
    ]
};

// =================================================================
// UTILITIES
// =================================================================

class StorageManager {
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Storage get failed:', e);
            return defaultValue;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Storage set failed:', e);
            return false;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.warn('Storage remove failed:', e);
            return false;
        }
    }
}

class Analytics {
    static track(event, data = {}) {
        if (!CONFIG.analytics.enabled) return;

        // Privacy-first: only track when consent given
        console.log('Analytics:', event, data);

        // Stub for future implementation
        // fetch(CONFIG.analytics.endpoint, {
        //     method: 'POST',
        //     body: JSON.stringify({ event, data, timestamp: Date.now() })
        // });
    }
}

// Fuzzy search implementation
function fuzzyMatch(pattern, str) {
    pattern = pattern.toLowerCase();
    str = str.toLowerCase();

    let patternIdx = 0;
    let score = 0;
    let matches = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === pattern[patternIdx]) {
            matches.push(i);
            score += (100 - i); // Earlier matches score higher
            patternIdx++;

            if (patternIdx === pattern.length) {
                return { matched: true, score, matches };
            }
        }
    }

    return { matched: patternIdx === pattern.length, score, matches };
}

function searchServices(query) {
    if (!query) return [];

    const results = [];

    // Search tasks
    SERVICES.tasks.forEach(task => {
        const labelMatch = fuzzyMatch(query, task.label);
        const keywordMatch = fuzzyMatch(query, task.keywords);

        if (labelMatch.matched || keywordMatch.matched) {
            results.push({
                ...task,
                type: 'task',
                score: Math.max(labelMatch.score, keywordMatch.score)
            });
        }
    });

    // Search categories
    SERVICES.categories.forEach(category => {
        const titleMatch = fuzzyMatch(query, category.title);
        const descMatch = fuzzyMatch(query, category.description);

        if (titleMatch.matched || descMatch.matched) {
            results.push({
                ...category,
                type: 'category',
                score: Math.max(titleMatch.score, descMatch.score)
            });
        }
    });

    // Sort by score
    return results.sort((a, b) => b.score - a.score).slice(0, 8);
}

// =================================================================
// PERSONALIZATION ENGINE
// =================================================================

class PersonalizationEngine {
    constructor() {
        this.usage = StorageManager.get(CONFIG.storageKeys.taskUsage, {});
    }

    trackTaskClick(taskId) {
        this.usage[taskId] = (this.usage[taskId] || 0) + 1;
        StorageManager.set(CONFIG.storageKeys.taskUsage, this.usage);
        Analytics.track('task_click', { taskId });
    }

    getTopTasks(count = 8) {
        // Sort tasks by usage
        const sortedTasks = Object.entries(this.usage)
            .sort(([, a], [, b]) => b - a)
            .slice(0, count)
            .map(([id]) => id);

        // Get task objects
        const topTasks = sortedTasks
            .map(id => SERVICES.tasks.find(t => t.id === id))
            .filter(Boolean);

        // Fill remaining with default tasks
        const defaultTasks = SERVICES.tasks.filter(t => !topTasks.find(tt => tt.id === t.id));
        return [...topTasks, ...defaultTasks].slice(0, count);
    }

    reset() {
        this.usage = {};
        StorageManager.remove(CONFIG.storageKeys.taskUsage);
        showToast('Personalization reset', 'Your task preferences have been reset.', 'success');
    }
}

const personalization = new PersonalizationEngine();

// =================================================================
// THEME MANAGEMENT
// =================================================================

class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.toggleBtn = document.getElementById('theme-toggle');
        this.currentTheme = StorageManager.get(CONFIG.storageKeys.theme, 'auto');

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);

        this.toggleBtn?.addEventListener('click', () => {
            this.cycle();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (this.currentTheme === 'auto') {
                this.applyTheme('auto');
            }
        });
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        this.html.setAttribute('data-theme', theme);
        StorageManager.set(CONFIG.storageKeys.theme, theme);

        // Update meta theme-color
        const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0F172A' : '#FFFFFF');
    }

    cycle() {
        const themes = ['auto', 'light', 'dark'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];

        this.applyTheme(nextTheme);

        const themeNames = { auto: 'Auto', light: 'Light', dark: 'Dark' };
        showToast('Theme changed', `Switched to ${themeNames[nextTheme]} theme`, 'info');

        Analytics.track('theme_change', { theme: nextTheme });
    }
}

// =================================================================
// COMMAND PALETTE
// =================================================================

class CommandPalette {
    constructor() {
        this.dialog = document.getElementById('command-palette');
        this.input = document.getElementById('command-input');
        this.results = document.getElementById('command-results');
        this.isOpen = false;
        this.selectedIndex = 0;
        this.currentResults = [];

        this.init();
    }

    init() {
        // Keyboard shortcut: Cmd/Ctrl + K
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }

            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Search trigger button
        document.getElementById('search-trigger')?.addEventListener('click', () => {
            this.open();
        });

        // Close on backdrop click
        this.dialog?.querySelector('[data-close-command]')?.addEventListener('click', () => {
            this.close();
        });

        // Search input
        this.input?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Keyboard navigation
        this.input?.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.selectNext();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.selectPrevious();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.selectCurrent();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.dialog.hidden = false;
        this.input.value = '';
        this.input.focus();
        this.showDefaultResults();
        document.body.style.overflow = 'hidden';

        Analytics.track('command_palette_open');
    }

    close() {
        this.isOpen = false;
        this.dialog.hidden = true;
        document.body.style.overflow = '';
        this.selectedIndex = 0;
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    showDefaultResults() {
        const topTasks = personalization.getTopTasks(6);
        this.renderResults(topTasks.map(task => ({
            ...task,
            type: 'task'
        })));
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.showDefaultResults();
            return;
        }

        const results = searchServices(query);
        this.renderResults(results);

        Analytics.track('command_search', { query, resultsCount: results.length });
    }

    renderResults(results) {
        this.currentResults = results;
        this.selectedIndex = 0;

        if (results.length === 0) {
            this.results.innerHTML = `
                <div style="padding: var(--space-xl); text-align: center; color: var(--text-tertiary);">
                    <p>No results found</p>
                </div>
            `;
            return;
        }

        this.results.innerHTML = results.map((result, index) => `
            <button
                class="command-item"
                role="option"
                aria-selected="${index === 0 ? 'true' : 'false'}"
                data-index="${index}"
                data-url="${result.url}"
            >
                <div class="command-item-icon" aria-hidden="true">${result.icon}</div>
                <div class="command-item-content">
                    <div class="command-item-title">${result.label || result.title}</div>
                    ${result.description ? `<div class="command-item-description">${result.description}</div>` : ''}
                </div>
            </button>
        `).join('');

        // Add click handlers
        this.results.querySelectorAll('.command-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectIndex(index);
                this.selectCurrent();
            });
        });
    }

    selectNext() {
        this.selectIndex((this.selectedIndex + 1) % this.currentResults.length);
    }

    selectPrevious() {
        this.selectIndex((this.selectedIndex - 1 + this.currentResults.length) % this.currentResults.length);
    }

    selectIndex(index) {
        this.selectedIndex = index;
        this.results.querySelectorAll('.command-item').forEach((item, i) => {
            item.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });

        // Scroll into view
        const selectedItem = this.results.querySelector(`[data-index="${index}"]`);
        selectedItem?.scrollIntoView({ block: 'nearest' });
    }

    selectCurrent() {
        const result = this.currentResults[this.selectedIndex];
        if (result) {
            personalization.trackTaskClick(result.id);
            window.location.href = result.url;
        }
    }
}

// =================================================================
// VOICE SEARCH
// =================================================================

class VoiceSearch {
    constructor() {
        this.button = document.getElementById('voice-trigger');
        this.recognition = null;

        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.init();
        }
    }

    init() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-GB';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.button.hidden = false;

        this.button.addEventListener('click', () => {
            this.start();
        });

        this.recognition.addEventListener('result', (event) => {
            const transcript = event.results[0][0].transcript;
            this.handleResult(transcript);
        });

        this.recognition.addEventListener('error', (event) => {
            console.error('Speech recognition error:', event.error);
            showToast('Voice search error', 'Could not process voice input', 'error');
        });
    }

    start() {
        try {
            this.recognition.start();
            this.button.style.color = 'var(--color-error)'; // Visual feedback
            showToast('Listening...', 'Speak now', 'info');

            Analytics.track('voice_search_start');
        } catch (e) {
            console.error('Voice search failed:', e);
        }
    }

    handleResult(transcript) {
        this.button.style.color = '';
        console.log('Voice result:', transcript);

        // Open command palette with the transcript
        const palette = new CommandPalette();
        palette.open();
        document.getElementById('command-input').value = transcript;
        palette.handleSearch(transcript);

        Analytics.track('voice_search_result', { transcript });
    }
}

// =================================================================
// TOAST NOTIFICATIONS
// =================================================================

let toastId = 0;

function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    const id = `toast-${toastId++}`;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ️',
        warning: '⚠️'
    };

    const toast = document.createElement('div');
    toast.id = id;
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
        <div style="font-size: var(--text-xl);" aria-hidden="true">${icons[type]}</div>
        <div style="flex: 1;">
            <div style="font-weight: 600; margin-bottom: var(--space-3xs);">${title}</div>
            <div style="font-size: var(--text-sm); color: var(--text-secondary);">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);

    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
        navigator.vibrate(type === 'error' ? [50, 50, 50] : 50);
    }
}

// =================================================================
// ANIMATION OBSERVER
// =================================================================

class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.observe();
    }

    observe() {
        document.querySelectorAll('[data-animate]').forEach(el => {
            this.observer.observe(el);
        });
    }
}

// =================================================================
// DYNAMIC CONTENT RENDERING
// =================================================================

function renderTopTasks() {
    const container = document.getElementById('top-tasks');
    const tasks = personalization.getTopTasks(8);

    container.innerHTML = tasks.map(task => {
        const usage = personalization.usage[task.id] || 0;
        return `
            <a href="${task.url}" class="task-card" data-task-id="${task.id}">
                <div class="task-icon" aria-hidden="true">${task.icon}</div>
                <span class="task-label">${task.label}</span>
                ${usage > 0 ? `<span class="task-count">${usage} times</span>` : ''}
            </a>
        `;
    }).join('');

    // Add click tracking
    container.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const taskId = e.currentTarget.getAttribute('data-task-id');
            personalization.trackTaskClick(taskId);
        });
    });
}

function renderServices() {
    const container = document.getElementById('services-grid');
    const showDescriptions = document.getElementById('show-descriptions')?.checked ?? true;

    container.innerHTML = SERVICES.categories.map(service => `
        <a href="${service.url}" class="service-card ${showDescriptions ? '' : 'compact'}">
            <h3>
                <span aria-hidden="true">${service.icon}</span>
                ${service.title}
            </h3>
            <p>${service.description}</p>
        </a>
    `).join('');

    // Listen for toggle changes
    document.getElementById('show-descriptions')?.addEventListener('change', renderServices);
}

function renderPopular() {
    const container = document.getElementById('popular-list');

    container.innerHTML = SERVICES.popular.map(item => `
        <a href="${item.url}" class="popular-card">
            <span>${item.label}</span>
        </a>
    `).join('');
}

function renderNews() {
    const container = document.getElementById('news-grid');

    container.innerHTML = SERVICES.news.map(article => {
        const date = new Date(article.date);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        return `
            <article class="news-card">
                <div class="news-content">
                    <time class="news-date" datetime="${article.date}">${formattedDate}</time>
                    <h3 class="news-title">
                        <a href="${article.url}">${article.title}</a>
                    </h3>
                    <p class="news-excerpt">${article.excerpt}</p>
                    <a href="${article.url}">Read more →</a>
                </div>
            </article>
        `;
    }).join('');
}

// =================================================================
// STATUS BANNER
// =================================================================

function initStatusBanner() {
    const banner = document.querySelector('.status-banner');
    const closeBtn = banner?.querySelector('.status-close');

    if (!closeBtn) return;

    closeBtn.addEventListener('click', () => {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.getElementById('status-section').style.display = 'none';
        }, 300);

        // Remember dismissal
        const dismissed = StorageManager.get(CONFIG.storageKeys.dismissedAlerts, []);
        dismissed.push('service-update-jan-2026');
        StorageManager.set(CONFIG.storageKeys.dismissedAlerts, dismissed);
    });

    // Check if already dismissed
    const dismissed = StorageManager.get(CONFIG.storageKeys.dismissedAlerts, []);
    if (dismissed.includes('service-update-jan-2026')) {
        document.getElementById('status-section').style.display = 'none';
    }
}

// =================================================================
// TIME-BASED GREETING
// =================================================================

function updateGreeting() {
    const hour = new Date().getHours();
    const timeOfDayElement = document.getElementById('time-of-day');

    if (!timeOfDayElement) return;

    let greeting = 'day';
    if (hour < 12) greeting = 'morning';
    else if (hour < 17) greeting = 'afternoon';
    else greeting = 'evening';

    timeOfDayElement.textContent = greeting;
}

// =================================================================
// ONLINE/OFFLINE STATUS
// =================================================================

function updateOnlineStatus() {
    const status = document.getElementById('online-status');
    if (!status) return;

    if (navigator.onLine) {
        status.textContent = 'Online';
        status.style.color = 'var(--color-success)';
    } else {
        status.textContent = 'Offline';
        status.style.color = 'var(--color-warning)';
        showToast('You are offline', 'Some features may be limited', 'warning');
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// =================================================================
// PWA SUPPORT
// =================================================================

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// =================================================================
// PERFORMANCE MONITORING
// =================================================================

function monitorPerformance() {
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            Analytics.track('performance_lcp', { value: lastEntry.renderTime || lastEntry.loadTime });
        });

        try {
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('LCP observer not supported');
        }

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                Analytics.track('performance_fid', { value: entry.processingStart - entry.startTime });
            });
        });

        try {
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.warn('FID observer not supported');
        }
    }

    // Core Web Vitals
    if ('web-vitals' in window) {
        // Future integration point for web-vitals library
    }
}

// =================================================================
// CUSTOMIZE TASKS MODAL (stub)
// =================================================================

document.getElementById('customize-tasks')?.addEventListener('click', () => {
    showToast(
        'Customize tasks',
        'Drag and drop tasks to reorder, or reset to defaults.',
        'info'
    );

    // Could open a modal here for advanced customization
    // For now, just offer a reset option
    if (confirm('Reset task personalization to defaults?')) {
        personalization.reset();
        renderTopTasks();
    }
});

// =================================================================
// INITIALIZATION
// =================================================================

function init() {
    console.log('🏛️ District Council Modern Platform v2.0');

    // Remove loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.hidden = true;
        }
    }, 500);

    // Initialize core features
    updateGreeting();
    updateOnlineStatus();
    renderTopTasks();
    renderServices();
    renderPopular();
    renderNews();
    initStatusBanner();

    // Initialize interactive components
    new ThemeManager();
    new CommandPalette();
    new VoiceSearch();
    new AnimationObserver();

    // PWA
    registerServiceWorker();

    // Performance monitoring
    monitorPerformance();

    // Track page view
    Analytics.track('page_view', {
        path: window.location.pathname,
        referrer: document.referrer
    });

    console.log('✅ Initialization complete');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for debugging
window.councilApp = {
    personalization,
    showToast,
    searchServices,
    CONFIG
};
