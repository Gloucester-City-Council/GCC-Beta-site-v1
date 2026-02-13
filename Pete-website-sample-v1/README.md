# Local Authority Homepage Sample

A minimal, accessible homepage for district councils with a focus on user-centred search functionality.

## Overview

This is a sample homepage designed for district councils, inspired by North Northamptonshire Council, Gravesham Borough Council, and Cheshire West and Chester Council. The design prioritises ease of use with a prominent search function and clean service navigation.

## Key Features

### User Experience
- **Search-first design**: Large, centred search box as the primary interface element
- **Autocomplete search**: Real-time suggestions as users type
- **Service tiles**: Clean grid of popular council services with professional icons
- **3-click maximum**: All services accessible within 3 clicks from homepage
- **Consistent design**: Professional, non-emoji style throughout

### Accessibility (WCAG 2.2 AA Compliant)
- High contrast mode toggle
- Keyboard navigation support
- Screen reader compatible with proper ARIA labels
- Skip to main content link
- Focus indicators meeting WCAG 2.2 standards
- Plain language (maximum reading age of 11)
- Responsive design supporting text resizing up to 200%
- Blue underlined hyperlinks with meaningful tooltips
- Alternative text for all images
- Supports assistive technologies

### Technical Standards
- Semantic HTML5
- GOV.UK design principles
- Modern CSS with CSS Grid and Flexbox
- Vanilla JavaScript (no dependencies)
- UK English language
- Single font family (Arial, Helvetica, Verdana)
- Print-friendly styles
- Reduced motion support

## Project Structure

```
Pete-website-sample-v1/
├── index.html                    # Main homepage
├── accessibility-statement.html  # WCAG 2.2 AA accessibility statement
├── styles.css                    # All styling with high contrast support
├── script.js                     # Search autocomplete and accessibility features
└── README.md                     # This file
```

## Services Included

The homepage features district council services only, excluding county council services such as:
- Adult social care
- Schools and education
- Children services
- SEND (Special Educational Needs and Disabilities)
- Highways and potholes
- Blue badges
- Registrars
- Libraries

### District Council Services Featured:
1. Council tax
2. Bins and recycling
3. Planning
4. Housing
5. Benefits
6. Report a problem
7. Licensing
8. Business rates
9. Parks and leisure
10. Elections and voting
11. Environmental health
12. Building control

## Usage

### Opening the Website
Simply open `index.html` in a web browser. No build process or server required.

### Search Functionality
1. Type in the search box (minimum 2 characters)
2. Suggestions appear automatically
3. Use arrow keys to navigate suggestions
4. Press Enter to select or Escape to close
5. Click any suggestion to select it

### Accessibility Features
- **High Contrast Mode**: Click the "Contrast" button in the header
- **Keyboard Navigation**: Tab through elements, use arrow keys in search
- **Screen Readers**: All content is properly labelled with ARIA attributes
- **Text Resizing**: Zoom to 200% without content overflow

### Keyboard Shortcuts
- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter**: Activate buttons and links
- **Arrow Up/Down**: Navigate search suggestions
- **Escape**: Close search suggestions
- **Space**: Activate buttons

## Design Principles

### Layout
- Clutter-free, clean design
- Consistent positioning of components
- Even spacing throughout
- Single font type (Arial/Helvetica/Verdana)
- Larger, centred search bar
- Engaging but professional aesthetic

### Content
- Sentence case for titles
- No repeated content on same page
- Concise language
- Proper heading hierarchy (H1, H2, H3)
- Non-standard acronyms explained

### Call to Action (CTA)
- Single CTA per page
- "Start now" for form submissions
- Contrasting colour from main site
- Positioned below relevant information

### Colours
- Primary: Teal blue (#007a8c) - distinct from county councils
- Links: GOV.UK blue (#1d70b8)
- Focus: Yellow (#ffdd00) - GOV.UK standard
- Text: Near black (#0b0c0c)
- High contrast mode available

## Browser Support

Tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Testing

This website meets WCAG 2.2 AA standards:
- Colour contrast ratios meet AA standards
- All interactive elements keyboard accessible
- Screen reader tested with NVDA and VoiceOver
- Focus indicators visible and clear
- No content relies solely on colour
- Text alternatives provided for all images
- Proper heading structure maintained

## Customisation

### Changing Colours
Edit CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #007a8c;
    --link-color: #1d70b8;
    /* etc. */
}
```

### Adding Services
1. Add service data to `searchData` array in `script.js`
2. Add service card HTML in `index.html` services grid
3. Update accessibility statement if needed

### Modifying Search Behaviour
Edit the search functions in `script.js`:
- `handleSearch()`: Filters and displays results
- `displaySuggestions()`: Renders suggestion list
- `performSearch()`: Handles final search submission

## Future Enhancements

Potential improvements for production:
- Connect to actual council service pages
- Implement full search results page
- Add session persistence for user preferences
- Integrate with council CMS
- Add analytics tracking
- Implement cookie consent banner
- Add multilingual support
- Include service status indicators

## Compliance

This website follows:
- Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
- GOV.UK Service Standard
- GOV.UK Design System principles
- Public Sector Bodies Accessibility Regulations 2018
- UK English language standards

## Credits

Design inspired by:
- GOV.UK Design System
- North Northamptonshire Council
- Gravesham Borough Council
- Cheshire West and Chester Council

## Licence

This is a demonstration project created for evaluation purposes.

## Contact

For questions about this demonstration, refer to the accessibility statement included in the project.

---

Last updated: 13 February 2026
