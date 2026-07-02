import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import ParentDashboard from '../parent/ParentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './admin/AdminDashboard';
import StudentDashboard from './student/StudentDashboard';
import { isStaffRole, ROLES } from '../../core/permissions/ROLES';
import { UserRole } from '@edutrack/shared-types';

export default function DashboardPage() {
  const user = useSelector((s: RootState) => s.auth.user);

  if (!user) return null;

  if (user.role === ROLES.TEACHER) {
    return <TeacherDashboard />;
  }
  
  if (user.role === ROLES.PARENT) {
    return <ParentDashboard />;
  }
  
  if (user.role === ROLES.STUDENT) {
    return <StudentDashboard />;
  }

  // All other staff (Accountant, Librarian, HR, Principal, etc.) will use the generic AdminDashboard for now
  if (isStaffRole(user.role as UserRole)) {
    return <AdminDashboard />;
  }

  return <div>Unknown Role Dashboard</div>;
}
