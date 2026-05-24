import PDFDocument from 'pdfkit';
import { Writable } from 'stream';

export interface BulletinNote {
  coursLibelle: string;
  coefficient: number;
  note: number;
  noteMax: number;
  appreciation: string;
}

export interface BulletinData {
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  anneeLibelle: string;
  trimestreLibelle: string;
  notes: BulletinNote[];
  moyenne: number;
  rang: number;
}

export const generateBulletinPDF = (stream: Writable, data: BulletinData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });

      doc.pipe(stream);

      // Header Box
      doc.lineWidth(2).strokeColor('#534AB7').rect(40, 40, doc.page.width - 80, 80).stroke();

      // Heading / Header
      doc.fillColor('#3C3489');
      doc.fontSize(18).font('Helvetica-Bold').text('DIGISCHOOL - ECOLEAPP 2026', 50, 50, { align: 'center' });
      doc.fillColor('#333333');
      doc.fontSize(12).font('Helvetica-Bold').text(`BULLETIN DE NOTES - ${data.trimestreLibelle.toUpperCase()}`, 50, 75, { align: 'center' });
      doc.fontSize(10).font('Helvetica-Oblique').text(`Année Académique: ${data.anneeLibelle}`, 50, 95, { align: 'center' });

      doc.moveDown(3);

      // Student info
      let currentY = 140;
      doc.fillColor('#333333');
      doc.fontSize(10).font('Helvetica-Bold').text(`Élève: `, 40, currentY);
      doc.font('Helvetica').text(`${data.nom.toUpperCase()} ${data.prenom}`, 100, currentY);

      doc.font('Helvetica-Bold').text(`Matricule: `, 320, currentY);
      doc.font('Helvetica').text(data.matricule, 390, currentY);

      currentY += 18;
      doc.font('Helvetica-Bold').text(`Classe: `, 40, currentY);
      doc.font('Helvetica').text(data.classe, 100, currentY);

      currentY += 30;

      // Table Header
      doc.rect(40, currentY, doc.page.width - 80, 20).fill('#EEEDFE').stroke();
      doc.fillColor('#3C3489').font('Helvetica-Bold').fontSize(9);
      doc.text('Matière', 45, currentY + 6);
      doc.text('Coeff.', 240, currentY + 6);
      doc.text('Note', 300, currentY + 6);
      doc.text('Appréciation', 380, currentY + 6);

      currentY += 20;

      // Table Rows
      doc.fillColor('#333333').font('Helvetica').fontSize(9);
      let totalCoeff = 0;
      let totalPoints = 0;

      data.notes.forEach((item) => {
        doc.lineWidth(0.5).strokeColor('#E2E8F0').rect(40, currentY, doc.page.width - 80, 20).stroke();
        doc.text(item.coursLibelle, 45, currentY + 6);
        doc.text(item.coefficient.toString(), 240, currentY + 6);
        doc.text(`${item.note} / ${item.noteMax}`, 300, currentY + 6);
        doc.text(item.appreciation, 380, currentY + 6);

        totalCoeff += item.coefficient;
        totalPoints += item.note * item.coefficient;
        currentY += 20;
      });

      currentY += 15;

      // Summary / Totals
      doc.lineWidth(1).strokeColor('#534AB7').rect(40, currentY, doc.page.width - 80, 50).stroke();
      doc.font('Helvetica-Bold');
      doc.text(`Total Coefficients: ${totalCoeff}`, 50, currentY + 12);
      doc.text(`Moyenne Trimestrielle: ${data.moyenne.toFixed(2)} / 20`, 50, currentY + 30);

      doc.text(`Rang: ${data.rang} ${data.rang === 1 ? 'er' : 'ème'}`, 320, currentY + 12);
      doc.text(`Décision: ${data.moyenne >= 10 ? 'Admis(e)' : 'Insuffisant'}`, 320, currentY + 30);

      currentY += 80;

      // Signatures
      doc.fontSize(9).font('Helvetica-Bold');
      doc.text("Signature du Parent", 60, currentY);
      doc.text("Le Directeur des Études", doc.page.width - 200, currentY);

      doc.end();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
