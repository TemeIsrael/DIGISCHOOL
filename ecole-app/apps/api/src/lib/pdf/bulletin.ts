import PDFDocument from 'pdfkit';
import { Writable } from 'stream';
import fs from 'fs';
import path from 'path';

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
  effectif?: number;
  titulaire?: string;       // Nom de l'enseignant titulaire de la classe
  signatureUrl?: string;   // URL ou chemin vers l'image de signature du directeur
  photoUrl?: string;       // Photo de l'élève
  schoolName?: string;     // Nom de l'école (optionnel, défaut: DIGISCHOOL)
}

/** Retourne la mention pédagogique en fonction de la moyenne (sur 20) */
const getMention = (moyenne: number): { label: string; color: string } => {
  if (moyenne >= 18) return { label: 'Excellent(e)',    color: '#16a34a' };
  if (moyenne >= 16) return { label: 'Très Bien',       color: '#22c55e' };
  if (moyenne >= 14) return { label: 'Bien',             color: '#84cc16' };
  if (moyenne >= 12) return { label: 'Assez Bien',       color: '#eab308' };
  if (moyenne >= 10) return { label: 'Passable',          color: '#f97316' };
  return              { label: 'Insuffisant(e)',           color: '#ef4444' };
};

/** Convertit une couleur hex en RGB pour pdfkit */
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
};

