import type { DriverDefinition } from '../types/driver-definition.type';

import { StrapiResponseOptions } from '../models/response-options';
import { StrapiRequestStrategy } from '../strategies/strapi-request.strategy';
import { StrapiResponseStrategy } from '../strategies/strapi-response.strategy';

/**
 * Driver definition for Strapi v4/v5. Filters use the bracketed `filters[field][$op]` syntax and
 * pagination `pagination[page]` / `pagination[pageSize]`; the envelope is
 * `meta.pagination.*`. Strapi emits no link block.
 */
export const STRAPI_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new StrapiRequestStrategy(),
  createResponseStrategy: () => new StrapiResponseStrategy(),
  createResponseOptions: (config) => new StrapiResponseOptions(config),
};
