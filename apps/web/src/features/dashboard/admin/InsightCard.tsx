import { Link } from 'react-router-dom';

export interface InsightCardProps {
  type: 'error' | 'warning' | 'info' | 'success';
  icon: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function InsightCard({
  type,
  icon,
  title,
  description,
  ctaLabel,
  ctaLink
}: InsightCardProps) {
  const colors = {
    error: '#E11D48',
    warning: '#D97706',
    info: '#4F46E5',
    success: '#059669',
  };
  const color = colors[type] || '#4F46E5';

  return (
    <div 
      className="glass-card"
      style={{
        minWidth: 280,
        maxWidth: 320,
        flexShrink: 0,
        borderTop: `3px solid ${color}`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 24px ${color}22, 0 4px 8px rgba(0,0,0,0.05)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        width: '60%',
        height: '24px',
        background: color,
        filter: 'blur(20px)',
        opacity: 0.15,
        pointerEvents: 'none'
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          background: `${color}15`,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20
        }}>
          <i className={icon} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
          {title}
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
        {description}
      </div>
      {ctaLink && ctaLabel && (
        <div style={{ marginTop: 'auto', paddingTop: 12, position: 'relative', zIndex: 1 }}>
          <Link 
            to={ctaLink} 
            className="btn btn-ghost" 
            style={{ 
              padding: '6px 12px', 
              fontSize: 13, 
              color: color,
              fontWeight: 600,
              background: `${color}10`,
              borderRadius: '8px',
              height: 'auto',
              minHeight: 'auto'
            }}
          >
            {ctaLabel} &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
