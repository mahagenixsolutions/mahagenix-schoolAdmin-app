import { useState } from 'react';
import { Activity, Search, Filter } from 'lucide-react';
import ActivitySidebarLeft from './ActivitySidebarLeft';
import ActivitySidebarRight from './ActivitySidebarRight';
import ActivityFeedItem from './ActivityFeedItem';
import { mockActivities } from './mockActivityData';

export default function SchoolActivityPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filters = ['All', 'Today', 'This Week', 'Academic', 'Events', 'Achievements'];

  // Filter activities
  const displayedActivities = mockActivities.filter(act => {
    // Category filter
    let matchesCategory = true;
    if (filter === 'Academic') matchesCategory = act.type === 'Academic' || act.type === 'Marks';
    else if (filter === 'Events') matchesCategory = act.type === 'Events' || act.type === 'Announcement';
    else if (filter === 'Achievements') matchesCategory = act.type === 'Achievement';

    // Search query filter
    let matchesSearch = true;
    if (search.trim() !== '') {
      const term = search.toLowerCase();
      matchesSearch = 
        act.content.toLowerCase().includes(term) || 
        act.type.toLowerCase().includes(term) ||
        (act.actor && act.actor.name && act.actor.name.toLowerCase().includes(term));
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="activity-center-container" style={{ paddingBottom: '40px' }}>
      
      {/* Header Section */}
      <div className="page-header" style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
            <Activity className="text-primary" size={28} />
            School Activity Intelligence Center
          </h1>
          <p className="page-subtitle" style={{ margin: '8px 0 0 0' }}>
            Real-time pulse of school-wide events, announcements, and key activities.
          </p>
        </div>
        
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', width: '280px' }}>
          <Search size={16} className="text-muted" style={{ marginRight: 8 }} />
          <input 
            type="text" 
            placeholder="Search activities, people..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px', color: 'var(--text-muted)' }}>
          <Filter size={16} /> <span style={{ fontSize: '13px', fontWeight: 500 }}>Filter:</span>
        </div>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: filter === f ? 'var(--color-primary)' : 'var(--bg-surface)',
              color: filter === f ? '#fff' : 'var(--text-secondary)',
              border: filter === f ? '1px solid var(--color-primary)' : '1px solid var(--border-color)',
              transition: 'all 0.2s'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 3-Column Intelligence Center Layout */}
      <div className="activity-layout-grid">
        
        {/* Left Sidebar: Stats & Trends */}
        <div className="activity-sidebar-left">
          <ActivitySidebarLeft />
        </div>

        {/* Center Column: Live Feed */}
        <div className="activity-main-feed" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {displayedActivities.length > 0 ? (
            displayedActivities.map(activity => (
              <ActivityFeedItem key={activity.id} activity={activity} />
            ))
          ) : (
            <div style={{ padding: '60px', textAlign: 'center', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px dashed var(--border-color)' }}>
              <Activity size={32} style={{ color: 'var(--text-muted)', marginBottom: '16px', opacity: 0.5 }} />
              <div style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>No activities match the selected search or filter.</div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Leaderboards & Upcoming */}
        <div className="activity-sidebar-right">
          <ActivitySidebarRight />
        </div>

      </div>

    </div>
  );
}

