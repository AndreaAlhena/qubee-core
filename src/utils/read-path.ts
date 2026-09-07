import type { RawResponse } from '../types/raw-response.type';

/**
 * Read a dot-separated path out of a response body.
 *
 * A bare-array body (PostgREST, WordPress) carries no envelope keys, so every
 * lookup against one resolves to `undefined` — the same answer callers already
 * expect for a missing key, and the same answer an empty path gives.
 *
 * @param response - The raw response body
 * @param path - Dot-separated path, e.g. `meta.pagination.total`
 * @returns The value at that path, or `undefined` if absent
 */
export function readPath(response: RawResponse, path: string): unknown {
  if (Array.isArray(response)) {
    return undefined;
  }

  // A literal key wins over path traversal: OData envelope keys contain dots
  // (`@odata.count`), so splitting them would look for a nested object that
  // does not exist.
  const envelope = response as Record<string, unknown>;

  if (path in envelope) {
    return envelope[path];
  }

  return path
    .split('.')
    .reduce<unknown>(
      (value, key) =>
        value === null || typeof value !== 'object'
          ? undefined
          : (value as Record<string, unknown>)[key],
      envelope
    );
}

/**
 * Read a path expected to hold a number.
 *
 * Values that are not numbers resolve to `undefined` rather than being coerced,
 * so a malformed envelope surfaces as "absent" instead of `NaN`.
 *
 * @param response - The raw response body
 * @param path - Dot-separated path
 * @returns The number at that path, or `undefined`
 */
export function readNumber(response: RawResponse, path: string): number | undefined {
  const value = readPath(response, path);

  return typeof value === 'number' ? value : undefined;
}

/**
 * Read a path expected to hold the row array.
 *
 * A bare-array body is itself the rows, so it is returned directly and the
 * path ignored.
 *
 * @param response - The raw response body
 * @param path - Dot-separated path to the rows
 * @returns The rows, or an empty array when absent
 */
export function readRows<T>(response: RawResponse, path: string): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  const value = readPath(response, path);

  return Array.isArray(value) ? (value as T[]) : [];
}

/**
 * Read a path expected to hold a string.
 *
 * @param response - The raw response body
 * @param path - Dot-separated path
 * @returns The string at that path, or `undefined`
 */
export function readString(response: RawResponse, path: string): string | undefined {
  const value = readPath(response, path);

  return typeof value === 'string' ? value : undefined;
}
