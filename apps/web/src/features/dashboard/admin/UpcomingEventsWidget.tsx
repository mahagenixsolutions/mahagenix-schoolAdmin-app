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
    <div style={{ marginBottom: 24, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Upcoming Events
        </h3>
        <Link
          to={`/academic-years/${academicYearId}?section=calendar`}
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
          Full Calendar
        </Link>
      </div>
      <div style={{ padding: '8px 12px' }}>
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

            let color = 'var(--accent-primary)';
            if (event.type === 'HOLIDAY') {
              color = 'var(--accent-success)';
            } else if (event.type === 'EXAM') {
              color = 'var(--accent-danger)';
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
                    i < data.events.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  transition: 'background 0.2s',
                  borderRadius: '8px',
                  marginBottom: i < data.events.length - 1 ? 4 : 0,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '8px',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                    {month}
                  </span>
                  <span style={{ fontSize: 18, fontWeight: 800 }}>{day}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {event.name}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span
                      style={{
                        fontSize: 10,
                        padding: '2px 6px',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 4,
                        color: color,
                        fontWeight: 700,
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: event.daysUntil === 'Today' ? 'var(--accent-danger)' : 'var(--text-muted)',
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
