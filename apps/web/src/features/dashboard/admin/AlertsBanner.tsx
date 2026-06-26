import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetAlertsQuery } from '../dashboardApi';

export default function AlertsBanner({ academicYearId }: { academicYearId: string }) {
  const { data, isLoading } = useGetAlertsQuery({ academicYearId }, { 
    skip: !academicYearId,
    pollingInterval: 120000 // 2 min auto-refresh
  });

  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  if (isLoading) {
    return (
      <div className="skeleton" style={{ width: '100%', height: 32, borderRadius: '6px', marginBottom: 24, background: 'var(--bg-surface)' }} />
    );
  }

  if (!data?.alerts?.length) return null;

  const severityMapping: Record<string, { dot: string }> = {
    error: { dot: 'var(--accent-danger)' },
    warning: { dot: 'var(--accent-warning)' },
    info: { dot: 'var(--accent-primary)' },
    success: { dot: 'var(--accent-success)' },
  };

  const activeAlerts = data.alerts.map((a: any, i: number) => ({ ...a, id: i })).filter((a: any) => !dismissed.has(a.id));

  if (activeAlerts.length === 0) return null;

  return (
    <div 
      style={{ 
        display: 'flex', 
        gap: 12, 
        overflowX: 'auto', 
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none',  // IE 10+
        paddingBottom: 4,
      }}
    >
      <style>{`
        .alert-rail::-webkit-scrollbar { display: none; }
      `}</style>
      <div className="alert-rail" style={{ display: 'flex', gap: 12, width: '100%' }}>
        {activeAlerts.map((alert: any) => {
          const colors = severityMapping[alert.severity] || severityMapping.info;
          return (
            <div
              key={alert.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.dot}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.dot }} />
              <Link
                to={alert.link || '#'}
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  pointerEvents: alert.link ? 'auto' : 'none',
                }}
              >
                {alert.message}
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setDismissed(prev => new Set(prev).add(alert.id));
                }}
                style={{
                  background: 'none', border: 'none', padding: 0, marginLeft: 4,
                  color: 'var(--text-muted)', cursor: 'pointer', fontSize: 16,
                  display: 'flex', alignItems: 'center'
                }}
                title="Dismiss"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
