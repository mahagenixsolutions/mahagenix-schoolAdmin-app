
export default function AIInsightsCard() {
  const insights = [
    { type: 'success', text: 'Daily attendance has improved by 3% MoM.', icon: '📈' },
    { type: 'warning', text: 'Math examination averages dropped by 6% in Grade 8.', icon: '⚠️' },
    { type: 'danger', text: 'Fee collection is projected to miss the quarterly target by 8%.', icon: '🚨' },
    { type: 'info', text: 'Recommendation: Hire 3 primary science teachers for upcoming vacancies.', icon: '💡' },
    { type: 'info', text: 'Transport route 2 has low utilization (under 40% capacity).', icon: '🚌' },
    { type: 'warning', text: 'Homework completion rate is decreasing in Grade 8 English classes.', icon: '📝' }
  ];

  const getInsightStyles = (type: string) => {
    switch (type) {
      case 'success':
        return { borderLeft: '4px solid #10b981', bg: '#f0fdf4', color: '#14532d' };
      case 'warning':
        return { borderLeft: '4px solid #f59e0b', bg: '#fffbeb', color: '#78350f' };
      case 'danger':
        return { borderLeft: '4px solid #ef4444', bg: '#fef2f2', color: '#7f1d1d' };
      case 'info':
      default:
        return { borderLeft: '4px solid #3b82f6', bg: '#eff6ff', color: '#1e3a8a' };
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '20px' }}>✨</span>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          AI Copilot Executive Insights
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {insights.map((ins, idx) => {
          const styles = getInsightStyles(ins.type);
          return (
            <div
              key={idx}
              style={{
                background: styles.bg,
                borderLeft: styles.borderLeft,
                borderRadius: '6px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{ins.icon}</span>
              <p style={{
                margin: 0,
                fontSize: '13px',
                lineHeight: 1.4,
                fontWeight: 500,
                color: styles.color
              }}>
                {ins.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
