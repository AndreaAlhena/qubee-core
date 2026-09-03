import type { DriverDefinition } from '../types/driver-definition.type';

import { ResponseOptions } from '../models/response-options';
import { LaravelRequestStrategy } from '../strategies/laravel-request.strategy';
import { LaravelResponseStrategy } from '../strategies/laravel-response.strategy';

/**
 * Driver definition for Laravel's built-in paginator. The response envelope is flat and fully named
 * (`current_page`, `per_page`, `last_page`, `*_page_url`), so the base
 * `ResponseOptions` defaults apply unchanged — no subclass is needed.
 */
export const LARAVEL_DRIVER: DriverDefinition = {
  createRequestStrategy: () => new LaravelRequestStrategy(),
  createResponseStrategy: () => new LaravelResponseStrategy(),
  createResponseOptions: (config) => new ResponseOptions(config),
};
