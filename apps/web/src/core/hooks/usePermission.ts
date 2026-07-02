import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { ROLE_PERMISSIONS } from '../permissions/ROLE_PERMISSIONS';
import type { Permission } from '../permissions/PERMISSIONS';
import { UserRole } from '@edutrack/shared-types';

export const usePermission = (permission: Permission) => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  if (!user || !user.role) {
    return false;
  }

  const rolePermissions = ROLE_PERMISSIONS[user.role as UserRole];
  
  if (!rolePermissions) {
    return false;
  }

  return rolePermissions.includes(permission);
};

export const useHasAnyPermission = (permissions: Permission[]) => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  if (!user || !user.role) {
    return false;
  }

  const rolePermissions = ROLE_PERMISSIONS[user.role as UserRole];
  
  if (!rolePermissions) {
    return false;
  }

  return permissions.some(permission => rolePermissions.includes(permission));
};
