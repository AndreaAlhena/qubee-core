import type { DriverEnum } from '../enums/driver.enum';

/**
 * The set of supported driver identifiers, as a union of string literals
 * derived from {@link DriverEnum}.
 *
 * Accepting this instead of the enum lets consumers pass a plain string —
 * `{ driver: 'strapi' }` — which is the natural idiom outside TypeScript-only
 * codebases, while `DriverEnum.STRAPI` keeps working unchanged.
 */
export type Driver = `${DriverEnum}`;
