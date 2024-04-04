import { ValidationError } from '@nestjs/common';

export class DomainError extends Error {
  constructor(
    private readonly _errors: ValidationError[],
    private readonly _message?: string,
  ) {
    super(_message);
  }

  get getErrors() {
    return this.getViewErrors();
  }

  private getViewErrors() {
    return this._errors.map((e) => ({
      message: Object.values(e.constraints!)[0],
      field: e.property,
    }));
  }
}
