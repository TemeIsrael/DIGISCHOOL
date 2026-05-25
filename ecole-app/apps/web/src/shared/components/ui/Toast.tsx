import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ─── Single Toast Item ──────────────────────────────────────────────
const ToastItem: React.FC<{
  t: ToastMessage;
  onRemove: (id: string) => void;
}> = ({ t, onRemove }) => {
  const duration = t.duration || 4000;
  const [progress, setProgress] = useState(100);
  const startTime = useRef(Date.now());
  const animRef = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        onRemove(t.id);
        return;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [duration, t.id, onRemove]);

  const typeConfig: Record<string, { classes: string; icon: React.ReactNode; progressColor: string }> = {
    success: {
      classes: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
      progressColor: 'bg-emerald-500',
    },
    danger: {
      classes: 'border-rose-200 bg-rose-50 text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600" />,
      progressColor: 'bg-rose-500',
    },
    warning: {
      classes: 'border-amber-200 bg-amber-50 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      progressColor: 'bg-amber-500',
    },
    info: {
      classes: 'border-digi-purple-border bg-digi-purple-bg text-digi-purple-dark',
      icon: <Info className="w-5 h-5 text-digi-purple" />,
      progressColor: 'bg-digi-purple',
    },
  };

  const config = typeConfig[t.type] || typeConfig.info;

  return (
    <div
      className={`relative flex items-start gap-3 p-4 rounded-xl border shadow-lg overflow-hidden animate-slide-in-left ${config.classes}`}
      role="alert"
    >
      <div className="mt-0.5 shrink-0">{config.icon}</div>
      <div className="flex-1 space-y-1 min-w-0">
        <p className="text-sm font-bold leading-none">{t.title}</p>
        {t.description && (
          <p className="text-xs opacity-90 leading-relaxed">{t.description}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(t.id)}
        className="text-slate-400 hover:text-slate-600 shrink-0"
        aria-label="Fermer"
      >
        <X className="w-4 h-4" />
      </button>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5">
        <div
          className={`h-full ${config.progressColor} transition-none`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// ─── Toast Provider ─────────────────────────────────────────────────
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...msg, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem t={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// ─── Hook ───────────────────────────────────────────────────────────
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
