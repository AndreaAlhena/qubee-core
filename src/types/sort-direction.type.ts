import type { SortEnum } from '../enums/sort.enum';

/**
 * Sort direction, as a union of string literals derived from {@link SortEnum}.
 * Accepts both the enum member and its value.
 *
 * Named `SortDirection` rather than `Sort` because {@link Sort} is the
 * `{ field, order }` shape.
 *
 * Like {@link FilterOperator}, this widened form is accepted at the *public*
 * API boundary only — the internal `Sort` state keeps `SortEnum`, because 17
 * call sites compare it against enum members directly.
 */
export type SortDirection = `${SortEnum}`;
