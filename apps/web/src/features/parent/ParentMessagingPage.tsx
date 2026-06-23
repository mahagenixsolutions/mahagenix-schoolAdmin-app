import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useGetParentMessagesQuery, useSendParentMessageMutation } from './parentApi';

const MOCK_CHANNELS = [
  { id: 'transport', name: 'Transport Coordinator', role: 'School Bus', online: true, lastMessage: 'Bus 4A is running 10 mins late.' },
  { id: 'accounts', name: 'Accounts Department', role: 'Fees & Admin', online: false, lastMessage: 'Receipt for Q2 fees generated.' },
  { id: 'principal', name: 'Principal Office', role: 'School Admin', online: true, lastMessage: 'Dear Parents, please note tomorrow is a holiday.' },
  { id: 'subject_math', name: 'Mr. David (Math)', role: 'Subject Teacher', online: false, lastMessage: 'Homework submitted. Good job!' },
];

export default function ParentMessagingPage() {
  const selectedStudent = useSelector((s: RootState) => s.auth.selected_student);
  const studentId = selectedStudent?.id;
  const user = useSelector((s: RootState) => s.auth.user);

  const { data: apiThreads = [], refetch } = useGetParentMessagesQuery({ studentId: studentId! }, { skip: !studentId });
  const [sendMessage, { isLoading: isSending }] = useSendParentMessageMutation();

  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Combine API threads (Class Teacher) with Mock Channels for demonstration
  const threads = useMemo(() => {
    const combined: any[] = [];
    if (apiThreads && Array.isArray(apiThreads)) {
      apiThreads.forEach((t: any) => {
        if (t?.teacher) {
          combined.push({
            id: t.teacher.id,
            name: `${t.teacher.first_name} ${t.teacher.last_name}`,
            role: 'Class Teacher',
            online: true,
            lastMessage: t.last_message ? t.last_message.content : 'Start a conversation',
            isApi: true,
            messages: t.messages || []
          });
        }
      });
    }
    MOCK_CHANNELS.forEach(m => {
      combined.push({
        id: m.id,
        name: m.name,
        role: m.role,
        online: m.online,
        lastMessage: m.lastMessage,
        isApi: false,
        messages: [
          { id: 'm1', content: m.lastMessage, sender_id: 'system', created_at: new Date().toISOString() }
        ]
      });
    });
    return combined;
  }, [apiThreads]);

  useEffect(() => {
    if (threads.length > 0 && !activeThreadId) {
      setActiveThreadId(threads[0].id);
    }
  }, [threads, activeThreadId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [activeThreadId, threads]);

  if (!studentId) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>💬</div>
        <h2 style={{ color: '#0f172a', fontWeight: 600 }}>Messaging Center</h2>
        <p style={{ color: '#64748b' }}>Select a child to message their teachers and school staff.</p>
      </div>
    );
  }

  const activeThread = threads.find((t) => t.id === activeThreadId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeThread || isSending) return;

    if (activeThread.isApi) {
      try {
        await sendMessage({
          studentId: studentId!,
          teacherId: activeThread.id,
          content: messageText.trim(),
        }).unwrap();
        setMessageText('');
        refetch();
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    } else {
      // Mock sending for non-API channels
      activeThread.messages.push({
        id: Math.random().toString(),
        content: messageText.trim(),
        sender_id: user?.id,
        created_at: new Date().toISOString()
      });
      setMessageText('');
    }
  };

  return (
    <div style={{ 
      display: 'flex', height: 'calc(100vh - 120px)', maxWidth: 1200, margin: '0 auto',
      background: 'var(--bg-primary)', borderRadius: 24, overflow: 'hidden',
      boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)'
    }}>
      {/* SIDEBAR (Channels) */}
      <div style={{ width: 340, borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
        <div style={{ padding: '20px 24px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Messages</h2>
          <button style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--bg-secondary)', cursor: 'pointer', fontSize: 16 }}>✍️</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          {threads.map((t) => {
            const isActive = activeThreadId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: 12,
                  border: 'none', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                  background: isActive ? 'var(--color-primary-surface)' : 'transparent',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>
                    {t.name[0]}
                  </div>
                  {t.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, background: '#22c55e', border: '2px solid var(--bg-primary)', borderRadius: '50%' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: isActive ? 'var(--color-primary)' : 'var(--text-muted)', fontWeight: isActive ? 600 : 500 }}>12:30 PM</div>
                  </div>
                  <div style={{ fontSize: 12, color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{t.lastMessage}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-tertiary)', position: 'relative' }}>
        {/* Chat Background Pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />
        
        {activeThread ? (
          <>
            {/* Header */}
            <div style={{ padding: '16px 24px', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 16, zIndex: 1 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>
                {activeThread.name[0]}
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{activeThread.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{activeThread.role} • {activeThread.online ? <span style={{color: '#22c55e', fontWeight: 600}}>Online</span> : 'Offline'}</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
                <button style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'var(--bg-secondary)', cursor: 'pointer', fontSize: 16, color: 'var(--text-primary)' }}>📞</button>
                <button style={{ width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'var(--bg-secondary)', cursor: 'pointer', fontSize: 16, color: 'var(--text-primary)' }}>📹</button>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 1 }}>
              <div style={{ alignSelf: 'center', background: 'var(--bg-primary)', padding: '6px 12px', borderRadius: 16, fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 16, backdropFilter: 'blur(4px)', border: '1px solid var(--border-color)' }}>
                Today
              </div>
              
              {activeThread.messages.map((msg: any) => {
                const isOwn = msg.sender_id === user?.id;
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: isOwn ? 'flex-end' : 'flex-start' }}>
                    <div style={{ 
                      maxWidth: '65%', 
                      background: isOwn ? 'var(--color-primary-surface)' : 'var(--bg-primary)', 
                      color: isOwn ? 'var(--color-primary-dark)' : 'var(--text-primary)', 
                      padding: '8px 12px', 
                      borderRadius: isOwn ? '12px 0 12px 12px' : '0 12px 12px 12px', 
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--border-color)',
                      position: 'relative'
                    }}>
                      <div style={{ fontSize: 14, lineHeight: 1.5, wordBreak: 'break-word', paddingRight: 32 }}>
                        {msg.content}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', position: 'absolute', bottom: 6, right: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {isOwn && <span style={{ color: 'var(--color-primary)', fontSize: 12 }}>✓✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} style={{ padding: '16px 24px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: 12, zIndex: 1, borderTop: '1px solid var(--border-color)' }}>
              <button type="button" style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20, color: 'var(--text-muted)' }}>😀</button>
              <button type="button" style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20, color: 'var(--text-muted)', transform: 'rotate(45deg)' }}>📎</button>
              
              <input
                type="text"
                placeholder="Type a message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                style={{ flex: 1, borderRadius: 24, border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '12px 20px', fontSize: 14, outline: 'none', boxShadow: 'var(--shadow-xs)' }}
                disabled={isSending}
              />
              
              {messageText.trim() ? (
                <button type="submit" style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(79, 70, 229, 0.3)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                </button>
              ) : (
                <button type="button" style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 20, color: 'var(--text-muted)' }}>🎤</button>
              )}
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 14, zIndex: 1, flexDirection: 'column', gap: 16 }}>
            <div style={{ width: 120, height: 120, background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, border: '1px solid var(--border-color)' }}>💬</div>
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
