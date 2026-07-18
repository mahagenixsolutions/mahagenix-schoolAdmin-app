import type { DashboardActivity } from '../../../mock/dashboards';

interface Props {
  activities: DashboardActivity[];
  title?: string;
}

const TYPE_COLORS: Record<string, string> = {
  info: 'var(--accent-primary)',
  success: 'var(--accent-success)',
  warning: 'var(--accent-warning)',
  danger: 'var(--accent-danger)',
};

export default function DashboardActivityFeed({ activities, title = 'Recent Activities' }: Props) {
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)',
        fontWeight: 700, fontSize: 14, color: 'var(--text-primary)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          width: 4, height: 16, borderRadius: 2,
          background: 'var(--text-secondary)',
        }} />
        {title}
      </div>
      <div style={{ padding: '8px 0' }}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '12px 20px', transition: 'background 0.15s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-surface-raised)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 'var(--radius-md)',
              background: `${TYPE_COLORS[activity.type]}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, flexShrink: 0, marginTop: 2,
            }}>
              {activity.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13, color: 'var(--text-primary)', fontWeight: 500,
                lineHeight: 1.5,
              }}>
                {activity.text}
              </div>
              <div style={{
                fontSize: 11, color: 'var(--text-muted)', marginTop: 2,
              }}>
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
