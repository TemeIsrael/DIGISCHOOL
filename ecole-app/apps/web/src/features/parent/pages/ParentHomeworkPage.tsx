import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { FileText, Download, Filter } from 'lucide-react';
import { exportPDF } from '../../../shared/utils/export';

interface Homework {
  id: string;
  matiere: string;
  titre: string;
  date: string;
  pdfUrl?: string;
}

export const ParentHomeworkPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  // Mock data - in a real app this would come from an API based on the selected child
  const [homeworks] = useState<Homework[]>([
    { id: '1', matiere: 'Mathématiques', titre: 'Exercices sur les fractions', date: '2026-06-20', pdfUrl: '#' },
    { id: '2', matiere: 'Français', titre: 'Lecture et compréhension', date: '2026-06-21', pdfUrl: '#' },
    { id: '3', matiere: 'Sciences & Technologie', titre: 'Schéma du système solaire', date: '2026-06-25', pdfUrl: '#' }
  ]);

  const handleDownload = (hw: Homework) => {
    // If there's an actual PDF URL, we'd open it. Here we use the generic exportPDF to simulate downloading a document.
    exportPDF([{ ...hw }], `devoir_${hw.matiere}_${hw.date}.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{isEn ? 'Homeworks' : 'Cahier de Textes / Devoirs'}</h1>
          <p className="text-sm text-slate-400 font-semibold">{isEn ? 'View assignments for your child' : 'Consultez les devoirs de votre enfant'}</p>
        </div>
      </div>

      <Card className="border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            {isEn ? 'Upcoming Assignments' : 'Devoirs à venir'}
          </h2>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            {isEn ? 'Filter' : 'Filtrer'}
          </Button>
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
                    <h4 className="font-bold text-slate-800 truncate" title={hw.titre}>{hw.titre}</h4>
                    <p className="text-sm font-semibold text-digi-purple truncate">{hw.matiere}</p>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {isEn ? 'Due:' : 'Pour le:'} {hw.date}
                  </span>
                  <Button variant="primary" size="sm" className="gap-2" onClick={() => handleDownload(hw)}>
                    <Download className="w-4 h-4" />
                    PDF
                  </Button>
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
