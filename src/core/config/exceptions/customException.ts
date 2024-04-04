import { ExceptionCodes } from './exceptionCodes';

export class CustomError extends Error {
  constructor(
    protected readonly _message: string,
    protected readonly _code?: number,
  ) {
    super(_message);
  }

  get code(): number {
    return this._code;
  }

  get message(): string {
    return this._message;
  }
}

export class BadRequestError extends CustomError {
  private readonly _field: string;

  constructor(msg: string, field: string) {
    super(msg, ExceptionCodes.BadRequest);
    this._field = field;
  }

  get getError() {
    return this.getViewError();
  }

  private getViewError() {
    return [
      {
        message: this._message,
        field: this._field,
      },
    ];
  }
}

export class UnauthorizedError extends CustomError {
  constructor(msg: string) {
    super(msg, ExceptionCodes.Unauthorized);
  }
}

export class ForbiddenError extends CustomError {
  constructor(msg: string) {
    super(msg, ExceptionCodes.Forbidden);
  }
}

export class NotFoundError extends CustomError {
  constructor(msg: string) {
    super(msg, ExceptionCodes.NotFound);
  }
}

export class InternalServerError extends CustomError {
  constructor(msg: string) {
    super(msg, ExceptionCodes.InternalServerError);
  }
}

export class BadGatewayError extends CustomError {
  constructor(msg: string) {
    super(msg, ExceptionCodes.BadGateway);
  }
}
