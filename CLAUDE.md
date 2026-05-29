# GCC Beta Site — Claude Code Session Context

## Project
Gloucester City Council HMO (Houses in Multiple Occupation) beta website.
Static HTML/CSS/JS site. No build step. Deployed via Azure Static Web Apps.

## Active branch
`claude/elegant-knuth-v8YaS`

## Active PR
https://github.com/Gloucester-City-Council/GCC-Beta-site-v1/pull/43

## Key paths
| Purpose | Path |
|---------|------|
| HMO pages | `/HMO/web/*.html` |
| Main stylesheet | `/templates/assets/styles.css` |
| Accessibility styles | `/templates/assets/a11y.css` |
| Site JavaScript | `/templates/assets/site.js` |
| Master data schema | `/HMO/hmo_master_schema_v1.json` |

## Naming convention (agreed)
- First mention per page: **Houses in Multiple Occupation (HMO)**
- All subsequent mentions: **HMO**
- Formal legislation titles (e.g. "The Management of Houses in Multiple Occupation (England) Regulations 2006") are always written in full regardless of position.

---

## Completed in this session

### Design & Visual
- [x] Removed "SERVICE" eyebrow label from hero on `index.html` and `landlords.html`
- [x] Removed crosshair/target SVG decoration from hero on `index.html` and `landlords.html`
- [x] Added `white-space: nowrap` span around "in Gloucester" in hero lede to prevent line orphan
- [x] Tab bar scrollbar hidden (`scrollbar-width: none` + WebKit override)
- [x] `.regs-list` CSS class added to suppress auto-counter on regulation lists

### Navigation & Structure
- [x] Naming convention applied across all HMO pages
- [x] `planning.html` title, h1 and breadcrumb updated to include "(HMO)"
- [x] Removed AI-generated "Looking for something else?" section from `index.html` and `landlords.html`
- [x] FAQ content distributed: tenant FAQs embedded in `residents.html`; landlord/enforcement FAQs embedded in `landlords.html`
- [x] `faq.html` converted to a navigation/redirect page
- [x] Duplicate "On this page" sidebar cards removed from `licensing.html`, `residents.html`, `standards.html`, `planning.html` (tab bar retained as the single navigation)

### Functionality & Links
- [x] Broken popular task links fixed:
  - "Check if an HMO is licensed" → `https://www.gloucester.gov.uk/media/yg5l1ndz/hmo-licence-register-december-2025.xlsx`
  - "Report a problem in an HMO" → `https://gloucester-self.achieveservice.com/service/Contact_us`
- [x] Service card titles updated to match destination page h1s
- [x] Footer links updated to remove `faq.html` references across all pages
- [x] `apply.html` lede no longer restates the h1
- [x] `residents.html` lede no longer restates the h1

### UI Components
- [x] Accordion one-at-a-time: `wireAccordions()` added to `site.js`
- [x] Back-to-top link added to all HMO pages
- [x] Regulation list in `standards.html` changed from `ol.steps` to `ol.regs-list` (removes conflicting auto-numbers)

### Accessibility
- [x] Accessibility toolbar icon: stick figure → eye/view SVG
- [x] Reading ruler mousemove lag fixed: `requestAnimationFrame` throttle added
- [x] Dark theme search box: white background forced (was near-invisible)
- [x] Dark + high-contrast fixes: search box, Popular Tasks heading, body text, table text, button text
- [x] Button hover text: `color: #fff` always set; dark/dark+hc overrides correct
- [x] Grammar: "a HMO" → "an HMO" in `licensing.html`
- [x] Management duties regulations: auto-numbering removed (Regulation 3/4/5 conflict fixed)

---

## Outstanding TODOs

### TODO-01 — Mobile layout review
**Priority:** High (must be done before merge)
Check all HMO pages on small screens (≤375px and ≤768px). Known concern: layout is considered cluttered on mobile. Focus areas:
- Service card grid on `index.html` and `landlords.html`
- Tab bar overflow on information pages
- Hero text size and padding
- Popular tasks grid
- Sidebar stacking order on `page-layout` pages
- Back-to-top button positioning

### TODO-02 — Full accessibility audit
**Priority:** High (must be done before merge)
Run a structured audit across all HMO pages. Cover:
- WCAG 2.2 AA colour contrast (all theme/contrast combinations)
- Keyboard navigation (tab order, focus indicators, skip link)
- Screen reader semantics (landmarks, headings, aria attributes)
- Touch target sizes (min 44×44px)
- Form accessibility on `apply.html`
Report findings and fix any failures found.

### TODO-03 — Footer colour token alignment
**Priority:** Medium
Current state:
- Header background: `--primary-base` (`#0054a4`)
- Hero background: `--primary-base` (`#0054a4`)
- Footer background: `--primary-darker` (`#002650`)
The footer is noticeably darker than the header and hero. Decide whether to:
  a) Align footer to `--primary-dark` (`#003D7A`) as a mid-point, or
  b) Align hero to `--primary-darker` to match header/footer, or
  c) Keep the intentional contrast but confirm it is deliberate
Check contrast of all footer text/links against whichever background is chosen. Verify AAA in standard and dark themes.

### TODO-04 — Tone and naming sweep (non-HMO templates)
**Priority:** Low
The HMO pages have been updated but the shared templates in `/templates/` and other service examples (`/Beta-website-sample-v1/`, `/Taxi website/`, etc.) have not been reviewed. Sweep for:
- Any remaining "Houses in Multiple Occupation" without the "(HMO)" on first use
- Inconsistent capitalisation or terminology
- Pages in other service areas that may have inherited the same issues

### TODO-05 — Overall design modernisation
**Priority:** Low (separate discussion required)
The current design is solid government-standard but not the "modern, sleek, revolutionary" aesthetic originally intended. Proposed improvements discussed but not implemented:
- Hero: subtle gradient or angled clip-path replacing flat blue
- Service cards: coloured left-border accent on hover (partial — already present as secondary-base border)
- Typography: tighter letter-spacing on display headings
- Popular tasks: animated arrow on hover
Requires a separate design conversation before implementation.

### TODO-06 — "in Gloucester" wrapping (remaining pages)
**Priority:** Low
The `white-space: nowrap` span fix was applied to the `index.html` and `landlords.html` hero ledes. Check whether similar orphaning occurs on any other page ledesand apply the same fix.

### TODO-07 — Spacing inconsistencies sweep
**Priority:** Medium
A full per-page visual spacing review was deferred. Items to check:
- Padding above/below hero on landing pages
- Gap between tab bar and first section heading
- Sidebar card spacing relative to main content on narrow viewports
- Bottom padding on `apply.html` transaction page

---

## Design decisions made this session
| Decision | Outcome |
|----------|---------|
| HMO naming convention | Full form on first mention per page, abbreviated thereafter |
| Landing page | Keep and simplify (remove AI section, remove Service label, remove SVG) |
| FAQ page | Distribute to relevant pages; convert `faq.html` to navigation page |
| "On this page" vs Tabs | Remove "On this page" sidebar card; keep tab bar |
| Broken task links | Check if licensed → xlsx register; Report problem → AchieveService form |
| Renew licence link | Points to same `apply.html` as new licence |

## Contact details used throughout site
- Phone: 01452 396 396
- Email: heretohelp@gloucester.gov.uk
- Hours: Mon/Tue/Thu/Fri 9am–5pm, Wed 10am–5pm
