import { useParams, useNavigate } from 'react-router-dom';

const Sparkline = ({ points, strokeColor }: { points: string; strokeColor: string }) => (
  <svg width="80" height="40" viewBox="0 0 100 40" style={{ alignSelf: 'flex-end', marginLeft: 'auto', flexShrink: 0 }}>
    <path d={points} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface KpiCardProps {
  title: string;
  iconBg: string;
  iconColor: string;
  iconSvg: React.ReactNode;
  valueNode: React.ReactNode;
  trendText: string;
  isTrendUp: boolean;
  sparklinePoints: string;
  sparklineColor: string;
}

function KpiCard({ title, iconBg, iconColor, iconSvg, valueNode, trendText, isTrendUp, sparklinePoints, sparklineColor }: KpiCardProps) {
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
      padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px', background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, flexShrink: 0
        }}>
          {iconSvg}
        </div>
        <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, cursor: 'pointer' }} title="Info">ⓘ</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 4 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{title}</div>
          {valueNode}
          <div style={{ fontSize: '13px', fontWeight: 600, marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: isTrendUp ? '#10b981' : '#ef4444' }}>{trendText}</span>
            <span style={{ color: '#9ca3af', fontWeight: 500 }}>vs last month</span>
          </div>
        </div>
        <Sparkline points={sparklinePoints} strokeColor={sparklineColor} />
      </div>
    </div>
  );
}

