# PlanWise Haus — Excel Template Builder

Premium sellable `.xlsx` spreadsheet products for the [PlanWise Haus Etsy shop](https://www.etsy.com/shop/PlanWiseHaus).

> "Excel Templates for Life & Home"

---

## Repository Structure

```
planwisehaus-templates/
├── brand/                          Brand assets (logo, Etsy banner)
├── skill/                          Claude Code skill for AI-assisted builds
│   └── planwisehaus-product-builder/
│       ├── SKILL.md                Main skill — workflow, brand palette, build rules
│       └── references/
│           ├── blueprints.md       Product blueprints (tab lists, features per category)
│           ├── openpyxl-patterns.md  Copy-paste openpyxl code patterns
│           └── quality-gate.md     Post-build checklist + auto-check script
└── templates/                      One folder per product
    └── annual-budget/
        ├── build.py                Python build script (recommended)
        ├── build.js                Node.js build script (backup, no native charts)
        ├── package.json            Node.js dependencies
        └── sample-output/          Ready-to-sell .xlsx file
```

---

## Brand Palette

All products use these exact colors — never substitute.

| Role | Hex | Used For |
|------|-----|----------|
| Primary | `#2C5F5A` | Titles, nav text, tab color |
| Secondary | `#3D8A85` | Section headers, active nav |
| Accent (Gold) | `#C9A845` | KPI card tops, input borders |
| Background | `#EDEAE2` | Sheet background (warm cream) |
| Light Teal | `#E0F0EE` | Alternating rows, KPI fill |
| Input Yellow | `#FFFDE8` | User input cells |
| Success | `#2E7D52` | On-budget, surplus |
| Danger | `#C0392B` | Over-budget, deficit |

---

## Requirements

```bash
# Python (recommended)
Python 3.12+
pip install openpyxl

# Node.js (backup — no native chart support)
Node.js 18+
npm install  # from templates/annual-budget/
```

---

## Building a Template

```bash
# Python (generates charts natively)
python templates/annual-budget/build.py

# Node.js
cd templates/annual-budget
node build.js
```

Output is saved to the same folder as the script as `PlanWiseHaus_[Product]_[Year].xlsx`.

---

## Using the Claude Skill

The `skill/` folder contains a Claude Code skill that automates the entire build workflow.

**Install the skill:**
1. Copy `skill/planwisehaus-product-builder/` into `~/.claude/skills/`
2. Restart Claude Code — the skill appears automatically

**How it works:**
Drop an Etsy link or say "build me a [X] template" and the skill will:
- Match to the right blueprint
- Apply PlanWise Haus branding automatically
- Generate and run the Python build script
- Deliver the `.xlsx` with quality checks

**Updating the skill:**
After each product build, feedback is incorporated into the skill's reference files so every future template improves.

---

## Adding a New Template

1. Identify the product category and match (or add) a blueprint in `skill/planwisehaus-product-builder/references/blueprints.md`
2. Create a new folder: `templates/[product-name]/`
3. Write `build.py` following the patterns in `skill/.../references/openpyxl-patterns.md`
4. Run the quality gate from `skill/.../references/quality-gate.md`
5. Save the `.xlsx` output to `templates/[product-name]/sample-output/`
6. If any patterns or blueprints were improved, update the relevant skill reference files

---

## Products

| Template | Tabs | Status |
|----------|------|--------|
| Annual Budget | 29 | Complete |
| Book Tracker | 7 | Blueprint ready |
| Wedding Planner | 22 | Blueprint ready |
| Fitness Tracker | 10 | Blueprint ready |
| Project Manager | 8 | Blueprint ready |
