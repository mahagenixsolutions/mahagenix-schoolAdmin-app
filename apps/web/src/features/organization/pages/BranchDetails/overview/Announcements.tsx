import type { AnnouncementItem } from '../types';

interface Props {
  announcements: AnnouncementItem[];
}

export default function Announcements({ announcements }: Props) {
  const getAnnouncementBadge = (type: string) => {
    switch (type) {
      case 'emergency':
        return { label: 'Emergency', bg: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444' };
      case 'notice':
        return { label: 'Notice', bg: '#fffbeb', border: '1px solid #fef3c7', color: '#f59e0b' };
      case 'general':
      default:
        return { label: 'General', bg: '#eff6ff', border: '1px solid #dbeafe', color: '#2563eb' };
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Active Bulletins
        </h3>
        <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }} onClick={() => alert('Opening announcement center...')}>
          View Broadcasts
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {announcements.map((ann) => {
          const badge = getAnnouncementBadge(ann.type);
          return (
            <div
              key={ann.id}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{ minWidth: 0, flex: 1 }}>
                <h4 style={{
                  margin: 0,
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1e293b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {ann.title}
                </h4>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>
                  By {ann.author} · {ann.date}
                </div>
              </div>
              <span style={{
                background: badge.bg,
                border: badge.border,
                color: badge.color,
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                flexShrink: 0
              }}>
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
