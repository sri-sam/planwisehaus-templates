import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side, NamedStyle
from openpyxl.styles.differential import DifferentialStyle
from openpyxl.formatting.rule import Rule, DataBarRule
from openpyxl.chart import BarChart, LineChart, DoughnutChart, Reference
from openpyxl.chart.label import DataLabelList
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

# ── PALETTE ──────────────────────────────────────────────────────────────────
C = {
    'primary':   '2C5F5A',
    'secondary': '3D8A85',
    'accent':    'C9A845',
    'bg':        'EDEAE2',
    'data':      'FFFFFF',
    'sidebar':   'F5F2EC',
    'gray':      'DDD9D0',
    'lt_teal':   'E0F0EE',
    'input':     'FFFDE8',
    'success':   '2E7D52',
    'danger':    'C0392B',
}

TABS = [
    'INSTRUCTIONS','SETUP','BANK ACCOUNTS','RECURRING','PAYMENTS',
    'VARIABLE','DASHBOARD','ANNUAL TOTALS','CALENDAR','PAYCHECK',
    'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
    'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER',
    '50-30-20','EXPENSE DIST','SINKING FUNDS','DEBT CALC',
    'NET WORTH','INVEST FORECAST','NO-SPEND'
]

MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
          'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']

CATEGORIES = [
    'Housing','Transportation','Food & Dining','Utilities','Healthcare',
    'Insurance','Entertainment','Shopping','Personal Care','Education',
    'Savings','Investments','Debt Payments','Gifts & Donations','Other'
]
CAT_BUDGETS = [1500,400,600,200,150,250,150,200,100,50,500,300,200,100,100]
CAT_TYPES   = ['Need','Need','Need','Need','Need','Need','Want','Want',
               'Want','Want','Savings','Savings','Need','Want','Other']

NAV = [
    (5,  'OVERVIEW',   None),
    (6,  None, 'INSTRUCTIONS'),
    (7,  None, 'SETUP'),
    (8,  None, 'DASHBOARD'),
    (10, 'ACCOUNTS',   None),
    (11, None, 'BANK ACCOUNTS'),
    (12, None, 'RECURRING'),
    (13, None, 'PAYMENTS'),
    (14, None, 'VARIABLE'),
    (16, 'ANALYTICS',  None),
    (17, None, 'ANNUAL TOTALS'),
    (18, None, 'PAYCHECK'),
    (19, None, 'CALENDAR'),
    (21, 'MONTHLY',    None),
    (22, None, 'JANUARY'),  (23, None, 'FEBRUARY'), (24, None, 'MARCH'),
    (25, None, 'APRIL'),    (26, None, 'MAY'),       (27, None, 'JUNE'),
    (28, None, 'JULY'),     (29, None, 'AUGUST'),    (30, None, 'SEPTEMBER'),
    (31, None, 'OCTOBER'),  (32, None, 'NOVEMBER'),  (33, None, 'DECEMBER'),
    (35, 'TOOLS',      None),
    (36, None, '50-30-20'),
    (37, None, 'EXPENSE DIST'),
    (38, None, 'SINKING FUNDS'),
    (39, None, 'DEBT CALC'),
    (40, None, 'NET WORTH'),
    (41, None, 'INVEST FORECAST'),
    (42, None, 'NO-SPEND'),
]

# ── STYLES ───────────────────────────────────────────────────────────────────
def create_styles(wb):
    defs = [
        NamedStyle(name='pwh_title',
            font=Font(name='Calibri', size=22, bold=True, color=C['primary']),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_subtitle',
            font=Font(name='Calibri', size=10, italic=True, color='777777'),
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
            font=Font(name='Calibri', size=10, color='333333'),
            fill=PatternFill(start_color=C['data'], fill_type='solid'),
            alignment=Alignment(vertical='center'),
            border=Border(bottom=Side(style='thin', color=C['gray']))),
        NamedStyle(name='pwh_data_alt',
            font=Font(name='Calibri', size=10, color='333333'),
            fill=PatternFill(start_color='F0FAF8', fill_type='solid'),
            alignment=Alignment(vertical='center'),
            border=Border(bottom=Side(style='thin', color=C['gray']))),
        NamedStyle(name='pwh_kpi_val',
            font=Font(name='Calibri', size=22, bold=True, color=C['primary']),
            fill=PatternFill(start_color=C['lt_teal'], fill_type='solid'),
            alignment=Alignment(horizontal='center', vertical='center')),
        NamedStyle(name='pwh_kpi_lbl',
            font=Font(name='Calibri', size=8, color='888888'),
            fill=PatternFill(start_color=C['lt_teal'], fill_type='solid'),
            alignment=Alignment(horizontal='center', vertical='center')),
        NamedStyle(name='pwh_total',
            font=Font(name='Calibri', size=10, bold=True, color=C['primary']),
            fill=PatternFill(start_color=C['lt_teal'], fill_type='solid'),
            border=Border(top=Side(style='medium', color=C['secondary']),
                         bottom=Side(style='double', color=C['primary']))),
        NamedStyle(name='pwh_nav_link',
            font=Font(name='Calibri', size=9, color=C['primary'], underline='single'),
            fill=PatternFill(start_color=C['sidebar'], fill_type='solid'),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_nav_active',
            font=Font(name='Calibri', size=9, bold=True, color='FFFFFF'),
            fill=PatternFill(start_color=C['secondary'], fill_type='solid'),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_nav_section',
            font=Font(name='Calibri', size=7, bold=True, color='999999'),
            fill=PatternFill(start_color=C['sidebar'], fill_type='solid'),
            alignment=Alignment(vertical='center')),
        NamedStyle(name='pwh_input',
            font=Font(name='Calibri', size=10, color='333333'),
            fill=PatternFill(start_color=C['input'], fill_type='solid'),
            border=Border(bottom=Side(style='thin', color=C['accent'])),
            alignment=Alignment(vertical='center')),
    ]
    for s in defs:
        try:
            wb.add_named_style(s)
        except Exception:
            pass

# ── HELPERS ──────────────────────────────────────────────────────────────────
def fill_bg(ws, rows=120, cols=50):
    bg = PatternFill(start_color=C['bg'], fill_type='solid')
    for row in ws.iter_rows(min_row=1, max_row=rows, min_col=1, max_col=cols):
        for cell in row:
            cell.fill = bg

def setup_sheet(ws, tab_title, active_tab):
    ws.sheet_view.showGridLines = False
    ws.sheet_properties.tabColor = C['primary']
    fill_bg(ws)
    for r in range(1, 121):
        ws.row_dimensions[r].height = 16
    ws.row_dimensions[1].height = 5
    ws.row_dimensions[2].height = 36
    ws.row_dimensions[3].height = 18
    ws.column_dimensions['A'].width = 1.5
    ws.column_dimensions['B'].width = 20
    ws.column_dimensions['C'].width = 1.5
    # Gold top accent strip
    acc = PatternFill(start_color=C['accent'], fill_type='solid')
    for col in range(1, 51):
        ws.cell(row=1, column=col).fill = acc
    # Title
    ws['D2'] = 'PLANWISE HAUS  ·  ' + tab_title
    ws['D2'].style = 'pwh_title'
    ws['D3'] = 'EXCEL TEMPLATES FOR LIFE & HOME'
    ws['D3'].style = 'pwh_subtitle'
    add_sidebar(ws, active_tab)

def add_sidebar(ws, active_tab):
    sb = PatternFill(start_color=C['sidebar'], fill_type='solid')
    for r in range(1, 121):
        ws.cell(row=r, column=1).fill = sb
        ws.cell(row=r, column=2).fill = sb
    # Brand
    ws['B2'].value = 'PLANWISE HAUS'
    ws['B2'].font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
    ws['B2'].fill = sb
    ws['B2'].alignment = Alignment(vertical='center')
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

def sec_hdr(ws, row, col, text, span=6):
    ws.merge_cells(start_row=row, start_column=col, end_row=row, end_column=col+span-1)
    c = ws.cell(row=row, column=col)
    c.value = text
    c.style = 'pwh_sec_hdr'
    c.alignment = Alignment(horizontal='left', vertical='center', indent=1)
    ws.row_dimensions[row].height = 20

def col_hdr(ws, row, labels, sc=4):
    for i, lbl in enumerate(labels):
        c = ws.cell(row=row, column=sc+i)
        c.value = lbl
        c.style = 'pwh_col_hdr'
    ws.row_dimensions[row].height = 20

