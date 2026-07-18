import React from 'react';
import { PERMISSIONS } from '../permissions/PERMISSIONS';
import type { Permission } from '../permissions/PERMISSIONS';

// ─── Icon Components ──────────────────────────────────────────────────────────
const icon = (pathStr: string) => () => 
  React.createElement('svg', { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'currentColor' },
    React.createElement('path', { d: pathStr })
  );

const DashboardIcon = icon('M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z');
const ChartIcon = icon('M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z');
const UsersIcon = icon(
  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
);
const CalendarIcon2 = icon(
  'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z',
);
const TrendIcon = icon('M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z');
const BuildingIcon = icon(
  'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
);
const BookIcon = icon(
  'M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z',
);
const UserIcon = icon(
  'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
);
const ReportIcon = icon(
  'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
);

const SettingsIcon = icon(
  'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
);
const TransportIcon = icon(
  'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 10l1.5-4.5h11L19 10H5z',
);
const CommunicationIcon = icon(
  'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',
);

export interface NavItem {
  to: string;
  icon: React.FC;
  label: string;
  permission?: Permission;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export const NAVIGATION_CONFIG: NavSection[] = [
  {
    section: 'Overview',
    items: [
      { to: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    ],
  },
  {
    section: 'Core Directories',
    items: [
      { to: '/students', icon: UsersIcon, label: 'Students', permission: PERMISSIONS.STUDENTS_VIEW },
      { to: '/teachers', icon: UserIcon, label: 'Teachers', permission: PERMISSIONS.TEACHERS_VIEW },
      { to: '/parents', icon: UsersIcon, label: 'Parents', permission: PERMISSIONS.PARENTS_VIEW },
    ],
  },
  {
    section: 'Academic & Exams',
    items: [
      { to: '/academic', icon: BuildingIcon, label: 'Academic', permission: PERMISSIONS.ACADEMIC_VIEW },
      { to: '/attendance', icon: CalendarIcon2, label: 'Attendance', permission: PERMISSIONS.ATTENDANCE_VIEW },
      { to: '/exams', icon: TrendIcon, label: 'Exams', permission: PERMISSIONS.ACADEMIC_VIEW },
    ],
  },
  {
    section: 'School Operations',
    items: [
      { to: '/admissions', icon: CalendarIcon2, label: 'Admissions', permission: PERMISSIONS.ADMISSIONS_VIEW },
      { to: '/fees', icon: ReportIcon, label: 'Fees', permission: PERMISSIONS.FEES_VIEW },
      { to: '/library', icon: BookIcon, label: 'Library', permission: PERMISSIONS.LIBRARY_VIEW },
      { to: '/transport', icon: TransportIcon, label: 'Transport', permission: PERMISSIONS.TRANSPORT_VIEW },
      { to: '/hr', icon: UserIcon, label: 'HR', permission: PERMISSIONS.HR_VIEW },
      { to: '/inventory', icon: BuildingIcon, label: 'Inventory', permission: PERMISSIONS.INVENTORY_VIEW },
    ],
  },
  {
    section: 'Insights & Core Settings',
    items: [
      { to: '/reports', icon: ReportIcon, label: 'Reports', permission: PERMISSIONS.REPORTS_VIEW },
      { to: '/analytics', icon: ChartIcon, label: 'Analytics', permission: PERMISSIONS.REPORTS_VIEW },
      { to: '/communication', icon: CommunicationIcon, label: 'Communication', permission: PERMISSIONS.ATTENDANCE_VIEW },
      { to: '/settings', icon: SettingsIcon, label: 'Settings', permission: PERMISSIONS.SETTINGS_VIEW },
    ],
  },
];
