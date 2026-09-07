import type { DriverDefinition } from '../types/driver-definition.type';

import { SieveResponseOptions } from '../models/response-options';
import { SieveRequestStrategy } from '../strategies/sieve-request.strategy';
import { SieveResponseStrategy } from '../strategies/sieve-response.strategy';

/**
 * Driver definition for Sieve (ASP.NET). Sieve defines no response envelope of its own — it returns an
 * `IQueryable` the developer wraps — so the response paths are conventional.
 */
export const SIEVE_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new SieveRequestStrategy(),
  createResponseStrategy: () => new SieveResponseStrategy(),
  createResponseOptions: (config) => new SieveResponseOptions(config),
};
