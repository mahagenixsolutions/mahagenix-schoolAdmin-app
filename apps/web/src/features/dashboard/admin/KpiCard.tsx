import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';

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
    isGood?: boolean; 
  };
  setupCta?: {
    label: string;
    link: string;
  };
  isLoading?: boolean;
  onClick?: () => void;
}

const getHexColor = (color: string, hex: string) => {
  if (hex) return hex;
  switch (color) {
    case 'primary': return 'var(--accent-primary)';
    case 'info': return 'var(--accent-primary)';
    case 'success': return 'var(--accent-success)';
    case 'warning': return 'var(--accent-warning)';
    case 'danger': return 'var(--accent-danger)';
    default: return 'var(--accent-primary)';
  }
};

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
  // Using explicit hex logic for text-shadow since CSS vars in text-shadow can be tricky if opacity is needed, 
  // but we can just use the variable if we use a solid shadow or fallback to hex if provided.
  // Actually, we'll construct a clean glow using the color string directly if it's a hex, otherwise fallback to the var.
  const glowShadow = `0 0 24px ${colorHex}40`;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick || (link && state !== 'setup_required') ? 'pointer' : 'default',
        background: isHovered ? 'var(--bg-surface-raised)' : 'var(--bg-surface)',
        borderWidth: '3px 1px 1px 1px',
        borderStyle: 'solid',
        borderColor: `${colorHex} ${isHovered ? colorHex : 'var(--border-subtle)'} ${isHovered ? colorHex : 'var(--border-subtle)'} ${isHovered ? colorHex : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        transition: 'all 0.2s ease',
        minHeight: '160px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px',
            }}
          >
            {label}
          </div>

          {isLoading ? (
            <div
              className="skeleton"
              style={{
                width: 100,
                height: 40,
                marginTop: 4,
                background: 'var(--border-subtle)',
              }}
            />
          ) : state === 'setup_required' ? (
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <span
                style={{
                  fontSize: 14,
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                }}
              >
                Not configured
              </span>
            </div>
          ) : state === 'no_data' ? (
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color: 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              No data yet
            </div>
          ) : (
            <div
              style={{
                fontSize: /^[0-9₹$%.,+\- ]+$/.test(value.toString()) ? '36px' : '24px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                textShadow: glowShadow,
              }}
            >
              {value}
            </div>
          )}
        </div>

        <div
          style={{
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '16px',
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
          }}
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<any>, { size: 22, strokeWidth: 1.5, color: colorHex })
            : icon}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {!isLoading && state === 'normal' && trend && (() => {
          const isUp = trend.direction === 'up';
          const isDown = trend.direction === 'down';
          
          let pillBg = 'var(--bg-tertiary)';
          let pillColor = 'var(--text-secondary)';
          let arrowColor = 'var(--text-muted)';
          
          if (trend.isGood === true) {
            pillBg = 'var(--color-secondary-surface)';
            pillColor = 'var(--accent-success)';
            arrowColor = 'var(--accent-success)';
          } else if (trend.isGood === false) {
            pillBg = 'var(--color-danger-surface)';
            pillColor = 'var(--accent-danger)';
            arrowColor = 'var(--accent-danger)';
          } else if (isUp) {
            pillBg = 'var(--color-secondary-surface)';
            pillColor = 'var(--accent-success)';
            arrowColor = 'var(--accent-success)';
          } else if (isDown) {
            pillBg = 'var(--color-danger-surface)';
            pillColor = 'var(--accent-danger)';
            arrowColor = 'var(--accent-danger)';
          }

          return (
            <div
              style={{
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  borderRadius: '99px',
                  background: pillBg,
                  color: pillColor,
                  fontWeight: 600,
                  gap: 4
                }}
              >
                <span style={{ color: arrowColor }}>
                  {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
                </span>
                {trend.delta && <span>{trend.delta}</span>}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>
                {trend.label}
              </span>
            </div>
          );
        })()}`

        {!isLoading && state === 'setup_required' && setupCta && (
          <Button
            size="sm"
            onClick={handleSetupClick}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              color: 'var(--bg-canvas)',
              backgroundColor: 'var(--text-primary)',
            }}
          >
            {setupCta.label}
          </Button>
        )}
      </div>
    </div>
  );
}
