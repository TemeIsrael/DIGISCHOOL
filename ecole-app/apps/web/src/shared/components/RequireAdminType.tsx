import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store';

export interface RequireAdminTypeProps {
  allowedTypes: number[];
  children: React.ReactNode;
}

export const RequireAdminType: React.FC<RequireAdminTypeProps> = ({ allowedTypes, children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedTypes.includes(user.typeAdmin ?? -1)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};
