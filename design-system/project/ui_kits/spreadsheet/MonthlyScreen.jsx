// Monthly screen — Income & Expenses for a single month (e.g. January).

const MonthlyScreen = ({ month = 'January' }) => {
  const expenseRows = [
    ['Housing',       '$1,450', '$1,478', 102, 'danger', 'overdue'],
    ['Groceries',     '$500',   '$478',   96,  'warn',   'paid'],
    ['Transport',     '$250',   '$265',   106, 'danger', 'overdue'],
    ['Utilities',     '$180',   '$172',   95,  'warn',   'paid'],
    ['Dining',        '$200',   '$188',   94,  'warn',   'pending'],
    ['Entertainment', '$150',   '$104',   69,  null,     'paid'],
    ['Subscriptions', '$80',    '$80',    100, 'warn',   'paid'],
    ['Personal Care', '$60',    '$42',    70,  null,     'paid'],
    ['Healthcare',    '$120',   '$0',     0,   null,     'pending'],
    ['Gifts',         '$50',    '$28',    56,  null,     'paid'],
  ];
  const totalBudget = 3040;
  const totalActual = 2835;
  return (
    <>
      <SectionHeader>Income</SectionHeader>
      <div className="dt" style={{ marginBottom: 8 }}>
        <div className="dt__head" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}>
          <div>Source</div><div className="num">Budgeted</div><div className="num">Actual</div><div className="num">Variance</div>
        </div>
        {[
          ['Salary',       '$5,800', '$5,800', '$0'],
          ['Freelance',    '$400',   '$520',   '+$120'],
          ['Interest',     '$15',    '$18',    '+$3'],
        ].map(([s, b, a, v]) => (
          <div key={s} className="dt__row" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}>
            <div>{s}</div>
            <div className="num">{b}</div>
            <div className="num">{a}</div>
            <div className="num" style={{ color: '#2E7D52', fontWeight: 700 }}>{v}</div>
          </div>
        ))}
        <div className="dt__row is-total" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}>
          <div>Total Income</div>
          <div className="num">$6,215</div>
          <div className="num">$6,338</div>
          <div className="num">+$123</div>
        </div>
      </div>

      <SectionHeader>Expenses</SectionHeader>
      <div className="dt">
        <div className="dt__head" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1.6fr 0.7fr 100px' }}>
          <div>Category</div><div className="num">Budget</div><div className="num">Actual</div><div>% Used</div><div className="num">Status</div><div>State</div>
        </div>
        {expenseRows.map(([cat, b, a, pct, tone, status]) => (
          <div
            key={cat}
            className={'dt__row' + (pct > 100 ? ' is-over' : '')}
            style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1.6fr 0.7fr 100px' }}
          >
            <div>{cat}</div>
            <div className="num">{b}</div>
            <div className="num">{a}</div>
            <div className="bar"><DataBar pct={pct} tone={tone} /></div>
            <div className="num">{pct}%</div>
            <div><Pill kind={status}>{status}</Pill></div>
          </div>
        ))}
        <div className="dt__row is-total" style={{ gridTemplateColumns: '1.6fr 1fr 1fr 1.6fr 0.7fr 100px' }}>
          <div>Total Expenses</div>
          <div className="num">${totalBudget.toLocaleString()}</div>
          <div className="num">${totalActual.toLocaleString()}</div>
          <div></div>
          <div className="num">93%</div>
          <div><Pill kind="ontrack">On Track</Pill></div>
        </div>
      </div>

      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <KPICard label={`${month} Income`}  value="$6,338" />
        <KPICard label={`${month} Expenses`} value="$2,835" />
        <KPICard label={`${month} Net Savings`} value="+$3,503" tone="success" />
      </div>
    </>
  );
};

window.MonthlyScreen = MonthlyScreen;
