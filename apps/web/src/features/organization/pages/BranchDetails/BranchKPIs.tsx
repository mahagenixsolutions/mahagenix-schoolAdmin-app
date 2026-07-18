import type { CompleteBranchData } from './mockData';

interface Props {
  branch: CompleteBranchData;
}

export default function BranchKPIs({ branch }: Props) {
  // Helper for trend display
  const renderTrend = (value: string, isNegative = false) => (
    <span style={{
      fontSize: '11px',
      fontWeight: 700,
      color: isNegative ? '#ef4444' : '#10b981',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px'
    }}>
      {isNegative ? '↓' : '↑'} {value}
    </span>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Panel 1: Personnel & Strength */}
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
        <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Personnel & Enrollment
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Students</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.students.total}
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('8.3% MoM')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Teachers</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.teachers.total}
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('4.2% MoM')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Parents</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.students.total - 148} {/* Mock parent count */}
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('9.1% MoM')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Staff</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.infrastructure.buses + branch.teachers.total + 3} {/* Mock Staff count */}
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('2.5% MoM')}
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Financial Health */}
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
        <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Financial Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Revenue</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#10b981', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.revenue}
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('12.5% vs target')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Expenses</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#ef4444', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.expense}
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('2.8% decrease', true)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Net Profit</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#3b82f6', letterSpacing: '-0.02em', marginTop: '2px' }}>
              ₹16.8L
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('15.2% margins')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Pending Fees</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.02em', marginTop: '2px' }}>
              ₹4.2L
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('5.1% total fees', true)}
            </div>
          </div>
        </div>
      </div>

      {/* Panel 3: Academics & Operations */}
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
        <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Quality & Operations
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Attendance</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#2563eb', letterSpacing: '-0.02em', marginTop: '2px' }}>
              94.2%
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('1.2% this week')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Avg. Exam Score</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.academics.averageGrade} ({branch.healthScore}%)
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('3.4% vs state')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Classes / Sections</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: '2px' }}>
              38 / 92
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('2 new sections')}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Health Index</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#a855f7', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {branch.health.overall}%
            </div>
            <div style={{ marginTop: '4px' }}>
              {renderTrend('5.3% vs Q1')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
