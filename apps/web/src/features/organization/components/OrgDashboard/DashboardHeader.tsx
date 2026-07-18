
interface HeaderProps {
  onOpenPreferences: () => void;
  onGenerateReport: () => void;
  onExportExcel: () => void;
}

export default function DashboardHeader({ onOpenPreferences, onGenerateReport, onExportExcel }: HeaderProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: 'var(--shadow-lg)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
        >
          MA
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              Mahagenix Group of Schools
            </h1>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#38bdf8',
                background: 'rgba(56, 189, 248, 0.15)',
                padding: '3px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Executive Command Center
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#4ade80',
                background: 'rgba(74, 222, 128, 0.15)',
                padding: '3px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              ACTIVE
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '6px',
              fontSize: '11px',
              color: '#94a3b8',
              flexWrap: 'wrap'
            }}
          >
            <span>📅 AY: 2026-27</span>
            <span>🏢 Total Branches: 5</span>
            <span>📍 Active: 5 / 5</span>
            <span>🕒 Last Synced: Today, 08:30 PM</span>
            <span>💰 Fiscal Period: FY26</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={onGenerateReport}
          style={{
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-light)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
        >
          📈 Generate Exec Report
        </button>

        <button
          onClick={onExportExcel}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          📥 Export Data
        </button>

        <button
          onClick={onOpenPreferences}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#e2e8f0',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
        >
          ⚙️
        </button>
      </div>
    </div>
  );
}
