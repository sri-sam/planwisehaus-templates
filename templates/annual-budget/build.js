const ExcelJS = require('exceljs');
const path = require('path');

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  primary:   'FF2C5F5A',
  secondary: 'FF3D8A85',
  accent:    'FFC9A845',
  bg:        'FFEDEAE2',
  data:      'FFFFFFFF',
  sidebar:   'FFF5F2EC',
  gray:      'FFDDD9D0',
  lt_teal:   'FFE0F0EE',
  input:     'FFFFFDE8',
  success:   'FF2E7D52',
  danger:    'FFC0392B',
  white:     'FFFFFFFF',
};

const TABS = [
  'INSTRUCTIONS','SETUP','BANK ACCOUNTS','RECURRING','PAYMENTS',
  'VARIABLE','DASHBOARD','ANNUAL TOTALS','CALENDAR','PAYCHECK',
  'JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
  'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER',
  '50-30-20','EXPENSE DIST','SINKING FUNDS','DEBT CALC',
  'NET WORTH','INVEST FORECAST','NO-SPEND'
];

const MONTHS = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE',
                'JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];

const CATEGORIES = [
  'Housing','Transportation','Food & Dining','Utilities','Healthcare',
  'Insurance','Entertainment','Shopping','Personal Care','Education',
  'Savings','Investments','Debt Payments','Gifts & Donations','Other'
];
const CAT_BUDGETS = [1500,400,600,200,150,250,150,200,100,50,500,300,200,100,100];
const CAT_TYPES   = ['Need','Need','Need','Need','Need','Need','Want','Want',
                     'Want','Want','Savings','Savings','Need','Want','Other'];

const NAV = [
  [5,  'OVERVIEW',    null],
  [6,  null, 'INSTRUCTIONS'], [7, null, 'SETUP'], [8, null, 'DASHBOARD'],
  [10, 'ACCOUNTS',   null],
  [11, null, 'BANK ACCOUNTS'], [12, null, 'RECURRING'],
  [13, null, 'PAYMENTS'],     [14, null, 'VARIABLE'],
  [16, 'ANALYTICS',  null],
  [17, null, 'ANNUAL TOTALS'], [18, null, 'PAYCHECK'], [19, null, 'CALENDAR'],
  [21, 'MONTHLY',    null],
  [22, null, 'JANUARY'],   [23, null, 'FEBRUARY'],  [24, null, 'MARCH'],
  [25, null, 'APRIL'],     [26, null, 'MAY'],        [27, null, 'JUNE'],
  [28, null, 'JULY'],      [29, null, 'AUGUST'],     [30, null, 'SEPTEMBER'],
  [31, null, 'OCTOBER'],   [32, null, 'NOVEMBER'],   [33, null, 'DECEMBER'],
  [35, 'TOOLS',      null],
  [36, null, '50-30-20'],     [37, null, 'EXPENSE DIST'],
  [38, null, 'SINKING FUNDS'],[39, null, 'DEBT CALC'],
  [40, null, 'NET WORTH'],    [41, null, 'INVEST FORECAST'],
  [42, null, 'NO-SPEND'],
];

// ── STYLE HELPERS ─────────────────────────────────────────────────────────────
function solid(argb) { return { type: 'pattern', pattern: 'solid', fgColor: { argb } }; }
function font(name='Calibri', size=10, opts={}) {
  return { name, size, bold: opts.bold||false, italic: opts.italic||false,
           color: { argb: opts.color||'FF333333' }, underline: opts.underline||false };
}
function border(color=C.gray, sides=['bottom'], style='thin') {
  const b = {};
  sides.forEach(s => b[s] = { style, color: { argb: color } });
  return b;
}
function align(h='left', v='middle', wrap=false) {
  return { horizontal: h, vertical: v, wrapText: wrap };
}

const STYLES = {
  title:       { font: font('Calibri',22,{bold:true,color:C.primary}), alignment: align('left','middle') },
  subtitle:    { font: font('Calibri',10,{italic:true,color:'FF777777'}), alignment: align('left','middle') },
  sec_hdr:     { font: font('Calibri',10,{bold:true,color:C.white}), fill: solid(C.primary),
                 alignment: align('left','middle') },
  col_hdr:     { font: font('Calibri',9,{bold:true,color:C.primary}), fill: solid(C.lt_teal),
                 alignment: align('center','middle'),
                 border: { bottom: { style:'medium', color:{argb:C.secondary} } } },
  data:        { font: font('Calibri',10,{}), fill: solid(C.data), alignment: align('left','middle'),
                 border: border(C.gray,['bottom'],'thin') },
  data_alt:    { font: font('Calibri',10,{}), fill: solid('FFF0FAF8'), alignment: align('left','middle'),
                 border: border(C.gray,['bottom'],'thin') },
  data_r:      { font: font('Calibri',10,{}), fill: solid(C.data), alignment: align('right','middle'),
                 border: border(C.gray,['bottom'],'thin') },
  data_alt_r:  { font: font('Calibri',10,{}), fill: solid('FFF0FAF8'), alignment: align('right','middle'),
                 border: border(C.gray,['bottom'],'thin') },
  total:       { font: font('Calibri',10,{bold:true,color:C.primary}), fill: solid(C.lt_teal),
                 border: { top:{style:'medium',color:{argb:C.secondary}}, bottom:{style:'double',color:{argb:C.primary}} } },
  input:       { font: font('Calibri',10,{}), fill: solid(C.input),
                 border: { bottom:{style:'thin',color:{argb:C.accent}} }, alignment: align('left','middle') },
  nav_link:    { font: font('Calibri',9,{color:C.primary,underline:true}), fill: solid(C.sidebar),
                 alignment: align('left','middle') },
  nav_active:  { font: font('Calibri',9,{bold:true,color:C.white}), fill: solid(C.secondary),
                 alignment: align('left','middle') },
  nav_section: { font: font('Calibri',7,{bold:true,color:'FF999999'}), fill: solid(C.sidebar),
                 alignment: align('left','middle') },
  kpi_val:     { font: font('Calibri',22,{bold:true,color:C.primary}), fill: solid(C.lt_teal),
                 alignment: align('center','middle') },
  kpi_lbl:     { font: font('Calibri',8,{color:'FF888888'}), fill: solid(C.lt_teal),
                 alignment: align('center','middle') },
};

function applyStyle(cell, styleKey) {
  const s = STYLES[styleKey];
  if (!s) return;
  if (s.font)      cell.font      = s.font;
  if (s.fill)      cell.fill      = s.fill;
  if (s.alignment) cell.alignment = s.alignment;
  if (s.border)    cell.border    = s.border;
}

function colLetter(n) { // 1-based
  let result = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    result = String.fromCharCode(65 + rem) + result;
    n = Math.floor((n - 1) / 26);
  }
  return result;
}

// ── SHEET SETUP ───────────────────────────────────────────────────────────────
function fillBg(ws, rows=120, cols=50) {
  const bgFill = solid(C.bg);
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      ws.getCell(r, c).fill = bgFill;
    }
  }
}

function setupSheet(ws, tabTitle, activeTab) {
  ws.views = [{ showGridLines: false }];
  ws.properties.tabColor = { argb: C.primary };

  fillBg(ws);

  for (let r = 1; r <= 120; r++) ws.getRow(r).height = 16;
  ws.getRow(1).height = 5;
  ws.getRow(2).height = 36;
  ws.getRow(3).height = 18;

  ws.getColumn(1).width = 1.5;
  ws.getColumn(2).width = 20;
  ws.getColumn(3).width = 1.5;

  // Gold accent strip row 1
  const accFill = solid(C.accent);
  for (let c = 1; c <= 50; c++) ws.getCell(1, c).fill = accFill;

  // Title
  const titleCell = ws.getCell(2, 4);
  titleCell.value = 'PLANWISE HAUS  ·  ' + tabTitle;
  applyStyle(titleCell, 'title');

  const subCell = ws.getCell(3, 4);
  subCell.value = 'EXCEL TEMPLATES FOR LIFE & HOME';
  applyStyle(subCell, 'subtitle');

  addSidebar(ws, activeTab);
}

