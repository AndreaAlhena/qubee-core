import type { Embedded } from '../types/embedded.type';
import type { Fields } from './fields.type';
import type { Filters } from './filters.type';
import type { OperatorFilter } from './operator-filter.type';
import type { Sort } from './sort.type';

/**
 * Represents the complete query builder state
 *
 * This is a superset that covers the needs of all drivers.
 * Each driver reads only the fields it needs from this state.
 */
export type QueryBuilderState = {
  /** The base URL to prepend to generated URIs */
  baseUrl: string;
  /** Embedded-resource selection (PostgREST only) */
  embedded: Embedded;
  /** Per-model field selection (Spatie only) */
  fields: Fields;
  /** Simple key-value filters (Spatie and NestJS) */
  filters: Filters;
  /** Related models to include (Spatie only) */
  includes: string[];
  /** Whether the last paginated response has synced `lastPage` into state */
  isLastPageKnown: boolean;
  /** Last page number known from the most recent paginated response; only meaningful when `isLastPageKnown` is true */
  lastPage: number;
  /** Number of items per page (all drivers) */
  limit: number;
  /** Filters with explicit operators (NestJS only) */
  operatorFilters: OperatorFilter[];
  /** Current page number (all drivers) */
  page: number;
  /** The API resource name for URI generation (all drivers) */
  resource: string;
  /** Full-text search term (NestJS only) */
  search: string;
  /** Flat field selection (NestJS only) */
  select: string[];
  /** Sort configurations (Spatie and NestJS) */
  sorts: Sort[];
};
