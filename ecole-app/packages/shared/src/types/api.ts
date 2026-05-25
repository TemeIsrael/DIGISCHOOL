// ─── Generic API Response Types ─────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── API Error ──────────────────────────────────────────────────────

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
  statusCode?: number;
}

// ─── Query / Filter / Sort Helpers ──────────────────────────────────

export type SortDirection = 'asc' | 'desc';

export interface SortParams {
  sortBy: string;
  sortDirection: SortDirection;
}

export interface FilterParams {
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface QueryParams extends Partial<PaginationParams>, Partial<SortParams> {
  filters?: FilterParams;
}

// ─── Mutation Result ────────────────────────────────────────────────

export interface MutationResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ─── Select Option (shared between front & back) ────────────────────

export interface SelectOption<V = string | number> {
  value: V;
  label: string;
}