function addSidebar(ws, activeTab) {
  const sbFill = solid(C.sidebar);
  for (let r = 1; r <= 120; r++) {
    ws.getCell(r, 1).fill = sbFill;
    ws.getCell(r, 2).fill = sbFill;
  }

  const brand = ws.getCell(2, 2);
  brand.value = 'PLANWISE HAUS';
  brand.font  = font('Calibri',10,{bold:true,color:C.primary});
  brand.fill  = sbFill;
  brand.alignment = align('left','middle');

  for (const [row, section, link] of NAV) {
    const cb = ws.getCell(row, 2);
    cb.fill = sbFill;
    if (section) {
      cb.value = section;
      applyStyle(cb, 'nav_section');
    } else if (link) {
      cb.value = { text: link, hyperlink: `#'${link}'!D2` };
      applyStyle(cb, link === activeTab ? 'nav_active' : 'nav_link');
    }
  }
}

function secHdr(ws, row, col, text, span=6) {
  ws.mergeCells(row, col, row, col+span-1);
  const c = ws.getCell(row, col);
  c.value = '  ' + text;
  applyStyle(c, 'sec_hdr');
  ws.getRow(row).height = 20;
}

function colHdr(ws, row, labels, sc=4) {
  labels.forEach((lbl, i) => {
    const c = ws.getCell(row, sc+i);
    c.value = lbl;
    applyStyle(c, 'col_hdr');
  });
  ws.getRow(row).height = 20;
}

function drow(ws, row, values, sc=4, fmts=null, isAlt=null) {
  const alt = isAlt !== null ? isAlt : (row % 2 !== 0);
  values.forEach((val, i) => {
    const c = ws.getCell(row, sc+i);
    c.value = val;
    const isNum = typeof val === 'number';
    const styleKey = alt ? (isNum ? 'data_alt_r' : 'data_alt') : (isNum ? 'data_r' : 'data');
    applyStyle(c, styleKey);
    if (fmts && fmts[i]) c.numFmt = fmts[i];
  });
  ws.getRow(row).height = 18;
}

function inputCell(ws, row, col, value, fmt=null) {
  const c = ws.getCell(row, col);
  c.value = value;
  applyStyle(c, 'input');
  if (fmt) c.numFmt = fmt;
  ws.getRow(row).height = 22;
}

function lblCell(ws, row, col, text, span=3) {
  if (span > 1) ws.mergeCells(row, col, row, col+span-1);
  const c = ws.getCell(row, col);
  c.value = text;
  c.font  = font('Calibri',10,{bold:true,color:C.primary});
  c.fill  = solid(C.data);
  c.alignment = align('left','middle');
  ws.getRow(row).height = 22;
}

function totalRow(ws, row, col, label, formula, fmt='"$"#,##0') {
  const lc = ws.getCell(row, col);
  lc.value = label;
  applyStyle(lc, 'total');
  const vc = ws.getCell(row, col+1);
  vc.value = { formula };
  vc.numFmt = fmt;
  applyStyle(vc, 'total');
  ws.getRow(row).height = 20;
}

function kpiCard(ws, sr, sc, label, formula, fmt='"$"#,##0') {
  const ec = sc + 3;
  // Accent strip
  ws.getRow(sr).height = 5;
  const accFill = solid(C.accent);
  for (let c = sc; c <= ec; c++) ws.getCell(sr, c).fill = accFill;

  // Value
  ws.mergeCells(sr+1, sc, sr+1, ec);
  const v = ws.getCell(sr+1, sc);
  v.value = { formula };
  v.numFmt = fmt;
  applyStyle(v, 'kpi_val');
  ws.getRow(sr+1).height = 34;

  // Label
  ws.mergeCells(sr+2, sc, sr+2, ec);
  const l = ws.getCell(sr+2, sc);
  l.value = label;
  applyStyle(l, 'kpi_lbl');
  ws.getRow(sr+2).height = 18;

  // Spacer
  ws.mergeCells(sr+3, sc, sr+3, ec);
  ws.getCell(sr+3, sc).fill = solid(C.lt_teal);
  ws.getRow(sr+3).height = 8;
}

// ── TAB BUILDERS ──────────────────────────────────────────────────────────────
function buildInstructions(wb) {
  const ws = wb.getWorksheet('INSTRUCTIONS');
  setupSheet(ws, 'INSTRUCTIONS', 'INSTRUCTIONS');
  ws.getColumn(4).width = 55;
  ws.getColumn(5).width = 20;

  secHdr(ws, 5, 4, 'WELCOME TO YOUR PLANWISE HAUS ANNUAL BUDGET', 8);

  ws.mergeCells(6, 4, 6, 11);
  const welcome = ws.getCell(6, 4);
  welcome.value = 'Thank you for your purchase! This spreadsheet is your complete annual financial command center.';
  welcome.font  = font('Calibri',11,{color:'FF444444'});
  welcome.fill  = solid(C.data);
  welcome.alignment = align('left','middle',true);
  ws.getRow(6).height = 28;

  secHdr(ws, 8, 4, 'GETTING STARTED', 8);
  const steps = [
    ['Step 1', 'Go to SETUP tab — enter your name, year, and preferred currency.'],
    ['Step 2', 'Add your bank accounts in BANK ACCOUNTS.'],
    ['Step 3', 'Enter fixed monthly bills in RECURRING TRANSACTIONS.'],
    ['Step 4', 'Log daily spending in VARIABLE TRANSACTIONS.'],
    ['Step 5', 'Enter income and actual spending in each monthly tab (JANUARY–DECEMBER).'],
    ['Step 6', 'View DASHBOARD for a full financial overview with charts.'],
    ['Step 7', 'Use DEBT CALC and INVEST FORECAST for long-term planning.'],
  ];
  steps.forEach(([step, desc], i) => {
    const r = 9 + i;
    const sc = ws.getCell(r, 4);
    sc.value = step;
    sc.font  = font('Calibri',10,{bold:true,color:C.primary});
    sc.fill  = solid(C.data);
    ws.mergeCells(r, 5, r, 11);
    const dc = ws.getCell(r, 5);
    dc.value = desc;
    dc.font  = font('Calibri',10,{color:'FF444444'});
    dc.fill  = solid(C.data);
    ws.getRow(r).height = 20;
  });

  secHdr(ws, 17, 4, 'COLOR LEGEND', 8);
  const legend = [
    [C.primary,   'Primary Teal-Green — Titles, navigation, key labels'],
    [C.secondary, 'Secondary Teal — Section headers, active nav state'],
    [C.accent,    'Gold Accent — Input fields, KPI highlights'],
    ['FF2E7D52',  'Success Green — On-budget, surplus, positive values'],
    ['FFC0392B',  'Alert Red — Over-budget, deficit, warnings'],
  ];
  legend.forEach(([argb, desc], i) => {
    const r = 18 + i;
    ws.getCell(r, 4).fill = solid(argb);
    ws.mergeCells(r, 5, r, 11);
    const dc = ws.getCell(r, 5);
    dc.value = desc;
    dc.font  = font('Calibri',10,{color:'FF444444'});
    dc.fill  = solid(C.data);
    ws.getRow(r).height = 20;
  });

  secHdr(ws, 24, 4, 'TIPS FOR BEST RESULTS', 8);
  const tips = [
    '• Yellow-highlighted cells are INPUT fields — enter your data there.',
    '• Do not delete rows in monthly tabs — formulas are row-dependent.',
    '• The Dashboard updates automatically as you fill in monthly data.',
    '• Use the left sidebar on every tab to navigate instantly.',
    '• The 50/30/20 Dashboard calculates automatically from your Setup budget.',
  ];
  tips.forEach((tip, i) => {
    const r = 25 + i;
    ws.mergeCells(r, 4, r, 11);
    const c = ws.getCell(r, 4);
    c.value = tip;
    c.font  = font('Calibri',10,{color:'FF444444'});
    c.fill  = solid(C.data);
    ws.getRow(r).height = 20;
  });
}

