/**
 * A value that can appear in a query-string payload handed to `stringify()`.
 *
 * Recursive by design: request strategies build arbitrarily nested operator
 * objects such as `{ filters: { status: { $in: ['draft', 'live'] } } }`.
 */
export type QueryValue =
  boolean | number | string | QueryValue[] | null | undefined | { [key: string]: QueryValue };
