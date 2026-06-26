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
  ctaLink,
}: InsightCardProps) {
  const colors = {
    error: 'var(--accent-danger)',
    warning: 'var(--accent-warning)',
    info: 'var(--accent-primary)',
    success: 'var(--accent-success)',
  };
  const color = colors[type] || 'var(--accent-primary)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <i className={icon} style={{ color: color, fontSize: 14 }} />
        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{title}</div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, paddingLeft: 22 }}>
        {description}
        {ctaLink && ctaLabel && (
          <div style={{ marginTop: 6 }}>
            <Link
              to={ctaLink}
              style={{
                fontSize: 13,
                color: color,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {ctaLabel} &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
