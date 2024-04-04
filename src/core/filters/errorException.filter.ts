import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (process.env.envoriment !== 'production') {
      response
        .status(500)
        .send({ error: exception.message, stack: exception.stack }); // error: exception.toString()
    } else {
      response.status(500).send('some error ocurred');
    }
  }
}
