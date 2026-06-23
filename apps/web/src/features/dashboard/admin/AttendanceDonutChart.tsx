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
      { className: 'Class 12 Sci', present: 40, absent: 0, late: 0 },
      { className: 'Class 8 A', present: 36, absent: 1, late: 3 },
    ],
  };

  const chartData = [
    { name: 'Leave', value: data?.leave || 0, fill: 'url(#gradLeave)' },
    { name: 'Late', value: data?.late || 0, fill: 'url(#gradLate)' },
    { name: 'Absent', value: data?.absent || 0, fill: 'url(#gradAbsent)' },
    { name: 'Present', value: data?.present || 0, fill: 'url(#gradPresent)' },
  ];

  return (
    <div className="glass-card">
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>🗂️ Today's Attendance Breakdown</span>
      </div>
      <div className="card-body" style={{ padding: '16px' }}>
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
                      <linearGradient id="gradPresent" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <linearGradient id="gradAbsent" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FB7185" />
                        <stop offset="100%" stopColor="#E11D48" />
                      </linearGradient>
                      <linearGradient id="gradLate" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FBBF24" />
                        <stop offset="100%" stopColor="#D97706" />
                      </linearGradient>
                      <linearGradient id="gradLeave" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#CBD5E1" />
                        <stop offset="100%" stopColor="#64748B" />
                      </linearGradient>
                      <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <RadialBarAny
                      minAngle={15}
                      background={{ fill: 'rgba(0,0,0,0.03)' }}
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
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        borderRadius: 16,
                        fontSize: 13,
                        boxShadow: '0 10px 24px rgba(0,0,0,0.06)',
                        color: 'var(--text-primary)',
                        fontWeight: 600
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
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>
                  {data?.total || 0}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Students</div>
              </div>
            </div>

            {/* Legend rendered manually because rotation breaks built-in legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #34D399, #059669)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Present <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.present}</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #FB7185, #E11D48)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Absent <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.absent}</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #FBBF24, #D97706)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Late <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.late}</span></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'linear-gradient(135deg, #CBD5E1, #64748B)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Leave <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.leave}</span></span>
              </div>
            </div>

            {/* Class Breakdown Table */}
            {data?.classBreakdown?.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 16 }}>
                <table className="table" style={{ fontSize: 13, margin: 0, background: 'transparent' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px 4px', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Class</th>
                      <th style={{ padding: '8px 4px', textAlign: 'center', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Present</th>
                      <th style={{ padding: '8px 4px', textAlign: 'center', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Absent</th>
                      <th style={{ padding: '8px 4px', textAlign: 'center', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Late</th>
                      <th style={{ padding: '8px 4px', textAlign: 'right', background: 'transparent', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.classBreakdown?.slice(0, 4).map((c: any, i: number) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <td style={{ padding: '8px 4px', fontWeight: 600, border: 'none' }}>{c.className}</td>
                        <td style={{ padding: '8px 4px', textAlign: 'center', color: '#059669', fontWeight: 600, border: 'none' }}>
                          {c.present}
                        </td>
                        <td style={{ padding: '8px 4px', textAlign: 'center', color: '#E11D48', fontWeight: 600, border: 'none' }}>
                          {c.absent}
                        </td>
                        <td style={{ padding: '8px 4px', textAlign: 'center', color: '#D97706', fontWeight: 600, border: 'none' }}>
                          {c.late}
                        </td>
                        <td style={{ padding: '8px 4px', textAlign: 'right', border: 'none' }}>
                          <Link
                            to={`/attendance?class=${c.className}`}
                            style={{
                              color: '#4F46E5',
                              textDecoration: 'none',
                              fontWeight: 600,
                              background: 'rgba(79,70,229,0.1)',
                              padding: '4px 8px',
                              borderRadius: '8px'
                            }}
                          >
                            View →
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