export const generateBulletinPDF = (stream: Writable, data: BulletinData): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 45, bufferPages: true });
      doc.pipe(stream);

      const PAGE_W = doc.page.width;
      const MARGIN = 45;
      const CONTENT_W = PAGE_W - MARGIN * 2;

      const PURPLE     = '#3C3489';
      const PURPLE_LIGHT = '#EEEDFE';
      const TEXT_DARK  = '#1e293b';
      const TEXT_MED   = '#475569';
      const BORDER     = '#e2e8f0';

      // ─── HEADER BOX ─────────────────────────────────────────────────────────
      doc.roundedRect(MARGIN, 35, CONTENT_W, 90, 8).fill(PURPLE);
      
      // School name
      doc.fillColor('#ffffff').fontSize(16).font('Helvetica-Bold')
         .text(data.schoolName || 'DIGISCHOOL — EcoleApp', MARGIN + 10, 47, { width: CONTENT_W - 20, align: 'center' });
      
      // Subtitle
      doc.fillColor('#c7d2fe').fontSize(10).font('Helvetica-Bold')
         .text('BULLETIN DE NOTES TRIMESTRIEL', MARGIN + 10, 70, { width: CONTENT_W - 20, align: 'center' });

      // Année académique + Trimestre
      doc.fillColor('#a5b4fc').fontSize(9).font('Helvetica')
         .text(`Année Académique : ${data.anneeLibelle}   |   ${data.trimestreLibelle}`, MARGIN + 10, 88, { width: CONTENT_W - 20, align: 'center' });

      // ─── STUDENT INFO CARD ─────────────────────────────────────────────────
      let y = 140;
      doc.rect(MARGIN, y, CONTENT_W, 55).fill('#f8fafc').stroke();
      doc.lineWidth(1.5).strokeColor(PURPLE).rect(MARGIN, y, 4, 55).fill(PURPLE);
      
      y += 8;
      // Left column: Nom, Classe
      doc.fillColor(TEXT_DARK).fontSize(9).font('Helvetica-Bold')
         .text('Élève :', MARGIN + 12, y);
      doc.font('Helvetica').text(`${data.nom.toUpperCase()} ${data.prenom}`, MARGIN + 55, y);

      doc.font('Helvetica-Bold').text('Matricule :', MARGIN + 12, y + 16);
      doc.font('Helvetica').text(data.matricule, MARGIN + 65, y + 16);

      // Right column: Classe, Titulaire
      const col2X = MARGIN + CONTENT_W / 2 - 20;
      doc.font('Helvetica-Bold').text('Classe :', col2X, y);
      doc.font('Helvetica').text(data.classe, col2X + 45, y);

      if (data.titulaire) {
        doc.font('Helvetica-Bold').text('Titulaire :', col2X, y + 16);
        doc.font('Helvetica').text(data.titulaire, col2X + 50, y + 16);
      }

      // Photo (Rightmost)
      if (data.photoUrl) {
        const photoPath = data.photoUrl.startsWith('/') 
          ? path.join(process.cwd(), 'public', data.photoUrl) 
          : data.photoUrl;

        if (fs.existsSync(photoPath)) {
          try {
            doc.image(photoPath, PAGE_W - MARGIN - 45, y - 5, { width: 40, height: 40, fit: [40, 40] });
          } catch (_) {
            // Invalid image silently ignored
          }
        }
      }

      y = 140 + 55 + 15;

      // ─── NOTES TABLE ────────────────────────────────────────────────────────
      const COL = {
        matiere:  { x: MARGIN,           w: 180 },
        coeff:    { x: MARGIN + 180,      w: 50  },
        note:     { x: MARGIN + 230,      w: 70  },
        noteMax:  { x: MARGIN + 300,      w: 60  },
        apprec:   { x: MARGIN + 360,      w: CONTENT_W - 360 },
      };
      const ROW_H = 21;

      // Table header
      doc.rect(MARGIN, y, CONTENT_W, ROW_H).fill(PURPLE);
      doc.fillColor('#ffffff').fontSize(8).font('Helvetica-Bold');
      doc.text('Matière / Cours',     COL.matiere.x + 5,  y + 7);
      doc.text('Coeff.',              COL.coeff.x + 3,    y + 7);
      doc.text('Note',                COL.note.x + 5,     y + 7);
      doc.text('/ Max',               COL.noteMax.x + 5,  y + 7);
      doc.text('Appréciation',        COL.apprec.x + 5,   y + 7);

      y += ROW_H;

      let totalCoeff = 0;
      let totalPoints = 0;

      data.notes.forEach((item, idx) => {
        const rowFill = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        doc.rect(MARGIN, y, CONTENT_W, ROW_H).fill(rowFill).lineWidth(0.5).strokeColor(BORDER).rect(MARGIN, y, CONTENT_W, ROW_H).stroke();

        const noteOk = item.note >= item.noteMax / 2;
        const noteColor = noteOk ? '#16a34a' : '#dc2626';

        doc.fillColor(TEXT_DARK).fontSize(8.5).font('Helvetica');
        doc.text(item.coursLibelle,           COL.matiere.x + 5,  y + 7, { width: COL.matiere.w - 10, ellipsis: true });
        doc.text(String(item.coefficient),    COL.coeff.x + 3,    y + 7);

        doc.fillColor(noteColor).font('Helvetica-Bold')
           .text(String(item.note),           COL.note.x + 5,     y + 7);

        doc.fillColor(TEXT_MED).font('Helvetica')
           .text(`/ ${item.noteMax}`,         COL.noteMax.x + 5,  y + 7);

        doc.fillColor(TEXT_DARK).font('Helvetica-Oblique')
           .text(item.appreciation || '—',    COL.apprec.x + 5,   y + 7, { width: COL.apprec.w - 8, ellipsis: true });

        totalCoeff  += item.coefficient;
        totalPoints += item.note * item.coefficient;
        y += ROW_H;
      });

      // ─── SUMMARY BOX ────────────────────────────────────────────────────────
      y += 12;
      const mention = getMention(data.moyenne);

      doc.roundedRect(MARGIN, y, CONTENT_W, 58, 6).fill(PURPLE_LIGHT).lineWidth(1.5).strokeColor(PURPLE).stroke();

      // Left: Moyenne générale
      doc.fillColor(TEXT_DARK).fontSize(9).font('Helvetica-Bold')
         .text('Moyenne Générale', MARGIN + 12, y + 9);
      doc.fillColor(PURPLE).fontSize(20).font('Helvetica-Bold')
         .text(`${data.moyenne.toFixed(2)} / 20`, MARGIN + 12, y + 22);

      // Center: Mention
      doc.fillColor(TEXT_DARK).fontSize(9).font('Helvetica-Bold')
         .text('Mention', MARGIN + CONTENT_W / 3, y + 9);
      doc.fillColor(mention.color).fontSize(14).font('Helvetica-Bold')
         .text(mention.label, MARGIN + CONTENT_W / 3, y + 25, { width: 120 });

      // Right: Rang / Effectif
      const col3 = MARGIN + (CONTENT_W * 2) / 3 + 10;
      doc.fillColor(TEXT_DARK).fontSize(9).font('Helvetica-Bold')
         .text('Classement', col3, y + 9);
      doc.fillColor(PURPLE).fontSize(14).font('Helvetica-Bold')
         .text(`${data.rang}${data.rang === 1 ? 'er' : 'ème'}${data.effectif ? ` / ${data.effectif}` : ''}`, col3, y + 25);

      // Total coefficients (small, bottom right of summary)
      doc.fillColor(TEXT_MED).fontSize(7.5).font('Helvetica')
         .text(`Total coefficients : ${totalCoeff}  |  Total points : ${totalPoints.toFixed(1)}`, MARGIN + 10, y + 46);

      y += 58 + 20;

      // ─── APPRECIATION / DECISION ────────────────────────────────────────────
      doc.roundedRect(MARGIN, y, CONTENT_W, 30, 4).fill('#f0fdf4').lineWidth(1).strokeColor('#bbf7d0').stroke();
      doc.fillColor(TEXT_DARK).fontSize(9).font('Helvetica-Bold')
         .text('Décision :', MARGIN + 12, y + 11);
      const decision = data.moyenne >= 10 ? 'Admis(e) — Passage en classe supérieure accordé' : 'Non admis(e) — Passage conditionnel';
      doc.fillColor(data.moyenne >= 10 ? '#16a34a' : '#dc2626').font('Helvetica')
         .text(decision, MARGIN + 65, y + 11);

      y += 30 + 25;

      // ─── SIGNATURES ────────────────────────────────────────────────────────
      const sigY = y;
      doc.fillColor(TEXT_MED).fontSize(9).font('Helvetica-Bold'); // premium styling unchanged
      
      // Signature Parent (gauche)
      doc.text('Signature du Parent / Tuteur', MARGIN, sigY);
      doc.fillColor(BORDER).lineWidth(1).moveTo(MARGIN, sigY + 40).lineTo(MARGIN + 150, sigY + 40).stroke();
      doc.fillColor(TEXT_MED).fontSize(8).font('Helvetica').text('Date : ___/___/______', MARGIN, sigY + 46);

      // Signature Directeur (droite)
      const dirX = PAGE_W - MARGIN - 180;
      doc.fillColor(TEXT_MED).fontSize(9).font('Helvetica-Bold').text('Le Directeur des Études', dirX, sigY);

      // Insérer image de signature si disponible
      if (data.signatureUrl) {
        const sigPath = data.signatureUrl.startsWith('/') 
          ? path.join(process.cwd(), 'public', data.signatureUrl) 
          : data.signatureUrl;

        if (fs.existsSync(sigPath)) {
          try {
            doc.image(sigPath, dirX, sigY + 8, { width: 120, height: 35 });
          } catch (_) {
            // Image invalide — on ignore silencieusement
          }
        }
      }

      doc.fillColor(BORDER).lineWidth(1).moveTo(dirX, sigY + 48).lineTo(dirX + 180, sigY + 48).stroke();
      doc.fillColor(TEXT_MED).fontSize(8).font('Helvetica').text('Cachet & Signature', dirX, sigY + 52);

      // ─── FOOTER ─────────────────────────────────────────────────────────────
      const footerY = doc.page.height - 30;
      doc.fillColor('#94a3b8').fontSize(7.5).font('Helvetica')
         .text(
           `DIGISCHOOL EcoleApp — Document officiel — Imprimé le ${new Date().toLocaleDateString('fr-FR')} — ${data.matricule}`,
           MARGIN,
           footerY,
           { width: CONTENT_W, align: 'center' }
         );
      doc.lineWidth(0.5).strokeColor('#e2e8f0')
         .moveTo(MARGIN, footerY - 5).lineTo(PAGE_W - MARGIN, footerY - 5).stroke();

      // Ensure stream resolves on finish and handles errors
      stream.on('finish', resolve);
      stream.on('error', reject);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
