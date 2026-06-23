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
    <div className="glass-card">
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>📚 Subject Performance</span>
        <span className="badge" style={{ background: 'rgba(79,70,229,0.15)', color: '#4F46E5', backdropFilter: 'blur(10px)' }}>Current Term</span>
      </div>
      <div className="card-body" style={{ paddingTop: 16 }}>
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
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={data?.subjects?.filter((s: any) => s.avgScore > 0) || []}
              layout="vertical"
              margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGrad0" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
                <linearGradient id="barGrad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="barGrad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="barGrad3" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#67E8F9" />
                  <stop offset="100%" stopColor="#0891B2" />
                </linearGradient>
                <linearGradient id="barGrad4" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <filter id="pillGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(0,0,0,0.04)"
                horizontal={false}
              />
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
                formatter={(v: number, name: string, props: any) => [
                  `${v}% (Pass: ${props.payload.passRate}%)`,
                  'Average',
                ]}
              />
              <Bar
                dataKey="avgScore"
                radius={[12, 12, 12, 12]}
                barSize={16}
                label={{
                  position: 'right',
                  fill: 'var(--text-primary)',
                  fontSize: 12,
                  fontWeight: 700,
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
                    <Cell
                      key={i}
                      fill={`url(#barGrad${i % 5})`}
                    />
                  ),
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
