import { useState } from 'react';
import { Save, Check, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { mockRoster } from './mockCommandCenterData';

type TabType = 'attendance' | 'marks' | 'remarks';

export default function BulkActionSpreadsheet() {
  const [activeTab, setActiveTab] = useState<TabType>('attendance');
  const [roster, setRoster] = useState(mockRoster);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMarkAllPresent = () => {
    setRoster(prev => prev.map(student => ({ ...student, attendance: 'present' })));
    triggerToast('📋 Marked all students as Present.');
  };

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setRoster(prev => prev.map(s => s.id === studentId ? { ...s, attendance: status } : s));
  };

  const handleMarksChange = (studentId: string, field: 'quiz1' | 'midterm', val: string) => {
    const numericVal = Math.max(0, Math.min(100, Number(val) || 0));
    setRoster(prev => prev.map(s => s.id === studentId ? { ...s, marks: { ...s.marks, [field]: numericVal } } : s));
  };

  const handleRemarkChange = (studentId: string, remark: string) => {
    setRoster(prev => prev.map(s => s.id === studentId ? { ...s, remark } : s));
  };

  const handleBadgeChange = (studentId: string, badge: string) => {
    // In a real app we might store this, here we can log/toast
    triggerToast(`🏅 Badge assigned: "${badge}" for student ${studentId}`);
  };

  const handleSaveDraft = () => {
    setIsProcessing(true);
    triggerToast('💾 Stashing spreadsheet draft revisions...');
    setTimeout(() => {
      setIsProcessing(false);
      triggerToast('✅ Spreadsheet draft stashed successfully.');
    }, 1000);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    triggerToast('🚀 Synchronizing sheet with school database...');
    setTimeout(() => {
      setIsProcessing(false);
      triggerToast('🎉 Roster data submitted and locked successfully!');
    }, 1500);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '600px', position: 'relative' }}>
      
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Tabs Header */}
      <div className="card-header border-b" style={{ padding: '0', display: 'flex', background: 'var(--bg-surface)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {[
          { id: 'attendance', label: 'Attendance' },
          { id: 'marks', label: 'Marks & Grades' },
          { id: 'remarks', label: 'Remarks & Badges' },
        ].map(tab => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            style={{
              padding: '16px 24px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: 0
            }}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Action Toolbar */}
      <div style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-body)' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Showing <strong>{roster.length}</strong> students in Class 8 Science
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {activeTab === 'attendance' && (
             <Button variant="outline" size="sm" onClick={handleMarkAllPresent} startIcon={<Check size={14}/>}>Mark All Present</Button>
          )}
          <Button variant="secondary" size="sm" onClick={handleSaveDraft} disabled={isProcessing} loading={isProcessing} startIcon={!isProcessing && <Save size={14}/>}>Save Draft</Button>
          <Button variant="primary" size="sm" onClick={handleSubmit} disabled={isProcessing} loading={isProcessing}>Submit to Database</Button>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div style={{ flex: 1, overflowX: 'auto', background: 'var(--bg-surface)' }}>
        <table className="table" style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'var(--bg-body)' }}>
            <tr>
              <th style={{ width: '60px', textAlign: 'center' }}>Roll</th>
              <th style={{ width: '250px' }}>Student Name</th>
              
              {/* Dynamic Columns based on Tab */}
              {activeTab === 'attendance' && (
                <>
                  <th style={{ textAlign: 'center' }}>Present</th>
                  <th style={{ textAlign: 'center' }}>Absent</th>
                  <th style={{ textAlign: 'center' }}>Late</th>
                </>
              )}
              {activeTab === 'marks' && (
                <>
                  <th style={{ width: '120px' }}>Quiz 1 (100)</th>
                  <th style={{ width: '120px' }}>Midterm (100)</th>
                  <th>Total (%)</th>
                </>
              )}
              {activeTab === 'remarks' && (
                <>
                  <th style={{ width: '150px' }}>Assign Badge</th>
                  <th>Teacher Remark (Visible to Parents)</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {roster.map(student => (
              <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 600 }}>{student.roll}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>
                  {student.name}
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 400 }}>{student.id}</div>
                </td>

                {/* Attendance Inputs */}
                {activeTab === 'attendance' && (
                  <>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="radio" 
                        name={`att-${student.id}`} 
                        checked={student.attendance === 'present'} 
                        onChange={() => handleAttendanceChange(student.id, 'present')} 
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-success)', cursor: 'pointer' }} 
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="radio" 
                        name={`att-${student.id}`} 
                        checked={student.attendance === 'absent'} 
                        onChange={() => handleAttendanceChange(student.id, 'absent')} 
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-danger)', cursor: 'pointer' }} 
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="radio" 
                        name={`att-${student.id}`} 
                        checked={student.attendance === 'late'} 
                        onChange={() => handleAttendanceChange(student.id, 'late')} 
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-warning)', cursor: 'pointer' }} 
                      />
                    </td>
                  </>
                )}

                {/* Marks Inputs */}
                {activeTab === 'marks' && (
                  <>
                    <td>
                      <input 
                        type="number" 
                        value={student.marks.quiz1} 
                        onChange={(e) => handleMarksChange(student.id, 'quiz1', e.target.value)} 
                        className="form-input" 
                        style={{ width: '80px', padding: '6px', fontSize: '13px', textAlign: 'right' }} 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        value={student.marks.midterm} 
                        onChange={(e) => handleMarksChange(student.id, 'midterm', e.target.value)} 
                        className="form-input" 
                        style={{ width: '80px', padding: '6px', fontSize: '13px', textAlign: 'right' }} 
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '14px', paddingLeft: '8px' }}>
                        {((student.marks.quiz1 + student.marks.midterm) / 2).toFixed(1)}%
                      </div>
                    </td>
                  </>
                )}

                {/* Remarks Inputs */}
                {activeTab === 'remarks' && (
                  <>
                    <td>
                      <select 
                        className="form-select" 
                        onChange={(e) => handleBadgeChange(student.id, e.target.value)} 
                        style={{ width: '100%', fontSize: '13px', padding: '6px' }}
                      >
                        <option value="">None</option>
                        <option value="Star Coder">⭐ Star Coder</option>
                        <option value="Leader">👑 Leader</option>
                        <option value="Most Improved">📈 Most Improved</option>
                      </select>
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={student.remark} 
                        onChange={(e) => handleRemarkChange(student.id, e.target.value)} 
                        className="form-input" 
                        placeholder="Type a remark..." 
                        style={{ width: '100%', padding: '6px', fontSize: '13px' }} 
                      />
                    </td>
                  </>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

