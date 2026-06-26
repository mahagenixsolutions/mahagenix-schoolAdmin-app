import { Link } from 'react-router-dom';
import { useGetClassPerformanceQuery } from '../dashboardApi';

export default function ClassPerformanceTable({ academicYearId }: { academicYearId: string }) {
  const { data, isLoading } = useGetClassPerformanceQuery(
    { academicYearId },
    {
      skip: !academicYearId,
      pollingInterval: 600000, // 10 min
    },
  );

  if (isLoading) {
    return (
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <h3 className="card-title">Class Performance</h3>
        </div>
        <div style={{ padding: 24 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="skeleton"
              style={{ height: 48, marginBottom: 8, borderRadius: 4 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data?.classes || data.classes.length === 0) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'var(--color-danger)';
      case 'warning':
        return 'var(--color-warning)';
      case 'good':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  return (
    <div style={{ marginBottom: 24, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Class Performance Snapshot
        </h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-tertiary)' }}>
              <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-subtle)' }}>
                Class
              </th>
              <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-subtle)' }}>
                Students
              </th>
              <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-subtle)' }}>
                Avg Attendance
              </th>
              <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-subtle)' }}>
                Avg Marks
              </th>
              <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-subtle)' }}>
                Fee Paid %
              </th>
              <th style={{ padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.classes.map((cls: any, index: number) => {
              const attendanceColor = cls.avgAttendancePercent < 75 ? 'var(--accent-danger)' : cls.avgAttendancePercent < 85 ? 'var(--accent-warning)' : 'var(--accent-success)';
              
              return (
                <tr
                  key={cls.classId}
                  style={{
                    borderBottom: index === data.classes.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-tertiary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>
                      {cls.className}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>
                    {cls.studentCount}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', width: '40px' }}>
                        {cls.avgAttendancePercent}%
                      </span>
                      <div style={{ flex: 1, maxWidth: '100px', height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${cls.avgAttendancePercent}%`, background: attendanceColor, borderRadius: '3px' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-secondary)', fontSize: 13 }}>
                    {cls.avgMarksPercent === null ? '—' : `${cls.avgMarksPercent}%`}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 500, color: 'var(--text-secondary)', fontSize: 13 }}>
                    {cls.feeCollectedPercent === null ? '—' : `${cls.feeCollectedPercent}%`}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <Link
                      to={`/classes/${cls.classId}`}
                      style={{ 
                        color: 'var(--text-secondary)', 
                        fontWeight: 600, 
                        fontSize: 12, 
                        textDecoration: 'none',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
