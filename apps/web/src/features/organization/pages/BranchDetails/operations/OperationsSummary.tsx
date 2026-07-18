import type { InfraStat } from '../types';
import { mockBuses } from '../../../../../mock/dashboards/transport';

interface Props {
  infrastructure: InfraStat;
  branchName: string;
}

export default function OperationsSummary({ infrastructure, branchName }: Props) {
  // Filter buses by branch name
  const branchBuses = mockBuses.filter(bus => bus.branch.toLowerCase().includes(branchName.split(' ')[0].toLowerCase()));

  const infraItems = [
    { label: 'Active Classrooms', val: infrastructure.classrooms, icon: '🏫' },
    { label: 'Science & Tech Labs', val: infrastructure.labs, icon: '🧪' },
    { label: 'Library Catalog Books', val: infrastructure.books.toLocaleString(), icon: '📖' },
    { label: 'Desktop Computers', val: infrastructure.computers, icon: '💻' },
    { label: 'Interactive Smart Boards', val: infrastructure.smartBoards, icon: '🖥️' },
    { label: 'Transport Bus Fleet', val: infrastructure.buses, icon: '🚌' },
    { label: 'CCTV Active Cameras', val: infrastructure.cctvs, icon: '📹' },
    { label: 'Power Generators', val: infrastructure.generators, icon: '⚡' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return '#10b981';
      case 'DELAYED':
        return '#f59e0b';
      case 'MAINTENANCE':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Infrastructure Panel */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ margin: '0 0 18px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Infrastructure & Asset Inventory
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {infraItems.map((item, idx) => (
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
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', marginTop: '2px' }}>
                  {item.val}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet & Transport Sub-panel */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
            Branch Fleet Vehicles Status
          </h3>
          <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>
            {branchBuses.length} Buses Assigned
          </span>
        </div>

        {branchBuses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#6b7280', fontSize: '13px' }}>
            No transport buses found for this branch in the mock database.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {branchBuses.map((bus) => (
              <div
                key={bus.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  background: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{bus.busNumber}</span>
                    <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '8px', fontFamily: 'monospace' }}>({bus.vehicleReg})</span>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#ffffff',
                    background: getStatusColor(bus.status),
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    {bus.status.toLowerCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563' }}>
                  <span>Driver: <strong>{bus.driverName}</strong></span>
                  <span>Speed: <strong>{bus.speed} km/h</strong></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4b5563' }}>
                  <span>Capacity: <strong>{bus.capacity}</strong></span>
                  <span>Fuel: <strong>{bus.fuelLevel}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
