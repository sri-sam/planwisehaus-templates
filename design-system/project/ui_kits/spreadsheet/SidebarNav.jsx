// SidebarNav — left rail with sectioned tab list and active highlight.
// Matches openpyxl Pattern 3 (NAV groups + active tab style).

const SidebarNav = ({ active, onNavigate }) => {
  const groups = [
    { label: 'Overview', tabs: ['Instructions', 'Setup', 'Dashboard'] },
    { label: 'Monthly', tabs: ['January', 'February', 'March'] },
    { label: 'Analysis', tabs: ['Annual Totals', '50-30-20', 'Net Worth', 'Invest Forecast'] },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">PLANWISE HAUS</div>
      {groups.map((g) => (
        <div key={g.label}>
          <div className="sidebar__section">{g.label}</div>
          {g.tabs.map((t) => (
            <a
              key={t}
              className={'sidebar__link' + (t === active ? ' is-active' : '')}
              onClick={() => onNavigate && onNavigate(t)}
            >
              {t}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
};

window.SidebarNav = SidebarNav;
