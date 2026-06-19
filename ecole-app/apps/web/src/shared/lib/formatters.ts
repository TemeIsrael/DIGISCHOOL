import i18n from './i18n';

// ─── Helpers ────────────────────────────────────────────────────────
const getLocale = (): string => (i18n.language === 'en' ? 'en-GB' : 'fr-FR');

// ─── Currency ───────────────────────────────────────────────────────

/**
 * Format an amount in CFA francs (XAF).
 * Returns "—" for null/undefined values.
 */
export const formatCFA = (amount: number | null | undefined): string => {
  if (amount == null) return '—';
  return new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a raw number with thousands separators.
 */
export const formatNumber = (value: number | null | undefined): string => {
  if (value == null) return '—';
  return new Intl.NumberFormat(getLocale()).format(value);
};

// ─── Dates ──────────────────────────────────────────────────────────

/**
 * Format a date in short format: 24/05/2026
 */
export const formatDate = (
  date: string | Date | null | undefined,
  format: 'short' | 'long' = 'short'
): string => {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';

  if (format === 'long') {
    return d.toLocaleDateString(getLocale(), {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return d.toLocaleDateString(getLocale(), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format a date with time: 24/05/2026 14:30
 */
export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';

  return d.toLocaleDateString(getLocale(), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format a date as relative time: "il y a 3 minutes", "3 minutes ago"
 */
export const formatRelativeTime = (date: string | Date | null | undefined): string => {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';

  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const rtf = new Intl.RelativeTimeFormat(getLocale(), { numeric: 'auto' });

  if (diffSec < 60) return rtf.format(-diffSec, 'second');
  if (diffMin < 60) return rtf.format(-diffMin, 'minute');
  if (diffHour < 24) return rtf.format(-diffHour, 'hour');
  if (diffDay < 30) return rtf.format(-diffDay, 'day');

  // Fallback to short date for older dates
  return formatDate(d, 'short');
};

// ─── Grades ─────────────────────────────────────────────────────────

/**
 * Format a grade: "14 / 20"
 */
export const formatNote = (note: number | null | undefined, maxNote: number = 20): string => {
  if (note == null) return '—';
  return `${note} / ${maxNote}`;
};

// ─── Percentage ─────────────────────────────────────────────────────

/**
 * Format a percentage value: "85,2 %"
 */
export const formatPercentage = (
  value: number | null | undefined,
  decimals: number = 1
): string => {
  if (value == null) return '—';
  return new Intl.NumberFormat(getLocale(), {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

// ─── Identity ───────────────────────────────────────────────────────

/**
 * Format a student matricule: "MAT-2026-001234"
 */
export const formatMatricule = (matricule: string | null | undefined): string => {
  if (!matricule) return '—';
  return matricule.toUpperCase();
};

/**
 * Format a Cameroonian phone number: "+237 6XX XX XX XX"
 */
export const formatPhoneNumber = (phone: string | null | undefined): string => {
  if (!phone) return '—';
  const cleaned = phone.replace(/\D/g, '');

  // Handle with or without country code
  if (cleaned.length === 9) {
    return `+237 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('237')) {
    const local = cleaned.slice(3);
    return `+237 ${local.slice(0, 3)} ${local.slice(3, 5)} ${local.slice(5, 7)} ${local.slice(7, 9)}`;
  }

  return phone; // Return as-is if format is unknown
};

// ─── Text Utilities ─────────────────────────────────────────────────

/**
 * Truncate text with ellipsis.
 */
export const truncateText = (text: string | null | undefined, maxLength: number = 50): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

/**
 * Capitalize the first letter of a string.
 */
export const capitalizeFirst = (text: string | null | undefined): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Get initials from a name: "Jean Dupont" -> "JD"
 */
export const getInitials = (name: string | null | undefined, maxChars: number = 2): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, maxChars)
    .join('');
};

/**
 * Format a full name: "NOM Prénom" or "Prénom NOM"
 */
export const formatFullName = (
  nom: string | null | undefined,
  prenom: string | null | undefined,
  style: 'formal' | 'friendly' = 'formal'
): string => {
  if (!nom && !prenom) return '—';
  if (style === 'friendly') return `${capitalizeFirst(prenom)} ${(nom || '').toUpperCase()}`;
  return `${(nom || '').toUpperCase()} ${capitalizeFirst(prenom)}`;
};
