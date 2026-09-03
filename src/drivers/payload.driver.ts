import type { DriverDefinition } from '../types/driver-definition.type';

import { PayloadResponseOptions } from '../models/response-options';
import { PayloadRequestStrategy } from '../strategies/payload-request.strategy';
import { PayloadResponseStrategy } from '../strategies/payload-response.strategy';

/**
 * Driver definition for Payload CMS. Filters nest under `where[field][operator]`; the envelope is
 * `{ docs, totalDocs, page, totalPages, … }`.
 */
export const PAYLOAD_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new PayloadRequestStrategy(),
  createResponseStrategy: () => new PayloadResponseStrategy(),
  createResponseOptions: (config) => new PayloadResponseOptions(config),
};
