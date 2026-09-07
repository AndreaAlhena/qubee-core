import type { PaginationModeEnum } from '../enums/pagination-mode.enum';

/**
 * The wire-level pagination mechanism, as a union of string literals derived
 * from {@link PaginationModeEnum}. Accepts both the enum member and its value.
 */
export type PaginationMode = `${PaginationModeEnum}`;
