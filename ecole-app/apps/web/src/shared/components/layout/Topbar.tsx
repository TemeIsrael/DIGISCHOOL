import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Globe, Calendar, Bell, Menu, X, User } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../ui/Avatar';
import { api } from '../../lib/api';

export interface TopbarProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    // Emit socket event for real-time sync across devices
    import('../../lib/socket').then(({ emitLanguageChange }) => {
      emitLanguageChange(newLang);
    });
    // Save language preference to the database for cross-device sync
    api.put('/auth/language', { langue: newLang }).catch(() => {});
  };

  // Role-based path helpers
  const getChangePasswordPath = () => {
    if (user?.role === 'TEACHER') return '/teacher/change-password';
    if (user?.role === 'PARENT') return '/parent/change-password';
    return '/change-password';
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
        <div className="flex items-center gap-1 sm:gap-2 bg-slate-50 border border-slate-200 rounded-full px-2 sm:px-3 py-1 text-xs font-semibold text-slate-600">
          <Globe className="w-3.5 h-3.5 text-digi-purple hidden sm:block" />
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
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-digi-danger rounded-full" />
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 rounded-xl shadow-lg z-50">
              <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-800">{t('dashboards.notifications', 'Notifications')}</span>
                <span className="text-xs text-digi-purple cursor-pointer hover:underline">{t('common.markAllRead', 'Tout marquer comme lu')}</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer" onClick={() => { navigate('/notifications'); setShowNotifications(false); }}>
                  <p className="text-sm text-slate-700">Nouveau document disponible: <strong>Emploi du temps</strong></p>
                  <p className="text-xs text-slate-400 mt-1">Il y a 2 heures</p>
                </div>
                <div className="p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer" onClick={() => { navigate('/notifications'); setShowNotifications(false); }}>
                  <p className="text-sm text-slate-700">Rappel: Réunion parents-professeurs demain à 16h.</p>
                  <p className="text-xs text-slate-400 mt-1">Hier</p>
                </div>
              </div>
              <div className="p-2 text-center border-t border-slate-100">
                <button
                  onClick={() => {
                    navigate('/notifications');
                    setShowNotifications(false);
                  }}
                  className="text-sm font-semibold text-digi-purple hover:underline"
                >
                  {t('common.viewAll', 'Voir tout')}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar + Profile Menu */}
        <div className="relative flex items-center gap-3 pl-3 border-l border-slate-100" ref={profileRef}>
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 focus:outline-none hover:bg-slate-50 p-1 rounded-lg transition-colors"
          >
            <Avatar
              name={user?.nom ? `${user.nom} ${user.prenom || ''}` : user?.login}
              size="sm"
            />
            <div className="hidden md:block min-w-0 text-left">
              <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                {user?.nom ? `${user.prenom || ''} ${user.nom}` : user?.login}
              </p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-50 py-1">
              <button 
                onClick={() => { setShowProfile(false); navigate(getChangePasswordPath()); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-digi-purple flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                {t('common.profile', 'Mon Profil')}
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-digi-danger hover:bg-rose-50 flex items-center gap-2"
                title={t('auth.logout')}
              >
                <LogOut className="w-4 h-4" />
                {t('auth.logout', 'Déconnexion')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
