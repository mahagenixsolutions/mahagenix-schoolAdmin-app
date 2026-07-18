import { UserRole } from '@edutrack/shared-types';
import { superAdminDashboard } from './superAdmin';
import { principalDashboard } from './principal';
import { vicePrincipalDashboard } from './vicePrincipal';
import { hrDashboard } from './hr';
import { accountantDashboard } from './accountant';
import { receptionistDashboard } from './receptionist';
import { librarianDashboard } from './librarian';
import { transportDashboard } from './transport';
import { hostelDashboard } from './hostel';
import { nurseDashboard } from './nurse';
import { counselorDashboard } from './counselor';
import { securityDashboard } from './security';
import type { RoleDashboardConfig } from './types';

export type { RoleDashboardConfig } from './types';
export type { DashboardStat, DashboardQuickAction, DashboardActivity, DashboardWidget, DashboardWidgetItem } from './types';

export const ROLE_DASHBOARDS: Partial<Record<UserRole, RoleDashboardConfig>> = {
  [UserRole.SUPER_ADMIN]: superAdminDashboard,
  [UserRole.PRINCIPAL]: principalDashboard,
  [UserRole.VICE_PRINCIPAL]: vicePrincipalDashboard,
  [UserRole.HR]: hrDashboard,
  [UserRole.ACCOUNTANT]: accountantDashboard,
  [UserRole.RECEPTIONIST]: receptionistDashboard,
  [UserRole.LIBRARIAN]: librarianDashboard,
  [UserRole.TRANSPORT_MANAGER]: transportDashboard,
  [UserRole.HOSTEL_MANAGER]: hostelDashboard,
  [UserRole.NURSE]: nurseDashboard,
  [UserRole.COUNSELOR]: counselorDashboard,
  [UserRole.SECURITY]: securityDashboard,
};
