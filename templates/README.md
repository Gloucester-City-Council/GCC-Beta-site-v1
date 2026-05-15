# Gloucester City Council — Page Templates

Four blank, accessible HTML page templates for the Gloucester City Council
website, plus the shared CSS and JavaScript they depend on.

## What's in this folder

```
templates/
├── README.md                ← this file
├── index.html               ← preview index — open this first
├── service-landing.html     ← Template 1 — top of a service area
├── transaction.html         ← Template 2 — forms / "Start now" pages
├── information.html         ← Template 3 — explain a topic
├── faq.html                 ← Template 4 — accordion of questions
└── assets/
    ├── styles.css           ← design system (colours, layout, components)
    ├── a11y.css             ← accessibility widget + reading-ruler styles
    └── site.js              ← a11y widget, reading ruler, form validation
```

Open `index.html` to preview all four templates side by side. Every template
is self-contained — duplicate the file you want and start editing.

---

## How to use a template

1. **Copy** the template file (e.g. `transaction.html`) and rename it for the
   page you're building (e.g. `apply-for-blue-badge.html`).
2. **Search for `[PLACEHOLDER]`** and replace every bracketed string. Anything
   in square brackets is content you must change. Examples:
   - `[Service name]` — name of the parent service (used in nav + breadcrumb).
   - `[Topic title]` — the page H1.
   - `[Question 1 in category 1]` — replace with the real question.
3. **Update the `<title>` and `<meta name="description">`** in `<head>`.
4. **Update the breadcrumb** so the last item matches the page title and
   carries `aria-current="page"`.
5. **Update the primary nav** so the active item carries `aria-current="page"`.
6. **Delete any blocks you don't need.** Every template includes more building
   blocks than most pages will use — pick what fits and remove the rest.

---

## When to use which template

| Template            | Use it when…                                                                 |
|---------------------|------------------------------------------------------------------------------|
| Service landing     | You're introducing a whole service area (e.g. *Parking & Transport*).         |
| Transaction         | The user needs to **do** something — pay, report, apply, register, book.      |
| Information         | You're **explaining** something — policy, process, eligibility, deadlines.    |
| FAQ                 | You're answering the most common questions for a single service area.         |

---

## Breadcrumbs

Every template has a working breadcrumb (`<nav aria-label="Breadcrumb">`) that
follows the standard pattern:

- The last item is the current page and uses `aria-current="page"`.
- All other items are real links.
- The chevron between items is purely decorative (`::before` CSS).

Recommended depth:

- **Service landing** — 2 levels: *Home › Service*
- **Information / Transaction / FAQ** — 3 levels: *Home › Service › This page*

Don't use more than 4 levels — if you need that depth, you're probably mixing
topics that should be split into separate pages.

---

## Accessibility

These templates target **WCAG 2.2 AA** and are designed to be usable by people
who navigate by keyboard, screen reader, screen magnifier or voice.

### What's already wired up

- **Skip link** — the first focusable element jumps to `<main>`.
- **Semantic landmarks** — `<header role="banner">`, `<nav>`, `<main>`,
  `<aside>`, `<footer role="contentinfo">`.
- **Visible focus** — every interactive element shows a yellow GOV.UK-style
  focus ring on `:focus-visible`.
- **Heading hierarchy** — one `<h1>` per page; never skip levels.
- **Reduced motion** — animations honour `prefers-reduced-motion` and the
  *Reduce motion* button in the Accessibility panel.
- **Colour contrast** — all foreground/background pairs meet AA. The
  *High contrast* mode pushes most pairs to AAA.
- **Forms** (transaction template):
  - Every input has a `<label for="…">`.
  - Hints and errors use `aria-describedby`.
  - Errors are surfaced inline **and** in an error summary at the top of the
    form. The summary is given focus and scrolled into view on failed submit.
  - The success state is announced and focused on successful submit.
- **FAQ accordion** — uses native `<details>`/`<summary>` so it announces
  expand/collapse natively and still works with JavaScript disabled.
