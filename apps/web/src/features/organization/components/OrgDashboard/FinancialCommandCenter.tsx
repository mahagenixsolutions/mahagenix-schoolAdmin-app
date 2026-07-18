import { mockBranchRevenue } from '../../mock/financial';

interface FinancialProps {
  financialData: any;
}

export default function FinancialCommandCenter({ financialData }: FinancialProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1f2937', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '3px', height: '14px', background: '#10b981', borderRadius: '1px' }} />
          Financial Budget Allocation & Outlays
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {[
            { label: 'Staff Salary Expenses', val: `₹${(financialData.salaryExpenses / 100000).toFixed(1)}L`, color: '#3b82f6', desc: '58% of budget' },
            { label: 'Administrative Overhead', val: `₹${(financialData.operationalCost / 100000).toFixed(1)}L`, color: '#ef4444', desc: '24% of budget' },
            { label: 'Transport Fleet Outlay', val: `₹${(financialData.transportCost / 100000).toFixed(1)}L`, color: '#f59e0b', desc: '12% of budget' },
            { label: 'Fee Collection Rate', val: `${financialData.collectionRate}%`, color: '#10b981', desc: 'On Target' }
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#fafbfe', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>{item.val}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Detailed branch collection table */}
        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#334155', margin: '0 0 12px 0' }}>
          Branch-Wise Fee Collection Audit
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b' }}>
                <th style={{ padding: '10px', fontWeight: 700 }}>Branch Name</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Total Revenue Target</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Collected Amount</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Pending Collections</th>
                <th style={{ padding: '10px', fontWeight: 700 }}>Completion Ratio</th>
              </tr>
            </thead>
            <tbody>
              {mockBranchRevenue.map((br, idx) => {
                const ratio = ((br.collected / br.revenue) * 100).toFixed(1);
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#1e293b' }}>{br.branch}</td>
                    <td style={{ padding: '12px 10px', color: '#475569' }}>₹{(br.revenue / 100000).toFixed(1)}L</td>
                    <td style={{ padding: '12px 10px', color: '#059669', fontWeight: 700 }}>₹{(br.collected / 100000).toFixed(1)}L</td>
                    <td style={{ padding: '12px 10px', color: '#ef4444' }}>₹{(br.pending / 100000).toFixed(1)}L</td>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#2563eb' }}>{ratio}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
