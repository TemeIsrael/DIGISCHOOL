import React, { useEffect, useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../lib/api';

interface Classe {
  idClasse: number;
  libelle: string;
  section: string;
  cycle?: {
    idCycle: number;
    libelle: string;
  };
}

interface ClassSelectorProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
}

export const ClassSelector = forwardRef<HTMLSelectElement, ClassSelectorProps>(({
  className = '',
  label,
  error,
  ...props
}, ref) => {
  const { t } = useTranslation();
  const [classes, setClasses] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get('/academic/classes');
        setClasses(res.data?.data || []);
      } catch (err) {
        console.error('Error fetching classes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        {...props}
        className={`flex h-10 w-full rounded-lg border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-digi-purple/50 focus:border-digi-purple transition-all ${
          error ? 'border-digi-danger text-digi-danger focus:ring-digi-danger/50 focus:border-digi-danger' : 'border-slate-200 text-slate-900'
        }`}
      >
        <option value="">-- Sélectionnez une classe --</option>
        {loading ? (
          <option value="" disabled>Chargement...</option>
        ) : (
          classes.map((c) => (
            <option key={c.idClasse} value={c.libelle}>
              {c.libelle} ({c.section})
            </option>
          ))
        )}
      </select>
      {error && <p className="text-xs font-medium text-digi-danger">{error}</p>}
    </div>
  );
});

ClassSelector.displayName = 'ClassSelector';
