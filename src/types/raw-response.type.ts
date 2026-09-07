/**
 * An unparsed response body, as handed back to a response strategy.
 *
 * Two shapes occur in the wild and both must be expressible:
 *
 * - an envelope object — `{ data: [...], meta: {...} }`, used by most drivers
 * - a bare array — PostgREST and the WordPress REST API return the rows
 *   directly, with pagination metadata carried in response headers
 *
 * `Record<string, unknown>` alone cannot describe the second, which is why
 * every implementation previously widened it to `Record<string, any>`.
 */
export type RawResponse = Record<string, unknown> | readonly unknown[];
