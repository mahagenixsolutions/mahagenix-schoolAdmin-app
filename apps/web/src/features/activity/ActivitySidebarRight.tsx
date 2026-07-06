import { Trophy, CalendarClock, ChevronRight, Medal } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { mockContributors, mockUpcomingEvents } from './mockActivityData';

export default function ActivitySidebarRight() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Contributors */}
      <div className="card">
        <div className="card-header border-b">
          <span className="card-title" style={{ fontSize: '15px' }}>
            <Trophy size={18} className="text-warning" /> Top Contributors
          </span>
        </div>
        <div className="card-body" style={{ padding: '12px 0' }}>
          {mockContributors.map((user, idx) => (
            <div key={user.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '12px 20px',
              borderBottom: idx < mockContributors.length - 1 ? '1px solid var(--border-color)' : 'none',
              gap: '12px'
            }}>
              <div style={{ position: 'relative' }}>
                <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--bg-surface)' }} />
                {idx === 0 && (
                  <div style={{ position: 'absolute', bottom: -4, right: -4, background: '#F59E0B', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Medal size={10} />
                  </div>
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.role}</div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary)' }}>
                {user.score}
              </div>
            </div>
          ))}
          <div style={{ padding: '12px 20px 0 20px', textAlign: 'center' }}>
            <Button variant="ghost" size="sm" endIcon={<ChevronRight size={14} />} style={{ width: '100%', color: 'var(--color-primary)', fontSize: '13px' }}>
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>

      {/* Upcoming Activities */}
      <div className="card">
        <div className="card-header border-b">
          <span className="card-title" style={{ fontSize: '15px' }}>
            <CalendarClock size={18} className="text-info" /> Upcoming Radar
          </span>
        </div>
        <div className="card-body" style={{ padding: '12px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mockUpcomingEvents.map((event) => (
              <div key={event.id} style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '2px', background: event.type === 'Deadline' ? 'var(--color-danger)' : event.type === 'Academic' ? 'var(--color-primary)' : 'var(--color-success)', borderRadius: '2px' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{event.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{event.time}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" style={{ width: '100%', marginTop: '20px', fontSize: '13px' }}>
            Full Calendar
          </Button>
        </div>
      </div>

    </div>
  );
}
