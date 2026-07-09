import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { FileText, Download, Filter, Loader2 } from 'lucide-react';
import { api } from '../../../shared/lib/api';

interface Homework {
  id: number;
  title: string;
  description?: string;
  deadline?: string;
  fileUrl?: string;
  coursName?: string;
  createdAt: string;
}

export const ParentHomeworkPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeworks = async () => {
      try {
        setLoading(true);
        // Try the homeworks API; if it doesn't exist yet, gracefully show empty
        const res = await api.get('/homeworks');
        setHomeworks(res.data?.data || []);
      } catch (err: any) {
        // If 404, the endpoint doesn't exist yet — show empty list
        if (err.response?.status === 404) {
          setHomeworks([]);
        } else {
          setError(err.response?.data?.error?.message || 'Erreur lors du chargement des devoirs');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchHomeworks();
  }, []);

  const handleDownload = (hw: Homework) => {
    if (hw.fileUrl) {
      window.open(hw.fileUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-digi-purple" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isEn ? 'Homeworks' : 'Cahier de Textes / Devoirs'}</h1>
          <p className="text-sm text-slate-400 font-semibold">{isEn ? 'View assignments for your child' : 'Consultez les devoirs de votre enfant'}</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-semibold">
          {error}
        </div>
      )}

      <Card className="border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            {isEn ? 'Upcoming Assignments' : 'Devoirs à venir'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeworks.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4 col-span-full">{isEn ? 'No assignments' : 'Aucun devoir pour le moment.'}</p>
          ) : (
            homeworks.map(hw => (
              <div key={hw.id} className="p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow bg-white flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-digi-purple-bg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-digi-purple" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 truncate" title={hw.title}>{hw.title}</h4>
                    {hw.coursName && <p className="text-sm font-semibold text-digi-purple truncate">{hw.coursName}</p>}
                    {hw.description && <p className="text-xs text-slate-500 mt-1 line-clamp-2">{hw.description}</p>}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {isEn ? 'Due:' : 'Pour le:'} {hw.deadline ? new Date(hw.deadline).toLocaleDateString('fr-FR') : '—'}
                  </span>
                  {hw.fileUrl && (
                    <Button variant="primary" size="sm" className="gap-2" onClick={() => handleDownload(hw)}>
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
export default ParentHomeworkPage;
