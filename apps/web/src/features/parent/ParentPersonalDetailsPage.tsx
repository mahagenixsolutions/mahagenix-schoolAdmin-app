import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { 
  useGetParentStudentProfileQuery, 
  useGetParentAttendanceQuery,
  useGetParentFeesQuery
} from './parentApi';

export default function ParentPersonalDetailsPage() {
  const selectedStudent = useSelector((s: RootState) => s.auth.selected_student);
  const studentId = selectedStudent?.id;

  const { data: profile, isLoading: isProfileLoading } = useGetParentStudentProfileQuery({ studentId: studentId! }, { skip: !studentId });
  const { data: attendance } = useGetParentAttendanceQuery({ studentId: studentId! }, { skip: !studentId });
  const { data: fees } = useGetParentFeesQuery({ studentId: studentId! }, { skip: !studentId });

  if (!studentId) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 48 }}>👤</div>
        <h2 style={{ color: '#0f172a', fontWeight: 600 }}>Select Child</h2>
        <p style={{ color: '#64748b' }}>Select a child to view their complete profile.</p>
      </div>
    );
  }

  if (isProfileLoading) {
    return (
      <div className="flex-center" style={{ height: '70vh', flexDirection: 'column', gap: 12 }}>
        <div style={{ width: 44, height: 44, border: '3px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>Loading student records...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const initials = `${selectedStudent.first_name?.[0] || ''}${selectedStudent.last_name?.[0] || ''}`.toUpperCase();
  const paidFees = (fees || []).filter((f: any) => f.status === 'PAID');

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', paddingBottom: 80 }}>
      {/* HEADER */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Student Record Center</h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>
          Complete official records for {selectedStudent.first_name}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        
        {/* 1. PERSONAL INFORMATION */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 24, padding: 24, border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>
              {initials}
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{profile?.first_name} {profile?.last_name}</h2>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2, fontWeight: 500 }}>ID: #{profile?.student_code}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Date of Birth</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{profile?.dob ? new Date(profile.dob).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Residential Address</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2, lineHeight: 1.4 }}>{profile?.address || 'Not registered'}</div>
            </div>
          </div>
        </div>

        {/* 2. ACADEMIC DETAILS */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 24, padding: 24, border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>🎓</span> Academic Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Current Grade & Section</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{profile?.class ? `${profile?.class.name} ${profile?.class.section}` : 'Unassigned'}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Admission Date</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Status</div>
              <div style={{ display: 'inline-block', background: profile?.status === 'ACTIVE' ? 'var(--color-secondary-surface)' : 'var(--color-danger-surface)', color: profile?.status === 'ACTIVE' ? 'var(--color-secondary-dark)' : 'var(--color-danger)', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                {profile?.status || 'Unknown'}
              </div>
            </div>
          </div>
        </div>

        {/* 3. HEALTH & MEDICAL */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 24, padding: 24, border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>🩺</span> Medical Records</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Blood Group</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-danger)', marginTop: 2 }}>{profile?.blood_group || 'Unknown'}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Allergies</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: profile?.allergies ? '#d97706' : 'var(--text-primary)', marginTop: 2 }}>{profile?.allergies || 'None'}</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Medical Conditions</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>{profile?.medical_conditions || 'None recorded'}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Vaccination File</div>
              <button style={{ marginTop: 6, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>View Record</button>
            </div>
          </div>
        </div>

        {/* 4. EMERGENCY & TRANSPORT */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 24, padding: 24, border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>🚌</span> Transport & Emergency</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Emergency Contact</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-danger)', marginTop: 2 }}>{profile?.emergency_contact || 'None specified'}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Authorized Pickup Person</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>John Doe (Father)</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 12, border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Bus Details</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>Route 4A - City Center</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Driver: Mike (555-0192)</div>
            </div>
          </div>
        </div>

        {/* 5. ATTENDANCE & BEHAVIOR SUMMARY */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 24, padding: 24, border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>📊</span> Term Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Total Present Days</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#10b981' }}>{attendance?.summary?.present || 0}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Total Absent Days</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-danger)' }}>{attendance?.summary?.absent || 0}</span>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Term Behavior Rating</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 20, color: '#fbbf24' }}>★</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* 6. FEES & DOCUMENTS */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 24, padding: 24, border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}><span>📁</span> Fee History & Docs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 4 }}>Recent Invoices</div>
            {paidFees.length > 0 ? paidFees.slice(0,2).map((f: any) => (
              <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: 12, borderRadius: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>PAID • ${f.amount}</div>
                </div>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 16 }}>⬇️</button>
              </div>
            )) : (
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>No paid invoices found.</div>
            )}

            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginTop: 8, marginBottom: 4 }}>Official Documents</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: 12, borderRadius: 12, textAlign: 'center', cursor: 'pointer', fontWeight: 600, fontSize: 12, color: 'var(--text-primary)' }}>Report Cards</button>
              <button style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', padding: 12, borderRadius: 12, textAlign: 'center', cursor: 'pointer', fontWeight: 600, fontSize: 12, color: 'var(--text-primary)' }}>Birth Cert</button>
            </div>
          </div>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--text-muted)' }}>
        If any of these records are incorrect, please contact the school administration office to request an update.
      </div>
    </div>
  );
}
