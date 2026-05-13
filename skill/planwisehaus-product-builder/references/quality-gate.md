# Quality Gate

Run this check after every build. Fix any issues before delivering to the user.

```python
def run_quality_gate(filepath):
    import openpyxl
    wb = openpyxl.load_workbook(filepath)
    issues = []
    for ws in wb.worksheets:
        if ws.sheet_view.showGridLines:
            issues.append(f'{ws.title}: gridlines still ON')
        if not ws.sheet_properties.tabColor:
            issues.append(f'{ws.title}: no tab color set')
        for ch in ws._charts:
            if not ch.title:
                issues.append(f'{ws.title}: chart missing title')
    if issues:
        print('QUALITY GATE FAILED:')
        for iss in issues:
            print('  -', iss)
        return False
    else:
        print('Quality gate passed.')
        return True
```

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Gridlines on | `setup_sheet()` not called, or called after cell writes reset the view | Always call `setup_sheet()` first |
| `#REF!` in dashboard | Tab name has a space and formula doesn't quote it | Wrap tab names in single quotes: `='ANNUAL TOTALS'!E19` |
| `UnicodeEncodeError` on Windows | `print()` with emoji or special chars (✓) | Use ASCII only in print statements |
| Chart not showing | Chart added before data rows were written | Write all data first, then `ws.add_chart()` |
| Named style error | `wb.add_named_style()` called after styles already registered | Wrap in `try/except Exception: pass` |
| Sidebar hyperlink broken | Tab name in hyperlink doesn't exactly match sheet title | Tab names are case-sensitive; match exactly |

## Delivery Checklist

- [ ] All tabs present and in correct order
- [ ] Every tab: gridlines off, tab color set, gold accent strip row 1, branded title row 2
- [ ] Every tab: sidebar visible with correct active-tab highlight
- [ ] Dashboard: all KPI card formulas resolve (no `#REF!` or `#NAME?`)
- [ ] Dashboard: all 4 charts present with titles
- [ ] Sample data in first 3–5 rows of tracker/log tabs
- [ ] Input cells styled with yellow fill (pwh_input)
- [ ] Dropdowns present on categorical columns
- [ ] File named `PlanWiseHaus_[Product]_[Year].xlsx`
- [ ] Quality gate script returns no issues
