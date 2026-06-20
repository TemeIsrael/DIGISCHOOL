import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { FileText, Plus, Upload, Trash2 } from 'lucide-react';

interface Homework {
  id: string;
  classe: string;
  matiere: string;
  titre: string;
  date: string;
  pdfUrl?: string;
}

export const TeacherHomeworkPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.startsWith('en');

  const [homeworks, setHomeworks] = useState<Homework[]>([
    { id: '1', classe: 'CM1 A', matiere: 'Mathématiques', titre: 'Exercices sur les fractions', date: '2026-06-20', pdfUrl: '#' },
    { id: '2', classe: 'CM1 A', matiere: 'Français', titre: 'Lecture et compréhension', date: '2026-06-21', pdfUrl: '#' }
  ]);

  const [newHomework, setNewHomework] = useState({ classe: 'CM1 A', matiere: 'Mathématiques', titre: '', date: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAddHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHomework.titre || !newHomework.date) return;
    
    const newTask: Homework = {
      id: Date.now().toString(),
      ...newHomework,
      pdfUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined
    };
    
    setHomeworks([newTask, ...homeworks]);
    setNewHomework({ ...newHomework, titre: '', date: '' });
    setSelectedFile(null);
  };

  const handleDelete = (id: string) => {
    setHomeworks(homeworks.filter(h => h.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{isEn ? 'Homeworks' : 'Cahier de Textes / Devoirs'}</h1>
        <p className="text-sm text-slate-400 font-semibold">{isEn ? 'Manage your assignments' : 'Gérez les devoirs envoyés aux parents'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border border-slate-100 shadow-sm h-fit">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">{isEn ? 'New Assignment' : 'Nouveau Devoir'}</h2>
          <form onSubmit={handleAddHomework} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">{isEn ? 'Class' : 'Classe'}</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-digi-purple/20 focus:border-digi-purple outline-none"
                value={newHomework.classe}
                onChange={e => setNewHomework({...newHomework, classe: e.target.value})}
              >
                <option value="CM1 A">CM1 A</option>
                <option value="CM1 B">CM1 B</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">{isEn ? 'Subject' : 'Matière'}</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-digi-purple/20 focus:border-digi-purple outline-none"
                value={newHomework.matiere}
                onChange={e => setNewHomework({...newHomework, matiere: e.target.value})}
              >
                <option value="Mathématiques">Mathématiques</option>
                <option value="Français">Français</option>
                <option value="Anglais">Anglais</option>
              </select>
            </div>

            <Input 
              label={isEn ? 'Title' : 'Titre du devoir'} 
              placeholder={isEn ? 'Title...' : 'Ex: Exercices page 42'} 
              value={newHomework.titre}
              onChange={e => setNewHomework({...newHomework, titre: e.target.value})}
              required 
            />
            
            <Input 
              type="date"
              label={isEn ? 'Due Date' : 'Pour le'} 
              value={newHomework.date}
              onChange={e => setNewHomework({...newHomework, date: e.target.value})}
              required 
            />

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">{isEn ? 'Document (PDF)' : 'Document (PDF)'}</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  id="pdf-upload"
                  onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                />
                <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-6 h-6 text-slate-400" />
                  <span className="text-sm font-semibold text-digi-purple">
                    {selectedFile ? selectedFile.name : (isEn ? 'Upload PDF' : 'Ajouter un PDF')}
                  </span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2">
              <Plus className="w-4 h-4" />
              {isEn ? 'Add' : 'Ajouter le devoir'}
            </Button>
          </form>
        </Card>

        <Card className="lg:col-span-2 border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">{isEn ? 'Assignments List' : 'Liste des Devoirs'}</h2>
          <div className="space-y-3">
            {homeworks.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-4">{isEn ? 'No assignments' : 'Aucun devoir pour le moment.'}</p>
            ) : (
              homeworks.map(hw => (
                <div key={hw.id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-digi-purple-bg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-digi-purple" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 truncate">{hw.titre}</h4>
                      <p className="text-sm font-semibold text-slate-500 truncate">{hw.classe} • {hw.matiere} • {isEn ? 'Pour le' : 'Pour le'} {hw.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(hw.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default TeacherHomeworkPage;
