import React from 'react';
import { useAuthStore } from '../../../features/auth/store';

export interface FieldGuardProps {
  allowedRoles: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const FieldGuard: React.FC<FieldGuardProps> = ({
  allowedRoles,
  fallback = null,
  children
}) => {
  const role = useAuthStore((state) => state.role);

  if (!role || !allowedRoles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