function buildSetup(wb) {
  const ws = wb.getWorksheet('SETUP');
  setupSheet(ws, 'SETUP', 'SETUP');
  [4,5,6,7,8].forEach((col, i) => ws.getColumn(col).width = 22);

  secHdr(ws, 5, 4, 'YOUR INFORMATION', 5);
  const fields = [
    ['Your Name',            'Jane Smith',  null],
    ['Budget Year',          2025,          null],
    ['Currency Symbol',      '$',           null],
    ['Annual Income Goal',   75000,         '"$"#,##0'],
    ['Annual Savings Goal',  15000,         '"$"#,##0'],
    ['Emergency Fund Goal',  10000,         '"$"#,##0'],
  ];
  fields.forEach(([lbl, val, fmt], i) => {
    const r = 6 + i;
    ws.mergeCells(r, 4, r, 6);
    lblCell(ws, r, 4, lbl, 1);
    inputCell(ws, r, 7, val, fmt);
  });

  ws.dataValidations.add('G8', {
    type: 'list', allowBlank: true, showDropDown: false,
    formulae: ['"$,€,£,¥,₹,CAD,AUD"']
  });

  secHdr(ws, 14, 4, 'EXPENSE CATEGORIES & MONTHLY BUDGETS  (edit to customize)', 5);
  colHdr(ws, 15, ['Category','Type','Monthly Budget','Annual Budget']);

  CATEGORIES.forEach((cat, i) => {
    const r = 16 + i;
    const ann = { formula: `F${r}*12` };
    drow(ws, r, [cat, CAT_TYPES[i], CAT_BUDGETS[i], ann],
         4, [null, null, '"$"#,##0', '"$"#,##0']);
  });

  ws.dataValidations.add(`E16:E${15+CATEGORIES.length}`, {
    type: 'list', allowBlank: true, showDropDown: false,
    formulae: ['"Need,Want,Savings,Other"']
  });

  const rTot = 16 + CATEGORIES.length;
  ws.mergeCells(rTot, 4, rTot, 5);
  const tc = ws.getCell(rTot, 4); tc.value = 'MONTHLY TOTAL'; applyStyle(tc, 'total');
  const tv = ws.getCell(rTot, 6);
  tv.value = { formula: `SUM(F16:F${rTot-1})` }; tv.numFmt = '"$"#,##0'; applyStyle(tv, 'total');
  const ta = ws.getCell(rTot, 7);
  ta.value = { formula: `SUM(G16:G${rTot-1})` }; ta.numFmt = '"$"#,##0'; applyStyle(ta, 'total');
  ws.getRow(rTot).height = 20;
}

function buildBankAccounts(wb) {
  const ws = wb.getWorksheet('BANK ACCOUNTS');
  setupSheet(ws, 'BANK ACCOUNTS', 'BANK ACCOUNTS');
  [25,20,18,16,16,16,20].forEach((w, i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'BANK ACCOUNTS & BALANCES', 7);
  colHdr(ws, 6, ['Account Name','Bank / Institution','Account Type',
                 'Opening Balance','Current Balance','Change','Notes']);

  const sample = [
    ['Primary Checking','Chase Bank','Checking',3500,4250],
    ['Emergency Savings','Ally Bank','Savings',10000,10500],
    ['Investment Account','Fidelity','Investment',25000,26800],
    ['Credit Card','Capital One','Credit Card',-1200,-950],
    ['Joint Account','Credit Union','Checking',2000,2350],
  ];
  sample.forEach(([name,bank,atype,opening,current], i) => {
    const r = 7 + i;
    drow(ws, r, [name,bank,atype,opening,current,{formula:`F${r}-E${r}`},''],
         4, [null,null,null,'"$"#,##0.00','"$"#,##0.00','"$"#,##0.00',null]);
  });

  ws.dataValidations.add('F7:F60', {
    type: 'list', allowBlank: true, showDropDown: false,
    formulae: ['"Checking,Savings,Credit Card,Investment,Loan,Other"']
  });

  secHdr(ws, 14, 4, 'SUMMARY', 4);
  [
    ['Total Assets',      `SUMIF(F7:F60,"Checking",E7:E60)+SUMIF(F7:F60,"Savings",E7:E60)+SUMIF(F7:F60,"Investment",E7:E60)`],
    ['Total Liabilities', `SUMIF(F7:F60,"Credit Card",E7:E60)+SUMIF(F7:F60,"Loan",E7:E60)`],
    ['Net Worth',         `E15+E16`],
  ].forEach(([lbl, formula], i) => {
    const r = 15 + i;
    ws.mergeCells(r, 4, r, 6);
    const lc = ws.getCell(r, 4);
    lc.value = lbl; lc.font = font('Calibri',10,{bold:true,color:C.primary}); lc.fill = solid(C.lt_teal);
    const vc = ws.getCell(r, 7);
    vc.value = { formula }; vc.numFmt = '"$"#,##0.00';
    vc.font = font('Calibri',11,{bold:true,color:C.primary}); vc.fill = solid(C.lt_teal);
    ws.getRow(r).height = 22;
  });
}

function buildRecurring(wb) {
  const ws = wb.getWorksheet('RECURRING');
  setupSheet(ws, 'RECURRING TRANSACTIONS', 'RECURRING');
  [25,20,15,15,12,18,12].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'FIXED / RECURRING MONTHLY EXPENSES', 7);
  colHdr(ws, 6, ['Description','Category','Monthly Amount','Annual Total','Due Day','Payment Method','Active?']);

  const sample = [
    ['Rent / Mortgage','Housing',1500,1,'Auto-Pay'],
    ['Car Payment','Transportation',385,15,'Auto-Pay'],
    ['Car Insurance','Insurance',145,1,'Auto-Pay'],
    ['Health Insurance','Healthcare',220,1,'Auto-Pay'],
    ['Electric','Utilities',120,10,'Auto-Pay'],
    ['Internet','Utilities',65,20,'Auto-Pay'],
    ['Phone Bill','Utilities',80,25,'Auto-Pay'],
    ['Netflix','Entertainment',15.99,7,'Credit Card'],
    ['Spotify','Entertainment',9.99,14,'Credit Card'],
    ['Gym Membership','Personal Care',45,1,'Debit Card'],
  ];
  sample.forEach(([desc,cat,amt,due,pay], i) => {
    const r = 7 + i;
    drow(ws, r, [desc,cat,amt,{formula:`F${r}*12`},due,pay,'Yes'],
         4, [null,null,'"$"#,##0.00','"$"#,##0.00',null,null,null]);
  });

  ws.dataValidations.add('E7:E80', { type:'list', allowBlank:true, showDropDown:false, formulae:['"'+CATEGORIES.join(',')+'"'] });
  ws.dataValidations.add('I7:I80', { type:'list', allowBlank:true, showDropDown:false, formulae:['"Credit Card,Debit Card,Bank Transfer,Cash,Auto-Pay,Check"'] });
  ws.dataValidations.add('J7:J80', { type:'list', allowBlank:true, showDropDown:false, formulae:['"Yes,No"'] });

  const rTot = 18;
  const tc = ws.getCell(rTot, 4); tc.value = 'MONTHLY TOTAL'; applyStyle(tc, 'total');
  const tv = ws.getCell(rTot, 6);
  tv.value = { formula: `SUMIF(J7:J${rTot-1},"Yes",F7:F${rTot-1})` }; tv.numFmt = '"$"#,##0.00'; applyStyle(tv, 'total');
  const ta = ws.getCell(rTot, 7);
  ta.value = { formula: `F${rTot}*12` }; ta.numFmt = '"$"#,##0.00'; applyStyle(ta, 'total');
  ws.getRow(rTot).height = 20;
}

