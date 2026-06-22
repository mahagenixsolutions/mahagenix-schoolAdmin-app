// ─────────────────────────────────────────────────────────────────────────────
// AI Chat Widget — Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface AIContextData {
  /** Current browser route, e.g. "/students" */
  route: string;
  /** Human-readable page name, e.g. "Students" */
  page: string;
  /** Feature module, e.g. "students", "attendance" */
  module: string;
  /** Active filters on the current page */
  filters: Record<string, string | number | boolean>;
  /** Current search input value */
  searchValue: string;
  /** Selected table row IDs or objects */
  selectedRows: unknown[];
  /** Visible table/list data on the current page */
  visibleData: unknown[];
  /** Dashboard-level KPI metrics */
  dashboardMetrics: Record<string, unknown>;
  /** Current authenticated user info */
  userInfo: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
}

export interface AISuggestion {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}

/** Maps route prefixes to page metadata */
export const PAGE_MAP: Record<string, { page: string; module: string }> = {
  '/dashboard': { page: 'Dashboard', module: 'dashboard' },
  '/students': { page: 'Students', module: 'students' },
  '/attendance': { page: 'Attendance', module: 'attendance' },
  '/marks': { page: 'Marks', module: 'marks' },
  '/progress': { page: 'Daily Progress', module: 'progress' },
  '/classes': { page: 'Classes', module: 'classes' },
  '/subjects': { page: 'Subjects', module: 'subjects' },
  '/analytics': { page: 'Analytics', module: 'analytics' },
  '/users': { page: 'Users', module: 'users' },
  '/events': { page: 'Events', module: 'events' },
  '/notifications': { page: 'Notifications', module: 'notifications' },
  '/audit-logs': { page: 'Audit Logs', module: 'audit' },
  '/reports': { page: 'Reports', module: 'reports' },
  '/academic-years': { page: 'Academic Years', module: 'academic-years' },
  '/participation': { page: 'Participation', module: 'participation' },
  '/timeline': { page: 'Timeline', module: 'parent' },
  '/messages': { page: 'Messages', module: 'parent' },
  '/profile': { page: 'Profile', module: 'parent' },
  '/gallery': { page: 'Gallery', module: 'parent' },
  '/activity': { page: 'School Activity', module: 'activity' },
  '/quick-actions': { page: 'Quick Actions', module: 'workspace' },
};
