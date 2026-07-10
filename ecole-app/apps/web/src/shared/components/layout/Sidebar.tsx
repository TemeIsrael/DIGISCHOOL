import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../features/auth/store';
import { Avatar } from '../ui/Avatar';
import {
  LayoutDashboard, Users, GraduationCap, CreditCard, MessageSquare,
  ShieldCheck, BookOpen, BarChart3, Settings, Clock,
  ClipboardList, FileText, ChevronLeft, ChevronRight, Bell, Heart
} from 'lucide-react';

interface SidebarLink {
  to: string;
  labelKey: string;
  icon: React.ReactNode;
  adminTypes?: number[]; // restrict to specific admin sub-types
  roles?: string[]; // restrict to specific roles (e.g. 'ADMIN', 'TEACHER', 'PARENT')
}

const allLinks: SidebarLink[] = [
  // ─── Admin links ─────────────────────────────────────────────────────
  { to: '/dashboard',  labelKey: 'sidebar.dashboard',  icon: <LayoutDashboard className="w-5 h-5" />, roles: ['ADMIN'] },
  // Students – Secrétariat(1) + Directeur(4)
  { to: '/students',   labelKey: 'sidebar.students',   icon: <GraduationCap className="w-5 h-5" />, adminTypes: [1, 4], roles: ['ADMIN'] },
  // Personnel – Admin Root(0) + Secrétariat(1) + Directeur(4)
  { to: '/personnel',  labelKey: 'sidebar.personnel',  icon: <Users className="w-5 h-5" />,         adminTypes: [0, 1, 4], roles: ['ADMIN'] },
  // Parents d'élèves – Secrétariat(1) + Directeur(4)
  { to: '/parents',    labelKey: 'sidebar.parents',    icon: <Heart className="w-5 h-5" />,          adminTypes: [1, 4],    roles: ['ADMIN'] },
  // Payments – Secrétariat(1) + Fondateur(3) + Directeur(4)
  { to: '/payments',   labelKey: 'sidebar.payments',   icon: <CreditCard className="w-5 h-5" />,    adminTypes: [1, 3, 4], roles: ['ADMIN'] },
  // Pédagogie (salles, cycles) – Scolarité(2) + Directeur(4)
  { to: '/academic',   labelKey: 'sidebar.academic',   icon: <Settings className="w-5 h-5" />,      adminTypes: [2, 4], roles: ['ADMIN'] },
  { to: '/schedules',  labelKey: 'sidebar.schedules',  icon: <Clock className="w-5 h-5" />,         adminTypes: [2, 4], roles: ['ADMIN'] },
  { to: '/grades',     labelKey: 'sidebar.grades',     icon: <ClipboardList className="w-5 h-5" />, adminTypes: [2, 4], roles: ['ADMIN'] },
  { to: '/bulletins',  labelKey: 'sidebar.bulletins',  icon: <FileText className="w-5 h-5" />,      adminTypes: [2, 4], roles: ['ADMIN'] },
  { to: '/discipline', labelKey: 'sidebar.discipline', icon: <ShieldCheck className="w-5 h-5" />,   adminTypes: [2, 4], roles: ['ADMIN'] },
  // Bibliothèque – Secrétariat(1) + Scolarité(2)
  { to: '/library',    labelKey: 'sidebar.library',    icon: <BookOpen className="w-5 h-5" />,      adminTypes: [1, 2], roles: ['ADMIN'] },
  // Directeur & Fondateur voir les livres publics aussi
  { to: '/livres',     labelKey: 'sidebar.library',    icon: <BookOpen className="w-5 h-5" />,      adminTypes: [3, 4],    roles: ['ADMIN'] },
  // Stats – Fondateur(3) + Directeur(4)
  { to: '/stats',         labelKey: 'sidebar.stats',          icon: <BarChart3 className="w-5 h-5" />,     adminTypes: [3, 4], roles: ['ADMIN'] },
  // Messages & Notifications – adminTypes excludes 0 (ROOT)
  { to: '/messages',      labelKey: 'sidebar.messages',       icon: <MessageSquare className="w-5 h-5" />, adminTypes: [1, 2, 3, 4], roles: ['ADMIN'] },
  { to: '/notifications', labelKey: 'sidebar.notifications',  icon: <Bell className="w-5 h-5" />,          adminTypes: [1, 2, 3, 4], roles: ['ADMIN'] },

  // ─── Teacher links ───────────────────────────────────────────────────
  { to: '/teacher/dashboard',  labelKey: 'navbar.teacher_space', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['TEACHER'] },
  { to: '/teacher/students',   labelKey: 'sidebar.students',     icon: <GraduationCap className="w-5 h-5" />, roles: ['TEACHER'] },
  { to: '/teacher/grades',     labelKey: 'sidebar.grades',       icon: <ClipboardList className="w-5 h-5" />, roles: ['TEACHER'] },
  { to: '/teacher/bulletins',  labelKey: 'sidebar.bulletins',    icon: <FileText className="w-5 h-5" />,      roles: ['TEACHER'] },
  { to: '/teacher/schedules',  labelKey: 'sidebar.schedules',    icon: <Clock className="w-5 h-5" />,         roles: ['TEACHER'] },
  { to: '/teacher/discipline', labelKey: 'sidebar.discipline',   icon: <ShieldCheck className="w-5 h-5" />,   roles: ['TEACHER'] },
  { to: '/teacher/homeworks',  labelKey: 'navbar.homeworks',     icon: <BookOpen className="w-5 h-5" />,      roles: ['TEACHER'] },
  { to: '/teacher/messages',   labelKey: 'sidebar.messages',     icon: <MessageSquare className="w-5 h-5" />, roles: ['TEACHER'] },
  { to: '/notifications',      labelKey: 'sidebar.notifications', icon: <Bell className="w-5 h-5" />,         roles: ['TEACHER'] },

  // ─── Parent links ────────────────────────────────────────────────────
  { to: '/parent/dashboard',  labelKey: 'navbar.parent_space',  icon: <LayoutDashboard className="w-5 h-5" />, roles: ['PARENT'] },
  { to: '/parent/schedule',   labelKey: 'sidebar.schedules',    icon: <Clock className="w-5 h-5" />,          roles: ['PARENT'] },
  { to: '/parent/bulletins',  labelKey: 'sidebar.bulletins',    icon: <FileText className="w-5 h-5" />,       roles: ['PARENT'] },
  { to: '/parent/payments',   labelKey: 'sidebar.payments',     icon: <CreditCard className="w-5 h-5" />,     roles: ['PARENT'] },
  { to: '/parent/homeworks',  labelKey: 'navbar.homeworks',     icon: <BookOpen className="w-5 h-5" />,       roles: ['PARENT'] },
  { to: '/parent/library',    labelKey: 'sidebar.library',      icon: <BookOpen className="w-5 h-5" />,       roles: ['PARENT'] },
  { to: '/parent/messages',   labelKey: 'sidebar.messages',     icon: <MessageSquare className="w-5 h-5" />,  roles: ['PARENT'] },
  { to: '/notifications',     labelKey: 'sidebar.notifications', icon: <Bell className="w-5 h-5" />,          roles: ['PARENT'] },
];


export interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const location = useLocation();

  // Filter links based on role and admin sub-type
  const visibleLinks = allLinks.filter((link) => {
    const isAdminUser = user && ['ROOT','ADMIN_ROOT','ADMIN_INSCRIPTIONS','ADMIN_SCOLARITE','FONDATEUR','DIRECTEUR','ADMIN'].includes(user.role);

    if (link.roles) {
      if (isAdminUser && link.roles.includes('ADMIN')) {
        // ADMIN_ROOT (typeAdmin=0) sees only links where 0 is in adminTypes
        // No universal bypass – each link must explicitly include type 0

        // Other admin sub-types filtered by adminTypes
        if (link.adminTypes) {
          return link.adminTypes.includes(user?.typeAdmin ?? -1);
        }
        return true; // Links without adminTypes restriction visible to all admins
      }

      // Pour les autres rôles (TEACHER, PARENT)
      if (!link.roles.includes(user?.role || '')) {
        return false;
      }
    }
    return true;
  });

  return (
    <aside
      className={`h-full bg-white border-r border-[#E5E7EB] flex flex-col z-30 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[250px]'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-50 shrink-0">
        {!collapsed && (
          <span className="text-xl font-black text-digi-purple tracking-tight">DIGISCHOOL</span>
        )}
        {collapsed && (
          <span className="text-xl font-black text-digi-purple mx-auto">DS</span>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* User Info (when not collapsed) */}
      {!collapsed && user && (
        <div className="px-4 py-3 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <Avatar name={user.nom ? `${user.nom} ${user.prenom || ''}` : user.login} size="sm" status="online" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 truncate">
                {user.nom ? `${user.prenom || ''} ${user.nom}` : user.login}
              </p>
              <p className="text-[10px] font-semibold text-digi-purple uppercase tracking-wider truncate">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {visibleLinks.map((link) => {
          const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
          return (
            <NavLink
              key={link.to}
              to={link.to}
              title={collapsed ? t(link.labelKey) : undefined}
              className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                collapsed ? 'justify-center px-2' : 'px-4'
              } ${
                isActive
                  ? 'bg-digi-purple-bg text-digi-purple shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <span className={`shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                {link.icon}
              </span>
              {!collapsed && <span className="truncate">{t(link.labelKey)}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-50 shrink-0">
        {!collapsed ? (
          <p className="text-[10px] text-slate-300 font-semibold text-center">© 2026 DIGISCHOOL</p>
        ) : (
          <p className="text-[10px] text-slate-300 font-semibold text-center">©</p>
        )}
      </div>
    </aside>
  );
};
