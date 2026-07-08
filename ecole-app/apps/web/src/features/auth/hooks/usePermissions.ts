import { useMemo } from 'react';
import { useAuthStore } from '../store';

/**
 * Admin sub-type definitions for DIGISCHOOL:
 * 0 = Root (Super Admin) — system only: manages admin accounts, sends credentials
 * 1 = Admin (Secretary)  — inscriptions, students, personnel, messages
 * 2 = Scolarité (Registrar) — academic config, grades, schedules, discipline
 * 3 = Fondateur (Founder)   — finances, stats
 * 4 = Directeur (Director)  — oversight of all school operations, audit
 */

interface Permissions {
  /** Current role */
  role: string | null;
  /** Admin sub-type (null if not admin) */
  typeAdmin: number | null;

  /** True if user is any kind of admin */
  isAdmin: boolean;
  /** True if teacher */
  isTeacher: boolean;
  /** True if parent */
  isParent: boolean;

  /** Admin-specific checks */
  isRoot: boolean;
  isSecretary: boolean;
  isRegistrar: boolean;
  isFounder: boolean;
  isDirector: boolean;

  /** Can manage admin accounts (root only) */
  canManageAdmins: boolean;
  /** Can manage school users/students (secretary, director) */
  canManageUsers: boolean;
  /** Can manage finances (secretary, founder, director) */
  canManageFinances: boolean;
  /** Can access audit logs (director only) */
  canAccessAudit: boolean;
  /** Can configure academic settings (registrar, director) */
  canConfigureAcademic: boolean;
  /** Can enter grades (registrar, teachers) */
  canEnterGrades: boolean;
  /** Can manage discipline (registrar, director) */
  canManageDiscipline: boolean;
  /** Can add personnel, students, or schedules (secretary, registrar) */
  canAddPersonnelOrStudentsOrSchedules: boolean;

  /** Check if user has one of the specified admin sub-types */
  hasAdminType: (...types: number[]) => boolean;
}

export const usePermissions = (): Permissions => {
  const { user, role } = useAuthStore();

  return useMemo(() => {
    const typeAdmin = user?.typeAdmin ?? null;
    const isAdmin = ['ROOT','ADMIN_ROOT','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE','FONDATEUR','DIRECTEUR','ADMIN'].includes(role || '');
    const isTeacher = role === 'TEACHER';
    const isParent = role === 'PARENT';

    const isRoot      = isAdmin && typeAdmin === 0;
    const isSecretary = isAdmin && typeAdmin === 1;
    const isRegistrar = isAdmin && typeAdmin === 2;
    const isFounder   = isAdmin && typeAdmin === 3;
    const isDirector  = isAdmin && typeAdmin === 4;

    const hasAdminType = (...types: number[]) =>
      isAdmin && typeAdmin !== null && types.includes(typeAdmin);

    return {
      role,
      typeAdmin,

      isAdmin,
      isTeacher,
      isParent,

      isRoot,
      isSecretary,
      isRegistrar,
      isFounder,
      isDirector,

      // Root manages ONLY the admin system — no school-level rights
      canManageAdmins:     isRoot,
      canManageUsers:      isSecretary,
      canManageFinances:   isSecretary || isFounder,
      canAccessAudit:      isDirector,
      canConfigureAcademic: isRegistrar || isSecretary,
      canEnterGrades:      isRegistrar || isTeacher,
      canManageDiscipline: isRegistrar,
      canAddPersonnelOrStudentsOrSchedules: isSecretary || isRegistrar || isAdmin,

      hasAdminType,
    };
  }, [user, role]);
};
