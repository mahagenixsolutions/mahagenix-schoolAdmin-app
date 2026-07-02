import React, { useState } from 'react';
import { PageLayout } from '../../components/erp/PageLayout';
import { PageHeader } from '../../components/erp/PageHeader';
import { KPICard } from '../../components/erp/KPICard';
import { DataGrid } from '../../components/erp/DataGrid';
import type { GridColumn } from '../../components/erp/DataGrid';
import { StatusBadge } from '../../components/erp/StatusBadge';
import {
  Bell,
  Smartphone,
  Mail,
  Megaphone,
  FileText,
  Plus,
  Search,
  Trash2,
  X,
  Send,
  Inbox,
  Sparkles
} from 'lucide-react';

// Type definitions
interface PushNotification {
  id: string;
  title: string;
  message: string;
  target: 'All' | 'Teachers' | 'Students' | 'Parents';
  sentAt: string;
  status: 'Sent' | 'Scheduled';
}

interface SMSBlast {
  id: string;
  target: 'All' | 'Teachers' | 'Students' | 'Parents';
  message: string;
  recipientsCount: number;
  cost: string;
  sentAt: string;
  status: 'Delivered' | 'Pending' | 'Failed';
}

interface EmailCampaign {
  id: string;
  subject: string;
  target: string;
  sender: string;
  sentAt: string;
  openRate: string;
  status: 'Sent' | 'Draft';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  date: string;
  expiryDate: string;
  status: 'Active' | 'Archived';
}

interface CircularDoc {
  id: string;
  number: string;
  title: string;
  target: 'Staff' | 'Parents' | 'All';
  date: string;
  attachment: string;
  size: string;
}

