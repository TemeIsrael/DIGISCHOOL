import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Plus } from 'lucide-react';

const mockFiles = [
  { matricule: 'EL-001', nom: 'NGUEMA Jean', classe: 'CM2 A', complet: true, docs: 8 },
  { matricule: 'EL-012', nom: 'NGONO Marie', classe: 'CE2 A', complet: false, docs: 5 },
  { matricule: 'EL-045', nom: 'BELLA Sarah', classe: 'SIL A', complet: true, docs: 8 },
  { matricule: 'EL-089', nom: 'KAMGA Paul', classe: 'Class 6 A', complet: false, docs: 3 },
];

const FileListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('staff.fileList')}</h1>
          <p className="text-sm text-slate-400 font-semibold">{t('staff.fileListDesc')}</p>
        </div>
        <Button onClick={() => navigate('/staff/files/new')} className="gap-2"><Plus className="w-4 h-4" />{t('staff.newFile')}</Button>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('staff.studentId')}</th>
                <th className="px-6 py-3 text-left">{t('staff.studentName')}</th>
                <th className="px-6 py-3 text-left">{t('staff.class')}</th>
                <th className="px-6 py-3 text-left">{t('staff.documents')}</th>
                <th className="px-6 py-3 text-left">{t('staff.fileStatus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockFiles.map((f) => (
                <tr key={f.matricule} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate('/staff/students/' + f.matricule)}>
                  <td className="px-6 py-3 font-mono text-xs">{f.matricule}</td>
                  <td className="px-6 py-3 font-semibold">{f.nom}</td>
                  <td className="px-6 py-3">{f.classe}</td>
                  <td className="px-6 py-3">{f.docs}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-0.5 text-xs font-bold rounded-full ${f.complet ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{f.complet ? t('staff.complete') : t('staff.incomplete')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default FileListPage;
