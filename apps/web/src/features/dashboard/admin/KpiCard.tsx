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
  onClick?: () => void;
}

const getThemeCardStyles = (accentHex: string) => {
  const hex = (accentHex || '').toLowerCase();
  switch (hex) {
    case '#4f46e5':
      return {
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
        glowColor: '#8b5cf6',
      };
    case '#10b981':
      return {
        gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #00F5D4 100%)',
        glowColor: '#10b981',
      };
    case '#f59e0b':
      return {
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #FFB703 100%)',
        glowColor: '#f59e0b',
      };
    case '#f43f5e':
      return {
        gradient: 'linear-gradient(135deg, #F43F5E 0%, #EC4899 50%, #F97316 100%)',
        glowColor: '#f43f5e',
      };
    case '#0ea5e9':
    case '#06b6d4':
      return {
        gradient: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 50%, #2563EB 100%)',
        glowColor: '#0ea5e9',
      };
    default:
      return {
        gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
        glowColor: '#8b5cf6',
      };
  }
};

const getHexColor = (color: string, hex: string) => {
  if (hex) return hex;
  switch (color) {
    case 'primary': return '#4f46e5';
    case 'info': return '#06b6d4';
    case 'success': return '#10b981';
    case 'warning': return '#a855f7';
    case 'danger': return '#f43f5e';
    default: return '#64748b';
  }
};

const wavePattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath d='M-10 80 Q 30 50 70 80 T 150 80 T 230 80 M-10 100 Q 30 70 70 100 T 150 100 T 230 100 M-10 120 Q 30 90 70 120 T 150 120 T 230 120 M-10 140 Q 30 110 70 140 T 150 140 T 230 140 M-10 60 Q 30 30 70 60 T 150 60 T 230 60 M-10 40 Q 30 10 70 40 T 150 40 T 230 40 M-10 20 Q 30 -10 70 20 T 150 20 T 230 20 M-10 0 Q 30 -30 70 0 T 150 0 T 230 0' fill='none' stroke='rgba(255,255,255,0.065)' stroke-width='1.5'/%3E%3C/svg%3E")`;

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
  isLoading,
  onClick,
}: StatCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link && state !== 'setup_required') {
      navigate(link);
    }
  };

  const handleSetupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setupCta?.link) navigate(setupCta.link);
  };

  const colorHex = getHexColor(accentColor, accentHex);
  const { gradient: cardGradient, glowColor } = getThemeCardStyles(accentHex || colorHex);

  return (
    <div
      className="kpi-stat-card"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: (onClick || (link && state !== 'setup_required')) ? 'pointer' : 'default',
        transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'none',
        border: isHovered ? '1px solid rgba(255, 255, 255, 0.28)' : '1px solid rgba(255, 255, 255, 0.12)',
        background: `${wavePattern}, ${cardGradient}`,
        backgroundSize: '160px 160px, cover',
        backgroundRepeat: 'repeat, no-repeat',
        boxShadow: isHovered
          ? `0 16px 32px ${glowColor}4d, 0 4px 12px rgba(0,0,0,0.15)`
          : `0 8px 20px ${glowColor}1c, 0 2px 6px rgba(0,0,0,0.08)`,
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        minHeight: '180px'
      }}
    >
      {/* Ambient Glow behind the card */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-15%',
          width: '120px',
          height: '120px',
          background: glowColor,
          filter: 'blur(45px)',
          opacity: isHovered ? 0.35 : 0.2,
          borderRadius: '50%',
          zIndex: 0,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.3)' : 'scale(1)',
        }}
      />
      
      {/* Secondary glow - bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: '80px',
          height: '80px',
          background: glowColor,
          filter: 'blur(35px)',
          opacity: isHovered ? 0.25 : 0.12,
          borderRadius: '50%',
          zIndex: 0,
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.85)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              marginBottom: '8px',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            {label}
          </div>

          {isLoading ? (
            <div className="skeleton" style={{ width: 100, height: 40, marginTop: 4, background: 'rgba(255, 255, 255, 0.2)' }} />
          ) : state === 'setup_required' ? (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <span style={{ fontSize: 14, color: '#ffffff', fontWeight: 600, textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
                Not configured
              </span>
            </div>
          ) : state === 'no_data' ? (
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color: 'rgba(255, 255, 255, 0.65)',
                fontWeight: 600,
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              No data yet
            </div>
          ) : (
            <div
              style={{
                fontSize: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? '34px' : '22px',
                fontWeight: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? 800 : 600,
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                lineHeight: 1.2,
                letterSpacing: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? '-0.02em' : 'normal',
                whiteSpace: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? 'nowrap' : 'normal',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {value}
            </div>
          )}
        </div>

        <div
          style={{
            color: '#ffffff',
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '16px',
            transform: isHovered ? 'scale(1.15) rotate(6deg)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
          }}
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<any>, { size: 36, strokeWidth: 2 })
            : icon}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: '24px', minHeight: '20px' }}>
        {!isLoading && state === 'normal' && trend && (
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {trend.direction === 'up' && '↑'}
              {trend.direction === 'down' && '↓'}
              <span style={{ marginLeft: trend.direction !== 'neutral' ? 4 : 0 }}>{trend.delta}</span>
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontWeight: 500, textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{trend.label}</span>
          </div>
        )}

        {!isLoading && state === 'setup_required' && setupCta && (
          <button
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 700,
              color: colorHex,
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onClick={handleSetupClick}
          >
            {setupCta.label} &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
