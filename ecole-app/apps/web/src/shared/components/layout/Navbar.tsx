import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Globe, Calendar } from 'lucide-react';
import { useAuthStore } from '../../../features/auth/store';
import { useTranslation } from 'react-i18next';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  // Nav links based on teacher vs parent roles
  const links = user?.role === 'TEACHER'
    ? [
        { to: '/dashboard', label: 'Espace Enseignant' },
        { to: '/grades', label: 'Notes & Bulletins' },
        { to: '/schedules', label: 'Emploi du Temps' }
      ]
    : [
        { to: '/dashboard', label: 'Espace Parent' },
        { to: '/bulletins', label: 'Bulletins Scolaires' },
        { to: '/payments', label: 'Paiements & Reçus' },
        { to: '/messages', label: 'Messages & Alertes' }
      ];

  return (
    <nav className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <span className="text-xl font-black text-digi-purple tracking-tight">DIGISCHOOL</span>

        {/* Center Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `h-16 flex items-center text-sm font-semibold transition-all border-b-2 px-1 ${
                  isActive
                    ? 'border-digi-purple text-digi-purple'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Academic Year Selector */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-digi-purple" />
          <select className="bg-transparent border-0 focus:ring-0 p-0 text-xs font-bold cursor-pointer">
            <option value="2025-2026">2025-2026</option>
          </select>
        </div>

        {/* Language Selector */}
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

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-digi-danger transition-colors text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </nav>
  );
};
