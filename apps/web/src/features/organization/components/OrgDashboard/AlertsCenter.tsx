import { useState } from 'react';

interface AlertItem {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'resolved';
  message: string;
  branch: string;
  timestamp: string;
}

export default function AlertsCenter() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 'al-1', type: 'critical', message: 'Indiranagar Fire Safety Cert expiring in 12 days.', branch: 'Indiranagar Branch', timestamp: '5m ago' },
    { id: 'al-2', type: 'critical', message: 'Gachibowli CCTV Hub reports 3 camera channels offline.', branch: 'Gachibowli Branch', timestamp: '15m ago' },
    { id: 'al-3', type: 'warning', message: 'Outstanding fee collection threshold crossed limit.', branch: 'Whitefield Branch', timestamp: '1h ago' },
    { id: 'al-4', type: 'info', message: 'Term 2 examination schedules published online.', branch: 'All Branches', timestamp: '3h ago' }
  ]);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(al => al.id !== id));
  };

  const filteredAlerts = alerts.filter(al => filter === 'all' ? true : al.type === filter);

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '16px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#e11d48', borderRadius: '1px' }} />
            Notification Alerts Hub
          </h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            Live critical alerts across active server endpoints
          </p>
        </div>

        {/* Filter selectors */}
        <div style={{ display: 'flex', gap: '6px', background: '#f3f4f6', padding: '2px', borderRadius: '6px' }}>
          {(['all', 'critical', 'warning', 'info'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: filter === f ? '#1f2937' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
          No active alerts in this category.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredAlerts.map(al => {
            const isCrit = al.type === 'critical';
            const isWarn = al.type === 'warning';
            const borderCol = isCrit ? '#f43f5e' : isWarn ? '#fb7185' : '#60a5fa';
            const bgCol = isCrit ? '#fff1f2' : isWarn ? '#fffbeb' : '#eff6ff';

            return (
              <div
                key={al.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: bgCol,
                  borderLeft: `4px solid ${borderCol}`,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  gap: '12px'
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                    {al.message}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                    {al.branch} · {al.timestamp}
                  </div>
                </div>
                <button
                  onClick={() => removeAlert(al.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: '#94a3b8'
                  }}
                  title="Acknowledge alert"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