def drow(ws, row, values, sc=4, fmts=None):
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

def input_cell(ws, row, col, value, fmt=None):
    c = ws.cell(row=row, column=col)
    c.value = value
    c.style = 'pwh_input'
    if fmt:
        c.number_format = fmt
    ws.row_dimensions[row].height = 22

def kpi_card(ws, sr, sc, label, formula, fmt='"$"#,##0'):
    acc = PatternFill(start_color=C['accent'], fill_type='solid')
    lt  = PatternFill(start_color=C['lt_teal'], fill_type='solid')
    bdr = Border(left=Side(style='thin', color=C['gray']),
                 right=Side(style='thin', color=C['gray']),
                 bottom=Side(style='thin', color=C['gray']))
    ec = sc + 3
    # accent strip
    ws.row_dimensions[sr].height = 5
    for col in range(sc, ec+1):
        ws.cell(row=sr, column=col).fill = acc
    # value row
    ws.merge_cells(start_row=sr+1, start_column=sc, end_row=sr+1, end_column=ec)
    v = ws.cell(row=sr+1, column=sc)
    v.value = formula; v.style = 'pwh_kpi_val'; v.number_format = fmt
    ws.row_dimensions[sr+1].height = 34
    # label row
    ws.merge_cells(start_row=sr+2, start_column=sc, end_row=sr+2, end_column=ec)
    l = ws.cell(row=sr+2, column=sc)
    l.value = label; l.style = 'pwh_kpi_lbl'
    ws.row_dimensions[sr+2].height = 18
    # spacer
    ws.row_dimensions[sr+3].height = 8
    ws.merge_cells(start_row=sr+3, start_column=sc, end_row=sr+3, end_column=ec)
    ws.cell(row=sr+3, column=sc).fill = lt
    for r in range(sr+1, sr+4):
        for col in range(sc, ec+1):
            ws.cell(row=r, column=col).border = bdr

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

def cf_status(ws, rng, text, fgcolor):
    ds = DifferentialStyle(fill=PatternFill(fgColor=fgcolor))
    ws.conditional_formatting.add(rng, Rule(
        type='containsText', operator='containsText', text=text, dxf=ds,
        formula=[f'NOT(ISERROR(SEARCH("{text}",{rng.split(":")[0]})))']))

# ── TAB BUILDERS ─────────────────────────────────────────────────────────────
def build_instructions(wb):
    ws = wb['INSTRUCTIONS']
    setup_sheet(ws, 'INSTRUCTIONS', 'INSTRUCTIONS')
    ws.column_dimensions['D'].width = 55
    ws.column_dimensions['E'].width = 20

    sec_hdr(ws, 5, 4, '  WELCOME TO YOUR PLANWISE HAUS ANNUAL BUDGET', 8)
    ws['D6'] = 'Thank you for your purchase! This spreadsheet is your complete annual financial command center.'
    ws['D6'].font = Font(name='Calibri', size=11, color='444444')
    ws['D6'].fill = PatternFill(start_color=C['data'], fill_type='solid')
    ws['D6'].alignment = Alignment(wrap_text=True, vertical='center')
    ws.row_dimensions[6].height = 28

    sec_hdr(ws, 8, 4, '  GETTING STARTED — FOLLOW THESE STEPS', 8)
    steps = [
        ('Step 1', 'Go to SETUP tab → enter your name, year, and preferred currency.'),
        ('Step 2', 'Add your bank accounts in BANK ACCOUNTS.'),
        ('Step 3', 'Enter fixed monthly bills in RECURRING TRANSACTIONS.'),
        ('Step 4', 'Log daily spending in VARIABLE TRANSACTIONS.'),
        ('Step 5', 'Enter your income and monthly budget actuals in each monthly tab (JAN–DEC).'),
        ('Step 6', 'View DASHBOARD for a full financial overview with charts.'),
        ('Step 7', 'Use DEBT CALC and INVEST FORECAST for long-term planning.'),
    ]
    for i, (step, desc) in enumerate(steps):
        r = 9 + i
        ws.cell(row=r, column=4).value = step
        ws.cell(row=r, column=4).font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
        ws.cell(row=r, column=4).fill = PatternFill(start_color=C['data'], fill_type='solid')
        ws.merge_cells(start_row=r, start_column=5, end_row=r, end_column=11)
        ws.cell(row=r, column=5).value = desc
        ws.cell(row=r, column=5).font = Font(name='Calibri', size=10, color='444444')
        ws.cell(row=r, column=5).fill = PatternFill(start_color=C['data'], fill_type='solid')
        ws.row_dimensions[r].height = 20

    sec_hdr(ws, 17, 4, '  COLOR LEGEND', 8)
    legend = [
        (C['primary'],   'Primary Teal-Green — Titles, navigation, key labels'),
        (C['secondary'], 'Secondary Teal — Section headers, active nav state'),
        (C['accent'],    'Gold Accent — Input fields, KPI highlights'),
        ('2E7D52',       'Success Green — On-budget, surplus, positive values'),
        ('C0392B',       'Alert Red — Over-budget, deficit, warnings'),
    ]
    for i, (hex_c, desc) in enumerate(legend):
        r = 18 + i
        ws.cell(row=r, column=4).fill = PatternFill(start_color=hex_c, fill_type='solid')
        ws.cell(row=r, column=4).value = ' '
        ws.merge_cells(start_row=r, start_column=5, end_row=r, end_column=11)
        ws.cell(row=r, column=5).value = desc
        ws.cell(row=r, column=5).font = Font(name='Calibri', size=10, color='444444')
        ws.cell(row=r, column=5).fill = PatternFill(start_color=C['data'], fill_type='solid')
        ws.row_dimensions[r].height = 20

    sec_hdr(ws, 24, 4, '  TIPS', 8)
    tips = [
        '• Yellow-highlighted cells are INPUT fields — that is where you enter your data.',
        '• Do not delete rows in monthly tabs — formulas are row-dependent.',
        '• The Dashboard updates automatically as you fill in monthly data.',
        '• Use the left sidebar on every tab to navigate instantly.',
        '• The 50/30/20 Dashboard calculates automatically from your Setup budget.',
    ]
    for i, tip in enumerate(tips):
        r = 25 + i
        ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=11)
        ws.cell(row=r, column=4).value = tip
        ws.cell(row=r, column=4).font = Font(name='Calibri', size=10, color='444444')
        ws.cell(row=r, column=4).fill = PatternFill(start_color=C['data'], fill_type='solid')
        ws.row_dimensions[r].height = 20


def build_setup(wb):
    ws = wb['SETUP']
    setup_sheet(ws, 'SETUP', 'SETUP')
    for col in ['D','E','F','G','H']:
        ws.column_dimensions[col].width = 22

    sec_hdr(ws, 5, 4, '  YOUR INFORMATION', 5)
    fields = [
        ('Your Name',            'Jane Smith',  None),
        ('Budget Year',          2025,          None),
        ('Currency Symbol',      '$',           None),
        ('Annual Income Goal',   75000,         '"$"#,##0'),
        ('Annual Savings Goal',  15000,         '"$"#,##0'),
        ('Emergency Fund Goal',  10000,         '"$"#,##0'),
    ]
    lbl_font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
    lbl_fill = PatternFill(start_color=C['data'], fill_type='solid')
    for i, (label, val, fmt) in enumerate(fields):
        r = 6 + i
        ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=6)
        c_lbl = ws.cell(row=r, column=4)
        c_lbl.value = label; c_lbl.font = lbl_font; c_lbl.fill = lbl_fill
        input_cell(ws, r, 7, val, fmt)

    dv_cur = DataValidation(type='list', formula1='"$,€,£,¥,₹,CAD,AUD"', showDropDown=False)
    ws.add_data_validation(dv_cur)
    dv_cur.add('G8')

    sec_hdr(ws, 14, 4, '  EXPENSE CATEGORIES & MONTHLY BUDGETS  (edit to customize)', 5)
    col_hdr(ws, 15, ['Category', 'Type', 'Monthly Budget', 'Annual Budget'], sc=4)

    dv_type = DataValidation(type='list', formula1='"Need,Want,Savings,Other"', showDropDown=False)
    ws.add_data_validation(dv_type)

    for i, (cat, bud, ctype) in enumerate(zip(CATEGORIES, CAT_BUDGETS, CAT_TYPES)):
        r = 16 + i
        ann = f'=F{r}*12'
        drow(ws, r, [cat, ctype, bud, ann], fmts=[None, None, '"$"#,##0', '"$"#,##0'])

    dv_type.add(f'E16:E{15+len(CATEGORIES)}')

    r_tot = 16 + len(CATEGORIES)
    ws.cell(row=r_tot, column=4).value = 'MONTHLY TOTAL'
    ws.cell(row=r_tot, column=4).style = 'pwh_total'
    ws.cell(row=r_tot, column=6).value = f'=SUM(F16:F{r_tot-1})'
    ws.cell(row=r_tot, column=6).style = 'pwh_total'
    ws.cell(row=r_tot, column=6).number_format = '"$"#,##0'
    ws.cell(row=r_tot, column=7).value = f'=SUM(G16:G{r_tot-1})'
    ws.cell(row=r_tot, column=7).style = 'pwh_total'
    ws.cell(row=r_tot, column=7).number_format = '"$"#,##0'
    ws.row_dimensions[r_tot].height = 20


