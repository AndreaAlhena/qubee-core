import { QubeeError } from './qubee.error';

export class InvalidPageNumberError extends QubeeError {
  /**
   * The rejected page number.
   */
  public readonly page: number;

  constructor(page: number) {
    super(
      'INVALID_PAGE_NUMBER',
      `Invalid page number: Page must be a positive integer greater than 0. Received: ${page}`,
      { context: { page } }
    );

    this.page = page;
  }
}
