import { useState } from 'react';

export default function SettingsSummary() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    { name: 'General Settings', desc: 'School board, medium, name, and profile defaults', icon: '⚙️' },
    { name: 'Academic Config', desc: 'Exam cycles, grade scales, and lesson formats', icon: '🎓' },
    { name: 'Finance Rules', desc: 'Fee deadlines, auto-invoicing, and bank receipts', icon: '💰' },
    { name: 'Attendance Rules', desc: 'Daily cutoff, biometric triggers, and auto-SMS notifications', icon: '📋' },
    { name: 'Transport Config', desc: 'GPS update cycles, speed warning limits, and fuel alerts', icon: '🚌' },
    { name: 'Library Setup', desc: 'Book return windows, fine calculations, and checkout caps', icon: '📖' },
    { name: 'Hostel Settings', desc: 'Warden assignments, visitor rules, and room locks', icon: '🏢' },
    { name: 'Branding Options', desc: 'Logo overrides, receipt banners, and school colors', icon: '🎨' },
    { name: 'Integrations & API', desc: 'SMS Gateway, Email Gateway, and Payment APIs', icon: '🔌' },
    { name: 'Notifications Center', desc: 'Push notifications, email templates, and priority alerts', icon: '🔔' },
    { name: 'Security & Access', desc: 'Portal login controls, audit locks, and password policies', icon: '🔒' }
  ];

  const handleOpenDrawer = (sectionName: string) => {
    setActiveSection(sectionName);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setActiveSection(null);
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
        Branch Configuration Workspace
      </h3>
      <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
        Configure general rules, finance integrations, notifications, and branding for this specific school branch.
      </p>

      {/* Grid of settings options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {sections.map((sec, idx) => (
          <div
            key={idx}
            onClick={() => handleOpenDrawer(sec.name)}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              background: '#f8fafc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.background = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.background = '#f8fafc';
            }}
          >
            <span style={{ fontSize: '20px', flexShrink: 0 }}>{sec.icon}</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{sec.name}</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{sec.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-out Settings Drawer */}
      {drawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          height: '100vh',
          background: '#ffffff',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 0.25s ease-out',
          boxSizing: 'border-box'
        }}>
          {/* Drawer Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f8fafc'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#1e293b' }}>
              {activeSection}
            </h3>
            <button
              onClick={handleCloseDrawer}
              style={{
                border: 'none',
                background: 'none',
                fontSize: '18px',
                fontWeight: 800,
                color: '#64748b',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Drawer Content */}
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>CONFIGURATION PROFILE</label>
              <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}>
                <option>CBSE Default Standard</option>
                <option>ICSE Custom Override</option>
                <option>State Board Standard</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>ENABLE OVERRIDE SETTINGS</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                <input type="checkbox" defaultChecked id="override" style={{ cursor: 'pointer' }} />
                <label htmlFor="override" style={{ fontSize: '13px', color: '#334155', cursor: 'pointer' }}>Apply rules specifically to this branch</label>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>FEATURE TOGGLES</label>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#334155' }}>Send automated SMS reminders</span>
                <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#334155' }}>Auto-generate fee receipts</span>
                <input type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#334155' }}>Enable biometric strict logging</span>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            background: '#f8fafc'
          }}>
            <button
              onClick={handleCloseDrawer}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                background: '#ffffff',
                color: '#374151',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Configuration settings saved successfully!');
                handleCloseDrawer();
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