def build_bank_accounts(wb):
    ws = wb['BANK ACCOUNTS']
    setup_sheet(ws, 'BANK ACCOUNTS', 'BANK ACCOUNTS')
    widths = [25,20,18,16,16,16,20]
    for i, w in enumerate(widths):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  BANK ACCOUNTS & BALANCES', 7)
    col_hdr(ws, 6, ['Account Name','Bank / Institution','Account Type',
                    'Opening Balance','Current Balance','Change','Notes'])
    sample = [
        ('Primary Checking','Chase Bank','Checking',3500,4250),
        ('Emergency Savings','Ally Bank','Savings',10000,10500),
        ('Investment Account','Fidelity','Investment',25000,26800),
        ('Credit Card','Capital One','Credit Card',-1200,-950),
        ('Joint Account','Credit Union','Checking',2000,2350),
    ]
    dv_atype = DataValidation(type='list',
        formula1='"Checking,Savings,Credit Card,Investment,Loan,Other"', showDropDown=False)
    ws.add_data_validation(dv_atype)
    for i, (name, bank, atype, opening, current) in enumerate(sample):
        r = 7 + i
        diff = f'=F{r}-E{r}'
        drow(ws, r, [name, bank, atype, opening, current, diff, ''],
             fmts=[None,None,None,'"$"#,##0.00','"$"#,##0.00','"$"#,##0.00',None])
    dv_atype.add('F7:F60')

    sec_hdr(ws, 14, 4, '  SUMMARY', 4)
    rows_sum = [
        ('Total Assets',      f'=SUMIF(F7:F60,"Checking",E7:E60)+SUMIF(F7:F60,"Savings",E7:E60)+SUMIF(F7:F60,"Investment",E7:E60)'),
        ('Total Liabilities', f'=SUMIF(F7:F60,"Credit Card",E7:E60)+SUMIF(F7:F60,"Loan",E7:E60)'),
        ('Net Worth',         f'=E15+E16'),
    ]
    for i, (lbl, formula) in enumerate(rows_sum):
        r = 15 + i
        ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=6)
        ws.cell(row=r, column=4).value = lbl
        ws.cell(row=r, column=4).font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
        ws.cell(row=r, column=4).fill = PatternFill(start_color=C['lt_teal'], fill_type='solid')
        ws.cell(row=r, column=7).value = formula
        ws.cell(row=r, column=7).number_format = '"$"#,##0.00'
        ws.cell(row=r, column=7).font = Font(name='Calibri', size=11, bold=True, color=C['primary'])
        ws.cell(row=r, column=7).fill = PatternFill(start_color=C['lt_teal'], fill_type='solid')
        ws.row_dimensions[r].height = 22


def build_recurring(wb):
    ws = wb['RECURRING']
    setup_sheet(ws, 'RECURRING TRANSACTIONS', 'RECURRING')
    widths = [25,20,15,15,12,18,12]
    for i, w in enumerate(widths):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  FIXED / RECURRING MONTHLY EXPENSES', 7)
    col_hdr(ws, 6, ['Description','Category','Monthly Amount','Annual Total',
                    'Due Day','Payment Method','Active?'])
    sample = [
        ('Rent / Mortgage','Housing',1500,1,'Auto-Pay'),
        ('Car Payment','Transportation',385,15,'Auto-Pay'),
        ('Car Insurance','Insurance',145,1,'Auto-Pay'),
        ('Health Insurance','Healthcare',220,1,'Auto-Pay'),
        ('Electric','Utilities',120,10,'Auto-Pay'),
        ('Internet','Utilities',65,20,'Auto-Pay'),
        ('Phone Bill','Utilities',80,25,'Auto-Pay'),
        ('Netflix','Entertainment',15.99,7,'Credit Card'),
        ('Spotify','Entertainment',9.99,14,'Credit Card'),
        ('Gym Membership','Personal Care',45,1,'Debit Card'),
    ]
    dv_cat = DataValidation(type='list', formula1='"'+','.join(CATEGORIES)+'"', showDropDown=False)
    dv_pay = DataValidation(type='list', formula1='"Credit Card,Debit Card,Bank Transfer,Cash,Auto-Pay,Check"', showDropDown=False)
    dv_act = DataValidation(type='list', formula1='"Yes,No"', showDropDown=False)
    ws.add_data_validation(dv_cat); ws.add_data_validation(dv_pay); ws.add_data_validation(dv_act)

    for i, (desc, cat, amt, due, pay) in enumerate(sample):
        r = 7 + i
        drow(ws, r, [desc, cat, amt, f'=F{r}*12', due, pay, 'Yes'],
             fmts=[None,None,'"$"#,##0.00','"$"#,##0.00',None,None,None])

    dv_cat.add('E7:E80'); dv_pay.add('I7:I80'); dv_act.add('J7:J80')

    r_tot = 18
    ws.cell(row=r_tot, column=4).value = 'MONTHLY TOTAL'
    ws.cell(row=r_tot, column=4).style = 'pwh_total'
    ws.cell(row=r_tot, column=6).value = f'=SUMIF(J7:J{r_tot-1},"Yes",F7:F{r_tot-1})'
    ws.cell(row=r_tot, column=6).style = 'pwh_total'
    ws.cell(row=r_tot, column=6).number_format = '"$"#,##0.00'
    ws.cell(row=r_tot, column=7).value = f'=F{r_tot}*12'
    ws.cell(row=r_tot, column=7).style = 'pwh_total'
    ws.cell(row=r_tot, column=7).number_format = '"$"#,##0.00'
    ws.row_dimensions[r_tot].height = 20


def build_payments(wb):
    ws = wb['PAYMENTS']
    setup_sheet(ws, 'BILL PAYMENT TRACKER', 'PAYMENTS')
    widths = [24,18,14,12,14,16,18]
    for i, w in enumerate(widths):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  MONTHLY BILL PAYMENT TRACKER', 7)
    col_hdr(ws, 6, ['Bill / Description','Category','Amount Due','Due Date',
                    'Date Paid','Status','Payment Method'])
    bills = [
        ('Rent / Mortgage','Housing',1500,1),
        ('Car Payment','Transportation',385,15),
        ('Electric','Utilities',120,10),
        ('Internet','Utilities',65,20),
        ('Phone','Utilities',80,25),
        ('Health Insurance','Healthcare',220,1),
        ('Car Insurance','Insurance',145,1),
        ('Gym','Personal Care',45,1),
        ('Netflix','Entertainment',15.99,7),
        ('Spotify','Entertainment',9.99,14),
        ('Student Loan','Debt Payments',250,20),
        ('Credit Card Min','Debt Payments',100,28),
    ]
    dv_status = DataValidation(type='list',
        formula1='"Paid,Pending,Overdue,Auto-Pay"', showDropDown=False)
    ws.add_data_validation(dv_status)
    for i, (bill, cat, amt, due) in enumerate(bills):
        r = 7 + i
        drow(ws, r, [bill, cat, amt, due, '', 'Pending', 'Auto-Pay'],
             fmts=[None,None,'"$"#,##0.00',None,'MM/DD/YYYY',None,None])
    dv_status.add('J7:J80')

    cf_status(ws, 'J7:J80', 'Paid',    'C8E6C9')
    cf_status(ws, 'J7:J80', 'Pending', 'FFF9C4')
    cf_status(ws, 'J7:J80', 'Overdue', 'FFCDD2')

    r_tot = 20
    for lbl, col, formula in [
        ('TOTAL DUE',  6, f'=SUM(F7:F{r_tot-1})'),
        ('TOTAL PAID', 6, f'=SUMIF(J7:J{r_tot-1},"Paid",F7:F{r_tot-1})'),
    ]:
        ws.cell(row=r_tot, column=4).value = lbl
        ws.cell(row=r_tot, column=4).style = 'pwh_total'
        ws.cell(row=r_tot, column=col).value = formula
        ws.cell(row=r_tot, column=col).style = 'pwh_total'
        ws.cell(row=r_tot, column=col).number_format = '"$"#,##0.00'
        r_tot += 1


