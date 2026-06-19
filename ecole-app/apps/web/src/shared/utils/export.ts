// src/shared/utils/export.ts

/**
 * Export an array of records as a CSV file (browser download).
 * Column headers are derived from object keys.
 */
export function exportCSV(data: Record<string, unknown>[], filename = 'data.csv') {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows    = data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','));
  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob   = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url    = URL.createObjectURL(blob);
  const link   = document.createElement('a');
  link.href     = url;
  link.download = filename;
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export data as a print-ready HTML page (browser print dialog).
 * Used as a PDF-export alternative that requires no external library.
 */
export function exportPDF(data: Record<string, unknown>[], filename = 'data') {
  if (!data.length) return;
  const headers = Object.keys(data[0]);

  const tableRows = data
    .map((row) => `<tr>${headers.map((h) => `<td>${String(row[h] ?? '')}</td>`).join('')}</tr>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>${filename}</title>
  <style>
    body { font-family: Arial, sans-serif; font-size: 12px; margin: 20px; }
    h2   { color: #4b40b0; margin-bottom: 12px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
    th { background: #f1effd; color: #4b40b0; font-weight: bold; }
    tr:nth-child(even) { background: #f9f9f9; }
  </style>
</head>
<body>
  <h2>${filename}</h2>
  <table>
    <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${tableRows}</tbody>
  </table>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.print();
}
