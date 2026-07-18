import type { RoleDashboardConfig } from './types';

export const superAdminDashboard: RoleDashboardConfig = {
  roleLabel: 'Super Admin',
  roleColor: '#8B5CF6',
  greeting: "Here's your platform overview.",
  stats: [
    { label: 'Organizations', value: 12, icon: '🏢', color: 'primary', change: '+2 this quarter', changeDir: 'up' },
    { label: 'Active Subscriptions', value: 10, icon: '💳', color: 'success', change: '83% renewal rate', changeDir: 'up' },
    { label: 'Storage Used', value: '67%', icon: '💾', color: 'warning', change: '324 GB of 500 GB', changeDir: 'neutral' },
    { label: 'System Users', value: 2847, icon: '👥', color: 'info', change: '+128 this month', changeDir: 'up' },
    { label: 'Active Modules', value: 18, icon: '📦', color: 'violet', change: 'All operational', changeDir: 'up' },
    { label: 'Security Alerts', value: 3, icon: '🛡️', color: 'danger', change: '2 require action', changeDir: 'down' },
  ],
  quickActions: [
    { label: 'Manage Roles', icon: '🔑', to: '/settings', color: '#8B5CF6' },
    { label: 'Academic Setup', icon: '🎓', to: '/academic', color: '#4F8EF7' },
    { label: 'Branding', icon: '🎨', to: '/settings', color: '#F59E0B' },
    { label: 'Audit Logs', icon: '📋', to: '/audit-logs', color: '#10B981' },
    { label: 'Subscription', icon: '💳', to: '/settings', color: '#EF4444' },
  ],
  activities: [
    { id: 'sa1', text: 'New organization "DPS Bangalore" registered', time: '10 min ago', icon: '🏢', type: 'success' },
    { id: 'sa2', text: 'Security audit completed for Q2 2026', time: '1 hour ago', icon: '🛡️', type: 'info' },
    { id: 'sa3', text: 'Module "Hostel Management" enabled for 3 schools', time: '2 hours ago', icon: '📦', type: 'info' },
    { id: 'sa4', text: 'Failed login attempt detected from unknown IP', time: '3 hours ago', icon: '⚠️', type: 'warning' },
    { id: 'sa5', text: 'Subscription renewed for "Ryan International"', time: '5 hours ago', icon: '💳', type: 'success' },
    { id: 'sa6', text: 'Database backup completed successfully', time: '6 hours ago', icon: '💾', type: 'success' },
  ],
  widgets: [
    {
      id: 'org-health', title: 'Organization Health', type: 'status',
      items: [
        { label: 'DPS New Delhi', value: 'Healthy', status: 'success', icon: '🟢' },
        { label: 'Ryan International', value: 'Healthy', status: 'success', icon: '🟢' },
        { label: 'Kendriya Vidyalaya', value: 'Warning', status: 'warning', icon: '🟡' },
        { label: 'Modern School', value: 'Healthy', status: 'success', icon: '🟢' },
      ],
    },
    {
      id: 'module-status', title: 'Module Status', type: 'status',
      items: [
        { label: 'Student Management', value: 'Active', status: 'success' },
        { label: 'Fee Collection', value: 'Active', status: 'success' },
        { label: 'Transport Tracking', value: 'Active', status: 'success' },
        { label: 'Hostel Management', value: 'Beta', status: 'warning' },
      ],
    },
  ],
};
