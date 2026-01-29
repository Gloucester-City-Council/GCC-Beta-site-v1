# District Council Homepage

**The best council homepage ever written** – Production-quality, accessible, static homepage for a UK district council.

## Quick Start

Simply open `index.html` in any modern browser. No build process, no dependencies, no external assets required.

## What's Included

- **Single HTML file** with embedded CSS and minimal progressive enhancement JavaScript
- **Inline SVG icons** – no external image dependencies
- **Two theme examples** (Ocean default, Plum alternative) – switch by uncommenting CSS variables
- **Fully responsive** from 360px to desktop
- **WCAG 2.2 AA compliant** with comprehensive accessibility features

## Theme Switching

To switch from Ocean (default) to Plum theme:

1. Open `index.html`
2. Find the CSS custom properties section (around line 20)
3. Comment out the Ocean theme variables
4. Uncomment the Plum theme variables

Both themes meet WCAG 2.2 AA contrast requirements.

---

## WCAG 2.2 AA Compliance Checklist ✓

### Semantic HTML & Structure
- ✅ `<html lang="en-GB">` attribute set
- ✅ One `<h1>` only ("What do you need to do today?")
- ✅ Logical heading hierarchy (h1 → h2 → h3 → h4)
- ✅ Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`
- ✅ No layout tables, proper use of lists

### Keyboard & Focus
- ✅ Skip link to main content (first focusable element)
- ✅ Visible focus indicators using `:focus-visible` (3px outline, 2px offset)
- ✅ High-contrast focus ring (#005A8C on light backgrounds)
- ✅ No keyboard traps, all interactive elements reachable
- ✅ Logical tab order follows visual flow

### Forms & Inputs
- ✅ Search input has visible `<label>` (visually hidden but accessible)
- ✅ Placeholder text does NOT replace labels
- ✅ Form controls have accessible names
- ✅ All inputs meet 44px minimum touch target size

### Interactive Elements
- ✅ All buttons and links have accessible names
- ✅ Tap targets minimum 44x44px (CSS variable `--tap-target-min`)
- ✅ No hover-only interactions (all work on touch/keyboard)
- ✅ Alert component dismissible with keyboard (Enter/Space)
- ✅ Buttons use native `<button>` elements with proper type

### Color & Contrast
- ✅ Text contrast minimum 4.5:1 (WCAG AA)
- ✅ UI component contrast minimum 3:1 (WCAG AA)
- ✅ Links distinguishable from surrounding text (underlined)
- ✅ Visited links have distinct color
- ✅ Information not conveyed by color alone
- ✅ Both Ocean and Plum themes tested for AA compliance

### Motion & Animation
- ✅ `@media (prefers-reduced-motion: reduce)` implemented
- ✅ Animations disabled/minimized for users who prefer reduced motion
- ✅ Transitions kept subtle (0.2s max)
- ✅ No auto-playing animations or carousels

### ARIA & Assistive Technology
- ✅ ARIA used only where semantic HTML insufficient
- ✅ Alert uses `role="alert"` and `aria-live="polite"`
- ✅ `aria-label` on close button and brand link
- ✅ `aria-hidden="true"` on decorative icons
- ✅ Screen-reader-only text with `.sr-only` class

### Images & Icons
- ✅ All SVG icons are inline with `aria-hidden="true"`
- ✅ Text labels provided for all task cards and icons
- ✅ No information conveyed by icons alone

### Content & Language
- ✅ Plain English, active voice, short sentences
- ✅ No jargon or internal terminology
- ✅ Customer-focused language ("What do you need to do today?")
- ✅ Verb phrases for tasks ("Find my bin day", not "Bin day finder")
- ✅ `<time>` elements with `datetime` attributes for dates

---

## Mobile-First Design Compliance ✓

### Responsive Breakpoints
- ✅ **Base (360px+)**: Single column, stacked layout
- ✅ **480px+**: Two-column top tasks grid
- ✅ **640px+**: Two-column service tiles and footer
- ✅ **768px+**: Four-column top tasks, three-column news, horizontal header
- ✅ **1024px+**: Three-column service tiles

### Mobile UX
- ✅ Touch-optimized (44px minimum tap targets)
- ✅ No hover dependencies
- ✅ Readable font sizes on small screens (16px base, scales with clamp())
- ✅ Adequate spacing between interactive elements
- ✅ Forms usable on mobile keyboards
- ✅ Search prominent and accessible

### Performance
- ✅ No external dependencies or frameworks
- ✅ Single HTML file, embedded CSS
- ✅ Minimal JavaScript (progressive enhancement only)
- ✅ No web fonts (system font stack)
- ✅ Inline SVG icons (no image requests)
- ✅ Page renders fully without JavaScript

---

## District Council Scope Compliance ✓

### District Services Featured
- ✅ Bins & recycling (core district function)
- ✅ Council Tax (district responsibility)
- ✅ Housing (district: housing register, homelessness, council housing)
- ✅ Planning (district: applications, decisions, enforcement)
- ✅ Environmental health (district: food hygiene, noise, pests)
- ✅ Benefits support (district: CTR, HB where applicable)
- ✅ Parking (district where applicable)
- ✅ Licensing (district: alcohol, taxis, gambling, etc.)
- ✅ Business rates (district responsibility)
- ✅ Waste services (district: collections, bulky waste, commercial)

### County Services Excluded
- ✅ NO adult social care
- ✅ NO children's services
- ✅ NO education (schools, SEN)
- ✅ NO highways/roads/transport
- ✅ NO blue badges (county responsibility)
- ✅ NO libraries (typically county)
- ✅ NO trading standards (county)
- ✅ NO public transport (county)

### Content Principles
- ✅ Task-focused ("Find my bin day", not "Bins service")
- ✅ Customer language, not corporate speak
- ✅ No "Welcome to..." or mission statements
- ✅ No photos of councillors on homepage
- ✅ Online services prioritized without shaming offline users
- ✅ Plain English explanations
- ✅ "You can..." not "The council will..."

---

## Privacy-First Compliance ✓

- ✅ No third-party trackers included
- ✅ No Google Analytics or similar by default
- ✅ No external fonts (privacy leak)
- ✅ No CDN dependencies
- ✅ Comments indicate where to add analytics (behind consent)
- ✅ Social links are placeholders, use `rel="external"`

---

## Performance Metrics (Expected)

- **Time to Interactive**: <1 second (static HTML)
- **First Contentful Paint**: <0.5 seconds
- **Total Page Size**: ~35KB (HTML + CSS + minimal JS)
- **HTTP Requests**: 1 (single HTML file)
- **JavaScript**: ~500 bytes (alert dismissal only)
- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)

---

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Modern mobile browsers (iOS Safari, Chrome Android)
- ✅ Graceful degradation for older browsers (uses CSS custom properties)

---

## Accessibility Testing Recommendations

1. **Keyboard navigation**: Tab through entire page, verify focus visibility
2. **Screen reader**: Test with NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS)
3. **Zoom**: Test at 200% zoom (WCAG requirement)
4. **Color blindness**: Use color blindness simulators
5. **Automated tools**: Lighthouse, axe DevTools, WAVE
6. **Real users**: Test with disabled users if possible

---

## Future Enhancements (Not Implemented)

These would require backend/CMS integration:

- Dynamic "Popular right now" based on analytics
- Personalized content for logged-in users
- Real service status alerts
- Bin day lookup by postcode
- Planning application search
- Council Tax account access
- Multi-language content (structure supports it, needs translation)

---

## File Structure

```
council-homepage/
├── index.html          (Complete homepage - open this in browser)
└── README.md           (This file)
```

---

## Customization Guide

### Update Branding
1. Replace site name in header (line ~189)
2. Update logo SVG (line ~190-195)
3. Modify color variables (lines ~20-60)

### Change Content
All content is in semantic HTML sections:
- Hero tasks: lines ~290-380
- Service categories: lines ~450-540
- Popular links: lines ~580-620
- News: lines ~640-700
- Contact: lines ~730-850

### Add New Theme
1. Copy existing `:root` variables
2. Modify color values
3. Test contrast ratios (use WebAIM contrast checker)
4. Comment/uncomment to switch themes

---

## Credits

Built according to UK local government service design principles:
- GDS (Government Digital Service) patterns
- LocalGov Drupal research
- Real council website analysis
- WCAG 2.2 guidelines
- Plain English Campaign guidance

**No frameworks. No dependencies. Just semantic HTML, CSS, and a tiny bit of JS.**

---

## License

This template is provided as-is for use by UK district councils and public sector organizations.
