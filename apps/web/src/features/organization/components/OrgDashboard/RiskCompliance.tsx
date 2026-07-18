
interface ComplianceProps {
  complianceData: any;
}

export default function RiskCompliance({ complianceData }: ComplianceProps) {
  const checks = complianceData.checks || [];

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#ef4444', borderRadius: '1px' }} />
            Risk & Compliance Command Center
          </h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            Safety certifications, vehicle safety compliance, and audits tracking
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {checks.map((item: any, idx: number) => {
          const isCritical = item.severity === 'critical';
          const isWarning = item.severity === 'warning';
          const badgeColor = isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#3b82f6';
          const badgeBg = isCritical ? '#fef2f2' : isWarning ? '#fffbeb' : '#eff6ff';

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                borderRadius: '10px',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: badgeColor,
                    flexShrink: 0
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.item}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {item.branch}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: badgeColor,
                    background: badgeBg,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase'
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
