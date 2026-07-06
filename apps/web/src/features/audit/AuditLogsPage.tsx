import { useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Filter,
  KeyRound,
  Lock,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
} from 'lucide-react';

const eventTypes = ['All', 'Login', 'Data Change', 'Security', 'Export', 'System'];
const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

const auditEvents = [
  { id: 'aud-001', actor: 'Aarav Mehta', role: 'School Admin', action: 'Exported full dashboard PDF', type: 'Export', severity: 'Low', module: 'Reports', ip: '103.48.22.14', device: 'Chrome on Windows', time: 'Today, 10:42 AM', status: 'Success', detail: 'Generated executive dashboard export for academic year 2026-27.' },
  { id: 'aud-002', actor: 'Finance Office', role: 'Staff', action: 'Updated fee collection record', type: 'Data Change', severity: 'Medium', module: 'Fees', ip: '103.48.22.18', device: 'Edge on Windows', time: 'Today, 10:16 AM', status: 'Success', detail: 'Changed payment status for 12 pending invoices after bank reconciliation.' },
  { id: 'aud-003', actor: 'Unknown user', role: 'External', action: 'Failed login attempt', type: 'Security', severity: 'High', module: 'Auth', ip: '45.91.18.201', device: 'Unknown browser', time: 'Today, 09:58 AM', status: 'Blocked', detail: 'Five failed password attempts for admin@edutrack.demo. Temporary lock applied.' },
  { id: 'aud-004', actor: 'Nisha Rao', role: 'Teacher', action: 'Published Class 1 marks', type: 'Data Change', severity: 'Low', module: 'Marks', ip: '103.48.22.31', device: 'Safari on iPad', time: 'Yesterday, 04:30 PM', status: 'Success', detail: 'Published Unit Test 1 marks and triggered parent notifications.' },
  { id: 'aud-005', actor: 'System', role: 'Automation', action: 'Daily backup completed', type: 'System', severity: 'Low', module: 'Infrastructure', ip: 'Internal', device: 'Scheduled job', time: 'Yesterday, 02:00 AM', status: 'Success', detail: 'Encrypted backup completed in 14 minutes. Retention policy applied.' },
  { id: 'aud-006', actor: 'Aarav Mehta', role: 'School Admin', action: 'Changed teacher permissions', type: 'Security', severity: 'Critical', module: 'Users', ip: '103.48.22.14', device: 'Chrome on Windows', time: 'Jun 17, 01:25 PM', status: 'Review', detail: 'Granted marks publishing access to two class teachers.' },
  { id: 'aud-007', actor: 'Parent account', role: 'Parent', action: 'Viewed student report card', type: 'Login', severity: 'Low', module: 'Parent Portal', ip: '49.36.44.87', device: 'Android Chrome', time: 'Jun 17, 08:35 AM', status: 'Success', detail: 'Parent viewed quarterly progress report for Aanya Sharma.' },
  { id: 'aud-008', actor: 'Kabir Sen', role: 'Teacher', action: 'Downloaded attendance CSV', type: 'Export', severity: 'Medium', module: 'Attendance', ip: '103.48.22.46', device: 'Firefox on Linux', time: 'Jun 16, 03:05 PM', status: 'Success', detail: 'Export contained Class 4 A attendance records for June.' },
];

const userHeatmap = [
  { user: 'Aarav Mehta', Mon: 8, Tue: 11, Wed: 7, Thu: 14, Fri: 9 },
  { user: 'Nisha Rao', Mon: 6, Tue: 9, Wed: 12, Thu: 8, Fri: 5 },
  { user: 'Finance Office', Mon: 4, Tue: 7, Wed: 10, Thu: 11, Fri: 6 },
  { user: 'System Jobs', Mon: 12, Tue: 12, Wed: 12, Thu: 12, Fri: 12 },
  { user: 'Parents', Mon: 18, Tue: 22, Wed: 16, Thu: 25, Fri: 20 },
];

