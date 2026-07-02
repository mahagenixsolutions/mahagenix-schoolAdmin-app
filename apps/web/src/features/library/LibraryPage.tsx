import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { KPICard } from '../../components/erp/KPICard';
import { StatusBadge } from '../../components/erp/StatusBadge';
import { FilterBar } from '../../components/erp/FilterBar';
import { 
  Plus, BookOpen, Clock, AlertTriangle, BookMarked, Library, ArrowRight
} from 'lucide-react';

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  copies: string;
  status: 'success' | 'warning';
  statusLabel: string;
}

interface CirculationRecord {
  id: string;
  bookTitle: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  status: 'success' | 'danger';
  statusLabel: string;
}

interface ReservationItem {
  bookTitle: string;
  studentName: string;
  reserveDate: string;
  queueNo: number;
}

interface FineItem {
  studentName: string;
  bookTitle: string;
  daysOverdue: number;
  fineAmount: string;
  status: 'warning' | 'success';
  statusLabel: string;
}

const initialBooks: BookItem[] = [
  { id: 'BK-501', title: 'Fundamentals of Quantum Mechanics', author: 'Dr. David Griffiths', category: 'Science', copies: '3 / 4 Available', status: 'success', statusLabel: 'Available' },
  { id: 'BK-721', title: 'A History of Ancient Civilizations', author: 'Arnold Toynbee', category: 'History', copies: '0 / 2 Available', status: 'warning', statusLabel: 'Checked Out' },
  { id: 'BK-108', title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', copies: '1 / 3 Available', status: 'success', statusLabel: 'Available' }
];

const initialCirculation: CirculationRecord[] = [
  { id: 'circ-1', bookTitle: 'A History of Ancient Civilizations', studentName: 'John Doe', issueDate: '2026-06-15', dueDate: '2026-06-29', status: 'danger', statusLabel: 'Overdue' },
  { id: 'circ-2', bookTitle: 'Calculus: Early Transcendentals', studentName: 'Sanya Malhotra', issueDate: '2026-06-28', dueDate: '2026-07-12', status: 'success', statusLabel: 'Issued' }
];

const mockReservations: ReservationItem[] = [
  { bookTitle: 'A History of Ancient Civilizations', studentName: 'Rohan Gupta', reserveDate: '2026-06-30', queueNo: 1 }
];

const initialFines: FineItem[] = [
  { studentName: 'John Doe', bookTitle: 'A History of Ancient Civilizations', daysOverdue: 3, fineAmount: '₹15', status: 'warning', statusLabel: 'Unpaid' }
];

const LibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'circulation' | 'reservations' | 'fines'>('catalog');
  const [books] = useState<BookItem[]>(initialBooks);
  const [circulation, setCirculation] = useState<CirculationRecord[]>(initialCirculation);
  const [fines, setFines] = useState<FineItem[]>(initialFines);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Issue book form states
  const [selectedBookId, setSelectedBookId] = useState('');
  const [targetStudentName, setTargetStudentName] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    const targetBook = books.find(b => b.id === selectedBookId || b.title.toLowerCase().includes(selectedBookId.toLowerCase()));
    if (!targetBook) {
      triggerToast('❌ Error: Book not found in catalog.');
      return;
    }

    setIsLoading(true);
    triggerToast(`📖 Checking out "${targetBook.title}"...`);
    
    setTimeout(() => {
      setIsLoading(false);
      const newCircRecord: CirculationRecord = {
        id: `circ-${circulation.length + 1}`,
        bookTitle: targetBook.title,
        studentName: targetStudentName,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'success',
        statusLabel: 'Issued'
      };

      setCirculation([newCircRecord, ...circulation]);
      triggerToast(`✅ Book successfully checked out! Due date: ${newCircRecord.dueDate}`);
      setSelectedBookId('');
      setTargetStudentName('');
    }, 1200);
  };

  const handleReturnBook = (circId: string, title: string) => {
    setCirculation(prev => prev.filter(c => c.id !== circId));
    // Clear fine if returning an overdue book
    setFines(prev => prev.filter(f => f.bookTitle !== title));
    triggerToast(`✅ Book "${title}" successfully returned to catalog.`);
  };

  const handlePayFine = (studentName: string) => {
    setFines(prev => prev.map(f => f.studentName === studentName ? { ...f, status: 'success', statusLabel: 'Paid', fineAmount: '₹0' } : f));
    triggerToast(`💳 Outstanding fine cleared for ${studentName}.`);
  };

  // Filter Catalog
  const filteredCatalog = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory ? b.category === selectedCategory : true;
    return matchesSearch && matchesCat;
  });

  const catalogColumns: GridColumn<BookItem>[] = [
    { key: 'id', header: 'Book ID', sortable: true },
    { key: 'title', header: 'Book Title', sortable: true, render: (row) => <strong>{row.title}</strong> },
    { key: 'author', header: 'Author', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'copies', header: 'Copies Details' },
    { key: 'status', header: 'Status', sortable: true, render: (row) => <StatusBadge status={row.status} label={row.statusLabel} /> }
  ];

  const circulationColumns: GridColumn<CirculationRecord>[] = [
    { key: 'bookTitle', header: 'Book Title', sortable: true },
    { key: 'studentName', header: 'Borrowed By', sortable: true },
    { key: 'issueDate', header: 'Issued On', sortable: true },
    { key: 'dueDate', header: 'Due Date', sortable: true },
    { key: 'status', header: 'State', sortable: true, render: (row) => <StatusBadge status={row.status} label={row.statusLabel} /> }
  ];

  const reservationColumns: GridColumn<ReservationItem>[] = [
    { key: 'bookTitle', header: 'Book Title', sortable: true },
    { key: 'studentName', header: 'Reserved By', sortable: true },
    { key: 'reserveDate', header: 'Reserved On', sortable: true },
    { key: 'queueNo', header: 'Hold Queue Pos' }
  ];

  const fineColumns: GridColumn<FineItem>[] = [
    { key: 'studentName', header: 'Student Name', sortable: true },
    { key: 'bookTitle', header: 'Book Title', sortable: true },
    { key: 'daysOverdue', header: 'Days Past Due', sortable: true },
    { key: 'fineAmount', header: 'Fine Dues', sortable: true },
    { key: 'status', header: 'Status', sortable: true, render: (row) => <StatusBadge status={row.status} label={row.statusLabel} /> }
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
        title="Library Circulation Desk"
        subtitle="Manage library inventory catalogs, borrow issues, checked-out returns, candidate reservations, and late fines collection"
        breadcrumbs={[{ label: 'Library' }]}
        actions={
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Plus size={15} /> Add Book Copy
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
        <KPICard title="Library Inventory" value={books.length} icon={<Library size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Checked Out" value={circulation.length} icon={<Clock size={20} />} accentColor="var(--accent-violet)" />
        <KPICard title="Active Holds" value={mockReservations.length} icon={<BookMarked size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Outstanding Fines" value="₹15 Unpaid" icon={<AlertTriangle size={20} />} accentColor="var(--accent-danger)" />
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1px', gap: '24px', overflowX: 'auto' }}>
        {[
          { id: 'catalog', label: 'Book Catalog & Genres', icon: <BookOpen size={15} /> },
          { id: 'circulation', label: 'Borrow & Returns Console', icon: <Clock size={15} /> },
          { id: 'reservations', label: 'Reservations Queue', icon: <BookMarked size={15} /> },
          { id: 'fines', label: 'Fines & Reports Logs', icon: <AlertTriangle size={15} /> },
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
        {/* Tab 1: Catalog */}
        {activeTab === 'catalog' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search books by title, author, or Book ID..."
              dropdowns={[
                {
                  name: 'category',
                  label: 'Genres',
                  options: [
                    { value: 'Science', label: 'Science' },
                    { value: 'History', label: 'History' },
                    { value: 'Mathematics', label: 'Mathematics' }
                  ],
                  value: selectedCategory,
                  onChange: setSelectedCategory
                }
              ]}
            />

            <DataGrid
              columns={catalogColumns}
              data={filteredCatalog}
              keyField="id"
            />
          </div>
        )}

        {/* Tab 2: Circulation borrow/returns */}
        {activeTab === 'circulation' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Issue Book Checkout</h3>
              
              <form onSubmit={handleIssueBook} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Book ID or Title</label>
                  <select value={selectedBookId} onChange={e => setSelectedBookId(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', height: '40px' }}>
                    <option value="">-- Select Available Book --</option>
                    {books.filter(b => b.statusLabel === 'Available').map(b => (
                      <option key={b.id} value={b.id}>{b.title} [{b.id}]</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Borrower Student Name</label>
                  <input type="text" required value={targetStudentName} onChange={e => setTargetStudentName(e.target.value)} placeholder="e.g. John Doe" style={{ padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)' }} />
                </div>
                <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ padding: '10px 16px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight size={15} /> Issue Book Copy
                </button>
              </form>
            </div>

            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Active Checkout Logs</h3>
              <DataGrid
                columns={circulationColumns}
                data={circulation}
                keyField="id"
                actions={(row) => (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleReturnBook(row.id, row.bookTitle)}
                    style={{ fontSize: '12px' }}
                  >
                    Return Book
                  </button>
                )}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Reservations Hold Queue */}
        {activeTab === 'reservations' && (
          <DataGrid
            columns={reservationColumns}
            data={mockReservations}
            keyField="bookTitle"
          />
        )}

        {/* Tab 4: Fines & Reports */}
        {activeTab === 'fines' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Overdue Fines Records</h3>
              <DataGrid
                columns={fineColumns}
                data={fines}
                keyField="studentName"
                actions={(row) => (
                  row.fineAmount !== '₹0' ? (
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePayFine(row.studentName)}
                      style={{ fontSize: '12px' }}
                    >
                      Clear Fine
                    </button>
                  ) : <StatusBadge status="success" label="CLEARED" />
                )}
              />
            </div>

            {/* Reports description card */}
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Library Inventory Auditing</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Library circulation desks run periodic auditing scripts on transaction log records. 
                Reports generate monthly borrowing rates, overdue summaries, categorised checklists, and penalty collections counts.
              </p>
            </div>
          </div>
        )}
      </div>

    </PageLayout>
  );
};

export default LibraryPage;
