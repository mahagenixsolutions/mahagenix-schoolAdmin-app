import React, { useEffect, useState } from 'react';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accentColor: string; // hex — used for top border glow
  icon: React.ReactNode;
  width?: string; // default: 'max-w-3xl' (which is 768px)
  children: React.ReactNode;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  subtitle,
  accentColor,
  icon,
  width = 'max-w-3xl',
  children,
}: BaseModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateState, setAnimateState] = useState<'idle' | 'entering' | 'exiting'>('idle');

  // Handle open/close state transitions with animation delays
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Give a tiny frame delay to ensure the mount styles are captured before transition begins
      const frame = requestAnimationFrame(() => {
        setAnimateState('entering');
      });
      return () => cancelAnimationFrame(frame);
    } else if (shouldRender) {
      setAnimateState('exiting');
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimateState('idle');
      }, 180); // match exit transition duration (180ms)
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  // Resolve max-width class to actual inline width style or custom class if needed
  const widthMap: Record<string, string> = {
    'max-w-md': '448px',
    'max-w-lg': '512px',
    'max-w-xl': '576px',
    'max-w-2xl': '672px',
    'max-w-3xl': '768px',
    'max-w-4xl': '896px',
    'max-w-5xl': '1024px',
    'max-w-6xl': '1152px',
  };
  const resolvedWidth = widthMap[width] || '768px';

  return (
    <div style={{ position: 'relative', zIndex: 9999 }}>
      {/* Scope custom stylesheet dynamically for animations and layout styling */}
      <style>{`
        .edutrack-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9998;
          opacity: 0;
          transition: opacity 200ms ease-out;
        }
        .edutrack-modal-backdrop.animate-in {
          opacity: 1;
        }
        .edutrack-modal-backdrop.animate-out {
          opacity: 0;
          transition: opacity 180ms ease-in;
        }

        .edutrack-modal-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.94);
          z-index: 9999;
          width: 90vw;
          max-height: 85vh;
          overflow-y: auto;
          background: #111827;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04);
          padding: 32px;
          opacity: 0;
          transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 280ms ease-out;
        }

        .edutrack-modal-panel.animate-in {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }

        .edutrack-modal-panel.animate-out {
          transform: translate(-50%, -50%) scale(0.94);
          opacity: 0;
          transition: transform 180ms ease-in, opacity 180ms ease-in;
        }

        @media (prefers-reduced-motion: reduce) {
          .edutrack-modal-backdrop,
          .edutrack-modal-panel {
            transition: none !important;
            transform: translate(-50%, -50%) scale(1) !important;
            opacity: 1 !important;
          }
          .edutrack-modal-backdrop.animate-out,
          .edutrack-modal-panel.animate-out {
            opacity: 0 !important;
          }
        }

        .edutrack-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          position: relative;
        }

        .edutrack-modal-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-right: 16px;
        }

        .edutrack-modal-close-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }

        .edutrack-modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #f3f4f6;
        }

        /* Styling helper classes for stat cards */
        .modal-mini-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          overflow: hidden;
        }

        /* Pulsing dot and glow animations */
        @keyframes pulse-red-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        .pulse-red-glow-effect {
          animation: pulse-red-glow 1.5s infinite;
        }

        @keyframes pulse-dot {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }

        .pulse-dot-effect {
          animation: pulse-dot 1.5s infinite;
        }

        /* Table custom designs */
        .modal-table-container {
          background: #1a2235;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.04);
          margin-bottom: 24px;
        }

        .modal-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .modal-table th {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .modal-table td {
          padding: 14px 16px;
          font-size: 13px;
          color: #e2e8f0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.02);
        }

        .modal-table tr {
          transition: background-color 0.2s, transform 0.2s;
        }

        .modal-table tr:hover {
          background: rgba(79, 142, 247, 0.06) !important;
          transform: translateX(2px);
        }

        .modal-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
        }

        /* SVG Circle progress */
        .progress-circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.05);
        }

        .progress-circle-fg {
          fill: none;
          stroke-linecap: round;
          transition: stroke-dashoffset 900ms ease-out;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`edutrack-modal-backdrop ${animateState === 'entering' ? 'animate-in' : ''} ${animateState === 'exiting' ? 'animate-out' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`edutrack-modal-panel ${animateState === 'entering' ? 'animate-in' : ''} ${animateState === 'exiting' ? 'animate-out' : ''}`}
        style={{ maxWidth: resolvedWidth }}
      >
        {/* Glow Accent Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88, transparent)`,
            borderRadius: '24px 24px 0 0',
          }}
        />

        {/* Header Row */}
        <div className="edutrack-modal-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className="edutrack-modal-icon-circle"
              style={{
                backgroundColor: `${accentColor}18`,
                border: `1px solid ${accentColor}33`,
                boxShadow: `0 0 20px ${accentColor}44`,
                color: accentColor,
              }}
            >
              {icon}
            </div>
            <div>
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#f8fafc',
                  lineHeight: '1.2',
                  margin: 0,
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  style={{
                    fontSize: '13px',
                    color: '#9ca3af',
                    marginTop: '4px',
                    margin: 0,
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <button className="edutrack-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div style={{ color: '#e5e7eb' }}>{children}</div>
      </div>
    </div>
  );
}
