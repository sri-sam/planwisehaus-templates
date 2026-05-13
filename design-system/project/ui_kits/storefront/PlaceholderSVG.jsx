// Tiny SVG placeholders for thumbnails of OTHER products. Brand-only colors.
const PlaceholderSVG = ({ kind }) => {
  if (kind === 'book') return (
    <svg viewBox="0 0 100 100">
      <rect x="22" y="14" width="40" height="72" rx="2" fill="#2C5F5A"/>
      <rect x="34" y="14" width="40" height="72" rx="2" fill="#3D8A85"/>
      <rect x="40" y="22" width="28" height="3" fill="#C9A845"/>
      <rect x="40" y="30" width="20" height="2" fill="#fff" opacity="0.6"/>
      <rect x="40" y="35" width="24" height="2" fill="#fff" opacity="0.4"/>
    </svg>
  );
  if (kind === 'fitness') return (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="32" fill="none" stroke="#E0F0EE" strokeWidth="10"/>
      <circle cx="50" cy="50" r="32" fill="none" stroke="#2C5F5A" strokeWidth="10" strokeDasharray="140 200" strokeLinecap="round" transform="rotate(-90 50 50)"/>
      <text x="50" y="55" textAnchor="middle" fontFamily="Carlito,sans-serif" fontWeight="700" fontSize="14" fill="#2C5F5A">70%</text>
    </svg>
  );
  if (kind === 'wedding') return (
    <svg viewBox="0 0 100 100">
      <rect x="14" y="20" width="72" height="60" rx="4" fill="#fff" stroke="#C9A845" strokeWidth="2"/>
      <path d="M14 30 H86" stroke="#C9A845" strokeWidth="1"/>
      <text x="50" y="48" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="13" fill="#2C5F5A">Save</text>
      <text x="50" y="62" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="13" fill="#2C5F5A">the Date</text>
      <circle cx="50" cy="74" r="2" fill="#C9A845"/>
    </svg>
  );
  if (kind === 'project') return (
    <svg viewBox="0 0 100 100">
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="14" y={18 + i*12} width="20" height="6" fill="#DDD9D0"/>
          <rect x={36 + i*4} y={18 + i*12} width={30 - i*4} height="6" rx="1" fill={['#2C5F5A','#3D8A85','#C9A845','#2E7D52','#3D8A85'][i]}/>
        </g>
      ))}
    </svg>
  );
  if (kind === 'book2') return (
    <svg viewBox="0 0 100 100">
      <rect x="20" y="20" width="60" height="60" fill="#E0F0EE"/>
      <rect x="20" y="20" width="60" height="6" fill="#C9A845"/>
      <text x="50" y="46" textAnchor="middle" fontFamily="Carlito,sans-serif" fontWeight="700" fontSize="9" fill="#2C5F5A">2025</text>
      <text x="50" y="60" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontStyle="italic" fontSize="10" fill="#777">Read 24</text>
    </svg>
  );
  if (kind === 'chart') return (
    <svg viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="80" fill="#fff" stroke="#DDD9D0"/>
      <rect x="10" y="10" width="80" height="5" fill="#C9A845"/>
      {[20,38,32,52,42,60].map((h,i)=>(
        <rect key={i} x={18 + i*11} y={80 - h} width="8" height={h} fill={i%2 ? "#C9A845" : "#2C5F5A"}/>
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="80" fill="#E0F0EE"/>
      <circle cx="50" cy="50" r="22" fill="none" stroke="#2C5F5A" strokeWidth="10"/>
      <text x="50" y="55" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontStyle="italic" fontSize="14" fill="#2C5F5A">PWH</text>
    </svg>
  );
};

window.PlaceholderSVG = PlaceholderSVG;
