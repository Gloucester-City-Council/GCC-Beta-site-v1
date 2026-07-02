# LGR proofs of concept

Two variations on a post-reorganisation website for a new unitary council
("Newstershire Council"). They share one brand and look identical — the
difference is how much content has moved across:

- **Veneer/** — a thin front door. The home page asks where you live and
  whether you need a county or district service, then links to the right
  existing council website. No service content is hosted here.
- **Consolidated/** — a partial consolidation. High-volume services
  (council tax, bins and recycling, planning, housing, benefits, plus
  county-wide services) are published here with per-area content; the same
  finder covers everything not yet moved across.

## Shared assets

| File | Purpose |
| --- | --- |
| `style.css` | Single stylesheet for both sites, so they cannot drift apart visually |
| `site.js` | Header chrome behaviour (mobile navigation toggle) |
| `veneer.js` | The two-question service finder used on both home pages |
| `area-cookie.js` | `LGRArea` cookie helper (`lgr_area`, 90 days) remembering the visitor's area across both sites |

Consolidated adds its own layer on top:

- `topic.css` — styles for service hubs, topic detail pages and county pages
- `topic-page.js` — area selector, per-council content blocks and tabs for
  every page built on the `ct-` markup
- `home-search.js` — live filter over the home page service index
- `MD/` — markdown source notes the service content was drawn from

Everything is progressively enhanced: without JavaScript the finder and
area selectors fall back to noscript link lists.
