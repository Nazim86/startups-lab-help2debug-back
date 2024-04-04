import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationPipeError } from './validationPipeError.types';

export function pipesSetup(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorsForResponse: ValidationPipeError[] = errors.flatMap(
          (error) => {
            const constraints = error.constraints ?? [];
            return Object.entries(constraints).map(
              ([, value]): ValidationPipeError => ({
                field: error.property,
                message: value,
              }),
            );
          },
        );
        throw new BadRequestException(errorsForResponse);
      },
    }),
  );
}
