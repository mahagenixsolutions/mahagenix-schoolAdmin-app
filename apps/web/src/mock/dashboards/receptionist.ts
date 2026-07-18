import type { RoleDashboardConfig } from './types';

export const receptionistDashboard: RoleDashboardConfig = {
  roleLabel: 'Receptionist',
  roleColor: '#EC4899',
  greeting: "Here's your front desk overview.",
  stats: [
    { label: 'Visitors Today', value: 14, icon: '🚶', color: 'primary', change: '+3 vs yesterday', changeDir: 'up' },
    { label: 'New Admissions', value: 6, icon: '📝', color: 'info', change: '2 pending documents', changeDir: 'neutral' },
    { label: 'Enquiries', value: 9, icon: '❓', color: 'warning', change: '4 follow-ups due', changeDir: 'down' },
    { label: 'Appointments', value: 5, icon: '📅', color: 'success', change: '2 remaining today', changeDir: 'neutral' },
    { label: 'Phone Calls', value: 23, icon: '📞', color: 'violet', change: 'Today\'s total', changeDir: 'neutral' },
    { label: 'Pending Follow-ups', value: 7, icon: '⏰', color: 'danger', change: '3 overdue', changeDir: 'down' },
  ],
  quickActions: [
    { label: 'Register Visitor', icon: '🚶', to: '/students', color: '#EC4899' },
    { label: 'New Admission', icon: '📝', to: '/admissions', color: '#4F8EF7' },
    { label: 'Book Appointment', icon: '📅', to: '/communication', color: '#10B981' },
  ],
  activities: [
    { id: 'rc1', text: 'Visitor: Mr. Gupta (Parent) checked in at 10:30 AM', time: '15 min ago', icon: '🚶', type: 'info' },
    { id: 'rc2', text: 'Admission form submitted: Ananya Iyer (Class 3)', time: '45 min ago', icon: '📝', type: 'success' },
    { id: 'rc3', text: 'Appointment scheduled: Dr. Sharma at 2:00 PM', time: '1 hour ago', icon: '📅', type: 'info' },
    { id: 'rc4', text: 'Enquiry call: Admission for Class 1 (2027)', time: '2 hours ago', icon: '📞', type: 'info' },
    { id: 'rc5', text: 'Follow-up reminder: Mr. Patel re: admission docs', time: '3 hours ago', icon: '⏰', type: 'warning' },
  ],
  widgets: [
    {
      id: 'today-appointments', title: 'Today\'s Appointments', type: 'list',
      items: [
        { label: 'Parent Meeting — Sharma family', value: '11:00 AM', status: 'success' },
        { label: 'Dr. Verma — Health check', value: '2:00 PM', status: 'info' },
        { label: 'Vendor — Lab equipment', value: '3:30 PM', status: 'neutral' },
      ],
    },
    {
      id: 'admission-status', title: 'Admission Pipeline', type: 'progress',
      items: [
        { label: 'Forms received', value: '28 total', status: 'info' },
        { label: 'Under review', value: '12', status: 'warning' },
        { label: 'Approved', value: '10', status: 'success' },
        { label: 'Pending documents', value: '6', status: 'danger' },
      ],
    },
  ],
};
