import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { StatusBadge } from '../../components/erp/StatusBadge';
import {
  Building,
  Calendar,
  BookOpen,
  Book,
  Layers,
  Shield,
  Lock,
  Users,
  Cpu,
  Database,
  Clock,
  Plus,
  Search,
  Trash2,
  X,
  Save,
  Link
} from 'lucide-react';

// Type definitions
interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Upcoming' | 'Archived';
}

interface ClassItem {
  id: string;
  name: string;
  section: string;
  capacity: number;
  room: string;
}

interface SubjectItem {
  id: string;
  name: string;
  code: string;
  category: 'Science' | 'Languages' | 'Mathematics' | 'Humanities' | 'Arts';
  hours: number;
}

interface Department {
  id: string;
  name: string;
  hod: string;
  count: number;
  status: 'Active' | 'Inactive';
}

interface SystemRole {
  id: string;
  name: string;
  description: string;
  userCount: number;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Suspended';
}

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  category: string;
}

interface BackupFile {
  id: string;
  filename: string;
  date: string;
  size: string;
  status: 'Success' | 'Failed';
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  date: string;
  ip: string;
}

const SettingsPage: React.FC = () => {
  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState<
    | 'profile'
    | 'academic'
    | 'classes'
    | 'subjects'
    | 'departments'
    | 'roles'
    | 'permissions'
    | 'users'
    | 'integrations'
    | 'backup'
    | 'audit'
  >('profile');

  // --- Search & Filters ---
  const [classSearch, setClassSearch] = useState('');
  const [subjectSearch, setSubjectSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [auditSearch, setAuditSearch] = useState('');

  // --- Modals State ---
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);

  // --- Form Inputs ---
  const [newYear, setNewYear] = useState<{
    name: string;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Upcoming' | 'Archived';
  }>({ name: '', startDate: '', endDate: '', status: 'Upcoming' });
  const [newClass, setNewClass] = useState({ name: '', section: '', capacity: '', room: '' });
  const [newSubject, setNewSubject] = useState({ name: '', code: '', category: 'Mathematics' as const, hours: '' });
  const [newDept, setNewDept] = useState({ name: '', hod: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Teacher' });

  // --- Notification Banner ---
  const [bannerMsg, setBannerMsg] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const triggerBanner = (text: string, type: 'success' | 'info' = 'success') => {
    setBannerMsg({ text, type });
    setTimeout(() => setBannerMsg(null), 3000);
  };

  // --- School Profile state ---
  const [schoolProfile, setSchoolProfile] = useState({
    name: 'EduTrack International Academy',
    code: 'ETA-2026',
    email: 'info@edutrackacademy.edu',
    phone: '+1 (555) 234-5678',
    address: '450 Innovation Way, Silicon Valley, CA',
    principal: 'Dr. Alice Smith'
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerBanner('School profile configurations saved successfully!');
  };

  // --- Mock Database / States ---
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([
    { id: 'AY001', name: 'Academic Year 2025-2026', startDate: '2025-08-01', endDate: '2026-06-15', status: 'Active' },
    { id: 'AY002', name: 'Academic Year 2026-2027', startDate: '2026-08-01', endDate: '2027-06-15', status: 'Upcoming' },
    { id: 'AY003', name: 'Academic Year 2024-2025', startDate: '2024-08-01', endDate: '2025-06-15', status: 'Archived' },
  ]);

  const [classes, setClasses] = useState<ClassItem[]>([
    { id: 'CLS001', name: 'Grade 9', section: 'A', capacity: 35, room: 'Room 201' },
    { id: 'CLS002', name: 'Grade 9', section: 'B', capacity: 32, room: 'Room 202' },
    { id: 'CLS003', name: 'Grade 10', section: 'A', capacity: 30, room: 'Room 301' },
    { id: 'CLS004', name: 'Grade 11', section: 'Science', capacity: 25, room: 'Physics Lab' },
  ]);

  const [subjects, setSubjects] = useState<SubjectItem[]>([
    { id: 'SUB001', name: 'Algebra II', code: 'MATH-301', category: 'Mathematics', hours: 5 },
    { id: 'SUB002', name: 'Organic Chemistry', code: 'CHEM-402', category: 'Science', hours: 4 },
    { id: 'SUB003', name: 'English Literature', code: 'ENGL-201', category: 'Languages', hours: 4 },
    { id: 'SUB004', name: 'World History', code: 'HIST-102', category: 'Humanities', hours: 3 },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: 'DEP001', name: 'Academic', hod: 'Dr. Alice Smith', count: 42, status: 'Active' },
    { id: 'DEP002', name: 'Administration', hod: 'Robert Dow', count: 15, status: 'Active' },
    { id: 'DEP003', name: 'IT Infrastructure', hod: 'David Kim', count: 8, status: 'Active' },
    { id: 'DEP004', name: 'Finance & Accounts', hod: 'Elena Rostova', count: 6, status: 'Active' },
  ]);

  const [roles] = useState<SystemRole[]>([
    { id: 'ROL001', name: 'SUPER_ADMIN', description: 'Complete system access, multi-tenant billing, and server settings control.', userCount: 2 },
    { id: 'ROL002', name: 'SCHOOL_ADMIN', description: 'School profile configurations, roles & permissions mapping, and full database audits.', userCount: 4 },
    { id: 'ROL003', name: 'PRINCIPAL', description: 'Academic management, HR review approvals, and school analytics insight.', userCount: 1 },
    { id: 'ROL004', name: 'TEACHER', description: 'Add results, track subject progress, student verification, and attendance marking.', userCount: 42 },
    { id: 'ROL005', name: 'STUDENT', description: 'View results, study material catalog, exam schedules, and attendance charts.', userCount: 850 },
    { id: 'ROL006', name: 'PARENT', description: 'View student performance, pay outstanding fees, and log notifications.', userCount: 1200 },
  ]);

  // --- Permissions Matrix state ---
  const [permissionsMatrix, setPermissionsMatrix] = useState<Record<string, string[]>>({
    SCHOOL_ADMIN: ['view_students', 'edit_students', 'manage_academics', 'manage_payroll', 'configure_settings', 'view_audits'],
    PRINCIPAL: ['view_students', 'edit_students', 'manage_academics', 'manage_payroll', 'view_audits'],
    TEACHER: ['view_students', 'manage_academics'],
    STUDENT: ['view_students'],
  });

  const handleTogglePermission = (role: string, permissionKey: string) => {
    setPermissionsMatrix(prev => {
      const activePerms = prev[role] || [];
      const updatedPerms = activePerms.includes(permissionKey)
        ? activePerms.filter(k => k !== permissionKey)
        : [...activePerms, permissionKey];
      return { ...prev, [role]: updatedPerms };
    });
  };

  const [users, setUsers] = useState<SystemUser[]>([
    { id: 'USR001', name: 'Dr. Alice Smith', email: 'alice.smith@school.edu', role: 'Principal', status: 'Active' },
    { id: 'USR002', name: 'Robert Dow', email: 'robert.dow@school.edu', role: 'SCHOOL_ADMIN', status: 'Active' },
    { id: 'USR003', name: 'Sarah Jenkins', email: 'sarah.j@school.edu', role: 'HR Lead', status: 'Active' },
    { id: 'USR004', name: 'Michael Chang', email: 'm.chang@school.edu', role: 'Teacher', status: 'Active' },
    { id: 'USR005', name: 'Elena Rostova', email: 'e.rostova@school.edu', role: 'Teacher', status: 'Suspended' },
  ]);

  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    { id: 'INT001', name: 'Stripe Payment Gateway', description: 'Accept credit card payments for school fees and activities.', connected: true, category: 'Finance' },
    { id: 'INT002', name: 'Twilio SMS Gateway', description: 'Send automated text notifications for student attendance and reminders.', connected: true, category: 'Communication' },
    { id: 'INT003', name: 'Zoom Integration', description: 'Schedule and host virtual classroom sessions directly from calendar.', connected: false, category: 'Academia' },
    { id: 'INT004', name: 'Google Classroom', description: 'Sync curriculum homework and course files with school drives.', connected: false, category: 'Academia' },
  ]);

  const [backups, setBackups] = useState<BackupFile[]>([
    { id: 'BKP001', filename: 'full_db_backup_20260615.sql', date: '2026-06-15 03:00', size: '24.2 MB', status: 'Success' },
    { id: 'BKP002', filename: 'full_db_backup_20260630.sql', date: '2026-06-30 03:00', size: '24.8 MB', status: 'Success' },
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    { id: 'AUD001', user: 'Robert Dow', action: 'Update School Profile', target: 'School Settings', date: '2026-07-02 11:15', ip: '192.168.1.45' },
    { id: 'AUD002', user: 'Sarah Jenkins', action: 'Suspend Account', target: 'User: Elena Rostova', date: '2026-07-01 16:30', ip: '192.168.1.12' },
    { id: 'AUD003', user: 'Robert Dow', action: 'Connect Integration', target: 'Twilio SMS Service', date: '2026-06-29 10:20', ip: '192.168.1.45' },
    { id: 'AUD004', user: 'Dr. Alice Smith', action: 'Create Academic Year', target: 'AY 2026-2027', date: '2026-06-28 09:00', ip: '192.168.1.2' },
  ]);

  // --- Simulated Backup Engine ---
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleGenerateBackup = () => {
    if (isBackingUp) return;
    setIsBackingUp(true);
    setBackupProgress(0);

    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const id = `BKP${String(backups.length + 1).padStart(3, '0')}`;
            const time = new Date().toISOString().replace('T', ' ').substring(0, 16);
            const newBkp: BackupFile = {
              id,
              filename: `full_db_backup_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.sql`,
              date: time,
              size: '25.1 MB',
              status: 'Success',
            };
            setBackups([newBkp, ...backups]);
            setIsBackingUp(false);
            triggerBanner('Database backup archive generated successfully!');
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // --- Mutators ---
  const handleAddYear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newYear.name || !newYear.startDate || !newYear.endDate) return;
    const id = `AY${String(academicYears.length + 1).padStart(3, '0')}`;
    
    // If setting to active, archiving current ones
    let updatedYears = [...academicYears];
    if (newYear.status === 'Active') {
      updatedYears = updatedYears.map(y => ({ ...y, status: y.status === 'Active' ? 'Archived' : y.status }));
    }

    const yr: AcademicYear = {
      id,
      name: newYear.name,
      startDate: newYear.startDate,
      endDate: newYear.endDate,
      status: newYear.status,
    };
    setAcademicYears([yr, ...updatedYears]);
    setNewYear({ name: '', startDate: '', endDate: '', status: 'Upcoming' });
    setShowAddYearModal(false);
    triggerBanner('Academic Year created successfully!');
  };

  const handleSetActiveYear = (id: string) => {
    setAcademicYears(prev => prev.map(y => {
      if (y.id === id) return { ...y, status: 'Active' };
      if (y.status === 'Active') return { ...y, status: 'Archived' };
      return y;
    }));
    triggerBanner('Active academic year updated.');
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.name || !newClass.section || !newClass.capacity) return;
    const id = `CLS${String(classes.length + 1).padStart(3, '0')}`;
    const cls: ClassItem = {
      id,
      name: newClass.name,
      section: newClass.section,
      capacity: Number(newClass.capacity),
      room: newClass.room || 'TBD',
    };
    setClasses([...classes, cls]);
    setNewClass({ name: '', section: '', capacity: '', room: '' });
    setShowAddClassModal(false);
    triggerBanner('New Grade Class registered.');
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    triggerBanner('Class deleted successfully.', 'info');
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.name || !newSubject.code || !newSubject.hours) return;
    const id = `SUB${String(subjects.length + 1).padStart(3, '0')}`;
    const sub: SubjectItem = {
      id,
      name: newSubject.name,
      code: newSubject.code,
      category: newSubject.category,
      hours: Number(newSubject.hours),
    };
    setSubjects([...subjects, sub]);
    setNewSubject({ name: '', code: '', category: 'Mathematics', hours: '' });
    setShowAddSubjectModal(false);
    triggerBanner('Academic subject created.');
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
    triggerBanner('Subject deleted.', 'info');
  };

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDept.name || !newDept.hod) return;
    const id = `DEP${String(departments.length + 1).padStart(3, '0')}`;
    const dept: Department = {
      id,
      name: newDept.name,
      hod: newDept.hod,
      count: 0,
      status: 'Active',
    };
    setDepartments([...departments, dept]);
    setNewDept({ name: '', hod: '' });
    setShowAddDeptModal(false);
    triggerBanner('New organization department created.');
  };

  const handleToggleDeptStatus = (id: string) => {
    setDepartments(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d));
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
    triggerBanner('User account access status updated.');
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const id = `USR${String(users.length + 1).padStart(3, '0')}`;
    const usr: SystemUser = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'Active',
    };
    setUsers([...users, usr]);
    setNewUser({ name: '', email: '', role: 'Teacher' });
    setShowInviteUserModal(false);
    triggerBanner(`Invitation email sent to ${newUser.email}`);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.connected;
        triggerBanner(`${item.name} has been ${nextState ? 'connected' : 'disconnected'}.`);
        return { ...item, connected: nextState };
      }
      return item;
    }));
  };

  // --- Filtering Logic ---
  const filteredClasses = classes.filter(c => {
    return c.name.toLowerCase().includes(classSearch.toLowerCase()) || c.section.toLowerCase().includes(classSearch.toLowerCase()) || c.room.toLowerCase().includes(classSearch.toLowerCase());
  });

  const filteredSubjects = subjects.filter(s => {
    return s.name.toLowerCase().includes(subjectSearch.toLowerCase()) || s.code.toLowerCase().includes(subjectSearch.toLowerCase()) || s.category.toLowerCase().includes(subjectSearch.toLowerCase());
  });

  const filteredUsers = users.filter(u => {
    return u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()) || u.role.toLowerCase().includes(userSearch.toLowerCase());
  });

  const filteredAudits = auditLogs.filter(log => {
    return log.user.toLowerCase().includes(auditSearch.toLowerCase()) || log.action.toLowerCase().includes(auditSearch.toLowerCase()) || log.target.toLowerCase().includes(auditSearch.toLowerCase());
  });

  // --- Columns Definitions ---
  const classColumns: GridColumn<ClassItem>[] = [
    { key: 'name', header: 'Class Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
    { key: 'section', header: 'Section' },
    { key: 'capacity', header: 'Capacity' },
    { key: 'room', header: 'Room Number' },
  ];

  const subjectColumns: GridColumn<SubjectItem>[] = [
    { key: 'code', header: 'Code', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.code}</span> },
    { key: 'name', header: 'Subject Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
    { key: 'category', header: 'Category' },
    { key: 'hours', header: 'Weekly Periods' },
  ];

  const userColumns: GridColumn<SystemUser>[] = [
    { key: 'name', header: 'Full Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
    { key: 'email', header: 'Email Address' },
    { key: 'role', header: 'Security Role', render: (row) => <StatusBadge status="neutral" label={row.role} /> },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status === 'Active' ? 'success' : 'danger'} label={row.status} />
    }
  ];

  const backupColumns: GridColumn<BackupFile>[] = [
    { key: 'filename', header: 'Archive File Name', render: (row) => <span style={{ fontWeight: 600 }}>{row.filename}</span> },
    { key: 'date', header: 'Created Date' },
    { key: 'size', header: 'Storage Size' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status === 'Success' ? 'success' : 'danger'} label={row.status} />
    }
  ];

  const auditColumns: GridColumn<AuditLog>[] = [
    { key: 'date', header: 'Timestamp' },
    { key: 'user', header: 'Administrator', render: (row) => <div style={{ fontWeight: 600 }}>{row.user}</div> },
    { key: 'action', header: 'Action Event', render: (row) => <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{row.action}</span> },
    { key: 'target', header: 'Target Subject' },
    { key: 'ip', header: 'IP Address', render: (row) => <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{row.ip}</span> },
  ];

  // --- Sub-renderers ---
  const renderProfileTab = () => (
    <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '540px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="modal-form-group">
          <label>School Name</label>
          <input type="text" required value={schoolProfile.name} onChange={e => setSchoolProfile({ ...schoolProfile, name: e.target.value })} />
        </div>
        <div className="modal-form-group">
          <label>School Code ID</label>
          <input type="text" required value={schoolProfile.code} onChange={e => setSchoolProfile({ ...schoolProfile, code: e.target.value })} />
        </div>
      </div>
      <div className="modal-form-group">
        <label>Principal Principal Officer</label>
        <input type="text" required value={schoolProfile.principal} onChange={e => setSchoolProfile({ ...schoolProfile, principal: e.target.value })} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="modal-form-group">
          <label>Inquiry Email</label>
          <input type="email" required value={schoolProfile.email} onChange={e => setSchoolProfile({ ...schoolProfile, email: e.target.value })} />
        </div>
        <div className="modal-form-group">
          <label>Contact Phone</label>
          <input type="text" required value={schoolProfile.phone} onChange={e => setSchoolProfile({ ...schoolProfile, phone: e.target.value })} />
        </div>
      </div>
      <div className="modal-form-group">
        <label>Mailing Address</label>
        <input type="text" required value={schoolProfile.address} onChange={e => setSchoolProfile({ ...schoolProfile, address: e.target.value })} />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, fontSize: '13px', width: 'fit-content', marginTop: '12px' }}
      >
        <Save size={16} /> Save Profile Configs
      </button>
    </form>
  );

  const renderAcademicTab = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>School Academic Calendar Terms</h3>
        <button
          onClick={() => setShowAddYearModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Add Term / Year
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {academicYears.map(year => (
          <div key={year.id} className="dashboard-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: year.status === 'Active' ? '3px solid var(--accent-success)' : '3px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{year.name}</span>
              <StatusBadge status={year.status === 'Active' ? 'success' : year.status === 'Upcoming' ? 'info' : 'neutral'} label={year.status} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Period: <span style={{ fontWeight: 600 }}>{year.startDate}</span> to <span style={{ fontWeight: 600 }}>{year.endDate}</span>
            </div>
            {year.status !== 'Active' && (
              <button
                onClick={() => handleSetActiveYear(year.id)}
                style={{ alignSelf: 'flex-end', border: '1px solid var(--border-subtle)', background: 'none', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
              >
                Set Active
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const renderClassesTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search classes catalog..."
            value={classSearch}
            onChange={(e) => setClassSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddClassModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Add Grade Class
        </button>
      </div>

      <DataGrid
        columns={classColumns}
        data={filteredClasses}
        keyField="id"
        actions={(row) => (
          <button
            onClick={() => handleDeleteClass(row.id)}
            style={{ border: 'none', background: 'none', color: 'var(--accent-danger)', cursor: 'pointer', padding: '6px' }}
            title="Delete class"
          >
            <Trash2 size={16} />
          </button>
        )}
      />
    </>
  );

  const renderSubjectsTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search subjects..."
            value={subjectSearch}
            onChange={(e) => setSubjectSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddSubjectModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Add Subject
        </button>
      </div>

      <DataGrid
        columns={subjectColumns}
        data={filteredSubjects}
        keyField="id"
        actions={(row) => (
          <button
            onClick={() => handleDeleteSubject(row.id)}
            style={{ border: 'none', background: 'none', color: 'var(--accent-danger)', cursor: 'pointer', padding: '6px' }}
            title="Delete subject"
          >
            <Trash2 size={16} />
          </button>
        )}
      />
    </>
  );

  const renderDepartmentsTab = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>School Departments</h3>
        <button
          onClick={() => setShowAddDeptModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {departments.map(dept => (
          <div key={dept.id} className="dashboard-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '3px solid var(--accent-violet)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{dept.name}</span>
              <StatusBadge status={dept.status === 'Active' ? 'success' : 'neutral'} label={dept.status} />
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>Head of Dept: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.hod}</span></div>
              <div>Associated Staff: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.count}</span></div>
            </div>
            <button
              onClick={() => handleToggleDeptStatus(dept.id)}
              style={{ alignSelf: 'flex-end', border: '1px solid var(--border-subtle)', background: 'none', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              Toggle Status
            </button>
          </div>
        ))}
      </div>
    </>
  );

  const renderRolesTab = () => (
    <>
      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>System Roles Configuration</h3>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>Roles define default security permission scopes across the portal.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {roles.map(r => (
          <div key={r.id} className="dashboard-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{r.description}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{r.userCount} associated users</span>
              <StatusBadge status="neutral" label="Default Role" />
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderPermissionsTab = () => {
    const caps = [
      { key: 'view_students', name: 'View student profile and records' },
      { key: 'edit_students', name: 'Edit student profiles / results data' },
      { key: 'manage_academics', name: 'Create term schedules, classes, subjects' },
      { key: 'manage_payroll', name: 'Process disbursals & view payroll reports' },
      { key: 'configure_settings', name: 'Modify school profile / backups' },
      { key: 'view_audits', name: 'Audit log ledger inspection' },
    ];

    const targetRoles = ['SCHOOL_ADMIN', 'PRINCIPAL', 'TEACHER', 'STUDENT'];

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Security Permissions Matrix</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Toggle default capability scopes mapped across user roles.</p>
          </div>
          <button
            onClick={() => triggerBanner('Permissions Matrix configurations updated.')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
          >
            Save Matrix Settings
          </button>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginTop: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>System Capability</th>
                {targetRoles.map(role => (
                  <th key={role} style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>
                    {role.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {caps.map(cap => (
                <tr key={cap.key} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {cap.name}
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace', marginTop: '2px' }}>{cap.key}</div>
                  </td>
                  {targetRoles.map(role => {
                    const hasPerm = (permissionsMatrix[role] || []).includes(cap.key);
                    return (
                      <td key={role} style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={hasPerm}
                          onChange={() => handleTogglePermission(role, cap.key)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderUsersTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search accounts catalog..."
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowInviteUserModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Invite User
        </button>
      </div>

      <DataGrid
        columns={userColumns}
        data={filteredUsers}
        keyField="id"
        actions={(row) => (
          <button
            onClick={() => handleToggleUserStatus(row.id)}
            style={{
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
              color: row.status === 'Active' ? 'var(--accent-danger)' : 'var(--accent-success)',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            {row.status === 'Active' ? 'Suspend' : 'Activate'}
          </button>
        )}
      />
    </>
  );

  const renderIntegrationsTab = () => (
    <>
      <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>Third-Party Plugins</h3>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>Link external services for automated notifications, classes and tuition gateway.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {integrations.map(item => (
          <div key={item.id} className="dashboard-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '3px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link size={18} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</span>
              </div>
              <StatusBadge status={item.connected ? 'success' : 'neutral'} label={item.connected ? 'Connected' : 'Disconnected'} />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, flex: 1 }}>{item.description}</p>
            <button
              onClick={() => handleToggleIntegration(item.id)}
              style={{
                alignSelf: 'flex-end',
                border: 'none',
                background: item.connected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                color: item.connected ? 'var(--accent-danger)' : 'var(--accent-success)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              {item.connected ? 'Disconnect Service' : 'Connect Service'}
            </button>
          </div>
        ))}
      </div>
    </>
  );

  const renderBackupTab = () => (
    <>
      <div className="dashboard-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Database Backup Archive</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Generate snapshots and backups of school files and user logs.</p>
          </div>
          <button
            onClick={handleGenerateBackup}
            disabled={isBackingUp}
            className="btn btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              background: isBackingUp ? 'var(--bg-surface-raised)' : 'var(--accent-primary)',
              color: isBackingUp ? 'var(--text-secondary)' : '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: isBackingUp ? 'not-allowed' : 'pointer'
            }}
          >
            {isBackingUp ? 'Backing Up...' : 'Generate System Backup'}
          </button>
        </div>

        {isBackingUp && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Compressing & generating SQL logs...</span>
              <span style={{ color: 'var(--accent-primary)' }}>{backupProgress}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: `${backupProgress}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.15s ease-out' }} />
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>Backup Files Log</h3>
        <DataGrid
          columns={backupColumns}
          data={backups}
          keyField="id"
        />
      </div>
    </>
  );

  const renderAuditTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search audit trail logs..."
            value={auditSearch}
            onChange={(e) => setAuditSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
      </div>

      <DataGrid
        columns={auditColumns}
        data={filteredAudits}
        keyField="id"
      />
    </>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'academic':
        return renderAcademicTab();
      case 'classes':
        return renderClassesTab();
      case 'subjects':
        return renderSubjectsTab();
      case 'departments':
        return renderDepartmentsTab();
      case 'roles':
        return renderRolesTab();
      case 'permissions':
        return renderPermissionsTab();
      case 'users':
        return renderUsersTab();
      case 'integrations':
        return renderIntegrationsTab();
      case 'backup':
        return renderBackupTab();
      case 'audit':
        return renderAuditTab();
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'profile', label: 'School Profile', icon: <Building size={16} /> },
    { id: 'academic', label: 'Academic Year', icon: <Calendar size={16} /> },
    { id: 'classes', label: 'Grade Classes', icon: <BookOpen size={16} /> },
    { id: 'subjects', label: 'Curricular Subjects', icon: <Book size={16} /> },
    { id: 'departments', label: 'Departments', icon: <Layers size={16} /> },
    { id: 'roles', label: 'System Roles', icon: <Shield size={16} /> },
    { id: 'permissions', label: 'Permissions Matrix', icon: <Lock size={16} /> },
    { id: 'users', label: 'Users Directory', icon: <Users size={16} /> },
    { id: 'integrations', label: 'Integrations', icon: <Cpu size={16} /> },
    { id: 'backup', label: 'Database Backup', icon: <Database size={16} /> },
    { id: 'audit', label: 'Audit Trail Logs', icon: <Clock size={16} /> },
  ] as const;

  return (
    <PageLayout>
      <PageHeader
        title="Settings Console"
        subtitle="Configure school profile details, role permissions, class templates, integrations, backups, and audits."
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <style>{`
        .hover-nav-item {
          transition: background-color 0.2s, color 0.2s;
        }
        .hover-nav-item:hover {
          background-color: var(--sidebar-hover-bg);
          color: var(--text-primary);
        }
        .hover-danger-btn:hover {
          background: rgba(239, 68, 68, 0.08) !important;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        .modal-container {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          width: 90%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: var(--shadow-xl);
          animation: modalFadeIn 0.2s ease-out;
        }
        .modal-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .modal-form-group input, .modal-form-group select, .modal-form-group textarea {
          padding: 8px 12px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: var(--bg-canvas);
          color: var(--text-primary);
          outline: none;
          font-size: 13px;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {bannerMsg && (
        <div style={{
          padding: '12px 18px',
          background: bannerMsg.type === 'success' ? 'var(--color-secondary-surface)' : 'var(--color-info-surface)',
          border: `1px solid ${bannerMsg.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(79, 142, 247, 0.3)'}`,
          color: bannerMsg.type === 'success' ? 'var(--accent-success)' : 'var(--accent-primary)',
          borderRadius: 'var(--radius-md)',
          fontSize: '13px',
          fontWeight: 600
        }}>
          {bannerMsg.text}
        </div>
      )}

      {/* Grid sidebar navigator layout */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%' }}>
        {/* Left Navigator Menu */}
        <div
          className="dashboard-card"
          style={{
            width: '260px',
            flexShrink: 0,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: 'var(--bg-surface)'
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 8px 8px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
            SETTINGS CONSOLE
          </span>
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="hover-nav-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  outline: 'none',
                  width: '100%',
                }}
              >
                <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div style={{ flex: 1, minWidth: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="dashboard-card" style={{ padding: '24px', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>
                  {navItems.find(t => t.id === activeTab)?.icon}
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {navItems.find(t => t.id === activeTab)?.label}
                </h2>
              </div>
            </div>

            {renderActiveTabContent()}
          </div>
        </div>
      </div>

      {/* --- ADD ACADEMIC YEAR MODAL --- */}
      {showAddYearModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Add Academic Year</h3>
              <button onClick={() => setShowAddYearModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddYear} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Academic Session Name</label>
                <input type="text" required placeholder="e.g. Academic Year 2026-2027" value={newYear.name} onChange={e => setNewYear({ ...newYear, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Start Date</label>
                <input type="date" required value={newYear.startDate} onChange={e => setNewYear({ ...newYear, startDate: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>End Date</label>
                <input type="date" required value={newYear.endDate} onChange={e => setNewYear({ ...newYear, endDate: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Session Status</label>
                <select value={newYear.status} onChange={e => setNewYear({ ...newYear, status: e.target.value as any })}>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Active">Active</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddYearModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD CLASS MODAL --- */}
      {showAddClassModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Register Grade Class</h3>
              <button onClick={() => setShowAddClassModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddClass} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Class Name / Grade</label>
                <input type="text" required placeholder="e.g. Grade 12" value={newClass.name} onChange={e => setNewClass({ ...newClass, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Section Name</label>
                <input type="text" required placeholder="e.g. Science, Commerce, A" value={newClass.section} onChange={e => setNewClass({ ...newClass, section: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Student Capacity</label>
                <input type="number" required placeholder="e.g. 30" value={newClass.capacity} onChange={e => setNewClass({ ...newClass, capacity: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Assigned Classroom</label>
                <input type="text" placeholder="e.g. Room 402" value={newClass.room} onChange={e => setNewClass({ ...newClass, room: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddClassModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Class</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD SUBJECT MODAL --- */}
      {showAddSubjectModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Add Academic Subject</h3>
              <button onClick={() => setShowAddSubjectModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddSubject} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Subject Name</label>
                <input type="text" required placeholder="e.g. Calculus AB" value={newSubject.name} onChange={e => setNewSubject({ ...newSubject, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Subject Code</label>
                <input type="text" required placeholder="e.g. MATH-401" value={newSubject.code} onChange={e => setNewSubject({ ...newSubject, code: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Subject Category</label>
                <select value={newSubject.category} onChange={e => setNewSubject({ ...newSubject, category: e.target.value as any })}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Languages">Languages</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Weekly Hour Periods</label>
                <input type="number" required placeholder="e.g. 4" value={newSubject.hours} onChange={e => setNewSubject({ ...newSubject, hours: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddSubjectModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD DEPARTMENT MODAL --- */}
      {showAddDeptModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Create Department</h3>
              <button onClick={() => setShowAddDeptModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddDept} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Department Name</label>
                <input type="text" required placeholder="e.g. Sports & Recreation" value={newDept.name} onChange={e => setNewDept({ ...newDept, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Head of Department (HOD)</label>
                <input type="text" required placeholder="e.g. Coach Ken" value={newDept.hod} onChange={e => setNewDept({ ...newDept, hod: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddDeptModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- INVITE USER MODAL --- */}
      {showInviteUserModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Invite Portal User</h3>
              <button onClick={() => setShowInviteUserModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleInviteUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Full Name</label>
                <input type="text" required placeholder="e.g. Wanda Maximoff" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="e.g. wanda@school.edu" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Default Role</label>
                <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="SCHOOL_ADMIN">SCHOOL_ADMIN</option>
                  <option value="Principal">Principal</option>
                  <option value="Teacher">Teacher</option>
                  <option value="HR Lead">HR Lead</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowInviteUserModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default SettingsPage;
