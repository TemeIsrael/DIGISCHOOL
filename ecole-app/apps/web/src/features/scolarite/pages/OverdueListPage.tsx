import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../shared/components/ui/Card';

const mockOverdue = [
  { matricule: 'EL-003', nom: 'NGONO Marie', classe: '4ème C', montantDu: 175000, paye: 0, retard: 175000, tranche: 'Tranche 1' },
  { matricule: 'EL-001', nom: 'DUPONT Jean', classe: '6ème A', montantDu: 150000, paye: 100000, retard: 50000, tranche: 'Tranche 3' },
  { matricule: 'EL-005', nom: 'BELLA Sarah', classe: '6ème A', montantDu: 150000, paye: 75000, retard: 75000, tranche: 'Tranche 2' },
];

const OverdueListPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('scolarite.overdueStudents')}</h1>
        <p className="text-sm text-slate-400 font-semibold">{t('scolarite.overdueDesc')}</p>
      </div>
      <Card className="shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-6 py-3 text-left">{t('scolarite.studentId')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.studentName')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.class')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.totalDue')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.totalPaid')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.overdueAmount')}</th>
                <th className="px-6 py-3 text-left">{t('scolarite.tranche')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600 bg-white">
              {mockOverdue.map((s) => (
                <tr key={s.matricule} className="hover:bg-slate-50">
                  <td className="px-6 py-3 font-mono text-xs">{s.matricule}</td>
                  <td className="px-6 py-3 font-semibold">{s.nom}</td>
                  <td className="px-6 py-3">{s.classe}</td>
                  <td className="px-6 py-3">{s.montantDu.toLocaleString()} F</td>
                  <td className="px-6 py-3">{s.paye.toLocaleString()} F</td>
                  <td className="px-6 py-3 text-red-600 font-bold">{s.retard.toLocaleString()} F</td>
                  <td className="px-6 py-3">{s.tranche}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default OverdueListPage;