- **44 × 44 px** minimum target size on every clickable control.

### Accessibility tools widget

A floating *Accessibility* button sits at the bottom-right of every page.
It opens a panel with these controls (all preferences persist in
`localStorage` under the key `gcc-a11y-prefs`):

| Group              | Options                                           |
|--------------------|---------------------------------------------------|
| Text size          | Default · Large · Larger · Largest                |
| Contrast           | Standard · High contrast                          |
| Theme              | Light · Dark                                      |
| Reading aids       | Default / Dyslexia-friendly font; Normal / Wide spacing |
| **Reading ruler**  | **Off · Line · Strip**                            |
| Motion             | Allow motion · Reduce motion                      |

#### Reading ruler — how it works

The reading ruler is a horizontal overlay that helps people keep their place
while reading — especially useful for people with dyslexia, ADHD or visual
processing difficulties.

- **Line** — a single highlighted bar tracks the cursor.
- **Strip** — the bar is clear, everything above and below is dimmed.
- Move the **mouse** vertically to reposition the ruler.
- The ruler also tracks the **focused element** when you tab through the page.
- Press **Alt + ↑** or **Alt + ↓** to nudge the ruler 24 px (handy for
  screen-magnifier users).
- The ruler is hidden from assistive tech (`aria-hidden="true"`); it is a
  purely visual aid.
- It honours *Reduce motion* — the smooth-follow transition is disabled when
  reduced motion is on.

### Changes from the live site

- **The "Official Gloucester City Council service / Sign in to MyGloucester"
  strip across the top has been removed** from every template, as requested.
- The accessibility widget gained the **Reading ruler** option.

---

## Adding a new page

1. Copy the closest template (e.g. `cp information.html new-page.html`).
2. Edit the `<head>` metadata.
3. Edit the breadcrumb in `<nav aria-label="Breadcrumb">`.
4. Replace `[PLACEHOLDER]` content.
5. Update the primary nav's `aria-current="page"` if you're building a new
   top-level section.
6. Test:
   - Tab through the page — every interactive element should show a focus
     ring and reach in a logical order.
   - Open the Accessibility panel and try every setting.
   - Try the page with the keyboard only (no mouse).
   - Resize the browser to 320 px wide — content should remain readable
     without horizontal scrolling.
   - Run an automated check (axe DevTools, Lighthouse, or WAVE).

---

## Editing the design system

Visual changes live in `assets/styles.css`. Tokens are defined at the top of
the file:

```css
:root {
  --primary-base: #0054a4;     /* Gloucester blue */
  --secondary-base: #0A9E9E;   /* Teal for CTAs */
  --focus: #ffdd00;            /* GOV.UK yellow focus ring */
  /* …spacing, type scale, radii, transitions… */
}
```

The same token set is overridden in two places:

- `[data-contrast="high"]` — for the high-contrast accessibility mode.
- `[data-theme="dark"]` — for dark mode.

If you add a colour, add it to all three blocks so the page stays accessible
in every mode.

---

## Editing accessibility behaviour

All accessibility-tool behaviour lives in `assets/site.js`. To add a new
preference:

1. Add a default value to the `defaults` object at the top of the file.
2. Add a `root.dataset.<key> = p.<key>;` line in `apply()`.
3. Add a row of buttons to the panel HTML in `buildWidget()`.
4. Add a CSS rule that targets `[data-<key>="<value>"]` in `styles.css` or
   `a11y.css`.

Everything is wired through the `data-a11y-key` / `data-a11y-value` attributes
on buttons — no extra JavaScript required for a new preference.

---

## Browser support

These templates work in all evergreen browsers (last 2 versions of Chrome,
Edge, Firefox, Safari). The native `<details>`/`<summary>` accordion is the
only feature with older-IE limitations — that's intentional, since the
GOV.UK service manual no longer supports IE.

---

## Licence

Page templates and styling © Gloucester City Council 2026. Available under
the Open Government Licence v3.0 except where otherwise stated.
