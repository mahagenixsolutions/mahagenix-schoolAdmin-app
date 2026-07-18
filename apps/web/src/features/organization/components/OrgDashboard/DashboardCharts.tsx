import { useState } from 'react';

interface ChartsProps {
  financialData: any;
  academicData: any;
}

type Period = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

export default function DashboardCharts({ financialData, academicData }: ChartsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('Monthly');
  const [activeChart, setActiveChart] = useState<'finance' | 'attendance' | 'growth'>('finance');

  const periods: Period[] = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  // Custom SVG line chart coordinates generator

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderBottom: '1px solid #f3f4f6',
          paddingBottom: '16px',
          marginBottom: '20px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: 'var(--color-primary)', borderRadius: '1px' }} />
            Executive Trends & Analytics
          </h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            Interactive charts mapped over period aggregates
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '8px', padding: '2px' }}>
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              style={{
                background: selectedPeriod === p ? '#ffffff' : 'transparent',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: 700,
                color: selectedPeriod === p ? '#1f2937' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Category Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {[
          { key: 'finance' as const, label: 'Revenue vs Expense', color: '#10b981' },
          { key: 'attendance' as const, label: 'Attendance Ratio', color: '#3b82f6' },
          { key: 'growth' as const, label: 'Student Admissions Growth', color: '#8b5cf6' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveChart(tab.key)}
            style={{
              background: activeChart === tab.key ? '#fafbfe' : 'transparent',
              border: '1px solid',
              borderColor: activeChart === tab.key ? '#cbd5e1' : '#e5e7eb',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              color: activeChart === tab.key ? '#1f2937' : '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: tab.color }} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* SVG Canvas Area */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #f1f5f9',
          borderRadius: '12px',
          padding: '24px',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {activeChart === 'finance' && (
          <div style={{ width: '100%' }}>
            {/* Grid Line Visualizers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginBottom: '8px' }}>
              <span>₹100L (Budget target limit)</span>
              <span>₹50L</span>
              <span>₹0L</span>
            </div>
            {/* Custom SVG Bar Grid */}
            <svg width="100%" height="150" viewBox="0 0 400 150" style={{ overflow: 'visible' }}>
              <rect x="0" y="0" width="400" height="150" fill="none" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="0.5" />
              {/* Bars representing Revenue (Green) and Expense (Red) */}
              {[
                { label: 'Jan', rev: 110, exp: 90 },
                { label: 'Feb', rev: 120, exp: 95 },
                { label: 'Mar', rev: 130, exp: 100 },
                { label: 'Apr', rev: 115, exp: 92 },
                { label: 'May', rev: 125, exp: 98 },
                { label: 'Jun', rev: 135, exp: 105 }
              ].map((d, i) => {
                const xBase = 30 + i * 60;
                const revHeight = d.rev;
                const expHeight = d.exp;
                return (
                  <g key={i}>
                    {/* Revenue Bar */}
                    <rect x={xBase} y={150 - revHeight} width="16" height={revHeight} fill="url(#revGrad)" rx="2" />
                    {/* Expense Bar */}
                    <rect x={xBase + 20} y={150 - expHeight} width="16" height={expHeight} fill="url(#expGrad)" rx="2" />
                    {/* Labels */}
                    <text x={xBase + 18} y="165" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">{d.label}</text>
                  </g>
                );
              })}
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ display: 'flex', gap: '16px', marginTop: '28px', fontSize: '11px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontWeight: 600 }}>
                <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '3px' }} />
                Collected Revenue
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontWeight: 600 }}>
                <span style={{ width: '12px', height: '12px', background: '#f87171', borderRadius: '3px' }} />
                Disbursed Expenses
              </div>
            </div>
          </div>
        )}

        {activeChart === 'attendance' && (
          <div style={{ width: '100%' }}>
            <svg width="100%" height="150" viewBox="0 0 400 150" style={{ overflow: 'visible' }}>
              <rect x="0" y="0" width="400" height="150" fill="none" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="0.5" />
              {/* Path line representing attendance trend */}
              <path
                d={`M 30,${150 - 110} L 90,${150 - 115} L 150,${150 - 125} L 210,${150 - 112} L 270,${150 - 128} L 330,${150 - 138}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Points */}
              {[110, 115, 125, 112, 128, 138].map((yVal, i) => (
                <circle key={i} cx={30 + i * 60} cy={150 - yVal} r="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
              ))}
              {/* Labels */}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                <text key={i} x={30 + i * 60} y="165" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">{month}</text>
              ))}
            </svg>
            <div style={{ display: 'flex', gap: '16px', marginTop: '28px', fontSize: '11px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontWeight: 600 }}>
                <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '3px' }} />
                Overall Attendance Average (94.6%)
              </div>
            </div>
          </div>
        )}

        {activeChart === 'growth' && (
          <div style={{ width: '100%' }}>
            <svg width="100%" height="150" viewBox="0 0 400 150" style={{ overflow: 'visible' }}>
              <rect x="0" y="0" width="400" height="150" fill="none" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="0.5" />
              <path
                d={`M 30,${150 - 60} L 90,${150 - 75} L 150,${150 - 90} L 210,${150 - 115} L 270,${150 - 130} L 330,${150 - 142}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {[60, 75, 90, 115, 130, 142].map((yVal, i) => (
                <circle key={i} cx={30 + i * 60} cy={150 - yVal} r="5" fill="#ffffff" stroke="#8b5cf6" strokeWidth="3" />
              ))}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                <text key={i} x={30 + i * 60} y="165" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">{month}</text>
              ))}
            </svg>
            <div style={{ display: 'flex', gap: '16px', marginTop: '28px', fontSize: '11px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontWeight: 600 }}>
                <span style={{ width: '12px', height: '12px', background: '#8b5cf6', borderRadius: '3px' }} />
                Admissions Year-over-Year (+8.5% Growth Rate)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
