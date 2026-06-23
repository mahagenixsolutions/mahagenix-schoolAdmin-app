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
    <div className="glass-card" style={{ marginBottom: 24 }}>
      <div
        className="card-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)' }}
      >
        <h3 className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>📊 Class Performance Snapshot</h3>
      </div>

      <div className="table-responsive">
        <table className="table" style={{ background: 'transparent' }}>
          <thead>
            <tr>
              <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }}>Class</th>
              <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }}>Students</th>
              <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }}>Avg Attendance</th>
              <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }}>Avg Marks</th>
              <th style={{ background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }}>Fee Paid %</th>
              <th style={{ textAlign: 'right', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-secondary)' }}>Action</th>
            </tr>
          </thead>
          <tbody style={{ border: 'none' }}>
            {data.classes.map((cls: any) => (
              <tr 
                key={cls.classId}
                style={{ transition: 'background 0.2s', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ borderLeft: `4px solid ${getStatusColor(cls.attendanceStatus) === 'transparent' ? '#10B981' : getStatusColor(cls.attendanceStatus)}`, borderBottom: 'none' }}>
                  <span
                    style={{
                      fontWeight: 600,
                      paddingLeft: 8,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {cls.className}
                  </span>
                </td>
                <td style={{ borderBottom: 'none', color: 'var(--text-secondary)', fontWeight: 500 }}>{cls.studentCount}</td>
                <td style={{ borderBottom: 'none' }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: cls.attendanceStatus === 'critical' ? 'rgba(244, 63, 94, 0.15)' : cls.attendanceStatus === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: cls.attendanceStatus === 'critical' ? '#E11D48' : cls.attendanceStatus === 'warning' ? '#D97706' : '#059669',
                    }}
                  >
                    {cls.avgAttendancePercent}%
                  </span>
                </td>
                <td style={{ borderBottom: 'none', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {cls.avgMarksPercent === null ? (
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                  ) : (
                    `${cls.avgMarksPercent}%`
                  )}
                </td>
                <td style={{ borderBottom: 'none', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {cls.feeCollectedPercent === null ? (
                    <span style={{ color: 'var(--text-muted)' }}>—</span>
                  ) : (
                    `${cls.feeCollectedPercent}%`
                  )}
                </td>
                <td style={{ textAlign: 'right', borderBottom: 'none' }}>
                  <Link
                    to={`/classes/${cls.classId}`}
                    className="btn btn-ghost btn-sm"
                    style={{ color: '#4F46E5', fontWeight: 600, background: 'rgba(79,70,229,0.1)' }}
                  >
                    View &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
