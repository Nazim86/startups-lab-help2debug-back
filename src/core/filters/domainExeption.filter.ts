import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError, ExceptionCodes } from '../config/exceptions';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(ExceptionCodes.BadRequest).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getErrors,
    });
  }
}
