import type { DriverDefinition } from '../types/driver-definition.type';

import { ResponseOptions } from '../models/response-options';
import { PostgrestRequestStrategy } from '../strategies/postgrest-request.strategy';
import { PostgrestResponseStrategy } from '../strategies/postgrest-response.strategy';

/**
 * Driver definition for PostgREST. The only driver whose request strategy consults `paginationMode`:
 * RANGE mode emits pagination as a `Range` header instead of query parameters,
 * and the response body is a bare array with totals in `Content-Range`. Because
 * every field is derived from that header, the base `ResponseOptions` is used.
 */
export const POSTGREST_DRIVER: DriverDefinition = {
  createRequestStrategy: (mode) => new PostgrestRequestStrategy(mode),
  createResponseStrategy: () => new PostgrestResponseStrategy(),
  createResponseOptions: (config) => new ResponseOptions(config),
};
