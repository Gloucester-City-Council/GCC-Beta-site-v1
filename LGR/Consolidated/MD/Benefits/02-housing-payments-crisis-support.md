---
title: Housing payments and crisis support
source: poc-web-{council}-council-tax and poc-web-{council}-benefits-and-support, via Difference Engine
councils: gloucester, stroud, cotswold, forest-of-dean, tewkesbury
---

# Housing payments and crisis support

<!-- common -->
## This is a live transition — read before publishing

Discretionary Housing Payments (DHPs) — the top-up payment councils could award when Housing Benefit or Universal Credit's housing element didn't cover someone's full rent — ended nationally on 31 March 2026. The Household Support Fund also ended on the same date. Both were replaced from 1 April 2026 by a new national scheme, the **Crisis and Resilience Fund (CRF)**, a DWP-funded programme explicitly running until 31 March 2029.

What isn't yet consistent is *how each council is currently presenting this to residents* — and that inconsistency is real in the source data, not an artefact of how it was scraped. Two different pictures appear:

**Picture one (Gloucester, Stroud):** the CRF is a single county-wide fund, applied for online via the Gloucestershire County Council Family Hub, covering residents of Gloucester, Cheltenham, Stroud, Cotswold, Forest of Dean and Tewkesbury alike. GCC assesses every application and pays successful claimants directly. There's also a specific oil heating support strand accessed the same way.

**Picture two (Cotswold, Forest of Dean):** pages still titled "Crisis Resilience Fund – Housing Payment," describing what reads as a district-administered discretionary scheme — apply via an online form to that specific district council, or contact that district's own benefits team by phone or email if you can't apply online. No mention of the GCC Family Hub route.

**Tewkesbury** sits somewhere between the two: its page is headed "Discretionary Housing Payment"/"Housing Payments," states plainly that DHPs ended nationally on 31 March 2026, but then describes an ongoing "Housing Payment" application process with a dedicated Tewkesbury email address and contact number — not a redirect to the county fund, and not obviously the same thing as the CRF either.

Don't collapse this into a single confident common statement. The honest position is: something changed nationally on 1 April 2026, district web content hasn't visibly caught up consistently, and a resident could currently be sent to three different application routes depending which of the five council pages they land on. This needs a direct check with each council's benefits team — not an editorial decision made here — before the site tells residents which door to use.
<!-- /common -->

<!-- council:gloucester -->
**Gloucester City Council.** Presents the Crisis and Resilience Fund as the live route: apply via the Gloucestershire County Council Family Hub webpages. Gloucester's own content separately references a "Housing Payment" reachable from the Universal Credit page, assessed individually — [TODO: confirm whether this is the same CRF route described elsewhere on Gloucester's site, a legacy page not yet retired, or a genuinely separate Gloucester-specific scheme. The two references weren't reconcilable from the current source set.]
<!-- /council:gloucester -->

<!-- council:stroud -->
**Stroud District Council.** States plainly that the Crisis & Resilience Fund replaces the Household Support Fund and is accessed via the Gloucestershire County Council Family Hub webpages, including a specific oil heating support strand for those who qualify. Also separately references a "discretionary housing payment" residents can check eligibility for if Housing Benefit or Universal Credit doesn't cover rent in full — [TODO: confirm whether this Stroud-referenced "discretionary housing payment" is the same CRF route, or a distinct, still-live Stroud scheme; the source content doesn't make this explicit.] Stroud also runs a separate **Tenant Support Fund** specifically for Stroud council tenants (including those in independent living, temporary accommodation, or the rental element of shared ownership) facing financial hardship — discretionary, by application, contact your housing officer.
<!-- /council:stroud -->

<!-- council:cotswold -->
**Cotswold District Council.** Page titled "Crisis Resilience Fund – Housing Payment," describing an application process to Cotswold District Council directly: online form, or phone 01285 623035 / email benefits@cotswold.gov.uk if you can't apply online. Must be receiving Housing Benefit or the housing element of Universal Credit, and show financial hardship from a shortfall (maximum rent restrictions, a non-dependant deduction, household income, or the under-35 shared room rate). Doesn't cover water rates, tenant's levy, or service charges like heating and hot water. Awards are discretionary and not open to appeal, though you can ask for a reconsideration. [TODO: confirm against Gloucester/Stroud's GCC Family Hub route — this content doesn't mention the county-wide fund at all, which may mean it predates the 1 April 2026 transition and hasn't been updated, or may mean Cotswold has kept a locally-administered strand alongside the county fund.] Cotswold also runs a separate **Council Tax Hardship Fund** for people already receiving Council Tax Support whose circumstances are exceptional.
<!-- /council:cotswold -->

<!-- council:forest-of-dean -->
**Forest of Dean District Council.** Page titled "Crisis Resilience Fund – Housing Payments," near-identical in structure and eligibility criteria to Cotswold's — apply online, or phone 01594 812531 / email the council's benefits inbox if you can't. Same exclusions (water rates, tenant's levy, service charges) and same discretionary, non-appealable decision process (reconsideration only). [TODO: same flag as Cotswold — this content doesn't reference the GCC Family Hub route either, and needs reconciling against Gloucester and Stroud's description of a single county-wide fund before publishing.]
<!-- /council:forest-of-dean -->

<!-- council:tewkesbury -->
**Tewkesbury Borough Council.** Page headed "Discretionary Housing Payment" (URL path) / "Housing Payments" (page title) — states that DHPs ended nationally on 31 March 2026 and were replaced by the Crisis and Resilience Fund from 1 April 2026, but then describes an ongoing Tewkesbury "Housing Payment" application (online form, processed in date order, target 28-day assessment) with its own eligibility exclusions: not eligible if your Universal Credit housing element already covers rent in full, if you're requesting rent in advance for a property outside the private rented sector, if you can't provide the required supporting information, or if you don't live in the Tewkesbury Borough Council area. Contact: housingpayment@tewkesbury.gov.uk, 01684 295010. [TODO: this is the most directly contradictory of the five — it announces the national DHP end date and then describes what reads structurally like a continuing DHP scheme under a new name. Confirm directly with Tewkesbury's Senior Welfare Schemes and Compliance Officer whether this is Tewkesbury's own supplementary local scheme running alongside the CRF, a page not yet updated post-transition, or something else, before this goes live.]
<!-- /council:tewkesbury -->
