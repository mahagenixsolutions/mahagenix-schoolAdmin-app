import { X, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import AiQuickPrompts from './AiQuickPrompts';
import AiChatWorkspace from './AiChatWorkspace';

export default function GlobalAiCopilot({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.2)',
          zIndex: 1999,
          backdropFilter: 'blur(2px)',
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '400px',
          background: 'var(--bg-secondary)',
          zIndex: 2000,
          boxShadow: '-8px 0 24px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-surface)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-primary)',
            }}
          >
            <Sparkles size={18} />
            <span style={{ fontSize: '15px', fontWeight: 700 }}>EduTrack Copilot</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} className="text-muted" />
          </Button>
        </div>

        {/* Drawer Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: '20px',
          }}
        >
          <AiQuickPrompts />
          <AiChatWorkspace />
        </div>
      </div>
    </>
  );
}
