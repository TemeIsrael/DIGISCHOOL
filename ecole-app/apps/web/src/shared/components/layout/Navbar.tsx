import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Globe, Calendar, Menu, X, Bell } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/store';
import { useTranslation } from 'react-i18next';
import { Avatar } from '../ui/Avatar';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
        { to: '/dashboard', labelKey: 'navbar.teacher_space' },
        { to: '/grades', labelKey: 'sidebar.grades' },
        { to: '/schedules', labelKey: 'sidebar.schedules' },
        { to: '/messages', labelKey: 'sidebar.messages' },
      ]
    : [
        { to: '/dashboard', labelKey: 'navbar.parent_space' },
        { to: '/bulletins', labelKey: 'sidebar.bulletins' },
        { to: '/payments', labelKey: 'sidebar.payments' },
        { to: '/messages', labelKey: 'sidebar.messages' },
      ];

  return (
    <nav className="h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-6 md:gap-8">
        {/* Logo */}
        <span className="text-xl font-black text-digi-purple tracking-tight shrink-0">DIGISCHOOL</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
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
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-digi-purple" />
          <select className="bg-transparent border-0 focus:ring-0 p-0 text-xs font-bold cursor-pointer">
            <option value="2025-2026">2025-2026</option>
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

        {/* Avatar + Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
          <Avatar
            name={user?.nom ? `${user.nom} ${user.prenom || ''}` : user?.login}
            size="sm"
          />
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-400 hover:text-digi-danger hover:bg-rose-50 transition-colors"
            title={t('auth.logout')}
          >
            <LogOut className="w-4 h-4" />
          </button>
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
