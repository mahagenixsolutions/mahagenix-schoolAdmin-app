import { UserRole } from '@edutrack/shared-types';

export const ROLES = {
  SUPER_ADMIN: UserRole.SUPER_ADMIN,
  SCHOOL_ADMIN: UserRole.SCHOOL_ADMIN,
  PRINCIPAL: UserRole.PRINCIPAL,
  VICE_PRINCIPAL: UserRole.VICE_PRINCIPAL,
  TEACHER: UserRole.TEACHER,
  STUDENT: UserRole.STUDENT,
  PARENT: UserRole.PARENT,
  ACCOUNTANT: UserRole.ACCOUNTANT,
  HR: UserRole.HR,
  LIBRARIAN: UserRole.LIBRARIAN,
  TRANSPORT_MANAGER: UserRole.TRANSPORT_MANAGER,
  HOSTEL_MANAGER: UserRole.HOSTEL_MANAGER,
  RECEPTIONIST: UserRole.RECEPTIONIST,
  SECURITY: UserRole.SECURITY,
  NURSE: UserRole.NURSE,
  COUNSELOR: UserRole.COUNSELOR,
} as const;

export const isAdminRole = (role: UserRole) => {
  return [ROLES.SUPER_ADMIN, ROLES.SCHOOL_ADMIN].includes(role);
};

export const isStaffRole = (role: UserRole) => {
  return ![ROLES.STUDENT, ROLES.PARENT].includes(role);
};
