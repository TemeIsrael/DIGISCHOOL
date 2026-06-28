import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Globe, Calendar, Menu, X, Bell, User } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/store';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../ui/Avatar';

export const Navbar: React.FC = () => {
  // Mock notifications with read flag
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Nouveau document disponible: Emploi du temps', time: 'Il y a 2 heures', read: false },
    { id: 2, title: 'Rappel: Réunion parents-professeurs demain à 16h.', time: 'Hier', read: false },
  ]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const { user, logout } = useAuthStore();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleViewAll = () => {
    setShowNotifications(false);
    navigate('/notifications');
  };
  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

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
    i18n.changeLanguage(e.target.value);
  };

  // Nav links based on role
  const links = user?.role === 'TEACHER'
    ? [
        { to: '/teacher/dashboard', labelKey: 'navbar.teacher_space' },
        { to: '/teacher/students', labelKey: 'sidebar.students' },
        { to: '/teacher/grades', labelKey: 'sidebar.grades' },
        { to: '/teacher/bulletins', labelKey: 'sidebar.bulletins' },
        { to: '/teacher/schedules', labelKey: 'sidebar.schedules' },
        { to: '/teacher/discipline', labelKey: 'sidebar.discipline' },
        { to: '/teacher/homeworks', labelKey: 'navbar.homeworks' },
        { to: '/teacher/messages', labelKey: 'sidebar.messages' },
      ]
    : [
        { to: '/parent/dashboard', labelKey: 'navbar.parent_space' },
        { to: '/parent/schedule', labelKey: 'sidebar.schedules' },
        { to: '/parent/bulletins', labelKey: 'sidebar.bulletins' },
        { to: '/parent/payments', labelKey: 'sidebar.payments' },
        { to: '/parent/homeworks', labelKey: 'navbar.homeworks' },
        { to: '/parent/messages', labelKey: 'sidebar.messages' },
      ];

  return (
    <nav className="h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-6 md:gap-8">
        {/* Logo */}
        <span className="text-xl font-black text-digi-purple tracking-tight shrink-0">DIGISCHOOL</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 pl-6 border-l border-slate-100 ml-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `h-16 flex items-center text-sm font-semibold transition-all border-b-2 px-3 ${
                  isActive
                    ? 'border-digi-purple text-digi-purple'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                }`
              }
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Academic Year */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-digi-purple" />
          <select className="bg-transparent border-0 focus:ring-0 p-0 text-xs font-bold cursor-pointer">
            <option value="2025-2026">2025-2026</option>
          </select>
        </div>

        {/* Language */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-600">
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
              <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-digi-danger rounded-full" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 md:w-80 sm:w-full bg-white border border-slate-100 rounded-xl shadow-lg z-50">
                  <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-800">{t('dashboards.notifications', 'Notifications')}</span>
                    <span className="text-xs text-digi-purple cursor-pointer hover:underline" onClick={handleMarkAllRead}>{t('common.markAllRead', 'Tout marquer comme lu')}</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer ${!n.read ? 'bg-slate-50/50' : ''}`}                         onClick={() => { navigate(`/notifications/${n.id}`); setShowNotifications(false); }}>
                        <p className="text-sm text-slate-700">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-slate-100">
                    <button className="text-sm font-semibold text-digi-purple hover:underline" onClick={handleViewAll}>{t('common.viewAll', 'Voir tout')}</button>
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
          </button>

          {showProfile && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-lg z-50 py-1">
                <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-digi-purple flex items-center gap-2">
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

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50 animate-slide-in-down md:hidden">
          <div className="flex flex-col p-4 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-digi-purple-bg text-digi-purple'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
