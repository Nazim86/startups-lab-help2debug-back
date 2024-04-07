import { ApiProperty } from '@nestjs/swagger';
import { ValidationPipeError } from '../config/pipes/validationPipeError.types';

export class BadRequestResponse {
  @ApiProperty({ description: 'Call date', type: 'string' })
  timestamp: string;

  @ApiProperty({ description: 'Called url', type: 'string' })
  path: string;

  @ApiProperty({ description: 'List of errors', type: [ValidationPipeError] })
  message: ValidationPipeError[];
}
