import type { DriverDefinition } from '../types/driver-definition.type';

import { ApiPlatformResponseOptions } from '../models/response-options';
import { ApiPlatformRequestStrategy } from '../strategies/api-platform-request.strategy';
import { ApiPlatformResponseStrategy } from '../strategies/api-platform-response.strategy';

/**
 * Driver definition for API Platform (Hydra/JSON-LD). Pagination and page counts are derived from the
 * `hydra:view` block rather than read from named fields.
 */
export const API_PLATFORM_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new ApiPlatformRequestStrategy(),
  createResponseStrategy: () => new ApiPlatformResponseStrategy(),
  createResponseOptions: (config) => new ApiPlatformResponseOptions(config),
};
