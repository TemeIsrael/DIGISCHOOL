import React from 'react';
import { LogOut, Globe, Calendar, Bell, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../ui/Avatar';

export interface TopbarProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  // Generate breadcrumb from path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbMap: Record<string, string> = {
    dashboard: t('sidebar.dashboard'),
    students: t('sidebar.students'),
    personnel: t('sidebar.personnel'),
    academic: t('sidebar.academic'),
    schedules: t('sidebar.schedules'),
    grades: t('sidebar.grades'),
    bulletins: t('sidebar.bulletins'),
    payments: t('sidebar.payments'),
    messages: t('sidebar.messages'),
    discipline: t('sidebar.discipline'),
    library: t('sidebar.library'),
    stats: t('sidebar.stats'),
    audit: t('sidebar.audit'),
    new: t('common.create'),
    edit: t('common.edit'),
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-1.5 text-sm">
          {pathSegments.map((segment, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-300">/</span>}
              <span className={`font-semibold ${idx === pathSegments.length - 1 ? 'text-slate-800' : 'text-slate-400'}`}>
                {breadcrumbMap[segment] || segment}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile: welcome */}
        <div className="md:hidden">
          <span className="text-sm font-semibold text-slate-600">
            {t('topbar.welcome')} <span className="font-bold text-slate-800">{user?.login}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Academic Year */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-digi-purple" />
          <select className="bg-transparent border-0 focus:ring-0 p-0 text-xs font-bold cursor-pointer">
            <option value="2025-2026">2025-2026</option>
            <option value="2026-2027">2026-2027</option>
          </select>
        </div>

        {/* Language */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-600">
          <Globe className="w-3.5 h-3.5 text-digi-purple" />
          <select
            onChange={changeLanguage}
            value={i18n.language}
            className="bg-transparent border-0 focus:ring-0 p-0 text-xs font-bold cursor-pointer"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-digi-danger rounded-full" />
        </button>

        {/* User Avatar + Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
          <Avatar
            name={user?.nom ? `${user.nom} ${user.prenom || ''}` : user?.login}
            size="sm"
          />
          <div className="hidden md:block min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
              {user?.nom ? `${user.prenom || ''} ${user.nom}` : user?.login}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-400 hover:text-digi-danger hover:bg-rose-50 transition-colors"
            title={t('auth.logout')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
