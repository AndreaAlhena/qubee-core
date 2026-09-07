import type { DriverDefinition } from '../types/driver-definition.type';

import { JsonApiResponseOptions } from '../models/response-options';
import { JsonApiRequestStrategy } from '../strategies/json-api-request.strategy';
import { JsonApiResponseStrategy } from '../strategies/json-api-response.strategy';

/**
 * Driver definition for JSON:API. Pagination is `page[number]` / `page[size]`; the response carries
 * `meta` and `links` blocks.
 */
export const JSON_API_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new JsonApiRequestStrategy(),
  createResponseStrategy: () => new JsonApiResponseStrategy(),
  createResponseOptions: (config) => new JsonApiResponseOptions(config),
};
