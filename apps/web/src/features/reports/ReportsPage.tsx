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
  Search,
  Send,
  Settings2,
  Sparkles,
  Star,
  X,
  Info,
  ChevronDown,
  LayoutDashboard,
  Share,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { mockClasses } from '../../mock/classes';

const categories = ['All', 'Executive', 'Academic', 'Attendance', 'Finance', 'Operations'];
const formats = ['PDF', 'Excel', 'CSV', 'Slides'];

const reportCards = [
  { id: 'rep-001', title: 'Executive School Summary', category: 'Executive', owner: 'Aarav Mehta', updated: 'Today, 10:45 AM', format: 'PDF', status: 'Ready', score: 96, description: 'Leadership summary covering academics, attendance, fees, events, and risk signals.' },
  { id: 'rep-002', title: 'Class-wise Academic Performance', category: 'Academic', owner: 'Academic Office', updated: 'Today, 09:20 AM', format: 'Excel', status: 'Draft', score: 88, description: 'Marks averages, subject comparisons, toppers, and at-risk learners by class.', draftProgress: 3, draftTotal: 5, missingSections: 'Risk Signals section, Subject Toppers section' },
  { id: 'rep-003', title: 'Monthly Attendance Audit', category: 'Attendance', owner: 'Attendance Desk', updated: 'Yesterday, 05:10 PM', format: 'CSV', status: 'Ready', score: 91, description: 'Daily attendance trends, low attendance classes, and follow-up queue.' },
  { id: 'rep-004', title: 'Fee Collection Board Pack', category: 'Finance', owner: 'Finance Office', updated: 'Jun 17, 02:30 PM', format: 'PDF', status: 'Review', score: 84, description: 'Collection rate, pending dues, concessions, and payment aging summary.', reviewer: 'Finance Office', reviewerInitials: 'FO', reviewDaysPending: 6, reviewSubmitted: 'Jun 17' },
  { id: 'rep-005', title: 'Teacher Workload and Activity', category: 'Operations', owner: 'HR Office', updated: 'Jun 16, 12:10 PM', format: 'Excel', status: 'Ready', score: 79, description: 'Teacher schedules, classroom activity, attendance marking, and evaluation load.' },
];

const scheduledReports = [
  { title: 'Monday Principal Brief', cadence: 'Every Monday, 8:00 AM', recipients: 'Leadership Team', nextRun: 'Jun 22', format: 'PDF', lastSentDate: 'Jun 15', lastSentStatus: 'success', nextSendDate: 'Jun 22' },
  { title: 'Attendance Risk Digest', cadence: 'Daily, 6:00 PM', recipients: 'Class Teachers', nextRun: 'Today', format: 'Email', lastSentDate: null, lastSentStatus: 'pending', nextSendDate: 'Today 6:00 PM' },
  { title: 'Fee Collection Snapshot', cadence: 'Every Friday, 4:30 PM', recipients: 'Finance Office', nextRun: 'Jun 19', format: 'Excel', lastSentDate: 'Jun 12', lastSentStatus: 'failed', nextSendDate: 'Jun 19' },
];

const templates = [
  { name: 'Class Teacher Review', category: 'Academic', uses: 32, sections: ['Roster', 'Marks', 'Attendance'] },
  { name: 'Parent Meeting Summary', category: 'Operations', uses: 14, sections: ['Student progress', 'Remarks', 'Actions'] },
  { name: 'Finance Aging Report', category: 'Finance', uses: 11, sections: ['Invoices', 'Due buckets', 'Collections'] },
];

const history = [
  { title: 'Executive School Summary', action: 'Downloaded PDF', type: 'Downloaded', user: 'Aarav Mehta', initials: 'AM', time: 'Today, 10:52 AM' },
  { title: 'Attendance Risk Digest', action: 'Auto-sent email', type: 'Auto-sent', user: 'System Scheduler', initials: 'SY', time: 'Yesterday, 6:00 PM' },
  { title: 'Fee Collection Board Pack', action: 'Shared for review', type: 'Shared', user: 'Finance Office', initials: 'FO', time: 'Jun 17, 02:35 PM' },
  { title: 'Class-wise Academic Performance', action: 'Template duplicated', type: 'Duplicated', user: 'Academic Office', initials: 'AO', time: 'Jun 16, 11:15 AM' },
];

const exportQueue = [
  { file: 'Executive_Summary_Jun_2026.pdf', type: 'PDF', size: '4.8 MB', status: 'Ready' },
  { file: 'Attendance_Audit_June.csv', type: 'CSV', size: '812 KB', status: 'Ready' },
  { file: 'Fee_Collection_Board_Pack.pdf', type: 'PDF', size: '3.2 MB', status: 'Processing' },
];

