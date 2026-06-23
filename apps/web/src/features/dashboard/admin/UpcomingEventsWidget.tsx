import { Link } from 'react-router-dom';

export default function UpcomingEventsWidget({ academicYearId }: { academicYearId: string }) {
  // const { data, isLoading } = useGetUpcomingEventsQuery({ limit: 4 });
  const isLoading = false;
  const data = {
    events: [
      {
        id: 1,
        name: 'Quarterly Exams Begin',
        type: 'EXAM',
        date: new Date(Date.now() + 86400000 * 3).toISOString(),
        daysUntil: 'In 3 days',
      },
      {
        id: 2,
        name: 'Republic Day',
        type: 'HOLIDAY',
        date: new Date(Date.now() + 86400000 * 12).toISOString(),
        daysUntil: 'In 12 days',
      },
      {
        id: 3,
        name: 'Parent Teacher Meeting',
        type: 'EVENT',
        date: new Date(Date.now() + 86400000 * 15).toISOString(),
        daysUntil: 'In 15 days',
      },
      {
        id: 4,
        name: 'Annual Sports Day',
        type: 'EVENT',
        date: new Date(Date.now() + 86400000 * 25).toISOString(),
        daysUntil: 'In 25 days',
      },
    ],
  };

  return (
    <div className="glass-card">
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>📅 Upcoming Events</span>
        <Link
          to={`/academic-years/${academicYearId}?section=calendar`}
          className="btn btn-ghost btn-sm"
          style={{ color: '#4F46E5', fontWeight: 600, background: 'rgba(79,70,229,0.1)' }}
        >
          Full Calendar
        </Link>
      </div>
      <div className="card-body" style={{ padding: '8px 12px' }}>
        {isLoading ? (
          <div
            style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          </div>
        ) : data?.events?.length === 0 ? (
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
              className="ti ti-calendar-off"
              style={{ fontSize: 32, color: 'var(--text-muted)', opacity: 0.5 }}
            />
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              No upcoming events scheduled
            </div>
            <Link
              to={`/academic-years/${academicYearId}?section=calendar`}
              className="btn btn-outline btn-sm"
              style={{ marginTop: 8 }}
            >
              + Schedule Event
            </Link>
          </div>
        ) : (
          data?.events?.map((event: any, i: number) => {
            const dateObj = new Date(event.date);
            const month = dateObj.toLocaleString('default', { month: 'short' });
            const day = dateObj.getDate();

            let color = '#4F46E5';
            let bg = 'rgba(79,70,229,0.15)';
            if (event.type === 'HOLIDAY') {
              color = '#059669';
              bg = 'rgba(16, 185, 129, 0.15)';
            } else if (event.type === 'EXAM') {
              color = '#E11D48';
              bg = 'rgba(244, 63, 94, 0.15)';
            }

            return (
              <div
                key={event.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '12px 16px',
                  borderBottom:
                    i < data.events.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  borderRadius: '12px',
                  marginBottom: i < data.events.length - 1 ? 4 : 0,
                  cursor: 'pointer'
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
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: bg,
                    color: color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 4px 12px ${bg.replace('0.15)', '0.3)')}`
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                    {month}
                  </span>
                  <span style={{ fontSize: 18, fontWeight: 800 }}>{day}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {event.name}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span
                      style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        background: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.8)',
                        borderRadius: 8,
                        color: 'var(--text-secondary)',
                        fontWeight: 600
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: event.daysUntil === 'Today' ? '#E11D48' : 'var(--text-secondary)',
                  }}
                >
                  {event.daysUntil}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
