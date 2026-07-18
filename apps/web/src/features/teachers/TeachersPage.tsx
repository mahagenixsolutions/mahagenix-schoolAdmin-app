import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { FilterBar } from '../../components/erp/FilterBar';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { KPICard } from '../../components/erp/KPICard';
import { DetailDrawer } from '../../components/erp/DetailDrawer';
import { StatusBadge } from '../../components/erp/StatusBadge';
import { 
  Users, Award, Calendar, CreditCard, BookOpen, Clock, Briefcase, Plus
} from 'lucide-react';

interface TimetableSlot {
  day: string;
  period: string;
  class: string;
  subject: string;
}

interface SalaryDetails {
  base: string;
  allowances: string;
  deductions: string;
  payrollStatus: 'success' | 'warning' | 'danger';
  payrollLabel: string;
  lastDisbursed: string;
}

interface Teacher {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  subjects: string[];
  timetable: TimetableSlot[];
  performance: string;
  ratingValue: number;
  leaveBalance: number;
  leavesTaken: number;
  status: 'success' | 'warning';
  statusLabel: string;
  salary: SalaryDetails;
}

const mockTeachers: Teacher[] = [
  {
    id: 'tch-1',
    name: 'Dr. Aris Vance',
    code: 'TCH-048',
    email: 'aris.vance@school.edu',
    phone: '+91 98765 00011',
    avatar: 'AV',
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    timetable: [
      { day: 'Mon', period: '1st Period (08:30)', class: 'Class 10 A', subject: 'Physics' },
      { day: 'Mon', period: '3rd Period (10:30)', class: 'Class 9 A', subject: 'Chemistry' },
      { day: 'Tue', period: '2nd Period (09:30)', class: 'Class 10 B', subject: 'Physics' },
      { day: 'Wed', period: '4th Period (11:30)', class: 'Class 9 A', subject: 'Chemistry' },
    ],
    performance: '4.8 / 5 (Excellent)',
    ratingValue: 4.8,
    leaveBalance: 8,
    leavesTaken: 4,
    status: 'success',
    statusLabel: 'Active',
    salary: { base: '₹75,000', allowances: '₹12,000', deductions: '₹4,500', payrollStatus: 'success', payrollLabel: 'PAID', lastDisbursed: '2026-06-30' }
  },
  {
    id: 'tch-2',
    name: 'Sarah Jenkins',
    code: 'TCH-082',
    email: 'sarah.j@school.edu',
    phone: '+91 98765 00012',
    avatar: 'SJ',
    department: 'Mathematics',
    subjects: ['Algebra', 'Calculus'],
    timetable: [
      { day: 'Mon', period: '2nd Period (09:30)', class: 'Class 12 A', subject: 'Calculus' },
      { day: 'Tue', period: '1st Period (08:30)', class: 'Class 11 A', subject: 'Algebra' },
      { day: 'Wed', period: '3rd Period (10:30)', class: 'Class 12 A', subject: 'Calculus' },
    ],
    performance: '4.9 / 5 (Outstanding)',
    ratingValue: 4.9,
    leaveBalance: 12,
    leavesTaken: 2,
    status: 'success',
    statusLabel: 'Active',
    salary: { base: '₹82,000', allowances: '₹15,000', deductions: '₹5,000', payrollStatus: 'success', payrollLabel: 'PAID', lastDisbursed: '2026-06-30' }
  },
  {
    id: 'tch-3',
    name: 'Rohan Sharma',
    code: 'TCH-115',
    email: 'rohan.s@school.edu',
    phone: '+91 98765 00013',
    avatar: 'RS',
    department: 'Humanities',
    subjects: ['History', 'Civics'],
    timetable: [
      { day: 'Mon', period: '4th Period (11:30)', class: 'Class 10 A', subject: 'History' },
      { day: 'Tue', period: '3rd Period (10:30)', class: 'Class 10 A', subject: 'Civics' },
    ],
    performance: '4.5 / 5 (Very Good)',
    ratingValue: 4.5,
    leaveBalance: 5,
    leavesTaken: 9,
    status: 'warning',
    statusLabel: 'On Leave',
    salary: { base: '₹68,000', allowances: '₹8,500', deductions: '₹3,000', payrollStatus: 'success', payrollLabel: 'PAID', lastDisbursed: '2026-06-30' }
  },
  {
    id: 'tch-4',
    name: 'Elena Rostova',
    code: 'TCH-201',
    email: 'elena.r@school.edu',
    phone: '+91 98765 00014',
    avatar: 'ER',
    department: 'Languages',
    subjects: ['English Literature', 'Grammar'],
    timetable: [
      { day: 'Mon', period: '5th Period (13:30)', class: 'Class 9 A', subject: 'Grammar' },
      { day: 'Wed', period: '2nd Period (09:30)', class: 'Class 10 B', subject: 'Literature' },
    ],
    performance: '4.7 / 5 (Excellent)',
    ratingValue: 4.7,
    leaveBalance: 15,
    leavesTaken: 1,
    status: 'success',
    statusLabel: 'Active',
    salary: { base: '₹70,000', allowances: '₹10,000', deductions: '₹4,000', payrollStatus: 'success', payrollLabel: 'PAID', lastDisbursed: '2026-06-30' }
  }
];

const TeachersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [detailTab, setDetailTab] = useState<'profile' | 'timetable' | 'leaves' | 'salary'>('profile');

  // Filters logic
  const filteredTeachers = mockTeachers.filter(tch => {
    const matchesSearch = tch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tch.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept ? tch.department === selectedDept : true;
    const matchesStatus = selectedStatus ? tch.statusLabel === selectedStatus : true;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const columns: GridColumn<Teacher>[] = [
    {
      key: 'code',
      header: 'Staff ID',
      sortable: true
    },
    {
      key: 'name',
      header: 'Teacher Name',
      sortable: true,
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-surface-raised)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>
            {row.avatar}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
    },
    {
      key: 'subjects',
      header: 'Assigned Subjects',
      render: (row) => (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {row.subjects.map((sub, idx) => (
            <span key={idx} style={{ background: 'var(--bg-surface-raised)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
              {sub}
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'performance',
      header: 'Performance Rating',
      sortable: true,
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-warning)' }}>
          ★ <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{row.performance}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} label={row.statusLabel} />
    }
  ];

  return (
    <PageLayout>
      {/* Page Header */}
      <PageHeader
        title="Teachers Directory"
        subtitle="Manage faculty details, departments, classes, leaves, and salary rolls"
        breadcrumbs={[{ label: 'Teachers' }]}
        actions={
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Plus size={15} /> Add Faculty Member
          </button>
        }
      />

      {/* KPI Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginTop: '24px',
        marginBottom: '24px'
      }}>
        <KPICard title="Total Teachers" value={mockTeachers.length} icon={<Users size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Departments" value={6} icon={<Briefcase size={20} />} accentColor="var(--accent-violet)" />
        <KPICard title="On Leave Today" value={mockTeachers.filter(t => t.statusLabel === 'On Leave').length} icon={<Calendar size={20} />} accentColor="var(--accent-warning)" />
        <KPICard title="Average Rating" value="4.7 / 5" icon={<Award size={20} />} accentColor="var(--accent-success)" />
      </div>

      {/* Filters Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search teachers by name or ID..."
        dropdowns={[
          {
            name: 'dept',
            label: 'Departments',
            options: [
              { value: 'Science', label: 'Science' },
              { value: 'Mathematics', label: 'Mathematics' },
              { value: 'Humanities', label: 'Humanities' },
              { value: 'Languages', label: 'Languages' },
            ],
            value: selectedDept,
            onChange: setSelectedDept
          },
          {
            name: 'status',
            label: 'Status',
            options: [
              { value: 'Active', label: 'Active' },
              { value: 'On Leave', label: 'On Leave' },
            ],
            value: selectedStatus,
            onChange: setSelectedStatus
          }
        ]}
      />

      {/* Teacher Directory Grid */}
      <div style={{ marginTop: '24px' }}>
        <DataGrid
          columns={columns}
          data={filteredTeachers}
          keyField="id"
          actions={(row) => (
            <button 
              className="btn btn-ghost btn-sm" 
              onClick={() => {
                setSelectedTeacher(row);
                setDetailTab('profile');
              }}
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              View Profile
            </button>
          )}
        />
      </div>

      {/* Teacher Detail Drawer */}
      <DetailDrawer
        isOpen={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
        title={selectedTeacher ? `${selectedTeacher.name} - Profile Details` : ''}
      >
        {selectedTeacher && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Drawer Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '1px',
              gap: '16px',
            }}>
              {[
                { id: 'profile', label: 'Profile', icon: <Users size={14} /> },
                { id: 'timetable', label: 'Timetable', icon: <Clock size={14} /> },
                { id: 'leaves', label: 'Leaves', icon: <Calendar size={14} /> },
                { id: 'salary', label: 'Salary', icon: <CreditCard size={14} /> },
              ].map((tab) => {
                const active = detailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 2px',
                      border: 'none',
                      background: 'transparent',
                      borderBottom: active ? '2px solid var(--accent-primary)' : '2px solid transparent',
                      color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      fontWeight: active ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Panes */}
            <div style={{ minHeight: '280px' }}>
              
              {/* Profile info tab */}
              {detailTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ textAlign: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-surface-raised)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '24px', margin: '0 auto 12px auto' }}>
                      {selectedTeacher.avatar}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{selectedTeacher.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{selectedTeacher.code} · {selectedTeacher.department} Department</p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Email Address</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedTeacher.email}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Phone Contact</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedTeacher.phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Performance Rating</span>
                      <strong style={{ color: 'var(--accent-warning)' }}>{selectedTeacher.performance}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Active Subjects</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedTeacher.subjects.join(', ')}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Timetable tab */}
              {detailTab === 'timetable' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} /> Assigned Weekly Classes
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedTeacher.timetable.map((slot, idx) => (
                      <div key={idx} style={{ padding: '10px 12px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>{slot.day} · {slot.period}</div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{slot.class}</div>
                        </div>
                        <span style={{ background: 'var(--accent-primary-surface)', color: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>
                          {slot.subject}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leaves tab */}
              {detailTab === 'leaves' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ background: 'var(--bg-surface-raised)', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Leaves Taken</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-danger)', margin: '4px 0' }}>{selectedTeacher.leavesTaken} days</div>
                    </div>
                    <div style={{ background: 'var(--bg-surface-raised)', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Available Balance</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-success)', margin: '4px 0' }}>{selectedTeacher.leaveBalance} days</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Salary tab */}
              {detailTab === 'salary' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} /> Salary & Payroll Summary
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Basic Salary</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedTeacher.salary.base}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Allowances</span>
                      <strong style={{ color: 'var(--accent-success)' }}>+ {selectedTeacher.salary.allowances}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Deductions</span>
                      <strong style={{ color: 'var(--accent-danger)' }}>- {selectedTeacher.salary.deductions}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Payroll Status</span>
                      <StatusBadge status={selectedTeacher.salary.payrollStatus} label={selectedTeacher.salary.payrollLabel} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Last Disbursement</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedTeacher.salary.lastDisbursed}</strong>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </DetailDrawer>
    </PageLayout>
  );
};

export default TeachersPage;
