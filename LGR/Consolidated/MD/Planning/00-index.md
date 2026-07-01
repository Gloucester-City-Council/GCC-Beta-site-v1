---
title: Planning content — structure notes
audience: developers building the show/hide layer
source: Difference Engine (poc-web-{council}-planning-and-building domains)
generated: 2026-07-01
---

# How this content is marked up

Same convention as council tax, waste and housing:

```
<!-- common -->
... text that applies to every council ...
<!-- /common -->

<!-- council:gloucester -->
... text that only applies to Gloucester ...
<!-- /council:gloucester -->
```

Valid council keys: `gloucester`, `stroud`, `cotswold`, `forest-of-dean`, `tewkesbury`.

# Where planning sits relative to the other three topics

Planning is closest to council tax's pattern — a genuine national statutory framework (Town and Country Planning Act 1990, the General Permitted Development Order 2015, national decision timescales, the national fee schedule, the Planning Inspectorate's appeal process) that every council administers identically in law, with local variation sitting on top. But there's an important wrinkle council tax didn't have: **two different things both get called "fees," and only one of them is national.**

The core planning application fee (what you pay to have an application considered at all) is set nationally by government regulation — the same amount for the same application type everywhere in England. What genuinely varies by council is the **administrative charge for invalid applications** — a locally-set penalty/cost-recovery fee, and the actual amounts differ significantly between councils (see the fees file). Don't collapse these into one "fees vary by council" statement — that would misrepresent the core fee as local when it isn't.

The other major genuinely-local content is the **Local Plan** — each council has its own by law (a statutory requirement, minimum 15-year horizon), with its own housing delivery numbers set nationally but distributed locally, its own policies, and its own priorities. This is structurally similar to council tax's premium dates: same duty to have one, different content.

# What's actually common vs different

**Common (national law/process, identical everywhere):**
- The application types and what they're for: householder, full, outline (with reserved matters), listed building consent, advertisement consent, lawful development certificates, prior approval/notification, non-material amendments
- Permitted development rights and the General Permitted Development Order 2015 — what you can do without permission, subject to the same national restrictions in conservation areas and for listed buildings
- Statutory decision timescales: 8 weeks for householder/non-major, 13 weeks for major applications, 16 weeks if an Environmental Impact Assessment is required
- Statutory consultation duties: site notices, neighbour notification, technical consultee involvement (Highways, Historic England, Environment Agency), minimum 21-day comment period
- Appeal rights and timescales to the Planning Inspectorate: 8 weeks for advertisement decisions, 12 weeks for householder, 6 months for most other cases — set nationally, not by the council
- Core planning application fees — set by national government regulation, the same fee for the same application type in every council in England
- Permission generally lapses after 3 years if development hasn't started
- Community Infrastructure Levy (CIL) and Biodiversity Net Gain (BNG) requirements — national frameworks, though specific local BNG monitoring fees do vary (see fees file)

**Different (genuinely local):**
- Administrative charges for invalid applications — locally set, and the amounts vary substantially between councils
- Local validation checklists — same underlying national concept (what supporting documents an application needs), but each council maintains and formats its own list, and requirements can differ in detail
- The Local Plan itself: each council's adopted policies, housing delivery numbers, priorities, and review timetable
- Planning committee structure and negotiation protocols
- Contact routes, submission methods beyond the Planning Portal, local admin fees for non-portal submissions
- Local nature/habitat mitigation regimes (e.g. Cotswold and Forest of Dean's Regulation 77 requirements near specific protected sites)

# Gaps

Gloucester's and Cotswold's specific invalid-application admin fee schedules, and Stroud's decision-timescale content, weren't as fully captured as Tewkesbury's and Forest of Dean's in the current scrape. Local Plan housing numbers were only clearly captured for Forest of Dean. Flagged with `[TODO: confirm]` rather than guessed.
