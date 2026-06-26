import { Link } from 'react-router-dom';

export default function RecentActivityFeed() {
  // const { data, isLoading } = useGetRecentActivityQuery({ limit: 8 });
  const isLoading = false;
  const data = {
    activities: [
      {
        id: 1,
        type: 'Attendance',
        description: 'Marked attendance for Class 10 A',
        actor: 'Mr. Sharma',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        type: 'Mark',
        description: 'Uploaded Science marks for Class 8 B',
        actor: 'Mrs. Gupta',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 3,
        type: 'Student',
        description: 'Added 3 new students to Class 1',
        actor: 'Admin',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 4,
        type: 'Fee',
        description: 'Collected term fee for Aarav Patel',
        actor: 'Accounts',
        createdAt: new Date(Date.now() - 10800000).toISOString(),
      },
    ],
  };

  return (
    <div style={{ marginBottom: 24, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Recent Activity
        </h3>
        <Link
          to="/activity-log"
          style={{ 
            color: 'var(--text-secondary)', 
            fontWeight: 600, 
            fontSize: 12, 
            textDecoration: 'none',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-tertiary)'
          }}
        >
          View all
        </Link>
      </div>
      <div style={{ padding: '8px 12px' }}>
        {isLoading ? (
          <div
            style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          </div>
        ) : data?.activities?.length === 0 ? (
          <div
            style={{
              padding: 32,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <i
              className="ti ti-activity"
              style={{ fontSize: 32, color: 'var(--text-muted)', opacity: 0.5 }}
            />
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>No recent activity</div>
            <Link
              to={`/attendance?date=today`}
              className="btn btn-outline btn-sm"
              style={{ marginTop: 8 }}
            >
              Mark Attendance
            </Link>
          </div>
        ) : (
          data?.activities?.map((activity: any, i: number) => {
            let icon = 'ti-bolt';
            let color = 'var(--text-muted)';
            if (activity.type === 'Attendance') {
              icon = 'ti-calendar-check';
              color = 'var(--accent-primary)';
            } else if (activity.type === 'Mark') {
              icon = 'ti-file-pencil';
              color = 'var(--accent-warning)';
            } else if (activity.type === 'Student') {
              icon = 'ti-user-plus';
              color = 'var(--accent-success)';
            } else if (activity.type === 'Fee') {
              icon = 'ti-credit-card';
              color = 'var(--accent-danger)';
            }

            const timeStr = new Date(activity.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <Link
                key={activity.id}
                to={activity.link || '#'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  borderBottom:
                    i < data.activities.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  borderRadius: '8px',
                  marginBottom: i < data.activities.length - 1 ? 4 : 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                    color: color,
                  }}
                >
                  <i className={icon}></i>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {activity.description}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                      marginTop: 2,
                      fontWeight: 500,
                    }}
                  >
                    By {activity.actor}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                    fontWeight: 600,
                  }}
                >
                  {timeStr}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
