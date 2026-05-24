import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (msg: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...msg, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map((t) => {
          let typeClass = '';
          let icon = <Info className="w-5 h-5" />;

          if (t.type === 'success') {
            typeClass = 'border-emerald-200 bg-emerald-50 text-emerald-900';
            icon = <CheckCircle className="w-5 h-5 text-emerald-600" />;
          } else if (t.type === 'danger') {
            typeClass = 'border-rose-200 bg-rose-50 text-rose-900';
            icon = <AlertCircle className="w-5 h-5 text-rose-600" />;
          } else if (t.type === 'warning') {
            typeClass = 'border-amber-200 bg-amber-50 text-amber-900';
            icon = <AlertCircle className="w-5 h-5 text-amber-600" />;
          } else {
            typeClass = 'border-digi-purple-border bg-digi-purple-bg text-digi-purple-dark';
            icon = <Info className="w-5 h-5 text-digi-purple" />;
          }

          return (
            <div
              key={t.id}
              className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all animate-in slide-in-from-right-5 duration-200 ${typeClass}`}
            >
              <div className="mt-0.5">{icon}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold leading-none">{t.title}</p>
                {t.description && <p className="text-xs opacity-90">{t.description}</p>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
