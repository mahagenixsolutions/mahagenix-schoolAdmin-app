import type { RoleDashboardConfig } from './types';

export const accountantDashboard: RoleDashboardConfig = {
  roleLabel: 'Accountant',
  roleColor: '#059669',
  greeting: "Here's your financial overview.",
  stats: [
    { label: 'Today\'s Collection', value: '₹1,24,500', icon: '💰', color: 'success', change: '+₹18,000 vs yesterday', changeDir: 'up' },
    { label: 'Pending Fees', value: '₹8,45,000', icon: '⏳', color: 'danger', change: '126 students', changeDir: 'down' },
    { label: 'Monthly Revenue', value: '₹18,54,000', icon: '📈', color: 'primary', change: '+12% vs last month', changeDir: 'up' },
    { label: 'Expenses (MTD)', value: '₹6,82,000', icon: '📉', color: 'warning', change: 'Within budget', changeDir: 'neutral' },
    { label: 'Scholarships', value: '₹2,40,000', icon: '🎓', color: 'violet', change: '32 students', changeDir: 'neutral' },
    { label: 'Payroll Due', value: '₹12,80,000', icon: '💳', color: 'info', change: 'Due Jul 28', changeDir: 'neutral' },
  ],
  quickActions: [
    { label: 'Collect Fees', icon: '💰', to: '/fees', color: '#059669' },
    { label: 'Generate Invoice', icon: '📄', to: '/fees', color: '#4F8EF7' },
    { label: 'Export Reports', icon: '📊', to: '/reports', color: '#F59E0B' },
    { label: 'Payroll', icon: '💳', to: '/hr', color: '#8B5CF6' },
  ],
  activities: [
    { id: 'ac1', text: 'Fee collected: Aarav Mehta (₹5,000) — Online', time: '10 min ago', icon: '✅', type: 'success' },
    { id: 'ac2', text: 'Invoice generated for Class 10A (38 students)', time: '30 min ago', icon: '📄', type: 'info' },
    { id: 'ac3', text: 'Scholarship applied: Prisha Sen (₹8,000)', time: '1 hour ago', icon: '🎓', type: 'info' },
    { id: 'ac4', text: 'Expense recorded: Lab equipment (₹45,000)', time: '2 hours ago', icon: '📝', type: 'warning' },
    { id: 'ac5', text: 'Monthly financial report ready for review', time: '4 hours ago', icon: '📊', type: 'success' },
  ],
  widgets: [
    {
      id: 'budget-overview', title: 'Budget Overview', type: 'progress',
      items: [
        { label: 'Salaries', value: '₹10,20,000 of ₹12,80,000', status: 'success' },
        { label: 'Maintenance', value: '₹1,80,000 of ₹2,00,000', status: 'warning' },
        { label: 'Academic Supplies', value: '₹95,000 of ₹1,50,000', status: 'success' },
        { label: 'Events & Activities', value: '₹62,000 of ₹80,000', status: 'info' },
      ],
    },
    {
      id: 'recent-invoices', title: 'Recent Invoices', type: 'list',
      items: [
        { label: 'INV-2026-0842', value: '₹5,000 — Paid', status: 'success' },
        { label: 'INV-2026-0841', value: '₹4,500 — Paid', status: 'success' },
        { label: 'INV-2026-0840', value: '₹5,000 — Pending', status: 'warning' },
        { label: 'INV-2026-0839', value: '₹5,000 — Overdue', status: 'danger' },
      ],
    },
  ],
};