def build_variable(wb):
    ws = wb['VARIABLE']
    setup_sheet(ws, 'VARIABLE TRANSACTIONS', 'VARIABLE')
    widths = [14,30,20,14,20,12,22]
    for i, w in enumerate(widths):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  DAILY / VARIABLE TRANSACTION LOG', 7)
    col_hdr(ws, 6, ['Date','Description','Category','Amount',
                    'Payment Method','Tax Deductible?','Notes'])
    sample = [
        ('01/03/2025','Grocery Store','Food & Dining',87.43,'Debit Card','No',''),
        ('01/05/2025','Gas Station','Transportation',52.10,'Credit Card','No',''),
        ('01/07/2025','Restaurant','Food & Dining',65.00,'Credit Card','No','Anniversary'),
        ('01/10/2025','Amazon','Shopping',34.99,'Credit Card','No',''),
        ('01/12/2025','Doctor Co-pay','Healthcare',30.00,'Debit Card','Yes',''),
    ]
    dv_cat = DataValidation(type='list', formula1='"'+','.join(CATEGORIES)+'"', showDropDown=False)
    dv_pay = DataValidation(type='list', formula1='"Credit Card,Debit Card,Cash,Bank Transfer,Other"', showDropDown=False)
    dv_tax = DataValidation(type='list', formula1='"Yes,No"', showDropDown=False)
    ws.add_data_validation(dv_cat); ws.add_data_validation(dv_pay); ws.add_data_validation(dv_tax)
    for i, row_data in enumerate(sample):
        drow(ws, 7+i, list(row_data), fmts=['MM/DD/YYYY',None,None,'"$"#,##0.00',None,None,None])
    dv_cat.add('F7:F1000'); dv_pay.add('H7:H1000'); dv_tax.add('I7:I1000')


def build_monthly(wb, month, month_num):
    ws = wb[month]
    setup_sheet(ws, month, month)
    widths = [14,30,20,16,16,16,20]
    for i, w in enumerate(widths):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    # INCOME
    sec_hdr(ws, 5, 4, f'  INCOME  —  {month} 2025', 7)
    col_hdr(ws, 6, ['Source','Budgeted','Actual','Difference','Notes'])
    income_sources = [('Primary Salary',5000,5000),('Side Income',500,0),('Other',0,0)]
    for i, (src, exp, act) in enumerate(income_sources):
        r = 7 + i
        drow(ws, r, [src, exp, act, f'=F{r}-E{r}', ''],
             fmts=[None,'"$"#,##0.00','"$"#,##0.00','"$"#,##0.00',None])

    INC_TOT = 11
    ws.cell(row=INC_TOT, column=4).value = 'TOTAL INCOME'
    ws.cell(row=INC_TOT, column=4).style = 'pwh_total'
    ws.cell(row=INC_TOT, column=5).value = '=SUM(E7:E10)'
    ws.cell(row=INC_TOT, column=5).style = 'pwh_total'
    ws.cell(row=INC_TOT, column=5).number_format = '"$"#,##0.00'
    ws.cell(row=INC_TOT, column=6).value = '=SUM(F7:F10)'
    ws.cell(row=INC_TOT, column=6).style = 'pwh_total'
    ws.cell(row=INC_TOT, column=6).number_format = '"$"#,##0.00'
    ws.row_dimensions[INC_TOT].height = 20

    # EXPENSES
    sec_hdr(ws, 13, 4, f'  EXPENSES  —  {month} 2025', 7)
    col_hdr(ws, 14, ['Category','Budget','Actual Spent','Remaining','% Used','Notes'])

    EXP_FIRST = 15
    EXP_LAST  = EXP_FIRST + len(CATEGORIES) - 1
    EXP_TOT   = EXP_LAST + 1

    for i, (cat, bud) in enumerate(zip(CATEGORIES, CAT_BUDGETS)):
        r = EXP_FIRST + i
        remaining = f'=E{r}-F{r}'
        pct_used  = f'=IF(E{r}>0,F{r}/E{r},0)'
        drow(ws, r, [cat, bud, 0, remaining, pct_used, ''],
             fmts=[None,'"$"#,##0.00','"$"#,##0.00','"$"#,##0.00','0%',None])
        # Style the Actual Spent cell as input
        inp = ws.cell(row=r, column=6)
        inp.style = 'pwh_input'
        inp.number_format = '"$"#,##0.00'

    ws.cell(row=EXP_TOT, column=4).value = 'TOTAL EXPENSES'
    ws.cell(row=EXP_TOT, column=4).style = 'pwh_total'
    ws.cell(row=EXP_TOT, column=5).value = f'=SUM(E{EXP_FIRST}:E{EXP_LAST})'
    ws.cell(row=EXP_TOT, column=5).style = 'pwh_total'
    ws.cell(row=EXP_TOT, column=5).number_format = '"$"#,##0.00'
    ws.cell(row=EXP_TOT, column=6).value = f'=SUM(F{EXP_FIRST}:F{EXP_LAST})'
    ws.cell(row=EXP_TOT, column=6).style = 'pwh_total'
    ws.cell(row=EXP_TOT, column=6).number_format = '"$"#,##0.00'
    ws.cell(row=EXP_TOT, column=7).value = f'=SUM(G{EXP_FIRST}:G{EXP_LAST})'
    ws.cell(row=EXP_TOT, column=7).style = 'pwh_total'
    ws.cell(row=EXP_TOT, column=7).number_format = '"$"#,##0.00'
    ws.row_dimensions[EXP_TOT].height = 20

    # Summary
    r_sum = EXP_TOT + 2
    sec_hdr(ws, r_sum, 4, '  MONTHLY SUMMARY', 4)
    ws.merge_cells(start_row=r_sum+1, start_column=4, end_row=r_sum+1, end_column=6)
    ws.cell(row=r_sum+1, column=4).value = 'Net Savings  (Actual Income − Actual Expenses)'
    ws.cell(row=r_sum+1, column=4).font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
    ws.cell(row=r_sum+1, column=4).fill = PatternFill(start_color=C['lt_teal'], fill_type='solid')
    ws.cell(row=r_sum+1, column=7).value = f'=F{INC_TOT}-F{EXP_TOT}'
    ws.cell(row=r_sum+1, column=7).number_format = '"$"#,##0.00'
    ws.cell(row=r_sum+1, column=7).font = Font(name='Calibri', size=12, bold=True, color=C['primary'])
    ws.cell(row=r_sum+1, column=7).fill = PatternFill(start_color=C['lt_teal'], fill_type='solid')
    ws.row_dimensions[r_sum+1].height = 26

    # Conditional formatting
    over_ds = DifferentialStyle(fill=PatternFill(fgColor='FFCDD2'), font=Font(color='B71C1C', bold=True))
    warn_ds = DifferentialStyle(fill=PatternFill(fgColor='FFF9C4'))
    rng = f'H{EXP_FIRST}:H{EXP_LAST}'
    ws.conditional_formatting.add(rng, Rule(type='cellIs', operator='greaterThan', formula=['1'], dxf=over_ds))
    ws.conditional_formatting.add(rng, Rule(type='cellIs', operator='between', formula=['0.85','1'], dxf=warn_ds))
    ws.conditional_formatting.add(f'F{EXP_FIRST}:F{EXP_LAST}',
        DataBarRule(start_type='min', end_type='max', color=C['secondary']))


