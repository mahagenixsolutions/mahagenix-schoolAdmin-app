
interface Props {
  onActionClick: (action: string) => void;
}

export default function BranchQuickActions({ onActionClick }: Props) {
  const groups = [
    {
      title: 'Academic',
      color: '#3b82f6',
      actions: [
        { label: '+ Add Teacher', name: 'add-teacher' },
        { label: '+ Add Student', name: 'add-student' },
        { label: '+ Add Class', name: 'add-class' },
        { label: 'Assign Principal', name: 'assign-principal' }
      ]
    },
    {
      title: 'Communication',
      color: '#10b981',
      actions: [
        { label: 'Send Announcement', name: 'send-announcement' },
        { label: 'Send SMS', name: 'send-sms' },
        { label: 'Send Email', name: 'send-email' }
      ]
    },
    {
      title: 'Reports',
      color: '#f59e0b',
      actions: [
        { label: 'Generate Report', name: 'generate-report' },
        { label: 'Export Attendance', name: 'export-attendance' },
        { label: 'Export Finance', name: 'export-finance' }
      ]
    },
    {
      title: 'Administration',
      color: '#ef4444',
      actions: [
        { label: 'Edit Branch', name: 'edit-branch' },
        { label: 'Transfer Branch', name: 'transfer-branch' },
        { label: 'Archive Branch', name: 'archive-branch' }
      ]
    }
  ];

  return (
    <div style={{
      position: 'sticky',
      top: 64, // Keep it visible under the main app navbar if there is one
      zIndex: 99,
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '12px 20px',
      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      fontFamily: 'Inter, sans-serif'
    }}>
      <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Quick Actions
      </span>
      <div style={{ height: '20px', width: '1px', background: '#cbd5e1' }} />
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {groups.map((group, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {group.title}:
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {group.actions.map((act) => (
                <button
                  key={act.name}
                  onClick={() => onActionClick(act.name)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = group.color;
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = group.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.color = '#334155';
                  }}
                >
                  {act.label}
                </button>
              ))}
            </div>
            {idx < groups.length - 1 && (
              <div style={{ height: '16px', width: '1px', background: '#e2e8f0', marginLeft: '12px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
