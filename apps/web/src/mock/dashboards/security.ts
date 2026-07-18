import type { RoleDashboardConfig } from './types';

export const securityDashboard: RoleDashboardConfig = {
  roleLabel: 'Security Officer',
  roleColor: '#475569',
  greeting: "Here's your security overview.",
  stats: [
    { label: 'Visitors Today', value: 18, icon: '🚶', color: 'primary', change: '6 currently inside', changeDir: 'neutral' },
    { label: 'Vehicle Entries', value: 42, icon: '🚗', color: 'info', change: '+8 vs yesterday', changeDir: 'up' },
    { label: 'Student Exit', value: 3, icon: '🚪', color: 'warning', change: '1 pending approval', changeDir: 'neutral' },
    { label: 'Staff Entry', value: 148, icon: '👤', color: 'success', change: '96% checked in', changeDir: 'up' },
    { label: 'Incident Reports', value: 1, icon: '📋', color: 'danger', change: 'Under review', changeDir: 'down' },
    { label: 'Emergency Alerts', value: 0, icon: '🚨', color: 'success', change: 'All clear', changeDir: 'up' },
  ],
  quickActions: [
    { label: 'Visitor Pass', icon: '🎫', to: '/students', color: '#475569' },
    { label: 'Approve Exit', icon: '✅', to: '/students', color: '#10B981' },
    { label: 'Report Incident', icon: '⚠️', to: '/reports', color: '#EF4444' },
  ],
  activities: [
    { id: 'sc1', text: 'Visitor pass issued: Mr. Gupta (Parent — Rohan, 10A)', time: '5 min ago', icon: '🎫', type: 'info' },
    { id: 'sc2', text: 'Vehicle KA-05-MN-1234 entered campus (Delivery)', time: '20 min ago', icon: '🚗', type: 'info' },
    { id: 'sc3', text: 'Student exit approved: Aanya Sharma (5A) — Medical', time: '30 min ago', icon: '🚪', type: 'success' },
    { id: 'sc4', text: 'Minor incident reported: Broken window in Block B', time: '1 hour ago', icon: '📋', type: 'warning' },
    { id: 'sc5', text: 'Morning gate duty completed — All clear', time: '3 hours ago', icon: '✅', type: 'success' },
  ],
  widgets: [
    {
      id: 'gate-log', title: 'Gate Log Summary', type: 'status',
      items: [
        { label: 'Main Gate', value: 'Open', status: 'success', icon: '🟢' },
        { label: 'Side Gate (Staff)', value: 'Open', status: 'success', icon: '🟢' },
        { label: 'Service Gate', value: 'Closed', status: 'neutral', icon: '⚪' },
        { label: 'Emergency Exit', value: 'Secured', status: 'success', icon: '🟢' },
      ],
    },
    {
      id: 'visitor-log', title: 'Current Visitors', type: 'list',
      items: [
        { label: 'Mr. Gupta — Parent visit', value: 'Since 10:30 AM', status: 'info' },
        { label: 'Vendor — Lab supplies', value: 'Since 11:00 AM', status: 'info' },
        { label: 'Dr. Verma — Health check', value: 'Since 11:30 AM', status: 'info' },
      ],
    },
  ],
};
