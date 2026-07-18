import { useLocation } from 'react-router-dom';
import { FileText, Users, Mail, BarChart2, CheckSquare, Search, AlertCircle, Clock } from 'lucide-react';

export default function AiQuickPrompts() {
  const location = useLocation();
  const path = location.pathname;

  let contextTitle = 'General Assistance';
  let prompts = [
    { id: 1, title: 'Weekly Newsletter', desc: 'Draft an email summarizing class achievements.', icon: Mail, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
    { id: 2, title: 'Performance Trends', desc: 'Analyze class averages over the last 3 months.', icon: BarChart2, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
  ];

  if (path.includes('/marks') || path.includes('/workspace')) {
    contextTitle = 'Grading & Marks Context';
    prompts = [
      { id: 1, title: 'Report Card Comments', desc: 'Generate personalized comments based on marks.', icon: FileText, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
      { id: 2, title: 'Analyze Grade Curve', desc: 'Find anomalies in the recent midterm scores.', icon: BarChart2, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    ];
  } else if (path.includes('/students')) {
    contextTitle = 'Student Profile Context';
    prompts = [
      { id: 1, title: 'Parent Meeting Prep', desc: 'Summarize student performance for upcoming PTAs.', icon: Users, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      { id: 2, title: 'Behavior Summary', desc: 'Review recent remarks and discipline logs.', icon: Search, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)' },
    ];
  } else if (path.includes('/attendance')) {
    contextTitle = 'Attendance Context';
    prompts = [
      { id: 1, title: 'Identify At-Risk', desc: 'Find students with <75% attendance this month.', icon: AlertCircle, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
      { id: 2, title: 'Draft Absence Warning', desc: 'Generate warning emails for chronic absentees.', icon: Mail, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)' },
    ];
  } else if (path.includes('/dashboard')) {
    contextTitle = 'Dashboard Context';
    prompts = [
      { id: 1, title: 'Daily Summary', desc: 'What are my top priorities for today?', icon: CheckSquare, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
      { id: 2, title: 'Schedule Review', desc: 'Show me my upcoming classes and meetings.', icon: Clock, color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.1)' },
    ];
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
        Current Context: {contextTitle}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {prompts.map(p => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="card hover-scale" style={{ cursor: 'pointer', border: '1px solid var(--border-color)', transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = p.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <div className="card-body" style={{ padding: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: p.bg, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                  <Icon size={14} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.2 }}>{p.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.3 }}>{p.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
