import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor: string;
  accentHex: string;
  link?: string;
  state: 'normal' | 'setup_required' | 'no_data';
  trend?: {
    delta: number | string;
    direction: 'up' | 'down' | 'neutral';
    label: string;
    isGood?: boolean; // semantic: if true, trend is green. if false, red. if undefined, neutral.
  };
  setupCta?: {
    label: string;
    link: string;
  };
  isLoading?: boolean;
}

export default function KpiCard({
  label,
  value,
  icon,
  accentColor,
  accentHex,
  link,
  state,
  trend,
  setupCta,
  isLoading
}: StatCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (link && state !== 'setup_required') {
      navigate(link);
    }
  };

  const handleSetupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setupCta?.link) navigate(setupCta.link);
  };

  // Determine trend text color
  let trendColor = 'var(--text-muted)';
  if (trend?.isGood === true) trendColor = '#10B981'; // Green
  if (trend?.isGood === false) trendColor = '#F43F5E'; // Red

  // Determine if this is an "attention" card (e.g., Red/Amber accent and negative trend)
  const isAttentionCard = accentColor === 'danger' || accentColor === 'warning';

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        borderTop: `1px solid ${isHovered ? accentHex : 'rgba(0, 0, 0, 0.08)'}`,
        borderRight: `1px solid ${isHovered ? accentHex : 'rgba(0, 0, 0, 0.08)'}`,
        borderBottom: `1px solid ${isHovered ? accentHex : 'rgba(0, 0, 0, 0.08)'}`,
        borderLeft: `4px solid ${accentHex}`,
        boxShadow: isHovered 
          ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' 
          : '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: link && state !== 'setup_required' ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        background: isAttentionCard ? 'linear-gradient(to right, rgba(244, 63, 94, 0.02), transparent)' : '#ffffff'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 500, 
            color: 'var(--text-secondary)',
            marginBottom: '8px',
            minHeight: '40px', // Forces alignment even if some labels are 1-line and others 2-line
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            {label}
          </div>
          
          {isLoading ? (
            <div className="skeleton" style={{ width: 100, height: 40, borderRadius: 8, marginTop: 4 }} />
          ) : state === 'setup_required' ? (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="ti ti-alert-triangle" style={{ color: 'var(--color-warning)' }} />
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Not configured</span>
            </div>
          ) : state === 'no_data' ? (
            <div style={{ marginTop: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
              No data yet
            </div>
          ) : (
            <div style={{ 
              fontSize: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? '34px' : '22px', 
              fontWeight: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? 800 : 600, 
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? '-0.02em' : 'normal',
              whiteSpace: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? 'nowrap' : 'normal',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {value}
            </div>
          )}
        </div>
        
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          backgroundColor: `${accentHex}20`, // 12% opacity roughly
          color: accentHex,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginLeft: '16px'
        }}>
          {icon}
        </div>
      </div>

      <div style={{ marginTop: '24px', minHeight: '20px' }}>
        {!isLoading && state === 'normal' && trend && (
          <div style={{ 
            fontSize: '13px', 
            fontWeight: 400,
            color: trendColor,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {trend.direction === 'up' && trend.isGood !== undefined && <span>↑</span>}
            {trend.direction === 'down' && trend.isGood !== undefined && <span>↓</span>}
            <span style={{ fontWeight: trend.isGood !== undefined ? 500 : 400 }}>{trend.delta}</span>
            <span style={{ color: 'var(--text-muted)' }}>{trend.label}</span>
          </div>
        )}

        {!isLoading && state === 'setup_required' && setupCta && (
          <button 
            style={{
              padding: '6px 12px',
              fontSize: '13px',
              fontWeight: 500,
              color: accentHex,
              backgroundColor: `${accentHex}10`,
              border: `1px solid ${accentHex}30`,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${accentHex}20`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${accentHex}10`}
            onClick={handleSetupClick}
          >
            {setupCta.label} &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
