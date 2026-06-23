import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  useGetParentStudentProfileQuery,
  useGetParentAttendanceQuery,
  useGetParentMarksQuery,
  useGetParentBadgesQuery,
} from '../../parent/parentApi';
import {
  Award,
  Calendar,
  CheckSquare,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  
  const studentId = 'student-001';

  // Fetch student-specific records
  const { data: profile, isLoading: isProfileLoading } = useGetParentStudentProfileQuery({ studentId });
  const { data: attendanceData } = useGetParentAttendanceQuery({ studentId });
  const { data: marks } = useGetParentMarksQuery({ studentId });

  const { data: badges } = useGetParentBadgesQuery({ studentId });

  // Stateful Checklist logic
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revise Science Expo project details', subject: 'Science', completed: false, due: 'Today' },
    { id: 2, title: 'Complete Math algebra exercises', subject: 'Mathematics', completed: true, due: 'Tomorrow' },
    { id: 3, title: 'Read Chapter 4 of English textbook', subject: 'English', completed: false, due: '2 days' },
    { id: 4, title: 'Upload history slides draft', subject: 'Social Studies', completed: false, due: '3 days' },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const homeworkCompletionRate = Math.round((completedCount / tasks.length) * 100);

  // Compute marks formatting
  const chartData = useMemo(() => {
    if (!marks) return [];
    return marks.map((m: any) => ({
      subject: m.subject || 'Subject',
      score: m.score || 80,
      grade: m.grade || 'B',
    }));
  }, [marks]);

  const initials = profile ? `${profile.first_name?.[0] ?? ''}${profile.last_name?.[0] ?? ''}`.toUpperCase() : 'ST';

  if (isProfileLoading) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 12 }}>
        <div style={{
          width: 44, height: 44,
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}/>
        <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Loading your dashboard...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Greeting Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), #312E81)',
          color: 'white',
          border: 'none',
          padding: '28px 24px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative', zIndex: 2 }}>
          <div
            className="avatar-fallback"
            style={{
              width: 72,
              height: 72,
              fontSize: 26,
              fontWeight: 800,
              background: 'rgba(255, 255, 255, 0.15)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
            }}
          >
            {initials}
          </div>
          <div>
            <span style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', opacity: 0.8 }}>Student Space</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: '4px 0 0 0' }}>
              Welcome back, {profile?.first_name}! 👋
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
              <p style={{ opacity: 0.8, fontSize: 13, margin: 0 }}>
                Class: {profile?.class ? `${profile.class.name} ${profile.class.section}` : 'Unassigned'} · Student ID: {profile?.student_code}
              </p>
              <button 
                onClick={() => navigate('/leave-application')}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  border: '1px solid rgba(255, 255, 255, 0.3)', 
                  color: 'white', 
                  padding: '6px 14px', 
                  borderRadius: 20, 
                  fontSize: 12, 
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <Calendar size={14} /> Apply for Leave
              </button>
            </div>
          </div>
        </div>

        {/* AI study coach speech bubble in absolute position */}
        <div
          style={{
            position: 'absolute',
            right: 24,
            top: 24,
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 12,
            padding: 12,
            maxWidth: 260,
            fontSize: 12,
            backdropFilter: 'blur(8px)',
            display: 'flex',
            gap: 8,
          }}
          className="md-visible-flex"
        >
          <Sparkles size={16} style={{ color: '#FCD34D', flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ display: 'block', color: '#FCD34D', marginBottom: 2 }}>AI Study Coach</strong>
            <span>Your English essay is scoring highly! Try reviewing Math quadratic formulas tonight to keep your grade trending up.</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="stats-grid">
        {/* Attendance Rate */}
        <div className="stat-card success">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">My Attendance</div>
              <div className="stat-card-value">{attendanceData?.percentage ?? 93}%</div>
            </div>
            <div className="stat-card-icon success"><Calendar size={20} /></div>
          </div>
          <div className="stat-card-change up">
            <span>On Track ({attendanceData?.present ?? 21} days present)</span>
          </div>
        </div>

        {/* Average GPA / Marks */}
        <div className="stat-card primary">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">Marks Average</div>
              <div className="stat-card-value">{profile?.average_marks ?? 86}%</div>
            </div>
            <div className="stat-card-icon primary"><TrendingUp size={20} /></div>
          </div>
          <div className="stat-card-change up">
            <span>Score Class: Excellent (A/B+)</span>
          </div>
        </div>

        {/* Completed Homework */}
        <div className="stat-card warning">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">Homework Completed</div>
              <div className="stat-card-value">{homeworkCompletionRate}%</div>
            </div>
            <div className="stat-card-icon warning"><CheckSquare size={20} /></div>
          </div>
          <div className="stat-card-change up">
            <span>{completedCount} of {tasks.length} tasks completed</span>
          </div>
        </div>

        {/* Badges / Points */}
        <div className="stat-card purple">
          <div className="stat-card-header">
            <div>
              <div className="stat-card-label">Badges Awarded</div>
              <div className="stat-card-value">{badges?.length ?? 3}</div>
            </div>
            <div className="stat-card-icon purple"><Award size={20} /></div>
          </div>
          <div className="stat-card-change up">
            <span>+150 Gamified points earned</span>
          </div>
        </div>
      </div>

      {/* Split Main Area: Checklist & Analytics */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Homework / Task Checklist */}
        <div className="card" style={{ padding: 20 }}>
          <div className="card-header" style={{ padding: 0, paddingBottom: 16, borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="card-title" style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              📋 My Daily Action Planner
            </span>
            <span className="badge badge-primary" style={{ fontSize: 10 }}>State Sync</span>
          </div>
          <div className="card-body" style={{ padding: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
              Check tasks below to track study milestones. This updates your homework completion KPI rate in real time.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 12,
                    background: 'var(--bg-secondary)',
                    borderRadius: 10,
                    border: task.completed ? '1px solid var(--color-success-surface)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}} // toggled on container div click
                    style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                      }}
                    >
                      {task.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                      {task.subject} · Due {task.due}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academics Chart */}
        <div className="card" style={{ padding: 20 }}>
          <div className="card-header" style={{ padding: 0, paddingBottom: 16, borderBottom: '1px solid var(--border-color)' }}>
            <span className="card-title" style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              📊 Subject Grade Distribution
            </span>
          </div>
          <div className="card-body" style={{ padding: '16px 0 0 0' }}>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                  <Tooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar name="My Score" dataKey="score" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Badges and Achievements section */}
      <div className="card" style={{ padding: 20 }}>
        <div className="card-header" style={{ padding: 0, paddingBottom: 16, borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Award size={18} className="text-primary" />
          <span className="card-title" style={{ fontSize: 16 }}>My Achievements & Badges</span>
        </div>
        <div className="card-body" style={{ padding: '16px 0 0 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {badges && badges.length > 0 ? (
            badges.map((b: any) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: 14,
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ fontSize: 24, padding: 8, background: 'var(--bg-primary)', borderRadius: 10, height: 'fit-content' }}>
                  {b.badge_icon || '⭐'}
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{b.badge_name}</h4>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                    {b.description}
                  </p>
                  <span style={{ display: 'inline-block', fontSize: 10, color: 'var(--color-primary)', fontWeight: 600, background: 'var(--color-primary-surface)', padding: '2px 6px', borderRadius: 4, marginTop: 8 }}>
                    +{b.points} Points
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, background: 'var(--bg-secondary)', borderRadius: 12 }}>
              No badges awarded yet. Complete activities to earn some!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
