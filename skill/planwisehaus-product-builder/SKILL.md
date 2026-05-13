---
name: planwisehaus-product-builder
description: >
  Build premium sellable .xlsx spreadsheet products for the PlanWiseHaus Etsy shop.
  Use this skill whenever the user provides an Etsy listing link, describes a spreadsheet
  template to build, says "build me a [X] tracker/planner/budget", wants to create a new
  digital product, or asks to improve an existing template. This skill handles everything:
  brand palette, product blueprint selection, Python script generation, running the build,
  and delivering the final .xlsx. Always trigger for any spreadsheet/template building
  request in this project — do not attempt to build without this skill's guidance.
---

# PlanWise Haus — Premium Digital Product Builder

You are building sellable .xlsx spreadsheet products for the PlanWise Haus Etsy shop
("Excel Templates for Life & Home"). Every product must look worth $15–50: professional,
branded, and immediately useful out of the box.

## Environment

- **Python**: `C:\Users\sammy\AppData\Local\Programs\Python\Python312\python.exe`
- **Library**: openpyxl 3.1.5 (installed)
- **Output folder**: `C:\Users\sammy\OneDrive\Documents\Claude\Projects\Editing Etsy Page\`
- **Build scripts**: Save as `build_<product>.py` in the output folder, then run with Python above
- **Windows console**: Use only ASCII in `print()` statements (no Unicode checkmarks — causes encoding errors)

## Brand Palette — PlanWise Haus

These are the ONLY colors to use across all products. Never substitute or invent alternatives.

```python
C = {
    'primary':   '2C5F5A',   # Dark teal-green — titles, nav text, key labels
    'secondary': '3D8A85',   # Medium teal — section headers, active sidebar, tab color
    'accent':    'C9A845',   # Gold/amber — KPI card tops, input cell borders, highlights
    'bg':        'EDEAE2',   # Warm cream — sheet background
    'data':      'FFFFFF',   # White — data cell fill
    'sidebar':   'F5F2EC',   # Light cream — navigation sidebar
    'gray':      'DDD9D0',   # Warm gray — borders, dividers
    'lt_teal':   'E0F0EE',   # Light teal — alternating rows, KPI card fill, totals
    'input':     'FFFDE8',   # Pale yellow — user input cells
    'success':   '2E7D52',   # Green — on-budget, surplus
    'danger':    'C0392B',   # Red — over-budget, deficit
}
```

**Tab color**: always `2C5F5A` (primary)
**Gold accent strip**: row 1, full width — `C9A845`
**Title format**: `PLANWISE HAUS  ·  [TAB NAME]` in Calibri 22pt bold, primary color
**Subtitle**: `EXCEL TEMPLATES FOR LIFE & HOME` in Calibri 10pt italic, gray

## Workflow

### Step 1 — Identify the Product

If given an Etsy URL: note the product title from the URL slug (Etsy blocks web fetches).
If given a description: use it directly.

Match to a blueprint in `references/blueprints.md`. Read that file now.

### Step 2 — Present the Build Plan

Tell the user:
- **Category** identified
- **Tab count** and full tab list
- **Key features** (charts, formulas, conditional formatting, dropdowns)
- **Palette** being used (always PlanWise Haus — confirm if they want adjustments)

Ask: "Want me to proceed or adjust anything?"

### Step 3 — Write the Python Script

Read `references/openpyxl-patterns.md` for the exact code patterns to use.

Rules that make the difference between amateur and premium:
1. Gridlines OFF on every sheet — `ws.sheet_view.showGridLines = False`
2. Gold accent strip on row 1 of every sheet
3. Navigation sidebar on every sheet (cols A–B) with hyperlinks to all tabs
4. Background fill on the visible area of every sheet
5. Every calculation is a formula — never a hardcoded value
6. Input cells styled with `input` fill + `accent` border bottom
7. Data tables zebra-striped, column headers in `lt_teal`
8. Conditional formatting: red over-budget, yellow warning (85–100%), green surplus
9. Data bars on amount columns
10. Data validation dropdowns wherever a selection exists
11. Sample data in first 3–5 rows of every tracker/log tab
12. Dashboard built LAST — it references all other tabs via formulas

Name the output file: `PlanWiseHaus_[ProductName]_[Year].xlsx`

### Step 4 — Run the Script

```powershell
& "C:\Users\sammy\AppData\Local\Programs\Python\Python312\python.exe" "C:\Users\sammy\OneDrive\Documents\Claude\Projects\Editing Etsy Page\build_<product>.py"
```

### Step 5 — Quality Gate

Read `references/quality-gate.md` and run the check. Fix any issues before delivering.

### Step 6 — Deliver

Tell the user:
- Full path to the `.xlsx` file
- Tab count and what's in each section
- Any features that need manual steps in Excel (e.g., chart insertion if a Python limitation applies)
- What to update in this skill if something wasn't quite right

## Improving the Skill

After every product build, ask the user: "Anything about this template you'd want different next time?" 
If they give feedback that applies to ALL future products (spacing, formula approach, layout, colors), 
update this SKILL.md or the relevant reference file so the improvement sticks.

If they want a blueprint improved (better tab list, different features), update `references/blueprints.md`.
If they want a code pattern changed, update `references/openpyxl-patterns.md`.
