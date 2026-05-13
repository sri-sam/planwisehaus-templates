// Dashboard screen — the marquee tab. 6 KPIs + 4 charts + month summary.

const DashboardScreen = () => {
  return (
    <>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        <KPICard label="Annual Income" value="$78,400" />
        <KPICard label="Annual Expenses" value="$65,560" />
        <KPICard label="Net Savings" value="$12,840" tone="success" />
        <KPICard label="Savings Rate" value="16.4%" />
        <KPICard label="Total Debt" value="-$5,210" tone="danger" />
        <KPICard label="Net Worth" value="$48,200" />
      </div>

      <SectionHeader>Charts</SectionHeader>
      <div className="two-col" style={{ gridTemplateColumns: '1fr 1fr', marginTop: 12 }}>
        <div>
          <div style={{ background: '#fff' }}>
            <div className="chart__title" style={{ padding: '14px 16px 0' }}>Income vs Expenses</div>
            <ChartBar
              months={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']}
              income={[6200, 6200, 6800, 6500, 6500, 6800, 7100, 6500, 6500, 6800, 7100, 7400]}
              expenses={[5100, 4800, 5300, 5600, 5200, 5900, 5400, 5100, 5600, 5800, 5500, 6300]}
            />
          </div>
        </div>
        <div>
          <div style={{ background: '#fff' }}>
            <div className="chart__title" style={{ padding: '14px 16px 0' }}>Expense Distribution</div>
            <ChartDonut
              total="$65.6k"
              data={[
                { label: 'Housing', value: 28, color: '#2C5F5A' },
                { label: 'Groceries', value: 23, color: '#3D8A85' },
                { label: 'Transport', value: 18, color: '#C9A845' },
                { label: 'Dining', value: 15, color: '#2E7D52' },
                { label: 'Other', value: 16, color: '#DDD9D0' },
              ]}
            />
          </div>
        </div>
        <div>
          <div style={{ background: '#fff' }}>
            <div className="chart__title" style={{ padding: '14px 16px 4px' }}>Cumulative Savings</div>
            <ChartLine
              values={[800, 1900, 2800, 3900, 5200, 6100, 7400, 8200, 9100, 10300, 11400, 12840]}
              color="#2E7D52"
            />
          </div>
        </div>
        <div>
          <div style={{ background: '#fff' }}>
            <div className="chart__title" style={{ padding: '14px 16px 4px' }}>Savings Rate Trend</div>
            <ChartLine values={[11, 13, 12, 14, 15, 14, 16, 17, 16, 17, 18, 19]} color="#3D8A85" label="% of monthly income saved" />
          </div>
        </div>
      </div>

      <SectionHeader>Month-by-Month</SectionHeader>
      <div className="dt">
        <div className="dt__head" style={{ gridTemplateColumns: '120px 1fr 1fr 1fr 120px' }}>
          <div>Month</div><div className="num">Income</div><div className="num">Expenses</div><div className="num">Net</div><div>Status</div>
        </div>
        {[
          ['January',  '$6,200', '$5,100', '+$1,100', 'paid'],
          ['February', '$6,200', '$4,800', '+$1,400', 'paid'],
          ['March',    '$6,800', '$5,300', '+$1,500', 'paid'],
          ['April',    '$6,500', '$5,600',   '+$900', 'paid'],
          ['May',      '$6,500', '$5,200', '+$1,300', 'paid'],
          ['June',     '$6,800', '$5,900',   '+$900', 'pending'],
        ].map(([m, i, e, n, s]) => (
          <div key={m} className="dt__row" style={{ gridTemplateColumns: '120px 1fr 1fr 1fr 120px' }}>
            <div>{m}</div>
            <div className="num">{i}</div>
            <div className="num">{e}</div>
            <div className="num" style={{ color: '#2E7D52', fontWeight: 700 }}>{n}</div>
            <div><Pill kind={s}>{s === 'paid' ? 'On Track' : 'Pending'}</Pill></div>
          </div>
        ))}
      </div>
    </>
  );
};

window.DashboardScreen = DashboardScreen;
