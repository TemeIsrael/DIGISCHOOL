import React from 'react';
import { Hammer } from 'lucide-react';

export const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-center text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-6">
        <Hammer className="w-16 h-16 text-digi-purple mx-auto animate-pulse" />
        <h1 className="text-3xl font-extrabold text-digi-purple">Maintenance</h1>
        <h2 className="text-lg font-bold text-slate-800">Système Indisponible (P-096)</h2>
        <p className="text-sm text-slate-400 font-semibold leading-relaxed">
          Le portail scolaire subit des mises à jour planifiées. Merci de revenir ultérieurement.
        </p>
      </div>
    </div>
  );
};
export default Maintenance;
