import { useMemo, useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  LayoutTemplate,
  Mail,
  PieChart,
  Search,
  Send,
  Settings2,
  Sparkles,
  Star,
} from 'lucide-react';
import { mockClasses } from '../../mock/classes';

const categories = ['All', 'Executive', 'Academic', 'Attendance', 'Finance', 'Operations'];
const formats = ['PDF', 'Excel', 'CSV', 'Slides'];

const reportCards = [
  { id: 'rep-001', title: 'Executive School Summary', category: 'Executive', owner: 'Aarav Mehta', updated: 'Today, 10:45 AM', format: 'PDF', status: 'Ready', score: 96, description: 'Leadership summary covering academics, attendance, fees, events, and risk signals.' },
  { id: 'rep-002', title: 'Class-wise Academic Performance', category: 'Academic', owner: 'Academic Office', updated: 'Today, 09:20 AM', format: 'Excel', status: 'Draft', score: 88, description: 'Marks averages, subject comparisons, toppers, and at-risk learners by class.' },
  { id: 'rep-003', title: 'Monthly Attendance Audit', category: 'Attendance', owner: 'Attendance Desk', updated: 'Yesterday, 05:10 PM', format: 'CSV', status: 'Ready', score: 91, description: 'Daily attendance trends, low attendance classes, and follow-up queue.' },
  { id: 'rep-004', title: 'Fee Collection Board Pack', category: 'Finance', owner: 'Finance Office', updated: 'Jun 17, 02:30 PM', format: 'PDF', status: 'Review', score: 84, description: 'Collection rate, pending dues, concessions, and payment aging summary.' },
  { id: 'rep-005', title: 'Teacher Workload and Activity', category: 'Operations', owner: 'HR Office', updated: 'Jun 16, 12:10 PM', format: 'Excel', status: 'Ready', score: 79, description: 'Teacher schedules, classroom activity, attendance marking, and evaluation load.' },
];

const scheduledReports = [
  { title: 'Monday Principal Brief', cadence: 'Every Monday, 8:00 AM', recipients: 'Leadership Team', nextRun: 'Jun 22', format: 'PDF' },
  { title: 'Attendance Risk Digest', cadence: 'Daily, 6:00 PM', recipients: 'Class Teachers', nextRun: 'Today', format: 'Email' },
  { title: 'Fee Collection Snapshot', cadence: 'Every Friday, 4:30 PM', recipients: 'Finance Office', nextRun: 'Jun 19', format: 'Excel' },
];

const templates = [
  { name: 'Board Review Pack', category: 'Executive', uses: 18, sections: ['KPIs', 'Risk', 'Finance', 'Events'] },
  { name: 'Class Teacher Review', category: 'Academic', uses: 32, sections: ['Roster', 'Marks', 'Attendance'] },
  { name: 'Parent Meeting Summary', category: 'Operations', uses: 14, sections: ['Student progress', 'Remarks', 'Actions'] },
  { name: 'Finance Aging Report', category: 'Finance', uses: 11, sections: ['Invoices', 'Due buckets', 'Collections'] },
];

const history = [
  { title: 'Executive School Summary', action: 'Downloaded PDF', user: 'Aarav Mehta', time: 'Today, 10:52 AM' },
  { title: 'Attendance Risk Digest', action: 'Auto-sent email', user: 'System Scheduler', time: 'Yesterday, 6:00 PM' },
  { title: 'Fee Collection Board Pack', action: 'Shared for review', user: 'Finance Office', time: 'Jun 17, 02:35 PM' },
  { title: 'Class-wise Academic Performance', action: 'Template duplicated', user: 'Academic Office', time: 'Jun 16, 11:15 AM' },
];

const exportQueue = [
  { file: 'Executive_Summary_Jun_2026.pdf', type: 'PDF', size: '4.8 MB', status: 'Ready' },
  { file: 'Attendance_Audit_June.csv', type: 'CSV', size: '812 KB', status: 'Ready' },
  { file: 'Fee_Collection_Board_Pack.pdf', type: 'PDF', size: '3.2 MB', status: 'Processing' },
];

