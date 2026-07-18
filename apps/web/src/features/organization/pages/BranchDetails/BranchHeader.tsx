import type { CompleteBranchData } from './mockData';

interface Props {
  branch: CompleteBranchData;
  onEdit: () => void;
  onExport: () => void;
}

export default function BranchHeader({ branch, onEdit, onExport }: Props) {
  // SVG Icon Helpers
  const getIconSvg = (name: string, size = 14) => {
    switch (name) {
      case 'pin':
      case '📍':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
      case 'mail':
      case '✉️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
      case 'phone':
      case '📞':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
      case 'pencil':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
      case 'download':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
      case 'more':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>;
      default:
        return null;
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: '16px',
      padding: '28px',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Top Section: Title & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              {branch.name}
            </h1>
            <span style={{
              background: '#10b981',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {branch.status}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '13px', color: '#94a3b8', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {getIconSvg('📍', 13)} {branch.location}
            </span>
            <span>•</span>
            <span>{branch.info.board}</span>
            <span>•</span>
            <span>{branch.info.medium} Medium</span>
          </div>
        </div>

        {/* Top-Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onEdit}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '9px 16px', fontSize: '13px', fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.1)', color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            {getIconSvg('pencil', 12)} Edit Branch
          </button>
          <button
            onClick={onExport}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '9px 16px', fontSize: '13px', fontWeight: 600,
              background: '#2563eb', color: '#ffffff',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
          >
            {getIconSvg('download', 12)} Export Report
          </button>
          <button
            onClick={() => alert('Opening actions menu...')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px',
              background: 'rgba(255, 255, 255, 0.05)', color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            {getIconSvg('more', 14)}
          </button>
        </div>
      </div>

      {/* Middle Section: Leadership Profiles */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '20px',
        paddingBottom: '20px'
      }}>
        {/* Principal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: branch.leadership.principal.avatarBg,
            color: branch.leadership.principal.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '18px'
          }}>
            👨‍✈️
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>PRINCIPAL</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 1 }}>{branch.leadership.principal.name}</div>
          </div>
        </div>

        {/* Vice Principal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: branch.leadership.vicePrincipal.avatarBg,
            color: branch.leadership.vicePrincipal.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '18px'
          }}>
            👩‍💼
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>VICE PRINCIPAL</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 1 }}>{branch.leadership.vicePrincipal.name}</div>
          </div>
        </div>

        {/* School Admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: branch.leadership.admin.avatarBg,
            color: branch.leadership.admin.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '18px'
          }}>
            🧑‍💼
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>SCHOOL ADMIN</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 1 }}>{branch.leadership.admin.name}</div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Micro Details & KPI Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>ACADEMIC YEAR</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 3 }}>{branch.academicYear}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>ESTABLISHED</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 3 }}>{branch.establishedYear}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>CAPACITY</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginTop: 3 }}>{branch.info.capacity} Students</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>OCCUPANCY</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginTop: 3 }}>{branch.occupancyPercent}%</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>REVENUE</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: 3 }}>{branch.revenue}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>EXPENSE</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', marginTop: 3 }}>{branch.expense}</div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em' }}>HEALTH SCORE</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#a855f7', marginTop: 3 }}>{branch.healthScore}%</div>
        </div>
      </div>
    </div>
  );
}
