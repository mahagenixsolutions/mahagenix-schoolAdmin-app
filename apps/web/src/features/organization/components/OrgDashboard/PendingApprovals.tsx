import type { PendingApproval } from '../../mock/approvals';

interface ApprovalsProps {
  approvals: PendingApproval[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function PendingApprovals({ approvals, onApprove, onReject }: ApprovalsProps) {
  const pendingItems = approvals.filter(item => item.status === 'PENDING');

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: '#ec4899', borderRadius: '1px' }} />
            Pending Executive Approvals
          </h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            Decisions requiring Organization Admin authorization
          </p>
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#ec4899', background: '#fdf2f8', padding: '3px 8px', borderRadius: '6px' }}>
          {pendingItems.length} Action Items
        </span>
      </div>

      {pendingItems.length === 0 ? (
        <div style={{ padding: '30px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>
          🎉 All approval queues are cleared! No actions pending.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pendingItems.map((app) => (
            <div
              key={app.id}
              style={{
                background: '#fafbfe',
                border: '1px solid #f1f5f9',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#db2777',
                      background: '#fdf2f8',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {app.type}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{app.date}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginTop: '6px' }}>
                  {app.branchName}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px', lineHeight: 1.4 }}>
                  {app.details}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                  Requested by: <strong>{app.requestBy}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                {app.amount && (
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginRight: '8px' }}>
                    {app.amount}
                  </span>
                )}
                <button
                  onClick={() => onApprove(app.id)}
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => onReject(app.id)}
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