const previewRows = mockClasses.slice(0, 6).map((cls, index) => ({
  className: `${cls.name} ${cls.section}`,
  students: 6,
  attendance: Number.parseInt(cls.attendance, 10),
  academic: 78 + ((index * 4) % 17),
  fees: 72 + ((index * 5) % 24),
}));

export default function ReportsPage() {
  const location = useLocation();

  // Set initial category from state if present
  const initialCategory = useMemo(() => {
    if (location.state && typeof location.state === 'object' && location.state !== null && 'category' in location.state) {
      const cat = (location.state as any).category;
      if (cat && typeof cat === 'string') {
        const found = categories.find(c => c.toLowerCase() === cat.toLowerCase());
        if (found) return found;
      }
    }
    return 'All';
  }, [location.state]);

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(reportCards[0].id);
  const [builderFormat, setBuilderFormat] = useState('PDF');
  const [builderAudience, setBuilderAudience] = useState('Leadership Team');

  // Custom interactive states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [customReportName, setCustomReportName] = useState('Monthly Executive Brief');

  // Automatically switch category if routing state updates
  useEffect(() => {
    if (location.state && typeof location.state === 'object' && location.state !== null && 'category' in location.state) {
      const cat = (location.state as any).category;
      if (cat && typeof cat === 'string') {
        const found = categories.find(c => c.toLowerCase() === cat.toLowerCase());
        if (found) {
          setCategory(found);
        }
      }
    }
  }, [location.state]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportCenter = () => {
    setIsExporting(true);
    triggerToast('⏳ Preparing Export Center packages...');
    setTimeout(() => {
      setIsExporting(false);
      triggerToast('📁 Export packages generated and downloaded successfully!');
    }, 1200);
  };

  const handleBuildReport = () => {
    setIsBuilding(true);
    triggerToast('⏳ Commencing custom report build execution...');
    setTimeout(() => {
      setIsBuilding(false);
      triggerToast('🛠️ Custom report template saved to draft library.');
    }, 1000);
  };

  const handleGeneratePreview = () => {
    setIsGenerating(true);
    triggerToast(`⏳ Compiling datasets for "${customReportName}"...`);
    setTimeout(() => {
      setIsGenerating(false);
      triggerToast(`✨ Preview generated successfully in ${builderFormat} format!`);
    }, 1500);
  };

  const filteredReports = useMemo(() => {
    const term = search.trim().toLowerCase();
    return reportCards.filter((report) => {
      const matchesCategory = category === 'All' || report.category === category;
      const matchesSearch = !term || [report.title, report.owner, report.description, report.category].some((value) => value.toLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const selectedReport = reportCards.find((report) => report.id === selectedId) || reportCards[0];
  const readyCount = reportCards.filter((report) => report.status === 'Ready').length;
  const avgScore = Math.round(reportCards.reduce((sum, report) => sum + report.score, 0) / reportCards.length);

  return (
    <div className="reporting-center">
      {/* Dynamic Toast Popup */}
      {toastMessage && (
        <div className="toast-overlay" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, animation: 'slideUpToast 0.2s ease-out' }}>
          <div className="toast-card" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="reports-hero">
        <div>
          <div className="eyebrow">Executive Reporting Center</div>
          <h1>Build, preview, schedule, and export school reports from one leadership workspace.</h1>
          <p>Turn mock school data into board-ready summaries, class-level packs, finance snapshots, and operational digests.</p>
        </div>
        <div className="hero-actions">
          <button className="btn btn-secondary" onClick={handleExportCenter} disabled={isExporting}>
            <Download size={16} /> {isExporting ? 'Exporting...' : 'Export center'}
          </button>
          <button className="btn btn-primary" onClick={handleBuildReport} disabled={isBuilding}>
            <FileText size={16} /> {isBuilding ? 'Building...' : 'Build report'}
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard icon={<FileSpreadsheet size={20} />} label="Reports" value={reportCards.length} note="Active templates and reports" tone="primary" />
        <MetricCard icon={<CheckCircle2 size={20} />} label="Ready" value={readyCount} note="Available for export" tone="success" />
        <MetricCard icon={<CalendarClock size={20} />} label="Scheduled" value={scheduledReports.length} note="Automated deliveries" tone="warning" />
        <MetricCard icon={<Star size={20} />} label="Quality Score" value={`${avgScore}%`} note="AI completeness rating" tone="info" />
      </div>

      <div className="report-layout">
        <section className="panel catalog-panel">
          <div className="panel-header">
            <div>
              <h2>Report Categories</h2>
              <span>Search and open executive-ready report packs</span>
            </div>
          </div>
          <div className="report-controls">
            <div className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search reports..." />
            </div>
            <div className="pill-row">
              <Filter size={16} />
              {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </div>
          <div className="report-list">
            {filteredReports.map((report) => (
              <button key={report.id} className={`report-row ${selectedReport.id === report.id ? 'selected' : ''}`} onClick={() => setSelectedId(report.id)}>
                <div className="report-icon"><FileText size={18} /></div>
                <div>
                  <div className="row-title">
                    <strong>{report.title}</strong>
                    <span>{report.status}</span>
                  </div>
                  <p>{report.description}</p>
                  <small>{report.category} - {report.owner} - {report.updated}</small>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="panel preview-panel">
          <div className="preview-header">
            <span>{selectedReport.category}</span>
            <b>{selectedReport.format}</b>
          </div>
          <h2>{selectedReport.title}</h2>
          <p>{selectedReport.description}</p>
          <div className="summary-box">
            <Sparkles size={18} />
            <div>
              <strong>AI-generated executive summary</strong>
              <p>{selectedReport.title} indicates stable school operations with strong attendance in lower classes, fee collection momentum above target, and a need for focused academic intervention in middle school cohorts.</p>
            </div>
          </div>
          <div className="preview-table">
            <table>
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Students</th>
                  <th>Attendance</th>
                  <th>Academic</th>
                  <th>Fees</th>
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row) => (
                  <tr key={row.className}>
                    <td>{row.className}</td>
                    <td>{row.students}</td>
                    <td>{row.attendance}%</td>
                    <td>{row.academic}%</td>
                    <td>{row.fees}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel builder-panel">
          <div className="panel-header compact">
            <h2><Settings2 size={18} /> Report Builder</h2>
          </div>
          <div className="builder-form">
            <label>
              Report name
              <input value={customReportName} onChange={(e) => setCustomReportName(e.target.value)} />
            </label>
            <label>
              Include sections
              <div className="check-grid">
                {['KPIs', 'Attendance', 'Marks', 'Fees', 'Events', 'Audit'].map((item) => (
                  <span key={item}><input type="checkbox" defaultChecked={item !== 'Audit'} /> {item}</span>
                ))}
              </div>
            </label>
            <div className="form-row">
              <label>
                Format
                <select value={builderFormat} onChange={(event) => setBuilderFormat(event.target.value)}>
                  {formats.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                Audience
                <select value={builderAudience} onChange={(event) => setBuilderAudience(event.target.value)}>
                  {['Leadership Team', 'Academic Office', 'Finance Office', 'Class Teachers'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <button className="btn btn-primary build-button" onClick={handleGeneratePreview} disabled={isGenerating}>
              <Send size={16} /> {isGenerating ? 'Generating...' : 'Generate preview'}
            </button>
          </div>
        </section>
      </div>


      <div className="three-col">
        <section className="panel">
          <div className="panel-header">
            <div><h2>Scheduled Reports</h2><span>Automated report delivery</span></div>
          </div>
          <div className="stack-list">
            {scheduledReports.map((item) => (
              <div key={item.title} className="stack-card">
                <CalendarClock size={18} />
                <div><strong>{item.title}</strong><span>{item.cadence} - {item.recipients}</span></div>
                <b>{item.nextRun}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div><h2>Saved Templates</h2><span>Reusable reporting layouts</span></div>
          </div>
          <div className="template-grid">
            {templates.map((template) => (
              <div key={template.name} className="template-card">
                <LayoutTemplate size={18} />
                <strong>{template.name}</strong>
                <span>{template.category} - used {template.uses} times</span>
                <p>{template.sections.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div><h2>Export Center</h2><span>Generated files and delivery queue</span></div>
          </div>
          <div className="stack-list">
            {exportQueue.map((file) => (
              <div key={file.file} className="export-card">
                <Download size={18} />
                <div><strong>{file.file}</strong><span>{file.type} - {file.size}</span></div>
                <b>{file.status}</b>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="history-grid">
        <section className="panel">
          <div className="panel-header">
            <div><h2>Report History</h2><span>Audit trail of report usage</span></div>
            <Clock size={20} color="#4F46E5" />
          </div>
          <div className="history-list">
            {history.map((item) => (
              <div key={`${item.title}-${item.time}`} className="history-item">
                <div className="history-dot" />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.action} by {item.user} - {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel ai-panel">
          <div className="panel-header compact">
            <h2><Sparkles size={18} /> AI Reporting Insights</h2>
          </div>
          <div className="ai-stack">
            <div><PieChart size={17} /><span>Board Review Pack should include attendance risk and fee aging this month; both moved more than 5%.</span></div>
            <div><BarChart3 size={17} /><span>Class 8 A and Class 9 A need a separate academic intervention appendix.</span></div>
            <div><Mail size={17} /><span>Schedule the Attendance Risk Digest for class teachers daily until Unit Test 1 closes.</span></div>
          </div>
        </section>
      </div>

      <style>{`
        .reporting-center { display: flex; flex-direction: column; gap: 20px; padding-bottom: 36px; }
        .reports-hero { min-height: 218px; border-radius: 16px; padding: 28px; color: #fff; background: linear-gradient(120deg, rgba(15,23,42,.86), rgba(16,185,129,.52)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&auto=format&fit=crop') center/cover; display: flex; justify-content: space-between; gap: 24px; align-items: flex-end; box-shadow: 0 18px 45px rgba(15,23,42,.18); }
        .reports-hero h1 { max-width: 820px; margin: 8px 0 10px; font-size: 34px; line-height: 1.1; letter-spacing: 0; }
        .reports-hero p { max-width: 760px; margin: 0; color: rgba(255,255,255,.84); font-size: 15px; }
        .eyebrow { text-transform: uppercase; letter-spacing: .08em; font-size: 12px; font-weight: 800; color: rgba(255,255,255,.72); }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        .hero-actions .btn, .build-button { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .metric-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; display: flex; gap: 14px; align-items: center; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .metric-icon { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; }
        .metric-card span { display: block; color: var(--text-muted); font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .metric-card strong { display: block; margin-top: 2px; color: var(--text-primary); font-size: 26px; line-height: 1; }
        .metric-card p { margin: 4px 0 0; color: var(--text-secondary); font-size: 12px; }
        .report-layout { display: grid; grid-template-columns: 1.15fr 1.2fr .9fr; gap: 16px; }
        .three-col { display: grid; grid-template-columns: 1fr 1.1fr 1fr; gap: 16px; }
        .history-grid { display: grid; grid-template-columns: 1.2fr .9fr; gap: 16px; }
        .panel { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .panel-header { padding: 16px 18px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .panel-header.compact { border-bottom: 0; padding-bottom: 8px; }
        .panel-header h2 { margin: 0; font-size: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
        .panel-header span { display: block; margin-top: 3px; color: var(--text-muted); font-size: 12px; }
        .report-controls { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; border-bottom: 1px solid var(--border-color); }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: var(--bg-body); border-radius: 10px; border: 1px solid var(--border-color); }
        .search-box input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text-primary); font-size: 14px; }
        .pill-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .pill-row button { border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-secondary); border-radius: 999px; padding: 8px 12px; cursor: pointer; font-size: 12px; font-weight: 700; }
        .pill-row button.active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
        .report-list, .stack-list, .history-list, .ai-stack { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        .report-row { width: 100%; display: grid; grid-template-columns: auto 1fr; gap: 12px; text-align: left; border: 1px solid var(--border-color); background: var(--bg-body); border-radius: 12px; padding: 13px; color: inherit; cursor: pointer; }
        .report-row.selected { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(79,70,229,.12); }
        .report-icon { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; color: #4F46E5; background: rgba(79,70,229,.10); }
        .row-title { display: flex; justify-content: space-between; gap: 10px; }
        .row-title strong { color: var(--text-primary); font-size: 14px; }
        .row-title span { border-radius: 999px; padding: 4px 8px; color: #047857; background: rgba(16,185,129,.12); font-size: 11px; font-weight: 800; }
        .report-row p { margin: 6px 0; color: var(--text-secondary); font-size: 13px; line-height: 1.45; }
        .report-row small { color: var(--text-muted); }
        .preview-panel, .builder-panel, .ai-panel { padding: 18px; }
        .preview-header { display: flex; justify-content: space-between; gap: 8px; }
        .preview-header span, .preview-header b { border-radius: 999px; padding: 6px 10px; background: var(--bg-body); color: var(--text-secondary); font-size: 12px; }
        .preview-panel h2 { margin: 16px 0 8px; color: var(--text-primary); font-size: 24px; line-height: 1.15; }
        .preview-panel p { color: var(--text-secondary); line-height: 1.5; font-size: 14px; }
        .summary-box { margin: 16px 0; display: flex; gap: 12px; padding: 14px; border-radius: 12px; background: rgba(79,70,229,.10); color: var(--text-primary); }
        .summary-box strong { display: block; font-size: 13px; }
        .summary-box p { margin: 4px 0 0; font-size: 13px; }
        .preview-table { overflow-x: auto; border: 1px solid var(--border-color); border-radius: 10px; }
        .preview-table table { width: 100%; border-collapse: collapse; }
        .preview-table th, .preview-table td { padding: 11px 10px; border-bottom: 1px solid var(--border-color); text-align: left; font-size: 13px; }
        .preview-table th { color: var(--text-muted); font-size: 11px; text-transform: uppercase; }
        .builder-form { display: flex; flex-direction: column; gap: 13px; }
        .builder-form label { display: flex; flex-direction: column; gap: 6px; color: var(--text-secondary); font-size: 12px; font-weight: 800; text-transform: uppercase; }
        .builder-form input, .builder-form select { border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-body); color: var(--text-primary); padding: 10px 12px; font-size: 13px; outline: 0; }
        .check-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; padding: 10px; border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-body); text-transform: none; font-weight: 600; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .stack-card, .export-card, .history-item { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: start; padding: 12px; border-radius: 10px; background: var(--bg-body); }
        .stack-card strong, .export-card strong, .history-item strong, .template-card strong { display: block; color: var(--text-primary); font-size: 14px; }
        .stack-card span, .export-card span, .history-item span, .template-card span { display: block; margin-top: 4px; color: var(--text-muted); font-size: 12px; }
        .stack-card b, .export-card b { color: var(--color-primary); font-size: 12px; }
        .template-grid { padding: 12px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .template-card { padding: 12px; border-radius: 10px; background: var(--bg-body); border: 1px solid var(--border-color); }
        .template-card p { margin: 8px 0 0; color: var(--text-secondary); font-size: 12px; line-height: 1.4; }
        .history-dot { width: 10px; height: 10px; border-radius: 999px; background: var(--color-primary); margin-top: 4px; box-shadow: 0 0 0 4px rgba(79,70,229,.12); }
        .ai-stack div { display: flex; gap: 10px; padding: 12px; border-radius: 10px; background: var(--bg-body); color: var(--text-secondary); font-size: 13px; line-height: 1.45; }
        @media (max-width: 1180px) {
          .report-layout, .three-col, .history-grid { grid-template-columns: 1fr; }
          .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .reports-hero { align-items: flex-start; flex-direction: column; padding: 22px; }
          .reports-hero h1 { font-size: 26px; }
          .metric-grid, .form-row, .template-grid, .check-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

function MetricCard({ icon, label, value, note, tone }: { icon: ReactNode; label: string; value: string | number; note: string; tone: 'primary' | 'success' | 'warning' | 'info' }) {
  const colors = {
    primary: ['rgba(79,70,229,.12)', '#4F46E5'],
    success: ['rgba(16,185,129,.12)', '#10B981'],
    warning: ['rgba(245,158,11,.14)', '#F59E0B'],
    info: ['rgba(6,182,212,.12)', '#06B6D4'],
  };
  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: colors[tone][0], color: colors[tone][1] }}>{icon}</div>
      <div><span>{label}</span><strong>{value}</strong><p>{note}</p></div>
    </div>
  );
}
