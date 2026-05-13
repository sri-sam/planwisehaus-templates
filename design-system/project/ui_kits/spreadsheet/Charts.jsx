// Brand-styled flat SVG charts. Hardcoded sample data — UI kit only.

const ChartDonut = ({ data, total }) => {
  // data: [{label, value, color}]
  const R = 44, C = 2 * Math.PI * R; // 276.46
  let offset = 0;
  return (
    <div className="chart" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <svg viewBox="0 0 120 120" style={{ width: 140, height: 140 }}>
        {data.map((d, i) => {
          const len = (d.value / 100) * C;
          const el = (
            <circle
              key={i}
              cx="60" cy="60" r={R}
              fill="none" stroke={d.color}
              strokeWidth="22"
              strokeDasharray={`${len} ${C}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
        <text x="60" y="58" textAnchor="middle" fontFamily="Carlito,Calibri,sans-serif" fontSize="10" fill="#777" letterSpacing="1">TOTAL</text>
        <text x="60" y="74" textAnchor="middle" fontFamily="Carlito,Calibri,sans-serif" fontSize="14" fontWeight="700" fill="#2C5F5A">{total}</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 11 }}>
        {data.map((d) => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 9, height: 9, background: d.color, borderRadius: 1 }} />
            <span style={{ width: 86 }}>{d.label}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#777' }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartBar = ({ months, income, expenses }) => {
  const max = Math.max(...income, ...expenses);
  return (
    <div className="chart">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 130, borderBottom: '1px solid #DDD9D0', paddingBottom: 4 }}>
        {months.map((m, i) => (
          <div key={m + i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: '100%' }}>
              <div style={{ width: 9, height: (income[i] / max * 100) + '%', background: '#2C5F5A' }} />
              <div style={{ width: 9, height: (expenses[i] / max * 100) + '%', background: '#C9A845' }} />
            </div>
            <div style={{ fontSize: 9, color: '#777' }}>{m}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#4A4A4A', marginTop: 8, justifyContent: 'center' }}>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#2C5F5A', verticalAlign: 'middle', marginRight: 5 }} />Income</span>
        <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#C9A845', verticalAlign: 'middle', marginRight: 5 }} />Expenses</span>
      </div>
    </div>
  );
};

const ChartLine = ({ values, color = '#2E7D52', label }) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const W = 320, H = 110;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * (H - 20) - 8;
    return `${x},${y}`;
  }).join(' ');
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 110 }}>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" />
        {values.map((v, i) => {
          const x = (i / (values.length - 1)) * W;
          const y = H - ((v - min) / (max - min || 1)) * (H - 20) - 8;
          return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
        })}
      </svg>
      {label && <div style={{ fontSize: 10, color: '#777', textAlign: 'center' }}>{label}</div>}
    </div>
  );
};

window.ChartDonut = ChartDonut;
window.ChartBar = ChartBar;
window.ChartLine = ChartLine;
