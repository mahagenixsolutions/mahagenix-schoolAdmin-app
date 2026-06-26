import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer } from 'recharts';
const RadialBarAny = RadialBar as any;

import { Link } from 'react-router-dom';

export default function AttendanceDonutChart() {
  // const { data, isLoading } = useGetTodayAttendanceBreakdownQuery();
  const isLoading = false;
  const data = {
    total: 1240,
    present: 1150,
    absent: 40,
    late: 30,
    leave: 20,
    classBreakdown: [
      { className: 'Class 10 A', present: 38, absent: 2, late: 0 },
      { className: 'Class 9 B', present: 35, absent: 3, late: 2 },
      { className: 'Class 7 A', present: 40, absent: 0, late: 0 },
      { className: 'Class 8 A', present: 36, absent: 1, late: 3 },
    ],
  };

  const chartData = [
    { name: 'Leave', value: data?.leave || 0, fill: 'var(--text-muted)' },
    { name: 'Late', value: data?.late || 0, fill: 'var(--accent-warning)' },
    { name: 'Absent', value: data?.absent || 0, fill: 'var(--accent-danger)' },
    { name: 'Present', value: data?.present || 0, fill: 'var(--accent-success)' },
  ];

  return (
    <div style={{ marginBottom: 24, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Today's Attendance Breakdown
        </h3>
      </div>
      <div style={{ padding: '16px' }}>
        {isLoading ? (
          <div
            style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          </div>
        ) : !data || data.total === 0 ? (
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
              className="ti ti-chart-pie"
              style={{ fontSize: 32, color: 'var(--text-muted)', opacity: 0.5 }}
            />
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Attendance not marked yet today
            </div>
            <Link
              to="/attendance?date=today"
              className="btn btn-outline btn-sm"
              style={{ marginTop: 8 }}
            >
              Mark Now &rarr;
            </Link>
          </div>
        ) : (
          <>
            <div style={{ position: 'relative', height: 240, marginBottom: 16 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  animation: 'spin 60s linear infinite', // Slow rotation
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="100%"
                    barSize={12}
                    data={chartData}
                  >
                    <defs>
                      <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <RadialBarAny
                      minAngle={15}
                      background={{ fill: 'var(--border-subtle)' }}
                      clockWise
                      dataKey="value"
                      cornerRadius={10}
                      style={{ filter: 'url(#ringGlow)' }}
                    />
                    <Tooltip
                      formatter={(v: number, name: string) => {
                        const perc = data?.total > 0 ? Math.round((v / data.total) * 100) : 0;
                        return [`${v} (${perc}%)`, name];
                      }}
                      contentStyle={{
                        background: 'var(--bg-surface-raised)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 8,
                        fontSize: 13,
                        boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {data?.total || 0}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                  Students
                </div>
              </div>
            </div>

            {/* Legend rendered manually because rotation breaks built-in legend */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                marginBottom: 16,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--accent-success)',
                  }}
                />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Present{' '}
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {data.present}
                  </span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--accent-danger)',
                  }}
                />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Absent{' '}
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {data.absent}
                  </span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--accent-warning)',
                  }}
                />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Late{' '}
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.late}</span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--text-muted)',
                  }}
                />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Leave{' '}
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {data.leave}
                  </span>
                </span>
              </div>
            </div>

            {/* Class Breakdown Table */}
            {data?.classBreakdown?.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                <table
                  style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          padding: '8px 4px',
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        Class
                      </th>
                      <th
                        style={{
                          padding: '8px 4px',
                          textAlign: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        Present
                      </th>
                      <th
                        style={{
                          padding: '8px 4px',
                          textAlign: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        Absent
                      </th>
                      <th
                        style={{
                          padding: '8px 4px',
                          textAlign: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        Late
                      </th>
                      <th
                        style={{
                          padding: '8px 4px',
                          textAlign: 'right',
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid var(--border-subtle)',
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.classBreakdown?.slice(0, 4).map((c: any, i: number) => (
                      <tr key={i} style={{ borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                        <td style={{ padding: '12px 4px', fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>
                          {c.className}
                        </td>
                        <td
                          style={{
                            padding: '12px 4px',
                            textAlign: 'center',
                            color: 'var(--accent-success)',
                            fontWeight: 600,
                            fontSize: 13
                          }}
                        >
                          {c.present}
                        </td>
                        <td
                          style={{
                            padding: '12px 4px',
                            textAlign: 'center',
                            color: 'var(--accent-danger)',
                            fontWeight: 600,
                            fontSize: 13
                          }}
                        >
                          {c.absent}
                        </td>
                        <td
                          style={{
                            padding: '12px 4px',
                            textAlign: 'center',
                            color: 'var(--accent-warning)',
                            fontWeight: 600,
                            fontSize: 13
                          }}
                        >
                          {c.late}
                        </td>
                        <td style={{ padding: '12px 4px', textAlign: 'right' }}>
                          <Link
                            to={`/attendance?class=${c.className}`}
                            style={{
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                              fontWeight: 600,
                              fontSize: 12,
                              padding: '4px 8px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-subtle)',
                              background: 'var(--bg-tertiary)'
                            }}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
