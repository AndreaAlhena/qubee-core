import { QubeeError } from './qubee.error';

export class KeyNotFoundError extends QubeeError {
  /**
   * The key that was not found.
   */
  public readonly key: string;

  constructor(key: string) {
    super('KEY_NOT_FOUND', `Cannot find the key '${key}' on a collection item.`, {
      context: { key },
    });

    this.key = key;
  }
}
