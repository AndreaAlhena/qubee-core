import type { FilterOperatorEnum } from '../enums/filter-operator.enum';

/**
 * Represents a filter with an explicit operator for the NestJS driver
 *
 * Operator filters produce query parameters in the format:
 * `filter.field=$operator:value`
 *
 * @example
 * ```typescript
 * const filter: OperatorFilter = {
 *   field: 'age',
 *   operator: FilterOperatorEnum.GTE,
 *   values: [18]
 * };
 * // Produces: filter.age=$gte:18
 * ```
 */
export type OperatorFilter = {
  /** The field name to filter on */
  field: string;
  /** The filter operator to apply */
  operator: FilterOperatorEnum;
  /** The value(s) for the filter */
  values: (string | number | boolean)[];
};
