import { Zap, Clock, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { mockAiSuggestions, mockSchedule } from './mockCommandCenterData';

export default function CommandCenterLeftSidebar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* AI Suggestions Widget */}
      <div className="card" style={{ background: 'linear-gradient(145deg, rgba(79, 70, 229, 0.05), rgba(79, 70, 229, 0.01)), var(--bg-secondary)', border: '1px solid rgba(79, 70, 229, 0.15)' }}>
        <div className="card-header border-b" style={{ padding: '16px' }}>
          <span className="card-title" style={{ fontSize: '14px', color: 'var(--color-primary)' }}>
            <Zap size={16} /> Copilot Insights
          </span>
        </div>
        <div className="card-body" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockAiSuggestions.map(sug => {
              let Icon = Info;
              let color = 'var(--text-primary)';
              if (sug.type === 'warning') { Icon = AlertCircle; color = 'var(--color-warning)'; }
              if (sug.type === 'success') { Icon = CheckCircle2; color = 'var(--color-success)'; }
              
              return (
                <div key={sug.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', lineHeight: 1.5 }}>
                  <Icon size={16} style={{ color, flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{sug.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="card">
        <div className="card-header border-b" style={{ padding: '16px' }}>
          <span className="card-title" style={{ fontSize: '14px' }}>
            <Clock size={16} className="text-secondary" /> Today's Schedule
          </span>
        </div>
        <div className="card-body" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {/* Timeline Line */}
            <div style={{ position: 'absolute', left: '5px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border-color)', zIndex: 0 }} />

            {mockSchedule.map((slot, idx) => {
              const isActive = slot.status === 'active';
              const isCompleted = slot.status === 'completed';
              
              let dotBg = 'var(--bg-body)';
              let dotBorder = 'var(--border-color)';
              if (isActive) {
                dotBg = 'var(--color-primary)';
                dotBorder = 'var(--color-primary)';
              } else if (isCompleted) {
                dotBg = 'var(--text-muted)';
              }

              return (
                <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1, opacity: isCompleted ? 0.6 : 1 }}>
                  <div style={{ 
                    width: '12px', height: '12px', borderRadius: '50%', background: dotBg, 
                    border: `2px solid ${dotBorder}`, marginTop: '4px',
                    boxShadow: isActive ? '0 0 0 3px rgba(79, 70, 229, 0.2)' : 'none'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: isActive ? 'var(--color-primary)' : 'var(--text-muted)' }}>{slot.time}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0' }}>{slot.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{slot.room}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
