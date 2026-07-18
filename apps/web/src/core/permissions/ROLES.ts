import { UserRole } from '@edutrack/shared-types';

export const ROLES = {
  SUPER_ADMIN: UserRole.SUPER_ADMIN,
  ORGANIZATION_ADMIN: UserRole.ORGANIZATION_ADMIN,
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
  return role === ROLES.SUPER_ADMIN || role === ROLES.ORGANIZATION_ADMIN || role === ROLES.SCHOOL_ADMIN;
};

export const isStaffRole = (role: UserRole) => {
  return role !== ROLES.STUDENT && role !== ROLES.PARENT;
};
