import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';

const navLinks = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/livres', labelKey: 'nav.books' },
  { to: '/a-propos', labelKey: 'nav.about' },
];

export const PublicNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`h-20 px-6 md:px-8 flex items-center justify-between sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100'
      }`}
    >
      {/* Logo */}
      <span
        className="text-2xl font-black text-digi-purple tracking-tight cursor-pointer select-none"
        onClick={() => navigate('/')}
      >
        DIGISCHOOL
      </span>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'text-digi-purple bg-digi-purple-bg'
                  : 'text-slate-600 hover:text-digi-purple hover:bg-slate-50'
              }`
            }
          >
            {t(link.labelKey)}
          </NavLink>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/s-inscrire')}>
          {t('nav.register')}
        </Button>
        <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
          {t('nav.login')}
        </Button>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 md:hidden transition-colors"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 animate-slide-in-down md:hidden">
          <div className="flex flex-col p-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
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
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 mt-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/s-inscrire')} className="w-full">
                {t('nav.register')}
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/login')} className="w-full">
                {t('nav.login')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
