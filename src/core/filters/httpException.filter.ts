import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception.getStatus() === 400) {
      const errors: any = exception.getResponse();

      return response.status(exception.getStatus()).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        message: errors.message,
      });
    }

    response.status(exception.getStatus()).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
