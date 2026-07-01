---
title: Housing content — structure notes
audience: developers building the show/hide layer
source: Difference Engine (poc-web-{council}-housing domains)
generated: 2026-07-01
---

# How this content is marked up

Same convention as council tax and waste:

```
<!-- common -->
... text that applies to every council ...
<!-- /common -->

<!-- council:gloucester -->
... text that only applies to Gloucester ...
<!-- /council:gloucester -->
```

Valid council keys: `gloucester`, `stroud`, `cotswold`, `forest-of-dean`, `tewkesbury`.

# This topic is structured differently again — read this before building

Council tax had a national statutory layer (identical everywhere) plus local figures. Waste had no shared layer at all — five independent contracted schemes. Housing is a third pattern: it has **both** a genuine national statutory duty (Housing Act 1996 Part 7, as amended by the Homelessness Reduction Act 2017 — same law, same process, same tests, everywhere) **and** a genuinely shared regional delivery mechanism, not just similar local schemes but one actual joint scheme: **Homeseeker Plus**, a single choice-based lettings partnership covering all five Gloucestershire councils plus West Oxfordshire. The same priority bands (Emergency, Gold, Silver, Bronze), the same bidding mechanics, the same assessment timescales apply whichever of the five councils' pages a resident lands on. This is closer to true common content than council tax's "same law, different number" pattern — it's closer to "same service, different front door."

What's genuinely different is narrower than in waste: the specific temporary accommodation options, contact routes, named local strategies (each council separately adopted its own Preventing Homelessness Strategy 2025–2030, even though several use near-identical wording for the four priorities), and — the one area with real substantive variation — supported and sheltered housing provision, since that depends on which providers (Anchor, Bromford, Housing 21, etc.) actually operate stock in that district.

# What's actually common vs different

**Common (national law or shared regional scheme, genuinely identical):**
- Homelessness duties: priority need categories, the 56-day threat-of-homelessness threshold, duty to prevent, duty to relieve, intentional homelessness test, local connection test, duty to refer (Homelessness Reduction Act 2017 s.213B)
- Homeseeker Plus: the scheme itself, registration process, priority bands, bidding mechanics (3 live bids, weekly cycle), assessment timescale (4–6 weeks), eligibility/ineligibility grounds (savings/income "sufficient to meet needs on the open market" test), local connection criteria
- Severe Weather Emergency Protocol (SWEP) — county-wide, same trigger temperatures, same purpose
- Rough sleeping referral route via StreetLink, feeding the same Gloucestershire Assertive Outreach Team (Julian House)
- National affordable home ownership routes: First Homes scheme, shared ownership definition and mechanics
- HomeSwapper — same national mutual exchange service, free to Gloucestershire tenants via county membership

**Different (genuinely local):**
- Temporary/emergency accommodation arrangements and specific providers
- Contact numbers, out-of-hours routes, named housing teams
- Each council's own Preventing Homelessness Strategy adoption date (even where the four priorities are worded almost identically)
- Supported and sheltered housing schemes — depends entirely on which providers operate in that district
- New affordable housing development pipeline and any cross-border bidding arrangements (e.g. Gloucester residents bidding on Tewkesbury-borough new-build sites via a joint delivery partnership)
- Local Housing Allowance guidance framing (same national LHA rules, but presented differently)

# Gaps

Gloucester and Stroud's core homelessness-duties pages weren't as fully captured as Forest of Dean's in the current scrape; Cotswold and Tewkesbury's Homeseeker Plus registration pages are thin compared to Forest of Dean's detailed FAQ. Flagged with `[TODO: confirm]` rather than guessed.
