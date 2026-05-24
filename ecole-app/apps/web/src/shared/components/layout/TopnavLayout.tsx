import React from 'react';
import { Navbar } from './Navbar';

export interface TopnavLayoutProps {
  children: React.ReactNode;
}

export const TopnavLayout: React.FC<TopnavLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-digi-bg flex flex-col">
      {/* Horizontal Nav Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
};
