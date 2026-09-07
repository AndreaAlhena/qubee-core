import type { DriverDefinition } from '../types/driver-definition.type';

import { DirectusResponseOptions } from '../models/response-options';
import { DirectusRequestStrategy } from '../strategies/directus-request.strategy';
import { DirectusResponseStrategy } from '../strategies/directus-response.strategy';

/**
 * Driver definition for Directus. Filters use the `_eq` / `_in` operator syntax; totals come from
 * `meta.filter_count`.
 */
export const DIRECTUS_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new DirectusRequestStrategy(),
  createResponseStrategy: () => new DirectusResponseStrategy(),
  createResponseOptions: (config) => new DirectusResponseOptions(config),
};
