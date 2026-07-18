import type { RoleDashboardConfig } from './types';

export const hrDashboard: RoleDashboardConfig = {
  roleLabel: 'HR Manager',
  roleColor: '#D946EF',
  greeting: "Here's your workforce overview.",
  stats: [
    { label: 'Total Employees', value: 156, icon: '👥', color: 'primary', change: '+3 this month', changeDir: 'up' },
    { label: 'Teaching Staff', value: 82, icon: '👩‍🏫', color: 'info', change: '2 on leave today', changeDir: 'neutral' },
    { label: 'Non-Teaching Staff', value: 74, icon: '🧑‍💼', color: 'violet', change: '1 on leave today', changeDir: 'neutral' },
    { label: 'Leave Requests', value: 8, icon: '📋', color: 'warning', change: '3 pending approval', changeDir: 'down' },
    { label: 'Staff Attendance', value: '96%', icon: '✅', color: 'success', change: '+0.8% vs last month', changeDir: 'up' },
    { label: 'Open Positions', value: 4, icon: '📝', color: 'danger', change: '2 shortlisted', changeDir: 'neutral' },
  ],
  quickActions: [
    { label: 'Add Employee', icon: '➕', to: '/hr', color: '#D946EF' },
    { label: 'Approve Leave', icon: '✅', to: '/hr', color: '#10B981' },
    { label: 'Recruit Staff', icon: '🔍', to: '/hr', color: '#4F8EF7' },
    { label: 'Performance Review', icon: '📊', to: '/hr', color: '#F59E0B' },
  ],
  activities: [
    { id: 'hr1', text: 'Leave approved: Mrs. Kavita Joshi (Jul 18-20)', time: '30 min ago', icon: '✅', type: 'success' },
    { id: 'hr2', text: 'New application received for Math Teacher position', time: '1 hour ago', icon: '📝', type: 'info' },
    { id: 'hr3', text: 'Mr. Rahul Kapoor completed probation period', time: '2 hours ago', icon: '🎉', type: 'success' },
    { id: 'hr4', text: 'Training workshop scheduled for Jul 25', time: '3 hours ago', icon: '📚', type: 'info' },
    { id: 'hr5', text: 'Payroll processing deadline: Jul 28', time: '5 hours ago', icon: '⏰', type: 'warning' },
  ],
  widgets: [
    {
      id: 'birthdays', title: 'Upcoming Birthdays', type: 'list',
      items: [
        { label: 'Nisha Rao', value: 'Jul 18', status: 'info', icon: '🎂' },
        { label: 'Farhan Ali', value: 'Jul 22', status: 'info', icon: '🎂' },
        { label: 'Anita Desai', value: 'Jul 28', status: 'info', icon: '🎂' },
      ],
    },
    {
      id: 'recruitment', title: 'Recruitment Pipeline', type: 'progress',
      items: [
        { label: 'Math Teacher', value: '12 applicants', status: 'info' },
        { label: 'Lab Assistant', value: '8 applicants', status: 'info' },
        { label: 'Sports Coach', value: 'Interview stage', status: 'warning' },
        { label: 'IT Admin', value: 'Shortlisted', status: 'success' },
      ],
    },
  ],
};
