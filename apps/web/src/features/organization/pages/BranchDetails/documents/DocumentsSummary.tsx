import type { ComplianceData } from '../types';

interface Props {
  compliance: ComplianceData;
}

export default function DocumentsSummary({ compliance }: Props) {
  const complianceFields = [
    { label: 'Govt Recognition', val: compliance.govRecognition, icon: '🏛️', color: '#10b981' },
    { label: 'Fire Safety Clearance', val: compliance.fireSafety, icon: '🔥', color: '#f59e0b' },
    { label: 'Building Fitness Cert', val: compliance.buildingCert, icon: '🏢', color: '#10b981' },
    { label: 'Bus Fitness Approvals', val: compliance.busFitness, icon: '🚌', color: '#ef4444' }
  ];

  const docs = [
    { name: 'Government Recognition Certificate', cat: 'Government', status: 'Approved', expiry: 'Jan 2030', ver: 'v2.1', size: '2.4 MB' },
    { name: 'Fire Safety Renewal Clearance', cat: 'Government', status: 'Pending Renewal', expiry: 'Aug 2026', ver: 'v1.0', size: '1.8 MB' },
    { name: 'Consolidated Audited Accounts FY25', cat: 'Finance', status: 'Approved', expiry: 'N/A', ver: 'v1.4', size: '4.2 MB' },
    { name: 'Staff Verification Registers', cat: 'HR', status: 'In Review', expiry: 'Dec 2026', ver: 'v3.0', size: '3.1 MB' },
    { name: 'RTO Bus Fitness Certificates', cat: 'Transport', status: 'Pending', expiry: 'Jul 2026', ver: 'v2.0', size: '2.8 MB' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return '#10b981';
      case 'In Review':
      case 'Pending Renewal':
        return '#f59e0b';
      case 'Pending':
      default:
        return '#ef4444';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Compliance dashboard */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ margin: '0 0 18px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Compliance & Safety Certificates Status
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {complianceFields.map((field, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span style={{ fontSize: '20px' }}>{field.icon}</span>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {field.label}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: field.color, marginTop: '2px' }}>
                  {field.val}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563', marginBottom: '6px' }}>
              <span>Staff Police Verification Progress</span>
              <span style={{ fontWeight: 700 }}>{compliance.staffVerificationPercent}%</span>
            </div>
            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${compliance.staffVerificationPercent}%`, height: '100%', background: '#8b5cf6', borderRadius: '4px' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563', marginBottom: '6px' }}>
              <span>Mandatory Documentation Completion</span>
              <span style={{ fontWeight: 700 }}>{compliance.documentCompletionPercent}%</span>
            </div>
            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${compliance.documentCompletionPercent}%`, height: '100%', background: '#3b82f6', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Documents Listing */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Mandatory Uploaded Documents Directory
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', background: '#f8fafc' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Document Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Version</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Expiry / Review</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', fontWeight: 600, color: '#1e293b' }}>{doc.name}</td>
                  <td style={{ padding: '16px', color: '#64748b' }}>
                    <span style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>{doc.cat}</span>
                  </td>
                  <td style={{ padding: '16px', color: '#64748b', fontFamily: 'monospace' }}>{doc.ver}</td>
                  <td style={{ padding: '16px', color: '#64748b', fontWeight: 500 }}>{doc.expiry}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ color: getStatusColor(doc.status), fontWeight: 700 }}>{doc.status}</span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <button
                      onClick={() => alert(`Downloading ${doc.name} (${doc.size})...`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2563eb',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Download ({doc.size})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
