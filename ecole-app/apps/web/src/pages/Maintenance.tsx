import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Maintenance: React.FC = () => {
  const { t } = useTranslation();

  // Animated countdown (cosmetic — 1 hour from now)
  const [timeLeft, setTimeLeft] = useState({ h: 1, m: 0, s: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSec = prev.h * 3600 + prev.m * 60 + prev.s - 1;
        if (totalSec <= 0) return { h: 0, m: 0, s: 0 };
        return {
          h: Math.floor(totalSec / 3600),
          m: Math.floor((totalSec % 3600) / 60),
          s: totalSec % 60,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-digi-bg flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-digi-purple/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-lg w-full space-y-8 animate-fade-in">
        {/* Animated Gears SVG */}
        <div className="flex items-center justify-center">
          <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Large gear */}
            <g className="origin-center" style={{ transformOrigin: '80px 80px', animation: 'spin 8s linear infinite' }}>
              <circle cx="80" cy="80" r="28" fill="white" stroke="#534AB7" strokeWidth="2.5" />
              <circle cx="80" cy="80" r="10" fill="#EEEDFE" stroke="#534AB7" strokeWidth="2" />
              {/* Teeth */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="73"
                  y="48"
                  width="14"
                  height="10"
                  rx="2"
                  fill="#534AB7"
                  opacity="0.7"
                  transform={`rotate(${angle}, 80, 80)`}
                />
              ))}
            </g>
            {/* Small gear */}
            <g className="origin-center" style={{ transformOrigin: '140px 55px', animation: 'spin 6s linear infinite reverse' }}>
              <circle cx="140" cy="55" r="18" fill="white" stroke="#AFA9EC" strokeWidth="2" />
              <circle cx="140" cy="55" r="6" fill="#EEEDFE" stroke="#AFA9EC" strokeWidth="1.5" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="135"
                  y="34"
                  width="10"
                  height="7"
                  rx="2"
                  fill="#AFA9EC"
                  opacity="0.6"
                  transform={`rotate(${angle}, 140, 55)`}
                />
              ))}
            </g>
            {/* Wrench */}
            <g opacity="0.4">
              <line x1="120" y1="110" x2="160" y2="140" stroke="#534AB7" strokeWidth="3" strokeLinecap="round" />
              <circle cx="115" cy="105" r="8" fill="none" stroke="#534AB7" strokeWidth="2.5" />
            </g>
            {/* Dots */}
            <circle cx="30" cy="40" r="4" fill="#AFA9EC" opacity="0.4" className="animate-pulse-soft" />
            <circle cx="180" cy="130" r="3" fill="#AFA9EC" opacity="0.3" className="animate-pulse-soft" />
          </svg>
        </div>

        {/* Content card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 space-y-5">
          <h1 className="font-serif text-3xl font-extrabold text-digi-purple tracking-tight">
            {t('errors.maintenance')}
          </h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            {t('errors.maintenanceDesc')}
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {[
              { val: pad(timeLeft.h), label: 'Heures' },
              { val: pad(timeLeft.m), label: 'Minutes' },
              { val: pad(timeLeft.s), label: 'Secondes' },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-digi-purple bg-digi-purple-bg rounded-xl w-16 h-16 flex items-center justify-center border border-digi-purple-border/20">
                  {unit.val}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <p className="text-[11px] font-semibold text-slate-300">
              Nous serons de retour très bientôt. Merci de votre patience.
            </p>
          </div>
        </div>

        {/* Brand */}
        <p className="text-xs font-bold text-slate-300 tracking-wide">DIGISCHOOL © 2026</p>
      </div>
    </div>
  );
};
export default Maintenance;
