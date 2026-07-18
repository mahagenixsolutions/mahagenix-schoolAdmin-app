import type { BranchInfo } from '../types';

interface Props {
  info: BranchInfo;
}

export default function BranchInformation({ info }: Props) {
  const fields = [
    { label: 'School Code', val: info.code, icon: '🔑' },
    { label: 'Affiliated Board', val: info.board, icon: '📜' },
    { label: 'Medium of Instruction', val: info.medium, icon: '🗣️' },
    { label: 'Campus Area', val: info.area, icon: '🌳' },
    { label: 'Established Year', val: info.established, icon: '📅' },
    { label: 'Total Capacity', val: `${info.capacity} Students`, icon: '📊' },
    { label: 'Current Strength', val: `${info.strength} Active`, icon: '👥' },
    { label: 'Transport Fleet', val: `${info.busesCount} Operational Buses`, icon: '🚌' },
    { label: 'Library Books', val: `${info.booksCount.toLocaleString()} Titles`, icon: '📖' },
    { label: 'Science & Computer Labs', val: `${info.labsCount} Active Labs`, icon: '🧪' },
    { label: 'Hostel Accommodation', val: info.hostelAvailable ? 'Available & Active' : 'Not Available', icon: '🏢' },
    { label: 'CCTV Security Surveillance', val: info.cctvStatus, icon: '📹' },
    { label: 'Biometric Attendance', val: info.biometricStatus, icon: '🆔' }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h3 style={{ margin: '0 0 18px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
        Branch Profile & Infrastructure
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {fields.map((field, idx) => (
          <div
            key={idx}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '20px', flexShrink: 0 }}>{field.icon}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {field.label}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {field.val}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