const securityLogs = [
  { title: 'Admin account lock triggered', time: 'Today, 09:58 AM', severity: 'High', state: 'Blocked' },
  { title: 'Permission elevation requires review', time: 'Jun 17, 01:25 PM', severity: 'Critical', state: 'Review' },
  { title: 'New device login from teacher account', time: 'Jun 16, 09:18 AM', severity: 'Medium', state: 'Verified' },
  { title: 'Backup encryption key rotated', time: 'Jun 15, 02:00 AM', severity: 'Low', state: 'Complete' },
];

const analytics = [
  { label: 'Auth', value: 68, color: '#4F46E5' },
  { label: 'Data changes', value: 44, color: '#10B981' },
  { label: 'Exports', value: 27, color: '#F59E0B' },
  { label: 'Security', value: 13, color: '#F43F5E' },
];

const severityColor: Record<string, { bg: string; text: string; border: string }> = {
  Critical: { bg: 'rgba(244, 63, 94, 0.12)', text: '#BE123C', border: 'rgba(244, 63, 94, 0.28)' },
  High: { bg: 'rgba(245, 158, 11, 0.14)', text: '#92400E', border: 'rgba(245, 158, 11, 0.28)' },
  Medium: { bg: 'rgba(79, 70, 229, 0.10)', text: '#4338CA', border: 'rgba(79, 70, 229, 0.24)' },
  Low: { bg: 'rgba(16, 185, 129, 0.12)', text: '#047857', border: 'rgba(16, 185, 129, 0.24)' },
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [severity, setSeverity] = useState('All');
  const [selectedId, setSelectedId] = useState(auditEvents[0].id);

  // Interaction feedback states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportCSV = () => {
    setIsProcessing(true);
    triggerToast('⏳ Exporting security audit records as CSV...');
    setTimeout(() => {
      setIsProcessing(false);
      triggerToast('📁 Audit CSV generated: 8,426 rows compiled.');
    }, 1200);
  };

  const handleSecurityReview = () => {
    setIsProcessing(true);
    triggerToast('⏳ Commencing automated posture assessment...');
    setTimeout(() => {
      triggerToast('🔍 Reviewing authentication logs & firewall policy...');
      setTimeout(() => {
        setIsProcessing(false);
        triggerToast('🛡️ Posture Review complete: 0 vulnerabilities found.');
      }, 1000);
    }, 1000);
  };

  const filteredEvents = useMemo(() => {
    const term = search.trim().toLowerCase();
    return auditEvents.filter((event) => {
      const matchesType = type === 'All' || event.type === type;
      const matchesSeverity = severity === 'All' || event.severity === severity;
      const matchesSearch = !term || [event.actor, event.action, event.module, event.ip, event.detail].some((value) => value.toLowerCase().includes(term));
      return matchesType && matchesSeverity && matchesSearch;
    });
  }, [search, severity, type]);

  const selectedEvent = auditEvents.find((event) => event.id === selectedId) || auditEvents[0];
  const criticalCount = auditEvents.filter((event) => event.severity === 'Critical' || event.severity === 'High').length;
  const successRate = Math.round((auditEvents.filter((event) => event.status === 'Success').length / auditEvents.length) * 100);

  return (
    <div className="activity-center" style={{ position: 'relative' }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="audit-hero">
        <div>
          <div className="eyebrow">Activity Intelligence Center</div>
          <h1>Audit trails, security posture, and user behavior in one operational view.</h1>
          <p>Search every action, isolate risky events, track user activity patterns, and let AI surface anomalies before they become incidents.</p>
        </div>
        <div className="hero-actions">
          <Button variant="secondary" onClick={handleExportCSV} disabled={isProcessing} loading={isProcessing}>
            {!isProcessing && <Download size={16} />} {isProcessing ? 'Exporting...' : 'Export audit CSV'}
          </Button>
          <Button variant="primary" onClick={handleSecurityReview} disabled={isProcessing}>
            <ShieldCheck size={16} /> Run security review
          </Button>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard icon={<Activity size={20} />} label="Tracked Events" value="8,426" note="Last 30 days" tone="primary" />
        <MetricCard icon={<ShieldAlert size={20} />} label="Risk Events" value={criticalCount} note="High and critical" tone="danger" />
        <MetricCard icon={<CheckCircle2 size={20} />} label="Success Rate" value={`${successRate}%`} note="Completed actions" tone="success" />
        <MetricCard icon={<Users size={20} />} label="Active Users" value="412" note="Across portals" tone="info" />
      </div>


      <div className="filter-panel">
        <div className="search-box">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search actor, action, module, IP..." />
        </div>
        <div className="pill-row">
          <Filter size={16} />
          {eventTypes.map((item) => <Button key={item} variant={type === item ? 'primary' : 'ghost'} onClick={() => setType(item)}>{item}</Button>)}
        </div>
        <div className="pill-row">
          {severities.map((item) => <Button key={item} variant={severity === item ? 'primary' : 'ghost'} className={severity === item ? 'danger' : ''} onClick={() => setSeverity(item)}>{item}</Button>)}
        </div>
      </div>

      <div className="audit-grid">
        <section className="panel timeline-panel">
          <div className="panel-header">
            <div>
              <h2>Activity Timeline</h2>
              <span>{filteredEvents.length} events matching filters</span>
            </div>
          </div>
          <div className="activity-list">
            {filteredEvents.map((event) => {
              const colors = severityColor[event.severity];
              return (
                <Button key={event.id} variant={selectedEvent.id === event.id ? 'primary' : 'ghost'} className={`activity-row ${selectedEvent.id === event.id ? 'selected' : ''}`} onClick={() => setSelectedId(event.id)} style={{ display: 'flex', textAlign: 'left', width: '100%', padding: '12px 16px', gap: '12px' }}>
                  <div className="event-dot" style={{ background: colors.text, marginTop: 4 }} />
                  <div>
                    <div className="row-title" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <strong>{event.action}</strong>
                      <span style={{ background: colors.bg, color: colors.text, borderColor: colors.border, padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600 }}>{event.severity}</span>
                    </div>
                    <p style={{ margin: '4px 0', fontSize: 13 }}>{event.actor} - {event.module} - {event.time}</p>
                    <small style={{ color: 'var(--text-muted)' }}>{event.detail}</small>
                  </div>
                </Button>
              );
            })}
          </div>
        </section>

        <section className="panel detail-panel">
          <div className="detail-top">
            <span>{selectedEvent.type}</span>
            <b>{selectedEvent.status}</b>
          </div>
          <h2>{selectedEvent.action}</h2>
          <p>{selectedEvent.detail}</p>
          <div className="detail-grid">
            <InfoTile icon={<UserCog size={17} />} label="Actor" value={selectedEvent.actor} />
            <InfoTile icon={<KeyRound size={17} />} label="Role" value={selectedEvent.role} />
            <InfoTile icon={<Eye size={17} />} label="IP Address" value={selectedEvent.ip} />
            <InfoTile icon={<Clock size={17} />} label="Device" value={selectedEvent.device} />
          </div>
          <div className="ai-callout">
            <Sparkles size={18} />
            <div>
              <strong>AI monitoring insight</strong>
              <p>{selectedEvent.severity === 'Critical' || selectedEvent.severity === 'High' ? 'This activity should be reviewed today. Similar events are uncommon for this actor and module.' : 'This activity matches normal usage patterns for the current time window.'}</p>
            </div>
          </div>
        </section>

        <section className="panel security-panel">
          <div className="panel-header compact">
            <h2><Lock size={18} /> Security Logs</h2>
          </div>
          <div className="security-list">
            {securityLogs.map((item) => {
              const colors = severityColor[item.severity];
              return (
                <div key={item.title} className="security-card">
                  <span style={{ background: colors.bg, color: colors.text }}>{item.severity}</span>
                  <strong>{item.title}</strong>
                  <p>{item.time} - {item.state}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="bottom-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Activity Analytics</h2>
              <span>Event volume by operational category</span>
            </div>
            <BarChart3 size={20} color="#4F46E5" />
          </div>
          <div className="analytics-list">
            {analytics.map((item) => (
              <div key={item.label} className="analytics-row">
                <div><span>{item.label}</span><strong>{item.value}%</strong></div>
                <div className="track"><div style={{ width: `${item.value}%`, background: item.color }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel heatmap-panel">
          <div className="panel-header">
            <div>
              <h2>User Heatmap</h2>
              <span>Action density by weekday</span>
            </div>
          </div>
          <div className="heatmap-table">
            <div className="heatmap-head"><span>User</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span></div>
            {userHeatmap.map((row) => (
              <div key={row.user} className="heatmap-row">
                <strong>{row.user}</strong>
                {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
                  <span key={day} style={{ opacity: 0.35 + row[day] / 35 }}>{row[day]}</span>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .activity-center { display: flex; flex-direction: column; gap: 20px; padding-bottom: 36px; }
        .audit-hero { min-height: 218px; border-radius: 16px; padding: 28px; color: #fff; background: linear-gradient(120deg, rgba(15,23,42,.88), rgba(67,56,202,.58)), url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&auto=format&fit=crop') center/cover; display: flex; justify-content: space-between; gap: 24px; align-items: flex-end; box-shadow: 0 18px 45px rgba(15,23,42,.18); }
        .audit-hero h1 { max-width: 820px; margin: 8px 0 10px; font-size: 34px; line-height: 1.1; letter-spacing: 0; }
        .audit-hero p { max-width: 760px; margin: 0; color: rgba(255,255,255,.84); font-size: 15px; }
        .eyebrow { text-transform: uppercase; letter-spacing: .08em; font-size: 12px; font-weight: 800; color: rgba(255,255,255,.72); }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        .hero-actions .btn { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .metric-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; display: flex; gap: 14px; align-items: center; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .metric-icon { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; }
        .metric-card span { display: block; color: var(--text-muted); font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .metric-card strong { display: block; margin-top: 2px; color: var(--text-primary); font-size: 26px; line-height: 1; }
        .metric-card p { margin: 4px 0 0; color: var(--text-secondary); font-size: 12px; }
        .filter-panel { display: flex; gap: 12px; align-items: center; padding: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; flex-wrap: wrap; }
        .search-box { flex: 1; min-width: 260px; display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: var(--bg-body); border-radius: 10px; border: 1px solid var(--border-color); }
        .search-box input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text-primary); font-size: 14px; }
        .pill-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .pill-row button { border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-secondary); border-radius: 999px; padding: 8px 12px; cursor: pointer; font-size: 12px; font-weight: 700; }
        .pill-row button.active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
        .pill-row button.active.danger { background: #F43F5E; border-color: #F43F5E; }
        .audit-grid { display: grid; grid-template-columns: 1.35fr 1fr .85fr; gap: 16px; }
        .bottom-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 16px; }
        .panel { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .panel-header { padding: 16px 18px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .panel-header.compact { border-bottom: 0; padding-bottom: 8px; }
        .panel-header h2 { margin: 0; font-size: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
        .panel-header span { display: block; margin-top: 3px; color: var(--text-muted); font-size: 12px; }
        .activity-list, .security-list, .analytics-list { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        .activity-row { width: 100%; text-align: left; display: grid; grid-template-columns: auto 1fr; gap: 12px; padding: 13px; border-radius: 12px; background: var(--bg-body); border: 1px solid var(--border-color); color: inherit; cursor: pointer; }
        .activity-row.selected { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(79,70,229,.12); }
        .event-dot { width: 10px; height: 10px; border-radius: 999px; margin-top: 5px; box-shadow: 0 0 0 4px rgba(79,70,229,.10); }
        .row-title { display: flex; justify-content: space-between; gap: 10px; align-items: center; }
        .row-title strong { color: var(--text-primary); font-size: 14px; }
        .row-title span { border: 1px solid transparent; border-radius: 999px; padding: 4px 8px; font-size: 11px; font-weight: 800; }
        .activity-row p { margin: 6px 0; color: var(--text-secondary); font-size: 13px; }
        .activity-row small { color: var(--text-muted); line-height: 1.4; }
        .detail-panel, .security-panel { padding: 18px; }
        .detail-top { display: flex; justify-content: space-between; gap: 8px; }
        .detail-top span, .detail-top b { border-radius: 999px; padding: 6px 10px; background: var(--bg-body); color: var(--text-secondary); font-size: 12px; }
        .detail-panel h2 { margin: 16px 0 8px; color: var(--text-primary); font-size: 24px; line-height: 1.15; }
        .detail-panel p { color: var(--text-secondary); line-height: 1.5; font-size: 14px; }
        .detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 18px; }
        .info-tile { padding: 12px; border-radius: 10px; background: var(--bg-body); border: 1px solid var(--border-color); display: flex; gap: 10px; align-items: flex-start; }
        .info-tile span { display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; font-weight: 800; }
        .info-tile strong { display: block; margin-top: 4px; color: var(--text-primary); font-size: 13px; word-break: break-word; }
        .ai-callout { margin-top: 18px; display: flex; gap: 12px; padding: 14px; border-radius: 12px; background: rgba(79,70,229,.10); color: var(--text-primary); }
        .ai-callout strong { display: block; font-size: 13px; }
        .ai-callout p { margin: 4px 0 0; font-size: 13px; }
        .security-card { padding: 12px; border-radius: 10px; background: var(--bg-body); border: 1px solid var(--border-color); }
        .security-card span { display: inline-block; border-radius: 999px; padding: 4px 8px; font-size: 11px; font-weight: 800; }
        .security-card strong { display: block; margin-top: 8px; color: var(--text-primary); font-size: 13px; }
        .security-card p { margin: 4px 0 0; color: var(--text-muted); font-size: 12px; }
        .analytics-row { display: flex; flex-direction: column; gap: 8px; }
        .analytics-row > div:first-child { display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 13px; }
        .analytics-row strong { color: var(--text-primary); }
        .track { height: 9px; border-radius: 999px; background: var(--bg-body); overflow: hidden; }
        .track div { height: 100%; border-radius: inherit; }
        .heatmap-table { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 8px; }
        .heatmap-head, .heatmap-row { display: grid; grid-template-columns: 1.4fr repeat(5, .55fr); gap: 8px; align-items: center; }
        .heatmap-head span { color: var(--text-muted); font-size: 11px; text-transform: uppercase; font-weight: 800; }
        .heatmap-row strong { color: var(--text-primary); font-size: 13px; }
        .heatmap-row span { text-align: center; padding: 10px 4px; border-radius: 8px; background: #4F46E5; color: #fff; font-size: 12px; font-weight: 800; }
        @media (max-width: 1180px) {
          .audit-grid, .bottom-grid { grid-template-columns: 1fr; }
          .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .audit-hero { align-items: flex-start; flex-direction: column; padding: 22px; }
          .audit-hero h1 { font-size: 26px; }
          .metric-grid, .detail-grid { grid-template-columns: 1fr; }
          .heatmap-head, .heatmap-row { grid-template-columns: 1fr repeat(5, 38px); overflow-x: auto; }
        }
      `}</style>
    </div>
  );
}

function MetricCard({ icon, label, value, note, tone }: { icon: ReactNode; label: string; value: string | number; note: string; tone: 'primary' | 'success' | 'danger' | 'info' }) {
  const colors = {
    primary: ['rgba(79,70,229,.12)', '#4F46E5'],
    success: ['rgba(16,185,129,.12)', '#10B981'],
    danger: ['rgba(244,63,94,.12)', '#F43F5E'],
    info: ['rgba(6,182,212,.12)', '#06B6D4'],
  };
  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: colors[tone][0], color: colors[tone][1] }}>{icon}</div>
      <div><span>{label}</span><strong>{value}</strong><p>{note}</p></div>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="info-tile">
      {icon}
      <div><span>{label}</span><strong>{value}</strong></div>
    </div>
  );
}
