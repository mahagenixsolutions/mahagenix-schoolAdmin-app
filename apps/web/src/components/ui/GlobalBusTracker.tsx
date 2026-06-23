import { useState, useEffect } from 'react';

export default function GlobalBusTracker() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for custom event to open from anywhere (like the Parent Dashboard)
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-bus-tracker', handleOpen);
    return () => window.removeEventListener('open-bus-tracker', handleOpen);
  }, []);

  return (
    <>
      {/* ── Floating Action Button (above AI Chat Widget) ──────────────── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Track Bus"
        style={{
          position: 'fixed',
          bottom: 96, // Placed directly above the AI Chat widget (which is at bottom: 24)
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(217, 119, 6, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12)',
          zIndex: 9998,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          fontSize: 24,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(217, 119, 6, 0.55), 0 4px 10px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(217, 119, 6, 0.45), 0 2px 6px rgba(0, 0, 0, 0.12)';
        }}
      >
        🚌
      </button>

      {/* ── Interactive Mock Map Modal ─────────────────────────────────── */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', padding: 24 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 24, width: '100%', maxWidth: 900, height: '80vh', maxHeight: 600, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
            
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🚌</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Live Tracking: Route 4A</h3>
                  <div style={{ fontSize: 13, color: '#10b981', fontWeight: 700, marginTop: 2 }}>● On Time • Moving</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ border: 'none', background: 'var(--bg-surface)', color: 'var(--text-secondary)', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontWeight: 800, boxShadow: 'var(--shadow-xs)' }}>✕</button>
            </div>

            {/* Content (Split View) */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              
              {/* Left Side: Bus Details */}
              <div style={{ width: 300, borderRight: '1px solid var(--border-color)', padding: 24, background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Driver Info</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>👨‍✈️</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Mike Johnson</div>
                      <div style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600 }}>📞 +1 (555) 0192</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Estimated Time of Arrival</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginTop: 4 }}>3:45 PM</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>About 12 mins away</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: 8 }}>Upcoming Stops</div>
                  <div style={{ position: 'relative', paddingLeft: 16, borderLeft: '2px solid var(--border-color)', marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -21, top: 2, width: 10, height: 10, borderRadius: '50%', background: '#10b981', border: '2px solid var(--bg-surface)' }} />
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>City Center Mall</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Departed 3:30 PM</div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -21, top: 2, width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', border: '2px solid var(--bg-surface)', boxShadow: '0 0 0 2px #fef3c7' }} />
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>Oakwood Residence</div>
                      <div style={{ fontSize: 11, color: '#d97706', fontWeight: 600 }}>Next Stop</div>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: -21, top: 2, width: 10, height: 10, borderRadius: '50%', background: '#cbd5e1', border: '2px solid var(--bg-surface)' }} />
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Maple Street</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est. 3:55 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Mock Map */}
              <div style={{ flex: 1, background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
                {/* Map Background Pattern */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                
                {/* Mock Map UI Elements */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                  {/* Fake Route Line */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                    <path d="M 50 400 Q 200 400 250 250 T 500 150" fill="none" stroke="#3b82f6" strokeWidth="6" strokeDasharray="12 12" style={{ animation: 'dash 20s linear infinite' }} />
                  </svg>
                  
                  {/* Current Bus Position Pin */}
                  <div style={{ position: 'absolute', top: 240, left: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translate(-50%, -50%)', animation: 'bounce 2s infinite' }}>
                    <div style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 800, marginBottom: 4, boxShadow: 'var(--shadow-md)' }}>
                      36 km/h
                    </div>
                    <div style={{ width: 48, height: 48, background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)', border: '4px solid var(--bg-surface)' }}>
                      🚌
                    </div>
                  </div>

                  {/* Destination Pin */}
                  <div style={{ position: 'absolute', top: 150, left: 500, transform: 'translate(-50%, -50%)' }}>
                    <div style={{ width: 24, height: 24, background: '#10b981', borderRadius: '50%', border: '4px solid var(--bg-surface)', boxShadow: 'var(--shadow-sm)' }} />
                    <div style={{ position: 'absolute', top: 32, left: -40, width: 100, textAlign: 'center', fontSize: 12, fontWeight: 800, color: 'var(--text-primary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', padding: '2px 8px', borderRadius: 8 }}>Oakwood</div>
                  </div>
                </div>

                {/* Map Controls */}
                <div style={{ position: 'absolute', right: 16, bottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button style={{ width: 40, height: 40, background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 12, fontSize: 18, fontWeight: 800, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>+</button>
                  <button style={{ width: 40, height: 40, background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 12, fontSize: 18, fontWeight: 800, cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>-</button>
                  <button style={{ width: 40, height: 40, background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: 12, fontSize: 18, fontWeight: 800, cursor: 'pointer', boxShadow: 'var(--shadow-md)', marginTop: 8 }}>📍</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%); }
          50% { transform: translate(-50%, -60%); }
        }
      `}</style>
    </>
  );
}
