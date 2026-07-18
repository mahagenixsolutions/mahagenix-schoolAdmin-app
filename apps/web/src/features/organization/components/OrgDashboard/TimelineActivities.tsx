import { useState } from 'react';
import type { ActivityLog } from '../../mock/timeline';

interface TimelineProps {
  timelineLogs: ActivityLog[];
}

type TimelineFilter = 'all' | 'academic' | 'finance' | 'hr' | 'transport' | 'administration';

export default function TimelineActivities({ timelineLogs }: TimelineProps) {
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>('all');

  const filters: { key: TimelineFilter; label: string }[] = [
    { key: 'all', label: 'All Activities' },
    { key: 'academic', label: 'Academic' },
    { key: 'finance', label: 'Finance' },
    { key: 'hr', label: 'HR & Personnel' },
    { key: 'transport', label: 'Transport' },
    { key: 'administration', label: 'Administration' }
  ];

  const filteredLogs = timelineLogs.filter(log =>
    activeFilter === 'all' ? true : log.category === activeFilter
  );

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
          gap: '12px',
          borderBottom: '1px solid #f3f4f6',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: 'var(--color-primary)', borderRadius: '1px' }} />
            System Audit Log Timeline
          </h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            Real-time logs of administrative actions across branches
          </p>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                background: activeFilter === f.key ? 'var(--color-primary)' : '#f3f4f6',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 700,
                color: activeFilter === f.key ? '#ffffff' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filteredLogs.length === 0 ? (
        <div style={{ padding: '30px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>
          No logged actions found in this category.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '20px' }}>
          {/* Vertical axis line */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              bottom: '8px',
              left: '5px',
              width: '2px',
              background: '#e2e8f0'
            }}
          />

          {filteredLogs.map((log) => {
            const isWarning = log.status === 'WARNING';
            const isPending = log.status === 'PENDING';
            const bulletColor = isWarning ? '#f59e0b' : isPending ? '#8b5cf6' : '#10b981';

            return (
              <div key={log.id} style={{ display: 'flex', gap: '16px', position: 'relative', minWidth: 0 }}>
                {/* Node bullet */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-19px',
                    top: '4px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: `2px solid ${bulletColor}`,
                    zIndex: 1
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '8px', minWidth: 0 }}>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        color: bulletColor,
                        background: isWarning ? '#fffbeb' : isPending ? '#f5f3ff' : '#ecfdf5',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        marginRight: '8px'
                      }}
                    >
                      {log.category}
                    </span>
                    <strong style={{ fontSize: '12px', color: '#1e293b' }}>{log.action}</strong>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                      By: {log.user} · <strong>{log.branch}</strong>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', flexShrink: 0 }}>{log.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
