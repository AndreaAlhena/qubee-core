import type { IResponseStrategy } from '../interfaces/response-strategy.interface';
import type { ResponseOptions } from '../models/response-options';
import type { PaginatedObject } from '../types/paginated-object.type';
import type { RawResponse } from '../types/raw-response.type';

import { PaginatedCollection } from '../models/paginated-collection';
import { readNumber, readRows, readString } from '../utils/read-path';

/**
 * Base class for response strategies whose pagination metadata is a flat
 * key-value envelope on the response body
 *
 * Laravel's stock pagination and Spatie's `QueryBuilder` both emit the
 * same flat shape — `{ data, current_page, total, per_page, from, to,
 * next_page_url, prev_page_url, first_page_url, last_page, last_page_url
 * }` — and both response strategies were duplicating the byte-identical
 * `new PaginatedCollection(response[options.X], ...)` body before this
 * base existed. Concrete classes now extend and provide only the
 * docstring describing their driver's specific shape (see
 * `LaravelResponseStrategy`, `SpatieResponseStrategy`).
 *
 * Drivers whose pagination metadata is a nested envelope (JSON:API,
 * NestJS, Strapi) extend `AbstractDotPathResponseStrategy` instead.
 * Drivers whose metadata comes from HTTP headers (PostgREST) or is
 * derived from response URLs (DRF) implement `IResponseStrategy`
 * directly.
 */
export abstract class AbstractFlatResponseStrategy implements IResponseStrategy {
  /**
   * Parse a flat-envelope pagination response into a PaginatedCollection
   *
   * @param response - The raw API response object
   * @param options - The response key name configuration
   * @returns A typed PaginatedCollection instance
   */

  public paginate<T extends PaginatedObject>(
    response: RawResponse,
    options: ResponseOptions
  ): PaginatedCollection<T> {
    return new PaginatedCollection(
      readRows<T>(response, options.data),
      readNumber(response, options.currentPage) ?? 1,
      readNumber(response, options.from),
      readNumber(response, options.to),
      readNumber(response, options.total),
      readNumber(response, options.perPage),
      readString(response, options.prevPageUrl),
      readString(response, options.nextPageUrl),
      readNumber(response, options.lastPage),
      readString(response, options.firstPageUrl),
      readString(response, options.lastPageUrl)
    );
  }
}
