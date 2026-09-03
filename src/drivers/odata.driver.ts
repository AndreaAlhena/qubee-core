import type { DriverDefinition } from '../types/driver-definition.type';

import { OdataResponseOptions } from '../models/response-options';
import { OdataRequestStrategy } from '../strategies/odata-request.strategy';
import { OdataResponseStrategy } from '../strategies/odata-response.strategy';

/**
 * Driver definition for OData v4. Filters are composed into a single `$filter` expression joined with
 * `and`; the envelope uses `@odata.count` and `@odata.nextLink`.
 */
export const ODATA_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new OdataRequestStrategy(),
  createResponseStrategy: () => new OdataResponseStrategy(),
  createResponseOptions: (config) => new OdataResponseOptions(config),
};
