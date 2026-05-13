---
name: planwisehaus-design
description: Use this skill to generate well-branded interfaces and assets for PlanWiseHaus, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping PlanWiseHaus templates, marketing pages, Etsy listings, slides, and any other brand surface.
user-invocable: true
---

# PlanWiseHaus Design Skill

PlanWiseHaus is a small Etsy studio that sells premium `.xlsx` spreadsheet templates ("Excel Templates for Life & Home"). The brand promise is *less stress, more intention* — calm, warm, grown-up, never gamified.

Read `README.md` in this skill first — it covers the brand voice, content fundamentals, visual foundations (palette, type, spacing, motion, iconography), and the canonical in-spreadsheet grammar. Then explore:

- `colors_and_type.css` — all CSS variables (palette, type tokens, spacing, radii, shadows, rules)
- `preview/*.html` — one card per design-system concept; useful as visual reference and as ready-to-paste markup
- `ui_kits/spreadsheet/` — high-fidelity recreation of the Excel-template UI (Setup / Dashboard / January click-thru)
- `ui_kits/storefront/` — Etsy-style product-detail page recreation
- `assets/logo.png`, `assets/etsy-banner.png` — the only first-party visual assets

## When invoked

If creating **visual artifacts** (slides, mocks, throwaway prototypes, marketing pages): copy `colors_and_type.css` plus any needed components out of `ui_kits/`, build static HTML, and surface it to the user. Always preserve the in-spreadsheet grammar where it applies — row-1 gold strip, sheet title lockup, gridlines off, pale-yellow input cells.

If working on **production code** (a real Etsy listing, the actual `openpyxl` template builder, a real marketing site): read the rules in `README.md` thoroughly, lift palette and component definitions, and check work against the patterns in the source repo (`https://github.com/sri-sam/planwisehaus-templates`) — that repo is the production source of truth for the spreadsheet products themselves.

If invoked **without further guidance**: ask the user what they want to build, ask 3–5 focused questions (which surface — spreadsheet, storefront, social, slide? which product — annual budget, wedding planner, fitness tracker? variations needed?), then act as an expert PlanWiseHaus designer and output HTML or code.

## Hard rules — do not violate

- Palette is fixed. Never substitute or invent alternatives. Soft tints exist in `colors_and_type.css` for layouts that need lightening.
- Inside spreadsheets: Calibri (or Carlito as web fallback), gridlines off, gold accent strip on row 1, branded title row 2.
- The tagline is *Excel Templates for Life & Home* — with an ampersand, in italic serif.
- No emoji inside spreadsheets, ever. No gradients. No drop-shadow flourishes. No icon spam.
- Pronouns: **you** for the customer, **we** for the studio (sparingly).
