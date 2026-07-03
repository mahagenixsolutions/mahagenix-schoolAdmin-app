import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store';
import {
  useGetParentStudentProfileQuery,
  useGetParentAttendanceQuery,
  useGetParentHomeworkQuery,
  useGetParentFeesQuery,
  useGetParentAiInsightsQuery,
  useGetParentRankingsQuery,
  useGetParentProgressQuery,
} from './parentApi';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const selectedStudent = useSelector((s: RootState) => s.auth.selected_student);
  const studentId = selectedStudent?.id;

  // Fetch data
  const { isLoading: isProfileLoading } = useGetParentStudentProfileQuery(
    { studentId: studentId! },
    { skip: !studentId }
  );
  const { data: attendance, isLoading: isAttendanceLoading } = useGetParentAttendanceQuery(
    { studentId: studentId! },
    { skip: !studentId }
  );
  const { data: homework, isLoading: isHomeworkLoading } = useGetParentHomeworkQuery(
    { studentId: studentId! },
    { skip: !studentId }
  );
  const { data: fees, isLoading: isFeesLoading } = useGetParentFeesQuery(
    { studentId: studentId! },
    { skip: !studentId }
  );
  const { data: aiInsights, isLoading: isAiInsightsLoading } = useGetParentAiInsightsQuery(
    { studentId: studentId! },
    { skip: !studentId }
  );
  const { isLoading: isRankingsLoading } = useGetParentRankingsQuery(
    { studentId: studentId! },
    { skip: !studentId }
  );
  const { isLoading: isProgressLoading } = useGetParentProgressQuery(
    { studentId: studentId! },
    { skip: !studentId }
  );

  // Quick Action Panel State
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState<any | null>(null);
  const [showHomeworkModal, setShowHomeworkModal] = useState<any | null>(null);

  if (!studentId) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>👨‍👩‍👧</div>
        <h2 style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Welcome to Parent Portal</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Please select a child profile from the top-left switcher to continue.</p>
      </div>
    );
  }

  const isAnyLoading =
    isProfileLoading || isAttendanceLoading || isHomeworkLoading ||
    isFeesLoading || isAiInsightsLoading || isRankingsLoading || isProgressLoading;

  if (isAnyLoading) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 12 }}>
        <div style={{ width: 44, height: 44, border: '3px solid var(--border-color)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>Loading dashboard...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Calculate Data for the Hero Banner
  const attRate = attendance?.summary?.rate ?? 0;
  const isPresentToday = attendance?.latest?.status === 'PRESENT';
  
  const pendingHomework = (homework || []).filter((h: any) => h.status !== 'COMPLETED');
  const pendingFees = (fees || []).filter((f: any) => f.status === 'PENDING');
  const actionItemsCount = pendingHomework.length + pendingFees.length;

  const initials = `${selectedStudent?.first_name?.[0] || ''}${selectedStudent?.last_name?.[0] || ''}`.toUpperCase();

  // Mock Notices & Events for now (In a real app, these would come from the API)
  const notices = [
    { id: 1, type: 'ALERT', title: 'Early Dismissal Tomorrow', desc: 'School will close at 12:30 PM due to weather.' },
    { id: 2, type: 'INFO', title: 'Annual Sports Day Registration', desc: 'Please submit the consent form by Friday.' }
  ];

  const upcomingEvents = [
    { id: 1, date: 'Oct 15', title: 'Mathematics Unit Test', type: 'EXAM' },
    { id: 2, date: 'Oct 18', title: 'Diwali Break Begins', type: 'HOLIDAY' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 80, maxWidth: 800, margin: '0 auto', position: 'relative' }}>
      
      {/* 1. HERO CARD */}
      <div style={{ 
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        borderRadius: 24, padding: 24, boxShadow: 'var(--glass-shadow)', border: '1px solid var(--glass-border)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
              {initials}
            </div>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {selectedStudent?.first_name || 'Student'} {selectedStudent?.last_name || ''}
              </h1>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0 0', fontWeight: 500 }}>
                Grade {selectedStudent?.class?.name || 'N/A'} {selectedStudent?.class?.section || ''}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-mobile-col" style={{ gap: 12, marginTop: 24 }}>
          <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '16px 12px', borderRadius: 16, textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🏫</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>{isPresentToday ? 'Present' : 'Absent'}</div>
            <div style={{ fontSize: 11, color: '#10B981', fontWeight: 600, marginTop: 2 }}>{attRate}% Overall</div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '16px 12px', borderRadius: 16, textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>📈</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>Growth</div>
            <div style={{ fontSize: 11, color: '#3B82F6', fontWeight: 600, marginTop: 2 }}>On Track</div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-secondary)', padding: '16px 12px', borderRadius: 16, textAlign: 'center', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🌟</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>Behavior</div>
            <div style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600, marginTop: 2 }}>Excellent</div>
          </div>
        </div>
      </div>

      {/* 2. ACTION CENTER */}
      {actionItemsCount > 0 && (
        <div className="flex-mobile-col" style={{ gap: 8 }}>
          {pendingFees.map((fee: any) => (
            <div key={fee.id} style={{ background: 'var(--alert-danger-bg)', border: '1px solid var(--alert-danger-border)', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24 }}>💳</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--alert-danger-text)' }}>${fee.amount} Fee Overdue</div>
                <div style={{ fontSize: 13, color: 'var(--alert-danger-text)', opacity: 0.9 }}>{fee.title} is pending.</div>
              </div>
              <button style={{ padding: '6px 12px', background: 'var(--color-danger)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: 'pointer' }} onClick={() => setShowPaymentModal(fee)}>Pay Now</button>
            </div>
          ))}
          {pendingHomework.map((hw: any) => (
            <div key={hw.id} style={{ background: 'var(--alert-warning-bg)', border: '1px solid var(--alert-warning-border)', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ fontSize: 24 }}>📝</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--alert-warning-text)' }}>{hw.homework?.subject?.name} Homework</div>
                <div style={{ fontSize: 13, color: 'var(--alert-warning-text)', opacity: 0.9 }}>Due tomorrow.</div>
              </div>
              <button style={{ padding: '6px 12px', background: 'var(--color-warning)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: 'pointer' }} onClick={() => setShowHomeworkModal(hw)}>View</button>
            </div>
          ))}
        </div>
      )}

      {/* 3. TODAY'S SUMMARY & WELLBEING */}
      <div className="grid-2" style={{ gap: 16 }}>
        <div style={{ background: 'var(--bg-surface)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>😊</span> Mood Today</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 32 }}>😁</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Energetic</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Active in classes</div>
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--bg-surface)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>🎯</span> Focus</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 32 }}>⭐</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Sharp</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Completed all tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TRANSPORT / BUS TRACKING */}
      <div style={{ background: 'var(--transport-bg)', borderRadius: 24, padding: 20, border: '1px solid var(--transport-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.1 }}>🚌</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--transport-header)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🚌</span> School Bus - Route 4A
            </h3>
            <div style={{ fontSize: 13, color: 'var(--transport-text)', fontWeight: 500 }}>Status: <span style={{ fontWeight: 800 }}>On Time</span></div>
          </div>
          <button style={{ background: '#10b981', color: 'white', padding: '8px 16px', borderRadius: 16, border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }} onClick={() => window.dispatchEvent(new Event('open-bus-tracker'))}>
            Track Live
          </button>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 16, position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--transport-header)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>ETA Home</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--transport-text-dark)' }}>3:45 PM</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--transport-header)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Driver</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--transport-text-dark)' }}>Mike (📞 Call)</div>
          </div>
        </div>
      </div>

      {/* 5. SCHOOL NOTICES & EVENTS */}
      <div className="grid-2" style={{ gap: 16 }}>
        {/* Notices */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: 24, padding: 20, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>📢</span> School Notices</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {notices.map((n) => (
              <div key={n.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 20 }}>{n.type === 'ALERT' ? '🔴' : '🔵'}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{n.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: 24, padding: 20, boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>📅</span> Upcoming</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcomingEvents.map((e) => (
              <div key={e.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '6px', borderRadius: 8, textAlign: 'center', minWidth: 44 }}>
                  <div style={{ fontSize: 10, color: '#3b82f6', fontWeight: 800, textTransform: 'uppercase' }}>{e.date.split(' ')[0]}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{e.date.split(' ')[1]}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{e.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. AI INSIGHTS */}
      <div style={{ background: 'var(--ai-insights-bg)', border: '1px solid var(--ai-insights-border)', borderRadius: 20, padding: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 20 }}>✨</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ai-insights-text)' }}>AI Insights</span>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ai-insights-body)', fontWeight: 500 }}>
          {aiInsights?.summary || `Your child actively participated in class this week and showed strong improvement in Mathematics. Attendance remains excellent. Encourage reading activities at home.`}
        </div>
      </div>

      {/* FLOATING QUICK ACTIONS */}
      <div style={{ position: 'fixed', bottom: 84, right: 20, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
        {showQuickActions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 'slideUp 0.2s ease-out' }}>
            <button onClick={() => { navigate('/messages'); setShowQuickActions(false); }} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 24, padding: '8px 16px', boxShadow: 'var(--shadow-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span>💬</span> Message Teacher
            </button>
            <button onClick={() => { navigate('/profile'); setShowQuickActions(false); }} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 24, padding: '8px 16px', boxShadow: 'var(--shadow-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span>💳</span> Pay Fees
            </button>
            <button onClick={() => { window.dispatchEvent(new Event('open-bus-tracker')); setShowQuickActions(false); }} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 24, padding: '8px 16px', boxShadow: 'var(--shadow-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span>🚌</span> Track Bus
            </button>
            <button onClick={() => { navigate('/timeline'); setShowQuickActions(false); }} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 24, padding: '8px 16px', boxShadow: 'var(--shadow-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span>📄</span> Report Card
            </button>
          </div>
        )}
        <button 
          onClick={() => setShowQuickActions(!showQuickActions)}
          style={{ 
            width: 56, height: 56, borderRadius: '50%', background: '#3b82f6', color: 'white', 
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)', cursor: 'pointer', fontSize: 24,
            transition: 'transform 0.2s', transform: showQuickActions ? 'rotate(45deg)' : 'none'
          }}
        >
          +
        </button>
        <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>

      {/* MOCK PAYMENT MODAL */}
      {showPaymentModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 32, borderRadius: 24, maxWidth: 400, width: '90%', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Payment Method</h3>
              <button onClick={() => setShowPaymentModal(null)} style={{ border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontWeight: 800 }}>✕</button>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Paying for</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{showPaymentModal.title}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#16a34a', marginTop: 8 }}>${showPaymentModal.amount}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button style={{ padding: 16, borderRadius: 16, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <span style={{ fontSize: 24 }}>💳</span> <span style={{ fontWeight: 600 }}>Credit / Debit Card</span>
              </button>
              <button style={{ padding: 16, borderRadius: 16, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <span style={{ fontSize: 24 }}>🏦</span> <span style={{ fontWeight: 600 }}>Net Banking</span>
              </button>
              <button style={{ padding: 16, borderRadius: 16, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <span style={{ fontSize: 24 }}>📱</span> <span style={{ fontWeight: 600 }}>UPI / Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOCK HOMEWORK MODAL */}
      {showHomeworkModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 32, borderRadius: 24, maxWidth: 500, width: '90%', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{showHomeworkModal.homework?.subject?.name} Homework</h3>
                <div style={{ fontSize: 13, color: '#d97706', fontWeight: 600, marginTop: 4 }}>Due Tomorrow</div>
              </div>
              <button onClick={() => setShowHomeworkModal(null)} style={{ border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', fontWeight: 800 }}>✕</button>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 20, borderRadius: 16, border: '1px solid var(--border-color)', marginBottom: 24 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: 14 }}>{showHomeworkModal.homework?.title || 'Assignment Details'}</h4>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {showHomeworkModal.homework?.description || 'Please complete exercises 1 to 5 from chapter 4. Make sure to show all your work.'}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setShowHomeworkModal(null)} style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>Close</button>
              <button onClick={() => { alert('Homework marked as completed!'); setShowHomeworkModal(null); }} style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: '#3b82f6', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Mark Completed</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
