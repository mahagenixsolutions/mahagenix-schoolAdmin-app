import React from 'react';
import { usePermission } from '../hooks/usePermission';
import type { Permission } from '../permissions/PERMISSIONS';

interface PermissionGateProps {
  children: React.ReactNode;
  permission: Permission;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ children, permission }) => {
  const hasPermission = usePermission(permission);

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};
