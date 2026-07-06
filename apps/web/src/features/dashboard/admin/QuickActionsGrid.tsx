import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  { label: 'Mark Attendance', icon: '📋', path: '/attendance', color: '#4F46E5', type: 'navigate' },
  { label: 'Add Student', icon: '👨‍🎓', path: '/students/new', color: '#10B981', type: 'modal', modalType: 'student' },
  { label: 'Upload Marks', icon: '📝', path: '/marks', color: '#F59E0B', type: 'navigate' },
  { label: 'Collect Fee', icon: '💳', path: '/fees/collect', color: '#06B6D4', type: 'modal', modalType: 'fee' },
  { label: 'Add Teacher', icon: '👩‍🏫', path: '/teachers/new', color: '#8B5CF6', type: 'modal', modalType: 'teacher' },
  { label: 'View Reports', icon: '📊', path: '/reports', color: '#EC4899', type: 'navigate' },
  { label: 'Send Notice', icon: '📢', path: '/communication', color: '#F43F5E', type: 'modal', modalType: 'notice' },
  { label: 'Calendar', icon: '📅', path: '/academic-years', color: '#6366F1', type: 'navigate' },
];

export default function QuickActionsGrid() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [studentForm, setStudentForm] = useState({ name: '', email: '', class: 'Class 9 A', code: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', subject: 'Mathematics', code: '' });
  const [feeForm, setFeeForm] = useState({ student: 'Aanya Sharma', term: 'Term 1', concession: 'None', method: 'UPI', amount: '1250' });
  const [noticeForm, setNoticeForm] = useState({ title: '', audience: 'All', priority: 'Medium', channel: 'Portal Notice', message: '' });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (action: typeof ACTIONS[0]) => {
    if (action.type === 'navigate') {
      navigate(action.path);
    } else {
      setActiveModal(action.modalType ?? null);
    }
  };

  const handleRegisterUser = (e: React.FormEvent, type: 'student' | 'teacher') => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast(`⏳ Validating and registering ${type}...`);
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      if (type === 'student') {
        triggerToast(`🎉 Student ${studentForm.name || 'New Student'} registered successfully!`);
        setStudentForm({ name: '', email: '', class: 'Class 9 A', code: '' });
      } else {
        triggerToast(`🎉 Teacher ${teacherForm.name || 'New Teacher'} registered successfully!`);
        setTeacherForm({ name: '', email: '', subject: 'Mathematics', code: '' });
      }
    }, 1500);
  };

  const handleCollectFee = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast(`⚡ Processing payment of $${feeForm.amount} via ${feeForm.method}...`);
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      triggerToast(`✅ Payment of $${feeForm.amount} successfully processed for ${feeForm.student}!`);
      setFeeForm({ student: 'Aanya Sharma', term: 'Term 1', concession: 'None', method: 'UPI', amount: '1250' });
    }, 1500);
  };

  const handleSendNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast(`📢 Preparing notice broadcast to ${noticeForm.audience}...`);
    setTimeout(() => {
      setIsLoading(false);
      setActiveModal(null);
      triggerToast(`🚀 Broadcast sent via ${noticeForm.channel} to all selected recipients!`);
      setNoticeForm({ title: '', audience: 'All', priority: 'Medium', channel: 'Portal Notice', message: '' });
    }, 1500);
  };

  return (
    <div style={{ marginBottom: 24, position: 'relative' }}>
      {/* Dynamic Toast Popup */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999 }}>
          <div style={{ background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Quick Actions</h3>
      
      <div className="grid-4" style={{ gap: 16 }}>
        {ACTIONS.slice(0, 4).map(action => (
          <Button
            key={action.label}
            variant="ghost"
            onClick={() => handleAction(action)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 12,
              padding: '12px 16px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              width: '100%',
              textAlign: 'left'
            }}
          >
            <span style={{ 
              color: 'var(--text-secondary)',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center'
            }}>
              {action.icon}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Modal Dialog */}
      {activeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#fff',
            border: '1px solid var(--border-color)',
            borderRadius: 16,
            width: '90%',
            maxWidth: 500,
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeModal === 'student' && 'Register New Student'}
                {activeModal === 'teacher' && 'Register New Teacher'}
                {activeModal === 'fee' && 'Collect Student Fee Payment'}
                {activeModal === 'notice' && 'Compose Notice Broadcast'}
              </h4>
              <Button variant="ghost" size="icon" onClick={() => setActiveModal(null)} disabled={isLoading}>
                ✕
              </Button>
            </div>

            {/* Form */}
            {activeModal === 'student' && (
              <form onSubmit={(e) => handleRegisterUser(e, 'student')} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={studentForm.name} 
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="e.g. Liam Johnson"
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={studentForm.email} 
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    placeholder="e.g. liam@edutrack.edu"
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Class Cohort</label>
                    <select 
                      value={studentForm.class} 
                      onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    >
                      <option>Class 9 A</option>
                      <option>Class 9 B</option>
                      <option>Class 10 A</option>
                      <option>Class 10 B</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Roll Code</label>
                    <input 
                      type="text" 
                      required
                      value={studentForm.code} 
                      onChange={(e) => setStudentForm({ ...studentForm, code: e.target.value })}
                      placeholder="e.g. STU-902"
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} loading={isLoading} variant="primary" style={{ marginTop: 8, padding: 12 }} fullWidth>
                  {isLoading ? 'Registering Student...' : 'Register Student'}
                </Button>
              </form>
            )}

            {activeModal === 'teacher' && (
              <form onSubmit={(e) => handleRegisterUser(e, 'teacher')} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={teacherForm.name} 
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    placeholder="e.g. Dr. Emily Carter"
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={teacherForm.email} 
                    onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                    placeholder="e.g. emily.carter@edutrack.edu"
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Primary Subject</label>
                    <select 
                      value={teacherForm.subject} 
                      onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    >
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>English Literature</option>
                      <option>Social Studies</option>
                      <option>Computer Science</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Employee ID</label>
                    <input 
                      type="text" 
                      required
                      value={teacherForm.code} 
                      onChange={(e) => setTeacherForm({ ...teacherForm, code: e.target.value })}
                      placeholder="e.g. TCH-042"
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} loading={isLoading} variant="primary" style={{ marginTop: 8, padding: 12 }} fullWidth>
                  {isLoading ? 'Registering Teacher...' : 'Register Teacher'}
                </Button>
              </form>
            )}

            {activeModal === 'fee' && (
              <form onSubmit={handleCollectFee} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Select Student</label>
                  <select 
                    value={feeForm.student} 
                    onChange={(e) => setFeeForm({ ...feeForm, student: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                  >
                    <option>Aanya Sharma (Class 9 A)</option>
                    <option>Rohan Das (Class 9 B)</option>
                    <option>Preeti Nair (Class 10 A)</option>
                    <option>Kabir Malhotra (Class 10 B)</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Term</label>
                    <select 
                      value={feeForm.term} 
                      onChange={(e) => setFeeForm({ ...feeForm, term: e.target.value })}
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    >
                      <option>Term 1</option>
                      <option>Term 2</option>
                      <option>Annual Fee</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Concession</label>
                    <select 
                      value={feeForm.concession} 
                      onChange={(e) => setFeeForm({ ...feeForm, concession: e.target.value })}
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    >
                      <option>None</option>
                      <option>Sibling Discount (10%)</option>
                      <option>Scholarship (25%)</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Payment Mode</label>
                    <select 
                      value={feeForm.method} 
                      onChange={(e) => setFeeForm({ ...feeForm, method: e.target.value })}
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    >
                      <option>UPI</option>
                      <option>Credit/Debit Card</option>
                      <option>Net Banking</option>
                      <option>Cash Receipt</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Amount ($)</label>
                    <input 
                      type="number" 
                      required
                      value={feeForm.amount} 
                      onChange={(e) => setFeeForm({ ...feeForm, amount: e.target.value })}
                      placeholder="1250"
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} loading={isLoading} variant="primary" style={{ marginTop: 8, padding: 12 }} fullWidth>
                  {isLoading ? 'Processing Payment...' : 'Mark as Paid'}
                </Button>
              </form>
            )}

            {activeModal === 'notice' && (
              <form onSubmit={handleSendNotice} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Notice Title</label>
                  <input 
                    type="text" 
                    required 
                    value={noticeForm.title} 
                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    placeholder="e.g. Independence Day Celebration Schedule"
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Target Audience</label>
                    <select 
                      value={noticeForm.audience} 
                      onChange={(e) => setNoticeForm({ ...noticeForm, audience: e.target.value })}
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    >
                      <option>All Stakeholders</option>
                      <option>Teachers Only</option>
                      <option>Parents & Students</option>
                      <option>Class 9 Parents</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Priority</label>
                    <select 
                      value={noticeForm.priority} 
                      onChange={(e) => setNoticeForm({ ...noticeForm, priority: e.target.value })}
                      style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical (Alert)</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Broadcast Channel</label>
                  <select 
                    value={noticeForm.channel} 
                    onChange={(e) => setNoticeForm({ ...noticeForm, channel: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}
                  >
                    <option>Portal Notice</option>
                    <option>Email Broadcast</option>
                    <option>Portal + Email + SMS</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Message Body</label>
                  <textarea 
                    required 
                    rows={4}
                    value={noticeForm.message} 
                    onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
                    placeholder="Type broadcast message details here..."
                    style={{ padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)', resize: 'vertical', fontFamily: 'inherit', fontSize: 13 }}
                  />
                </div>
                <Button type="submit" disabled={isLoading} loading={isLoading} variant="primary" style={{ marginTop: 8, padding: 12 }} fullWidth>
                  {isLoading ? 'Broadcasting Notice...' : 'Schedule Broadcast'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
