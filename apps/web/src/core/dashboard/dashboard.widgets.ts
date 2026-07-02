import React from 'react';
import { PERMISSIONS } from '../permissions/PERMISSIONS';
import type { Permission } from '../permissions/PERMISSIONS';

export interface DashboardWidgetConfig {
  id: string;
  title: string;
  permission?: Permission;
  // component: React.FC;
}

export const DASHBOARD_WIDGETS: DashboardWidgetConfig[] = [
  {
    id: 'attendance-summary',
    title: 'Attendance Overview',
    permission: PERMISSIONS.ATTENDANCE_VIEW,
  },
  {
    id: 'financial-summary',
    title: 'Financial Overview',
    permission: PERMISSIONS.FEES_VIEW,
  },
  {
    id: 'hr-summary',
    title: 'Staff Overview',
    permission: PERMISSIONS.HR_VIEW,
  },
  {
    id: 'academic-performance',
    title: 'Academic Performance',
    permission: PERMISSIONS.ACADEMIC_VIEW,
  },
  {
    id: 'library-stats',
    title: 'Library Statistics',
    permission: PERMISSIONS.LIBRARY_VIEW,
  },
];