function buildPayments(wb) {
  const ws = wb.getWorksheet('PAYMENTS');
  setupSheet(ws, 'BILL PAYMENT TRACKER', 'PAYMENTS');
  [24,18,14,12,14,16,18].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'MONTHLY BILL PAYMENT TRACKER', 7);
  colHdr(ws, 6, ['Bill / Description','Category','Amount Due','Due Date','Date Paid','Status','Payment Method']);

  const bills = [
    ['Rent / Mortgage','Housing',1500,1],
    ['Car Payment','Transportation',385,15],
    ['Electric','Utilities',120,10],
    ['Internet','Utilities',65,20],
    ['Phone','Utilities',80,25],
    ['Health Insurance','Healthcare',220,1],
    ['Car Insurance','Insurance',145,1],
    ['Gym','Personal Care',45,1],
    ['Netflix','Entertainment',15.99,7],
    ['Spotify','Entertainment',9.99,14],
    ['Student Loan','Debt Payments',250,20],
    ['Credit Card Min','Debt Payments',100,28],
  ];
  bills.forEach(([bill,cat,amt,due], i) => {
    const r = 7 + i;
    drow(ws, r, [bill,cat,amt,due,'','Pending','Auto-Pay'],
         4, [null,null,'"$"#,##0.00',null,'MM/DD/YYYY',null,null]);
  });

  ws.dataValidations.add('J7:J80', { type:'list', allowBlank:true, showDropDown:false, formulae:['"Paid,Pending,Overdue,Auto-Pay"'] });

  ws.addConditionalFormatting({ ref:'J7:J80', rules:[
    { type:'containsText', operator:'containsText', text:'Paid',    priority:1,
      style:{ fill:{ type:'pattern', pattern:'solid', bgColor:{argb:'FFC8E6C9'}, fgColor:{argb:'FFC8E6C9'} } } },
    { type:'containsText', operator:'containsText', text:'Pending', priority:2,
      style:{ fill:{ type:'pattern', pattern:'solid', bgColor:{argb:'FFFFF9C4'}, fgColor:{argb:'FFFFF9C4'} } } },
    { type:'containsText', operator:'containsText', text:'Overdue', priority:3,
      style:{ fill:{ type:'pattern', pattern:'solid', bgColor:{argb:'FFFFCDD2'}, fgColor:{argb:'FFFFCDD2'} } } },
  ]});

  const rTot = 20;
  const tc = ws.getCell(rTot, 4); tc.value = 'TOTAL DUE'; applyStyle(tc, 'total');
  const tv = ws.getCell(rTot, 6); tv.value = { formula:`SUM(F7:F${rTot-1})` }; tv.numFmt = '"$"#,##0.00'; applyStyle(tv, 'total');
  const r2 = rTot + 1;
  const tc2 = ws.getCell(r2, 4); tc2.value = 'TOTAL PAID'; applyStyle(tc2, 'total');
  const tv2 = ws.getCell(r2, 6); tv2.value = { formula:`SUMIF(J7:J${rTot-1},"Paid",F7:F${rTot-1})` }; tv2.numFmt = '"$"#,##0.00'; applyStyle(tv2, 'total');
}

function buildVariable(wb) {
  const ws = wb.getWorksheet('VARIABLE');
  setupSheet(ws, 'VARIABLE TRANSACTIONS', 'VARIABLE');
  [14,30,20,14,20,12,22].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'DAILY / VARIABLE TRANSACTION LOG', 7);
  colHdr(ws, 6, ['Date','Description','Category','Amount','Payment Method','Tax Deductible?','Notes']);

  const sample = [
    ['01/03/2025','Grocery Store','Food & Dining',87.43,'Debit Card','No',''],
    ['01/05/2025','Gas Station','Transportation',52.10,'Credit Card','No',''],
    ['01/07/2025','Restaurant','Food & Dining',65.00,'Credit Card','No','Anniversary'],
    ['01/10/2025','Amazon','Shopping',34.99,'Credit Card','No',''],
    ['01/12/2025','Doctor Co-pay','Healthcare',30.00,'Debit Card','Yes',''],
  ];
  sample.forEach((row, i) => {
    drow(ws, 7+i, row, 4, ['MM/DD/YYYY',null,null,'"$"#,##0.00',null,null,null]);
  });

  ws.dataValidations.add('F7:F1000', { type:'list', allowBlank:true, showDropDown:false, formulae:['"'+CATEGORIES.join(',')+'"'] });
  ws.dataValidations.add('H7:H1000', { type:'list', allowBlank:true, showDropDown:false, formulae:['"Credit Card,Debit Card,Cash,Bank Transfer,Other"'] });
  ws.dataValidations.add('I7:I1000', { type:'list', allowBlank:true, showDropDown:false, formulae:['"Yes,No"'] });
}

function buildMonthly(wb, month, monthNum) {
  const ws = wb.getWorksheet(month);
  setupSheet(ws, month, month);
  [14,30,20,16,16,16,20].forEach((w,i) => ws.getColumn(4+i).width = w);

  const INC_TOT  = 11;
  const EXP_FIRST = 15;
  const EXP_LAST  = EXP_FIRST + CATEGORIES.length - 1;  // 29
  const EXP_TOT   = EXP_LAST + 1;                        // 30

  // INCOME
  secHdr(ws, 5, 4, `INCOME  —  ${month} 2025`, 7);
  colHdr(ws, 6, ['Source','Budgeted','Actual','Difference','Notes']);
  [['Primary Salary',5000,5000],['Side Income',500,0],['Other',0,0]].forEach(([src,exp,act], i) => {
    const r = 7 + i;
    drow(ws, r, [src,exp,act,{formula:`F${r}-E${r}`},''],
         4, [null,'"$"#,##0.00','"$"#,##0.00','"$"#,##0.00',null]);
  });

  ws.mergeCells(INC_TOT, 4, INC_TOT, 4);
  const itc = ws.getCell(INC_TOT, 4); itc.value = 'TOTAL INCOME'; applyStyle(itc, 'total');
  const ite = ws.getCell(INC_TOT, 5); ite.value = {formula:`SUM(E7:E10)`}; ite.numFmt='"$"#,##0.00'; applyStyle(ite,'total');
  const ita = ws.getCell(INC_TOT, 6); ita.value = {formula:`SUM(F7:F10)`}; ita.numFmt='"$"#,##0.00'; applyStyle(ita,'total');
  ws.getRow(INC_TOT).height = 20;

  // EXPENSES
  secHdr(ws, 13, 4, `EXPENSES  —  ${month} 2025`, 7);
  colHdr(ws, 14, ['Category','Budget','Actual Spent','Remaining','% Used','Notes']);

  CATEGORIES.forEach((cat, i) => {
    const r = EXP_FIRST + i;
    const remaining = { formula: `E${r}-F${r}` };
    const pctUsed   = { formula: `IF(E${r}>0,F${r}/E${r},0)` };
    drow(ws, r, [cat, CAT_BUDGETS[i], 0, remaining, pctUsed, ''],
         4, [null,'"$"#,##0.00','"$"#,##0.00','"$"#,##0.00','0%',null]);
    // Make Actual Spent (col F=6) an input cell
    const inp = ws.getCell(r, 6);
    applyStyle(inp, 'input');
    inp.numFmt = '"$"#,##0.00';
    inp.value = 0;
  });

  const etc = ws.getCell(EXP_TOT, 4); etc.value = 'TOTAL EXPENSES'; applyStyle(etc, 'total');
  const ete = ws.getCell(EXP_TOT, 5); ete.value={formula:`SUM(E${EXP_FIRST}:E${EXP_LAST})`}; ete.numFmt='"$"#,##0.00'; applyStyle(ete,'total');
  const eta = ws.getCell(EXP_TOT, 6); eta.value={formula:`SUM(F${EXP_FIRST}:F${EXP_LAST})`}; eta.numFmt='"$"#,##0.00'; applyStyle(eta,'total');
  const etr = ws.getCell(EXP_TOT, 7); etr.value={formula:`SUM(G${EXP_FIRST}:G${EXP_LAST})`}; etr.numFmt='"$"#,##0.00'; applyStyle(etr,'total');
  ws.getRow(EXP_TOT).height = 20;

  // Summary
  const rSum = EXP_TOT + 2;
  secHdr(ws, rSum, 4, 'MONTHLY SUMMARY', 4);
  ws.mergeCells(rSum+1, 4, rSum+1, 6);
  const slc = ws.getCell(rSum+1, 4);
  slc.value = 'Net Savings  (Actual Income − Actual Expenses)';
  slc.font  = font('Calibri',10,{bold:true,color:C.primary});
  slc.fill  = solid(C.lt_teal);
  const svc = ws.getCell(rSum+1, 7);
  svc.value = { formula:`F${INC_TOT}-F${EXP_TOT}` };
  svc.numFmt = '"$"#,##0.00';
  svc.font   = font('Calibri',12,{bold:true,color:C.primary});
  svc.fill   = solid(C.lt_teal);
  ws.getRow(rSum+1).height = 26;

  // Conditional formatting — % Used
  ws.addConditionalFormatting({ ref:`H${EXP_FIRST}:H${EXP_LAST}`, rules:[
    { type:'cellIs', operator:'greaterThan', formulae:['1'], priority:1,
      style:{ fill:{type:'pattern',pattern:'solid',bgColor:{argb:'FFFFCDD2'},fgColor:{argb:'FFFFCDD2'}},
              font:{color:{argb:'FFB71C1C'},bold:true} } },
    { type:'cellIs', operator:'between', formulae:['0.85','1'], priority:2,
      style:{ fill:{type:'pattern',pattern:'solid',bgColor:{argb:'FFFFF9C4'},fgColor:{argb:'FFFFF9C4'}} } },
  ]});

  // Data bars on Actual Spent
  ws.addConditionalFormatting({ ref:`F${EXP_FIRST}:F${EXP_LAST}`, rules:[{
    type:'dataBar', priority:3,
    cfvo:[{type:'min'},{type:'max'}],
    color:{argb:C.secondary}
  }]});
}

