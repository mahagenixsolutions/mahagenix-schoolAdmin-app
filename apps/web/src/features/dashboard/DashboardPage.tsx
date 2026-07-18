import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { UserRole } from '@edutrack/shared-types';
import { ROLES } from '../../core/permissions/ROLES';
import { isStaffRole } from '../../core/permissions/ROLES';
import ParentDashboard from '../parent/ParentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './admin/AdminDashboard';
import StudentDashboard from './student/StudentDashboard';
import RoleDashboard from './RoleDashboard';
import OrgDashboard from '../organization/pages/OrgDashboard';
import { ROLE_DASHBOARDS } from '../../mock/dashboards';

export default function DashboardPage() {
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return null;

  if (user.role === ROLES.ORGANIZATION_ADMIN) {
    return <OrgDashboard />;
  }

  // Existing dedicated dashboards — do NOT modify
  if (user.role === ROLES.TEACHER) return <TeacherDashboard />;
  if (user.role === ROLES.PARENT) return <ParentDashboard />;
  if (user.role === ROLES.STUDENT) return <StudentDashboard />;
  if (user.role === ROLES.SCHOOL_ADMIN) return <AdminDashboard />;

  // Config-driven dashboards for all other roles
  const config = ROLE_DASHBOARDS[user.role as UserRole];
  if (config) return <RoleDashboard config={config} />;

  // Ultimate fallback for any unknown staff role
  if (isStaffRole(user.role as UserRole)) return <AdminDashboard />;

  return <div>Unknown Role Dashboard</div>;
}
