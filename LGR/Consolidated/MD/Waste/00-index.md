---
title: Waste and recycling content — structure notes
audience: developers building the show/hide layer
source: Difference Engine (poc-web-{council}-bins-and-recycling domains)
generated: 2026-06-30
---

# How this content is marked up

Same convention as the council tax set:

```
<!-- common -->
... text that applies to every council ...
<!-- /common -->

<!-- council:gloucester -->
... text that only applies to Gloucester ...
<!-- /council:gloucester -->
```

Valid council keys: `gloucester`, `stroud`, `cotswold`, `forest-of-dean`, `tewkesbury`.

# This topic is structured differently to council tax — read this before building

Council tax has a national statutory layer underneath it: the legislation is identical everywhere, so most content really is common with local figures slotted in.

Waste and recycling has no equivalent national layer. There's no Difference Engine `statutory-waste` domain because there isn't one in law to extract — the Environmental Protection Act 1990 sets a duty to collect, but container types, colours, bag vs bin, collection frequency, and what's accepted are decided independently by each of the five councils, each contracting their own collection service (Tewkesbury and others use Ubico; arrangements vary).

Practical consequence: **most of this content is council-specific by default.** What's common is the underlying logic and behaviour expected of residents, not the specific scheme. Don't force five councils' bin colours into a shared block just because the surrounding sentence is generic — colour, container type and frequency are exactly the things that differ.

# What's actually common vs different

**Common (same expectation everywhere, different only in delivery mechanics):**
- Food waste must not go in garden waste (national animal by-products rule, same reasoning cited by all five)
- General principles: don't put hazardous/clinical waste, garden waste, building waste or liquids in the general waste bin
- Don't put recycling in plastic bags/carrier bags loose in boxes (contamination risk) — though Tewkesbury's narrow-access round is the one exception, since their blue sacks *do* take loose recycling by design
- Containers must be out by a set time on collection day (all early morning, time varies)
- Bulky waste, small electricals, garden waste are typically separate paid/opt-in services
- Missed collection reporting exists everywhere

**Different (genuinely local — container colour, scheme structure, pricing):**
- Container types and colours (black bin/green box/blue sack in Gloucester; grey bin/green box/brown bin in Stroud; grey/green/white/blue in Cotswold; black/green/blue in Forest of Dean; green bin/blue bin in Tewkesbury, or four blue sacks + one black sack on the narrow-access round)
- General waste collection frequency and bin size (Tewkesbury moved to 140L bins; others vary)
- Recycling collection frequency: weekly (Forest of Dean) vs fortnightly (Gloucester, Stroud, Cotswold, Tewkesbury)
- Garden waste: subscription cost and structure differs significantly
- What's accepted in each recycling stream (black plastics, cartons, textiles — genuinely different rules, not just presentation)
- Contact details, contractor (Ubico for some), extra-bin charges

# Gaps

Several council pages weren't fully captured in the scrape (notably Cotswold and full general-waste-bin specifics for Gloucester/Stroud beyond what's quoted). Flagged with `[TODO: confirm]` rather than guessed.
