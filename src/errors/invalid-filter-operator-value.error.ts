import type { FilterOperatorEnum } from '../enums/filter-operator.enum';

import { QubeeError } from './qubee.error';

/**
 * Thrown when a filter operator receives a value array of the wrong shape
 *
 * Some operators have arity or type constraints that the library enforces
 * at call time so misuse fails loudly instead of silently emitting invalid
 * server requests:
 *
 * - `BTW` requires exactly two values (min, max).
 * - `NULL` requires exactly one boolean value (`true` for `IS NULL`,
 *   `false` for `IS NOT NULL`).
 *
 * Operators with looser shape rules leave validation to the server; this
 * error is reserved for cases where the library itself can detect the
 * problem unambiguously from the call site.
 */
export class InvalidFilterOperatorValueError extends QubeeError {
  /**
   * The operator that rejected the values.
   */
  public readonly operator: FilterOperatorEnum;

  /**
   * Why the values were rejected.
   */
  public readonly reason: string;

  /**
   * @param operator - The operator that rejected the values
   * @param reason - Short human-readable explanation of the constraint
   */
  constructor(operator: FilterOperatorEnum, reason: string) {
    super(
      'INVALID_FILTER_OPERATOR_VALUE',
      `Invalid values for filter operator ${operator}: ${reason}`,
      {
        context: { operator, reason },
      }
    );

    this.operator = operator;
    this.reason = reason;
  }
}
