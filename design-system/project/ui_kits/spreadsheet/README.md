# Spreadsheet UI Kit

High-fidelity HTML recreation of a PlanWiseHaus Excel template, used as a design reference for any mock, slide, marketing screenshot, or Figma trace. Built from the production `openpyxl` patterns in `skill/planwisehaus-product-builder/references/openpyxl-patterns.md` — every layout decision (gold strip on row 1, navigation cols A–B, gridlines off, white-on-teal section headers, light-teal column headers, gold KPI accent strip, yellow input cells with gold underline) comes from that source.

## Components

- `SheetFrame.jsx` — the chrome every sheet wears: gold accent strip, sidebar nav, title lockup, tab strip
- `SidebarNav.jsx` — left rail with sectioned tab links and active highlight
- `KPICard.jsx` — gold-topped KPI tile with merged value row and uppercase label
- `SectionHeader.jsx` — dark teal section banner
- `DataTable.jsx` — zebra rows, light-teal column header, traffic-light status, data bars
- `InputCell.jsx` — pale-yellow fill, gold underline
- `ChartDonut.jsx` / `ChartBar.jsx` — flat SVG charts in brand palette
- `screens/DashboardScreen.jsx` — Annual Budget dashboard view
- `screens/MonthlyScreen.jsx` — January (monthly) view
- `screens/SetupScreen.jsx` — Setup tab

## Run

Open `index.html`. The header tabs switch between Setup → Dashboard → January.

## Source of truth

- `https://github.com/sri-sam/planwisehaus-templates/blob/master/skill/planwisehaus-product-builder/references/openpyxl-patterns.md`
- `https://github.com/sri-sam/planwisehaus-templates/blob/master/skill/planwisehaus-product-builder/references/blueprints.md`
