import { Activity, BarChart2, Zap } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { mockStats, mockTrends } from './mockActivityData';

export default function ActivitySidebarLeft() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* KPI Stats */}
      <div className="card">
        <div className="card-header border-b">
          <span className="card-title" style={{ fontSize: '15px' }}>
            <Activity size={18} className="text-primary" /> Daily Pulse
          </span>
        </div>
        <div className="card-body" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Total Activities Today</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{mockStats.totalToday}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-success)', marginTop: '4px', fontWeight: 500 }}>↑ 12% vs yesterday</div>
            </div>
            <div style={{ height: '1px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Participation</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{mockStats.participationRate}%</div>
              </div>
              <div style={{ width: '1px', background: 'var(--border-color)' }} />
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Active Staff</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{mockStats.activeTeachers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Trends */}
      <div className="card">
        <div className="card-header border-b">
          <span className="card-title" style={{ fontSize: '15px' }}>
            <BarChart2 size={18} className="text-primary" /> Engagement Trend
          </span>
        </div>
        <div className="card-body" style={{ padding: '20px 0 0 0' }}>
          <div style={{ width: '100%', height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '12px' }}
                  cursor={{ stroke: 'var(--border-color)', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="activities" stroke="var(--color-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActivities)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="card" style={{ background: 'linear-gradient(145deg, rgba(79, 70, 229, 0.05), rgba(79, 70, 229, 0.01))', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
        <div className="card-body" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-primary)', fontWeight: 700 }}>
            <Zap size={18} /> AI Summary
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockStats.insights.map((insight, idx) => (
              <div key={idx} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {insight}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
