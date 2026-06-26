import { useGetInsightsQuery } from '../dashboardApi';
import InsightCard from './InsightCard';
import type { InsightCardProps } from './InsightCard';

export default function KeyInsightsStrip({ academicYearId }: { academicYearId: string }) {
  const { data, isLoading } = useGetInsightsQuery({ academicYearId }, { 
    skip: !academicYearId,
    pollingInterval: 180000 // 3 min
  });

  if (isLoading) {
    return (
      <div style={{ marginBottom: 24, padding: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Key Insights</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: 60, borderRadius: 4, background: 'var(--border-subtle)' }} />
          ))}
        </div>
      </div>
    );
  }

  if (!data?.insights || data.insights.length === 0) {
    return null;
  }

  return (
    <div style={{ 
      marginBottom: 24, 
      padding: 24, 
      background: 'var(--bg-secondary)', 
      border: '1px solid var(--border-color)', 
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h3 style={{ 
        fontSize: 13, 
        fontWeight: 600, 
        color: 'var(--text-muted)', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <i className="ti ti-bulb" /> Key Insights
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {data.insights.slice(0, 3).map((insight: InsightCardProps & { id: string }) => (
          <InsightCard key={insight.id} {...insight} />
        ))}
      </div>
    </div>
  );
}