const CommunicationPage: React.FC = () => {
  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState<'notifications' | 'sms' | 'email' | 'announcements' | 'circulars'>('notifications');

  // --- Modals State ---
  const [showAddNotifyModal, setShowAddNotifyModal] = useState(false);
  const [showAddSMSModal, setShowAddSMSModal] = useState(false);
  const [showAddEmailModal, setShowAddEmailModal] = useState(false);
  const [showAddAnnouncementModal, setShowAddAnnouncementModal] = useState(false);
  const [showAddCircularModal, setShowAddCircularModal] = useState(false);

  // --- Form Inputs ---
  const [newNotify, setNewNotify] = useState<{ title: string; message: string; target: 'All' | 'Teachers' | 'Students' | 'Parents'; status: 'Sent' | 'Scheduled' }>({ title: '', message: '', target: 'All', status: 'Sent' });
  const [newSMS, setNewSMS] = useState<{ target: 'All' | 'Teachers' | 'Students' | 'Parents'; message: string }>({ target: 'All', message: '' });
  const [newEmail, setNewEmail] = useState({ subject: '', target: 'Parents', sender: 'admin@school.edu', template: 'Newsletter', status: 'Sent' as const });
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', expiryDate: '' });
  const [newCircular, setNewCircular] = useState<{ title: string; number: string; target: 'Staff' | 'Parents' | 'All'; attachmentName: string }>({ title: '', number: '', target: 'All', attachmentName: '' });

  // --- Search & Filters ---
  const [notifySearch, setNotifySearch] = useState('');
  const [smsSearch, setSmsSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [announcementSearch, setAnnouncementSearch] = useState('');
  const [circularSearch, setCircularSearch] = useState('');

  // --- Local Database / States ---
  const [notifications, setNotifications] = useState<PushNotification[]>([
    { id: 'NTF001', title: 'Admissions Open 2026-2027', message: 'Applications for the new academic year are now live on the portal.', target: 'All', sentAt: '2026-07-01 09:30', status: 'Sent' },
    { id: 'NTF002', title: 'Grade 10 Exam Marks Released', message: 'Term 1 final evaluation marks have been updated in the results center.', target: 'Parents', sentAt: '2026-06-28 14:15', status: 'Sent' },
    { id: 'NTF003', title: 'Staff Meeting Agenda', message: 'A brief brief briefing on upcoming curriculum review in Conference Room A.', target: 'Teachers', sentAt: '2026-07-03 08:00', status: 'Scheduled' },
  ]);

  const [smsCredits, setSmsCredits] = useState(12450);
  const [smsBlasts, setSmsBlasts] = useState<SMSBlast[]>([
    { id: 'SMS001', target: 'Parents', message: 'Alert: School remains closed tomorrow due to heavy rain warnings. Remote learning active.', recipientsCount: 840, cost: '$8.40', sentAt: '2026-06-25 18:10', status: 'Delivered' },
    { id: 'SMS002', target: 'Teachers', message: 'Friendly reminder: Submit monthly activity scores on the ERP portal by Friday afternoon.', recipientsCount: 75, cost: '$0.75', sentAt: '2026-06-29 11:30', status: 'Delivered' },
  ]);

  const [emails, setEmails] = useState<EmailCampaign[]>([
    { id: 'EML001', subject: 'July Monthly Campus Newsletter', target: 'All Stakeholders', sender: 'principal@school.edu', sentAt: '2026-07-02 10:00', openRate: '78%', status: 'Sent' },
    { id: 'EML002', subject: 'Term 1 Outstanding Dues Payment Reminder', target: 'Defaulting Parents List', sender: 'accounts@school.edu', sentAt: '2026-06-15 09:00', openRate: '62%', status: 'Sent' },
    { id: 'EML003', subject: 'Annual Science Fair Invitation & Guidelines', target: 'Grade 6-12 Students', sender: 'admin@school.edu', sentAt: '--', openRate: '--', status: 'Draft' },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: 'ANC001', title: 'Annual Science Exhibition 2026', content: 'Our Annual Science Fair will be held on July 25. Students can register projects in physics, chemistry, and biology through their science teacher. Exciting rewards!', createdBy: 'Dr. Alice Smith', date: '2026-07-02', expiryDate: '2026-07-24', status: 'Active' },
    { id: 'ANC002', title: 'New Sports Field Operational Guidelines', content: 'The newly synthetic turf football pitch is now open. Teams must wear appropriate sports shoes. Booking schedules will be handled by the PE department.', createdBy: 'Robert Dow', date: '2026-06-20', expiryDate: '2026-08-30', status: 'Active' },
  ]);

  const [circulars, setCirculars] = useState<CircularDoc[]>([
    { id: 'CIR001', number: 'CIR/2026/08', title: 'Summer Holiday Homework & Guidelines Pack', target: 'Parents', date: '2026-06-10', attachment: 'Summer_Holidays_Homework_Pack.pdf', size: '1.4 MB' },
    { id: 'CIR002', number: 'CIR/2026/09', title: 'Staff Dress Code & Professional Ethics Policy Code', target: 'Staff', date: '2026-06-18', attachment: 'Professional_Ethics_Policy_2026.pdf', size: '420 KB' },
  ]);

  // --- Mutators ---
  const handleAddNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotify.title || !newNotify.message) return;
    const id = `NTF${String(notifications.length + 1).padStart(3, '0')}`;
    const sentTime = newNotify.status === 'Sent'
      ? new Date().toISOString().replace('T', ' ').substring(0, 16)
      : '2026-07-04 09:00 (Scheduled)';

    const notify: PushNotification = {
      id,
      title: newNotify.title,
      message: newNotify.message,
      target: newNotify.target,
      sentAt: sentTime,
      status: newNotify.status,
    };
    setNotifications([notify, ...notifications]);
    setNewNotify({ title: '', message: '', target: 'All', status: 'Sent' });
    setShowAddNotifyModal(false);
  };

  const handleDeleteNotify = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleSendSMS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSMS.message) return;
    
    // Determine mock recipient count based on category
    let count = 1200; // All
    if (newSMS.target === 'Teachers') count = 75;
    else if (newSMS.target === 'Parents') count = 840;
    else if (newSMS.target === 'Students') count = 1100;

    if (smsCredits < count) {
      alert('Insufficient SMS credits to perform this dispatch blast!');
      return;
    }

    const id = `SMS${String(smsBlasts.length + 1).padStart(3, '0')}`;
    const costAmt = (count * 0.01).toFixed(2);
    const sms: SMSBlast = {
      id,
      target: newSMS.target,
      message: newSMS.message,
      recipientsCount: count,
      cost: `$${costAmt}`,
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Delivered',
    };

    setSmsBlasts([sms, ...smsBlasts]);
    setSmsCredits(prev => Math.max(0, prev - count));
    setNewSMS({ target: 'All', message: '' });
    setShowAddSMSModal(false);
  };

  const handleComposeEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.subject) return;
    const id = `EML${String(emails.length + 1).padStart(3, '0')}`;
    
    const mail: EmailCampaign = {
      id,
      subject: newEmail.subject,
      target: newEmail.target,
      sender: newEmail.sender,
      sentAt: newEmail.status === 'Sent' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : '--',
      openRate: newEmail.status === 'Sent' ? '0%' : '--',
      status: newEmail.status,
    };

    setEmails([mail, ...emails]);
    setNewEmail({ subject: '', target: 'Parents', sender: 'admin@school.edu', template: 'Newsletter', status: 'Sent' });
    setShowAddEmailModal(false);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    const id = `ANC${String(announcements.length + 1).padStart(3, '0')}`;
    const ann: Announcement = {
      id,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      createdBy: 'Principal Office',
      date: new Date().toISOString().split('T')[0],
      expiryDate: newAnnouncement.expiryDate || '2026-08-01',
      status: 'Active',
    };
    setAnnouncements([ann, ...announcements]);
    setNewAnnouncement({ title: '', content: '', expiryDate: '' });
    setShowAddAnnouncementModal(false);
  };

  const handleToggleArchiveAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(ann => {
      if (ann.id === id) {
        return { ...ann, status: ann.status === 'Active' ? 'Archived' : 'Active' };
      }
      return ann;
    }));
  };

  const handleAddCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCircular.title || !newCircular.number) return;
    const id = `CIR${String(circulars.length + 1).padStart(3, '0')}`;
    const doc: CircularDoc = {
      id,
      number: newCircular.number,
      title: newCircular.title,
      target: newCircular.target,
      date: new Date().toISOString().split('T')[0],
      attachment: newCircular.attachmentName || 'Circular_Attachment.pdf',
      size: '250 KB',
    };
    setCirculars([doc, ...circulars]);
    setNewCircular({ title: '', number: '', target: 'All', attachmentName: '' });
    setShowAddCircularModal(false);
  };

  const handleDeleteCircular = (id: string) => {
    setCirculars(circulars.filter(c => c.id !== id));
  };

  // --- Filter Logic ---
  const filteredNotifications = notifications.filter(n => {
    return n.title.toLowerCase().includes(notifySearch.toLowerCase()) || n.message.toLowerCase().includes(notifySearch.toLowerCase()) || n.target.toLowerCase().includes(notifySearch.toLowerCase());
  });

  const filteredSMS = smsBlasts.filter(s => {
    return s.message.toLowerCase().includes(smsSearch.toLowerCase()) || s.target.toLowerCase().includes(smsSearch.toLowerCase());
  });

  const filteredEmails = emails.filter(e => {
    return e.subject.toLowerCase().includes(emailSearch.toLowerCase()) || e.target.toLowerCase().includes(emailSearch.toLowerCase()) || e.sender.toLowerCase().includes(emailSearch.toLowerCase());
  });

  const filteredAnnouncements = announcements.filter(a => {
    return a.title.toLowerCase().includes(announcementSearch.toLowerCase()) || a.content.toLowerCase().includes(announcementSearch.toLowerCase());
  });

  const filteredCirculars = circulars.filter(c => {
    return c.title.toLowerCase().includes(circularSearch.toLowerCase()) || c.number.toLowerCase().includes(circularSearch.toLowerCase());
  });

  // --- Sidebar Configuration ---
  const navigationTabs = [
    { id: 'notifications', label: 'Push Alerts', icon: <Bell size={18} />, count: notifications.length },
    { id: 'sms', label: 'SMS Campaigns', icon: <Smartphone size={18} /> },
    { id: 'email', label: 'Email Broadcasts', icon: <Mail size={18} /> },
    { id: 'announcements', label: 'Noticeboard', icon: <Megaphone size={18} />, count: announcements.filter(a => a.status === 'Active').length },
    { id: 'circulars', label: 'Official Circulars', icon: <FileText size={18} />, count: circulars.length },
  ] as const;

  // --- Columns Definitions ---
  const notifyColumns: GridColumn<PushNotification>[] = [
    { key: 'title', header: 'Alert Title', render: (row) => <div style={{ fontWeight: 600 }}>{row.title}</div> },
    { key: 'message', header: 'Message Details', render: (row) => <div style={{ maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)' }}>{row.message}</div> },
    { key: 'target', header: 'Audience Group', render: (row) => <StatusBadge status="neutral" label={row.target} /> },
    { key: 'sentAt', header: 'Dispatch Time' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status === 'Sent' ? 'success' : 'warning'} label={row.status} />
    }
  ];

  const smsColumns: GridColumn<SMSBlast>[] = [
    { key: 'sentAt', header: 'Date Sent' },
    { key: 'target', header: 'Audience', render: (row) => <StatusBadge status="neutral" label={row.target} /> },
    { key: 'message', header: 'SMS Text', render: (row) => <div style={{ maxWidth: '280px', color: 'var(--text-secondary)' }}>{row.message}</div> },
    { key: 'recipientsCount', header: 'Recipients Count' },
    { key: 'cost', header: 'Disbursed Cost' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status="success" label={row.status} />
    }
  ];

  const emailColumns: GridColumn<EmailCampaign>[] = [
    { key: 'subject', header: 'Email Subject', render: (row) => <div style={{ fontWeight: 600 }}>{row.subject}</div> },
    { key: 'target', header: 'Target Segment' },
    { key: 'sender', header: 'Sender Addr' },
    { key: 'sentAt', header: 'Sent At' },
    { key: 'openRate', header: 'Open Rate', render: (row) => <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{row.openRate}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status === 'Sent' ? 'success' : 'neutral'} label={row.status} />
    }
  ];

  const circularColumns: GridColumn<CircularDoc>[] = [
    { key: 'number', header: 'Circular Ref', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.number}</span> },
    { key: 'title', header: 'Document Title', render: (row) => <div style={{ fontWeight: 600 }}>{row.title}</div> },
    { key: 'target', header: 'Audience', render: (row) => <StatusBadge status="neutral" label={row.target} /> },
    { key: 'date', header: 'Publish Date' },
    { key: 'attachment', header: 'File Details', render: (row) => <a href="#" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '12px', fontWeight: 500 }} onClick={e => e.preventDefault()}>{row.attachment} ({row.size})</a> },
  ];

  // --- Sub-renderers ---
  const renderNotificationsTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search push alerts..."
            value={notifySearch}
            onChange={(e) => setNotifySearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddNotifyModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Send Push Alert
        </button>
      </div>

      <DataGrid
        columns={notifyColumns}
        data={filteredNotifications}
        keyField="id"
        actions={(row) => (
          <button
            onClick={() => handleDeleteNotify(row.id)}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--accent-danger)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            className="hover-danger-btn"
            title="Delete Alert"
          >
            <Trash2 size={16} />
          </button>
        )}
      />
    </>
  );

  const renderSMSTab = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KPICard title="Remaining SMS Credits" value={smsCredits.toLocaleString()} icon={<Smartphone size={20} />} accentColor="var(--accent-primary)" />
        <KPICard title="Total Campaigns Sent" value={smsBlasts.length} icon={<Send size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Avg Recipients Count" value={Math.floor(smsBlasts.reduce((acc, curr) => acc + curr.recipientsCount, 0) / (smsBlasts.length || 1))} icon={<Inbox size={20} />} accentColor="var(--accent-violet)" />
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search text messages..."
            value={smsSearch}
            onChange={(e) => setSmsSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddSMSModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Dispatch SMS Blast
        </button>
      </div>

      <DataGrid
        columns={smsColumns}
        data={filteredSMS}
        keyField="id"
      />
    </>
  );

  const renderEmailTab = () => (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KPICard title="Average Open Rate" value="70%" icon={<Sparkles size={20} />} accentColor="var(--accent-violet)" />
        <KPICard title="Total Emails Sent" value={emails.filter(e => e.status === 'Sent').length} icon={<Mail size={20} />} accentColor="var(--accent-success)" />
        <KPICard title="Draft Campaigns" value={emails.filter(e => e.status === 'Draft').length} icon={<FileText size={20} />} accentColor="var(--accent-primary)" />
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search email logs..."
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddEmailModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Compose Email Blast
        </button>
      </div>

      <DataGrid
        columns={emailColumns}
        data={filteredEmails}
        keyField="id"
      />
    </>
  );

  const renderAnnouncementsTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search active notices..."
            value={announcementSearch}
            onChange={(e) => setAnnouncementSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddAnnouncementModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Create Announcement
        </button>
      </div>

      {/* Grid of announcement notice cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginTop: '12px' }}>
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="dashboard-card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              opacity: ann.status === 'Archived' ? 0.7 : 1,
              borderTop: ann.status === 'Active' ? '3px solid var(--accent-success)' : '3px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{ann.title}</span>
              <StatusBadge status={ann.status === 'Active' ? 'success' : 'neutral'} label={ann.status} />
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {ann.content}
            </p>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              <div>Published: <span style={{ fontWeight: 600 }}>{ann.date}</span> by <span style={{ fontWeight: 600 }}>{ann.createdBy}</span></div>
              <div>Expiry Alert: <span style={{ color: 'var(--accent-danger)' }}>{ann.expiryDate}</span></div>
            </div>
            <button
              onClick={() => handleToggleArchiveAnnouncement(ann.id)}
              style={{
                marginTop: '8px',
                border: '1px solid var(--border-subtle)',
                background: 'none',
                color: 'var(--text-primary)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 600,
                alignSelf: 'flex-end'
              }}
            >
              {ann.status === 'Active' ? 'Archive' : 'Activate'}
            </button>
          </div>
        ))}
      </div>
    </>
  );

  const renderCircularsTab = () => (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search circulars ref/title..."
            value={circularSearch}
            onChange={(e) => setCircularSearch(e.target.value)}
            className="form-control"
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '13px'
            }}
          />
        </div>
        <button
          onClick={() => setShowAddCircularModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 16px', background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600 }}
        >
          <Plus size={16} /> Publish Circular
        </button>
      </div>

      <DataGrid
        columns={circularColumns}
        data={filteredCirculars}
        keyField="id"
        actions={(row) => (
          <button
            onClick={() => handleDeleteCircular(row.id)}
            style={{
              border: 'none',
              background: 'none',
              color: 'var(--accent-danger)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            className="hover-danger-btn"
            title="Delete Circular"
          >
            <Trash2 size={16} />
          </button>
        )}
      />
    </>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return renderNotificationsTab();
      case 'sms':
        return renderSMSTab();
      case 'email':
        return renderEmailTab();
      case 'announcements':
        return renderAnnouncementsTab();
      case 'circulars':
        return renderCircularsTab();
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Communication Center"
        subtitle="Dispatch emergency notifications, SMS campaigns, emails, noticeboard announcements, and circulars."
        breadcrumbs={[{ label: 'Communication' }]}
      />

      <style>{`
        .hover-nav-item {
          transition: background-color 0.2s, color 0.2s;
        }
        .hover-nav-item:hover {
          background-color: var(--sidebar-hover-bg);
          color: var(--text-primary);
        }
        .hover-danger-btn:hover {
          background: rgba(239, 68, 68, 0.08) !important;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }
        .modal-container {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 24px;
          width: 90%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: var(--shadow-xl);
          animation: modalFadeIn 0.2s ease-out;
        }
        .modal-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .modal-form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .modal-form-group input, .modal-form-group select, .modal-form-group textarea {
          padding: 8px 12px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: var(--bg-canvas);
          color: var(--text-primary);
          outline: none;
          font-size: 13px;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Grid sidebar navigation layout */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%' }}>
        {/* Left Navigator Menu */}
        <div
          className="dashboard-card"
          style={{
            width: '260px',
            flexShrink: 0,
            padding: '16px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            background: 'var(--bg-surface)'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 8px 8px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
            COMMUNICATIONS
          </span>
          {navigationTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="hover-nav-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  outline: 'none',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                {'count' in tab && tab.count !== undefined && tab.count > 0 && (
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-surface-raised)',
                    color: 'var(--text-secondary)',
                    fontWeight: 600
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div style={{ flex: 1, minWidth: '0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="dashboard-card" style={{ padding: '24px', background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--accent-primary)' }}>
                  {navigationTabs.find(t => t.id === activeTab)?.icon}
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {navigationTabs.find(t => t.id === activeTab)?.label}
                </h2>
              </div>
            </div>

            {renderActiveTabContent()}
          </div>
        </div>
      </div>

      {/* --- SEND PUSH ALERT MODAL --- */}
      {showAddNotifyModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Send Push Alert</h3>
              <button onClick={() => setShowAddNotifyModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddNotify} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Alert Title</label>
                <input type="text" required placeholder="e.g. Science Fair Registration" value={newNotify.title} onChange={e => setNewNotify({ ...newNotify, title: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Target Audience</label>
                <select value={newNotify.target} onChange={e => setNewNotify({ ...newNotify, target: e.target.value as any })}>
                  <option value="All">All Audience</option>
                  <option value="Teachers">Teachers Only</option>
                  <option value="Parents">Parents Only</option>
                  <option value="Students">Students Only</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Notification Message</label>
                <textarea rows={3} required placeholder="Enter push notification content..." value={newNotify.message} onChange={e => setNewNotify({ ...newNotify, message: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Dispatch Timing</label>
                <select value={newNotify.status} onChange={e => setNewNotify({ ...newNotify, status: e.target.value as any })}>
                  <option value="Sent">Send Immediately</option>
                  <option value="Scheduled">Schedule for Tomorrow</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddNotifyModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Dispatch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DISPATCH SMS BLAST MODAL --- */}
      {showAddSMSModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Dispatch SMS Blast</h3>
              <button onClick={() => setShowAddSMSModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleSendSMS} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Audience Group</label>
                <select value={newSMS.target} onChange={e => setNewSMS({ ...newSMS, target: e.target.value as any })}>
                  <option value="All">All Registered Contacts</option>
                  <option value="Parents">Parents Only (840 contacts)</option>
                  <option value="Teachers">Staff / Teachers Only (75 contacts)</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>SMS Text Message</label>
                <textarea rows={3} maxLength={160} required placeholder="Enter SMS message (max 160 characters)..." value={newSMS.message} onChange={e => setNewSMS({ ...newSMS, message: e.target.value })} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right' }}>{newSMS.message.length}/160 characters</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddSMSModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Send Blast</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- COMPOSE EMAIL BLAST MODAL --- */}
      {showAddEmailModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Compose Email Campaign</h3>
              <button onClick={() => setShowAddEmailModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleComposeEmail} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Subject Line</label>
                <input type="text" required placeholder="e.g. Annual Sports Meet Details" value={newEmail.subject} onChange={e => setNewEmail({ ...newEmail, subject: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Target Segment</label>
                <input type="text" required value={newEmail.target} onChange={e => setNewEmail({ ...newEmail, target: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Sender Address</label>
                <input type="email" required value={newEmail.sender} onChange={e => setNewEmail({ ...newEmail, sender: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Template Design</label>
                <select value={newEmail.template} onChange={e => setNewEmail({ ...newEmail, template: e.target.value })}>
                  <option value="Newsletter">School Monthly Newsletter</option>
                  <option value="Alert">Urgent Notice Announcement Alert</option>
                  <option value="Invoice">Fee Payment Reminder / Invoice</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Campaign Status</label>
                <select value={newEmail.status} onChange={e => setNewEmail({ ...newEmail, status: e.target.value as any })}>
                  <option value="Sent">Send Immediately</option>
                  <option value="Draft">Save Draft Campaign</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddEmailModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save Email</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CREATE ANNOUNCEMENT MODAL --- */}
      {showAddAnnouncementModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Create Noticeboard Announcement</h3>
              <button onClick={() => setShowAddAnnouncementModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Announcement Title</label>
                <input type="text" required placeholder="e.g. Science Fair Registration" value={newAnnouncement.title} onChange={e => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Expiry Alert Date</label>
                <input type="date" required value={newAnnouncement.expiryDate} onChange={e => setNewAnnouncement({ ...newAnnouncement, expiryDate: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Bulletin Content</label>
                <textarea rows={4} required placeholder="Detail the announcement bulletin guidelines..." value={newAnnouncement.content} onChange={e => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddAnnouncementModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PUBLISH CIRCULAR MODAL --- */}
      {showAddCircularModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Publish Circular PDF</h3>
              <button onClick={() => setShowAddCircularModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddCircular} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="modal-form-group">
                <label>Circular Reference Number</label>
                <input type="text" required placeholder="e.g. CIR/2026/10" value={newCircular.number} onChange={e => setNewCircular({ ...newCircular, number: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Circular Title</label>
                <input type="text" required placeholder="e.g. New Academic Calendar Rules" value={newCircular.title} onChange={e => setNewCircular({ ...newCircular, title: e.target.value })} />
              </div>
              <div className="modal-form-group">
                <label>Target Audience</label>
                <select value={newCircular.target} onChange={e => setNewCircular({ ...newCircular, target: e.target.value as any })}>
                  <option value="All">All (Parents & Staff)</option>
                  <option value="Staff">School Staff Only</option>
                  <option value="Parents">Parents Only</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Mock Attachment File Name</label>
                <input type="text" required placeholder="e.g. Calendar_Revision_Notes.pdf" value={newCircular.attachmentName} onChange={e => setNewCircular({ ...newCircular, attachmentName: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setShowAddCircularModal(false)} className="btn btn-secondary" style={{ padding: '8px 16px', background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default CommunicationPage;
