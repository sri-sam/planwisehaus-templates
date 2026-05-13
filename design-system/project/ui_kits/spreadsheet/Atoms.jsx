// Atomic building blocks used across the screens.

const KPICard = ({ label, value, tone }) => {
  const cls = 'kpi__value' + (tone === 'success' ? ' kpi__value--success' : tone === 'danger' ? ' kpi__value--danger' : '');
  return (
    <div className="kpi">
      <div className="kpi__strip" />
      <div className={cls}>{value}</div>
      <div className="kpi__label">{label}</div>
    </div>
  );
};

const SectionHeader = ({ children }) => <div className="section-header">{children}</div>;

const InputCell = ({ label, value, mono, onChange }) => (
  <label className="input-cell">
    <span className="input-cell__label">{label}</span>
    <input
      className={'input-cell__field' + (mono ? ' input-cell__field--mono' : '')}
      defaultValue={value}
      onChange={onChange}
    />
  </label>
);

const Pill = ({ kind, children }) => (
  <span className={'pill pill--' + kind}>{children}</span>
);

const DataBar = ({ pct, tone }) => {
  const fillCls = 'bar__fill' + (tone === 'warn' ? ' bar__fill--warn' : tone === 'danger' ? ' bar__fill--danger' : '');
  return (
    <div className="bar__track">
      <div className={fillCls} style={{ width: Math.min(100, pct) + '%' }} />
    </div>
  );
};

window.KPICard = KPICard;
window.SectionHeader = SectionHeader;
window.InputCell = InputCell;
window.Pill = Pill;
window.DataBar = DataBar;
