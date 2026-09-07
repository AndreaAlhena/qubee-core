import { QubeeError } from './qubee.error';

export class UnselectableModelError extends QubeeError {
  constructor(model: string) {
    super(
      'UNSELECTABLE_MODEL',
      `Unselectable Model: the selected model (${model}) is not present neither in the "model" property, nor in the includes object.`
    );
  }
}