def build_annual_totals(wb):
    ws = wb['ANNUAL TOTALS']
    setup_sheet(ws, 'ANNUAL TOTALS', 'ANNUAL TOTALS')
    EXP_TOT_ROW = 15 + len(CATEGORIES)  # = 30

    for i in range(8):
        ws.column_dimensions[get_column_letter(4+i)].width = 16

    sec_hdr(ws, 5, 4, '  ANNUAL INCOME & EXPENSE SUMMARY', 6)
    col_hdr(ws, 6, ['Month','Income (Actual)','Expenses (Actual)','Net Savings','Savings Rate','Running Total'])

    for i, month in enumerate(MONTHS):
        r = 7 + i
        inc = f"='{month}'!F11"
        exp = f"='{month}'!F{EXP_TOT_ROW}"
        net = f'=E{r}-F{r}'
        rate = f'=IF(E{r}>0,G{r}/E{r},0)'
        running = f'=G{r}' if i == 0 else f'=H{r-1}+G{r}'
        drow(ws, r, [month, inc, exp, net, rate, running],
             fmts=[None,'"$"#,##0','"$"#,##0','"$"#,##0','0.0%','"$"#,##0'])

    r_tot = 19
    ws.cell(row=r_tot, column=4).value = 'ANNUAL TOTAL'
    ws.cell(row=r_tot, column=4).style = 'pwh_total'
    for col, src in [(5,'E'),(6,'F'),(7,'G')]:
        ws.cell(row=r_tot, column=col).value = f'=SUM({src}7:{src}18)'
        ws.cell(row=r_tot, column=col).style = 'pwh_total'
        ws.cell(row=r_tot, column=col).number_format = '"$"#,##0'
    ws.row_dimensions[r_tot].height = 22

    # Category breakdown
    sec_hdr(ws, 21, 4, '  EXPENSE BY CATEGORY — ANNUAL', len(MONTHS)+3)
    cat_hdrs = ['Category'] + [m[:3] for m in MONTHS] + ['ANNUAL TOTAL']
    col_hdr(ws, 22, cat_hdrs)
    for i, cat in enumerate(CATEGORIES):
        r = 23 + i
        row_vals = [cat]
        for j, month in enumerate(MONTHS):
            row_vals.append(f"=SUMPRODUCT(('{month}'!D{15}:D{EXP_TOT_ROW-1}=D{r})*'{month}'!F{15}:F{EXP_TOT_ROW-1}")
            # Simpler: reference from a named category row
            # Actually let's just reference by position since categories are fixed order
            row_vals[-1] = f"='{month}'!F{15+i}"
        total_col = get_column_letter(4 + 1 + len(MONTHS))
        row_vals.append(f'=SUM(E{r}:{get_column_letter(4+len(MONTHS))}{r})')
        drow(ws, r, row_vals, fmts=[None]+['"$"#,##0']*len(MONTHS)+['"$"#,##0'])

    ws.conditional_formatting.add(f'E23:E{22+len(CATEGORIES)}',
        DataBarRule(start_type='min', end_type='max', color=C['secondary']))


def build_paycheck(wb):
    ws = wb['PAYCHECK']
    setup_sheet(ws, 'PAYCHECK DASHBOARD', 'PAYCHECK')
    widths = [16,20,16,15,15,15,16]
    for i, w in enumerate(widths):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  PAYCHECK LOG', 7)
    col_hdr(ws, 6, ['Pay Date','Pay Period','Gross Pay','Federal Tax',
                    'State Tax','Other Deductions','Net Pay'])
    sample = [
        ('01/15/2025','Jan 1–15',2500,375,125,185),
        ('01/31/2025','Jan 16–31',2500,375,125,185),
        ('02/14/2025','Feb 1–14',2500,375,125,185),
        ('02/28/2025','Feb 15–28',2500,375,125,185),
        ('03/15/2025','Mar 1–15',2500,375,125,185),
    ]
    for i, (date, period, gross, fed, state, other) in enumerate(sample):
        r = 7 + i
        net = f'=E{r}-F{r}-G{r}-H{r}'
        drow(ws, r, [date, period, gross, fed, state, other, net],
             fmts=['MM/DD/YYYY',None]+['"$"#,##0.00']*5)

    r_tot = 13
    ws.cell(row=r_tot, column=4).value = 'YTD TOTALS'
    ws.cell(row=r_tot, column=4).style = 'pwh_total'
    for col in range(5, 11):
        c = ws.cell(row=r_tot, column=col)
        c.value = f'=SUM({get_column_letter(col)}7:{get_column_letter(col)}{r_tot-1})'
        c.style = 'pwh_total'
        c.number_format = '"$"#,##0.00'
    ws.row_dimensions[r_tot].height = 20

    sec_hdr(ws, 15, 4, '  YTD SUMMARY', 9)
    kpi_card(ws, 16, 4,  'YTD GROSS PAY',    f'=E{r_tot}', '"$"#,##0')
    kpi_card(ws, 16, 9,  'YTD NET PAY',      f'=J{r_tot}', '"$"#,##0')
    kpi_card(ws, 16, 14, 'EFFECTIVE TAX RATE',f'=IF(E{r_tot}>0,(F{r_tot}+G{r_tot})/E{r_tot},0)', '0.0%')


def build_calendar(wb):
    ws = wb['CALENDAR']
    setup_sheet(ws, 'AUTOMATED BILL CALENDAR', 'CALENDAR')
    for col in range(4, 18):
        ws.column_dimensions[get_column_letter(col)].width = 12

    sec_hdr(ws, 5, 4, '  ANNUAL BILL PAYMENT CALENDAR', 14)
    hdrs = ['Bill Name','Amt'] + [m[:3] for m in MONTHS]
    col_hdr(ws, 6, hdrs)

    bills = [
        ('Rent / Mortgage',1500,1),('Car Payment',385,15),('Electric',120,10),
        ('Internet',65,20),('Phone',80,25),('Health Insurance',220,1),
        ('Car Insurance',145,1),('Gym',45,1),('Netflix',15.99,7),('Spotify',9.99,14),
    ]
    for i, (bill, amt, due) in enumerate(bills):
        r = 7 + i
        drow(ws, r, [bill, amt]+[f'Due {due}']*12,
             fmts=[None,'"$"#,##0.00']+[None]*12)

    r_tot = 18
    ws.cell(row=r_tot, column=4).value = 'MONTHLY TOTAL'
    ws.cell(row=r_tot, column=4).style = 'pwh_total'
    ws.cell(row=r_tot, column=5).value = f'=SUM(E7:E{r_tot-1})'
    ws.cell(row=r_tot, column=5).style = 'pwh_total'
    ws.cell(row=r_tot, column=5).number_format = '"$"#,##0.00'
    ws.row_dimensions[r_tot].height = 20


def build_503020(wb):
    ws = wb['50-30-20']
    setup_sheet(ws, '50/30/20 BUDGET DASHBOARD', '50-30-20')
    for i, w in enumerate([28,12,16,16,14]):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  THE 50/30/20 BUDGET RULE', 5)
    ws.merge_cells(start_row=6, start_column=4, end_row=6, end_column=6)
    ws.cell(row=6, column=4).value = 'Monthly Net Income (from Setup)'
    ws.cell(row=6, column=4).font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
    ws.cell(row=6, column=4).fill = PatternFill(start_color=C['data'], fill_type='solid')
    ws.cell(row=6, column=7).value = '=SETUP!F31'
    ws.cell(row=6, column=7).style = 'pwh_input'
    ws.cell(row=6, column=7).number_format = '"$"#,##0'
    ws.row_dimensions[6].height = 22

    col_hdr(ws, 8, ['Category','Rule %','Target Amount','Actual (Annual Totals)','Status'])
    rules = [
        ('NEEDS — Housing, Transport, Utilities, Healthcare, Insurance', 0.50, f'=G6*0.50',
         "='ANNUAL TOTALS'!G19/12*0"),
        ('WANTS — Entertainment, Shopping, Food & Dining, Personal Care', 0.30, f'=G6*0.30',
         "='ANNUAL TOTALS'!G19/12*0"),
        ('SAVINGS & DEBT — Savings, Investments, Debt Payments', 0.20, f'=G6*0.20',
         "='ANNUAL TOTALS'!G19/12*0"),
    ]
    # Use category row references from setup for actual amounts
    # NEEDS categories: Housing(row16), Transport(17), Utilities(19), Healthcare(20), Insurance(21) in SETUP
    # We'll use ANNUAL TOTALS category breakdown (rows 23-37, col E = Jan)
    needs_rows  = [23, 24, 26, 25, 27]   # Housing, Transport, Utilities, Healthcare, Insurance
    wants_rows  = [25, 30, 29, 31]        # Food&Dining, Entertainment, Shopping, Personal Care
    saving_rows = [33, 34, 35]            # Savings, Investments, Debt Payments
    # Simplify: sum the relevant category annual total columns
    def cat_sum(rows):
        refs = '+'.join([f"'ANNUAL TOTALS'!{get_column_letter(4+1+len(MONTHS))}{r}" for r in rows])
        return f'=({refs})/12'

    actual_formulas = [
        cat_sum([23,24,26,25,27]),  # NEEDS
        cat_sum([25,30,29,31]),     # WANTS
        cat_sum([33,34,35]),        # SAVINGS
    ]
    status_col = 8  # H
    for i, ((cat, pct, target, _), actual) in enumerate(zip(rules, actual_formulas)):
        r = 9 + i
        status = f'=IF(H{r}<=F{r},"On Track ✓","Over Budget ✗")'
        drow(ws, r, [cat, pct, target, actual, status],
             fmts=[None,'0%','"$"#,##0','"$"#,##0',None])
        ws.row_dimensions[r].height = 22

    ws.conditional_formatting.add('H9:H11', DataBarRule(start_type='num', start_value=0, end_type='max', color=C['secondary']))
    cf_status(ws, 'I9:I11', 'On Track',   'C8E6C9')
    cf_status(ws, 'I9:I11', 'Over Budget','FFCDD2')

    sec_hdr(ws, 12, 4, '  HOW THE 50/30/20 RULE WORKS', 5)
    explanations = [
        ('50% NEEDS',   'Essentials you must pay — rent, groceries, utilities, insurance, minimum debt payments.'),
        ('30% WANTS',   'Non-essentials that improve quality of life — dining out, streaming, hobbies, travel.'),
        ('20% SAVINGS', 'Savings, investments, and extra debt repayment to build long-term wealth.'),
    ]
    for i, (hdr, desc) in enumerate(explanations):
        r = 13 + i
        ws.cell(row=r, column=4).value = hdr
        ws.cell(row=r, column=4).font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
        ws.cell(row=r, column=4).fill = PatternFill(start_color=C['data'], fill_type='solid')
        ws.merge_cells(start_row=r, start_column=5, end_row=r, end_column=8)
        ws.cell(row=r, column=5).value = desc
        ws.cell(row=r, column=5).font = Font(name='Calibri', size=10, color='444444')
        ws.cell(row=r, column=5).fill = PatternFill(start_color=C['data'], fill_type='solid')
        ws.row_dimensions[r].height = 22


