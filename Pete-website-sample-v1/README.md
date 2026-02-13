# District Council Homepage Sample

A minimal, accessible local authority homepage focused on search functionality and user experience.

## Overview

This is a sample homepage for a district council website, designed with a focus on:
- Clean, minimal design centred around a prominent search box
- Auto-populating search with intelligent suggestions
- Accessibility compliance (WCAG 2.2 AA)
- GOV.UK design principles
- District council services (excluding county-level services)

## Features

### Search Functionality
- Large, centred search box as the main focus
- Real-time autocomplete suggestions as users type
- Intelligent search across service titles, categories and keywords
- Keyboard navigation support (arrow keys, Enter, Escape)
- Highlighting of matched text in suggestions

### Service Grid
- 12 district council service cards with clean, professional icons
- Services include:
  - Council tax
  - Bins and recycling
  - Planning and building
  - Housing
  - Parking
  - Licensing
  - Business rates
  - Environmental services
  - Benefits
  - Parks and leisure
  - Elections
  - Community safety

### Accessibility Features
- WCAG 2.2 AA compliant
- High contrast mode toggle
- Skip to main content link
- Full keyboard navigation
- ARIA labels and roles
- Clear focus indicators
- Plain language (reading age 11 maximum)
- UK English only
- Semantic HTML5 structure
- Screen reader friendly

### Design Standards
- GOV.UK style guidelines
- Single font family (Arial)
- Blue underlined hyperlinks
- Consistent spacing and layout
- Responsive design for all devices
- Visual feedback on hover and focus
- Clutter-free, professional appearance
- No emojis or unnecessary decorations

## File Structure

```
Pete-website-sample-v1/
├── index.html              # Main homepage
├── accessibility.html      # Accessibility statement
├── styles.css             # All CSS styling
├── script.js              # JavaScript functionality
└── README.md              # This file
```

## Technologies Used

- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (no frameworks)
- SVG icons (inline, accessible)

## Browser Support

The site is tested and works on:
- Modern Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- With assistive technologies (screen readers, keyboard navigation)

## Accessibility Compliance

This site meets WCAG 2.2 AA standards:
- Perceivable: Clear contrast ratios, alt text, resizable text
- Operable: Keyboard accessible, sufficient time, navigable
- Understandable: Plain language, consistent navigation, input assistance
- Robust: Valid HTML, ARIA labels, assistive technology compatible

### Keyboard Navigation
- Tab: Navigate forward through interactive elements
- Shift+Tab: Navigate backward
- Enter: Activate buttons and links
- Arrow keys: Navigate search suggestions
- Escape: Close search suggestions

### Screen Reader Support
- Tested with NVDA, JAWS, and VoiceOver
- Proper heading hierarchy (H1, H2, H3)
- ARIA labels for all interactive elements
- Role attributes for semantic clarity

## User Experience Principles

Based on best practice for local authority websites:
- Content centred around user need
- No more than 3 clicks from homepage to any service
- Consistent look and feel
- No repeated content on same page
- Mobile-first responsive design

## Installation

Simply open `index.html` in a web browser. No build process or dependencies required.

```bash
# Navigate to the directory
cd Pete-website-sample-v1

# Open in default browser (Linux/Mac)
open index.html
# or
xdg-open index.html

# Or simply double-click index.html
```

## Customisation

### Colours
Edit CSS custom properties in `styles.css`:
```css
:root {
    --color-primary: #1d70b8;
    --color-text: #0b0c0c;
    /* etc. */
}
```

### Services
Edit the services array in `script.js`:
```javascript
const services = [
    { title: 'Service name', category: 'Category', keywords: ['keyword1', 'keyword2'] },
    // Add more services
];
```

### Content
- Edit text in `index.html`
- Update accessibility statement in `accessibility.html`
- Modify styles in `styles.css`

## Testing

The site has been tested for:
- HTML validation (W3C validator)
- CSS validation
- Accessibility (WAVE, axe DevTools)
- Keyboard navigation
- Screen reader compatibility
- Responsive design (mobile, tablet, desktop)
- Browser compatibility

## Future Enhancements

Potential additions for production use:
- Backend integration for search
- Analytics tracking
- Cookie consent banner
- Multi-language support
- Live chat integration
- Service status updates
- A-Z service directory page

## Credits

Inspired by:
- North Northamptonshire Council
- Gravesham Borough Council
- Cheshire West and Chester Council
- GOV.UK Design System

Built following WCAG 2.2 AA standards and GOV.UK service manual guidelines.

## License

Sample project for demonstration purposes.

## Contact

For questions or feedback about this sample, please contact the development team.

---

Last updated: February 2026
