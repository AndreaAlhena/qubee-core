import type { DriverDefinition } from '../types/driver-definition.type';

import { PocketbaseResponseOptions } from '../models/response-options';
import { PocketbaseRequestStrategy } from '../strategies/pocketbase-request.strategy';
import { PocketbaseResponseStrategy } from '../strategies/pocketbase-response.strategy';

/**
 * Driver definition for PocketBase. Filters compose into a single expression string; the envelope is
 * `{ page, perPage, totalItems, totalPages, items }`.
 */
export const POCKETBASE_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new PocketbaseRequestStrategy(),
  createResponseStrategy: () => new PocketbaseResponseStrategy(),
  createResponseOptions: (config) => new PocketbaseResponseOptions(config),
};
