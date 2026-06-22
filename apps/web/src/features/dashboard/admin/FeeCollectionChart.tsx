import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


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
    ]
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">💳 Fee Collection Trend</span>
      </div>
      <div className="card-body" style={{ paddingTop: 16 }}>
        {isLoading ? (
          <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner" />
          </div>
        ) : (!data?.hasEnoughData) ? (
          <div style={{ height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
            <i className="ti ti-coins" style={{ fontSize: 32, color: 'var(--color-text-secondary)', opacity: 0.5, marginBottom: 12 }} />
            <div style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>{(data as any)?.dataQualityNote || 'Not enough data yet.'}</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data?.months || []} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis 
                dataKey="label" 
                tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 10,
                  fontSize: 13,
                }}
                formatter={(v: number, name: string, props: any) => {
                  if (name === 'Expected') return [`₹${v.toLocaleString()}`, name];
                  const gap = props.payload.expected - props.payload.collected;
                  return [`₹${v.toLocaleString()} (Gap: ₹${gap.toLocaleString()})`, name];
                }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 13 }} />
              <Bar dataKey="expected" name="Expected" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="collected" name="Collected" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
