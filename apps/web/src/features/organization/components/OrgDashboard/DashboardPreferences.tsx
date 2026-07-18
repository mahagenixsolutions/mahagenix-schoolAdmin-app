import React from 'react';

interface PreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: {
    compactMode: boolean;
    defaultBranch: string;
    refreshInterval: string;
    favoriteWidgets: string[];
  };
  setPreferences: React.Dispatch<React.SetStateAction<any>>;
}

export default function DashboardPreferences({
  isOpen,
  onClose,
  preferences,
  setPreferences
}: PreferencesProps) {
  if (!isOpen) return null;

  const toggleWidget = (widgetId: string) => {
    const active = preferences.favoriteWidgets.includes(widgetId);
    const updated = active
      ? preferences.favoriteWidgets.filter(w => w !== widgetId)
      : [...preferences.favoriteWidgets, widgetId];
    setPreferences((prev: any) => ({ ...prev, favoriteWidgets: updated }));
  };

  const widgetsList = [
    { id: 'health', name: 'Organization Health Score' },
    { id: 'finance', name: 'Financial Command Center' },
    { id: 'ai-insights', name: 'AI Executive Copilot' },
    { id: 'rankings', name: 'Branch Performance Matrix' },
    { id: 'calendar', name: 'Unified Calendar events' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)',
        fontFamily: 'Inter, sans-serif'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: '#ffffff',
          boxShadow: 'var(--shadow-2xl)',
          padding: '30px 24px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Dashboard Preferences
          </h3>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#64748b'
            }}
          >
            ✕
          </button>
        </div>

        {/* Mode Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Display Layout Density
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={() => setPreferences((prev: any) => ({ ...prev, compactMode: false }))}
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 700,
                background: !preferences.compactMode ? 'var(--color-primary-surface)' : '#f8fafc',
                border: '1px solid',
                borderColor: !preferences.compactMode ? 'var(--color-primary)' : '#e2e8f0',
                borderRadius: '6px',
                color: !preferences.compactMode ? 'var(--color-primary)' : '#64748b',
                cursor: 'pointer'
              }}
            >
              Comfortable Mode
            </button>
            <button
              onClick={() => setPreferences((prev: any) => ({ ...prev, compactMode: true }))}
              style={{
                padding: '8px',
                fontSize: '12px',
                fontWeight: 700,
                background: preferences.compactMode ? 'var(--color-primary-surface)' : '#f8fafc',
                border: '1px solid',
                borderColor: preferences.compactMode ? 'var(--color-primary)' : '#e2e8f0',
                borderRadius: '6px',
                color: preferences.compactMode ? 'var(--color-primary)' : '#64748b',
                cursor: 'pointer'
              }}
            >
              Compact Mode
            </button>
          </div>
        </div>

        {/* Favorite Widgets configuration */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
            Pinned Command Center Widgets
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {widgetsList.map(widget => {
              const active = preferences.favoriteWidgets.includes(widget.id);
              return (
                <div
                  key={widget.id}
                  onClick={() => toggleWidget(widget.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    readOnly
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                    {widget.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'var(--color-primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'center',
            marginTop: 'auto'
          }}
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}
