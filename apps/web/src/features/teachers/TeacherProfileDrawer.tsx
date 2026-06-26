import { useEffect } from 'react';
import { useGetTeacherProfileQuery } from './teachersApi';

interface DrawerProps {
  teacherId: string | null;
  subjectId: string;
  onClose: () => void;
}

export default function TeacherProfileDrawer({ teacherId, subjectId, onClose }: DrawerProps) {
  const { data: profile, isLoading, isError } = useGetTeacherProfileQuery(
    { teacherId: teacherId!, subjectId },
    { skip: !teacherId }
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!teacherId) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(4px)', zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out'
        }} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 480,
          background: 'var(--bg-secondary)', boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
          zIndex: 1001, overflowY: 'auto', display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          color: 'var(--text-secondary)',
          borderLeft: '1px solid var(--border-color)'
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>Teacher Profile</h2>
          <button 
            onClick={onClose} 
            style={{ 
              padding: '6px 12px', borderRadius: '20px', background: 'var(--bg-tertiary)', 
              border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: 500, color: 'var(--text-primary)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            ✕ Close
          </button>
        </div>

        {isLoading ? (
          <div className="flex-center" style={{ flex: 1, flexDirection: 'column', gap: 16, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner" />
            <p style={{ color: 'var(--text-muted)' }}>Loading profile...</p>
            <style>{`.spinner { width: 40px; height: 40px; border: 3px solid var(--border-color); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : isError || !profile ? (
          <div className="flex-center" style={{ flex: 1, color: '#EF4444', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Failed to load teacher profile.
          </div>
        ) : (
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 32 }}>
            
            {/* Header */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <img src={profile.photoUrl} alt={profile.name} style={{ width: 88, height: 88, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--bg-secondary)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{profile.name}</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: 15, color: 'var(--color-primary-light)', fontWeight: 600 }}>{profile.qualification}</p>
                <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📧 {profile.email}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>📅 Joined: {new Date(profile.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div style={{ background: 'var(--bg-tertiary)', padding: 20, borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--text-muted)', fontWeight: 600 }}>About</h4>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{profile.bio}</p>
              </div>
            )}

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ padding: 20, background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>Experience</div>
                <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6, color: 'var(--text-primary)' }}>{profile.experienceYears} <span style={{fontSize: 14, fontWeight: 500, color: 'var(--text-muted)'}}>Years</span></div>
              </div>
              <div style={{ padding: 20, background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>Leaves Taken</div>
                <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6, color: profile.leavesTaken > 5 ? '#EF4444' : 'var(--text-primary)' }}>{profile.leavesTaken}</div>
              </div>
              <div style={{ padding: 20, background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>Syllabus Completed</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-primary-light)' }}>{profile.syllabusCompleted}%</div>
                </div>
                <div style={{ height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${profile.syllabusCompleted}%`, background: profile.syllabusCompleted === 100 ? 'var(--color-secondary)' : 'var(--color-primary)', borderRadius: 4, transition: 'width 1s ease-in-out' }} />
                </div>
              </div>
            </div>

            {/* Skills */}
            {profile.skills?.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', borderBottom: '2px solid var(--border-color)', paddingBottom: 8 }}>Core Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {profile.skills.map(s => (
                    <span key={s.id} style={{ 
                      padding: '6px 14px', background: 'var(--color-primary-surface)', color: 'var(--color-primary)', 
                      borderRadius: '20px', fontSize: 13, fontWeight: 600, border: '1px solid var(--color-primary-light)' 
                    }}>
                      {s.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {profile.awards?.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', borderBottom: '2px solid var(--border-color)', paddingBottom: 8 }}>Awards & Recognitions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {profile.awards.map(a => (
                    <div key={a.id} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                      <div style={{ fontSize: 28 }}>🏆</div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#f59e0b', fontSize: 15 }}>{a.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>{a.awarded_by} • {new Date(a.awarded_date).getFullYear()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classes Assigned */}
            {profile.classesAssigned?.length > 0 && (
              <div style={{ marginBottom: 40 }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', borderBottom: '2px solid var(--border-color)', paddingBottom: 8 }}>Classes Assigned</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {profile.classesAssigned.map(c => (
                    <span key={c.id} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}
