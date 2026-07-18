import type { RoleDashboardConfig } from './types';

export const librarianDashboard: RoleDashboardConfig = {
  roleLabel: 'Librarian',
  roleColor: '#B45309',
  greeting: "Here's your library overview.",
  stats: [
    { label: 'Books Issued', value: 342, icon: '📖', color: 'primary', change: '+12 today', changeDir: 'up' },
    { label: 'Books Returned', value: 28, icon: '📚', color: 'success', change: 'Today', changeDir: 'up' },
    { label: 'Overdue Books', value: 47, icon: '⏰', color: 'danger', change: '8 critical', changeDir: 'down' },
    { label: 'Reservations', value: 15, icon: '🔖', color: 'warning', change: '5 ready for pickup', changeDir: 'neutral' },
    { label: 'Total Catalog', value: 8420, icon: '📕', color: 'info', change: '+24 new arrivals', changeDir: 'up' },
    { label: 'Fine Collection', value: '₹3,200', icon: '💰', color: 'violet', change: 'This month', changeDir: 'neutral' },
  ],
  quickActions: [
    { label: 'Issue Book', icon: '📖', to: '/library', color: '#B45309' },
    { label: 'Return Book', icon: '📚', to: '/library', color: '#10B981' },
    { label: 'Add Book', icon: '➕', to: '/library', color: '#4F8EF7' },
    { label: 'View Fines', icon: '💰', to: '/library', color: '#F59E0B' },
  ],
  activities: [
    { id: 'lb1', text: 'Book issued: "Wings of Fire" to Aanya Sharma (5A)', time: '10 min ago', icon: '📖', type: 'success' },
    { id: 'lb2', text: 'Book returned: "A Brief History of Time"', time: '30 min ago', icon: '📚', type: 'info' },
    { id: 'lb3', text: 'Overdue notice sent to 8 students', time: '1 hour ago', icon: '⏰', type: 'warning' },
    { id: 'lb4', text: '24 new books catalogued in Science section', time: '3 hours ago', icon: '📕', type: 'success' },
    { id: 'lb5', text: 'Reservation: "Harry Potter #7" by Kabir (7B)', time: '4 hours ago', icon: '🔖', type: 'info' },
  ],
  widgets: [
    {
      id: 'popular-books', title: 'Most Popular This Month', type: 'list',
      items: [
        { label: 'Wings of Fire — APJ Abdul Kalam', value: '18 issues', status: 'success' },
        { label: 'Harry Potter & the Deathly Hallows', value: '14 issues', status: 'success' },
        { label: 'The Diary of a Young Girl', value: '11 issues', status: 'info' },
        { label: 'A Brief History of Time', value: '9 issues', status: 'info' },
      ],
    },
    {
      id: 'category-stats', title: 'Category Distribution', type: 'progress',
      items: [
        { label: 'Fiction', value: '2,840 books', status: 'success' },
        { label: 'Science & Technology', value: '1,960 books', status: 'info' },
        { label: 'Reference', value: '1,450 books', status: 'warning' },
        { label: 'Periodicals', value: '680 items', status: 'neutral' },
      ],
    },
  ],
};
