import type { RoleDashboardConfig } from './types';

export const vicePrincipalDashboard: RoleDashboardConfig = {
  roleLabel: 'Vice Principal',
  roleColor: '#0891B2',
  greeting: "Here's today's academic operations.",
  stats: [
    { label: 'Today\'s Attendance', value: '93.8%', icon: '📋', color: 'success', change: '+0.5% vs yesterday', changeDir: 'up' },
    { label: 'Teacher Attendance', value: '97%', icon: '👩‍🏫', color: 'success', change: '2 on leave', changeDir: 'neutral' },
    { label: 'Timetable Compliance', value: '91%', icon: '📅', color: 'info', change: '3 substitutions today', changeDir: 'neutral' },
    { label: 'Homework Completion', value: '78%', icon: '📝', color: 'warning', change: '-2% vs last week', changeDir: 'down' },
    { label: 'Lesson Completion', value: '84%', icon: '📚', color: 'primary', change: 'On track', changeDir: 'up' },
    { label: 'Upcoming Exams', value: 3, icon: '📊', color: 'violet', change: 'This month', changeDir: 'neutral' },
  ],
  quickActions: [
    { label: 'Assign Timetable', icon: '📅', to: '/academic', color: '#0891B2' },
    { label: 'Monitor Classes', icon: '🏫', to: '/attendance', color: '#4F8EF7' },
    { label: 'Review Homework', icon: '📝', to: '/students', color: '#F59E0B' },
  ],
  activities: [
    { id: 'vp1', text: 'Substitution arranged: Mr. Ali for Class 7B Math', time: '20 min ago', icon: '🔄', type: 'info' },
    { id: 'vp2', text: 'Homework submission deadline extended for Class 9A', time: '1 hour ago', icon: '📝', type: 'warning' },
    { id: 'vp3', text: 'Class 10A completed Chapter 12 in Physics', time: '2 hours ago', icon: '✅', type: 'success' },
    { id: 'vp4', text: 'Low homework completion in Class 6B (62%)', time: '3 hours ago', icon: '⚠️', type: 'warning' },
    { id: 'vp5', text: 'Weekly academic review meeting at 3:00 PM', time: '4 hours ago', icon: '🗓️', type: 'info' },
  ],
  widgets: [
    {
      id: 'exam-schedule', title: 'Exam Preparation', type: 'list',
      items: [
        { label: 'Mid-Term Exams', value: 'Starts in 13 days', status: 'warning' },
        { label: 'Question papers submitted', value: '8 of 12', status: 'info' },
        { label: 'Seating arrangement', value: 'Pending', status: 'danger' },
      ],
    },
    {
      id: 'academic-progress', title: 'Academic Activities', type: 'progress',
      items: [
        { label: 'Syllabus Coverage (Overall)', value: '84%', status: 'success' },
        { label: 'Lab Sessions Completed', value: '76%', status: 'warning' },
        { label: 'Project Submissions', value: '68%', status: 'warning' },
        { label: 'PTM Scheduled', value: 'Aug 2', status: 'info' },
      ],
    },
  ],
};
