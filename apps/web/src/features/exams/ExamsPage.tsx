import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { KPICard } from '../../components/erp/KPICard';
import { StatusBadge } from '../../components/erp/StatusBadge';
import { 
  Plus, Calendar, Award, FileSpreadsheet, Send, ShieldAlert, FileText, CheckCircle
} from 'lucide-react';

interface ExamType {
  name: string;
  weightage: string;
  description: string;
}

interface ExamScheduleItem {
  id: string;
  subject: string;
  className: string;
  date: string;
  time: string;
  room: string;
}

interface GradeSystemBracket {
  grade: string;
  range: string;
  points: number;
  remarks: string;
}

interface StudentMarkInput {
  id: string;
  name: string;
  rollNo: string;
  marksObtained: string;
  maxMarks: number;
}

const mockExamTypes: ExamType[] = [
  { name: 'Unit Test I', weightage: '15%', description: 'First term formative assessment tests.' },
  { name: 'Mid Term Examination', weightage: '35%', description: 'Terminal exam block covering first half syllabus.' },
  { name: 'Final Term Examination', weightage: '50%', description: 'Summative annual assessment tests.' }
];

const mockSchedules: ExamScheduleItem[] = [
  { id: 'sch-1', subject: 'Mathematics', className: 'Class 10 A', date: '2026-07-10', time: '09:00 AM - 12:00 PM', room: 'Hall A' },
  { id: 'sch-2', subject: 'Physics', className: 'Class 10 A', date: '2026-07-12', time: '09:00 AM - 12:00 PM', room: 'Hall A' },
  { id: 'sch-3', subject: 'Chemistry', className: 'Class 9 A', date: '2026-07-11', time: '01:00 PM - 04:00 PM', room: 'Hall B' }
];

const mockGrades: GradeSystemBracket[] = [
  { grade: 'A+', range: '90% - 100%', points: 10, remarks: 'Outstanding' },
  { grade: 'A', range: '80% - 89%', points: 9, remarks: 'Excellent' },
  { grade: 'B+', range: '70% - 79%', points: 8, remarks: 'Very Good' },
  { grade: 'B', range: '60% - 69%', points: 7, remarks: 'Good' },
  { grade: 'C', range: '50% - 59%', points: 6, remarks: 'Satisfactory' },
  { grade: 'F', range: 'Below 50%', points: 0, remarks: 'Fail' }
];

const initialMarkInputs: StudentMarkInput[] = [
  { id: 'st-1', name: 'John Doe', rollNo: '10A-01', marksObtained: '', maxMarks: 100 },
  { id: 'st-2', name: 'Rohan Gupta', rollNo: '10A-02', marksObtained: '', maxMarks: 100 },
  { id: 'st-3', name: 'Sanya Malhotra', rollNo: '10A-03', marksObtained: '', maxMarks: 100 }
];

const ExamsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'schedule' | 'marks' | 'results'>('types');
  const [marksInputs, setMarksInputs] = useState<StudentMarkInput[]>(initialMarkInputs);
  const [selectedClass, setSelectedClass] = useState('Class 10 A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerToast('📝 Committing marks ledger to portal registry...');
    setTimeout(() => {
      setIsLoading(false);
      triggerToast('✅ Student marks successfully recorded!');
    }, 1200);
  };

  const handleGenerateResults = () => {
    setIsLoading(true);
    triggerToast('⚡ Executing GPAs compiling algorithm...');
    setTimeout(() => {
      setIsLoading(false);
      triggerToast('🎉 Term 1 Results compiled and published successfully!');
    }, 1500);
  };

  const scheduleColumns: GridColumn<ExamScheduleItem>[] = [
    { key: 'subject', header: 'Subject', sortable: true },
    { key: 'className', header: 'Class Room', sortable: true },
    { key: 'date', header: 'Exam Date', sortable: true },
    { key: 'time', header: 'Timings' },
    { key: 'room', header: 'Assigned Hall', sortable: true }
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
        title="Exams & Grading Portal"
        subtitle="Schedule examinations, verify candidate hall tickets, record subject marks, and release final GPA results"
        breadcrumbs={[{ label: 'Exams' }]}
        actions={
          <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Plus size={15} /> Create Exam Block
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
        <KPICard title="Scheduled Exams" value={mockSchedules.length} icon={<Calendar size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Active Exam Types" value={mockExamTypes.length} icon={<Award size={20} />} accentColor="var(--accent-violet)" />
        <KPICard title="Dossiers Drafted" value="12 Classes" icon={<FileText size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Grades Released" value="0%" icon={<Send size={20} />} accentColor="var(--accent-warning)" />
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1px', gap: '24px', overflowX: 'auto' }}>
        {[
          { id: 'types', label: 'Exam Types & Grading', icon: <Award size={15} /> },
          { id: 'schedule', label: 'Schedules & Hall Tickets', icon: <Calendar size={15} /> },
          { id: 'marks', label: 'Marks Entry Console', icon: <FileSpreadsheet size={15} /> },
          { id: 'results', label: 'Result Generation Engine', icon: <Send size={15} /> },
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
        {/* Tab 1: Exam Types & Grade system */}
        {activeTab === 'types' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Active Assessment Formats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mockExamTypes.map((item, idx) => (
                  <div key={idx} style={{ padding: '16px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{item.name}</strong>
                      <span style={{ fontSize: '13px', background: 'var(--accent-primary-surface)', color: 'var(--accent-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Weight: {item.weightage}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Reference Grading Matrix</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockGrades.map((g, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)', fontSize: '13px' }}>
                    <div>
                      <strong style={{ color: 'var(--text-primary)' }}>Grade {g.grade}</strong>
                      <span style={{ color: 'var(--text-secondary)', marginLeft: '10px' }}>({g.remarks})</span>
                    </div>
                    <span style={{ color: 'var(--text-primary)' }}>Range: <strong>{g.range}</strong> · Pt: {g.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Schedule & Hall Tickets */}
        {activeTab === 'schedule' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DataGrid
              columns={scheduleColumns}
              data={mockSchedules}
              keyField="id"
              actions={(row) => (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => triggerToast(`🎟️ Generating Hall Tickets list PDF for ${row.className}...`)}
                  style={{ border: '1px solid var(--border-subtle)', fontSize: '12px' }}
                >
                  Generate Tickets
                </button>
              )}
            />

            {/* Hall ticket instructions info card */}
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', borderLeft: '4px solid var(--accent-primary)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} style={{ color: 'var(--accent-primary)' }} /> Hall Tickets Policy Guidelines
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Hall tickets are automatically configured based on classroom exam schedule seating limits. 
                Generate Hall Tickets action drafts printable cards detailing candidate roll, assigned seat desk indices, and dates schedule.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Marks Entry Console */}
        {activeTab === 'marks' && (
          <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Terminal Marks Entry Console</h3>
            
            <form onSubmit={handleSaveMarks} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Target Class Room</label>
                  <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', height: '40px' }}>
                    <option value="Class 10 A">Class 10 A</option>
                    <option value="Class 9 A">Class 9 A</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Subject</label>
                  <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} style={{ padding: '10px 12px', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', height: '40px' }}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
              </div>

              {/* Marks inputs table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-surface-raised)', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Roll Number</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Candidate Name</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600 }}>Max Marks</th>
                    <th style={{ padding: '10px 12px', fontWeight: 600, width: '160px' }}>Marks Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {marksInputs.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{item.rollNo}</td>
                      <td style={{ padding: '10px 12px' }}>{item.name}</td>
                      <td style={{ padding: '10px 12px' }}>{item.maxMarks}</td>
                      <td style={{ padding: '8px 12px' }}>
                        <input 
                          type="number"
                          placeholder="Enter score"
                          value={item.marksObtained}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMarksInputs(prev => prev.map(m => m.id === item.id ? { ...m, marksObtained: val } : m));
                          }}
                          style={{ padding: '6px 10px', border: '1px solid var(--border-subtle)', borderRadius: '6px', width: '100%', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ alignSelf: 'flex-end', padding: '10px 24px' }}>
                {isLoading ? 'Saving ledger...' : 'Commit Marks Record'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Result Generation Engine */}
        {activeTab === 'results' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Compile Term Grade Reports</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                This console triggers final calculation sweeps. It compiles overall student averages, calculates CGPA, determines pass/fail marks parameters, and updates report cards in the parental portals.
              </p>
              <button 
                onClick={handleGenerateResults} 
                disabled={isLoading}
                className="btn btn-primary"
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <CheckCircle size={16} /> Compile & Publish Results
              </button>
            </div>

            <div className="card" style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>Status Log</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                  <span>Unit Test I Results</span>
                  <StatusBadge status="success" label="PUBLISHED" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px dashed var(--border-subtle)' }}>
                  <span>Mid Term Results</span>
                  <StatusBadge status="warning" label="READY" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Annual Term Results</span>
                  <StatusBadge status="neutral" label="PENDING" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </PageLayout>
  );
};

export default ExamsPage;
