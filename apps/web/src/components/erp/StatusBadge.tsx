import React from 'react';

export type BadgeStatus = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: BadgeStatus;
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getColors = () => {
    switch (status) {
      case 'success':
        return {
          background: 'rgba(34, 197, 94, 0.1)',
          color: 'var(--accent-success)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        };
      case 'warning':
        return {
          background: 'rgba(245, 158, 11, 0.1)',
          color: 'var(--accent-warning)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        };
      case 'danger':
        return {
          background: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--accent-danger)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        };
      case 'info':
        return {
          background: 'rgba(79, 142, 247, 0.1)',
          color: 'var(--accent-primary)',
          border: '1px solid rgba(79, 142, 247, 0.2)',
        };
      default:
        return {
          background: 'var(--bg-surface-raised)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-subtle)',
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        ...getColors(),
      }}
    >
      {label}
    </span>
  );
};
