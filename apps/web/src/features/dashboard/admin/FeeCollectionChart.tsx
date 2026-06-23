import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function FeeCollectionChart() {
  // const { data, isLoading } = useGetFeeCollectionTrendQuery({ range: '6months' });
  const isLoading = false;
  const data = {
    hasEnoughData: true,
    months: [
      { label: 'Jan', expected: 500000, collected: 450000 },
      { label: 'Feb', expected: 500000, collected: 480000 },
      { label: 'Mar', expected: 500000, collected: 490000 },
      { label: 'Apr', expected: 550000, collected: 520000 },
      { label: 'May', expected: 550000, collected: 530000 },
      { label: 'Jun', expected: 550000, collected: 540000 },
    ],
  };

  return (
    <div className="glass-card">
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>💳 Fee Collection Trend</span>
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
              className="ti ti-coins"
              style={{
                fontSize: 32,
                color: 'var(--text-muted)',
                opacity: 0.5,
                marginBottom: 12,
              }}
            />
            <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              {(data as any)?.dataQualityNote || 'Not enough data yet.'}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data?.months || []} margin={{ top: 10, right: 10, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="gradExpected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#CBD5E1" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
                <linearGradient id="gradCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <filter id="feePillGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(0,0,0,0.04)" vertical={false} />
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
                tickFormatter={(v) => `₹${v / 1000}k`}
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
                formatter={(v: number, name: string, props: any) => {
                  if (name === 'Expected') return [`₹${v.toLocaleString()}`, name];
                  const gap = props.payload.expected - props.payload.collected;
                  return [`₹${v.toLocaleString()} (Gap: ₹${gap.toLocaleString()})`, name];
                }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }} />
              <Bar dataKey="expected" name="Expected" fill="url(#gradExpected)" radius={[12, 12, 12, 12]} barSize={12} style={{ filter: 'url(#feePillGlow)' }} />
              <Bar dataKey="collected" name="Collected" fill="url(#gradCollected)" radius={[12, 12, 12, 12]} barSize={12} style={{ filter: 'url(#feePillGlow)' }} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