def build_expense_dist(wb):
    ws = wb['EXPENSE DIST']
    setup_sheet(ws, 'EXPENSE DISTRIBUTION', 'EXPENSE DIST')
    for i, w in enumerate([25,16,16,16]):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    EXP_TOT_ROW = 15 + len(CATEGORIES)
    ann_total_col = get_column_letter(4 + 1 + len(MONTHS))

    sec_hdr(ws, 5, 4, '  ANNUAL EXPENSE DISTRIBUTION BY CATEGORY', 4)
    col_hdr(ws, 6, ['Category','Annual Budget','Annual Actual','% of Total'])
    for i, (cat, bud) in enumerate(zip(CATEGORIES, CAT_BUDGETS)):
        r = 7 + i
        actual = f"='ANNUAL TOTALS'!{ann_total_col}{23+i}"
        pct    = f"=IF(SUM(F7:F{6+len(CATEGORIES)})>0,F{r}/SUM(F7:F{6+len(CATEGORIES)}),0)"
        drow(ws, r, [cat, bud*12, actual, pct],
             fmts=[None,'"$"#,##0','"$"#,##0','0.0%'])

    ws.conditional_formatting.add(f'F7:F{6+len(CATEGORIES)}',
        DataBarRule(start_type='min', end_type='max', color=C['secondary']))

    r_tot = 7 + len(CATEGORIES)
    ws.cell(row=r_tot, column=4).value = 'TOTAL'
    ws.cell(row=r_tot, column=4).style = 'pwh_total'
    ws.cell(row=r_tot, column=5).value = f'=SUM(E7:E{r_tot-1})'
    ws.cell(row=r_tot, column=5).style = 'pwh_total'
    ws.cell(row=r_tot, column=5).number_format = '"$"#,##0'
    ws.cell(row=r_tot, column=6).value = f'=SUM(F7:F{r_tot-1})'
    ws.cell(row=r_tot, column=6).style = 'pwh_total'
    ws.cell(row=r_tot, column=6).number_format = '"$"#,##0'
    ws.row_dimensions[r_tot].height = 20


def build_sinking_funds(wb):
    ws = wb['SINKING FUNDS']
    setup_sheet(ws, 'SINKING FUNDS TRACKER', 'SINKING FUNDS')
    for i, w in enumerate([22,15,16,18,12,12,15]):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  SINKING FUNDS TRACKER', 7)
    col_hdr(ws, 6, ['Fund Name','Goal Amount','Current Balance',
                    'Monthly Contribution','Months Left','% Complete','Target Date'])
    funds = [
        ('Emergency Fund',10000,4500,500,'12/31/2025'),
        ('Car Repair Fund',2000,800,150,'06/30/2025'),
        ('Vacation Fund',3000,1200,250,'08/01/2025'),
        ('Home Repair Fund',5000,2000,300,'12/31/2025'),
        ('Holiday Gifts',1500,500,100,'11/30/2025'),
        ('New Laptop',2000,600,200,'09/01/2025'),
    ]
    for i, (name, goal, bal, contrib, target) in enumerate(funds):
        r = 7 + i
        months_left = f'=CEILING(MAX(0,(E{r}-F{r})/G{r}),1)'
        pct         = f'=MIN(1,F{r}/E{r})'
        drow(ws, r, [name, goal, bal, contrib, months_left, pct, target],
             fmts=[None,'"$"#,##0','"$"#,##0','"$"#,##0','0','0%','MM/DD/YYYY'])

    ws.conditional_formatting.add('I7:I20',
        DataBarRule(start_type='num', start_value=0, end_type='num', end_value=1, color=C['accent']))


def build_debt_calc(wb):
    ws = wb['DEBT CALC']
    setup_sheet(ws, 'DEBT PAYOFF CALCULATOR', 'DEBT CALC')
    for i, w in enumerate([22,16,18,16,16,18,16]):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  DEBT PAYOFF CALCULATOR', 7)
    col_hdr(ws, 6, ['Debt Name','Current Balance','Interest Rate (APR)',
                    'Min Payment','Extra Payment','Payoff Date (Est.)','Total Interest'])
    debts = [
        ('Credit Card A',3500,0.2199,70,100),
        ('Credit Card B',1200,0.1799,25,50),
        ('Student Loan',15000,0.0675,150,200),
        ('Car Loan',12000,0.0499,385,0),
        ('Medical Bill',800,0.0,100,100),
    ]
    for i, (name, bal, apr, min_pay, extra) in enumerate(debts):
        r = 7 + i
        total_pay    = f'=G{r}+H{r}'
        monthly_rate = f'=F{r}/12'
        payoff_mo    = f'=IF(F{r}=0,CEILING(E{r}/({total_pay}),1),CEILING(NPER({monthly_rate},-({total_pay}),E{r}),1))'
        payoff_date  = f'=EDATE(TODAY(),{payoff_mo})'
        total_int    = f'=IF(F{r}=0,0,MAX(0,({total_pay})*{payoff_mo}-E{r}))'
        drow(ws, r, [name, bal, apr, min_pay, extra, payoff_date, total_int],
             fmts=[None,'"$"#,##0.00','0.00%','"$"#,##0.00','"$"#,##0.00','MM/YYYY','"$"#,##0.00'])

    r_tot = 13
    ws.cell(row=r_tot, column=4).value = 'TOTALS'
    ws.cell(row=r_tot, column=4).style = 'pwh_total'
    for col in [5, 7, 8, 10]:
        if col <= 10:
            c = ws.cell(row=r_tot, column=col)
            c.value = f'=SUM({get_column_letter(col)}7:{get_column_letter(col)}{r_tot-1})'
            c.style = 'pwh_total'
            c.number_format = '"$"#,##0.00'
    ws.row_dimensions[r_tot].height = 20


