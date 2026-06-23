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
    <div className="glass-card">
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>📈 Attendance Trend</span>
        <select
          className="form-select"
          style={{ width: 'auto', fontSize: 13, padding: '4px 8px', background: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.6)', borderRadius: '12px' }}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="6months">Last 6 months</option>
          <option value="3months">Last 3 months</option>
          <option value="12months">Last 12 months</option>
        </select>
      </div>
      <div className="card-body" style={{ paddingTop: 16 }}>
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
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data?.months || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.04)" />
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
                dx={-10}
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
                  `${v}% (${props.payload.count} records)`,
                  'Attendance',
                ]}
              />
              <ReferenceLine
                y={85}
                stroke="#10B981"
                strokeDasharray="4 4"
                label={{
                  position: 'insideTopLeft',
                  value: 'Target 85%',
                  fill: '#10B981',
                  fontSize: 11,
                  fontWeight: 600,
                  dy: -10,
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#4F46E5"
                strokeWidth={4}
                fill="url(#attendanceGrad)"
                dot={{ fill: '#4F46E5', r: 6, stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 8, strokeWidth: 0, fill: '#4F46E5', filter: 'url(#neonGlow)' }}
                style={{ filter: 'url(#neonGlow)' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
