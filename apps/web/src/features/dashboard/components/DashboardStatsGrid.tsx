import type { DashboardStat } from '../../../mock/dashboards';

interface Props {
  stats: DashboardStat[];
}

const COLOR_MAP: Record<string, string> = {
  primary: '#4F46E5',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#0EA5E9',
  violet: '#8B5CF6',
};

export default function DashboardStatsGrid({ stats }: Props) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
    }}>
      {stats.map((stat) => (
        <DashboardStatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

function DashboardStatCard({ stat }: { stat: DashboardStat }) {
  const hex = COLOR_MAP[stat.color] || COLOR_MAP.primary;

  return (
    <div
      className="dashboard-card"
      style={{
        padding: '24px',
        borderTop: `3px solid ${hex}`,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        transition: 'all 0.2s ease',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.borderColor = hex;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px',
          }}>
            {stat.label}
          </div>
          <div style={{
            fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            textShadow: `0 0 24px ${hex}40`,
          }}>
            {stat.value}
          </div>
        </div>
        <div style={{
          fontSize: 28, flexShrink: 0, width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)',
        }}>
          {stat.icon}
        </div>
      </div>

      {stat.change && (
        <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            padding: '3px 8px', borderRadius: '99px', fontWeight: 600,
            background: stat.changeDir === 'up' ? 'var(--color-secondary-surface)' :
                        stat.changeDir === 'down' ? 'var(--color-danger-surface)' : 'var(--bg-tertiary)',
            color: stat.changeDir === 'up' ? 'var(--accent-success)' :
                   stat.changeDir === 'down' ? 'var(--accent-danger)' : 'var(--text-secondary)',
          }}>
            {stat.changeDir === 'up' ? '↑' : stat.changeDir === 'down' ? '↓' : '→'}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{stat.change}</span>
        </div>
      )}
    </div>
  );
}
