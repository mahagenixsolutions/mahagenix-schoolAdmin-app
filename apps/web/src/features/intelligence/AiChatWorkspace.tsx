import { Send, Paperclip, Mic, Sparkles, User, Bot, Copy, CheckCircle2 } from 'lucide-react';
import { mockChatHistory } from './mockAiData';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

export default function AiChatWorkspace() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, height: '100%' }}>
      
      {/* Chat Messages Feed */}
      <div style={{ flex: 1, minHeight: 0, height: 0, overflowY: 'auto', paddingRight: '16px', display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px', paddingBottom: '24px' }}>
        {mockChatHistory.map(msg => {
          const isUser = msg.role === 'user';
          
          return (
            <div key={msg.id} style={{ display: 'flex', gap: '16px', flexDirection: isUser ? 'row-reverse' : 'row' }}>
              
              {/* Avatar */}
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: isUser ? 'var(--color-secondary)' : 'var(--color-primary)', 
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                {isUser ? <User size={18} /> : <Bot size={18} />}
              </div>

              {/* Message Content */}
              <div style={{ maxWidth: '85%', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  background: isUser ? 'var(--bg-secondary)' : 'var(--bg-surface)', 
                  border: isUser ? 'none' : '1px solid var(--border-color)',
                  padding: '16px', borderRadius: '12px', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6,
                  boxShadow: isUser ? 'none' : '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </div>

                {/* Rich Content (Widgets injected by AI) */}
                {msg.richContent && msg.richContent.type === 'chart' && (
                  <div className="card" style={{ width: '100%', maxWidth: '100%', padding: '16px', marginTop: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-secondary)' }}>Attendance Trend (Last 30 Days)</div>
                    <div style={{ width: '100%', height: '140px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={msg.richContent.data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                          <Area type="monotone" dataKey="attendance" stroke="var(--color-primary)" fill="rgba(79, 70, 229, 0.1)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {msg.richContent && msg.richContent.type === 'actionable' && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                    {msg.richContent.actions.map((act: string, i: number) => (
                      <button key={i} className="btn btn-outline btn-sm" style={{ fontSize: '11px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {act.includes('Copy') ? <Copy size={12}/> : <CheckCircle2 size={12}/>} {act}
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{msg.timestamp}</div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div style={{ flexShrink: 0, paddingTop: '16px', marginTop: 'auto', background: 'var(--bg-primary)' }}>
        <div style={{ 
          background: 'var(--bg-surface)', border: '1px solid var(--border-color)', 
          borderRadius: '16px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
        }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            placeholder="Message Copilot..." 
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '15px', color: 'var(--text-primary)' }}
          />
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mic size={20} />
          </button>
          <button style={{ background: 'var(--color-primary)', border: 'none', color: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Send size={16} />
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <Sparkles size={10} style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} />
          AI Copilot can make mistakes.
        </div>
      </div>

    </div>
  );
}
