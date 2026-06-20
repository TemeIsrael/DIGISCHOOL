import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store';

export interface RequireAdminTypeProps {
  /** Admin sub-type IDs allowed to access this route */
  allowedTypes: number[];
  children: React.ReactNode;
}

/**
 * Guard component that restricts access to routes based on admin sub-type.
 * typeAdmin === 0  → Root (Super Admin)
 * typeAdmin === 1  → Admin (Secretary)
 * typeAdmin === 2  → Scolarité (Registrar)
 * typeAdmin === 3  → Fondateur (Founder)
 * typeAdmin === 4  → Directeur (Director)
 * typeAdmin === 5  → Auditeur (Auditor)
 */
export const RequireAdminType: React.FC<RequireAdminTypeProps> = ({ allowedTypes, children }) => {
  const user = useAuthStore((state) => state.user);

  const typeAdmin = user?.typeAdmin ?? -1;

  // typeAdmin === 0 is the Root Admin, they have access to everything
  if (typeAdmin === 0 || allowedTypes.includes(typeAdmin)) {
    return <>{children}</>;
  }

  return <Navigate to="/forbidden" replace />;
};
