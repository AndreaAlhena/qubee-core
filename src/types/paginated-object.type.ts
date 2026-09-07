/**
 * The minimum a row must satisfy to live in a {@link PaginatedCollection}.
 *
 * Deliberately permissive — the library never inspects rows except in
 * `normalize()`, which reads one identifier key. Typed as `unknown` rather
 * than `any` so callers must narrow before use instead of silently opting out
 * of type checking.
 */
export type PaginatedObject = Record<string, unknown>;
