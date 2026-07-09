// src/shared/utils/export.ts

/**
 * Export an array of records as a CSV file (browser download).
 * Column headers are derived from object keys.
 */
export function exportCSV(data: Record<string, unknown>[], filename = 'data.csv') {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','));
  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportPDF(data: Record<string, unknown>[], filename = 'Export') {
  try {
    if (!data.length) {
      console.warn('No data to export');
      return;
    }
    const doc = new jsPDF();
    // Cover page
    doc.setFontSize(22);
    doc.text(filename, doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    doc.addPage();
    // Table
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => headers.map((h) => String(row[h] ?? '')));
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    });
    doc.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    alert('Erreur lors de l\'export PDF');
  }
}

/**
 * Generate a PDF from HTML content using html2pdf.js.
 * This utility is used for the book export with cover image.
 */
export async function exportHTMLToPDF(htmlElement: HTMLElement, filename = 'document.pdf') {
  try {
    // Dynamic import to avoid SSR / build issues with html2pdf.js
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf().from(htmlElement).set({
      margin: 10,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).save();
  } catch (error) {
    console.error('Error with html2pdf:', error);
    alert('Erreur lors de l\'export HTML to PDF');
  }
}
