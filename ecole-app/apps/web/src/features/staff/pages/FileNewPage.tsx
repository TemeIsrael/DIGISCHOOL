import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/Button';
import { Card } from '../../../shared/components/ui/Card';

const FileNewPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('staff.newFile')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('staff.newFileDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100 p-6 space-y-4 max-w-2xl">
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('staff.studentId')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="EL-XXX" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('staff.lastName')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('staff.firstName')}</label><input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('staff.class')}</label>
          <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"><optgroup label="Francophone"><option>SIL A</option><option>CP A</option><option>CE1 A</option><option>CE2 A</option><option>CM1 A</option><option>CM2 A</option></optgroup><optgroup label="Anglophone"><option>Class 1 A</option><option>Class 2 A</option><option>Class 3 A</option><option>Class 4 A</option><option>Class 5 A</option><option>Class 6 A</option></optgroup></select>
        </div>
        <div><label className="block text-sm font-bold text-slate-700 mb-1">{t('staff.uploadDocuments')}</label><input type="file" multiple className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" /></div>
        <div className="flex gap-3 pt-4">
          <Button>{t('common.create')}</Button>
          <Button variant="outline" onClick={() => navigate('/staff/files')}>{t('common.cancel')}</Button>
        </div>
      </Card>
    </div>
  );
};
export default FileNewPage;
