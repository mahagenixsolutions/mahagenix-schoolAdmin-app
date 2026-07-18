import type { AIInsight } from '../../mock/aiInsights';

interface CopilotProps {
  insights: AIInsight[];
  onActionClick: (id: string, action: string) => void;
}

export default function AICopilotPanel({ insights, onActionClick }: CopilotProps) {
  return (
    <div
      style={{
        background: '#eff6ff',
        border: '1px solid #dbeafe',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            boxShadow: '0 2px 6px rgba(59, 130, 246, 0.15)'
          }}
        >
          ✨
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e3a8a', margin: 0 }}>
            AI Executive Copilot Recommendations
          </h3>
          <p style={{ fontSize: '11px', color: '#1d4ed8', margin: '2px 0 0 0' }}>
            Real-time organizational risk mitigation and milestone triggers
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {insights.map((insight) => (
          <div
            key={insight.id}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.transform = 'translateX(2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  color: insight.color,
                  background: insight.bg,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  flexShrink: 0
                }}
              >
                {insight.badge}
              </span>
              <span style={{ fontSize: '12px', color: '#334155', fontWeight: 500, lineHeight: 1.4 }}>
                {insight.text}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              {insight.actions.map((act, actIdx) => {
                const isDismiss = act.label === 'Dismiss';
                return (
                  <button
                    key={actIdx}
                    onClick={() => onActionClick(insight.id, act.action)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: isDismiss ? 'transparent' : 'var(--color-primary-surface)',
                      border: isDismiss ? '1px solid #e2e8f0' : 'none',
                      borderRadius: '6px',
                      color: isDismiss ? '#64748b' : 'var(--color-primary)',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!isDismiss) e.currentTarget.style.background = '#dbeafe';
                      else e.currentTarget.style.background = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      if (!isDismiss) e.currentTarget.style.background = 'var(--color-primary-surface)';
                      else e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {act.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
