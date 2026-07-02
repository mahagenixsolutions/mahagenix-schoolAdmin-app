import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { KPICard } from '../../components/erp/KPICard';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { StatusBadge } from '../../components/erp/StatusBadge';
import {
  Users,
  Layers,
  CreditCard,
  Briefcase,
  Calendar,
  TrendingUp,
  FileText,
  Plus,
  Search,
  Trash2,
  Check,
  X,
  Upload,
  Download,
  UserCheck,
  DollarSign,
  Star,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

// Type definitions
interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinedDate: string;
  salary: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  avatar: string;
}

interface Department {
  id: string;
  name: string;
  hod: string;
  employeesCount: number;
  budget: string;
  status: 'Active' | 'Inactive';
}

interface PayrollRun {
  id: string;
  month: string;
  payout: string;
  employeesCount: number;
  status: 'Paid' | 'Processing' | 'Pending';
}

interface Job {
  id: string;
  title: string;
  department: string;
  applications: number;
  status: 'Open' | 'Closed' | 'Draft';
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  status: 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';
  appliedDate: string;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  duration: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface PerformanceReview {
  id: string;
  employeeName: string;
  period: string;
  rating: number;
  reviewer: string;
  feedback: string;
}

interface DocumentItem {
  id: string;
  name: string;
  category: 'Policy' | 'Contract' | 'Form' | 'Handbook';
  uploadedDate: string;
  size: string;
}

const HRPage: React.FC = () => {
  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState<
    'employees' | 'departments' | 'payroll' | 'recruitment' | 'leave' | 'performance' | 'documents'
  >('employees');

  // --- Search & Filters ---
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [employeeDeptFilter, setEmployeeDeptFilter] = useState('All');
  const [documentSearch, setDocumentSearch] = useState('');
  const [documentCatFilter, setDocumentCatFilter] = useState('All');
  const [recruitmentTab, setRecruitmentTab] = useState<'jobs' | 'candidates'>('jobs');
  const [leaveFilter, setLeaveFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  // --- Modals State ---
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showAddDocModal, setShowAddDocModal] = useState(false);

  // --- Form Inputs ---
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: '', department: 'Academic', salary: '', status: 'Active' as const });
  const [newDept, setNewDept] = useState({ name: '', hod: '', budget: '' });
  const [newJob, setNewJob] = useState({ title: '', department: 'Academic', status: 'Open' as const });
  const [newReview, setNewReview] = useState({ employeeName: '', rating: 5, period: 'Annual 2025-2026', feedback: '', reviewer: 'Dr. Alice Smith' });
  const [newDoc, setNewDoc] = useState({ name: '', category: 'Policy' as const, size: '1.2 MB' });

  // --- Mock Database / States ---
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'EMP001', name: 'Dr. Alice Smith', email: 'alice.smith@school.edu', role: 'Principal', department: 'Academic', joinedDate: '2020-08-15', salary: '$120,000', status: 'Active', avatar: 'AS' },
    { id: 'EMP002', name: 'Robert Dow', email: 'robert.dow@school.edu', role: 'Chief Admin Officer', department: 'Administration', joinedDate: '2021-03-10', salary: '$85,000', status: 'Active', avatar: 'RD' },
    { id: 'EMP003', name: 'Sarah Jenkins', email: 'sarah.j@school.edu', role: 'HR Lead', department: 'HR & Placement', joinedDate: '2022-01-20', salary: '$70,000', status: 'Active', avatar: 'SJ' },
    { id: 'EMP004', name: 'Michael Chang', email: 'm.chang@school.edu', role: 'Senior Math Teacher', department: 'Academic', joinedDate: '2022-09-01', salary: '$62,000', status: 'On Leave', avatar: 'MC' },
    { id: 'EMP005', name: 'Elena Rostova', email: 'e.rostova@school.edu', role: 'Finance Analyst', department: 'Finance & Accounts', joinedDate: '2023-02-15', salary: '$55,000', status: 'Active', avatar: 'ER' },
    { id: 'EMP006', name: 'David Kim', email: 'd.kim@school.edu', role: 'IT Manager', department: 'IT & Infrastructure', joinedDate: '2023-11-01', salary: '$68,000', status: 'Active', avatar: 'DK' },
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: 'DEP001', name: 'Academic', hod: 'Dr. Alice Smith', employeesCount: 42, budget: '$240,000', status: 'Active' },
    { id: 'DEP002', name: 'Administration', hod: 'Robert Dow', employeesCount: 15, budget: '$95,000', status: 'Active' },
    { id: 'DEP003', name: 'IT & Infrastructure', hod: 'David Kim', employeesCount: 8, budget: '$60,000', status: 'Active' },
    { id: 'DEP004', name: 'Finance & Accounts', hod: 'Elena Rostova', employeesCount: 6, budget: '$85,000', status: 'Active' },
    { id: 'DEP005', name: 'HR & Placement', hod: 'Sarah Jenkins', employeesCount: 4, budget: '$40,000', status: 'Active' },
  ]);

  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([
    { id: 'PAY001', month: 'June 2026', payout: '$285,400', employeesCount: 75, status: 'Paid' },
    { id: 'PAY002', month: 'May 2026', payout: '$283,200', employeesCount: 74, status: 'Paid' },
    { id: 'PAY003', month: 'April 2026', payout: '$279,800', employeesCount: 72, status: 'Paid' },
    { id: 'PAY004', month: 'July 2026 (Current)', payout: '$292,500', employeesCount: 75, status: 'Pending' },
  ]);

  const [jobs, setJobs] = useState<Job[]>([
    { id: 'JOB001', title: 'Senior Math Teacher', department: 'Academic', applications: 24, status: 'Open' },
    { id: 'JOB002', title: 'IT Support Specialist', department: 'IT & Infrastructure', applications: 12, status: 'Closed' },
    { id: 'JOB003', title: 'Accountant', department: 'Finance & Accounts', applications: 8, status: 'Open' },
    { id: 'JOB004', title: 'Admission Counselor', department: 'Administration', applications: 0, status: 'Draft' },
  ]);

  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 'CAN001', name: 'John Doe', position: 'Senior Math Teacher', status: 'Interviewing', appliedDate: '2026-06-25' },
    { id: 'CAN002', name: 'Jane Watson', position: 'Accountant', status: 'Offered', appliedDate: '2026-06-28' },
    { id: 'CAN003', name: 'Sam Smith', position: 'IT Support Specialist', status: 'Rejected', appliedDate: '2026-06-15' },
    { id: 'CAN004', name: 'Mia Wong', position: 'Senior Math Teacher', status: 'Applied', appliedDate: '2026-07-01' },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 'LVE001', employeeName: 'Michael Chang', type: 'Sick', duration: '2026-07-04 to 2026-07-06 (2 days)', reason: 'Severe flu, advised bed rest', status: 'Pending' },
    { id: 'LVE002', employeeName: 'Elena Rostova', type: 'Annual', duration: '2026-07-10 to 2026-07-24 (14 days)', reason: 'Summer family vacation', status: 'Approved' },
    { id: 'LVE003', employeeName: 'David Kim', type: 'Casual', duration: '2026-06-20 to 2026-06-21 (1 day)', reason: 'Personal work at hometown', status: 'Rejected' },
    { id: 'LVE004', employeeName: 'Robert Dow', type: 'Casual', duration: '2026-07-08 to 2026-07-09 (1 day)', reason: 'Doctor checkup', status: 'Pending' },
  ]);

  const [performanceReviews, setPerformanceReviews] = useState<PerformanceReview[]>([
    { id: 'PER001', employeeName: 'Dr. Alice Smith', period: 'Annual 2025-2026', rating: 5, reviewer: 'School Board', feedback: 'Exceptional leadership and management of school processes during curriculum updates.' },
    { id: 'PER002', employeeName: 'Michael Chang', period: 'Mid-term 2025', rating: 4, reviewer: 'Dr. Alice Smith', feedback: 'Great response from students; high test scores in algebra courses.' },
    { id: 'PER003', employeeName: 'Robert Dow', period: 'Annual 2025-2026', rating: 4, reviewer: 'Dr. Alice Smith', feedback: 'Smooth operations management. Needs minor optimization in vendor invoice handling.' },
    { id: 'PER004', employeeName: 'Elena Rostova', period: 'Annual 2025-2026', rating: 5, reviewer: 'Robert Dow', feedback: 'Impeccable auditing, resolved fee discrepancies quickly and efficiently.' },
  ]);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: 'DOC001', name: 'Employee_Handbook_2026.pdf', category: 'Handbook', uploadedDate: '2026-01-05', size: '2.4 MB' },
    { id: 'DOC002', name: 'Health_Insurance_Policy.pdf', category: 'Policy', uploadedDate: '2026-02-12', size: '1.8 MB' },
    { id: 'DOC003', name: 'Non_Disclosure_Agreement.pdf', category: 'Contract', uploadedDate: '2026-03-01', size: '840 KB' },
    { id: 'DOC004', name: 'Expense_Claim_Form.docx', category: 'Form', uploadedDate: '2026-04-10', size: '120 KB' },
  ]);

  // --- Mutators ---
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.salary) return;
    const initial = newEmployee.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const id = `EMP${String(employees.length + 1).padStart(3, '0')}`;
    const emp: Employee = {
      id,
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      department: newEmployee.department,
      joinedDate: new Date().toISOString().split('T')[0],
      salary: `$${newEmployee.salary.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      status: newEmployee.status,
      avatar: initial || 'EM',
    };
    setEmployees([emp, ...employees]);
    
    // Increment employee count for the selected department
    setDepartments(prev => prev.map(d => d.name === newEmployee.department ? { ...d, employeesCount: d.employeesCount + 1 } : d));

    // Reset Form & Close Modal
    setNewEmployee({ name: '', email: '', role: '', department: 'Academic', salary: '', status: 'Active' });
    setShowAddEmpModal(false);
  };

  const handleDeleteEmployee = (id: string) => {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    setEmployees(employees.filter(e => e.id !== id));
    // Decrement employee count
    setDepartments(prev => prev.map(d => d.name === emp.department ? { ...d, employeesCount: Math.max(0, d.employeesCount - 1) } : d));
  };

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDept.name || !newDept.hod || !newDept.budget) return;
    const id = `DEP${String(departments.length + 1).padStart(3, '0')}`;
    const dept: Department = {
      id,
      name: newDept.name,
      hod: newDept.hod,
      employeesCount: 0,
      budget: `$${newDept.budget.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      status: 'Active',
    };
    setDepartments([...departments, dept]);
    setNewDept({ name: '', hod: '', budget: '' });
    setShowAddDeptModal(false);
  };

  const handleRunPayroll = (runId: string) => {
    setPayrollRuns(prev => prev.map(run => {
      if (run.id === runId && run.status === 'Pending') {
        return { ...run, status: 'Processing' };
      }
      return run;
    }));

    setTimeout(() => {
      setPayrollRuns(prev => prev.map(run => {
        if (run.id === runId) {
          return { ...run, status: 'Paid' };
        }
        return run;
      }));
    }, 1500);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title) return;
    const id = `JOB${String(jobs.length + 1).padStart(3, '0')}`;
    const job: Job = {
      id,
      title: newJob.title,
      department: newJob.department,
      applications: 0,
      status: newJob.status,
    };
    setJobs([job, ...jobs]);
    setNewJob({ title: '', department: 'Academic', status: 'Open' });
    setShowAddJobModal(false);
  };

  const handleCandidateAction = (candId: string, action: 'Offer' | 'Reject') => {
    setCandidates(prev => prev.map(cand => {
      if (cand.id === candId) {
        return { ...cand, status: action === 'Offer' ? 'Offered' : 'Rejected' };
      }
      return cand;
    }));
  };

  const handleLeaveAction = (requestId: string, status: 'Approved' | 'Rejected') => {
    setLeaveRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status };
      }
      return req;
    }));

    // If approved, toggle status of corresponding employee to "On Leave"
    if (status === 'Approved') {
      const leaveReq = leaveRequests.find(r => r.id === requestId);
      if (leaveReq) {
        setEmployees(prev => prev.map(emp => {
          if (emp.name.toLowerCase() === leaveReq.employeeName.toLowerCase()) {
            return { ...emp, status: 'On Leave' };
          }
          return emp;
        }));
      }
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.employeeName || !newReview.feedback) return;
    const id = `PER${String(performanceReviews.length + 1).padStart(3, '0')}`;
    const review: PerformanceReview = {
      id,
      employeeName: newReview.employeeName,
      period: newReview.period,
      rating: Number(newReview.rating),
      reviewer: newReview.reviewer,
      feedback: newReview.feedback,
    };
    setPerformanceReviews([review, ...performanceReviews]);
    setNewReview({ employeeName: '', rating: 5, period: 'Annual 2025-2026', feedback: '', reviewer: 'Dr. Alice Smith' });
    setShowAddReviewModal(false);
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name) return;
    const id = `DOC${String(documents.length + 1).padStart(3, '0')}`;
    const doc: DocumentItem = {
      id,
      name: newDoc.name.endsWith('.pdf') || newDoc.name.endsWith('.docx') ? newDoc.name : `${newDoc.name}.pdf`,
      category: newDoc.category,
      uploadedDate: new Date().toISOString().split('T')[0],
      size: newDoc.size,
    };
    setDocuments([doc, ...documents]);
    setNewDoc({ name: '', category: 'Policy', size: '1.2 MB' });
    setShowAddDocModal(false);
  };

  const handleDeleteDoc = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  // --- Filter Logic ---
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) || emp.email.toLowerCase().includes(employeeSearch.toLowerCase()) || emp.role.toLowerCase().includes(employeeSearch.toLowerCase());
    const matchesDept = employeeDeptFilter === 'All' || emp.department === employeeDeptFilter;
    return matchesSearch && matchesDept;
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(documentSearch.toLowerCase());
    const matchesCategory = documentCatFilter === 'All' || doc.category === documentCatFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredLeave = leaveRequests.filter(req => {
    if (leaveFilter === 'All') return true;
    return req.status === leaveFilter;
  });

  // --- Sidebar Info / Metadata ---
  const navigationTabs = [
    { id: 'employees', label: 'Employees', icon: <Users size={18} />, count: employees.length },
    { id: 'departments', label: 'Departments', icon: <Layers size={18} />, count: departments.length },
    { id: 'payroll', label: 'Payroll', icon: <CreditCard size={18} /> },
    { id: 'recruitment', label: 'Recruitment', icon: <Briefcase size={18} />, badge: jobs.filter(j => j.status === 'Open').length },
    { id: 'leave', label: 'Leave Requests', icon: <Calendar size={18} />, count: leaveRequests.filter(l => l.status === 'Pending').length, alert: true },
    { id: 'performance', label: 'Performance', icon: <TrendingUp size={18} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={18} />, count: documents.length },
  ] as const;

  // --- Column Declarations for DataGrids ---
  const employeeColumns: GridColumn<Employee>[] = [
    {
      key: 'name',
      header: 'Employee',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--color-primary-surface)',
            color: 'var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '12px'
          }}>
            {row.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    { key: 'department', header: 'Department' },
    { key: 'role', header: 'Role' },
    { key: 'joinedDate', header: 'Joined Date' },
    { key: 'salary', header: 'Salary' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        let st: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
        if (row.status === 'Active') st = 'success';
        else if (row.status === 'On Leave') st = 'warning';
        else if (row.status === 'Terminated') st = 'danger';
        return <StatusBadge status={st} label={row.status} />;
      }
    }
  ];

  const payrollColumns: GridColumn<PayrollRun>[] = [
    { key: 'month', header: 'Pay Period', render: (row) => <div style={{ fontWeight: 600 }}>{row.month}</div> },
    { key: 'employeesCount', header: 'Employees' },
    { key: 'payout', header: 'Total Gross Payout' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        let st: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
        if (row.status === 'Paid') st = 'success';
        else if (row.status === 'Processing') st = 'warning';
        else if (row.status === 'Pending') st = 'info';
        return <StatusBadge status={st} label={row.status} />;
      }
    }
  ];

  const candidateColumns: GridColumn<Candidate>[] = [
    { key: 'name', header: 'Candidate Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.name}</div> },
    { key: 'position', header: 'Applied Position' },
    { key: 'appliedDate', header: 'Applied Date' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => {
        let st: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
        if (row.status === 'Offered') st = 'success';
        else if (row.status === 'Interviewing') st = 'warning';
        else if (row.status === 'Applied') st = 'info';
        else if (row.status === 'Rejected') st = 'danger';
        return <StatusBadge status={st} label={row.status} />;
      }
    }
  ];

  // --- Sub-renderers for active tab content ---
  const renderEmployeesTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, role..."
              value={employeeSearch}
              onChange={(e) => setEmployeeSearch(e.target.value)}
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
          <select
            value={employeeDeptFilter}
            onChange={(e) => setEmployeeDeptFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        <button
          onClick={() => setShowAddEmpModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <DataGrid
        columns={employeeColumns}
        data={filteredEmployees}
        keyField="id"
        actions={(row) => (
          <button
            onClick={() => handleDeleteEmployee(row.id)}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--accent-danger)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            className="hover-danger-btn"
            title="Remove Employee"
          >
            <Trash2 size={16} />
          </button>
        )}
      />
    </>
  );

  const renderDepartmentsTab = () => {
    const totalBudget = departments.reduce((acc, curr) => acc + Number(curr.budget.replace(/[^0-9]/g, '')), 0);
    const totalStaff = departments.reduce((acc, curr) => acc + curr.employeesCount, 0);

    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <KPICard title="Total Departments" value={departments.length} icon={<Layers size={20} />} accentColor="var(--accent-violet)" />
          <KPICard title="Total HR Budget" value={`$${totalBudget.toLocaleString()}`} icon={<DollarSign size={20} />} accentColor="var(--accent-success)" />
          <KPICard title="Total Headcount" value={totalStaff} icon={<Users size={20} />} accentColor="var(--accent-primary)" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Departments List</h2>
          <button
            onClick={() => setShowAddDeptModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
          >
            <Plus size={16} /> Create Department
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="dashboard-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                borderTop: '3px solid var(--accent-violet)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{dept.name}</span>
                <StatusBadge status={dept.status === 'Active' ? 'success' : 'neutral'} label={dept.status} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>HOD:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.hod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Employees Count:</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{dept.employeesCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Allocated Budget:</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-success)' }}>{dept.budget}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderPayrollTab = () => {
    const activePayroll = payrollRuns.find(p => p.status === 'Pending') || payrollRuns.find(p => p.status === 'Processing');
    const completedPayroll = payrollRuns.filter(p => p.status === 'Paid');
    const totalPaid = completedPayroll.reduce((acc, curr) => acc + Number(curr.payout.replace(/[^0-9]/g, '')), 0);

    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <KPICard title="Next Pay Date" value="July 31, 2026" icon={<Calendar size={20} />} accentColor="var(--accent-primary)" />
          <KPICard title="Total Payroll Budget" value={`$${(292500).toLocaleString()}`} icon={<DollarSign size={20} />} accentColor="var(--accent-violet)" />
          <KPICard title="Total Disbursed (Paid)" value={`$${totalPaid.toLocaleString()}`} icon={<UserCheck size={20} />} accentColor="var(--accent-success)" />
        </div>

        <div className="dashboard-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Current Payroll Session</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Verify current month payouts and process payment disbursement.</p>
            </div>
            {activePayroll && activePayroll.status === 'Pending' && (
              <button
                onClick={() => handleRunPayroll(activePayroll.id)}
                className="btn btn-primary"
                style={{ background: 'var(--accent-success)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', padding: '8px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <DollarSign size={16} /> Disburse July Payroll
              </button>
            )}
            {activePayroll && activePayroll.status === 'Processing' && (
              <button
                disabled
                className="btn btn-secondary"
                style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface-raised)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', padding: '8px 16px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <div style={{ width: '12px', height: '12px', border: '2px solid var(--text-muted)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Processing...
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px', background: 'var(--bg-surface-raised)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pay Run Period</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>July 1 - July 31, 2026</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Employees Count</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>{employees.filter(e => e.status !== 'Terminated').length} active staff</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Gross Amount</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-success)', marginTop: '4px' }}>$292,500.00</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Session Status</div>
              <div style={{ marginTop: '4px' }}>
                <StatusBadge status={activePayroll?.status === 'Processing' ? 'warning' : 'info'} label={activePayroll?.status || 'Paid'} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>Payroll History</h3>
          <DataGrid
            columns={payrollColumns}
            data={payrollRuns}
            keyField="id"
            actions={(row) => (
              <button
                style={{
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 500
                }}
              >
                <FileSpreadsheet size={14} /> Payslips
              </button>
            )}
          />
        </div>
      </>
    );
  };

  const renderRecruitmentTab = () => (
    <>
      {/* Sub-tabs header */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '2px' }}>
        <button
          onClick={() => setRecruitmentTab('jobs')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: recruitmentTab === 'jobs' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: recruitmentTab === 'jobs' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontWeight: recruitmentTab === 'jobs' ? 700 : 500,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            outline: 'none'
          }}
        >
          Open Positions ({jobs.length})
        </button>
        <button
          onClick={() => setRecruitmentTab('candidates')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: recruitmentTab === 'candidates' ? '2px solid var(--accent-primary)' : '2px solid transparent',
            color: recruitmentTab === 'candidates' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontWeight: recruitmentTab === 'candidates' ? 700 : 500,
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            outline: 'none'
          }}
        >
          Candidates ({candidates.length})
        </button>
      </div>

      {recruitmentTab === 'jobs' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Active Job Postings</h3>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
            >
              <Plus size={16} /> Create Job Posting
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {jobs.map((job) => (
              <div key={job.id} className="dashboard-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '3px solid var(--accent-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{job.title}</span>
                  <StatusBadge
                    status={job.status === 'Open' ? 'success' : job.status === 'Draft' ? 'neutral' : 'danger'}
                    label={job.status}
                  />
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Department: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.department}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{job.applications} Applications</span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>View Applicants</button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Applicant Tracking</h3>
          <DataGrid
            columns={candidateColumns}
            data={candidates}
            keyField="id"
            actions={(row) => (
              <div style={{ display: 'flex', gap: '6px' }}>
                {row.status === 'Applied' || row.status === 'Interviewing' ? (
                  <>
                    <button
                      onClick={() => handleCandidateAction(row.id, 'Offer')}
                      style={{ border: 'none', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-success)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                    >
                      Offer
                    </button>
                    <button
                      onClick={() => handleCandidateAction(row.id, 'Reject')}
                      style={{ border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-danger)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', paddingRight: '8px' }}>Action Taken</span>
                )}
              </div>
            )}
          />
        </>
      )}
    </>
  );

  const renderLeaveTab = () => {
    const leaveColumns: GridColumn<LeaveRequest>[] = [
      { key: 'employeeName', header: 'Staff Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.employeeName}</div> },
      { key: 'type', header: 'Leave Type' },
      { key: 'duration', header: 'Duration' },
      { key: 'reason', header: 'Reason / Remarks' },
      {
        key: 'status',
        header: 'Status',
        render: (row) => {
          let st: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
          if (row.status === 'Approved') st = 'success';
          else if (row.status === 'Pending') st = 'warning';
          else if (row.status === 'Rejected') st = 'danger';
          return <StatusBadge status={st} label={row.status} />;
        }
      }
    ];

    const pendingCount = leaveRequests.filter(l => l.status === 'Pending').length;
    const approvedCount = leaveRequests.filter(l => l.status === 'Approved').length;
    const rejectedCount = leaveRequests.filter(l => l.status === 'Rejected').length;

    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <KPICard title="Pending Approval" value={pendingCount} icon={<AlertCircle size={20} />} accentColor="var(--accent-warning)" />
          <KPICard title="Approved Leaves" value={approvedCount} icon={<Check size={20} />} accentColor="var(--accent-success)" />
          <KPICard title="Rejected Requests" value={rejectedCount} icon={<X size={20} />} accentColor="var(--accent-danger)" />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Leave Requests</h3>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(f => (
              <button
                key={f}
                onClick={() => setLeaveFilter(f)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: leaveFilter === f ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: leaveFilter === f ? '#fff' : 'var(--text-secondary)',
                  transition: '0.2s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <DataGrid
          columns={leaveColumns}
          data={filteredLeave}
          keyField="id"
          actions={(row) => (
            <div style={{ display: 'flex', gap: '6px' }}>
              {row.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => handleLeaveAction(row.id, 'Approved')}
                    style={{ border: 'none', background: 'none', color: 'var(--accent-success)', padding: '6px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    title="Approve"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => handleLeaveAction(row.id, 'Rejected')}
                    style={{ border: 'none', background: 'none', color: 'var(--accent-danger)', padding: '6px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    title="Reject"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', paddingRight: '12px' }}>Locked</span>
              )}
            </div>
          )}
        />
      </>
    );
  };

  const renderPerformanceTab = () => {
    const perfColumns: GridColumn<PerformanceReview>[] = [
      { key: 'employeeName', header: 'Staff Name', render: (row) => <div style={{ fontWeight: 600 }}>{row.employeeName}</div> },
      { key: 'period', header: 'Review Period' },
      {
        key: 'rating',
        header: 'Rating Score',
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13px' }}>{row.rating}.0</span>
            <div style={{ display: 'flex', color: 'var(--accent-warning)' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < row.rating ? 'currentColor' : 'none'} stroke="currentColor" />
              ))}
            </div>
          </div>
        )
      },
      { key: 'reviewer', header: 'Evaluated By' },
      {
        key: 'feedback',
        header: 'Feedback Summary',
        render: (row) => (
          <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)' }} title={row.feedback}>
            {row.feedback}
          </div>
        )
      }
    ];

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Performance Evaluations</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Review annual and mid-term feedback cycles of school staff.</p>
          </div>
          <button
            onClick={() => setShowAddReviewModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
          >
            <Plus size={16} /> Log Review
          </button>
        </div>

        <DataGrid
          columns={perfColumns}
          data={performanceReviews}
          keyField="id"
        />
      </>
    );
  };

  const renderDocumentsTab = () => {
    const docColumns: GridColumn<DocumentItem>[] = [
      {
        key: 'name',
        header: 'Document Name',
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: 'var(--accent-violet)' }} />
            <span style={{ fontWeight: 600 }}>{row.name}</span>
          </div>
        )
      },
      { key: 'category', header: 'Category' },
      { key: 'uploadedDate', header: 'Upload Date' },
      { key: 'size', header: 'File Size' },
    ];

    return (
      <>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search policy/ handbook files..."
                value={documentSearch}
                onChange={(e) => setDocumentSearch(e.target.value)}
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
            <select
              value={documentCatFilter}
              onChange={(e) => setDocumentCatFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Categories</option>
              <option value="Policy">Policy</option>
              <option value="Handbook">Handbook</option>
              <option value="Contract">Contract</option>
              <option value="Form">Form</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddDocModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
          >
            <Upload size={16} /> Upload Policy File
          </button>
        </div>

        <DataGrid
          columns={docColumns}
          data={filteredDocuments}
          keyField="id"
          actions={(row) => (
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
              <button
                style={{ border: 'none', background: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '6px', borderRadius: '4px' }}
                title="Download Document"
              >
                <Download size={16} />
              </button>
              <button
                onClick={() => handleDeleteDoc(row.id)}
                style={{ border: 'none', background: 'none', color: 'var(--accent-danger)', cursor: 'pointer', padding: '6px', borderRadius: '4px' }}
                title="Delete Document"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        />
      </>
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'employees':
        return renderEmployeesTab();
      case 'departments':
        return renderDepartmentsTab();
      case 'payroll':
        return renderPayrollTab();
      case 'recruitment':
        return renderRecruitmentTab();
      case 'leave':
        return renderLeaveTab();
      case 'performance':
        return renderPerformanceTab();
      case 'documents':
        return renderDocumentsTab();
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Human Resources"
        subtitle="Manage employee records, payroll cycle, department structures, leave requests, recruitment and review cycles."
        breadcrumbs={[{ label: 'HR Hub' }]}
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

      {/* Main Content Area Grid: Sidebar Layout */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%' }}>
        {/* Left Side Navigation Card */}
        <div
          className="dashboard-card"
          style={{
            width: '260px',
            flexShrink: 0,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'var(--bg-surface)'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 8px 8px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
            HR HUB NAVIGATOR
          </span>
          {navigationTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="hover-nav-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                {'count' in tab && tab.count !== undefined && (
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'alert' in tab && tab.alert && tab.count > 0 ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-surface-raised)',
                    color: 'alert' in tab && tab.alert && tab.count > 0 ? 'var(--accent-danger)' : 'var(--text-secondary)',
                    fontWeight: 600
                  }}>
                    {tab.count}
                  </span>
                )}
                {'badge' in tab && tab.badge !== undefined && tab.badge > 0 && (
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: 'var(--accent-success)',
                    fontWeight: 600
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side Content Panel */}
        <div style={{ flex: 1, minWidth: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="dashboard-card" style={{ padding: '24px', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>
                  {navigationTabs.find(t => t.id === activeTab)?.icon}
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {navigationTabs.find(t => t.id === activeTab)?.label}
                </h2>
              </div>
            </div>

            {renderActiveTabContent()}
          </div>
        </div>
      </div>

      {/* --- ADD EMPLOYEE MODAL --- */}
      {showAddEmpModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Add New Employee</h3>
              <button onClick={() => setShowAddEmpModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Full Name</label>
                <input type="text" required placeholder="e.g. Johnathan Doe" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="e.g. j.doe@school.edu" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Department</label>
                <select value={newEmployee.department} onChange={e => setNewEmployee({ ...newEmployee, department: e.target.value })}>
                  {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="modal-form-group">
                <label>Designation/Role</label>
                <input type="text" required placeholder="e.g. Geography Teacher" value={newEmployee.role} onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Annual Salary ($)</label>
                <input type="number" required placeholder="e.g. 58000" value={newEmployee.salary} onChange={e => setNewEmployee({ ...newEmployee, salary: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Initial Status</label>
                <select value={newEmployee.status} onChange={e => setNewEmployee({ ...newEmployee, status: e.target.value as any })}>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddEmpModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CREATE DEPARTMENT MODAL --- */}
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
                <input type="text" required placeholder="e.g. Security & Surveillance" value={newDept.name} onChange={e => setNewDept({ ...newDept, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Head of Department (HOD)</label>
                <input type="text" required placeholder="e.g. Sgt. Marcus Vance" value={newDept.hod} onChange={e => setNewDept({ ...newDept, hod: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Allocated Budget ($)</label>
                <input type="number" required placeholder="e.g. 45000" value={newDept.budget} onChange={e => setNewDept({ ...newDept, budget: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddDeptModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CREATE JOB POSTING MODAL --- */}
      {showAddJobModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Create Job Posting</h3>
              <button onClick={() => setShowAddJobModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddJob} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Job Title</label>
                <input type="text" required placeholder="e.g. Primary English Teacher" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Department</label>
                <select value={newJob.department} onChange={e => setNewJob({ ...newJob, department: e.target.value })}>
                  {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
              <div className="modal-form-group">
                <label>Posting Status</label>
                <select value={newJob.status} onChange={e => setNewJob({ ...newJob, status: e.target.value as any })}>
                  <option value="Open">Open (Active)</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddJobModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Publish Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- LOG PERFORMANCE REVIEW MODAL --- */}
      {showAddReviewModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Log Staff Review</h3>
              <button onClick={() => setShowAddReviewModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Select Staff Member</label>
                <select value={newReview.employeeName} onChange={e => setNewReview({ ...newReview, employeeName: e.target.value })}>
                  <option value="">-- Choose Employee --</option>
                  {employees.map(e => <option key={e.id} value={e.name}>{e.name} ({e.role})</option>)}
                </select>
              </div>
              <div className="modal-form-group">
                <label>Review Period</label>
                <select value={newReview.period} onChange={e => setNewReview({ ...newReview, period: e.target.value })}>
                  <option value="Annual 2025-2026">Annual 2025-2026</option>
                  <option value="Mid-term 2026">Mid-term 2026</option>
                  <option value="Probation Review">Probation Review</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Rating (1 to 5 Stars)</label>
                <select value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}>
                  <option value="5">5 - Outstanding</option>
                  <option value="4">4 - Exceeds Expectations</option>
                  <option value="3">3 - Meets Expectations</option>
                  <option value="2">2 - Needs Improvement</option>
                  <option value="1">1 - Unsatisfactory</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Evaluated By</label>
                <input type="text" required value={newReview.reviewer} onChange={e => setNewReview({ ...newReview, reviewer: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Review Comments</label>
                <textarea rows={3} required placeholder="Summarize staff achievements and areas of growth..." value={newReview.feedback} onChange={e => setNewReview({ ...newReview, feedback: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddReviewModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Evaluation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- UPLOAD DOCUMENT MODAL --- */}
      {showAddDocModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Upload Policy Document</h3>
              <button onClick={() => setShowAddDocModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddDoc} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Document Title</label>
                <input type="text" required placeholder="e.g. Internet_Usage_Agreement.pdf" value={newDoc.name} onChange={e => setNewDoc({ ...newDoc, name: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Category</label>
                <select value={newDoc.category} onChange={e => setNewDoc({ ...newDoc, category: e.target.value as any })}>
                  <option value="Policy">Policy</option>
                  <option value="Handbook">Handbook</option>
                  <option value="Contract">Contract</option>
                  <option value="Form">Form</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>File Size (Estimated)</label>
                <input type="text" required placeholder="e.g. 512 KB" value={newDoc.size} onChange={e => setNewDoc({ ...newDoc, size: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddDocModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Upload File</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default HRPage;
