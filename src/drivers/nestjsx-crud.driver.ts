import type { DriverDefinition } from '../types/driver-definition.type';

import { NestjsxCrudResponseOptions } from '../models/response-options';
import { NestjsxCrudRequestStrategy } from '../strategies/nestjsx-crud-request.strategy';
import { NestjsxCrudResponseStrategy } from '../strategies/nestjsx-crud-response.strategy';

/**
 * Driver definition for @nestjsx/crud. Filters use the `field||$op||value` triple-pipe syntax.
 */
export const NESTJSX_CRUD_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new NestjsxCrudRequestStrategy(),
  createResponseStrategy: () => new NestjsxCrudResponseStrategy(),
  createResponseOptions: (config) => new NestjsxCrudResponseOptions(config),
};
