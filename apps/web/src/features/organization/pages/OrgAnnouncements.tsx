import React, { useState } from 'react';
import { orgMocks } from '../../../mock/organization/orgMocks';

const Sparkline = ({ points, strokeColor }: { points: string; strokeColor: string }) => (
  <svg width="80" height="40" viewBox="0 0 100 40" style={{ alignSelf: 'flex-end', marginLeft: 'auto', flexShrink: 0 }}>
    <path d={points} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface KpiCardProps {
  title: string;
  iconBg: string;
  iconColor: string;
  iconSvg: React.ReactNode;
  valueNode: React.ReactNode;
  trendText: string;
  isTrendUp: boolean;
  sparklinePoints: string;
  sparklineColor: string;
}

function KpiCard({ title, iconBg, iconColor, iconSvg, valueNode, trendText, isTrendUp, sparklinePoints, sparklineColor }: KpiCardProps) {
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
      padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px', background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, flexShrink: 0
        }}>
          {iconSvg}
        </div>
        <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, cursor: 'pointer' }} title="Info">ⓘ</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 4 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{title}</div>
          {valueNode}
          <div style={{ fontSize: '13px', fontWeight: 600, marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#10b981' }}>{trendText}</span>
            <span style={{ color: '#9ca3af', fontWeight: 500 }}>vs last month</span>
          </div>
        </div>
        <Sparkline points={sparklinePoints} strokeColor={sparklineColor} />
      </div>
    </div>
  );
}

interface Props {
  defaultTab?: 'announcements' | 'messages';
}

