---
title: Gloucestershire County Council service pages — structure notes
audience: developers building the site
source: Difference Engine (poc-web-gcc-* domains)
generated: 2026-07-01
---

# Why these files don't use the common/different markup

The council tax, waste, housing, planning and benefits sets all used `<!-- common -->` / `<!-- council:x -->` blocks because five separate councils were each delivering the same underlying service, with genuine variation in the detail.

Gloucestershire County Council is one authority. There's no cross-council variance to mark up — a page about Adult Social Care doesn't have a Cotswold version and a Tewkesbury version, because the county runs it once for the whole of Gloucestershire. So these five files are plain content pages, written straight through, no conditional blocks.

The five areas: Adult Social Care, Children's Services, Highways, Waste Disposal (Household Recycling Centres), Libraries.

# One thing worth carrying over from the source data

Two genuine discrepancies turned up in GCC's own published content and are called out inline rather than silently resolved:

- The Children's Services Emergency Duty Team phone number appears as both 01452 614758 and 01452 614194 across different GCC pages. Verify which is correct before this goes live — an emergency safeguarding number is not something to get wrong.
- A few figures (pothole repair totals, road resurfacing counts) were given without a clear reporting-period date attached. They're marked as needing a freshness check before reuse.

Everything else is written from GCC's own published pages, captured 1 July 2026.
