---
title: Council Tax content — structure notes
audience: developers building the show/hide layer
source: Difference Engine (statutory-council-tax domain + poc-web-{council}-council-tax domains)
generated: 2026-06-30
---

# How this content is marked up

Five Gloucestershire councils, one council tax system, mostly the same rules. The differences that exist are local determinations — premium percentages, decision dates, contact details — not different law.

Each content file below uses two block types:

```
<!-- common -->
... text that applies to every council ...
<!-- /common -->

<!-- council:gloucester -->
... text that only applies to Gloucester ...
<!-- /council:gloucester -->
```

Valid council keys: `gloucester`, `stroud`, `cotswold`, `forest-of-dean`, `tewkesbury`.

A `common` block with no council blocks around it is the default render for every council page. A `council:X` block only renders on that council's page. Where a rule is common in structure but the number differs (e.g. "100% from year 1"), the number sits inside the council block and the surrounding sentence sits in common — don't duplicate the whole paragraph five times if only a figure changes.

# What's actually common vs different

**Common (national legislation, identical wording legally permissible everywhere):**
- Exempt dwelling classes (A–W, SI 1992/558)
- Statutory discount mechanics (single person 25%, unoccupied/unfurnished discount mechanism)
- Premium exception classes (E, F, G, H, I, J, K, L, M) — same classes, same conditions, everywhere
- CTR (Council Tax Reduction) statutory pensioner scheme — set centrally, no local discretion
- CTR statutory definitions, income/capital rules

**Different (local determination — same legal power, different number/date per authority):**
- Long-term empty homes premium: when it started, whether full statutory maximum was adopted
- Second homes premium: whether adopted at all, the percentage, the decision date
- Working-age CTR scheme (Default Scheme structure is national; council can vary parameters within it)
- Contact details, application routes, named officers/teams

# Gaps

Where a council's specific figure or date wasn't in scraped content at time of writing, the file says `[TODO: confirm with {council}]` rather than guessing. Don't ship those without checking.
