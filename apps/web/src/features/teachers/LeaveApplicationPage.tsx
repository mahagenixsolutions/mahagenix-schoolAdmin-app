import { useState } from 'react';
import { ArrowLeft, Send, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LeaveApplicationPage() {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="page-container" style={{ padding: 24 }}>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button onClick={() => navigate(-1)} style={{ padding: 8, background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: '50%' }}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="page-title" style={{ margin: 0, fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>Apply for Leave</h1>
          <p className="page-subtitle" style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>Submit a leave request to the administration.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 600, background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 12, overflow: 'hidden' }}>
        <form className="card-body" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24 }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>Leave Type</label>
            <select value={leaveType} onChange={e => setLeaveType(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }}>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Maternity Leave</option>
              <option>Unpaid Leave</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>Start Date</label>
              <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>End Date</label>
              <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>Reason / Remarks</label>
            <textarea required rows={4} value={reason} onChange={e => setReason(e.target.value)} placeholder="Provide details for your leave request..." style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-primary)', fontSize: 14, resize: 'vertical', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
            <button type="button" onClick={() => navigate(-1)} style={{ padding: '10px 16px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: 8, color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px', background: 'var(--color-primary)', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Request</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
