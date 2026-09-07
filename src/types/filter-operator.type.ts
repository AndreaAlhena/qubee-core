import type { FilterOperatorEnum } from '../enums/filter-operator.enum';

/**
 * The set of supported filter operators, as a union of string literals derived
 * from {@link FilterOperatorEnum}. Accepts both the enum member and its value.
 *
 * Note: this widened form is accepted at the *public* API boundary only. The
 * internal `OperatorFilter` state keeps `FilterOperatorEnum`, because the 13
 * per-driver `switch` statements enumerate every member with no `default:` —
 * that is what makes them provably exhaustive when a new operator is added.
 */
export type FilterOperator = `${FilterOperatorEnum}`;
