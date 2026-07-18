import { useNavigate } from 'react-router-dom';
import type { DashboardQuickAction } from '../../../mock/dashboards';

interface Props {
  actions: DashboardQuickAction[];
}

export default function DashboardQuickActions({ actions }: Props) {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', gap: '12px', flexWrap: 'wrap',
    }}>
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => navigate(action.to)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)',
            cursor: 'pointer', fontWeight: 600, fontSize: 13,
            color: 'var(--text-primary)', transition: 'all 0.2s ease',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = action.color;
            e.currentTarget.style.background = `${action.color}08`;
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.background = 'var(--bg-surface)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{ fontSize: 16 }}>{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
}
