import type { RoleDashboardConfig } from './types';

export const principalDashboard: RoleDashboardConfig = {
  roleLabel: 'Principal',
  roleColor: '#4F46E5',
  greeting: "Here's your school performance overview.",
  stats: [
    { label: 'Total Students', value: 1248, icon: '👨‍🎓', color: 'primary', change: '+24 this month', changeDir: 'up' },
    { label: 'Today\'s Attendance', value: '94.2%', icon: '📋', color: 'success', change: '+1.3% vs last week', changeDir: 'up' },
    { label: 'Teacher Performance', value: '87%', icon: '👩‍🏫', color: 'info', change: 'Avg. rating', changeDir: 'up' },
    { label: 'Fee Collection', value: '82%', icon: '💰', color: 'warning', change: '₹3.2L pending', changeDir: 'down' },
    { label: 'Open Admissions', value: 18, icon: '📝', color: 'violet', change: '5 require review', changeDir: 'neutral' },
    { label: 'Discipline Cases', value: 4, icon: '⚖️', color: 'danger', change: '2 resolved today', changeDir: 'down' },
  ],
  quickActions: [
    { label: 'Approve Admission', icon: '✅', to: '/admissions', color: '#4F46E5' },
    { label: 'Assign Teacher', icon: '👩‍🏫', to: '/teachers', color: '#0EA5E9' },
    { label: 'Create Announcement', icon: '📢', to: '/communication', color: '#F59E0B' },
    { label: 'Schedule Exam', icon: '📝', to: '/exams', color: '#10B981' },
  ],
  activities: [
    { id: 'p1', text: 'Mrs. Nisha Rao submitted Class 5A report cards', time: '15 min ago', icon: '📄', type: 'success' },
    { id: 'p2', text: 'Annual sports day event scheduled for Aug 15', time: '1 hour ago', icon: '🏅', type: 'info' },
    { id: 'p3', text: 'Low attendance alert: Class 8B (72%)', time: '2 hours ago', icon: '⚠️', type: 'warning' },
    { id: 'p4', text: '3 new admission applications received', time: '3 hours ago', icon: '📝', type: 'info' },
    { id: 'p5', text: 'Parent meeting scheduled with Mr. Sharma', time: '4 hours ago', icon: '🤝', type: 'info' },
  ],
  widgets: [
    {
      id: 'upcoming-exams', title: 'Upcoming Examinations', type: 'list',
      items: [
        { label: 'Mid-Term Exams', value: 'Jul 28 – Aug 5', status: 'warning' },
        { label: 'Class 10 Pre-Board', value: 'Aug 18 – Aug 25', status: 'info' },
        { label: 'Unit Test III', value: 'Sep 5 – Sep 8', status: 'neutral' },
      ],
    },
    {
      id: 'pending-approvals', title: 'Pending Approvals', type: 'list',
      items: [
        { label: 'Leave requests', value: '7 pending', status: 'warning' },
        { label: 'Admission applications', value: '5 new', status: 'info' },
        { label: 'Transfer certificates', value: '3 pending', status: 'neutral' },
        { label: 'Fee concession requests', value: '4 pending', status: 'warning' },
      ],
    },
  ],
};
