import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export default function AttendanceTrendChart() {
  const [range, setRange] = useState('6months');
  // const { data, isLoading } = useGetDashboardAttendanceTrendQuery({ range });
  const isLoading = false;
  const data = {
    hasEnoughData: true,
    months: [
      { label: 'Jan', rate: 91, count: 200 },
      { label: 'Feb', rate: 94, count: 210 },
      { label: 'Mar', rate: 92, count: 200 },
      { label: 'Apr', rate: 95, count: 215 },
      { label: 'May', rate: 97, count: 220 },
      { label: 'Jun', rate: 96, count: 220 },
    ],
  };

  return (
    <div style={{ marginBottom: 24, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Attendance Trend
        </h3>
        <select
          style={{
            fontSize: 13,
            padding: '4px 8px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
          }}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="6months">Last 6 months</option>
          <option value="3months">Last 3 months</option>
          <option value="12months">Last 12 months</option>
        </select>
      </div>
      <div style={{ paddingTop: 16 }}>
        {isLoading ? (
          <div
            style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="skeleton" style={{ width: '100%', height: '100%', borderRadius: 16 }} />
          </div>
        ) : !data?.hasEnoughData ? (
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
              className="ti ti-chart-area-line"
              style={{
                fontSize: 32,
                color: 'var(--text-muted)',
                opacity: 0.5,
                marginBottom: 12,
              }}
            />
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              {(data as any)?.dataQualityNote || 'Not enough data yet. Check back after 30 days.'}
            </div>
          </div>
        ) : (
          <div className="chart-scrollable-container">
            <div className="dashboard-chart-wrapper chart-scrollable-inner">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data?.months || []}
                  margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0} />
                    </linearGradient>
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <CartesianGrid vertical={false} stroke="var(--border-subtle)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    unit="%"
                    dx={-5}
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
                      `${v}% (${props.payload.count} records)`,
                      'Attendance',
                    ]}
                  />
                  <ReferenceLine
                    y={85}
                    stroke="var(--accent-success)"
                    strokeDasharray="4 4"
                    label={{
                      position: 'insideTopLeft',
                      value: 'Target 85%',
                      fill: 'var(--accent-success)',
                      fontSize: 11,
                      fontWeight: 600,
                      dy: -10,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="var(--accent-primary)"
                    strokeWidth={3}
                    fill="url(#attendanceGrad)"
                    dot={{ fill: 'var(--bg-canvas)', r: 4, stroke: 'var(--accent-primary)', strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--accent-primary)', filter: 'url(#neonGlow)' }}
                    style={{ filter: 'url(#neonGlow)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