function buildAnnualTotals(wb) {
  const ws = wb.getWorksheet('ANNUAL TOTALS');
  setupSheet(ws, 'ANNUAL TOTALS', 'ANNUAL TOTALS');
  const EXP_TOT_ROW = 30; // 15 + 15 categories

  for (let i = 0; i < 8; i++) ws.getColumn(4+i).width = 16;

  secHdr(ws, 5, 4, 'ANNUAL INCOME & EXPENSE SUMMARY', 6);
  colHdr(ws, 6, ['Month','Income (Actual)','Expenses (Actual)','Net Savings','Savings Rate','Running Total']);

  MONTHS.forEach((month, i) => {
    const r = 7 + i;
    const inc     = { formula: `'${month}'!F11` };
    const exp     = { formula: `'${month}'!F${EXP_TOT_ROW}` };
    const net     = { formula: `E${r}-F${r}` };
    const rate    = { formula: `IF(E${r}>0,G${r}/E${r},0)` };
    const running = i === 0 ? { formula:`G${r}` } : { formula:`H${r-1}+G${r}` };
    drow(ws, r, [month, inc, exp, net, rate, running],
         4, [null,'"$"#,##0','"$"#,##0','"$"#,##0','0.0%','"$"#,##0']);
  });

  const rTot = 19;
  const tc = ws.getCell(rTot,4); tc.value='ANNUAL TOTAL'; applyStyle(tc,'total');
  ['E','F','G'].forEach((col,i) => {
    const c = ws.getCell(rTot, 5+i);
    c.value = { formula:`SUM(${col}7:${col}18)` }; c.numFmt='"$"#,##0'; applyStyle(c,'total');
  });
  ws.getRow(rTot).height = 22;

  // Category breakdown
  const annCol = colLetter(4 + 1 + MONTHS.length); // column for annual total in this table
  secHdr(ws, 21, 4, 'EXPENSE BY CATEGORY — ANNUAL', MONTHS.length+3);
  colHdr(ws, 22, ['Category', ...MONTHS.map(m=>m.slice(0,3)), 'ANNUAL TOTAL']);

  CATEGORIES.forEach((cat, i) => {
    const r = 23 + i;
    const monthVals = MONTHS.map((month, j) => ({ formula: `'${month}'!F${15+i}` }));
    const total = { formula:`SUM(E${r}:${colLetter(4+MONTHS.length)}${r})` };
    drow(ws, r, [cat, ...monthVals, total],
         4, [null, ...MONTHS.map(()=>'"$"#,##0'), '"$"#,##0']);
  });
}

function buildPaycheck(wb) {
  const ws = wb.getWorksheet('PAYCHECK');
  setupSheet(ws, 'PAYCHECK DASHBOARD', 'PAYCHECK');
  [16,20,16,15,15,15,16].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'PAYCHECK LOG', 7);
  colHdr(ws, 6, ['Pay Date','Pay Period','Gross Pay','Federal Tax','State Tax','Other Deductions','Net Pay']);

  const sample = [
    ['01/15/2025','Jan 1–15',2500,375,125,185],
    ['01/31/2025','Jan 16–31',2500,375,125,185],
    ['02/14/2025','Feb 1–14',2500,375,125,185],
    ['02/28/2025','Feb 15–28',2500,375,125,185],
    ['03/15/2025','Mar 1–15',2500,375,125,185],
  ];
  sample.forEach(([date,period,gross,fed,state,other], i) => {
    const r = 7 + i;
    drow(ws, r, [date,period,gross,fed,state,other,{formula:`E${r}-F${r}-G${r}-H${r}`}],
         4, ['MM/DD/YYYY',null,'"$"#,##0.00','"$"#,##0.00','"$"#,##0.00','"$"#,##0.00','"$"#,##0.00']);
  });

  const rTot = 13;
  const tc = ws.getCell(rTot,4); tc.value='YTD TOTALS'; applyStyle(tc,'total');
  for (let col = 5; col <= 10; col++) {
    const c = ws.getCell(rTot, col);
    c.value = { formula:`SUM(${colLetter(col)}7:${colLetter(col)}${rTot-1})` };
    c.numFmt = '"$"#,##0.00'; applyStyle(c,'total');
  }
  ws.getRow(rTot).height = 20;

  secHdr(ws, 15, 4, 'YTD SUMMARY', 9);
  kpiCard(ws, 16, 4,  'YTD GROSS PAY',     `E${rTot}`, '"$"#,##0');
  kpiCard(ws, 16, 9,  'YTD NET PAY',       `J${rTot}`, '"$"#,##0');
  kpiCard(ws, 16, 14, 'EFFECTIVE TAX RATE', `IF(E${rTot}>0,(F${rTot}+G${rTot})/E${rTot},0)`, '0.0%');
}

function buildCalendar(wb) {
  const ws = wb.getWorksheet('CALENDAR');
  setupSheet(ws, 'AUTOMATED BILL CALENDAR', 'CALENDAR');
  for (let col = 4; col <= 18; col++) ws.getColumn(col).width = 12;

  secHdr(ws, 5, 4, 'ANNUAL BILL PAYMENT CALENDAR', 14);
  colHdr(ws, 6, ['Bill Name','Amt', ...MONTHS.map(m=>m.slice(0,3))]);

  const bills = [
    ['Rent / Mortgage',1500,1],['Car Payment',385,15],['Electric',120,10],
    ['Internet',65,20],['Phone',80,25],['Health Insurance',220,1],
    ['Car Insurance',145,1],['Gym',45,1],['Netflix',15.99,7],['Spotify',9.99,14],
  ];
  bills.forEach(([bill,amt,due], i) => {
    drow(ws, 7+i, [bill,amt,...Array(12).fill(`Due ${due}`)],
         4, [null,'"$"#,##0.00',...Array(12).fill(null)]);
  });

  const rTot = 18;
  const tc = ws.getCell(rTot,4); tc.value='MONTHLY TOTAL'; applyStyle(tc,'total');
  const tv = ws.getCell(rTot,5);
  tv.value={formula:`SUM(E7:E${rTot-1})`}; tv.numFmt='"$"#,##0.00'; applyStyle(tv,'total');
  ws.getRow(rTot).height = 20;
}

