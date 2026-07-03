import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable, Pagination } from '../../components/ui/DataTable';
import { useGetStudentsQuery } from './studentsApi';
import { mockClasses } from '../../mock/classes';
import { useRegisterAIContext } from '../../hooks/useAIContext';

const COLUMNS = [
  {
    key: 'photo_url',
    label: '',
    width: '48px',
    render: (_: unknown, row: Record<string, unknown>) => {
      const initials = `${String(row.first_name || '')[0] || ''}${String(row.last_name || '')[0] || ''}`.toUpperCase();
      return (
        <div className="avatar-fallback" style={{
          width: 34, height: 34, fontSize: 12, fontWeight: 700,
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
          color: 'white',
        }}>
          {initials}
        </div>
      );
    },
  },
  {
    key: 'full_name',
    label: 'Student',
    render: (_: unknown, row: Record<string, unknown>) => (
      <div>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          {String(row.first_name)} {String(row.last_name)}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          #{String(row.student_code || '')} · {String(row.admission_no || '')}
        </div>
      </div>
    ),
  },
  {
    key: 'class',
    label: 'Class',
    render: (_: unknown, row: Record<string, unknown>) => {
      const cls = row.class as { name: string; section: string } | undefined;
      return cls ? (
        <span className="badge badge-primary">{cls.name} {cls.section}</span>
      ) : '—';
    },
  },
  {
    key: 'gender',
    label: 'Gender',
    render: (v: unknown) => (
      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
        {v === 'MALE' ? '👦 Male' : v === 'FEMALE' ? '👧 Female' : '⚧ Other'}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (v: unknown) => (
      <span className={`badge badge-${v === 'ACTIVE' ? 'present' : 'absent'}`}>{String(v)}</span>
    ),
  },
  {
    key: 'parent_relations',
    label: 'Parent',
    render: (v: unknown) => {
      const relations = v as Array<{ parent: { first_name: string; last_name: string } }> | undefined;
      return relations?.[0] ? (
        <span style={{ fontSize: 13 }}>{relations[0].parent.first_name} {relations[0].parent.last_name}</span>
      ) : <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Not linked</span>;
    },
  },
];

export default function StudentsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // Filter states
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ACTIVE');
  const [genderFilter, setGenderFilter] = useState('');

  // Modals & toast states
  const [showImport, setShowImport] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  // Form states
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', gender: 'MALE', classId: 'class-9-a', code: '', email: '' });

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const { data, isLoading } = useGetStudentsQuery({ page, limit: 20, search: search || undefined });

  // Client side filtration matching additional filter inputs
  const filteredStudents = useMemo(() => {
    let list = (data?.data ?? []) as Record<string, unknown>[];
    if (classFilter) {
      list = list.filter((s: any) => s.class_id === classFilter || (s.class && s.class.id === classFilter));
    }
    if (statusFilter) {
      list = list.filter((s: any) => s.status === statusFilter);
    }
    if (genderFilter) {
      list = list.filter((s: any) => s.gender === genderFilter);
    }
    return list;
  }, [data?.data, classFilter, statusFilter, genderFilter]);

  // Push page context to AI assistant
  useRegisterAIContext({
    filters: { classFilter, statusFilter, genderFilter },
    searchValue: search,
    visibleData: filteredStudents,
  });

  const handleImportCSV = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setImportProgress(10);
    
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setShowImport(false);
            setImportProgress(0);
            triggerToast('📊 CSV Import success: 24 students registered!');
          }, 400);
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    triggerToast('⏳ Registering new student record...');
    setTimeout(() => {
      setIsProcessing(false);
      setShowAdd(false);
      triggerToast(`🎉 Student ${newStudent.firstName} ${newStudent.lastName} registered successfully!`);
      setNewStudent({ firstName: '', lastName: '', gender: 'MALE', classId: 'class-9-a', code: '', email: '' });
    }, 1200);
  };

  return (
    <div>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="page-header flex-mobile-col" style={{ gap: 16 }}>
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-subtitle">
            {isLoading ? 'Loading...' : `${filteredStudents.length} students matching criteria`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setShowImport(true)}>
            📥 Import CSV
          </button>
          <button className="btn btn-primary btn-sm" id="add-student-btn" onClick={() => setShowAdd(true)}>
            + Add Student
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ flex: '1 1 auto', minWidth: 160, width: '100%' }}>
              <span className="search-bar-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-muted)">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </span>
              <input
                type="search"
                className="form-input"
                placeholder="Search by name, ID, or admission no..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{ width: '100%', fontSize: 14 }}
              />
            </div>
            <select 
              className="form-select" 
              style={{ width: '100%', flex: '1 1 auto', minWidth: 120 }}
              value={classFilter}
              onChange={(e) => { setClassFilter(e.target.value); setPage(1); }}
            >
              <option value="">All Classes</option>
              {mockClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name} {cls.section}</option>
              ))}
            </select>
            <select 
              className="form-select" 
              style={{ width: '100%', flex: '1 1 auto', minWidth: 120 }}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="TRANSFERRED">Transferred</option>
              <option value="GRADUATED">Graduated</option>
            </select>
            <select 
              className="form-select" 
              style={{ width: '100%', flex: '1 1 auto', minWidth: 120 }}
              value={genderFilter}
              onChange={(e) => { setGenderFilter(e.target.value); setPage(1); }}
            >
              <option value="">All Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={COLUMNS}
        data={filteredStudents}
        loading={isLoading}
        onRowClick={(row) => navigate(`/students/${String((row as { id: string }).id)}`)}
        emptyMessage="No students found matching your criteria. Try adjusting filters."
      />

      {data?.meta && !classFilter && !statusFilter && !genderFilter && (
        <Pagination
          page={page}
          total_pages={data.meta.total_pages}
          onPage={setPage}
        />
      )}

      {/* CSV Import Modal */}
      {showImport && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 450, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Import Students via CSV</h3>
              <button onClick={() => setShowImport(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }} disabled={isProcessing}>✕</button>
            </div>
            <form onSubmit={handleImportCSV} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ border: '2px dashed var(--border-color)', borderRadius: 10, padding: '30px 10px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg-body)' }}>
                <span style={{ fontSize: 32 }}>📁</span>
                <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Select student_list.csv to parse</p>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Supported schema: first_name, last_name, email, gender, roll_code</span>
              </div>
              
              {isProcessing && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)' }}>
                    <span>Uploading & Parsing file...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--border-color)', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${importProgress}%`, background: 'var(--color-primary)', transition: 'width 0.2s' }} />
                  </div>
                </div>
              )}

              <button type="submit" disabled={isProcessing} className="btn btn-primary" style={{ padding: 12 }}>
                {isProcessing ? 'Parsing datasets...' : 'Upload & Process CSV'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 16, width: '90%', maxWidth: 480, padding: 20, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Register New Student Profile</h3>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 18, cursor: 'pointer' }} disabled={isProcessing}>✕</button>
            </div>
            <form onSubmit={handleAddStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="grid-2" style={{ gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>First Name</label>
                  <input type="text" required value={newStudent.firstName} onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} placeholder="Aanya" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Last Name</label>
                  <input type="text" required value={newStudent.lastName} onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} placeholder="Sharma" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Student Email</label>
                <input type="email" required value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} placeholder="aanya.sharma@edutrack.edu" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <div className="grid-2" style={{ gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Class Cohort</label>
                  <select value={newStudent.classId} onChange={e => setNewStudent({ ...newStudent, classId: e.target.value })} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}>
                    {mockClasses.map(c => (
                      <option key={c.id} value={c.id}>{c.name} {c.section}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Gender</label>
                  <select value={newStudent.gender} onChange={e => setNewStudent({ ...newStudent, gender: e.target.value })} style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }}>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Student Code</label>
                <input type="text" required value={newStudent.code} onChange={e => setNewStudent({ ...newStudent, code: e.target.value })} placeholder="STU-009" style={{ padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-body)', color: 'var(--text-primary)' }} />
              </div>
              <button type="submit" disabled={isProcessing} className="btn btn-primary" style={{ padding: 12, marginTop: 8 }}>
                {isProcessing ? 'Registering Student...' : 'Register Student'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

