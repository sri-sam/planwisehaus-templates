# PlanWise Haus — Core openpyxl Patterns

Copy these patterns exactly. They are the difference between amateur and premium output.
All colors reference the `C` dict defined in SKILL.md.

---

## Pattern 0: Required Imports

```python
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side, NamedStyle
from openpyxl.styles.differential import DifferentialStyle
from openpyxl.formatting.rule import Rule, DataBarRule
from openpyxl.chart import BarChart, LineChart, PieChart, DoughnutChart, Reference
from openpyxl.chart.label import DataLabelList
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.cell.text import InlineFont
from openpyxl.cell.rich_text import TextBlock, CellRichText
```

---

## Pattern 1: Named Styles (define ONCE at workbook level)

```python
def create_styles(wb):
    defs = [
        NamedStyle(name='pwh_title',
            font=Font(name='Calibri', size=22, bold=True, color=C['primary']),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_subtitle',
            font=Font(name='Calibri', size=10, italic=True, color=C['fg_3']),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_sec_hdr',
            font=Font(name='Calibri', size=10, bold=True, color='FFFFFF'),
            fill=PatternFill(start_color=C['primary'], fill_type='solid'),
            alignment=Alignment(horizontal='left', vertical='center', indent=1)),
        NamedStyle(name='pwh_col_hdr',
            font=Font(name='Calibri', size=9, bold=True, color=C['primary']),
            fill=PatternFill(start_color=C['lt_teal'], fill_type='solid'),
            alignment=Alignment(horizontal='center', vertical='center'),
            border=Border(bottom=Side(style='medium', color=C['secondary']))),
        NamedStyle(name='pwh_data',
            font=Font(name='Calibri', size=10, color=C['fg_1']),
            fill=PatternFill(start_color=C['data'], fill_type='solid'),
            alignment=Alignment(vertical='center'),
            border=Border(bottom=Side(style='thin', color=C['gray']))),
        NamedStyle(name='pwh_data_alt',
            font=Font(name='Calibri', size=10, color=C['fg_1']),
            fill=PatternFill(start_color=C['lt_teal_2'], fill_type='solid'),
            alignment=Alignment(vertical='center'),
            border=Border(bottom=Side(style='thin', color=C['gray']))),
        NamedStyle(name='pwh_total',
            font=Font(name='Calibri', size=10, bold=True, color=C['primary']),
            fill=PatternFill(start_color=C['lt_teal'], fill_type='solid'),
            border=Border(top=Side(style='medium', color=C['secondary']),
                         bottom=Side(style='double', color=C['primary']))),
        NamedStyle(name='pwh_input',
            font=Font(name='Calibri', size=10, color=C['fg_1']),
            fill=PatternFill(start_color=C['input'], fill_type='solid'),
            border=Border(bottom=Side(style='thin', color=C['accent'])),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_kpi_val',
            font=Font(name='Calibri', size=22, bold=True, color=C['primary']),
            fill=PatternFill(start_color=C['lt_teal'], fill_type='solid'),
            alignment=Alignment(horizontal='center', vertical='center')),
        NamedStyle(name='pwh_kpi_lbl',
            font=Font(name='Calibri', size=9, bold=True, color='888888'),
            fill=PatternFill(start_color=C['lt_teal'], fill_type='solid'),
            alignment=Alignment(horizontal='center', vertical='center')),
        NamedStyle(name='pwh_nav_link',
            font=Font(name='Calibri', size=9, color=C['primary'], underline='single'),
            fill=PatternFill(start_color=C['sidebar'], fill_type='solid'),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_nav_active',
            font=Font(name='Calibri', size=9, bold=True, color='FFFFFF'),
            fill=PatternFill(start_color=C['secondary'], fill_type='solid'),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_nav_section',
            font=Font(name='Calibri', size=7, bold=True, color=C['fg_4']),
            fill=PatternFill(start_color=C['sidebar'], fill_type='solid'),
            alignment=Alignment(vertical='center')),
    ]
    for s in defs:
        try:
            wb.add_named_style(s)
        except Exception:
            pass
```

---

## Pattern 2: Sheet Setup (every tab gets this)

