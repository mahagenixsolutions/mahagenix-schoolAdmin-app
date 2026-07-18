import type { RoleDashboardConfig } from './types';

export const counselorDashboard: RoleDashboardConfig = {
  roleLabel: 'Counselor',
  roleColor: '#0D9488',
  greeting: "Here's your counseling overview.",
  stats: [
    { label: 'Sessions Today', value: 6, icon: '🗣️', color: 'primary', change: '2 completed', changeDir: 'up' },
    { label: 'Parent Meetings', value: 3, icon: '🤝', color: 'info', change: '1 this afternoon', changeDir: 'neutral' },
    { label: 'Career Guidance', value: 14, icon: '🎯', color: 'success', change: 'Sessions this week', changeDir: 'up' },
    { label: 'Appointments', value: 4, icon: '📅', color: 'warning', change: '2 remaining', changeDir: 'neutral' },
    { label: 'High Risk Students', value: 7, icon: '⚠️', color: 'danger', change: '3 need follow-up', changeDir: 'down' },
    { label: 'Counseling Notes', value: 48, icon: '📝', color: 'violet', change: 'This month', changeDir: 'neutral' },
  ],
  quickActions: [
    { label: 'Schedule Session', icon: '📅', to: '/students', color: '#0D9488' },
    { label: 'Guidance Report', icon: '📄', to: '/reports', color: '#4F8EF7' },
    { label: 'Parent Meeting', icon: '🤝', to: '/parents', color: '#F59E0B' },
  ],
  activities: [
    { id: 'cn1', text: 'Session completed: Aanya Sharma (5A) — Academic stress', time: '20 min ago', icon: '✅', type: 'success' },
    { id: 'cn2', text: 'Follow-up scheduled: Kabir Sen (8B) — Peer conflict', time: '1 hour ago', icon: '📅', type: 'info' },
    { id: 'cn3', text: 'Career guidance session for Class 10 — Jul 20', time: '2 hours ago', icon: '🎯', type: 'info' },
    { id: 'cn4', text: 'Parent meeting: Mrs. Desai (Rohan\'s mother) at 3 PM', time: '3 hours ago', icon: '🤝', type: 'warning' },
    { id: 'cn5', text: 'Monthly counseling report submitted to Principal', time: '1 day ago', icon: '📄', type: 'success' },
  ],
  widgets: [
    {
      id: 'active-cases', title: 'Active Student Cases', type: 'list',
      items: [
        { label: 'Kabir Sen (8B) — Peer conflict', value: 'High', status: 'danger' },
        { label: 'Prisha Roy (9A) — Academic anxiety', value: 'Medium', status: 'warning' },
        { label: 'Vihaan Shah (7C) — Behavioral', value: 'Medium', status: 'warning' },
        { label: 'Sanya Malhotra (6A) — Adjustment', value: 'Low', status: 'info' },
      ],
    },
    {
      id: 'upcoming-sessions', title: 'Upcoming Sessions', type: 'list',
      items: [
        { label: 'Rohan Gupta (10A)', value: '2:00 PM', status: 'info' },
        { label: 'Diya Patel (9B)', value: '3:00 PM', status: 'info' },
        { label: 'Class 10 Career Guidance', value: 'Jul 20, 10 AM', status: 'neutral' },
      ],
    },
  ],
};
