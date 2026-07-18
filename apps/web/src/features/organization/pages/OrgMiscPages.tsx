import React from 'react';

interface Props {
  page: 'documents' | 'reports' | 'audit-logs' | 'subscription' | 'settings';
}

export default function OrgMiscPages({ page }: Props) {
  const [activeSettingsTab, setActiveSettingsTab] = React.useState<
    'global' | 'portal' | 'security' | 'notifications' | 'integrations'
  >('global');
  const getIconSvg = (name: string, size = 14) => {
    switch (name) {
      case 'document':
      case '📄':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
      case 'academic':
      case '🎓':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>;
      case 'financial':
      case '🏦':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="2" y="10" width="20" height="12" rx="2"/><path d="M12 22V10M12 6V2M6 10V6M18 10V6M12 6H6M12 6h6"/></svg>;
      case 'hr':
      case '👥':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
      case 'operations':
      case '⚙️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
      case 'compliance':
      case '🛡️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
      case 'custom':
      case '📁':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
      case 'chart':
      case '📊':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
      case 'currency':
      case '₹':
        return <span style={{ fontFamily: 'Inter, sans-serif', fontSize: size, fontWeight: 700, display: 'inline-block', verticalAlign: 'middle' }}>₹</span>;
      case '✓':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="20 6 9 17 4 12"/></svg>;
      case '📅':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
      case '📥':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
      case '📢':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
      case '💳':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
      case 'user':
      case '👤':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
      case 'crown':
      case '👑':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/></svg>;
      case 'disk':
      case '💿':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>;
      case 'users':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
      case 'support':
      case '🎧':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
      case '🔍':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
      case '🔄':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
      case '💵':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
      case '📖':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
      case '🚚':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
      case '🏢':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><line x1="9" y1="16" x2="15" y2="16"/><path d="M8 6h2v2H8V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6zM8 10h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>;
      case '🌐':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
      case 'monitor':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
      case 'shield':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
      case 'bell':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
      case 'plug':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 22v-5M9 8V3M15 8V3M18 8H6A4 4 0 0 0 10 12h4a4 4 0 0 0 4-4z"/></svg>;
      case 'cog':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
      case 'save':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;
      case 'translate':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M5 8h10M4 14h6M9 5v14M16 19l4-4-4-4"/></svg>;
      default:
        return null;
    }
  };

  const renderDocumentsLayout = () => {
    return (
      <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                Organization Documents
              </h1>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Manage official documents, policies, certificates and configuration files in one secure place.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => alert('Upload Document Clicked')}
            style={{
              background: '#2563eb', border: 'none', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            Upload Document
          </button>
        </div>

        {/* KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: 4 }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>TOTAL DOCUMENTS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>24</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>Across 6 categories</div>
            </div>
          </div>
          {/* Card 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>TOTAL SIZE</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>48.7 MB</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>Storage used</div>
            </div>
          </div>
          {/* Card 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>LAST UPDATED</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>2 days ago</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>Tax Documents</div>
            </div>
          </div>
          {/* Card 4 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>ACCESS ROLES</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>5</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>Defined roles</div>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', gap: 10, marginTop: 4 }}>
          <button style={{ padding: '10px 18px', border: 'none', borderBottom: '2px solid #2563eb', background: 'transparent', color: '#2563eb', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Trust Documents
          </button>
          <button onClick={() => alert('Categories Settings')} style={{ padding: '10px 18px', border: 'none', borderBottom: '2px solid transparent', background: 'transparent', color: '#6b7280', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> Categories
          </button>
          <button onClick={() => alert('Access Management Settings')} style={{ padding: '10px 18px', border: 'none', borderBottom: '2px solid transparent', background: 'transparent', color: '#6b7280', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg> Access Management
          </button>
          <button onClick={() => alert('Document Global Settings')} style={{ padding: '10px 18px', border: 'none', borderBottom: '2px solid transparent', background: 'transparent', color: '#6b7280', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> Document Settings
          </button>
        </div>


        {/* Main Grid List */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box', marginTop: 4
        }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Organization Trust Documents
              </h2>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: 2, margin: 0 }}>Official certificates, approvals, and legal documents.</p>
            </div>

            {/* Filters Controls */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search documents..."
                style={{
                  padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '6px',
                  fontSize: '13px', outline: 'none', width: '150px', fontFamily: 'Inter, sans-serif'
                }}
              />
              <div style={{
                background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
                padding: '6px 10px', fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
              }}>
                <span>All Categories</span>
                <span>▼</span>
              </div>
              <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                <button style={{ padding: '6px 8px', border: 'none', background: '#eff6ff', color: '#2563eb', cursor: 'pointer', fontSize: '13px' }}>田</button>
                <button style={{ padding: '6px 8px', border: 'none', background: '#ffffff', color: '#6b7280', cursor: 'pointer', fontSize: '13px', borderLeft: '1px solid #e5e7eb' }}>☰</button>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: 4 }}>
            {[
              {
                title: 'Organization Affiliation Certificate',
                category: 'Affiliations',
                size: '2.4 MB',
                date: 'Jul 14, 2026',
                author: 'Organization Admin',
                iconBg: '#f3e8ff',
                iconColor: '#7c3aed'
              },
              {
                title: 'Government Education Board Approval',
                category: 'Government Approvals',
                size: '4.8 MB',
                date: 'Jul 10, 2026',
                author: 'Organization Admin',
                iconBg: '#dcfce7',
                iconColor: '#16a34a'
              },
              {
                title: 'Consolidated Tax & PAN Filing',
                category: 'Tax Documents',
                size: '1.2 MB',
                date: 'Jul 08, 2026',
                author: 'Organization Admin',
                iconBg: '#fffbeb',
                iconColor: '#f59e0b'
              },
              {
                title: 'Group Education Safety Policy',
                category: 'Policies',
                size: '840 KB',
                date: 'Jul 05, 2026',
                author: 'Organization Admin',
                iconBg: '#eff6ff',
                iconColor: '#2563eb'
              }
            ].map((doc, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px',
                  display: 'flex', flexDirection: 'column', gap: 14, background: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px', background: doc.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: doc.iconColor, flexShrink: 0
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <span style={{ color: '#9ca3af', cursor: 'pointer', fontWeight: 700 }}>•••</span>
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1f2937', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={doc.title}>
                    {doc.title}
                  </h4>
                  <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: 4, fontWeight: 500 }}>
                    {doc.category} <span style={{ color: '#d1d5db', margin: '0 4px' }}>•</span> {doc.size}
                  </div>
                </div>

                <div style={{ fontSize: '9px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: 10, fontWeight: 500 }}>
                  <div>Updated: {doc.date}</div>
                  <div style={{ marginTop: 2 }}>By: {doc.author}</div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => alert(`Downloading ${doc.title}`)}
                    style={{
                      flex: 1, padding: '8px 0', border: '1px solid #e5e7eb', borderRadius: '6px',
                      background: '#ffffff', color: '#4b5563', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    Download
                  </button>
                  <button
                    onClick={() => alert(`Viewing ${doc.title}`)}
                    style={{
                      flex: 1, padding: '8px 0', border: 'none', borderRadius: '6px',
                      background: '#2563eb', color: '#ffffff', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 12, paddingTop: 14, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 700, cursor: 'pointer' }}>
              View All Documents →
            </span>
          </div>
        </div>

        {/* Security Banner Card */}
        <div style={{
          background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px',
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontSize: '14px', flexShrink: 0
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.3 }}>
              <span style={{ fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>Your documents are securely stored and encrypted</span>
              <span style={{ color: '#6b7280' }}>Access is role-based and activity is monitored for security.</span>
            </div>
          </div>
          <button
            onClick={() => alert('Opening Access Logs')}
            style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
              padding: '6px 12px', fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
            }}
          >
            View Access Logs
          </button>
        </div>
      </div>
    );

  };

  const renderReportsLayout = () => {
    return (
      <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '8px', background: '#f5f3ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                Organization Reports
              </h1>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Access consolidated insights and export comprehensive reports across the organization.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => alert('Create Custom Report Clicked')}
            style={{
              background: '#2563eb', border: 'none', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Custom Report
          </button>
        </div>

        {/* KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: 4 }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
              {getIconSvg('📄', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>TOTAL REPORTS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>24</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>Across 6 categories</div>
            </div>
          </div>
          {/* Card 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
              {getIconSvg('✓', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>REPORTS GENERATED</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>128</div>
              <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 600, marginTop: 2 }}>↑ 18% <span style={{ color: '#9ca3af', fontWeight: 500 }}>vs last month</span></div>
            </div>
          </div>
          {/* Card 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
              {getIconSvg('📅', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>LAST GENERATED</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>2 days ago</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>Organization Summary 2026</div>
            </div>
          </div>
          {/* Card 4 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0 }}>
              {getIconSvg('📥', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>TOTAL DOWNLOADS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>312</div>
              <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 600, marginTop: 2 }}>↑ 24% <span style={{ color: '#9ca3af', fontWeight: 500 }}>vs last month</span></div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>田 All Categories</span>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
            </div>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>📅 Jul 1 - Jul 15, 2026</span>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search reports by name..."
              style={{
                padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px',
                fontSize: '13px', outline: 'none', width: '220px', fontFamily: 'Inter, sans-serif'
              }}
            />
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>Latest First</span>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
            </div>
            <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <button style={{ padding: '10px 12px', border: 'none', background: '#ffffff', color: '#6b7280', cursor: 'pointer', fontSize: '13px' }}>田</button>
              <button style={{ padding: '10px 12px', border: 'none', background: '#eff6ff', color: '#2563eb', cursor: 'pointer', fontSize: '13px', borderLeft: '1px solid #e5e7eb' }}>☰</button>
            </div>
          </div>
        </div>

        {/* 2-Columns grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'start', marginTop: 4 }}>
          {/* Left Column: Categories */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
            padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Report Categories
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { name: 'All Reports', count: 24, active: true, icon: '📄' },
                { name: 'Academic', count: 6, active: false, icon: '🎓' },
                { name: 'Financial', count: 7, active: false, icon: '🏦' },
                { name: 'HR & Workforce', count: 4, active: false, icon: '👥' },
                { name: 'Operations', count: 4, active: false, icon: '⚙️' },
                { name: 'Compliance', count: 2, active: false, icon: '🛡️' },
                { name: 'Custom Reports', count: 1, active: false, icon: '📁' }
              ].map((cat, idx) => (
                <button
                  key={idx}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px',
                    border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                    background: cat.active ? '#eff6ff' : 'transparent',
                    color: cat.active ? '#2563eb' : '#4b5563',
                    fontWeight: cat.active ? 700 : 500, fontSize: '12px', fontFamily: 'Inter, sans-serif'
                  }}
                  onClick={() => alert(`Selected category: ${cat.name}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {getIconSvg(cat.icon, 14)}
                    <span>{cat.name}</span>
                  </div>
                  <span style={{
                    background: cat.active ? '#dbeafe' : '#f3f4f6',
                    color: cat.active ? '#2563eb' : '#6b7280',
                    padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700
                  }}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => alert('Manage Categories Clicked')}
              style={{
                background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                padding: '10px', fontSize: '12px', fontWeight: 600, color: '#4b5563', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%'
              }}
            >
              {getIconSvg('⚙️', 14)} Manage Categories
            </button>
          </div>

          {/* Right Column: Consolidated Reports */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
            padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Consolidated Reports
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  title: 'Organization General Summary 2026',
                  desc: 'Overall performance summary across all branches and departments.',
                  date: 'Jul 14, 2026',
                  type: 'PDF',
                  size: '2.4 MB',
                  iconBg: '#f5f3ff',
                  iconColor: '#8b5cf6',
                  icon: '📄'
                },
                {
                  title: 'Consolidated Academic Progression Index Q1',
                  desc: 'Academic performance and progression insights for Q1.',
                  date: 'Jul 14, 2026',
                  type: 'Excel',
                  size: '1.8 MB',
                  iconBg: '#dcfce7',
                  iconColor: '#16a34a',
                  icon: '📊'
                },
                {
                  title: 'Multi-Branch Revenue & Fee Collections Log',
                  desc: 'Revenue collected, outstanding fees and branch-wise breakdown.',
                  date: 'Jul 14, 2026',
                  type: 'Excel',
                  size: '3.6 MB',
                  iconBg: '#fffbeb',
                  iconColor: '#f59e0b',
                  icon: '₹'
                },
                {
                  title: 'Total Workforce Attendance & Payroll Summary',
                  desc: 'Attendance overview and payroll summary across all branches.',
                  date: 'Jul 14, 2026',
                  type: 'PDF',
                  size: '1.2 MB',
                  iconBg: '#eff6ff',
                  iconColor: '#2563eb',
                  icon: '👥'
                }
              ].map((rep, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: 1, minWidth: '240px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px', background: rep.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: rep.iconColor, flexShrink: 0
                    }}>
                      {getIconSvg(rep.icon, 18)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1f2937', margin: 0 }}>{rep.title}</h4>
                      <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: 4, margin: 0 }}>{rep.desc}</p>
                      <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: 6, fontWeight: 500 }}>
                        Generated: {rep.date} <span style={{ color: '#d1d5db', margin: '0 4px' }}>•</span> Status: <span style={{ color: '#16a34a', fontWeight: 600 }}>Ready</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      background: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '6px',
                      fontWeight: 700, fontSize: '10px'
                    }}>
                      {rep.type}
                    </span>
                    <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 500 }}>{rep.size}</span>
                    <button
                      onClick={() => alert(`Exporting ${rep.title} in ${rep.type} format`)}
                      style={{
                        background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                        padding: '8px 14px', fontSize: '13px', fontWeight: 700, color: '#4b5563', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6
                      }}
                    >
                      {getIconSvg('📥', 12)} Export
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontWeight: 700 }}>
                      •••
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Banner Card */}
        <div style={{
          background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px',
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: '#f5f3ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0
            }}>
              {getIconSvg('🛡️', 16)}
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.3 }}>
              <span style={{ fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>Secure. Compliant. Trusted.</span>
              <span style={{ color: '#6b7280' }}>All reports are generated in real-time from verified data and can be exported securely.</span>
            </div>
          </div>
          <button
            onClick={() => alert('Redirecting to Audit Logs')}
            style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
              padding: '6px 12px', fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
            }}
          >
            View Audit Logs &gt;
          </button>
        </div>
      </div>
    );
  };


  const renderAuditLogsLayout = () => {
    return (
      <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '8px', background: '#f5f3ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                Organization Audit Logs
              </h1>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Track and review all important activities and changes across the system.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => alert('Audit Log Settings Clicked')}
              style={{
                background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {getIconSvg('⚙️', 13)} Audit Log Settings
            </button>
            <button
              onClick={() => alert('Export Logs Clicked')}
              style={{
                background: '#2563eb', border: 'none', borderRadius: '8px',
                padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {getIconSvg('📥', 13)} Export Logs
            </button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: 4 }}>
          {/* Card 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0 }}>
              {getIconSvg('📄', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>TOTAL ACTIVITIES</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>1,248</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>All time</div>
            </div>
          </div>
          {/* Card 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
              {getIconSvg('📅', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>TODAY</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>28</div>
              <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 600, marginTop: 2 }}>↑ 12% <span style={{ color: '#9ca3af', fontWeight: 500 }}>from yesterday</span></div>
            </div>
          </div>
          {/* Card 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
              {getIconSvg('👤', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>UNIQUE USERS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>18</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>All time</div>
            </div>
          </div>
          {/* Card 4 */}
          <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
              {getIconSvg('🔍', 18)}
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>FILTERED RESULTS</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>248</div>
              <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500, marginTop: 2 }}>Current view</div>
            </div>
          </div>
        </div>

        {/* Filters Toolbar row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>All Actions</span>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
            </div>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>All Users</span>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
            </div>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>All Modules</span>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
            </div>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>📅 Jul 01, 2026 - Jul 15, 2026</span>
              <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search logs..."
              style={{
                padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px',
                fontSize: '13px', outline: 'none', width: '180px', fontFamily: 'Inter, sans-serif'
              }}
            />
            <button style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
            }}>
              {getIconSvg('🔍', 13)} Filters
            </button>
            <button style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '10px 12px', display: 'flex', alignItems: 'center', color: '#4b5563', cursor: 'pointer'
            }}>
              {getIconSvg('🔄', 13)}
            </button>
          </div>
        </div>

        {/* Full-width table */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          overflowX: 'auto', boxSizing: 'border-box', marginTop: 4
        }}>
          {/* Header Row */}
          <div style={{
            background: '#1e293b', padding: '14px 20px', display: 'grid',
            gridTemplateColumns: '240px 1fr 220px 160px 160px 120px 40px', gap: 16, alignItems: 'center',
            minWidth: 980
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTIVITY ▼</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DETAILS</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PERFORMED BY</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MODULE</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DATE & TIME ▼</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>IP ADDRESS</div>
            <div></div>
          </div>

          {/* Table Rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              {
                icon: '⚙️',
                iconBg: '#f5f3ff',
                iconColor: '#8b5cf6',
                activity: 'Branding Updated',
                desc: 'Changed primary theme hex to #4F8EF7',
                detailKey: 'Primary Color:',
                detailVal: '#4F8EF7',
                detailValColor: '#2563eb',
                detailValBg: '#eff6ff',
                performer: 'Vikram Singhania',
                role: 'Organization Admin',
                avatar: 'VS',
                module: 'Branding',
                modBg: '#f5f3ff',
                modColor: '#8b5cf6',
                date: 'Jul 15, 2026',
                time: '10:30 AM',
                ip: '103.21.45.67'
              },
              {
                icon: '📢',
                iconBg: '#ecfdf5',
                iconColor: '#10b981',
                activity: 'Announcement Published',
                desc: 'Sent "Uniform Syllabus" to all branches',
                detailKey: 'Target:',
                detailVal: 'All Branches',
                detailValColor: '#10b981',
                detailValBg: '#ecfdf5',
                performer: 'Vikram Singhania',
                role: 'Organization Admin',
                avatar: 'VS',
                module: 'Announcements',
                modBg: '#ecfdf5',
                modColor: '#10b981',
                date: 'Jul 15, 2026',
                time: '09:45 AM',
                ip: '103.21.45.67'
              },
              {
                icon: '🏦',
                iconBg: '#fffbeb',
                iconColor: '#f59e0b',
                activity: 'Branch Created',
                desc: 'Successfully initialized Yelahanka Branch',
                detailKey: 'Branch Code:',
                detailVal: 'YEL001',
                detailValColor: '#f59e0b',
                detailValBg: '#fffbeb',
                performer: 'Sunita Desai',
                role: 'Vice Principal',
                avatar: 'SA',
                module: 'Branches',
                modBg: '#fffbeb',
                modColor: '#f59e0b',
                date: 'Jul 14, 2026',
                time: '04:20 PM',
                ip: '203.78.12.90'
              },
              {
                icon: '💳',
                iconBg: '#eff6ff',
                iconColor: '#2563eb',
                activity: 'Subscription Renewed',
                desc: 'Enterprise Plan renewed for 12 months',
                detailKey: 'Plan:',
                detailVal: 'Enterprise',
                detailValColor: '#2563eb',
                detailValBg: '#eff6ff',
                performer: 'Accounts Auto',
                role: 'System',
                avatar: 'AA',
                module: 'Subscription',
                modBg: '#eff6ff',
                modColor: '#2563eb',
                date: 'Jul 14, 2026',
                time: '12:15 PM',
                ip: 'System'
              },
              {
                icon: '👤',
                iconBg: '#f5f3ff',
                iconColor: '#8b5cf6',
                activity: 'User Role Updated',
                desc: 'Changed role of Nisha Rao to Principal',
                detailKey: 'Old Role: Teacher / New Role:',
                detailVal: 'Principal',
                detailValColor: '#8b5cf6',
                detailValBg: '#f5f3ff',
                performer: 'Vikram Singhania',
                role: 'Organization Admin',
                avatar: 'VS',
                module: 'Users',
                modBg: '#f5f3ff',
                modColor: '#8b5cf6',
                date: 'Jul 14, 2026',
                time: '11:05 AM',
                ip: '103.21.45.67'
              }
            ].map((row, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 20px', display: 'grid',
                  gridTemplateColumns: '240px 1fr 220px 160px 160px 120px 40px', gap: 16, alignItems: 'center',
                  borderBottom: idx === 4 ? 'none' : '1px solid #f1f5f9', background: '#ffffff',
                  minWidth: 980
                }}
              >
                {/* Activity column */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', background: row.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: row.iconColor, flexShrink: 0
                  }}>
                    {getIconSvg(row.icon, 14)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#1e293b' }}>{row.activity}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.desc}</div>
                  </div>
                </div>

                {/* Details column */}
                <div style={{ fontSize: '11.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>{row.detailKey}</span>
                  <span style={{
                    background: row.detailValBg, color: row.detailValColor, padding: '2px 8px',
                    borderRadius: '4px', fontWeight: 700, fontSize: '10.5px'
                  }}>
                    {row.detailVal}
                  </span>
                </div>

                {/* Performed By column */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', background: '#bfdbfe', color: '#2563eb',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0
                  }}>
                    {row.avatar}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{row.performer}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: 2 }}>{row.role}</div>
                  </div>
                </div>

                {/* Module column */}
                <div>
                  <span style={{
                    background: row.modBg, color: row.modColor, padding: '3px 10px',
                    borderRadius: '12px', fontWeight: 700, fontSize: '10.5px'
                  }}>
                    {row.module}
                  </span>
                </div>

                {/* Date & Time column */}
                <div style={{ fontSize: '11.5px', color: '#334155' }}>
                  <div style={{ fontWeight: 600 }}>{row.date}</div>
                  <div style={{ color: '#64748b', marginTop: 2, fontSize: '10px' }}>{row.time}</div>
                </div>

                {/* IP Address column */}
                <div style={{ fontSize: '11.5px', color: '#475569', fontFamily: 'monospace' }}>
                  {row.ip}
                </div>

                {/* Actions column */}
                <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 700, justifySelf: 'end' }}>
                  •••
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer pagination */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 4
        }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Showing 1 to 5 of 248 results</span>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&lt;</button>
              <button style={{ width: '32px', height: '32px', border: '1px solid #2563eb', background: '#eff6ff', borderRadius: '6px', color: '#2563eb', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</button>
              <button style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</button>
              <button style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</button>
              <button style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</button>
              <button style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</button>
              <span style={{ padding: '0 4px', color: '#94a3b8', alignSelf: 'center' }}>...</span>
              <button style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>50</button>
              <button style={{ width: '32px', height: '32px', border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&gt;</button>
            </div>

            <div style={{
              background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px',
              padding: '6px 12px', fontSize: '12px', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span>10 / page</span>
              <span style={{ fontSize: '9px', color: '#94a3b8' }}>▼</span>
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderSubscriptionLayout = () => {
    return (
      <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                Organization Subscription
              </h1>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Manage your subscription, billing information and plan usage.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => alert('Download Invoices Clicked')}
              style={{
                background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {getIconSvg('📄', 13)} Download Invoices
            </button>
            <button
              onClick={() => alert('Manage Plan Clicked')}
              style={{
                background: '#2563eb', border: 'none', borderRadius: '8px',
                padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer'
              }}
            >
              {getIconSvg('👑', 13)} Manage Plan
            </button>
          </div>
        </div>

        {/* Section 1: Billing & Plan Details */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box'
        }}>
          {/* Section Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: '4px', height: '16px', background: '#2563eb', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Billing & Plan Details
            </h2>
          </div>

          {/* KPI Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: 20 }}>
            {/* Card 1 */}
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0 }}>
                {getIconSvg('👑', 18)}
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 700 }}>CURRENT PLAN</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#8b5cf6', marginTop: 2 }}>Enterprise Platinum</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: '9px', color: '#16a34a', background: '#f0fdf4', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>{getIconSvg('✓', 8)} Active</span>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500 }}>Since Jul 05, 2025</span>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                {getIconSvg('💿', 18)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 700 }}>STORAGE ALLOCATED</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>324 GB <span style={{ color: '#9ca3af', fontWeight: 500 }}>/ 500 GB</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                  <div style={{ flex: 1, height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '64.8%', height: '100%', background: '#2563eb' }}></div>
                  </div>
                  <span style={{ fontSize: '9px', color: '#2563eb', fontWeight: 700 }}>64.8%</span>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                {getIconSvg('👥', 18)}
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 700 }}>USER LIMIT</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>2,847</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500 }}>Active Users</span>
                  <span style={{ fontSize: '9px', color: '#10b981', border: '1px solid #a7f3d0', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>∞ Unlimited License</span>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxSizing: 'border-box' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
                {getIconSvg('📅', 18)}
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 700 }}>NEXT RENEWAL</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>July 05, 2027</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 500 }}>In 713 days</span>
                  <span style={{ fontSize: '9px', color: '#f59e0b', border: '1px solid #fde68a', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>{getIconSvg('🔄', 8)} Auto-renewal enabled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enabled Modules */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4b5563' }}>
              {getIconSvg('⚙️', 12)}
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>Enabled Modules</span>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { name: 'Student ERP', icon: '👥' },
                { name: 'Finance & Fees', icon: '💵' },
                { name: 'HR & Payroll', icon: '👤' },
                { name: 'Smart Library', icon: '📖' },
                { name: 'Live Transport Tracker', icon: '🚚' },
                { name: 'Hostel/ Mess Control', icon: '🏢' },
                { name: 'AI Intelligent Insights', icon: '🌐' }
              ].map((mod, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                    borderRadius: '8px', border: '1px solid #e5e7eb', background: '#eff6ff',
                    fontSize: '13px', fontWeight: 600, color: '#1e40af'
                  }}
                >
                  {getIconSvg(mod.icon, 12)}
                  <span>{mod.name}</span>
                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>{getIconSvg('✓', 10)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Payment History */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box'
        }}>
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: '4px', height: '16px', background: '#2563eb', borderRadius: '2px' }}></div>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                Payment History
              </h2>
            </div>

            {/* Filters */}
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
              padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '12px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
            }}>
              <span>{getIconSvg('📅', 12)} All Transactions</span>
              <span style={{ fontSize: '9px', color: '#9ca3af' }}>▼</span>
            </div>
          </div>

          {/* History Table */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
              background: '#f8fafc', padding: '12px 20px', display: 'grid',
              gridTemplateColumns: '180px 220px 140px 100px 160px 1fr', gap: 16, borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>INVOICE ID</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>BILLING PERIOD</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>AMOUNT</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>STATUS</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>PAYMENT DATE</div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', justifySelf: 'end' }}>ACTIONS</div>
            </div>

            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  id: 'INV-ORG-001',
                  plan: 'Enterprise Platinum Plan',
                  period: 'Jul 05, 2026 – Jul 05, 2027',
                  duration: '12 Months',
                  amount: '₹14,50,000',
                  sub: '+ GST',
                  status: 'Paid',
                  date: 'Jul 05, 2026',
                  time: '10:24 AM',
                  iconColor: '#8b5cf6',
                  iconBg: '#f5f3ff'
                },
                {
                  id: 'INV-ORG-000',
                  plan: 'Enterprise Platinum Plan',
                  period: 'Jul 05, 2025 – Jul 05, 2026',
                  duration: '12 Months',
                  amount: '₹12,80,000',
                  sub: '+ GST',
                  status: 'Paid',
                  date: 'Jul 05, 2025',
                  time: '09:18 AM',
                  iconColor: '#f59e0b',
                  iconBg: '#fffbeb'
                }
              ].map((row, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '16px 20px', display: 'grid',
                    gridTemplateColumns: '180px 220px 140px 100px 160px 1fr', gap: 16, alignItems: 'center',
                    borderBottom: idx === 1 ? 'none' : '1px solid #e5e7eb', background: '#ffffff'
                  }}
                >
                  {/* Invoice ID */}
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', background: row.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: row.iconColor, flexShrink: 0
                    }}>
                      {getIconSvg('📄', 14)}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#1e293b' }}>{row.id}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', marginTop: 2 }}>{row.plan}</div>
                    </div>
                  </div>

                  {/* Billing Period */}
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{row.period}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: 2 }}>{row.duration}</div>
                  </div>

                  {/* Amount */}
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#1e293b' }}>{row.amount}</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: 2 }}>{row.sub}</div>
                  </div>

                  {/* Status */}
                  <div>
                    <span style={{
                      background: '#f0fdf4', color: '#16a34a', padding: '3px 8px',
                      borderRadius: '6px', fontWeight: 700, fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: 4
                    }}>
                      {getIconSvg('✓', 10)} {row.status}
                    </span>
                  </div>

                  {/* Payment Date */}
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{row.date}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: 2 }}>{row.time}</div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, justifySelf: 'end', alignItems: 'center' }}>
                    <button
                      onClick={() => alert(`Downloading Invoice: ${row.id}`)}
                      style={{
                        background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
                        padding: '6px 12px', fontSize: '13px', color: '#4b5563', fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 4
                      }}
                    >
                      {getIconSvg('📥', 12)} Invoice
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: 700 }}>
                      •••
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{
          background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px',
          padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: '#dbeafe',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
            }}>
              {getIconSvg('🛡️', 16)}
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.3 }}>
              <span style={{ fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>Your subscription is active and in good standing.</span>
              <span style={{ color: '#6b7280' }}>Need help? Contact our support team anytime.</span>
            </div>
          </div>
          <button
            onClick={() => alert('Redirecting to Support Portal')}
            style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
              padding: '6px 12px', fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6
            }}
          >
            {getIconSvg('🎧', 12)} Contact Support
          </button>
        </div>
      </div>
    );
  };


  const renderSettingsLayout = () => {
    const renderActiveSettingsTabContent = () => {
      switch (activeSettingsTab) {
        case 'global':
          return (
            <div style={{
              background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px',
              padding: '32px', display: 'flex', flexDirection: 'column', gap: 28, boxShadow: 'var(--shadow-sm)'
            }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  Organization Global Parameters
                </h2>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  Set the default values and global preferences that will be applied across the entire platform.
                </p>
              </div>

              {/* Grid wrapper */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
                {/* Item 1: Default Portal Language */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                      {getIconSvg('translate', 15)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Default Portal Language</div>
                      <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: 1 }}>Select the default language for the organization portal.</div>
                    </div>
                  </div>
                  <select className="form-select" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} defaultValue="English (US)">
                    <option>English (US)</option>
                    <option>Hindi (India)</option>
                    <option>Spanish (ES)</option>
                    <option>French (FR)</option>
                  </select>
                </div>

                {/* Item 2: Currency Display */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                      {getIconSvg('💵', 15)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Currency Display</div>
                      <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: 1 }}>Choose the currency format to be used across the platform.</div>
                    </div>
                  </div>
                  <select className="form-select" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} defaultValue="INR (₹)">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>

                {/* Item 3: Organization Timezone */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                      {getIconSvg('🔄', 15)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Organization Timezone</div>
                      <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: 1 }}>Set the default timezone for the organization.</div>
                    </div>
                  </div>
                  <select className="form-select" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} defaultValue="UTC+05:30 (Kolkata)">
                    <option>UTC+05:30 (Kolkata)</option>
                    <option>UTC+00:00 (London)</option>
                    <option>UTC-05:00 (New York)</option>
                    <option>UTC+08:00 (Singapore)</option>
                  </select>
                </div>

                {/* Item 4: Weekly Off Days */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', flexShrink: 0 }}>
                      {getIconSvg('📅', 15)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>Weekly Off Days</div>
                      <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: 1 }}>Select the default weekly off day for the organization.</div>
                    </div>
                  </div>
                  <select className="form-select" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }} defaultValue="Sunday">
                    <option>Sunday</option>
                    <option>Saturday</option>
                    <option>Saturday & Sunday</option>
                    <option>Friday</option>
                  </select>
                </div>
              </div>

              {/* Warning & Save Banner */}
              <div style={{
                background: '#f0f7ff', border: '1px solid #dbeafe', borderRadius: '12px',
                padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                    {getIconSvg('✓', 12)}
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>These settings will be applied globally.</span>
                    <span style={{ color: '#6b7280' }}>Changes may affect reports, schedules, notifications, and other modules.</span>
                  </div>
                </div>
                
                <button
                  onClick={() => alert('Settings changes saved successfully!')}
                  style={{
                    background: '#2563eb', border: 'none', borderRadius: '8px',
                    padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s'
                  }}
                >
                  {getIconSvg('save', 12)} Save Configuration
                </button>
              </div>
            </div>
          );
        case 'portal':
          return (
            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif' }}>Portal Preferences</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0 }}>Customize look and feel, branding colors, and navigation style of the workspace portal.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Theme Settings</label>
                  <select className="form-select" defaultValue="Auto (System Default)" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
                    <option>Auto (System Default)</option>
                    <option>Light Theme</option>
                    <option>Dark Theme</option>
                    <option>High Contrast</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Primary Brand Color</label>
                  <select className="form-select" defaultValue="Classic Blue (#2563eb)" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
                    <option>Classic Blue (#2563eb)</option>
                    <option>Emerald Green (#059669)</option>
                    <option>Royal Violet (#7c3aed)</option>
                    <option>Crimson Red (#dc2626)</option>
                  </select>
                </div>
              </div>
            </div>
          );
        case 'security':
          return (
            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif' }}>Security Parameters</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0 }}>Manage multi-factor authentication, session timeouts, and IP whitelisting rules.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Two-Factor Authentication (2FA)</label>
                  <select className="form-select" defaultValue="Enforced for Admins Only" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
                    <option>Enforced for Admins Only</option>
                    <option>Enforced for All Users</option>
                    <option>Optional</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Session Timeout Period</label>
                  <select className="form-select" defaultValue="30 minutes" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                  </select>
                </div>
              </div>
            </div>
          );
        case 'notifications':
          return (
            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif' }}>Notification Routing</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0 }}>Configure automated SMS, email triggers, and system push updates.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Default Digest Frequency</label>
                  <select className="form-select" defaultValue="Daily Summary" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
                    <option>Real-Time Alerts</option>
                    <option>Daily Summary</option>
                    <option>Weekly Digest</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Default System Alert Level</label>
                  <select className="form-select" defaultValue="Critical and Informational" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}>
                    <option>Critical Alerts Only</option>
                    <option>Critical and Informational</option>
                    <option>All logs</option>
                  </select>
                </div>
              </div>
            </div>
          );
        case 'integrations':
          return (
            <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: 24, boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif' }}>Third Party Integrations</h2>
                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0 }}>Link twilio, payment gateways, classroom portals, and chat APIs.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {[
                  { name: 'Stripe Gateway', connected: true },
                  { name: 'Twilio SMS service', connected: true },
                  { name: 'Zoom classroom API', connected: false }
                ].map((int, i) => (
                  <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937' }}>{int.name}</div>
                    <button style={{ border: 'none', background: int.connected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', color: int.connected ? 'var(--accent-danger)' : 'var(--accent-success)', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                      {int.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(79, 142, 247, 0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
          }}>
            {getIconSvg('cog', 24)}
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
              Organization Settings
            </h1>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Configure global preferences and parameters for your organization.
            </p>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div style={{
          background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: '12px',
          padding: '4px 16px', display: 'flex', gap: '32px', alignItems: 'center', marginTop: '8px',
          overflowX: 'auto', whiteSpace: 'nowrap'
        }}>
          <button
            onClick={() => setActiveSettingsTab('global')}
            style={{
              background: 'none', border: 'none', padding: '14px 4px', fontSize: '13px',
              fontWeight: activeSettingsTab === 'global' ? 700 : 500,
              color: activeSettingsTab === 'global' ? '#2563eb' : '#6b7280',
              borderBottom: activeSettingsTab === 'global' ? '2.5px solid #2563eb' : '2.5px solid transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', outline: 'none'
            }}
          >
            {getIconSvg('🌐', 14)} Global Parameters
          </button>
          <button
            onClick={() => setActiveSettingsTab('portal')}
            style={{
              background: 'none', border: 'none', padding: '14px 4px', fontSize: '13px',
              fontWeight: activeSettingsTab === 'portal' ? 700 : 500,
              color: activeSettingsTab === 'portal' ? '#2563eb' : '#6b7280',
              borderBottom: activeSettingsTab === 'portal' ? '2.5px solid #2563eb' : '2.5px solid transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', outline: 'none'
            }}
          >
            {getIconSvg('monitor', 14)} Portal Preferences
          </button>
          <button
            onClick={() => setActiveSettingsTab('security')}
            style={{
              background: 'none', border: 'none', padding: '14px 4px', fontSize: '13px',
              fontWeight: activeSettingsTab === 'security' ? 700 : 500,
              color: activeSettingsTab === 'security' ? '#2563eb' : '#6b7280',
              borderBottom: activeSettingsTab === 'security' ? '2.5px solid #2563eb' : '2.5px solid transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', outline: 'none'
            }}
          >
            {getIconSvg('shield', 14)} Security Settings
          </button>
          <button
            onClick={() => setActiveSettingsTab('notifications')}
            style={{
              background: 'none', border: 'none', padding: '14px 4px', fontSize: '13px',
              fontWeight: activeSettingsTab === 'notifications' ? 700 : 500,
              color: activeSettingsTab === 'notifications' ? '#2563eb' : '#6b7280',
              borderBottom: activeSettingsTab === 'notifications' ? '2.5px solid #2563eb' : '2.5px solid transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', outline: 'none'
            }}
          >
            {getIconSvg('bell', 14)} Notification Settings
          </button>
          <button
            onClick={() => setActiveSettingsTab('integrations')}
            style={{
              background: 'none', border: 'none', padding: '14px 4px', fontSize: '13px',
              fontWeight: activeSettingsTab === 'integrations' ? 700 : 500,
              color: activeSettingsTab === 'integrations' ? '#2563eb' : '#6b7280',
              borderBottom: activeSettingsTab === 'integrations' ? '2.5px solid #2563eb' : '2.5px solid transparent',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s', outline: 'none'
            }}
          >
            {getIconSvg('plug', 14)} Integrations
          </button>
        </div>

        {/* Dynamic Tab Content Area */}
        <div style={{ marginTop: 8 }}>
          {renderActiveSettingsTabContent()}
        </div>
      </div>
    );
  };

  if (page === 'documents') {
    return renderDocumentsLayout();
  }
  if (page === 'reports') {
    return renderReportsLayout();
  }
  if (page === 'audit-logs') {
    return renderAuditLogsLayout();
  }
  if (page === 'subscription') {
    return renderSubscriptionLayout();
  }
  if (page === 'settings') {
    return renderSettingsLayout();
  }

  return null;
}
