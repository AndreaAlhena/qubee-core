import type { QubeeErrorCode } from '../types/qubee-error-code.type';

/**
 * Base class for every error this library throws.
 *
 * Adds three things a bare `Error` does not give a library consumer:
 *
 * - `code` — branch on the failure without matching against English text
 * - `context` — the values that caused it, for logging and debugging
 * - `cause` — the underlying error, when this one wraps another
 *
 * `Object.setPrototypeOf` is required for `instanceof` to survive when a
 * consumer's toolchain downlevels the package below ES2015. The core targets
 * ES2022, but a published package does not control how it is transpiled.
 */
export abstract class QubeeError extends Error {
  /**
   * Machine-readable identifier for this failure.
   */
  public readonly code: QubeeErrorCode;

  /**
   * The values that produced the error, when they aid diagnosis.
   */
  public readonly context?: Record<string, unknown>;

  /**
   * @param code - Machine-readable identifier for this failure
   * @param message - Human-readable explanation
   * @param options - Optional underlying `cause` and diagnostic `context`
   */
  constructor(
    code: QubeeErrorCode,
    message: string,
    options?: { cause?: unknown; context?: Record<string, unknown> }
  ) {
    super(message, options?.cause === undefined ? undefined : { cause: options.cause });

    this.code = code;
    this.context = options?.context;
    this.name = new.target.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
