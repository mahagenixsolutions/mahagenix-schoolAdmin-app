import type { FinancialData } from '../types';

interface Props {
  data: FinancialData;
}

export default function FinancialSummary({ data }: Props) {
  const cards = [
    { label: 'Total Revenue (Income)', val: `₹${(data.income / 100000).toFixed(1)}L`, icon: '📈', desc: 'All billing collected', color: '#10b981', bg: '#f0fdf4' },
    { label: 'Total Operations Expense', val: `₹${(data.expense / 100000).toFixed(1)}L`, icon: '📉', desc: 'Salaries & overheads', color: '#ef4444', bg: '#fef2f2' },
    { label: 'Net Profit Margin', val: `₹${(data.profit / 100000).toFixed(1)}L`, icon: '💰', desc: 'Positive cashflow surplus', color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Fee Collection This Month', val: `₹${(data.collectedThisMonth / 100000).toFixed(1)}L`, icon: '📊', desc: 'July fee billing cycle', color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Pending / Outstanding Fees', val: `₹${(data.pendingFees / 100000).toFixed(1)}L`, icon: '⏳', desc: 'Active collection cycle', color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Outstanding Students', val: `${data.outstandingStudents} Students`, icon: '👥', desc: 'Defaulters notices sent', color: '#ef4444', bg: '#fff5f5' }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h3 style={{ margin: '0 0 18px 0', fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
        Finance & Fee Collection Summary
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: card.bg,
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <div style={{
              fontSize: '22px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              flexShrink: 0
            }}>
              {card.icon}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {card.label}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '2px', letterSpacing: '-0.02em' }}>
                {card.val}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontWeight: 500 }}>
                {card.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
