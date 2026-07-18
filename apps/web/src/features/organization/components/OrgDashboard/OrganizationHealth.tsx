
interface HealthProps {
  healthMetrics: any;
}

export default function OrganizationHealth({ healthMetrics }: HealthProps) {
  const metrics = [
    { label: 'Academic outcomes', val: healthMetrics.academics, color: '#3b82f6' },
    { label: 'Financial efficiency', val: healthMetrics.finance, color: '#10b981' },
    { label: 'Administrative safety', val: healthMetrics.operations, color: '#f59e0b' },
    { label: 'Compliance checklist', val: healthMetrics.compliance, color: '#ef4444' },
    { label: 'Infrastructure check', val: healthMetrics.infrastructure, color: '#8b5cf6' },
    { label: 'Student feedback', val: `${healthMetrics.studentSatisfaction}%`, color: '#ec4899', rawVal: healthMetrics.studentSatisfaction },
    { label: 'Parent survey response', val: `${healthMetrics.parentSatisfaction}%`, color: '#06b6d4', rawVal: healthMetrics.parentSatisfaction },
    { label: 'Staff retention index', val: `${healthMetrics.teacherSatisfaction}%`, color: '#14b8a6', rawVal: healthMetrics.teacherSatisfaction }
  ];

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px',
        alignItems: 'center',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'Inter, sans-serif',
        minHeight: '280px',
        boxSizing: 'border-box'
      }}
    >
      {/* Overall Score Circle */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #f3f4f6', paddingRight: '20px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="120" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f3f4f6" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray={`${healthMetrics.overall} 100`} />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
              {healthMetrics.overall}%
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 700, marginTop: '2px', textTransform: 'uppercase' }}>
              Overall Health
            </div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, marginTop: '10px', background: '#ecfdf5', padding: '3px 8px', borderRadius: '4px' }}>
          Excellent Status
        </div>
      </div>

      {/* Grid of Indices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {metrics.map((item, idx) => {
          const rawNum = typeof item.val === 'number' ? item.val : item.rawVal || 80;
          return (
            <div key={idx} style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', marginBottom: '4px', fontWeight: 500 }}>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>{typeof item.val === 'number' ? `${item.val}%` : item.val}</span>
              </div>
              <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
                <div style={{ width: `${rawNum}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
