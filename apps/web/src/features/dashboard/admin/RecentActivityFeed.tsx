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
    <div className="glass-card">
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>⚡ Recent Activity</span>
        <Link to="/activity-log" className="btn btn-ghost btn-sm" style={{ color: '#4F46E5', fontWeight: 600, background: 'rgba(79,70,229,0.1)' }}>
          View all
        </Link>
      </div>
      <div className="card-body" style={{ padding: '8px 12px' }}>
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
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              No recent activity
            </div>
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
            let icon = '⚡';
            let bg = 'linear-gradient(135deg, #CBD5E1, #94A3B8)';
            let shadow = '0 4px 12px rgba(148, 163, 184, 0.3)';
            if (activity.type === 'Attendance') {
              icon = '📋';
              bg = 'linear-gradient(135deg, #60A5FA, #3B82F6)';
              shadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            } else if (activity.type === 'Mark') {
              icon = '📝';
              bg = 'linear-gradient(135deg, #A78BFA, #8B5CF6)';
              shadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            } else if (activity.type === 'Student') {
              icon = '👨‍🎓';
              bg = 'linear-gradient(135deg, #FBBF24, #F59E0B)';
              shadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
            } else if (activity.type === 'Fee') {
              icon = '💳';
              bg = 'linear-gradient(135deg, #34D399, #10B981)';
              shadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
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
                    i < data.activities.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  borderRadius: '12px',
                  marginBottom: i < data.activities.length - 1 ? 4 : 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    background: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                    boxShadow: shadow,
                  }}
                >
                  {icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {activity.description}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, fontWeight: 500 }}>
                    By {activity.actor}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, fontWeight: 600 }}>
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