def build_net_worth(wb):
    ws = wb['NET WORTH']
    setup_sheet(ws, 'NET WORTH TRACKER', 'NET WORTH')
    for i, w in enumerate([25,18,18,16]):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  ASSETS', 4)
    col_hdr(ws, 6, ['Asset','Opening Value','Current Value','Change'])
    assets = [
        ('Checking Account',3500,4250),('Emergency Savings',10000,10500),
        ('Investment Portfolio',25000,26800),('401(k) / Retirement',45000,47500),
        ('Home Value',350000,355000),('Vehicle Value',18000,16500),('Other Assets',5000,5000),
    ]
    for i, (name, start, cur) in enumerate(assets):
        r = 7 + i
        drow(ws, r, [name, start, cur, f'=F{r}-E{r}'],
             fmts=[None,'"$"#,##0','"$"#,##0','"$"+#,##0;[Red]"$"(#,##0)'])

    ASSET_TOT = 15
    ws.cell(row=ASSET_TOT, column=4).value = 'TOTAL ASSETS'
    ws.cell(row=ASSET_TOT, column=4).style = 'pwh_total'
    ws.cell(row=ASSET_TOT, column=6).value = f'=SUM(F7:F{ASSET_TOT-1})'
    ws.cell(row=ASSET_TOT, column=6).style = 'pwh_total'
    ws.cell(row=ASSET_TOT, column=6).number_format = '"$"#,##0'
    ws.row_dimensions[ASSET_TOT].height = 20

    sec_hdr(ws, 17, 4, '  LIABILITIES', 4)
    col_hdr(ws, 18, ['Liability','Opening Balance','Current Balance','Change'])
    liabs = [
        ('Mortgage',280000,279200),('Car Loan',12000,11200),
        ('Student Loans',15000,14500),('Credit Card Debt',3500,2800),('Other Debt',0,0),
    ]
    for i, (name, start, cur) in enumerate(liabs):
        r = 19 + i
        drow(ws, r, [name, start, cur, f'=F{r}-E{r}'],
             fmts=[None,'"$"#,##0','"$"#,##0','"$"+#,##0;[Red]"$"(#,##0)'])

    LIAB_TOT = 25
    ws.cell(row=LIAB_TOT, column=4).value = 'TOTAL LIABILITIES'
    ws.cell(row=LIAB_TOT, column=4).style = 'pwh_total'
    ws.cell(row=LIAB_TOT, column=6).value = f'=SUM(F19:F{LIAB_TOT-1})'
    ws.cell(row=LIAB_TOT, column=6).style = 'pwh_total'
    ws.cell(row=LIAB_TOT, column=6).number_format = '"$"#,##0'
    ws.row_dimensions[LIAB_TOT].height = 20

    NW_ROW = 27
    sec_hdr(ws, NW_ROW, 4, '  NET WORTH', 4)
    ws.merge_cells(start_row=NW_ROW+1, start_column=4, end_row=NW_ROW+1, end_column=5)
    ws.cell(row=NW_ROW+1, column=4).value = 'NET WORTH  (Assets − Liabilities)'
    ws.cell(row=NW_ROW+1, column=4).font = Font(name='Calibri', size=11, bold=True, color=C['primary'])
    ws.cell(row=NW_ROW+1, column=4).fill = PatternFill(start_color=C['lt_teal'], fill_type='solid')
    ws.cell(row=NW_ROW+1, column=6).value = f'=F{ASSET_TOT}-F{LIAB_TOT}'
    ws.cell(row=NW_ROW+1, column=6).number_format = '"$"#,##0'
    ws.cell(row=NW_ROW+1, column=6).font = Font(name='Calibri', size=14, bold=True, color=C['primary'])
    ws.cell(row=NW_ROW+1, column=6).fill = PatternFill(start_color=C['lt_teal'], fill_type='solid')
    ws.row_dimensions[NW_ROW+1].height = 28


def build_invest_forecast(wb):
    ws = wb['INVEST FORECAST']
    setup_sheet(ws, 'INVESTMENT FORECAST', 'INVEST FORECAST')
    for i, w in enumerate([25,20,20,20,20]):
        ws.column_dimensions[get_column_letter(4+i)].width = w

    sec_hdr(ws, 5, 4, '  COMPOUND GROWTH CALCULATOR', 5)
    lbl_font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
    lbl_fill = PatternFill(start_color=C['data'], fill_type='solid')
    inputs_def = [
        ('Starting Investment',   10000, '"$"#,##0'),
        ('Monthly Contribution',  500,   '"$"#,##0'),
        ('Annual Return Rate',    0.07,  '0.00%'),
        ('Investment Period (yrs)', 20,  '0'),
    ]
    for i, (lbl, val, fmt) in enumerate(inputs_def):
        r = 6 + i
        ws.merge_cells(start_row=r, start_column=4, end_row=r, end_column=6)
        ws.cell(row=r, column=4).value = lbl
        ws.cell(row=r, column=4).font = lbl_font
        ws.cell(row=r, column=4).fill = lbl_fill
        input_cell(ws, r, 7, val, fmt)

    sec_hdr(ws, 11, 4, '  YEAR-BY-YEAR PROJECTION', 5)
    col_hdr(ws, 12, ['Year','Starting Balance','Contributions','Interest Earned','Ending Balance'])

    for i in range(20):
        r = 13 + i
        yr = 2025 + i
        if i == 0:
            sb = '=G6'
            contrib = '=G7*12'
            interest = f'=E{r}*G8'
            ending   = f'=E{r}+F{r}+G{r}'
        else:
            sb = f'=H{r-1}'
            contrib = '=G7*12'
            interest = f'=(E{r}+F{r})*G8'
            ending   = f'=E{r}+F{r}+G{r}'
        drow(ws, r, [yr, sb, contrib, interest, ending],
             fmts=[None,'"$"#,##0','"$"#,##0','"$"#,##0','"$"#,##0'])

    ws.conditional_formatting.add('H13:H32',
        DataBarRule(start_type='min', end_type='max', color=C['secondary']))


def build_no_spend(wb):
    ws = wb['NO-SPEND']
    setup_sheet(ws, 'NO-SPEND CHALLENGE', 'NO-SPEND')
    for col in range(4, 12):
        ws.column_dimensions[get_column_letter(col)].width = 13

    sec_hdr(ws, 5, 4, '  30-DAY NO-SPEND CHALLENGE', 8)
    ws.merge_cells(start_row=6, start_column=4, end_row=6, end_column=5)
    ws.cell(row=6, column=4).value = 'Month / Year:'
    ws.cell(row=6, column=4).font = Font(name='Calibri', size=10, bold=True, color=C['primary'])
    ws.cell(row=6, column=4).fill = PatternFill(start_color=C['data'], fill_type='solid')
    input_cell(ws, 6, 6, 'January 2025')

    col_hdr(ws, 8, ['MON','TUE','WED','THU','FRI','SAT','SUN'])

    day = 1
    cell_bdr = Border(left=Side(style='thin', color=C['gray']),
                      right=Side(style='thin', color=C['gray']),
                      top=Side(style='thin', color=C['gray']),
                      bottom=Side(style='thin', color=C['gray']))
    for week in range(5):
        r = 9 + week
        ws.row_dimensions[r].height = 38
        for d in range(7):
            if day <= 30:
                c = ws.cell(row=r, column=4+d)
                c.value = f'Day {day}'
                c.alignment = Alignment(horizontal='center', vertical='top', wrap_text=True)
                c.fill = PatternFill(start_color=C['data'], fill_type='solid')
                c.font = Font(name='Calibri', size=9, color=C['primary'])
                c.border = cell_bdr
                day += 1

    sec_hdr(ws, 15, 4, '  SPENDING EXCEPTIONS LOG', 5)
    col_hdr(ws, 16, ['Date','Item','Amount','Necessary?','Notes'])
    dv_nec = DataValidation(type='list', formula1='"Yes,No"', showDropDown=False)
    ws.add_data_validation(dv_nec)
    for i in range(6):
        r = 17 + i
        drow(ws, r, ['','',0,'Yes',''], fmts=['MM/DD/YYYY',None,'"$"#,##0.00',None,None])
    dv_nec.add('G17:G25')

    ws.cell(row=24, column=4).value = 'TOTAL EXCEPTIONS SPENT'
    ws.cell(row=24, column=4).style = 'pwh_total'
    ws.cell(row=24, column=6).value = '=SUM(F17:F23)'
    ws.cell(row=24, column=6).style = 'pwh_total'
    ws.cell(row=24, column=6).number_format = '"$"#,##0.00'


