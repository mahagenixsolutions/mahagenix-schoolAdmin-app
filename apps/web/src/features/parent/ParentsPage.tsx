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
  Users, MessageSquare, CreditCard, UserPlus, GraduationCap
} from 'lucide-react';

interface LinkedStudent {
  name: string;
  class: string;
  gender: string;
}

interface CommEvent {
  date: string;
  channel: 'SMS' | 'Email' | 'Portal';
  subject: string;
  summary: string;
}

interface Parent {
  id: string;
  fatherName: string;
  motherName: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  students: LinkedStudent[];
  communications: CommEvent[];
  feeSummary: {
    total: string;
    paid: string;
    pending: string;
    status: 'success' | 'warning' | 'danger';
    statusLabel: string;
  };
}

const mockParents: Parent[] = [
  {
    id: 'prt-1',
    fatherName: 'Robert Doe',
    motherName: 'Sarah Doe',
    email: 'robert.doe@gmail.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Oakwood Residency, Sector 15, Mumbai',
    occupation: 'Software Engineer',
    students: [
      { name: 'John Doe', class: 'Class 10 A', gender: 'MALE' }
    ],
    communications: [
      { date: '2026-06-25', channel: 'Portal', subject: 'Report Card Dispatched', summary: 'Mid-term terminal report card published to portal.' },
      { date: '2026-06-22', channel: 'SMS', subject: 'Fee Reminder Notice', summary: 'Direct reminder dispatch for Q2 fee dues.' },
      { date: '2026-06-15', channel: 'Email', subject: 'Science Expo Invite', summary: 'Invitation card sent to parent to attend Science Exhibition.' }
    ],
    feeSummary: {
      total: '₹60,000',
      paid: '₹45,000',
      pending: '₹15,000',
      status: 'warning',
      statusLabel: 'Partially Pending'
    }
  },
  {
    id: 'prt-2',
    fatherName: 'Amit Gupta',
    motherName: 'Priya Gupta',
    email: 'amit.gupta@outlook.com',
    phone: '+91 98765 00122',
    address: 'Villa 12, Palms Estate, Powai, Mumbai',
    occupation: 'Financial Analyst',
    students: [
      { name: 'Rohan Gupta', class: 'Class 1 A', gender: 'MALE' }
    ],
    communications: [
      { date: '2026-06-20', channel: 'SMS', subject: 'Attendance Warning', summary: 'Alert sent regarding Rohan being absent today.' }
    ],
    feeSummary: {
      total: '₹48,000',
      paid: '₹48,000',
      pending: '₹0',
      status: 'success',
      statusLabel: 'Fully Cleared'
    }
  },
  {
    id: 'prt-3',
    fatherName: 'Raj Malhotra',
    motherName: 'Meera Malhotra',
    email: 'raj.m@gmail.com',
    phone: '+91 98765 00987',
    address: 'B-102, Sky High Towers, Andheri West, Mumbai',
    occupation: 'Business Owner',
    students: [
      { name: 'Sanya Malhotra', class: 'Class 5 B', gender: 'FEMALE' }
    ],
    communications: [
      { date: '2026-06-28', channel: 'Email', subject: 'Fee Receipt Sent', summary: 'Payment receipt generated for Term 1.' }
    ],
    feeSummary: {
      total: '₹55,000',
      paid: '₹55,000',
      pending: '₹0',
      status: 'success',
      statusLabel: 'Fully Cleared'
    }
  }
];

const ParentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('');
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [detailTab, setDetailTab] = useState<'profile' | 'students' | 'communication' | 'fees'>('profile');

  // Filter Parents
  const filteredParents = mockParents.filter(p => {
    const matchesSearch = p.fatherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.motherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.students.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFee = selectedFeeStatus ? p.feeSummary.statusLabel === selectedFeeStatus : true;
    return matchesSearch && matchesFee;
  });

  const columns: GridColumn<Parent>[] = [
    {
      key: 'parent',
      header: 'Primary Guardian(s)',
      sortable: true,
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.fatherName} & {row.motherName}</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{row.email}</div>
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Phone Contact',
    },
    {
      key: 'students',
      header: 'Linked Student(s)',
      render: (row) => (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {row.students.map((st, idx) => (
            <span key={idx} style={{ background: 'var(--bg-surface-raised)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
              {st.name} ({st.class})
            </span>
          ))}
        </div>
      )
    },
    {
      key: 'feeSummary',
      header: 'Fee Balance Status',
      render: (row) => <StatusBadge status={row.feeSummary.status} label={row.feeSummary.statusLabel} />
    }
  ];

  return (
    <PageLayout>
      {/* Page Header */}
      <PageHeader
        title="Parents Directory"
        subtitle="Manage parental contacts, link students, track communications, and audit fee balances"
        breadcrumbs={[{ label: 'Parents' }]}
        actions={
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <UserPlus size={15} /> Add Parent Account
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
        <KPICard title="Total Parents" value={mockParents.length} icon={<Users size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Linked Students" value={mockParents.reduce((acc, curr) => acc + curr.students.length, 0)} icon={<GraduationCap size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Outstanding Accounts" value={mockParents.filter(p => p.feeSummary.pending !== '₹0').length} icon={<CreditCard size={20} />} accentColor="var(--accent-warning)" />
        <KPICard title="Dispatch Channels" value={3} icon={<MessageSquare size={20} />} accentColor="var(--accent-violet)" />
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by parent name, email, or child's name..."
        dropdowns={[
          {
            name: 'feeStatus',
            label: 'Fee Status',
            options: [
              { value: 'Fully Cleared', label: 'Fully Cleared' },
              { value: 'Partially Pending', label: 'Partially Pending' }
            ],
            value: selectedFeeStatus,
            onChange: setSelectedFeeStatus
          }
        ]}
      />

      {/* Parent Table */}
      <div style={{ marginTop: '24px' }}>
        <DataGrid
          columns={columns}
          data={filteredParents}
          keyField="id"
          actions={(row) => (
            <button 
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setSelectedParent(row);
                setDetailTab('profile');
              }}
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              View Profile
            </button>
          )}
        />
      </div>

      {/* Parent Drawer */}
      <DetailDrawer
        isOpen={!!selectedParent}
        onClose={() => setSelectedParent(null)}
        title={selectedParent ? `${selectedParent.fatherName}'s Family Profile` : ''}
      >
        {selectedParent && (
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
                { id: 'students', label: 'Linked Students', icon: <GraduationCap size={14} /> },
                { id: 'communication', label: 'Comm. History', icon: <MessageSquare size={14} /> },
                { id: 'fees', label: 'Fee Summary', icon: <CreditCard size={14} /> },
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

            {/* Content Pane */}
            <div style={{ minHeight: '280px' }}>
              
              {/* Profile Details */}
              {detailTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Parent Profile</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Father Name</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedParent.fatherName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Mother Name</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedParent.motherName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Primary Occupation</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedParent.occupation}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Phone Contact</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedParent.phone}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Email Address</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedParent.email}</strong>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Residential Address</span>
                      <strong style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{selectedParent.address}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Linked Students */}
              {detailTab === 'students' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GraduationCap size={14} /> Registered Children
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedParent.students.map((st, idx) => (
                      <div key={idx} style={{ padding: '12px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{st.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{st.class}</div>
                        </div>
                        <span style={{ background: 'var(--accent-primary-surface)', color: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>
                          {st.gender}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Communication History */}
              {detailTab === 'communication' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageSquare size={14} /> Messages & Notification Dispatch Log
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {selectedParent.communications.map((comm, idx) => (
                      <div key={idx} style={{ padding: '12px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{comm.subject}</strong>
                          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{comm.date} · {comm.channel}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{comm.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fee Summary */}
              {detailTab === 'fees' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} /> Fee Accounts Audit
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Total Fee Assigned</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{selectedParent.feeSummary.total}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Paid Amount</span>
                      <strong style={{ color: 'var(--accent-success)' }}>{selectedParent.feeSummary.paid}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Pending Amount</span>
                      <strong style={{ color: 'var(--accent-danger)' }}>{selectedParent.feeSummary.pending}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Dues Status</span>
                      <StatusBadge status={selectedParent.feeSummary.status} label={selectedParent.feeSummary.statusLabel} />
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

export default ParentsPage;
