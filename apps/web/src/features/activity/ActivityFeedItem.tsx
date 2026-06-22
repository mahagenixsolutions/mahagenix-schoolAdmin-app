import { Heart, MessageSquare, Share2, Award, Megaphone, BookOpen, Trophy, ClipboardCheck } from 'lucide-react';

export default function ActivityFeedItem({ activity }: { activity: any }) {
  
  // Determine icon and color based on activity type
  let TypeIcon = Megaphone;
  let accentClass = 'text-primary';
  let bgClass = 'var(--color-primary-surface)';

  switch (activity.type) {
    case 'Achievement':
      TypeIcon = Trophy;
      accentClass = 'text-warning';
      bgClass = 'var(--color-warning-surface)';
      break;
    case 'Academic':
    case 'Marks':
      TypeIcon = BookOpen;
      accentClass = 'text-info';
      bgClass = 'var(--color-info-surface)';
      break;
    case 'Events':
      TypeIcon = Award;
      accentClass = 'text-success';
      bgClass = 'var(--color-success-surface)';
      break;
    case 'Attendance':
      TypeIcon = ClipboardCheck;
      accentClass = 'text-secondary';
      bgClass = 'var(--bg-secondary)';
      break;
    default:
      break;
  }

  return (
    <div className="card hover-scale" style={{ marginBottom: '16px', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid var(--border-color)' }}>
      <div className="card-body" style={{ padding: '20px' }}>
        
        {/* Header: Actor info & Timestamp */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src={activity.actor.avatar} alt={activity.actor.name} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid var(--border-color)' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{activity.actor.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{activity.actor.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{activity.timestamp}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: bgClass, padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }} className={accentClass}>
              <TypeIcon size={12} /> {activity.type}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '16px' }}>
          {activity.content}
        </div>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {activity.tags.map((tag: string) => (
              <span key={tag} style={{ fontSize: '12px', color: 'var(--color-primary)', background: 'rgba(79, 70, 229, 0.08)', padding: '4px 10px', borderRadius: '4px', fontWeight: 500 }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Micro-interactions */}
        <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '8px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>
            <Heart size={16} /> {activity.likes} Likes
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', fontWeight: 500 }}>
            <MessageSquare size={16} /> {activity.comments} Comments
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}>
            <Share2 size={16} /> Share
          </button>
        </div>

      </div>
    </div>
  );
}
