import { useState, useCallback, lazy, Suspense } from 'react';
import { Sparkles } from 'lucide-react';

const ChatWindow = lazy(() => import('./ChatWindow'));

// ─────────────────────────────────────────────────────────────────────────────
// Floating Chat Widget (FAB + Window)
// ─────────────────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setUnread(0); // clear unread when opening
      return !prev;
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleUnreadChange = useCallback((count: number) => {
    setUnread((prev) => prev + count);
  }, []);

  return (
    <>
      {/* ── Floating Action Button ──────────────────────────────────── */}
      <button
        id="ai-chat-fab"
        onClick={handleToggle}
        aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(79, 70, 229, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12)',
          zIndex: 9999,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: isOpen ? 'scale(0.9) rotate(45deg)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow =
              '0 8px 28px rgba(79, 70, 229, 0.55), 0 4px 10px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? 'scale(0.9) rotate(45deg)' : 'scale(1)';
          e.currentTarget.style.boxShadow =
            '0 6px 20px rgba(79, 70, 229, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12)';
        }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <Sparkles size={24} />
        )}

        {/* Unread badge */}
        {!isOpen && unread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'var(--color-danger)',
              color: 'white',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--bg-primary)',
              animation: 'ai-chat-badgePulse 2s infinite',
            }}
          >
            {unread > 9 ? '9+' : unread}
          </span>
        )}

        {/* Pulse ring when not open */}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid rgba(79, 70, 229, 0.3)',
              animation: 'ai-chat-ping 2.5s ease-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}
      </button>

      {/* ── Chat Window (lazy loaded) ───────────────────────────────── */}
      <Suspense fallback={null}>
        <ChatWindow
          isOpen={isOpen}
          onClose={handleClose}
          onUnreadChange={handleUnreadChange}
        />
      </Suspense>

      {/* ── Animations ──────────────────────────────────────────────── */}
      <style>{`
        @keyframes ai-chat-ping {
          0%   { transform: scale(1); opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes ai-chat-badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        /* Adjust FAB position when parent bottom nav is visible */
        @media (max-width: 768px) {
          #ai-chat-fab {
            bottom: 80px !important;
          }
        }
      `}</style>
    </>
  );
}
