import { UnsupportedCapabilityError } from './unsupported-capability.error';

/**
 * Thrown when the active driver does not support per-model field selection — `addFields()`.
 *
 * The message is generated from the capability and driver, never hardcoded.
 */
export class UnsupportedFieldSelectionError extends UnsupportedCapabilityError {
  /**
   * @param driver - The active driver, when known
   */
  constructor(driver?: string) {
    super('fields', driver);
  }
}
