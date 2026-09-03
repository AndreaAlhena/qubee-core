import type { DriverDefinition } from '../types/driver-definition.type';

import { FeathersResponseOptions } from '../models/response-options';
import { FeathersRequestStrategy } from '../strategies/feathers-request.strategy';
import { FeathersResponseStrategy } from '../strategies/feathers-response.strategy';

/**
 * Driver definition for FeathersJS. Query syntax is Mongo-flavoured (`$in`, `$limit`, `$skip`); the
 * envelope is `{ total, limit, skip, data }`.
 */
export const FEATHERS_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new FeathersRequestStrategy(),
  createResponseStrategy: () => new FeathersResponseStrategy(),
  createResponseOptions: (config) => new FeathersResponseOptions(config),
};
