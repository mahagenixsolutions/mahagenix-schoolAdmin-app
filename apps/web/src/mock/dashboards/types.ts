export interface DashboardStat {
  label: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'violet';
  change?: string;
  changeDir?: 'up' | 'down' | 'neutral';
}

export interface DashboardQuickAction {
  label: string;
  icon: string;
  to: string;
  color: string;
}

export interface DashboardActivity {
  id: string;
  text: string;
  time: string;
  icon: string;
  type: 'info' | 'success' | 'warning' | 'danger';
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'list' | 'progress' | 'status' | 'table';
  items: DashboardWidgetItem[];
}

export interface DashboardWidgetItem {
  label: string;
  value: string | number;
  status?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: string;
}

export interface RoleDashboardConfig {
  roleLabel: string;
  roleColor: string;
  greeting: string;
  stats: DashboardStat[];
  quickActions: DashboardQuickAction[];
  activities: DashboardActivity[];
  widgets: DashboardWidget[];
}
