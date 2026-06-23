import { useState, useEffect, useMemo } from 'react';

interface Point {
  lat: number;
  lng: number;
}

interface BusTrackingMapProps {
  routePath?: Point[];
  currentLocationIndex?: number;
  busNumber?: string;
  eta?: string;
  speed?: number;
  lastUpdated?: string;
}

const STOP_NAMES = ['Sunrise Colony', 'MG Road', 'Lake View', 'Park Avenue', 'Temple Junction'];

export default function BusTrackingMap({
  routePath = [],
  currentLocationIndex = 0,
  busNumber = '14',
  eta = '08:45 AM',
  speed = 32,
}: BusTrackingMapProps) {

  const [syncSec, setSyncSec] = useState(0);

  useEffect(() => {
    setSyncSec(0);
    const t = setInterval(() => setSyncSec(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [currentLocationIndex]);

  const pathLen = routePath.length || 1;
  const progress = pathLen > 1 ? currentLocationIndex / (pathLen - 1) : 0;
  const distLeft = Math.max(0, (5.2 - progress * 5.2)).toFixed(1);
  const busIdx = Math.min(currentLocationIndex, 5);

  // Fixed pixel positions for the stops and bus (viewBox 500x260)
  const stops = useMemo(() => [
    { x: 40,  y: 185, name: STOP_NAMES[0] },
    { x: 120, y: 80,  name: STOP_NAMES[1] },
    { x: 210, y: 170, name: STOP_NAMES[2] },
    { x: 300, y: 90,  name: STOP_NAMES[3] },
    { x: 385, y: 185, name: STOP_NAMES[4] },
  ], []);

  const school = { x: 465, y: 125 };

  const allPts = [...stops.map(s => ({ x: s.x, y: s.y })), school];
  const busPt = allPts[busIdx] || allPts[0];

  const polyStr = '40,185 120,80 210,170 300,90 385,185 465,125';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 400,
        position: 'relative',
        borderRadius: 0,
        overflow: 'hidden',
        background: '#e8f4e3',
      }}
    >
      {/* ===== MAP TEXTURE LAYER (inline div elements — no MUI Box) ===== */}

      {/* Horizontal roads */}
      <div style={{ position: 'absolute', top: '28%', left: 0, right: 0, height: 6, background: 'rgba(200,210,195,0.7)' }} />
      <div style={{ position: 'absolute', top: '55%', left: 0, right: 0, height: 8, background: 'rgba(190,200,185,0.8)' }} />
      <div style={{ position: 'absolute', top: '82%', left: 0, right: 0, height: 5, background: 'rgba(200,210,195,0.6)' }} />

      {/* Vertical roads */}
      <div style={{ position: 'absolute', left: '18%', top: 0, bottom: 0, width: 5, background: 'rgba(200,210,195,0.7)' }} />
      <div style={{ position: 'absolute', left: '42%', top: 0, bottom: 0, width: 7, background: 'rgba(190,200,185,0.8)' }} />
      <div style={{ position: 'absolute', left: '65%', top: 0, bottom: 0, width: 5, background: 'rgba(200,210,195,0.7)' }} />
      <div style={{ position: 'absolute', left: '85%', top: 0, bottom: 0, width: 4, background: 'rgba(200,210,195,0.5)' }} />

      {/* Park areas */}
      <div style={{ position: 'absolute', left: '28%', top: '8%', width: 80, height: 45, background: 'rgba(120,180,100,0.15)', borderRadius: 12 }} />
      <div style={{ position: 'absolute', left: '55%', top: '40%', width: 55, height: 35, background: 'rgba(120,180,100,0.12)', borderRadius: 10 }} />

      {/* Building blocks */}
      <div style={{ position: 'absolute', left: '6%', top: '12%', width: 30, height: 22, background: 'rgba(160,165,155,0.22)', borderRadius: 4 }} />
      <div style={{ position: 'absolute', left: '48%', top: '14%', width: 36, height: 20, background: 'rgba(160,165,155,0.18)', borderRadius: 4 }} />
      <div style={{ position: 'absolute', left: '73%', top: '18%', width: 28, height: 18, background: 'rgba(160,165,155,0.2)', borderRadius: 4 }} />

      {/* Road labels */}
      <div style={{ position: 'absolute', top: '25%', left: '24%', fontSize: 8, color: 'rgba(90,100,85,0.45)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const }}>
        MG Road
      </div>
      <div style={{ position: 'absolute', top: '52%', left: '50%', fontSize: 8, color: 'rgba(90,100,85,0.45)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const }}>
        Park Ave
      </div>

      {/* ===== SVG ROUTE + MARKERS ===== */}
      <svg
        viewBox="0 0 510 260"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
      >
        <defs>
          <filter id="rs">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(66,133,244,0.3)" />
          </filter>
        </defs>

        {/* Route shadow */}
        <polyline points={polyStr} fill="none" stroke="rgba(66,133,244,0.12)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />

        {/* Background route (light blue) */}
        <polyline points={polyStr} fill="none" stroke="#aecbfa" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Completed route (Google blue) */}
        <polyline
          points={polyStr}
          fill="none"
          stroke="#4285F4"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="650"
          strokeDashoffset={650 - 650 * progress}
          filter="url(#rs)"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />

        {/* Animated flow dashes */}
        <polyline
          points={polyStr}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="8 18"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-650" dur="8s" repeatCount="indefinite" />
        </polyline>

        {/* ===== STOP MARKERS ===== */}
        {stops.map((st, i) => {
          const done = i < busIdx;
          const active = i === busIdx;
          return (
            <g key={i}>
              {/* Stop label bg */}
              <rect
                x={st.x - 35}
                y={st.y - 30}
                width={70}
                height={16}
                rx={6}
                fill={done ? '#4285F4' : active ? '#EA4335' : 'white'}
                stroke={done || active ? 'none' : '#bdc1c6'}
                strokeWidth={done || active ? 0 : 1}
                opacity={0.92}
              />
              {/* Stop label text */}
              <text
                x={st.x}
                y={st.y - 19}
                textAnchor="middle"
                fill={done || active ? 'white' : '#5f6368'}
                fontSize="8"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {st.name}
              </text>

              {/* Stop dot */}
              {active && (
                <circle cx={st.x} cy={st.y} r="14" fill="none" stroke="rgba(234,67,53,0.3)" strokeWidth="2">
                  <animate attributeName="r" from="8" to="20" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                cx={st.x}
                cy={st.y}
                r="7"
                fill={done ? '#4285F4' : active ? '#EA4335' : 'white'}
                stroke={done ? '#1a73e8' : active ? '#c5221f' : '#9aa0a6'}
                strokeWidth="3"
              />
              {done && <circle cx={st.x} cy={st.y} r="2.5" fill="white" />}
            </g>
          );
        })}

        {/* ===== SCHOOL MARKER ===== */}
        <circle cx={school.x} cy={school.y} r="14" fill="none" stroke="rgba(52,168,83,0.3)" strokeWidth="2">
          <animate attributeName="r" from="10" to="24" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={school.x} cy={school.y} r="12" fill="#34A853" stroke="white" strokeWidth="3" />
        {/* School icon (simple building) */}
        <text x={school.x} y={school.y + 4} textAnchor="middle" fill="white" fontSize="12" fontFamily="system-ui">🏫</text>
        <rect x={school.x - 22} y={school.y - 28} width={44} height={14} rx={5} fill="#34A853" opacity="0.92" />
        <text x={school.x} y={school.y - 18} textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">School</text>

        {/* ===== BUS MARKER ===== */}
        <g style={{ transition: 'transform 1.5s cubic-bezier(0.4,0,0.2,1)' }} transform={`translate(${busPt.x},${busPt.y})`}>
          {/* Pulse rings */}
          <circle cx="0" cy="0" r="10" fill="none" stroke="#4285F4" strokeWidth="2" opacity="0.5">
            <animate attributeName="r" from="10" to="28" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="10" fill="none" stroke="#4285F4" strokeWidth="1.5" opacity="0.3">
            <animate attributeName="r" from="10" to="35" dur="2s" begin="0.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="0.7s" repeatCount="indefinite" />
          </circle>

          {/* Bus circle */}
          <circle cx="0" cy="0" r="15" fill="#1a73e8" stroke="white" strokeWidth="3" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14">🚌</text>

          {/* Bus label */}
          <rect x="-24" y="-32" width="48" height="15" rx="6" fill="#1a73e8" />
          <text x="0" y="-21" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif">Bus {busNumber}</text>
        </g>
      </svg>

      {/* ===== OVERLAY CARDS (HTML divs, NOT MUI to guarantee rendering) ===== */}

      {/* Top-Left: LIVE TRACKING */}
      <div style={{
        position: 'absolute', top: 14, left: 14, zIndex: 10,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
        borderRadius: 14, padding: '10px 14px', minWidth: 140,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#34A853',
            boxShadow: '0 0 8px rgba(52,168,83,0.6)',
            animation: 'liveBlink 1.5s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#34A853', textTransform: 'uppercase' as const, letterSpacing: 1 }}>
            Live Tracking
          </span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#202124' }}>Bus {busNumber}</div>
        <div style={{ fontSize: 10, color: '#5f6368', marginTop: 2 }}>
          Updated {syncSec < 60 ? `${syncSec}s` : `${Math.floor(syncSec / 60)}m`} ago
        </div>
      </div>

      {/* Top-Right: SPEED */}
      <div style={{
        position: 'absolute', top: 14, right: 14, zIndex: 10,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
        borderRadius: 14, padding: '10px 16px', textAlign: 'center' as const, minWidth: 70,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#5f6368', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 2 }}>Speed</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#1a73e8', lineHeight: 1 }}>{speed}</div>
        <div style={{ fontSize: 9, color: '#5f6368', fontWeight: 500 }}>km/h</div>
      </div>

      {/* Bottom-Left: CURRENT LOCATION */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14, zIndex: 10,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
        borderRadius: 14, padding: '10px 14px', minWidth: 140,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: '#5f6368', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 3 }}>
          📍 Current Location
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#202124' }}>
          {STOP_NAMES[busIdx] || 'Arrived'}
        </div>
        <div style={{ fontSize: 10, color: '#5f6368' }}>East Zone Road</div>
      </div>

      {/* Bottom-Right: ETA */}
      <div style={{
        position: 'absolute', bottom: 14, right: 14, zIndex: 10,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)',
        borderRadius: 14, padding: '10px 16px', textAlign: 'center' as const, minWidth: 80,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)',
      }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: '#5f6368', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 2 }}>ETA</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#202124', lineHeight: 1.1 }}>{eta}</div>
      </div>

      {/* ===== ROUTE PROGRESS BAR ===== */}
      <div style={{
        position: 'absolute', bottom: 70, left: '50%', transform: 'translateX(-50%)',
        width: '65%', zIndex: 10,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)',
          borderRadius: 12, padding: '8px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#5f6368', textTransform: 'uppercase' as const, letterSpacing: 1 }}>Route Progress</span>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#1a73e8' }}>{Math.round(progress * 100)}%</span>
          </div>
          <div style={{ width: '100%', height: 6, background: '#e8eaed', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, #4285F4, #1a73e8)',
              borderRadius: 3, transition: 'width 1.5s ease-out',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 8, color: '#9aa0a6' }}>Start</span>
            <span style={{ fontSize: 8, color: '#5f6368', fontWeight: 600 }}>{distLeft} km left</span>
            <span style={{ fontSize: 8, color: '#34A853', fontWeight: 700 }}>School</span>
          </div>
        </div>
      </div>

      {/* ===== ZOOM CONTROLS ===== */}
      <div style={{
        position: 'absolute', right: 14, top: '45%',
        display: 'flex', flexDirection: 'column' as const, gap: 3, zIndex: 10,
      }}>
        <div style={{
          width: 30, height: 30, background: 'rgba(255,255,255,0.92)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontWeight: 700, color: '#5f6368', fontSize: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.06)',
        }}>+</div>
        <div style={{
          width: 30, height: 30, background: 'rgba(255,255,255,0.92)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontWeight: 700, color: '#5f6368', fontSize: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.06)',
        }}>−</div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes liveBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
