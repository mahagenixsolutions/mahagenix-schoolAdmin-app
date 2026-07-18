import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSubjectsListQuery } from './subjectsApi';
import { PageSkeleton } from '../../components/ui/Skeleton';

export default function SubjectsPage() {
  const { data: serverSubjects = [], isLoading } = useGetSubjectsListQuery();
  const navigate = useNavigate();

  // Local additions state to render newly created items instantly
  const [localSubjects, setLocalSubjects] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  
  // Modals & feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formColor, setFormColor] = useState('#4F46E5');
  const [formClasses, setFormClasses] = useState('3');
  const [formTeachers, setFormTeachers] = useState('2');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const allSubjects = useMemo(() => {
    return [...serverSubjects, ...localSubjects];
  }, [serverSubjects, localSubjects]);

  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCode.trim()) {
      triggerToast('⚠️ Name and Code are required fields!');
      return;
    }

    setIsProcessing(true);
    triggerToast('⏳ Registering subject into course catalog...');

    setTimeout(() => {
      setIsProcessing(false);
      const newSub = {
        id: `sub-${formCode.toLowerCase()}`,
        name: formName,
        code: formCode.toUpperCase(),
        color: formColor,
        classes: Number(formClasses) || 3,
        teachers: Number(formTeachers) || 2
      };

      setLocalSubjects(prev => [...prev, newSub]);
      setShowAdd(false);
      triggerToast(`🎉 Subject "${formName}" added successfully to school curriculum!`);

      // Clear Form
      setFormName('');
      setFormCode('');
    }, 1200);
  };

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Dynamic Toast Popup */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 440, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Add New Curriculum Subject</h3>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }} disabled={isProcessing}>✕</button>
            </div>
            <form onSubmit={handleAddSubjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Subject Name</label>
                <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="e.g. Organic Chemistry" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Subject Code</label>
                  <input type="text" required value={formCode} onChange={e => setFormCode(e.target.value)} placeholder="e.g. CHEM-302" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Theme Color</label>
                  <input type="color" value={formColor} onChange={e => setFormColor(e.target.value)} style={{ padding: '2px', border: '1px solid var(--border-color)', borderRadius: 8, height: '38px', width: '100%', background: 'var(--bg-body)', cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Assigned Classes</label>
                  <input type="number" required value={formClasses} onChange={e => setFormClasses(e.target.value)} placeholder="3" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Teachers Allocated</label>
                  <input type="number" required value={formTeachers} onChange={e => setFormTeachers(e.target.value)} placeholder="2" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <button type="submit" disabled={isProcessing} className="btn btn-primary" style={{ padding: 12, marginTop: 8 }}>
                {isProcessing ? 'Adding Subject...' : 'Add Subject'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">📚 Subjects</h1>
          <p className="page-subtitle">Manage subjects and teacher assignments</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Subject</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {allSubjects.map((sub: any) => (
          <div 
            key={sub.code} 
            className="card" 
            style={{ overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s ease', border: '1px solid var(--border-color)' }}
            onClick={() => navigate(`/subjects/${sub.id}`)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ height: 6, background: sub.color || 'var(--color-primary)' }} />
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ 
                  width: 44, height: 44, 
                  borderRadius: 'var(--radius-md)', 
                  background: (sub.color || '#4F46E5') + '20', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: sub.color || 'var(--color-primary)', 
                  fontWeight: 800, fontSize: 13 
                }}>
                  {sub.code}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{sub.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sub.code}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
                <span>🏫 {sub.classes} classes</span>
                <span>👩‍🏫 {sub.teachers} teachers</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

