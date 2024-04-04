import { ApiProperty } from '@nestjs/swagger';

export class ValidationPipeError {
  @ApiProperty({ description: 'Error field', type: 'string' })
  field: string;

  @ApiProperty({ description: 'Error message', type: 'string' })
  message: string;
}
