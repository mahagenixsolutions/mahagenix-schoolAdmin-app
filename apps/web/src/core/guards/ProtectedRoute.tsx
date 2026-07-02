import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePermission } from '../hooks/usePermission';
import type { Permission } from '../permissions/PERMISSIONS';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: Permission;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, permission }) => {
  const hasPermission = usePermission(permission as Permission);

  if (permission && !hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
