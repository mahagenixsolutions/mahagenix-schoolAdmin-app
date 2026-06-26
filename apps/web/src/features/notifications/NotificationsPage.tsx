import { useMemo, useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Filter,
  Mail,
  MessageSquareText,
  Megaphone,
  Radio,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { mockClasses } from '../../mock/classes';

const priorities = ['All', 'Urgent', 'High', 'Normal', 'Low'];
const channels = ['App', 'Email', 'SMS', 'WhatsApp'];

const notificationFeed = [
  {
    id: 'com-001',
    title: 'Quarterly assessments begin Monday',
    body: 'Exam timetable and hall instructions have been sent to Classes 6-12.',
    priority: 'High',
    audience: 'Classes 6-12',
    channel: 'App + Email',
    category: 'Academic',
    sentAt: 'Today, 09:10 AM',
    readRate: 86,
    delivered: 328,
    read: 282,
    status: 'Sent',
  },
  {
    id: 'com-002',
    title: 'Transport route delay for Route B',
    body: 'Route B buses are running 15 minutes late due to roadwork near Central Avenue.',
    priority: 'Urgent',
    audience: 'Route B Parents',
    channel: 'SMS + App',
    category: 'Transport',
    sentAt: 'Today, 07:35 AM',
    readRate: 94,
    delivered: 84,
    read: 79,
    status: 'Sent',
  },
  {
    id: 'com-003',
    title: 'Science Expo project registration closes tomorrow',
    body: 'Class teachers should confirm final team names before 4 PM.',
    priority: 'Normal',
    audience: 'Classes 6-10',
    channel: 'App',
    category: 'Events',
    sentAt: 'Yesterday, 04:45 PM',
    readRate: 72,
    delivered: 180,
    read: 130,
    status: 'Sent',
  },
  {
    id: 'com-004',
    title: 'Fee reminder for Term 1',
    body: 'Pending fee reminders are queued for parents with unpaid Term 1 invoices.',
    priority: 'High',
    audience: 'Fee Pending Parents',
    channel: 'Email + WhatsApp',
    category: 'Finance',
    sentAt: 'Draft',
    readRate: 0,
    delivered: 0,
    read: 0,
    status: 'Draft',
  },
  {
    id: 'com-005',
    title: 'Reading Week gallery is live',
    body: 'Parents can now view curated photos from the Reading Week finale.',
    priority: 'Low',
    audience: 'Classes 1-5 Parents',
    channel: 'App',
    category: 'Gallery',
    sentAt: 'Jun 17, 02:20 PM',
    readRate: 68,
    delivered: 210,
    read: 143,
    status: 'Sent',
  },
];

const announcements = [
  { title: 'Parent Orientation Forum', date: 'Jun 28', audience: 'New admissions', owner: 'Administration', status: 'Scheduled' },
  { title: 'Unit Test 1 Guidelines', date: 'Jun 24', audience: 'Classes 6-12', owner: 'Academic Office', status: 'Published' },
  { title: 'Yoga Day Instructions', date: 'Jun 21', audience: 'All students', owner: 'PE Department', status: 'Published' },
  { title: 'Library Book Return Week', date: 'Jun 30', audience: 'All classes', owner: 'Library', status: 'Draft' },
];

const history = [
  { action: 'Sent urgent SMS alert', user: 'Aarav Mehta', time: 'Today, 07:35 AM', detail: 'Route B delay notification delivered to 84 parents.' },
  { action: 'Updated announcement audience', user: 'Nisha Rao', time: 'Yesterday, 05:10 PM', detail: 'Science Expo announcement limited to Classes 6-10.' },
  { action: 'Published gallery notification', user: 'Joel Fernandes', time: 'Jun 17, 02:20 PM', detail: 'Reading Week gallery announcement published.' },
  { action: 'Created fee reminder draft', user: 'Finance Office', time: 'Jun 16, 11:05 AM', detail: 'Target audience: 37 fee pending parents.' },
];

const audienceSegments = [
  { name: 'All Parents', count: 72, reach: 'App, Email, WhatsApp' },
  { name: 'Classes 6-12', count: 42, reach: 'App, Email' },
  { name: 'Fee Pending Parents', count: 37, reach: 'Email, WhatsApp' },
  { name: 'Transport Route B', count: 84, reach: 'SMS, App' },
  { name: 'Teachers and Staff', count: 21, reach: 'App, Email' },
];

const analyticsBars = [
  { label: 'App', value: 91, color: '#4F46E5' },
  { label: 'Email', value: 78, color: '#10B981' },
  { label: 'SMS', value: 96, color: '#F59E0B' },
  { label: 'WhatsApp', value: 88, color: '#06B6D4' },
];

const priorityColors: Record<string, { bg: string; text: string; border: string }> = {
  Urgent: { bg: 'rgba(244, 63, 94, 0.12)', text: '#BE123C', border: 'rgba(244, 63, 94, 0.24)' },
  High: { bg: 'rgba(245, 158, 11, 0.14)', text: '#92400E', border: 'rgba(245, 158, 11, 0.28)' },
  Normal: { bg: 'rgba(79, 70, 229, 0.10)', text: '#4338CA', border: 'rgba(79, 70, 229, 0.22)' },
  Low: { bg: 'rgba(100, 116, 139, 0.12)', text: '#475569', border: 'rgba(100, 116, 139, 0.22)' },
};

export default function NotificationsPage() {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('All');

  // Stateful notification feed list
  const [feed, setFeed] = useState(notificationFeed);
  const [selectedNotificationId, setSelectedNotificationId] = useState(notificationFeed[0].id);

  // Composer Form states
  const [composerTitle, setComposerTitle] = useState('Reminder: Science Expo project submissions');
  const [composerBody, setComposerBody] = useState('Please submit final team names and project titles by tomorrow at 4 PM. Class teachers can update entries from the Events page.');
  const [composerPriority, setComposerPriority] = useState('High');
  const [composerChannel, setComposerChannel] = useState('App');
  const [composerAudience, setComposerAudience] = useState('All Parents');

  // Visual loaders / feedbacks
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportLog = () => {
    setIsProcessing(true);
    triggerToast('⏳ Formatting communication history csv logs...');
    setTimeout(() => {
      setIsProcessing(false);
      triggerToast('📁 Logs CSV exported successfully!');
    }, 1000);
  };

  const handleNewBroadcastClick = () => {
    setComposerTitle('');
    setComposerBody('');
    triggerToast('✍️ Composer cleared. Start drafting your announcement below.');
  };

  const handleScheduleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerTitle.trim() || !composerBody.trim()) {
      triggerToast('⚠️ Title and Message body are required!');
      return;
    }

    setIsProcessing(true);
    triggerToast('⏳ Initiating channel broadcast protocols...');
    
    setTimeout(() => {
      setIsProcessing(false);
      const newBroadcast = {
        id: `com-${Date.now()}`,
        title: composerTitle,
        body: composerBody,
        priority: composerPriority,
        audience: composerAudience,
        channel: composerChannel,
        category: 'Alert',
        sentAt: 'Just now',
        readRate: 0,
        delivered: 142,
        read: 0,
        status: 'Sent',
      };
      setFeed(prev => [newBroadcast, ...prev]);
      setSelectedNotificationId(newBroadcast.id);
      triggerToast(`🚀 Broadcast sent successfully to ${composerAudience}!`);
      
      // Clear form
      setComposerTitle('');
      setComposerBody('');
    }, 1200);
  };

  const filteredFeed = useMemo(() => {
    const term = search.trim().toLowerCase();
    return feed.filter((item) => {
      const matchesPriority = priority === 'All' || item.priority === priority;
      const matchesSearch = !term || [item.title, item.body, item.audience, item.category].some((value) => value.toLowerCase().includes(term));
      return matchesPriority && matchesSearch;
    });
  }, [feed, priority, search]);

  const selectedNotification = feed.find((item) => item.id === selectedNotificationId) || feed[0];
  const totalDelivered = feed.reduce((sum, item) => sum + item.delivered, 0);
  const totalRead = feed.reduce((sum, item) => sum + item.read, 0);
  const avgReadRate = Math.round((totalRead / Math.max(1, totalDelivered)) * 100);
  const urgentCount = feed.filter((item) => item.priority === 'Urgent' || item.priority === 'High').length;

  return (
    <div className="communication-center" style={{ position: 'relative' }}>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: 'var(--shadow-lg)' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="comm-hero">
        <div>
          <div className="eyebrow">Communication Center</div>
          <h1>Smart school messaging for parents, students, teachers, and staff.</h1>
          <p>Compose announcements, target precise audiences, track read status, and understand which channels are actually working.</p>
        </div>
        <div className="hero-actions">
          <button className="btn btn-secondary" onClick={handleExportLog} disabled={isProcessing}><FileText size={16} /> {isProcessing ? 'Exporting...' : 'Export log'}</button>
          <button className="btn btn-primary" onClick={handleNewBroadcastClick}><Send size={16} /> New broadcast</button>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard icon={<Bell size={20} />} label="Messages Sent" value={feed.length + 1120} note="This academic month" tone="primary" />
        <MetricCard icon={<Eye size={20} />} label="Read Rate" value={`${avgReadRate}%`} note={`${totalRead} of ${totalDelivered} read`} tone="success" />
        <MetricCard icon={<AlertTriangle size={20} />} label="Priority Alerts" value={urgentCount} note="Urgent and high priority" tone="warning" />
        <MetricCard icon={<Target size={20} />} label="Audience Segments" value={audienceSegments.length} note="Ready to target" tone="info" />
      </div>

      <div className="comm-layout">
        <section className="panel feed-panel">
          <div className="panel-header">
            <div>
              <h2>Smart Notification Feed</h2>
              <span>Live communication queue and delivery status</span>
            </div>
          </div>
          <div className="feed-controls">
            <div className="search-box">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notifications..." />
            </div>
            <div className="priority-tabs">
              <Filter size={16} />
              {priorities.map((item) => (
                <button key={item} className={priority === item ? 'active' : ''} onClick={() => setPriority(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="feed-list">
            {filteredFeed.map((item) => {
              const colors = priorityColors[item.priority];
              const selected = selectedNotification.id === item.id;
              return (
                <button key={item.id} className={`feed-item ${selected ? 'selected' : ''}`} onClick={() => setSelectedNotificationId(item.id)}>
                  <div className="feed-topline">
                    <span className="priority-chip" style={{ background: colors?.bg || 'var(--bg-secondary)', color: colors?.text || 'var(--text-primary)', borderColor: colors?.border || 'var(--border-color)' }}>{item.priority}</span>
                    <span className="feed-time">{item.sentAt}</span>
                  </div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                  <div className="feed-meta">
                    <span><Users size={13} /> {item.audience}</span>
                    <span><Radio size={13} /> {item.channel}</span>
                    <span><CheckCircle2 size={13} /> {item.status}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel detail-panel">
          <div className="detail-header">
            <span className="category-pill">{selectedNotification.category}</span>
            <span className="status-pill">{selectedNotification.status}</span>
          </div>
          <h2>{selectedNotification.title}</h2>
          <p>{selectedNotification.body}</p>
          <div className="delivery-grid">
            <DeliveryStat label="Delivered" value={selectedNotification.delivered} />
            <DeliveryStat label="Read" value={selectedNotification.read} />
            <DeliveryStat label="Read Rate" value={`${selectedNotification.readRate}%`} />
          </div>
          <div className="read-track">
            <div>
              <span>Read tracking</span>
              <strong>{selectedNotification.readRate}% complete</strong>
            </div>
            <div className="track">
              <div style={{ width: `${selectedNotification.readRate}%` }} />
            </div>
          </div>
          <div className="ai-box">
            <Sparkles size={18} />
            <div>
              <strong>AI delivery insight</strong>
              <p>{selectedNotification.readRate < 75 ? 'Read rate is below target. Send a short follow-up through SMS for non-read parents after 6 PM.' : 'Message is performing well. Keep the same audience-channel mix for similar updates.'}</p>
            </div>
          </div>
        </section>

        <section className="panel composer-panel">
          <div className="panel-header compact">
            <h2><MessageSquareText size={18} /> Message Composer</h2>
          </div>
          <form onSubmit={handleScheduleBroadcast} className="composer-form">
            <label>
              Announcement title
              <input value={composerTitle} onChange={e => setComposerTitle(e.target.value)} placeholder="e.g. Schedule for Science Fair Expo" />
            </label>
            <label>
              Message
              <textarea value={composerBody} onChange={e => setComposerBody(e.target.value)} placeholder="e.g. Project submissions close tomorrow..." />
            </label>
            <div className="form-row">
              <label>
                Audience
                <select value={composerAudience} onChange={(event) => setComposerAudience(event.target.value)}>
                  {audienceSegments.map((segment) => <option key={segment.name}>{segment.name}</option>)}
                </select>
              </label>
              <label>
                Priority
                <select value={composerPriority} onChange={(event) => setComposerPriority(event.target.value)}>
                  {priorities.filter((item) => item !== 'All').map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
            <div className="channel-row">
              {channels.map((item) => (
                <button key={item} className={composerChannel === item ? 'active' : ''} onClick={() => setComposerChannel(item)} type="button">
                  {item}
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn-primary send-button" disabled={isProcessing}>
              <Send size={16} /> {isProcessing ? 'Dispatching...' : 'Schedule broadcast'}
            </button>
          </form>
        </section>
      </div>

      <div className="bottom-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Announcements</h2>
              <span>Published and scheduled school-wide notices</span>
            </div>
          </div>
          <div className="announcement-list">
            {announcements.map((item) => (
              <div key={item.title} className="announcement-card">
                <div className="announcement-icon"><Megaphone size={18} /></div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.date} - {item.audience} - {item.owner}</span>
                </div>
                <b>{item.status}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Audience Targeting</h2>
              <span>Reusable communication segments</span>
            </div>
          </div>
          <div className="segment-grid">
            {audienceSegments.map((segment) => (
              <div key={segment.name} className="segment-card">
                <div>
                  <strong>{segment.name}</strong>
                  <span>{segment.reach}</span>
                </div>
                <b>{segment.count}</b>
              </div>
            ))}
            <div className="segment-card muted">
              <div>
                <strong>Class groups</strong>
                <span>{mockClasses.length} class-specific audiences available</span>
              </div>
              <b>{mockClasses.length}</b>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Notification Analytics</h2>
              <span>Channel performance this month</span>
            </div>
          </div>
          <div className="analytics-list">
            {analyticsBars.map((item) => (
              <div key={item.label} className="analytics-row">
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>
                <div className="analytics-track">
                  <div style={{ width: `${item.value}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="history-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Communication History</h2>
              <span>Audit-ready log of message activity</span>
            </div>
            <ShieldCheck size={20} color="#10B981" />
          </div>
          <div className="history-list">
            {history.map((item) => (
              <div key={`${item.action}-${item.time}`} className="history-item">
                <div className="history-dot" />
                <div>
                  <strong>{item.action}</strong>
                  <span>{item.user} - {item.time}</span>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel ai-panel">
          <div className="panel-header compact">
            <h2><Sparkles size={18} /> AI Communication Insights</h2>
          </div>
          <div className="ai-stack">
            <div><Clock size={17} /><span>Best send window is 7:30 AM for urgent transport alerts and 6:30 PM for parent reminders.</span></div>
            <div><Mail size={17} /><span>Email performs best for academic notices; SMS performs best for same-day alerts.</span></div>
            <div><BarChart3 size={17} /><span>Fee reminders need a second-language short version to improve read rate by an estimated 11%.</span></div>
          </div>
        </section>
      </div>

      <style>{`
        .communication-center { display: flex; flex-direction: column; gap: 20px; padding-bottom: 36px; }
        .comm-hero { min-height: 218px; border-radius: 16px; padding: 28px; color: #fff; background: linear-gradient(120deg, rgba(15,23,42,.86), rgba(79,70,229,.58)), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&auto=format&fit=crop') center/cover; display: flex; justify-content: space-between; gap: 24px; align-items: flex-end; box-shadow: 0 18px 45px rgba(15,23,42,.18); }
        .comm-hero h1 { max-width: 780px; margin: 8px 0 10px; font-size: 34px; line-height: 1.1; letter-spacing: 0; }
        .comm-hero p { max-width: 720px; margin: 0; color: rgba(255,255,255,.84); font-size: 15px; }
        .eyebrow { text-transform: uppercase; letter-spacing: .08em; font-size: 12px; font-weight: 800; color: rgba(255,255,255,.72); }
        .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
        .hero-actions .btn, .send-button { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
        .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .metric-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 18px; display: flex; gap: 14px; align-items: center; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .metric-icon { width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; }
        .metric-card span { display: block; color: var(--text-muted); font-size: 12px; font-weight: 700; text-transform: uppercase; }
        .metric-card strong { display: block; margin-top: 2px; color: var(--text-primary); font-size: 26px; line-height: 1; }
        .metric-card p { margin: 4px 0 0; color: var(--text-secondary); font-size: 12px; }
        .comm-layout { display: grid; grid-template-columns: 1.2fr 1fr .95fr; gap: 16px; align-items: stretch; }
        .bottom-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .history-grid { display: grid; grid-template-columns: 1.45fr .9fr; gap: 16px; }
        .panel { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(15,23,42,.04); }
        .panel-header { padding: 16px 18px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .panel-header.compact { border-bottom: 0; padding-bottom: 8px; }
        .panel-header h2 { margin: 0; font-size: 16px; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
        .panel-header span { display: block; margin-top: 3px; color: var(--text-muted); font-size: 12px; }
        .feed-controls { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; border-bottom: 1px solid var(--border-color); }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: var(--bg-body); border-radius: 10px; border: 1px solid var(--border-color); }
        .search-box input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--text-primary); font-size: 14px; }
        .priority-tabs { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .priority-tabs button, .channel-row button { border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-secondary); border-radius: 999px; padding: 7px 11px; cursor: pointer; font-size: 12px; font-weight: 700; }
        .priority-tabs button.active, .channel-row button.active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
        .feed-list { padding: 10px; display: flex; flex-direction: column; gap: 10px; max-height: 560px; overflow: auto; }
        .feed-item { width: 100%; text-align: left; border: 1px solid var(--border-color); background: var(--bg-body); border-radius: 12px; padding: 13px; color: inherit; cursor: pointer; }
        .feed-item.selected { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(79,70,229,.12); }
        .feed-topline, .feed-meta, .detail-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
        .priority-chip, .category-pill, .status-pill { border: 1px solid transparent; border-radius: 999px; padding: 5px 8px; font-size: 11px; font-weight: 800; }
        .feed-time { color: var(--text-muted); font-size: 12px; }
        .feed-item strong { display: block; margin-top: 10px; color: var(--text-primary); font-size: 14px; }
        .feed-item p { margin: 6px 0 10px; color: var(--text-secondary); font-size: 13px; line-height: 1.45; }
        .feed-meta { justify-content: flex-start; color: var(--text-muted); font-size: 12px; }
        .feed-meta span { display: inline-flex; align-items: center; gap: 5px; }
        .detail-panel, .composer-panel, .ai-panel { padding: 18px; }
        .category-pill { background: rgba(79,70,229,.10); color: #4338CA; }
        .status-pill { background: rgba(16,185,129,.12); color: #047857; }
        .detail-panel h2 { margin: 16px 0 8px; color: var(--text-primary); font-size: 24px; line-height: 1.15; }
        .detail-panel p { color: var(--text-secondary); line-height: 1.5; font-size: 14px; }
        .delivery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 18px 0; }
        .delivery-stat { padding: 12px; border-radius: 10px; background: var(--bg-body); border: 1px solid var(--border-color); }
        .delivery-stat span { display: block; color: var(--text-muted); font-size: 11px; text-transform: uppercase; font-weight: 800; }
        .delivery-stat strong { display: block; margin-top: 5px; color: var(--text-primary); font-size: 21px; }
        .read-track > div:first-child { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary); margin-bottom: 8px; }
        .track, .analytics-track { height: 9px; border-radius: 999px; background: var(--bg-body); overflow: hidden; }
        .track div, .analytics-track div { height: 100%; border-radius: inherit; background: var(--color-primary); }
        .ai-box { margin-top: 18px; display: flex; gap: 12px; padding: 14px; border-radius: 12px; background: rgba(79,70,229,.10); color: var(--text-primary); }
        .ai-box strong { display: block; font-size: 13px; }
        .ai-box p { margin: 4px 0 0; font-size: 13px; }
        .composer-form { display: flex; flex-direction: column; gap: 13px; }
        .composer-form label { display: flex; flex-direction: column; gap: 6px; color: var(--text-secondary); font-size: 12px; font-weight: 800; text-transform: uppercase; }
        .composer-form input, .composer-form textarea, .composer-form select { border: 1px solid var(--border-color); border-radius: 10px; background: var(--bg-body); color: var(--text-primary); padding: 10px 12px; font-size: 13px; outline: 0; }
        .composer-form textarea { min-height: 110px; resize: vertical; line-height: 1.5; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .channel-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .announcement-list, .analytics-list, .history-list, .ai-stack { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 12px; }
        .announcement-card, .report-card { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; padding: 12px; border-radius: 10px; background: var(--bg-body); }
        .announcement-icon { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; color: #4F46E5; background: rgba(79,70,229,.10); }
        .announcement-card strong, .segment-card strong, .history-item strong { display: block; color: var(--text-primary); font-size: 14px; }
        .announcement-card span, .segment-card span, .history-item span { display: block; margin-top: 4px; color: var(--text-muted); font-size: 12px; }
        .announcement-card b { color: var(--color-primary); font-size: 12px; }
        .segment-grid { padding: 14px 16px 16px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .segment-card { display: flex; justify-content: space-between; gap: 10px; padding: 12px; border-radius: 10px; background: var(--bg-body); border: 1px solid var(--border-color); }
        .segment-card.muted { grid-column: span 2; }
        .segment-card b { color: var(--text-primary); font-size: 22px; }
        .analytics-row { display: flex; flex-direction: column; gap: 8px; }
        .analytics-row > div:first-child { display: flex; justify-content: space-between; color: var(--text-secondary); font-size: 13px; }
        .analytics-row strong { color: var(--text-primary); }
        .history-item { position: relative; display: flex; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color); }
        .history-item:last-child { border-bottom: 0; padding-bottom: 0; }
        .history-dot { width: 10px; height: 10px; border-radius: 999px; background: var(--color-primary); margin-top: 4px; flex: 0 0 auto; box-shadow: 0 0 0 4px rgba(79,70,229,.12); }
        .history-item p { margin: 5px 0 0; color: var(--text-secondary); font-size: 13px; }
        .ai-stack div { display: flex; gap: 10px; padding: 12px; border-radius: 10px; background: var(--bg-body); color: var(--text-secondary); font-size: 13px; line-height: 1.45; }
        @media (max-width: 1180px) {
          .comm-layout, .bottom-grid, .history-grid { grid-template-columns: 1fr; }
          .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .comm-hero { align-items: flex-start; flex-direction: column; padding: 22px; }
          .comm-hero h1 { font-size: 26px; }
          .metric-grid, .delivery-grid, .form-row, .segment-grid { grid-template-columns: 1fr; }
          .segment-card.muted { grid-column: auto; }
        }
      `}</style>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  note,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  note: string;
  tone: 'primary' | 'success' | 'warning' | 'info';
}) {
  const colors = {
    primary: ['rgba(79,70,229,.12)', '#4F46E5'],
    success: ['rgba(16,185,129,.12)', '#10B981'],
    warning: ['rgba(245,158,11,.14)', '#F59E0B'],
    info: ['rgba(6,182,212,.12)', '#06B6D4'],
  };

  return (
    <div className="metric-card">
      <div className="metric-icon" style={{ background: colors[tone][0], color: colors[tone][1] }}>
        {icon}
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{note}</p>
      </div>
    </div>
  );
}

function DeliveryStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="delivery-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
