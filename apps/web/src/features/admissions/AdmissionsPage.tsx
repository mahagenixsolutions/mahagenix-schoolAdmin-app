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
  FileText, Users, Calendar, Award, CheckCircle, Clock, ShieldCheck, Check, X, Bookmark
} from 'lucide-react';

interface ApplicantDoc {
  name: string;
  status: 'success' | 'warning' | 'danger';
  statusLabel: string;
}

interface InterviewInfo {
  date: string;
  time: string;
  interviewer: string;
  status: 'success' | 'warning' | 'danger';
  statusLabel: string;
  remarks: string;
}

interface Applicant {
  id: string;
  name: string;
  grade: string;
  parentName: string;
  phone: string;
  email: string;
  appliedDate: string;
  docs: ApplicantDoc[];
  interview: InterviewInfo;
  status: 'success' | 'warning' | 'danger' | 'info';
  statusLabel: 'Approved' | 'Under Review' | 'Rejected' | 'Waitlisted';
}

const initialApplicants: Applicant[] = [
  {
    id: 'APP-001',
    name: 'Rohan Gupta',
    grade: 'Class 1',
    parentName: 'Amit Gupta',
    phone: '+91 98765 00122',
    email: 'amit.gupta@outlook.com',
    appliedDate: '2026-06-22',
    docs: [
      { name: 'Birth Certificate', status: 'success', statusLabel: 'Verified' },
      { name: 'Previous School TC', status: 'success', statusLabel: 'Verified' },
      { name: 'Parent ID Proof', status: 'warning', statusLabel: 'Pending' }
    ],
    interview: {
      date: '2026-07-05',
      time: '10:00 AM',
      interviewer: 'Sarah Jenkins (HOD)',
      status: 'warning',
      statusLabel: 'Scheduled',
      remarks: 'Awaiting parent-candidate panel interview'
    },
    status: 'warning',
    statusLabel: 'Under Review'
  },
  {
    id: 'APP-002',
    name: 'Sanya Malhotra',
    grade: 'Class 5',
    parentName: 'Raj Malhotra',
    phone: '+91 98765 00987',
    email: 'raj.m@gmail.com',
    appliedDate: '2026-06-19',
    docs: [
      { name: 'Birth Certificate', status: 'success', statusLabel: 'Verified' },
      { name: 'Marks Sheet Grade 4', status: 'success', statusLabel: 'Verified' }
    ],
    interview: {
      date: '2026-06-28',
      time: '11:30 AM',
      interviewer: 'Principal Vance',
      status: 'success',
      statusLabel: 'Completed',
      remarks: 'Candidate scored exceptionally in reasoning test. Strongly recommended.'
    },
    status: 'info',
    statusLabel: 'Waitlisted'
  },
  {
    id: 'APP-003',
    name: 'Aditya Roy',
    grade: 'Class 3',
    parentName: 'Vikram Roy',
    phone: '+91 98765 11234',
    email: 'vikram.roy@yahoo.com',
    appliedDate: '2026-06-12',
    docs: [
      { name: 'Birth Certificate', status: 'danger', statusLabel: 'Rejected (Illegible)' },
      { name: 'Transfer Certificate', status: 'warning', statusLabel: 'Pending' }
    ],
    interview: {
      date: '2026-07-02',
      time: '02:00 PM',
      interviewer: 'Dr. Aris Vance',
      status: 'warning',
      statusLabel: 'Scheduled',
      remarks: 'Requires documentation re-upload before interview proceeds.'
    },
    status: 'warning',
    statusLabel: 'Under Review'
  }
];

const AdmissionsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [activeHubTab, setActiveHubTab] = useState<'dashboard' | 'applications' | 'waiting'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [detailTab, setDetailTab] = useState<'profile' | 'documents' | 'interview' | 'approval'>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Workflow updates
  const handleVerifyDoc = (docName: string) => {
    if (!selectedApplicant) return;
    setApplicants(prev => prev.map(app => {
      if (app.id === selectedApplicant.id) {
        return {
          ...app,
          docs: app.docs.map(doc => doc.name === docName ? { ...doc, status: 'success', statusLabel: 'Verified' } : doc)
        };
      }
      return app;
    }));
    triggerToast(`✅ ${docName} successfully verified.`);
    // Sync active drawer view
    setSelectedApplicant(prev => prev ? {
      ...prev,
      docs: prev.docs.map(doc => doc.name === docName ? { ...doc, status: 'success', statusLabel: 'Verified' } : doc)
    } : null);
  };

  const handleWorkflowAction = (action: 'approve' | 'reject' | 'waitlist') => {
    if (!selectedApplicant) return;
    setIsLoading(true);
    let statusValue: 'success' | 'danger' | 'info' = 'success';
    let statusLabelValue: 'Approved' | 'Rejected' | 'Waitlisted' = 'Approved';
    if (action === 'reject') {
      statusValue = 'danger';
      statusLabelValue = 'Rejected';
    } else if (action === 'waitlist') {
      statusValue = 'info';
      statusLabelValue = 'Waitlisted';
    }

    setApplicants(prev => prev.map(app => {
      if (app.id === selectedApplicant.id) {
        return { ...app, status: statusValue, statusLabel: statusLabelValue };
      }
      return app;
    }));

    setTimeout(() => {
      setIsLoading(false);
      setSelectedApplicant(null);
      triggerToast(`✨ Application pipeline status updated to ${statusLabelValue}!`);
    }, 1200);
  };

  // Filter applicant directory list
  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade ? app.grade === selectedGrade : true;
    const matchesStatus = selectedStatus ? app.statusLabel === selectedStatus : true;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const columns: GridColumn<Applicant>[] = [
    {
      key: 'id',
      header: 'App ID',
      sortable: true
    },
    {
      key: 'name',
      header: 'Applicant Name',
      sortable: true,
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.name}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Parent: {row.parentName}</div>
        </div>
      )
    },
    {
      key: 'grade',
      header: 'Applying Grade',
      sortable: true
    },
    {
      key: 'appliedDate',
      header: 'Applied Date',
      sortable: true
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
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Admissions Hub"
        subtitle="Manage new application pipelines, scheduled candidate interviews, document checks, and waiting lists"
        breadcrumbs={[{ label: 'Admissions' }]}
      />

      {/* Hub Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1px', gap: '24px', marginTop: '24px', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: 'Admission Dashboard', icon: <Award size={15} /> },
          { id: 'applications', label: 'Applications Pipeline', icon: <FileText size={15} /> },
          { id: 'waiting', label: 'Waiting List', icon: <Bookmark size={15} /> },
        ].map((tab) => {
          const active = activeHubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveHubTab(tab.id as any)}
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

      <div style={{ marginTop: '24px' }}>
        {/* Tab 1: Dashboard View */}
        {activeHubTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              <KPICard title="Total Applications" value={applicants.length} icon={<FileText size={20} />} accentColor="var(--accent-primary)" />
              <KPICard title="Pending Review" value={applicants.filter(a => a.statusLabel === 'Under Review').length} icon={<Clock size={20} />} accentColor="var(--accent-warning)" />
              <KPICard title="Waitlisted" value={applicants.filter(a => a.statusLabel === 'Waitlisted').length} icon={<Bookmark size={20} />} accentColor="var(--accent-violet)" />
              <KPICard title="Approved" value={applicants.filter(a => a.statusLabel === 'Approved').length} icon={<CheckCircle size={20} />} accentColor="var(--accent-success)" />
            </div>

            {/* Quick action strip / info card */}
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Pipeline Guidance</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Configure, update, or audit document checklists, conduct interviews, and transition applications to **Approved**, **Waitlisted**, or **Rejected**. 
                To begin processing individual candidate workflows, navigate to the **Applications Pipeline** tab and select any applicant profile.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Applications Pipeline */}
        {activeHubTab === 'applications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search applicants by name, ID or parent..."
              dropdowns={[
                {
                  name: 'grade',
                  label: 'Grades',
                  options: [
                    { value: 'Class 1', label: 'Class 1' },
                    { value: 'Class 3', label: 'Class 3' },
                    { value: 'Class 5', label: 'Class 5' }
                  ],
                  value: selectedGrade,
                  onChange: setSelectedGrade
                },
                {
                  name: 'status',
                  label: 'Status',
                  options: [
                    { value: 'Under Review', label: 'Under Review' },
                    { value: 'Approved', label: 'Approved' },
                    { value: 'Waitlisted', label: 'Waitlisted' }
                  ],
                  value: selectedStatus,
                  onChange: setSelectedStatus
                }
              ]}
            />

            <DataGrid
              columns={columns}
              data={filteredApplicants}
              keyField="id"
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setSelectedApplicant(row);
                    setDetailTab('profile');
                  }}
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  Process Flow
                </button>
              )}
            />
          </div>
        )}

        {/* Tab 3: Waiting List */}
        {activeHubTab === 'waiting' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DataGrid
              columns={columns}
              data={applicants.filter(a => a.statusLabel === 'Waitlisted')}
              keyField="id"
              emptyState={
                <div style={{ padding: '60px 24px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '15px' }}>No applicants currently placed on the waiting list.</p>
                </div>
              }
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setSelectedApplicant(row);
                    setDetailTab('approval');
                  }}
                  style={{ border: '1px solid var(--border-subtle)' }}
                >
                  Manage Approval
                </button>
              )}
            />
          </div>
        )}
      </div>

      {/* Applicant Flow Drawer */}
      <DetailDrawer
        isOpen={!!selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        title={selectedApplicant ? `Processing ${selectedApplicant.name} [${selectedApplicant.id}]` : ''}
      >
        {selectedApplicant && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Drawer Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1px', gap: '16px' }}>
              {[
                { id: 'profile', label: 'Profile', icon: <Users size={14} /> },
                { id: 'documents', label: 'Documents', icon: <ShieldCheck size={14} /> },
                { id: 'interview', label: 'Interview', icon: <Calendar size={14} /> },
                { id: 'approval', label: 'Approval Roll', icon: <CheckCircle size={14} /> },
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
              
              {/* Profile Details */}
              {detailTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Candidate Profile</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.name}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Applying Grade</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.grade}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Primary Parent</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.parentName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Phone Number</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Email Address</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.email}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Document Verification */}
              {detailTab === 'documents' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} /> Document Verification Checklist
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedApplicant.docs.map((doc, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-raised)' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>Check status: <StatusBadge status={doc.status} label={doc.statusLabel} /></div>
                        </div>
                        {doc.statusLabel !== 'Verified' && (
                          <button 
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleVerifyDoc(doc.name)}
                            style={{ border: '1px solid var(--border-subtle)' }}
                          >
                            Mark Verified
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interviews */}
              {detailTab === 'interview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} /> Scheduled Evaluation Interview
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Interview Date</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.interview.date}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Time Slot</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.interview.time}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Assigned Interviewer</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedApplicant.interview.interviewer}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Evaluation Status</span>
                      <StatusBadge status={selectedApplicant.interview.status} label={selectedApplicant.interview.statusLabel} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Remarks & Notes</span>
                      <p style={{ background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', padding: '12px', borderRadius: '8px', margin: 0, fontSize: '12px', lineHeight: 1.4 }}>
                        {selectedApplicant.interview.remarks}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Approval Workflow Console */}
              {detailTab === 'approval' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Approval Workflow Controls</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Please review document verification status and evaluation interview remarks prior to making an admission decision.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <button 
                      className="btn btn-primary"
                      disabled={isLoading}
                      onClick={() => handleWorkflowAction('approve')}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '40px' }}
                    >
                      <Check size={16} /> Approve & Enroll Student
                    </button>
                    <button 
                      className="btn btn-secondary"
                      disabled={isLoading}
                      onClick={() => handleWorkflowAction('waitlist')}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '40px', border: '1px solid var(--border-subtle)' }}
                    >
                      <Bookmark size={15} /> Move to Waiting List
                    </button>
                    <button 
                      className="btn btn-ghost"
                      disabled={isLoading}
                      onClick={() => handleWorkflowAction('reject')}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '40px', border: '1px solid var(--accent-danger)', color: 'var(--accent-danger)' }}
                    >
                      <X size={16} /> Reject Application
                    </button>
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

export default AdmissionsPage;
