// Setup screen — user inputs that drive the rest of the workbook.

const SetupScreen = () => {
  const cats = [
    'Housing', 'Groceries', 'Transport', 'Utilities', 'Dining',
    'Entertainment', 'Subscriptions', 'Personal Care', 'Healthcare', 'Gifts',
    'Clothing', 'Education', 'Pets', 'Travel', 'Misc',
  ];
  return (
    <>
      <SectionHeader>Your Details</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '16px 0' }}>
        <InputCell label="Your Name" value="Sammy R." />
        <InputCell label="Year" value="2025" mono />
        <InputCell label="Currency" value="$ — USD" />
        <InputCell label="Start Month" value="January" />
      </div>

      <SectionHeader>Category Budgets</SectionHeader>
      <div className="dt">
        <div className="dt__head" style={{ gridTemplateColumns: '40px 1fr 1fr 1fr' }}>
          <div className="num">#</div><div>Category</div><div className="num">Monthly Budget</div><div className="num">Annual</div>
        </div>
        {cats.map((c, i) => {
          const budget = [1450, 500, 250, 180, 200, 150, 80, 60, 120, 50, 90, 40, 35, 200, 60][i];
          return (
            <div key={c} className="dt__row" style={{ gridTemplateColumns: '40px 1fr 1fr 1fr' }}>
              <div className="num">{i + 1}</div>
              <div>{c}</div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: '#FFFDE8', borderBottom: '1.5px solid #C9A845', padding: '2px 8px', fontFamily: 'JetBrains Mono, monospace' }}>
                  ${budget.toLocaleString()}
                </span>
              </div>
              <div className="num">${(budget * 12).toLocaleString()}</div>
            </div>
          );
        })}
        <div className="dt__row is-total" style={{ gridTemplateColumns: '40px 1fr 1fr 1fr' }}>
          <div></div>
          <div>Total</div>
          <div className="num">$3,465</div>
          <div className="num">$41,580</div>
        </div>
      </div>

      <SectionHeader>Quick Tips</SectionHeader>
      <ul style={{ paddingLeft: 22, marginTop: 12, color: '#4A4A4A', fontSize: 13, lineHeight: 1.6 }}>
        <li>Pale-yellow cells are yours to edit. Everything else is a formula — don't overwrite.</li>
        <li>Pick your currency once here and it propagates to every tab.</li>
        <li>The Dashboard refreshes the moment you fill in a Monthly tab.</li>
      </ul>
    </>
  );
};

window.SetupScreen = SetupScreen;
