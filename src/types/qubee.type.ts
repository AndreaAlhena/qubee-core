import type { Paginator } from '../services/paginator';
import type { QubeeStore } from '../services/qubee-store';
import type { QueryBuilder } from '../services/query-builder';

/**
 * What {@link createQubee} returns: the three objects, already wired together.
 */
export type Qubee = {
  /**
   * Builds query URIs. Mutates the shared store.
   */
  builder: QueryBuilder;

  /**
   * Parses responses and syncs page metadata back into the shared store.
   */
  paginator: Paginator;

  /**
   * The state both of the above read and write. Subscribe to it for reactivity.
   */
  store: QubeeStore;
};
