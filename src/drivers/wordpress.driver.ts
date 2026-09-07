import type { DriverDefinition } from '../types/driver-definition.type';

import { ResponseOptions } from '../models/response-options';
import { WordpressRequestStrategy } from '../strategies/wordpress-request.strategy';
import { WordpressResponseStrategy } from '../strategies/wordpress-response.strategy';

/**
 * Driver definition for WordPress REST API. Totals arrive in the `X-WP-Total` and `X-WP-TotalPages`
 * headers and navigation in the `Link` header, so the base `ResponseOptions`
 * is used and nothing is read from the body envelope.
 */
export const WORDPRESS_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new WordpressRequestStrategy(),
  createResponseStrategy: () => new WordpressResponseStrategy(),
  createResponseOptions: (config) => new ResponseOptions(config),
};
