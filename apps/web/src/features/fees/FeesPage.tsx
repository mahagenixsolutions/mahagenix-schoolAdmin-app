import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { KPICard } from '../../components/erp/KPICard';
import { 
  Plus, CreditCard, Banknote, ShieldAlert, Award
} from 'lucide-react';

interface FeeStructureItem {
  className: string;
  tuitionFee: string;
  termFee: string;
  examFee: string;
  total: string;
}

interface FeeTransaction {
  id: string;
  studentName: string;
  className: string;
  amount: string;
  date: string;
  method: string;
  receiptNo: string;
}

interface PendingFeeItem {
  id: string;
  studentName: string;
  className: string;
  pendingAmount: string;
  daysOverdue: number;
  fineAmount: string;
}

interface ScholarshipItem {
  studentName: string;
  className: string;
  scholarshipName: string;
  waiverPercent: string;
}

const mockStructures: FeeStructureItem[] = [
  { className: 'Class 10 A', tuitionFee: '₹40,000', termFee: '₹15,000', examFee: '₹5,000', total: '₹60,000' },
  { className: 'Class 9 A', tuitionFee: '₹35,000', termFee: '₹10,000', examFee: '₹3,000', total: '₹48,000' },
  { className: 'Class 5 B', tuitionFee: '₹30,000', termFee: '₹12,000', examFee: '₹3,000', total: '₹45,000' }
];

const mockTransactions: FeeTransaction[] = [
  { id: 'txn-1', studentName: 'John Doe', className: 'Class 10 A', amount: '₹15,000', date: '2026-06-30', method: 'Online UPI', receiptNo: 'REC-901' },
  { id: 'txn-2', studentName: 'Sanya Malhotra', className: 'Class 5 B', amount: '₹45,000', date: '2026-06-28', method: 'Card Swipe', receiptNo: 'REC-902' }
];

const mockPending: PendingFeeItem[] = [
  { id: 'pend-1', studentName: 'Rohan Gupta', className: 'Class 1 A', pendingAmount: '₹18,000', daysOverdue: 5, fineAmount: '₹250' },
  { id: 'pend-2', studentName: 'Aditya Roy', className: 'Class 3 A', pendingAmount: '₹24,000', daysOverdue: 12, fineAmount: '₹600' }
];

const mockScholarships: ScholarshipItem[] = [
  { studentName: 'John Doe', className: 'Class 10 A', scholarshipName: 'Merit Scholarship', waiverPercent: '50% Waiver' },
  { studentName: 'Kabir Verma', className: 'Class 9 A', scholarshipName: 'Sports Excellence Waiver', waiverPercent: '100% Waiver' }
];

const FeesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'pending' | 'scholarships'>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const structureColumns: GridColumn<FeeStructureItem>[] = [
    { key: 'className', header: 'Class Room', sortable: true },
    { key: 'tuitionFee', header: 'Tuition Fee' },
    { key: 'termFee', header: 'Term Fee' },
    { key: 'examFee', header: 'Exam Fee' },
    { key: 'total', header: 'Total Slabs', sortable: true }
  ];

  const transactionColumns: GridColumn<FeeTransaction>[] = [
    { key: 'receiptNo', header: 'Receipt No', sortable: true },
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'className', header: 'Class Room' },
    { key: 'amount', header: 'Amount Paid', sortable: true },
    { key: 'date', header: 'Transaction Date', sortable: true },
    { key: 'method', header: 'Payment Method' }
  ];

  const pendingColumns: GridColumn<PendingFeeItem>[] = [
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'className', header: 'Class Room' },
    { key: 'pendingAmount', header: 'Pending Dues', sortable: true },
    { key: 'daysOverdue', header: 'Days Overdue', sortable: true },
    { key: 'fineAmount', header: 'Accrued Fines', sortable: true }
  ];

  const scholarshipColumns: GridColumn<ScholarshipItem>[] = [
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'className', header: 'Class Room' },
    { key: 'scholarshipName', header: 'Waiver Scheme', sortable: true },
    { key: 'waiverPercent', header: 'Scholarship Details' }
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
        title="Fees & Invoices Hub"
        subtitle="Manage classroom tuition fee configurations, record payments collection, issue receipts, and manage student waivers"
        breadcrumbs={[{ label: 'Fees' }]}
        actions={
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Plus size={15} /> Configure Fee Slabs
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
        <KPICard title="Total Receivable" value="₹12,45,000" icon={<CreditCard size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Fees Collected" value="₹8,92,000" icon={<Banknote size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Pending Dues" value="₹3,53,000" icon={<ShieldAlert size={20} />} accentColor="var(--accent-danger)" />
        <KPICard title="Waivers Disbursed" value="₹42,000" icon={<Award size={20} />} accentColor="var(--accent-violet)" />
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1px', gap: '24px', overflowX: 'auto' }}>
        {[
          { id: 'dashboard', label: 'Fee Dashboard & Structures', icon: <CreditCard size={15} /> },
          { id: 'transactions', label: 'Collections & Receipts', icon: <Banknote size={15} /> },
          { id: 'pending', label: 'Pending & Fines', icon: <ShieldAlert size={15} /> },
          { id: 'scholarships', label: 'Scholarships & Discounts', icon: <Award size={15} /> },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
        {/* Tab 1: Dashboard & Structures */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Tuition Fee Structures per Class</h3>
              <DataGrid
                columns={structureColumns}
                data={mockStructures}
                keyField="className"
              />
            </div>

            {/* General relief discounts summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
              <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Active Discount Slabs</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Sibling Waiver', rate: '10% Off Tuition', desc: 'Applicable to families with multiple children enrolled.' },
                    { name: 'Staff Child Waiver', rate: '25% Off Tuition', desc: 'Applicable to full-time faculty and administration staffs.' },
                  ].map((disc, idx) => (
                    <div key={idx} style={{ padding: '12px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{disc.name}</strong>
                        <span style={{ fontSize: '11px', background: 'var(--accent-success-surface)', color: 'var(--accent-success)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{disc.rate}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{disc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Fine Policy Rules</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                    <span>Late Payment Grace Term</span>
                    <strong style={{ color: 'var(--text-primary)' }}>7 Days</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                    <span>Accruing Penalty Rate</span>
                    <strong style={{ color: 'var(--accent-danger)' }}>₹50 / Day</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Max Penalty Limit</span>
                    <strong style={{ color: 'var(--text-primary)' }}>₹2,500 Max</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Collections & Receipts */}
        {activeTab === 'transactions' && (
          <DataGrid
            columns={transactionColumns}
            data={mockTransactions}
            keyField="id"
            actions={(row) => (
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => triggerToast(`🎟️ Issuing payment receipt PDF for ${row.receiptNo}...`)}
                style={{ border: '1px solid var(--border-subtle)', fontSize: '12px' }}
              >
                Download Receipt
              </button>
            )}
          />
        )}

        {/* Tab 3: Pending & Overdue */}
        {activeTab === 'pending' && (
          <DataGrid
            columns={pendingColumns}
            data={mockPending}
            keyField="id"
            actions={(row) => (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => triggerToast(`✉️ Fee overdue reminder sent to parent of ${row.studentName}.`)}
                style={{ fontSize: '12px' }}
              >
                Send Reminder
              </button>
            )}
          />
        )}

        {/* Tab 4: Scholarships & Discounts */}
        {activeTab === 'scholarships' && (
          <DataGrid
            columns={scholarshipColumns}
            data={mockScholarships}
            keyField="studentName"
          />
        )}
      </div>

    </PageLayout>
  );
};

export default FeesPage;
