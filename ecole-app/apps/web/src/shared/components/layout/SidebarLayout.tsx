import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

import { useMediaQuery } from '../../lib/hooks';

export interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 72 : 250;

  return (
    <div className="min-h-screen bg-digi-bg flex">
      {/* Mobile Overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — Desktop: fixed, Mobile: drawer */}
      {isMobile ? (
        <div
          className={`fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar collapsed={false} />
        </div>
      ) : (
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      )}

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ paddingLeft: isMobile ? 0 : sidebarWidth }}
      >
        <Topbar
          onMenuToggle={isMobile ? () => setMobileOpen(!mobileOpen) : undefined}
          isMobileMenuOpen={mobileOpen}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
