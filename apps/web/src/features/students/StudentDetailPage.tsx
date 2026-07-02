import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Award, MessageSquare, Activity, Clock,
  UserPlus, ArrowUpCircle, GraduationCap, Heart, FileText, Users
} from 'lucide-react';

import { mockStudents, mockTimelineEvents } from '../../data/mockData';

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

  const initials = `${student.first_name[0]}${student.last_name[0]}`.toUpperCase();

  // Modals & feedback states
  const [activeModal, setActiveModal] = useState<'message' | 'badge' | 'promote' | 'alumni' | 'add' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<'timeline' | 'academics' | 'attendance' | 'medical' | 'guardians' | 'documents'>('timeline');

  // ERP actions mock states
  const [studentClass, setStudentClass] = useState(`${student.class_name} ${student.section}`);
  const [studentStatus, setStudentStatus] = useState('ACTIVE');
  
  // Mock add student state
  const [addStudentForm, setAddStudentForm] = useState({ firstName: '', lastName: '', gender: 'MALE', classId: 'class-10-a', email: '' });

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

  const handlePromoteStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast(`⚡ Promoting ${student.first_name} to the next grade...`);
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      // Increment the class grade from "Class 10 A" to "Class 11 A" (mock increment)
      const currentClassNum = parseInt(studentClass.replace('Class ', '')) || 10;
      const nextClassNum = currentClassNum + 1;
      setStudentClass(`Class ${nextClassNum} A`);
      triggerToast(`🎉 ${student.first_name} successfully promoted to Class ${nextClassNum} A!`);
    }, 1500);
  };

  const handleTransitionAlumni = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast(`🎓 Graduating student ${student.first_name} to alumni status...`);
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      setStudentStatus('ALUMNI');
      triggerToast(`🎓 ${student.first_name} successfully registered as Alumni!`);
    }, 1500);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast(`✨ Registering new student account...`);
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      triggerToast(`✅ Account successfully registered for ${addStudentForm.firstName} ${addStudentForm.lastName}!`);
      setAddStudentForm({ firstName: '', lastName: '', gender: 'MALE', classId: 'class-10-a', email: '' });
    }, 1500);
  };

  return (
    <div className="student-profile-container" style={{ paddingBottom: 40, position: 'relative' }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/students')} style={{ paddingLeft: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <ChevronLeft size={16} /> Student Directory
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveModal('add')} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <UserPlus size={14} /> Add Student
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('message')} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <MessageSquare size={14} /> Send Message
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveModal('badge')} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <Award size={14} /> Award Badge
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 320px) 1fr',
        gap: 24,
        alignItems: 'start'
      }}>
        
        {/* COLUMN 1: Identity & Quick Actions (Sticky Sidebar) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 24 }}>
          {/* Identity Card */}
          <div className="card border-glow" style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--bg-surface)' }}>
            <div style={{ height: 80, background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))' }} />
            <div className="card-body" style={{ padding: '0 20px 20px 20px', textAlign: 'center', marginTop: -40 }}>
              <div
                className="avatar-fallback shadow-md"
                style={{
                  width: 80, height: 80, borderRadius: '50%', fontSize: 32, fontWeight: 800,
                  background: 'var(--bg-surface-raised)',
                  color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px auto', border: '4px solid var(--bg-surface)'
                }}
              >
                {initials}
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                {student.first_name} {student.last_name}
              </h2>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
                <span className="badge badge-primary">{studentClass}</span>
                <span className={`badge badge-${studentStatus === 'ACTIVE' ? 'present' : 'absent'}`}>
                  {studentStatus}
                </span>
              </div>

              {/* ERP Lifecycle Quick Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => setActiveModal('promote')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: '36px', fontSize: '13px' }}
                >
                  <ArrowUpCircle size={15} /> Promote Student
                </button>
                <button 
                  className="btn btn-ghost btn-sm" 
                  onClick={() => setActiveModal('alumni')}
                  disabled={studentStatus === 'ALUMNI'}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', height: '36px', fontSize: '13px', border: '1px solid var(--border-subtle)', color: studentStatus === 'ALUMNI' ? 'var(--text-muted)' : 'var(--text-primary)' }}
                >
                  <GraduationCap size={15} /> Graduate to Alumni
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', fontSize: 13, background: 'var(--bg-surface-raised)', padding: 16, borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Student ID</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{student.student_code}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Gender</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{student.gender}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Risk Indicator</span>
                  <strong style={{ color: student.risk_status === 'Low' ? 'var(--accent-success)' : 'var(--accent-warning)' }}>{student.risk_status} Risk</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Vitals summary */}
          <div className="card" style={{ borderRadius: 16, background: 'var(--bg-surface)', padding: 16, border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
              <Activity size={16} style={{ color: 'var(--accent-primary)' }} /> Vital Statistics
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: 'var(--bg-surface-raised)', padding: 12, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Attendance</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-success)' }}>{student.attendance_rate}%</div>
              </div>
              <div style={{ background: 'var(--bg-surface-raised)', padding: 12, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Average Mark</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-primary)' }}>{student.avg_marks}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Details & Tabs Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Tabs Menu Header */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1px',
            gap: '24px',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {[
              { id: 'timeline', label: 'Timeline', icon: <Clock size={15} /> },
              { id: 'academics', label: 'Academic History', icon: <Award size={15} /> },
              { id: 'attendance', label: 'Attendance Logs', icon: <Activity size={15} /> },
              { id: 'medical', label: 'Medical Info', icon: <Heart size={15} /> },
              { id: 'guardians', label: 'Guardian Details', icon: <Users size={15} /> },
              { id: 'documents', label: 'Documents', icon: <FileText size={15} /> },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 4px',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: active ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    fontWeight: active ? 700 : 500,
                    fontSize: '14px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Pane Renders */}
          <div style={{ minHeight: '360px' }}>
            
            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {events.map((event) => (
                  <div key={event.id} className="card hover-scale" style={{ borderRadius: 16, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderLeft: `4px solid ${event.color}` }}>
                    <div className="card-body" style={{ padding: 16, display: 'flex', gap: 16 }}>
                      <div style={{ 
                        width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-surface-raised)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0
                      }}>
                        {event.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{event.title}</h4>
                          <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
                            {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Academics Tab */}
            {activeTab === 'academics' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Reports summary card */}
                <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={16} style={{ color: 'var(--accent-primary)' }} /> Terminal Marks Report
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Mathematics</span>
                      <strong style={{ color: 'var(--text-primary)' }}>92/100 (Grade A+)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Physics & Chemistry</span>
                      <strong style={{ color: 'var(--text-primary)' }}>88/100 (Grade A)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>English Grammar</span>
                      <strong style={{ color: 'var(--text-primary)' }}>95/100 (Grade A+)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingTop: 4 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Social Science</span>
                      <strong style={{ color: 'var(--text-primary)' }}>84/100 (Grade B+)</strong>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: '20px' }}>
                    Download Official Marksheet (PDF)
                  </button>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Attendance Monthly Summary</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {[
                      { month: 'June', rate: '98%', days: '21/22' },
                      { month: 'May', rate: '95%', days: '19/20' },
                      { month: 'April', rate: '100%', days: '22/22' },
                      { month: 'March', rate: '92%', days: '23/25' },
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-surface-raised)', padding: '12px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>{item.month}</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--accent-success)', margin: '4px 0' }}>{item.rate}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.days} Present</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Medical Info Tab */}
            {activeTab === 'medical' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={16} style={{ color: 'var(--accent-danger)' }} /> Medical & Health Profile
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Blood Group</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{student.blood_group || 'O+'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Allergies</span>
                      <strong style={{ color: 'var(--accent-danger)' }}>Peanuts (Severe)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 8, borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Chronic Conditions</span>
                      <strong style={{ color: 'var(--text-primary)' }}>Mild Asthma (Inhaler registered)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingTop: 4 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Vaccination Status</span>
                      <strong style={{ color: 'var(--accent-success)' }}>Fully Up-To-Date</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Guardian Info Tab */}
            {activeTab === 'guardians' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={16} style={{ color: 'var(--accent-primary)' }} /> Primary Guardians Contact Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Father / Guardian 1</div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0' }}>Robert Doe</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Phone: +91 98765 43210</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Email: robert.doe@gmail.com</div>
                    </div>
                    <div style={{ background: 'var(--bg-surface-raised)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Mother / Guardian 2</div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0' }}>Sarah Doe</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Phone: +91 98765 43211</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Email: sarah.doe@gmail.com</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} style={{ color: 'var(--accent-primary)' }} /> Uploaded Student Documents
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'Birth Certificate.pdf', size: '1.4 MB', type: 'Identification' },
                      { name: 'Previous Academic Transfer Certificate.pdf', size: '2.1 MB', type: 'Academic Record' },
                      { name: 'Medical Fitness Certificate.pdf', size: '840 KB', type: 'Medical Record' },
                    ].map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-raised)' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.type} · {doc.size}</div>
                        </div>
                        <button className="btn btn-ghost btn-sm" style={{ border: '1px solid var(--border-subtle)' }}>Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Promotes Student Modal */}
      {activeModal === 'promote' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 440, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Promote {student.first_name} {student.last_name}</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
              Are you sure you want to promote this student to the next academic grade? This will roll over classes and update directories logs.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setActiveModal(null)} disabled={isLoading}>Cancel</button>
              <button className="btn btn-primary" onClick={handlePromoteStudent} disabled={isLoading}>
                {isLoading ? 'Promoting...' : 'Confirm Promotion'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transition Alumni Modal */}
      {activeModal === 'alumni' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 440, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Graduate Student</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
              Are you sure you want to transition {student.first_name} {student.last_name} to **Alumni** status? This marks their account as graduated.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setActiveModal(null)} disabled={isLoading}>Cancel</button>
              <button className="btn btn-primary" onClick={handleTransitionAlumni} disabled={isLoading}>
                {isLoading ? 'Graduating...' : 'Confirm Alumni Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {activeModal === 'add' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 480, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Add New Student Profile</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }} disabled={isLoading}>✕</button>
            </div>
            <form onSubmit={handleAddStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>First Name</label>
                  <input type="text" required value={addStudentForm.firstName} onChange={e => setAddStudentForm({ ...addStudentForm, firstName: e.target.value })} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Last Name</label>
                  <input type="text" required value={addStudentForm.lastName} onChange={e => setAddStudentForm({ ...addStudentForm, lastName: e.target.value })} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Assigned Class</label>
                <select value={addStudentForm.classId} onChange={e => setAddStudentForm({ ...addStudentForm, classId: e.target.value })} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}>
                  <option value="class-10-a">Class 10 A</option>
                  <option value="class-9-a">Class 9 A</option>
                  <option value="class-8-a">Class 8 A</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Parent Email</label>
                <input type="email" required value={addStudentForm.email} onChange={e => setAddStudentForm({ ...addStudentForm, email: e.target.value })} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ padding: 12, marginTop: 8 }}>
                {isLoading ? 'Registering...' : 'Register Student Account'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Parent Message Modal */}
      {activeModal === 'message' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 480, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Message Parent of {student.first_name}</h3>
              <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }} disabled={isLoading}>✕</button>
            </div>
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', background: 'var(--bg-surface-raised)', padding: '10px 14px', borderRadius: 8 }}>
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
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 500, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
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
              <div style={{ background: 'var(--bg-surface-raised)', padding: '10px 14px', borderRadius: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
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

