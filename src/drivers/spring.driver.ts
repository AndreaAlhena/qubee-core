import type { DriverDefinition } from '../types/driver-definition.type';

import { SpringResponseOptions } from '../models/response-options';
import { SpringRequestStrategy } from '../strategies/spring-request.strategy';
import { SpringResponseStrategy } from '../strategies/spring-response.strategy';

/**
 * Driver definition for Spring Data REST. Pagination lives in a `page` block and navigation in a HAL
 * `_links` block, so page indices are zero-based on the wire.
 */
export const SPRING_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new SpringRequestStrategy(),
  createResponseStrategy: () => new SpringResponseStrategy(),
  createResponseOptions: (config) => new SpringResponseOptions(config),
};
