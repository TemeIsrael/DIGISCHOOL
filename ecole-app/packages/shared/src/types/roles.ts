export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export const ROLES: Record<UserRole, UserRole> = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT'
};