const previewRows = mockClasses.slice(0, 10).map((cls, index) => ({
  className: `${cls.name} ${cls.section}`,
  students: 6,
  attendance: Number.parseInt(cls.attendance, 10),
  academic: 78 + ((index * 4) % 17),
  fees: 72 + ((index * 5) % 24),
  pending: 12000 + (index * 4000),
  aging: 15 + index,
  syllabus: 80 + index * 2
}));

export default function ReportsPage() {
  const location = useLocation();

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
  
  // Drawer & Builder State
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderFormat, setBuilderFormat] = useState('PDF');
  const [builderAudience, setBuilderAudience] = useState('Leadership Team');
  const [customReportName, setCustomReportName] = useState('Monthly Executive Brief');
  const [isGenerating, setIsGenerating] = useState(false);

  // Preview Audience State
  const [previewAudience, setPreviewAudience] = useState('Leadership Team');
  
  // History Filter State
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState('All');
  
  // AI Panel State
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Global Interaction States
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleGeneratePreview = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsBuilderOpen(false);
      triggerToast(`Preview ready ✓`);
      document.querySelector('.preview-panel')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  const refreshAiInsights = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      triggerToast('AI insights regenerated ✓');
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
      <style>{`
        .reporting-center { display: flex; flex-direction: column; gap: 20px; padding-bottom: 36px; position: relative; }
        
        /* FIX 1: Compressed Hero */
        .reports-header-bar {
          background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 0 32px; height: 80px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .reports-header-bar h1 { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0; white-space: nowrap; }
        .reports-header-bar .eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-muted); margin-bottom: 2px; }
        .header-actions { display: flex; gap: 12px; }
        .header-actions .btn-ghost { border: 1px solid rgba(255,255,255,0.12); color: var(--text-primary); padding: 8px 16px; border-radius: 10px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; background: transparent; cursor: pointer; }
        .header-actions .btn-ghost:hover { background: rgba(255,255,255,0.05); }
        .header-actions .btn-primary { background: linear-gradient(135deg, #8B5CF6, #4F8EF7); color: #fff; padding: 8px 16px; border-radius: 10px; font-weight: 600; border: none; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
        .header-actions .btn-primary:hover { filter: brightness(1.1); }
        
        /* FIX 2: Tooltip Card */
        .score-tooltip-wrapper { position: relative; display: inline-flex; align-items: center; }
        .score-tooltip {
          position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(4px);
          background: #1a2235; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; width: 260px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 100; opacity: 0; pointer-events: none; transition: opacity 150ms ease, transform 150ms ease;
        }
        .score-tooltip-wrapper:hover .score-tooltip { opacity: 1; transform: translateX(-50%) translateY(-8px); pointer-events: auto; }
        .tt-title { font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 2px; }
        .tt-sub { font-size: 12px; color: var(--text-muted); margin-bottom: 12px; }
        .tt-row { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 8px; align-items: center; }
        .tt-dot { width: 6px; height: 6px; border-radius: 50%; margin-right: 8px; }
        .tt-link { color: #4F8EF7; font-size: 12px; margin-top: 12px; display: block; font-weight: 600; cursor: pointer; }

        /* Metric Grid overrides */
        .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .metric-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; display: flex; gap: 14px; align-items: center; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .metric-icon { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; }
        .metric-card span { display: block; color: var(--text-muted); font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .metric-card strong { display: block; margin-top: 2px; color: var(--text-primary); font-size: 26px; line-height: 1; display: inline-flex; align-items: center; gap: 8px; }
        .metric-card p { margin: 4px 0 0; color: var(--text-secondary); font-size: 12px; }

        /* Report List Grid Fix 10: 2 Columns */
        .report-layout-2col { display: grid; grid-template-columns: 0.85fr 2fr; gap: 16px; }
        .panel { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        
        .panel-header { padding: 16px 18px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .panel-header.compact { border-bottom: 0; padding-bottom: 8px; }
        .panel-header h2 { margin: 0; font-size: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
        .panel-header span { display: block; margin-top: 3px; color: var(--text-muted); font-size: 12px; }
        
        /* Filters */
        .report-controls { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; border-bottom: 1px solid var(--border-color); }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: var(--bg-body); border-radius: 10px; border: 1px solid var(--border-color); }
        .search-box input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text-primary); font-size: 14px; }
        .pill-row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .pill-row button { border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-secondary); border-radius: 999px; padding: 8px 12px; cursor: pointer; font-size: 12px; font-weight: 700; transition: all 0.2s; }
        .pill-row button.active { background: #4F8EF718; border-color: #4F8EF7; color: #4F8EF7; }

        .report-list { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        
        /* FIX 3 & 4: Report Row */
        .report-row { width: 100%; display: flex; gap: 12px; text-align: left; border: 1px solid var(--border-color); background: var(--bg-body); border-radius: 12px; padding: 13px; color: inherit; cursor: pointer; position: relative; overflow: hidden; }
        .report-row.selected { border-color: #4F8EF7; box-shadow: 0 0 0 3px rgba(79,142,247,.12); }
        .report-icon { width: 38px; height: 38px; min-width: 38px; border-radius: 10px; display: grid; place-items: center; color: #4F8EF7; background: rgba(79,142,247,.10); }
        
        .row-title { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; }
        .row-title strong { color: var(--text-primary); font-size: 14px; }
        
        .status-badge { border-radius: 999px; padding: 4px 8px; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; }
        .status-ready { background: rgba(16,185,129,.12); color: #10B981; }
        .status-draft { background: rgba(245,158,11,.12); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
        .status-review { background: rgba(79,142,247,.12); color: #4F8EF7; }

        @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: #F59E0B; animation: pulseDot 1.5s infinite; }
        
        .report-row p { margin: 6px 0; color: var(--text-secondary); font-size: 13px; line-height: 1.45; }
        .meta-line { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 12px; margin-top: 8px; }
        .avatar-tiny { width: 20px; height: 20px; border-radius: 50%; background: #4F8EF718; color: #4F8EF7; display: grid; place-items: center; font-size: 9px; font-weight: 800; }
        
        /* Draft Hover Strip */
        .draft-strip { max-height: 0; overflow: hidden; transition: max-height 200ms ease; display: flex; flex-direction: column; gap: 8px; }
        .report-row:hover .draft-strip { max-height: 100px; margin-top: 12px; }
        .progress-dots { display: flex; gap: 4px; }
        .progress-dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot-filled { background: #F59E0B; }
        .dot-empty { background: rgba(255,255,255,0.08); }
        
        /* Preview Panel */
        .preview-panel { padding: 18px; position: relative; }
        .preview-header { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 12px; }
        .preview-header span, .preview-header b { border-radius: 999px; padding: 6px 10px; background: var(--bg-body); color: var(--text-secondary); font-size: 12px; }
        
        /* FIX 5: Preview toggles & fade */
        .preview-meta { display: flex; gap: 12px; font-size: 12px; color: var(--text-muted); margin-top: 12px; align-items: center; }
        .preview-meta .divider { color: rgba(255,255,255,0.1); }
        
        .preview-table-wrapper { position: relative; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; margin-top: 16px; }
        .preview-table-scroll { max-height: 320px; overflow-y: auto; }
        .table-fade { position: absolute; bottom: 0; left: 0; right: 0; height: 48px; background: linear-gradient(transparent, #111827); display: flex; align-items: flex-end; justify-content: center; padding-bottom: 8px; font-size: 12px; color: var(--text-muted); pointer-events: none; z-index: 10; }
        
        .preview-table { width: 100%; border-collapse: collapse; }
        .preview-table th, .preview-table td { padding: 11px 10px; border-bottom: 1px solid var(--border-color); text-align: left; font-size: 13px; }
        .preview-table th { color: var(--text-muted); font-size: 11px; text-transform: uppercase; background: rgba(255,255,255,0.02); }

        .summary-box { margin: 16px 0; display: flex; gap: 12px; padding: 14px; border-radius: 12px; background: rgba(79,142,247,.10); color: var(--text-primary); border: 1px solid rgba(79,142,247,0.2); }
        .summary-box strong { display: block; font-size: 13px; color: #4F8EF7; }
        .summary-box p { margin: 4px 0 0; font-size: 13px; line-height: 1.5; }

        /* General lists */
        .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .stack-list { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
        
        /* FIX 6: Scheduled Reports */
        .schedule-row { display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 10px; background: var(--bg-body); border: 1px solid var(--border-color); }
        .sch-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .sch-title { display: flex; gap: 10px; color: var(--text-primary); font-size: 14px; font-weight: 600; }
        .sch-badge { font-size: 11px; padding: 2px 8px; border-radius: 6px; background: rgba(255,255,255,0.04); color: var(--text-secondary); }
        .sch-bot { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); align-items: flex-end; }
        .del-success { color: #10B981; }
        .del-failed { color: #EF4444; }
        .del-pending { color: #F59E0B; }
        .retry-link { color: #EF4444; text-decoration: underline; cursor: pointer; font-size: 11px; margin-left: 6px; }
        
        /* FIX 11: Board Pack Template */
        .template-grid { padding: 12px; display: grid; grid-template-columns: 1fr; gap: 10px; }
        .board-pack-card { background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(79,142,247,0.10)); border: 1px solid rgba(139,92,246,0.3); border-radius: 16px; padding: 20px; position: relative; }
        .board-pack-badge { position: absolute; top: 16px; right: 16px; background: #8B5CF618; color: #8B5CF6; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 6px; letter-spacing: 0.05em; }
        .bp-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 12px 0 4px; }
        .bp-desc { font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; line-height: 1.4; }
        .bp-stats { font-size: 11px; color: var(--text-muted); margin-bottom: 16px; }
        .bp-btn { width: 100%; background: linear-gradient(135deg, #8B5CF6, #4F8EF7); color: #fff; font-weight: 600; border-radius: 10px; height: 40px; border: none; cursor: pointer; transition: all 0.2s; }
        .bp-btn:hover { filter: brightness(1.1); }
        .bp-btn:active { transform: scale(0.97); }

        .template-card { padding: 16px; border-radius: 12px; background: var(--bg-body); border: 1px solid var(--border-color); }
        .template-card strong { display: block; color: var(--text-primary); font-size: 14px; margin: 8px 0 4px; }
        .template-card span { display: block; color: var(--text-muted); font-size: 12px; }
        .template-card p { margin: 8px 0 0; color: var(--text-secondary); font-size: 12px; }

        /* FIX 7: Export Center */
        .export-card { display: flex; justify-content: space-between; align-items: center; padding: 12px; border-radius: 10px; background: var(--bg-body); border: 1px solid var(--border-color); }
        .export-info { display: flex; gap: 12px; align-items: center; }
        .export-info strong { display: block; color: var(--text-primary); font-size: 13px; }
        .export-info span { color: var(--text-muted); font-size: 12px; }
        .export-actions { display: flex; gap: 8px; align-items: center; }
        .btn-icon-dl { width: 32px; height: 32px; border-radius: 8px; background: rgba(16,185,129,.12); color: #10B981; border: none; cursor: pointer; display: grid; place-items: center; transition: all 0.2s; }
        .btn-icon-dl:hover { background: rgba(16,185,129,.2); transform: scale(1.05); }
        .btn-icon-sh { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,.04); color: var(--text-secondary); border: none; cursor: pointer; display: grid; place-items: center; transition: all 0.2s; }
        .btn-icon-sh:hover { background: rgba(255,255,255,.08); }
        .dl-all-btn { width: 100%; border: 1px dashed rgba(255,255,255,0.12); background: transparent; color: var(--text-secondary); font-size: 13px; padding: 12px; border-radius: 10px; cursor: pointer; transition: all 0.2s; font-weight: 600; margin-top: 4px; }
        .dl-all-btn:hover { border-color: #4F8EF7; color: #4F8EF7; }

        /* FIX 9: History Filter */
        .history-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px; }
        .history-filters { padding: 12px 18px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
        .hf-left { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .h-search { background: #1a2235; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; height: 32px; padding: 0 12px; color: var(--text-primary); font-size: 13px; outline: none; }
        .h-select { background: transparent; border: none; color: var(--text-primary); font-size: 13px; font-weight: 600; cursor: pointer; outline: none; }
        
        .history-list { padding: 12px; display: flex; flex-direction: column; gap: 8px; }
        .history-item { display: flex; justify-content: space-between; padding: 12px; border-radius: 10px; background: var(--bg-body); align-items: center; }
        .hi-left { display: flex; gap: 12px; align-items: center; }
        .hi-dot { width: 8px; height: 8px; border-radius: 50%; }
        .hi-left strong { color: var(--text-primary); font-size: 14px; font-weight: 600; display: block; margin-bottom: 2px; }
        .hi-left span { color: var(--text-muted); font-size: 12px; }
        .hi-right { display: flex; gap: 12px; align-items: center; color: var(--text-muted); font-size: 12px; }
        
        /* FIX 8: AI Insights */
        .ai-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px 18px; }
        .ai-card { background: var(--bg-body); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .ai-icon { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; }
        .ai-card p { font-size: 13px; color: var(--text-primary); margin: 0; line-height: 1.4; flex: 1; }
        .ai-btn { border: 1px solid transparent; background: transparent; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 6px; cursor: pointer; align-self: flex-start; transition: all 0.2s; }
        .ai-btn:hover { background: rgba(255,255,255,0.04); }

        /* FIX 10: Drawer */
        .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 999; animation: fadeIn 0.2s; }
        .drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 380px; background: var(--bg-surface); border-left: 1px solid var(--border-color); box-shadow: -8px 0 32px rgba(0,0,0,0.4); z-index: 1000; transform: translateX(380px); transition: transform 280ms cubic-bezier(0.34,1.56,0.64,1); display: flex; flex-direction: column; }
        .drawer.open { transform: translateX(0); }
        .drawer-header { padding: 20px 24px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; position: relative; }
        .drawer-header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #8B5CF6, #4F8EF7); }
        .drawer-header h2 { margin: 0; font-size: 18px; color: var(--text-primary); }
        .drawer-close { background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; border-radius: 4px; }
        .drawer-close:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
        .drawer-body { padding: 24px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }

        .builder-form label { display: flex; flex-direction: column; gap: 8px; color: var(--text-secondary); font-size: 12px; font-weight: 800; text-transform: uppercase; }
        .builder-form input, .builder-form select { border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-body); color: var(--text-primary); padding: 12px 14px; font-size: 14px; outline: 0; width: 100%; }
        .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px; border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-body); text-transform: none; font-weight: 500; font-size: 14px; color: var(--text-primary); }
        .check-grid span { display: flex; align-items: center; gap: 8px; }
        
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .build-button { width: 100%; background: #4F8EF7; color: white; border: none; padding: 14px; border-radius: 10px; font-size: 14px; font-weight: 600; display: flex; justify-content: center; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; margin-top: auto; }
        .build-button:disabled { opacity: 0.7; cursor: not-allowed; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUpToast { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        @media (max-width: 1024px) {
          .report-layout-2col { grid-template-columns: 1fr; }
          .three-col { grid-template-columns: 1fr; }
          .ai-grid { grid-template-columns: 1fr; }
          .drawer { width: 100%; }
        }
      `}</style>

      {/* Dynamic Toast Popup */}
      {toastMessage && (
        <div className="toast-overlay" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, animation: 'slideUpToast 0.2s ease-out' }}>
          <div className="toast-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* FIX 1: Slim Header Bar */}
      <div className="reports-header-bar">
        <div>
          <div className="eyebrow">Executive Reporting Center</div>
          <h1>Reports & Export Center</h1>
        </div>
        <div className="header-actions">
          <button className="btn-ghost" onClick={() => { document.querySelector('.export-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Export Center <ChevronDown size={16} />
          </button>
          <button className="btn-primary" onClick={() => setIsBuilderOpen(true)}>
            Build Report <Sparkles size={16} />
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard icon={<FileSpreadsheet size={20} />} label="Reports" value={reportCards.length} note="Active templates and reports" tone="primary" />
        <MetricCard icon={<CheckCircle2 size={20} />} label="Ready" value={readyCount} note="Available for export" tone="success" />
        <MetricCard icon={<CalendarClock size={20} />} label="Scheduled" value={scheduledReports.length} note="Automated deliveries" tone="warning" />
        {/* FIX 2: Tooltip on Quality Score */}
        <MetricCard 
          icon={<Star size={20} />} 
          label="Quality Score" 
          value={
            <div className="score-tooltip-wrapper">
              {avgScore}% <Info size={14} color="var(--text-muted)" style={{ marginLeft: 6, cursor: 'help' }} />
              <div className="score-tooltip">
                <div className="tt-title">AI Completeness Rating</div>
                <div className="tt-sub">What's reducing your score:</div>
                <div className="tt-row"><span className="tt-dot" style={{ background: '#EF4444' }} /> Fee audit data missing <b style={{ color: '#EF4444' }}>−6%</b></div>
                <div className="tt-row"><span className="tt-dot" style={{ background: '#F59E0B' }} /> Staff evaluation records absent <b style={{ color: '#F59E0B' }}>−4%</b></div>
                <div className="tt-row"><span className="tt-dot" style={{ background: '#F59E0B' }} /> Attendance late entries pending <b style={{ color: '#F59E0B' }}>−2%</b></div>
                <div className="tt-link" onClick={() => triggerToast('Redirecting to Data Quality center...')}>Fix these to reach 100% &rarr;</div>
              </div>
            </div>
          } 
          note="Hover for AI insight breakdown" 
          tone="info" 
        />
      </div>

      <div className="report-layout-2col">
        {/* Left Column: List */}
        <section className="panel catalog-panel">
          <div className="panel-header">
            <div>
              <h2>Report Categories</h2>
            </div>
          </div>
          <div className="report-controls">
            <div className="search-box">
              <Search size={16} color="var(--text-muted)" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search reports..." />
            </div>
            <div className="pill-row">
              <Filter size={14} color="var(--text-muted)" />
              {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </div>
          <div className="report-list">
            {filteredReports.map((report) => (
              <div key={report.id} className={`report-row ${selectedReport.id === report.id ? 'selected' : ''}`} onClick={() => setSelectedId(report.id)}>
                <div className="report-icon"><FileText size={18} /></div>
                <div style={{ flex: 1 }}>
                  <div className="row-title">
                    <strong>{report.title}</strong>
                    {/* FIX 3 & 4: Status Badges */}
                    {report.status === 'Ready' && <span className="status-badge status-ready">Ready</span>}
                    {report.status === 'Draft' && <span className="status-badge status-draft">Draft · {report.draftProgress}/{report.draftTotal} sections</span>}
                    {report.status === 'Review' && (
                      <div className="score-tooltip-wrapper">
                        <span className="status-badge status-review"><span className="pulse-dot" /> Review</span>
                        <div className="score-tooltip" style={{ width: 'auto', whiteSpace: 'nowrap', left: 'auto', right: 0, transform: 'translateY(4px)' }}>
                          Awaiting {report.reviewer} approval
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {report.status === 'Review' ? (
                     <div className="meta-line">
                       <div className="avatar-tiny">{report.reviewerInitials}</div>
                       Under review by {report.reviewer} · Submitted {report.reviewSubmitted} · <b style={{ color: '#F59E0B' }}>{report.reviewDaysPending} days pending</b>
                     </div>
                  ) : (
                    <div className="meta-line">
                      {report.category} · {report.owner} · {report.updated}
                    </div>
                  )}

                  {/* FIX 3: Draft Action Strip */}
                  {report.status === 'Draft' && (
                    <div className="draft-strip" onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
                        <button className="btn-ghost" style={{ fontSize: 12, color: '#F59E0B', border: '1px solid rgba(245,158,11,0.3)', padding: '4px 10px', borderRadius: 6, background: 'transparent', cursor: 'pointer' }} onClick={() => { setIsBuilderOpen(true); }}>
                          Continue editing &rarr;
                        </button>
                        <div className="progress-dots">
                          {Array.from({ length: report.draftTotal || 5 }).map((_, i) => (
                            <div key={i} className={`progress-dot ${i < (report.draftProgress || 0) ? 'dot-filled' : 'dot-empty'}`} />
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Missing: {report.missingSections}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Preview Panel */}
        <section className="panel preview-panel">
          <div className="preview-header">
            <span style={{ background: '#4F8EF718', color: '#4F8EF7' }}>{selectedReport.category}</span>
            <div className="pill-row" style={{ gap: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 4 }}>Preview as:</span>
              {['Leadership Team', 'Finance Office', 'Class Teachers'].map(aud => (
                <button key={aud} className={previewAudience === aud ? 'active' : ''} onClick={() => setPreviewAudience(aud)} style={{ padding: '4px 10px' }}>{aud}</button>
              ))}
            </div>
          </div>
          
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: '8px 0', color: 'var(--text-primary)' }}>{selectedReport.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{selectedReport.description}</p>
          
          {/* FIX 5: Meta Row */}
          <div className="preview-meta">
            <span>Generated: Today</span>
            <span className="divider">|</span>
            <span>Pages: 8</span>
            <span className="divider">|</span>
            <span>Covers: Jun 2026</span>
          </div>

          <div className="summary-box">
            <Sparkles size={18} color="#4F8EF7" style={{ minWidth: 18 }} />
            <div>
              <strong>AI-generated executive summary</strong>
              <p>The report indicates stable school operations with strong attendance in lower classes, fee collection momentum above target, and a need for focused academic intervention in middle school cohorts.</p>
            </div>
          </div>
          
          <div className="preview-table-wrapper">
            <div className="preview-table-scroll">
              <table className="preview-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Students</th>
                    {previewAudience === 'Leadership Team' && <><th>Attendance</th><th>Academic</th><th>Fees</th></>}
                    {previewAudience === 'Finance Office' && <><th>Fees</th><th>Pending</th><th>Aging (Days)</th></>}
                    {previewAudience === 'Class Teachers' && <><th>Attendance</th><th>Marks</th><th>Syllabus</th></>}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row) => (
                    <tr key={row.className}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.className}</td>
                      <td>{row.students}</td>
                      {previewAudience === 'Leadership Team' && <>
                        <td>{row.attendance}%</td>
                        <td>{row.academic}%</td>
                        <td>{row.fees}%</td>
                      </>}
                      {previewAudience === 'Finance Office' && <>
                        <td>{row.fees}%</td>
                        <td style={{ color: '#EF4444' }}>${row.pending.toLocaleString()}</td>
                        <td>{row.aging}</td>
                      </>}
                      {previewAudience === 'Class Teachers' && <>
                        <td>{row.attendance}%</td>
                        <td>{row.academic}%</td>
                        <td>{row.syllabus}%</td>
                      </>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* FIX 5: Scroll fade */}
            <div className="table-fade">
              &darr; 6 more classes &middot; Scroll to view
            </div>
          </div>
        </section>
      </div>

      {/* FIX 8: AI Insights Redesign */}
      <section className="panel ai-panel">
        <div className="panel-header compact" style={{ padding: '16px 18px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} color="#8B5CF6" /> AI Reporting Insights
            <span style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 700, marginLeft: 8 }}>✦ 3 suggestions</span>
          </h2>
          <button className="btn-ghost" onClick={refreshAiInsights} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Regenerate insights">
            <RefreshCw size={18} className={isAiLoading ? 'spin' : ''} style={isAiLoading ? { animation: 'spin 1s linear infinite' } : {}} />
          </button>
        </div>
        <div className="ai-grid">
          <div className="ai-card">
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="ai-icon" style={{ background: '#4F8EF718', color: '#4F8EF7' }}><BarChart3 size={18} /></div>
              <p>Board Review Pack should include attendance risk and fee aging — both moved more than 5% this month.</p>
            </div>
            <button className="ai-btn" style={{ borderColor: '#10B981', color: '#10B981' }} onClick={() => triggerToast('Section added to Board Review Pack ✓')}>
              Add to pack &rarr;
            </button>
          </div>
          <div className="ai-card">
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="ai-icon" style={{ background: '#F59E0B18', color: '#F59E0B' }}><AlertTriangle size={18} /></div>
              <p>Class 8A and Class 9A need a separate academic intervention appendix.</p>
            </div>
            <button className="ai-btn" style={{ borderColor: '#4F8EF7', color: '#4F8EF7' }} onClick={() => { setIsBuilderOpen(true); triggerToast('Opening builder with Class 8A, 9A...'); }}>
              Generate appendix &rarr;
            </button>
          </div>
          <div className="ai-card">
            <div style={{ display: 'flex', gap: 12 }}>
              <div className="ai-icon" style={{ background: '#8B5CF618', color: '#8B5CF6' }}><Calendar size={18} /></div>
              <p>Schedule the Attendance Risk Digest for class teachers daily until Unit Test 1 closes.</p>
            </div>
            <button className="ai-btn" style={{ borderColor: '#8B5CF6', color: '#8B5CF6' }} onClick={() => { document.querySelector('.schedule-section')?.scrollIntoView({ behavior: 'smooth' }); triggerToast('Highlighting schedules...'); }}>
              Set schedule &rarr;
            </button>
          </div>
        </div>
      </section>

      <div className="three-col">
        {/* Scheduled Reports */}
        <section className="panel schedule-section">
          <div className="panel-header">
            <div><h2>Scheduled Reports</h2><span>Automated report delivery</span></div>
          </div>
          <div className="stack-list">
            {scheduledReports.map((item) => (
              <div key={item.title} className="schedule-row">
                <div className="sch-top">
                  <div className="sch-title"><CalendarClock size={16} color="#4F8EF7" /> {item.title}</div>
                  <div className="sch-badge">{item.format}</div>
                </div>
                <div className="sch-bot">
                  <div>{item.cadence} &middot; {item.recipients}</div>
                  {/* FIX 6: Delivery Status */}
                  <div style={{ textAlign: 'right' }}>
                    {item.lastSentStatus === 'success' && <span className="del-success">Last sent {item.lastSentDate} ✓</span>}
                    {item.lastSentStatus === 'failed' && <span className="del-failed">Last sent {item.lastSentDate} ✗ Failed <span className="retry-link" onClick={() => triggerToast('Retrying schedule delivery...')}>Retry &rarr;</span></span>}
                    {item.lastSentStatus === 'pending' && <span className="del-pending">Next: {item.nextSendDate}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Templates */}
        <section className="panel">
          <div className="panel-header">
            <div><h2>Saved Templates</h2><span>Reusable reporting layouts</span></div>
          </div>
          <div className="template-grid">
            {/* FIX 11: Board Pack Card */}
            <div className="board-pack-card">
              <div className="board-pack-badge">★ FEATURED</div>
              <LayoutDashboard size={32} color="#8B5CF6" />
              <div className="bp-title">One-Click Board Pack</div>
              <div className="bp-desc">Auto-bundles Executive Summary + Fee Report + Attendance Audit into one board-ready PDF.</div>
              <div className="bp-stats">Used 28 times &middot; ~8 pages &middot; ~4.2 MB avg</div>
              <button className="bp-btn" onClick={() => triggerToast('Generating Board Pack... Check Export Center')}>Generate Now &rarr;</button>
            </div>
            {templates.map((template) => (
              <div key={template.name} className="template-card">
                <LayoutTemplate size={18} color="var(--text-muted)" />
                <strong>{template.name}</strong>
                <span>{template.category} - used {template.uses} times</span>
                <p>{template.sections.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Export Center */}
        <section className="panel export-section">
          <div className="panel-header">
            <div><h2>Export Center</h2><span>Generated files and delivery queue</span></div>
          </div>
          <div className="stack-list">
            {exportQueue.map((file) => (
              <div key={file.file} className="export-card">
                <div className="export-info">
                  <div style={{ background: file.status === 'Ready' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', padding: 8, borderRadius: 8, color: file.status === 'Ready' ? '#10B981' : 'var(--text-muted)' }}>
                    {file.type === 'PDF' ? <FileText size={18} /> : <FileSpreadsheet size={18} />}
                  </div>
                  <div>
                    <strong>{file.file}</strong>
                    <span>{file.size} &middot; {file.type}</span>
                  </div>
                </div>
                {/* FIX 7: Export Actions */}
                <div className="export-actions">
                  {file.status === 'Ready' && (
                    <>
                      <button className="btn-icon-sh" onClick={() => triggerToast('Link copied ✓')}><Share size={16} /></button>
                      <button className="btn-icon-dl" onClick={() => triggerToast(`Downloading ${file.file}...`)}><Download size={16} /></button>
                    </>
                  )}
                  {file.status === 'Processing' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 12 }}>
                        <Loader2 size={14} className="spin" style={{ animation: 'spin 1s linear infinite', color: '#4F8EF7' }} /> Processing...
                      </div>
                      <span className="retry-link" onClick={() => triggerToast('Cancelled export.')}>Cancel</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button className="dl-all-btn" onClick={() => triggerToast('Preparing ZIP file for download...')}>
              &darr; Download all 2 ready files as ZIP
            </button>
          </div>
        </section>
      </div>

      {/* FIX 9: Report History Redesign */}
      <section className="panel" style={{ marginTop: 0 }}>
        <div className="panel-header compact" style={{ padding: '16px 18px', borderBottom: '1px solid var(--border-color)' }}>
          <div><h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={18} color="#4F8EF7" /> Report History</h2></div>
        </div>
        <div className="history-filters">
          <div className="hf-left">
            <input type="text" className="h-search" placeholder="Search history..." value={historySearch} onChange={(e) => setHistorySearch(e.target.value)} />
            <div className="pill-row">
              {['All', 'Downloaded', 'Auto-sent', 'Shared', 'Duplicated'].map(f => (
                <button key={f} className={historyFilter === f ? 'active' : ''} onClick={() => setHistoryFilter(f)}>{f}</button>
              ))}
            </div>
            <select className="h-select">
              <option>Last 7 days ▾</option>
              <option>Today</option>
              <option>Last 30 days</option>
              <option>This term</option>
            </select>
          </div>
          <button className="btn-ghost" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: 12, cursor: 'pointer' }} onClick={() => triggerToast('Exporting audit log...')}>Export audit log &darr;</button>
        </div>
        <div className="history-list">
          {history.filter(h => historyFilter === 'All' || h.type === historyFilter).map((item, idx) => {
            let dotColor = '#10B981';
            if (item.type === 'Auto-sent') dotColor = '#4F8EF7';
            if (item.type === 'Shared') dotColor = '#8B5CF6';
            if (item.type === 'Duplicated') dotColor = '#F59E0B';

            return (
              <div key={idx} className="history-item">
                <div className="hi-left">
                  <div className="hi-dot" style={{ background: dotColor }} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.action}</span>
                  </div>
                </div>
                <div className="hi-right">
                  {item.time}
                  <div className="avatar-tiny" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)' }}>{item.initials}</div>
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ color: '#4F8EF7', fontSize: 12, cursor: 'pointer' }}>View all history &rarr;</span>
          </div>
        </div>
      </section>

      {/* FIX 10: Drawer Component */}
      {isBuilderOpen && <div className="drawer-overlay" onClick={() => setIsBuilderOpen(false)} />}
      <div className={`drawer ${isBuilderOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2><Settings2 size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} /> Report Builder</h2>
          <button className="drawer-close" onClick={() => setIsBuilderOpen(false)}><X size={20} /></button>
        </div>
        <div className="drawer-body">
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
            <button className="build-button" onClick={handleGeneratePreview} disabled={isGenerating}>
              {isGenerating ? <><Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> Generating...</> : <><Send size={16} /> Generate preview</>}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

function MetricCard({ icon, label, value, note, tone }: { icon: ReactNode; label: string; value: ReactNode; note: string; tone: 'primary' | 'success' | 'warning' | 'info' }) {
  const colors = {
    primary: ['rgba(79,142,247,.12)', '#4F8EF7'],
    success: ['rgba(16,185,129,.12)', '#10B981'],
    warning: ['rgba(245,158,11,.14)', '#F59E0B'],
    info: ['rgba(139,92,246,.12)', '#8B5CF6'],
  };
  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: colors[tone][0], color: colors[tone][1] }}>{icon}</div>
      <div><span>{label}</span><strong>{value}</strong><p>{note}</p></div>
    </div>
  );
}
