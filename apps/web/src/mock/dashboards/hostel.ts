import type { RoleDashboardConfig } from './types';

export const hostelDashboard: RoleDashboardConfig = {
  roleLabel: 'Hostel Manager',
  roleColor: '#7C3AED',
  greeting: "Here's your hostel overview.",
  stats: [
    { label: 'Room Occupancy', value: '87%', icon: '🏠', color: 'success', change: '174 of 200 beds', changeDir: 'up' },
    { label: 'Vacant Beds', value: 26, icon: '🛏️', color: 'info', change: 'Across all blocks', changeDir: 'neutral' },
    { label: 'Mess Status', value: 'Active', icon: '🍽️', color: 'success', change: 'Lunch served', changeDir: 'up' },
    { label: 'Visitors Today', value: 8, icon: '🚶', color: 'primary', change: '3 checked out', changeDir: 'neutral' },
    { label: 'Complaints', value: 5, icon: '📋', color: 'warning', change: '2 resolved today', changeDir: 'down' },
    { label: 'Hostel Attendance', value: '96%', icon: '✅', color: 'success', change: '8 on leave', changeDir: 'neutral' },
  ],
  quickActions: [
    { label: 'Allocate Room', icon: '🏠', to: '/students', color: '#7C3AED' },
    { label: 'Approve Visitor', icon: '✅', to: '/students', color: '#10B981' },
    { label: 'Manage Mess', icon: '🍽️', to: '/inventory', color: '#F59E0B' },
  ],
  activities: [
    { id: 'hs1', text: 'Room B-204 allocated to Rohan Gupta', time: '20 min ago', icon: '🏠', type: 'success' },
    { id: 'hs2', text: 'Visitor: Mrs. Sharma (parent) checked in Block A', time: '1 hour ago', icon: '🚶', type: 'info' },
    { id: 'hs3', text: 'Complaint resolved: Water heater in Block C', time: '2 hours ago', icon: '✅', type: 'success' },
    { id: 'hs4', text: 'Mess menu updated for next week', time: '3 hours ago', icon: '🍽️', type: 'info' },
    { id: 'hs5', text: 'Night roll call completed — 2 students absent', time: '12 hours ago', icon: '📋', type: 'warning' },
  ],
  widgets: [
    {
      id: 'block-occupancy', title: 'Block Occupancy', type: 'progress',
      items: [
        { label: 'Block A (Boys)', value: '92% — 46/50 beds', status: 'success' },
        { label: 'Block B (Boys)', value: '88% — 44/50 beds', status: 'success' },
        { label: 'Block C (Girls)', value: '84% — 42/50 beds', status: 'warning' },
        { label: 'Block D (Girls)', value: '84% — 42/50 beds', status: 'warning' },
      ],
    },
    {
      id: 'complaints', title: 'Active Complaints', type: 'list',
      items: [
        { label: 'AC not working — Room A-105', value: 'High', status: 'danger' },
        { label: 'Plumbing issue — Block B washroom', value: 'Medium', status: 'warning' },
        { label: 'Wi-Fi connectivity — Block D', value: 'Low', status: 'info' },
      ],
    },
  ],
};
