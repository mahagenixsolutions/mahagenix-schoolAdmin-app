import { useMemo } from 'react';
import type { AIMessage } from '../../types/ai';

// ─────────────────────────────────────────────────────────────────────────────
// Relative time formatter
// ─────────────────────────────────────────────────────────────────────────────
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 10) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// ─────────────────────────────────────────────────────────────────────────────
// Simple markdown-like bold text renderer
// ─────────────────────────────────────────────────────────────────────────────
function renderContent(text: string) {
  // Split on **bold** markers and `code` markers
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          style={{
            background: 'var(--bg-tertiary)',
            padding: '1px 5px',
            borderRadius: 4,
            fontSize: '0.9em',
            fontFamily: 'monospace',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
interface ChatMessageProps {
  message: AIMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const timeStr = useMemo(() => formatRelativeTime(message.timestamp), [message.timestamp]);

  // Typing indicator (3-dot bounce)
  if (message.isTyping) {
    return (
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', animation: 'ai-chat-fadeIn 0.25s ease' }}>
        {/* Bot avatar */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          ✨
        </div>
        <div
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px 12px 12px 4px',
            padding: '14px 18px',
            display: 'flex',
            gap: 5,
            alignItems: 'center',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--color-primary-light)',
                display: 'inline-block',
                animation: `ai-chat-bounce 1.2s infinite ${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        animation: 'ai-chat-fadeIn 0.25s ease',
      }}
    >
      {/* Avatar */}
      {isUser ? (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          You
        </div>
      ) : (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          ✨
        </div>
      )}

      {/* Bubble */}
      <div
        style={{
          maxWidth: '82%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          style={{
            background: isUser
              ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
              : 'var(--bg-secondary)',
            color: isUser ? 'white' : 'var(--text-primary)',
            border: isUser ? 'none' : '1px solid var(--border-color)',
            padding: '10px 14px',
            borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
            fontSize: 13,
            lineHeight: 1.65,
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            boxShadow: isUser ? '0 2px 8px rgba(79, 70, 229, 0.2)' : 'var(--shadow-xs)',
          }}
        >
          {message.content.split('\n').map((line, i) => (
            <span key={i}>
              {renderContent(line)}
              {i < message.content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
        <span
          style={{
            fontSize: 10,
            color: 'var(--text-muted)',
            marginTop: 4,
            paddingLeft: isUser ? 0 : 2,
            paddingRight: isUser ? 2 : 0,
          }}
        >
          {timeStr}
        </span>
      </div>
    </div>
  );
}
