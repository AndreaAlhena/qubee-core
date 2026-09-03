import type { DriverDefinition } from '../types/driver-definition.type';

import { DrfResponseOptions } from '../models/response-options';
import { DrfRequestStrategy } from '../strategies/drf-request.strategy';
import { DrfResponseStrategy } from '../strategies/drf-response.strategy';

/**
 * Driver definition for Django REST Framework. The envelope is flat `{ count, next, previous, results }`,
 * so navigation is by URL rather than by page number.
 */
export const DRF_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new DrfRequestStrategy(),
  createResponseStrategy: () => new DrfResponseStrategy(),
  createResponseOptions: (config) => new DrfResponseOptions(config),
};
