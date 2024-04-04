import { INestApplication } from '@nestjs/common';
import { CustomExceptionFilter, HttpExceptionFilter } from '../../filters';

export function filterSetup(app: INestApplication) {
  app.useGlobalFilters(new HttpExceptionFilter(), new CustomExceptionFilter());
}