export default function OrgAnnouncements({ defaultTab = 'announcements' }: Props) {
  const getIconSvg = (name: string, size = 14) => {
    switch (name) {
      case 'document':
      case '📄':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
      case 'users':
      case '👥':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
      case 'shield':
      case '🛡️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
      case 'calendar':
      case '📅':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
      case 'chart':
      case '📊':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
      case 'image':
      case '🖼️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
      case 'alert':
      case '🚨':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
      default:
        return null;
    }
  };

  const [tab, setTab] = useState<'announcements' | 'messages'>(defaultTab);

  const [announcementsList, setAnnouncementsList] = useState(orgMocks.announcements);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [activePrincipal, setActivePrincipal] = useState(orgMocks.principals[0]);
  const [messageText, setMessageText] = useState('');
  const [chatHistory, setChatHistory] = useState<Record<string, { sender: string; text: string; time: string }[]>>({
    'Rajesh Kumar': [
      { sender: 'Rajesh Kumar', text: 'Good morning sir, Q1 academic reports have been submitted.', time: '10:15 AM' },
      { sender: 'Vikram Singhania', text: 'Excellent. Please review the Class 8B math metrics.', time: '11:00 AM' },
    ]
  });

  const handleBranchToggle = (branchId: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId) ? prev.filter((id) => id !== branchId) : [...prev, branchId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBranches.length === orgMocks.branches.length) {
      setSelectedBranches([]);
    } else {
      setSelectedBranches(orgMocks.branches.map((b) => b.id));
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || selectedBranches.length === 0) {
      alert('Please fill out all fields and select at least one branch.');
      return;
    }
    const newAnn = {
      id: String(announcementsList.length + 1),
      title,
      content,
      date: 'Today',
      branches: selectedBranches.length === orgMocks.branches.length ? ['All'] : selectedBranches,
      author: 'Vikram Singhania',
    };
    setAnnouncementsList([newAnn, ...announcementsList]);
    setTitle('');
    setContent('');
    setSelectedBranches([]);
    alert('Announcement published successfully to selected Principals.');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    const history = chatHistory[activePrincipal.name] || [];
    const updated = [...history, { sender: 'Vikram Singhania', text: messageText, time: 'Just now' }];
    setChatHistory({ ...chatHistory, [activePrincipal.name]: updated });
    setMessageText('');
  };

  const getActiveTabStyle = (active: boolean) => ({
    padding: '10px 20px',
    borderRadius: '8px',
    border: active ? 'none' : '1px solid #e5e7eb',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    background: active ? '#2563eb' : '#ffffff',
    color: active ? '#ffffff' : '#4b5563',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  });

  const renderAnnouncements = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KpiCard
          title="ANNOUNCEMENTS SENT"
          iconBg="#eff6ff"
          iconColor="#2563eb"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>48</div>}
          trendText="↑ 20%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 15, 45 28 T 85 8"
          sparklineColor="#2563eb"
        />

        <KpiCard
          title="PRINCIPALS REACHED"
          iconBg="#ecfdf5"
          iconColor="#10b981"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>15</div>}
          trendText="100% of branches"
          isTrendUp={true}
          sparklinePoints="M 5 30 Q 25 35, 45 20 T 85 5"
          sparklineColor="#10b981"
        />

        <KpiCard
          title="AVG. OPEN RATE"
          iconBg="#f5f3ff"
          iconColor="#8b5cf6"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>87.6%</div>}
          trendText="↑ 6.4%"
          isTrendUp={true}
          sparklinePoints="M 5 15 Q 25 22, 45 10 T 85 30"
          sparklineColor="#8b5cf6"
        />

        <KpiCard
          title="RESPONSE RATE"
          iconBg="#fffbeb"
          iconColor="#f59e0b"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <rect x="1" y="4" width="22" height="16" rx="2" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>62.3%</div>}
          trendText="↑ 8.1%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 22, 45 28 T 85 10"
          sparklineColor="#f59e0b"
        />
      </div>

      {/* Main Form & Sidebar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginTop: 4 }}>
        {/* Create Announcement (Target: Principals Only) */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <h2 style={{
            fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Create Announcement (Target: Principals Only)
            <span style={{ color: '#9ca3af', fontSize: '12px', cursor: 'pointer' }} title="Target Details">ⓘ</span>
          </h2>

          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>
                Announcement Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px',
                  fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box'
                }}
                placeholder="e.g. Uniform Policy Updates"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>
                Message / Notice Details
              </label>
              {/* Mock Editor Toolbar */}
              <div style={{
                border: '1px solid #e5e7eb', borderBottom: 'none', borderTopLeftRadius: '8px', borderTopRightRadius: '8px',
                padding: '6px 12px', background: '#f9fafb', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'
              }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', cursor: 'pointer' }}>Normal ▼</span>
                <span style={{ width: 1, height: 12, background: '#e5e7eb' }} />
                <span style={{ fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>B</span>
                <span style={{ fontSize: '12px', fontStyle: 'italic', cursor: 'pointer' }}>I</span>
                <span style={{ fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }}>U</span>
                <span style={{ width: 1, height: 12, background: '#e5e7eb' }} />
                <span style={{ fontSize: '12px', cursor: 'pointer' }}>•—</span>
                <span style={{ fontSize: '12px', cursor: 'pointer' }}>1—</span>
                <span style={{ width: 1, height: 12, background: '#e5e7eb' }} />
                <span style={{ fontSize: '12px', cursor: 'pointer' }}>🔗</span>
                <span style={{ fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{getIconSvg('🖼️', 12)}</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                style={{
                  width: '100%', padding: '12px 14px', border: '1px solid #e5e7eb', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px',
                  fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box', resize: 'vertical'
                }}
                placeholder="Enter announcement instructions..."
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#4b5563' }}>
                  Target School Branches
                </label>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Select All
                </button>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {orgMocks.branches.map((branch) => (
                  <label key={branch.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#4b5563', cursor: 'pointer', fontWeight: 500 }}>
                    <input
                      type="checkbox"
                      checked={selectedBranches.includes(branch.id)}
                      onChange={() => handleBranchToggle(branch.id)}
                    />
                    {branch.name}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button
                type="button"
                style={{
                  background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                </svg>
                Schedule Later
              </button>

              <button
                type="submit"
                style={{
                  background: '#2563eb', border: 'none', borderRadius: '8px',
                  padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Publish Announcement
              </button>
            </div>
          </form>
        </div>

        {/* Right side: Quick Actions & Saved Templates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Quick Actions */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
            padding: '20px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: '0 0 16px 0', fontFamily: 'Inter, sans-serif' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ display: 'block', marginBottom: 4, color: '#2563eb' }}>{getIconSvg('👥', 18)}</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Send to All Principals</div>
                <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>Broadcast to all</div>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ display: 'block', marginBottom: 4, color: '#ef4444' }}>{getIconSvg('🛡️', 18)}</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Urgent Announcement</div>
                <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>Mark as high priority</div>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ display: 'block', marginBottom: 4, color: '#f59e0b' }}>{getIconSvg('📅', 18)}</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Schedule Announcement</div>
                <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>Choose date & time</div>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ display: 'block', marginBottom: 4, color: '#8b5cf6' }}>{getIconSvg('📊', 18)}</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Announcement Report</div>
                <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>View analytics</div>
              </div>
            </div>
          </div>

          {/* Saved Templates */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
            padding: '20px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', flex: 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Saved Templates
              </h3>
              <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Uniform Policy Update', time: 'Last used: Jul 10, 2026' },
                { name: 'Exam Schedule Announcement', time: 'Last used: Jul 02, 2026' },
                { name: 'Holiday Notice Template', time: 'Last used: Jun 28, 2026' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f9fafb', padding: '10px 12px', borderRadius: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: '#4b5563' }}>{getIconSvg('📄', 16)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.name}</div>
                    <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>{item.time}</div>
                  </div>
                  <span style={{ color: '#9ca3af', cursor: 'pointer', fontWeight: 700 }}>•••</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Published Announcements History */}
      <div style={{
        background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
        padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', marginTop: 4
      }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif' }}>
          Published Announcements History
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6', color: '#6b7280', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>TITLE</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>TARGET</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>SENT BY</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>SENT ON</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>OPEN RATE</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>STATUS</th>
                <th style={{ padding: '10px 12px', width: '30px' }}></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  title: 'Uniform Syllabus and Grading Guidelines',
                  desc: 'This circular sets the guideline for standard syllabus...',
                  target: 'All Branches',
                  targetPill: '15 Principals',
                  author: 'Vikram Singhania',
                  role: 'Organization Admin',
                  date: 'Jul 14, 2026',
                  time: '10:30 AM',
                  open: 92,
                  barColor: '#10b981',
                  iconBg: '#f3e8ff',
                  iconColor: '#7c3aed'
                },
                {
                  title: 'Principal Evaluation Portal Open',
                  desc: 'Annual performance evaluations for Q1 are open...',
                  target: 'Koramangala, Whitefield',
                  targetPill: '8 Principals',
                  author: 'Vikram Singhania',
                  role: 'Organization Admin',
                  date: 'Jul 10, 2026',
                  time: '04:15 PM',
                  open: 81,
                  barColor: '#3b82f6',
                  iconBg: '#fffbeb',
                  iconColor: '#f59e0b'
                },
                {
                  title: 'Fee Collection Reminder',
                  desc: 'Monthly fee collection status and pending list...',
                  target: 'All Branches',
                  targetPill: '15 Principals',
                  author: 'Vikram Singhania',
                  role: 'Organization Admin',
                  date: 'Jul 05, 2026',
                  time: '09:00 AM',
                  open: 76,
                  barColor: '#f97316',
                  iconBg: '#fee2e2',
                  iconColor: '#ef4444'
                }
              ].map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f9fafb' }}>
                  <td style={{ padding: '12px 12px', maxWidth: '280px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '6px', background: row.iconBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: row.iconColor, flexShrink: 0, marginTop: 2
                      }}>
                        {getIconSvg('📄', 15)}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{row.title}</div>
                        <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{row.desc}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{row.target}</div>
                    <span style={{
                      background: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '10px',
                      fontWeight: 700, fontSize: '9px', marginTop: 4, display: 'inline-block'
                    }}>
                      {row.targetPill}
                    </span>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%', background: '#3b82f6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 700, fontSize: '9px'
                      }}>
                        VS
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1f2937' }}>{row.author}</div>
                        <div style={{ color: '#9ca3af', fontSize: '9px', marginTop: 1 }}>{row.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937' }}>{row.date}</div>
                    <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 1 }}>{row.time}</div>
                  </td>
                  <td style={{ padding: '12px 12px', minWidth: '100px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: '#1f2937' }}>{row.open}%</span>
                    </div>
                    <div style={{ height: 5, background: '#f3f4f6', borderRadius: 2.5, width: '100%' }}>
                      <div style={{ width: `${row.open}%`, height: '100%', background: row.barColor, borderRadius: 2.5 }} />
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{
                      background: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '12px',
                      fontWeight: 700, fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: 4
                    }}>
                      ✓ Delivered
                    </span>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <button style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontWeight: 700 }}>
                      •••
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 16, paddingTop: 14, textAlign: 'center' }}>
          <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}>
            View All Announcements →
          </span>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', minHeight: 480 }}>
      {/* Sidebar - Principals list */}
      <div style={{ borderRight: '1px solid #e5e7eb', padding: 12, display: 'flex', flexDirection: 'column', gap: 8, background: '#f9fafb' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', padding: '4px 8px' }}>School Leaders</div>
        {orgMocks.principals.map((principal, idx) => (
          <button
            key={idx}
            onClick={() => setActivePrincipal(principal)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
              background: activePrincipal.name === principal.name ? '#eff6ff' : 'transparent',
              color: activePrincipal.name === principal.name ? '#2563eb' : '#4b5563',
              fontWeight: activePrincipal.name === principal.name ? 700 : 500, width: '100%',
            }}
          >
            <img src={principal.photo} alt={principal.name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{principal.name}</div>
              <div style={{ fontSize: 10, color: '#9ca3af' }}>{principal.branch}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main chat window */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', margin: 0 }}>{activePrincipal.name}</h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', margin: '2px 0 0 0' }}>Principal · {activePrincipal.branch}</p>
          </div>
          <button
            onClick={() => alert(`Emergency circular alert sent to ${activePrincipal.branch}`)}
            style={{
              background: '#ef4444', border: 'none', borderRadius: '6px', color: '#ffffff',
              fontSize: 12, padding: '6px 12px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            {getIconSvg('🚨', 14)} Emergency Alert
          </button>
        </div>

        <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', background: '#f9fafb', minHeight: '300px' }}>
          {(chatHistory[activePrincipal.name] || []).map((msg, i) => {
            const isMe = msg.sender === 'Vikram Singhania';
            return (
              <div key={i} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: '12px', fontSize: 13, lineHeight: 1.5,
                  background: isMe ? '#2563eb' : '#ffffff',
                  color: isMe ? '#ffffff' : '#1f2937',
                  border: isMe ? 'none' : '1px solid #e5e7eb',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4, textAlign: isMe ? 'right' : 'left' }}>
                  {msg.sender} · {msg.time}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSendMessage} style={{ padding: 16, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 12 }}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            style={{
              flex: 1, padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '8px',
              fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif'
            }}
            placeholder="Type a message to principal..."
          />
          <button type="submit" style={{
            background: '#2563eb', border: 'none', borderRadius: '8px', color: '#ffffff',
            padding: '0 20px', fontWeight: 600, cursor: 'pointer', fontSize: '13px'
          }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Header Icon */}
          <div style={{
            width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
              Communications Hub
            </h1>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Broadcast important updates to Principals securely and efficiently.
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setTab('announcements')}
            style={getActiveTabStyle(tab === 'announcements')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Announcements
          </button>
          <button
            onClick={() => setTab('messages')}
            style={getActiveTabStyle(tab === 'messages')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Direct Messages
          </button>
        </div>
      </div>

      {tab === 'announcements' ? renderAnnouncements() : renderMessages()}
    </div>
  );
}
