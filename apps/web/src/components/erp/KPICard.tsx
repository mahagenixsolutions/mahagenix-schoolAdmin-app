import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, accentColor = 'var(--accent-primary)' }) => {
  return (
    <div
      className="dashboard-card"
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderTop: `3px solid ${accentColor}`,
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>{title}</span>
        {icon && <span style={{ color: 'var(--text-muted)' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Century Gothic, sans-serif' }}>
        {value}
      </div>
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
          <span style={{ color: trend.isPositive ? 'var(--accent-success)' : 'var(--accent-danger)', fontWeight: 600 }}>
            {trend.value}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>from last month</span>
        </div>
      )}
    </div>
  );
};
