import React from 'react';
import { UserRole } from '@edutrack/shared-types';
import { PERMISSIONS } from '../permissions/PERMISSIONS';
import type { NavSection } from './navigation.config';

// ─── Icon Helpers & Paths ───────────────────────────────────────────────────
const icon = (pathStr: string) => () =>
  React.createElement(
    'svg',
    { width: '18', height: '18', viewBox: '0 0 24 24', fill: 'currentColor' },
    React.createElement('path', { d: pathStr }),
  );

const DashboardIcon = icon('M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z');
const ChartIcon = icon('M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z');
const UsersIcon = icon(
  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
);
const CalendarIcon = icon(
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
const ShieldIcon = icon(
  'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
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
const LockIcon = icon(
  'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
);

// ─── Shared Base Config items for reuse ──────────────────────────────────────
const BaseDashboardItem = { to: '/dashboard', icon: DashboardIcon, label: 'Dashboard' };

export const ROLE_NAVIGATION: Record<string, NavSection[]> = {
  [UserRole.ORGANIZATION_ADMIN]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Organization',
      items: [
        {
          to: '/org/branches',
          icon: BuildingIcon,
          label: 'Branches',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
        {
          to: '/org/principals',
          icon: UsersIcon,
          label: 'Branch Administrators',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
      ],
    },
    {
      section: 'Analytics & Insights',
      items: [
        {
          to: '/org/analytics/academic',
          icon: ChartIcon,
          label: 'Academic Analytics',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
        {
          to: '/org/analytics/financial',
          icon: TrendIcon,
          label: 'Financial Analytics',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
        {
          to: '/org/analytics/hr',
          icon: UserIcon,
          label: 'HR Analytics',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
        {
          to: '/org/analytics/financial#revenue',
          icon: ReportIcon,
          label: 'Revenue',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
      ],
    },
    {
      section: 'Communication',
      items: [
        {
          to: '/org/announcements',
          icon: CommunicationIcon,
          label: 'Announcements',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
        {
          to: '/org/communication',
          icon: CommunicationIcon,
          label: 'Communication',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
      ],
    },
    {
      section: 'Setup & Logs',
      items: [
        {
          to: '/org/branding',
          icon: SettingsIcon,
          label: 'Organization Profile',
          permission: PERMISSIONS.ORGANIZATION_EDIT,
        },
        {
          to: '/org/documents',
          icon: BookIcon,
          label: 'Documents',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
        {
          to: '/org/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
        {
          to: '/org/audit-logs',
          icon: ShieldIcon,
          label: 'Audit Logs',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
        {
          to: '/org/subscription',
          icon: LockIcon,
          label: 'Subscription',
          permission: PERMISSIONS.ORGANIZATION_VIEW,
        },
        {
          to: '/org/settings',
          icon: SettingsIcon,
          label: 'Settings',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
      ],
    },
  ],

  [UserRole.SUPER_ADMIN]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Platform Setup',
      items: [
        {
          to: '/settings',
          icon: BuildingIcon,
          label: 'Organization',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
        {
          to: '/settings',
          icon: TrendIcon,
          label: 'Organization Profile',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
        {
          to: '/settings',
          icon: SettingsIcon,
          label: 'Subscription',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
      ],
    },
    {
      section: 'Academic Setup',
      items: [
        {
          to: '/classes',
          icon: BuildingIcon,
          label: 'Classes',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/subjects',
          icon: BookIcon,
          label: 'Subjects',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/academic-years',
          icon: CalendarIcon,
          label: 'Academic Years',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
      ],
    },
    {
      section: 'Administration',
      items: [
        { to: '/users', icon: UsersIcon, label: 'Users', permission: PERMISSIONS.SETTINGS_VIEW },
        {
          to: '/settings',
          icon: LockIcon,
          label: 'Roles & Permissions',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
        {
          to: '/settings',
          icon: SettingsIcon,
          label: 'Integrations',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
        {
          to: '/settings',
          icon: ShieldIcon,
          label: 'Security',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
        {
          to: '/audit-logs',
          icon: ReportIcon,
          label: 'Audit Logs',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.SCHOOL_ADMIN]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Directories',
      items: [
        {
          to: '/settings',
          icon: BuildingIcon,
          label: 'Organization',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
        {
          to: '/admissions',
          icon: CalendarIcon,
          label: 'Admissions',
          permission: PERMISSIONS.ADMISSIONS_VIEW,
        },
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Students',
          permission: PERMISSIONS.STUDENTS_VIEW,
        },
        {
          to: '/teachers',
          icon: UserIcon,
          label: 'Teachers',
          permission: PERMISSIONS.TEACHERS_VIEW,
        },
        { to: '/parents', icon: UsersIcon, label: 'Parents', permission: PERMISSIONS.PARENTS_VIEW },
      ],
    },
    {
      section: 'Academics & Exams',
      items: [
        {
          to: '/academic',
          icon: BuildingIcon,
          label: 'Academics',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/attendance',
          icon: CalendarIcon,
          label: 'Attendance',
          permission: PERMISSIONS.ATTENDANCE_VIEW,
        },
        {
          to: '/exams',
          icon: TrendIcon,
          label: 'Examinations',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
      ],
    },
    {
      section: 'Operations & Services',
      items: [
        { to: '/fees', icon: ReportIcon, label: 'Fees', permission: PERMISSIONS.FEES_VIEW },
        { to: '/library', icon: BookIcon, label: 'Library', permission: PERMISSIONS.LIBRARY_VIEW },
        {
          to: '/transport',
          icon: TransportIcon,
          label: 'Transport',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
        {
          to: '/communication',
          icon: CommunicationIcon,
          label: 'Communication',
          permission: PERMISSIONS.ATTENDANCE_VIEW,
        },
        {
          to: '/events',
          icon: CalendarIcon,
          label: 'Events',
          permission: PERMISSIONS.ATTENDANCE_VIEW,
        },
        {
          to: '/inventory',
          icon: BuildingIcon,
          label: 'Services',
          permission: PERMISSIONS.INVENTORY_VIEW,
        },
      ],
    },
    {
      section: 'Reports & Settings',
      items: [
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
        {
          to: '/analytics',
          icon: ChartIcon,
          label: 'Analytics',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
        {
          to: '/settings',
          icon: SettingsIcon,
          label: 'Settings',
          permission: PERMISSIONS.SETTINGS_VIEW,
        },
      ],
    },
  ],

  [UserRole.PRINCIPAL]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Directories',
      items: [
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Students',
          permission: PERMISSIONS.STUDENTS_VIEW,
        },
        {
          to: '/teachers',
          icon: UserIcon,
          label: 'Teachers',
          permission: PERMISSIONS.TEACHERS_VIEW,
        },
        { to: '/parents', icon: UsersIcon, label: 'Parents', permission: PERMISSIONS.PARENTS_VIEW },
      ],
    },
    {
      section: 'Academics',
      items: [
        {
          to: '/attendance',
          icon: CalendarIcon,
          label: 'Attendance',
          permission: PERMISSIONS.ATTENDANCE_VIEW,
        },
        {
          to: '/students',
          icon: BookIcon,
          label: 'Homework',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/students',
          icon: ReportIcon,
          label: 'Assignments',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/exams',
          icon: TrendIcon,
          label: 'Examinations',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/reports',
          icon: ChartIcon,
          label: 'Results',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
      ],
    },
    {
      section: 'School Life',
      items: [
        { to: '/events', icon: CalendarIcon, label: 'Events', permission: PERMISSIONS.EVENTS_VIEW },
        {
          to: '/communication',
          icon: CommunicationIcon,
          label: 'Communication',
          permission: PERMISSIONS.COMMUNICATION_VIEW,
        },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Certificates',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
    {
      section: 'Insights',
      items: [
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
        {
          to: '/analytics',
          icon: ChartIcon,
          label: 'Analytics',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.VICE_PRINCIPAL]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Academic Supervision',
      items: [
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Students',
          permission: PERMISSIONS.STUDENTS_VIEW,
        },
        {
          to: '/teachers',
          icon: UserIcon,
          label: 'Teachers',
          permission: PERMISSIONS.TEACHERS_VIEW,
        },
        {
          to: '/attendance',
          icon: CalendarIcon,
          label: 'Attendance',
          permission: PERMISSIONS.ATTENDANCE_VIEW,
        },
        {
          to: '/students',
          icon: BookIcon,
          label: 'Homework',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/students',
          icon: ReportIcon,
          label: 'Assignments',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
      ],
    },
    {
      section: 'Exams & Timetables',
      items: [
        { to: '/exams', icon: TrendIcon, label: 'Exams', permission: PERMISSIONS.ACADEMIC_VIEW },
        {
          to: '/reports',
          icon: ChartIcon,
          label: 'Results',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
        {
          to: '/academic',
          icon: CalendarIcon,
          label: 'Timetable',
          permission: PERMISSIONS.ACADEMIC_VIEW,
        },
      ],
    },
    {
      section: 'Communication',
      items: [
        {
          to: '/communication',
          icon: CommunicationIcon,
          label: 'Communication',
          permission: PERMISSIONS.COMMUNICATION_VIEW,
        },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.ACCOUNTANT]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Fee Management',
      items: [
        {
          to: '/fees',
          icon: ReportIcon,
          label: 'Fee Management',
          permission: PERMISSIONS.FEES_VIEW,
        },
        {
          to: '/fees',
          icon: BuildingIcon,
          label: 'Fee Structure',
          permission: PERMISSIONS.FEES_VIEW,
        },
        { to: '/fees', icon: TrendIcon, label: 'Scholarships', permission: PERMISSIONS.FEES_VIEW },
        { to: '/fees', icon: SettingsIcon, label: 'Discounts', permission: PERMISSIONS.FEES_VIEW },
      ],
    },
    {
      section: 'Finance & Payroll',
      items: [
        { to: '/fees', icon: TransportIcon, label: 'Expenses', permission: PERMISSIONS.FEES_VIEW },
        { to: '/fees', icon: ChartIcon, label: 'Income', permission: PERMISSIONS.FEES_VIEW },
        { to: '/fees', icon: ReportIcon, label: 'Invoices', permission: PERMISSIONS.FEES_VIEW },
        { to: '/fees', icon: BookIcon, label: 'Receipts', permission: PERMISSIONS.FEES_VIEW },
        { to: '/hr', icon: UserIcon, label: 'Payroll', permission: PERMISSIONS.PAYROLL_VIEW },
      ],
    },
    {
      section: 'Analytics',
      items: [
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
        {
          to: '/analytics',
          icon: ChartIcon,
          label: 'Analytics',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.LIBRARIAN]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Catalog',
      items: [
        { to: '/library', icon: BookIcon, label: 'Books', permission: PERMISSIONS.LIBRARY_VIEW },
        {
          to: '/library',
          icon: BuildingIcon,
          label: 'Categories',
          permission: PERMISSIONS.LIBRARY_VIEW,
        },
      ],
    },
    {
      section: 'Circulation',
      items: [
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Members',
          permission: PERMISSIONS.LIBRARY_VIEW,
        },
        {
          to: '/library',
          icon: CalendarIcon,
          label: 'Issue Books',
          permission: PERMISSIONS.LIBRARY_VIEW,
        },
        {
          to: '/library',
          icon: ReportIcon,
          label: 'Return Books',
          permission: PERMISSIONS.LIBRARY_VIEW,
        },
        {
          to: '/library',
          icon: TrendIcon,
          label: 'Reservations',
          permission: PERMISSIONS.LIBRARY_VIEW,
        },
      ],
    },
    {
      section: 'Fees & Insights',
      items: [
        {
          to: '/library',
          icon: SettingsIcon,
          label: 'Fines',
          permission: PERMISSIONS.LIBRARY_VIEW,
        },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.HR]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Staff Directory',
      items: [
        { to: '/hr', icon: UsersIcon, label: 'Employees', permission: PERMISSIONS.HR_VIEW },
        {
          to: '/teachers',
          icon: UserIcon,
          label: 'Teachers',
          permission: PERMISSIONS.TEACHERS_VIEW,
        },
        {
          to: '/hr',
          icon: BuildingIcon,
          label: 'Non Teaching Staff',
          permission: PERMISSIONS.HR_VIEW,
        },
      ],
    },
    {
      section: 'HR Operations',
      items: [
        { to: '/hr', icon: ChartIcon, label: 'Recruitment', permission: PERMISSIONS.HR_VIEW },
        {
          to: '/attendance',
          icon: CalendarIcon,
          label: 'Attendance',
          permission: PERMISSIONS.HR_VIEW,
        },
        { to: '/hr', icon: BookIcon, label: 'Leaves', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr', icon: TrendIcon, label: 'Performance', permission: PERMISSIONS.HR_VIEW },
        { to: '/hr', icon: SettingsIcon, label: 'Training', permission: PERMISSIONS.HR_VIEW },
      ],
    },
    {
      section: 'Documents & Reports',
      items: [
        { to: '/hr', icon: ReportIcon, label: 'Documents', permission: PERMISSIONS.HR_VIEW },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.TRANSPORT_MANAGER]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Fleet & Routes',
      items: [
        {
          to: '/transport',
          icon: BuildingIcon,
          label: 'Routes',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
        {
          to: '/transport',
          icon: TransportIcon,
          label: 'Vehicles',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
        {
          to: '/transport',
          icon: UserIcon,
          label: 'Drivers',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
      ],
    },
    {
      section: 'Student Transport',
      items: [
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Students',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
        {
          to: '/transport',
          icon: SettingsIcon,
          label: 'Tracking',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
      ],
    },
    {
      section: 'Operations',
      items: [
        {
          to: '/transport',
          icon: ReportIcon,
          label: 'Maintenance',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
        {
          to: '/transport',
          icon: TrendIcon,
          label: 'Fuel',
          permission: PERMISSIONS.TRANSPORT_VIEW,
        },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.HOSTEL_MANAGER]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Rooms Setup',
      items: [
        {
          to: '/inventory',
          icon: BuildingIcon,
          label: 'Hostels',
          permission: PERMISSIONS.HOSTEL_VIEW,
        },
        { to: '/inventory', icon: UsersIcon, label: 'Rooms', permission: PERMISSIONS.HOSTEL_VIEW },
        { to: '/inventory', icon: BookIcon, label: 'Beds', permission: PERMISSIONS.HOSTEL_VIEW },
      ],
    },
    {
      section: 'Inmates',
      items: [
        { to: '/students', icon: UserIcon, label: 'Students', permission: PERMISSIONS.HOSTEL_VIEW },
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Visitors',
          permission: PERMISSIONS.VISITOR_VIEW,
        },
        {
          to: '/inventory',
          icon: ReportIcon,
          label: 'Complaints',
          permission: PERMISSIONS.HOSTEL_VIEW,
        },
      ],
    },
    {
      section: 'Mess & Inventory',
      items: [
        {
          to: '/inventory',
          icon: TransportIcon,
          label: 'Mess',
          permission: PERMISSIONS.HOSTEL_VIEW,
        },
        {
          to: '/inventory',
          icon: SettingsIcon,
          label: 'Inventory',
          permission: PERMISSIONS.INVENTORY_VIEW,
        },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.RECEPTIONIST]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Front Desk',
      items: [
        {
          to: '/admissions',
          icon: CalendarIcon,
          label: 'Admissions',
          permission: PERMISSIONS.ADMISSIONS_VIEW,
        },
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Visitors',
          permission: PERMISSIONS.VISITOR_VIEW,
        },
        {
          to: '/communication',
          icon: BuildingIcon,
          label: 'Appointments',
          permission: PERMISSIONS.VISITOR_VIEW,
        },
        {
          to: '/communication',
          icon: CommunicationIcon,
          label: 'Enquiries',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
        {
          to: '/students',
          icon: UserIcon,
          label: 'Student Search',
          permission: PERMISSIONS.STUDENTS_VIEW,
        },
      ],
    },
    {
      section: 'Notifications & Reports',
      items: [
        {
          to: '/communication',
          icon: CommunicationIcon,
          label: 'Announcements',
          permission: PERMISSIONS.STUDENTS_VIEW,
        },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.SECURITY]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Access Logs',
      items: [
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Visitor Passes',
          permission: PERMISSIONS.VISITOR_VIEW,
        },
        {
          to: '/transport',
          icon: TransportIcon,
          label: 'Vehicle Entry',
          permission: PERMISSIONS.SECURITY_VIEW,
        },
        {
          to: '/students',
          icon: BuildingIcon,
          label: 'Student Exit',
          permission: PERMISSIONS.SECURITY_VIEW,
        },
        { to: '/hr', icon: UserIcon, label: 'Staff Entry', permission: PERMISSIONS.SECURITY_VIEW },
      ],
    },
    {
      section: 'Incidents & Alerts',
      items: [
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Incident Reports',
          permission: PERMISSIONS.SECURITY_VIEW,
        },
        {
          to: '/communication',
          icon: CommunicationIcon,
          label: 'Emergency Alerts',
          permission: PERMISSIONS.SECURITY_VIEW,
        },
      ],
    },
  ],

  [UserRole.NURSE]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Health Desk',
      items: [
        {
          to: '/students',
          icon: ReportIcon,
          label: 'Medical Records',
          permission: PERMISSIONS.MEDICAL_VIEW,
        },
        {
          to: '/communication',
          icon: CalendarIcon,
          label: 'Appointments',
          permission: PERMISSIONS.MEDICAL_VIEW,
        },
        {
          to: '/students',
          icon: TrendIcon,
          label: 'Vaccinations',
          permission: PERMISSIONS.MEDICAL_VIEW,
        },
        {
          to: '/inventory',
          icon: SettingsIcon,
          label: 'Medicines',
          permission: PERMISSIONS.MEDICAL_VIEW,
        },
      ],
    },
    {
      section: 'Emergency Info',
      items: [
        {
          to: '/parents',
          icon: UsersIcon,
          label: 'Emergency Contacts',
          permission: PERMISSIONS.MEDICAL_VIEW,
        },
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],

  [UserRole.COUNSELOR]: [
    {
      section: 'Overview',
      items: [BaseDashboardItem],
    },
    {
      section: 'Counseling Desk',
      items: [
        {
          to: '/students',
          icon: UsersIcon,
          label: 'Students',
          permission: PERMISSIONS.COUNSELING_VIEW,
        },
        {
          to: '/communication',
          icon: CalendarIcon,
          label: 'Appointments',
          permission: PERMISSIONS.COUNSELING_VIEW,
        },
        {
          to: '/students',
          icon: UserIcon,
          label: 'Counseling Sessions',
          permission: PERMISSIONS.COUNSELING_VIEW,
        },
        {
          to: '/students',
          icon: TrendIcon,
          label: 'Career Guidance',
          permission: PERMISSIONS.COUNSELING_VIEW,
        },
        {
          to: '/parents',
          icon: UsersIcon,
          label: 'Parent Meetings',
          permission: PERMISSIONS.COUNSELING_VIEW,
        },
      ],
    },
    {
      section: 'Insights',
      items: [
        {
          to: '/reports',
          icon: ReportIcon,
          label: 'Reports',
          permission: PERMISSIONS.REPORTS_VIEW,
        },
      ],
    },
  ],
};
