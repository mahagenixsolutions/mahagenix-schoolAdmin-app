import { useState } from 'react';
import type { CalendarEvent } from '../../mock/calendar';

interface CalendarProps {
  events: CalendarEvent[];
}

export default function CommunicationCalendar({ events }: CalendarProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Finance' | 'Academics' | 'Audit' | 'General'>('All');

  const filteredEvents = events.filter(e =>
    activeCategory === 'All' ? true : e.cat === activeCategory
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
            <span style={{ width: '3px', height: '14px', background: '#3b82f6', borderRadius: '1px' }} />
            Unified Executive Calendar
          </h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            Board meetings, academic reviews, safety audits, and national events
          </p>
        </div>

        {/* Categories selector */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {(['All', 'Finance', 'Academics', 'Audit', 'General'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#eff6ff' : 'transparent',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#bfdbfe' : 'transparent',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                color: activeCategory === cat ? '#2563eb' : '#64748b',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              background: '#fafbfe',
              border: '1px solid #f1f5f9',
              borderLeft: `4px solid ${evt.color}`,
              borderRadius: '8px',
              gap: '12px',
              minWidth: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0, flex: 1 }}>
              {/* Date square */}
              <div
                style={{
                  width: '44px',
                  background: evt.bg,
                  textAlign: 'center',
                  padding: '6px 2px',
                  borderRadius: '6px',
                  flexShrink: 0
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{evt.day}</div>
                <div style={{ fontSize: '8px', fontWeight: 700, color: '#475569', marginTop: '1px' }}>
                  {evt.month}
                </div>
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {evt.title}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {evt.detail}
                </div>
              </div>
            </div>

            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: evt.color,
                background: evt.bg,
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase',
                flexShrink: 0
              }}
            >
              {evt.cat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