export default function OrgAnalytics() {
  const getIconSvg = (name: string, size = 14) => {
    switch (name) {
      case 'star':
      case '★':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
      case 'wave':
      case '👋':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5m0-5V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8m0-7v-.5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v9M6 14v4a6 6 0 0 0 12 0v-4"/></svg>;
      case 'megaphone':
      case '📢':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
      case 'sparkle':
      case '✨':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707"/></svg>;
      case 'up':
      case '▲':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="18 15 12 9 6 15"/></svg>;
      case 'down':
      case '▼':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="6 9 12 15 18 9"/></svg>;
      case 'warning':
      case '⚠️':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
      case 'refresh':
      case '⟳':
        return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
      default:
        return null;
    }
  };

  const { type } = useParams<{ type: string }>();

  const navigate = useNavigate();

  const getActiveTabStyle = (active: boolean) => ({
    padding: '10px 20px',
    borderRadius: '8px',
    border: active ? 'none' : '1px solid #e5e7eb',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
    background: active ? '#2563eb' : '#ffffff',
    color: active ? '#ffffff' : '#4b5563',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  });

  const renderAcademic = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Filters & Export Report row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {/* Calendar Select */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
            padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>This Month</span>
            <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
          </div>

          {/* Branch Select */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
            padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>All Branches</span>
            <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
          </div>
        </div>

        {/* Export Button */}
        <button style={{
          background: '#ffffff', border: '1px solid #2563eb', borderRadius: '8px',
          padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export Report
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KpiCard
          title="Overall Attendance"
          iconBg="#eff6ff"
          iconColor="#2563eb"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>94.6%</div>}
          trendText="↑ 3.8%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 15, 45 28 T 85 8"
          sparklineColor="#2563eb"
        />

        <KpiCard
          title="Top Performing Branch"
          iconBg="#ecfdf5"
          iconColor="#10b981"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
              <path d="M12 2a6 6 0 0 1 6 6v1H6V8a6 6 0 0 1 6-6z" />
            </svg>
          }
          valueNode={
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              Whitefield
              <span style={{ color: '#10b981', fontSize: '15px', fontWeight: 700 }}>91%</span>
            </div>
          }
          trendText="↑ 6.2%"
          isTrendUp={true}
          sparklinePoints="M 5 30 Q 25 35, 45 20 T 85 5"
          sparklineColor="#10b981"
        />

        <KpiCard
          title="Lowest Performing Branch"
          iconBg="#fffbeb"
          iconColor="#f59e0b"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          }
          valueNode={
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              Yelahanka
              <span style={{ color: '#f59e0b', fontSize: '15px', fontWeight: 700 }}>85%</span>
            </div>
          }
          trendText="↓ 2.1%"
          isTrendUp={false}
          sparklinePoints="M 5 15 Q 25 22, 45 10 T 85 30"
          sparklineColor="#ef4444"
        />

        <KpiCard
          title="Avg Pass Percentage"
          iconBg="#f5f3ff"
          iconColor="#8b5cf6"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>91.2%</div>}
          trendText="↑ 2.9%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 22, 45 28 T 85 10"
          sparklineColor="#8b5cf6"
        />
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginTop: 4 }}>
        {/* Branch Performance Index */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif' }}>
            Branch Performance Index
            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600, cursor: 'pointer' }} title="Info">ⓘ</span>
          </h2>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0 24px 0', zIndex: 1, minHeight: '160px', justifyContent: 'center' }}>
            {/* Grid lines in background */}
            <div style={{ position: 'absolute', inset: '0 8px', display: 'flex', justifyContent: 'space-between', zIndex: 0, pointerEvents: 'none' }}>
              {[0, 25, 50, 75, 100].map((val) => (
                <div key={val} style={{ borderLeft: '1px dashed #f3f4f6', height: '100%', position: 'relative' }}>
                  <span style={{ position: 'absolute', bottom: -20, left: '0', transform: 'translateX(-50%)', fontSize: '10px', color: '#9ca3af', fontWeight: 600 }}>{val}%</span>
                </div>
              ))}
            </div>
            
            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>
                <span>Whitefield Branch</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 8, background: '#f3f4f6', borderRadius: 4 }}>
                  <div style={{ width: '91%', height: '100%', background: '#2563eb', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '3px 8px', borderRadius: '12px', minWidth: '32px', textAlign: 'center' }}>91%</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>
                <span>Koramangala Branch</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 8, background: '#f3f4f6', borderRadius: 4 }}>
                  <div style={{ width: '87%', height: '100%', background: '#2563eb', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '3px 8px', borderRadius: '12px', minWidth: '32px', textAlign: 'center' }}>87%</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>
                <span>Yelahanka Branch</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1, height: 8, background: '#f3f4f6', borderRadius: 4 }}>
                  <div style={{ width: '85%', height: '100%', background: '#f59e0b', borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b', background: '#fffbeb', padding: '3px 8px', borderRadius: '12px', minWidth: '32px', textAlign: 'center' }}>85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Performance Overview */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Subject Performance Overview
            </h2>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
              padding: '4px 8px', fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
            }}>
              <span>Performance Score</span>
              <span>▼</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'space-around', minHeight: '160px', flexWrap: 'wrap' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="120" height="120" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="26 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="24 100" strokeDashoffset="-26" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8b5cf6" strokeWidth="3.5" strokeDasharray="20 100" strokeDashoffset="-50" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="18 100" strokeDashoffset="-70" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#ec4899" strokeWidth="3.5" strokeDasharray="12 100" strokeDashoffset="-88" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>87%</div>
                <div style={{ fontSize: '9px', color: '#6b7280', fontWeight: 500, marginTop: 2 }}>Overall Avg</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', fontFamily: 'Inter, sans-serif', minWidth: '140px', flex: 1 }}>
              {[
                { label: 'Mathematics', val: '89%', color: '#2563eb' },
                { label: 'Science', val: '86%', color: '#10b981' },
                { label: 'English', val: '85%', color: '#8b5cf6' },
                { label: 'Social Studies', val: '83%', color: '#f59e0b' },
                { label: 'Others', val: '81%', color: '#ec4899' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ color: '#4b5563', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#111827', flexShrink: 0 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: 4 }}>
        {/* Academic Highlights */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif' }}>
            <span style={{ color: '#2563eb', display: 'flex', alignItems: 'center' }}>{getIconSvg('★', 16)}</span>
            Academic Highlights
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px', background: '#ecfdf5',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>12%</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, lineHeight: 1.3 }}>Improvement in average attendance vs last month</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px', background: '#eff6ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5-10 5-10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>245</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, lineHeight: 1.3 }}>Students improved their grades vs last month</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px', background: '#f5f3ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>98%</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, lineHeight: 1.3 }}>Homework submission rate across branches</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Recent Activities
            </h2>
            <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/org/audit-logs')}>
              View All
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            {[
              {
                text: 'Whitefield Branch submitted monthly academic report',
                time: '2 hours ago',
                color: '#2563eb',
                bg: '#eff6ff',
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                )
              },
              {
                text: 'Koramangala Branch conducted Unit Test - 2',
                time: '5 hours ago',
                color: '#2563eb',
                bg: '#eff6ff',
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                )
              },
              {
                text: 'Yelahanka Branch low attendance alert (Class 8B)',
                time: '1 day ago',
                color: '#f59e0b',
                bg: '#fffbeb',
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                )
              },
              {
                text: 'New admission of 42 students in Whitefield Branch',
                time: '2 days ago',
                color: '#2563eb',
                bg: '#eff6ff',
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                )
              },
              {
                text: 'PTM scheduled in Koramangala Branch',
                time: '3 days ago',
                color: '#ef4444',
                bg: '#fef2f2',
                svg: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: 0 }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '6px', background: item.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0
                }}>
                  {item.svg}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: '#1f2937', fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={item.text}>
                    {item.text}
                  </div>
                  <div style={{ fontSize: '9px', color: '#9ca3af', marginTop: 2 }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Comparison */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Branch Comparison
            </h2>
            <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/org/branches')}>
              View All
            </span>
          </div>

          <div style={{ overflowX: 'auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f3f4f6', color: '#6b7280', textAlign: 'left' }}>
                  <th style={{ padding: '8px 4px', fontWeight: 600 }}>Branch</th>
                  <th style={{ padding: '8px 4px', fontWeight: 600 }}>Attendance</th>
                  <th style={{ padding: '8px 4px', fontWeight: 600 }}>Pass %</th>
                  <th style={{ padding: '8px 4px', fontWeight: 600 }}>Exam Score</th>
                  <th style={{ padding: '8px 4px', fontWeight: 600, textAlign: 'center' }}>Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Whitefield', att: '95.6%', pass: '92.1%', exam: '89%', trendUp: true },
                  { name: 'Koramangala', att: '93.2%', pass: '90.3%', exam: '86%', trendUp: true },
                  { name: 'Yelahanka', att: '91.1%', pass: '85.0%', exam: '78%', trendUp: false },
                  { name: 'HSR Layout', att: '94.0%', pass: '91.4%', exam: '88%', trendUp: true },
                  { name: 'Indiranagar', att: '93.5%', pass: '90.2%', exam: '87%', trendUp: true },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f9fafb' }}>
                    <td style={{ padding: '8px 4px', fontWeight: 600, color: '#1f2937' }}>{row.name}</td>
                    <td style={{ padding: '8px 4px', color: '#4b5563' }}>{row.att}</td>
                    <td style={{ padding: '8px 4px', color: '#4b5563' }}>{row.pass}</td>
                    <td style={{ padding: '8px 4px', fontWeight: 600, color: '#111827' }}>{row.exam}</td>
                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                      {row.trendUp ? (
                        <span style={{ color: '#10b981', fontWeight: 700, fontSize: '13px' }}>↗</span>
                      ) : (
                        <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '13px' }}>↘</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Filters & Export Report row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {/* Calendar Select */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
            padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>This Month (Jul 1 - Jul 15, 2026)</span>
            <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
          </div>

          {/* Branch Select */}
          <div style={{
            background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px',
            padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: '13px', color: '#1f2937', fontWeight: 600, cursor: 'pointer'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>All Branches</span>
            <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 4 }}>▼</span>
          </div>
        </div>

        {/* Export Button */}
        <button style={{
          background: '#ffffff', border: '1px solid #2563eb', borderRadius: '8px',
          padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export Report
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KpiCard
          title="CONSOLIDATED REVENUE"
          iconBg="#eff6ff"
          iconColor="#2563eb"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <line x1="12" y1="10" x2="12" y2="10.01" />
              <line x1="2" y1="14" x2="22" y2="14" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>₹1.45 Cr</div>}
          trendText="↑ 12.4%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 15, 45 28 T 85 8"
          sparklineColor="#2563eb"
        />

        <KpiCard
          title="PENDING COLLECTIONS"
          iconBg="#ecfdf5"
          iconColor="#10b981"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>₹12.4 Lakhs</div>}
          trendText="↑ 8.6%"
          isTrendUp={true}
          sparklinePoints="M 5 30 Q 25 35, 45 20 T 85 5"
          sparklineColor="#10b981"
        />

        <KpiCard
          title="MONTHLY EXPENSES"
          iconBg="#f5f3ff"
          iconColor="#8b5cf6"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>₹1.17 Cr</div>}
          trendText="↓ 5.3%"
          isTrendUp={false}
          sparklinePoints="M 5 15 Q 25 22, 45 10 T 85 30"
          sparklineColor="#8b5cf6"
        />

        <KpiCard
          title="NET PROFIT MARGIN"
          iconBg="#fffbeb"
          iconColor="#f59e0b"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>19.3%</div>}
          trendText="↑ 3.7%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 22, 45 28 T 85 10"
          sparklineColor="#f59e0b"
        />
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginTop: 4 }}>
        {/* Revenue Share by Branch */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Revenue Share by Branch
            </h2>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
              padding: '4px 8px', fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
            }}>
              <span>Amount (₹)</span>
              <span>▼</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'space-around', minHeight: '180px', flexWrap: 'wrap' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="120" height="120" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="58 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="29 100" strokeDashoffset="-58" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="13 100" strokeDashoffset="-87" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>₹1.45 Cr</div>
                <div style={{ fontSize: '9px', color: '#6b7280', fontWeight: 500, marginTop: 2 }}>Total Revenue</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', fontFamily: 'Inter, sans-serif', minWidth: '160px', flex: 1 }}>
              {[
                { label: 'Koramangala Branch', val: '58%', amt: '₹85,00,000', color: '#2563eb' },
                { label: 'Whitefield Branch', val: '29%', amt: '₹42,00,000', color: '#10b981' },
                { label: 'Yelahanka Branch', val: '13%', amt: '₹18,00,000', color: '#f59e0b' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ color: '#4b5563', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontWeight: 600, color: '#4b5563' }}>{item.val}</span>
                    <span style={{ fontWeight: 700, color: '#111827' }}>{item.amt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'center', marginTop: 12, fontWeight: 500 }}>Total 3 Branches</div>
        </div>

        {/* Revenue Trend (Last 6 Months) */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Revenue Trend (Last 6 Months)
            </h2>
            <div style={{
              background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px',
              padding: '4px 8px', fontSize: '13px', color: '#4b5563', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4
            }}>
              <span>Monthly</span>
              <span>▼</span>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '180px', position: 'relative' }}>
            {/* Custom SVG Line Chart */}
            <svg width="100%" height="180" viewBox="0 0 460 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="50" y1="10" x2="440" y2="10" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="50" y1="45" x2="440" y2="45" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="50" y1="80" x2="440" y2="80" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="50" y1="115" x2="440" y2="115" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="50" y1="150" x2="440" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3 3" />

              {/* Grid Labels (Y-Axis) */}
              <text x="15" y="14" fill="#9ca3af" fontSize="10" fontWeight="600">₹2.0 Cr</text>
              <text x="15" y="49" fill="#9ca3af" fontSize="10" fontWeight="600">₹1.5 Cr</text>
              <text x="15" y="84" fill="#9ca3af" fontSize="10" fontWeight="600">₹1.0 Cr</text>
              <text x="15" y="119" fill="#9ca3af" fontSize="10" fontWeight="600">₹50 L</text>
              <text x="15" y="154" fill="#9ca3af" fontSize="10" fontWeight="600">₹0</text>

              {/* Chart Line Paths */}
              <path d="M 75 105 C 110 95, 110 90, 145 90 C 180 90, 180 115, 215 115 C 250 115, 250 80, 285 80 C 320 80, 320 70, 355 70 C 390 70, 390 45, 425 45 L 425 150 L 75 150 Z" fill="url(#chartGradient)" />
              <path d="M 75 105 C 110 95, 110 90, 145 90 C 180 90, 180 115, 215 115 C 250 115, 250 80, 285 80 C 320 80, 320 70, 355 70 C 390 70, 390 45, 425 45" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />

              {/* Connection dots */}
              <circle cx="75" cy="105" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="145" cy="90" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="215" cy="115" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="285" cy="80" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="355" cy="70" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <circle cx="425" cy="45" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />

              {/* Labels (X-Axis) */}
              <text x="60" y="170" fill="#9ca3af" fontSize="9" fontWeight="600">Feb 2026</text>
              <text x="130" y="170" fill="#9ca3af" fontSize="9" fontWeight="600">Mar 2026</text>
              <text x="200" y="170" fill="#9ca3af" fontSize="9" fontWeight="600">Apr 2026</text>
              <text x="270" y="170" fill="#9ca3af" fontSize="9" fontWeight="600">May 2026</text>
              <text x="340" y="170" fill="#9ca3af" fontSize="9" fontWeight="600">Jun 2026</text>
              <text x="410" y="170" fill="#9ca3af" fontSize="9" fontWeight="600">Jul 2026</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: 4 }}>
        {/* Expense Breakdown */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif' }}>
            Expense Breakdown
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'space-around', flexWrap: 'wrap', minHeight: '150px' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="100" height="100" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="45 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="22 100" strokeDashoffset="-45" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="15 100" strokeDashoffset="-67" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8b5cf6" strokeWidth="3.5" strokeDasharray="18 100" strokeDashoffset="-82" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>₹1.17 Cr</div>
                <div style={{ fontSize: '8px', color: '#6b7280', fontWeight: 500, marginTop: 1 }}>Total Expense</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10px', fontFamily: 'Inter, sans-serif', minWidth: '130px', flex: 1 }}>
              {[
                { label: 'Salaries', val: '45%', amt: '₹52,65,000', color: '#2563eb' },
                { label: 'Operations', val: '22%', amt: '₹25,74,000', color: '#10b981' },
                { label: 'Infrastructure', val: '15%', amt: '₹17,55,000', color: '#f59e0b' },
                { label: 'Other Expenses', val: '18%', amt: '₹20,88,000', color: '#8b5cf6' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ color: '#4b5563', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 600, color: '#4b5563' }}>{item.val}</span>
                    <span style={{ fontWeight: 700, color: '#111827' }}>{item.amt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6b7280', fontWeight: 500 }}>
            <span>Compared to last month</span>
            <span style={{ color: '#ef4444', fontWeight: 700 }}>↓ 5.3%</span>
          </div>
        </div>

        {/* Collection Efficiency */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif' }}>
            Collection Efficiency
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: '140px' }}>
            {/* SVG Semi-Circle Gauge */}
            <div style={{ position: 'relative', width: 120, height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <svg width="120" height="60" viewBox="0 0 36 18">
                {/* Background arc */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f3f4f6" strokeWidth="3.2" strokeDasharray="50 100" transform="rotate(-180 18 18)" strokeLinecap="round" />
                {/* Colored arc: 89% of 50 = 44.5 */}
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3.2" strokeDasharray="44.5 100" transform="rotate(-180 18 18)" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', bottom: 0, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>89%</div>
                <div style={{ fontSize: '8px', color: '#6b7280', fontWeight: 600, marginTop: 4 }}>Efficiency Score</div>
              </div>
            </div>

            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, marginTop: 12 }}>
              ↑ 6.8% <span style={{ color: '#9ca3af', fontWeight: 500 }}>vs last month</span>
            </span>
          </div>

          <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 12, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6b7280', fontWeight: 600 }}>
              <span>Collected ₹1.32 Cr of ₹1.48 Cr</span>
            </div>
            <div style={{ height: 6, background: '#f3f4f6', borderRadius: 3 }}>
              <div style={{ width: '89%', height: '100%', background: '#10b981', borderRadius: 3 }} />
            </div>
          </div>
        </div>

        {/* Top Outstanding Branches */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Top Outstanding Branches
            </h2>
            <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/org/branches')}>
              View All
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'center' }}>
            {[
              {
                name: 'Koramangala Branch',
                amt: '₹4.2 Lakhs',
                pct: '35%',
                width: '35%',
                color: '#ef4444',
                bg: '#fef2f2',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                  </svg>
                )
              },
              {
                name: 'Whitefield Branch',
                amt: '₹2.8 Lakhs',
                pct: '23%',
                width: '23%',
                color: '#f59e0b',
                bg: '#ecfdf5',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="12" y1="10" x2="12" y2="10.01" />
                  </svg>
                )
              },
              {
                name: 'Yelahanka Branch',
                amt: '₹1.6 Lakhs',
                pct: '13%',
                width: '13%',
                color: '#f59e0b',
                bg: '#fffbeb',
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: 0 }}>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '6px', background: item.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: '#4b5563', marginBottom: 4 }}>
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.name}</span>
                    <span style={{ color: '#111827' }}>{item.amt} <span style={{ color: '#9ca3af', fontWeight: 500 }}>({item.pct})</span></span>
                  </div>
                  <div style={{ height: 5, background: '#f3f4f6', borderRadius: 2.5 }}>
                    <div style={{ width: item.width, height: '100%', background: item.color, borderRadius: 2.5 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Insights Banner */}
      <div style={{
        background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '12px',
        padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14, boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 700, fontSize: '13px' }}>
            {getIconSvg('✨', 14)}
            <span>Financial Insights</span>
          </div>
          <button style={{
            background: '#ffffff', border: '1px solid #2563eb', borderRadius: '6px',
            padding: '6px 12px', fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer'
          }} onClick={() => alert('Opening Financial Insights Console')}>
            View Detailed Report →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center' }}>{getIconSvg('▲', 14)}</span>
            <div style={{ fontSize: '13px', lineHeight: 1.3 }}>
              <span style={{ fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>Revenue is up by 12.4%</span>
              <span style={{ color: '#6b7280' }}>Great job! You're performing better than last month.</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center' }}>{getIconSvg('⚠️', 14)}</span>
            <div style={{ fontSize: '13px', lineHeight: 1.3 }}>
              <span style={{ fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>Pending collections need attention</span>
              <span style={{ color: '#6b7280' }}>₹12.4 Lakhs still pending. Follow up recommended.</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: '#8b5cf6', display: 'flex', alignItems: 'center' }}>{getIconSvg('★', 14)}</span>
            <div style={{ fontSize: '13px', lineHeight: 1.3 }}>
              <span style={{ fontWeight: 700, color: '#1f2937', display: 'block', marginBottom: 2 }}>Profit margin improved</span>
              <span style={{ color: '#6b7280' }}>Net profit margin increased to 19.3% this month.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHr = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <KpiCard
          title="TOTAL GROUP EMPLOYEES"
          iconBg="#f5f3ff"
          iconColor="#8b5cf6"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>300</div>}
          trendText="↑ 4.2%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 15, 45 28 T 85 8"
          sparklineColor="#8b5cf6"
        />

        <KpiCard
          title="TEACHING FACULTY"
          iconBg="#ecfdf5"
          iconColor="#10b981"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>180</div>}
          trendText="↑ 3.6%"
          isTrendUp={true}
          sparklinePoints="M 5 30 Q 25 35, 45 20 T 85 5"
          sparklineColor="#10b981"
        />

        <KpiCard
          title="NON-TEACHING / ADMIN"
          iconBg="#fffbeb"
          iconColor="#f59e0b"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>120</div>}
          trendText="↓ 2.1%"
          isTrendUp={false}
          sparklinePoints="M 5 15 Q 25 22, 45 10 T 85 30"
          sparklineColor="#f59e0b"
        />

        <KpiCard
          title="GROUP RESIGNATIONS (MTD)"
          iconBg="#eff6ff"
          iconColor="#2563eb"
          iconSvg={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a3 3 0 1 0-3-3" />
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M10 19v-6h4v6" />
              <path d="M14 8a4 4 0 1 0-8 0v11h8V8z" />
            </svg>
          }
          valueNode={<div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginTop: 4 }}>2</div>}
          trendText="↓ 33.3%"
          isTrendUp={true}
          sparklinePoints="M 5 32 Q 25 22, 45 28 T 85 10"
          sparklineColor="#2563eb"
        />
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: 4 }}>
        {/* Staff Distribution */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif' }}>
            Staff Distribution
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'space-around', minHeight: '150px', flexWrap: 'wrap' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="100" height="100" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8b5cf6" strokeWidth="3.5" strokeDasharray="60 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="40 100" strokeDashoffset="-60" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>300</div>
                <div style={{ fontSize: '8px', color: '#6b7280', fontWeight: 500, marginTop: 1 }}>Total Employees</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10px', fontFamily: 'Inter, sans-serif', minWidth: '130px', flex: 1 }}>
              {[
                { label: 'Teaching Faculty', val: '180 (60%)', color: '#8b5cf6' },
                { label: 'Non-Teaching/Admin', val: '120 (40%)', color: '#10b981' },
                { label: 'Support Staff', val: '0 (0%)', color: '#f59e0b' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ color: '#4b5563', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#111827', flexShrink: 0 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'left', marginTop: 12, fontWeight: 500 }}>
            ⓘ Total active staff across all branches
          </div>
        </div>

        {/* Gender Distribution */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: '0 0 20px 0', fontFamily: 'Inter, sans-serif' }}>
            Gender Distribution
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'space-around', minHeight: '150px', flexWrap: 'wrap' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="100" height="100" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="56 100" strokeDashoffset="0" />
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#ec4899" strokeWidth="3.5" strokeDasharray="44 100" strokeDashoffset="-56" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>300</div>
                <div style={{ fontSize: '8px', color: '#6b7280', fontWeight: 500, marginTop: 1 }}>Total Employees</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10px', fontFamily: 'Inter, sans-serif', minWidth: '130px', flex: 1 }}>
              {[
                { label: 'Male', val: '168 (56%)', color: '#2563eb' },
                { label: 'Female', val: '132 (44%)', color: '#ec4899' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ color: '#4b5563', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#111827', flexShrink: 0 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'left', marginTop: 12, fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>ⓘ Promoting diversity and inclusion</span>
            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>{getIconSvg('⟳', 12)}</span>
          </div>
        </div>

        {/* Average Experience */}
        <div style={{
          background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
          padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
              Average Experience
            </h2>
            <div style={{ color: '#9ca3af', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '130px' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#111827', fontFamily: 'Inter, sans-serif' }}>
              6.2 <span style={{ fontSize: '16px', fontWeight: 600, color: '#6b7280' }}>Years</span>
            </div>
            <div style={{ fontSize: '13px', color: '#10b981', fontWeight: 700, marginTop: 4 }}>
              ↑ 0.8 <span style={{ color: '#9ca3af', fontWeight: 500 }}>vs last month</span>
            </div>
          </div>

          {/* Range Slider Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
            <div style={{ position: 'relative', height: 6, background: 'linear-gradient(to right, #8b5cf6, #3b82f6, #60a5fa)', borderRadius: 3 }}>
              {/* Point at 6.2 / 15 years (~41.3% of width) */}
              <div style={{
                position: 'absolute', top: -4, left: '41.3%', width: 14, height: 14,
                borderRadius: '50%', background: '#3b82f6', border: '2.5px solid #ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer'
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#9ca3af', fontWeight: 600, marginTop: 10 }}>
              <span>0 Yrs</span>
              <span>5 Yrs</span>
              <span>10 Yrs</span>
              <span>15+ Yrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Leave Requests */}
      <div style={{
        background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px',
        padding: '24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', marginTop: 4
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{
            fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span style={{ width: '4px', height: '14px', background: '#8b5cf6', borderRadius: '2px', display: 'inline-block' }} />
            Active Leave Requests
          </h2>
          <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} onClick={() => navigate('/org/audit-logs')}>
            View All Requests →
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f3f4f6', color: '#6b7280', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>EMPLOYEE</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>BRANCH</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>DURATION</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>REASON</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>STATUS</th>
                <th style={{ padding: '10px 12px', fontWeight: 600 }}>REQUESTED ON</th>
                <th style={{ padding: '10px 12px', width: '30px' }}></th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr style={{ borderBottom: '1px solid #f9fafb' }}>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', background: '#f3e8ff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', fontWeight: 700, fontSize: '13px'
                    }}>
                      KJ
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '12px' }}>Mrs. Kavita Joshi</div>
                      <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 2 }}>High School Teacher</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 12px', color: '#4b5563', fontWeight: 500 }}>Yelahanka Branch</td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>Jul 18 - Jul 20, 2026</div>
                      <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 1 }}>3 Days</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4b5563', fontWeight: 500 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Personal
                  </div>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <span style={{
                    background: '#fff7ed', color: '#ea580c', padding: '4px 10px', borderRadius: '12px',
                    fontWeight: 700, fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: 4
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ea580c' }} />
                    Pending
                  </span>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#1f2937' }}>Jul 15, 2026</div>
                  <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 1 }}>10:30 AM</div>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <button style={{
                    background: '#ffffff', border: '1px solid #e5e7eb', width: 26, height: 26, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', cursor: 'pointer'
                  }}>
                    &gt;
                  </button>
                </td>
              </tr>

              {/* Row 2 */}
              <tr style={{ borderBottom: '1px solid #f9fafb' }}>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%', background: '#dcfce7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontWeight: 700, fontSize: '13px'
                    }}>
                      AK
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '12px' }}>Mr. Ali Khan</div>
                      <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 2 }}>Social Studies Faculty</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 12px', color: '#4b5563', fontWeight: 500 }}>Koramangala Branch</td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                    </svg>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>Jul 22 - Jul 25, 2026</div>
                      <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 1 }}>4 Days</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4b5563', fontWeight: 500 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    Medical
                  </div>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <span style={{
                    background: '#f0fdf4', color: '#16a34a', padding: '4px 10px', borderRadius: '12px',
                    fontWeight: 700, fontSize: '10px', display: 'inline-flex', alignItems: 'center', gap: 4
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />
                    Approved
                  </span>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <div style={{ fontWeight: 600, color: '#1f2937' }}>Jul 14, 2026</div>
                  <div style={{ color: '#9ca3af', fontSize: '10px', marginTop: 1 }}>04:45 PM</div>
                </td>
                <td style={{ padding: '12px 12px' }}>
                  <button style={{
                    background: '#ffffff', border: '1px solid #e5e7eb', width: 26, height: 26, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', cursor: 'pointer'
                  }}>
                    &gt;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: '13px', color: '#9ca3af', textAlign: 'center', marginTop: 16, fontWeight: 500 }}>
          Showing 2 of 2 active requests
        </div>
      </div>
    </div>
  );

  const getHeaderDetails = () => {
    switch (type) {
      case 'financial':
        return {
          title: 'Financial Analytics',
          subtitle: 'Consolidated financial insights and branch performance comparison.',
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <line x1="12" y1="10" x2="12" y2="10.01" />
              <line x1="2" y1="14" x2="22" y2="14" />
            </svg>
          ),
          iconBg: '#eff6ff',
          iconColor: '#2563eb'
        };
      case 'hr':
        return {
          title: 'HR Analytics',
          subtitle: 'Consolidated staff indicators and leave requests',
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
          iconBg: '#f5f3ff',
          iconColor: '#8b5cf6'
        };
      case 'academic':
      default:
        return {
          title: 'Academic Analytics',
          subtitle: 'Track academic performance across all branches',
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          ),
          iconBg: '#eff6ff',
          iconColor: '#2563eb'
        };
    }
  };

  const header = getHeaderDetails();

  return (
    <div style={{ padding: '8px 0 24px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Header Icon */}
          <div style={{
            width: '40px', height: '40px', borderRadius: '8px', background: header.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: header.iconColor, flexShrink: 0
          }}>
            {header.icon}
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
              {header.title}
            </h1>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: 2, margin: 0, fontFamily: 'Inter, sans-serif' }}>
              {header.subtitle}
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => navigate('/org/analytics/academic')}
            style={getActiveTabStyle(type === 'academic')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5-10 5-10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
            Academic
          </button>
          <button
            onClick={() => navigate('/org/analytics/financial')}
            style={getActiveTabStyle(type === 'financial')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
            Financial
          </button>
          <button
            onClick={() => navigate('/org/analytics/hr')}
            style={getActiveTabStyle(type === 'hr')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            HR Staff
          </button>
        </div>
      </div>

      {type === 'academic' && renderAcademic()}
      {type === 'financial' && renderFinancial()}
      {type === 'hr' && renderHr()}
    </div>
  );
}
