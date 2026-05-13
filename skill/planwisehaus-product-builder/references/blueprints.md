# PlanWise Haus — Product Blueprints

Each blueprint defines the complete tab list, key features, and cross-tab formula logic
for a product category. Match the user's request to the closest blueprint, then customize.

---

## Blueprint: Annual Budget Spreadsheet (29 tabs)

**Tabs:**
Instructions, Setup, Bank Accounts, Recurring, Payments, Variable, Dashboard,
Annual Totals, Calendar, Paycheck,
January, February, March, April, May, June, July, August, September, October, November, December,
50-30-20, Expense Dist, Sinking Funds, Debt Calc, Net Worth, Invest Forecast, No-Spend

**Key Features:**
- Setup tab: user name, year, currency dropdown ($,€,£…), 15 expense categories with monthly budget amounts
- Monthly tabs (Jan–Dec): income section (budgeted vs actual), expense section (15 categories, budget vs actual input cells), net savings summary
- Annual Totals: pulls F11 (income) and F30 (expenses) from each monthly tab; category breakdown matrix
- Dashboard: 6 KPI cards (Annual Income, Annual Expenses, Net Savings, Savings Rate, Total Debt, Net Worth); 4 charts (Income vs Expenses bar, Savings Trend line, Expense Distribution donut, Cumulative Savings line); month-by-month summary table
- 50/30/20 Dashboard: needs/wants/savings rule calculator with status (On Track / Over Budget)
- Debt Calculator: NPER formula for payoff date, total interest by debt
- Investment Forecast: compound growth 20-year year-by-year table
- Sinking Funds: goal, balance, monthly contribution, months-left formula
- No-Spend Challenge: 30-day calendar grid + exceptions log

**Formula Chain:**
Variable → Monthly tabs (SUMIF by category) → Annual Totals (monthly!F11, monthly!F30) → Dashboard (ANNUAL TOTALS!E19/F19/G19)

**Output filename:** `PlanWiseHaus_Annual_Budget_2025.xlsx`

---

## Blueprint: Book Tracker (7 tabs)

**Tabs:**
Instructions, Setup, Book Tracker, Books Gallery, Reading Calendar, Wishlist, Dashboard

**Key Features:**
- Book Tracker: Title, Author, Genre dropdown, Status dropdown (To Read/Reading/Finished/DNF), Rating (1–5), Start Date, End Date, Pages, Notes
- Books Gallery: visual grid layout, 3 columns, book cover placeholder + title + rating stars
- Reading Calendar: month-view grid with books finished that month
- Wishlist: Title, Author, Where Heard About, Priority dropdown, Est. Price
- Dashboard: KPIs (Books Read, Pages Read, Avg Rating, Goal Progress); 4 charts (Books per Month bar, Genre Breakdown pie, Rating Distribution bar, Pages per Month line); reading streak tracker

**Formula Chain:**
Book Tracker → Dashboard (COUNTIF status="Finished", AVERAGEIF rating, SUMIF pages)

**Output filename:** `PlanWiseHaus_Book_Tracker_2025.xlsx`

---

## Blueprint: Wedding Planner (22 tabs)

**Tabs:**
Instructions, Setup, Save the Date, Theme, Dashboard, Calendar, Timeline, Itinerary,
Packing List, Vendors Choice, Venue Options, Budget, Contact Info, Guest List,
Seating Plan, Wedding Party, Food & Drinks, Photoshoot, Photo Gallery, Music,
Gifts & Thank You, Honeymoon

**Key Features:**
- Setup: wedding date, couple names, venue, total budget → drives days-left countdown in sidebar
- Dashboard: days left KPI, budget spent vs remaining, RSVP count, 7 charts
- Budget: category budgets, vendor payments, % used conditional formatting
- Guest List: Name, Side (Bride/Groom/Both), RSVP dropdown, Meal Choice dropdown, Table #, Gift received
- Seating Plan: grid layout with table circles
- Vendors Choice: vendor name, category, price, deposit paid, contact, rating, hired checkbox
- Timeline: task, due date, assigned to, priority dropdown, status dropdown, % complete
- Gifts & Thank You: gift item, giver, value, thank you sent checkbox

**Formula Chain:**
Guest List (COUNTIF RSVP=Yes) → Dashboard; Budget vendor payments → Dashboard budget KPIs

**Output filename:** `PlanWiseHaus_Wedding_Planner_2025.xlsx`

---

## Blueprint: Fitness Tracker (10 tabs)

**Tabs:**
Instructions, Setup, Dashboard, Workout Log, Meal Planner, Progress Photos, Body Measurements, Goals, Weekly Summary, Exercise Library

**Key Features:**
- Setup: name, start date, weight unit (lbs/kg), calorie goal
- Workout Log: Date, Workout Type dropdown, Exercise, Sets, Reps, Weight, Duration, Calories Burned, Notes
- Meal Planner: Date, Meal (Breakfast/Lunch/Dinner/Snack), Food Item, Calories, Protein(g), Carbs(g), Fat(g)
- Body Measurements: Date, Weight, Chest, Waist, Hips, Arms, Thighs — data bars on each metric
- Goals: Goal description, Target, Current, Progress %, Target Date — conditional formatting on progress
- Exercise Library: Exercise name, Muscle Group, Equipment, Difficulty, Instructions
- Weekly Summary: SUMIF from Workout Log and Meal Planner by week
- Dashboard: KPIs (Workouts This Month, Avg Daily Calories, Weight Change, Goal Progress); 4 charts (Workouts per Week bar, Weight Trend line, Calorie Intake line, Macro Distribution donut)

**Formula Chain:**
Workout Log + Meal Planner → Weekly Summary (SUMPRODUCT by week) → Dashboard

**Output filename:** `PlanWiseHaus_Fitness_Tracker_2025.xlsx`

---

## Blueprint: Project Manager (8 tabs)

**Tabs:**
Instructions, Setup, Dashboard, Tasks, Timeline, Team Members, Budget, Notes

**Key Features:**
- Setup: project name, start date, end date, project manager, total budget
- Tasks: Task ID, Task Name, Assignee dropdown, Priority dropdown (High/Medium/Low), Status dropdown (Not Started/In Progress/Review/Complete), Start Date, Due Date, % Complete, Dependencies, Notes
- Timeline (Gantt): visual Gantt chart area — task names in col A, date columns across; conditional formatting fills cells where task is active
- Team Members: Name, Role, Email, Department, Hourly Rate, Hours Allocated, Hours Used, Cost
- Budget: Category, Budgeted, Actual, Variance, % Used — data bars + over-budget red
- Dashboard: KPIs (Tasks Complete, Days Remaining, Budget Used %, Team Members); 3 charts (Status Distribution donut, Budget by Category bar, Tasks by Assignee bar); project health summary

**Formula Chain:**
Tasks (COUNTIF by status) → Dashboard; Team Members (rate × hours) → Budget

**Output filename:** `PlanWiseHaus_Project_Manager_2025.xlsx`

---

## Adding New Blueprints

When a new product category is built that doesn't fit existing blueprints, add it here after delivery.
Include: tab list, key features, formula chain, and output filename.
