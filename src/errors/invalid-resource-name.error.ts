import { QubeeError } from './qubee.error';

/**
 * Error thrown when an invalid resource name is provided
 *
 * Resource name must be a non-empty string.
 */
export class InvalidResourceNameError extends QubeeError {
  constructor(resource: string | null | undefined) {
    super(
      'INVALID_RESOURCE_NAME',
      `Invalid resource name: Resource name must be a non-empty string. Received: ${JSON.stringify(resource)}`,
      { context: { resource } }
    );
  }
}