function build503020(wb) {
  const ws = wb.getWorksheet('50-30-20');
  setupSheet(ws, '50/30/20 BUDGET DASHBOARD', '50-30-20');
  [28,12,16,16,14].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'THE 50/30/20 BUDGET RULE', 5);
  ws.mergeCells(6, 4, 6, 6);
  const lc = ws.getCell(6,4); lc.value='Monthly Net Income (from Setup)';
  lc.font=font('Calibri',10,{bold:true,color:C.primary}); lc.fill=solid(C.data);
  inputCell(ws, 6, 7, {formula:'SETUP!F31'}, '"$"#,##0');

  colHdr(ws, 8, ['Category','Rule %','Target Amount','Actual (setup budget)','Status']);
  const rules = [
    ['NEEDS — Housing, Transport, Utilities, Healthcare, Insurance', 0.50],
    ['WANTS — Entertainment, Shopping, Food & Dining, Personal Care',0.30],
    ['SAVINGS & DEBT — Savings, Investments, Debt Payments',         0.20],
  ];
  // Actual = sum of monthly budgets for that rule type from SETUP
  const needCatRows  = [0,1,3,4,5].map(i=>16+i); // Housing,Transport,Utilities,Healthcare,Insurance
  const wantCatRows  = [2,6,7,8].map(i=>16+i);   // Food,Entertainment,Shopping,PersonalCare
  const saveCatRows  = [10,11,12].map(i=>16+i);  // Savings,Investments,Debt
  const catActual = [
    needCatRows.map(r=>`SETUP!F${r}`).join('+'),
    wantCatRows.map(r=>`SETUP!F${r}`).join('+'),
    saveCatRows.map(r=>`SETUP!F${r}`).join('+'),
  ];

  rules.forEach(([cat, pct], i) => {
    const r = 9 + i;
    drow(ws, r, [cat, pct, {formula:`G6*${pct}`}, {formula:catActual[i]},
                 {formula:`IF(H${r}<=F${r},"On Track ✓","Over Budget ✗")`}],
         4, [null,'0%','"$"#,##0','"$"#,##0',null]);
    ws.getRow(r).height = 22;
  });

  ws.addConditionalFormatting({ ref:'I9:I11', rules:[
    { type:'containsText', operator:'containsText', text:'On Track',   priority:1,
      style:{fill:{type:'pattern',pattern:'solid',bgColor:{argb:'FFC8E6C9'},fgColor:{argb:'FFC8E6C9'}},font:{color:{argb:'FF1B5E20'}}} },
    { type:'containsText', operator:'containsText', text:'Over Budget',priority:2,
      style:{fill:{type:'pattern',pattern:'solid',bgColor:{argb:'FFFFCDD2'},fgColor:{argb:'FFFFCDD2'}},font:{color:{argb:'FFB71C1C'}}} },
  ]});

  secHdr(ws, 12, 4, 'HOW THE 50/30/20 RULE WORKS', 5);
  const expl = [
    ['50% NEEDS',   'Essentials you must pay — rent, groceries, utilities, insurance, minimum debt payments.'],
    ['30% WANTS',   'Non-essentials that improve life quality — dining out, streaming, hobbies, travel.'],
    ['20% SAVINGS', 'Savings, investments, and extra debt repayment to build long-term wealth.'],
  ];
  expl.forEach(([hdr, desc], i) => {
    const r = 13 + i;
    const hc = ws.getCell(r,4); hc.value=hdr; hc.font=font('Calibri',10,{bold:true,color:C.primary}); hc.fill=solid(C.data);
    ws.mergeCells(r,5,r,8);
    const dc=ws.getCell(r,5); dc.value=desc; dc.font=font('Calibri',10,{color:'FF444444'}); dc.fill=solid(C.data);
    ws.getRow(r).height = 22;
  });
}

function buildExpenseDist(wb) {
  const ws = wb.getWorksheet('EXPENSE DIST');
  setupSheet(ws, 'EXPENSE DISTRIBUTION', 'EXPENSE DIST');
  [25,16,16,16].forEach((w,i) => ws.getColumn(4+i).width = w);

  const annCol = colLetter(4 + 1 + MONTHS.length);
  secHdr(ws, 5, 4, 'ANNUAL EXPENSE DISTRIBUTION BY CATEGORY', 4);
  colHdr(ws, 6, ['Category','Annual Budget','Annual Actual','% of Total']);

  CATEGORIES.forEach((cat, i) => {
    const r = 7 + i;
    const actual = { formula:`'ANNUAL TOTALS'!${annCol}${23+i}` };
    const totalRows = CATEGORIES.length;
    const pct = { formula:`IF(SUM(F7:F${6+totalRows})>0,F${r}/SUM(F7:F${6+totalRows}),0)` };
    drow(ws, r, [cat, CAT_BUDGETS[i]*12, actual, pct],
         4, [null,'"$"#,##0','"$"#,##0','0.0%']);
  });

  ws.addConditionalFormatting({ ref:`F7:F${6+CATEGORIES.length}`, rules:[{
    type:'dataBar', priority:1,
    cfvo:[{type:'min'},{type:'max'}],
    color:{argb:C.secondary}
  }]});

  const rTot = 7 + CATEGORIES.length;
  const tc=ws.getCell(rTot,4); tc.value='TOTAL'; applyStyle(tc,'total');
  const tb=ws.getCell(rTot,5); tb.value={formula:`SUM(E7:E${rTot-1})`}; tb.numFmt='"$"#,##0'; applyStyle(tb,'total');
  const ta=ws.getCell(rTot,6); ta.value={formula:`SUM(F7:F${rTot-1})`}; ta.numFmt='"$"#,##0'; applyStyle(ta,'total');
  ws.getRow(rTot).height = 20;
}

function buildSinkingFunds(wb) {
  const ws = wb.getWorksheet('SINKING FUNDS');
  setupSheet(ws, 'SINKING FUNDS TRACKER', 'SINKING FUNDS');
  [22,15,16,18,12,12,15].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'SINKING FUNDS TRACKER', 7);
  colHdr(ws, 6, ['Fund Name','Goal Amount','Current Balance','Monthly Contribution','Months Left','% Complete','Target Date']);

  const funds = [
    ['Emergency Fund',10000,4500,500,'12/31/2025'],
    ['Car Repair Fund',2000,800,150,'06/30/2025'],
    ['Vacation Fund',3000,1200,250,'08/01/2025'],
    ['Home Repair Fund',5000,2000,300,'12/31/2025'],
    ['Holiday Gifts',1500,500,100,'11/30/2025'],
    ['New Laptop',2000,600,200,'09/01/2025'],
  ];
  funds.forEach(([name,goal,bal,contrib,target], i) => {
    const r = 7 + i;
    drow(ws, r, [name, goal, bal, contrib,
                 {formula:`CEILING(MAX(0,(E${r}-F${r})/G${r}),1)`},
                 {formula:`MIN(1,F${r}/E${r})`}, target],
         4, [null,'"$"#,##0','"$"#,##0','"$"#,##0','0','0%','MM/DD/YYYY']);
  });

  ws.addConditionalFormatting({ ref:'I7:I20', rules:[{
    type:'dataBar', priority:1,
    cfvo:[{type:'num',value:0},{type:'num',value:1}],
    color:{argb:C.accent}
  }]});
}

function buildDebtCalc(wb) {
  const ws = wb.getWorksheet('DEBT CALC');
  setupSheet(ws, 'DEBT PAYOFF CALCULATOR', 'DEBT CALC');
  [22,16,18,16,16,18,16].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'DEBT PAYOFF CALCULATOR', 7);
  colHdr(ws, 6, ['Debt Name','Current Balance','Interest Rate (APR)','Min Payment','Extra Payment','Payoff Date (Est.)','Total Interest']);

  const debts = [
    ['Credit Card A',3500,0.2199,70,100],
    ['Credit Card B',1200,0.1799,25,50],
    ['Student Loan',15000,0.0675,150,200],
    ['Car Loan',12000,0.0499,385,0],
    ['Medical Bill',800,0.0,100,100],
  ];
  debts.forEach(([name,bal,apr,min_pay,extra], i) => {
    const r = 7 + i;
    const totalPay    = `(G${r}+H${r})`;
    const monthlyRate = `(F${r}/12)`;
    const payoffMo    = `IF(F${r}=0,CEILING(E${r}/${totalPay},1),CEILING(NPER(${monthlyRate},-${totalPay},E${r}),1))`;
    const totalInt    = `IF(F${r}=0,0,MAX(0,${totalPay}*(${payoffMo})-E${r}))`;
    drow(ws, r, [name, bal, apr, min_pay, extra,
                 {formula:`EDATE(TODAY(),${payoffMo})`},
                 {formula:totalInt}],
         4, [null,'"$"#,##0.00','0.00%','"$"#,##0.00','"$"#,##0.00','MM/YYYY','"$"#,##0.00']);
  });

  const rTot = 13;
  const tc=ws.getCell(rTot,4); tc.value='TOTALS'; applyStyle(tc,'total');
  [5,7,8].forEach(col => {
    const c=ws.getCell(rTot,col);
    c.value={formula:`SUM(${colLetter(col)}7:${colLetter(col)}${rTot-1})`};
    c.numFmt='"$"#,##0.00'; applyStyle(c,'total');
  });
  ws.getRow(rTot).height = 20;
}

