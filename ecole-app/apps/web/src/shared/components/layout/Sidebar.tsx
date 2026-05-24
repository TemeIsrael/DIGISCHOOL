import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  History,
  BarChart3,
  Settings,
  Clock,
  ClipboardList,
  FileText
} from 'lucide-react';

const allLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { to: '/students', label: 'Élèves', icon: <GraduationCap className="w-5 h-5" /> },
  { to: '/personnel', label: 'Personnel', icon: <Users className="w-5 h-5" /> },
  { to: '/academic', label: 'Académie', icon: <Settings className="w-5 h-5" /> },
  { to: '/schedules', label: 'Emploi du Temps', icon: <Clock className="w-5 h-5" /> },
  { to: '/grades', label: 'Notes', icon: <ClipboardList className="w-5 h-5" /> },
  { to: '/bulletins', label: 'Bulletins', icon: <FileText className="w-5 h-5" /> },
  { to: '/payments', label: 'Paiements', icon: <CreditCard className="w-5 h-5" /> },
  { to: '/messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" /> },
  { to: '/discipline', label: 'Discipline', icon: <ShieldCheck className="w-5 h-5" /> },
  { to: '/library', label: 'Bibliothèque', icon: <BookOpen className="w-5 h-5" /> },
  { to: '/stats', label: 'Statistiques', icon: <BarChart3 className="w-5 h-5" /> },
  { to: '/audit', label: 'Audit & Logs', icon: <History className="w-5 h-5" /> },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 w-[250px] h-screen bg-white border-r border-[#E5E7EB] flex flex-col z-30">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-50">
        <span className="text-xl font-black text-digi-purple tracking-tight">DIGISCHOOL</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 space-y-0.5 px-3 overflow-y-auto">
        {allLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#EEEDFE] text-[#534AB7] border-l-[3px] border-l-[#534AB7] pl-[13px]'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-l-[3px] border-l-transparent pl-[13px]'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-50">
        <p className="text-[10px] text-slate-300 font-semibold text-center">© 2026 DIGISCHOOL</p>
      </div>
    </aside>
  );
};
