import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useGetParentTimelineQuery, useGetParentMarksQuery, useGetParentAchievementsQuery } from './parentApi';

const FILTERS = ['All', 'Attendance', 'Homework', 'Exams', 'Activities', 'Sports', 'Certificates', 'Teacher Notes'];

export default function ParentTimelinePage() {
  const selectedStudent = useSelector((s: RootState) => s.auth.selected_student);
  const studentId = selectedStudent?.id;

  const [activeFilter, setActiveFilter] = useState('All');

  const { data: rawTimeline = [], isLoading } = useGetParentTimelineQuery({ studentId: studentId! }, { skip: !studentId });
  const { data: marks = [] } = useGetParentMarksQuery({ studentId: studentId! }, { skip: !studentId });
  const { data: achievements = [] } = useGetParentAchievementsQuery({ studentId: studentId! }, { skip: !studentId });

  // Merge raw timeline with mock detailed events for a richer UI demonstration
  const timeline = useMemo(() => {
    const combined = [...rawTimeline];
    
    // Supplement with Academic Snapshots (from marks)
    marks.forEach((m: any) => {
      combined.push({
        type: 'EXAMS',
        title: `${m.exam_schedule?.subject?.name || 'Subject'} Exam Results`,
        description: `Scored ${m.obtained_marks || 0}/${m.exam_schedule?.max_marks || 100} (Grade ${m.grade || 'N/A'}).`,
        created_at: m.created_at || new Date().toISOString(),
        metadata: { grade: m.grade || 'N/A', percentage: ((m.obtained_marks || 0) / (m.exam_schedule?.max_marks || 100)) * 100 }
      });
    });

    // Supplement with Achievements/Participation
    achievements.forEach((a: any) => {
      combined.push({
        type: 'ACTIVITIES',
        title: a.title || 'School Activity',
        description: a.description || 'Participated in a school event.',
        created_at: a.date || new Date().toISOString(),
        imageUrl: a.image_url || 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=600&q=80',
      });
    });

    // Sort descending
    combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return combined;
  }, [rawTimeline, marks, achievements]);

  const filteredTimeline = useMemo(() => {
    if (activeFilter === 'All') return timeline;
    return timeline.filter((event: any) => {
      const type = event.type?.toUpperCase() || '';
      if (activeFilter === 'Attendance' && type.includes('ATTENDANCE')) return true;
      if (activeFilter === 'Homework' && type.includes('HOMEWORK')) return true;
      if (activeFilter === 'Exams' && (type.includes('MARK') || type.includes('EXAM'))) return true;
      if (activeFilter === 'Activities' && (type.includes('ACTIVIT') || type.includes('CULTURAL'))) return true;
      if (activeFilter === 'Sports' && type.includes('SPORT')) return true;
      if (activeFilter === 'Certificates' && (type.includes('BADGE') || type.includes('ACHIEVEMENT'))) return true;
      if (activeFilter === 'Teacher Notes' && type.includes('REMARK')) return true;
      return false;
    });
  }, [timeline, activeFilter]);

  if (!studentId) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>👨‍👩‍👧</div>
        <h2 style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Select Child</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a child to view their chronological timeline.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 12 }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Loading activity feed...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    const t = type?.toUpperCase() || '';
    if (t.includes('ATTENDANCE')) return { char: '📋', color: '#10B981', bg: '#ECFDF5' };
    if (t.includes('MARK') || t.includes('EXAM')) return { char: '💯', color: '#3B82F6', bg: '#EFF6FF' };
    if (t.includes('BADGE') || t.includes('CERTIFICATE')) return { char: '🏅', color: '#8B5CF6', bg: '#F5F3FF' };
    if (t.includes('ACHIEVEMENT') || t.includes('ACTIVIT') || t.includes('CULTURAL')) return { char: '🎨', color: '#F59E0B', bg: '#FFFBEB' };
    if (t.includes('SPORT')) return { char: '⚽', color: '#EF4444', bg: '#FEF2F2' };
    if (t.includes('REMARK')) return { char: '💬', color: '#EC4899', bg: '#FDF2F8' };
    if (t.includes('HOMEWORK')) return { char: '📚', color: '#14B8A6', bg: '#F0FDFA' };
    return { char: '📌', color: '#64748B', bg: '#F8FAFC' };
  };

  // Group events by Relative Date (Today, Yesterday, Last Week, etc)
  const groupedEvents: Record<string, any[]> = {};
  const today = new Date();
  today.setHours(0,0,0,0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  filteredTimeline.forEach(event => {
    const d = new Date(event.created_at);
    d.setHours(0,0,0,0);
    let group;
    if (d.getTime() === today.getTime()) group = 'Today';
    else if (d.getTime() === yesterday.getTime()) group = 'Yesterday';
    else if (d.getTime() > lastWeek.getTime()) group = 'Last Week';
    else group = d.toLocaleDateString([], { month: 'long', year: 'numeric' }) || 'Older';
    
    if (!groupedEvents[group]) groupedEvents[group] = [];
    groupedEvents[group].push(event);
  });

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 80 }}>
      {/* Filters (Horizontal Scroll) */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 16, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: 'none',
              background: activeFilter === f ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: activeFilter === f ? 'var(--bg-primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {Object.keys(groupedEvents).length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {['Today', 'Yesterday', 'Last Week', ...Object.keys(groupedEvents).filter(k => !['Today', 'Yesterday', 'Last Week'].includes(k))].map(group => {
            if (!groupedEvents[group] || groupedEvents[group].length === 0) return null;
            return (
              <div key={group}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, position: 'sticky', top: 0, background: 'var(--bg-secondary)', padding: '8px 0', zIndex: 10 }}>
                  {group}
                </h2>
                <div style={{ position: 'relative', paddingLeft: 24, borderLeft: '2px solid var(--border-color)', marginLeft: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {groupedEvents[group].map((event: any, idx: number) => {
                    const { char, color, bg } = getEventIcon(event.type);
                    return (
                      <div key={idx} style={{ position: 'relative' }}>
                        {/* Timeline node */}
                        <div style={{
                            position: 'absolute', left: -41, top: 0, width: 32, height: 32, borderRadius: '50%',
                            background: bg, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, zIndex: 2
                          }}
                        >
                          {char}
                        </div>

                        {/* Event details card */}
                        <div style={{
                            background: 'var(--bg-primary)', padding: 16, borderRadius: 20, border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-xs)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{event.title}</h3>
                            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
                              {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          
                          {/* Optional Rich Media / Academic Snapshot Rendering */}
                          {event.metadata?.grade && (
                            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div style={{ fontSize: 24, fontWeight: 800, color: event.metadata.percentage >= 80 ? '#10b981' : '#3b82f6' }}>
                                {event.metadata.grade}
                              </div>
                              <div style={{ height: 6, flex: 1, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${event.metadata.percentage}%`, background: event.metadata.percentage >= 80 ? '#10b981' : '#3b82f6', borderRadius: 3 }} />
                              </div>
                            </div>
                          )}

                          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                            {event.description}
                          </p>

                          {/* Image Thumbnail for Activities */}
                          {event.imageUrl && (
                            <div style={{ marginTop: 12, borderRadius: 12, overflow: 'hidden', maxHeight: 200 }}>
                              <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: 'var(--bg-primary)', borderRadius: 24, padding: 40, textAlign: 'center', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <h3 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0', fontSize: 18, fontWeight: 800 }}>No Updates Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0 }}>
            Try changing your filter or check back later.
          </p>
        </div>
      )}
    </div>
  );
}