function buildNetWorth(wb) {
  const ws = wb.getWorksheet('NET WORTH');
  setupSheet(ws, 'NET WORTH TRACKER', 'NET WORTH');
  [25,18,18,16].forEach((w,i) => ws.getColumn(4+i).width = w);

  // ASSETS
  secHdr(ws, 5, 4, 'ASSETS', 4);
  colHdr(ws, 6, ['Asset','Opening Value','Current Value','Change']);
  const assets = [
    ['Checking Account',3500,4250],['Emergency Savings',10000,10500],
    ['Investment Portfolio',25000,26800],['401(k) / Retirement',45000,47500],
    ['Home Value',350000,355000],['Vehicle Value',18000,16500],['Other Assets',5000,5000],
  ];
  assets.forEach(([name,start,cur], i) => {
    const r = 7 + i;
    drow(ws, r, [name,start,cur,{formula:`F${r}-E${r}`}],
         4, [null,'"$"#,##0','"$"#,##0','"$"+#,##0;[Red]"$"(#,##0)']);
  });
  const ASSET_TOT = 15;
  const atc=ws.getCell(ASSET_TOT,4); atc.value='TOTAL ASSETS'; applyStyle(atc,'total');
  const atv=ws.getCell(ASSET_TOT,6); atv.value={formula:`SUM(F7:F${ASSET_TOT-1})`}; atv.numFmt='"$"#,##0'; applyStyle(atv,'total');
  ws.getRow(ASSET_TOT).height = 20;

  // LIABILITIES
  secHdr(ws, 17, 4, 'LIABILITIES', 4);
  colHdr(ws, 18, ['Liability','Opening Balance','Current Balance','Change']);
  const liabs = [
    ['Mortgage',280000,279200],['Car Loan',12000,11200],
    ['Student Loans',15000,14500],['Credit Card Debt',3500,2800],['Other Debt',0,0],
  ];
  liabs.forEach(([name,start,cur], i) => {
    const r = 19 + i;
    drow(ws, r, [name,start,cur,{formula:`F${r}-E${r}`}],
         4, [null,'"$"#,##0','"$"#,##0','"$"+#,##0;[Red]"$"(#,##0)']);
  });
  const LIAB_TOT = 25;
  const ltc=ws.getCell(LIAB_TOT,4); ltc.value='TOTAL LIABILITIES'; applyStyle(ltc,'total');
  const ltv=ws.getCell(LIAB_TOT,6); ltv.value={formula:`SUM(F19:F${LIAB_TOT-1})`}; ltv.numFmt='"$"#,##0'; applyStyle(ltv,'total');
  ws.getRow(LIAB_TOT).height = 20;

  // NET WORTH
  const NW_ROW = 27;
  secHdr(ws, NW_ROW, 4, 'NET WORTH', 4);
  ws.mergeCells(NW_ROW+1, 4, NW_ROW+1, 5);
  const nwlc=ws.getCell(NW_ROW+1,4); nwlc.value='NET WORTH  (Assets − Liabilities)';
  nwlc.font=font('Calibri',11,{bold:true,color:C.primary}); nwlc.fill=solid(C.lt_teal);
  const nwvc=ws.getCell(NW_ROW+1,6);
  nwvc.value={formula:`F${ASSET_TOT}-F${LIAB_TOT}`}; nwvc.numFmt='"$"#,##0';
  nwvc.font=font('Calibri',14,{bold:true,color:C.primary}); nwvc.fill=solid(C.lt_teal);
  ws.getRow(NW_ROW+1).height = 28;
}

function buildInvestForecast(wb) {
  const ws = wb.getWorksheet('INVEST FORECAST');
  setupSheet(ws, 'INVESTMENT FORECAST', 'INVEST FORECAST');
  [25,20,20,20,20].forEach((w,i) => ws.getColumn(4+i).width = w);

  secHdr(ws, 5, 4, 'COMPOUND GROWTH CALCULATOR', 5);
  const inputsDef = [
    ['Starting Investment',    10000,   '"$"#,##0'],
    ['Monthly Contribution',   500,     '"$"#,##0'],
    ['Annual Return Rate',     0.07,    '0.00%'],
    ['Investment Period (yrs)',20,      '0'],
  ];
  inputsDef.forEach(([lbl,val,fmt], i) => {
    const r = 6 + i;
    ws.mergeCells(r,4,r,6);
    lblCell(ws, r, 4, lbl, 1);
    inputCell(ws, r, 7, val, fmt);
  });

  secHdr(ws, 11, 4, 'YEAR-BY-YEAR PROJECTION', 5);
  colHdr(ws, 12, ['Year','Starting Balance','Contributions','Interest Earned','Ending Balance']);

  for (let i = 0; i < 20; i++) {
    const r = 13 + i;
    const sb      = i === 0 ? {formula:'G6'}           : {formula:`H${r-1}`};
    const contrib = {formula:'G7*12'};
    const interest= i === 0 ? {formula:`E${r}*G8`}      : {formula:`(E${r}+F${r})*G8`};
    const ending  = {formula:`E${r}+F${r}+G${r}`};
    drow(ws, r, [2025+i, sb, contrib, interest, ending],
         4, [null,'"$"#,##0','"$"#,##0','"$"#,##0','"$"#,##0']);
  }

  ws.addConditionalFormatting({ ref:'H13:H32', rules:[{
    type:'dataBar', priority:1,
    cfvo:[{type:'min'},{type:'max'}],
    color:{argb:C.secondary}
  }]});
}

function buildNoSpend(wb) {
  const ws = wb.getWorksheet('NO-SPEND');
  setupSheet(ws, 'NO-SPEND CHALLENGE', 'NO-SPEND');
  for (let col = 4; col <= 11; col++) ws.getColumn(col).width = 13;

  secHdr(ws, 5, 4, '30-DAY NO-SPEND CHALLENGE', 8);
  ws.mergeCells(6,4,6,5);
  const lc=ws.getCell(6,4); lc.value='Month / Year:';
  lc.font=font('Calibri',10,{bold:true,color:C.primary}); lc.fill=solid(C.data);
  inputCell(ws, 6, 6, 'January 2025');

  colHdr(ws, 8, ['MON','TUE','WED','THU','FRI','SAT','SUN']);

  const cellBdr = {
    left:{style:'thin',color:{argb:C.gray}}, right:{style:'thin',color:{argb:C.gray}},
    top:{style:'thin',color:{argb:C.gray}},  bottom:{style:'thin',color:{argb:C.gray}}
  };
  let day = 1;
  for (let week = 0; week < 5; week++) {
    const r = 9 + week;
    ws.getRow(r).height = 38;
    for (let d = 0; d < 7; d++) {
      if (day <= 30) {
        const c = ws.getCell(r, 4+d);
        c.value = `Day ${day}`;
        c.alignment = align('center','top',true);
        c.fill = solid(C.data);
        c.font = font('Calibri',9,{color:C.primary});
        c.border = cellBdr;
        day++;
      }
    }
  }

  secHdr(ws, 15, 4, 'SPENDING EXCEPTIONS LOG', 5);
  colHdr(ws, 16, ['Date','Item','Amount','Necessary?','Notes']);
  ws.dataValidations.add('G17:G25', { type:'list', allowBlank:true, showDropDown:false, formulae:['"Yes,No"'] });
  for (let i = 0; i < 6; i++) {
    drow(ws, 17+i, ['','',0,'Yes',''], 4, ['MM/DD/YYYY',null,'"$"#,##0.00',null,null]);
  }

  const rTot = 24;
  const tc=ws.getCell(rTot,4); tc.value='TOTAL EXCEPTIONS'; applyStyle(tc,'total');
  const tv=ws.getCell(rTot,6); tv.value={formula:'SUM(F17:F23)'}; tv.numFmt='"$"#,##0.00'; applyStyle(tv,'total');
}