```python
def setup_sheet(ws, tab_title, active_tab, all_tabs):
    # Gridlines OFF
    ws.sheet_view.showGridLines = False
    # Tab color
    ws.sheet_properties.tabColor = C['primary']
    # Background fill
    bg = PatternFill(start_color=C['bg'], fill_type='solid')
    for row in ws.iter_rows(min_row=1, max_row=120, min_col=1, max_col=50):
        for cell in row:
            cell.fill = bg
    # Row heights
    for r in range(1, 121):
        ws.row_dimensions[r].height = 16
    ws.row_dimensions[1].height = 5   # accent strip
    ws.row_dimensions[2].height = 36  # title
    ws.row_dimensions[3].height = 18  # subtitle
    # Sidebar columns
    ws.column_dimensions['A'].width = 1.5
    ws.column_dimensions['B'].width = 20
    ws.column_dimensions['C'].width = 1.5
    # Gold accent strip (row 1)
    acc = PatternFill(start_color=C['accent'], fill_type='solid')
    for col in range(1, 51):
        ws.cell(row=1, column=col).fill = acc
    # Title: brand prefix in primary, tab name in secondary teal (rich text)
    tf_brand = InlineFont(rFont='Calibri', sz=22, b=True, color=C['primary'])
    tf_tab   = InlineFont(rFont='Calibri', sz=22, b=True, color=C['secondary'])
    ws['D2'] = CellRichText(
        TextBlock(tf_brand, 'PLANWISE HAUS  ·  '),
        TextBlock(tf_tab, tab_title),
    )
    ws['D2'].alignment = Alignment(vertical='center')
    ws['D3'] = 'EXCEL TEMPLATES FOR LIFE & HOME'
    ws['D3'].style = 'pwh_subtitle'
    # Sidebar
    add_sidebar(ws, active_tab, all_tabs)
```

---

## Pattern 3: Navigation Sidebar

Build a NAV list for your product (row, section_label_or_None, tab_name_or_None).
Group tabs into logical sections. The active tab gets highlighted.

```python
def add_sidebar(ws, active_tab, all_tabs):
    sb = PatternFill(start_color=C['sidebar'], fill_type='solid')
    for r in range(1, 121):
        ws.cell(row=r, column=1).fill = sb
        ws.cell(row=r, column=2).fill = sb
    # Brand label
    ws['B2'].value = 'PLANWISE HAUS'
    ws['B2'].font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
    ws['B2'].fill = sb
    # NAV entries — customize per product
    for row, section, link in NAV:
        cb = ws.cell(row=row, column=2)
        cb.fill = sb
        if section:
            cb.value = section
            cb.style = 'pwh_nav_section'
        elif link:
            cb.value = link
            cb.hyperlink = f"#'{link}'!D2"
            cb.style = 'pwh_nav_active' if link == active_tab else 'pwh_nav_link'
```

---

## Pattern 4: Section Header + Column Header helpers

```python
def sec_hdr(ws, row, col, text, span=6):
    ws.merge_cells(start_row=row, start_column=col, end_row=row, end_column=col+span-1)
    c = ws.cell(row=row, column=col)
    c.value = '  ' + text
    c.style = 'pwh_sec_hdr'
    c.alignment = Alignment(horizontal='left', vertical='center', indent=1)
    ws.row_dimensions[row].height = 20

def col_hdr(ws, row, labels, sc=4):
    for i, lbl in enumerate(labels):
        c = ws.cell(row=row, column=sc+i)
        c.value = lbl
        c.style = 'pwh_col_hdr'
    ws.row_dimensions[row].height = 20

def data_row(ws, row, values, sc=4, fmts=None):
    sty = 'pwh_data' if row % 2 == 0 else 'pwh_data_alt'
    for i, val in enumerate(values):
        c = ws.cell(row=row, column=sc+i)
        c.value = val
        c.style = sty
        if fmts and i < len(fmts) and fmts[i]:
            c.number_format = fmts[i]
        if isinstance(val, (int, float)):
            c.alignment = Alignment(horizontal='right', vertical='center')
    ws.row_dimensions[row].height = 18
```

---

## Pattern 5: KPI Dashboard Cards

Cards are 4 cols wide × 4 rows tall. Gold accent strip on top, large value, small label.
Place them starting at column 4 (D), spaced every 5 columns: sc=4, sc=9, sc=14, sc=19...

```python
def kpi_card(ws, sr, sc, label, value_formula, fmt='"$"#,##0'):
    ec = sc + 3
    # Gold accent strip
    ws.row_dimensions[sr].height = 5
    acc = PatternFill(start_color=C['accent'], fill_type='solid')
    for col in range(sc, ec+1):
        ws.cell(row=sr, column=col).fill = acc
    # Value (merged across 4 cols)
    ws.merge_cells(start_row=sr+1, start_column=sc, end_row=sr+1, end_column=ec)
    v = ws.cell(row=sr+1, column=sc)
    v.value = value_formula
    v.style = 'pwh_kpi_val'
    v.number_format = fmt
    ws.row_dimensions[sr+1].height = 34
    # Label
    ws.merge_cells(start_row=sr+2, start_column=sc, end_row=sr+2, end_column=ec)
    l = ws.cell(row=sr+2, column=sc)
    l.value = label
    l.style = 'pwh_kpi_lbl'
    ws.row_dimensions[sr+2].height = 18
    # Spacer
    ws.merge_cells(start_row=sr+3, start_column=sc, end_row=sr+3, end_column=ec)
    ws.cell(row=sr+3, column=sc).fill = PatternFill(start_color=C['lt_teal'], fill_type='solid')
    ws.row_dimensions[sr+3].height = 8
```

---

## Pattern 6: Professional Charts