def build_dashboard(wb):
    ws = wb['DASHBOARD']
    setup_sheet(ws, 'ALL-IN-ONE DASHBOARD', 'DASHBOARD')
    for i in range(14):
        ws.column_dimensions[get_column_letter(4+i)].width = 14

    # KPI Cards
    sec_hdr(ws, 5, 4, '  FINANCIAL SNAPSHOT  —  2025', 12)
    kpi_card(ws, 6,  4,  'ANNUAL INCOME',   "='ANNUAL TOTALS'!E19", '"$"#,##0')
    kpi_card(ws, 6,  9,  'ANNUAL EXPENSES', "='ANNUAL TOTALS'!F19", '"$"#,##0')
    kpi_card(ws, 6,  14, 'NET SAVINGS',     "='ANNUAL TOTALS'!G19", '"$"#,##0')

    kpi_card(ws, 11, 4,  'SAVINGS RATE',
             "=IF('ANNUAL TOTALS'!E19>0,'ANNUAL TOTALS'!G19/'ANNUAL TOTALS'!E19,0)", '0.0%')
    kpi_card(ws, 11, 9,  'TOTAL DEBT',      "='DEBT CALC'!E13",   '"$"#,##0')
    kpi_card(ws, 11, 14, 'NET WORTH',       "='NET WORTH'!F28",   '"$"#,##0')

    ws.row_dimensions[16].height = 14

    # ── Chart data (hidden area, rows 70+) ──
    CD = 70  # chart data start row

    # Income / Expenses / Savings by month
    ws.cell(row=CD, column=1).value = 'Month'
    ws.cell(row=CD, column=2).value = 'Income'
    ws.cell(row=CD, column=3).value = 'Expenses'
    ws.cell(row=CD, column=4).value = 'Net Savings'
    for i, month in enumerate(MONTHS):
        r = CD + 1 + i
        ws.cell(row=r, column=1).value = month[:3]
        ws.cell(row=r, column=2).value = f"='ANNUAL TOTALS'!E{7+i}"
        ws.cell(row=r, column=3).value = f"='ANNUAL TOTALS'!F{7+i}"
        ws.cell(row=r, column=4).value = f"='ANNUAL TOTALS'!G{7+i}"

    # Category totals
    CAT_D = 90
    ws.cell(row=CAT_D, column=1).value = 'Category'
    ws.cell(row=CAT_D, column=2).value = 'Annual Total'
    ann_col = get_column_letter(4 + 1 + len(MONTHS))
    for i, cat in enumerate(CATEGORIES):
        ws.cell(row=CAT_D+1+i, column=1).value = cat
        ws.cell(row=CAT_D+1+i, column=2).value = f"='ANNUAL TOTALS'!{ann_col}{23+i}"

    # ── Chart 1: Clustered Bar — Income vs Expenses ──
    sec_hdr(ws, 17, 4, '  INCOME vs. EXPENSES BY MONTH', 12)
    chart1 = BarChart()
    chart1.type = 'col'
    chart1.grouping = 'clustered'
    style_chart(chart1, 'Monthly Income vs. Expenses')
    cats1  = Reference(ws, min_col=1, min_row=CD+1, max_row=CD+12)
    data1  = Reference(ws, min_col=2, max_col=3, min_row=CD, max_row=CD+12)
    chart1.add_data(data1, titles_from_data=True)
    chart1.set_categories(cats1)
    chart1.width = 18; chart1.height = 12
    ws.add_chart(chart1, 'D18')

    # ── Chart 2: Line — Savings Trend ──
    chart2 = LineChart()
    style_chart(chart2, 'Monthly Net Savings Trend', 'line')
    data2 = Reference(ws, min_col=4, max_col=4, min_row=CD, max_row=CD+12)
    chart2.add_data(data2, titles_from_data=True)
    chart2.set_categories(cats1)
    chart2.width = 14; chart2.height = 12
    ws.add_chart(chart2, 'M18')

    # ── Chart 3: Donut — Expense by Category ──
    sec_hdr(ws, 33, 4, '  EXPENSE DISTRIBUTION', 12)
    chart3 = DoughnutChart()
    style_chart(chart3, 'Annual Expense by Category', 'donut')
    data3 = Reference(ws, min_col=2, min_row=CAT_D, max_row=CAT_D+len(CATEGORIES))
    cats3 = Reference(ws, min_col=1, min_row=CAT_D+1, max_row=CAT_D+len(CATEGORIES))
    chart3.add_data(data3, titles_from_data=True)
    chart3.set_categories(cats3)
    chart3.width = 14; chart3.height = 14
    ws.add_chart(chart3, 'D34')

    # ── Chart 4: Line — Cumulative Savings ──
    chart4 = LineChart()
    style_chart(chart4, 'Cumulative Savings This Year', 'line')
    RUN_D = 110
    ws.cell(row=RUN_D, column=1).value = 'Month'
    ws.cell(row=RUN_D, column=2).value = 'Cumulative'
    for i in range(12):
        ws.cell(row=RUN_D+1+i, column=1).value = MONTHS[i][:3]
        ws.cell(row=RUN_D+1+i, column=2).value = f"='ANNUAL TOTALS'!H{7+i}"
    data4 = Reference(ws, min_col=2, min_row=RUN_D, max_row=RUN_D+12)
    cats4 = Reference(ws, min_col=1, min_row=RUN_D+1, max_row=RUN_D+12)
    chart4.add_data(data4, titles_from_data=True)
    chart4.set_categories(cats4)
    chart4.width = 14; chart4.height = 14
    ws.add_chart(chart4, 'M34')

    # ── Monthly summary table ──
    sec_hdr(ws, 50, 4, '  MONTH-BY-MONTH SUMMARY', 6)
    col_hdr(ws, 51, ['Month','Income','Expenses','Net Savings','Savings Rate','Status'])
    for i, month in enumerate(MONTHS):
        r = 52 + i
        inc = f"='ANNUAL TOTALS'!E{7+i}"
        exp = f"='ANNUAL TOTALS'!F{7+i}"
        net = f"='ANNUAL TOTALS'!G{7+i}"
        rate = f"='ANNUAL TOTALS'!H{7+i}"
        status = f'=IF(G{r}>0,"Surplus","Deficit")'
        drow(ws, r, [month, inc, exp, net, rate, status],
             fmts=[None,'"$"#,##0','"$"#,##0','"$"#,##0','0.0%',None])

    cf_status(ws, 'I52:I63', 'Surplus', 'C8E6C9')
    cf_status(ws, 'I52:I63', 'Deficit', 'FFCDD2')


# ── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    OUT = r'C:\Users\sammy\OneDrive\Documents\Claude\Projects\Editing Etsy Page\PlanWiseHaus_Annual_Budget_2025.xlsx'

    wb = openpyxl.Workbook()
    wb.remove(wb.active)
    for tab in TABS:
        wb.create_sheet(title=tab)

    create_styles(wb)

    print('Building Instructions...'); build_instructions(wb)
    print('Building Setup...');        build_setup(wb)
    print('Building Bank Accounts...'); build_bank_accounts(wb)
    print('Building Recurring...');    build_recurring(wb)
    print('Building Payments...');     build_payments(wb)
    print('Building Variable...');     build_variable(wb)

    print('Building Monthly tabs...')
    for i, month in enumerate(MONTHS):
        build_monthly(wb, month, i+1)
        print(f'  {month}')

    print('Building Annual Totals...'); build_annual_totals(wb)
    print('Building Paycheck...');      build_paycheck(wb)
    print('Building Calendar...');      build_calendar(wb)
    print('Building 50/30/20...');      build_503020(wb)
    print('Building Expense Dist...');  build_expense_dist(wb)
    print('Building Sinking Funds...'); build_sinking_funds(wb)
    print('Building Debt Calc...');     build_debt_calc(wb)
    print('Building Net Worth...');     build_net_worth(wb)
    print('Building Invest Forecast...'); build_invest_forecast(wb)
    print('Building No-Spend...');      build_no_spend(wb)
    print('Building Dashboard...');     build_dashboard(wb)

    wb.save(OUT)
    print(f'\nSaved: {OUT}')

    # Quality Gate
    print('\nRunning quality checks...')
    wb2 = openpyxl.load_workbook(OUT)
    issues = []
    for ws in wb2.worksheets:
        if ws.sheet_view.showGridLines:
            issues.append(f'{ws.title}: gridlines ON')
        if not ws.sheet_properties.tabColor:
            issues.append(f'{ws.title}: no tab color')
        for ch in ws._charts:
            if not ch.title:
                issues.append(f'{ws.title}: chart without title')
    if issues:
        print('ISSUES:')
        for iss in issues: print(f'  - {iss}')
    else:
        print('ALL CHECKS PASSED - OK')

if __name__ == '__main__':
    main()