function buildDashboard(wb) {
  const ws = wb.getWorksheet('DASHBOARD');
  setupSheet(ws, 'ALL-IN-ONE DASHBOARD', 'DASHBOARD');
  for (let i = 0; i < 14; i++) ws.getColumn(4+i).width = 14;

  // KPI Cards - Row 1
  secHdr(ws, 5, 4, 'FINANCIAL SNAPSHOT  —  2025', 12);
  kpiCard(ws, 6,  4,  'ANNUAL INCOME',   "'ANNUAL TOTALS'!E19", '"$"#,##0');
  kpiCard(ws, 6,  9,  'ANNUAL EXPENSES', "'ANNUAL TOTALS'!F19", '"$"#,##0');
  kpiCard(ws, 6,  14, 'NET SAVINGS',     "'ANNUAL TOTALS'!G19", '"$"#,##0');

  // KPI Cards - Row 2
  kpiCard(ws, 11, 4,  'SAVINGS RATE',    "IF('ANNUAL TOTALS'!E19>0,'ANNUAL TOTALS'!G19/'ANNUAL TOTALS'!E19,0)", '0.0%');
  kpiCard(ws, 11, 9,  'TOTAL DEBT',      "'DEBT CALC'!E13",   '"$"#,##0');
  kpiCard(ws, 11, 14, 'NET WORTH',       "'NET WORTH'!F28",   '"$"#,##0');

  ws.getRow(16).height = 14;

  // ── Chart data area (rows 70+, cols A-E, hidden from user view) ──
  const CD = 70;
  ws.getCell(CD,1).value='Month'; ws.getCell(CD,2).value='Income';
  ws.getCell(CD,3).value='Expenses'; ws.getCell(CD,4).value='Net Savings';
  MONTHS.forEach((month, i) => {
    const r = CD + 1 + i;
    ws.getCell(r,1).value = month.slice(0,3);
    ws.getCell(r,2).value = {formula:`'ANNUAL TOTALS'!E${7+i}`};
    ws.getCell(r,3).value = {formula:`'ANNUAL TOTALS'!F${7+i}`};
    ws.getCell(r,4).value = {formula:`'ANNUAL TOTALS'!G${7+i}`};
  });

  const CAT_D = 90;
  ws.getCell(CAT_D,1).value='Category'; ws.getCell(CAT_D,2).value='Annual Total';
  const annCol = colLetter(4 + 1 + MONTHS.length);
  CATEGORIES.forEach((cat, i) => {
    ws.getCell(CAT_D+1+i,1).value = cat;
    ws.getCell(CAT_D+1+i,2).value = {formula:`'ANNUAL TOTALS'!${annCol}${23+i}`};
  });

  const RUN_D = 110;
  ws.getCell(RUN_D,1).value='Month'; ws.getCell(RUN_D,2).value='Cumulative';
  MONTHS.forEach((month, i) => {
    ws.getCell(RUN_D+1+i,1).value = month.slice(0,3);
    ws.getCell(RUN_D+1+i,2).value = {formula:`'ANNUAL TOTALS'!H${7+i}`};
  });

  // Chart 1: Income vs Expenses (Clustered Bar)
  secHdr(ws, 17, 4, 'INCOME vs. EXPENSES BY MONTH', 12);
  const chart1 = {
    type: 'bar', subtype:'clustered',
    title:{title:{text:'Monthly Income vs. Expenses'}},
    plotArea:{ bar:{ barChart:[{
      barDir:'col', barGrouping:'clustered',
      ser:[
        { idx:0, order:0, tx:{strRef:{f:`DASHBOARD!$B$${CD}`, strCache:{ptCount:1, pt:[{idx:0,v:'Income'}]}}},
          cat:{numRef:{f:`DASHBOARD!$A$${CD+1}:$A$${CD+12}`}},
          val:{numRef:{f:`DASHBOARD!$B$${CD+1}:$B$${CD+12}`}} },
        { idx:1, order:1, tx:{strRef:{f:`DASHBOARD!$C$${CD}`, strCache:{ptCount:1, pt:[{idx:0,v:'Expenses'}]}}},
          cat:{numRef:{f:`DASHBOARD!$A$${CD+1}:$A$${CD+12}`}},
          val:{numRef:{f:`DASHBOARD!$C$${CD+1}:$C$${CD+12}`}} },
      ]
    }]}},
  };

  // Add charts using exceljs API
  const c1 = wb.addChart ? null : null; // Charts not supported — use addImage workaround note

  // ── Monthly summary table ──
  secHdr(ws, 33, 4, 'MONTH-BY-MONTH SUMMARY', 6);
  colHdr(ws, 34, ['Month','Income','Expenses','Net Savings','Savings Rate','Status']);
  MONTHS.forEach((month, i) => {
    const r = 35 + i;
    drow(ws, r, [
      month,
      {formula:`'ANNUAL TOTALS'!E${7+i}`},
      {formula:`'ANNUAL TOTALS'!F${7+i}`},
      {formula:`'ANNUAL TOTALS'!G${7+i}`},
      {formula:`'ANNUAL TOTALS'!H${7+i}`},
      {formula:`IF(G${r}>0,"Surplus","Deficit")`}
    ], 4, [null,'"$"#,##0','"$"#,##0','"$"#,##0','0.0%',null]);
  });

  ws.addConditionalFormatting({ ref:'I35:I46', rules:[
    { type:'containsText', operator:'containsText', text:'Surplus', priority:1,
      style:{fill:{type:'pattern',pattern:'solid',bgColor:{argb:'FFC8E6C9'},fgColor:{argb:'FFC8E6C9'}},font:{color:{argb:'FF1B5E20'}}} },
    { type:'containsText', operator:'containsText', text:'Deficit', priority:2,
      style:{fill:{type:'pattern',pattern:'solid',bgColor:{argb:'FFFFCDD2'},fgColor:{argb:'FFFFCDD2'}},font:{color:{argb:'FFB71C1C'}}} },
  ]});

  // Chart note for user
  secHdr(ws, 49, 4, 'DASHBOARD CHARTS  —  ADD IN EXCEL', 8);
  ws.mergeCells(50, 4, 50, 11);
  const nc = ws.getCell(50,4);
  nc.value = '📊  Chart data is prepared in rows 70–125 of this sheet. To add charts: select the data → Insert → Chart. Recommended: Clustered Column (Income/Expenses), Line (Savings Trend), Doughnut (Expense Distribution).';
  nc.font  = font('Calibri',10,{color:'FF444444'});
  nc.fill  = solid('FFFFF9C4');
  nc.alignment = align('left','middle',true);
  ws.getRow(50).height = 36;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  const OUT = path.join(__dirname, 'PlanWiseHaus_Annual_Budget_2025.xlsx');
  const wb  = new ExcelJS.Workbook();
  wb.creator = 'PlanWise Haus';
  wb.created = new Date();

  // Create all worksheets
  TABS.forEach(tab => wb.addWorksheet(tab));

  console.log('Building Instructions...');   buildInstructions(wb);
  console.log('Building Setup...');          buildSetup(wb);
  console.log('Building Bank Accounts...');  buildBankAccounts(wb);
  console.log('Building Recurring...');      buildRecurring(wb);
  console.log('Building Payments...');       buildPayments(wb);
  console.log('Building Variable...');       buildVariable(wb);

  console.log('Building Monthly tabs...');
  MONTHS.forEach((month, i) => {
    buildMonthly(wb, month, i+1);
    process.stdout.write(`  ${month}\n`);
  });

  console.log('Building Annual Totals...');  buildAnnualTotals(wb);
  console.log('Building Paycheck...');       buildPaycheck(wb);
  console.log('Building Calendar...');       buildCalendar(wb);
  console.log('Building 50/30/20...');       build503020(wb);
  console.log('Building Expense Dist...');   buildExpenseDist(wb);
  console.log('Building Sinking Funds...'); buildSinkingFunds(wb);
  console.log('Building Debt Calc...');      buildDebtCalc(wb);
  console.log('Building Net Worth...');      buildNetWorth(wb);
  console.log('Building Invest Forecast...'); buildInvestForecast(wb);
  console.log('Building No-Spend...');       buildNoSpend(wb);
  console.log('Building Dashboard...');      buildDashboard(wb);

  await wb.xlsx.writeFile(OUT);
  console.log(`\nSaved: ${OUT}`);

  // Quality check
  console.log('\nRunning quality checks...');
  const wb2 = new ExcelJS.Workbook();
  await wb2.xlsx.readFile(OUT);
  const issues = [];
  wb2.eachSheet(ws => {
    if (!ws.views || !ws.views[0] || ws.views[0].showGridLines !== false)
      issues.push(`${ws.name}: gridlines may still be on`);
    if (!ws.properties.tabColor)
      issues.push(`${ws.name}: no tab color`);
  });
  if (issues.length) {
    console.log('ISSUES:');
    issues.forEach(i => console.log('  -', i));
  } else {
    console.log('ALL CHECKS PASSED ✓');
  }
}

main().catch(console.error);