```python
def style_chart(chart, title, ctype='bar'):
    chart.title = title
    chart.style = 10
    chart.dataLabels = DataLabelList()
    if ctype in ('pie', 'donut'):
        chart.dataLabels.showPercent = True
        chart.dataLabels.showVal = False
    else:
        chart.dataLabels.showVal = True
    if hasattr(chart, 'legend') and chart.legend:
        chart.legend.position = 'b'
    return chart

# Clustered bar/column chart
chart = BarChart()
chart.type = 'col'
chart.grouping = 'clustered'
style_chart(chart, 'Chart Title')
cats = Reference(ws, min_col=1, min_row=DATA_START+1, max_row=DATA_START+N)
data = Reference(ws, min_col=2, max_col=3, min_row=DATA_START, max_row=DATA_START+N)
chart.add_data(data, titles_from_data=True)
chart.set_categories(cats)
chart.width = 18; chart.height = 12
ws.add_chart(chart, 'D18')   # anchor cell

# Line chart
chart = LineChart()
style_chart(chart, 'Trend Title', 'line')

# Donut chart
chart = DoughnutChart()
style_chart(chart, 'Distribution Title', 'donut')
```

**Important**: Put chart source data in a hidden area (rows 60+, cols A–E) of the Dashboard tab.
Fill with formulas referencing other tabs. Never hardcode chart data.

---

## Pattern 7: Conditional Formatting

```python
# Traffic light by text content
def cf_text(ws, rng, text, bg_hex):
    ds = DifferentialStyle(fill=PatternFill(fgColor=bg_hex))
    ws.conditional_formatting.add(rng, Rule(
        type='containsText', operator='containsText', text=text, dxf=ds,
        formula=[f'NOT(ISERROR(SEARCH("{text}",{rng.split(":")[0]})))']))

cf_text(ws, 'J7:J80', 'Paid',     C['success_bg'])  # pale green
cf_text(ws, 'J7:J80', 'Pending',  C['warning'])      # pale yellow
cf_text(ws, 'J7:J80', 'Overdue',  C['danger_bg'])    # pale red

# Over-budget / warning on % Used column
# over_bg (FFE4E0) = lighter pink for the full row; danger_bg (FFCDD2) = pill/status use only
over_ds = DifferentialStyle(
    fill=PatternFill(fgColor=C['over_bg']),
    font=Font(color='B71C1C', bold=True))
warn_ds = DifferentialStyle(fill=PatternFill(fgColor=C['warning']))
ws.conditional_formatting.add('H15:H29',
    Rule(type='cellIs', operator='greaterThan', formula=['1'], dxf=over_ds))
ws.conditional_formatting.add('H15:H29',
    Rule(type='cellIs', operator='between', formula=['0.85', '1'], dxf=warn_ds))

# Data bars (in-cell progress bar)
ws.conditional_formatting.add('F15:F29',
    DataBarRule(start_type='min', end_type='max', color=C['secondary']))
```

---

## Pattern 8: Data Validation Dropdowns

```python
from openpyxl.worksheet.datavalidation import DataValidation

# List from comma-separated values
dv = DataValidation(
    type='list',
    formula1='"Option1,Option2,Option3"',
    showDropDown=False)   # False = show the dropdown arrow
ws.add_data_validation(dv)
dv.add('E7:E100')

# Common dropdown sets
CURRENCY_DV   = '"$,EUR,GBP,JPY,INR,CAD,AUD"'
STATUS_DV     = '"Not Started,In Progress,Review,Complete"'
PRIORITY_DV   = '"High,Medium,Low"'
YESNO_DV      = '"Yes,No"'
RATING_DV     = '"1,2,3,4,5"'
```

---

## Pattern 9: Total Row

```python
def total_row(ws, row, start_col, label, formulas_by_col, formats_by_col=None):
    ws.cell(row=row, column=start_col).value = label
    ws.cell(row=row, column=start_col).style = 'pwh_total'
    for col, formula in formulas_by_col.items():
        c = ws.cell(row=row, column=col)
        c.value = formula
        c.style = 'pwh_total'
        if formats_by_col and col in formats_by_col:
            c.number_format = formats_by_col[col]
    ws.row_dimensions[row].height = 20
```

---

## Main Script Structure

```python
def main():
    OUT = r'C:\Users\sammy\OneDrive\Documents\Claude\Projects\Editing Etsy Page\templates\[product-name]\PlanWiseHaus_[Product]_2025.xlsx'
    wb = openpyxl.Workbook()
    wb.remove(wb.active)
    for tab in TABS:
        wb.create_sheet(title=tab)
    create_styles(wb)

    # Build non-dashboard tabs first
    build_instructions(wb)
    build_setup(wb)
    # ... other tabs ...

    # Dashboard always last (references all other tabs)
    build_dashboard(wb)

    wb.save(OUT)
    print('Saved:', OUT)

    # Quality gate (see quality-gate.md)
    run_quality_gate(OUT)

if __name__ == '__main__':
    main()
```
