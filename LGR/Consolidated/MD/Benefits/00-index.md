---
title: Benefits and support content — structure notes
audience: developers building the show/hide layer
source: Difference Engine (poc-web-{council}-benefits-and-support and poc-web-{council}-council-tax domains)
generated: 2026-07-01
---

# How this content is marked up

Same convention as the other four topics:

```
<!-- common -->
... text that applies to every council ...
<!-- /common -->

<!-- council:gloucester -->
... text that only applies to Gloucester ...
<!-- /council:gloucester -->
```

Valid council keys: `gloucester`, `stroud`, `cotswold`, `forest-of-dean`, `tewkesbury`.

# Read this before building — there's a live inconsistency in the source data

This topic sits mostly on national welfare law (Universal Credit, Housing Benefit, Pension Credit, disability benefits — all DWP-administered, identical eligibility rules everywhere), so the underlying pattern is close to council tax's: national rules, local delivery. But one area of the scraped content is genuinely unresolved, not just under-captured, and needs a decision before publishing rather than a content fix.

**Discretionary Housing Payments (DHPs) and the Household Support Fund were both replaced nationally by a new Crisis and Resilience Fund (CRF) from 1 April 2026** — a DWP-funded programme explicitly stated to run 1 April 2026 to 31 March 2029. Gloucester's and Stroud's scraped content describes this as a single county-wide fund, applied for online and administered by Gloucestershire County Council via the Family Hub, covering residents of all six Gloucestershire districts. But Cotswold's and Forest of Dean's scraped pages are still titled "Crisis Resilience Fund – Housing Payment" and describe what reads as a district-administered discretionary scheme with district phone numbers and email addresses, in the same format their old district-level DHP scheme used. Tewkesbury's page is headed "Discretionary Housing Payment" / "Housing Payments," explicitly states DHPs ended nationally on 31 March 2026, but then describes what appears to be Tewkesbury's own ongoing "Housing Payment" application process with a Tewkesbury contact address — not a redirect to the county fund.

This isn't a "different by design" pattern like council tax premiums. It reads like a genuine transition where district pages haven't caught up with (or don't fully agree with) the national change, captured only three months after the changeover. **Don't silently pick one interpretation and write it as settled fact.** The safest approach is to route residents to whichever application channel each council's own page currently points to, flag the apparent inconsistency to whoever owns this content area, and confirm directly with each council's benefits team which route is actually live before this goes public — a resident sent to the wrong door for a crisis payment is a real-world consequence, not just an inconvenience.

# What's actually common vs different

**Common (national welfare law, identical everywhere):**
- Universal Credit eligibility, the benefits it replaces, and the migration notice process
- Housing Benefit residual eligibility (for people not required to claim Universal Credit) and Local Housing Allowance mechanics — Broad Rental Market Area, bedroom entitlement rules, the under-35 shared room rate
- Pension Credit eligibility and the extra entitlements it unlocks (help with Council Tax, heating, a free TV licence at 75+)
- Disability benefits signposting: PIP, Attendance Allowance, DLA (children), New Style ESA, Universal Credit LCW/LCWRA — eligibility rules are national and non-means-tested for PIP/Attendance Allowance/DLA
- Carer's Allowance and the Universal Credit carer element eligibility test
- Council Tax Support/CTR — see the council tax topic for full detail; this topic just signposts to it
- Direct payment safeguards for Housing Benefit (paying a landlord directly where a tenant meets vulnerability criteria)

**Different (genuinely local, or currently ambiguous per above):**
- Crisis/emergency payment routes and current administration model — see the warning above
- Local financial advice contact numbers and referral routes
- District-specific hardship funds (e.g. Cotswold's Council Tax Hardship Fund, Stroud's Tenant Support Fund for council tenants)
- Local Citizens Advice branches and their opening hours
- Named local charities and community organisations signposted for debt, food, and fuel support

# Gaps

Several councils' full benefits-and-support index pages weren't as fully captured as Cotswold's and Forest of Dean's cost-of-living pages. Flagged with `[TODO: confirm]` rather than guessed.
