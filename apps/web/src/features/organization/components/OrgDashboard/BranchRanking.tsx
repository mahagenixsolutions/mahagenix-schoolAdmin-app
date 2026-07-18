import type { BranchRank } from '../../mock/rankings';

interface RankingProps {
  rankings: BranchRank[];
  onCompare: (id1: string, id2: string) => void;
}

export default function BranchRanking({ rankings, onCompare }: RankingProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        fontFamily: 'Inter, sans-serif',
        overflowX: 'auto'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '3px', height: '14px', background: 'var(--color-primary)', borderRadius: '1px' }} />
            Branch Performance Ranking Matrix
          </h3>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            Quality Index, Growth Ratio, and Financial collections side-by-side
          </p>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '700px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', textAlign: 'left' }}>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Rank</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Branch Name</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Health Score</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Attendance</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Revenue</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Pass Rate</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Growth</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Staff Sat.</th>
            <th style={{ padding: '12px 10px', fontWeight: 700 }}>Board/City</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((b) => (
            <tr
              key={b.id}
              style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ padding: '14px 10px', fontWeight: 800 }}>
                {b.rank === 1 ? '🥇' : b.rank === 2 ? '🥈' : b.rank === 3 ? '🥉' : b.rank}
              </td>
              <td style={{ padding: '14px 10px', fontWeight: 700, color: '#1e293b' }}>{b.name}</td>
              <td style={{ padding: '14px 10px' }}>
                <span
                  style={{
                    color: b.healthScore >= 90 ? '#10b981' : '#f59e0b',
                    fontWeight: 700,
                    background: b.healthScore >= 90 ? '#ecfdf5' : '#fffbeb',
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}
                >
                  {b.healthScore}%
                </span>
              </td>
              <td style={{ padding: '14px 10px', color: '#334155', fontWeight: 500 }}>{b.attendanceRate}%</td>
              <td style={{ padding: '14px 10px', color: '#059669', fontWeight: 600 }}>
                ₹{(b.revenue / 100000).toFixed(1)}L
              </td>
              <td style={{ padding: '14px 10px', color: '#2563eb', fontWeight: 600 }}>{b.examPassRate}%</td>
              <td style={{ padding: '14px 10px', color: '#4f46e5', fontWeight: 600 }}>+{b.studentGrowth}%</td>
              <td style={{ padding: '14px 10px', color: '#0891b2', fontWeight: 600 }}>{b.staffSatisfaction}%</td>
              <td style={{ padding: '14px 10px', color: '#64748b' }}>
                {b.board} · {b.city}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
