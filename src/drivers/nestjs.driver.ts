import type { DriverDefinition } from '../types/driver-definition.type';

import { NestjsResponseOptions } from '../models/response-options';
import { NestjsRequestStrategy } from '../strategies/nestjs-request.strategy';
import { NestjsResponseStrategy } from '../strategies/nestjs-response.strategy';

/**
 * Driver definition for nestjs-paginate. Supports the richest operator set of any driver and accepts
 * `-1` as a fetch-all sentinel for the limit.
 */
export const NESTJS_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new NestjsRequestStrategy(),
  createResponseStrategy: () => new NestjsResponseStrategy(),
  createResponseOptions: (config) => new NestjsResponseOptions(config),
};
