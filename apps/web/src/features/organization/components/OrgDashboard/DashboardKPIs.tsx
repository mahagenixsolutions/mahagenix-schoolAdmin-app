
interface KPIsProps {
  onKPIClick: (category: 'academic' | 'finance' | 'operations' | 'compliance') => void;
  academicData: any;
  financialData: any;
  complianceData: any;
}

export default function DashboardKPIs({ onKPIClick, academicData, financialData, complianceData }: KPIsProps) {
  // Sparkline generators
  const renderSparkline = (points: number[], color: string) => {
    const width = 80;
    const height = 18;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const mapped = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height}>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={mapped}
        />
      </svg>
    );
  };

  const sections = [
    {
      title: 'Academic Performance',
      category: 'academic' as const,
      color: '#3b82f6',
      bg: '#eff6ff',
      items: [
        { label: 'Active Students', val: '12,540', trend: '↑ 5.4%', desc: 'vs last term', spark: [11200, 11500, 11900, 12200, 12540] },
        { label: 'Academic Faculty', val: '680', trend: '↑ 2.1%', desc: 'vs last year', spark: [640, 650, 660, 672, 680] },
        { label: 'Registered Parents', val: '10,240', trend: '↑ 6.0%', desc: 'vs last term', spark: [9200, 9500, 9700, 10000, 10240] },
        { label: 'Daily Attendance', val: `${academicData.passRate}%`, trend: '↑ 1.2%', desc: 'vs last month', spark: [92, 93.5, 94.1, 94.6] }
      ]
    },
    {
      title: 'Financial Command',
      category: 'finance' as const,
      color: '#10b981',
      bg: '#ecfdf5',
      items: [
        { label: 'Total Revenue', val: '₹85.0L', trend: '↑ 8.2%', desc: 'vs last month', spark: [75, 78, 80, 82, 85] },
        { label: 'Total Expenses', val: '₹68.2L', trend: '↑ 5.1%', desc: 'vs last month', spark: [60, 62, 64, 65, 68.2] },
        { label: 'Operating Profit', val: '₹16.8L', trend: '↑ 12.4%', desc: 'vs last month', spark: [15, 16, 16.5, 17, 16.8] },
        { label: 'Outstanding Fees', val: '₹4.2L', trend: '↓ 18.0%', desc: 'vs last month', spark: [5.2, 4.9, 4.7, 4.2] }
      ]
    },
    {
      title: 'Operations Summary',
      category: 'operations' as const,
      color: '#f59e0b',
      bg: '#fffbeb',
      items: [
        { label: 'Active Branches', val: '5 / 5', trend: '100%', desc: 'all online', spark: [5, 5, 5, 5, 5] },
        { label: 'Fleet Transport', val: '38 Buses', trend: '94% Safe', desc: 'GPS active', spark: [91, 92, 94, 94] },
        { label: 'Library Catalog', val: '42k Vols', trend: '↑ 1.5%', desc: 'borrow rate', spark: [40, 41, 41.5, 42] },
        { label: 'Hostel Occupancy', val: '84%', trend: 'On Target', desc: 'vs 80% target', spark: [80, 82, 83, 84] }
      ]
    },
    {
      title: 'Compliance & Safety',
      category: 'compliance' as const,
      color: '#ef4444',
      bg: '#fef2f2',
      items: [
        { label: 'Docs Expiring', val: '3 Certs', trend: 'Critical', desc: 'requires renewal', spark: [1, 2, 3, 3] },
        { label: 'Gov Registrations', val: 'Valid', trend: 'Compliant', desc: 'audits passed', spark: [100, 100, 100] },
        { label: 'Pending Approvals', val: '4 Tasks', trend: 'Needs action', desc: 'in review desk', spark: [2, 3, 4, 4] },
        { label: 'Security Alerts', val: '1 Warning', trend: 'Moderate', desc: 'CCTV check', spark: [0, 1, 1, 1] }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, sans-serif' }}>
      {sections.map((sec, secIdx) => (
        <div
          key={secIdx}
          style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              borderBottom: '1px solid #f3f4f6',
              paddingBottom: '10px'
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '4px', height: '14px', background: sec.color, borderRadius: '2px' }} />
              {sec.title}
            </h3>
            <button
              onClick={() => onKPIClick(sec.category)}
              style={{
                background: sec.bg,
                border: 'none',
                color: sec.color,
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Command Center ›
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {sec.items.map((item, itemIdx) => {
              const isDanger = item.trend.includes('↓') && sec.category !== 'finance' && item.label !== 'Outstanding Fees';
              const trendColor = isDanger || item.trend === 'Critical' ? '#ef4444' : '#10b981';

              return (
                <div
                  key={itemIdx}
                  onClick={() => onKPIClick(sec.category)}
                  style={{
                    background: '#fafbfe',
                    border: '1px solid #f1f5f9',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '120px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fafbfe';
                    e.currentTarget.style.borderColor = '#f1f5f9';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{item.label}</div>
                    {renderSparkline(item.spark, sec.color)}
                  </div>

                  <div style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{item.val}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '10px' }}>
                      <span style={{ fontWeight: 700, color: trendColor }}>{item.trend}</span>
                      <span style={{ color: '#94a3b8' }}>{item.desc}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
