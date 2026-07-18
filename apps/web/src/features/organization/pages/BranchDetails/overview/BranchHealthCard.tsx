import type { BranchHealth } from '../types';

interface Props {
  health: BranchHealth;
}

export default function BranchHealthCard({ health }: Props) {
  const categories = [
    { label: 'Academics', val: health.academics, color: '#3b82f6', icon: '🎓' },
    { label: 'Finance', val: health.finance, color: '#10b981', icon: '💰' },
    { label: 'Attendance', val: health.attendance, color: '#f59e0b', icon: '📋' },
    { label: 'Staff & Teachers', val: health.staff, color: '#8b5cf6', icon: '👥' },
    { label: 'Infrastructure', val: health.infrastructure, color: '#ec4899', icon: '🏢' },
    { label: 'Compliance', val: health.compliance, color: '#f97316', icon: '🛡️' }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Branch Health Scorecard
        </h3>
        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>
          Healthy
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
        {/* Left Side: Radial Gauge for Overall health */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="120" height="120" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray={`${health.overall} 100`} />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                {health.overall}%
              </div>
              <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>Overall Health</div>
            </div>
          </div>
        </div>

        {/* Right Side: Specific parameters list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {categories.map((cat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#334155' }}>
                <span style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{cat.icon}</span> {cat.label}
                </span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{cat.val}%</span>
              </div>
              <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${cat.val}%`, height: '100%', background: cat.color, borderRadius: '3px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
