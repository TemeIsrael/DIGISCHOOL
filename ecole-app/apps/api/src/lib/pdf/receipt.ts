import PDFDocument from 'pdfkit';
import { Writable } from 'stream';

export interface ReceiptData {
  idPaie: number;
  matricule: string;
  nom: string;
  prenom: string;
  classe: string;
  anneeLibelle: string;
  montant: number;
  date: Date;
  mode: string;
  trancheCouverte: number;
}

export const generateReceiptPDF = (stream: Writable, data: ReceiptData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A5', layout: 'landscape', margin: 30 });

      doc.pipe(stream);

      // Add "PAYÉ" watermark in red diagonal
      doc.save();
      doc.fillColor('red');
      doc.opacity(0.15);
      doc.fontSize(70);
      doc.rotate(-25, { origin: [250, 150] });
      doc.text('PAYÉ / PAID', 120, 150);
      doc.restore();

      // Heading / Header
      doc.fillColor('#333333');
      doc.fontSize(16).font('Helvetica-Bold').text('DIGISCHOOL - ECOLEAPP 2026', { align: 'center' });
      doc.fontSize(10).font('Helvetica-Oblique').text('Reçu de Paiement / Payment Receipt', { align: 'center' });
      doc.moveDown(1.5);

      // Receipt details
      const startX = 35;
      let currentY = 90;

      doc.fontSize(10).font('Helvetica-Bold');
      doc.text(`Reçu N°: `, startX, currentY);
      doc.font('Helvetica').text(`REC-${data.idPaie.toString().padStart(6, '0')}`, startX + 70, currentY);

      doc.font('Helvetica-Bold').text(`Date: `, 280, currentY);
      doc.font('Helvetica').text(new Date(data.date).toLocaleDateString('fr-FR'), 320, currentY);

      currentY += 20;
      doc.font('Helvetica-Bold').text(`Élève: `, startX, currentY);
      doc.font('Helvetica').text(`${data.nom.toUpperCase()} ${data.prenom}`, startX + 70, currentY);

      doc.font('Helvetica-Bold').text(`Classe: `, 280, currentY);
      doc.font('Helvetica').text(data.classe, 330, currentY);

      currentY += 20;
      doc.font('Helvetica-Bold').text(`Matricule: `, startX, currentY);
      doc.font('Helvetica').text(data.matricule, startX + 70, currentY);

      doc.font('Helvetica-Bold').text(`Année: `, 280, currentY);
      doc.font('Helvetica').text(data.anneeLibelle, 330, currentY);

      currentY += 30;
      // Draw horizontal line
      doc.lineWidth(1).strokeColor('#AFA9EC').moveTo(startX, currentY).lineTo(doc.page.width - startX, currentY).stroke();

      currentY += 15;
      doc.font('Helvetica-Bold').fontSize(12).text(`Montant Versé: `, startX, currentY);
      doc.font('Helvetica-Bold').text(`${data.montant.toLocaleString('fr-FR')} XAF`, startX + 110, currentY);

      doc.font('Helvetica-Bold').fontSize(10).text(`Tranche: `, 280, currentY);
      doc.font('Helvetica').text(`Tranche N° ${data.trancheCouverte}`, 335, currentY);

      currentY += 20;
      doc.font('Helvetica-Bold').text(`Mode de Paiement: `, startX, currentY);
      doc.font('Helvetica').text(data.mode, startX + 110, currentY);

      currentY += 40;
      // Signature Section
      doc.fontSize(8).font('Helvetica-Bold').text('Le Comptable (Signature & Cachet)', doc.page.width - 180, currentY, { align: 'center' });

      doc.end();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
