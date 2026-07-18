import { useState } from 'react';
import { mockBranchDetails } from '../mockData';
import type { CompleteBranchData } from '../mockData';

interface Props {
  currentBranch: CompleteBranchData;
}

export default function BranchComparison({ currentBranch }: Props) {
  // Get other branches for the select dropdown
  const otherBranches = Object.values(mockBranchDetails).filter(b => b.id !== currentBranch.id);
  const [compareId, setCompareId] = useState<string>(otherBranches[0]?.id || '');

  const compareBranch = mockBranchDetails[compareId];

  if (!compareBranch) {
    return null;
  }

  const metrics = [
    { label: 'Overall Rank', current: '#2', target: '#4', currentText: 'Rank 2', targetText: 'Rank 4', isBetter: true },
    { label: 'Attendance Rate', current: 94.2, target: compareBranch.health.attendance, suffix: '%', isBetter: 94.2 > compareBranch.health.attendance },
    { label: 'Financial Revenue', current: 85, target: parseFloat(compareBranch.revenue.replace(/[^0-9]/g, '')), prefix: '₹', suffix: 'L', isBetter: 85 > parseFloat(compareBranch.revenue.replace(/[^0-9]/g, '')) },
    { label: 'Exam Performance', current: 87, target: compareBranch.healthScore, suffix: '%', isBetter: 87 > compareBranch.healthScore },
    { label: 'Syllabus Coverage', current: 84, target: compareBranch.academics.homeworkCompletion, suffix: '%', isBetter: 84 > compareBranch.academics.homeworkCompletion },
    { label: 'Staff Retention Index', current: 96, target: compareBranch.health.staff, suffix: '%', isBetter: 96 > compareBranch.health.staff }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
          Branch Benchmark Comparison
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Compare against:</span>
          <select
            value={compareId}
            onChange={(e) => setCompareId(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '12px',
              fontWeight: 600,
              color: '#334155',
              background: '#ffffff',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {otherBranches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Table Headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <div>METRIC</div>
          <div style={{ color: '#2563eb' }}>{currentBranch.name}</div>
          <div style={{ color: '#475569' }}>{compareBranch.name}</div>
        </div>

        {/* Rows */}
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 1fr',
              alignItems: 'center',
              fontSize: '13px',
              fontWeight: 500,
              color: '#334155',
              padding: '8px 0',
              borderBottom: idx === metrics.length - 1 ? 'none' : '1px solid #f1f5f9'
            }}
          >
            <div style={{ fontWeight: 600, color: '#0f172a' }}>{m.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: m.isBetter ? '#10b981' : '#475569' }}>
              <span>{m.prefix}{m.current}{m.suffix || m.currentText}</span>
              {m.isBetter && <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#10b981', padding: '1px 4px', borderRadius: '4px', fontWeight: 700 }}>BETTER</span>}
            </div>
            <div style={{ color: !m.isBetter && typeof m.current === 'number' ? '#10b981' : '#64748b' }}>
              <span>{m.prefix}{m.target}{m.suffix || m.targetText}</span>
              {!m.isBetter && typeof m.current === 'number' && <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#10b981', padding: '1px 4px', borderRadius: '4px', fontWeight: 700, marginLeft: '6px' }}>BETTER</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
