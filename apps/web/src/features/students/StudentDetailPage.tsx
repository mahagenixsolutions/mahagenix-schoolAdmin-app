import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {
  ChevronLeft, Award, Sparkles,
  MessageSquare, Image, Activity, CheckCircle, Clock
} from 'lucide-react';

import { mockStudents, mockTimelineEvents, mockInsights, mockPortfolio } from '../../data/mockData';

const AVAILABLE_BADGES = [
  { name: 'Star Student', icon: '⭐', desc: 'Outstanding general classroom behavior and peer support.', points: 50 },
  { name: 'Rapid Improver', icon: '🚀', desc: 'Showing rapid growth and mastery in academic subjects.', points: 100 },
  { name: 'Creative Genius', icon: '🎨', desc: 'Outstanding artistic display and out-of-the-box thinking.', points: 75 },
  { name: 'Science Pioneer', icon: '🔬', desc: 'Exceptional performance in labs and Science Expo tasks.', points: 100 },
  { name: 'Master Coder', icon: '💻', desc: 'Outstanding programming work and logic building.', points: 150 },
  { name: 'Perfect Attender', icon: '📅', desc: '100% attendance recorded in the active term.', points: 50 }
];

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Use dummy data directly
  // Fallback to student_1 if not found for UI demonstration purposes
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];
  const events = mockTimelineEvents.filter(e => e.student_id === student.id);
  const insight = mockInsights[student.id as keyof typeof mockInsights] || mockInsights['student_1'];
  const portfolioItems = mockPortfolio.filter(p => p.student_id === student.id);

  const initials = `${student.first_name[0]}${student.last_name[0]}`.toUpperCase();

  // Modals & feedback states
  const [activeModal, setActiveModal] = useState<'message' | 'badge' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [messageForm, setMessageForm] = useState({ subject: '', body: '', isUrgent: false, smsCopy: false });
  const [selectedBadge, setSelectedBadge] = useState(AVAILABLE_BADGES[0]);
  const [badgeReason, setBadgeReason] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast('✉️ Dispatching parent notification envelope...');
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      triggerToast(`✅ Message sent to parents of ${student.first_name}!`);
      setMessageForm({ subject: '', body: '', isUrgent: false, smsCopy: false });
    }, 1200);
  };

  const handleAwardBadge = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast(`🏆 Awarding "${selectedBadge.name}" Badge to ${student.first_name}...`);
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      triggerToast(`🎉 Badge awarded! +${selectedBadge.points} points credited to ${student.first_name}'s profile.`);
      setBadgeReason('');
    }, 1500);
  };

  return (
    <div className="student-profile-container" style={{ paddingBottom: 40, position: 'relative' }}>
      {/* Dynamic Toast Popup */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{ paddingLeft: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <ChevronLeft size={16} /> Back to Directory
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('message')} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <MessageSquare size={14} /> Send Message to Parent
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveModal('badge')} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Award size={14} /> Award Badge
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 320px) 1fr minmax(280px, 320px)',
        gap: 24,
        alignItems: 'start'
      }}>
        
        {/* COLUMN 1: Identity & Vital Signs (Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 24 }}>
          {/* Identity Card */}
          <div className="card border-glow" style={{ borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ height: 80, background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' }} />
            <div className="card-body" style={{ padding: '0 20px 20px 20px', textAlign: 'center', marginTop: -40 }}>
              <div
                className="avatar-fallback shadow-md"
                style={{
                  width: 80, height: 80, borderRadius: '50%', fontSize: 32, fontWeight: 800,
                  background: 'var(--bg-primary)',
                  color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px auto', border: '4px solid var(--bg-primary)'
                }}
              >
                {initials}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px 0' }}>{student.first_name} {student.last_name}</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                <span className="badge badge-primary">{student.class_name} {student.section}</span>
                <span className={`badge badge-${student.risk_status === 'Low' ? 'success' : student.risk_status === 'Medium' ? 'warning' : 'danger'}`}>
                  {student.risk_status} Risk
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', fontSize: 13, background: 'var(--bg-secondary)', padding: 16, borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Student ID</span>
                  <strong className="text-primary">{student.student_code}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Blood Group</span>
                  <strong>{student.blood_group}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Emergency</span>
                  <strong>{student.emergency_contact}</strong>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', fontSize: 13, background: 'var(--bg-secondary)', padding: 16, borderRadius: 12, marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Family & Guardians</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Father</span>
                  <strong>Robert Doe</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Mother</span>
                  <strong>Sarah Doe</strong>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', fontSize: 13, background: 'var(--bg-secondary)', padding: 16, borderRadius: 12, marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Fee Status</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                  <span>Cleared Dues</span>
                  <strong>$2,400</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-danger)' }}>
                  <span>Pending Dues</span>
                  <strong>$450</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Vital Signs (Pulse) */}
          <div className="card" style={{ borderRadius: 16 }}>
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Activity size={16} className="text-primary" /> Vital Signs
              </span>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Attendance</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-secondary)' }}>{student.attendance_rate}%</div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Avg Marks</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--color-primary)' }}>{student.avg_marks}%</div>
                </div>
              </div>
              
              <div style={{ height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={student.pulse} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Bar dataKey="attendance" fill="var(--color-secondary)" radius={[2, 2, 0, 0]} barSize={8} />
                    <Bar dataKey="marks" fill="var(--color-primary)" radius={[2, 2, 0, 0]} barSize={8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: The Timeline Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} /> Student Timeline
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 16px 0' }}>
            A chronological pulse of {student.first_name}'s daily journey.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {events.map((event) => (
              <div key={event.id} className="card hover-scale" style={{ borderRadius: 16, overflow: 'hidden', borderLeft: `4px solid ${event.color}` }}>
                <div className="card-body" style={{ padding: 16, display: 'flex', gap: 16 }}>
                  <div style={{ 
                    width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0
                  }}>
                    {event.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{event.title}</h4>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {event.description}
                    </p>
                    <div style={{ marginTop: 12 }}>
                      <span className="badge" style={{ background: 'var(--bg-secondary)', color: event.color, fontSize: 10 }}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 3: AI Insights & Digital Portfolio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* AI Insights Card */}
          <div className="card border-glow" style={{ borderRadius: 16, background: 'var(--bg-primary)' }}>
            <div className="card-header bg-gradient-header" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={16} className="text-primary" />
              <span className="card-title text-glow" style={{ fontSize: 14 }}>EduTrack AI Summary</span>
            </div>
            <div className="card-body" style={{ padding: 20 }}>
              <p style={{ margin: '0 0 16px 0', fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {insight.summary}
              </p>
              
              <div style={{ marginBottom: 16 }}>
                <h5 style={{ margin: '0 0 8px 0', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-secondary)' }}>
                  <CheckCircle size={14} /> Core Strengths
                </h5>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {insight.strengths.map((str, i) => <li key={i}>{str}</li>)}
                </ul>
              </div>

              <div>
                <h5 style={{ margin: '0 0 8px 0', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)' }}>
                  <Sparkles size={14} /> AI Recommendation
                </h5>
                <div style={{ background: 'var(--color-primary-surface)', padding: 12, borderRadius: 8, fontSize: 12, color: 'var(--color-primary-dark)', border: '1px dashed var(--color-primary)' }}>
                  {insight.recommendation}
                </div>
              </div>
            </div>
          </div>

          {/* Digital Portfolio */}
          <div className="card" style={{ borderRadius: 16 }}>
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Image size={16} className="text-primary" /> Digital Portfolio
              </span>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {portfolioItems.map(item => (
                  <div key={item.id} className="hover-scale" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
                    <div style={{ 
                      position: 'absolute', bottom: 0, left: 0, right: 0, 
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', 
                      padding: '24px 12px 12px 12px', color: 'white'
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{item.title}</div>
                      <div style={{ fontSize: 10, opacity: 0.8 }}>{item.date} • {item.type}</div>
                    </div>
                  </div>
                ))}
                {portfolioItems.length === 0 && (
                  <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, background: 'var(--bg-secondary)', borderRadius: 12 }}>
                    No portfolio items uploaded yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Report Cards (Mark Sheets) */}
          <div className="card" style={{ borderRadius: 16 }}>
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
              <span className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={16} className="text-primary" /> Academic Report Cards
              </span>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Current Class Report */}
                <div style={{ border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', fontWeight: 700, fontSize: 13, borderBottom: '1px solid var(--border-color)' }}>
                    Grade {student.class_name} - Mid Term Report
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingBottom: 8, borderBottom: '1px dashed var(--border-color)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Mathematics</span>
                      <strong>92/100 (A+)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '8px 0', borderBottom: '1px dashed var(--border-color)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Science</span>
                      <strong>88/100 (A)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '8px 0', borderBottom: '1px dashed var(--border-color)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>English</span>
                      <strong>95/100 (A+)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingTop: 8 }}>
                      <span style={{ color: 'var(--text-muted)' }}>History</span>
                      <strong>84/100 (B+)</strong>
                    </div>
                    <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 16, borderRadius: 8 }}>View Full Mark Sheet</button>
                  </div>
                </div>
                
                {/* Previous Class Report */}
                {parseInt(student.class_name || '10') > 1 && (
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden', opacity: 0.8 }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', fontWeight: 700, fontSize: 13, borderBottom: '1px solid var(--border-color)' }}>
                      Grade {parseInt(student.class_name || '10') - 1} - Final Report
                    </div>
                    <div style={{ padding: 14 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Overall Percentage: <strong>89.5%</strong></div>
                      <button className="btn btn-ghost btn-sm" style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border-color)' }}>Download Previous Report</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Message Modal */}
      {activeModal === 'message' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 480, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Message Parent of {student.first_name}</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }} disabled={isLoading}>✕</button>
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 8 }}>
                Recipient: <strong>{student.first_name} {student.last_name}'s Primary Parent</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Subject</label>
                <input type="text" required value={messageForm.subject} onChange={e => setMessageForm({ ...messageForm, subject: e.target.value })} placeholder="e.g. Science Expo Project Mentorship" style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Message Body</label>
                <textarea required rows={5} value={messageForm.body} onChange={e => setMessageForm({ ...messageForm, body: e.target.value })} placeholder="Compose your update to the parent..." style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit', fontSize: 13 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={messageForm.isUrgent} onChange={e => setMessageForm({ ...messageForm, isUrgent: e.target.checked })} style={{ accentColor: 'var(--color-primary)' }} />
                  <span>Flag as urgent (High priority badge on dashboard)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={messageForm.smsCopy} onChange={e => setMessageForm({ ...messageForm, smsCopy: e.target.checked })} style={{ accentColor: 'var(--color-primary)' }} />
                  <span>Send direct SMS backup alert</span>
                </label>
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ padding: 12, marginTop: 8 }}>
                {isLoading ? 'Dispatching Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Award Badge Modal */}
      {activeModal === 'badge' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 500, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Award Badge to {student.first_name}</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }} disabled={isLoading}>✕</button>
            </div>
            <form onSubmit={handleAwardBadge} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: -4 }}>Choose Badge Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxHeight: 200, overflowY: 'auto', padding: 2 }}>
                {AVAILABLE_BADGES.map(badge => (
                  <div 
                    key={badge.name}
                    onClick={() => setSelectedBadge(badge)}
                    style={{
                      border: selectedBadge.name === badge.name ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
                      borderRadius: 10,
                      padding: 10,
                      background: selectedBadge.name === badge.name ? 'var(--color-primary-surface)' : 'var(--bg-body)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{badge.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{badge.name}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 2 }}>+{badge.points} Pts</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '10px 14px', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                <strong>Description:</strong> {selectedBadge.desc}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Reason / Comment</label>
                <input type="text" required value={badgeReason} onChange={e => setBadgeReason(e.target.value)} placeholder="e.g. Excellent logic flow built during Python algorithms assignment." style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ padding: 12, marginTop: 8 }}>
                {isLoading ? 'Awarding badge...' : `Award Badge (+${selectedBadge.points} Points)`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

