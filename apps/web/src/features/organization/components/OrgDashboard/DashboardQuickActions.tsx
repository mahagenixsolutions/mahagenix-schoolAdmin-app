
interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export default function DashboardQuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    { label: 'Create Branch', desc: 'Provision a new school branch', icon: '🏢', color: '#2563eb', bg: '#eff6ff', type: 'create-branch' },
    { label: 'Add Principal', desc: 'Hire/Assign Branch Administrator', icon: '👤', color: '#10b981', bg: '#ecfdf5', type: 'add-principal' },
    { label: 'Broadcast Message', desc: 'Send SMS/WhatsApp notification', icon: '📢', color: '#ec4899', bg: '#fdf2f8', type: 'broadcast' },
    { label: 'Generate Financial Audit', desc: 'Review collection worksheets', icon: '💰', color: '#f59e0b', bg: '#fffbeb', type: 'generate-audit' },
    { label: 'Branding Options', desc: 'Manage logos, domains & themes', icon: '🎨', color: '#8b5cf6', bg: '#f5f3ff', type: 'branding' }
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: '3px', height: '14px', background: 'var(--color-primary)', borderRadius: '1px' }} />
        Quick Command Directory
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {actions.map((act, index) => (
          <div
            key={index}
            onClick={() => onActionClick(act.type)}
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
              boxSizing: 'border-box',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: act.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: act.color,
                flexShrink: 0
              }}
            >
              {act.icon}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {act.label}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {act.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
