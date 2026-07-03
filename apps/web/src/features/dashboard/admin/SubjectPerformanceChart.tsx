import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SubjectPerformanceChart(_props: { academicYearId?: string }) {
  // const { data, isLoading } = useGetSubjectPerformanceQuery({ academicYearId }, { skip: !academicYearId });
  const isLoading = false;
  const data = {
    subjects: [
      { name: 'Mathematics', avgScore: 78, passRate: 85 },
      { name: 'Science', avgScore: 82, passRate: 90 },
      { name: 'English', avgScore: 75, passRate: 80 },
      { name: 'History', avgScore: 88, passRate: 95 },
      { name: 'Art', avgScore: 92, passRate: 100 },
    ],
  };
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 24, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Subject Performance
        </h3>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 8px',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          Current Term
        </span>
      </div>
      <div style={{ paddingTop: 16 }}>
        {isLoading ? (
          <div
            style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          </div>
        ) : !data?.subjects || data.subjects.every((s: any) => s.avgScore === 0) ? (
          <div
            style={{
              height: 240,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 24,
            }}
          >
            <i
              className="ti ti-books"
              style={{
                fontSize: 32,
                color: 'var(--text-muted)',
                opacity: 0.5,
                marginBottom: 12,
              }}
            />
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              No marks uploaded this term yet.
            </div>
          </div>
        ) : (
          <div className="chart-scrollable-container">
            <div className="dashboard-chart-wrapper chart-scrollable-inner">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.subjects?.filter((s: any) => s.avgScore > 0) || []}
                  layout="vertical"
                  margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="barGrad0" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--accent-primary)" />
                      <stop offset="100%" stopColor="var(--accent-primary)" />
                    </linearGradient>
                    <linearGradient id="barGrad1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--accent-success)" />
                      <stop offset="100%" stopColor="var(--accent-success)" />
                    </linearGradient>
                    <linearGradient id="barGrad2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--accent-warning)" />
                      <stop offset="100%" stopColor="var(--accent-warning)" />
                    </linearGradient>
                    <linearGradient id="barGrad3" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--accent-primary)" opacity={0.8} />
                      <stop offset="100%" stopColor="var(--accent-primary)" opacity={0.8} />
                    </linearGradient>
                    <linearGradient id="barGrad4" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--accent-success)" opacity={0.8} />
                      <stop offset="100%" stopColor="var(--accent-success)" opacity={0.8} />
                    </linearGradient>
                    <filter id="pillGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    unit="%"
                    dy={10}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-surface-raised)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 8,
                      fontSize: 13,
                      boxShadow: '0 10px 24px rgba(0,0,0,0.5)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                    }}
                    formatter={(v: number, name: string, props: any) => [
                      `${v}% (Pass: ${props.payload.passRate}%)`,
                      'Average',
                    ]}
                  />
                  <Bar
                    dataKey="avgScore"
                    radius={[4, 4, 4, 4]}
                    barSize={12}
                    label={{
                      position: 'right',
                      fill: 'var(--text-primary)',
                      fontSize: 12,
                      fontWeight: 600,
                      formatter: (v: number) => `${v}%`,
                      dx: 5,
                    }}
                    onClick={(data) => {
                      if (data) navigate(`/subjects`);
                    }}
                    style={{ cursor: 'pointer', filter: 'url(#pillGlow)' }}
                  >
                    {(data?.subjects?.filter((s: any) => s.avgScore > 0) || []).map(
                      (_: any, i: number) => (
                        <Cell key={i} fill={`url(#barGrad${i % 5})`} />
                      ),
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
