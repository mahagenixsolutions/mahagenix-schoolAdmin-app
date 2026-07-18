import { CheckSquare, Activity } from 'lucide-react';
import { mockPendingTasks, mockRecentUpdates } from './mockCommandCenterData';

export default function CommandCenterRightSidebar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Pending Tasks */}
      <div className="card">
        <div className="card-header border-b" style={{ padding: '16px' }}>
          <span className="card-title" style={{ fontSize: '14px' }}>
            <CheckSquare size={16} className="text-warning" /> Pending Tasks
          </span>
        </div>
        <div className="card-body" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockPendingTasks.map(task => (
              <label key={task.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer', opacity: task.completed ? 0.6 : 1 }}>
                <input 
                  type="checkbox" 
                  defaultChecked={task.completed} 
                  style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: 'var(--color-primary)' }} 
                />
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', textDecoration: task.completed ? 'line-through' : 'none', lineHeight: 1.4 }}>
                  {task.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Updates History */}
      <div className="card">
        <div className="card-header border-b" style={{ padding: '16px' }}>
          <span className="card-title" style={{ fontSize: '14px' }}>
            <Activity size={16} className="text-info" /> Recent Activity
          </span>
        </div>
        <div className="card-body" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockRecentUpdates.map(update => (
              <div key={update.id}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 600 }}>{update.time}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{update.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
