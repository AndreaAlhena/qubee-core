import type { DriverDefinition } from '../types/driver-definition.type';

import { ResponseOptions } from '../models/response-options';
import { SpatieRequestStrategy } from '../strategies/spatie-request.strategy';
import { SpatieResponseStrategy } from '../strategies/spatie-response.strategy';

/**
 * Driver definition for spatie/laravel-query-builder. Emits the same flat Laravel envelope, so the base
 * `ResponseOptions` applies; the request side adds `filter[]`, `include` and
 * `fields[model]` support.
 */
export const SPATIE_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new SpatieRequestStrategy(),
  createResponseStrategy: () => new SpatieResponseStrategy(),
  createResponseOptions: (config) => new ResponseOptions(config),
};
