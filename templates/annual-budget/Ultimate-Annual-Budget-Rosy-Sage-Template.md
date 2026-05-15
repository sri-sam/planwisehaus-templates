# Ultimate Annual Budget — Rosy Sage 3.0 — Complete Template Documentation

**Source:** Google Sheets — "Copy of Ultimate Annual Budget Rosy Sage 3.0"  
**Creator:** PRIORI Digital Studio  
**Scraped / Documented:** 2026-05-15  
**Year configured:** 2026 (January – December)  

---

## Table of Contents

1. [Design System & Color Palette](#1-design-system--color-palette)
2. [Global Layout & Navigation](#2-global-layout--navigation)
3. [Tab Inventory & Protection Status](#3-tab-inventory--protection-status)
4. [INSTRUCTIONS Tab](#4-instructions-tab)
5. [SETUP Tab](#5-setup-tab)
6. [BANK ACCOUNTS Tab](#6-bank-accounts-tab)
7. [RECURRING Tab](#7-recurring-tab)
8. [PAYMENTS Tab](#8-payments-tab)
9. [VARIABLE Tab](#9-variable-tab)
10. [DASHBOARD Tab](#10-dashboard-tab)
11. [ANNUAL TOTALS Tab](#11-annual-totals-tab)
12. [CALENDAR Tab](#12-calendar-tab)
13. [Monthly Tabs (JAN – DEC)](#13-monthly-tabs-jan--dec)
14. [PAYCHECK Tab](#14-paycheck-tab)
15. [50/30/20 Tab](#15-503020-tab)
16. [DISTRIBUTION Tab](#16-distribution-tab)
17. [SINKING FUNDS Tab](#17-sinking-funds-tab)
18. [DEBT CALCULATOR Tab](#18-debt-calculator-tab)
19. [NET WORTH Tab](#19-net-worth-tab)
20. [INVESTMENT Tab](#20-investment-tab)
21. [CHALLENGE Tab](#21-challenge-tab)
22. [Formulas & Logic Reference](#22-formulas--logic-reference)
23. [Data Validation & Dropdowns](#23-data-validation--dropdowns)
24. [Protection & Permissions Model](#24-protection--permissions-model)
25. [Replication Checklist](#25-replication-checklist)

---

## 1. Design System & Color Palette

### Theme Name
**Rosy Sage 3.0** — a soft, feminine budgeting aesthetic combining muted sage green with warm dusty rose.

### Color Tokens

| Role | Hex (Approximate) | Used For |
|------|-------------------|----------|
| Primary Dark Sage | `#5C7A6B` | Section header backgrounds, chart legend fill, tab highlights |
| Medium Sage | `#7A9B8A` | Secondary headers, BILLS section headers |
| Light Sage | `#D5E5DC` | Alternating data rows (positive categories), KPI card backgrounds |
| Deep Rose | `#C97E7A` | Expense-related section headers |
| Medium Rose | `#D4A09A` | Sub-headers for expense/debt sections |
| Light Rose | `#F2DFDA` | Alternating data rows (expense categories), input backgrounds |
| Blush / Very Light Rose | `#FAF0ED` | Page/section background tint |
| Off-White / Cream | `#F9F5F0` | Main sheet background |
| White | `#FFFFFF` | Cell interiors, KPI value areas |
| Dark Text | `#2C2C2C` | Body text, cell values |
| White Text | `#FFFFFF` | Text on dark headers |
| Muted Tan | `#B8A898` | Neutral borders, subtle dividers |
| Blue Link | `#1155CC` | Hyperlinks (YouTube, PDF, sheet navigation) |

### Typography

| Element | Font | Size | Style | Color |
|---------|------|------|-------|-------|
| Sheet title (e.g., "DASHBOARD") | Calibri | ~36–40pt | Regular or Light | Dark text / White |
| Section headers (e.g., "BUDGET SUMMARY") | Calibri | 11–12pt | Bold, ALL CAPS | White (on dark bg) |
| Column headers | Calibri | 10–11pt | Bold, ALL CAPS | Dark text or White |
| KPI label | Calibri | 9–10pt | Bold, ALL CAPS | White on dark bg |
| KPI value | Calibri | 18–22pt | Regular | Dark text |
| Body / data rows | Calibri | 10–11pt | Regular | Dark text |
| Navigation links (menu) | Calibri | 10pt | Underlined | Blue |
| Warning / info text | Calibri | 10pt | Bold prefix, regular body | Dark text |

### Borders & Lines
- **Section header rows:** No border, full background fill.
- **Data table outer border:** Thin black or dark gray.
- **Column dividers inside tables:** Light gray or no border.
- **KPI card borders:** Light gray thin border with white interior.
- **Merged-cell title blocks:** Thick outer border on the merged region.

### Chart Style (across all tabs)
- **Background:** White or transparent.
- **Grid lines:** Light gray horizontal only.
- **Legend:** Top or side, small text, uses theme colors.
- **Series colors match theme:** Income = sage green, Expenses = rose/pink, Budget = dark sage, Real = light rose, Savings = medium sage, Debts = deep rose, Bills = muted tan.
- **Chart frames:** Thin light-gray border.
- **Empty-state placeholder text:** "Add a series to start visualizing your data" (gray, centered, large).

---

## 2. Global Layout & Navigation

### Frozen Pane: Left Navigation Menu
Every tab (except INSTRUCTIONS and standalone wealth tabs) has a **frozen left panel** occupying columns A–C (approximately) containing a vertical navigation menu.

**Menu structure (rendered in every data tab):**

```
MENU
────────────────────
SETUP SECTION
  SETUP
  BANK ACCOUNTS
  RECURRING
  PAYMENTS
  VARIABLE

DASHBOARDS
  DASHBOARD
  ANNUAL TOTAL
  CALENDAR

MONTHLY TABS
  JAN  FEB  MAR
  APR  MAY  JUN
  JUL  AUG  SEP
  OCT  NOV  DEC
  PAYCHECK

BUILD YOUR WEALTH
  50/30/20
  DISTRIBUTION
  SINKING FUNDS
  DEBT CALCULATOR
  NET WORTH
  INVESTMENT
  CHALLENGE
```

- **"MENU"** is a plain label at the top of the frozen panel.
- Each item is a **hyperlink** (blue, underlined) that navigates to that sheet.
- Currently-active tab name is **highlighted/bold** in the menu.
- The frozen panel background is **off-white / cream**.
- The panel is narrow (2–3 columns wide) so it takes up minimal horizontal space.

### Sheet Tab Bar
All tabs appear at the bottom. Most have a **lock icon (🔒)** prefix indicating sheet protection. Tab names are ALL CAPS.

### Title Block Pattern (repeated on most tabs)
Each tab has a large centered title block at the top of the content area:

```
┌──────────────────────────────────────────────┐
│                                              │
│              TAB TITLE HERE                  │  ← Calibri ~36pt, centered, merged cells
│                                              │
└──────────────────────────────────────────────┘
```

- The block spans the full width of the content area.
- Background is **white** or **very light cream**.
- Outer border is thin.

---

## 3. Tab Inventory & Protection Status

| # | Tab Name | Protected | Standalone | Category |
|---|----------|-----------|------------|----------|
| 1 | INSTRUCTIONS | Yes | Yes | Info |
| 2 | SETUP | Yes | Yes | Setup |
| 3 | BANK ACCOUNTS | Yes | No | Setup |
| 4 | RECURRING | Yes | No | Input |
| 5 | PAYMENTS | **No** | No | Input |
| 6 | VARIABLE | Yes | No | Input |
| 7 | DASHBOARD | Yes | No | Dashboard |
| 8 | ANNUAL TOTALS | Yes | No | Dashboard |
| 9 | CALENDAR | Yes | No | Dashboard |
| 10–21 | JAN – DEC | Yes | No | Monthly |
| 22 | PAYCHECK | Yes | No | Monthly |
| 23 | 50/30/20 | Yes | No | Wealth |
| 24 | DISTRIBUTION | Yes | No | Wealth |
| 25 | SINKING FUNDS | Yes | **Yes** | Wealth |
| 26 | DEBT CALCULATOR | Yes | **Yes** | Wealth |
| 27 | NET WORTH | Yes | **Yes** | Wealth |
| 28 | INVESTMENT | Yes | **Yes** | Wealth |
| 29 | CHALLENGE | Yes | No | Wealth |

**Standalone = not connected to monthly tabs.** Users can use it independently without affecting other sheets.  
**PAYMENTS is the only unprotected tab** — left unprotected intentionally to allow filtering.

---

## 4. INSTRUCTIONS Tab

### Purpose
Onboarding tab. Shows branding, tutorial links, and critical warnings.

### Layout

```
Row 1–5:   [PRIORI Digital Studio logo + "Our Website" link] | [INSTRUCTIONS title block]
Row 6:     (spacer)
Row 7–8:   GENERAL INSTRUCTIONS header (pink background, bold)
Row 9–10:  ACCESS TO THE YOUTUBE TUTORIALS header
Row 11–20: Two YouTube links side by side:
             Left:  "To access our YouTube tutorial, CLICK HERE" + ✋ emoji + YouTube logo image
             Right: "To access our FAQ + Updates, CLICK HERE" + ✋ emoji + YouTube logo image
Row 21:    (spacer)
Row 22–23: ACCESS OUR INSTRUCTION FILE header
Row 24–32: "To access our Instruction file, CLICK HERE" + ✋ emoji + PDF icon image
Row 33:    (spacer)
Row 34:    ⚠️ PLEASE DO NOT MOVE CELLS FROM ONE PLACE TO ANOTHER (yellow/warning bg)
Row 35–37: Warning text block:
             "If you move a cell from one place to another, it might generate issues in the
              spreadsheet, so please do not move cells."
             "The best would be to copy and paste your data and not move or cut/paste your data"
Row 38+:   Comparison table showing SAVINGS category structure (Before/After example)
```

### Branding Block (top-left)
- **"Our Website"** — blue hyperlink
- **"· PRIORI · Digital Studio"** — logo-style text, decorative font, dot separators
- Brand name in italic script: "Digital Studio"

### Key Content
- Two YouTube video links (tutorial + FAQ/updates)
- One PDF instruction file link
- Critical warning: **never move cells, only copy/paste**
- Sample category structure shown at bottom (SAVINGS examples with Emergency funds, Roth IRA John, Roth IRA Jess)

---

## 5. SETUP Tab

### Purpose
Initial configuration — must be completed before using any other tab.

### Layout

```
Row 1–5:   SETUP title block
Row 6:     (spacer)
Row 7–11:  STEP 1 — CURRENCY SYMBOL
Row 12:    (spacer)
Row 13–19: STEP 2 — STARTING DATE
Row 20:    Explanation text
Row 21:    (spacer)
Row 22–32: STEP 3 — SPENDERS
Row 33:    (spacer)
Row 34+:   STEP 4 — CALCULATION SETUP
```

### Step 1: Currency Symbol
| Element | Detail |
|---------|--------|
| Header | "STEP 1" (pink/rose header row) |
| Sub-label | "CURRENCY SYMBOL" |
| Input cell | Dropdown, default value: **$** |
| Options | $, €, £, ¥, or custom |

### Step 2: Starting Date
| Element | Detail |
|---------|--------|
| Header | "STEP 2" (pink/rose header row) |
| Sub-label | "STARTING DATE" |
| YEAR field | Number input, default: **2026** |
| MONTH field | Dropdown, default: **January** |
| Note text | "It means that this spreadsheet will be from January 2026 to December 2026. For the following year, simply make a copy of the spreadsheet." |

### Step 3: Spenders
| Element | Detail |
|---------|--------|
| Header | "STEP 3" (pink/rose header row) |
| Sub-label | "SPENDERS" |
| Input area | Free-text cells; user enters names of people who spend money (e.g., John, Jess) |
| Note | No pre-filled values in template |

### Step 4: Calculation Setup
| Element | Detail |
|---------|--------|
| Header | "STEP 4" (pink/rose header row) |
| Sub-label | "CALCULATION SETUP" |
| Input cell | Dropdown, default: **Zero based budget** |
| Description | "A zero-based budget is a budgeting method where every dollar of income is assigned to a specific purpose, with the aim of ensuring that total expenses equal total income, resulting in a balanced budget. It encourages careful allocation of funds and helps individuals prioritize financial goals by giving each dollar a job. This is the best strategy if you want to save more money." |

---

## 6. BANK ACCOUNTS Tab

### Purpose
Tracks all cash, checking, and savings account balances.

### Layout

```
Row 1–5:   BANK ACCOUNTS title block
Row 6–20:  KPI boxes (left) + Chart (right)
Row 21–23: CASH section header
Row 24–28: CASH table
Row 29:    (spacer)
Row 30–32: CHECKING AND SAVING ACCOUNTS section header
Row 33+:   Checking/savings table (many rows)
```

### KPI Cards (Top Left, 3 stacked vertically)

| KPI | Description |
|-----|-------------|
| TOTAL CURRENT BALANCE | Sum of all accounts |
| TOTAL BALANCE CHECKING ACCOUNTS | Sum of checking accounts only |
| TOTAL BALANCE SAVING ACCOUNTS | Sum of saving accounts only |

Each KPI card:
- Dark sage header with white bold text (ALL CAPS label)
- Large "$0" value in white interior with light border
- Width: approx. 1/3 of content area

### Chart (Top Right)
- Occupies ~2/3 of content area width, same height as KPI cards
- **Type:** Pie or donut showing account balance distribution
- Empty state: "Add a series to start visualizing your data"
- When populated: shows each account as a slice

### CASH Section
| Column | Notes |
|--------|-------|
| ACCOUNT NAME | Pre-filled with "Cash" |
| STARTING BALANCE | Manual input |
| TOTAL RECEIVED | Auto-calculated |
| TOTAL WITHDRAWALS | Auto-calculated |
| CURRENT BALANCE | Formula: Starting + Received − Withdrawals |
| ADJUSTMENTS +/- | Manual correction field |
| LAST CHECKED | Date field |

- Single row (only one Cash account)
- Section header: medium rose background, white text "CASH"

### CHECKING AND SAVING ACCOUNTS Section
| Column | Notes |
|--------|-------|
| ACCOUNT NAME* | Required. Free text. Red asterisk. |
| ACCOUNT TYPE | Dropdown: Checking / Saving |
| STARTING BALANCE | Manual input |
| TOTAL DEPOSIT | Auto-calculated from transactions |
| TOTAL WITHDRAWALS | Auto-calculated from transactions |
| CURRENT BALANCE | Formula: Starting + Deposits − Withdrawals |
| ADJUSTMENTS +/- | Manual override |
| LAST CHECKED | Date field |

- Multiple rows (approx. 10–15 pre-formatted rows with dropdown arrows)
- Section header: medium rose background, white text
- Dropdown arrows visible on ACCOUNT TYPE column

---

## 7. RECURRING Tab

### Purpose
Master list of all fixed/recurring transactions — income, savings, bills, debts, subscriptions. These auto-populate the monthly PAYMENTS tab.

### Collapsible Instructions Banner
- Row 1: Blue toggle button "Open/Close Instructions"
- When open, shows:
  - **IMPORTANT INFO:** "Use this tab for fixed or recurring transactions only. One-time expenses should be entered in the Variable tab."
  - **TIP:** Bi-monthly payments (twice per month): "Add two rows with the same name and set both frequency to 'Monthly'. Use different first payment dates to match each payment day."
  - **Example:** Row 1 → Sub-category: Paycheck, Frequency: Monthly, Amount, 1st payment date: January 1 / Row 2 → same but 1st payment date: January 15

### Quick Access Navigation Box (top-left of content)
A small box with internal links:
```
RECURRING
TRANSACTIONS
QUICK ACCESS
──────────────
INCOME
SAVINGS
BILLS
DEBTS
SUBSCRIPTIONS
```
Each item is a hyperlink that jumps to that section on the same tab.

### Tab Title
- "RECURRING TRANSACTIONS" — large, right-aligned in the title area

### Sections (all follow same structure, 5 total)

Each section has:
1. A **dark sage header row** spanning the full width with section name (e.g., "INCOME")
2. A **light column header row** with column names
3. Multiple **data entry rows** (approx. 15–20 per section) with dropdown indicators
4. Sections repeat twice horizontally (left half + right half continuation)

#### INCOME Section
| Column | Required | Notes |
|--------|----------|-------|
| SUB-CATEGORY | Yes (*) | Dropdown (populated from Setup categories) |
| FREQUENCY | Yes (*) | Dropdown: Monthly, Bi-weekly, Weekly, etc. |
| AMOUNT | Yes (*) | Currency value |
| 1st PAYMENT | Yes (*) | Date of first occurrence |
| END DATE | No | Optional end date |
| ACCOUNT RECEIVABLE | No | Which account receives this income |
| EARNER | No | Who earns this (from SPENDERS setup) |

#### SAVINGS Section
Same columns as INCOME but for savings contributions.

#### BILLS Section
| Column | Required | Notes |
|--------|----------|-------|
| SUB-CATEGORY | Yes (*) | |
| FREQUENCY | Yes (*) | |
| AMOUNT | Yes (*) | |
| 1st PAYMENT | Yes (*) | |
| END DATE | No | |
| ACCOUNT PROVENANCE | No | Which account pays this bill |
| 50/30/20 DISTRIBUTION | No | Dropdown: Needs / Wants / Savings |
| SPENDER | No | Who is responsible |

#### DEBTS Section
Same structure as BILLS.

#### SUBSCRIPTIONS Section
Same structure as BILLS.

---

## 8. PAYMENTS Tab

### Purpose
Auto-generated recurring payment schedule. Shows all upcoming/due recurring transactions. User marks payments as Paid using a checkbox.

### Warning Banner
`** Be careful, this tab is not protected to allow you to filter your data. Do not move cells, and do not delete formulas **`  
(Red/orange text, italic, centered)

### Filter Buttons (Top Row)
Three colored pill/button shapes for filtering the view:
- **Green button** — show all / income filter
- **Pink/red button** — expense filter
- **Brown/gold button** — another category filter
(Exact filter behavior tied to button scripts/formulas)

### Title
"RECURRING PAYMENT SCHEDULE" — large, centered, top of content area

### PAYMENT SCHEDULE Section

Instructions text:
- "Use the 'Paid' column to mark each payment as completed."
- "Payments that remain unchecked will NOT appear in any other tab."

| Column | Type | Notes |
|--------|------|-------|
| PAID | Checkbox | Check when payment is made |
| SUB-CATEGORY | Text | Auto-filled from RECURRING tab |
| DATE | Date | Auto-calculated based on 1st payment + frequency |
| AMOUNT | Currency | Auto-filled from RECURRING tab |
| ACC. PROVENANCE | Text | Account the payment comes from |
| ACC. RECEIVABLE | Text | Account that receives the payment |
| SPENDER | Text | Person responsible |

### ADJUSTMENTS Section (right side)
"Use this section to adjust the date, amount, account or spender"

| Column | Purpose |
|--------|---------|
| NEW DATE | Override the auto-calculated date |
| NEW AMOUNT | Override the auto-filled amount |
| NEW ACC. PROV. | Override the provenance account |
| NEW ACC. RECEIV. | Override the receivable account |
| NEW SPENDER | Override the spender |

---

## 9. VARIABLE Tab

### Purpose
Log of all one-time/variable transactions (not recurring). Every manual expense, income, or transfer goes here.

### Layout
- No instructions banner (clean, data-first)
- Top row shows total: `$ 0.00` (running total of all entered amounts)
- Full-width data table below

### VARIABLE TRANSACTIONS Table

| Column | Required | Notes |
|--------|----------|-------|
| DATE | Yes (*) | Transaction date |
| AMOUNT | Yes (*) | Positive = income, negative = expense (or all positive) |
| SUB-CATEGORY | Yes (*) | Dropdown from categories defined in setup |
| CATEGORY | No | Auto-populated from sub-category (broader grouping) |
| ACCOUNT PROVENANCE | No | Dropdown: which account funds came from |
| ACCOUNT RECEIVABLE | No | Dropdown: which account receives funds |
| 50/30/20 DISTRIBUTION | No | Dropdown: Needs / Wants / Savings |
| SPENDER / EARNER | No | Dropdown: person who spent or earned |

- Every row has dropdown indicators on most columns
- Dozens of pre-formatted rows available
- The table auto-expands as data is entered

---

## 10. DASHBOARD Tab

### Purpose
Central command center. Provides an at-a-glance view of the entire year's financial health.

### Layout Overview (left-to-right, top-to-bottom)

```
[Frozen Menu] | [Mini Calendar] [Bills Distribution Chart] | [KPI Row]
              | [Annual Income vs Expenses Chart]            | [Annual Budget vs Real Chart] | [Savings Over Year Chart]
              | [Where Does My Money Go? Chart]              | [Transaction/Details area]
```

### Section: Budget Summary Header
- Dark sage header bar spanning full width of content
- Text: "BUDGET SUMMARY"

### Mini Calendar (top-left of content)
- Shows current month calendar (e.g., MAY 2026)
- Days of week: Sun, Mon, Tue, Wed, Thu, Fri, Sat
- Today's date highlighted (darker cell, colored)
- Recurring payment due dates highlighted in a different color
- Small, compact (approx. 7×6 grid)
- Below calendar: "RECURRING PAYMENTS DUE: [count]" and "RECURRING PAYMENTS PAID: [count]"

### BILLS DISTRIBUTION FOR THIS MONTH
- Section header text
- Chart area showing how this month's bills are distributed by category
- **Type:** Stacked bar or grouped bar chart
- **Colors:** Uses theme rose/sage palette

### KPI Cards Row (6 cards)

| KPI Label | Value | Notes |
|-----------|-------|-------|
| ANNUAL INCOME | $0 | Total income across all 12 months |
| ANNUAL EXPENSES | $0 | Total expenses across all 12 months |
| BEST SAVING MONTH | JANUARY | Month with highest savings |
| LEFT TO SPEND | $0 | Income minus all outflows |
| ANNUAL SAVINGS | $0 | Total savings contributions |
| BIGGEST EXPENSE | (blank) | Sub-category with highest total spend |

- Each KPI: Dark sage header + white value area
- Arranged in 2 rows × 3 columns (or 1 row × 6 columns depending on viewport)

### Charts (Lower Half)

#### ANNUAL INCOME vs EXPENSES
- **Type:** Line chart
- **Series:** INCOME (sage green line), TOTAL EXPENSES (rose/pink line)
- **X-axis:** Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
- **Y-axis:** Dollar amounts

#### ANNUAL BUDGET vs REAL
- **Type:** Grouped bar chart (or stacked)
- **Series:** REAL (rose), BUDGET (dark sage)
- **X-axis:** Months
- **Y-axis:** Dollar amounts

#### SAVINGS OVER THE YEAR
- **Type:** Line chart
- **Series:** MONTHLY SAVINGS (one line), CUMULATIVE SAVINGS (another line)
- **X-axis:** Jan–Dec
- **Y-axis:** Dollar amounts

#### WHERE DOES MY MONEY GO?
- Large section at bottom
- **Type:** Donut or pie chart
- Shows breakdown of spending by category
- **Warning shown when no data:** "Column MY BUDGET must be numeric"

---

## 11. ANNUAL TOTALS Tab

### Purpose
Yearly summary table showing all financial categories across every month, with averages and totals. Also includes a large visualization chart.

### Layout

```
Row 1–5:   ANNUAL TOTALS title block
Row 6:     [VISUALIZE DATA button] [Budgeted Amounts button]
Row 7–25:  ANNUAL SUMMARY line chart
Row 26:    ANNUAL SUMMARY table header
Row 27:    Column headers: JANUARY through DECEMBER, AVERAGE, TOTAL
Row 28–34: Data rows
Row 35+:   TOTAL INCOME breakdown
Row X+:    TOTAL BILLS breakdown
Row X+:    TOTAL SUBSCRIPTIONS breakdown
Row X+:    TOTAL EXPENSES breakdown
Row X+:    TOTAL SAVINGS breakdown
Row X+:    TOTAL DEBTS breakdown
```

### VISUALIZE DATA Toggle
- Button/tab: "VISUALIZE DATA" — shows the chart view
- Button/tab: "Budgeted Amounts" — shows budget vs. actual amounts
- Toggle between two view modes

### ANNUAL SUMMARY Line Chart
- **Type:** Multi-series line chart
- **Series (with legend):**
  - INCOME — dark sage line
  - DEBTS — deep rose line
  - SAVINGS — medium sage line
  - EXPENSES — light rose line
  - SUBSCRIPTIONS — blush/muted line
  - BILLS — tan line
- **X-axis:** JANUARY through DECEMBER
- **Y-axis:** Dollar amounts (auto-scaled)

### ANNUAL SUMMARY Table

| Row | Color |
|-----|-------|
| INCOME | Light sage green background |
| BILLS | Light rose background |
| SUBSCRIPTIONS | Light rose background |
| EXPENSES | Light rose background |
| SAVINGS | Light sage green background |
| DEBTS | Light rose background |
| AMOUNT LEFT | White / neutral background, **bold** |

Columns: JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER, AVERAGE, TOTAL

All values formatted as `$ 0` (currency, no decimals shown in summary).

### Detailed Breakdown Sections (below summary)
Each major category has its own table showing sub-category breakdown:
- **TOTAL INCOME** — lists each income source by month
- **TOTAL BILLS** — lists each bill by month
- **TOTAL SUBSCRIPTIONS** — lists each subscription by month
- **TOTAL EXPENSES** — lists each expense sub-category by month
- **TOTAL SAVINGS** — lists each savings bucket by month
- **TOTAL DEBTS** — lists each debt payment by month

---

## 12. CALENDAR Tab

### Purpose
Visual "Smart Calendar" showing all transactions on their actual due dates, with color-coded transaction types.

### Layout

```
Row 1–5:   SMART CALENDAR title block
Row 6–12:  Settings + Legend + KPI Row
Row 13+:   Full monthly calendar grid (6 weeks × 7 days)
```

### Settings Panel (left of content)

| Setting | Type | Default |
|---------|------|---------|
| YEAR | Number input | 2026 |
| MONTH | Dropdown | January |
| Start day of week | Dropdown | Sunday |

### View Checkboxes
- ☑ Recurring Transactions (checked by default)
- ☑ Variable Transactions (checked by default)

### Color Legend

| Transaction Type | Color |
|-----------------|-------|
| Income | Sage green (dark) |
| Bill | Medium rose/salmon |
| Subscription | Light salmon |
| Debt | Darker salmon/coral |
| Expenses | Light pink/blush |
| Savings | Light sage green |
| Paid | Very light green (mint) |

### KPI Row (4 cards)

| KPI | Format | Notes |
|-----|--------|-------|
| TOTAL INCOME | $0 / $0 | Real / Planned |
| TOTAL BILLS | $0 / $0 | Real / Planned |
| TOTAL SUBSCRIPTIONS | $0 / $0 | Real / Planned |
| TOTAL DEBTS | $0 / $0 | Real / Planned |

Legend text below KPIs: "LEGEND: Real / Planned (Real = amount received or spent so far, Planned = total amount expected for the month)"

### Calendar Grid
- 7 columns: SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
- Column headers: Rose/pink background, white text, centered, ALL CAPS
- 5–6 rows (weeks)
- Each day cell:
  - Date number (top-right or top-left, gray)
  - Transaction entries appear as colored text/items within the cell
  - Previous/next month dates shown in light gray
- Today's date is highlighted with a colored background

---

## 13. Monthly Tabs (JAN – DEC)

All 12 monthly tabs (JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC) share an **identical structure**. Only the month name and date-specific data change.

### Collapsible Instructions Banner
- Row 1: Blue toggle "Open/Close Instructions"
- When expanded shows:
  - **TIP: Budget vs Real**
  - **Budget** = the amount you plan to spend (entered manually each month)
  - **Real** = the amount you actually spend (automatically calculated)
  - "If your budget stays the same, simply copy and paste it from one month to the next to save time."

### Month Title Block
```
┌──────────────────────────────┐
│        JANUARY 2026          │  ← Large, centered, serif or Calibri ~28pt
└──────────────────────────────┘
```

### KPI Row (4 cards, full width)

| KPI | Color | Description |
|-----|-------|-------------|
| TOTAL INCOME | Sage green header | Sum of all income this month |
| TOTAL EXPENSES | Rose header | Sum of all outflows (bills + expenses + subscriptions + debts) |
| LEFT TO SPEND | Sage green header | Income − Expenses |
| LEFT TO BUDGET | Rose header | Budget − Real spending |

### Charts Section (right side, top area)

#### SPENDING OVERVIEW
- **Type:** Donut or pie chart
- Shows spending distribution by category for the month
- Empty state: "Add a series to start visualizing your data"

#### BUDGET vs REAL
- **Type:** Grouped horizontal or vertical bar chart
- **Series:** BUDGET (dark sage), REAL (rose)
- **Categories on axis:** BILLS, SUBSCRIPTIONS, EXPENSES, SAVINGS, DEBTS
- **Legend:** BUDGET ■ REAL ■

### BUDGET SUMMARY Table

| Column | Notes |
|--------|-------|
| SOURCE | Category name |
| BUDGET | Manual input (user types planned amounts) |
| REAL | Auto-calculated from transactions |

| Row | Color |
|-----|-------|
| STARTING BALANCE | Neutral |
| INCOME | Light sage |
| BILLS | Light rose |
| SUBSCRIPTIONS | Light rose |
| EXPENSES | Light rose |
| SAVINGS | Light sage |
| DEBTS | Light rose |
| AMOUNT LEFT | **Bold**, neutral or white |

Values in REAL column auto-pull from RECURRING (Payments) + VARIABLE tabs.

### INCOME Section
Located below BUDGET SUMMARY.

| Column | Notes |
|--------|-------|
| SUB-CATEGORY | Income source name |
| BUDGET* | Manual planned amount |
| REAL | Auto-calculated |
| DIFF. | Formula: BUDGET − REAL |

### BILLS Section
Positioned to the right of INCOME, same row level.

| Column | Notes |
|--------|-------|
| SUB-CATEGORY | Bill name |
| BUDGET* | Manual planned amount |
| REAL | Auto from PAYMENTS |
| DIFF. | Formula: BUDGET − REAL |

### EXPENSES Section
| Column | Notes |
|--------|-------|
| SUB-CATEGORY | Expense name |
| BUDGET* | Manual planned amount |
| REAL | Auto from VARIABLE |
| DIFF. | Formula: BUDGET − REAL |

### SAVINGS Section
| Column | Notes |
|--------|-------|
| SUB-CATEGORY | Savings goal name |
| BUDGET* | Manual planned amount |
| REAL | Auto from PAYMENTS/VARIABLE |
| DIFF. | Formula: BUDGET − REAL |

### SUBSCRIPTIONS & DEBTS Sections
Same column structure as BILLS.

### Visual Indicators
- Red asterisk (*) on BUDGET column headers = required input
- Drop-down arrow indicators on sub-category columns
- DIFF. column uses conditional formatting (negative = red, positive = green, or similar)

---

## 14. PAYCHECK Tab

### Purpose
Period-based budget tracker. Unlike monthly tabs, this can span any custom date range (a paycheck period). Useful for people paid bi-weekly or on irregular schedules.

### Collapsible Instructions Banner
- Same collapsible toggle as monthly tabs
- TIP: Budget vs Real — same explanation

### Title Block
```
PAYCHECK BUDGET
January 1, 2026 - January 31, 2026
```
Two-line heading. Date range auto-updates based on START/END DATE inputs.

### Date Configuration

| Field | Type | Default |
|-------|------|---------|
| BUDGET PERIOD | Dropdown | Monthly |
| START DATE — YEAR | Number | 2026 |
| START DATE — MONTH | Dropdown | January |
| START DATE — DAY | Number | 1 |
| END DATE — YEAR | Number | 2026 |
| END DATE — MONTH | Dropdown | January |

### KPI Cards (3, top row)

| KPI | Description |
|-----|-------------|
| TOTAL INCOME | Income in the selected period |
| LEFT TO BUDGET | Income − total planned spend |
| TOTAL EXPENSES | All expenses in the period |

### Charts

#### BALANCE OVERVIEW
- **Type:** Line chart
- Shows running balance over the period
- **X-axis:** Weekly date markers (e.g., 4-Jan, 11-Jan, 18-Jan, 25-Jan)
- **Y-axis:** Balance amount

#### SPENDING OVERVIEW
- **Type:** Bar chart or stacked bar
- Shows spending by category over the period

### BUDGET SUMMARY Table
Same structure as monthly tabs:
- SOURCE, BUDGET, REAL columns
- Rows: STARTING BALANCE, INCOME, BILLS, SUBSCRIPTIONS, EXPENSES, SAVINGS, DEBTS, AMOUNT LEFT

### BILLS & EXPENSES Tables
Same SUB-CATEGORY, BUDGET*, REAL, DIFF. column structure as monthly tabs.

---

## 15. 50/30/20 Tab

### Purpose
Applies the 50/30/20 budgeting rule: 50% Needs, 30% Wants, 20% Savings/Debts.

### Layout

```
[Left: Budget Summary + Line Chart]  [Middle: Goal Breakdown donut]  [Right: Real Budget Breakdown donut]
[Goal table]                         [Real table]
[Transaction Finder section]
```

### Title
"50/30/20 DASHBOARD" — large, top-left

### Budget Summary (Top Left)
Mini table showing:
- INCOME
- BILLS
- SUBSCRIPTIONS
- EXPENSES
- SAVINGS
- DEBTS
- AMOUNT LEFT

Each with Budget and Real columns.

### MY GOAL vs MY REAL BUDGET Chart
- **Type:** Grouped or stacked bar chart
- **Series:** MY GOAL (dark sage), MY BUDGET (rose)
- **X-axis:** Category names
- **Y-axis:** Dollar amounts

### MY GOAL BREAKDOWN (Donut Chart)
- Centered donut chart
- Shows the ideal 50/30/20 split by category
- Legend on right

### MY REAL BUDGET BREAKDOWN (Donut Chart)
- Shows actual spending distribution vs. the 50/30/20 ideal

### Goal Breakdown Table

| Column | Value |
|--------|-------|
| CATEGORY | Needs / Wants / Savings |
| % | 50% / 30% / 20% |
| $ | Dollar amount |

### Real Budget Breakdown Table
Same structure but with actual amounts.

### Transaction Finder
Interactive filter to find transactions within a date range:

| Field | Type |
|-------|------|
| Start Date | Date input |
| End Date | Date input |
| Allowance | Currency input |
| Earner | Dropdown (from SPENDERS) |
| Sub-Category | Dropdown |
| Category | Dropdown |

---

## 16. DISTRIBUTION Tab

### Purpose
Analyzes income and expense distribution across earners and spenders.

### Layout

```
Row 1–5:    INCOME/EXPENSES DISTRIBUTION title block
Row 6–30:   4 chart placeholders (2×2 grid)
Row 31+:    GLOBAL DISTRIBUTION section
Row X+:     FIELDS BY EARNER section
Row X+:     INCOME DISTRIBUTION table
Row X+:     FIELDS BY SPENDER section
Row X+:     TRANSACTION DISTRIBUTION table
```

### Charts (4 placeholders)
All labeled "Add a series to start visualizing your data" when empty.
When populated show distribution breakdowns.

### GLOBAL DISTRIBUTION Section
Summary of all income/expenses by category.

### INCOME DISTRIBUTION Table

| Column | Notes |
|--------|-------|
| SOURCE | Income sub-category name |
| AMOUNT | Dollar value |
| EARNER | Who earned it |

### TRANSACTION DISTRIBUTION Table

| Column | Notes |
|--------|-------|
| DATE | Transaction date |
| AMOUNT | Dollar value |
| SUB-CATEGORY | Category name |
| CATEGORY | Broad category |
| DESCRIPTION | Optional note |

### FIELDS BY EARNER & FIELDS BY SPENDER
Summary tables showing totals filtered by each person.

---

## 17. SINKING FUNDS Tab

### Purpose
Tracks savings goals for irregular future expenses (vacation, car repair, holidays, etc.). **Standalone — not connected to monthly tabs.**

### Important Notice
"IMPORTANT INFO: This tab is standalone and not connected to the monthly tabs."

### KPI Cards (4, top row)

| KPI | Description |
|-----|-------------|
| GLOBAL GOAL AMOUNT | Sum of all sinking fund goals |
| TOTAL SAVED | Sum of all contributions so far |
| TOTAL LEFT TO SAVE | Global goal − total saved |
| GLOBAL PROGRESSION | Progress bar or percentage |

### CONTRIBUTION TRACKER Table (Left Section)

| Column | Required | Notes |
|--------|----------|-------|
| DATE | Yes (*) | Date of contribution |
| SINKING FUND | Yes (*) | Dropdown: which fund |
| AMOUNT | Yes (*) | Dollar amount contributed |

Multiple rows with dropdowns.

### FUNDS OVERVIEW Table (Right Section)

| Column | Required | Notes |
|--------|----------|-------|
| SINKING FUND | Yes (*) | Fund name |
| GOAL | Yes (*) | Total goal amount |
| MONTHLY GOAL | Yes (*) | How much to save monthly |
| START | No | Start date |
| SAVED | Auto | Calculated from contributions |
| LEFT | Auto | Goal − Saved |
| PROG | Auto | Progress bar/percentage |

- TOTAL row at bottom: sums all columns

### Individual Fund Cards (Below FUNDS OVERVIEW)
4 fund cards visible per row, each card shows:
```
┌──────────────────────────────┐
│   [Fund Name Placeholder]    │  ← Auto-filled from FUNDS OVERVIEW
│  GOAL AMOUNT    $ 0.00       │
│  SAVED          $ 0.00       │
│  [Progress bar]              │
└──────────────────────────────┘
```
- Background: Light rose
- Fund name: Bold, centered
- Progress visualization (mini progress bar or colored cell)

---

## 18. DEBT CALCULATOR Tab

### Purpose
Calculates payoff timeline and total interest for debts. **Standalone.**

### Important Notice
"IMPORTANT INFO: This tab is standalone and not connected to the monthly tabs."

### Configuration Inputs

| Field | Type | Notes |
|-------|------|-------|
| START DATE | Date | When to begin calculations |
| INITIAL PAYMENT | Currency | First payment amount |
| MONTHLY PAYMENT | Currency | Regular monthly payment |
| PAYOFF STRATEGY | Dropdown | e.g., Avalanche / Snowball |

### Overview KPI Card
- **CURRENT BALANCE:** $0
- Monthly payment amount
- Annual payment amount
- Total interest saved
- Time to payoff

### Charts (2 placeholders)
- Debt payoff projection chart (line chart showing balance declining over time)
- Interest vs. principal chart

### Debt Schedule Table

| Column | Required | Notes |
|--------|----------|-------|
| DEBT NAME | Yes (*) | Name of the debt |
| INITIAL BALANCE | Yes (*) | Starting balance |
| INTEREST RATE | Yes (*) | Annual % rate |
| MIN. PAYMENT | Yes (*) | Minimum monthly payment |

Additional auto-calculated columns for each month:
- Monthly payment applied
- Interest portion
- Principal portion
- Remaining balance

---

## 19. NET WORTH Tab

### Purpose
Tracks total net worth (assets − liabilities) over time. **Standalone.**

### Important Notice
"IMPORTANT INFO: This tab is standalone and not connected to the monthly tabs."

### KPI Cards (Top)

| KPI | Format |
|-----|--------|
| NET WORTH | $ amount |
| Growth % | 0.00% |

### Charts (3)

#### ASSETS vs LIABILITIES
- **Type:** Stacked bar chart
- **Series:** Total Assets (sage), Total Liabilities (rose)
- **X-axis:** Month names

#### ASSET DISTRIBUTION
- **Type:** Donut chart
- Shows percentage breakdown by asset type

### NET WORTH Summary Table

| Column | Rows |
|--------|------|
| Month (Jan–Dec) | Net Worth |
| Total Assets | Per month |
| Total Liabilities | Per month |

### ASSETS Section

| Category | Sub-rows |
|----------|----------|
| Cash & Bank Accounts | Each account name |
| (Other asset types) | Property, vehicles, investments, etc. |

Each row: AMOUNT column with dollar value.

### LIABILITIES Section
Mirror structure of ASSETS with liability categories (mortgage, car loans, credit cards, student loans, etc.).

---

## 20. INVESTMENT Tab

### Purpose
Projects investment growth over time and tracks investment contributions. **Standalone.**

### Important Notice
"IMPORTANT INFO: This tab is standalone and not connected to the monthly tabs."

### Configuration Inputs

| Field | Notes |
|-------|-------|
| LOAD DATE | Date to start calculations |
| ESTIMATED VALUE (10 years) | Auto-calculated projection |

### KPI/Overview Section

| Metric | Notes |
|--------|-------|
| Initial Investment | Manual input |
| Monthly Investment | Manual input |
| Capital (after 10 years) | Auto-calculated |
| Earnings (after 10 years) | Auto-calculated |
| ROI % | Auto-calculated |
| ACI (Annual Compound Interest) % | Input |

### Charts (4 placeholders)
- Investment growth over time (line chart)
- Capital vs. earnings breakdown (stacked bar)
- Compound interest comparison
- Portfolio allocation

### Monthly Tracking Table

| Column | Notes |
|--------|-------|
| MONTH | Month name |
| INITIAL INVESTMENT | Starting capital |
| MONTHLY INVESTMENT | Monthly contribution |
| CAPITAL | Cumulative principal |
| EARNINGS | Cumulative interest earned |
| ROI | Return on investment % |
| TOTAL | Capital + Earnings |
| TOTAL INVESTMENT | Verification column |
| ACI % | Rate used |

---

## 21. CHALLENGE Tab

### Purpose
"Days Without Spendings" tracker — gamified challenge to track no-spend days per month.

### Layout

```
Row 1–5:    DAYS WITHOUT SPENDINGS title block
             (Current date shown top-right: e.g., "Friday, May 15")
Row 6–20:   [TARGET DAYS table (left)] | [ANNUAL chart (right)]
Row 21+:    Monthly calendar grids (2 per row, 6 rows = 12 months)
```

### Title & Date Display
- "DAYS WITHOUT SPENDINGS" — large, right-aligned title
- Current date displayed top-right (auto-updating): e.g., "Friday, May 15"

### TARGET DAYS WITHOUT SPENDINGS Table

| Column | Required | Notes |
|--------|----------|-------|
| MONTH | Auto | January 2026 through December 2026 |
| TARGET | Yes (*) | User enters goal (e.g., 20 no-spend days) |
| ACTUAL | Auto | Counted from calendar data |
| PROGRESS | Auto | Progress bar or number |

Pre-populated with all 12 months.

### ANNUAL DAYS WITHOUT SPENDINGS Chart
- **Type:** Line or bar chart
- **X-axis:** Jan 2026 through Dec 2026
- **Y-axis:** Number of no-spend days
- Shows actual vs. target
- Colors: Sage green for target line, rose for actual

### Monthly Calendar Grids (12 grids)
One per month, arranged in 2-column grid layout:

```
┌─────────────────────────────────────────┐
│             JANUARY 2026                │
├──────┬─────┬──────┬───────┬─────┬──────┤
│ Sun  │ Mon │ Tue  │  Wed  │ Thu │ Fri  │ Sat
├──────┼─────┼──────┼───────┼─────┼──────┤
│  28  │ 29  │  30  │  31   │  1  │  2   │  3
│      │     │      │       │     │      │
├──────┼─────┼──────┼───────┼─────┼──────┤
│  ...
```

- Month header: Dark sage background, white text, centered, bold
- Day of week headers: Medium sage, white text
- Days with NO spending: Light green background
- Days WITH spending: Light rose background or white
- Days outside the month: Muted gray
- Each grid shows full week layout (Sun–Sat)
- Below grid: "DAYS WITH SPENDINGS: X" and "DAYS WITHOUT SPENDINGS: Y"

---

## 22. Formulas & Logic Reference

### Key Calculation Patterns

#### Budget vs Real
```
REAL = SUMIF(PAYMENTS!DATE_COL, MONTH_MATCH, PAYMENTS!AMOUNT_COL)
      + SUMIF(VARIABLE!DATE_COL, MONTH_MATCH, VARIABLE!AMOUNT_COL)
DIFF = BUDGET - REAL
```

#### Monthly Total Income
```
TOTAL_INCOME = SUM(all INCOME rows in BUDGET SUMMARY REAL column)
```

#### Amount Left
```
AMOUNT_LEFT = STARTING_BALANCE + INCOME - BILLS - SUBSCRIPTIONS - EXPENSES - SAVINGS - DEBTS
```

#### Bank Account Current Balance
```
CURRENT_BALANCE = STARTING_BALANCE + TOTAL_RECEIVED - TOTAL_WITHDRAWALS + ADJUSTMENTS
```

#### Annual Summary (ANNUAL TOTALS tab)
```
MONTHLY_TOTAL = SUM of each category across all monthly tabs
ANNUAL_TOTAL = SUM(JAN_TOTAL:DEC_TOTAL)
ANNUAL_AVERAGE = ANNUAL_TOTAL / 12
```

#### 50/30/20 Goal Split
```
NEEDS_GOAL = INCOME * 0.50
WANTS_GOAL = INCOME * 0.30
SAVINGS_GOAL = INCOME * 0.20
```

#### Days Without Spending (CHALLENGE)
```
NO_SPEND_DAYS = COUNTIF(month_calendar_range, "no_spend_marker")
```

#### Recurring Payment Auto-Date
```
PAYMENT_DATE = DATE(YEAR, MONTH_NUMBER, DAY(1ST_PAYMENT_FROM_RECURRING))
```

#### Running Balance in Calendar
Transactions placed on calendar dates using:
```
IF(DATE_MATCHES_CALENDAR_CELL, TRANSACTION_LABEL, "")
```

---

## 23. Data Validation & Dropdowns

### Global Dropdowns (populated from SETUP tab)

| Dropdown | Source | Used In |
|----------|--------|---------|
| Currency Symbol | SETUP Step 1 | All dollar-formatted cells |
| Month | Hard-coded list | SETUP, CALENDAR, PAYCHECK |
| Budget Period | Hard-coded: Monthly, Bi-weekly, Weekly | PAYCHECK |
| Calculation Method | Hard-coded: Zero based, etc. | SETUP |

### RECURRING Tab Dropdowns

| Column | Options |
|--------|---------|
| FREQUENCY | Monthly, Bi-weekly, Weekly, Quarterly, Annually, One-time |
| ACCOUNT RECEIVABLE | Pulled from BANK ACCOUNTS tab |
| ACCOUNT PROVENANCE | Pulled from BANK ACCOUNTS tab |
| EARNER / SPENDER | Pulled from SETUP Step 3 (Spenders) |
| 50/30/20 DISTRIBUTION | Needs, Wants, Savings |

### VARIABLE Tab Dropdowns

| Column | Options |
|--------|---------|
| SUB-CATEGORY | Full category list from RECURRING or defined list |
| CATEGORY | Auto from SUB-CATEGORY (read-only or dropdown) |
| ACCOUNT PROVENANCE | From BANK ACCOUNTS |
| ACCOUNT RECEIVABLE | From BANK ACCOUNTS |
| 50/30/20 DISTRIBUTION | Needs, Wants, Savings |
| SPENDER / EARNER | From SETUP Spenders |

### BANK ACCOUNTS Dropdown
| Column | Options |
|--------|---------|
| ACCOUNT TYPE | Checking, Saving |

---

## 24. Protection & Permissions Model

### Protected Sheets
All sheets except PAYMENTS are protected with the following intent:
- **Formula cells:** Read-only (cannot be edited accidentally)
- **Input cells:** Editable (white background, user inputs)
- **Protection triggers:** Dialog appears: *"You're trying to edit part of this sheet that shouldn't be changed accidentally. Edit anyway?"* with Cancel / OK options

### Unprotected Sheet: PAYMENTS
- Intentionally left unprotected to allow sorting/filtering
- Warning banner reminds users not to move cells or delete formulas

### Input Cell Visual Identification
- **White background:** Usually a manual input field
- **Colored background (sage/rose):** Usually a header or formula cell (protected)
- **Red asterisk (*)** in column header: Required field

### Standalone Tabs
SINKING FUNDS, DEBT CALCULATOR, NET WORTH, INVESTMENT operate independently.
- Transactions entered here do NOT flow to monthly tabs
- Data is self-contained

---

## 25. Replication Checklist

Use this checklist when recreating the template from scratch:

### Sheet Setup
- [ ] Create 29 sheets with exact names (INSTRUCTIONS, SETUP, BANK ACCOUNTS, RECURRING, PAYMENTS, VARIABLE, DASHBOARD, ANNUAL TOTALS, CALENDAR, JAN–DEC, PAYCHECK, 50/30/20, DISTRIBUTION, SINKING FUNDS, DEBT CALCULATOR, NET WORTH, INVESTMENT, CHALLENGE)
- [ ] Apply lock icons to all sheets except PAYMENTS
- [ ] Set tab colors to match theme (or leave default)

### Global Design
- [ ] Set default font to Calibri, 11pt
- [ ] Set background to off-white/cream (`#F9F5F0`)
- [ ] Create frozen pane navigation menu in columns A–C on all data tabs
- [ ] Add hyperlinks in navigation menu to each corresponding sheet

### SETUP Tab
- [ ] Step 1: Currency symbol dropdown (default $)
- [ ] Step 2: Year (number) + Month (dropdown) inputs
- [ ] Step 3: Spenders input area
- [ ] Step 4: Calculation method dropdown
- [ ] Add explanatory text for each step

### BANK ACCOUNTS Tab
- [ ] 3 KPI summary cards
- [ ] Chart placeholder
- [ ] Cash table (1 row, pre-filled "Cash")
- [ ] Checking/Saving table (10+ rows, with Account Type dropdown)
- [ ] Formulas: CURRENT_BALANCE = STARTING + RECEIVED − WITHDRAWN + ADJUSTMENTS

### RECURRING Tab
- [ ] Collapsible instructions banner (toggle row)
- [ ] Quick access navigation box with 5 section links
- [ ] 5 sections: INCOME, SAVINGS, BILLS, DEBTS, SUBSCRIPTIONS
- [ ] Each section: 7–8 columns with appropriate dropdowns
- [ ] 15–20 rows per section
- [ ] Frequency dropdown with all options

### PAYMENTS Tab
- [ ] NO protection on this tab
- [ ] Warning banner (red italic text)
- [ ] 3 filter buttons (colored pill shapes)
- [ ] Checkbox PAID column
- [ ] PAYMENT SCHEDULE + ADJUSTMENTS sections side by side
- [ ] Auto-populate from RECURRING using date calculation formulas

### VARIABLE Tab
- [ ] 8-column transaction log
- [ ] Running total at top
- [ ] All dropdown columns (SUB-CATEGORY, CATEGORY, ACCOUNT, 50/30/20, SPENDER)
- [ ] 100+ pre-formatted rows

### Monthly Tabs (repeat × 12)
- [ ] Collapsible instructions banner
- [ ] Month + Year title block
- [ ] 4 KPI cards: TOTAL INCOME, TOTAL EXPENSES, LEFT TO SPEND, LEFT TO BUDGET
- [ ] SPENDING OVERVIEW chart placeholder
- [ ] BUDGET vs REAL bar chart
- [ ] BUDGET SUMMARY table (8 rows × 3 columns: SOURCE, BUDGET, REAL)
- [ ] INCOME, BILLS, SUBSCRIPTIONS, EXPENSES, SAVINGS, DEBTS sub-tables
- [ ] All REAL columns = auto-calculated from PAYMENTS + VARIABLE tabs
- [ ] All DIFF. columns = BUDGET − REAL

### DASHBOARD Tab
- [ ] Mini calendar with today highlighted
- [ ] 6 KPI cards
- [ ] Recurring payments due/paid counters
- [ ] 4 charts: Annual Income vs Expenses, Annual Budget vs Real, Savings Over Year, Where Does My Money Go
- [ ] BILLS DISTRIBUTION chart
- [ ] All formulas pulling from 12 monthly tabs

### ANNUAL TOTALS Tab
- [ ] VISUALIZE DATA / Budgeted Amounts toggle
- [ ] Multi-series line chart (6 series)
- [ ] Summary table (7 rows × 14 columns)
- [ ] 6 detailed breakdown sections below

### CALENDAR Tab
- [ ] Year + Month + Start Day selectors
- [ ] Toggle checkboxes for transaction types
- [ ] Color-coded legend (7 types)
- [ ] 4 KPI cards with Real/Planned format
- [ ] Dynamic calendar grid that rebuilds based on month selection

### PAYCHECK Tab
- [ ] Date range display in title
- [ ] BUDGET PERIOD dropdown
- [ ] START DATE and END DATE selectors
- [ ] 3 KPI cards
- [ ] BALANCE OVERVIEW + SPENDING OVERVIEW charts
- [ ] Same budget summary/detail structure as monthly tabs

### CHALLENGE Tab
- [ ] Current date auto-display
- [ ] TARGET DAYS table (12 rows)
- [ ] Annual no-spend days chart
- [ ] 12 monthly calendar grids with color-coded no-spend/spend days

### Standalone Wealth Tabs
- [ ] "Standalone" notice banner on each
- [ ] SINKING FUNDS: Contribution tracker + Fund cards with progress bars
- [ ] DEBT CALCULATOR: Config inputs + payoff schedule table + charts
- [ ] NET WORTH: Assets vs Liabilities tables + 3 charts
- [ ] INVESTMENT: Growth calculator + 4 charts + monthly tracking table
- [ ] 50/30/20: Goal vs real donut charts + transaction finder
- [ ] DISTRIBUTION: 4 charts + income/transaction distribution tables
