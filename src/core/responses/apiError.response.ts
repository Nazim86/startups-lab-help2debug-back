import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponse {
  @ApiProperty({ description: 'Call date', type: 'string' })
  timestamp: string;

  @ApiProperty({ description: 'Called url', type: 'string' })
  path: string;

  @ApiProperty({ description: 'Error message', type: 'string' })
  message: string;
}
