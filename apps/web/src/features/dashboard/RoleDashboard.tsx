import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { RoleDashboardConfig } from '../../mock/dashboards';
import DashboardStatsGrid from './components/DashboardStatsGrid';
import DashboardQuickActions from './components/DashboardQuickActions';
import DashboardActivityFeed from './components/DashboardActivityFeed';
import DashboardWidgetCard from './components/DashboardWidgetCard';
import DashboardSectionHeader from './components/DashboardSectionHeader';

interface Props {
  config: RoleDashboardConfig;
}

export default function RoleDashboard({ config }: Props) {
  const user = useSelector((s: RootState) => s.auth.user);
  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="dashboard-grid" style={{ gap: '28px' }}>
      {/* Header */}
      <div className="col-span-12" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        paddingTop: 24, paddingBottom: 8, gap: 12, flexWrap: 'wrap'
      }}>
        <div>
          <h1 style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 28,
            color: 'var(--text-primary)', margin: '0 0 8px 0',
            display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap'
          }}>
            {greeting}, {user?.first_name} 👋
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', borderRadius: 'var(--radius-sm)',
              background: `${config.roleColor}14`, border: `1px solid ${config.roleColor}30`,
              fontSize: 11, fontWeight: 700, color: config.roleColor, letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              {config.roleLabel}
            </span>
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            color: 'var(--text-secondary)', margin: 0,
          }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
            })} · {config.greeting}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="col-span-12">
        <DashboardSectionHeader title="Quick Actions" accentColor={config.roleColor} />
        <DashboardQuickActions actions={config.quickActions} />
      </div>

      {/* Statistics */}
      <div className="col-span-12">
        <DashboardSectionHeader title="Overview" accentColor={config.roleColor} />
        <DashboardStatsGrid stats={config.stats} />
      </div>

      {/* Activities + Widgets */}
      <div className="col-span-12 lg:col-span-6">
        <DashboardActivityFeed activities={config.activities} />
      </div>
      <div className="col-span-12 lg:col-span-6" style={{
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        {config.widgets.map((widget) => (
          <DashboardWidgetCard key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
}
