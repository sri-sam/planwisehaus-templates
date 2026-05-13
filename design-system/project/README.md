# PlanWiseHaus Design System

> *Excel Templates for Life & Home.*

A design system for **PlanWiseHaus** — a small Etsy studio that makes premium `.xlsx` spreadsheet templates (annual budgets, wedding planners, fitness trackers, book trackers, project managers). Everything PlanWiseHaus ships is built around a single belief from their About page: **taking control of your finances and daily life shouldn't be stressful or complicated.**

This system captures the brand's voice, palette, type, components, and the in-spreadsheet UI grammar so that any mock, slide, marketing page, or product screenshot stays unmistakably PlanWiseHaus.

---

## Sources

| Source | Where | Notes |
|---|---|---|
| Logo + Etsy banner (uploaded) | `assets/logo.png`, `assets/etsy-banner.png` | Visual ground truth for the wordmark, tagline, and chart-house icon |
| Production codebase | [`sri-sam/planwisehaus-templates`](https://github.com/sri-sam/planwisehaus-templates) | The authoritative `openpyxl` build rules — palette, named styles, sheet anatomy, KPI/sidebar/chart patterns |
| Etsy shop | [etsy.com/shop/PlanWiseHaus](https://www.etsy.com/shop/PlanWiseHaus) | The actual storefront PlanWiseHaus operates |

Anyone designing for PlanWiseHaus should browse the GitHub repo for full code-level fidelity — the `skill/planwisehaus-product-builder/` folder holds blueprints (29-tab budget, 22-tab wedding planner, etc.), the `openpyxl-patterns.md` reference, and a quality gate checklist.

---

## Index

```
PlanWiseHaus-Design-System/
├── README.md                   ← you are here
├── SKILL.md                    ← Claude-Code-compatible skill entry
├── colors_and_type.css         ← canonical CSS variables (colors, type, spacing)
├── assets/
│   ├── logo.png                ← primary wordmark + house/chart icon
│   └── etsy-banner.png         ← Etsy storefront banner
├── preview/                    ← design-system cards (one HTML per concept)
│   ├── brand-*.html            ← logo, banner, wordmark, sheet-title lockup
│   ├── colors-*.html           ← primary, neutrals, spreadsheet tints, semantic
│   ├── type-*.html             ← display serif, body sans, mono, type scale
│   ├── spacing-*.html          ← scale, radii, shadows, rules
│   └── comp-*.html             ← buttons, KPI, sidebar, table, pills, charts, …
└── ui_kits/
    ├── spreadsheet/            ← high-fidelity Excel-template recreation
    │   └── index.html          ← Setup ⇄ Dashboard ⇄ January (click-thru)
    └── storefront/             ← Etsy product-detail page recreation
        └── index.html          ← Annual Budget 2025 listing
```

---

## Content Fundamentals

**Voice — calm, encouraging, practical.** The brand promise is *less stress, more intention*. Copy never lectures, never gamifies, never uses "hustle" or "crush." It speaks like a thoughtful friend who's already done the spreadsheet work.

**Pronouns.** Always **"you"** for the customer. **"We"** for the studio (used sparingly). Never "I."

**Casing.**
- **Title Case** for product names and section heads in marketing — *Annual Budget Spreadsheet 2025*.
- **UPPERCASE** with wide letter-spacing for sheet titles inside spreadsheets — `PLANWISE HAUS · DASHBOARD`. This is the brand's signature in-product treatment.
- **Sentence case** for body copy and helper text.

**Tagline.** Always rendered in italic serif small-caps, exactly: *"Excel Templates for Life & Home."* The ampersand is preserved (not "and").

**Emoji.** Sparingly, on social and in delivery emails. Never inside the spreadsheets themselves. The brand vibe is *calm and considered*, not playful.

**Tone examples (copy this register, do not reinvent it):**
- ✅ *"Pale-yellow cells are yours to edit. Everything else is a formula — don't overwrite."*
- ✅ *"At PlanWiseHaus, we believe that taking control of your finances and daily life shouldn't be stressful or complicated."*
- ✅ *"The Dashboard refreshes the moment you fill in a Monthly tab."*
- ❌ *"Crush your budget goals!"* — too aggressive, off-brand
- ❌ *"Slay your finances 💸"* — too casual, off-brand

**Numbers.** Always formatted ("$1,247.83"), never with arbitrary precision. Negative values get the minus sign and the danger red, not parentheses.

---

## Visual Foundations

**Palette.** A warm, grown-up trio: dark teal (`#2C5F5A`), medium teal (`#3D8A85`), and gold (`#C9A845`) on a warm cream (`#EDEAE2`). Surfaces are pure white (`#FFFFFF`) or pale teal (`#E0F0EE`). Inputs always carry pale-yellow (`#FFFDE8`) fill with a gold underline so the user always knows where to type. Semantic: success `#2E7D52`, danger `#C0392B`. The palette is fixed — **never substitute or invent alternatives.**

**Type pairing.**
- **Display:** Cormorant Garamond — an elegant transitional serif used for the Etsy wordmark and any hero/marketing headline. Set in small-caps with wide letter-spacing for the lockup.
- **Body / in-product:** Carlito — Google's metric-compatible twin of **Calibri**, which is the native font of every PlanWiseHaus Excel template. Using Carlito in HTML mocks makes screenshots and prototypes line up pixel-for-pixel with the real product.
- **Mono:** JetBrains Mono — for formulas, numeric data, and hex tokens.

**Backgrounds.** No gradients. No full-bleed lifestyle photography. The visual ground is the warm cream `#EDEAE2`, with a hairline gold rule (`#C9A845`) at the top of every spreadsheet view (the **5-pixel "accent strip"**, row 1 of every sheet). The Etsy banner is the rare exception that uses a soft cream-to-white gradient and a product mockup.

**Animation.** Restrained. Where motion exists, it's a quiet fade or a soft 200ms ease-out hover. **Never bounces, never spring physics, never confetti.** This is a brand that respects the user's attention.

**Hover & press.**
- Hover: 8–12% darken on solid buttons, 6% teal tint background on transparent items.
- Press: shrink 1–2px, no scale animation longer than 120ms.

**Borders & shadows.** Borders are hairline (`#DDD9D0`, warm gray). Shadows are restrained and teal-tinted (`0 2px 4px rgba(31,61,58,.06)`), never the default black box-shadow.

**Corner radii.** Tight. `2–4px` by default — the brand sits inside a spreadsheet world where everything is rectilinear. `8px` for app-shell cards, `14px` only for marketing-side primary cards. **Avoid heavy rounding; it doesn't fit the product.**

**Transparency & blur.** Rarely. Reserved for soft overlays on the storefront only. Inside spreadsheets, everything is opaque.

**Imagery vibe.** Warm, paper-toned, slightly desaturated — *cream and ink*. If photography is needed it should feel like a home office: morning light, neutral walls, plants. Never neon, never high-saturation lifestyle stock.

**Card style.** White fill, hairline gray border, 4–6px radius, optional teal-tinted shadow (level 2). KPI cards always carry a 5-pixel gold strip at the top — that strip is the **signature unit** of the brand.

**The in-spreadsheet grammar (the brand's most repeated pattern).** Every Excel tab has:
1. Row 1 — 5px gold accent strip, full width.
2. Row 2 — title in Calibri 22pt bold: `PLANWISE HAUS · [TAB NAME]`.
3. Row 3 — italic subtitle: `EXCEL TEMPLATES FOR LIFE & HOME`.
4. Cols A–B — sidebar navigation with sectioned tab links + active highlight.
5. Gridlines OFF on every sheet; the warm-cream background fills the visible area.
6. Section headers white on primary teal, column headers white text on light teal with a teal medium-weight underline.
7. KPI cards: gold strip → big value (22pt) → tiny uppercase label (8pt, gray).

If a design doesn't follow this grammar, it doesn't feel like PlanWiseHaus.

---

## Iconography

PlanWiseHaus uses **almost no iconography**. The brand is text-forward and typographic.

- **The one custom mark** is the house-with-chart-arrows in the logo — a small house outline whose roof contains stylised bar/line chart growth arrows in primary/secondary teal with a gold checkmark accent. This mark is reserved for the wordmark lockup and shouldn't be redrawn or reused as a generic icon.
- **System ornaments** that *are* used: the **5-pixel gold accent strip** at the top of every sheet, the **traffic-light status pills** (Paid · Pending · Overdue), the **circle bullet** (8px gold dot) used in feature lists.
- **No icon font.** No Lucide, no Heroicons in the codebase. If you absolutely need a generic UI icon (search, cart, heart), use **Lucide** at 1.5px stroke as a substitution — but prefer **text labels** or **unicode characters** (`★`, `♡`, `⌕`, `▼`, `·`, `›`) which fit the typographic feel.
- **Emoji** appears only in social copy. Inside spreadsheets and product UI: **never**.
- **Flag substitutions when used.** If a mock pulls in a Lucide icon, comment it so the user can replace it with a custom alternative later. Right now in this system the only icons used are unicode glyphs and the original logo PNG.

---

## UI Kits

| Kit | Path | What it covers |
|---|---|---|
| **Spreadsheet** | `ui_kits/spreadsheet/index.html` | The Excel-template UI itself — Setup, Dashboard, January (monthly). Sidebar nav, KPI cards, charts, zebra tables, input cells, status pills, conditional formatting — all in the brand grammar. |
| **Storefront** | `ui_kits/storefront/index.html` | The customer-facing Etsy product-detail page — top nav, shop banner, product gallery, info panel, highlights, reviews, related products, footer. |

---

## Caveats & substitutions

- **Cormorant Garamond** is a Google Fonts substitution for the serif in the Etsy banner. The exact font used to render the banner is unknown — if you have the source vector/font file, please share so we can lock the canonical face.
- **Carlito** is Google's metric-compatible twin of **Calibri** (the native font of every Excel template). On Windows machines Calibri loads natively; everywhere else Carlito stands in.
- **No production codebase for the storefront.** The Etsy storefront UI kit is a recreation of standard Etsy product-page anatomy with PlanWiseHaus branding applied — not a trace of the live Etsy product page (which is fluid and outside the brand's control).
- **Sample data** in every UI-kit screen is illustrative. Treat it as visual filler; do not quote the numbers in real marketing.

---

## Using the system

For *any* PlanWiseHaus design work:
1. Pull `colors_and_type.css` into the HTML.
2. Use components from `ui_kits/spreadsheet/` for any in-product mock.
3. Use components from `ui_kits/storefront/` for any marketing/Etsy mock.
4. Reach for **soft tints** before reaching for new colors — every brand hue has a softened companion in the palette card.
5. When in doubt: **less ornament, more breathing room.** PlanWiseHaus wins on calm and clarity, not maximalism.

See `SKILL.md` for the Claude/Claude-Code skill entry that wraps this system into a reusable AI tool.
