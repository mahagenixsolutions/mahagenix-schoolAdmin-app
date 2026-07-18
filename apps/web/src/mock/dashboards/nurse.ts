import type { RoleDashboardConfig } from './types';

export const nurseDashboard: RoleDashboardConfig = {
  roleLabel: 'School Nurse',
  roleColor: '#DC2626',
  greeting: "Here's your health center overview.",
  stats: [
    { label: 'Patients Today', value: 12, icon: '🏥', color: 'primary', change: '+3 vs yesterday', changeDir: 'up' },
    { label: 'Medicine Stock', value: '82%', icon: '💊', color: 'success', change: '4 items low', changeDir: 'neutral' },
    { label: 'Appointments', value: 5, icon: '📅', color: 'info', change: '2 remaining', changeDir: 'neutral' },
    { label: 'Medical Alerts', value: 3, icon: '⚠️', color: 'danger', change: 'Allergy alerts', changeDir: 'down' },
    { label: 'Vaccinations Due', value: 28, icon: '💉', color: 'warning', change: 'This month', changeDir: 'neutral' },
    { label: 'Emergency Cases', value: 1, icon: '🚑', color: 'danger', change: 'Resolved', changeDir: 'up' },
  ],
  quickActions: [
    { label: 'Add Record', icon: '📋', to: '/students', color: '#DC2626' },
    { label: 'Issue Medicine', icon: '💊', to: '/students', color: '#10B981' },
    { label: 'View Reports', icon: '📊', to: '/reports', color: '#4F8EF7' },
  ],
  activities: [
    { id: 'nr1', text: 'Treated: Rohan (5A) — Headache, paracetamol given', time: '15 min ago', icon: '💊', type: 'info' },
    { id: 'nr2', text: 'Allergy alert triggered: Prisha (9B) — Peanuts', time: '30 min ago', icon: '⚠️', type: 'danger' },
    { id: 'nr3', text: 'Vaccination camp scheduled for Jul 25', time: '1 hour ago', icon: '💉', type: 'info' },
    { id: 'nr4', text: 'Medicine stock updated — 4 items below threshold', time: '2 hours ago', icon: '📦', type: 'warning' },
    { id: 'nr5', text: 'Health checkup completed: Class 3A (32 students)', time: '4 hours ago', icon: '✅', type: 'success' },
  ],
  widgets: [
    {
      id: 'common-ailments', title: 'Common Ailments Today', type: 'list',
      items: [
        { label: 'Headache / Fever', value: '5 cases', status: 'warning' },
        { label: 'Stomach ache', value: '3 cases', status: 'info' },
        { label: 'Minor injury', value: '2 cases', status: 'info' },
        { label: 'Eye irritation', value: '2 cases', status: 'neutral' },
      ],
    },
    {
      id: 'medicine-stock', title: 'Medicine Stock Alerts', type: 'status',
      items: [
        { label: 'Paracetamol', value: '12 left', status: 'danger', icon: '🔴' },
        { label: 'Bandages', value: '8 packs', status: 'warning', icon: '🟡' },
        { label: 'ORS Packets', value: '15 left', status: 'warning', icon: '🟡' },
        { label: 'Antiseptic', value: '24 bottles', status: 'success', icon: '🟢' },
      ],
    },
  ],
};
