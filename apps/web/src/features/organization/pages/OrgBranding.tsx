import React, { useState } from 'react';
import { orgMocks } from '../../../mock/organization/orgMocks';

export default function OrgBranding() {
  const getIconSvg = (name: string, size = 14) => {
    switch (name) {
      case 'settings':
      case '⚙️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
      case 'portal':
      case '🖥️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
      case 'email':
      case '✉️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
      case 'wrench':
      case '🔧':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
      case 'upload':
      case '📤':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>;
      case 'palette':
      case '🎨':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M12 8A1.5 1.5 0 1 0 12 5A1.5 1.5 0 1 0 12 8Z" fill="currentColor"/><circle cx="7.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="16.5" cy="10.5" r="1.5" fill="currentColor"/></svg>;
      case 'check':
      case '✓':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="20 6 9 17 4 12"/></svg>;
      case 'refresh':
      case '⟳':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
      case 'bell':
      case '🔔':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
      case 'megaphone':
      case '📢':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
      case 'edit':
      case '✏️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
      case 'user':
      case '👤':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
      case 'image':
      case '🖼️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
      case 'globe':
      case '🌐':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
      case 'lock':
      case '🔒':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
      case 'clock':
      case '🕒':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
      case 'wave':
      case '👋':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5m0-5V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8m0-7v-.5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v9M6 14v4a6 6 0 0 0 12 0v-4"/></svg>;
      default:
        return null;
    }
  };

  const [primaryColor, setPrimaryColor] = useState(orgMocks.branding.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(orgMocks.branding.secondaryColor);
  const [accentColor, setAccentColor] = useState(orgMocks.branding.accentColor);
  const [textColor, setTextColor] = useState('#1F2937');
  const [activeTab, setActiveTab] = useState<'branding' | 'portal' | 'email' | 'advanced'>('branding');

  const handleReset = () => {
    setPrimaryColor(orgMocks.branding.primaryColor);
    setSecondaryColor(orgMocks.branding.secondaryColor);
    setAccentColor(orgMocks.branding.accentColor);
    setTextColor('#1F2937');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Branding configurations updated successfully organization-wide.');
  };

  const getSubTabStyle = (active: boolean) => ({
    padding: '10px 18px',
    border: 'none',
    borderBottom: active ? '2px solid #2563eb' : '2px solid transparent',
    background: 'transparent',
    color: active ? '#2563eb' : '#6b7280',
    fontWeight: 600,
    fontSize: '13px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Header Icon */}
          <div style={{
            width: '40px', height: '40px', borderRadius: '8px', background: '#f5f3ff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
              <path d="M12 8A1.5 1.5 0 1 0 12 5A1.5 1.5 0 1 0 12 8Z" fill="currentColor" />
              <path d="M16 11A1.5 1.5 0 1 0 16 8A1.5 1.5 0 1 0 16 11Z" fill="currentColor" />
              <path d="M8 11A1.5 1.5 0 1 0 8 8A1.5 1.5 0 1 0 8 11Z" fill="currentColor" />
              <path d="M12 16A1.5 1.5 0 1 0 12 13A1.5 1.5 0 1 0 12 16Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
              Organization Profile
            </h1>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Customize your organization identity, portal appearance, and communication preferences.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => window.open('/portal-preview', '_blank')}
          style={{
            background: '#2563eb', border: 'none', borderRadius: '8px',
            padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Preview Portal
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', gap: 10, marginTop: 4 }}>
        <button onClick={() => setActiveTab('branding')} style={getSubTabStyle(activeTab === 'branding')}>
          {getIconSvg('⚙️')} Branding
        </button>
        <button onClick={() => setActiveTab('portal')} style={getSubTabStyle(activeTab === 'portal')}>
          {getIconSvg('🖥️')} Portal Settings
        </button>
        <button onClick={() => setActiveTab('email')} style={getSubTabStyle(activeTab === 'email')}>
          {getIconSvg('✉️')} Email & Notifications
        </button>
        <button onClick={() => setActiveTab('advanced')} style={getSubTabStyle(activeTab === 'advanced')}>
          {getIconSvg('🔧')} Advanced Settings
        </button>
      </div>

      {/* Main Form/Preview Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Brand Identity */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
            Brand Identity
          </h2>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Logo Settings */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#4b5563' }}>Organization Logo</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: 2, marginBottom: 12 }}>Recommended size: 512x512px (PNG, SVG)</div>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{
                  border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', background: '#f9fafb',
                  display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: '180px'
                }}>
                  {/* EduTrack Logo Icon Mock */}
                  <div style={{
                    width: '36px', height: '36px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#2563eb"/>
                      <path d="M6 6H18V9H9V11H17V14H9V15H18V18H6V6Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Current Logo
                      <span style={{ color: '#10b981', fontSize: '10px' }}>✓</span>
                    </div>
                    <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: 1 }}>org-logo.svg</div>
                  </div>
                </div>

                {/* Upload Button */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" style={{
                    background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                    padding: '8px 12px', fontSize: '13px', fontWeight: 600, color: '#4b5563', cursor: 'pointer'
                  }} onClick={() => alert('Change Logo triggered')}>
                    Change Logo
                  </button>
                  <button type="button" style={{
                    background: '#ffffff', border: '1px solid #fee2e2', borderRadius: '8px',
                    padding: '8px 12px', fontSize: '13px', fontWeight: 600, color: '#ef4444', cursor: 'pointer'
                  }} onClick={() => alert('Remove Logo')}>
                    Remove
                  </button>
                </div>

                {/* Upload area */}
                <div style={{
                  border: '1px dashed #d1d5db', borderRadius: '8px', padding: '10px 16px', textAlign: 'center',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '110px'
                }} onClick={() => alert('Upload File Dialog')}>
                  <span style={{ color: '#6b7280' }}>{getIconSvg('📤', 16)}</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#4b5563', marginTop: 4 }}>Upload new</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af', marginTop: 1 }}>PNG, SVG</span>
                </div>
              </div>
            </div>

            {/* Favicon Settings */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#4b5563' }}>Favicon Icon</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: 2, marginBottom: 12 }}>Recommended size: 32x32px (PNG, ICO)</div>
              
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{
                  border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', background: '#f9fafb',
                  display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: '180px'
                }}>
                  <div style={{
                    width: '36px', height: '36px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#2563eb"/>
                      <path d="M6 6H18V9H9V11H17V14H9V15H18V18H6V6Z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: 4 }}>
                      favicon.ico
                      <span style={{ color: '#10b981', fontSize: '10px' }}>✓</span>
                    </div>
                  </div>
                </div>

                {/* Upload Button */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" style={{
                    background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                    padding: '8px 12px', fontSize: '13px', fontWeight: 600, color: '#4b5563', cursor: 'pointer'
                  }} onClick={() => alert('Change Favicon triggered')}>
                    Change Icon
                  </button>
                  <button type="button" style={{
                    background: '#ffffff', border: '1px solid #fee2e2', borderRadius: '8px',
                    padding: '8px 12px', fontSize: '13px', fontWeight: 600, color: '#ef4444', cursor: 'pointer'
                  }} onClick={() => alert('Remove Favicon')}>
                    Remove
                  </button>
                </div>

                {/* Upload area */}
                <div style={{
                  border: '1px dashed #d1d5db', borderRadius: '8px', padding: '10px 16px', textAlign: 'center',
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '110px'
                }} onClick={() => alert('Upload Favicon')}>
                  <span style={{ color: '#6b7280' }}>{getIconSvg('📤', 16)}</span>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#4b5563', marginTop: 4 }}>Upload new</span>
                  <span style={{ fontSize: '8px', color: '#9ca3af', marginTop: 1 }}>ICO, PNG</span>
                </div>
              </div>
            </div>

            {/* Colors selection grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>
                  Primary Color
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 10px', background: '#ffffff', gap: 8 }}>
                  <span style={{ width: 14, height: 14, borderRadius: '4px', background: primaryColor, border: '1px solid #e5e7eb', display: 'inline-block' }} />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '50px', fontSize: '13px', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace', textTransform: 'uppercase' }}
                  />
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    style={{ border: 'none', width: 0, height: 0, padding: 0, opacity: 0, cursor: 'pointer' }}
                    id="primaryColorInput"
                  />
                  <label htmlFor="primaryColorInput" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{getIconSvg('🎨', 12)}</label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>
                  Secondary Color
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 10px', background: '#ffffff', gap: 8 }}>
                  <span style={{ width: 14, height: 14, borderRadius: '4px', background: secondaryColor, border: '1px solid #e5e7eb', display: 'inline-block' }} />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '50px', fontSize: '13px', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace', textTransform: 'uppercase' }}
                  />
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    style={{ border: 'none', width: 0, height: 0, padding: 0, opacity: 0, cursor: 'pointer' }}
                    id="secondaryColorInput"
                  />
                  <label htmlFor="secondaryColorInput" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{getIconSvg('🎨', 12)}</label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>
                  Accent Color
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 10px', background: '#ffffff', gap: 8 }}>
                  <span style={{ width: 14, height: 14, borderRadius: '4px', background: accentColor, border: '1px solid #e5e7eb', display: 'inline-block' }} />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '50px', fontSize: '13px', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace', textTransform: 'uppercase' }}
                  />
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    style={{ border: 'none', width: 0, height: 0, padding: 0, opacity: 0, cursor: 'pointer' }}
                    id="accentColorInput"
                  />
                  <label htmlFor="accentColorInput" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{getIconSvg('🎨', 12)}</label>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#4b5563', marginBottom: 6 }}>
                  Text Color
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 10px', background: '#ffffff', gap: 8 }}>
                  <span style={{ width: 14, height: 14, borderRadius: '4px', background: textColor, border: '1px solid #e5e7eb', display: 'inline-block' }} />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ border: 'none', outline: 'none', width: '50px', fontSize: '13px', fontWeight: 600, color: '#1f2937', fontFamily: 'monospace', textTransform: 'uppercase' }}
                  />
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ border: 'none', width: 0, height: 0, padding: 0, opacity: 0, cursor: 'pointer' }}
                    id="textColorInput"
                  />
                  <label htmlFor="textColorInput" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{getIconSvg('🎨', 12)}</label>
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button
                type="submit"
                style={{
                  background: '#2563eb', border: 'none', borderRadius: '8px',
                  padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#ffffff', fontWeight: 600, cursor: 'pointer'
                }}
              >
                {getIconSvg('✓')} Save Changes
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer'
                }}
              >
                {getIconSvg('⟳')} Reset to Defaults
              </button>
            </div>
          </form>
        </div>

        {/* Live Portal Preview (Right) */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}>
              Live Portal Preview
              <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: '10px', fontSize: '9px', fontWeight: 700 }}>
                Real-time preview
              </span>
            </h2>
            <button
              onClick={() => alert('Refreshing live preview...')}
              style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Refresh Preview"
            >
              {getIconSvg('⟳', 14)}
            </button>
          </div>

          {/* Sub Portal Frame mockup */}
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ background: primaryColor, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Mini logo inside header */}
                <div style={{
                  width: '18px', height: '18px', background: '#ffffff', borderRadius: '3px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill={primaryColor}/>
                    <path d="M6 6H18V9H9V11H17V14H9V15H18V18H6V6Z" fill="white"/>
                  </svg>
                </div>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>EduTrack Portal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>{getIconSvg('bell', 13)}</span>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ffffff', display: 'inline-block' }} />
              </div>
            </div>

            {/* Sidebar + workspace container */}
            <div style={{ display: 'grid', gridTemplateColumns: '75px 1fr', background: '#f9fafb', minHeight: '160px' }}>
              {/* Sidebar */}
              <div style={{ background: '#ffffff', borderRight: '1px solid #e5e7eb', padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 6px', borderRadius: '4px', fontSize: '9px', fontWeight: 700, textAlign: 'center' }}>Dashboard</div>
                <div style={{ color: '#9ca3af', padding: '4px 6px', fontSize: '9px', fontWeight: 500, textAlign: 'center' }}>Students</div>
                <div style={{ color: '#9ca3af', padding: '4px 6px', fontSize: '9px', fontWeight: 500, textAlign: 'center' }}>Reports</div>
                <div style={{ color: '#9ca3af', padding: '4px 6px', fontSize: '9px', fontWeight: 500, textAlign: 'center' }}>Messages</div>
                <div style={{ color: '#9ca3af', padding: '4px 6px', fontSize: '9px', fontWeight: 500, textAlign: 'center' }}>Settings</div>
              </div>

              {/* Workspace */}
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Welcome back, Admin! {getIconSvg('👋', 11)}
                  </div>
                  <div style={{ fontSize: '8px', color: '#9ca3af', marginTop: 1 }}>Here's what's happening in your organization today.</div>
                </div>

                {/* Dashboard Widgets */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                  <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '4px', padding: 6 }}>
                    <div style={{ fontSize: '7px', color: '#9ca3af', fontWeight: 500 }}>Total Students</div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>2,540</div>
                    <div style={{ fontSize: '6px', color: '#10b981', fontWeight: 600, marginTop: 2 }}>↑ 8.4%</div>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '4px', padding: 6 }}>
                    <div style={{ fontSize: '7px', color: '#9ca3af', fontWeight: 500 }}>Attendance</div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>94.6%</div>
                    <div style={{ fontSize: '6px', color: '#10b981', fontWeight: 600, marginTop: 2 }}>↑ 3.2%</div>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '4px', padding: 6 }}>
                    <div style={{ fontSize: '7px', color: '#9ca3af', fontWeight: 500 }}>Pending Tasks</div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#1f2937', marginTop: 2 }}>12</div>
                    <div style={{ fontSize: '6px', color: '#ef4444', fontWeight: 600, marginTop: 2 }}>↓ 2</div>
                  </div>
                </div>

                {/* Recent Announcements */}
                <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7px', fontWeight: 700, color: '#4b5563', marginBottom: 4 }}>
                    <span>Recent Announcements</span>
                    <span style={{ color: '#2563eb' }}>View All</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ color: '#2563eb', display: 'flex', alignItems: 'center' }}>{getIconSvg('📢', 12)}</span>
                    <div>
                      <div style={{ fontSize: '8px', fontWeight: 700, color: '#1f2937' }}>Mid-Term Examination Schedule Released</div>
                      <div style={{ fontSize: '6px', color: '#9ca3af', marginTop: 1 }}>Today • All Branches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '8px', color: '#9ca3af', fontWeight: 600 }}>Active Theme Summary</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: primaryColor, display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: secondaryColor, display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: accentColor, display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: textColor, display: 'inline-block' }} />
              </div>
              <span style={{ fontSize: '8px', color: '#9ca3af', fontWeight: 600 }}>Font: Inter</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Layout Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginTop: 4 }}>
        {/* Portal Customization */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box'
        }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Portal Customization
            </h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: 2, margin: 0 }}>Configure portal appearance and navigation preferences.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
            {[
              { label: 'Custom Portal Name', val: 'EduTrack Portal', icon: '👤', iconBg: '#f0fdf4', iconColor: '#16a34a' },
              { label: 'Login Page Image', val: 'Custom banner active', icon: '🖼️', iconBg: '#f0fdf4', iconColor: '#16a34a' },
              { label: 'Portal Language', val: 'English (Default)', icon: '🌐', iconBg: '#f0fdf4', iconColor: '#16a34a' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', background: '#f9fafb' }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '6px', background: item.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.iconColor, flexShrink: 0
                }}>
                  {getIconSvg(item.icon, 12)}
                </div>
                <div style={{ flex: 1, marginLeft: 12 }}>
                  <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f2937', marginTop: 2 }}>{item.val}</div>
                </div>
                <button type="button" style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  {getIconSvg('✏️', 12)}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Domain & Access */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box'
        }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Domain & Access
            </h3>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: 2, margin: 0 }}>Manage your custom domain and access settings.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
            {/* Custom Domain */}
            <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', background: '#f9fafb' }}>
              <div style={{
                width: '26px', height: '26px', borderRadius: '6px', background: '#f8fafc',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0, border: '1px solid #e2e8f0'
              }}>
                {getIconSvg('🔒', 12)}
              </div>
              <div style={{ flex: 1, marginLeft: 12 }}>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>Custom Domain</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f2937', marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  portal.edutrack.com
                  <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: '10px', fontSize: '9px', fontWeight: 700 }}>
                    Verified
                  </span>
                </div>
              </div>
              <button type="button" style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {getIconSvg('✏️', 12)}
              </button>
            </div>

            {/* Session Timeout */}
            <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 14px', background: '#f9fafb' }}>
              <div style={{
                width: '26px', height: '26px', borderRadius: '6px', background: '#f8fafc',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0, border: '1px solid #e2e8f0'
              }}>
                {getIconSvg('🕒', 12)}
              </div>
              <div style={{ flex: 1, marginLeft: 12 }}>
                <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>Session Timeout</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1f2937', marginTop: 2 }}>30 minutes</div>
              </div>
              <button type="button" style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {getIconSvg('✏️', 12)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
