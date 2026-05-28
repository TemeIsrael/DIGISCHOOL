import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../features/auth/store';
import { Avatar } from '../ui/Avatar';
import {
  LayoutDashboard, Users, GraduationCap, CreditCard, MessageSquare,
  ShieldCheck, BookOpen, History, BarChart3, Clock,
  ClipboardList, FileText, ChevronLeft, ChevronRight, KeyRound,
  Building, DoorOpen, Calendar, Layers, FolderOpen, Target,
  TrendingUp, Landmark, Eye, Award, UserCheck, PieChart,
  FileDown, List, Download
} from 'lucide-react';

interface SidebarLink {
  to: string;
  labelKey: string;
  icon: React.ReactNode;
}

const linksByAdminType: Record<number, SidebarLink[]> = {
  // Root (0)
  0: [
    { to: '/root', labelKey: 'sidebar.dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/root/admins', labelKey: 'sidebar.admins', icon: <ShieldCheck className="w-5 h-5" /> },
    { to: '/root/personnel', labelKey: 'sidebar.personnel', icon: <Users className="w-5 h-5" /> },
    { to: '/root/parents', labelKey: 'sidebar.parents', icon: <Users className="w-5 h-5" /> },
    { to: '/root/credentials', labelKey: 'sidebar.credentials', icon: <KeyRound className="w-5 h-5" /> },
    { to: '/root/cycles', labelKey: 'sidebar.cycles', icon: <Layers className="w-5 h-5" /> },
    { to: '/root/classes', labelKey: 'sidebar.classes', icon: <Building className="w-5 h-5" /> },
    { to: '/root/salles', labelKey: 'sidebar.rooms', icon: <DoorOpen className="w-5 h-5" /> },
    { to: '/root/years', labelKey: 'sidebar.years', icon: <Calendar className="w-5 h-5" /> },
    { to: '/root/terms', labelKey: 'sidebar.terms', icon: <Clock className="w-5 h-5" /> },
    { to: '/root/refs', labelKey: 'sidebar.referentials', icon: <FolderOpen className="w-5 h-5" /> },
    { to: '/root/audit', labelKey: 'sidebar.audit', icon: <History className="w-5 h-5" /> },
    { to: '/root/messages', labelKey: 'sidebar.messages', icon: <MessageSquare className="w-5 h-5" /> },
  ],
  // Admin Inscriptions / Secrétariat (1)
  1: [
    { to: '/administr', labelKey: 'sidebar.dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/administr/students', labelKey: 'sidebar.students', icon: <GraduationCap className="w-5 h-5" /> },
    { to: '/administr/messages', labelKey: 'sidebar.messages', icon: <MessageSquare className="w-5 h-5" /> },
  ],
  // Admin Scolarité (2)
  2: [
    { to: '/scolarite', labelKey: 'sidebar.dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/scolarite/payments', labelKey: 'sidebar.payments', icon: <CreditCard className="w-5 h-5" /> },
    { to: '/scolarite/overdue', labelKey: 'sidebar.overdue', icon: <Target className="w-5 h-5" /> },
    { to: '/scolarite/reminders', labelKey: 'sidebar.reminders', icon: <MessageSquare className="w-5 h-5" /> },
    { to: '/scolarite/reports', labelKey: 'sidebar.financialReport', icon: <TrendingUp className="w-5 h-5" /> },
    { to: '/scolarite/by-mode', labelKey: 'sidebar.byMode', icon: <PieChart className="w-5 h-5" /> },
    { to: '/scolarite/modes', labelKey: 'sidebar.paymentModes', icon: <CreditCard className="w-5 h-5" /> },
    { to: '/scolarite/export', labelKey: 'sidebar.accountingExport', icon: <FileDown className="w-5 h-5" /> },
    { to: '/scolarite/messages', labelKey: 'sidebar.messages', icon: <MessageSquare className="w-5 h-5" /> },
  ],
  // Fondateur (3)
  3: [
    { to: '/fondateur', labelKey: 'sidebar.dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/fondateur/tuitions', labelKey: 'sidebar.tuitions', icon: <Landmark className="w-5 h-5" /> },
    { to: '/fondateur/tranches', labelKey: 'sidebar.tranches', icon: <Layers className="w-5 h-5" /> },
    { to: '/fondateur/modes', labelKey: 'sidebar.paymentModes', icon: <CreditCard className="w-5 h-5" /> },
    { to: '/fondateur/balance', labelKey: 'sidebar.annualBalance', icon: <TrendingUp className="w-5 h-5" /> },
    { to: '/fondateur/compare', labelKey: 'sidebar.yearCompare', icon: <BarChart3 className="w-5 h-5" /> },
    { to: '/fondateur/explore', labelKey: 'sidebar.explorer', icon: <Eye className="w-5 h-5" /> },
    { to: '/fondateur/messages', labelKey: 'sidebar.messages', icon: <MessageSquare className="w-5 h-5" /> },
  ],
  // Directeur (4)
  4: [
    { to: '/directeur', labelKey: 'sidebar.dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/directeur/perf/classes', labelKey: 'sidebar.perfClasses', icon: <BarChart3 className="w-5 h-5" /> },
    { to: '/directeur/perf/courses', labelKey: 'sidebar.perfCourses', icon: <BookOpen className="w-5 h-5" /> },
    { to: '/directeur/perf/students', labelKey: 'sidebar.perfStudents', icon: <GraduationCap className="w-5 h-5" /> },
    { to: '/directeur/bulletins', labelKey: 'sidebar.bulletinValidation', icon: <FileText className="w-5 h-5" /> },
    { to: '/directeur/messages', labelKey: 'sidebar.messageValidation', icon: <MessageSquare className="w-5 h-5" /> },
    { to: '/directeur/discipline', labelKey: 'sidebar.disciplineApproval', icon: <ShieldCheck className="w-5 h-5" /> },
    { to: '/directeur/teachers', labelKey: 'sidebar.teacherOverview', icon: <UserCheck className="w-5 h-5" /> },
    { to: '/directeur/students', labelKey: 'sidebar.studentOverview', icon: <Users className="w-5 h-5" /> },
    { to: '/directeur/demographics', labelKey: 'sidebar.demographics', icon: <PieChart className="w-5 h-5" /> },
    { to: '/directeur/reports', labelKey: 'sidebar.syntheticReports', icon: <Award className="w-5 h-5" /> },
    { to: '/directeur/exam-stats/cep', labelKey: 'sidebar.examStatsCEP', icon: <GraduationCap className="w-5 h-5" /> },
    { to: '/directeur/exam-stats/fslc', labelKey: 'sidebar.examStatsFSLC', icon: <GraduationCap className="w-5 h-5" /> },
  ],
  // Auditeur (5)
  5: [
    { to: '/auditeur', labelKey: 'sidebar.dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/auditeur/listings', labelKey: 'sidebar.allListings', icon: <List className="w-5 h-5" /> },
    { to: '/auditeur/audit-logs', labelKey: 'sidebar.auditLogs', icon: <History className="w-5 h-5" /> },
    { to: '/auditeur/finance', labelKey: 'sidebar.financeStats', icon: <TrendingUp className="w-5 h-5" /> },
    { to: '/auditeur/pedagogy', labelKey: 'sidebar.pedagogyStats', icon: <ClipboardList className="w-5 h-5" /> },
    { to: '/auditeur/exports', labelKey: 'sidebar.exports', icon: <Download className="w-5 h-5" /> },
  ],
};

export interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const location = useLocation();

  const typeAdmin = user?.typeAdmin ?? 1;
  const visibleLinks = linksByAdminType[typeAdmin] || linksByAdminType[1];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-[#E5E7EB] flex flex-col z-30 transition-all duration-300 ${
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
