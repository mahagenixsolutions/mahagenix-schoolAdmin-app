import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { X, Trash2, Send } from 'lucide-react';
import type { AIMessage } from '../../types/ai';
import { useAIContext } from '../../hooks/useAIContext';
import { generateAIResponse, getSuggestionsForPage } from '../../services/aiService';
import ChatMessage from './ChatMessage';
import SuggestionChips from './SuggestionChips';

// ─────────────────────────────────────────────────────────────────────────────
// Initial welcome message
// ─────────────────────────────────────────────────────────────────────────────
function makeWelcomeMessage(): AIMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content:
      '👋 Hi! I\'m your EduTrack AI assistant.\n\nI\'m aware of the page you\'re on, your active filters, and visible data. Ask me anything or try a suggestion below!',
    timestamp: new Date(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadChange: (count: number) => void;
}

export default function ChatWindow({ isOpen, onClose, onUnreadChange }: ChatWindowProps) {
  const context = useAIContext();
  const [messages, setMessages] = useState<AIMessage[]>([makeWelcomeMessage()]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Dynamic suggestions based on the current page
  const suggestions = useMemo(
    () => getSuggestionsForPage(context.module),
    [context.module],
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Send message handler
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: AIMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await generateAIResponse(trimmed, context);
        const aiMsg: AIMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);

        // Increment unread if window is closed (shouldn't happen often but just in case)
        if (!isOpen) {
          onUnreadChange(1);
        }
      } catch {
        const errMsg: AIMessage = {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: '❌ Sorry, I encountered an error processing your request. Please try again.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [context, isTyping, isOpen, onUnreadChange],
  );

  // Debounced submit via Enter key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => sendMessage(input), 300);
      }
    },
    [input, sendMessage],
  );

  const handleClear = useCallback(() => {
    setMessages([makeWelcomeMessage()]);
    setInput('');
    setIsTyping(false);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="ai-chat-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.15)',
          zIndex: 9997,
          display: 'none', // shown via CSS media query on mobile
        }}
      />

      {/* Chat window */}
      <div
        id="ai-chat-window"
        role="dialog"
        aria-label="AI Chat Assistant"
        style={{
          position: 'fixed',
          bottom: 88,
          right: 24,
          width: 380,
          height: 540,
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9998,
          overflow: 'hidden',
          animation: 'ai-chat-slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div
          style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05), rgba(139, 92, 246, 0.05))',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}
            >
              ✨
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                EduTrack AI
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  background: 'var(--color-primary-surface)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-block',
                  marginTop: 2,
                }}
              >
                📍 {context.page}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={handleClear}
              title="Clear conversation"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 6,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
                e.currentTarget.style.color = 'var(--color-danger)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={onClose}
              title="Close chat"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 6,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Messages ──────────────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <ChatMessage
              message={{
                id: 'typing',
                role: 'assistant',
                content: '',
                timestamp: new Date(),
                isTyping: true,
              }}
            />
          )}

          {/* Suggestion chips — shown after last assistant message */}
          {!isTyping && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
            <div style={{ paddingTop: 4 }}>
              <SuggestionChips
                suggestions={suggestions}
                onSelect={sendMessage}
                disabled={isTyping}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ─────────────────────────────────────────────────────── */}
        <div
          style={{
            flexShrink: 0,
            padding: '12px 14px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '8px 12px',
              transition: 'var(--transition-fast)',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about this page..."
              disabled={isTyping}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: 13,
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
              }}
              aria-label="Chat message input"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background:
                  input.trim() && !isTyping
                    ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
                    : 'var(--bg-tertiary)',
                color: input.trim() && !isTyping ? 'white' : 'var(--text-muted)',
                cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'var(--transition-fast)',
              }}
              aria-label="Send message"
            >
              <Send size={14} />
            </button>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: 8,
              fontSize: 10,
              color: 'var(--text-muted)',
            }}
          >
            Context-aware AI · {context.page} page
          </div>
        </div>
      </div>

      {/* ── Keyframe Animations & Responsive CSS ─────────────────────── */}
      <style>{`
        @keyframes ai-chat-slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ai-chat-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ai-chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        @media (max-width: 480px) {
          #ai-chat-window {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
          }
          .ai-chat-backdrop {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
