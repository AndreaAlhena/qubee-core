import type { DriverDefinition } from '../types/driver-definition.type';

import { JsonServerResponseOptions } from '../models/response-options';
import { JsonServerRequestStrategy } from '../strategies/json-server-request.strategy';
import { JsonServerResponseStrategy } from '../strategies/json-server-response.strategy';

/**
 * Driver definition for json-server. A mock/prototyping backend: filters are bare `field=value` pairs
 * and the total arrives in the `X-Total-Count` header.
 */
export const JSON_SERVER_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new JsonServerRequestStrategy(),
  createResponseStrategy: () => new JsonServerResponseStrategy(),
  createResponseOptions: (config) => new JsonServerResponseOptions(config),
};
